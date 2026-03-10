const DEEPSEEK_API = 'https://api.deepseek.com/chat/completions';

const DANNY_SYSTEM = `You are Danny (Daniel Lee Buckley). You're the AI assistant on Daniel's portfolio site. Talk in full slang, casual and friendly, like Daniel would — not corporate. You help visitors with:
- How to get around the site (About, Work, Contact)
- How to book a session with Daniel
- General chat

If someone wants to book: collect their name, email, location, preferred date/time, and type of session (e.g. photography, video, both). When you have all required details, end your reply with exactly this block (no other text after it):
[BOOKING:{"name":"...","email":"...","location":"...","date":"...","sessionType":"...","notes":"..."}]
Use the exact keys: name, email, location, date, sessionType, notes. Notes can be any extra they said. Keep your tone friendly and slang throughout.`;

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

exports.handler = async function (event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'AI chat isn\'t set up yet. Add DEEPSEEK_API_KEY in Netlify (Site configuration → Environment variables), then redeploy. Or email Daniel directly.',
      }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const apiMessages = [
    { role: 'system', content: DANNY_SYSTEM },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
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
      const err = await res.text();
      return { statusCode: res.status, body: err || res.statusText };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    const booking = parseBookingFromReply(content);
    const reply = stripBookingBlock(content);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ reply, booking: booking || undefined }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message || 'Chat request failed',
    };
  }
};
