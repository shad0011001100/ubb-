import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { getTranslation } from '../../services/translations';

const MOOD_OPTIONS = [
  { id: 'good', emoji: '😊', labelKey: 'good', type: 'positive' },
  { id: 'calm', emoji: '🙂', labelKey: 'calm', type: 'positive' },
  { id: 'sad', emoji: '😔', labelKey: 'sad', type: 'concern' },
  { id: 'anxious', emoji: '😟', labelKey: 'anxious', type: 'concern' },
  { id: 'irritated', emoji: '😠', labelKey: 'irritated', type: 'concern' },
  { id: 'overwhelmed', emoji: '😣', labelKey: 'overwhelmed', type: 'concern' },
  { id: 'numb', emoji: '😶', labelKey: 'numb', type: 'concern' },
  { id: 'very_low', emoji: '😞', labelKey: 'veryLow', type: 'concern' },
  { id: 'dont_know', emoji: '🤷', labelKey: 'dontKnow', type: 'neutral' },
  { id: 'other', emoji: '✨', labelKey: 'other', type: 'neutral' },
  { id: 'prefer_not_to_say', emoji: '🔒', labelKey: 'preferNotToSay', type: 'neutral' }
];

const INTENSITY_OPTIONS = [
  { id: 'little', labelKey: 'little', weight: 1 },
  { id: 'moderate', labelKey: 'moderate', weight: 2 },
  { id: 'strong', labelKey: 'strong', weight: 3 },
  { id: 'very_strong', labelKey: 'veryStrong', weight: 4 }
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
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] font-semibold">
              UbbPulse Check-In
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen4.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-mono bg-[#F2F6F3] text-[#3A5F4B] px-2 py-0.5 rounded-full border border-[#D9E2DC]">
          <Shield className="w-2.5 h-2.5 text-[#4E7C63]" />
          <span>Non-Clinical</span>
        </div>
      </div>

      {/* Main Mood Options Grid */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {MOOD_OPTIONS.map((opt) => {
            const isSelected = selectedMood === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedMood(opt.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 active:scale-98 ${
                  isSelected
                    ? 'border-[#E3A06F] bg-[#E3A06F]/15 ring-2 ring-[#E3A06F] shadow-sm'
                    : 'border-[#D9E2DC] bg-[#F2F6F3]/50 hover:bg-[#F2F6F3]'
                }`}
              >
                <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                <span className="text-xs font-medium text-[#14282B] truncate">
                  {t.screen4.moods[opt.labelKey]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Intensity Follow-Up (Shows when mood selected) */}
        {selectedMood && selectedMood !== 'prefer_not_to_say' && (
          <div className="bg-[#F2F6F3] border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2 animate-fadeIn">
            <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#5B6E67] font-semibold block">
              {t.screen4.intensityTitle}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {INTENSITY_OPTIONS.map((lvl) => {
                const isLvlSelected = selectedIntensity === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedIntensity(lvl.id)}
                    className={`py-1.5 px-1 rounded-xl text-center text-[10px] font-mono transition-all cursor-pointer ${
                      isLvlSelected
                        ? 'bg-[#3A5F4B] text-white font-bold shadow-xs'
                        : 'bg-white border border-[#D9E2DC] text-[#5B6E67] hover:bg-slate-50'
                    }`}
                  >
                    {t.screen4.intensityLevels[lvl.labelKey]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Optional Custom Description */}
        {selectedMood === 'other' && (
          <div className="animate-fadeIn">
            <input
              type="text"
              value={customMoodNote}
              onChange={(e) => setCustomMoodNote(e.target.value)}
              placeholder="Describe in your own words..."
              className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-3.5 py-2 text-xs text-[#14282B] focus:outline-none focus:border-[#4E7C63]"
            />
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-[#D9E2DC] bg-white">
        <button
          onClick={handleProceed}
          disabled={!selectedMood}
          className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] disabled:opacity-40 text-[#241208] font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.screen4.nextBtn}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
