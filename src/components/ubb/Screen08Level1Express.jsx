import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Flame,
  Music,
  BookOpen,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Volume2,
  VolumeX,
  Headphones,
  Save,
  Plus,
  Radio,
  Sparkles,
  Waves
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { binauralEngine, BRAINWAVE_PRESETS } from '../../services/binauralAudio';

export function Screen08Level1Express({
  defaultTab = 'let_it_out',
  onFinishActivity,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [activeSubTab, setActiveSubTab] = useState(defaultTab);

  // Let It Out states
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showDeletionBanner, setShowDeletionBanner] = useState(false);
  const timerRef = useRef(null);

  // MoodTunes states
  const [selectedTunePreset, setSelectedTunePreset] = useState('theta');
  const [isTunePlaying, setIsTunePlaying] = useState(false);
  const [tuneVolume, setTuneVolume] = useState(0.5);

  // Soundscape visual presets
  const SOUNDSCAPE_PRESETS = [
    { id: 'theta', label: 'Theta Calm', sub: '6Hz · Deep Meditation', icon: '🌌', color: 'from-[#526140] to-[#3a472a]' },
    { id: 'alpha', label: 'Ocean Alpha', sub: '10Hz · Anxiety Relief', icon: '🌊', color: 'from-[#4E7C63] to-[#2d4f3e]' },
    { id: 'gamma', label: 'Study Beta', sub: '18Hz · Active Focus', icon: '⚡', color: 'from-[#815505] to-[#593902]' },
    { id: 'delta', label: 'Sleep Delta', sub: '3Hz · Deep Rest', icon: '🌙', color: 'from-[#3A5F4B] to-[#1e382b]' }
  ];

  // Journal states
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ubb_local_journal') || '[]');
    } catch {
      return [];
    }
  });
  const [newEntryText, setNewEntryText] = useState('');
  const [selectedJournalMood, setSelectedJournalMood] = useState('🌱 Gentle');
  const [entrySavedNotice, setEntrySavedNotice] = useState(false);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused]);

  useEffect(() => {
    return () => {
      binauralEngine.stop(0.3);
    };
  }, []);

  const handleStartRecord = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingSeconds(0);
    setHasRecordedAudio(false);
    setShowDeletionBanner(false);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    setIsPaused(false);
    setHasRecordedAudio(true);
  };

  const handlePermanentDeleteAudio = () => {
    setIsRecording(false);
    setIsPaused(false);
    setHasRecordedAudio(false);
    setIsPlayingAudio(false);
    setRecordingSeconds(0);
    setShowDeletionBanner(true);
    setTimeout(() => setShowDeletionBanner(false), 5000);
  };

  const handleToggleBinauralTune = (presetId) => {
    if (isTunePlaying && selectedTunePreset === presetId) {
      binauralEngine.stop(0.4);
      setIsTunePlaying(false);
    } else {
      setSelectedTunePreset(presetId);
      binauralEngine.play(presetId, tuneVolume);
      setIsTunePlaying(true);
    }
  };

  const handleVolumeChange = (newVol) => {
    setTuneVolume(newVol);
    binauralEngine.setVolume(newVol);
  };

  const handleSaveJournalEntry = () => {
    if (!newEntryText.trim()) return;
    const entry = {
      id: Date.now().toString(),
      text: newEntryText.trim(),
      mood: selectedJournalMood,
      timestamp: new Date().toLocaleDateString(selectedLanguage === 'mr' ? 'mr-IN' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [entry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('ubb_local_journal', JSON.stringify(updated));
    setNewEntryText('');
    setEntrySavedNotice(true);
    setTimeout(() => setEntrySavedNotice(false), 3000);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              Level 1 · Express & Self-Care
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {activeSubTab === 'let_it_out' ? 'Let It Out' : activeSubTab === 'mood_tunes' ? 'MoodTunes' : 'Private Journal'}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9px] bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full border border-[#526140]/20 font-bold">
          100% Private
        </span>
      </div>

      {/* 3 Visual Sub-Tabs */}
      <div className="px-4 pt-2.5">
        <div className="grid grid-cols-3 gap-1.5 bg-[#edefe0] p-1 rounded-2xl border border-[#c5c8bc]/60">
          <button
            onClick={() => setActiveSubTab('let_it_out')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'let_it_out'
                ? 'bg-amber-100 text-[#815505] font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#815505]" />
            <span>Vent</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mood_tunes')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'mood_tunes'
                ? 'bg-[#526140] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Acoustic</span>
          </button>

          <button
            onClick={() => setActiveSubTab('journal')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'journal'
                ? 'bg-[#5e5c52] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
        </div>
      </div>

      {/* ================= MAIN INTERACTIVE VISUAL CONTENT ================= */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-6">
        {/* TAB 1: LET IT OUT (INTENSELY VISUAL MIC & BURN-ON-DELETE) */}
        {activeSubTab === 'let_it_out' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Visual Mic Hero Orb */}
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-5 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
              {/* Pulsing visual halo when recording */}
              {isRecording && (
                <div className="absolute w-44 h-44 rounded-full bg-red-400/20 animate-ping pointer-events-none" />
              )}

              <button
                onClick={isRecording ? handleStopRecord : handleStartRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer relative z-10 active:scale-95 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#526140] hover:bg-[#435034] text-white'
                }`}
              >
                {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-9 h-9" />}
              </button>

              <div className="mt-3">
                <span className="font-mono text-xs font-bold text-[#1a1d14] block">
                  {isRecording ? `Recording... 00:${recordingSeconds < 10 ? '0' + recordingSeconds : recordingSeconds}` : 'Tap Mic to Speak Freely'}
                </span>
                <span className="text-[10px] text-[#5e5c52] block mt-0.5">
                  {isRecording ? 'Auto-deletes upon finish' : 'Zero logs · 100% Ephemeral audio'}
                </span>
              </div>

              {/* Animated Waveform Visualizer */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[24, 40, 16, 48, 32, 56, 20, 36, 44, 28].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-1 bg-red-500 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Recorded Playback & Burn Actions */}
            {hasRecordedAudio && (
              <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3 shadow-xs animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-2xl bg-[#526140] text-white flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div>
                      <b className="text-xs text-[#1a1d14] block">Private Recording</b>
                      <span className="font-mono text-[9.5px] text-[#5e5c52]">00:{recordingSeconds < 10 ? '0' + recordingSeconds : recordingSeconds} · Ready to Burn</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePermanentDeleteAudio}
                    className="px-3.5 py-2 rounded-2xl bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Burn / Delete</span>
                  </button>
                </div>
              </div>
            )}

            {/* Deletion confirmation banner */}
            {showDeletionBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Recording permanently incinerated. Zero bytes stored.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MOODTUNES (VISUAL SOUNDSCAPE PRESET CARDS & EQUALIZER) */}
        {activeSubTab === 'mood_tunes' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Visual Equalizer / Now Playing Bar */}
            <div className="bg-[#526140] text-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
                  {SOUNDSCAPE_PRESETS.find((s) => s.id === selectedTunePreset)?.icon || '🌌'}
                </div>
                <div>
                  <b className="text-xs text-white block">
                    {SOUNDSCAPE_PRESETS.find((s) => s.id === selectedTunePreset)?.label}
                  </b>
                  <span className="font-mono text-[9.5px] text-emerald-200 block">
                    {isTunePlaying ? 'Playing Web Audio · 0ms' : 'Tap preset below to play'}
                  </span>
                </div>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-6">
                {[12, 20, 8, 24, 16].map((h, idx) => (
                  <div
                    key={idx}
                    style={{ height: isTunePlaying ? `${h}px` : '4px' }}
                    className={`w-1 bg-[#ffddb3] rounded-full transition-all duration-300 ${
                      isTunePlaying ? 'animate-pulse' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 4 Visual Soundscape Preset Cards */}
            <div className="grid grid-cols-2 gap-2">
              {SOUNDSCAPE_PRESETS.map((preset) => {
                const isSelected = selectedTunePreset === preset.id && isTunePlaying;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleToggleBinauralTune(preset.id)}
                    className={`p-3.5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden shadow-2xs active:scale-98 ${
                      isSelected
                        ? 'border-[#526140] bg-[#f3f5e6] shadow-sm'
                        : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f9fbeb]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{preset.icon}</span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-2xs ${
                        isSelected ? 'bg-[#526140] text-white' : 'bg-[#edefe0] text-[#526140]'
                      }`}>
                        {isSelected ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </span>
                    </div>

                    <div>
                      <b className="text-xs text-[#1a1d14] block">{preset.label}</b>
                      <span className="font-mono text-[9px] text-[#5e5c52] block">{preset.sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Volume Slider */}
            <div className="bg-white border border-[#c5c8bc]/60 rounded-2xl p-3 flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-[#5e5c52]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={tuneVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 accent-[#526140] cursor-pointer"
              />
              <span className="font-mono text-[10px] text-[#5e5c52]">{Math.round(tuneVolume * 100)}%</span>
            </div>
          </div>
        )}

        {/* TAB 3: PRIVATE JOURNAL */}
        {activeSubTab === 'journal' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Visual Mood Tags */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['🌱 Gentle', '🔥 Venting', '✨ Grateful', '💭 Thinking', '🌧️ Heavy'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedJournalMood(m)}
                  className={`text-[11px] px-3 py-1 rounded-full border cursor-pointer transition-all flex-shrink-0 ${
                    selectedJournalMood === m
                      ? 'bg-[#5e5c52] text-white border-[#5e5c52] font-semibold'
                      : 'bg-white border-[#c5c8bc]/60 text-[#5e5c52] hover:bg-[#f3f5e6]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Journal Input Box */}
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-3.5 space-y-2 shadow-2xs">
              <textarea
                rows={4}
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                placeholder="Write your thoughts freely... Saved 100% on your device."
                className="w-full text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-1 border-t border-[#c5c8bc]/30">
                <span className="font-mono text-[9px] text-[#75786e]">
                  Device-only · Zero cloud transmission
                </span>

                <button
                  onClick={handleSaveJournalEntry}
                  disabled={!newEntryText.trim()}
                  className="px-3.5 py-1.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40 transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </div>
            </div>

            {entrySavedNotice && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 text-xs text-emerald-800 flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Saved privately to local journal.</span>
              </div>
            )}

            {/* Saved Entries List */}
            {journalEntries.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                  Saved Notes ({journalEntries.length})
                </span>
                {journalEntries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="bg-[#f3f5e6] border border-[#c5c8bc]/50 rounded-2xl p-3 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#526140]">{entry.mood}</span>
                      <span className="font-mono text-[#75786e]">{entry.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#1a1d14] leading-relaxed whitespace-pre-wrap">{entry.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="p-4 border-t border-[#c5c8bc]/40 bg-[#f9fbeb]">
        <button
          onClick={() => onFinishActivity(activeSubTab)}
          className="w-full py-3 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer text-center"
        >
          Done · Rate Helpfulness →
        </button>
      </div>
    </div>
  );
}
