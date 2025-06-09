# CiruMind
Simplificando la cirugía, un mapa a la vez.
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
