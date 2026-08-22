import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Fingerprint, 
  ShieldCheck, 
  ArrowLeft, 
  Home, 
  Copy, 
  Check, 
  FileText,
  Clock,
  Layers,
  MapPin,
  Image as ImageIcon,
  Bot
} from 'lucide-react';

export const CitizenEvidenceScreen = ({ captureResult, onReturnToDashboard }) => {
  const [copied, setCopied] = useState(false);

  const rawHash = captureResult?.sha256Hash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const caseId = captureResult?.id || "PMC-VIG-2026-9812";
  const photoUrl = captureResult?.photoUrl || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80";
  const location = captureResult?.locationName || captureResult?.location?.locationName || "Paud Road Divisional Office, Pune";
  const coords = captureResult?.coordinates || captureResult?.location?.coordinates || "18.5204° N, 73.8567° E";

  const handleCopy = () => {
    navigator.clipboard.writeText(rawHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* 1. SUCCESS BANNER */}
      <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-300 shadow-xs flex items-start space-x-3">
        <div className="p-2 rounded-full bg-emerald-600 text-white flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-emerald-900">
            Payload Encrypted & Uploaded to Cloud
          </h2>
          <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
            Evidence photo, GPS location, and audio transcript cryptographically sealed and registered in the shared vault.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono">
            <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold border border-emerald-400/40">
              CASE REF: #{caseId}
            </span>
            <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold border border-emerald-400/40">
              Cloud Storage URL Stored
            </span>
          </div>
        </div>
      </div>

      {/* Cloud Uploaded Evidence Preview Box */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-blue-900" />
            Cloud Storage Evidence Media
          </span>
          <span className="text-[9.5px] text-cyan-800 font-mono bg-cyan-50 px-1.5 py-0.2 rounded border border-cyan-300 flex items-center gap-1">
            <Bot className="w-3 h-3 text-cyan-600" /> YOLO-Edge Redacted
          </span>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-300 bg-slate-950 flex items-center justify-center">
          <img
            src={photoUrl}
            alt="Evidence Photo"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-[9px] font-mono text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-emerald-400" />
            <span>{coords}</span>
          </div>
        </div>
      </div>

      {/* 2. STEPPER COMPONENT */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-blue-900" />
          Live Evidence Chain & Pipeline Status
        </h3>

        <div className="relative pl-6 space-y-5">
          <div className="absolute top-2.5 left-2.5 bottom-2.5 w-0.5 bg-slate-200"></div>

          {/* STEP 1: COMPLETED (GREEN CHECK) */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-emerald-800 uppercase font-mono">
                  Step 1: Cryptographically Signed & Hashed
                </span>
                <span className="text-[9.5px] text-slate-400 font-mono">Just Now</span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Hardware Keystore (StrongBox TEE) generated SHA-256 seal prior to memory purge.
              </p>
              <div className="mt-1.5 bg-slate-900 text-emerald-400 p-2 rounded font-mono text-[10px] break-all leading-tight border border-slate-800">
                {rawHash}
              </div>
            </div>
          </div>

          {/* STEP 2: COMPLETED (GREEN CHECK) */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-emerald-800 uppercase font-mono">
                  Step 2: AI Priority Triage Complete
                </span>
                <span className="text-[9.5px] text-slate-400 font-mono">Instant</span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Whisper AI identified bribery keywords (Confidence 99.4%). Priority auto-elevated to <strong className="text-red-700">CRITICAL</strong>.
              </p>
            </div>
          </div>

          {/* STEP 3: PENDING (BLUE SPINNING LOADER) */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-100">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-blue-900 uppercase font-mono">
                  Step 3: Pending Officer Verification
                </span>
                <span className="text-[9.5px] text-amber-700 font-mono font-bold bg-amber-50 px-1 rounded border border-amber-200">
                  SLA: 6d 23h
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Routed to PMC Municipal Vigilance Officer on shared backend database. If unverified within 7 days, escrow unlocks directly to State Anti-Corruption Bureau (ACB).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RETURN TO DASHBOARD ACTION */}
      <div className="pt-2">
        <button
          onClick={onReturnToDashboard}
          className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};
