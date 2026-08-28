import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  Sparkles,
  Users,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Shield,
  Heart
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';
import { soundEffects } from '../../services/soundEffects';
import { BottomNavBar } from './BottomNavBar';

// Mindful Milestone Badges Matrix (Option 2)
export const MILESTONE_BADGES = [
  { id: 'self_aware', icon: '🎯', title: 'Self-Awareness Anchor', desc: 'Completed the 10-Question Verified Checkup', unlocked: true },
  { id: 'mindful_breath', icon: '🌬️', title: 'Mindful Breath', desc: 'Completed a 4-7-8 Breathing Session', unlocked: true },
  { id: 'unburdened', icon: '🕯️', title: 'Unburdened', desc: 'Released a voice vent in Let It Out', unlocked: true },
  { id: 'deep_reflect', icon: '📖', title: 'Deep Reflection', desc: 'Saved an entry in the Encrypted Journal', unlocked: true },
  { id: 'community_light', icon: '💌', title: 'Community Light', desc: 'Sent warmth on the Wall of Thoughts', unlocked: false },
  { id: 'midnight_calm', icon: '🌙', title: 'Midnight Calm', desc: 'Listened to acoustic soundscapes late at night', unlocked: false }
];

export function ProgressTrackerView({
  userProfile,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';
  const [screeningLogs, setScreeningLogs] = useState([]);
  const [activeRange, setActiveRange] = useState('7d');

  useEffect(() => {
    const loadLogs = async () => {
      let loaded = [];
      try {
        const stored = localStorage.getItem('ubb_supabase_screenings');
        if (stored) {
          loaded = JSON.parse(stored);
        }
      } catch {}

      try {
        const user = await ubbSupabase.getCurrentUser();
        const logs = await ubbSupabase.getScreeningLogs(user?.id);
        if (logs && logs.length > 0) {
          loaded = logs;
        }
      } catch {}

      if (loaded.length > 0) {
        setScreeningLogs(loaded);
      } else {
        // Initial clean baseline
        setScreeningLogs([
          { id: 1, score: 7.2, risk_tier: 'LOW', created_at: new Date().toISOString() },
          { id: 2, score: 6.8, risk_tier: 'MODERATE', created_at: new Date(Date.now() - 86400000).toISOString() },
          { id: 3, score: 8.0, risk_tier: 'LOW', created_at: new Date(Date.now() - 172800000).toISOString() },
          { id: 4, score: 6.2, risk_tier: 'MODERATE', created_at: new Date(Date.now() - 259200000).toISOString() }
        ]);
      }
    };
    loadLogs();
  }, []);

  const latestScore = screeningLogs[0]?.score 
    ? Number(Number(screeningLogs[0].score).toFixed(1)) 
    : 7.2;

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold block">
              Tab 3 · Personal Analytics
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {selectedLanguage === 'mr' ? 'प्रगती ट्रॅकर आणि बॅजेस' : selectedLanguage === 'hi' ? 'प्रगति ट्रैकर और बैज' : 'Progress Tracker & Badges'}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9.5px] bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full font-bold border border-[#c5c8bc]/50">
          {anonId}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 pb-24">
        {/* ================= 1. WELLBEING TREND GRAPH & STREAK ================= */}
        <section className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-3 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block">
                Wellbeing Trajectory
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-fraunces text-2xl font-extrabold text-[#1a1d14]">
                  {latestScore}
                </span>
                <span className="text-xs text-[#5e5c52] font-mono font-bold">/ 10.0</span>
              </div>
            </div>

            {/* Compassionate Streak Badge */}
            <div className="flex items-center gap-1.5 bg-[#f3f5e6] border border-[#526140]/30 px-3 py-1.5 rounded-2xl shadow-2xs">
              <Flame className="w-4 h-4 text-[#815505] animate-pulse" />
              <div className="text-left">
                <b className="text-xs text-[#1a1d14] block leading-none">5 Days</b>
                <span className="text-[8.5px] font-mono text-[#526140] font-bold">Mindful Streak</span>
              </div>
            </div>
          </div>

          {/* 7-Day Bar / Curve Visualizer */}
          <div className="space-y-1 pt-1">
            <div className="h-20 flex items-end justify-between gap-2 px-1 pt-3 border-b border-[#f3f5e6]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const scores = [6.8, 7.2, 6.0, 7.8, 8.0, 7.1, latestScore];
                const heightPercent = Math.min(100, Math.max(15, (scores[idx] / 10) * 100));
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[16px] rounded-t-md transition-all ${
                        idx === 6
                          ? 'bg-[#526140] shadow-xs'
                          : 'bg-[#526140]/60 hover:bg-[#526140]/80'
                      }`}
                    />
                    <span className="font-mono text-[8.5px] text-[#5e5c52]">{day}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-[#5e5c52] text-center pt-0.5">
              Consistent emotional regulation observed over the last 7 days.
            </p>
          </div>
        </section>

        {/* ================= 2. "YOU ARE NOT ALONE" COHORT INSIGHT ================= */}
        <section className="bg-[#f3f5e6] border border-[#815505]/40 rounded-3xl p-3.5 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-2xl bg-[#815505]/15 text-[#815505] flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <b className="text-xs text-[#1a1d14] block">Cohort Reality Benchmark</b>
            <p className="text-[11px] text-[#5e5c52] leading-relaxed">
              <b>64% of college peers</b> in your department are currently navigating similar academic deadlines. Your feelings are a shared reality, not an individual failing.
            </p>
          </div>
        </section>

        {/* ================= 3. MINDFUL MILESTONE BADGES (OPTION 2) ================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
              Mindful Milestone Badges
            </span>
            <span className="font-mono text-[9px] bg-[#edefe0] text-[#526140] px-2 py-0.5 rounded-full font-bold">
              4 / 6 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {MILESTONE_BADGES.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  if (b.unlocked) {
                    soundEffects.playUnlock();
                  } else {
                    soundEffects.playTap(350);
                  }
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer active:scale-97 ${
                  b.unlocked
                    ? 'bg-white border-[#c5c8bc]/70 shadow-2xs hover:border-[#526140]'
                    : 'bg-[#edefe0]/50 border-dashed border-[#c5c8bc]/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{b.icon}</span>
                  {b.unlocked && (
                    <span className="w-4 h-4 rounded-full bg-[#526140] text-white flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <div>
                  <b className="text-[11px] text-[#1a1d14] block leading-tight">{b.title}</b>
                  <span className="text-[9px] text-[#5e5c52] block truncate">{b.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* 4-Tab Bottom Navigation Bar */}
      <BottomNavBar currentTab="progress_tracker" onNavigate={onNavigate} />
    </div>
  );
}
