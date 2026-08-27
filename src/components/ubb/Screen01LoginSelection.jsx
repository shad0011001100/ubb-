import React from 'react';
import { UserCheck, Shield, HeartHandshake, Sparkles, Database, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import ubbLogoLight from '../../assets/ubb-logo-light.png';
import ubbIcon from '../../assets/ubb-icon.png';

export function Screen01LoginSelection({
  selectedLanguage = 'en',
  onSelectLanguage,
  onContinueAsStudent,
  onVolunteerLogin,
  onBackToShowcase
}) {
  const t = getTranslation(selectedLanguage);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' }
  ];

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between p-5 select-none overflow-y-auto font-sans">
      {/* Top Bar with Language Switcher */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          {onBackToShowcase ? (
            <button
              onClick={onBackToShowcase}
              className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer flex items-center gap-1 text-[10.5px] font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Showcase</span>
            </button>
          ) : (
            <div className="w-4" />
          )}

          <div className="flex items-center gap-1 bg-[#edefe0] border border-[#c5c8bc]/50 px-2 py-1 rounded-full">
            <Globe className="w-3.5 h-3.5 text-[#526140]" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`text-[10px] px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  selectedLanguage === lang.code
                    ? 'bg-[#526140] text-white font-bold shadow-xs'
                    : 'text-[#5e5c52] hover:text-[#1a1d14]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2 py-0.5 rounded-full border border-[#c5c8bc]/40 font-bold">
            Zero PII
          </span>
        </div>

        {/* Brand Emblem with Clean Logo */}
        <div className="text-center mb-3">
          <div className="w-14 h-14 flex items-center justify-center mx-auto mb-1">
            <img
              src={ubbLogoLight || ubbIcon}
              alt="Ubb Logo"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          <h1 className="font-fraunces text-3xl font-bold tracking-tight text-[#526140] mb-0.5">
            {t.common.appName}
          </h1>
          <p className="text-xs text-[#5e5c52] font-medium leading-relaxed max-w-[260px] mx-auto">
            {t.screen1.subtitle}
          </p>
        </div>
      </div>

      {/* Two Prominent Role Cards */}
      <div className="space-y-3 my-auto">
        {/* Student Card */}
        <button
          onClick={onContinueAsStudent}
          className="w-full text-left bg-white hover:bg-[#f3f5e6] border-2 border-[#526140] rounded-3xl p-4 transition-all cursor-pointer shadow-sm group active:scale-98"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#526140] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-fraunces font-bold text-sm text-[#1a1d14]">
                  {t.screen1.studentBtn}
                </span>
                <ArrowRight className="w-4 h-4 text-[#526140] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-1 leading-snug">
                {t.screen1.studentSub}
              </p>
            </div>
          </div>
        </button>

        {/* Volunteer / Counsellor Card */}
        <button
          onClick={onVolunteerLogin}
          className="w-full text-left bg-[#edefe0] hover:bg-[#e8e9db] border border-[#c5c8bc] rounded-3xl p-4 transition-all cursor-pointer shadow-2xs group active:scale-98"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#815505] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-fraunces font-semibold text-sm text-[#1a1d14]">
                  {t.screen1.volunteerBtn}
                </span>
                <span className="font-mono text-[8.5px] bg-white text-[#5e5c52] px-1.5 py-0.5 rounded-full font-medium">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-1 leading-snug">
                {t.screen1.volunteerSub}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Footer Notice */}
      <div className="pt-3 space-y-2">
        <div className="bg-[#edefe0]/70 border border-[#c5c8bc]/60 rounded-2xl p-2.5 text-left flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-[#526140] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#5e5c52] leading-tight">
            {t.screen1.privacyNotice}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 font-mono text-[9px] text-[#75786e]">
          <span className="flex items-center gap-1">
            <Database className="w-2.5 h-2.5 text-[#526140]" />
            RLS Protected
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#815505]" />
            Non-Diagnostic
          </span>
        </div>
      </div>
    </div>
  );
}
