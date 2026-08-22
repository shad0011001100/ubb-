import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Cpu, 
  Lock, 
  Scale, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Smartphone, 
  Laptop,
  ShieldCheck,
  EyeOff,
  FileCheck
} from 'lucide-react';

export const PitchDrawer = ({ 
  currentView, 
  onSelectView, 
  onTriggerBurn, 
  isMobileShell, 
  setIsMobileShell 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Portal Control Panel" className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner Bar */}
      <div className="max-w-4xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-bold text-white tracking-wide">
              JanPraman 2.0 • Secure Civic Portal
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
            {currentView.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick View Switcher for seamless judge demo */}
          <div className="hidden sm:flex items-center space-x-1 bg-slate-800 p-0.5 rounded-md border border-slate-700 text-[11px]">
            <button
              onClick={() => onSelectView('dashboard')}
              className={`px-2 py-0.5 rounded transition-colors ${
                currentView === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. ZK Safe Front
            </button>
            <button
              onClick={() => onSelectView('capture')}
              className={`px-2 py-0.5 rounded transition-colors ${
                currentView === 'capture' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. AI Redaction Capture
            </button>
            <button
              onClick={() => onSelectView('post-capture')}
              className={`px-2 py-0.5 rounded transition-colors ${
                currentView === 'post-capture' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              3. BSA Sec 63 Legal Hub
            </button>
          </div>

          {/* Desktop / Mobile Frame Toggle */}
          <button
            onClick={() => setIsMobileShell(!isMobileShell)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700"
            title={isMobileShell ? "Switch to Fullscreen Responsive" : "Switch to Mobile Device Frame"}
          >
            {isMobileShell ? <Smartphone className="w-3.5 h-3.5 text-orange-400" /> : <Laptop className="w-3.5 h-3.5 text-blue-400" />}
            <span className="text-[10px] hidden md:inline">{isMobileShell ? 'Mobile Shell' : 'Full Screen'}</span>
          </button>

          {/* Toggle Security Specifications Drawer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Security Specifications</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Judge Pitch Cheatsheet */}
      {isOpen && (
        <div className="bg-slate-950 border-t border-slate-800 p-4 animate-fadeIn">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
            {/* Upgrade 1: Anon Aadhaar */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <h4>1. Anon Aadhaar ZK Proof</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Zero-Knowledge circuit proves the reporter is a valid Indian citizen without capturing Name, Aadhaar number, or demographic data. <strong>0 bytes stored</strong>.
              </p>
              <div className="pt-1 text-[10px] text-emerald-400 font-mono">
                ✓ Whistleblower immunity
              </div>
            </div>

            {/* Upgrade 2: AI Bystander Redaction */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                <EyeOff className="w-4 h-4" />
                <h4>2. YOLO-Edge AI Redaction</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                On-device computer vision detects and blurs uninvolved bystanders in real-time, preventing privacy violations while isolating the corrupt act.
              </p>
              <div className="pt-1 text-[10px] text-cyan-400 font-mono">
                ✓ DPDP Act 2023 compliance
              </div>
            </div>

            {/* Upgrade 3: BSA Sec 63 Certificate */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <FileCheck className="w-4 h-4" />
                <h4>3. BSA Sec 63 Legal Cert</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Auto-generates the mandatory Section 63 certificate under Bharatiya Sakshya Adhiniyam 2023 with SHA-256 hash & atomic timestamp for instant court admissibility.
              </p>
              <div className="pt-1 text-[10px] text-amber-400 font-mono">
                ✓ 100% Court admissible
              </div>
            </div>

            {/* Upgrade 4: 7-Day SLA Auto-Escalation */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-orange-400 font-bold">
                <Clock className="w-4 h-4" />
                <h4>4. 7-Day SLA Escalation</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                If PMC Municipal Vigilance does not initiate enquiry in 7 days, dual-key escrow unlocks directly to State Anti-Corruption Bureau (ACB).
              </p>
              <div className="pt-1 text-[10px] text-orange-400 font-mono">
                ✓ Zero coverup guarantee
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>GovTech Design: Pune Municipal Corporation (PMC) • Light Mode Utility</span>
            <button
              onClick={onTriggerBurn}
              className="bg-red-700/80 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Flame className="w-3 h-3 text-amber-200" />
              <span>Simulate Physical BURN Trigger</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
