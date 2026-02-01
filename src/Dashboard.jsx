import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [cadastros, setCadastros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senha, setSenha] = useState("");
  const [autorizado, setAutorizado] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Função para buscar os dados
  const buscarDados = () => {
    fetch(`${API_URL}/api/candidatos`)
      .then(res => res.json())
      .then(data => {
        setCadastros(data);
        setLoading(false);
      })
      .catch(err => console.error("Erro ao buscar:", err));
  };

  useEffect(() => {
    if (autorizado) {
      buscarDados();
    }
  }, [autorizado, API_URL]);

  // --- NOVA FUNÇÃO DE DELETAR ---
  const handleDelete = async (id) => {
    // Pergunta de segurança para não apagar sem querer
    if (window.confirm("⚠️ Tem certeza que deseja EXCLUIR este cadastro? Essa ação não tem volta.")) {
      try {
        const response = await fetch(`${API_URL}/api/candidatos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove o item da tela instantaneamente sem precisar recarregar
          setCadastros(cadastros.filter(item => item.id !== id));
        } else {
          alert("Erro ao tentar deletar no servidor.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão.");
      }
    }
  };

  // TELA DE LOGIN
  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl w-full max-w-sm">
          <h2 className="text-white mb-6 text-2xl font-bold text-center">🔐 Acesso Restrito</h2>
          <input 
            type="password" 
            placeholder="Senha de acesso" 
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 mb-6 outline-none focus:border-orange-500 transition-colors"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button 
            onClick={() => senha === "fc2026" && setAutorizado(true)}
            className="w-full bg-orange-600 hover:bg-orange-500 py-3 rounded text-white font-bold transition-transform active:scale-95"
          >
            Entrar no Painel
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">Carregando dados...</div>;

  return (
    <div className="min-h-screen bg-[#0e0e0e] p-4 md:p-12 font-sans text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-2">
            📊 Painel de Candidatos
          </h1>
          <span className="bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-400 mt-4 md:mt-0">
            Total: <strong className="text-white">{cadastros.length}</strong> interessados
          </span>
        </header>

        <div className="grid gap-6">
          {cadastros.map((item) => (
            <div key={item.id} className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg hover:border-orange-500/30 transition-all group">
              
              {/* --- BOTÃO DE DELETAR (NOVO) --- */}
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 right-4 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white p-2 rounded-full transition-colors z-10"
                title="Excluir cadastro"
              >
                🗑️
              </button>

              {/* Cabeçalho do Card */}
              <div className="flex flex-col md:flex-row justify-between mb-6 border-b border-gray-800 pb-4 pr-12"> {/* pr-12 para dar espaço ao botão delete */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{item.nome}</h2>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>📍 {item.cidade_bairro}</span>
                    <span>•</span>
                    <span>🎂 {item.idade} anos</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                   {item.instagram && (
                       <a href={`https://instagram.com/${item.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-1">
                           📸 {item.instagram}
                       </a>
                   )}
                   <span className="px-3 py-1 rounded bg-green-900/30 text-green-400 text-xs font-bold border border-green-900">
                       Investimento: {item.valor_investimento}
                   </span>
                </div>
              </div>

              {/* Grid de Informações */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                
                <InfoBox label="Já tem negócio?" value={item.tem_outros_negocios}>
                    {item.quais_negocios && <p className="text-gray-400 text-xs mt-1 border-t border-gray-700 pt-1">{item.quais_negocios}</p>}
                </InfoBox>

                <InfoBox label="Atuação no dia a dia" value={item.atuacao_negocio} />

                <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50">
                    <span className="text-gray-500 block text-xs uppercase font-bold mb-1">Restrição no CPF</span>
                    <span className={`font-medium ${item.restricao_cpf === 'Não' ? 'text-green-400' : 'text-red-400'}`}>
                        {item.restricao_cpf}
                    </span>
                </div>

                <InfoBox label="Disponibilidade" value={item.disponivel_contrato} />

                <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 col-span-1 md:col-span-2">
                    <span className="text-gray-500 block text-xs uppercase font-bold mb-1">Experiência</span>
                    <span className="text-white font-medium">{item.tem_experiencia}</span>
                    {item.descricao_experiencia && <p className="text-gray-300 mt-2 text-sm italic">"{item.descricao_experiencia}"</p>}
                </div>
                
                 <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 col-span-1 md:col-span-3">
                    <span className="text-gray-500 block text-xs uppercase font-bold mb-1">Motivação & Perfil</span>
                    <p className="text-gray-300 mt-1 mb-2">"{item.motivacao}"</p>
                    <div className="flex gap-4 mt-2 border-t border-gray-700 pt-2">
                        <div>
                            <span className="text-gray-500 text-xs">Perfil Sócio:</span> <span className="text-orange-300">{item.perfil_socio}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Processos:</span> <span className="text-white">{item.aceita_processos}</span>
                        </div>
                    </div>
                </div>

              </div>
            </div>
          ))}

          {cadastros.length === 0 && (
            <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
                <p className="text-gray-500 text-xl">Nenhum candidato cadastrado ainda. 🦗</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para os cards ficarem bonitos
function InfoBox({ label, value, children }) {
    return (
        <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50">
            <span className="text-gray-500 block text-xs uppercase font-bold mb-1">{label}</span>
            <span className="text-white font-medium">{value || "-"}</span>
            {children}
        </div>
    );
}