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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none p-5 text-center font-sans">
      {!submitted ? (
        <div className="space-y-4 my-auto animate-fadeIn">
          <div className="w-14 h-14 rounded-3xl bg-[#6a7a56]/15 border border-[#526140]/30 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-7 h-7 text-[#526140]" />
          </div>

          <div>
            <h2 className="font-fraunces text-xl font-bold text-[#1a1d14] mb-1">
              {t.common.wasThisHelpful}
            </h2>
            <p className="text-xs text-[#5e5c52] max-w-[260px] mx-auto">
              Your feedback helps Ubb recommend better support next time. Zero personal records are kept.
            </p>
          </div>

          {/* Rating Options List */}
          <div className="space-y-2 max-w-xs mx-auto">
            {RATING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleRating(opt.id)}
                className={`w-full text-left p-3.5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
                  opt.highlight
                    ? 'border-[#815505] bg-[#f3f5e6] hover:bg-[#edefe0] text-[#1a1d14] font-bold shadow-xs'
                    : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6] text-[#1a1d14]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="text-xs font-semibold">{t.common[opt.labelKey]}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#75786e]" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Post-Feedback Next Steps */
        <div className="space-y-4 my-auto animate-fadeIn">
          <div className="w-14 h-14 rounded-3xl bg-[#526140] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <h2 className="font-fraunces text-lg font-bold text-[#1a1d14]">
              Thank you for sharing
            </h2>
            <p className="text-xs text-[#5e5c52] mt-0.5">
              What would you like to do next?
            </p>
          </div>

          <div className="space-y-2.5 max-w-xs mx-auto">
            {selectedRating === 'still_need_support' && (
              <div className="bg-[#f3f5e6] border border-[#815505]/50 rounded-3xl p-4 text-left space-y-2.5 mb-2 shadow-xs">
                <span className="text-[11px] text-[#1a1d14] font-semibold block leading-snug">
                  You don't have to carry this alone. We can connect you to someone right now:
                </span>
                <button
                  onClick={() => onNavigate('level2_peer')}
                  className="w-full py-2.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Talk to a Volunteer →</span>
                </button>
                <button
                  onClick={() => onNavigate('level3_care')}
                  className="w-full py-2.5 rounded-full bg-[#815505] hover:bg-[#6e4604] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book a Counsellor →</span>
                </button>
              </div>
            )}

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3 rounded-full bg-white border border-[#c5c8bc] hover:bg-[#f3f5e6] text-xs font-bold text-[#1a1d14] flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Home className="w-3.5 h-3.5 text-[#526140]" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
