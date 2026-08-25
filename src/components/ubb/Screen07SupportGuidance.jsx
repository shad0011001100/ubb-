import React from 'react';
import { ArrowLeft, Sparkles, Wind, Users, CalendarCheck, ChevronRight, ShieldCheck } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen07SupportGuidance({
  checkInData,
  onSelectLevel,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  // Compute recommended support level based non-diagnostically on self-reported mood, intensity, and safety
  const computeLevel = () => {
    if (checkInData?.forceLevel) return checkInData.forceLevel;
    if (checkInData?.safetyAnswer === 'yes' || checkInData?.safetyAnswer === 'notSure' || checkInData?.safetyAnswer === 'escalated_urgent') {
      return 3;
    }
    if (checkInData?.intensity === 'very_strong' || checkInData?.moodId === 'very_low') {
      return 3;
    }
    if (checkInData?.intensity === 'strong' || checkInData?.moodId === 'anxious' || checkInData?.moodId === 'overwhelmed') {
      return 2;
    }
    return 1;
  };

  const suggestedLevel = computeLevel();

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] font-bold">
              AI Support-Level Routing
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen7.guidanceTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Non-Diagnostic</span>
        </div>
      </div>

      {/* Main Guidance Cards */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* Synthesis Banner */}
        <div className="bg-[#14282B] text-white rounded-2xl p-4 shadow-sm border border-[#1E3A3D]">
          <div className="flex items-center gap-1.5 text-[#E3A06F] font-mono text-[9.5px] uppercase tracking-wider font-bold mb-1">
            <Sparkles className="w-3 h-3 text-[#E3A06F]" />
            <span>Check-in Synthesis</span>
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed">
            {t.screen7.guidanceSub} <b>{t.screen7.levels[`level${suggestedLevel}Title`]}</b>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="bg-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded-md">
              Mood: {checkInData?.emoji} {checkInData?.label}
            </span>
            <span className="bg-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded-md">
              Intensity: {checkInData?.intensity || 'Moderate'}
            </span>
          </div>
        </div>

        {/* 3 Level Cards (Clickable) */}
        <div className="space-y-2.5">
          {/* Level 1 Card */}
          <div
            onClick={() => onSelectLevel(1)}
            className={`bg-white border rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              suggestedLevel === 1
                ? 'border-[#E3A06F] ring-2 ring-[#E3A06F]/50 bg-gradient-to-r from-[#FFFBF7] to-white'
                : 'border-[#D9E2DC] hover:border-[#4E7C63]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#4E7C63]/12 group-hover:bg-[#4E7C63]/20 flex items-center justify-center flex-shrink-0 text-[#4E7C63]">
              <Wind className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen7.levels.level1Title}</b>
                {suggestedLevel === 1 && (
                  <span className="font-mono text-[8.5px] bg-[#E3A06F] text-[#241208] px-1.5 py-0.2 rounded font-bold">
                    Suggested
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                {t.screen7.levels.level1Desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* Level 2 Card */}
          <div
            onClick={() => onSelectLevel(2)}
            className={`bg-white border rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              suggestedLevel === 2
                ? 'border-[#E3A06F] ring-2 ring-[#E3A06F]/50 bg-gradient-to-r from-[#FFFBF7] to-white'
                : 'border-[#D9E2DC] hover:border-[#4E7C63]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#E3A06F]/15 group-hover:bg-[#E3A06F]/25 flex items-center justify-center flex-shrink-0 text-[#C9814F]">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen7.levels.level2Title}</b>
                {suggestedLevel === 2 && (
                  <span className="font-mono text-[8.5px] bg-[#E3A06F] text-[#241208] px-1.5 py-0.2 rounded font-bold">
                    Suggested
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                {t.screen7.levels.level2Desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* Level 3 Card */}
          <div
            onClick={() => onSelectLevel(3)}
            className={`bg-white border rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              suggestedLevel === 3
                ? 'border-red-400 ring-2 ring-red-400/50 bg-gradient-to-r from-red-50/50 to-white'
                : 'border-[#D9E2DC] hover:border-[#3A5F4B]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#3A5F4B]/10 group-hover:bg-[#3A5F4B]/20 flex items-center justify-center flex-shrink-0 text-[#3A5F4B]">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen7.levels.level3Title}</b>
                {suggestedLevel === 3 && (
                  <span className="font-mono text-[8.5px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                {t.screen7.levels.level3Desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#D9E2DC] bg-white">
        <button
          onClick={() => onSelectLevel(suggestedLevel)}
          className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.screen7.exploreBtn}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
