import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Sparkles, Calendar, Trash2, CheckCircle2, Shield } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';

const SAMPLE_HISTORY = [
  { id: 1, date: 'Today, 10:15 PM', mood: '😊 Good', intensity: 'Moderate', topics: ['Academics'], helpfulness: 'Really helpful' },
  { id: 2, date: 'Yesterday, 04:30 PM', mood: '😟 Anxious', intensity: 'Strong', topics: ['Exam Stress'], helpfulness: 'Good' },
  { id: 3, date: '2 days ago', mood: '🙂 Calm', intensity: 'A little', topics: ['General Wellbeing'], helpfulness: 'Really helpful' }
];

export function MyJourneyView({
  userProfile,
  onNavigate,
  onResetAllData,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [history, setHistory] = useState(SAMPLE_HISTORY);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletedNotice, setDeletedNotice] = useState(false);

  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  const handleDeleteAllData = async () => {
    localStorage.removeItem('ubb_local_journal');
    localStorage.removeItem('ubb_user_profile');
    setHistory([]);
    setDeletedNotice(true);
    setTimeout(() => {
      if (onResetAllData) onResetAllData();
      onNavigate('login_selection');
    }, 1500);
  };

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#3A5F4B] font-bold">
              Progress & History
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen3.journeyTitle}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9px] bg-slate-100 px-2 py-0.5 rounded-full text-[#5B6E67]">
          {anonId}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* Wellbeing Trend Graph Summary */}
        <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#3A5F4B] font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Check-In Continuity
            </span>
            <span className="font-mono text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              3 Day Streak 🔥
            </span>
          </div>

          {/* Simple Sparkline Representation */}
          <div className="h-14 flex items-end justify-between gap-2 px-2 pt-2 border-b border-[#F2F6F3]">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const heights = [40, 60, 50, 75, 80, 65, 85];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    style={{ height: `${heights[idx]}%` }}
                    className="w-full max-w-[14px] bg-[#3A5F4B] rounded-t-sm opacity-80 hover:opacity-100 transition-all"
                  />
                  <span className="font-mono text-[8px] text-[#5B6E67]">{day}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[10.5px] text-[#5B6E67] leading-snug">
            Your self-care check-ins show steady emotional regulation over the last 7 days.
          </p>
        </div>

        {/* Previous Check-Ins List */}
        <div className="space-y-2">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5B6E67] font-semibold block">
            Previous Check-Ins ({history.length})
          </span>

          {history.length === 0 ? (
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 text-center text-xs text-[#5B6E67]">
              All local logs cleared.
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#D9E2DC] rounded-2xl p-3 space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <b className="text-xs text-[#14282B]">{item.mood}</b>
                  <span className="font-mono text-[9px] text-[#5B6E67]">{item.date}</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-[#5B6E67]">
                  <span>Topic: {item.topics.join(', ')}</span>
                  <span className="font-mono text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded">
                    {item.helpfulness}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Privacy & Delete My Data Action */}
        <div className="bg-white border border-red-200 rounded-2xl p-3.5 space-y-2 mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#14282B] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#3A5F4B]" />
              Data Privacy & Erasure
            </span>
          </div>
          <p className="text-[10.5px] text-[#5B6E67] leading-snug">
            You hold total control over your journey. You can permanently wipe all local journal entries, check-in history, and anonymous profiles in one tap.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete My Data Permanently</span>
            </button>
          ) : (
            <div className="space-y-1.5 animate-fadeIn">
              <p className="text-[10.5px] text-red-800 font-semibold text-center">
                Are you sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAllData}
                  className="flex-1 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
                >
                  Yes, Wipe All
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-[#5B6E67] text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {deletedNotice && (
            <div className="text-center text-xs text-emerald-700 font-bold py-1 animate-fadeIn">
              ✓ All data wiped. Returning to login...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
