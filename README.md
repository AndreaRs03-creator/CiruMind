# CiruMind
Simplificando la cirugía, un mapa a la vez.
git clone https://github.com/tu-usuario/menteabierta.git
cd menteabierta
npm init -y
npm install react react-dom next reactflow openai tailwindcss postcss autoprefixer
npx tailwindcss init -p
  module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
styles/globals.css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  // components/MindMapEditor.jsx
import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const MindMapEditor = ({ nodes = [], edges = [] }) => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default MindMapEditor;
// pages/api/generate-map.js
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
          { role: 'system', content: 'Eres un generador de mapas mentales en formato JSON.' },
          { role: 'user', content: `Genera un mapa mental con base en el siguiente texto: ${inputText}` }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    res.status(200).json({ mapData: content });
  } catch (error) {
    console.error('Error al generar mapa:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
// app/page.jsx o pages/index.jsx
'use client';
import React, { useState } from 'react';
import MindMapEditor from '../components/MindMapEditor';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [mapData, setMapData] = useState({ nodes: [], edges: [] });

  const handleGenerate = async () => {
    const res = await fetch('/api/generate-map', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputText }),
    });

    const data = await res.json();
    const parsed = JSON.parse(data.mapData); // Asegúrate de que la API devuelva un JSON válido

    setMapData(parsed);
  };

  return (
    <div className="p-6">
      <textarea
        className="w-full border p-2 mb-4"
        rows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Escribe el texto para el mapa mental..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
      >
        Generar Mapa Mental
      </button>
      <div className="mt-6">
        <MindMapEditor nodes={mapData.nodes} edges={mapData.edges} />
      </div>
    </div>
  );
};

export default Home;
OPENAI_API_KEY=sk-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
.env.local
