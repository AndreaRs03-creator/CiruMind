# CiruMind
Simplificando la cirugía, un mapa a la vez.
git clone https://github.com/tu-usuario/CiruMind.git
cd CiruMind
npx create-next-app@latest . --typescript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
tailwind.config.js:
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
]
./styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
npm install reactflow openai
components/MindMapEditor.jsx
pages/api/generate-map.js
app/page.jsx
.env.local:
Copiar código
OPENAI_API_KEY=sk-xxxxxxx
git add .
git commit -m "CiruMind: Generador de mapas mentales con IA"
git push origin main
