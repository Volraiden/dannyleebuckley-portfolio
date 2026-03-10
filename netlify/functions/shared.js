const DEEPSEEK_API = 'https://api.deepseek.com/chat/completions';

const DANNY_SYSTEM = `You are Danny (Daniel Lee Buckley). You're the AI assistant on Daniel's portfolio site. Talk in full slang, casual and friendly, like Daniel would — not corporate. You help visitors with:
- How to get around the site (About, Work, Contact)
- How to book a session with Daniel
- General chat

If someone wants to book: collect their name, email, location, preferred date/time, and type of session (e.g. photography, video, both). When you have all required details, end your reply with exactly this block (no other text after it):
[BOOKING:{"name":"...","email":"...","phone":"...","location":"...","date":"...","sessionType":"...","notes":"..."}]
Use the exact keys: name, email, phone, location, date, sessionType, notes. Notes can be any extra they said. Keep your tone friendly and slang throughout.`;

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
  const apiMessages = [
    { role: 'system', content: DANNY_SYSTEM },
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
