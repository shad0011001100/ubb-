import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  FileText, 
  Send, 
  XCircle, 
  CheckCircle2, 
  Bot, 
  UserX, 
  Cpu, 
  Scale, 
  AlertTriangle,
  Fingerprint,
  Download,
  Share2,
  Lock,
  Layers,
  Sparkles,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import { Emblem } from '../Emblem';

export const AdminCaseVaultScreen = ({ 
  incident, 
  onBackToInbox, 
  onGenerateBsaCertificate,
  onResolveCase 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);
  const [viewingFullPhoto, setViewingFullPhoto] = useState(false);

  const photoUrl = incident?.photoUrl || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80";
  const locationName = incident?.location?.locationName || incident?.locationName || "Paud Road Divisional Office, Pune";
  const coordinates = incident?.location?.coordinates || incident?.coordinates || "18.5074° N, 73.8077° E";
  const ward = incident?.location?.ward || incident?.ward || "Ward 14 (Kothrud)";

  const handleApproveDispatch = () => {
    setActionStatus({
      type: 'dispatched',
      title: 'PMC Vigilance Raid Team Dispatched',
      message: 'Field Investigation Squad #3 mobilized to Paud Road Ward Office. Dual-Key Lokayukta escrow locked on shared backend.'
    });
    if (onResolveCase) {
      onResolveCase(incident.id, 'Dispatched for Field Raid');
    }
  };

  const handleRejectSpam = () => {
    setActionStatus({
      type: 'rejected',
      title: 'Report Flagged as Inconclusive',
      message: 'Incident marked as closed. Audit log recorded in Lokayukta immutable ledger.'
    });
    if (onResolveCase) {
      onResolveCase(incident.id, 'Rejected / Non-Actionable');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 space-y-4 animate-fadeIn text-slate-900">
      {/* Top Breadcrumb & Status Navigation Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToInbox}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Inbox</span>
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold text-blue-900 font-mono">
                CASE #{incident?.id || 'PMC-VIG-2026-9812'}
              </h1>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${incident?.priorityColor || 'bg-red-100 text-red-700 border-red-200'}`}>
                {incident?.priority || 'Critical'} Priority
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {incident?.category} • {incident?.subCategory} • {ward}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            StrongBox TEE Cryptographic Seal
          </span>
        </div>
      </div>

      {/* Confirmation Banner if Action was Triggered */}
      {actionStatus && (
        <div className={`p-3.5 rounded-xl border flex items-start space-x-3 animate-fadeIn ${
          actionStatus.type === 'dispatched' 
            ? 'bg-emerald-50 text-emerald-950 border-emerald-300' 
            : 'bg-red-50 text-red-950 border-red-300'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold">{actionStatus.title}</h4>
            <p className="text-[11px] mt-0.5 leading-relaxed">{actionStatus.message}</p>
          </div>
        </div>
      )}

      {/* CASE INVESTIGATION & VAULT (SPLIT SCREEN LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ========================================================= */}
        {/* LEFT PANE: EVIDENCE & LEGAL COMPLIANCE (7 COLUMNS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. CLOUD STORAGE EVIDENCE MEDIA VIEWER (WITH YOLO REDACTION) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-bold">CLOUD_STORAGE_EVIDENCE_MEDIA</span>
              </div>
              <span className="text-[10px] text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1">
                <Bot className="w-3 h-3" /> YOLO-Edge Redacted
              </span>
            </div>

            {/* Media Image / Video Canvas */}
            <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden select-none">
              <img
                src={photoUrl}
                alt="Captured Malpractice Evidence"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />

              {/* Simulated Blurred Face Box Overlay */}
              <div className="absolute top-[28%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-20 h-24 rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-950/60 backdrop-blur-xl flex flex-col items-center justify-center p-1.5 shadow-2xl">
                  <div className="w-8 h-8 rounded-full bg-slate-500/30 border border-cyan-300 flex items-center justify-center backdrop-blur-2xl">
                    <UserX className="w-4 h-4 text-cyan-200" />
                  </div>
                  <span className="text-[6.5px] font-mono text-cyan-200 uppercase font-bold text-center mt-1">
                    Bystander Redacted
                  </span>
                </div>
              </div>

              {/* Video/Media Bottom Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 flex items-center justify-between z-20">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  <span className="text-[10.5px] font-mono text-slate-300">
                    {isPlaying ? "00:06 / 00:09" : "00:03 / 00:09"}
                  </span>
                </div>

                {/* Cloud URL Pill */}
                <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded border border-emerald-500/40 truncate max-w-[200px]">
                  Cloud URL: {photoUrl.substring(0, 32)}...
                </span>
              </div>
            </div>
          </div>

          {/* 2. AI AUDIO TRANSCRIPT (WITH HIGHLIGHTED BRIBERY KEYWORDS) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-blue-900" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Whisper AI Speech-to-Text Transcript (Bribery Keyword Triage)
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-200">
                99.4% AI Match
              </span>
            </div>

            {/* Description and Transcript */}
            {incident?.text?.description && (
              <p className="text-xs text-slate-700 italic bg-blue-50/60 p-2.5 rounded-lg border border-blue-200 leading-relaxed">
                <strong>Citizen Report Summary:</strong> "{incident.text.description}"
              </p>
            )}

            <div className="space-y-2 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200/80">
              {(incident?.text?.transcript || incident?.audioTranscript)?.map((line, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold">
                    <span className="text-blue-900">[{line.time}] {line.speaker}:</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed pl-2 border-l-2 border-slate-300">
                    {line.highlight ? (
                      <>
                        Give me{" "}
                        <span className="bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                          {line.highlight}
                        </span>{" "}
                        or I won't clear the file. You know how things work here.
                      </>
                    ) : (
                      line.text
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[10.5px] text-slate-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center justify-between">
              <span className="font-semibold text-amber-900">Statutory Violation Identified:</span>
              <span className="font-bold text-red-700">Prevention of Corruption Act, 1988 (Sec 7 Demand)</span>
            </div>
          </div>

          {/* 3. LEGAL COMPLIANCE CARD (SHA-256 & BSA SEC 63 PDF ACTION) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-blue-900" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Legal Compliance & Admissibility Manifest
                </h3>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-300">
                Sec 63 BSA Compliant
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <label className="text-[10.5px] font-bold text-slate-600 block mb-0.5">
                  SHA-256 Digital Fingerprint (Immutable Hash)
                </label>
                <div className="bg-slate-900 text-emerald-400 p-2 rounded-lg text-[10.5px] break-all leading-tight border border-slate-800 select-all">
                  {incident?.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[9.5px] text-slate-500 uppercase block">Hardware Keystore</span>
                  <span className="font-bold text-emerald-700 text-[10.5px]">
                    Hardware/App Integrity: PASSED
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[9.5px] text-slate-500 uppercase block">Anon Aadhaar Nullifier</span>
                  <span className="font-bold text-blue-900 text-[10.5px]">
                    0x7f4a...92b1 (Verified)
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action: Generate BSA Sec 63 PDF */}
            <button
              onClick={() => onGenerateBsaCertificate(incident)}
              className="w-full py-2.5 px-3 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generate BSA Sec 63 PDF Legal Certificate</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANE: RESOLUTION, MAP & ESCALATION (5 COLUMNS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. MAP MOCK (PUNE GPS TELEMETRY) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-900" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Geo-Lock Location Intelligence
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ±1.8m Accurate
              </span>
            </div>

            {/* Map Canvas with Pin */}
            <div className="relative aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 flex flex-col items-center justify-center p-4 text-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 animate-ping absolute"></div>
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-xs p-2 rounded-md shadow-md border border-slate-300 mt-2 text-xs">
                  <span className="font-bold text-slate-900 block">{locationName}</span>
                  <span className="font-mono text-[10px] text-blue-900 font-semibold">{coordinates}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. ESCALATION TIMER (7-DAY SLA LIVE COUNTDOWN) */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-4 border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-orange-400 font-mono font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 animate-pulse" />
                Anti-Corruption Bureau (ACB) SLA Timer
              </span>
              <span className="bg-orange-950 text-orange-300 font-mono text-[10px] px-2 py-0.5 rounded border border-orange-600/50">
                ACTIVE
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">
                Auto-escalates to State ACB in:
              </span>
              <div className="text-2xl font-black font-mono text-amber-300 tracking-wider mt-1">
                6d 14h 22m 18s
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                Municipal officers must file an official inquiry before SLA expiry to prevent automated Lokayukta escrow transfer.
              </p>
            </div>
          </div>

          {/* 3. ACTION PANEL (APPROVE & DISPATCH / REJECT) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-100">
              Officer Action & Resolution Panel
            </h3>

            <div className="space-y-2">
              {/* Button 1: Approve & Dispatch Field Team (Green) */}
              <button
                onClick={handleApproveDispatch}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Approve & Dispatch Field Team</span>
              </button>

              {/* Button 2: Reject / Spam (Red) */}
              <button
                onClick={handleRejectSpam}
                className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-lg border border-red-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject / Flag as Inconclusive</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-slate-100">
              All officer decisions are cryptographically logged with digital signatures on the state audit ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
