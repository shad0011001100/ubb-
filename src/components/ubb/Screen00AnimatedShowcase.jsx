import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Shield, Globe, Heart } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import ubbLogoLight from '../../assets/ubb-logo-light.png';
import ubbLogoDark from '../../assets/ubb-logo-dark.png';
import ubbIcon from '../../assets/ubb-icon.png';

export function Screen00AnimatedShowcase({
  selectedLanguage = 'en',
  onSelectLanguage,
  onEnterApp
}) {
  const t = getTranslation(selectedLanguage);
  const [phase, setPhase] = useState(0); // 0: initial load, 1: logo entrance, 2: tagline revealed, 3: interactive ready
  const [pulseScale, setPulseScale] = useState(false);

  const taglines = {
    en: {
      title: 'Ubb',
      devanagari: 'ऊब',
      tagline: 'A warm space for every thought',
      sub: 'Zero judgment · Zero personal identity · 100% Student-first sanctuary'
    },
    mr: {
      title: 'Ubb',
      devanagari: 'ऊब',
      tagline: 'प्रत्येक विचारासाठी एक सुरक्षित जागा',
      sub: 'कोणताही पूर्वग्रह नाही · शून्य वैयक्तिक ओळख · विद्यार्थ्यांसाठी सुरक्षित'
    },
    hi: {
      title: 'Ubb',
      devanagari: 'ऊब',
      tagline: 'हर विचार के लिए एक सुरक्षित और अपनापन भरी जगह',
      sub: 'बिना किसी डर के · शून्य व्यक्तिगत पहचान · आपका अपना साथी'
    }
  };

  const currentText = taglines[selectedLanguage] || taglines.en;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' }
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale((prev) => !prev);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#f9fbeb] via-[#f3f5e6] to-[#e8e9db] text-[#1a1d14] flex flex-col justify-between p-6 select-none overflow-hidden relative font-sans">
      {/* Background Ambient Breathing Orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#526140]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#815505]/12 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-[#6a7a56]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Language Switcher */}
      <div className="z-10 flex items-center justify-between pt-2">
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[#c5c8bc]/60 px-2.5 py-1 rounded-full shadow-2xs">
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

        <span className="font-mono text-[9px] bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full border border-[#526140]/20 font-bold flex items-center gap-1">
          <Shield className="w-3 h-3 text-[#526140]" />
          <span>Anonymous Safe Space</span>
        </span>
      </div>

      {/* Center Showcase: Animated Glowing Logo & Tagline */}
      <div className="my-auto flex flex-col items-center text-center z-10 space-y-6">
        {/* Animated Glowing Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Radial Ambient Halo */}
          <div
            className={`absolute w-44 h-44 rounded-full bg-[#526140]/20 blur-2xl transition-all duration-1000 ${
              phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            } ${pulseScale ? 'scale-110' : 'scale-95'}`}
          />

          {/* Logo Frame with Soft Outer Border & Floating Shadow */}
          <div
            className={`w-36 h-36 sm:w-40 sm:h-40 rounded-[32px] bg-white/90 backdrop-blur-xl border border-white/80 p-4 shadow-xl flex items-center justify-center transition-all duration-1000 transform relative ${
              phase >= 1
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-90'
            }`}
          >
            <img
              src={ubbLogoLight || ubbIcon}
              alt="Ubb Logo"
              className={`w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 ${
                pulseScale ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Sparkle Badge */}
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#815505] text-[#ffddb3] flex items-center justify-center shadow-md animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Animated Brand Titles & Devanagari Script */}
        <div
          className={`space-y-1.5 transition-all duration-1000 transform ${
            phase >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-fraunces text-4xl sm:text-5xl font-bold tracking-tight text-[#526140]">
              {currentText.title}
            </h1>
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#815505] bg-[#815505]/10 px-2.5 py-0.5 rounded-2xl border border-[#815505]/20">
              ({currentText.devanagari})
            </span>
          </div>

          {/* Animated Main Tagline */}
          <p className="font-fraunces text-base sm:text-lg font-medium text-[#1a1d14] max-w-[280px] mx-auto leading-snug">
            "{currentText.tagline}"
          </p>
        </div>

        {/* Sub-Tagline & Pillars */}
        <p
          className={`text-xs text-[#5e5c52] max-w-[260px] mx-auto leading-relaxed font-sans transition-all duration-1000 delay-300 ${
            phase >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {currentText.sub}
        </p>
      </div>

      {/* Action Footer */}
      <div
        className={`z-10 space-y-3 pt-2 transition-all duration-700 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={onEnterApp}
          className="w-full py-4 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>{selectedLanguage === 'mr' ? 'आत प्रवेश करा' : selectedLanguage === 'hi' ? 'शुरू करें' : 'Enter Safe Space'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-3 font-mono text-[9.5px] text-[#75786e]">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-[#815505] fill-[#815505]" />
            Mental Wellbeing
          </span>
          <span>•</span>
          <span>SIH 2026</span>
          <span>•</span>
          <span>Zero Logs</span>
        </div>
      </div>
    </div>
  );
}
