import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  ClipboardList,
  Search,
  ArrowUp,
  Share2,
  Loader2,
  User,
  RefreshCw
} from 'lucide-react';
import { QUESTIONS_DECOUVERTE, QUESTIONS_RS } from './constants';
import { Answers, Question } from './types';

// --- Internal Components ---

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
      <div 
        className="bg-[#FFBE00] h-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(255,190,0,0.5)]" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const PriorityInput: React.FC<{ 
  options: any[]; 
  value: string[]; 
  onSelect: (id: string) => void;
  otherText?: string;
  onOtherTextChange?: (text: string) => void;
}> = ({ options, value, onSelect, otherText, onOtherTextChange }) => {
  return (
    <div className="space-y-4">
      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">
        Cliquez sur les options dans votre ordre d'importance :
      </p>
      <div className="space-y-3">
        {options.map((option) => {
          const priorityIndex = value.indexOf(option.id);
          const isSelected = priorityIndex !== -1;
          
          return (
            <div key={option.id} className="flex flex-col gap-3">
              <button
                onClick={() => onSelect(option.id)}
                className={`
                  group w-full flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-[#FFBE00] bg-[#FFBE00] shadow-[0_10px_30px_rgba(255,190,0,0.15)] scale-[1.01]' 
                    : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}
                `}
              >
                <div className="flex items-center gap-4">
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-[#001D3D] flex items-center justify-center text-[#FFBE00] font-black text-xs">
                      {priorityIndex + 1}
                    </div>
                  )}
                  <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-[#001D3D]' : 'text-slate-300'}`}>
                    {option.label}
                  </span>
                </div>
                {!isSelected && (
                  <div className="w-8 h-8 rounded-xl border-2 border-white/10 bg-white/5 flex items-center justify-center">
                    <ArrowUp className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                )}
              </button>

              {option.hasInput && isSelected && (
                <div className="px-1 animate-in slide-in-from-top-2">
                  <input
                    type="text"
                    autoFocus
                    value={otherText || ''}
                    onChange={(e) => onOtherTextChange?.(e.target.value)}
                    placeholder={option.inputPlaceholder || "Précisez ici..."}
                    className="w-full p-5 rounded-2xl border-2 border-[#FFBE00]/30 focus:border-[#FFBE00] focus:outline-none bg-[#001D3D] text-white font-bold placeholder:text-slate-600 shadow-inner"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {value.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2">
          {value.map((id, index) => (
            <div key={id} className="bg-white/10 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-[10px] font-black text-[#FFBE00]">{index + 1}</span>
              <span className="text-xs font-bold text-slate-300">{options.find(o => o.id === id)?.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ConsumptionInput: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [kwh, setKwh] = useState('');
  const [euro, setEuro] = useState('');
  const RATE = 0.22;

  useEffect(() => {
    if (!value) {
      setKwh('');
      setEuro('');
    }
  }, [value]);

  const handleManualConvert = () => {
    if (kwh && !euro) {
      const num = parseFloat(kwh.replace(',', '.'));
      if (!isNaN(num)) setEuro((num * RATE).toFixed(2));
    } else if (euro && !kwh) {
      const num = parseFloat(euro.replace(',', '.'));
      if (!isNaN(num)) setKwh(Math.round(num / RATE).toString());
    }
  };

  const syncParent = (newKwh: string, newEuro: string) => {
    if (!newKwh && !newEuro) {
      onChange('');
    } else {
      onChange(`${newKwh || '0'} kWh (${newEuro || '0'} €)`);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-6">
        <div className="relative group">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-2 group-focus-within:text-[#FFBE00] transition-colors">
            Consommation annuelle (kWh)
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={kwh}
              onChange={(e) => {
                setKwh(e.target.value);
                syncParent(e.target.value, euro);
              }}
              placeholder="Ex: 4500"
              className="w-full p-6 pr-16 rounded-2xl border-2 border-white/10 focus:border-[#FFBE00] focus:outline-none bg-white/5 text-white font-bold text-xl transition-all shadow-inner"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-xs select-none">kWh</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pb-2">
          <button
            type="button"
            onClick={handleManualConvert}
            disabled={(!!kwh && !!euro) || (!kwh && !euro)}
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all border-2
              ${(!!kwh && !!euro) || (!kwh && !euro)
                ? 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-50'
                : 'bg-[#FFBE00] border-[#FFBE00] text-[#001D3D] shadow-lg hover:scale-110 active:scale-95'}
            `}
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>

        <div className="relative group">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-2 group-focus-within:text-[#FFBE00] transition-colors">
            Budget annuel (€)
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={euro}
              onChange={(e) => {
                setEuro(e.target.value);
                syncParent(kwh, e.target.value);
              }}
              placeholder="Ex: 990"
              className="w-full p-6 pr-16 rounded-2xl border-2 border-white/10 focus:border-[#FFBE00] focus:outline-none bg-white/5 text-white font-bold text-xl transition-all shadow-inner"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-xs select-none">€ / AN</div>
          </div>
        </div>
      </div>

      <div className="px-2 space-y-2">
        {kwh && euro && (
          <p className="text-[10px] font-bold text-[#FFBE00] animate-in slide-in-from-top-1">
            Videz l'un des deux champs pour convertir depuis l'autre.
          </p>
        )}
        <p className="text-[10px] font-bold text-slate-600 italic tracking-wide">
          * Saisissez vos données. Le bouton central permet une estimation basée sur {RATE}€/kWh.
        </p>
      </div>
    </div>
  );
};

const QuestionnaireSelector: React.FC<{ onSelect: (type: 'decouverte' | 'rs') => void }> = ({ onSelect }) => (
  <div className="flex flex-col h-full justify-center py-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="mb-10 text-center lg:text-left">
      <img 
        src="https://www.rhonesolairepro.com/wp-content/uploads/2024/04/logo_rsp.svg" 
        alt="Rhône Solaire Pro" 
        className="h-14 mb-10 mx-auto lg:mx-0 invert brightness-0"
      />
      <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
        Bienvenue chez <br /><span className="text-[#FFBE00]">Rhône Solaire Pro</span>
      </h2>
      <p className="text-xl text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
        Choisissez le parcours que vous souhaitez compléter aujourd'hui.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <button 
        onClick={() => onSelect('decouverte')}
        className="group relative bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#FFBE00] p-10 rounded-[2.5rem] transition-all duration-500 text-left backdrop-blur-md overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFBE00]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
        <Search className="w-14 h-14 text-[#FFBE00] mb-6 group-hover:rotate-12 transition-transform" />
        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Découverte Client</h3>
        <p className="text-slate-400 text-base leading-relaxed font-medium">Étudions ensemble votre projet pour une solution sur mesure.</p>
      </button>

      <button 
        onClick={() => onSelect('rs')}
        className="group relative bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#FFBE00] p-10 rounded-[2.5rem] transition-all duration-500 text-left backdrop-blur-md overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFBE00]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
        <ClipboardList className="w-14 h-14 text-[#FFBE00] mb-6 group-hover:rotate-12 transition-transform" />
        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Enquête Réseaux</h3>
        <p className="text-slate-400 text-base leading-relaxed font-medium">Votre perception de notre présence digitale et de nos conseils.</p>
      </button>
    </div>
  </div>
);

const WelcomeScreen: React.FC<{ onStart: () => void; onBack: () => void; type: 'decouverte' | 'rs' }> = ({ onStart, onBack, type }) => (
  <div className="flex flex-col h-full justify-center py-6 animate-in fade-in slide-in-from-right-8 duration-700">
    <div className="mb-8">
      <img 
        src="https://www.rhonesolairepro.com/wp-content/uploads/2024/04/logo_rsp.svg" 
        alt="Rhône Solaire Pro" 
        className="h-12 mb-10 invert brightness-0"
      />
      <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
        {type === 'rs' ? "Enquête Perception" : "Prêts à briller"} <br /><span className="text-[#FFBE00]">{type === 'rs' ? "des Réseaux" : "ensemble ?"}</span>
      </h2>
      <p className="text-xl text-slate-300 leading-relaxed max-w-md">
        {type === 'rs' 
          ? "Prenez un instant pour nous dire comment vous percevez notre communication sur les réseaux sociaux."
          : "Répondez à cette courte étude personnalisée pour nous permettre de concevoir votre futur projet solaire."}
      </p>
    </div>

    <div className="flex flex-wrap gap-4 mb-12">
      <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FFBE00] rounded-full flex items-center justify-center text-[#001D3D] font-black">{type === 'rs' ? "2'" : "5'"}</div>
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Estimation</span>
      </div>
      <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-sm flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-[#FFBE00]" />
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">100% Utile</span>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        onClick={onStart}
        className="group flex items-center justify-between bg-white text-[#001D3D] hover:bg-[#FFBE00] font-black py-5 px-10 rounded-2xl shadow-2xl transition-all active:scale-95 w-full sm:w-fit"
      >
        <span className="mr-6 text-sm tracking-widest uppercase">Lancer l'enquête</span>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={onBack}
        className="flex items-center justify-center text-slate-400 hover:text-white font-black uppercase text-xs tracking-widest py-5 px-8 transition-all"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        RETOUR AU CHOIX
      </button>
    </div>
  </div>
);

const CompletionScreen: React.FC<{ 
  answers: Answers; 
  questions: Question[]; 
  onReset: () => void;
  type: 'decouverte' | 'rs';
  onSwitchToRS: () => void;
}> = ({ answers, questions, onReset, type, onSwitchToRS }) => {
  return (
    <div className="flex flex-col h-full justify-center items-center text-center animate-in zoom-in duration-700">
      <div className="w-24 h-24 bg-[#FFBE00] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-yellow-500/20 mb-8 transform rotate-3">
        <CheckCircle2 className="text-[#001D3D] w-12 h-12" />
      </div>
      
      <h2 className="text-4xl font-black text-white mb-4">Merci infiniment !</h2>
      <p className="text-slate-300 max-w-sm mb-12 text-lg leading-relaxed">
        Votre contribution est précieuse. Elle nous aide à mieux vous accompagner dans votre transition énergétique.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {type === 'decouverte' && (
          <button 
            onClick={onSwitchToRS}
            className="bg-[#FFBE00]/10 border-2 border-[#FFBE00] text-[#FFBE00] px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 hover:bg-[#FFBE00] hover:text-[#001D3D] transition-all group"
          >
            <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            PARTICIPER À L'ENQUÊTE RÉSEAUX
          </button>
        )}
        <button 
          onClick={onReset}
          className="mt-4 text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors"
        >
          RETOUR À L'ACCUEIL
        </button>
      </div>
    </div>
  );
};

// --- Custom Inputs ---

const ScaleInput: React.FC<{ value: string; onChange: (val: string) => void; options: any[] }> = ({ value, onChange, options }) => {
  const val = parseInt(value) || 3;
  return (
    <div className="w-full py-10 px-4">
      <div className="relative h-3 bg-white/10 rounded-full mb-14">
        <div 
          className="absolute top-0 left-0 h-full bg-[#FFBE00] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,190,0,0.3)]"
          style={{ width: `${((val - 1) / (options.length - 1)) * 100}%` }}
        />
        <input 
          type="range" 
          min="1" 
          max={options.length} 
          step="1"
          value={val}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -top-3 left-0 w-full h-10 opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute -top-3 w-9 h-9 bg-white border-4 border-[#FFBE00] rounded-2xl shadow-2xl transition-all duration-300 pointer-events-none"
          style={{ left: `calc(${((val - 1) / (options.length - 1)) * 100}% - 1.125rem)` }}
        />
      </div>
      <div className="flex justify-between gap-2">
        {options.map((opt) => (
          <button 
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`flex flex-col items-center transition-all ${value === opt.id ? 'scale-110 opacity-100' : 'opacity-40 hover:opacity-70'}`}
          >
            <div className={`w-3 h-3 rounded-full mb-3 ${value === opt.id ? 'bg-[#FFBE00]' : 'bg-white/20'}`} />
            <span className={`text-[10px] font-black uppercase tracking-tighter w-16 text-center leading-tight ${value === opt.id ? 'text-white' : 'text-slate-500'}`}>
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

type FlowState = 'selector' | 'welcome' | 'questions' | 'completed';

export default function App() {
  const [flow, setFlow] = useState<FlowState>('selector');
  const [questionnaireType, setQuestionnaireType] = useState<'decouverte' | 'rs' | null>(null);
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered questions based on previous answers (Conditional Logic)
  const visibleQuestions = useMemo(() => {
    let list = questionnaireType === 'decouverte' ? QUESTIONS_DECOUVERTE : QUESTIONS_RS;
    if (questionnaireType === 'decouverte') {
      const skipStudyDetails = answers['deja_etudes_pv']?.value === 'non';
      if (skipStudyDetails) {
        list = list.filter(q => q.id !== 'etudes_pv_qui' && q.id !== 'etudes_pv_pourquoi_pas_signe');
      }
    }
    return list;
  }, [questionnaireType, answers['deja_etudes_pv']]);

  const currentQuestion = useMemo(() => {
    if (flow === 'questions' && step >= 0 && step < visibleQuestions.length) {
      return visibleQuestions[step];
    }
    return null;
  }, [flow, step, visibleQuestions]);

  const submitToWebhook = async (type: 'decouverte' | 'rs', currentAnswers: Answers, questions: Question[]) => {
    const url = type === 'decouverte' 
      ? 'https://n8n.srv1203276.hstgr.cloud/webhook/decouverte-rsp' 
      : 'https://n8n.srv1203276.hstgr.cloud/webhook/question-rs';
    
    const payload = {
      questionnaire_type: type === 'rs' ? 'Enquête Perception des Réseaux' : 'Découverte Client',
      submitted_at: new Date().toISOString(),
      responses: questions.map(q => {
        const ans = currentAnswers[q.id];
        return {
          id: q.id,
          question: q.text,
          section: q.section,
          answer: Array.isArray(ans?.value) ? ans.value.join(', ') : (ans?.value || 'Non répondu'),
          other_text: ans?.otherText || ''
        };
      })
    };

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Erreur lors de l\'envoi au webhook:', err);
    }
  };

  const handleNext = useCallback(async () => {
    if (!currentQuestion) return;

    const answer = answers[currentQuestion.id];
    if (currentQuestion.required && (!answer || (Array.isArray(answer.value) && answer.value.length === 0) || (typeof answer.value === 'string' && !answer.value.trim()))) {
      setError("Veuillez remplir ce champ.");
      return;
    }
    
    if (currentQuestion.type === 'single') {
        const selectedOption = currentQuestion.options?.find(o => o.id === answer.value);
        if (selectedOption?.hasInput && !answer.otherText?.trim()) {
            setError("Veuillez préciser votre réponse.");
            return;
        }
    } else if (currentQuestion.type === 'multiple' || currentQuestion.type === 'priority') {
        const values = Array.isArray(answer?.value) ? answer.value : [];
        const selectedWithInput = currentQuestion.options?.filter(o => o.hasInput && values.includes(o.id));
        if (selectedWithInput?.length && !answer.otherText?.trim()) {
            setError("Veuillez préciser votre réponse.");
            return;
        }
    }

    setError(null);
    if (step === visibleQuestions.length - 1) {
      setIsSubmitting(true);
      await submitToWebhook(questionnaireType!, answers, visibleQuestions);
      setIsSubmitting(false);
      setFlow('completed');
    } else {
      setStep(prev => prev + 1);
    }
  }, [currentQuestion, answers, step, visibleQuestions, questionnaireType]);

  const handlePrev = useCallback(() => {
    setError(null);
    if (step === 0) {
      setFlow('welcome');
    } else {
      setStep(prev => prev - 1);
    }
  }, [step]);

  const updateAnswer = useCallback((id: string, value: string | string[], otherText?: string) => {
    setAnswers(prev => ({ ...prev, [id]: { value, otherText } }));
    setError(null);
  }, []);

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;
    const current = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'single' || currentQuestion.type === 'scale') {
      updateAnswer(currentQuestion.id, optionId, current?.otherText);
    } else if (currentQuestion.type === 'multiple') {
      const currentValues = Array.isArray(current?.value) ? [...current.value] : [];
      if (currentValues.includes(optionId)) {
        updateAnswer(currentQuestion.id, currentValues.filter(v => v !== optionId), current?.otherText);
      } else {
        updateAnswer(currentQuestion.id, [...currentValues, optionId], current?.otherText);
      }
    } else if (currentQuestion.type === 'priority') {
      const currentValues = Array.isArray(current?.value) ? [...current.value] : [];
      if (currentValues.includes(optionId)) {
        updateAnswer(currentQuestion.id, currentValues.filter(v => v !== optionId), current?.otherText);
      } else {
        updateAnswer(currentQuestion.id, [...currentValues, optionId], current?.otherText);
      }
    }
  };

  const startQuestionnaire = (type: 'decouverte' | 'rs') => {
    setQuestionnaireType(type);
    setFlow('welcome');
    setStep(0);
    setAnswers({});
  };

  const resetFlow = () => {
    setFlow('selector');
    setQuestionnaireType(null);
    setStep(0);
    setAnswers({});
  };

  const switchToRS = () => {
    setQuestionnaireType('rs');
    setStep(0);
    setAnswers({});
    setFlow('welcome');
  };

  return (
    <div className="flex h-screen bg-[#001D3D] overflow-hidden text-slate-100">
      <div className="hidden lg:block lg:w-1/3 h-full relative group">
        <img 
          src="https://www.rhonesolairepro.com/wp-content/uploads/2024/07/Cagnottage.png" 
          alt="Rhône Solaire Pro Team" 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-[#001D3D]/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <img src="https://www.rhonesolairepro.com/wp-content/uploads/2024/04/logo_rsp.svg" alt="RSP" className="h-10 mb-6 invert brightness-0" />
          <h4 className="text-3xl font-black mb-2 tracking-tight">L'énergie d'un groupe,</h4>
          <p className="text-[#FFBE00] font-bold text-lg">la proximité d'un partenaire local.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#001D3D]">
        <main className="flex-grow flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-4xl">
            {flow === 'questions' && (
              <div className="mb-14 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black tracking-widest text-[#FFBE00] uppercase">
                    {currentQuestion?.section}
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                    Question {step + 1} / {visibleQuestions.length}
                  </span>
                </div>
                <ProgressBar current={step + 1} total={visibleQuestions.length} />
              </div>
            )}

            <div className="min-h-[450px] flex flex-col items-center">
              <div className={`w-full ${currentQuestion?.options?.length === 3 && currentQuestion?.layout === 'grid' ? 'max-w-4xl' : 'max-w-2xl'}`}>
                {flow === 'selector' && (
                  <QuestionnaireSelector onSelect={startQuestionnaire} />
                )}

                {flow === 'welcome' && questionnaireType && (
                  <WelcomeScreen onStart={() => setFlow('questions')} onBack={resetFlow} type={questionnaireType} />
                )}

                {flow === 'completed' && questionnaireType && (
                  <CompletionScreen 
                    answers={answers} 
                    questions={visibleQuestions} 
                    onReset={resetFlow} 
                    type={questionnaireType}
                    onSwitchToRS={switchToRS}
                  />
                )}

                {flow === 'questions' && currentQuestion && (
                  <div className="animate-in slide-in-from-right-4 duration-500 flex-grow flex flex-col">
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-12 leading-tight tracking-tight">
                      {currentQuestion.text}
                    </h3>

                    <div className={`flex-grow
                      ${currentQuestion.layout === 'grid' && currentQuestion.type !== 'priority'
                        ? `grid grid-cols-1 ${currentQuestion.options?.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-5` 
                        : 'space-y-4'}
                    `}>
                      {currentQuestion.type === 'priority' ? (
                        <PriorityInput 
                          options={currentQuestion.options || []}
                          value={answers[currentQuestion.id]?.value as string[] || []}
                          onSelect={handleOptionSelect}
                          otherText={answers[currentQuestion.id]?.otherText}
                          onOtherTextChange={(text) => updateAnswer(currentQuestion.id, answers[currentQuestion.id]?.value, text)}
                        />
                      ) : currentQuestion.type === 'scale' ? (
                        <ScaleInput 
                          value={answers[currentQuestion.id]?.value as string || '3'} 
                          onChange={(val) => handleOptionSelect(val)} 
                          options={currentQuestion.options || []} 
                        />
                      ) : currentQuestion.type === 'consumption' ? (
                        <ConsumptionInput 
                          value={answers[currentQuestion.id]?.value as string || ''}
                          onChange={(val) => updateAnswer(currentQuestion.id, val)}
                        />
                      ) : (
                        currentQuestion.options?.map((option) => {
                          const isSelected = currentQuestion.type === 'multiple' 
                            ? (answers[currentQuestion.id]?.value as string[] || []).includes(option.id)
                            : answers[currentQuestion.id]?.value === option.id;

                          if (option.image) {
                            return (
                              <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.id)}
                                className={`
                                  group relative flex flex-col items-center overflow-hidden rounded-[2.5rem] border-4 transition-all duration-500
                                  ${isSelected 
                                    ? 'border-[#FFBE00] bg-white/10 scale-[1.05] shadow-[0_20px_50px_rgba(255,190,0,0.2)]' 
                                    : 'border-white/5 bg-white/5 hover:border-white/20 hover:scale-[1.02]'}
                                `}
                              >
                                <div className="aspect-[160/260] w-full overflow-hidden relative">
                                  <img 
                                    src={option.image} 
                                    alt={option.label}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
                                  />
                                  <div className={`absolute inset-0 bg-gradient-to-t from-[#001D3D] via-transparent to-transparent opacity-80`} />
                                  {isSelected && (
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-[#FFBE00] rounded-2xl flex items-center justify-center shadow-lg animate-in zoom-in">
                                      <CheckCircle2 className="w-6 h-6 text-[#001D3D]" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-6 w-full text-center">
                                  <span className={`text-xl font-black transition-colors ${isSelected ? 'text-[#FFBE00]' : 'text-white'}`}>
                                    {option.label}
                                  </span>
                                </div>
                              </button>
                            );
                          }

                          return (
                            <div key={option.id} className="flex flex-col gap-3">
                              <button
                                onClick={() => handleOptionSelect(option.id)}
                                className={`
                                  group w-full flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all duration-300
                                  ${isSelected 
                                    ? 'border-[#FFBE00] bg-[#FFBE00] shadow-[0_10px_30px_rgba(255,190,0,0.15)] scale-[1.02]' 
                                    : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}
                                `}
                              >
                                <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-[#001D3D]' : 'text-slate-300'}`}>
                                  {option.label}
                                </span>
                                <div className={`
                                  w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all
                                  ${isSelected ? 'bg-[#001D3D] border-[#001D3D]' : 'border-white/10 bg-white/5'}
                                `}>
                                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#FFBE00]" />}
                                </div>
                              </button>

                              {option.hasInput && isSelected && (
                                <div className="px-1 animate-in slide-in-from-top-2">
                                  <input
                                    type="text"
                                    autoFocus
                                    value={answers[currentQuestion.id]?.otherText || ''}
                                    onChange={(e) => updateAnswer(currentQuestion.id, answers[currentQuestion.id]?.value, e.target.value)}
                                    placeholder={option.inputPlaceholder || "Précisez ici..."}
                                    className="w-full p-5 rounded-2xl border-2 border-[#FFBE00]/30 focus:border-[#FFBE00] focus:outline-none bg-[#001D3D] text-white font-bold placeholder:text-slate-600 shadow-inner"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}

                      {currentQuestion.type === 'text' && (
                        <input
                          type="text"
                          autoFocus
                          value={answers[currentQuestion.id]?.value as string || ''}
                          onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
                          placeholder={currentQuestion.placeholder}
                          className="w-full p-7 rounded-2xl border-2 border-white/10 focus:border-[#FFBE00] focus:outline-none bg-white/5 text-white font-bold placeholder:text-slate-600 text-xl shadow-inner transition-all"
                        />
                      )}

                      {currentQuestion.type === 'long-text' && (
                        <textarea
                          rows={5}
                          autoFocus
                          value={answers[currentQuestion.id]?.value as string || ''}
                          onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
                          placeholder={currentQuestion.placeholder}
                          className="w-full p-8 rounded-[2rem] border-2 border-white/10 focus:border-[#FFBE00] focus:outline-none bg-white/5 text-white font-bold placeholder:text-slate-600 text-xl shadow-inner resize-none transition-all"
                        />
                      )}
                    </div>

                    {error && (
                      <div className="flex items-center gap-3 text-[#FFBE00] text-xs font-black uppercase tracking-widest mt-8 animate-pulse">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-14 pt-8 border-t border-white/5">
                      <button
                        onClick={handlePrev}
                        disabled={isSubmitting}
                        className="flex items-center gap-3 text-slate-500 hover:text-white font-black uppercase text-xs tracking-[0.2em] transition-all px-4 py-2 disabled:opacity-0"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        RETOUR
                      </button>

                      <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex items-center gap-4 bg-white text-[#001D3D] hover:bg-[#FFBE00] font-black uppercase text-xs tracking-[0.2em] py-5 px-10 rounded-2xl shadow-2xl transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            {step === visibleQuestions.length - 1 ? 'TERMINER' : 'SUIVANT'}
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <footer className="p-8 text-center text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Rhône Solaire Pro • Innovation Solaire
        </footer>
      </div>
    </div>
  );
}
