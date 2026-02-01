import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import React from 'react';

const INSTAGRAM_URL = "https://www.instagram.com/fabianoqs/"; 

export default function Formulario() {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('form_fcmotos_step');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [redirecting, setRedirecting] = useState(false); 

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('form_fcmotos_data');
    return savedData ? JSON.parse(savedData) : {
        nome: '',
        whatsapp: '', // Novo campo
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
        perfil_socio: '',
        aceita_processos: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('form_fcmotos_step', step);
    localStorage.setItem('form_fcmotos_data', JSON.stringify(formData));
  }, [step, formData]);

  // --- LISTA DE PERGUNTAS ATUALIZADA ---
  const questions = [
    { type: 'text', field: 'nome', label: '1. Nome completo:' },
    { type: 'text', field: 'whatsapp', label: '2. WhatsApp com DDD para contato:', placeholder: '(XX) 9XXXX-XXXX' },
    { type: 'text', field: 'cidade_bairro', label: '3. Estado e cidade onde mora atualmente:' },
    { type: 'text', field: 'idade', label: '4. Idade:' },
    { type: 'text', field: 'instagram', label: '5. Qual o seu Instagram pessoal (caso tenha)?' },
    { 
      type: 'radio', 
      field: 'tem_outros_negocios', 
      label: '6. Você possui outro(s) negócio(s) atualmente?',
      options: ['Sim', 'Não'],
      hasSubQuestion: true,
      subField: 'quais_negocios',
      subLabel: 'Se sim, qual(is)?'
    },
    { 
      type: 'radio', 
      field: 'atuacao_negocio', 
      label: '7. Você pretende atuar diretamente no dia a dia do negócio?',
      options: ['Sim, estarei presente diariamente', 'Apenas de forma parcial', 'Apenas como investidor']
    },
    { 
      type: 'radio', 
      field: 'valor_investimento', 
      label: '8. Para se tornar sócio e abrir uma nova unidade da FC Motos, o investimento inicial é a partir de R$ 350 mil. Qual faixa de valor você tem disponível hoje para investir?',
      options: [
        'Acima de R$ 350 mil', 
        'Acima de R$ 500 mil', 
        'Acima de R$ 1 milhão', 
        'Ainda não tenho esse valor, mas desejo me preparar para investir no futuro'
      ]
    },
    { 
      type: 'radio', 
      field: 'restricao_cpf', 
      label: '9. Você possui restrições no CPF atualmente (como nome no SPC/Serasa)?',
      description: 'Essa pergunta é importante pois sócios precisam estar em conformidade para operação bancária e registro em contrato social.',
      options: ['Não', 'Sim (mas estou resolvendo)', 'Prefiro não responder agora']
    },
    { 
      type: 'radio', 
      field: 'disponivel_contrato', 
      label: '10. Em caso de sociedade, você estaria disponível para entrar com o seu nome no contrato social (CNPJ)?',
      options: ['Sim', 'Não', 'Depende do modelo da sociedade']
    },
    { 
      type: 'radio', 
      field: 'tem_experiencia', 
      label: '11. Você já teve algum tipo de experiência com gestão, vendas ou administração?',
      options: ['Sim', 'Não'],
      hasSubQuestion: true,
      subField: 'descricao_experiencia',
      subLabel: 'Se sim, descreva brevemente:'
    },
    { 
      type: 'radio', 
      field: 'perfil_socio', 
      label: '12. Você se considera uma pessoa mais operacional, estratégica ou investidora?',
      options: [
        'Operacional (gosto de estar no dia a dia, resolvendo coisas)',
        'Estratégica (gosto de pensar o crescimento e direcionar o time)',
        'Investidora (prefiro investir e acompanhar resultados)'
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
  const progress = (step / (questions.length - 1)) * 100;

  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        window.location.href = INSTAGRAM_URL;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [redirecting]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = (valorManual) => {
    const valorParaChecar = (typeof valorManual === 'string') 
      ? valorManual 
      : formData[currentQ.field];

    if (!valorParaChecar && currentQ.field !== 'instagram' && currentQ.field !== 'whatsapp') {
      alert("Por favor, preencha este campo.");
      return;
    }
    // Validação básica se for whatsapp (opcional mas recomendada)
    if (currentQ.field === 'whatsapp' && valorParaChecar.length < 8) {
        alert("Por favor, digite um número válido.");
        return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/candidatos`; 
      await axios.post(apiUrl, formData);
      
      localStorage.removeItem('form_fcmotos_step');
      localStorage.removeItem('form_fcmotos_data');
      
      setEnviado(true);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // TELA DE REDIRECIONAMENTO E SUCESSO (CÓDIGO IGUAL AO ANTERIOR, SÓ COPIEI A ESTRUTURA)
  if (redirecting) {
    return (
       <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in py-12 min-h-[50vh]">
        {/* ... (SVG do Instagram igual ao anterior) ... */}
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="instagramGradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f09433" />
                <stop offset="0.25" stopColor="#e6683c" />
                <stop offset="0.5" stopColor="#dc2743" />
                <stop offset="0.75" stopColor="#cc2366" />
                <stop offset="1" stopColor="#bc1888" />
              </linearGradient>
            </defs>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" fill="url(#instagramGradient)"/>
            <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" fill="url(#instagramGradient)"/>
            <path d="M18.406 8.415a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z" fill="url(#instagramGradient)"/>
          </svg>
        </div>
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Redirecionando...</h2>
        </div>
      </div>
    );
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in py-12">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Obrigado por preencher.</h2>
          <h3 className="text-xl md:text-2xl font-bold text-white">Seu perfil está sendo analisado.</h3>
        </div>
        <button onClick={() => setRedirecting(true)} className="bg-fc-orange hover:bg-fc-orange-hover text-white font-bold py-3 px-16 rounded transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] uppercase tracking-wide">
          Finalizar
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
          <Motion.div 
            className="h-full bg-fc-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <Motion.div
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
              className="w-full bg-transparent border-b-2 border-fc-input text-white text-xl py-3 focus:border-fc-orange transition-colors placeholder-gray-600 caret-white outline-none"
              placeholder={currentQ.placeholder || "Digite sua resposta..."}
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
                  onClick={() => handleChange(currentQ.field, option)}
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
            <Motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-800"
            >
              <label className="block text-gray-400 mb-2">{currentQ.subLabel}</label>
              <input
                type="text"
                autoFocus
                className="w-full bg-fc-input rounded p-3 text-white focus:ring-1 focus:ring-fc-orange caret-white outline-none"
                value={formData[currentQ.subField] || ''}
                onChange={(e) => handleChange(currentQ.subField, e.target.value)}
              />
            </Motion.div>
          )}
        </Motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-12 pt-6 border-t border-gray-800/50">
        {step > 0 && (
          <button onClick={handleBack} className="px-6 py-3 rounded text-gray-400 hover:text-white transition-colors">Voltar</button>
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