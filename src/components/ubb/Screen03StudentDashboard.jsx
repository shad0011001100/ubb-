import React, { useState, useEffect } from 'react';
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
  CalendarCheck,
  Zap,
  Moon,
  Sun,
  Coffee
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

  // Compute smart on-device recommendation based on time & user profile
  const [recommendation, setRecommendation] = useState({
    toolId: 'mood_tunes',
    title: 'MoodTunes · Theta Calm',
    reason: 'A gentle 5-minute acoustic soundscape to quiet racing thoughts and restore focus.',
    tab: 'mood_tunes',
    icon: 'music',
    accent: '#526140',
    tag: 'Acoustic Grounding'
  });

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour < 5) {
      // Late Night
      setRecommendation({
        toolId: 'mood_tunes',
        title: 'MoodTunes · Deep Sleep Theta (6Hz)',
        reason: 'Late Night Relief: Eases overthinking and prepares your mind for restful sleep without screens.',
        tab: 'mood_tunes',
        icon: 'moon',
        accent: '#815505',
        tag: 'Late Night Rest'
      });
    } else if (currentHour >= 5 && currentHour < 12) {
      // Morning
      setRecommendation({
        toolId: 'journal',
        title: 'Private Journal · Mindful Focus',
        reason: 'Morning Clarity: Take 2 minutes to write down whatever is on your mind today.',
        tab: 'journal',
        icon: 'sun',
        accent: '#526140',
        tag: 'Morning Intention'
      });
    } else if (currentHour >= 12 && currentHour < 18) {
      // Afternoon Study
      setRecommendation({
        toolId: 'let_it_out',
        title: 'Let It Out · Quick Audio Vent',
        reason: 'Midday Reset: Speak your frustrations freely into private auto-deleted audio.',
        tab: 'let_it_out',
        icon: 'flame',
        accent: '#ba1a1a',
        tag: 'Instant De-stress'
      });
    } else {
      // Evening
      setRecommendation({
        toolId: 'peer',
        title: 'Talk to Someone · Peer Support',
        reason: 'Evening Wind-Down: Connect with a trained student volunteer for confidential listening.',
        tab: 'peer',
        icon: 'users',
        accent: '#526140',
        tag: 'Human Connection'
      });
    }
  }, []);

  const handleOpenRecommendation = () => {
    if (recommendation.toolId === 'mood_tunes') {
      onNavigate('level1_express', { defaultTab: 'mood_tunes' });
    } else if (recommendation.toolId === 'let_it_out') {
      onNavigate('level1_express', { defaultTab: 'let_it_out' });
    } else if (recommendation.toolId === 'journal') {
      onNavigate('level1_express', { defaultTab: 'journal' });
    } else if (recommendation.toolId === 'peer') {
      onNavigate('level2_peer');
    } else {
      onNavigate('level1_express');
    }
  };

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
        {/* Top Reassurance & Freedom Notice */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#5e5c52] px-1">
          <span className="flex items-center gap-1 text-[#526140] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Direct Action Sanctuary
          </span>
          <span>Zero Questionnaires · 100% Private</span>
        </div>

        {/* ================= HERO: DYNAMIC AI RECOMMENDED OPTION ================= */}
        <section className="bg-gradient-to-br from-[#fdc16d]/25 via-[#f9fbeb] to-[#edefe0] border-2 border-[#815505] rounded-3xl p-4 md:p-5 shadow-sm relative overflow-hidden space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#815505] text-[#ffddb3] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#ffddb3]" />
              <span>AI Recommends for You</span>
            </div>
            <span className="font-mono text-[9.5px] text-[#815505] font-bold bg-white/80 px-2 py-0.5 rounded-full border border-[#815505]/20">
              {recommendation.tag}
            </span>
          </div>

          <div>
            <h2 className="font-fraunces text-base md:text-lg font-bold text-[#1a1d14] leading-snug">
              {recommendation.title}
            </h2>
            <p className="text-xs text-[#5e5c52] mt-0.5 leading-relaxed">
              "{recommendation.reason}"
            </p>
          </div>

          <button
            onClick={handleOpenRecommendation}
            className="w-full py-3 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Open Recommended Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Section Header: All Sanctuary Options */}
        <div className="pt-1 flex items-center justify-between px-1">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
            All Sanctuary Tools (Direct 1-Tap Access)
          </span>
          <span className="text-[10px] text-[#815505] font-semibold">Choose freely</span>
        </div>

        {/* Bento Grid of All 6 Core Sanctuary Tools */}
        <div className="space-y-2.5">
          {/* 1. Let It Out (Temporary Voice Vent) */}
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

          {/* 2. MoodTunes (Acoustic Relaxation) */}
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

          {/* 3. Private Journal */}
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

          {/* 4. Talk to Someone (Peer Support) */}
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

          {/* 5. Wall of Thoughts */}
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

          {/* 6. Professional Care (Counsellor Booking) */}
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

          {/* 7. My Journey Trends */}
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
