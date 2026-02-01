import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Formulario from './components/Formulario';
import React from 'react';

// --- Componente da Página Inicial (Landing Page) ---
function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
      
      {/* Título Principal */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-10 leading-tight">
        SEJA MEU SÓCIO EM UMA NOVA UNIDADE DA FC MOTOS
      </h1>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">🚀 </span>
          <div>
            <p className="font-bold text-lg">+50 milhões faturados</p>
            <p className="text-gray-400 text-sm">Resultado real construído ao longo de anos no segmento de compra e venda de motos.</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">👨‍🏫</span>
          <div>
            <p className="font-bold text-lg">Mentor com Resultados Reais</p>
            <p className="text-gray-400 text-sm">Já formei dezenas de empresários com lucro em mais de 15 estados brasileiros, aplicando meu método validado.</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">🔁 </span>
          <div>
            <p className="font-bold text-lg">Payback entre 12 a 15 meses</p>
            <p className="text-gray-400 text-sm">Modelo de operação com retorno rápido sobre o investimento, baseado em resultados reais e escaláveis.
</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">🏁</span>
          <div>
            <p className="font-bold text-lg">Marca Reconhecida </p>
            <p className="text-gray-400 text-sm">FC Motos é uma marca consolidada com presença física, forte nas redes sociais e autoridade no segmento.</p>
          </div>
        </div>
      </div>

      {/* Caixa de Aviso */}
      <div className="w-full bg-[#1a1510] border border-orange-600/50 rounded-lg p-4 flex items-start gap-3 mb-8">
        <span className="text-red-500 text-xl mt-1">⛔</span>
        <p className="text-gray-300 text-sm md:text-base">
          📈 Exclusivo para quem quer <span className="text-white font-bold">abrir e operar</span> no dia a dia
        </p>
      </div>

      {/* Botão de Ação -> Leva para /formulario */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-400 text-sm flex items-center gap-2">
          👉 Preencha o formulário e descubra se você se qualifica.
        </p>
        
        <button
          onClick={() => navigate('/formulario')}
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg py-4 px-12 rounded-lg transition-transform transform hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
}

// --- Componente Principal com as Rotas ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-4 font-sans">
        
        <Routes>
          {/* Rota 1: Página Inicial */}
          <Route path="/" element={<Home />} />
          
          {/* Rota 2: Formulário (com largura controlada para não esticar demais) */}
          <Route path="/formulario" element={
            <div className="w-full max-w-2xl animate-fade-in-up">
              <Formulario />
            </div>
          } />
        </Routes>

      </div>
    </Router>
  );
}

export default App;