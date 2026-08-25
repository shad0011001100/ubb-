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

    await ubbSupabase.postCommunityLetter({
      author_tag: anonId,
      content: wallMessage.trim()
    });

    setIsSubmitting(false);
    setModerationSubmitted(true);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold">
              {checkInData?.emoji} {checkInData?.label}
            </div>
            <h2 className="font-fraunces text-lg font-bold text-[#1a1d14]">
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
              className="bg-[#edefe0] border border-[#c5c8bc]/60 hover:border-[#526140] rounded-3xl p-4 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#526140]/15 group-hover:bg-[#526140]/25 flex items-center justify-center flex-shrink-0 text-[#526140]">
                <Music className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="text-xs text-[#1a1d14] block">{t.screen5A.expressOpt}</b>
                <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                  {t.screen5A.expressSub}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140]" />
            </div>

            {/* Option 2: Help My Peers (Wall of Thoughts Contribution) */}
            <div
              onClick={() => setShowWallComposer(true)}
              className="bg-[#6a7a56] text-[#f9ffeb] rounded-3xl p-4 shadow-sm hover:scale-101 transition-all cursor-pointer flex items-start gap-3.5 group active:scale-99"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#f9ffeb]/15 text-[#f9ffeb] flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="text-xs text-[#f9ffeb]">{t.screen5A.helpPeersOpt}</b>
                  <span className="font-mono text-[8.5px] bg-[#f9ffeb] text-[#526140] px-2 py-0.2 rounded-full font-bold">
                    Community
                  </span>
                </div>
                <p className="text-[11px] text-[#f9ffeb]/90 mt-0.5 leading-snug">
                  {t.screen5A.helpPeersSub}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#f9ffeb]/80" />
            </div>

            {/* Option 3: Explore a Wellbeing Activity */}
            <div
              onClick={() => onNavigate('level1_express', { defaultTab: 'mood_tunes' })}
              className="bg-[#edefe0] border border-[#c5c8bc]/60 hover:border-[#526140] rounded-3xl p-4 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#815505]/15 text-[#815505] flex items-center justify-center flex-shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="text-xs text-[#1a1d14] block">{t.screen5A.activityOpt}</b>
                <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                  {t.screen5A.activitySub}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140]" />
            </div>

            {/* Option 4: Return to Dashboard */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3 rounded-full bg-[#f3f5e6] hover:bg-[#edefe0] text-[#5e5c52] font-semibold text-xs transition-all cursor-pointer text-center"
            >
              {t.screen5A.dashOpt}
            </button>
          </>
        ) : (
          /* Positive Wall Contribution Composer */
          <div className="space-y-3 animate-fadeIn">
            <div>
              <h3 className="font-fraunces font-bold text-sm text-[#1a1d14]">
                {t.screen5A.wallPromptTitle}
              </h3>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-relaxed">
                {t.screen5A.wallPromptDesc}
              </p>
            </div>

            {/* Example Starters */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
                Prompt Starters
              </span>
              {t.screen5A.starters.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarterSelect(starter)}
                  className={`w-full text-left p-2.5 rounded-2xl border text-[11px] transition-all cursor-pointer ${
                    selectedStarter === starter
                      ? 'border-[#526140] bg-[#6a7a56]/15 font-semibold text-[#1a1d14]'
                      : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6] text-[#5e5c52]'
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
              className="w-full bg-white border border-[#c5c8bc] rounded-2xl p-3.5 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
            />

            {/* Moderation Status / Success Notice */}
            {moderationSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-900 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Submitted to Volunteer Moderation Queue!</span>
                </div>
                <p className="text-[10.5px] text-emerald-800 leading-snug">
                  Your note will appear anonymously on the Wall of Thoughts as soon as it passes our content safety review.
                </p>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="mt-1 text-[10.5px] px-4 py-1.5 bg-[#526140] text-white rounded-full font-semibold cursor-pointer"
                >
                  Return to Dashboard →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-2xl p-2.5 text-[10px] font-mono text-[#5e5c52] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#526140]" />
                  <span>{t.screen5A.moderationStatus}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePostWall}
                    disabled={!wallMessage.trim() || isSubmitting}
                    className="flex-1 py-3 rounded-full bg-[#526140] hover:bg-[#435034] disabled:opacity-40 text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
                  >
                    {isSubmitting ? 'Submitting…' : t.screen5A.postBtn}
                  </button>

                  <button
                    onClick={() => setShowWallComposer(false)}
                    className="px-4 py-3 rounded-full bg-[#edefe0] text-[#5e5c52] text-xs cursor-pointer font-semibold"
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
