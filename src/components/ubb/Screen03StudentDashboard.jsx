import React from 'react';
import {
  Sparkles,
  Flame,
  Music,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen03StudentDashboard({
  userProfile,
  onNavigate,
  onOpenSOS,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2 flex items-center justify-between bg-white border-b border-[#D9E2DC]/60">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#4E7C63] flex items-center justify-center text-white shadow-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C7 2 3 6 3 11c0 5 4.5 9 9 11 4.5-2 9-6 9-11 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <span className="font-fraunces font-semibold text-base tracking-tight text-[#14282B]">
            {t.common.appName}
          </span>
        </div>

        {/* User Identity Pill */}
        <div className="flex items-center gap-1.5 bg-[#F2F6F3] border border-[#D9E2DC] px-2.5 py-1 rounded-full shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-[#4E7C63] animate-pulse" />
          <span className="font-mono text-[10px] text-[#3A5F4B] font-bold">{anonId}</span>
        </div>
      </div>

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-20">
        {/* Recommended Dashboard Quote Banner */}
        <div className="bg-gradient-to-r from-[#14282B] via-[#1E3A3D] to-[#2B4B3D] text-white rounded-2xl p-4 shadow-sm border border-[#1E3A3D] relative overflow-hidden">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#E3A06F]/20 text-[#E3A06F] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-mono text-[9px] text-[#E3A06F] uppercase tracking-wider block mb-0.5">
                {t.screen3.welcome} · {anonId}
              </span>
              <p className="text-xs font-fraunces text-[#F5F5F0] italic leading-snug">
                "{t.screen3.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* 7 Main Student Cards */}
        <div className="space-y-2">
          {/* 1. UbbPulse (Mood Check-in) */}
          <div
            onClick={() => onNavigate('mood_checkin')}
            className="bg-white border border-[#D9E2DC] hover:border-[#E3A06F] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E3A06F]/15 group-hover:bg-[#E3A06F]/25 flex items-center justify-center flex-shrink-0 text-[#C9814F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.pulseTitle}</b>
                <span className="font-mono text-[8.5px] bg-[#E3A06F]/20 text-[#C9814F] px-1.5 py-0.5 rounded font-bold">
                  Check-in
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.pulseDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* 2. Let It Out (Temporary audio expression) */}
          <div
            onClick={() => onNavigate('level1_express', { defaultTab: 'let_it_out' })}
            className="bg-white border border-[#D9E2DC] hover:border-[#B84C4C] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-[#B84C4C]/12 group-hover:bg-[#B84C4C]/20 flex items-center justify-center flex-shrink-0 text-[#B84C4C]">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.letItOutTitle}</b>
                <span className="font-mono text-[8.5px] bg-[#B84C4C]/10 text-[#B84C4C] px-1.5 py-0.5 rounded font-bold">
                  Zero Logs
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.letItOutDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* 3. MoodTunes (Music and relaxation) */}
          <div
            onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
            className="bg-white border border-[#D9E2DC] hover:border-[#4E7C63] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4E7C63]/12 group-hover:bg-[#4E7C63]/20 flex items-center justify-center flex-shrink-0 text-[#4E7C63]">
              <Music className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.moodTunesTitle}</b>
                <span className="font-mono text-[8.5px] bg-[#4E7C63]/10 text-[#4E7C63] px-1.5 py-0.5 rounded font-bold">
                  Binaural
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.moodTunesDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* 4. Journal (Private written expression) */}
          <div
            onClick={() => onNavigate('level1_express', { defaultTab: 'journal' })}
            className="bg-white border border-[#D9E2DC] hover:border-[#3A5F4B] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3A5F4B]/10 group-hover:bg-[#3A5F4B]/20 flex items-center justify-center flex-shrink-0 text-[#3A5F4B]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.journalTitle}</b>
                <span className="font-mono text-[8.5px] bg-slate-100 text-[#5B6E67] px-1.5 py-0.5 rounded font-semibold">
                  Local
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.journalDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* 5. Wall of Thoughts (Anonymous positive messages) */}
          <div
            onClick={() => onNavigate('wall_of_thoughts')}
            className="bg-white border border-[#D9E2DC] hover:border-[#E3A06F] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.wallTitle}</b>
                <span className="font-mono text-[8.5px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
                  Moderated
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.wallDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* 6. Talk to Someone (Volunteer / Counsellor) */}
          <div
            onClick={() => onNavigate('level2_peer')}
            className="bg-white border border-[#D9E2DC] hover:border-[#3A5F4B] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4E7C63]/12 group-hover:bg-[#4E7C63]/20 flex items-center justify-center flex-shrink-0 text-[#4E7C63]">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.talkTitle}</b>
                <span className="font-mono text-[8.5px] bg-[#4E7C63]/15 text-[#3A5F4B] px-1.5 py-0.5 rounded font-bold">
                  Human Care
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.talkDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>

          {/* 7. My Journey (Previous check-ins & feedback) */}
          <div
            onClick={() => onNavigate('my_journey')}
            className="bg-white border border-[#D9E2DC] hover:border-[#4E7C63] rounded-2xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs group active:scale-99"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3A5F4B]/10 group-hover:bg-[#3A5F4B]/20 flex items-center justify-center flex-shrink-0 text-[#3A5F4B]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B]">{t.screen3.journeyTitle}</b>
                <span className="font-mono text-[8.5px] bg-slate-100 text-[#5B6E67] px-1.5 py-0.5 rounded font-medium">
                  Insights
                </span>
              </div>
              <span className="text-[10.5px] text-[#5B6E67] block truncate">
                {t.screen3.journeyDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#14282B]" />
          </div>
        </div>

        {/* Emergency SOS Strip */}
        <button
          onClick={onOpenSOS}
          className="w-full bg-[#B84C4C] hover:bg-[#A33D3D] text-white rounded-2xl p-3 flex items-center gap-3 text-left transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-xs leading-tight">{t.common.emergencySOS}</div>
            <span className="text-[10px] text-white/80 block truncate">{t.common.emergencySub}</span>
          </div>
          <span className="text-xs font-bold text-white/90">→</span>
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-[#D9E2DC] flex items-center justify-around px-2 z-10">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-center gap-0.5 text-[#3A5F4B] font-semibold cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.8"/></svg>
          <span className="text-[9px]">{t.common.home}</span>
        </button>

        <button
          onClick={() => onNavigate('mood_checkin')}
          className="flex flex-col items-center gap-0.5 text-[#5B6E67] hover:text-[#3A5F4B] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C7 2 3 6 3 11c0 5 4.5 9 9 11 4.5-2 9-6 9-11 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">Pulse</span>
        </button>

        <button
          onClick={() => onNavigate('level2_peer')}
          className="flex flex-col items-center gap-0.5 text-[#5B6E67] hover:text-[#3A5F4B] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v10H8l-4 4V5z" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">{t.common.talk}</span>
        </button>

        <button
          onClick={() => onNavigate('level1_express')}
          className="flex flex-col items-center gap-0.5 text-[#5B6E67] hover:text-[#3A5F4B] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-2-1-3-1-3s2 2 2 5a7 7 0 11-13-4c0-3 2-4 2-4s1 2 4-1z" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">{t.common.selfCare}</span>
        </button>
      </div>
    </div>
  );
}
