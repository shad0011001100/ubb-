import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { getTranslation } from '../../services/translations';

const PROTOTYPE_MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', mr: 'आनंदी', hi: 'खुश', type: 'positive' },
  { id: 'okay', emoji: '😐', label: 'Okay', mr: 'ठीक', hi: 'ठीक ठाक', type: 'neutral' },
  { id: 'sad', emoji: '🙁', label: 'Sad', mr: 'उदास', hi: 'उदास', type: 'concern' },
  { id: 'stressed', emoji: '😰', label: 'Stressed', mr: 'तणावात', hi: 'तनावग्रस्त', type: 'concern' },
  { id: 'numb', emoji: '😶', label: 'Numb', mr: 'काहीच वाटत नाही', hi: 'सुन्न / कुछ नहीं', type: 'concern' }
];

export function Screen04MoodCheckIn({
  onSelectMoodFlow,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  const handleChooseMood = (moodObj) => {
    const checkInData = {
      moodId: moodObj.id,
      emoji: moodObj.emoji,
      label: moodObj[selectedLanguage] || moodObj.label,
      type: moodObj.type,
      intensity: 'moderate',
      customNote: ''
    };

    onSelectMoodFlow(checkInData);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              Before We Start · Step 1/4
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {selectedLanguage === 'mr' ? 'आज कसे वाटतेय?' : selectedLanguage === 'hi' ? 'आज आप कैसा महसूस कर रहे हैं?' : 'How are you feeling today?'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Private</span>
        </div>
      </div>

      {/* 5 Clean Centered Mood Tiles (Matching prototype) */}
      <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center overflow-y-auto space-y-5">
        <p className="text-xs text-[#5e5c52] text-center max-w-[260px] leading-relaxed">
          {selectedLanguage === 'mr' ? 'कोणताही पूर्वग्रह नाही. तुमचा प्रामाणिक अनुभव निवडा:' : selectedLanguage === 'hi' ? 'बिना किसी झिझक के अपनी स्थिति चुनें:' : 'Tap how you feel right now to get personalized recommendations:'}
        </p>

        {/* Prototype 5 Moods Grid */}
        <div className="flex flex-wrap gap-2.5 justify-center max-w-[280px]">
          {PROTOTYPE_MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleChooseMood(m)}
              className="flex flex-col items-center justify-center gap-2 bg-white hover:bg-[#f3f5e6] hover:border-[#526140] border border-[#c5c8bc]/70 rounded-2xl p-4 min-w-[82px] cursor-pointer shadow-2xs transition-all active:scale-95 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {m.emoji}
              </span>
              <span className="text-xs font-semibold text-[#1a1d14] group-hover:text-[#526140]">
                {m[selectedLanguage] || m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Notice Footer */}
      <div className="p-4 border-t border-[#c5c8bc]/40 bg-[#f9fbeb] text-center">
        <span className="font-mono text-[9.5px] text-[#75786e]">
          100% Anonymous · Zero PII Stored · On-Device Processing
        </span>
      </div>
    </div>
  );
}
