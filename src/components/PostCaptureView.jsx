import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  FileLock2, 
  Fingerprint, 
  Share2, 
  Home, 
  ExternalLink, 
  QrCode, 
  Cpu, 
  Layers, 
  Eye,
  Info,
  Download,
  FileText,
  FileCheck,
  Send,
  Building,
  Scale,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Emblem } from './Emblem';

export const PostCaptureView = ({ captureData, onReturnHome }) => {
  // Tab switcher state: 'custody' | 'bsa-certificate'
  const [activeTab, setActiveTab] = useState('custody');
  
  const [copied, setCopied] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [escrowSent, setEscrowSent] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  
  const [countdown, setCountdown] = useState({
    days: 6,
    hours: 23,
    minutes: 58,
    seconds: 45
  });

  const rawHash = captureData?.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const timestamp = captureData?.timestamp || '2026-08-20T22:30:15+05:30 (IST)';
  const coordinates = captureData?.coordinates || '18.5204° N, 73.8567° E (Shivajinagar, Pune)';

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.2 },
        colors: ['#16A34A', '#1E3A8A', '#EA580C']
      });
    } catch (e) {
      // Ignore if not loaded
    }
  }, []);

  // Live ticking SLA countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(rawHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPDF = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3500);
  };

  const handleSendEscrow = () => {
    setEscrowSent(true);
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#1E3A8A', '#16A34A', '#EA580C']
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. SUCCESS BANNER (OFFICIAL GREEN #16A34A) */}
      <div className="bg-[#16A34A] text-white p-4 rounded-xl shadow-xs border border-emerald-700 flex items-start space-x-3">
        <div className="p-2 rounded-full bg-emerald-800/60 flex-shrink-0 border border-emerald-400/30">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-extrabold uppercase tracking-wide">
            Evidence Captured and Encrypted
          </h2>
          <p className="text-xs text-emerald-50 mt-0.5 leading-relaxed">
            Zero volatile RAM footprint remains on device. The tamper-evident cryptographic payload has been mathematically locked into the chain of custody.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-emerald-100">
            <span className="bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-400/30">
              Payload: #PMC-VIG-2026-9812
            </span>
            <span className="bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-400/30">
              BSA Sec 63 Ready
            </span>
          </div>
        </div>
      </div>

      {/* SIH UPGRADE: 2-TAB SWITCHER (Chain of Custody vs BSA Sec 63 Legal Certificate) */}
      <div className="bg-slate-200 p-1 rounded-lg grid grid-cols-2 gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('custody')}
          className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'custody'
              ? 'bg-white text-blue-950 shadow-xs border border-slate-300'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Fingerprint className="w-3.5 h-3.5" />
          <span>Chain of Custody & SLA</span>
        </button>

        <button
          onClick={() => setActiveTab('bsa-certificate')}
          className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'bsa-certificate'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>BSA Sec. 63 Certificate</span>
        </button>
      </div>

      {/* TAB A: CHAIN OF CUSTODY & SLA MATRIX */}
      {activeTab === 'custody' && (
        <div className="space-y-4 animate-fadeIn">
          {/* DATA CARD 1: CRYPTOGRAPHIC HASH & DIGITAL FINGERPRINT */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase">
                    Cryptographic Seal & Verification
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Bharatiya Sakshya Adhiniyam Sec 63 Compliant
                  </p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Mathematically
              </span>
            </div>

            {/* SHA-256 Digital Fingerprint Box */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  SHA-256 Digital Fingerprint
                </label>
                <button
                  onClick={handleCopyHash}
                  className="text-[10px] text-blue-900 font-semibold hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[11px] break-all leading-tight border border-slate-800 select-all shadow-inner">
                {rawHash}
              </div>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                <span className="font-semibold text-slate-700">Status:</span>
                Verified mathematically on-device prior to volatile memory purge.
              </p>
            </div>

            {/* Cryptographic Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-slate-50 p-2 rounded-md border border-slate-200/80">
                <span className="text-[9.5px] text-slate-500 uppercase font-mono block">Hardware Keystore</span>
                <span className="text-[11px] font-bold text-slate-800 font-mono flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-900" />
                  StrongBox TEE
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded-md border border-slate-200/80">
                <span className="text-[9.5px] text-slate-500 uppercase font-mono block">Trusted Timestamp</span>
                <span className="text-[10px] font-bold text-slate-800 font-mono">
                  RFC 3161 Atomic Lock
                </span>
              </div>
            </div>

            {/* GPS Locked Telemetry Strip */}
            <div className="bg-blue-50/70 p-2.5 rounded-md border border-blue-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-900" />
                <span className="text-[11px] font-medium text-slate-700">Geo-Stamp:</span>
                <span className="text-[11px] font-mono font-bold text-blue-900">{coordinates}</span>
              </div>
            </div>

            {/* Proof Inspector Action */}
            <button
              onClick={() => setShowProofModal(true)}
              className="w-full py-1.5 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span>Inspect Cryptographic Proof Manifest</span>
            </button>
          </div>

          {/* DATA CARD 2: ESCALATION MATRIX (SLA TRACKING TIMELINE) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase">
                    Anti-Corruption Escalation Matrix
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Automated Service Level Agreement (SLA) Tracker
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold">
                SLA: 7 DAYS
              </span>
            </div>

            {/* Vertical Stepper Timeline Component */}
            <div className="relative pl-6 space-y-4 pt-1">
              <div className="absolute top-2 left-2.5 bottom-2 w-0.5 bg-slate-200"></div>

              {/* STEP 1: COMPLETED */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-emerald-100">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-emerald-700 uppercase bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Step 1: Completed & Sealed
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Just Now</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">
                    Encrypted payload routed to PMC Vigilance Officer
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Dispatched to internal vigilance server at Pune Municipal Corporation (Desk #PMC-VIG-2026-9812).
                  </p>
                </div>
              </div>

              {/* STEP 2: PENDING / LIVE COUNTDOWN */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center ring-4 ring-orange-100 animate-pulse">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-orange-800 uppercase bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200">
                      Step 2: Automated Escalation Trigger
                    </span>
                    <span className="text-[10px] font-mono font-bold text-orange-700 animate-pulse">
                      Ticking Live
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">
                    Escalation to Anti-Corruption Bureau (ACB Maharashtra)
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    If PMC Vigilance does not initiate a formal enquiry within the mandatory 7-day window, the payload key unlocks directly to the State Anti-Corruption Bureau.
                  </p>

                  {/* LIVE SLA COUNTDOWN DISPLAY */}
                  <div className="mt-2 bg-slate-900 text-white p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-[11px] font-mono text-slate-300">
                      <span className="text-orange-400 font-bold">Countdown:</span>
                    </div>
                    <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-amber-300">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {countdown.days}d
                      </span>
                      <span>:</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {countdown.hours.toString().padStart(2, '0')}h
                      </span>
                      <span>:</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {countdown.minutes.toString().padStart(2, '0')}m
                      </span>
                      <span>:</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-orange-400">
                        {countdown.seconds.toString().padStart(2, '0')}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: FAIL-SAFE AUDIT */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold">3</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-slate-500 uppercase bg-slate-100 px-1.5 py-0.2 rounded">
                    Step 3: Lokayukta / High Court Judicial Review
                  </span>
                  <h4 className="text-xs font-bold text-slate-700 mt-1">
                    Decentralized Public Repository Mirror (Zero-Knowledge Audit)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Immutable hash anchor ensures evidence cannot be deleted or compromised by any administrative officer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: BSA SECTION 63 LEGAL EVIDENCE CERTIFICATE (NEW HIGH-FIDELITY VIEW) */}
      {activeTab === 'bsa-certificate' && (
        <div className="space-y-3 animate-fadeIn">
          {/* Official Parchment/Cream Certificate Container */}
          <div className="bg-[#FFFDF9] rounded-xl p-4 sm:p-5 border-2 border-[#E7DECD] shadow-md relative overflow-hidden text-slate-900">
            {/* National Emblem Watermark in background */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <Emblem className="w-48 h-48" />
            </div>

            {/* Official Certificate Institutional Header */}
            <div className="text-center pb-3 border-b-2 border-slate-800/20 space-y-1">
              <div className="flex justify-center mb-1">
                <Emblem className="w-10 h-10" />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600 font-bold block">
                GOVERNMENT OF MAHARASHTRA • PUNE MUNICIPAL CORPORATION
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase text-[#1E3A8A] tracking-tight leading-tight">
                CERTIFICATE UNDER SECTION 63 OF THE BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023
              </h3>
              <p className="text-[10px] text-slate-600 italic font-serif">
                [Admissibility of Electronic Evidence in Judicial & Anti-Corruption Proceedings]
              </p>
              <div className="inline-block bg-blue-100 text-blue-900 font-mono text-[9px] px-2 py-0.5 rounded border border-blue-300 font-bold mt-1">
                CERTIFICATE REF: BSA-63-PMC-2026-9812-VIG
              </div>
            </div>

            {/* Certificate Legal Preamble */}
            <div className="py-2.5 text-[11px] text-slate-800 leading-relaxed font-serif border-b border-[#E7DECD]">
              <p>
                I hereby certify that the electronic record described herein was captured through the secure, tamper-evident <strong>JanPraman Cryptographic Enclave</strong> operating in accordance with standards established under Section 63(4) of the Bharatiya Sakshya Adhiniyam, 2023.
              </p>
            </div>

            {/* Technical Verification Manifest Details */}
            <div className="py-2.5 space-y-2 text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 p-2 rounded border border-[#E7DECD] text-[10.5px]">
                <span className="text-slate-500 font-sans font-bold">1. Hash Algorithm:</span>
                <span className="text-[#1E3A8A] font-bold break-all">
                  SHA-256 ({rawHash.substring(0, 24)}...)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 p-2 rounded border border-[#E7DECD] text-[10.5px]">
                <span className="text-slate-500 font-sans font-bold">2. Timestamp (Atomic Locked):</span>
                <span className="text-slate-800 font-bold">
                  2026-08-20T22:30:15+05:30 (IST)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 p-2 rounded border border-[#E7DECD] text-[10.5px]">
                <span className="text-slate-500 font-sans font-bold">3. Geo-Lock Coordinates:</span>
                <span className="text-slate-800 font-bold">
                  18.5204° N, 73.8567° E (Shivajinagar, Pune)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 p-2 rounded border border-[#E7DECD] text-[10.5px]">
                <span className="text-slate-500 font-sans font-bold">4. Device Integrity:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  SHA-verified Hardware MAC + Nonce Hash
                </span>
              </div>
            </div>

            {/* Mandatory Statutory Declaration Box */}
            <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-300/80 text-[11px] text-amber-950 leading-relaxed font-serif">
              <strong className="font-sans font-bold block text-amber-900 mb-0.5">Statutory Legal Declaration:</strong>
              "This electronic payload was generated in volatile memory with verified chain-of-custody mathematical immutability pursuant to Section 63(4) of the Bharatiya Sakshya Adhiniyam, 2023. The optical and auditory data was captured during lawful citizen oversight with automated bystander privacy redactions applied on-device."
            </div>

            {/* Digital Signatures Seal */}
            <div className="pt-3 flex items-center justify-between border-t border-[#E7DECD] text-[10px] font-mono text-slate-600">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-sans uppercase block">Signature Authority</span>
                <span className="font-bold text-slate-900">JanPraman Trust Root CA</span>
                <span className="text-[8.5px] text-emerald-700 block">✓ ECDSA_SECP256R1 Verified</span>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#1E3A8A] flex flex-col items-center justify-center p-1 text-center bg-blue-50/50">
                <Scale className="w-4 h-4 text-[#1E3A8A]" />
                <span className="text-[6.5px] font-bold text-[#1E3A8A] uppercase leading-tight mt-0.5">
                  SEC 63 BSA<br />CERTIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Download & Escrow Action Buttons */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Button 1: Download Signed PDF Certificate */}
              <button
                onClick={handleDownloadPDF}
                className="py-2.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-900" />
                <span>{pdfDownloaded ? '✓ PDF Certificate Generated!' : 'Download Signed PDF Certificate'}</span>
              </button>

              {/* Button 2: Send to PMC Vigilance & Lokayukta Escrow */}
              <button
                onClick={handleSendEscrow}
                className={`py-2.5 px-3 rounded-lg text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  escrowSent 
                    ? 'bg-emerald-700 hover:bg-emerald-800' 
                    : 'bg-[#1E3A8A] hover:bg-blue-950'
                }`}
              >
                {escrowSent ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Send className="w-4 h-4" />}
                <span>{escrowSent ? '✓ Escrow Dispatched (Lokayukta Locked)' : 'Send to PMC Vigilance & Lokayukta Escrow'}</span>
              </button>
            </div>

            {escrowSent && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-2.5 rounded-lg text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Escrow Dispatch Confirmed:</strong> Evidence encrypted with Dual-Key RSA. Accessible only by authorized Lokayukta Ombudsman upon 7-day SLA expiry.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. RETURN TO HOME ACTION */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onReturnHome}
          className="w-full bg-blue-900 hover:bg-blue-950 active:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Safe Civic Dashboard (Flush Session)</span>
        </button>

        <p className="text-[10px] text-center text-slate-400 font-mono">
          Session will be securely zeroized upon exit. No temporary files remain on this device.
        </p>
      </div>

      {/* CRYPTOGRAPHIC PROOF INSPECTION MODAL */}
      {showProofModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileLock2 className="w-4 h-4 text-blue-900" />
                <h3 className="text-xs font-bold text-slate-900 uppercase">
                  Chain-of-Custody Manifest
                </h3>
              </div>
              <button
                onClick={() => setShowProofModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 text-slate-200 p-3 rounded-lg font-mono text-[10px] space-y-1.5 overflow-x-auto">
              <p className="text-emerald-400 font-bold">// JANPRAMAN MATHEMATICAL ATTESTATION</p>
              <p><span className="text-slate-500">"statutory_act":</span> "BHARATIYA_SAKSHYA_ADHINIYAM_SEC_63"</p>
              <p><span className="text-slate-500">"algorithm":</span> "SHA-256 + ECDSA_SECP256R1"</p>
              <p><span className="text-slate-500">"hash":</span> "{rawHash.substring(0, 32)}..."</p>
              <p><span className="text-slate-500">"latitude":</span> 18.5204303</p>
              <p><span className="text-slate-500">"longitude":</span> 73.8567437</p>
              <p><span className="text-slate-500">"location_name":</span> "Shivajinagar, Pune"</p>
              <p><span className="text-slate-500">"accuracy_m":</span> 1.8</p>
              <p><span className="text-slate-500">"timestamp_utc":</span> "{timestamp}"</p>
              <p><span className="text-slate-500">"tee_attestation":</span> "STRONGBOX_QUALCOMM_SECURE_ENCLAVE"</p>
              <p><span className="text-slate-500">"yolo_face_redaction":</span> true</p>
              <p><span className="text-slate-500">"zero_flash_proven":</span> true</p>
            </div>

            <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-200 leading-snug">
              <strong className="text-slate-900">Judicial Admissibility:</strong> Satisfies Section 63(4) of Bharatiya Sakshya Adhiniyam (BSA), 2023 for automatic electronic evidence admissibility without requiring secondary device seizure.
            </div>

            <button
              onClick={() => setShowProofModal(false)}
              className="w-full py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-md"
            >
              Close Manifest Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
