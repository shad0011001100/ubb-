import React, { useState, useEffect } from 'react';
import { Headphones, Volume2, Sparkles, StopCircle, Play, ArrowLeft, Info } from 'lucide-react';
import { binauralEngine, BRAINWAVE_PRESETS } from '../../services/binauralAudio';

export function BinauralBeatsPlayer({
  initialPreset = 'theta',
  userLanguage = 'en',
  onBack,
  recommendedReason = null
}) {
  const [selectedPresetId, setSelectedPresetId] = useState(initialPreset);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showHeadphoneGate, setShowHeadphoneGate] = useState(false);
  const [hasConfirmedHeadphones, setHasConfirmedHeadphones] = useState(false);

  const currentPreset = BRAINWAVE_PRESETS[selectedPresetId] || BRAINWAVE_PRESETS.theta;

  useEffect(() => {
    return () => {
      binauralEngine.stop(0.4);
    };
  }, []);

  const handlePlayClick = () => {
    if (!hasConfirmedHeadphones) {
      setShowHeadphoneGate(true);
      return;
    }
    toggleAudio();
  };

  const toggleAudio = () => {
    if (isPlaying) {
      binauralEngine.stop(0.8);
      setIsPlaying(false);
    } else {
      binauralEngine.start({
        baseFrequency: currentPreset.baseFrequency,
        beatFrequency: currentPreset.beatFrequency,
        volume,
        preset: currentPreset.id
      });
      setIsPlaying(true);
    }
  };

  const handleConfirmHeadphones = () => {
    setHasConfirmedHeadphones(true);
    setShowHeadphoneGate(false);
    binauralEngine.start({
      baseFrequency: currentPreset.baseFrequency,
      beatFrequency: currentPreset.beatFrequency,
      volume,
      preset: currentPreset.id
    });
    setIsPlaying(true);
  };

  const handlePresetChange = (presetId) => {
    setSelectedPresetId(presetId);
    if (isPlaying) {
      const p = BRAINWAVE_PRESETS[presetId];
      binauralEngine.start({
        baseFrequency: p.baseFrequency,
        beatFrequency: p.beatFrequency,
        volume,
        preset: p.id
      });
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    binauralEngine.setVolume(newVol);
  };

  const isMarathi = userLanguage === 'mr';
  const isHindi = userLanguage === 'hi';

  return (
    <div className="h-full bg-gradient-to-b from-[#14282B] via-[#1E3A3D] to-[#14282B] text-white flex flex-col justify-between p-5 select-none relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <button
          onClick={() => {
            binauralEngine.stop(0.3);
            if (onBack) onBack();
          }}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="font-mono text-[9px] uppercase tracking-widest text-[#E3A06F] flex items-center gap-1.5 font-semibold">
          <Headphones className="w-3.5 h-3.5" />
          <span>{isMarathi ? 'बायनॉरॉल बीट्स थेरपी' : isHindi ? 'बाइनॉरल बीट्स थेरेपी' : 'Acoustic Brainwave Therapy'}</span>
        </div>

        <span className="font-mono text-[9px] bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full">
          Web Audio
        </span>
      </div>

      {/* Center Visualizer Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-2 z-10">
        {/* Glowing Pulsating Circle Synced with Beat Frequency */}
        <div className="relative flex items-center justify-center my-4">
          {/* Outermost breathing halo */}
          <div
            className={`absolute w-52 h-52 rounded-full bg-gradient-to-tr from-[#4E7C63]/25 via-[#E3A06F]/20 to-transparent blur-xl transition-all duration-1000 ${
              isPlaying ? 'scale-125 animate-pulse' : 'scale-90 opacity-40'
            }`}
          />

          {/* Middle dynamic frequency circle */}
          <div
            style={{
              animationDuration: isPlaying ? `${currentPreset.pulseSpeedSec}s` : '4s'
            }}
            className={`w-36 h-36 rounded-full border-2 border-[#E3A06F]/40 bg-gradient-to-b from-[#4E7C63]/30 via-[#3A5F4B]/40 to-[#14282B] flex flex-col items-center justify-center shadow-2xl transition-all ${
              isPlaying ? 'animate-breathe scale-110 shadow-[#E3A06F]/20' : 'scale-95'
            }`}
          >
            <Headphones className={`w-7 h-7 text-[#E3A06F] mb-1 ${isPlaying ? 'animate-bounce' : 'opacity-70'}`} />
            <div className="font-fraunces font-bold text-sm text-white">
              {currentPreset.beatFrequency} Hz
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-[#A3D1B9]">
              {currentPreset.name.split(' ')[0]} Wave
            </span>
          </div>
        </div>

        {/* AI Recommendation Banner (if routed from triage) */}
        {recommendedReason && (
          <div className="bg-[#E3A06F]/15 border border-[#E3A06F]/40 rounded-xl px-3 py-1.5 text-center max-w-xs mb-2">
            <div className="font-mono text-[8.5px] uppercase tracking-wider text-[#E3A06F] font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#E3A06F]" />
              <span>{isMarathi ? 'AI ने सुचवलेली फ्रिक्वेन्सी' : 'AI Prescribed Brainwave'}</span>
            </div>
            <p className="text-[10px] text-[#E8D4D4] leading-snug mt-0.5">
              {recommendedReason}
            </p>
          </div>
        )}

        {/* Frequency Preset Info */}
        <div className="text-center max-w-xs space-y-1">
          <h3 className="font-fraunces text-base font-semibold text-white">
            {currentPreset.title}
          </h3>
          <p className="text-[11px] text-[#C3D2CB] leading-relaxed">
            {currentPreset.effect}
          </p>
        </div>
      </div>

      {/* Preset Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 mb-3 z-10">
        {Object.values(BRAINWAVE_PRESETS).map((p) => {
          const isSelected = selectedPresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handlePresetChange(p.id)}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E3A06F] border-[#E3A06F] text-[#241208] font-bold shadow-md scale-102'
                  : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
              }`}
            >
              <div className="font-mono text-[9px] block">
                {p.beatFrequency} Hz
              </div>
              <div className="text-[10px] truncate">{p.name.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Controls & Volume Slider */}
      <div className="bg-black/30 border border-white/10 rounded-2xl p-3 space-y-2.5 z-10">
        <div className="flex items-center justify-between text-xs text-[#D6E2DC]">
          <div className="flex items-center gap-1.5 font-mono text-[9.5px]">
            <Volume2 className="w-3.5 h-3.5 text-[#E3A06F]" />
            <span>{isMarathi ? 'आवाज' : 'Volume'}</span>
          </div>
          <span className="font-mono text-[10px] text-white/70">
            {Math.round(volume * 100)}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E3A06F]"
        />

        {/* Play / Fade-Out Stop Button */}
        <button
          onClick={handlePlayClick}
          className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-98 ${
            isPlaying
              ? 'bg-[#B84C4C] hover:bg-[#A33D3D] text-white'
              : 'bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208]'
          }`}
        >
          {isPlaying ? (
            <>
              <StopCircle className="w-4 h-4" />
              <span>{isMarathi ? 'शांततेने थांबवा (Fade Out)' : 'Fade-Out & Stop'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{isMarathi ? 'बायनॉरॉल बीट्स सुरू करा' : 'Start Binaural Audio'}</span>
            </>
          )}
        </button>
      </div>

      {/* ================= HEADPHONE REQUIRED GATE MODAL ================= */}
      {showHeadphoneGate && (
        <div className="absolute inset-0 z-50 bg-[#0C1A1C]/95 backdrop-blur-md flex flex-col justify-between p-6 animate-fadeIn text-center">
          <div className="pt-4 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#E3A06F]/20 border border-[#E3A06F]/40 text-[#E3A06F] flex items-center justify-center mx-auto shadow-2xl">
              <Headphones className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#E3A06F] font-bold block">
                {isMarathi ? 'हेडफोन्स आवश्यक आहेत' : isHindi ? 'हेडफ़ोन आवश्यक हैं' : 'Headphones Required'}
              </span>
              <h3 className="font-fraunces text-xl font-bold text-white leading-tight">
                {isMarathi
                  ? 'ध्वनीशास्त्रानुसार मेंदू शांत करण्याचे तंत्र'
                  : 'Acoustic Science for Nervous System Grounding'}
              </h3>
              <p className="text-xs text-[#C3D2CB] leading-relaxed max-w-xs mx-auto">
                {isMarathi
                  ? 'हा ऑडिओ डाव्या आणि उजव्या कानात वेगवेगळ्या फ्रिक्वेन्सीचे सूक्ष्म टोन वाजवून मेंदूत विश्रांतीची तरंग निर्माण करतो. हे फोनच्या स्पीकरवर काम करत नाही.'
                  : 'This grounding tool creates a calming frequency in your brain by playing two slightly different harmonic tones in each ear. It will not work on phone speakers.'}
              </p>
            </div>

            {/* Scientific Explanation Pill */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-left space-y-1 font-mono text-[10px] text-[#A3D1B9]">
              <div className="flex items-center gap-1 text-[#E3A06F] font-bold">
                <Info className="w-3 h-3" />
                <span>How it works in your brain:</span>
              </div>
              <div className="text-[#C3D2CB]">
                • Left Ear: <b>{currentPreset.baseFrequency} Hz</b>
                <br />
                • Right Ear: <b>{currentPreset.baseFrequency + currentPreset.beatFrequency} Hz</b>
                <br />
                • Brain Perception: <b>{currentPreset.beatFrequency} Hz ({currentPreset.name.split(' ')[0]} Band)</b>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirmHeadphones}
              className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 transition-all"
            >
              <Headphones className="w-4 h-4" />
              <span>{isMarathi ? 'मी हेडफोन्स घातले आहेत — सुरू करा' : 'I Have Them On — Begin'}</span>
            </button>

            <button
              onClick={() => setShowHeadphoneGate(false)}
              className="w-full py-2 text-xs text-white/60 hover:text-white cursor-pointer"
            >
              {isMarathi ? 'मागे जा' : 'Go Back'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
