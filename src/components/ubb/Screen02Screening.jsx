import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Database } from 'lucide-react';
import { ubbSupabase } from '../../services/supabase';
import { getTranslation } from '../../services/translations';

export function Screen02Screening({ onComplete, screeningResults, setScreeningResults, userProfile }) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(screeningResults.answers || {});

  const questions = t.screening.questions;
  const options = t.screening.options;

  const currentQ = questions[currentIndex];
  const selectedOptionPoints = answers[currentQ.id];

  const handleSelectOption = async (points) => {
    const updatedAnswers = { ...answers, [currentQ.id]: points };
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 150);
    } else {
      const totalScore = Object.values(updatedAnswers).reduce((sum, val) => sum + (val || 0), 0);
      
      let riskTier = 'MODERATE';
      let actionTier = 'peer';
      let recommendationText = userLang === 'mr'
        ? "तुम्ही गेल्या काही दिवसांत ताण व निरुत्साह अनुभवत आहात. AI चॅटबॉटपेक्षा कॉलेजचा ताण समजणाऱ्या समवयस्क मार्गदर्शकाशी बोलल्याने अधिक मदत होईल."
        : userLang === 'hi'
        ? "आप पिछले कुछ दिनों से तनाव महसूस कर रहे हैं। किसी बॉट की तुलना में कॉलेज का माहौल समझने वाले साथी से बात करना अधिक मददगार होगा।"
        : "You've felt loss of interest & exam strain recently. A peer supporter who understands campus life could help more than a chatbot right now.";

      if (totalScore <= 5) {
        riskTier = 'LOW';
        actionTier = 'self_care';
        recommendationText = userLang === 'mr'
          ? "तुमची मनःस्थिती स्थिर आहे. रोजचा श्वसन व्यायाम आणि स्व-काळजी सवय ठेवल्याने मन शांत राहील."
          : "You're holding up well. Exploring daily self-care grounding and mindfulness can keep your resilience strong.";
      } else if (totalScore <= 12) {
        riskTier = 'MODERATE';
        actionTier = 'peer';
      } else {
        riskTier = 'SEVERE';
        actionTier = 'counselor';
        recommendationText = userLang === 'mr'
          ? "तुम्ही खूप मोठा मानसिक भार सहन करत आहात. गोपनीयतेसह थेट परवानाधारक क्लिनिकल काउन्सिलरशी बोलणे अत्यंत आवश्यक आहे."
          : "You've been carrying a heavy cognitive and emotional burden. Connecting directly with a licensed counselor is strongly recommended.";
      }

      const results = {
        answers: updatedAnswers,
        score: totalScore,
        maxScore: questions.length * 3,
        risk_tier: riskTier,
        tier: actionTier,
        recommendationText,
        completedAt: new Date().toISOString()
      };

      const userId = userProfile?.id || (await ubbSupabase.getCurrentUser())?.id;
      if (userId) {
        await ubbSupabase.saveScreeningLog({
          user_id: userId,
          score: totalScore,
          risk_tier: riskTier,
          responses: updatedAnswers
        });
      }

      setScreeningResults(results);
      if (onComplete) onComplete(results);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Screening Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/50">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-1 rounded-full text-[#5B6E67] ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 cursor-pointer'}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#3A5F4B] font-semibold">
            {t.screening.title} · Q{currentIndex + 1}/{questions.length}
          </div>
          <span className="font-mono text-[9px] text-[#5B6E67] bg-[#F2F6F3] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Database className="w-2.5 h-2.5 text-[#4E7C63]" />
            {t.screening.approxTime}
          </span>
        </div>

        {/* Progress Bar / Dots */}
        <div className="flex items-center gap-1.5 mt-3">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx <= currentIndex ? 'bg-[#4E7C63]' : 'bg-[#D9E2DC]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card Body */}
      <div className="flex-1 px-5 py-4 overflow-y-auto flex flex-col justify-center">
        <span className="font-mono text-[10px] text-[#C9814F] uppercase tracking-wider block mb-1">
          {currentQ.category}
        </span>
        <h3 className="font-fraunces text-[17px] font-semibold text-[#14282B] leading-snug mb-5">
          {currentQ.title}
        </h3>

        {/* Options */}
        <div className="space-y-2">
          {options.map((opt) => {
            const isSelected = selectedOptionPoints === opt.points;
            return (
              <button
                key={opt.points}
                onClick={() => handleSelectOption(opt.points)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer active:scale-99 ${
                  isSelected
                    ? 'border-[#4E7C63] bg-[#4E7C63]/10 font-semibold text-[#14282B] shadow-sm ring-1 ring-[#4E7C63]'
                    : 'border-[#D9E2DC] bg-[#F2F6F3]/50 hover:bg-[#F2F6F3] text-[#14282B]/90'
                }`}
              >
                <span className="text-xs">{opt.label}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-[#4E7C63] bg-[#4E7C63]' : 'border-[#D9E2DC] bg-white'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer & Privacy assurance */}
      <div className="p-4 border-t border-[#D9E2DC]/60 bg-[#F2F6F3]/40">
        <div className="flex items-center justify-center gap-1.5 text-[#5B6E67] text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4E7C63]" />
          <span>{t.screening.footerNotice}</span>
        </div>
      </div>
    </div>
  );
}
