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
  const [isMidnightScenario, setIsMidnightScenario] = useState(false);
  const [bookedCounsellor, setBookedCounsellor] = useState(null);

  const handleBook = (counsellorName, timeSlot) => {
    setBookedCounsellor({ name: counsellorName, time: timeSlot });
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-red-700 font-bold">
              Support 3 · Meet a Counsellor
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#1a1d14]">
              {t.level3.title}
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsMidnightScenario(!isMidnightScenario)}
          className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-[#edefe0] text-[#5e5c52] border border-[#c5c8bc]/60 cursor-pointer font-bold"
        >
          {isMidnightScenario ? 'Midnight' : 'Clinic Hours'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {bookedCounsellor ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-5 space-y-2.5 text-center animate-fadeIn shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#526140] text-white flex items-center justify-center mx-auto shadow-md">
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
              className="mt-2 px-5 py-2.5 bg-[#526140] hover:bg-[#435034] text-white rounded-full font-bold text-xs cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : !isMidnightScenario ? (
          <div className="space-y-2.5 animate-fadeIn">
            <p className="text-[11px] text-[#5e5c52] leading-relaxed">
              {t.level3.subtitle}
            </p>

            {/* Counsellor A */}
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <b className="text-xs text-[#1a1d14] block">{t.level3.counsellorA.name}</b>
                  <span className="text-[10.5px] text-[#5e5c52] block">{t.level3.counsellorA.specialization}</span>
                </div>
                <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2.5 py-0.5 rounded-full font-bold">
                  {t.level3.counsellorA.available}
                </span>
              </div>

              <button
                onClick={() => handleBook(t.level3.counsellorA.name, t.level3.counsellorA.available)}
                className="w-full py-2.5 rounded-2xl bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                {t.level3.bookBtn}
              </button>
            </div>

            {/* Counsellor B */}
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <b className="text-xs text-[#1a1d14] block">{t.level3.counsellorB.name}</b>
                  <span className="text-[10.5px] text-[#5e5c52] block">{t.level3.counsellorB.specialization}</span>
                </div>
                <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2.5 py-0.5 rounded-full font-bold">
                  {t.level3.counsellorB.available}
                </span>
              </div>

              <button
                onClick={() => handleBook(t.level3.counsellorB.name, t.level3.counsellorB.available)}
                className="w-full py-2.5 rounded-2xl bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                {t.level3.bookBtn}
              </button>
            </div>
          </div>
        ) : (
          /* MIDNIGHT SCENARIO */
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#f3f5e6] border-2 border-[#815505] rounded-3xl p-4 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[#815505]">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <h3 className="font-fraunces font-bold text-xs text-[#1a1d14]">
                  {t.level3.midnightTitle}
                </h3>
              </div>
              <p className="text-[11px] text-[#5e5c52] leading-snug">
                {t.level3.midnightSub}
              </p>
              <button
                onClick={() => handleBook('Next Available Counsellor', 'Tomorrow, 8:30 AM')}
                className="w-full py-2.5 rounded-2xl bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs cursor-pointer shadow-xs mt-1"
              >
                Reserve 8:30 AM Slot →
              </button>
            </div>

            {/* While You Wait Coping Tools */}
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2.5">
              <b className="text-xs text-[#1a1d14] block">{t.level3.whileYouWait}</b>
              <div className="space-y-1.5">
                <button
                  onClick={() => onNavigate('level1_express', { defaultTab: 'let_it_out' })}
                  className="w-full text-left p-2.5 rounded-2xl bg-[#f3f5e6] hover:bg-[#edefe0] text-xs text-[#1a1d14] flex items-center gap-2.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-[#815505]" />
                  <span>Use Let It Out (Temporary voice vent)</span>
                </button>

                <button
                  onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
                  className="w-full text-left p-2.5 rounded-2xl bg-[#f3f5e6] hover:bg-[#edefe0] text-xs text-[#1a1d14] flex items-center gap-2.5 cursor-pointer"
                >
                  <Music className="w-4 h-4 text-[#526140]" />
                  <span>Start MoodTunes acoustic binaural beats</span>
                </button>

                <button
                  onClick={() => onNavigate('level1_express', { defaultTab: 'journal' })}
                  className="w-full text-left p-2.5 rounded-2xl bg-[#f3f5e6] hover:bg-[#edefe0] text-xs text-[#1a1d14] flex items-center gap-2.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#5e5c52]" />
                  <span>Write in your private Journal</span>
                </button>
              </div>
            </div>

            {/* Instant Campus Emergency Helpline */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-3.5 flex items-center justify-between">
              <div>
                <b className="text-xs text-red-900 block">Need immediate human help?</b>
                <span className="font-mono text-[10px] text-red-700 block">Campus Hotline: +91 8000 123 456</span>
              </div>
              <a
                href="tel:14416"
                className="px-3.5 py-2 rounded-2xl bg-red-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
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
