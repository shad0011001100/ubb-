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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              AI Support-Level Routing
            </div>
            <h2 className="font-fraunces text-lg font-bold text-[#1a1d14]">
              {t.screen7.guidanceTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Non-Diagnostic</span>
        </div>
      </div>

      {/* Main Guidance Cards */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* Synthesis Banner */}
        <div className="bg-[#526140] text-white rounded-3xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-[#ffddb3] font-mono text-[9.5px] uppercase tracking-wider font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check-in Synthesis</span>
          </div>
          <p className="text-xs text-[#f9ffeb] leading-relaxed">
            {t.screen7.guidanceSub} <b>{t.screen7.levels[`level${suggestedLevel}Title`]}</b>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="bg-white/15 text-white font-mono text-[9.5px] px-2.5 py-0.5 rounded-full">
              Mood: {checkInData?.emoji} {checkInData?.label}
            </span>
            <span className="bg-white/15 text-white font-mono text-[9.5px] px-2.5 py-0.5 rounded-full">
              Intensity: {checkInData?.intensity || 'Moderate'}
            </span>
          </div>
        </div>

        {/* 3 Level Cards */}
        <div className="space-y-2.5">
          {/* Level 1 Card */}
          <div
            onClick={() => onSelectLevel(1)}
            className={`rounded-3xl p-4 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              suggestedLevel === 1
                ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#526140]/15 group-hover:bg-[#526140]/25 flex items-center justify-center flex-shrink-0 text-[#526140]">
              <Wind className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen7.levels.level1Title}</b>
                {suggestedLevel === 1 && (
                  <span className="font-mono text-[8.5px] bg-[#526140] text-white px-2 py-0.2 rounded-full font-bold">
                    Suggested
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                {t.screen7.levels.level1Desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140]" />
          </div>

          {/* Level 2 Card */}
          <div
            onClick={() => onSelectLevel(2)}
            className={`rounded-3xl p-4 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              suggestedLevel === 2
                ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#815505]/15 group-hover:bg-[#815505]/25 flex items-center justify-center flex-shrink-0 text-[#815505]">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen7.levels.level2Title}</b>
                {suggestedLevel === 2 && (
                  <span className="font-mono text-[8.5px] bg-[#526140] text-white px-2 py-0.2 rounded-full font-bold">
                    Suggested
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                {t.screen7.levels.level2Desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140]" />
          </div>

          {/* Level 3 Card */}
          <div
            onClick={() => onSelectLevel(3)}
            className={`rounded-3xl p-4 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              suggestedLevel === 3
                ? 'border-2 border-red-500 bg-red-50/70 shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0 text-red-700">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen7.levels.level3Title}</b>
                {suggestedLevel === 3 && (
                  <span className="font-mono text-[8.5px] bg-red-600 text-white px-2 py-0.2 rounded-full font-bold">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                {t.screen7.levels.level3Desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-red-700" />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#c5c8bc]/50 bg-[#f9fbeb]">
        <button
          onClick={() => onSelectLevel(suggestedLevel)}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.screen7.exploreBtn}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
