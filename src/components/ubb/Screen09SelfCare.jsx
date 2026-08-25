import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Flame,
  MessageSquare,
  Wind,
  Heart,
  Volume2,
  VolumeX,
  Mic,
  CheckCircle2,
  Shield,
  Plus,
  Headphones,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { ubbSupabase } from '../../services/supabase';
import { getTranslation } from '../../services/translations';
import { BinauralBeatsPlayer } from './BinauralBeatsPlayer';

export function Screen09SelfCare({ userProfile, onNavigate }) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const MOODS = userLang === 'mr' ? [
    { emoji: '😶', label: 'निःशब्द', score: 1 },
    { emoji: '🙁', label: 'उदास', score: 2 },
    { emoji: '😐', label: 'ठीक', score: 3 },
    { emoji: '🙂', label: 'बरे', score: 4 },
    { emoji: '😊', label: 'आनंदी', score: 5 }
  ] : [
    { emoji: '😶', label: 'Numb', score: 1 },
    { emoji: '🙁', label: 'Low', score: 2 },
    { emoji: '😐', label: 'Okay', score: 3 },
    { emoji: '🙂', label: 'Alright', score: 4 },
    { emoji: '😊', label: 'Good', score: 5 }
  ];

  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'let_it_out' | 'wall' | 'relax' | 'binaural_player'
  const [selectedMood, setSelectedMood] = useState('😐');
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtText, setNewThoughtText] = useState('');
  const [selectedTag, setSelectedTag] = useState(userLang === 'mr' ? 'उब देणारे विचार' : 'Encouragement');
  const [showAddThoughtModal, setShowAddThoughtModal] = useState(false);
  const [selectedBinauralPreset, setSelectedBinauralPreset] = useState('theta');

  // Let It Out states
  const [ventText, setVentText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [burnSuccess, setBurnSuccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Relax & Restore (4-7-8 Breathing Pacer & Grounding)
  const [breathePhase, setBreathePhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale'
  const [breatheSeconds, setBreatheSeconds] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);
  const [soundscapeActive, setSoundscapeActive] = useState(false);
  const audioCtxRef = useRef(null);

  const fetchThoughts = useCallback(async () => {
    const data = await api.getWallOfThoughts();
    if (data && data.thoughts && data.thoughts.length > 0) {
      setThoughts(data.thoughts);
    } else {
      const supaLetters = await ubbSupabase.getCommunityLetters();
      if (supaLetters) {
        setThoughts(supaLetters.map(l => ({
          id: l.id,
          author: l.author_tag,
          content: l.content,
          tag: userLang === 'mr' ? "प्रेमळ आठवण" : "Gentle Reminder",
          timestamp: userLang === 'mr' ? "काही वेळापूर्वी" : "Recently",
          likes: 24,
          warmthIcon: "🌱"
        })));
      }
    }
  }, [userLang]);

  useEffect(() => {
    fetchThoughts();
  }, [fetchThoughts]);

  // Breathing timer loop
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreatheSeconds((prev) => {
          if (prev > 1) return prev - 1;
          if (breathePhase === 'Inhale') {
            setBreathePhase('Hold');
            return 7;
          } else if (breathePhase === 'Hold') {
            setBreathePhase('Exhale');
            return 8;
          } else {
            setBreathePhase('Inhale');
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathePhase]);

  // Voice recording timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleBurnVent = async () => {
    if (!ventText.trim() && !recordingSeconds) return;
    setIsBurning(true);

    if (ventText.trim()) {
      await ubbSupabase.saveEphemeralVent(ventText);
    }

    await api.burnLetItOut({
      length: ventText.length,
      hasAudio: recordingSeconds > 0
    });

    setTimeout(() => {
      setVentText('');
      setIsRecording(false);
      setIsBurning(false);
      setBurnSuccess(true);
      setTimeout(() => setBurnSuccess(false), 3000);
    }, 1100);
  };

  const handleLikeThought = async (id) => {
    await api.likeThought(id);
    setThoughts((prev) =>
      prev.map((tItem) => (tItem.id === id ? { ...tItem, likes: (tItem.likes || 0) + 1 } : tItem))
    );
  };

  const handlePostThought = async () => {
    if (!newThoughtText.trim()) return;
    const author = userProfile?.anonymous_tag || userProfile?.anonymousId || 'Sprout_042';
    
    await ubbSupabase.postCommunityLetter({
      author_tag: author,
      content: newThoughtText
    });

    const res = await api.postThought({
      content: newThoughtText,
      tag: selectedTag,
      author,
      warmthIcon: '🌱'
    });
    if (res.success) {
      setNewThoughtText('');
      setShowAddThoughtModal(false);
      fetchThoughts();
    }
  };

  const toggleSoundscape = () => {
    if (soundscapeActive) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setSoundscapeActive(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, ctx.currentTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(216, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        setSoundscapeActive(true);
      } catch {
        setSoundscapeActive(false);
      }
    }
  };

  const GROUNDING_STEPS = userLang === 'mr' ? [
    { count: '५', sense: 'पहा', prompt: 'आसपास पहा आणि डोळ्यांना दिसणाऱ्या ५ गोष्टींची नावे घ्या (उदा. टेबल लॅम्प, पेन, खिडकी, भिंत).' },
    { count: '४', sense: 'स्पर्श', prompt: 'हात लावून अनुभवता येणाऱ्या ४ गोष्टींचा स्पर्श अनुभवा (उदा. कपडे, पायाखालची जमीन, खुर्ची).' },
    { count: '३', sense: 'ऐका', prompt: 'लक्ष देऊन आसपासचे ३ आवाज ऐका (उदा. पंख्याचा आवाज, पक्षी, स्वतःचा श्वास).' },
    { count: '२', sense: 'गंध', prompt: 'आसपास जाणवणारे २ गंध अनुभवा (उदा. पाऊस, चहा, अगरबत्तीचा सुवास).' },
    { count: '१', sense: 'चव', prompt: 'तोंडातील १ चव अनुभवा किंवा १ घोट थंड पाणी प्या.' }
  ] : [
    { count: '5', sense: 'See', prompt: 'Look around and name 5 distinct things you can see (e.g., your desk lamp, a pen, the window frame).' },
    { count: '4', sense: 'Touch', prompt: 'Notice 4 physical textures you can feel (e.g., your sweater fabric, your feet on the floor, your chair).' },
    { count: '3', sense: 'Hear', prompt: 'Listen closely for 3 ambient sounds (e.g., a distant ceiling fan, birds outside, your own breathing).' },
    { count: '2', sense: 'Smell', prompt: 'Notice 2 scents in the room around you (e.g., fresh rain, pencil wood, morning tea).' },
    { count: '1', sense: 'Taste', prompt: 'Notice 1 taste in your mouth, or take a refreshing sip of cool water.' }
  ];

  // If in dedicated Binaural Beats Player view
  if (activeTab === 'binaural_player') {
    return (
      <BinauralBeatsPlayer
        initialPreset={selectedBinauralPreset}
        userLanguage={userLang}
        onBack={() => setActiveTab('menu')}
        recommendedReason={userLang === 'mr' ? 'परीक्षेचा ताण कमी करण्यासाठी आणि मन शांत करण्यासाठी थीटा (६Hz) वेव्ह' : 'Theta Waves (6Hz) for Deep Relaxation & Exam Stress Reduction'}
      />
    );
  }

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#D9E2DC]">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67]">
              {t.selfCare.subtitle}
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.selfCare.title}
            </h2>
          </div>
          {activeTab !== 'menu' && (
            <button
              onClick={() => setActiveTab('menu')}
              className="text-xs text-[#3A5F4B] font-semibold bg-[#F2F6F3] px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200"
            >
              ← {userLang === 'mr' ? 'सर्व साधने' : 'All Tools'}
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-20">
        {/* ===================== VIEW 1: MAIN MENU ===================== */}
        {activeTab === 'menu' && (
          <>
            {/* Daily Mood Check-in Card */}
            <div className="bg-[#14282B] text-white rounded-2xl p-4 shadow-2xs border border-[#1E3A3D]">
              <div className="font-mono text-[9px] text-[#E3A06F] uppercase tracking-wider mb-2">
                {t.selfCare.moodTitle}
              </div>
              <div className="flex items-center justify-around pt-1">
                {MOODS.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.emoji)}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all cursor-pointer ${
                      selectedMood === m.emoji
                        ? 'bg-white/20 scale-110 ring-1 ring-[#E3A06F]'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span className="text-[9px] text-[#B9C9C3] font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Core Self-Care Tiers */}
            <div className="space-y-2.5">
              {/* Tool 1: AI Binaural Beats (The Brainwave Map) */}
              <div
                onClick={() => {
                  setSelectedBinauralPreset('theta');
                  setActiveTab('binaural_player');
                }}
                className="bg-gradient-to-r from-[#14282B] to-[#1E3A3D] text-white border border-[#E3A06F]/40 rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-md group hover:scale-101"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E3A06F]/20 flex items-center justify-center flex-shrink-0 text-[#E3A06F] shadow-sm">
                  <Headphones className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <b className="text-xs text-white flex items-center gap-1.5">
                      <span>{userLang === 'mr' ? 'बायनॉरॉल बीट्स थेरपी' : 'Acoustic Brainwave Therapy'}</span>
                      <Sparkles className="w-3 h-3 text-[#E3A06F]" />
                    </b>
                    <span className="font-mono text-[8.5px] bg-[#E3A06F] text-[#241208] px-1.5 py-0.5 rounded font-bold">
                      🎧 Delta · Theta · Alpha
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#C3D2CB] mt-0.5 leading-snug">
                    {userLang === 'mr'
                      ? 'झोप (Delta), ताणमुक्ती (Theta), आणि अभ्यास एकाग्रतेसाठी (Alpha) गणितीय ध्वनीतरंग. हेडफोन्स आवश्यक.'
                      : 'AI-guided frequencies for Sleep (Delta), Anxiety (Theta) & Focus (Alpha). Generates instantly via Web Audio.'}
                  </p>
                </div>
              </div>

              {/* Tool 2: Let It Out */}
              <div
                onClick={() => setActiveTab('let_it_out')}
                className="bg-white border border-[#D9E2DC] hover:border-[#B84C4C] rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B84C4C]/12 group-hover:bg-[#B84C4C]/20 flex items-center justify-center flex-shrink-0 text-[#B84C4C]">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <b className="text-xs text-[#14282B]">{t.selfCare.tabLetItOut}</b>
                    <span className="font-mono text-[8.5px] bg-[#B84C4C]/10 text-[#B84C4C] px-1.5 py-0.5 rounded font-semibold">
                      Ephemeral
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                    {t.selfCare.ventDesc}
                  </p>
                </div>
              </div>

              {/* Tool 3: Wall of Thoughts */}
              <div
                onClick={() => setActiveTab('wall')}
                className="bg-white border border-[#D9E2DC] hover:border-[#4E7C63] rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#4E7C63]/12 group-hover:bg-[#4E7C63]/20 flex items-center justify-center flex-shrink-0 text-[#4E7C63]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <b className="text-xs text-[#14282B]">{t.selfCare.tabWall}</b>
                    <span className="font-mono text-[8.5px] bg-[#4E7C63]/10 text-[#4E7C63] px-1.5 py-0.5 rounded font-semibold">
                      Notes
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                    {t.selfCare.wallDesc}
                  </p>
                </div>
              </div>

              {/* Tool 4: Relax & Restore */}
              <div
                onClick={() => setActiveTab('relax')}
                className="bg-white border border-[#D9E2DC] hover:border-[#E3A06F] rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E3A06F]/15 group-hover:bg-[#E3A06F]/25 flex items-center justify-center flex-shrink-0 text-[#C9814F]">
                  <Wind className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <b className="text-xs text-[#14282B]">{t.selfCare.tabRelax}</b>
                    <span className="font-mono text-[8.5px] bg-[#E3A06F]/20 text-[#C9814F] px-1.5 py-0.5 rounded font-semibold">
                      4-7-8 Pacer
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                    {t.selfCare.relaxDesc}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===================== VIEW 2: LET IT OUT (EPHEMERAL) ===================== */}
        {activeTab === 'let_it_out' && (
          <div className="space-y-3">
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#B84C4C] font-semibold text-xs">
                  <Flame className="w-4 h-4" />
                  <span>{t.selfCare.ventTitle}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[9px] text-[#3A5F4B]">
                  <Shield className="w-3 h-3 text-[#4E7C63]" />
                  Zero Logs
                </div>
              </div>

              <p className="text-[11px] text-[#5B6E67] leading-relaxed">
                {t.selfCare.ventDesc}
              </p>

              <div className={`relative ${isBurning ? 'animate-burn' : ''}`}>
                <textarea
                  rows={5}
                  value={ventText}
                  onChange={(e) => setVentText(e.target.value)}
                  placeholder={t.selfCare.ventPlaceholder}
                  className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl p-3 text-xs text-[#14282B] placeholder-[#5B6E67] focus:outline-none focus:border-[#B84C4C] resize-none"
                />

                {isRecording && (
                  <div className="absolute inset-0 bg-red-950/90 rounded-xl flex flex-col items-center justify-center text-white space-y-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 animate-ping flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-sm">00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</div>
                    <div className="text-[10px] text-red-200">{userLang === 'mr' ? 'आवाज रेकॉर्ड होत आहे…' : 'Recording voice vent…'}</div>
                  </div>
                )}
              </div>

              {burnSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{t.selfCare.burnedSuccess}</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleBurnVent}
                  disabled={!ventText.trim() && !isRecording}
                  className="flex-1 py-2.5 rounded-xl bg-[#B84C4C] hover:bg-[#A33D3D] disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isBurning ? t.selfCare.burningText : t.selfCare.burnButton}</span>
                </button>

                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-[#F2F6F3] border-[#D9E2DC] text-[#5B6E67] hover:bg-slate-200'
                  }`}
                  title="Voice Vent"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW 3: WALL OF THOUGHTS ===================== */}
        {activeTab === 'wall' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5B6E67]">
                {t.selfCare.wallTitle} ({thoughts.length})
              </span>
              <button
                onClick={() => setShowAddThoughtModal(true)}
                className="text-[11px] px-3 py-1 rounded-full bg-[#3A5F4B] text-white font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#2C4839]"
              >
                <Plus className="w-3 h-3" /> {t.selfCare.addLetterBtn}
              </button>
            </div>

            <div className="space-y-2.5">
              {thoughts.map((tItem) => (
                <div key={tItem.id} className="bg-white border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{tItem.warmthIcon || '🌱'}</span>
                      <span className="font-mono text-[10px] font-semibold text-[#14282B]">{tItem.author}</span>
                    </div>
                    <span className="font-mono text-[8.5px] bg-[#E3A06F]/15 text-[#C9814F] px-2 py-0.5 rounded-full font-medium">
                      {tItem.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#14282B] leading-relaxed">{tItem.content}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#D9E2DC]/50">
                    <span className="font-mono text-[8.5px] text-[#5B6E67]">{tItem.timestamp}</span>
                    <button
                      onClick={() => handleLikeThought(tItem.id)}
                      className="flex items-center gap-1 text-[10px] text-[#3A5F4B] hover:text-red-500 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#3A5F4B]/20 text-[#3A5F4B]" />
                      <span>{tItem.likes || 0} {userLang === 'mr' ? 'उब' : 'Warmth'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== VIEW 4: RELAX & RESTORE ===================== */}
        {activeTab === 'relax' && (
          <div className="space-y-3">
            {/* Quick Link to Binaural Beats */}
            <div
              onClick={() => {
                setSelectedBinauralPreset('theta');
                setActiveTab('binaural_player');
              }}
              className="bg-[#14282B] text-white border border-[#E3A06F]/40 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-[#E3A06F] transition-all shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E3A06F]/20 text-[#E3A06F] flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-white">
                    {userLang === 'mr' ? 'बायनॉरॉल बीट्स सुरू करा' : 'Open Binaural Beats Studio'}
                  </div>
                  <span className="text-[10px] text-[#C3D2CB] font-mono">
                    Delta (2.5Hz) · Theta (6Hz) · Alpha (10Hz)
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#E3A06F] font-bold">Launch →</span>
            </div>

            {/* 4-7-8 Breathing Pacer */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 text-center space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#3A5F4B] font-semibold">
                  {t.selfCare.relaxTitle}
                </span>
                <button
                  onClick={toggleSoundscape}
                  className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 cursor-pointer ${
                    soundscapeActive
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-[#5B6E67]'
                  }`}
                >
                  {soundscapeActive ? <Volume2 className="w-3 h-3 text-emerald-600" /> : <VolumeX className="w-3 h-3" />}
                  <span>{t.selfCare.soundscapeToggle}</span>
                </button>
              </div>

              <div className="h-32 flex items-center justify-center my-2">
                <div
                  className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                    breathePhase === 'Inhale'
                      ? 'border-[#4E7C63] bg-[#4E7C63]/20 scale-125'
                      : breathePhase === 'Hold'
                      ? 'border-[#E3A06F] bg-[#E3A06F]/20 scale-125 ring-4 ring-[#E3A06F]/30'
                      : 'border-[#3A5F4B] bg-[#3A5F4B]/10 scale-90'
                  }`}
                >
                  <span className="font-fraunces text-base font-bold text-[#14282B]">
                    {breathePhase === 'Inhale' ? t.selfCare.breatheInhale : breathePhase === 'Hold' ? t.selfCare.breatheHold : t.selfCare.breatheExhale}
                  </span>
                  <span className="font-mono text-xs text-[#4E7C63] font-bold">
                    {breatheSeconds}s
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                    isBreathingActive
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#4E7C63] hover:bg-[#3A5F4B] text-white shadow-xs'
                  }`}
                >
                  {isBreathingActive ? t.selfCare.stopBreathing : t.selfCare.startBreathing}
                </button>
              </div>
            </div>

            {/* 5-4-3-2-1 Sensory Grounding */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#3A5F4B] font-semibold">
                  5-4-3-2-1 Sensory Grounding
                </span>
                <span className="font-mono text-[9px] text-[#5B6E67]">
                  {groundingStep + 1} of 5
                </span>
              </div>

              <div className="bg-[#F2F6F3] p-3 rounded-xl border border-[#D9E2DC] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E3A06F] text-[#241208] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {GROUNDING_STEPS[groundingStep].count}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-[#14282B]">{GROUNDING_STEPS[groundingStep].sense}</div>
                  <p className="text-[10.5px] text-[#5B6E67] leading-tight mt-0.5">
                    {GROUNDING_STEPS[groundingStep].prompt}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <button
                  onClick={() => setGroundingStep((prev) => Math.max(0, prev - 1))}
                  disabled={groundingStep === 0}
                  className="text-[10.5px] text-[#5B6E67] disabled:opacity-30 cursor-pointer"
                >
                  ← {userLang === 'mr' ? 'मागे' : 'Previous'}
                </button>
                <button
                  onClick={() => setGroundingStep((prev) => (prev + 1) % 5)}
                  className="text-[10.5px] px-3 py-1 bg-[#3A5F4B] text-white rounded-full font-semibold cursor-pointer"
                >
                  {groundingStep === 4 ? (userLang === 'mr' ? 'पुन्हा सुरू करा' : 'Start Over') : (userLang === 'mr' ? 'पुढील पायरी →' : 'Next Step →')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Thought Modal */}
      {showAddThoughtModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D9E2DC] rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-2xl">
            <h4 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.selfCare.addLetterBtn}
            </h4>
            <p className="text-[11px] text-[#5B6E67]">
              {t.selfCare.wallDesc}
            </p>

            <textarea
              rows={4}
              value={newThoughtText}
              onChange={(e) => setNewThoughtText(e.target.value)}
              placeholder="e.g. You are doing the best you can with the energy you have today..."
              className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl p-3 text-xs text-[#14282B] focus:outline-none focus:border-[#3A5F4B] resize-none"
            />

            <div className="pt-2 flex gap-2">
              <button
                onClick={handlePostThought}
                className="flex-1 py-2 rounded-xl bg-[#3A5F4B] text-white font-semibold text-xs hover:bg-[#2C4839] cursor-pointer"
              >
                {t.common.save}
              </button>
              <button
                onClick={() => setShowAddThoughtModal(false)}
                className="px-3 py-2 rounded-xl bg-slate-100 text-[#5B6E67] text-xs cursor-pointer"
              >
                {t.common.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

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
        <button onClick={() => onNavigate('progress')} className="flex flex-col items-center gap-0.5 text-[#5B6E67] cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 18l5-6 4 4 7-9" stroke="currentColor" strokeWidth="1.6"/></svg>
          <span className="text-[9px]">{t.common.progress}</span>
        </button>
        <button onClick={() => onNavigate('self_care')} className="flex flex-col items-center gap-0.5 text-[#3A5F4B] font-semibold cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-2-1-3-1-3s2 2 2 5a7 7 0 11-13-4c0-3 2-4 2-4s1 2 4-1z" stroke="currentColor" strokeWidth="1.8"/></svg>
          <span className="text-[9px]">{t.common.selfCare}</span>
        </button>
      </div>
    </div>
  );
}
