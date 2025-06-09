import { useState } from 'react';
import MindMapEditor from '../components/MindMapEditor';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleGenerate = async () => {
    const res = await fetch('/api/generate-map', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputText }),
    });

    const data = await res.json();
    setNodes(data.nodes || []);
    setEdges(data.edges || []);
  };

  return (
    <div className="p-6">
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Escribe el tema para tu mapa mental"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generar Mapa Mental
      </button>
      <div className="mt-6">
        <MindMapEditor nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
