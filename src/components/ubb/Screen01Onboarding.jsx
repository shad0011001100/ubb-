import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw, Database } from 'lucide-react';
import { ubbSupabase } from '../../services/supabase';
import { getTranslation } from '../../services/translations';

const RANDOM_SEED_NAMES = [
  'Sprout_042', 'Quiet_Owl_19', 'River_Pebble_88', 'Amber_Leaf_07',
  'Gentle_Wave_33', 'Morning_Dew_51', 'Warm_Cedar_14', 'Solar_Breeze_92'
];

export function Screen01Onboarding({ onComplete, userProfile, setUserProfile }) {
  const [selectedLang, setSelectedLang] = useState(userProfile.selected_language || userProfile.language || 'en');
  const [anonTag, setAnonTag] = useState(userProfile.anonymous_tag || userProfile.anonymousId || 'Sprout_042');
  const [breakGlassContact, setBreakGlassContact] = useState(userProfile.encrypted_break_glass_contact || userProfile.breakGlassContact || '');
  const [authUserId, setAuthUserId] = useState(userProfile.id || null);

  const t = getTranslation(selectedLang);

  useEffect(() => {
    const initAnonAuth = async () => {
      const { user } = await ubbSupabase.signInAnonymously();
      if (user) {
        setAuthUserId(user.id);
        const existingProfile = await ubbSupabase.getProfile(user.id);
        if (existingProfile) {
          if (existingProfile.anonymous_tag) setAnonTag(existingProfile.anonymous_tag);
          if (existingProfile.selected_language) setSelectedLang(existingProfile.selected_language);
          if (existingProfile.encrypted_break_glass_contact) setBreakGlassContact(existingProfile.encrypted_break_glass_contact);
        }
      }
    };
    initAnonAuth();
  }, []);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' }
  ];

  const handleRegenerateId = () => {
    const randomName = RANDOM_SEED_NAMES[Math.floor(Math.random() * RANDOM_SEED_NAMES.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newTag = `${randomName.split('_')[0]}_${randomNum}`;
    setAnonTag(newTag);
  };

  const handleStart = async () => {
    const profilePayload = {
      id: authUserId || 'anon-user-' + Date.now(),
      anonymous_tag: anonTag,
      selected_language: selectedLang,
      current_streak: userProfile.current_streak || 12,
      encrypted_break_glass_contact: breakGlassContact.trim() || null,
      is_shadowbanned: false
    };

    await ubbSupabase.upsertProfile(profilePayload);

    setUserProfile({
      ...userProfile,
      ...profilePayload,
      anonymousId: anonTag,
      language: selectedLang,
      selected_language: selectedLang,
      breakGlassContact: breakGlassContact.trim()
    });

    if (onComplete) onComplete();
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#14282B] via-[#1E3A3D] to-[#3A5F4B] text-white flex flex-col justify-between p-6 text-center select-none overflow-y-auto">
      {/* Top language selector */}
      <div className="pt-3">
        <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang.code);
                setUserProfile(prev => ({ ...prev, language: lang.code, selected_language: lang.code }));
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                selectedLang === lang.code
                  ? 'bg-[#E3A06F] border-[#E3A06F] text-[#241208] font-bold shadow-md scale-105'
                  : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Brandmark Emblem */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-[#E3A06F]/40 flex items-center justify-center shadow-lg shadow-black/20">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-[#E3A06F]">
              <path d="M12 2C7 2 3 6 3 11c0 5 4.5 9 9 11 4.5-2 9-6 9-11 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E3A06F] block mb-1">
          {t.onboarding.tagline}
        </span>
        <h2 className="font-fraunces text-2xl font-semibold leading-tight text-white mb-2">
          {t.onboarding.title}
        </h2>
        <p className="text-xs text-[#C3D2CB] leading-relaxed max-w-[280px] mx-auto mb-4">
          {t.onboarding.subtitle}
        </p>
      </div>

      {/* Identity & Break-glass Setup */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-4 my-2 text-left space-y-3">
        {/* Anonymous ID badge */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] flex items-center justify-between">
            <span>{t.onboarding.anonTagLabel}</span>
            <button
              onClick={handleRegenerateId}
              className="text-[#E3A06F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" /> {t.onboarding.reRoll}
            </button>
          </label>
          <div className="mt-1 flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4E7C63] flex items-center justify-center text-xs font-bold text-white">
                🌱
              </div>
              <span className="font-mono font-medium text-sm text-white">{anonTag}</span>
            </div>
            <span className="text-[10px] text-[#8FA69C] font-mono flex items-center gap-1">
              <Database className="w-3 h-3 text-[#4E7C63]" />
              {t.common.rlsProtected}
            </span>
          </div>
        </div>

        {/* Break-glass voluntary phone */}
        <div>
          <div className="flex items-center justify-between">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#C3D2CB] flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#E3A06F]" />
              {t.onboarding.breakGlassLabel}
            </label>
          </div>
          <p className="text-[10px] text-[#8FA69C] mt-0.5 mb-1.5 leading-snug">
            {t.onboarding.breakGlassDesc}
          </p>
          <div className="relative">
            <input
              type="tel"
              placeholder={t.onboarding.breakGlassPlaceholder}
              value={breakGlassContact}
              onChange={(e) => setBreakGlassContact(e.target.value)}
              className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E3A06F]"
            />
          </div>
        </div>
      </div>

      {/* Action and footer */}
      <div className="pt-2">
        <button
          onClick={handleStart}
          className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-work font-semibold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{t.onboarding.startButton}</span>
        </button>

        <div className="font-mono text-[8.5px] text-[#8FA69C] mt-3 leading-relaxed">
          {t.onboarding.footerNote}
        </div>
      </div>
    </div>
  );
}
