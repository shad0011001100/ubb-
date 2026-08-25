import React from 'react';
import { PhoneCall, Heart, ArrowRight } from 'lucide-react';

export function Screen10AutoCrisis({
  detectedText = "I don't want to be here anymore, I just want it to stop",
  onOpenHelpline,
  onConnectCounselor,
  onDismiss
}) {

  return (
    <div className="h-full bg-gradient-to-b from-[#7A2E2E] via-[#3D1414] to-[#14282B] text-white flex flex-col justify-between p-5 select-none text-center overflow-y-auto">
      {/* Top Tag */}
      <div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#E3C8C8] bg-black/30 border border-red-400/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          Auto-Detected by Local Ollama NLP
        </div>
      </div>

      {/* Pulsing Emergency Core */}
      <div className="my-auto py-2 flex flex-col items-center">
        <div className="relative w-20 h-20 flex items-center justify-center mb-3">
          <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
          <div className="w-14 h-14 rounded-full bg-[#B84C4C] border-2 border-white/40 flex items-center justify-center shadow-lg text-white">
            <Heart className="w-7 h-7 fill-white" />
          </div>
        </div>

        <h3 className="font-fraunces text-xl font-semibold text-white leading-tight mb-2">
          We noticed something. Connecting you now.
        </h3>
        <p className="text-xs text-[#E3C8C8] leading-relaxed max-w-[270px] mx-auto mb-3">
          No need to tap anything. You are being matched to the next available emergency counselor or crisis-trained volunteer immediately.
        </p>

        {/* Flagged phrase quote */}
        <div className="bg-black/40 border border-white/15 rounded-xl p-2.5 max-w-[280px] text-left">
          <div className="font-mono text-[8.5px] text-[#E3A06F] uppercase">Flagged Context</div>
          <div className="text-[11px] text-[#D6E2DC] italic truncate mt-0.5">
            "{detectedText}"
          </div>
        </div>
      </div>

      {/* Connection Actions */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onConnectCounselor}
          className="w-full py-3 px-4 rounded-xl bg-white text-[#7A2E2E] font-semibold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-left">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Connecting… Dr. Priya M. (Emergency Counselor)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#7A2E2E]" />
        </button>

        <button
          onClick={onOpenHelpline}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <span>Prefer to call a helpline directly (14416)</span>
          <PhoneCall className="w-3.5 h-3.5 text-[#E3A06F]" />
        </button>

        <button
          onClick={onDismiss}
          className="font-mono text-[9px] text-[#C3D2CB] hover:text-white pt-1 cursor-pointer"
        >
          Dismiss (Return to Safety Screen)
        </button>
      </div>
    </div>
  );
}
