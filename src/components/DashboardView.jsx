import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  Info, 
  CheckCircle2, 
  Lock, 
  Camera, 
  Cpu, 
  Scale, 
  Layers, 
  ArrowRight,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const DashboardView = ({ onStartCapture }) => {
  const notices = [
    {
      id: 1,
      tag: 'Vigilance Circular',
      marathiTag: 'दक्षता परिपत्रक',
      date: '20 Aug 2026',
      title: 'Mandatory Digital Chain-of-Custody for Anti-Corruption Complaints',
      desc: 'All civic malpractice submissions must comply with Section 63 BSA standards with hardware-attested SHA-256 signatures.',
      urgent: true
    },
    {
      id: 2,
      tag: 'Lokayukta Portal',
      marathiTag: 'लोकायुक्त कक्ष',
      date: '18 Aug 2026',
      title: 'Automated 7-Day SLA Escalation Protocol Active across Pune Municipal Corporation',
      desc: 'Complaints unresolved within 7 days by municipal vigilance officers automatically transfer to State Anti-Corruption Bureau (ACB).',
      urgent: false
    },
    {
      id: 3,
      tag: 'Whistleblower Act',
      marathiTag: 'संरक्षण कायदा',
      date: '15 Aug 2026',
      title: 'Anon Aadhaar Zero-Knowledge Identity Shield Protection Notice',
      desc: 'Citizen identities are protected by RSA-2048 zero-knowledge cryptography. No demographic or Aadhaar numbers are recorded.',
      urgent: false
    }
  ];

  return (
    <div className="space-y-4 pb-16">
      {/* Official Government Top Banner Notification */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-3.5 rounded-xl shadow-xs border border-blue-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-orange-500 text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
              Official Vigilance Desk
            </span>
            <span className="text-[11px] text-blue-200 font-medium">PMC Anti-Corruption Cell</span>
          </div>
          <span className="text-[10px] text-slate-300 font-mono">Ward 14 • Pune</span>
        </div>
        <p className="text-xs text-white font-medium mt-1.5 leading-relaxed">
          JanPraman Secure Civic Portal: Encrypted, tamper-evident capture of civic malpractices, bribery, illegal encroachment, and tender anomalies under the Bharatiya Sakshya Adhiniyam (BSA) 2023.
        </p>
      </div>

      {/* CORE SECURE CAPTURE LAUNCH GATEWAY (PRIMARY ACTION) */}
      <section>
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-orange-500/80 shadow-md text-white relative overflow-hidden">
          {/* Background Security Watermark */}
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <ShieldAlert className="w-36 h-36 text-orange-400" />
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                <span className="bg-orange-600 text-white font-mono text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                  Whistleblower Enclave
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                Air-Gapped Volatile RAM
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-orange-400" />
                Zero-Trace Evidence Capture
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Launch the hardware-isolated camera viewport. Records directly into ephemeral DRAM buffers with <strong>zero flash storage writes</strong>, real-time AI bystander face redaction, and SHA-256 cryptographic sealing.
              </p>
            </div>

            {/* Feature Highlights Pill Row */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[9.5px] font-mono text-slate-300">
              <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
                <Cpu className="w-3 h-3 text-emerald-400 mx-auto mb-0.5" />
                <span>Zero Disk IO</span>
              </div>
              <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
                <EyeOff className="w-3 h-3 text-cyan-400 mx-auto mb-0.5" />
                <span>YOLO-Edge AI</span>
              </div>
              <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
                <Scale className="w-3 h-3 text-amber-400 mx-auto mb-0.5" />
                <span>BSA Sec 63</span>
              </div>
            </div>

            {/* Launch Camera Button */}
            <button
              onClick={onStartCapture}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-orange-400/40 mt-2"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Zero-Trace Capture Viewfinder</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Security Architecture Guarantees Card */}
      <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-blue-900" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Statutory Whistleblower Protections
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-1.5 text-blue-900 font-bold text-[11px]">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>Tamper-Proof RAM Buffer</span>
            </div>
            <p className="text-[10.5px] text-slate-600 leading-snug">
              If your phone is physically seized, an emergency BURN command instantly zeroizes the volatile memory. Forensics find 0 files.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-[11px]">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Automatic Lokayukta Escrow</span>
            </div>
            <p className="text-[10.5px] text-slate-600 leading-snug">
              Guaranteed 7-day municipal SLA. If municipal officers suppress the evidence, it unlocks automatically to the State Anti-Corruption Bureau.
            </p>
          </div>
        </div>
      </section>

      {/* Official Vigilance Notices & Circulars */}
      <section className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-900" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Official Vigilance Bulletins (PMC दक्षता कक्ष)
            </h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Live Feed</span>
        </div>

        <div className="space-y-2">
          {notices.map((notice) => (
            <div 
              key={notice.id} 
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  notice.urgent 
                    ? 'bg-orange-100 text-orange-900 border border-orange-200' 
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}>
                  {notice.tag} ({notice.marathiTag})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{notice.date}</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                {notice.title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {notice.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Official 24x7 Whistleblower Helpline */}
      <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-slate-700 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span className="text-[11px] font-medium">Maharashtra Vigilance Hotline:</span>
          <span className="font-mono font-bold text-blue-900">1064 (Anti-Corruption)</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">BSA 2023 Sec 63</span>
      </div>
    </div>
  );
};
