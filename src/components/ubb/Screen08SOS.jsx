import React, { useState } from 'react';
import { PhoneCall, Shield, Heart, Check, ArrowLeft, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';
import { getTranslation } from '../../services/translations';

const LOCAL_DIALERS = [
  {
    name: "Tele-MANAS (Govt of India)",
    number: "14416",
    tollFree: true,
    languages: "20+ Languages · 24x7 (मराठी, हिंदी, English)",
    category: "Official Govt Mental Health"
  },
  {
    name: "KIRAN National Helpline",
    number: "1800-599-0019",
    tollFree: true,
    languages: "Hindi, English & 11 Regional",
    category: "Ministry of Social Justice"
  },
  {
    name: "Maitri Crisis Line",
    number: "022-25563291",
    tollFree: false,
    languages: "Marathi, Hindi, English",
    category: "Suicide Prevention NGO"
  },
  {
    name: "Vandrevala Foundation",
    number: "+91 9999 666 555",
    tollFree: true,
    languages: "24x7 Free Clinical Support",
    category: "Emergency Counselor Hotline"
  }
];

export function Screen08SOS({
  userProfile,
  onClose,
  triggerReason = 'MANUAL_SOS_TAP'
}) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const [activeCallModal, setActiveCallModal] = useState(null);
  const [smsSentStatus, setSmsSentStatus] = useState(null);
  const [isAlertingContact, setIsAlertingContact] = useState(false);

  const contactNumber = userProfile?.encrypted_break_glass_contact || userProfile?.breakGlassContact || '+91 98765 43210';

  const handleDial = (dialer) => {
    setActiveCallModal(dialer);
  };

  const handleTriggerBreakGlassSMS = async () => {
    setIsAlertingContact(true);
    const res = await api.triggerBreakGlassSOS({
      anonymousId: userProfile?.anonymous_tag || userProfile?.anonymousId || 'Sprout_042',
      breakGlassPhone: contactNumber,
      triggerReason,
      localDialerSelected: "Tele-MANAS 14416"
    });

    setIsAlertingContact(false);
    if (res && res.success) {
      setSmsSentStatus({
        success: true,
        message: t.sos.smsSentSuccess,
        recipient: contactNumber.replace(/.(?=.{4})/g, '*')
      });
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#7A2E2E] via-[#3D1414] to-[#14282B] text-white flex flex-col justify-between p-5 select-none overflow-y-auto relative">
      {/* Top Dismiss Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#E3C8C8] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          {t.sos.headerSub}
        </div>
        <button
          onClick={onClose}
          className="text-xs text-white/60 hover:text-white cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Main Crisis Body */}
      <div className="space-y-4 my-auto py-2">
        <div className="text-center space-y-1">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-red-300 font-semibold block">
            {t.sos.headerTitle}
          </span>
          <h2 className="font-fraunces text-2xl font-bold text-white leading-tight">
            {userLang === 'mr' ? 'तुम्ही एकटे नाही आहात.' : userLang === 'hi' ? 'आप अकेले नहीं हैं।' : 'You are not alone.'}
          </h2>
          <p className="text-xs text-[#E8D4D4] leading-relaxed max-w-xs mx-auto">
            {t.sos.urgentBanner}
          </p>
        </div>

        {/* 1-Tap Helplines List */}
        <div className="space-y-2">
          {LOCAL_DIALERS.map((dialer, idx) => (
            <div
              key={idx}
              className="bg-black/35 border border-white/15 hover:border-red-400/60 rounded-2xl p-3 flex items-center justify-between transition-all"
            >
              <div className="min-w-0 flex-1 mr-2">
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-white truncate">{dialer.name}</b>
                  {dialer.tollFree && (
                    <span className="font-mono text-[8.5px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.2 rounded">
                      {userLang === 'mr' ? 'मोफत' : 'Toll-Free'}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] text-[#E3A06F] font-bold block mt-0.5">
                  {dialer.number}
                </span>
                <span className="text-[9.5px] text-[#D1B8B8] block truncate">
                  {dialer.languages}
                </span>
              </div>

              <button
                onClick={() => handleDial(dialer)}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{userLang === 'mr' ? 'कॉल करा' : 'Call'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Workflow A: Break-Glass Twilio SMS Trigger */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#E3A06F]" />
              {t.sos.breakGlassTitle}
            </span>
            <span className="font-mono text-[8.5px] text-[#A3D1B9]">Twilio / Make.com</span>
          </div>

          <p className="text-[10.5px] text-[#D6E2DC] leading-snug">
            {t.sos.breakGlassDesc.replace('{contact}', contactNumber.replace(/.(?=.{4})/g, '*'))}
          </p>

          {smsSentStatus ? (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-2.5 rounded-xl text-[10.5px] text-emerald-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{smsSentStatus.message}</span>
            </div>
          ) : (
            <button
              onClick={handleTriggerBreakGlassSMS}
              disabled={isAlertingContact}
              className="w-full py-2.5 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isAlertingContact ? 'Sending…' : t.sos.triggerSmsBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2">
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
        >
          {t.sos.closeBtn}
        </button>
      </div>

      {/* Simulated Dialer Call Modal */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14282B] border border-white/20 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F]">
                Connecting via Local Dialer
              </div>
              <h3 className="font-fraunces text-lg font-bold text-white mt-1">
                {activeCallModal.name}
              </h3>
              <div className="font-mono text-xl text-[#E3A06F] font-bold mt-1">
                {activeCallModal.number}
              </div>
              <p className="text-[10px] text-[#C3D2CB] mt-2">
                This is a confidential national helpline. No location or student identity is recorded.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${activeCallModal.number.replace(/[^0-9]/g, '')}`}
                className="w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg block"
              >
                <span>Launch Phone Call</span>
              </a>
              <button
                onClick={() => setActiveCallModal(null)}
                className="w-full py-2 text-xs text-white/60 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
