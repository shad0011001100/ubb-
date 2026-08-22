import React from 'react';
import { Shield, ShieldAlert, CheckCircle2, ShieldCheck, Bell, Lock, ArrowLeft, Cpu } from 'lucide-react';
import { Emblem, PMCLogo } from './Emblem';

export const Header = ({ currentView, onNavigate, onOpenZKModal, ramWipedNotice }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Indian National Tricolor Decorative Header Strip */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white border-y border-slate-100"></div>
        <div className="bg-[#138808]"></div>
      </div>

      {/* VIEW 1: Standard Institutional Dashboard Header */}
      {currentView === 'dashboard' && (
        <div className="px-3.5 py-2.5 flex items-center justify-between bg-white gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            <Emblem className="w-10 h-10 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-900 text-base leading-tight tracking-tight">JanPraman</span>
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200 flex-shrink-0">
                  CIVIC v2.0
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-600 leading-tight truncate">
                Pune Municipal Corp <span className="text-slate-400">|</span> <span className="text-slate-500 font-normal">पुणे मनपा</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 flex-shrink-0">
            {/* SIH UPGRADE: Anon Aadhaar Zero-Knowledge Verification Interactive Status Badge */}
            <button 
              onClick={onOpenZKModal}
              title="Cryptographically verified Indian Citizen • Identity zero-knowledge shielded"
              className="flex items-center space-x-1.5 pl-2 pr-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 border border-emerald-300 text-slate-900 text-left transition-all shadow-2xs cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-emerald-900 leading-none">
                  Anon Aadhaar: ZK-Verified
                </span>
                <span className="text-[8px] text-emerald-700 font-mono leading-tight mt-0.5">
                  Identity Shielded (0 Bytes)
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: Secure Zero-Trace Capture Header */}
      {currentView === 'capture' && (
        <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-red-900/50">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Return to Safe Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              </div>
              <div>
                <h1 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  SECURE CAPTURE MODE ACTIVE
                </h1>
                <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-emerald-400" />
                  VOLATILE RAM ENCLAVE • ZERO DISK WRITE
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right font-mono text-[10px] bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
              <span className="text-slate-400">ENCLAVE:</span> <span className="text-emerald-400 font-semibold">LOCKED</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Evidence Chain of Custody Header */}
      {currentView === 'post-capture' && (
        <div className="bg-blue-950 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-emerald-600/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="text-xs font-bold tracking-tight text-white uppercase">
                  Evidence Manifest & Legal Hub
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                  SEALED
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono">
                DISPATCH ID: #PMC-VIG-2026-9812
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <PMCLogo className="w-7 h-7" />
          </div>
        </div>
      )}

      {/* Sub-Header Verification Alert Bar if RAM was wiped */}
      {ramWipedNotice && (
        <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-900 text-xs px-4 py-1.5 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-[11px]">Volatile Memory Sanitized:</span>
            <span className="text-[11px] text-emerald-800">RAM buffer purged (0 bytes residue). Safe front restored.</span>
          </div>
        </div>
      )}
    </header>
  );
};
