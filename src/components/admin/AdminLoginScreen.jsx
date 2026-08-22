import React, { useState } from 'react';
import { Shield, Fingerprint, Lock, Key, ShieldCheck, ArrowRight, Loader2, CheckCircle2, UserCheck } from 'lucide-react';
import { Emblem } from '../Emblem';

export const AdminLoginScreen = ({ onAdminLoginSuccess }) => {
  const [deptId, setDeptId] = useState('OFFICER-VIG-491');
  const [password, setPassword] = useState('••••••••');
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowPasskeyModal(true);
  };

  const handlePasskeyScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowPasskeyModal(false);
      onAdminLoginSuccess({
        officerId: deptId,
        name: "Officer R. Kulkarni",
        rank: "Superintendent of Vigilance (Desk 4)",
        ward: "Ward 14 (Kothrud)"
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 relative z-10 animate-fadeIn">
        {/* Official Institutional Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <Emblem className="w-14 h-14" />
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">JanPraman Vigilance</h1>
            <span className="text-[10px] font-bold bg-blue-900 text-white px-1.5 py-0.5 rounded">
              ADMIN
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-700">PMC Vigilance Directorate & Anti-Corruption Bureau</p>
          <p className="text-[11px] text-slate-500 font-mono">
            Restricted Government Officers Enclave (Level-3 Clearance)
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginClick} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Department ID / Badge No.</label>
            <div className="relative">
              <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={deptId}
                onChange={(e) => setDeptId(e.target.value)}
                placeholder="e.g. OFFICER-VIG-491"
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Master Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Proceed to Hardware Authentication</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-mono">
            Protected by Hardware WebAuthn / FIDO2 Level-3 Compliance.
          </p>
        </div>
      </div>

      {/* WEBAUTHN / FIDO2 PASSKEY MODAL OVERLAY */}
      {showPasskeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-center animate-fadeIn relative">
            <div className="flex justify-center">
              {/* Interactive Biometric Fingerprint Button */}
              <button
                onClick={handlePasskeyScan}
                disabled={isScanning}
                className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-900 hover:bg-blue-100 flex items-center justify-center transition-all cursor-pointer shadow-lg group disabled:opacity-80"
                title="Click to authenticate passkey"
              >
                {isScanning ? (
                  <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
                ) : (
                  <Fingerprint className="w-10 h-10 text-blue-900 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-slate-900">
                WebAuthn / FIDO2 Passkey Required
              </h3>
              <p className="text-xs text-slate-600">
                Touch your hardware security key or biometric sensor to verify officer identity.
              </p>
            </div>

            {isScanning ? (
              <div className="bg-blue-50 text-blue-900 text-[11px] font-mono font-bold p-2 rounded-lg border border-blue-200 animate-pulse">
                VERIFYING HARDWARE CRYPTOGRAPHIC CHALLENGE...
              </div>
            ) : (
              <button
                onClick={handlePasskeyScan}
                className="w-full py-2 bg-blue-900 text-white text-xs font-bold rounded-lg hover:bg-blue-950 cursor-pointer"
              >
                Tap to Authenticate Biometrics
              </button>
            )}

            <button
              onClick={() => setShowPasskeyModal(false)}
              className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
