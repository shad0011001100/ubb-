import React, { useState } from 'react';
import { Sparkles, HeartHandshake, CheckCircle2, ChevronRight, Users, CalendarCheck, Home } from 'lucide-react';
import { getTranslation } from '../../services/translations';

const RATING_OPTIONS = [
  { id: 'really_helpful', emoji: '🌟', labelKey: 'reallyHelpful' },
  { id: 'good', emoji: '👍', labelKey: 'good' },
  { id: 'okay', emoji: '👌', labelKey: 'okay' },
  { id: 'not_great', emoji: '😕', labelKey: 'notGreat' },
  { id: 'still_need_support', emoji: '🤝', labelKey: 'stillNeedSupport', highlight: true }
];

export function ScreenFeedbackModal({
  activityType = 'activity',
  onSubmitFeedback,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [selectedRating, setSelectedRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (ratingId) => {
    setSelectedRating(ratingId);
    setSubmitted(true);
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none p-5 text-center">
      {!submitted ? (
        <div className="space-y-4 my-auto animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-[#E3A06F]/20 text-[#E3A06F] flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <h2 className="font-fraunces text-lg font-bold text-[#14282B] mb-1">
              {t.common.wasThisHelpful}
            </h2>
            <p className="text-xs text-[#5B6E67] max-w-[260px] mx-auto">
              Your feedback helps Ubb recommend better support next time. We store zero personal records.
            </p>
          </div>

          {/* Rating Options List */}
          <div className="space-y-2 max-w-xs mx-auto">
            {RATING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleRating(opt.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
                  opt.highlight
                    ? 'border-[#E3A06F] bg-[#FFFBF7] hover:bg-[#FFF6EE] text-[#7A4A26] font-semibold'
                    : 'border-[#D9E2DC] bg-[#F2F6F3]/60 hover:bg-[#F2F6F3] text-[#14282B]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{opt.emoji}</span>
                  <span className="text-xs">{t.common[opt.labelKey]}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Post-Feedback Next Steps */
        <div className="space-y-4 my-auto animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h2 className="font-fraunces text-base font-bold text-[#14282B]">
              Thank you for sharing
            </h2>
            <p className="text-xs text-[#5B6E67] mt-0.5">
              What would you like to do next?
            </p>
          </div>

          <div className="space-y-2 max-w-xs mx-auto">
            {selectedRating === 'still_need_support' && (
              <div className="bg-[#FFFBF7] border border-[#E3A06F] rounded-2xl p-3 text-left space-y-2 mb-2">
                <span className="text-[11px] text-[#7A4A26] font-semibold block">
                  You don't have to carry this alone. We can connect you to someone right now:
                </span>
                <button
                  onClick={() => onNavigate('level2_peer')}
                  className="w-full py-2 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Talk to a Volunteer →</span>
                </button>
                <button
                  onClick={() => onNavigate('level3_care')}
                  className="w-full py-2 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book a Counsellor →</span>
                </button>
              </div>
            )}

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full p-2.5 rounded-xl bg-[#F2F6F3] hover:bg-slate-200 text-xs font-semibold text-[#14282B] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#3A5F4B]" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
