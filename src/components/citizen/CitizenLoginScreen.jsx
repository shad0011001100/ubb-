import React, { useState } from 'react';
import { Shield, Fingerprint, Lock, User, ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Emblem } from '../Emblem';

export const CitizenLoginScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('citizen_rajesh');
  const [password, setPassword] = useState('••••••••');
  const [isZkLoading, setIsZkLoading] = useState(false);
  const [zkStep, setZkStep] = useState(0);

  const handleStandardLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({ type: 'standard', name: 'Rajesh S.' });
  };

  const handleZkLogin = () => {
    setIsZkLoading(true);
    setZkStep(1);

    setTimeout(() => {
      setZkStep(2);
    }, 800);

    setTimeout(() => {
      setZkStep(3);
    }, 1500);

    setTimeout(() => {
      setIsZkLoading(false);
      onLoginSuccess({ type: 'anon_aadhaar', name: 'Anonymous Citizen (ZK)' });
    }, 2100);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 animate-fadeIn">
      {/* Official Institutional Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-1">
          <Emblem className="w-14 h-14" />
        </div>
        <div className="flex items-center justify-center space-x-1.5">
          <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">JanPraman</h1>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200">
            CITIZEN
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-700">Citizen Vigilance & Whistleblower Portal</p>
        <p className="text-[11px] text-slate-500 font-medium">
          Pune Municipal Corporation <span className="text-slate-300">|</span> <span className="text-slate-400">पुणे मनपा</span>
        </p>
      </div>

      {/* Standard Username/Password Login Form */}
      <form onSubmit={handleStandardLogin} className="space-y-3 pt-1">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Citizen ID / Username</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. citizen_rajesh"
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span>Sign In as Registered Citizen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Visual OR Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full"></div>
        <span className="bg-white px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest absolute">
          OR
        </span>
      </div>

      {/* ANON AADHAAR ZERO-KNOWLEDGE PROOF BUTTON (PRIMARY WHISTLEBLOWER LOGIN) */}
      <div className="space-y-2">
        <button
          onClick={handleZkLogin}
          disabled={isZkLoading}
          className="w-full p-3.5 rounded-lg border-2 border-emerald-600 bg-white hover:bg-emerald-50/60 active:scale-[0.99] text-left transition-all shadow-xs flex items-center space-x-3 cursor-pointer group disabled:opacity-80"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            {isZkLoading ? (
              <Loader2 className="w-5 h-5 text-emerald-700 animate-spin" />
            ) : (
              <Fingerprint className="w-5 h-5 text-emerald-700" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-950">
                Verify as Citizen (Zero-Knowledge)
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                ZK-PROVEN
              </span>
            </div>
            <p className="text-[10px] text-emerald-700 font-medium leading-tight mt-0.5">
              100% Anonymous via Anon Aadhaar (0 Bytes personal data stored)
            </p>
          </div>
        </button>

        {/* ZK Proof Progress Simulation Details */}
        {isZkLoading && (
          <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-800 font-mono text-[10px] space-y-1 animate-fadeIn">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>GENERATING ZERO-KNOWLEDGE PROOF (RSA-2048)...</span>
            </div>
            <div className="text-[9.5px] text-slate-400 pl-5">
              {zkStep === 1 && "• Verifying UIDAI Public Key Signature on-device..."}
              {zkStep === 2 && "• Generating Sybil Nullifier Hash (0x7f4a...92b1)..."}
              {zkStep === 3 && "✓ Verified! Zero demographic data leaked. Routing..."}
            </div>
          </div>
        )}
      </div>

      {/* Statutory Security Disclaimer */}
      <div className="text-center pt-1 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 leading-tight font-medium">
          Protected under Bharatiya Sakshya Adhiniyam (BSA) 2023 & Whistleblowers Protection Act.
        </p>
      </div>
    </div>
  );
};
