import React, { useState } from 'react';
import { ArrowLeft, Check, X, AlertOctagon } from 'lucide-react';
import { api } from '../../services/api';
import { ubbSupabase } from '../../services/supabase';
import { getTranslation } from '../../services/translations';

export function Screen06ConsentGate({
  userProfile,
  peerName = 'Amber_17',
  onAccept,
  onDecline,
  onDeadlockTriggered,
  onNavigate
}) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const [declineCount, setDeclineCount] = useState(0);
  const [isDeadlocked, setIsDeadlocked] = useState(false);
  const [_loading, setLoading] = useState(false);

  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'Sprout_042';

  const handleDeclineClick = async () => {
    setLoading(true);
    const newCount = declineCount + 1;
    setDeclineCount(newCount);

    const userId = userProfile?.id || (await ubbSupabase.getCurrentUser())?.id;
    if (userId) {
      await ubbSupabase.updateSupportSession(userId, {
        consent_refusal_count: newCount,
        status: newCount >= 3 ? 'closed' : 'consent_pending'
      });
    }

    const res = await api.submitConsentResponse({
      anonymousId: anonId,
      response: 'DECLINED'
    });

    setLoading(false);

    if (res.status === 'DEADLOCK_ACTIVATED' || newCount >= 3) {
      setIsDeadlocked(true);
      if (onDeadlockTriggered) onDeadlockTriggered(res);
    } else {
      if (onDecline) onDecline(newCount);
    }
  };

  const handleAcceptClick = async () => {
    setLoading(true);
    const userId = userProfile?.id || (await ubbSupabase.getCurrentUser())?.id;
    if (userId) {
      await ubbSupabase.updateSupportSession(userId, {
        status: 'peer_active',
        consent_refusal_count: 0
      });
    }

    await api.submitConsentResponse({
      anonymousId: anonId,
      response: 'ACCEPTED'
    });
    setLoading(false);
    if (onAccept) onAccept();
  };

  return (
    <div className="h-full bg-[#14282B] text-white flex flex-col justify-between p-5 select-none overflow-y-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F]">
            {t.consentGate.subtitle}
          </div>
          <span className="font-mono text-[8.5px] bg-white/10 px-2 py-0.5 rounded text-[#C3D2CB]">
            Refusal: {declineCount}/3
          </span>
        </div>

        <h3 className="font-fraunces text-lg font-semibold text-white leading-snug mb-2">
          {t.consentGate.title.replace('{name}', peerName)}
        </h3>
        <p className="text-xs text-[#AEBFB8] leading-relaxed mb-4">
          {t.consentGate.privacyNotice}
        </p>
      </div>

      {/* Deadlock State Banner (Workflow E) */}
      {isDeadlocked ? (
        <div className="bg-[#B84C4C]/20 border border-[#B84C4C] rounded-2xl p-4 my-2 text-center space-y-3 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-[#B84C4C] text-white flex items-center justify-center mx-auto">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h4 className="font-fraunces text-base font-semibold text-white">
            {t.consentGate.deadlockTitle}
          </h4>
          <div className="bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-[#F2F6F3] italic leading-relaxed text-left">
            "{t.consentGate.deadlockDesc}"
          </div>
          <button
            onClick={() => onNavigate('self_care')}
            className="w-full py-2.5 rounded-full bg-[#E3A06F] text-[#241208] font-semibold text-xs cursor-pointer shadow-md"
          >
            {t.consentGate.goToSelfCare}
          </button>
        </div>
      ) : (
        /* Standard Itemized Permission Boxes */
        <div className="space-y-3 my-2">
          {/* Transfer Box */}
          <div className="bg-white/5 border border-white/12 rounded-xl p-3.5 space-y-2">
            <div className="font-mono text-[9.5px] text-[#E3A06F] uppercase tracking-wider font-semibold">
              {t.consentGate.transfersTitle.replace('{name}', peerName)}
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#D6E2DC] leading-tight">
              <div className="w-4 h-4 rounded-md bg-[#4E7C63] flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                <Check className="w-3 h-3" />
              </div>
              <span>{t.consentGate.t1.replace('{anonId}', anonId)}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#D6E2DC] leading-tight">
              <div className="w-4 h-4 rounded-md bg-[#4E7C63] flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                <Check className="w-3 h-3" />
              </div>
              <span>{t.consentGate.t2}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#D6E2DC] leading-tight">
              <div className="w-4 h-4 rounded-md bg-[#4E7C63] flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                <Check className="w-3 h-3" />
              </div>
              <span>{t.consentGate.t3}</span>
            </div>
          </div>

          {/* Stays Private Box */}
          <div className="bg-white/5 border border-white/12 rounded-xl p-3.5 space-y-2">
            <div className="font-mono text-[9.5px] text-[#A3D1B9] uppercase tracking-wider font-semibold">
              {t.consentGate.privateTitle}
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#AEBFB8] leading-tight">
              <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-300">
                <X className="w-3 h-3" />
              </div>
              <span>{t.consentGate.p1}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#AEBFB8] leading-tight">
              <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-300">
                <X className="w-3 h-3" />
              </div>
              <span>{t.consentGate.p2}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#AEBFB8] leading-tight">
              <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-300">
                <X className="w-3 h-3" />
              </div>
              <span>{t.consentGate.p3}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isDeadlocked && (
        <div className="pt-2 space-y-2">
          <button
            onClick={handleAcceptClick}
            className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-semibold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{t.consentGate.acceptBtn}</span>
          </button>

          <button
            onClick={handleDeclineClick}
            className="w-full py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-all cursor-pointer"
          >
            {t.consentGate.declineBtn} ({3 - declineCount} chances left)
          </button>
        </div>
      )}
    </div>
  );
}
