import React, { useState } from 'react';
import {
  ArrowLeft,
  CalendarCheck,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flame,
  Music,
  BookOpen,
  Users
} from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen10Level3UrgentCare({
  onFinishActivity,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  // Check if current local time is late night / midnight scenario (e.g. after 8 PM or testable toggle)
  const [isMidnightScenario, setIsMidnightScenario] = useState(false);
  const [bookedCounsellor, setBookedCounsellor] = useState(null);

  const handleBook = (counsellorName, timeSlot) => {
    setBookedCounsellor({ name: counsellorName, time: timeSlot });
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-red-600 font-bold">
              Level 3 · Professional Care
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.level3.title}
            </h2>
          </div>
        </div>

        {/* Demo Time Toggle */}
        <button
          onClick={() => setIsMidnightScenario(!isMidnightScenario)}
          className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-[#5B6E67] border border-[#D9E2DC] cursor-pointer"
        >
          {isMidnightScenario ? 'Mode: Midnight' : 'Mode: Clinic Hours'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {bookedCounsellor ? (
          /* Booking Confirmation State */
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2.5 text-center animate-fadeIn shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-fraunces font-bold text-sm text-emerald-950">
              Appointment Confirmed
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Your appointment with <b>{bookedCounsellor.name}</b> has been booked for <b>{bookedCounsellor.time}</b>. You will receive a private on-device alert 15 minutes before the session.
            </p>
            <button
              onClick={() => onFinishActivity('level3')}
              className="mt-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-full font-bold text-xs cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : !isMidnightScenario ? (
          /* Normal Clinic Hours Availability Cards */
          <div className="space-y-2.5 animate-fadeIn">
            <p className="text-[11px] text-[#5B6E67] leading-relaxed">
              {t.level3.subtitle}
            </p>

            {/* Counsellor A */}
            <div className="bg-[#F2F6F3] border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <b className="text-xs text-[#14282B] block">{t.level3.counsellorA.name}</b>
                  <span className="text-[10px] text-[#5B6E67] block">{t.level3.counsellorA.specialization}</span>
                </div>
                <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  {t.level3.counsellorA.available}
                </span>
              </div>

              <button
                onClick={() => handleBook(t.level3.counsellorA.name, t.level3.counsellorA.available)}
                className="w-full py-2 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                {t.level3.bookBtn}
              </button>
            </div>

            {/* Counsellor B */}
            <div className="bg-[#F2F6F3] border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <b className="text-xs text-[#14282B] block">{t.level3.counsellorB.name}</b>
                  <span className="text-[10px] text-[#5B6E67] block">{t.level3.counsellorB.specialization}</span>
                </div>
                <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  {t.level3.counsellorB.available}
                </span>
              </div>

              <button
                onClick={() => handleBook(t.level3.counsellorB.name, t.level3.counsellorB.available)}
                className="w-full py-2 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                {t.level3.bookBtn}
              </button>
            </div>
          </div>
        ) : (
          /* ================= MIDNIGHT / OUT OF HOURS SCENARIO ================= */
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#FFFBF7] border-2 border-[#E3A06F] rounded-2xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#B84C4C]">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <h3 className="font-fraunces font-bold text-xs text-[#14282B]">
                  {t.level3.midnightTitle}
                </h3>
              </div>
              <p className="text-[11px] text-[#7A4A26] leading-snug">
                {t.level3.midnightSub}
              </p>
              <button
                onClick={() => handleBook('Next Available Counsellor', 'Tomorrow, 8:30 AM')}
                className="w-full py-2 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs cursor-pointer shadow-xs mt-1"
              >
                Reserve 8:30 AM Slot →
              </button>
            </div>

            {/* While You Wait Coping Tools */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2">
              <b className="text-xs text-[#14282B] block">{t.level3.whileYouWait}</b>
              <div className="space-y-1.5">
                <button
                  onClick={() => onNavigate('level1_express', { defaultTab: 'let_it_out' })}
                  className="w-full text-left p-2 rounded-xl bg-[#F2F6F3] hover:bg-slate-200 text-xs text-[#14282B] flex items-center gap-2 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-[#B84C4C]" />
                  <span>Use Let It Out (Temporary voice vent)</span>
                </button>

                <button
                  onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
                  className="w-full text-left p-2 rounded-xl bg-[#F2F6F3] hover:bg-slate-200 text-xs text-[#14282B] flex items-center gap-2 cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5 text-[#4E7C63]" />
                  <span>Start MoodTunes acoustic binaural beats</span>
                </button>

                <button
                  onClick={() => onNavigate('level1_express', { defaultTab: 'journal' })}
                  className="w-full text-left p-2 rounded-xl bg-[#F2F6F3] hover:bg-slate-200 text-xs text-[#14282B] flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#3A5F4B]" />
                  <span>Write in your private Journal</span>
                </button>
              </div>
            </div>

            {/* Instant Campus Emergency Helpline */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <b className="text-xs text-red-900 block">Need immediate human help?</b>
                <span className="font-mono text-[10px] text-red-700 block">Campus Hotline: +91 8000 123 456</span>
              </div>
              <a
                href="tel:14416"
                className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <PhoneCall className="w-3 h-3" />
                <span>14416</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
