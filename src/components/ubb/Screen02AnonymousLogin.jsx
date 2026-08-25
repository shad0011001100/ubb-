import React, { useState, useEffect } from 'react';
import { Shield, KeyRound, Copy, Check, ArrowRight, RefreshCw, Lock } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';

const generateUbbId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let middle = '';
  for (let i = 0; i < 4; i++) {
    middle += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const end = Math.floor(10 + Math.random() * 90);
  return `UBB-${middle}-${end}`;
};

export function Screen02AnonymousLogin({
  userProfile,
  setUserProfile,
  onContinue,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  const [ubbId, setUbbId] = useState(userProfile?.anonymous_tag || userProfile?.anonymousId || generateUbbId());
  const [pin, setPin] = useState(userProfile?.pin || '');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!userProfile?.anonymous_tag && !userProfile?.anonymousId) {
      const newId = generateUbbId();
      setUbbId(newId);
    }
  }, [userProfile]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(ubbId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setUbbId(generateUbbId());
  };

  const handleProceed = async () => {
    setIsSaving(true);
    const updatedProfile = {
      ...userProfile,
      id: userProfile?.id || 'anon-' + ubbId,
      anonymous_tag: ubbId,
      anonymousId: ubbId,
      pin: pin.trim() || null,
      selected_language: selectedLanguage,
      language: selectedLanguage,
      current_streak: userProfile?.current_streak || 1
    };

    await ubbSupabase.upsertProfile(updatedProfile);

    setUserProfile(updatedProfile);
    setIsSaving(false);
    if (onContinue) onContinue();
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between p-5 select-none overflow-y-auto font-sans">
      {/* Header */}
      <div className="pt-2 text-center">
        <div className="w-14 h-14 rounded-3xl bg-[#6a7a56]/15 border border-[#526140]/30 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <Shield className="w-7 h-7 text-[#526140]" />
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#815505] font-bold block mb-1">
          {t.screen2.privacyPill}
        </span>
        <h2 className="font-fraunces text-2xl font-bold text-[#1a1d14] leading-tight mb-1.5">
          {t.screen2.title}
        </h2>
        <p className="text-xs text-[#5e5c52] leading-relaxed max-w-[280px] mx-auto">
          {t.screen2.subtitle}
        </p>
      </div>

      {/* Main Card: Ubb ID Badge + Optional PIN */}
      <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-5 my-auto space-y-4 shadow-sm">
        {/* Generated ID Box */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#526140] font-bold mb-1.5">
            <span>Private Ubb Identifier</span>
            <button
              onClick={handleRegenerate}
              className="text-[#815505] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Re-roll
            </button>
          </div>

          <div className="bg-white border border-[#c5c8bc] rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#526140] text-white flex items-center justify-center text-xs">
                🌱
              </div>
              <span className="font-mono font-bold text-lg tracking-wider text-[#1a1d14]">
                {ubbId}
              </span>
            </div>

            <button
              onClick={handleCopyId}
              className="p-1.5 rounded-xl bg-[#edefe0] hover:bg-[#e8e9db] text-[#1a1d14] cursor-pointer transition-all flex items-center gap-1 text-[11px] font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#5e5c52]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <span className="text-[10.5px] text-[#5e5c52] mt-2 block leading-snug">
            {t.screen2.saveNotice}
          </span>
        </div>

        {/* Optional PIN Input */}
        <div>
          <label className="font-mono text-[10px] text-[#5e5c52] uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#815505]" />
            <span>{t.screen2.pinLabel}</span>
          </label>
          <div className="relative">
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder={t.screen2.pinPlaceholder}
              className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2.5 text-center text-sm font-mono tracking-widest text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
            />
            <div className="absolute right-3.5 top-3 text-[#75786e]">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 space-y-2.5">
        <button
          onClick={handleProceed}
          disabled={isSaving}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{t.screen2.continueBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center font-mono text-[9px] text-[#75786e] leading-snug">
          {t.screen2.deleteDataNote}
        </div>
      </div>
    </div>
  );
}
