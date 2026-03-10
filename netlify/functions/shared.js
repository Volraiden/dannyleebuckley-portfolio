const DEEPSEEK_API = 'https://api.deepseek.com/chat/completions';

const DANNY_BASE = `You are Danny (Daniel Lee Buckley). You're the AI assistant on Daniel's portfolio site. Talk in full slang, casual and friendly, like Daniel would — not corporate.`;

function getSystemPrompt(intent) {
  const intentLower = (intent || '').toLowerCase();
  if (intentLower === 'booking') {
    return `${DANNY_BASE}
The user chose BOOKING. Your only job is to collect booking details. Be concise and friendly. Collect: name, email, phone number (with country code if possible), location, preferred date/time, and type of shooting (e.g. Event, Portrait, Commercial, Brand Film, Wedding, Sports, Documentary — or they can say something else). Always ask explicitly "What type of shooting?" or "What kind of shoot is it?" and put their answer in sessionType. When you have ALL required details, end your reply with exactly this block (no other text after it):
[BOOKING:{"name":"...","email":"...","phone":"...","location":"...","date":"...","sessionType":"...","notes":"..."}]
Use the exact keys: name, email, phone, location, date, sessionType, notes. Notes = any extra they said.`;
  }
  if (intentLower === 'support') {
    return `${DANNY_BASE}
The user chose SUPPORT. Help with: site issues, how to use the site, contact/booking questions, technical problems. Point them to the right section or suggest emailing Danielleebuckley@gmail.com for urgent stuff. Keep it helpful and slang.`;
  }
  return `${DANNY_BASE}
The user chose general CHAT. Help with: how to get around the site (About, Work, Contact), general questions about Daniel's work, or just chat. If they mention booking, you can say they can pick "Booking" next time for a quick flow. Do NOT output a [BOOKING:...] block in chat mode.`;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(statusCode, payload, headers = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
      ...headers,
    },
    body: JSON.stringify(payload),
  };
}

function parseBookingFromReply(reply) {
  const match = reply.match(/\[BOOKING:(.+?)\]\s*$/s);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function stripBookingBlock(reply) {
  return reply.replace(/\s*\[BOOKING:.+?\]\s*$/s, '').trim();
}

function parseRequestBody(body) {
  if (!body) return {};
  if (typeof body === 'string') return JSON.parse(body);
  return body;
}

export async function handleChatRequest({ method, body, env }) {
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (method !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return jsonResponse(500, {
      error:
        "AI chat isn't set up yet. Add DEEPSEEK_API_KEY in Netlify for production or in a local .env file for npm run dev.",
    });
  }

  let parsedBody;
  try {
    parsedBody = parseRequestBody(body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const messages = Array.isArray(parsedBody.messages) ? parsedBody.messages : [];
  const intent = parsedBody.intent || null;
  const systemContent = getSystemPrompt(intent);
  const apiMessages = [
    { role: 'system', content: systemContent },
    ...messages.map((message) => ({ role: message.role, content: message.content })),
  ];

  try {
    const res = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        max_tokens: 1024,
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return jsonResponse(res.status, {
        error: errorText || res.statusText,
      });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    const booking = parseBookingFromReply(content);
    const reply = stripBookingBlock(content);

    return jsonResponse(200, {
      reply,
      booking: booking || undefined,
    });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : 'Chat request failed',
    });
  }
}

export async function handleSubmitBookingRequest({ method, body, env }) {
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (method !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const endpoint =
    env.FORMSPREE_BOOKING_ENDPOINT || 'https://formspree.io/f/xqeypano';

  let parsedBody;
  try {
    parsedBody = parseRequestBody(body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, phone, location, date, sessionType, notes } = parsedBody;
  const payload = new URLSearchParams({
    name: name || '',
    email: email || '',
    phone: phone || '',
    location: location || '',
    date: date || '',
    sessionType: sessionType || '',
    notes: notes || '',
    _subject: 'Booking request from AI Chat',
  });

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    });

    return jsonResponse(200, { ok: res.ok });
  } catch (error) {
    return jsonResponse(500, {
      ok: false,
      message: error instanceof Error ? error.message : 'Booking submission failed',
    });
  }
}
