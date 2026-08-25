import React from 'react';
import { UserCheck, Shield, HeartHandshake, Sparkles, Database } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen01LoginSelection({
  selectedLanguage = 'en',
  onSelectLanguage,
  onContinueAsStudent,
  onVolunteerLogin
}) {
  const t = getTranslation(selectedLanguage);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-[#14282B] via-[#1E3A3D] to-[#3A5F4B] text-white flex flex-col justify-between p-5 text-center select-none overflow-y-auto">
      {/* Top language selector */}
      <div className="pt-2">
        <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`text-[11px] px-3 py-1 rounded-full border transition-all cursor-pointer ${
                selectedLanguage === lang.code
                  ? 'bg-[#E3A06F] border-[#E3A06F] text-[#241208] font-bold shadow-sm scale-102'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Brand Emblem */}
        <div className="flex justify-center mb-2.5">
          <div className="w-13 h-13 rounded-2xl bg-white/10 border border-[#E3A06F]/40 flex items-center justify-center shadow-lg shadow-black/20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#E3A06F]">
              <path d="M12 2C7 2 3 6 3 11c0 5 4.5 9 9 11 4.5-2 9-6 9-11 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E3A06F] block mb-1">
          {selectedLanguage === 'mr' ? 'ऊब · सुरक्षित विद्यार्थी संवाद' : selectedLanguage === 'hi' ? 'ऊब · छात्र मानसिक स्वास्थ्य' : 'Ubb · Student Wellbeing & Care'}
        </span>
        <h2 className="font-fraunces text-2xl font-semibold leading-tight text-white mb-1.5">
          {t.screen1.title}
        </h2>
        <p className="text-xs text-[#C3D2CB] leading-relaxed max-w-[280px] mx-auto mb-4">
          {t.screen1.subtitle}
        </p>
      </div>

      {/* Two Large Role Selection Options */}
      <div className="space-y-3 my-auto">
        {/* Option 1: Continue as Student */}
        <button
          onClick={onContinueAsStudent}
          className="w-full text-left bg-gradient-to-r from-white/15 to-white/10 hover:from-white/20 hover:to-white/15 border-2 border-[#E3A06F] rounded-2xl p-4 transition-all cursor-pointer shadow-lg group active:scale-98"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#E3A06F] text-[#241208] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-fraunces font-bold text-sm text-white">
                  {t.screen1.studentBtn}
                </span>
                <span className="font-mono text-[8.5px] bg-[#E3A06F] text-[#241208] px-2 py-0.5 rounded-full font-bold">
                  Zero PII
                </span>
              </div>
              <p className="text-[11px] text-[#D6E2DC] mt-1 leading-snug">
                {t.screen1.studentSub}
              </p>
            </div>
          </div>
        </button>

        {/* Option 2: Volunteer / Counsellor Login */}
        <button
          onClick={onVolunteerLogin}
          className="w-full text-left bg-black/25 hover:bg-black/35 border border-white/20 hover:border-white/40 rounded-2xl p-4 transition-all cursor-pointer shadow-md group active:scale-98"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#4E7C63] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-fraunces font-semibold text-sm text-white">
                  {t.screen1.volunteerBtn}
                </span>
                <span className="font-mono text-[8.5px] bg-white/10 text-[#C3D2CB] px-1.5 py-0.5 rounded font-medium">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-[#AEBFB8] mt-1 leading-snug">
                {t.screen1.volunteerSub}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Privacy Notice & Non-Diagnostic Badge */}
      <div className="pt-3 space-y-2">
        <div className="bg-black/20 border border-white/10 rounded-xl p-2.5 text-left flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-[#E3A06F] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#C3D2CB] leading-tight">
            {t.screen1.privacyNotice}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 font-mono text-[9px] text-[#8FA69C]">
          <span className="flex items-center gap-1">
            <Database className="w-2.5 h-2.5 text-[#4E7C63]" />
            RLS Protected
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#E3A06F]" />
            Non-Diagnostic Guidance
          </span>
        </div>
      </div>
    </div>
  );
}
