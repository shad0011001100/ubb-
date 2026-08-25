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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              UbbPulse Check-In
            </div>
            <h2 className="font-fraunces text-lg font-bold text-[#1a1d14]">
              {t.screen4.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <Shield className="w-3 h-3 text-[#526140]" />
          <span>Non-Clinical</span>
        </div>
      </div>

      {/* Main Mood Options Grid */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5">
        <div className="grid grid-cols-2 gap-2.5">
          {MOOD_OPTIONS.map((opt) => {
            const isSelected = selectedMood === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedMood(opt.id)}
                className={`p-3.5 rounded-3xl border text-left transition-all cursor-pointer flex items-center gap-3 active:scale-98 ${
                  isSelected
                    ? 'border-[#526140] bg-[#6a7a56]/15 ring-2 ring-[#526140] shadow-sm'
                    : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
                }`}
              >
                <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                <span className="text-xs font-semibold text-[#1a1d14] truncate">
                  {t.screen4.moods[opt.labelKey]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Intensity Follow-Up (Shows when mood selected) */}
        {selectedMood && selectedMood !== 'prefer_not_to_say' && (
          <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2.5 animate-fadeIn shadow-2xs">
            <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block">
              {t.screen4.intensityTitle}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {INTENSITY_OPTIONS.map((lvl) => {
                const isLvlSelected = selectedIntensity === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedIntensity(lvl.id)}
                    className={`py-2 px-1 rounded-2xl text-center text-[10.5px] font-mono transition-all cursor-pointer ${
                      isLvlSelected
                        ? 'bg-[#526140] text-white font-bold shadow-xs'
                        : 'bg-white border border-[#c5c8bc]/60 text-[#5e5c52] hover:bg-slate-50'
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
              className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-4 py-2.5 text-xs text-[#1a1d14] focus:outline-none focus:border-[#526140]"
            />
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-[#c5c8bc]/50 bg-[#f9fbeb]">
        <button
          onClick={handleProceed}
          disabled={!selectedMood}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.screen4.nextBtn}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
