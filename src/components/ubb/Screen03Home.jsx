import React from 'react';
import { AlertCircle, Bot, Users, CalendarCheck, Sparkles } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen03Home({
  userProfile,
  screeningResults,
  onNavigate,
  onOpenSOS
}) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'Sprout_042';
  const todayName = new Date().toLocaleDateString(userLang === 'mr' ? 'mr-IN' : userLang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long' });

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#4E7C63] flex items-center justify-center text-white shadow-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C7 2 3 6 3 11c0 5 4.5 9 9 11 4.5-2 9-6 9-11 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <span className="font-fraunces font-semibold text-base tracking-tight text-[#14282B]">{t.common.appName}</span>
        </div>

        {/* User avatar badge */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#D9E2DC] px-2.5 py-1 rounded-full shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-[#4E7C63] animate-pulse" />
          <span className="font-mono text-[10px] text-[#3A5F4B] font-medium">{anonId}</span>
        </div>
      </div>

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 px-5 py-2 overflow-y-auto space-y-3 pb-20">
        {/* Greeting */}
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#5B6E67]">
            {todayName} · {anonId}
          </div>
          <h2 className="font-fraunces text-xl font-semibold text-[#14282B]">
            {t.home.welcomeBack}
          </h2>
        </div>

        {/* "Based on your check-in" Recommendation Card */}
        <div className="bg-[#14282B] text-white rounded-2xl p-4 shadow-sm border border-[#1E3A3D]">
          <div className="font-mono text-[9px] text-[#E3A06F] uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {t.home.checkInScore} ({screeningResults?.score ?? 8}/24)
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed mb-3">
            {screeningResults?.recommendationText ||
              (userLang === 'mr'
                ? "तुम्ही गेल्या काही दिवसांत ताण व निरुत्साह अनुभवत आहात. AI चॅटबॉटपेक्षा कॉलेजचा ताण समजणाऱ्या समवयस्क मार्गदर्शकाशी बोलल्याने अधिक मदत होईल."
                : "You've felt loss of interest & exam strain recently. A peer supporter who understands campus life could help more than a chatbot right now.")}
          </p>
          <button
            onClick={() => onNavigate('peer_matching')}
            className="text-[11px] px-3.5 py-1.5 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-semibold cursor-pointer transition-all shadow-xs"
          >
            {t.home.seePeerMatches}
          </button>
        </div>

        {/* Support Tiers List */}
        <div className="space-y-2">
          {/* Tier 1: AI First Contact */}
          <button
            onClick={() => onNavigate('ai_chat')}
            className="w-full text-left bg-white border border-[#D9E2DC] hover:border-[#4E7C63] rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#4E7C63]/12 group-hover:bg-[#4E7C63]/20 flex items-center justify-center flex-shrink-0 text-[#4E7C63]">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs text-[#14282B]">{t.home.tier1Title}</span>
                <span className="font-mono text-[9px] text-[#4E7C63] bg-[#4E7C63]/10 px-1.5 py-0.5 rounded">~2 min</span>
              </div>
              <span className="text-[10px] text-[#5B6E67] block truncate">
                {t.home.tier1Desc}
              </span>
            </div>
          </button>

          {/* Tier 2: Peer Support */}
          <button
            onClick={() => onNavigate('peer_matching')}
            className="w-full text-left bg-white border border-[#D9E2DC] hover:border-[#E3A06F] rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#E3A06F]/15 group-hover:bg-[#E3A06F]/25 flex items-center justify-center flex-shrink-0 text-[#C9814F]">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs text-[#14282B]">{t.home.tier2Title}</span>
                <span className="font-mono text-[9px] text-[#C9814F] bg-[#E3A06F]/15 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <span className="text-[10px] text-[#5B6E67] block truncate">
                {t.home.tier2Desc}
              </span>
            </div>
          </button>

          {/* Tier 3: Professional Counselor */}
          <button
            onClick={() => onNavigate('peer_matching')}
            className="w-full text-left bg-white border border-[#D9E2DC] hover:border-[#3A5F4B] rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#3A5F4B]/10 group-hover:bg-[#3A5F4B]/20 flex items-center justify-center flex-shrink-0 text-[#3A5F4B]">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs text-[#14282B]">{t.home.tier3Title}</span>
                <span className="font-mono text-[9px] text-[#3A5F4B] bg-[#3A5F4B]/10 px-1.5 py-0.5 rounded">Licensed</span>
              </div>
              <span className="text-[10px] text-[#5B6E67] block truncate">
                {t.home.tier3Desc}
              </span>
            </div>
          </button>
        </div>

        {/* Daily Grounding Card */}
        <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#3A5F4B] font-semibold">
              {t.home.dailyGroundingTitle}
            </span>
            <span className="font-mono text-[9px] text-[#5B6E67]">432Hz</span>
          </div>
          <p className="text-[11px] text-[#5B6E67] leading-relaxed">
            {t.home.dailyGroundingDesc}
          </p>
          <button
            onClick={() => onNavigate('self_care')}
            className="text-[10px] px-3 py-1.5 rounded-full bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-semibold cursor-pointer transition-all flex items-center gap-1"
          >
            <span>{t.home.dailyGroundingBtn}</span>
          </button>
        </div>

        {/* SOS Emergency Strip */}
        <button
          onClick={onOpenSOS}
          className="w-full bg-[#B84C4C] hover:bg-[#A33D3D] text-white rounded-xl p-3 flex items-center gap-3 text-left transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-xs leading-tight">{t.common.emergencySOS}</div>
            <span className="text-[10px] text-white/80">{t.common.emergencySub}</span>
          </div>
          <span className="text-xs font-bold text-white/90">→</span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-[#D9E2DC] flex items-center justify-around px-2 z-10">
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center gap-0.5 text-[#3A5F4B] font-semibold cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
          <span className="text-[9px]">{t.common.home}</span>
        </button>

        <button
          onClick={() => onNavigate('ai_chat')}
          className="flex flex-col items-center gap-0.5 text-[#5B6E67] hover:text-[#3A5F4B] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 5h16v10H8l-4 4V5z" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          <span className="text-[9px]">{t.common.talk}</span>
        </button>

        <button
          onClick={() => onNavigate('progress')}
          className="flex flex-col items-center gap-0.5 text-[#5B6E67] hover:text-[#3A5F4B] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 18l5-6 4 4 7-9" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          <span className="text-[9px]">{t.common.progress}</span>
        </button>

        <button
          onClick={() => onNavigate('self_care')}
          className="flex flex-col items-center gap-0.5 text-[#5B6E67] hover:text-[#3A5F4B] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-2-1-3-1-3s2 2 2 5a7 7 0 11-13-4c0-3 2-4 2-4s1 2 4-1z" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          <span className="text-[9px]">{t.common.selfCare}</span>
        </button>
      </div>
    </div>
  );
}
