import React, { useState } from 'react';
import { ArrowLeft, Sparkles, MessageSquare, Music, BookOpen, Wind, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';

export function Screen05APositiveFlow({
  userProfile,
  checkInData,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [showWallComposer, setShowWallComposer] = useState(false);
  const [wallMessage, setWallMessage] = useState('');
  const [selectedStarter, setSelectedStarter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moderationSubmitted, setModerationSubmitted] = useState(false);

  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  const handleStarterSelect = (starter) => {
    setSelectedStarter(starter);
    setWallMessage(starter + ' ');
  };

  const handlePostWall = async () => {
    if (!wallMessage.trim()) return;
    setIsSubmitting(true);

    // Save to Supabase community_letters (with is_approved: false by default for moderation queue)
    await ubbSupabase.postCommunityLetter({
      author_tag: anonId,
      content: wallMessage.trim()
    });

    setIsSubmitting(false);
    setModerationSubmitted(true);
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#4E7C63] font-bold">
              {checkInData?.emoji} {checkInData?.label}
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen5A.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Options or Wall Composer */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {!showWallComposer ? (
          <>
            {/* Option 1: Express Myself */}
            <div
              onClick={() => onNavigate('level1_express')}
              className="bg-white border border-[#D9E2DC] hover:border-[#4E7C63] rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#4E7C63]/12 group-hover:bg-[#4E7C63]/20 flex items-center justify-center flex-shrink-0 text-[#4E7C63]">
                <Music className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <b className="text-xs text-[#14282B] block">{t.screen5A.expressOpt}</b>
                <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                  {t.screen5A.expressSub}
                </p>
              </div>
            </div>

            {/* Option 2: Help My Peers (Wall of Thoughts Contribution) */}
            <div
              onClick={() => setShowWallComposer(true)}
              className="bg-gradient-to-r from-[#FFFBF7] to-[#FFF6EE] border-2 border-[#E3A06F] rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-sm group hover:scale-101"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E3A06F] text-[#241208] flex items-center justify-center flex-shrink-0 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <b className="text-xs text-[#241208]">{t.screen5A.helpPeersOpt}</b>
                  <span className="font-mono text-[8.5px] bg-[#E3A06F] text-[#241208] px-1.5 py-0.2 rounded font-bold">
                    Community
                  </span>
                </div>
                <p className="text-[10.5px] text-[#7A4A26] mt-0.5 leading-snug">
                  {t.screen5A.helpPeersSub}
                </p>
              </div>
            </div>

            {/* Option 3: Explore a Wellbeing Activity */}
            <div
              onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
              className="bg-white border border-[#D9E2DC] hover:border-[#3A5F4B] rounded-2xl p-3.5 flex items-start gap-3 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#3A5F4B]/10 group-hover:bg-[#3A5F4B]/20 flex items-center justify-center flex-shrink-0 text-[#3A5F4B]">
                <Wind className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <b className="text-xs text-[#14282B] block">{t.screen5A.activityOpt}</b>
                <p className="text-[10.5px] text-[#5B6E67] mt-0.5 leading-snug">
                  {t.screen5A.activitySub}
                </p>
              </div>
            </div>

            {/* Option 4: Return to Dashboard */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#5B6E67] font-semibold text-xs transition-all cursor-pointer text-center"
            >
              {t.screen5A.dashOpt}
            </button>
          </>
        ) : (
          /* Positive Wall Contribution Composer */
          <div className="space-y-3 animate-fadeIn">
            <div>
              <h3 className="font-fraunces font-bold text-sm text-[#14282B]">
                {t.screen5A.wallPromptTitle}
              </h3>
              <p className="text-[11px] text-[#5B6E67] mt-0.5 leading-relaxed">
                {t.screen5A.wallPromptDesc}
              </p>
            </div>

            {/* Example Starters */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] font-bold block">
                Prompt Starters
              </span>
              {t.screen5A.starters.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarterSelect(starter)}
                  className={`w-full text-left p-2 rounded-xl border text-[10.5px] transition-all cursor-pointer ${
                    selectedStarter === starter
                      ? 'border-[#E3A06F] bg-[#E3A06F]/15 font-semibold text-[#241208]'
                      : 'border-[#D9E2DC] bg-[#F2F6F3]/60 hover:bg-[#F2F6F3] text-[#5B6E67]'
                  }`}
                >
                  "{starter}"
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={wallMessage}
              onChange={(e) => setWallMessage(e.target.value)}
              placeholder="Write your encouraging thought here..."
              className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl p-3 text-xs text-[#14282B] placeholder-[#5B6E67] focus:outline-none focus:border-[#4E7C63] resize-none"
            />

            {/* Moderation Status / Success Notice */}
            {moderationSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-900 text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Submitted to Volunteer Moderation Queue!</span>
                </div>
                <p className="text-[10.5px] text-emerald-800 leading-snug">
                  Your note will appear anonymously on the Wall of Thoughts as soon as it passes our content safety review.
                </p>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="mt-2 text-[10.5px] px-3 py-1 bg-emerald-700 text-white rounded-full font-semibold cursor-pointer"
                >
                  Return to Dashboard →
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-[9.5px] font-mono text-[#5B6E67] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E7C63]" />
                  <span>{t.screen5A.moderationStatus}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePostWall}
                    disabled={!wallMessage.trim() || isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] disabled:opacity-40 text-[#241208] font-bold text-xs cursor-pointer shadow-xs transition-all"
                  >
                    {isSubmitting ? 'Submitting…' : t.screen5A.postBtn}
                  </button>

                  <button
                    onClick={() => setShowWallComposer(false)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 text-[#5B6E67] text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
