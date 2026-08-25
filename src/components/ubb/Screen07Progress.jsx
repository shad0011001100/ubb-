import React, { useState } from 'react';
import { ArrowLeft, TrendingDown, Flame, Award } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen07Progress({
  userProfile,
  onNavigate
}) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const [selectedWeek, setSelectedWeek] = useState('W6');
  const currentStreak = userProfile?.current_streak || 12;

  const WEEKS_DATA = userLang === 'mr' ? [
    { label: 'W1', height: '85%', stress: '८५%', note: 'परीक्षेच्या सुरुवातीचा तीव्र ताण' },
    { label: 'W2', height: '70%', stress: '७०%', note: 'Amber_17 सोबत पीअर संवाद सुरू' },
    { label: 'W3', height: '60%', stress: '६०%', note: '४-७-८ श्वसन व्यायामाचा वापर' },
    { label: 'W4', height: '55%', stress: '५५%', note: 'मध्यम ताण व भावना मोकळ्या केल्या' },
    { label: 'W5', height: '40%', stress: '४०%', note: 'झोपेच्या वेळापत्रकात सलग ७ दिवस सुधारणा' },
    { label: 'W6', height: '32%', stress: '३२%', note: 'सध्याचा आठवडा: मानसिक कणखरता व समाधान' }
  ] : [
    { label: 'W1', height: '85%', stress: '85%', note: 'Initial exam burnout check-in' },
    { label: 'W2', height: '70%', stress: '70%', note: 'Started peer sessions with Amber_17' },
    { label: 'W3', height: '60%', stress: '60%', note: 'Introduced 4-7-8 breathing pacer' },
    { label: 'W4', height: '55%', stress: '55%', note: 'Mid-term week emotional venting' },
    { label: 'W5', height: '40%', stress: '40%', note: 'Consistent sleep streak reached 7 days' },
    { label: 'W6', height: '32%', stress: '32%', note: 'Current week: Solid resilience state' }
  ];

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-fraunces text-lg font-semibold text-[#14282B]">
              {t.progress.title}
            </h2>
            <div className="font-mono text-[9.5px] text-[#5B6E67]">
              {t.progress.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Main Progress Body */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-20">
        {/* 6-Week Stress Level Trend Chart */}
        <div className="bg-[#F2F6F3] border border-[#D9E2DC] rounded-2xl p-4 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] font-semibold">
              {t.progress.chartTitle}
            </span>
            <span className="font-mono text-[9.5px] text-[#3A5F4B] font-bold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-[#3A5F4B]" />
              {t.progress.totalDrop}
            </span>
          </div>

          {/* Bar Chart Bars */}
          <div className="flex items-end gap-2.5 h-28 pt-4 pb-1 px-1">
            {WEEKS_DATA.map((w) => {
              const isSelected = selectedWeek === w.label;
              return (
                <div
                  key={w.label}
                  onClick={() => setSelectedWeek(w.label)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  <div
                    style={{ height: w.height }}
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      w.label === 'W1'
                        ? 'bg-[#E3A06F]'
                        : isSelected
                        ? 'bg-[#3A5F4B] shadow-sm'
                        : 'bg-[#4E7C63]/80 group-hover:bg-[#4E7C63]'
                    }`}
                  />
                  <span className={`font-mono text-[9px] mt-1.5 ${isSelected ? 'text-[#3A5F4B] font-bold' : 'text-[#5B6E67]'}`}>
                    {w.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Week Note */}
          <div className="bg-white/80 border border-[#D9E2DC] rounded-xl p-2 text-[10.5px] text-[#14282B] flex items-center justify-between font-mono">
            <span>{selectedWeek}: {WEEKS_DATA.find(w => w.label === selectedWeek)?.note}</span>
            <b className="text-[#3A5F4B]">{WEEKS_DATA.find(w => w.label === selectedWeek)?.stress}</b>
          </div>
        </div>

        {/* Atomic Habit & Streak Counters */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3 text-center shadow-2xs">
            <div className="flex items-center justify-center gap-1 text-[#3A5F4B] mb-1">
              <TrendingDown className="w-4 h-4" />
            </div>
            <b className="font-fraunces text-xl text-[#14282B] block">↓ 47%</b>
            <span className="text-[9.5px] text-[#5B6E67] font-mono">{t.progress.reportedStress}</span>
          </div>

          <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3 text-center shadow-2xs">
            <div className="flex items-center justify-center gap-1 text-[#E3A06F] mb-1">
              <Flame className="w-4 h-4 text-[#C9814F]" />
            </div>
            <b className="font-fraunces text-xl text-[#14282B] block">{currentStreak} {userLang === 'mr' ? 'दिवस' : 'Days'}</b>
            <span className="text-[9.5px] text-[#5B6E67] font-mono">{t.progress.checkInStreak}</span>
          </div>
        </div>

        {/* Milestone Card */}
        <div className="bg-gradient-to-r from-[#F2F6F3] to-[#FDF8F5] border border-[#E3A06F]/40 rounded-2xl p-3.5 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E3A06F] text-[#241208] flex items-center justify-center flex-shrink-0">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-xs text-[#14282B]">
              {t.progress.milestoneTitle}
            </span>
          </div>
          <p className="text-[11px] text-[#5B6E67] leading-relaxed">
            {t.progress.milestoneDesc}
          </p>
        </div>

        {/* Weekly Journal / Reflection prompt */}
        <div className="bg-[#F2F6F3] border border-[#D9E2DC] rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <div className="font-medium text-xs text-[#14282B]">{t.progress.habitTitle}</div>
            <div className="text-[10px] text-[#5B6E67]">{t.progress.habitSub}</div>
          </div>
          <button
            onClick={() => onNavigate('self_care')}
            className="text-[10px] px-3 py-1.5 rounded-full bg-[#3A5F4B] text-white font-semibold cursor-pointer hover:bg-[#2C4839]"
          >
            {t.progress.logMoodBtn}
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-[#D9E2DC] flex items-center justify-around px-2 z-10">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-0.5 text-[#5B6E67] cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">{t.common.home}</span>
        </button>
        <button onClick={() => onNavigate('ai_chat')} className="flex flex-col items-center gap-0.5 text-[#5B6E67] cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v10H8l-4 4V5z" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">{t.common.talk}</span>
        </button>
        <button onClick={() => onNavigate('progress')} className="flex flex-col items-center gap-0.5 text-[#3A5F4B] font-semibold cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 18l5-6 4 4 7-9" stroke="currentColor" strokeWidth="1.8"/></svg>
          <span className="text-[9px]">{t.common.progress}</span>
        </button>
        <button onClick={() => onNavigate('self_care')} className="flex flex-col items-center gap-0.5 text-[#5B6E67] cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-2-1-3-1-3s2 2 2 5a7 7 0 11-13-4c0-3 2-4 2-4s1 2 4-1z" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">{t.common.selfCare}</span>
        </button>
      </div>
    </div>
  );
}
