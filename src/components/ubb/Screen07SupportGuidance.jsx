import React from 'react';
import { ArrowLeft, Sparkles, Wind, Users, CalendarCheck, ChevronRight, ShieldCheck, ArrowRight, Music, Flame, BookOpen, Clock, HeartHandshake, CheckCircle } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen07SupportGuidance({
  checkInData,
  onSelectLevel,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  // Compute recommendation
  const computeRecommendation = () => {
    const mood = checkInData?.moodId || 'anxious';
    const cause = checkInData?.clarifiedRootCause || '';
    const intensity = checkInData?.intensity || 'moderate';

    if (mood === 'very_low' || intensity === 'very_strong' || checkInData?.safetyAnswer === 'yes') {
      return {
        level: 3,
        tool: 'counsellor',
        badge: 'Support 3 · Meet a Counsellor',
        icon: 'counsellor',
        title: selectedLanguage === 'mr' ? 'सपोर्ट ३ : समुपदेशकांना भेटा' : selectedLanguage === 'hi' ? 'सपोर्ट ३ : काउंसलर से मिलें' : 'Support 3 : Meet a Counsellor',
        actionLabel: selectedLanguage === 'mr' ? 'समुपदेशकाची भेट बुक करा' : selectedLanguage === 'hi' ? 'काउंसलर से अपॉइंटमेंट लें' : 'Book Confidential Session',
        highlight: 'Licensed Support · Ongoing Care Follow-Up',
        bullets: [
          '★ Licensed Support',
          '★ College-Level (e.g. Manas Counselling Centre)',
          '★ Ongoing Care Follow-Up'
        ],
        targetTab: null
      };
    }

    if (mood === 'sad' || mood === 'irritated' || mood === 'anxious' && (cause.includes('family') || cause.includes('talk') || cause.includes('friend'))) {
      return {
        level: 2,
        tool: 'peer',
        badge: 'Support 2 · Talk to a Volunteer',
        icon: 'peer',
        title: selectedLanguage === 'mr' ? 'सपोर्ट २ : व्हॉलंटिअरशी बोला' : selectedLanguage === 'hi' ? 'सपोर्ट २ : स्वयंसेवक से बात करें' : 'Support 2 : Talk to a Volunteer',
        actionLabel: selectedLanguage === 'mr' ? 'स्वयंसेवकाशी मोकळेपणाने बोला' : selectedLanguage === 'hi' ? 'सहपाठी से बात करें' : 'Connect with Peer Volunteer',
        highlight: 'Psychology Peers · 1-on-1 Private Chat',
        bullets: [
          '★ Peers from Psychology Dept',
          '★ 1-on-1 Private Chat',
          '★ Escalated Further If Needed'
        ],
        targetTab: null
      };
    }

    if (mood === 'overwhelmed' || mood === 'irritated') {
      return {
        level: 1,
        tool: 'let_it_out',
        badge: 'Support 1 · Self Help Tools',
        icon: 'flame',
        title: selectedLanguage === 'mr' ? 'सपोर्ट १ : लेट इट आउट (व्हॉइस वेंट)' : selectedLanguage === 'hi' ? 'सपोर्ट १ : लेट इट आउट (वॉइस वेंट)' : 'Support 1 : Let It Out',
        actionLabel: selectedLanguage === 'mr' ? 'ऑडिओ वेंट सुरू करा' : selectedLanguage === 'hi' ? 'ऑडियो वेंट शुरू करें' : 'Start Private Audio Vent',
        highlight: 'Record Voice Note · Immediate Delete · 0 Data Transfer',
        bullets: [
          '★ Let It Out (Deleted Immediately, 0 Transfer)',
          '★ Journal (Write Feelings)',
          '★ MoodTunes (Music Therapy)'
        ],
        targetTab: 'let_it_out'
      };
    }

    if (mood === 'calm' || mood === 'good') {
      return {
        level: 1,
        tool: 'journal',
        badge: 'Support 1 · Self Help Tools',
        icon: 'journal',
        title: selectedLanguage === 'mr' ? 'सपोर्ट १ : खाजगी डायरी' : selectedLanguage === 'hi' ? 'सपोर्ट १ : निजी डायरी' : 'Support 1 : Private Journal',
        actionLabel: selectedLanguage === 'mr' ? 'डायरी उघडा' : selectedLanguage === 'hi' ? 'डायरी खोलें' : 'Open Private Journal',
        highlight: 'Write Out What You Are Feeling',
        bullets: [
          '★ Journal (Write Feelings)',
          '★ MoodTunes (Music Therapy)',
          '★ Let It Out (Voice Vent)'
        ],
        targetTab: 'journal'
      };
    }

    // Default -> MoodTunes Binaural Beats
    return {
      level: 1,
      tool: 'mood_tunes',
      badge: 'Support 1 · Self Help Tools',
      icon: 'music',
      title: selectedLanguage === 'mr' ? 'सपोर्ट १ : मूडट्यून्स (म्युझिक थेरपी)' : selectedLanguage === 'hi' ? 'सपोर्ट १ : मूडट्यून्स (म्यूजिक थेरेपी)' : 'Support 1 : MoodTunes (Music Therapy)',
      actionLabel: selectedLanguage === 'mr' ? 'ध्वनी सुरू करा' : selectedLanguage === 'hi' ? 'संगीत शुरू करें' : 'Start Music Therapy',
      highlight: 'Acoustic Soundscapes & Brainwave Grounding',
      bullets: [
        '★ MoodTunes (Music Therapy)',
        '★ Let It Out (Voice Vent)',
        '★ Journal (Write Feelings)'
      ],
      targetTab: 'mood_tunes'
    };
  };

  const rec = computeRecommendation();

  const handleLaunchRecommended = () => {
    if (rec.level === 3) {
      onSelectLevel(3);
    } else if (rec.level === 2) {
      onSelectLevel(2);
    } else {
      onNavigate('level1_express', { defaultTab: rec.targetTab || 'mood_tunes' });
    }
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              AI Support Match
            </div>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {t.screen7.guidanceTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Zero PII</span>
        </div>
      </div>

      {/* Main Guidance Cards */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-6">
        {/* ================= PROMINENT VISUAL AI RECOMMENDATION HERO CARD ================= */}
        <section className="bg-gradient-to-br from-[#fdc16d]/30 via-[#f9fbeb] to-[#edefe0] border-2 border-[#815505] rounded-3xl p-4 shadow-sm space-y-2.5 animate-fadeIn relative overflow-hidden">
          {/* Top Visual Badges */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#815505] text-[#ffddb3] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#ffddb3]" />
              <span>AI Recommendation</span>
            </div>
            <span className="font-mono text-[9px] text-[#526140] font-bold bg-white/90 px-2 py-0.5 rounded-full border border-[#c5c8bc]/60">
              {rec.badge}
            </span>
          </div>

          <div>
            <h3 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {rec.title}
            </h3>
            <span className="text-xs text-[#815505] font-medium block mt-0.5">
              {rec.highlight}
            </span>
          </div>

          {/* Visual Benefit Checkmark Chips */}
          <div className="space-y-1 pt-1">
            {rec.bullets.map((b, idx) => (
              <div key={idx} className="bg-white/85 border border-[#c5c8bc]/50 rounded-xl px-2.5 py-1.5 shadow-2xs text-left">
                <span className="text-[10px] font-medium text-[#1a1d14] leading-tight block">
                  {b}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleLaunchRecommended}
            className="w-full py-3 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-1"
          >
            <span>{rec.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Section Header */}
        <div className="pt-1 flex items-center justify-between px-1">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
            All 3 Support Options (Choose Freely)
          </span>
        </div>

        {/* 3 Support Cards */}
        <div className="space-y-2">
          {/* Support 1 Card */}
          <div
            onClick={() => onSelectLevel(1)}
            className={`rounded-3xl p-3.5 flex items-center justify-between transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              rec.level === 1
                ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#526140]/15 flex items-center justify-center text-[#526140]">
                <Wind className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-[#1a1d14]">Support 1 : Self Help Tools</b>
                  <span className="font-mono text-[8px] bg-[#526140]/15 text-[#526140] px-1.5 py-0.2 rounded-full font-bold">
                    Instant
                  </span>
                </div>
                <span className="text-[10px] text-[#5e5c52] block leading-tight mt-0.5">
                  ★ Let It Out · ★ Journal · ★ MoodTunes
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] flex-shrink-0" />
          </div>

          {/* Support 2 Card */}
          <div
            onClick={() => onSelectLevel(2)}
            className={`rounded-3xl p-3.5 flex items-center justify-between transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              rec.level === 2
                ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#526140]/15 flex items-center justify-center text-[#526140]">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-[#1a1d14]">Support 2 : Talk to a Volunteer</b>
                  <span className="font-mono text-[8px] bg-[#526140] text-white px-1.5 py-0.2 rounded-full font-bold">
                    Peers
                  </span>
                </div>
                <span className="text-[10px] text-[#5e5c52] block leading-tight mt-0.5">
                  ★ Psychology Peers · ★ 1-on-1 Pvt Chat · ★ Escalated If Needed
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] flex-shrink-0" />
          </div>

          {/* Support 3 Card */}
          <div
            onClick={() => onSelectLevel(3)}
            className={`rounded-3xl p-3.5 flex items-center justify-between transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              rec.level === 3
                ? 'border-2 border-red-700 bg-red-50/50 shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-red-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-red-100 flex items-center justify-center text-red-800">
                <CalendarCheck className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <b className="text-xs text-[#1a1d14]">Support 3 : Meet a Counsellor</b>
                  <span className="font-mono text-[8px] bg-red-700 text-white px-1.5 py-0.2 rounded-full font-bold">
                    Clinical
                  </span>
                </div>
                <span className="text-[10px] text-[#5e5c52] block leading-tight mt-0.5">
                  ★ Licensed Support · ★ College Level (e.g. Manas) · ★ Ongoing Care
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
