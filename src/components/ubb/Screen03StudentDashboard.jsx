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
  Headphones,
  Mic,
  Lock,
  Heart,
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
      {/* Top Visual App Bar */}
      <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between bg-[#f9fbeb] border-b border-[#c5c8bc]/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#c5c8bc]/60 p-1 flex items-center justify-center shadow-xs">
            <img src={ubbLogoLight || ubbIcon} alt="Ubb Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-fraunces font-bold text-lg tracking-tight text-[#526140]">
            {t.common.appName}
          </span>
        </div>

        {/* User Identity Pill with Visual Pulse */}
        <div className="flex items-center gap-1.5 bg-[#edefe0] border border-[#c5c8bc]/60 px-3 py-1 rounded-full shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-[#526140] animate-pulse" />
          <span className="font-mono text-[10.5px] text-[#526140] font-bold">{anonId}</span>
        </div>
      </div>

      {/* Main Visual Scrollable Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-20">
        {/* ================= 1. VISUAL HERO: UBBPULSE CHECK-IN ================= */}
        <section
          onClick={() => onNavigate('mood_checkin')}
          className="bg-gradient-to-br from-[#526140] via-[#435034] to-[#2d3822] text-white rounded-3xl p-4 md:p-5 shadow-sm hover:scale-101 transition-all cursor-pointer relative overflow-hidden group active:scale-99 border border-[#526140]"
        >
          {/* Visual Ambient Halo */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Sparkles className="w-4.5 h-4.5 text-[#ffddb3]" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffddb3] font-bold block">
                  Daily Check-in
                </span>
                <h3 className="font-fraunces font-bold text-base text-white leading-tight">
                  UbbPulse
                </h3>
              </div>
            </div>

            <span className="bg-[#ffddb3] text-[#435034] font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <span>Start</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <p className="text-xs text-white/90 leading-snug relative z-10">
            "{t.screen3.quote}"
          </p>
        </section>

        {/* ================= 2. 4-UP QUICK VISUAL TOOL TILES ================= */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
              Instant Relief Tools
            </span>
            <span className="font-mono text-[9px] text-[#526140] bg-[#edefe0] px-2 py-0.5 rounded-full font-bold">
              1-Tap
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Tile 1: Voice Vent */}
            <div
              onClick={() => onNavigate('level1_express', { defaultTab: 'let_it_out' })}
              className="bg-[#f3f5e6] hover:bg-[#ebefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex flex-col justify-between h-28 cursor-pointer shadow-2xs transition-all active:scale-98 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-[#815505] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Flame className="w-4.5 h-4.5" />
                </div>
                <span className="font-mono text-[8px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full font-bold">
                  Zero Logs
                </span>
              </div>
              <div>
                <b className="text-xs text-[#1a1d14] block">Let It Out</b>
                <span className="text-[10px] text-[#5e5c52] block truncate">Voice & text vent</span>
              </div>
            </div>

            {/* Tile 2: MoodTunes */}
            <div
              onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
              className="bg-[#e8e9db] hover:bg-[#e2e4d5] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex flex-col justify-between h-28 cursor-pointer shadow-2xs transition-all active:scale-98 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-2xl bg-[#526140]/15 text-[#526140] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Music className="w-4.5 h-4.5" />
                </div>
                <span className="font-mono text-[8px] bg-[#526140]/15 text-[#526140] px-1.5 py-0.5 rounded-full font-bold">
                  Binaural
                </span>
              </div>
              <div>
                <b className="text-xs text-[#1a1d14] block">MoodTunes</b>
                <span className="text-[10px] text-[#5e5c52] block truncate">Acoustic waves</span>
              </div>
            </div>

            {/* Tile 3: Private Journal */}
            <div
              onClick={() => onNavigate('level1_express', { defaultTab: 'journal' })}
              className="bg-[#edefe0] hover:bg-[#e8e9db] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex flex-col justify-between h-28 cursor-pointer shadow-2xs transition-all active:scale-98 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-2xl bg-[#5e5c52]/15 text-[#5e5c52] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <span className="font-mono text-[8px] bg-white text-[#5e5c52] px-1.5 py-0.5 rounded-full font-medium">
                  Encrypted
                </span>
              </div>
              <div>
                <b className="text-xs text-[#1a1d14] block">Private Journal</b>
                <span className="text-[10px] text-[#5e5c52] block truncate">Local canvas</span>
              </div>
            </div>

            {/* Tile 4: Wall of Thoughts */}
            <div
              onClick={() => onNavigate('wall_of_thoughts')}
              className="bg-[#f3f5e6] hover:bg-[#ebefe0] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex flex-col justify-between h-28 cursor-pointer shadow-2xs transition-all active:scale-98 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-[#815505] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
                <span className="font-mono text-[8px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">
                  Peers
                </span>
              </div>
              <div>
                <b className="text-xs text-[#1a1d14] block">Wall of Thoughts</b>
                <span className="text-[10px] text-[#5e5c52] block truncate">Community notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. HUMAN CARE BANNER TILES ================= */}
        <div className="space-y-2 pt-1">
          {/* Peer Talk Card */}
          <div
            onClick={() => onNavigate('level2_peer')}
            className="bg-white border-2 border-[#526140] rounded-3xl p-3.5 flex items-center justify-between transition-all cursor-pointer shadow-xs hover:bg-[#f3f5e6] active:scale-99"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#526140] text-white flex items-center justify-center shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-[#1a1d14]">Talk to a Peer Volunteer</b>
                  <span className="font-mono text-[8px] bg-[#526140] text-white px-1.5 py-0.2 rounded-full font-bold">
                    Online
                  </span>
                </div>
                <span className="text-[10.5px] text-[#5e5c52] block">
                  Trained psychology seniors · 100% Confidential
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#526140]" />
          </div>

          {/* Counsellor Clinical Booking */}
          <div
            onClick={() => onNavigate('level3_care')}
            className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:bg-red-50/30 active:scale-99"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shadow-2xs">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-[#1a1d14]">Book Campus Counsellor</b>
                  <span className="font-mono text-[8px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded-full font-bold">
                    Level 3
                  </span>
                </div>
                <span className="text-[10.5px] text-[#5e5c52] block">
                  Licensed clinical consultations
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e]" />
          </div>
        </div>

        {/* ================= 4. EMERGENCY SOS STRIP ================= */}
        <button
          onClick={onOpenSOS}
          className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-3xl p-3 flex items-center gap-3 text-left transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-xs leading-tight">{t.common.emergencySOS}</div>
            <span className="text-[10px] text-white/80 block truncate">24x7 Campus Crisis & Tele-MANAS 14416</span>
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
