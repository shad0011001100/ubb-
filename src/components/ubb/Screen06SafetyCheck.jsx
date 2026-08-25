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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none relative font-sans">
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
              Step 2 · Safety Assessment
            </div>
            <h2 className="font-fraunces text-lg font-bold text-[#1a1d14]">
              {t.screen6.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Question & Choices */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4 flex flex-col justify-center">
        <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-5 space-y-2 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <h3 className="font-fraunces font-bold text-base text-[#1a1d14] leading-snug">
            {t.screen6.question}
          </h3>
          <p className="text-xs text-[#5e5c52] leading-relaxed">
            {t.screen6.subtitle}
          </p>
        </div>

        {/* Safety Options */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleSelectOption('yes')}
            className={`w-full text-left p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'yes'
                ? 'border-red-500 bg-red-50 text-red-900 font-bold ring-2 ring-red-400'
                : 'border-red-200 bg-red-50/50 hover:bg-red-50 text-red-800'
            }`}
          >
            <span className="text-xs font-semibold">{t.screen6.options.yes}</span>
            <span className="text-base">🚨</span>
          </button>

          <button
            onClick={() => handleSelectOption('no')}
            className={`w-full text-left p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'no'
                ? 'border-[#526140] bg-[#6a7a56]/15 text-[#1a1d14] font-bold ring-2 ring-[#526140]'
                : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6] text-[#1a1d14]'
            }`}
          >
            <span className="text-xs">{t.screen6.options.no}</span>
            <span className="text-sm font-bold text-[#526140]">✓</span>
          </button>

          <button
            onClick={() => handleSelectOption('notSure')}
            className={`w-full text-left p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'notSure'
                ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-400'
                : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6] text-[#1a1d14]'
            }`}
          >
            <span className="text-xs">{t.screen6.options.notSure}</span>
            <span className="text-base">💬</span>
          </button>

          <button
            onClick={() => handleSelectOption('preferNotToAnswer')}
            className={`w-full text-left p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
              selectedSafetyOption === 'preferNotToAnswer'
                ? 'border-slate-400 bg-slate-100 text-slate-900 font-bold'
                : 'border-[#c5c8bc]/40 bg-white/70 hover:bg-[#f3f5e6] text-[#5e5c52]'
            }`}
          >
            <span className="text-xs">{t.screen6.options.preferNotToAnswer}</span>
            <span className="text-base">🔒</span>
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#c5c8bc]/50 bg-[#f9fbeb]">
        <button
          onClick={handleProceed}
          disabled={!selectedSafetyOption}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.common.continue}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Urgent Crisis Modal */}
      {showUrgentModal && (
        <div className="absolute inset-0 z-50 bg-[#7A2E2E]/95 backdrop-blur-md text-white p-5 flex flex-col justify-between overflow-y-auto animate-fadeIn select-none">
          <div className="space-y-3.5 pt-2">
            <div className="w-14 h-14 rounded-3xl bg-white/20 text-white flex items-center justify-center mx-auto animate-pulse shadow-lg">
              <ShieldAlert className="w-7 h-7" />
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

            <div className="space-y-2 pt-1">
              {t.screen6.urgentContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-white/20 rounded-3xl p-3.5 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <b className="text-xs text-white block truncate">{contact.name}</b>
                    <span className="font-mono text-[11.5px] text-[#fdc16d] font-bold block">{contact.number}</span>
                    <span className="text-[9.5px] text-red-200 block truncate">{contact.note}</span>
                  </div>
                  <a
                    href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                    className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-[10px] text-red-200 leading-snug">
              {t.screen6.safetyDisclaimer}
            </div>
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => onProceedToGuidance({ ...checkInData, safetyAnswer: 'escalated_urgent', forceLevel: 3 })}
              className="w-full py-3 rounded-full bg-white text-red-900 font-bold text-xs cursor-pointer hover:bg-slate-100 shadow-md"
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
