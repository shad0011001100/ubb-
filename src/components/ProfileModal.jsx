import React from 'react';
import { X, User, ShieldCheck, MapPin, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { Emblem } from './Emblem';

export const ProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl space-y-3 relative animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Emblem className="w-6 h-6" />
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Citizen e-Identity & DigiLocker
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
            RS
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Rajesh S. Sharma</h4>
            <p className="text-[10px] text-slate-500 font-mono">Aadhaar Linked: XXXX-XXXX-4912</p>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> KYC Verified
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-700 font-medium">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-500 text-[11px]">Municipal Ward</span>
            <span className="font-bold text-slate-800">Ward 14 (Kothrud - Karve Nagar)</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-500 text-[11px]">Registered Property ID</span>
            <span className="font-mono font-bold text-slate-800">PMC-PT-2024-88319</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-500 text-[11px]">Water Consumer ID</span>
            <span className="font-mono font-bold text-slate-800">04-2918-X</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-center font-mono">
          Pune Municipal Corporation • e-Governance Division
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-md"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
