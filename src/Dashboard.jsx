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

  // Função para formatar link do WhatsApp
  const getWhatsappLink = (phone) => {
    if (!phone) return "#";
    // Remove tudo que não for número
    const cleanNumber = phone.replace(/\D/g, '');
    // Adiciona o 55 do Brasil se não tiver
    return `https://wa.me/55${cleanNumber}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Tem certeza que deseja EXCLUIR este cadastro? Essa ação não tem volta.")) {
      try {
        const response = await fetch(`${API_URL}/api/candidatos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
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
              
              {/* BOTÃO DE DELETAR */}
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 left-4 md:left-auto md:right-4 bg-gray-800 hover:bg-red-600 text-gray-500 hover:text-white p-2 rounded-full transition-colors z-10"
                title="Excluir cadastro"
              >
                🗑️
              </button>

              {/* Cabeçalho do Card */}
              <div className="flex flex-col md:flex-row justify-between mb-6 border-b border-gray-800 pb-4 md:pr-12">
                <div className="mt-8 md:mt-0">
                  <h2 className="text-2xl font-bold text-white mb-1">{item.nome}</h2>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>📍 {item.cidade_bairro}</span>
                    <span>•</span>
                    <span>🎂 {item.idade} anos</span>
                  </div>
                </div>

                {/* Área de Contatos e Valor */}
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                   {/* Botão WhatsApp NOVO */}
                   {item.whatsapp && (
                        <a 
                            href={getWhatsappLink(item.whatsapp)} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-green-900/20"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            {item.whatsapp}
                        </a>
                   )}

                   {item.instagram && (
                       <a href={`https://instagram.com/${item.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-1 mt-1">
                           📸 {item.instagram}
                       </a>
                   )}
                   
                   <span className="px-3 py-1 mt-2 rounded bg-green-900/30 text-green-400 text-xs font-bold border border-green-900">
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
                    {/* LIMPEI AQUI: Tirei a Motivação antiga que dava aspas vazias */}
                    <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs uppercase font-bold">Perfil Sócio</span>
                            <span className="text-orange-300 font-medium mt-1">{item.perfil_socio}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-700 hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs uppercase font-bold">Aceita Processos?</span>
                            <span className="text-white font-medium mt-1">{item.aceita_processos}</span>
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

// Componente auxiliar
function InfoBox({ label, value, children }) {
    return (
        <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50">
            <span className="text-gray-500 block text-xs uppercase font-bold mb-1">{label}</span>
            <span className="text-white font-medium">{value || "-"}</span>
            {children}
        </div>
    );
}