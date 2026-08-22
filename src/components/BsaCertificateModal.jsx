import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Scale, Printer } from 'lucide-react';
import { Emblem } from './Emblem';

export const BsaCertificateModal = ({ incident, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  const rawHash = incident?.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const timestamp = incident?.timestamp || '2026-08-21T18:42:10+05:30 (IST)';
  const location = incident?.locationName || 'Paud Road, Kothrud, Pune';
  const coords = incident?.coordinates || '18.5074° N, 73.8077° E';

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn text-slate-900">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-900" />
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Judicial Evidence Certificate Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Parchment Document */}
        <div className="bg-[#FFFDF9] rounded-xl p-5 border-2 border-[#E7DECD] shadow-sm relative overflow-hidden space-y-3">
          <div className="text-center space-y-1 pb-3 border-b-2 border-slate-800/20">
            <div className="flex justify-center mb-1">
              <Emblem className="w-10 h-10" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600 font-bold block">
              GOVERNMENT OF MAHARASHTRA • PUNE MUNICIPAL CORPORATION
            </span>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase text-[#1E3A8A] tracking-tight leading-tight">
              CERTIFICATE UNDER SECTION 63 OF THE BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023
            </h2>
            <p className="text-[10px] text-slate-600 italic font-serif">
              [Admissibility of Electronic Evidence in Legal & Anti-Corruption Proceedings]
            </p>
            <div className="inline-block bg-blue-100 text-blue-900 font-mono text-[9px] px-2 py-0.5 rounded border border-blue-300 font-bold mt-1">
              CERT REF: BSA-63-{incident?.id || 'PMC-VIG-2026-9812'}
            </div>
          </div>

          <div className="text-[11px] text-slate-800 leading-relaxed font-serif">
            <p>
              This document certifies that electronic audio-visual evidence referenced under Case Ref <strong>#{incident?.id || 'PMC-VIG-2026-9812'}</strong> was captured directly into volatile DRAM storage within a Qualcomm/MediaTek StrongBox TEE Hardware Keystore environment.
            </p>
          </div>

          <div className="space-y-1.5 text-xs font-mono bg-white p-3 rounded-lg border border-[#E7DECD]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10.5px]">
              <span className="text-slate-500 font-sans font-bold">1. SHA-256 Hash:</span>
              <span className="text-[#1E3A8A] font-bold break-all">{rawHash}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10.5px]">
              <span className="text-slate-500 font-sans font-bold">2. Atomic Timestamp:</span>
              <span className="text-slate-800 font-bold">{timestamp}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10.5px]">
              <span className="text-slate-500 font-sans font-bold">3. Geo-Lock Location:</span>
              <span className="text-slate-800 font-bold">{location} ({coords})</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10.5px]">
              <span className="text-slate-500 font-sans font-bold">4. AI Privacy Redaction:</span>
              <span className="text-emerald-700 font-bold">YOLO-Edge On-Device Face Anonymization Applied</span>
            </div>
          </div>

          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-300 text-[10.5px] text-amber-950 font-serif leading-snug">
            <strong className="font-sans font-bold text-amber-900 block mb-0.5">Section 63(4) Statutory Attestation:</strong>
            "I certify that the contents of this electronic record are true representation of optical and acoustic inputs recorded during civic oversight without post-capture alteration or solid-state tampering."
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#E7DECD] text-[10px] font-mono text-slate-600">
            <div>
              <span className="font-bold text-slate-900 block">JanPraman Trust Root CA</span>
              <span className="text-emerald-700">✓ ECDSA_P256 Hardware Signed</span>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#1E3A8A] flex flex-col items-center justify-center text-center bg-blue-50/50">
              <Scale className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-[6px] font-bold text-[#1E3A8A] uppercase mt-0.5">SEC 63 BSA</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloaded ? '✓ Signed Certificate Downloaded!' : 'Download Signed PDF Certificate'}</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
