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
  Plus
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

  const handlePauseResumeRecord = () => {
    setIsPaused(!isPaused);
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
    const p = BRAINWAVE_PRESETS[presetId] || BRAINWAVE_PRESETS.theta;
    if (isTunePlaying && selectedTunePreset === presetId) {
      binauralEngine.stop(0.5);
      setIsTunePlaying(false);
    } else {
      setSelectedTunePreset(presetId);
      binauralEngine.start({
        baseFrequency: p.baseFrequency,
        beatFrequency: p.beatFrequency,
        volume: tuneVolume,
        preset: p.id
      });
      setIsTunePlaying(true);
    }
  };

  const handleSaveJournal = () => {
    if (!newEntryText.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: newEntryText.trim(),
      moodTag: selectedJournalMood,
      date: new Date().toLocaleDateString(selectedLanguage === 'mr' ? 'mr-IN' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('ubb_local_journal', JSON.stringify(updated));
    setNewEntryText('');
    setEntrySavedNotice(true);
    setTimeout(() => setEntrySavedNotice(false), 3000);
  };

  const handleDeleteJournalEntry = (id) => {
    const updated = journalEntries.filter((e) => e.id !== id);
    setJournalEntries(updated);
    localStorage.setItem('ubb_local_journal', JSON.stringify(updated));
  };

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header with Sub-Tabs */}
      <div className="px-4 pt-4 pb-2 border-b border-[#c5c8bc]/50 bg-[#f9fbeb]">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold">
                Level 1 · Self-Guided
              </div>
              <h2 className="font-fraunces text-base font-semibold text-[#1a1d14]">
                {t.level1.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => onFinishActivity('level1')}
            className="text-[10.5px] px-3 py-1 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>

        {/* 3 Interactive Sub-Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#edefe0] rounded-2xl">
          <button
            onClick={() => setActiveSubTab('let_it_out')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'let_it_out'
                ? 'bg-white text-[#815505] shadow-xs font-bold'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t.level1.tabLetItOut}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mood_tunes')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'mood_tunes'
                ? 'bg-white text-[#526140] shadow-xs font-bold'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>{t.level1.tabMoodTunes}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('journal')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'journal'
                ? 'bg-white text-[#5e5c52] shadow-xs font-bold'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.level1.tabJournal}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* ================= 1. LET IT OUT (VOICE VENTING & DELETION) ================= */}
        {activeSubTab === 'let_it_out' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3 text-center shadow-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#815505] font-bold">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Ephemeral Audio Vent
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
                  Zero Retention
                </span>
              </div>

              <p className="text-[11px] text-[#5e5c52] leading-relaxed">
                {t.level1.recordInstruction}
              </p>

              {/* Live Audio Visualizer / Timer */}
              <div className="h-28 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-[#c5c8bc] relative overflow-hidden shadow-2xs">
                {isRecording ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse shadow-md">
                      <Mic className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-base font-bold text-red-700">
                      {formatSeconds(recordingSeconds)}
                    </span>
                    <span className="text-[9.5px] font-mono text-[#5e5c52]">
                      {isPaused ? 'Recording Paused' : 'Listening… speak freely'}
                    </span>
                  </div>
                ) : hasRecordedAudio ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-[#526140] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#526140]">
                      Audio Ready ({formatSeconds(recordingSeconds)})
                    </span>
                    <span className="text-[9.5px] text-[#5e5c52]">
                      Play to review, or delete permanently below.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#5e5c52]">
                    <Mic className="w-8 h-8 text-slate-400" />
                    <span className="text-xs">Tap "Start Recording" to begin</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {!isRecording && !hasRecordedAudio && (
                  <button
                    onClick={handleStartRecord}
                    className="px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Recording</span>
                  </button>
                )}

                {isRecording && (
                  <>
                    <button
                      onClick={handlePauseResumeRecord}
                      className="px-4 py-2.5 rounded-2xl bg-[#edefe0] text-[#1a1d14] text-xs font-semibold cursor-pointer"
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleStopRecord}
                      className="px-4 py-2.5 rounded-2xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Square className="w-3.5 h-3.5 fill-white" />
                      <span>Finish</span>
                    </button>
                  </>
                )}

                {hasRecordedAudio && (
                  <>
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="px-4 py-2.5 rounded-2xl bg-[#526140] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingAudio ? 'Pause' : 'Play'}</span>
                    </button>

                    <button
                      onClick={handlePermanentDeleteAudio}
                      className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Permanently</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Permanent Deletion Confirmation Banner */}
            {showDeletionBanner && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-3xl p-4 text-xs flex items-center gap-2.5 animate-fadeIn shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-medium leading-snug">
                  {t.level1.permanentDeleteConfirm}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ================= 2. MOODTUNES (ACOUSTIC RELAXATION) ================= */}
        {activeSubTab === 'mood_tunes' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#6a7a56] text-white rounded-3xl p-5 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffddb3] font-bold flex items-center gap-1">
                  <Headphones className="w-3.5 h-3.5" /> Web Audio Synthesizer
                </span>
                <span className="font-mono text-[9px] text-[#f9ffeb]/80">No MP3s · 0ms</span>
              </div>

              <div className="text-center py-2">
                <div
                  className={`w-28 h-28 rounded-full border-2 border-[#ffddb3] bg-white/10 flex flex-col items-center justify-center mx-auto transition-all ${
                    isTunePlaying ? 'scale-110 animate-breathe shadow-lg shadow-[#ffddb3]/30' : 'scale-95'
                  }`}
                >
                  <Music className={`w-8 h-8 text-[#ffddb3] ${isTunePlaying ? 'animate-bounce' : 'opacity-80'}`} />
                  <span className="font-mono text-xs font-bold text-white mt-1">
                    {BRAINWAVE_PRESETS[selectedTunePreset]?.beatFrequency || 6} Hz
                  </span>
                </div>
              </div>

              {/* 3 Presets */}
              <div className="grid grid-cols-3 gap-1.5">
                {Object.values(BRAINWAVE_PRESETS).map((p) => {
                  const isSelected = selectedTunePreset === p.id;
                  const isCurrentPlaying = isTunePlaying && isSelected;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleToggleBinauralTune(p.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isCurrentPlaying
                          ? 'bg-[#ffddb3] border-[#ffddb3] text-[#291800] font-bold shadow-md'
                          : isSelected
                          ? 'bg-white/20 border-[#ffddb3] text-white'
                          : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      <span className="font-mono text-[9.5px] block font-bold">{p.beatFrequency}Hz</span>
                      <span className="text-[10.5px] truncate block">{p.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <Volume2 className="w-4 h-4 text-[#ffddb3]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={tuneVolume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setTuneVolume(v);
                    binauralEngine.setVolume(v);
                  }}
                  className="flex-1 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ffddb3]"
                />
                <span className="font-mono text-[10px] text-white/80">{Math.round(tuneVolume * 100)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. PRIVATE JOURNAL ================= */}
        {activeSubTab === 'journal' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#526140] font-bold">
                  New Journal Entry
                </span>
                <span className="font-mono text-[9px] text-[#5e5c52] bg-white px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/50 font-medium">
                  {t.level1.savedLocally}
                </span>
              </div>

              <textarea
                rows={3}
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                placeholder={t.level1.journalPrompt}
                className="w-full bg-white border border-[#c5c8bc] rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <select
                  value={selectedJournalMood}
                  onChange={(e) => setSelectedJournalMood(e.target.value)}
                  className="bg-white border border-[#c5c8bc] rounded-xl px-2.5 py-1 text-[11px] text-[#1a1d14] focus:outline-none"
                >
                  <option value="🌱 Gentle">🌱 Gentle</option>
                  <option value="🌧️ Heavy">🌧️ Heavy</option>
                  <option value="☀️ Calmer">☀️ Calmer</option>
                  <option value="💡 Insight">💡 Insight</option>
                </select>

                <button
                  onClick={handleSaveJournal}
                  disabled={!newEntryText.trim()}
                  className="px-4 py-2 rounded-2xl bg-[#526140] hover:bg-[#435034] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Privately</span>
                </button>
              </div>

              {entrySavedNotice && (
                <span className="text-[10.5px] text-emerald-800 font-medium block animate-fadeIn">
                  ✓ Entry saved securely to local storage.
                </span>
              )}
            </div>

            {/* Saved Entries List */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] block font-bold">
                Saved Entries ({journalEntries.length})
              </span>
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-3.5 space-y-1.5 shadow-2xs relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] bg-[#f3f5e6] px-2.5 py-0.5 rounded-full text-[#526140] font-medium">
                      {entry.moodTag} · {entry.date}
                    </span>
                    <button
                      onClick={() => handleDeleteJournalEntry(entry.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-[#1a1d14] leading-relaxed whitespace-pre-wrap">
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
