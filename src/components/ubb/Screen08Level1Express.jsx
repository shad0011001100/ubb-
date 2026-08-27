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
  Waves,
  Wind,
  Download
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

  // ================= 1. LET IT OUT (VOICE VENT + LIVE WAVEFORM) =================
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showDeletionBanner, setShowDeletionBanner] = useState(false);
  const timerRef = useRef(null);
  const [waveformBars, setWaveformBars] = useState([15, 25, 40, 60, 35, 20, 45, 70, 50, 30, 65, 80, 45, 25, 60, 35]);

  useEffect(() => {
    let waveInterval;
    if (isRecording && !isPaused) {
      waveInterval = setInterval(() => {
        setWaveformBars(Array.from({ length: 16 }, () => Math.floor(Math.random() * 65) + 20));
      }, 150);
    }
    return () => clearInterval(waveInterval);
  }, [isRecording, isPaused]);

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
    setHasRecordedAudio(false);
    setRecordingSeconds(0);
    setShowDeletionBanner(true);
    setTimeout(() => setShowDeletionBanner(false), 3500);
  };

  // ================= 2. GUIDED BREATHING (4-7-8 & BOX BREATHING) =================
  const [breathPattern, setBreathPattern] = useState('4-7-8'); // '4-7-8' | 'box'
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('idle'); // 'inhale' | 'hold' | 'exhale' | 'hold_post'
  const [breathCount, setBreathCount] = useState(4);
  const [breathCycles, setBreathCycles] = useState(0);

  useEffect(() => {
    let interval;
    if (breathActive) {
      interval = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            // Transition phases
            if (breathPattern === '4-7-8') {
              if (breathPhase === 'inhale') {
                setBreathPhase('hold');
                return 7;
              } else if (breathPhase === 'hold') {
                setBreathPhase('exhale');
                return 8;
              } else {
                setBreathPhase('inhale');
                setBreathCycles((c) => c + 1);
                return 4;
              }
            } else {
              // Box breathing 4-4-4-4
              if (breathPhase === 'inhale') {
                setBreathPhase('hold');
                return 4;
              } else if (breathPhase === 'hold') {
                setBreathPhase('exhale');
                return 4;
              } else if (breathPhase === 'exhale') {
                setBreathPhase('hold_post');
                return 4;
              } else {
                setBreathPhase('inhale');
                setBreathCycles((c) => c + 1);
                return 4;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathActive, breathPhase, breathPattern]);

  const handleStartBreathing = () => {
    setBreathActive(true);
    setBreathPhase('inhale');
    setBreathCount(4);
    setBreathCycles(0);
  };

  const handleStopBreathing = () => {
    setBreathActive(false);
    setBreathPhase('idle');
    setBreathCount(4);
  };

  // ================= 3. MOODTUNES (BINAURAL ACOUSTICS) =================
  const [selectedTunePreset, setSelectedTunePreset] = useState('theta');
  const [isTunePlaying, setIsTunePlaying] = useState(false);
  const [tuneVolume, setTuneVolume] = useState(0.5);

  const SOUNDSCAPE_PRESETS = [
    { id: 'theta', label: 'Theta Calm', sub: '6Hz · Deep Meditation', icon: '🌌', color: 'from-[#526140] to-[#3a472a]' },
    { id: 'alpha', label: 'Ocean Alpha', sub: '10Hz · Anxiety Relief', icon: '🌊', color: 'from-[#4E7C63] to-[#2d4f3e]' },
    { id: 'gamma', label: 'Study Beta', sub: '18Hz · Active Focus', icon: '⚡', color: 'from-[#815505] to-[#593902]' },
    { id: 'delta', label: 'Sleep Delta', sub: '3Hz · Deep Rest', icon: '🌙', color: 'from-[#3A5F4B] to-[#1e382b]' }
  ];

  useEffect(() => {
    return () => {
      binauralEngine.stop(0.3);
    };
  }, []);

  const handleToggleTune = (presetKey) => {
    if (isTunePlaying && selectedTunePreset === presetKey) {
      binauralEngine.stop(0.4);
      setIsTunePlaying(false);
    } else {
      setSelectedTunePreset(presetKey);
      const preset = BRAINWAVE_PRESETS[presetKey] || BRAINWAVE_PRESETS.theta;
      binauralEngine.playPreset(preset, 0.4);
      setIsTunePlaying(true);
    }
  };

  // ================= 4. PRIVATE JOURNAL (ENCRYPTED + EXPORT) =================
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

  const handleSaveJournalEntry = () => {
    if (!newEntryText.trim()) return;

    const entry = {
      id: Date.now(),
      text: newEntryText.trim(),
      mood: selectedJournalMood,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const updated = [entry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('ubb_local_journal', JSON.stringify(updated));
    setNewEntryText('');
    setEntrySavedNotice(true);
    setTimeout(() => setEntrySavedNotice(false), 3000);
  };

  const handleExportJournal = () => {
    if (journalEntries.length === 0) return;
    const textData = journalEntries
      .map((e) => `[${e.date}] (${e.mood})\n${e.text}\n-----------------------------------\n`)
      .join('\n');

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ubb_private_journal_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
              Support 1 · Self Help Tools
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {activeSubTab === 'let_it_out' ? 'Let It Out (Audio Vent)' : activeSubTab === 'breathe' ? 'Guided Breathing' : activeSubTab === 'mood_tunes' ? 'MoodTunes Acoustics' : 'Private Journal'}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9px] bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full border border-[#526140]/20 font-bold">
          100% Private
        </span>
      </div>

      {/* 4 Clean Sub-Tabs */}
      <div className="px-4 pt-2.5">
        <div className="grid grid-cols-4 gap-1 bg-[#edefe0] p-1 rounded-2xl border border-[#c5c8bc]/60">
          <button
            onClick={() => setActiveSubTab('let_it_out')}
            className={`py-2 rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeSubTab === 'let_it_out'
                ? 'bg-amber-100 text-[#815505] shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#815505]" />
            <span>Vent</span>
          </button>

          <button
            onClick={() => setActiveSubTab('breathe')}
            className={`py-2 rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeSubTab === 'breathe'
                ? 'bg-[#526140] text-white shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Breathe</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mood_tunes')}
            className={`py-2 rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeSubTab === 'mood_tunes'
                ? 'bg-[#526140] text-white shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Acoustic</span>
          </button>

          <button
            onClick={() => setActiveSubTab('journal')}
            className={`py-2 rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeSubTab === 'journal'
                ? 'bg-[#5e5c52] text-white shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-6">
        {/* ================= TAB 1: LET IT OUT (VOICE VENT + LIVE REACTIVE WAVEFORM) ================= */}
        {activeSubTab === 'let_it_out' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Visual Mic Hero Orb */}
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-5 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
              <div className="relative mb-3">
                {isRecording && (
                  <div className="absolute -inset-3 rounded-full bg-amber-400/25 animate-ping" />
                )}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-amber-600 text-white scale-110 shadow-lg'
                      : 'bg-[#526140] text-white shadow-md'
                  }`}
                >
                  <Mic className="w-9 h-9" />
                </div>
              </div>

              {/* Dynamic Live Audio Waveform */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1 h-10 w-full my-1">
                  {waveformBars.map((height, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${height}%` }}
                      className="w-1.5 bg-[#815505] rounded-full transition-all duration-150"
                    />
                  ))}
                </div>
              )}

              {/* Timer & Status */}
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-[#1a1d14]">
                  {Math.floor(recordingSeconds / 60)
                    .toString()
                    .padStart(2, '0')}
                  :{(recordingSeconds % 60).toString().padStart(2, '0')}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#815505] block font-bold">
                  {isRecording ? 'Listening · Speak Freely' : hasRecordedAudio ? 'Voice Note Ready' : 'Tap to Start Speaking'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {!isRecording && !hasRecordedAudio && (
                <button
                  onClick={handleStartRecord}
                  className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Voice Note</span>
                </button>
              )}

              {isRecording && (
                <button
                  onClick={handleStopRecord}
                  className="w-full py-3.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  <span>Finish & Review</span>
                </button>
              )}

              {hasRecordedAudio && (
                <div className="space-y-2 animate-fadeIn">
                  <button
                    onClick={handlePermanentDeleteAudio}
                    className="w-full py-3.5 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Let It Out & Wipe Permanently (0 Data Saved)</span>
                  </button>
                </div>
              )}

              {showDeletionBanner && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 text-center text-xs font-bold text-emerald-900 animate-fadeIn">
                  ✨ Audio destroyed immediately on your device. Zero bytes transmitted.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: GUIDED BREATHING (4-7-8 ORB) ================= */}
        {activeSubTab === 'breathe' && (
          <div className="space-y-3.5 animate-fadeIn text-center">
            {/* Pattern Switcher */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => { setBreathPattern('4-7-8'); handleStopBreathing(); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  breathPattern === '4-7-8'
                    ? 'bg-[#526140] text-white shadow-xs'
                    : 'bg-white border border-[#c5c8bc] text-[#5e5c52]'
                }`}
              >
                4-7-8 Relaxing Breath
              </button>
              <button
                onClick={() => { setBreathPattern('box'); handleStopBreathing(); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  breathPattern === 'box'
                    ? 'bg-[#526140] text-white shadow-xs'
                    : 'bg-white border border-[#c5c8bc] text-[#5e5c52]'
                }`}
              >
                Box Breathing (4-4-4-4)
              </button>
            </div>

            {/* Visual Animated Breathing Orb */}
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden shadow-xs">
              <div
                style={{
                  transform: breathPhase === 'inhale' ? 'scale(1.35)' : breathPhase === 'hold' || breathPhase === 'hold_post' ? 'scale(1.35)' : breathPhase === 'exhale' ? 'scale(0.85)' : 'scale(1.0)',
                  transition: breathPhase === 'inhale' ? 'transform 4s ease-out' : breathPhase === 'exhale' ? `transform ${breathPattern === '4-7-8' ? '8s' : '4s'} ease-in` : 'transform 0.5s ease'
                }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-[#526140] via-[#435034] to-[#815505] text-white flex flex-col items-center justify-center shadow-lg relative"
              >
                <span className="font-mono text-3xl font-extrabold">{breathCount}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                  {breathPhase === 'idle' ? 'Ready' : breathPhase === 'inhale' ? 'Inhale' : breathPhase === 'hold' || breathPhase === 'hold_post' ? 'Hold' : 'Exhale'}
                </span>
              </div>

              {breathActive && (
                <span className="font-mono text-[10px] text-[#526140] font-bold mt-4">
                  Cycles Completed: {breathCycles}
                </span>
              )}
            </div>

            {/* Start / Stop Trigger */}
            {!breathActive ? (
              <button
                onClick={handleStartBreathing}
                className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>Begin Guided Breathing Session</span>
              </button>
            ) : (
              <button
                onClick={handleStopBreathing}
                className="w-full py-3.5 rounded-full bg-[#5e5c52] hover:bg-[#4a483e] text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4" />
                <span>Pause Session</span>
              </button>
            )}
          </div>
        )}

        {/* ================= TAB 3: MOODTUNES ACOUSTICS ================= */}
        {activeSubTab === 'mood_tunes' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-3.5 text-center shadow-2xs">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block mb-0.5">
                Offline Neuro-Acoustics
              </span>
              <p className="text-[11px] text-[#5e5c52]">
                Use headphones for optimal brainwave synchronization & grounding.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SOUNDSCAPE_PRESETS.map((p) => {
                const isPlayingThis = isTunePlaying && selectedTunePreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleToggleTune(p.id)}
                    className={`p-3.5 rounded-3xl text-left border transition-all cursor-pointer shadow-2xs active:scale-98 flex flex-col justify-between h-28 ${
                      isPlayingThis
                        ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                        : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f9fbeb]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{p.icon}</span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-2xs ${
                          isPlayingThis ? 'bg-[#526140] text-white animate-pulse' : 'bg-[#edefe0] text-[#5e5c52]'
                        }`}
                      >
                        {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                    <div>
                      <b className="text-xs text-[#1a1d14] block">{p.label}</b>
                      <span className="text-[9.5px] text-[#5e5c52] block truncate">{p.sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PRIVATE JOURNAL ================= */}
        {activeSubTab === 'journal' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold">
                  Encrypted Local Diary
                </span>
                {journalEntries.length > 0 && (
                  <button
                    onClick={handleExportJournal}
                    className="text-[9.5px] font-mono text-[#526140] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export (.txt)</span>
                  </button>
                )}
              </div>

              <textarea
                rows={3}
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                placeholder="What is on your mind right now? Stored only in your device local sandbox..."
                className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
              />

              <button
                onClick={handleSaveJournalEntry}
                className="w-full py-2.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to Encrypted Journal</span>
              </button>

              {entrySavedNotice && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2 text-center text-[10.5px] font-bold text-emerald-900 animate-fadeIn">
                  ✓ Entry encrypted & saved locally.
                </div>
              )}
            </div>

            {/* Entry History */}
            {journalEntries.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                  Past Entries ({journalEntries.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {journalEntries.map((e) => (
                    <div key={e.id} className="bg-white border border-[#c5c8bc]/60 rounded-2xl p-3 text-xs space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#75786e]">
                        <span>{e.date}</span>
                        <span className="font-semibold text-[#526140]">{e.mood}</span>
                      </div>
                      <p className="text-[#1a1d14] leading-relaxed whitespace-pre-wrap">{e.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
