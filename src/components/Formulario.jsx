import { useState } from 'react';
import { motion as Motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

export default function Formulario() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cidade_bairro: '',
    idade: '',
    instagram: '',
    tem_outros_negocios: '',
    quais_negocios: '',
    atuacao_negocio: '',
    valor_investimento: '',
    restricao_cpf: '',
    disponivel_contrato: '',
    tem_experiencia: '',
    descricao_experiencia: '',
    motivacao: '',
    perfil_socio: '',
    aceita_processos: ''
  });

  const questions = [
    { type: 'text', field: 'nome', label: '1. Nome completo:' },
    { type: 'text', field: 'cidade_bairro', label: '2. Cidade e bairro onde mora atualmente:' },
    { type: 'text', field: 'idade', label: '3. Idade:' },
    { type: 'text', field: 'instagram', label: '4. Qual o seu Instagram pessoal (caso tenha)?' },
    { 
      type: 'radio', 
      field: 'tem_outros_negocios', 
      label: '5. Você possui outro(s) negócio(s) atualmente?',
      options: ['Sim', 'Não'],
      hasSubQuestion: true,
      subField: 'quais_negocios',
      subLabel: 'Se sim, qual(is)?'
    },
    { 
      type: 'radio', 
      field: 'atuacao_negocio', 
      label: '6. Você pretende atuar diretamente no dia a dia do negócio?',
      options: ['Sim, estarei presente diariamente', 'Apenas de forma parcial', 'Apenas como investidor']
    },
    { 
      type: 'radio', 
      field: 'valor_investimento', 
      label: '7. Qual o valor aproximado que você tem disponível para investir?',
      options: ['Até R$ 10 mil', 'Entre R$ 10 mil e R$ 50 mil', 'Acima de R$ 350 mil', 'Não tenho valor para investir no momento']
    },
    { 
      type: 'radio', 
      field: 'restricao_cpf', 
      label: '8. Você possui restrições no CPF atualmente?',
      description: '(Importante para operação bancária e contrato social)',
      options: ['Não', 'Sim (mas estou resolvendo)', 'Prefiro não responder agora']
    },
    { 
      type: 'radio', 
      field: 'disponivel_contrato', 
      label: '9. Em caso de sociedade, você estaria disponível para entrar com o seu nome no contrato social (CNPJ)?',
      options: ['Sim', 'Não', 'Depende do modelo da sociedade']
    },
    { 
      type: 'radio', 
      field: 'tem_experiencia', 
      label: '10. Você já teve algum tipo de experiência com gestão, vendas ou administração?',
      options: ['Sim', 'Não'],
      hasSubQuestion: true,
      subField: 'descricao_experiencia',
      subLabel: 'Se sim, descreva brevemente:'
    },
    { type: 'text', field: 'motivacao', label: '11. O que te motiva a querer se tornar sócio da FC Motos?' },
    { 
      type: 'radio', 
      field: 'perfil_socio', 
      label: '12. Você se considera uma pessoa mais operacional, estratégica ou investidora?',
      options: [
        'Operacional (gosto de estar no dia a dia)',
        'Estratégica (gosto de pensar o crescimento)',
        'Investidora (prefiro investir e acompanhar)'
      ]
    },
    { 
      type: 'radio', 
      field: 'aceita_processos', 
      label: '13. Está disposto a seguir processos, metas e alinhamentos mensais?',
      options: ['Sim', 'Não']
    }
  ];

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- CORREÇÃO AQUI ---
  const handleNext = (valorManual) => {
    // Se o valor vier direto do clique (valorManual), usamos ele. 
    // Se for undefined ou evento de mouse, pegamos do estado.
    const valorParaChecar = (typeof valorManual === 'string') 
      ? valorManual 
      : formData[currentQ.field];

    if (!valorParaChecar && currentQ.field !== 'instagram') {
      alert("Por favor, preencha este campo.");
      return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  // ---------------------

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const apiUrl = 'https://api-fcmotos.t8sftf.easypanel.host/api/candidatos'; 
      await axios.post(apiUrl, formData);
      setEnviado(true);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-fc-orange">Obrigado!</h2>
        <p className="text-gray-300">Seu formulário foi enviado com sucesso.</p>
        <button onClick={() => window.location.reload()} className="text-fc-orange hover:text-white underline">
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
          <span>QUESTÃO {step + 1} DE {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-fc-input rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-fc-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <label className="block text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
            {currentQ.label}
            {currentQ.description && (
              <span className="block text-sm text-gray-500 font-normal mt-2">{currentQ.description}</span>
            )}
          </label>

          {currentQ.type === 'text' && (
            <input
              type="text"
              autoFocus
              className="w-full bg-transparent border-b-2 border-fc-input text-white text-xl py-3 focus:border-fc-orange transition-colors placeholder-gray-600"
              placeholder="Digite sua resposta..."
              value={formData[currentQ.field]}
              onChange={(e) => handleChange(currentQ.field, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
          )}

          {currentQ.type === 'radio' && (
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <div 
                  key={option}
                  onClick={() => {
                    handleChange(currentQ.field, option);
                    // AQUI ESTÁ O TRUQUE: Passamos o 'option' direto pra validar sem esperar o state
                    if(!currentQ.hasSubQuestion) setTimeout(() => handleNext(option), 200);
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-3
                    ${formData[currentQ.field] === option 
                      ? 'border-fc-orange bg-fc-orange/10 text-white' 
                      : 'border-fc-input hover:border-gray-500 text-gray-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${formData[currentQ.field] === option ? 'border-fc-orange' : 'border-gray-500'}`}>
                    {formData[currentQ.field] === option && <div className="w-2.5 h-2.5 bg-fc-orange rounded-full" />}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              ))}
            </div>
          )}

          {currentQ.hasSubQuestion && formData[currentQ.field] === 'Sim' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-800"
            >
              <label className="block text-gray-400 mb-2">{currentQ.subLabel}</label>
              <input
                type="text"
                autoFocus
                className="w-full bg-fc-input rounded p-3 text-white focus:ring-1 focus:ring-fc-orange"
                value={formData[currentQ.subField] || ''}
                onChange={(e) => handleChange(currentQ.subField, e.target.value)}
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-12 pt-6 border-t border-gray-800/50">
        {step > 0 && (
          <button 
            onClick={handleBack}
            className="px-6 py-3 rounded text-gray-400 hover:text-white transition-colors"
          >
            Voltar
          </button>
        )}
        
        <button 
          onClick={() => handleNext()}
          disabled={loading}
          className="ml-auto bg-fc-orange hover:bg-fc-orange-hover text-white font-bold py-3 px-8 rounded transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] flex items-center gap-2"
        >
          {loading ? 'Enviando...' : (step === questions.length - 1 ? 'Finalizar' : 'Próximo')}
          {!loading && step < questions.length - 1 && <span>→</span>}
        </button>
      </div>
    </div>
  );
}