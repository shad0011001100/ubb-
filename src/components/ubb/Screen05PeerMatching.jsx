import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, MessageSquare, Calendar, Sparkles, Check } from 'lucide-react';
import { api } from '../../services/api';
import { ubbSupabase } from '../../services/supabase';
import { getTranslation } from '../../services/translations';

export function Screen05PeerMatching({
  userProfile,
  screeningResults,
  onSelectPeer,
  onNavigate
}) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const [peers, setPeers] = useState([]);
  const [activeFilter, setActiveFilter] = useState(userLang === 'mr' ? 'marathi' : 'all'); // 'all' | 'marathi' | 'burnout' | 'counselor'

  const phqAnswers = screeningResults?.answers || {};
  const isHighBurnout = (phqAnswers[7] || 0) >= 2 || (phqAnswers[8] || 0) >= 2;
  const isHighInsomnia = (phqAnswers[3] || 0) >= 2;

  useEffect(() => {
    const fetchPeers = async () => {
      let rawPeers = [];
      const data = await api.getPeers();
      if (data && data.peers && data.peers.length > 0) {
        rawPeers = data.peers;
      } else {
        const supaVolunteers = await ubbSupabase.getVolunteers();
        if (supaVolunteers) {
          rawPeers = supaVolunteers.map((v) => ({
            id: v.id,
            name: v.display_name,
            role: v.role_title,
            verificationType: v.supervisor_info,
            isVerified: true,
            bio: v.role_title.includes('Psych')
              ? (userLang === 'mr' ? "मीसुद्धा परीक्षेच्या ताणातून गेले आहे. तुमच्या गतीने आणि मोकळेपणाने बोलूया." : "I've been through exam-season burnout too. Let's talk it through at your pace.")
              : (userLang === 'mr' ? "संवेदनापूर्वक ऐकण्याचे प्रशिक्षण. मराठी, हिंदी आणि इंग्रजीत संवाद साधता येतो." : "Trained in non-violent communication. Fluent in Marathi, Hindi & English."),
            specialties: v.role_title.includes('Psych') ? ["Academic Stress", "Sleep Anxiety"] : ["मराठी संवाद", "परीक्षा भीती"],
            languages: v.display_name.includes('Kunal') || v.display_name.includes('Anand') ? ["मराठी", "हिंदी", "English"] : ["English", "हिंदी"],
            avatarColor: v.role_title.includes('Psych') ? "#E3A06F" : "#4E7C63",
            status: v.daily_active_seconds >= 7200 ? "burnout_cooldown" : "online",
            isCounselor: v.role_title.includes('Psychologist') || v.role_title.includes('Consultant'),
            nextSlot: userLang === 'mr' ? "आज, दुपारी ४:००" : "Today, 4:00 PM"
          }));
        }
      }

      // INTELLIGENT MATCHING ALGORITHM
      const scoredPeers = rawPeers.map((peer) => {
        let matchScore = 70;
        const matchReasons = [];

        const speaksMarathi = peer.languages?.includes('मराठी') || peer.name.includes('Kunal') || peer.name.includes('Anand');
        if (userLang === 'mr' && speaksMarathi) {
          matchScore += 25;
          matchReasons.push(userLang === 'mr' ? 'मराठी मातृभाषेत संवाद' : 'Fluent in Marathi');
        }

        const isBurnoutSpecialist = peer.specialties?.some(s => s.toLowerCase().includes('academic') || s.toLowerCase().includes('burnout') || s.includes('परीक्षा'));
        if (isHighBurnout && isBurnoutSpecialist) {
          matchScore += 20;
          matchReasons.push(userLang === 'mr' ? 'परीक्षेचा ताण निवारण तज्ज्ञ' : 'Specializes in Academic Burnout');
        }

        const isSleepSpecialist = peer.specialties?.some(s => s.toLowerCase().includes('sleep') || s.includes('झोप'));
        if (isHighInsomnia && isSleepSpecialist) {
          matchScore += 15;
          matchReasons.push(userLang === 'mr' ? 'झोपेच्या समस्या निवारण' : 'Sleep Anxiety Recovery');
        }

        if (screeningResults?.risk_tier === 'SEVERE' && peer.isCounselor) {
          matchScore += 20;
          matchReasons.push(userLang === 'mr' ? 'परवानाधारक क्लिनिकल कौन्सिलर' : 'Clinical License (RCI / NMC)');
        }

        const finalScore = Math.min(99, matchScore);

        return {
          ...peer,
          matchScore: finalScore,
          matchReasons,
          isTopMatch: false
        };
      });

      scoredPeers.sort((a, b) => b.matchScore - a.matchScore);
      if (scoredPeers.length > 0) {
        scoredPeers[0].isTopMatch = true;
      }

      setPeers(scoredPeers);
    };

    fetchPeers();
  }, [userLang, isHighBurnout, isHighInsomnia, screeningResults]);

  const filteredPeers = peers.filter((p) => {
    if (activeFilter === 'marathi') {
      return p.languages?.includes('मराठी') || p.name.includes('Kunal') || p.name.includes('Anand');
    }
    if (activeFilter === 'burnout') {
      return p.specialties?.some((s) => s.toLowerCase().includes('academic') || s.toLowerCase().includes('burnout') || s.includes('परीक्षा'));
    }
    if (activeFilter === 'counselor') {
      return p.isCounselor;
    }
    return true;
  });

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#D9E2DC]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67]">
                {t.peerMatching.headerSub}
              </div>
              <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
                {t.peerMatching.headerTitle}
              </h2>
            </div>
          </div>

          <div className="font-mono text-[8.5px] bg-[#E3A06F]/15 text-[#C9814F] px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E3A06F]" />
            <span>AI Matched</span>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-[9.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#3A5F4B] text-white border-[#3A5F4B] font-semibold'
                : 'bg-slate-100 border-slate-200 text-[#5B6E67]'
            }`}
          >
            {t.peerMatching.allFilter}
          </button>
          <button
            onClick={() => setActiveFilter('marathi')}
            className={`text-[9.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === 'marathi'
                ? 'bg-[#E3A06F] text-[#241208] border-[#E3A06F] font-semibold'
                : 'bg-slate-100 border-slate-200 text-[#5B6E67]'
            }`}
          >
            <span>{t.peerMatching.marathiFilter}</span>
            {userLang === 'mr' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
          </button>
          <button
            onClick={() => setActiveFilter('burnout')}
            className={`text-[9.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
              activeFilter === 'burnout'
                ? 'bg-[#3A5F4B] text-white border-[#3A5F4B] font-semibold'
                : 'bg-slate-100 border-slate-200 text-[#5B6E67]'
            }`}
          >
            {t.peerMatching.burnoutFilter}
          </button>
          <button
            onClick={() => setActiveFilter('counselor')}
            className={`text-[9.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
              activeFilter === 'counselor'
                ? 'bg-[#3A5F4B] text-white border-[#3A5F4B] font-semibold'
                : 'bg-slate-100 border-slate-200 text-[#5B6E67]'
            }`}
          >
            {t.peerMatching.licensedFilter}
          </button>
        </div>
      </div>

      {/* Helper Cards List */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-6">
        {filteredPeers.map((peer) => {
          const isBurnoutRest = peer.status === 'burnout_cooldown';

          return (
            <div
              key={peer.id}
              className={`bg-white border rounded-2xl p-3.5 space-y-2.5 transition-all shadow-2xs relative ${
                peer.isTopMatch
                  ? 'border-[#E3A06F] ring-1 ring-[#E3A06F]/50 shadow-md bg-gradient-to-b from-[#FFFDFB] to-white'
                  : peer.isCounselor
                  ? 'border-[#3A5F4B]/30 hover:border-[#3A5F4B]'
                  : 'border-[#D9E2DC] hover:border-[#E3A06F]'
              }`}
            >
              {/* Top Match Ribbon */}
              {peer.isTopMatch && (
                <div className="flex items-center justify-between bg-[#E3A06F]/15 border border-[#E3A06F]/40 px-2.5 py-1 rounded-lg text-[9.5px] text-[#7A4A26] font-semibold mb-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C9814F]" />
                    <span>{t.peerMatching.topMatchBadge}</span>
                  </div>
                  <span className="font-mono font-bold bg-[#E3A06F] text-[#241208] px-1.5 py-0.2 rounded">
                    {peer.matchScore}% Match
                  </span>
                </div>
              )}

              {/* Top row with avatar and details */}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-2xs"
                  style={{ backgroundColor: peer.avatarColor }}
                >
                  {peer.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <b className="text-xs text-[#14282B] block">{peer.name}</b>
                    {peer.isCounselor ? (
                      <span className="font-mono text-[8.5px] bg-[#3A5F4B]/10 text-[#3A5F4B] px-1.5 py-0.5 rounded font-semibold">
                        {t.peerMatching.licensedBadge}
                      </span>
                    ) : (
                      <span className="font-mono text-[8.5px] bg-[#E3A06F]/20 text-[#C9814F] px-1.5 py-0.5 rounded font-semibold">
                        {t.peerMatching.peerBadge}
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-[9px] text-[#4E7C63] font-medium tracking-tight mt-0.5">
                    {peer.role}
                  </div>

                  {/* Supervision and Credential Verification Tag */}
                  <div className="flex items-center gap-1 text-[9px] text-[#3A5F4B] mt-1 bg-[#F2F6F3] px-2 py-0.5 rounded-md border border-[#D9E2DC]/60">
                    <ShieldCheck className="w-3 h-3 text-[#4E7C63] flex-shrink-0" />
                    <span className="truncate font-medium">{peer.verificationType}</span>
                  </div>
                </div>
              </div>

              {/* Matching Rationale Pill */}
              {peer.matchReasons && peer.matchReasons.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap text-[9px] font-mono text-[#3A5F4B]">
                  {peer.matchReasons.map((reason, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                      {reason}
                    </span>
                  ))}
                </div>
              )}

              {/* Bio quote */}
              <p className="text-[11px] text-[#5B6E67] leading-relaxed italic border-l-2 border-[#E3A06F] pl-2.5">
                "{peer.bio}"
              </p>

              {/* Languages & Specialties */}
              <div className="flex flex-wrap gap-1">
                {peer.languages?.map((lang, idx) => (
                  <span
                    key={idx}
                    className={`text-[8.5px] font-mono px-2 py-0.5 rounded-full border ${
                      lang === 'मराठी'
                        ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                        : 'bg-slate-100 text-[#5B6E67] border-slate-200'
                    }`}
                  >
                    🗣️ {lang}
                  </span>
                ))}
                {peer.specialties?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[8.5px] font-mono bg-slate-100 text-[#5B6E67] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-1">
                {isBurnoutRest ? (
                  <div className="text-[10px] text-[#B84C4C] bg-red-50 p-2 rounded-xl border border-red-200 flex items-center justify-between">
                    <span>{t.peerMatching.restingBadge}</span>
                    <span className="font-mono text-[9px]">Mandatory Rest</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectPeer(peer)}
                    className={`w-full py-2 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 shadow-2xs ${
                      peer.isCounselor
                        ? 'bg-white border border-[#3A5F4B] text-[#3A5F4B] hover:bg-[#3A5F4B]/5'
                        : peer.isTopMatch
                        ? 'bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208]'
                        : 'bg-[#3A5F4B] hover:bg-[#2C4839] text-white'
                    }`}
                  >
                    {peer.isCounselor ? (
                      <>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.peerMatching.bookSessionBtn.replace('{slot}', peer.nextSlot || 'Today')}</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{t.peerMatching.startChatBtn}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
