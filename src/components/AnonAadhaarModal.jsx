import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Key, 
  Cpu, 
  DatabaseZap, 
  CheckCircle2, 
  FileCheck2, 
  ExternalLink,
  Fingerprint,
  Layers,
  Sparkles
} from 'lucide-react';
import { Emblem } from './Emblem';

export const AnonAadhaarModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl space-y-3.5 relative animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                Zero-Knowledge Identity Verification
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">
                Anon Aadhaar Protocol (UIDAI RSA-2048 Proof)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 rounded-md hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Animated ZK Proof Graphic */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-3.5 rounded-xl border border-blue-800 shadow-inner relative overflow-hidden">
          {/* Subtle circuit background */}
          <div className="absolute right-0 top-0 translate-x-2 -translate-y-2 opacity-10 pointer-events-none">
            <Cpu className="w-24 h-24 text-emerald-400" />
          </div>

          <div className="relative z-10 flex items-center space-x-3">
            {/* Animated Lock Ring */}
            <div className="relative flex items-center justify-center flex-shrink-0">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-emerald-400 animate-spin" style={{ animationDuration: '8s' }}></div>
              <div className="w-9 h-9 rounded-full bg-emerald-600/30 backdrop-blur-xs border border-emerald-400 flex items-center justify-center absolute inset-1.5">
                <Lock className="w-4 h-4 text-emerald-300" />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-700/50">
                  ZK-SNARK ATTESTED
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">
                Valid Indian Citizen Proven
              </h4>
              <p className="text-[10px] text-slate-300 leading-tight">
                Identity verified cryptographically without exposing Aadhaar number or demographic data.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Attestation Details Card */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div className="flex items-start justify-between pb-1.5 border-b border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Protocol</span>
            <span className="font-mono font-bold text-slate-800 text-[11px] text-right">
              Anon Aadhaar (RSA-2048 PKI)
            </span>
          </div>

          <div className="flex items-start justify-between pb-1.5 border-b border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Sybil Protection</span>
            <span className="font-mono font-bold text-emerald-700 text-[11px] text-right flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active (Nullifier Hash)
            </span>
          </div>

          <div className="flex items-start justify-between pb-1.5 border-b border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Personal Data Stored</span>
            <span className="font-mono font-bold text-emerald-700 text-[11px] text-right bg-emerald-100/70 px-1.5 py-0.5 rounded border border-emerald-300">
              0 Bytes (Zero Storage)
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Nullifier Output</span>
            <span className="font-mono text-[9.5px] text-slate-700 break-all text-right max-w-[170px]">
              0x7f4a...92b1 (Unique Proof)
            </span>
          </div>
        </div>

        {/* Privacy Guarantees Callout */}
        <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-slate-700 text-[11px] leading-relaxed">
          <p>
            <strong className="text-blue-900">Whistleblower Protection Guarantee:</strong> Even if municipal servers or databases are breached, your real name, biometric data, and 12-digit Aadhaar number cannot be reverse-engineered from this proof.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          Dismiss & Return to Portal
        </button>
      </div>
    </div>
  );
};
