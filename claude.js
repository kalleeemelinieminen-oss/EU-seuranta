export default async function handler(req, res) {
  // Salli vain POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API-avain tulee Vercelin ympäristömuuttujasta — ei koskaan frontendissä
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Rate limiting: max 10 pyyntöä per IP per minuutti
  // (Vercel Edge tekee tämän automaattisesti Pro-tasolla,
  //  ilmaisella voidaan käyttää yksinkertaista in-memory laskuria)
  const ip = req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  if (!global._rateLimit) global._rateLimit = {};
  const key = `${ip}`;
  if (!global._rateLimit[key]) global._rateLimit[key] = { count: 0, reset: now + 60000 };
  if (now > global._rateLimit[key].reset) {
    global._rateLimit[key] = { count: 0, reset: now + 60000 };
  }
  global._rateLimit[key].count++;
  if (global._rateLimit[key].count > 15) {
    return res.status(429).json({ error: 'Liikaa pyyntöjä. Odota hetki.' });
  }

  try {
    const { prompt, max_tokens = 2000 } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.length > 4000) {
      return res.status(400).json({ error: 'Virheellinen pyyntö' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(502).json({ error: 'AI-palvelu ei vastaa. Yritä uudelleen.' });
    }

    const text = data.content?.find(b => b.type === 'text')?.text || '';
    return res.status(200).json({ text });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Palvelinvirhe. Yritä uudelleen.' });
  }
}
