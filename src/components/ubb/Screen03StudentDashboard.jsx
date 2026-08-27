import React from 'react';
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  Users,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  CalendarCheck,
  Headset,
  Wrench
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
          <div className="w-8 h-8 flex items-center justify-center">
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
      <div className="flex-1 px-4 py-3.5 overflow-y-auto space-y-3.5 pb-20">
        {/* ================= 1. SANCTUARY WELCOME & GROUNDING HERO ================= */}
        <section className="bg-gradient-to-br from-[#f3f5e6] via-[#f9fbeb] to-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-4 shadow-xs relative overflow-hidden space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border border-[#526140]/20">
              <Sparkles className="w-3 h-3 text-[#526140]" />
              <span>Safe Sanctuary</span>
            </div>
            <span className="font-mono text-[9.5px] text-[#526140] font-bold bg-white/80 px-2 py-0.5 rounded-full border border-[#c5c8bc]/60">
              Zero Judgment
            </span>
          </div>

          <div>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14] leading-snug">
              Welcome back, {anonId}
            </h2>
            <p className="text-xs text-[#5e5c52] mt-0.5 leading-relaxed">
              "{t.screen3.quote}"
            </p>
          </div>
        </section>

        {/* ================= 2. SANCTUARY TOOLS (SUPPORT 1) ================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
              Sanctuary Tools
            </span>
            <span className="font-mono text-[9px] text-[#526140] bg-[#edefe0] px-2 py-0.5 rounded-full font-bold">
              Support 1
            </span>
          </div>

          {/* Tools Card navigating to Support 1 */}
          <div
            onClick={() => onNavigate('level1_express')}
            className="bg-gradient-to-r from-[#526140] to-[#435034] text-white rounded-3xl p-3.5 flex items-center justify-between cursor-pointer shadow-xs hover:scale-101 transition-all active:scale-99"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-2xs">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-white">Self-Help Tools</b>
                  <span className="font-mono text-[8px] bg-[#ffddb3] text-[#435034] px-1.5 py-0.2 rounded-full font-bold">
                    Instant
                  </span>
                </div>
                <span className="text-[10.5px] text-white/80 block">
                  Let It Out · Private Journal · MoodTunes
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/80" />
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
                    Support 3
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

      {/* ================= BOTTOM NAVIGATION OPTIONS: HOME, WALL, TALK, SUPPORT ================= */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#c5c8bc]/60 flex items-center justify-around px-3 z-10 shadow-lg">
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-center gap-0.5 text-[#526140] font-bold cursor-pointer py-1"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="2.2"/></svg>
          <span className="text-[10px]">{t.common.home}</span>
        </button>

        {/* 2. Wall of Thoughts */}
        <button
          onClick={() => onNavigate('wall_of_thoughts')}
          className="flex flex-col items-center gap-0.5 text-[#5e5c52] hover:text-[#526140] cursor-pointer py-1"
        >
          <MessageSquare className="w-5 h-5 text-[#815505]" />
          <span className="text-[10px]">Wall</span>
        </button>

        {/* 3. Talk */}
        <button
          onClick={() => onNavigate('level2_peer')}
          className="flex flex-col items-center gap-0.5 text-[#5e5c52] hover:text-[#526140] cursor-pointer py-1"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v10H8l-4 4V5z" stroke="currentColor" strokeWidth="2"/></svg>
          <span className="text-[10px]">{t.common.talk}</span>
        </button>

        {/* 4. Support */}
        <button
          onClick={() => onNavigate('customer_support')}
          className="flex flex-col items-center gap-0.5 text-[#5e5c52] hover:text-[#526140] cursor-pointer py-1"
        >
          <Headset className="w-5 h-5 text-[#526140]" />
          <span className="text-[10px]">Support</span>
        </button>
      </div>
    </div>
  );
}
