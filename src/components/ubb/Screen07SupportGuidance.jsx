import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Wind,
  Users,
  CalendarCheck,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Music,
  Flame,
  BookOpen,
  HeartHandshake,
  CheckCircle,
  Activity,
  Heart
} from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen07SupportGuidance({
  assessmentResult,
  checkInData,
  onSelectLevel,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  const activeResult = assessmentResult || checkInData?.assessmentResult || checkInData;
  const score = typeof activeResult?.score === 'number' 
    ? Number(activeResult.score.toFixed(1)) 
    : (activeResult?.score ? Number(Number(activeResult.score).toFixed(1)) : 7.5);

  const riskTier = activeResult?.risk_tier || (score >= 7.5 ? 'LOW' : score >= 4.5 ? 'MODERATE' : 'SEVERE');
  const responses = activeResult?.responses || {};

  // Compute highest stress domain to generate dynamic "You Are Not Alone" cohort copy
  const getCohortBenchmark = () => {
    // Q2 = Academics, Q3 = Sleep, Q4 = Anxiety, Q6 = Isolation, Q10 = Self-Criticism
    const acadScore = responses.q2 || 3;
    const sleepScore = responses.q3 || 3;
    const anxietyScore = responses.q4 || 2;
    const socialScore = responses.q6 || 4;

    if (acadScore <= 2) {
      return {
        percent: 68,
        topic: selectedLanguage === 'mr' ? 'अभ्यास व परीक्षेचा ताण' : selectedLanguage === 'hi' ? 'पढ़ाई और परीक्षा का तनाव' : 'academic & workload pressure',
        stat: selectedLanguage === 'mr' ? '६८% महाविद्यालयीन विद्यार्थ्यांना सध्या परीक्षेचा ताण जाणवत आहे.' : selectedLanguage === 'hi' ? '६८% कॉलेज छात्रों को इस समय परीक्षा का तनाव महसूस हो रहा है।' : '68% of college peers are navigating similar academic pressure this week.'
      };
    } else if (sleepScore <= 2) {
      return {
        percent: 62,
        topic: selectedLanguage === 'mr' ? 'अपुरी झोप व थकवा' : selectedLanguage === 'hi' ? 'नींद की कमी और थकान' : 'sleep disruption & fatigue',
        stat: selectedLanguage === 'mr' ? '६२% विद्यार्थी सध्या अनियमित झोपेच्या समस्येने त्रस्त आहेत.' : selectedLanguage === 'hi' ? '६२% छात्र इस समय नींद की कमी से जूझ रहे हैं।' : '62% of students reported disrupted sleep patterns this week.'
      };
    } else if (anxietyScore >= 4) {
      return {
        percent: 54,
        topic: selectedLanguage === 'mr' ? 'अस्वस्थता व चिंता' : selectedLanguage === 'hi' ? 'बेचैनी और चिंता' : 'restlessness & anxiety',
        stat: selectedLanguage === 'mr' ? '५४% विद्यार्थ्यांना अशाच प्रकारची अस्वस्थता जाणवत आहे.' : selectedLanguage === 'hi' ? '५४% छात्रों ने ऐसी ही घबराहट महसूस की है।' : '54% of students experienced similar restlessness this semester.'
      };
    } else if (socialScore <= 2) {
      return {
        percent: 46,
        topic: selectedLanguage === 'mr' ? 'एकटेपणा व दुरावा' : selectedLanguage === 'hi' ? 'अकेलापन और दूरी' : 'isolation & disconnection',
        stat: selectedLanguage === 'mr' ? '४६% विद्यार्थ्यांना कॉलेजमध्ये एकटेपणा जाणवत आहे.' : selectedLanguage === 'hi' ? '४६% छात्रों को अकेलापन महसूस हो रहा है।' : '46% of students have felt disconnected or isolated lately.'
      };
    }

    return {
      percent: 59,
      topic: selectedLanguage === 'mr' ? 'दैनंदिन ताण' : selectedLanguage === 'hi' ? 'दैनिक तनाव' : 'general workload stress',
      stat: selectedLanguage === 'mr' ? '५९% विद्यार्थी स्वतःच्या मानसिक स्वास्थ्यासाठी सजगपणे प्रयत्न करत आहेत.' : selectedLanguage === 'hi' ? '५९% छात्र अपने मानसिक स्वास्थ्य का ध्यान रख रहे हैं।' : '59% of peers are proactively taking steps for mental wellness.'
    };
  };

  const cohort = getCohortBenchmark();

  // Determine Primary Recommendation
  const isSupport3 = score < 4.5;
  const isSupport2 = score >= 4.5 && score < 7.5;
  const isSupport1 = score >= 7.5;

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              Psychometric Triage
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {selectedLanguage === 'mr' ? 'तुमचे मूल्यांकन व मार्गदर्शन' : selectedLanguage === 'hi' ? 'आपका मूल्यांकन व मार्गदर्शन' : 'Your Assessment & Guidance'}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9px] bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full border border-[#526140]/20 font-bold">
          Zero PII
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 pb-6">
        {/* ================= 1. WELLBEING SCORE HERO CARD ================= */}
        <div className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-3 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block">
                Normalized Wellbeing Score
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-fraunces text-3xl font-extrabold text-[#1a1d14]">
                  {score}
                </span>
                <span className="text-xs text-[#5e5c52] font-bold font-mono">/ 10.0</span>
              </div>
            </div>

            {/* Visual Status Chip */}
            <div
              className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold border ${
                isSupport1
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : isSupport2
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-red-50 text-red-800 border-red-300'
              }`}
            >
              {isSupport1 ? '🟢 Flourishing / Stable' : isSupport2 ? '🟡 Moderate Strain' : '🔴 High Distress'}
            </div>
          </div>

          {/* Linear Gauge */}
          <div className="w-full bg-[#edefe0] h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.min(100, Math.max(10, score * 10))}%` }}
              className={`h-full rounded-full transition-all duration-700 ${
                isSupport1 ? 'bg-[#526140]' : isSupport2 ? 'bg-[#815505]' : 'bg-[#ba1a1a]'
              }`}
            />
          </div>
        </div>

        {/* ================= 2. "YOU ARE NOT ALONE" COHORT BENCHMARK ================= */}
        <div className="bg-[#f3f5e6] border border-[#815505]/40 rounded-3xl p-4 flex items-start gap-3 shadow-2xs animate-fadeIn">
          <div className="w-9 h-9 rounded-2xl bg-[#815505]/15 text-[#815505] flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <b className="text-xs text-[#1a1d14]">You Are Not Alone</b>
              <span className="font-mono text-[9px] bg-[#815505]/20 text-[#815505] px-1.5 py-0.2 rounded-md font-bold">
                {cohort.percent}% Peers
              </span>
            </div>
            <p className="text-[11.5px] text-[#5e5c52] leading-relaxed">
              {cohort.stat}
            </p>
          </div>
        </div>

        {/* ================= 3. RECOMMENDED SUPPORT HIGHLIGHT ================= */}
        <div className="space-y-2 pt-1">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
            Recommended Stepped-Care Tier
          </span>

          {/* SUPPORT 1 CARD */}
          <div
            className={`p-4 rounded-3xl border transition-all ${
              isSupport1
                ? 'bg-emerald-50/70 border-2 border-[#526140] shadow-sm'
                : 'bg-white border-[#c5c8bc]/60 opacity-80'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold block">
                  Support 1
                </span>
                <h3 className="font-fraunces text-sm font-bold text-[#1a1d14]">
                  Self Help Tools
                </h3>
              </div>
              {isSupport1 && (
                <span className="text-[9px] font-mono bg-[#526140] text-white px-2 py-0.5 rounded-full font-bold">
                  Recommended
                </span>
              )}
            </div>

            <ul className="space-y-1 text-xs text-[#5e5c52] mb-3">
              <li>★ <b>Let It Out</b> — record voice note, deleted immediately (0 data transfer).</li>
              <li>★ <b>Guided Breathing</b> — 4-7-8 relaxing breath & box breathing.</li>
              <li>★ <b>Private Journal</b> — write out what you are feeling (encrypted).</li>
              <li>★ <b>MoodTunes</b> — offline neuro-acoustic therapy.</li>
            </ul>

            <button
              onClick={() => onSelectLevel ? onSelectLevel(1) : onNavigate('level1_express')}
              className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                isSupport1
                  ? 'bg-[#526140] hover:bg-[#435034] text-white'
                  : 'bg-[#edefe0] hover:bg-[#e0e2d3] text-[#1a1d14]'
              }`}
            >
              <span>Explore Self Help Tools →</span>
            </button>
          </div>

          {/* SUPPORT 2 CARD */}
          <div
            className={`p-4 rounded-3xl border transition-all ${
              isSupport2
                ? 'bg-amber-50/70 border-2 border-[#815505] shadow-sm'
                : 'bg-white border-[#c5c8bc]/60 opacity-80'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
                  Support 2
                </span>
                <h3 className="font-fraunces text-sm font-bold text-[#1a1d14]">
                  Talk to a Volunteer
                </h3>
              </div>
              {isSupport2 && (
                <span className="text-[9px] font-mono bg-[#815505] text-white px-2 py-0.5 rounded-full font-bold">
                  Recommended
                </span>
              )}
            </div>

            <ul className="space-y-1 text-xs text-[#5e5c52] mb-3">
              <li>★ Peers from psychology department of college.</li>
              <li>★ One-on-one confidential private chat.</li>
              <li>★ Escalated further to counselor if needed.</li>
            </ul>

            <button
              onClick={() => onSelectLevel ? onSelectLevel(2) : onNavigate('level2_peer')}
              className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                isSupport2
                  ? 'bg-[#815505] hover:bg-[#6a4604] text-white'
                  : 'bg-[#edefe0] hover:bg-[#e0e2d3] text-[#1a1d14]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Connect with Peer Volunteer →</span>
            </button>
          </div>

          {/* SUPPORT 3 CARD */}
          <div
            className={`p-4 rounded-3xl border transition-all ${
              isSupport3
                ? 'bg-red-50/70 border-2 border-[#ba1a1a] shadow-sm'
                : 'bg-white border-[#c5c8bc]/60 opacity-80'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#ba1a1a] font-bold block">
                  Support 3
                </span>
                <h3 className="font-fraunces text-sm font-bold text-[#1a1d14]">
                  Meet a Counsellor
                </h3>
              </div>
              {isSupport3 && (
                <span className="text-[9px] font-mono bg-[#ba1a1a] text-white px-2 py-0.5 rounded-full font-bold">
                  Recommended
                </span>
              )}
            </div>

            <ul className="space-y-1 text-xs text-[#5e5c52] mb-3">
              <li>★ Licensed professional mental health support.</li>
              <li>★ College level (e.g. "Manas Counselling Centre" from Fergusson College).</li>
              <li>★ Ongoing care follow-up.</li>
            </ul>

            <button
              onClick={() => onSelectLevel ? onSelectLevel(3) : onNavigate('level3_care')}
              className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                isSupport3
                  ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white'
                  : 'bg-[#edefe0] hover:bg-[#e0e2d3] text-[#1a1d14]'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Counsellor Session →</span>
            </button>
          </div>
        </div>

        {/* Done / Return to Dashboard */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-3 rounded-full bg-white border border-[#c5c8bc] hover:bg-[#f3f5e6] text-[#1a1d14] font-bold text-xs cursor-pointer shadow-2xs text-center block mt-2"
        >
          Return to Sanctuary Dashboard
        </button>
      </div>
    </div>
  );
}
