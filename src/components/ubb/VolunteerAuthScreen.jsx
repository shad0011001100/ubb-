import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Mail, KeyRound, HeartHandshake, Sparkles, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import ubbLogoLight from '../../assets/ubb-logo-light.png';
import ubbIcon from '../../assets/ubb-icon.png';

export function VolunteerAuthScreen({
  onLoginSuccess,
  onBack,
  selectedLanguage = 'en'
}) {
  const [role, setRole] = useState('volunteer'); // 'volunteer' | 'counsellor'
  const [email, setEmail] = useState('kunal.joshi@campus.edu.in');
  const [password, setPassword] = useState('volunteer123');
  const [twoFactor, setTwoFactor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectRole = (newRole) => {
    setRole(newRole);
    setErrorMsg('');
    if (newRole === 'volunteer') {
      setEmail('kunal.joshi@campus.edu.in');
      setPassword('volunteer123');
    } else {
      setEmail('dr.pratibha@campus.edu.in');
      setPassword('counsellor123');
    }
  };

  const handleQuickDemoFill = (targetRole) => {
    handleSelectRole(targetRole);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setIsLoading(false);
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      const isVolunteer = role === 'volunteer';
      onLoginSuccess({
        id: isVolunteer ? 'vol-kunal-01' : 'counsellor-pratibha-01',
        name: isVolunteer ? (email.includes('kunal') ? 'Kunal Joshi (Peer Volunteer)' : `${email.split('@')[0]} (Volunteer)`) : (email.includes('pratibha') ? 'Dr. Pratibha Deshmukh (Licensed Counsellor)' : `${email.split('@')[0]} (Counsellor)`),
        role: role,
        email: email.trim()
      });
    }, 500);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between p-5 select-none overflow-y-auto font-sans">
      {/* Top Header */}
      <div className="pt-2 text-center">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full bg-[#edefe0] hover:bg-[#e8e9db] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
            Staff & Volunteer Gateway
          </span>
          <div className="w-6" />
        </div>

        <div className="w-14 h-14 flex items-center justify-center mx-auto mb-2">
          <img src={ubbLogoLight || ubbIcon} alt="Ubb Logo" className="w-full h-full object-contain" />
        </div>

        <h2 className="font-fraunces text-2xl font-bold text-[#1a1d14] mb-0.5">
          Support Staff Portal
        </h2>
        <p className="text-xs text-[#5e5c52] max-w-xs mx-auto">
          Role-based portal for assigned peer requests and clinical consultations.
        </p>
      </div>

      {/* Role Switcher & Form */}
      <form onSubmit={handleLogin} className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4.5 my-auto space-y-3 shadow-sm">
        {/* Role Toggle */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold block mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#edefe0] rounded-2xl">
            <button
              type="button"
              onClick={() => handleSelectRole('volunteer')}
              className={`py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                role === 'volunteer'
                  ? 'bg-[#526140] text-white font-bold shadow-xs'
                  : 'text-[#5e5c52] hover:text-[#1a1d14]'
              }`}
            >
              Peer Volunteer
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole('counsellor')}
              className={`py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                role === 'counsellor'
                  ? 'bg-red-800 text-white font-bold shadow-xs'
                  : 'text-[#5e5c52] hover:text-[#1a1d14]'
              }`}
            >
              Counsellor
            </button>
          </div>
        </div>

        {/* 1-Click Quick Demo Credentials Pill for Evaluators */}
        <div className="bg-white/80 border border-[#c5c8bc]/70 rounded-2xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-[#5e5c52] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#815505]" />
            <span>Quick Test:</span>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handleQuickDemoFill('volunteer')}
              className={`text-[9.5px] px-2 py-0.5 rounded-full font-mono font-bold cursor-pointer transition-all ${
                role === 'volunteer' ? 'bg-[#526140] text-white' : 'bg-[#edefe0] text-[#526140]'
              }`}
            >
              Fill Volunteer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('counsellor')}
              className={`text-[9.5px] px-2 py-0.5 rounded-full font-mono font-bold cursor-pointer transition-all ${
                role === 'counsellor' ? 'bg-red-800 text-white' : 'bg-[#edefe0] text-red-800'
              }`}
            >
              Fill Counsellor
            </button>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
            Institutional Email or Staff ID
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@campus.edu.in"
              className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
            />
            <Mail className="w-3.5 h-3.5 absolute right-3.5 top-2.5 text-[#75786e]" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
            />
            <Lock className="w-3.5 h-3.5 absolute right-3.5 top-2.5 text-[#75786e]" />
          </div>
        </div>

        {/* Optional 2FA */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
            2FA Security Code (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={twoFactor}
              onChange={(e) => setTwoFactor(e.target.value)}
              placeholder="123456"
              className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] font-mono tracking-wider"
            />
            <KeyRound className="w-3.5 h-3.5 absolute right-3.5 top-2.5 text-[#75786e]" />
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-2.5 text-[11px] text-red-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs cursor-pointer shadow-md transition-all mt-2"
        >
          {isLoading ? 'Verifying Credentials…' : `Enter ${role === 'volunteer' ? 'Volunteer' : 'Counsellor'} Dashboard →`}
        </button>
      </form>

      {/* Role-Based Privacy Notice */}
      <div className="pt-2 text-center">
        <p className="text-[10px] text-[#5e5c52] leading-tight max-w-xs mx-auto">
          Role-Based Access: Volunteers see only assigned cases. Counsellors view escalated records. Zero personal student contact details are ever revealed.
        </p>
      </div>
    </div>
  );
}
