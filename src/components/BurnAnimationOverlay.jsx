import React, { useEffect, useState } from 'react';
import { Flame, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

export const BurnAnimationOverlay = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), 450);
    const t3 = setTimeout(() => {
      onComplete();
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-red-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white select-none">
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-red-600/30 flex items-center justify-center animate-ping absolute inset-0"></div>
        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center relative shadow-2xl border-2 border-amber-300">
          <Flame className="w-10 h-10 text-amber-200 animate-bounce" />
        </div>
      </div>

      <h2 className="text-base font-extrabold uppercase tracking-widest text-red-100 font-mono text-center">
        EMERGENCY BURN PROTOCOL ACTIVE
      </h2>

      <div className="mt-4 w-64 bg-slate-900/90 rounded-lg p-3 border border-red-800 font-mono text-[11px] space-y-1.5 shadow-xl">
        <div className="flex items-center justify-between text-amber-400">
          <span>DRAM_PURGE:</span>
          <span>{step >= 0 ? '[OVERWRITING 0x00]' : 'PENDING'}</span>
        </div>
        <div className="flex items-center justify-between text-red-300">
          <span>KEYSTORE_FLUSH:</span>
          <span>{step >= 1 ? '[EPHEMERAL WIPE]' : 'WAITING'}</span>
        </div>
        <div className="flex items-center justify-between text-emerald-400 font-bold">
          <span>FORENSIC_RESIDUE:</span>
          <span>{step >= 2 ? '0.00 BYTES (CLEAN)' : 'SANITIZING'}</span>
        </div>
      </div>

      <p className="text-[11px] text-red-200/80 mt-4 text-center">
        Restoring standard Municipal Citizen Front...
      </p>
    </div>
  );
};
