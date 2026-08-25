import React, { useState } from 'react';
import { ArrowLeft, AlertOctagon, PhoneCall, ShieldAlert, HeartHandshake, ChevronRight } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen06SafetyCheck({
  checkInData,
  onProceedToGuidance,
  onTriggerCrisis,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [selectedSafetyOption, setSelectedSafetyOption] = useState(null);
  const [showUrgentModal, setShowUrgentModal] = useState(false);

  const handleSelectOption = (optKey) => {
    setSelectedSafetyOption(optKey);
    if (optKey === 'yes' || optKey === 'notSure') {
      setShowUrgentModal(true);
    } else {
      setShowUrgentModal(false);
    }
  };

  const handleProceed = () => {
    if (!selectedSafetyOption) return;

    if (selectedSafetyOption === 'yes' || selectedSafetyOption === 'notSure') {
      setShowUrgentModal(true);
      return;
    }

    onProceedToGuidance({
      ...checkInData,
      safetyAnswer: selectedSafetyOption
    });
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#B84C4C] font-bold">
              Step 2 · Safety Assessment
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen6.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Question & Choices */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4 flex flex-col justify-center">
        <div className="bg-[#FFFBFB] border border-red-200 rounded-2xl p-4 space-y-2 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h3 className="font-fraunces font-bold text-base text-[#14282B] leading-snug">
            {t.screen6.question}
          </h3>
          <p className="text-[11px] text-[#5B6E67] leading-relaxed">
            {t.screen6.subtitle}
          </p>
        </div>

        {/* Safety Options */}
        <div className="space-y-2">
          <button
            onClick={() => handleSelectOption('yes')}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'yes'
                ? 'border-red-500 bg-red-50 text-red-900 font-bold ring-2 ring-red-400'
                : 'border-red-200 bg-red-50/50 hover:bg-red-50 text-red-800'
            }`}
          >
            <span className="text-xs font-semibold">{t.screen6.options.yes}</span>
            <span className="text-sm">🚨</span>
          </button>

          <button
            onClick={() => handleSelectOption('no')}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'no'
                ? 'border-[#3A5F4B] bg-[#3A5F4B]/15 text-[#14282B] font-bold ring-2 ring-[#3A5F4B]'
                : 'border-[#D9E2DC] bg-[#F2F6F3]/60 hover:bg-[#F2F6F3] text-[#14282B]'
            }`}
          >
            <span className="text-xs">{t.screen6.options.no}</span>
            <span className="text-sm">✓</span>
          </button>

          <button
            onClick={() => handleSelectOption('notSure')}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'notSure'
                ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-400'
                : 'border-[#D9E2DC] bg-[#F2F6F3]/60 hover:bg-[#F2F6F3] text-[#14282B]'
            }`}
          >
            <span className="text-xs">{t.screen6.options.notSure}</span>
            <span className="text-sm">💬</span>
          </button>

          <button
            onClick={() => handleSelectOption('preferNotToAnswer')}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'preferNotToAnswer'
                ? 'border-slate-400 bg-slate-100 text-slate-900 font-bold'
                : 'border-[#D9E2DC] bg-[#F2F6F3]/40 hover:bg-[#F2F6F3] text-[#5B6E67]'
            }`}
          >
            <span className="text-xs">{t.screen6.options.preferNotToAnswer}</span>
            <span className="text-sm">🔒</span>
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#D9E2DC] bg-white">
        <button
          onClick={handleProceed}
          disabled={!selectedSafetyOption}
          className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] disabled:opacity-40 text-[#241208] font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.common.continue}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ================= URGENT HUMAN CRISIS MODAL ================= */}
      {showUrgentModal && (
        <div className="absolute inset-0 z-50 bg-[#7A2E2E]/95 backdrop-blur-md text-white p-5 flex flex-col justify-between overflow-y-auto animate-fadeIn select-none">
          <div className="space-y-3.5 pt-2">
            <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-red-200 font-bold block">
                Immediate Human Protocol
              </span>
              <h3 className="font-fraunces text-xl font-bold text-white">
                {t.screen6.urgentTitle}
              </h3>
              <p className="text-xs text-red-100 leading-relaxed max-w-xs mx-auto">
                {t.screen6.urgentSub}
              </p>
            </div>

            {/* Configurable Campus Crisis Numbers */}
            <div className="space-y-2 pt-1">
              {t.screen6.urgentContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-white/20 rounded-2xl p-3 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <b className="text-xs text-white block truncate">{contact.name}</b>
                    <span className="font-mono text-[11px] text-[#E3A06F] font-bold block">{contact.number}</span>
                    <span className="text-[9.5px] text-red-200 block truncate">{contact.note}</span>
                  </div>
                  <a
                    href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Non-AI Clinical Substitute Disclaimer */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-[10px] text-red-200 leading-snug">
              {t.screen6.safetyDisclaimer}
            </div>
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => onProceedToGuidance({ ...checkInData, safetyAnswer: 'escalated_urgent', forceLevel: 3 })}
              className="w-full py-2.5 rounded-full bg-white text-red-900 font-bold text-xs cursor-pointer hover:bg-slate-100 shadow-md"
            >
              Book Earliest Licensed Counsellor →
            </button>
            <button
              onClick={() => setShowUrgentModal(false)}
              className="w-full py-2 text-xs text-white/70 hover:text-white cursor-pointer text-center font-mono"
            >
              Close Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
