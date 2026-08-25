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

    // Save to Supabase public.profiles
    await ubbSupabase.upsertProfile(updatedProfile);

    setUserProfile(updatedProfile);
    setIsSaving(false);
    if (onContinue) onContinue();
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#14282B] via-[#1E3A3D] to-[#3A5F4B] text-white flex flex-col justify-between p-5 select-none overflow-y-auto">
      {/* Header */}
      <div className="pt-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#E3A06F]/20 border border-[#E3A06F]/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Shield className="w-6 h-6 text-[#E3A06F]" />
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#E3A06F] block mb-1">
          {t.screen2.privacyPill}
        </span>
        <h2 className="font-fraunces text-xl font-bold text-white leading-tight mb-1.5">
          {t.screen2.title}
        </h2>
        <p className="text-xs text-[#C3D2CB] leading-relaxed max-w-[280px] mx-auto">
          {t.screen2.subtitle}
        </p>
      </div>

      {/* Main Card: Ubb ID Badge + Optional PIN */}
      <div className="bg-black/30 border border-white/15 rounded-2xl p-4 my-auto space-y-4 shadow-xl">
        {/* Generated ID Box */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#E3A06F] mb-1.5">
            <span>Private Ubb Identifier</span>
            <button
              onClick={handleRegenerate}
              className="text-[#E3A06F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Re-roll
            </button>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#4E7C63] flex items-center justify-center text-xs">
                🌱
              </div>
              <span className="font-mono font-bold text-base tracking-wider text-white">
                {ubbId}
              </span>
            </div>

            <button
              onClick={handleCopyId}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer transition-all flex items-center gap-1 text-[10px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <span className="text-[10px] text-[#A3D1B9] mt-1.5 block font-mono">
            {t.screen2.saveNotice}
          </span>
        </div>

        {/* Optional PIN Input */}
        <div>
          <label className="font-mono text-[10px] text-[#D6E2DC] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#E3A06F]" />
            <span>{t.screen2.pinLabel}</span>
          </label>
          <div className="relative">
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder={t.screen2.pinPlaceholder}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-center text-sm font-mono tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-[#E3A06F]"
            />
            <div className="absolute right-3 top-2.5 text-white/40">
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
          className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{t.screen2.continueBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center font-mono text-[9px] text-[#8FA69C] leading-snug">
          {t.screen2.deleteDataNote}
        </div>
      </div>
    </div>
  );
}
