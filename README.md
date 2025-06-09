# CiruMind
Simplificando la cirugía, un mapa a la vez.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const MindMapEditor = dynamic(() => import("@/components/MindMapEditor"), { ssr: false });

export default function Home() {
  const [text, setText] = useState("");
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/generate-map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const result = await response.json();
    setMapData(result.map);
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧠 MenteAbierta</h1>
      <p className="mb-4">Sube tu texto o documento para generar un mapa mental automáticamente.</p>
      <Textarea
        className="w-full mb-4"
        rows={6}
        placeholder="Pega aquí el texto base..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generando..." : "Generar Mapa Mental"}
      </Button>

      {mapData && (
        <Card className="mt-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Editor de Mapa Mental</h2>
            <MindMapEditor initialData={mapData} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
