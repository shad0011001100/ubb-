import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Mail, KeyRound, HeartHandshake, CheckCircle2 } from 'lucide-react';

export function VolunteerAuthScreen({
  onLoginSuccess,
  onBack,
  selectedLanguage = 'en'
}) {
  const [role, setRole] = useState('volunteer'); // 'volunteer' | 'counsellor'
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
    <div className="h-full bg-gradient-to-b from-[#14282B] via-[#1E3A3D] to-[#2B4B3D] text-white flex flex-col justify-between p-5 select-none overflow-y-auto">
      {/* Header */}
      <div className="pt-2 text-center">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[9px] bg-white/10 text-[#C3D2CB] px-2 py-0.5 rounded-full">
            Staff & Volunteer Gateway
          </span>
          <div className="w-6" />
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#E3A06F]/20 border border-[#E3A06F]/40 flex items-center justify-center mx-auto mb-2 shadow-lg">
          <HeartHandshake className="w-6 h-6 text-[#E3A06F]" />
        </div>

        <h2 className="font-fraunces text-xl font-bold text-white mb-1">
          Support Staff Portal
        </h2>
        <p className="text-xs text-[#C3D2CB]">
          Access your assigned queue, moderation tasks, and appointments.
        </p>
      </div>

      {/* Role Switcher & Form */}
      <form onSubmit={handleLogin} className="bg-black/30 border border-white/15 rounded-2xl p-4 my-auto space-y-3.5 shadow-xl">
        {/* Role Toggle */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] font-semibold block mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setRole('volunteer');
                setEmail('kunal.joshi@campus.edu.in');
              }}
              className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                role === 'volunteer'
                  ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white'
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
              className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                role === 'counsellor'
                  ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Counsellor
            </button>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-white/70 block mb-1">
            Institutional Email or ID
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E3A06F]"
            />
            <Mail className="w-3.5 h-3.5 absolute right-3 top-2.5 text-white/40" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-white/70 block mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E3A06F]"
            />
            <Lock className="w-3.5 h-3.5 absolute right-3 top-2.5 text-white/40" />
          </div>
        </div>

        {/* Optional 2FA */}
        <div>
          <label className="font-mono text-[9px] uppercase tracking-wider text-white/70 block mb-1">
            2FA Security Code (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={twoFactor}
              onChange={(e) => setTwoFactor(e.target.value)}
              placeholder="123456"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E3A06F] font-mono tracking-wider"
            />
            <KeyRound className="w-3.5 h-3.5 absolute right-3 top-2.5 text-white/40" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs cursor-pointer shadow-md transition-all mt-2"
        >
          {isLoading ? 'Verifying Credentials…' : `Enter ${role === 'volunteer' ? 'Volunteer' : 'Counsellor'} Dashboard →`}
        </button>
      </form>

      {/* Role-Based Privacy Notice */}
      <div className="pt-2 text-center">
        <p className="text-[10px] text-[#A3D1B9] leading-tight">
          Role-Based Access: Volunteers see only assigned cases. Counsellors view escalated records. Zero personal student contact details are ever revealed.
        </p>
      </div>
    </div>
  );
}
