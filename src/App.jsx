import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Formulario from "./components/Formulario";
import Dashboard from "./Dashboard";

// --- Rodapé Lume Tecnologia ---
function LumeFooter() {
  return (
    <footer className="w-full flex flex-col items-center gap-2 pt-6 pb-4 mt-8 border-t border-gray-800/50">
      <p className="text-gray-600 text-xs tracking-wide">Desenvolvido por</p>
      <div className="flex items-center gap-3">
        <a
          href="https://lumetecnologiabr.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors"
        >
          lumetecnologiabr.com.br
        </a>
        <span className="text-gray-700 text-xs">·</span>
        <a
          href="https://instagram.com/lumetecnologia.br"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-300 text-xs transition-colors"
        >
          {/* Instagram icon SVG */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="igGrad"
                x1="2"
                y1="22"
                x2="22"
                y2="2"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#888" />
                <stop offset="1" stopColor="#666" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"
              fill="url(#igGrad)"
            />
            <path
              d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"
              fill="url(#igGrad)"
            />
            <path
              d="M18.406 8.415a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z"
              fill="url(#igGrad)"
            />
          </svg>
          @lumetecnologiabr
        </a>
      </div>
    </footer>
  );
}

// --- Componente da Página Inicial (Landing Page) ---
function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
      <h1 className="text-3xl md:text-6xl font-extrabold text-center mb-10 leading-tight">
        SEJA MEU SÓCIO EM UMA NOVA UNIDADE DA{" "}
        <span className="text-orange-600 whitespace-nowrap">FC MOTOS</span>
      </h1>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">🚀 </span>
          <div>
            <p className="font-bold text-lg">+50 milhões faturados</p>
            <p className="text-gray-400 text-sm">
              Resultado real construído ao longo de anos no segmento de compra e
              venda de motos.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">👨‍🏫</span>
          <div>
            <p className="font-bold text-lg">Mentor com Resultados Reais</p>
            <p className="text-gray-400 text-sm">
              Já formei dezenas de empresários com lucro em mais de 15 estados
              brasileiros, aplicando meu método validado.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">🔁 </span>
          <div>
            <p className="font-bold text-lg">Payback entre 12 a 15 meses</p>
            <p className="text-gray-400 text-sm">
              Modelo de operação com retorno rápido sobre o investimento,
              baseado em resultados reais e escaláveis.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-orange-500 transition-colors">
          <span className="text-3xl">🏁</span>
          <div>
            <p className="font-bold text-lg">Marca Reconhecida </p>
            <p className="text-gray-400 text-sm">
              FC Motos é uma marca consolidada com presença física, forte nas
              redes sociais e autoridade no segmento.
            </p>
          </div>
        </div>
      </div>

      {/* Caixa de Aviso */}
      <div className="w-full bg-[#1a1510] border border-orange-600/50 rounded-lg p-4 flex items-start gap-3 mb-8">
        <span className="text-red-500 text-xl mt-1">📈</span>
        <p className="text-gray-300 text-sm md:text-base">
          Exclusivo para quem quer{" "}
          <span className="text-white font-bold">abrir e operar</span> no dia a
          dia
        </p>
      </div>

      {/* Botão de Ação */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-400 text-sm flex items-center gap-2">
          👉 Preencha o formulário e descubra se você se qualifica.
        </p>
        <button
          onClick={() => navigate("/formulario")}
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg py-4 px-12 rounded-lg transition-transform transform hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
        >
          Começar Agora
        </button>
      </div>

      <LumeFooter />
    </div>
  );
}

// --- Componente Principal com as Rotas ---
function App() {
  return (
    <Router>
      <Routes>
        {/* Rota 1: Página Inicial */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-4 font-sans">
              <Home />
            </div>
          }
        />

        {/* Rota 2: Formulário */}
        <Route
          path="/formulario"
          element={
            <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-4 font-sans">
              <div className="w-full max-w-2xl animate-fade-in-up">
                <Formulario />
                <LumeFooter />
              </div>
            </div>
          }
        />

        {/* Rota 3: Dashboard (sem rodapé) */}
        <Route path="/dashboard-admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
