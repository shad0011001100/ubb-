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
  ChevronRight,
  ArrowRight,
  Globe,
  CalendarCheck
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import ubbLogoLight from '../../assets/ubb-logo-light.png';
import ubbIcon from '../../assets/ubb-icon.png';

export function Screen03StudentDashboard({
  userProfile,
  onNavigate,
  onOpenSOS,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none relative font-sans">
      {/* Top App Bar from Stitch */}
      <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between bg-[#f9fbeb] border-b border-[#c5c8bc]/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#c5c8bc]/60 p-1 flex items-center justify-center shadow-xs">
            <img src={ubbLogoLight || ubbIcon} alt="Ubb Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-fraunces font-bold text-lg tracking-tight text-[#526140]">
            {t.common.appName}
          </span>
        </div>

        {/* User Identity Pill */}
        <div className="flex items-center gap-1.5 bg-[#edefe0] border border-[#c5c8bc]/60 px-3 py-1 rounded-full shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-[#526140] animate-pulse" />
          <span className="font-mono text-[10.5px] text-[#526140] font-bold">{anonId}</span>
        </div>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-20">
        {/* Grounding Quote Card from Stitch */}
        <section className="bg-[#f3f5e6] rounded-3xl p-4 md:p-5 flex items-center justify-center text-center shadow-xs border border-[#c5c8bc]/60 relative overflow-hidden">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-[#815505] uppercase tracking-wider font-bold block">
              {t.screen3.welcome} · {anonId}
            </span>
            <h2 className="font-fraunces text-xs md:text-sm font-semibold text-[#1a1d14] leading-snug max-w-xs mx-auto">
              "{t.screen3.quote}"
            </h2>
          </div>
        </section>

        {/* 1. UbbPulse (Primary Mood Check-in Card) */}
        <div
          onClick={() => onNavigate('mood_checkin')}
          className="bg-[#6a7a56] text-[#f9ffeb] rounded-3xl p-4 shadow-sm hover:scale-101 transition-all cursor-pointer flex flex-col justify-between gap-3 group active:scale-99"
        >
          <div className="flex items-start justify-between">
            <div className="bg-[#f9ffeb]/15 p-2.5 rounded-2xl w-fit group-hover:scale-105 transition-transform text-[#f9ffeb]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="bg-[#f9ffeb] text-[#526140] font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
              Check-in <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div>
            <h3 className="font-fraunces font-bold text-sm text-[#f9ffeb] mb-0.5">{t.screen3.pulseTitle}</h3>
            <p className="text-[11px] text-[#f9ffeb]/90 leading-snug">
              {t.screen3.pulseDesc}
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="pt-1 flex items-center justify-between px-1">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
            Sanctuary Tools
          </span>
          <span className="text-[10px] text-[#815505] font-semibold">100% Zero-PII</span>
        </div>

        {/* Bento Grid of All Sanctuary Tools */}
        <div className="space-y-2.5">
          {/* Let It Out (Temporary Voice Vent) */}
          <div
            onClick={() => onNavigate('level1_express', { defaultTab: 'let_it_out' })}
            className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs hover:bg-[#e8e9db] active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#815505] flex items-center justify-center flex-shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen3.letItOutTitle}</b>
                <span className="font-mono text-[8.5px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded-full font-bold">
                  Zero Logs
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                {t.screen3.letItOutDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>

          {/* MoodTunes (Acoustic Relaxation) */}
          <div
            onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
            className="bg-[#e8e9db] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs hover:bg-[#e2e4d5] active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#526140]/15 text-[#526140] flex items-center justify-center flex-shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen3.moodTunesTitle}</b>
                <span className="font-mono text-[8.5px] bg-[#526140]/15 text-[#526140] px-1.5 py-0.2 rounded-full font-bold">
                  Web Audio · 0ms
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                {t.screen3.moodTunesDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>

          {/* Private Journal */}
          <div
            onClick={() => onNavigate('level1_express', { defaultTab: 'journal' })}
            className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs hover:bg-[#e8e9db] active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#5e5c52]/15 text-[#5e5c52] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen3.journalTitle}</b>
                <span className="font-mono text-[8.5px] bg-white text-[#5e5c52] px-1.5 py-0.2 rounded-full font-medium">
                  Local Encrypted
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                {t.screen3.journalDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>

          {/* Talk to Someone (Peer Support) */}
          <div
            onClick={() => onNavigate('level2_peer')}
            className="bg-[#f3f5e6] border-2 border-[#526140] rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-sm active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#526140] text-white flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen3.talkTitle}</b>
                <span className="font-mono text-[8.5px] bg-[#526140] text-white px-2 py-0.2 rounded-full font-bold">
                  Human Care
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                {t.screen3.talkDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#526140]" />
          </div>

          {/* Wall of Thoughts */}
          <div
            onClick={() => onNavigate('wall_of_thoughts')}
            className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs hover:bg-[#e8e9db] active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#815505] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen3.wallTitle}</b>
                <span className="font-mono text-[8.5px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-bold">
                  Moderated
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                {t.screen3.wallDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>

          {/* Professional Care */}
          <div
            onClick={() => onNavigate('level3_care')}
            className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs hover:bg-[#e8e9db] active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">Professional Clinical Care</b>
                <span className="font-mono text-[8.5px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded-full font-bold">
                  Level 3
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                Book confidential appointments with licensed campus counsellors
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>

          {/* My Journey Trends */}
          <div
            onClick={() => onNavigate('my_journey')}
            className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center gap-3 transition-all cursor-pointer shadow-2xs hover:bg-[#e8e9db] active:scale-99"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#5e5c52]/15 text-[#5e5c52] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen3.journeyTitle}</b>
                <span className="font-mono text-[8.5px] bg-white text-[#5e5c52] px-1.5 py-0.2 rounded-full font-medium">
                  Trends
                </span>
              </div>
              <span className="text-[10.5px] text-[#5e5c52] block truncate">
                {t.screen3.journeyDesc}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>
        </div>

        {/* Emergency SOS Strip */}
        <button
          onClick={onOpenSOS}
          className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-3xl p-3 flex items-center gap-3 text-left transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-xs leading-tight">{t.common.emergencySOS}</div>
            <span className="text-[10px] text-white/80 block truncate">{t.common.emergencySub}</span>
          </div>
          <span className="text-xs font-bold text-white/90">→</span>
        </button>
      </div>

      {/* Bottom Nav Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#c5c8bc]/60 flex items-center justify-around px-2 z-10 shadow-lg">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-center gap-0.5 text-[#526140] font-bold cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="2"/></svg>
          <span className="text-[9.5px]">{t.common.home}</span>
        </button>

        <button
          onClick={() => onNavigate('mood_checkin')}
          className="flex flex-col items-center gap-0.5 text-[#815505] hover:text-[#526140] cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#815505]" />
          <span className="text-[9.5px]">Pulse</span>
        </button>

        <button
          onClick={() => onNavigate('level1_express', { defaultTab: 'let_it_out' })}
          className="flex flex-col items-center gap-0.5 text-[#5e5c52] hover:text-[#526140] cursor-pointer"
        >
          <Flame className="w-5 h-5 text-[#815505]" />
          <span className="text-[9.5px]">Vent</span>
        </button>

        <button
          onClick={() => onNavigate('level2_peer')}
          className="flex flex-col items-center gap-0.5 text-[#5e5c52] hover:text-[#526140] cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v10H8l-4 4V5z" stroke="currentColor" strokeWidth="1.8"/></svg>
          <span className="text-[9.5px]">{t.common.talk}</span>
        </button>

        <button
          onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
          className="flex flex-col items-center gap-0.5 text-[#5e5c52] hover:text-[#526140] cursor-pointer"
        >
          <Music className="w-5 h-5 text-[#526140]" />
          <span className="text-[9.5px]">Relax</span>
        </button>
      </div>
    </div>
  );
}
