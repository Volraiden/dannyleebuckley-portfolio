// Sends collected booking details to Daniel via Formspree (or similar).
// Set FORMSPREE_BOOKING_ENDPOINT in Netlify env, e.g. https://formspree.io/f/xxxxx

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const endpoint = process.env.FORMSPREE_BOOKING_ENDPOINT;
  if (!endpoint) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Booking form not configured' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, location, date, sessionType, notes } = body;
  const payload = new URLSearchParams({
    name: name || '',
    email: email || '',
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: res.ok }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: err.message }),
    };
  }
};
