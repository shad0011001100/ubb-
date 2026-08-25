import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Mail, KeyRound, HeartHandshake, CheckCircle2 } from 'lucide-react';

export function VolunteerAuthScreen({
  onLoginSuccess,
  onBack,
  selectedLanguage = 'en'
}) {
  const [role, setRole] = useState('volunteer');
  const [email, setEmail] = useState('kunal.joshi@campus.edu.in');
  const [password, setPassword] = useState('••••••••');
  const [twoFactor, setTwoFactor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: role === 'volunteer' ? 'vol-kunal-01' : 'counsellor-pratibha-01',
        name: role === 'volunteer' ? 'Kunal Joshi (Psychology Volunteer)' : 'Dr. Pratibha Deshmukh (Licensed Counsellor)',
        role: role,
        email: email
      });
    }, 600);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between p-5 select-none overflow-y-auto font-sans">
      {/* Header */}
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

        <div className="w-14 h-14 rounded-3xl bg-[#6a7a56]/15 border border-[#526140]/30 flex items-center justify-center mx-auto mb-2.5 shadow-xs">
          <HeartHandshake className="w-7 h-7 text-[#526140]" />
        </div>

        <h2 className="font-fraunces text-2xl font-bold text-[#1a1d14] mb-1">
          Support Staff Portal
        </h2>
        <p className="text-xs text-[#5e5c52] max-w-xs mx-auto">
          Access your assigned queue, moderation tasks, and appointments.
        </p>
      </div>

      {/* Role Switcher & Form */}
      <form onSubmit={handleLogin} className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-5 my-auto space-y-3.5 shadow-sm">
        {/* Role Toggle */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold block mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#edefe0] rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setRole('volunteer');
                setEmail('kunal.joshi@campus.edu.in');
              }}
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
              onClick={() => {
                setRole('counsellor');
                setEmail('dr.pratibha@campus.edu.in');
              }}
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

        {/* Email */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
            Institutional Email or ID
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
