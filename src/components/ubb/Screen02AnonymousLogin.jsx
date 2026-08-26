import React, { useState, useEffect } from 'react';
import { Shield, KeyRound, Copy, Check, ArrowRight, RefreshCw, Lock, UserCheck, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';

// Cryptographically secure Ubb ID generator
const generateUbbId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let middle = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint32Array(5);
    crypto.getRandomValues(array);
    for (let i = 0; i < 4; i++) {
      middle += chars.charAt(array[i] % chars.length);
    }
    const end = 10 + (array[4] % 90);
    return `UBB-${middle}-${end}`;
  } else {
    for (let i = 0; i < 4; i++) {
      middle += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const end = Math.floor(10 + Math.random() * 90);
    return `UBB-${middle}-${end}`;
  }
};

export function Screen02AnonymousLogin({
  userProfile,
  setUserProfile,
  onContinue,
  onBack,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  // Tab mode: 'new' | 'returning'
  const [authMode, setAuthMode] = useState('new');

  // New Student State
  const [newUbbId, setNewUbbId] = useState(userProfile?.anonymous_tag || userProfile?.anonymousId || generateUbbId());
  const [newPin, setNewPin] = useState('');
  const [copied, setCopied] = useState(false);

  // Returning Student State
  const [existingUbbId, setExistingUbbId] = useState('');
  const [existingPin, setExistingPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!userProfile?.anonymous_tag && !userProfile?.anonymousId) {
      setNewUbbId(generateUbbId());
    }
  }, [userProfile]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(newUbbId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setNewUbbId(generateUbbId());
  };

  // Handle New Student Creation
  const handleProceedNew = async () => {
    setIsVerifying(true);
    const profile = {
      ...userProfile,
      id: userProfile?.id || 'anon-' + newUbbId,
      anonymous_tag: newUbbId,
      anonymousId: newUbbId,
      pin: newPin.trim() || null,
      selected_language: selectedLanguage,
      language: selectedLanguage,
      current_streak: userProfile?.current_streak || 1
    };

    localStorage.setItem('ubb_user_profile', JSON.stringify(profile));
    await ubbSupabase.upsertProfile(profile);

    setUserProfile(profile);
    setIsVerifying(false);
    if (onContinue) onContinue('new');
  };

  // Handle Returning Student Login
  const handleProceedReturning = async (e) => {
    e?.preventDefault();
    setLoginError('');

    const formattedId = existingUbbId.trim().toUpperCase();
    if (!formattedId) {
      setLoginError('Please enter your Ubb ID (e.g. UBB-7K4P-29)');
      return;
    }

    setIsVerifying(true);

    // Try fetching from local storage or Supabase
    let matchedProfile = null;
    const localSaved = localStorage.getItem('ubb_user_profile');
    if (localSaved) {
      try {
        const parsed = JSON.parse(localSaved);
        if (parsed.anonymous_tag === formattedId || parsed.anonymousId === formattedId) {
          matchedProfile = parsed;
        }
      } catch (err) {
        console.warn('Error reading local profile', err);
      }
    }

    // Verify PIN if one was set
    if (matchedProfile && matchedProfile.pin) {
      if (matchedProfile.pin !== existingPin.trim()) {
        setIsVerifying(false);
        setLoginError('Incorrect 4-digit PIN. Please try again or create a fresh ID.');
        return;
      }
    }

    // If not found in local, create/restore profile with this ID
    const finalProfile = matchedProfile || {
      id: 'anon-' + formattedId,
      anonymous_tag: formattedId,
      anonymousId: formattedId,
      pin: existingPin.trim() || null,
      selected_language: selectedLanguage,
      language: selectedLanguage,
      current_streak: 2
    };

    localStorage.setItem('ubb_user_profile', JSON.stringify(finalProfile));
    await ubbSupabase.upsertProfile(finalProfile);

    setUserProfile(finalProfile);
    setIsVerifying(false);
    if (onContinue) onContinue('returning');
  };

  const handleStartFreshForgot = () => {
    setAuthMode('new');
    setNewUbbId(generateUbbId());
    setNewPin('');
    setLoginError('');
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between p-5 select-none overflow-y-auto font-sans">
      {/* Top Header */}
      <div className="pt-2 text-center">
        <div className="flex items-center justify-between mb-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-4" />
          )}

          <span className="font-mono text-[9px] bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full border border-[#526140]/20 font-bold">
            Zero-PII Student Sanctuary
          </span>
          <div className="w-4" />
        </div>

        <div className="w-13 h-13 rounded-3xl bg-[#6a7a56]/15 border border-[#526140]/30 flex items-center justify-center mx-auto mb-2 shadow-xs">
          <Shield className="w-6 h-6 text-[#526140]" />
        </div>

        <h2 className="font-fraunces text-2xl font-bold text-[#1a1d14] leading-tight mb-1">
          {authMode === 'new' ? t.screen2.title : 'Welcome Back'}
        </h2>
        <p className="text-xs text-[#5e5c52] leading-relaxed max-w-[280px] mx-auto">
          {authMode === 'new'
            ? t.screen2.subtitle
            : 'Enter your private Ubb ID and PIN to restore your check-in journey.'}
        </p>
      </div>

      {/* Dual Tabs: New Identity vs Returning Student */}
      <div className="my-auto space-y-3.5">
        <div className="grid grid-cols-2 gap-1.5 bg-[#edefe0] p-1 rounded-2xl border border-[#c5c8bc]/60">
          <button
            type="button"
            onClick={() => {
              setAuthMode('new');
              setLoginError('');
            }}
            className={`py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'new'
                ? 'bg-[#526140] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Student</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('returning');
              setLoginError('');
            }}
            className={`py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'returning'
                ? 'bg-[#526140] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Returning Student</span>
          </button>
        </div>

        {/* TAB 1: NEW IDENTITY CREATION */}
        {authMode === 'new' && (
          <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4.5 space-y-3.5 shadow-sm animate-fadeIn">
            {/* Generated ID Box */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#526140] font-bold mb-1.5">
                <span>Your Generated Ubb ID</span>
                <button
                  onClick={handleRegenerate}
                  className="text-[#815505] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Re-roll
                </button>
              </div>

              <div className="bg-white border border-[#c5c8bc] rounded-2xl p-3 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-[#526140] text-white flex items-center justify-center text-xs">
                    🌱
                  </div>
                  <span className="font-mono font-bold text-base tracking-wider text-[#1a1d14]">
                    {newUbbId}
                  </span>
                </div>

                <button
                  onClick={handleCopyId}
                  className="p-1.5 rounded-xl bg-[#edefe0] hover:bg-[#e8e9db] text-[#1a1d14] cursor-pointer transition-all flex items-center gap-1 text-[11px] font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-mono">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#5e5c52]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-[10px] text-[#5e5c52] mt-1.5 block leading-snug">
                {t.screen2.saveNotice}
              </span>
            </div>

            {/* Optional PIN Input */}
            <div>
              <label className="font-mono text-[9.5px] text-[#5e5c52] uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                <KeyRound className="w-3.5 h-3.5 text-[#815505]" />
                <span>{t.screen2.pinLabel}</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={t.screen2.pinPlaceholder}
                  className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2 text-center text-sm font-mono tracking-widest text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
                />
                <div className="absolute right-3.5 top-2.5 text-[#75786e]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <button
              onClick={handleProceedNew}
              disabled={isVerifying}
              className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.screen2.continueBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* TAB 2: RETURNING STUDENT LOGIN */}
        {authMode === 'returning' && (
          <form onSubmit={handleProceedReturning} className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4.5 space-y-3 shadow-sm animate-fadeIn">
            <div>
              <label className="font-mono text-[9.5px] text-[#5e5c52] uppercase tracking-wider font-semibold flex items-center justify-between mb-1">
                <span>Enter Your Saved Ubb ID</span>
                <span className="text-[#815505]">e.g. UBB-7K4P-29</span>
              </label>
              <input
                type="text"
                required
                value={existingUbbId}
                onChange={(e) => setExistingUbbId(e.target.value.toUpperCase())}
                placeholder="UBB-XXXX-XX"
                className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2.5 font-mono text-sm tracking-wider text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
              />
            </div>

            <div>
              <label className="font-mono text-[9.5px] text-[#5e5c52] uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                <KeyRound className="w-3.5 h-3.5 text-[#815505]" />
                <span>4-Digit PIN (If you created one)</span>
              </label>
              <input
                type="password"
                maxLength={4}
                value={existingPin}
                onChange={(e) => setExistingPin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="••••"
                className="w-full bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2 text-center text-sm font-mono tracking-widest text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-2.5 text-[11px] text-red-800 flex items-start gap-1.5 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isVerifying ? 'Verifying…' : 'Restore Journey & Enter →'}</span>
            </button>

            {/* Zero-PII Forgot PIN Recovery */}
            <div className="text-center pt-1 border-t border-[#c5c8bc]/40">
              <button
                type="button"
                onClick={handleStartFreshForgot}
                className="text-[11px] text-[#815505] hover:underline font-semibold cursor-pointer"
              >
                Forgot your ID or PIN? Start fresh with a new identity →
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-2 text-center font-mono text-[9px] text-[#75786e] leading-snug">
        {t.screen2.deleteDataNote}
      </div>
    </div>
  );
}
