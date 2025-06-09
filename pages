pages/api/generate-map.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { inputText } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un generador de mapas mentales en JSON: nodes y edges para React Flow.' },
          { role: 'user', content: `Genera un mapa mental a partir de este texto: ${inputText}` }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';

    const parsed = JSON.parse(content);
    res.status(200).json(parsed);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generando el mapa mental' });
  }
}
