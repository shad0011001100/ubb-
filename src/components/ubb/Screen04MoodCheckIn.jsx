import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';
import { getTranslation } from '../../services/translations';

const MOOD_OPTIONS = [
  { id: 'good', emoji: '😊', labelKey: 'good', type: 'positive', color: 'hover:border-emerald-500' },
  { id: 'calm', emoji: '🙂', labelKey: 'calm', type: 'positive', color: 'hover:border-[#526140]' },
  { id: 'sad', emoji: '😔', labelKey: 'sad', type: 'concern', color: 'hover:border-blue-400' },
  { id: 'anxious', emoji: '😟', labelKey: 'anxious', type: 'concern', color: 'hover:border-amber-500' },
  { id: 'irritated', emoji: '😠', labelKey: 'irritated', type: 'concern', color: 'hover:border-rose-500' },
  { id: 'overwhelmed', emoji: '😣', labelKey: 'overwhelmed', type: 'concern', color: 'hover:border-orange-500' },
  { id: 'numb', emoji: '😶', labelKey: 'numb', type: 'concern', color: 'hover:border-slate-400' },
  { id: 'very_low', emoji: '😞', labelKey: 'veryLow', type: 'concern', color: 'hover:border-red-600' },
  { id: 'dont_know', emoji: '🤷', labelKey: 'dontKnow', type: 'neutral', color: 'hover:border-[#815505]' },
  { id: 'other', emoji: '✨', labelKey: 'other', type: 'neutral', color: 'hover:border-purple-400' }
];

const INTENSITY_OPTIONS = [
  { id: 'little', labelKey: 'little', weight: 1, bar: 'w-1/4 bg-emerald-500' },
  { id: 'moderate', labelKey: 'moderate', weight: 2, bar: 'w-2/4 bg-amber-500' },
  { id: 'strong', labelKey: 'strong', weight: 3, bar: 'w-3/4 bg-orange-500' },
  { id: 'very_strong', labelKey: 'veryStrong', weight: 4, bar: 'w-full bg-red-600' }
];

export function Screen04MoodCheckIn({
  onSelectMoodFlow,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState('moderate');
  const [customMoodNote, setCustomMoodNote] = useState('');

  const handleProceed = () => {
    if (!selectedMood) return;

    const moodObj = MOOD_OPTIONS.find((m) => m.id === selectedMood);
    const checkInData = {
      moodId: selectedMood,
      emoji: moodObj?.emoji || '😐',
      label: t.screen4.moods[moodObj?.labelKey] || selectedMood,
      type: moodObj?.type || 'concern',
      intensity: selectedIntensity,
      customNote: customMoodNote.trim()
    };

    onSelectMoodFlow(checkInData);
  };

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
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              Step 1 · Check-in
            </div>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {t.screen4.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Private</span>
        </div>
      </div>

      {/* Main Mood Selection & Intensity */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4 pb-6">
        <p className="text-[11px] text-[#5e5c52] px-1">
          {t.screen4.subtitle}
        </p>

        {/* 10 Visual Mood Reaction Tiles Grid (2 columns on mobile) */}
        <div className="grid grid-cols-2 gap-2">
          {MOOD_OPTIONS.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs active:scale-95 ${
                  isSelected
                    ? 'border-[#526140] bg-[#f3f5e6] shadow-sm ring-1 ring-[#526140]'
                    : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f9fbeb]'
                }`}
              >
                <span className={`text-2xl transition-transform ${isSelected ? 'scale-120' : ''}`}>
                  {m.emoji}
                </span>
                <span className={`text-xs font-medium truncate ${isSelected ? 'text-[#526140] font-bold' : 'text-[#1a1d14]'}`}>
                  {t.screen4.moods[m.labelKey] || m.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Visual Intensity Selector (Only if a mood is chosen) */}
        {selectedMood && (
          <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-3.5 space-y-2.5 shadow-2xs animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#526140] font-bold block">
                {t.screen4.intensityTitle}
              </label>
              <span className="font-mono text-[9px] text-[#815505] font-bold capitalize">
                {t.screen4.intensityLevels[selectedIntensity] || selectedIntensity}
              </span>
            </div>

            {/* 4 Visual Intensity Segment Pills */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#edefe0] p-1 rounded-2xl">
              {INTENSITY_OPTIONS.map((level) => {
                const isSelected = selectedIntensity === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => setSelectedIntensity(level.id)}
                    className={`py-1.5 rounded-xl text-[10.5px] font-semibold text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#526140] text-white font-bold shadow-xs'
                        : 'text-[#5e5c52] hover:text-[#1a1d14]'
                    }`}
                  >
                    {t.screen4.intensityLevels[level.labelKey]}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Button */}
      <div className="p-4 border-t border-[#c5c8bc]/40 bg-[#f9fbeb]">
        <button
          onClick={handleProceed}
          disabled={!selectedMood}
          className={`w-full py-3.5 rounded-full font-bold text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer ${
            selectedMood
              ? 'bg-[#526140] hover:bg-[#435034] text-white'
              : 'bg-[#c5c8bc] text-[#5e5c52] opacity-60 cursor-not-allowed'
          }`}
        >
          <span>{t.screen4.nextBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
