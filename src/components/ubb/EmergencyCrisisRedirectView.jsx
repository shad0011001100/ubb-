import React from 'react';
import {
  PhoneCall,
  ShieldAlert,
  HeartHandshake,
  CalendarCheck,
  ArrowRight,
  AlertTriangle,
  Heart,
  MessageSquare,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { SproutCompanion } from './SproutCompanion';
import { soundEffects } from '../../services/soundEffects';

/**
 * EmergencyCrisisRedirectView (ऊब)
 * Strict, focused safety redirection screen triggered when NLP detects dangerous content.
 * Restricts distractions and provides ONLY relevant emergency services & matched support tiers.
 */
export function EmergencyCrisisRedirectView({
  crisisAnalysis,
  onSelectLevel,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const analysis = crisisAnalysis || {
    targetTier: 4,
    severity: 'ACUTE_CRISIS',
    title: 'Immediate Crisis Support',
    subtitle: 'Confidential 24x7 help is available right now.',
    matchedKeyword: 'crisis',
    hotlines: [
      { name: 'National Tele-MANAS', number: '14416', tel: 'tel:14416', available: '24x7 Free & Confidential' },
      { name: 'KIRAN Mental Health', number: '1800-599-0019', tel: 'tel:18005990019', available: '24x7 Govt Helpline' }
    ]
  };

  const isLevel4 = analysis.targetTier === 4;
  const isLevel3 = analysis.targetTier === 3;
  const isLevel2 = analysis.targetTier === 2;

  const handleCall = (tel) => {
    soundEffects.playPop();
    window.location.href = tel;
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#14282B] via-[#0E1E20] to-[#0A1618] text-white flex flex-col justify-between overflow-hidden select-none p-5 relative font-sans">
      {/* Top Protocol Badge */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 text-red-300 px-3 py-1 rounded-full font-mono text-[9px] font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>Priority Safety Protocol · Level {analysis.targetTier}</span>
        </div>

        <span className="font-mono text-[9px] text-gray-400">100% Confidential</span>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto space-y-4 my-auto py-3">
        {/* Companion Support Avatar */}
        <div className="flex justify-center">
          <SproutCompanion
            emotion="cozy"
            size="md"
            message="Your safety is our absolute priority. Please reach out to these trusted lifelines."
            showSpeech={true}
          />
        </div>

        {/* Header Notification */}
        <div className="text-center space-y-1">
          <h2 className="font-fraunces text-xl font-bold text-red-200">
            {analysis.title}
          </h2>
          <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
            {analysis.subtitle}
          </p>
        </div>

        {/* ================= OPTION 1: 24X7 EMERGENCY PHONE LIFELINES ================= */}
        <div className="space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-red-300 font-bold block px-1">
            Free 24x7 Government Crisis Lifelines
          </span>

          <button
            onClick={() => handleCall('tel:14416')}
            className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs flex items-center justify-between shadow-lg cursor-pointer transition-all border border-red-400/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <PhoneCall className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <b className="text-xs block leading-tight">Call National Tele-MANAS</b>
                <span className="text-[9.5px] text-red-100 font-normal">24x7 Free Govt Lifeline (Toll-Free)</span>
              </div>
            </div>
            <span className="font-mono text-sm bg-white/20 px-2.5 py-1 rounded-xl font-extrabold">14416</span>
          </button>

          <button
            onClick={() => handleCall('tel:18005990019')}
            className="w-full py-3 px-4 rounded-2xl bg-amber-700/90 hover:bg-amber-800 active:scale-98 text-white font-bold text-xs flex items-center justify-between shadow-md cursor-pointer transition-all border border-amber-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-left">
                <b className="text-xs block leading-tight">Call KIRAN Helpline</b>
                <span className="text-[9.5px] text-amber-100 font-normal">Govt Mental Health Rehabilitation</span>
              </div>
            </div>
            <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded-lg">1800-599-0019</span>
          </button>
        </div>

        {/* ================= OPTION 2: TARGETED CAMPUS SUPPORT TIER ================= */}
        <div className="space-y-2 pt-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-amber-300 font-bold block px-1">
            Matched Institutional Care
          </span>

          {/* Level 3: Licensed Clinical Counsellor */}
          {(isLevel4 || isLevel3) && (
            <button
              onClick={() => {
                soundEffects.playPop();
                if (onSelectLevel) onSelectLevel(3);
                else onNavigate('level3_care');
              }}
              className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-left flex items-center justify-between cursor-pointer transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-xs text-white block">Support Level 3: Meet Campus Counsellor</b>
                  <span className="text-[10px] text-gray-300">Dr. Pratibha Deshmukh · Manas Centre</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          )}

          {/* Level 2: Psychology Peer Volunteer */}
          {isLevel2 && (
            <button
              onClick={() => {
                soundEffects.playPop();
                if (onSelectLevel) onSelectLevel(2);
                else onNavigate('level2_peer');
              }}
              className="w-full p-3.5 rounded-2xl bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-left flex items-center justify-between cursor-pointer transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-xs text-white block">Support Level 2: Talk to a Peer Guide</b>
                  <span className="text-[10px] text-emerald-200">1-on-1 Confidential Senior Student Chat</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Dismiss / I Am Safe Button */}
      <div className="pt-2 text-center">
        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigate('dashboard');
          }}
          className="text-xs text-gray-400 hover:text-white underline cursor-pointer py-1.5"
        >
          I am safe now · Return to Dashboard
        </button>
      </div>
    </div>
  );
}
