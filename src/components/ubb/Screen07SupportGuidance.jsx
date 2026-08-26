import React from 'react';
import { ArrowLeft, Sparkles, Wind, Users, CalendarCheck, ChevronRight, ShieldCheck, ArrowRight, Music, Flame, BookOpen } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen07SupportGuidance({
  checkInData,
  onSelectLevel,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  // Compute recommended level & tool based on mood + follow-up answer
  const computeRecommendation = () => {
    const mood = checkInData?.moodId || 'anxious';
    const cause = checkInData?.clarifiedRootCause || '';
    const intensity = checkInData?.intensity || 'moderate';

    if (mood === 'very_low' || intensity === 'very_strong' || checkInData?.safetyAnswer === 'yes') {
      return {
        level: 3,
        tool: 'counsellor',
        title: selectedLanguage === 'mr' ? 'परवानाधारक कॉलेज समुपदेशक' : selectedLanguage === 'hi' ? 'लाइसेंस प्राप्त कॉलेज काउंसलर' : 'Licensed Campus Counsellor',
        actionLabel: selectedLanguage === 'mr' ? 'समुपदेशकाची भेट बुक करा' : selectedLanguage === 'hi' ? 'काउंसलर से अपॉइंटमेंट लें' : 'Book Confidential Appointment',
        reason: selectedLanguage === 'mr'
          ? 'तुमचा मानसिक भार आणि ताण लक्षात घेता, एका परवानाधारक समुपदेशकांशी संवाद साधणे सर्वात सुरक्षित राहील.'
          : selectedLanguage === 'hi'
          ? 'आपकी मानसिक स्थिति और भारीपन को देखते हुए, लाइसेंस प्राप्त काउंसलर से बात करना सबसे सुरक्षित रहेगा।'
          : 'Based on the deep heaviness and intensity you are experiencing, a 1-on-1 confidential session with a licensed professional is strongly suggested.',
        targetTab: null
      };
    }

    if (mood === 'sad' || mood === 'irritated' || mood === 'anxious' && cause.includes('family') || cause.includes('talk')) {
      return {
        level: 2,
        tool: 'peer',
        title: selectedLanguage === 'mr' ? 'प्रशिक्षित विद्यार्थी स्वयंसेवक (पीअर सपोर्ट)' : selectedLanguage === 'hi' ? 'प्रशिक्षित सहपाठी स्वयंसेवक' : 'Trained Peer Volunteer Chat',
        actionLabel: selectedLanguage === 'mr' ? 'स्वयंसेवकाशी मोकळेपणाने बोला' : selectedLanguage === 'hi' ? 'सहपाठी से बात करें' : 'Connect with Peer Volunteer',
        reason: selectedLanguage === 'mr'
          ? 'तुमच्या मनात सुरू असलेले विचार आणि एकटेपणा दूर करण्यासाठी एका समवयस्क स्वयंसेवकाशी बोलणे उपयुक्त ठरेल.'
          : selectedLanguage === 'hi'
          ? 'अकेलापन और अनकहे विचारों को हल्का करने के लिए एक प्रशिक्षित सहपाठी से बात करना सबसे अच्छा रहेगा।'
          : 'Connecting with a trained student peer provides a safe, judgment-free space to speak without any academic pressure.',
        targetTab: null
      };
    }

    if (mood === 'overwhelmed' || mood === 'irritated') {
      return {
        level: 1,
        tool: 'let_it_out',
        title: selectedLanguage === 'mr' ? 'लेट इट आउट · खाजगी ऑडिओ वेंट' : selectedLanguage === 'hi' ? 'लेट इट आउट · निजी ऑडियो वेंट' : 'Let It Out · Private Audio Vent',
        actionLabel: selectedLanguage === 'mr' ? 'ऑडिओ वेंट सुरू करा' : selectedLanguage === 'hi' ? 'ऑडियो वेंट शुरू करें' : 'Start Private Audio Vent',
        reason: selectedLanguage === 'mr'
          ? 'ताण आणि साचलेली चिडचिड बाहेर काढण्यासाठी खाजगी आणि लगेच नष्ट होणारे ऑडिओ वेंटिंग सर्वात उपयुक्त ठरेल.'
          : selectedLanguage === 'hi'
          ? 'मन की भड़ास और तनाव निकालने के लिए तुरंत मिट जाने वाला ऑडियो वेंट सबसे मददगार रहेगा।'
          : 'Venting your frustration into an ephemeral recording that immediately auto-deletes releases cognitive pressure in minutes.',
        targetTab: 'let_it_out'
      };
    }

    if (mood === 'calm' || mood === 'good') {
      return {
        level: 1,
        tool: 'journal',
        title: selectedLanguage === 'mr' ? 'खाजगी डायरी आणि विचार' : selectedLanguage === 'hi' ? 'निजी डायरी और विचार' : 'Private Journal & Insights',
        actionLabel: selectedLanguage === 'mr' ? 'डायरी उघडा' : selectedLanguage === 'hi' ? 'डायरी खोलें' : 'Open Private Journal',
        reason: selectedLanguage === 'mr'
          ? 'आजच्या चांगल्या अनुभवाची नोंद तुमच्या खाजगी डायरीत ठेवल्याने दीर्घकालीन सकारात्मकता टिकून राहते.'
          : selectedLanguage === 'hi'
          ? 'आज के अच्छे अनुभवों को अपनी डायरी में लिखना आपके आत्मविश्वास को लंबे समय तक बनाए रखेगा।'
          : 'Capturing your positive clarity in your local journal reinforces emotional resilience and peace.',
        targetTab: 'journal'
      };
    }

    // Default -> MoodTunes Binaural Beats
    return {
      level: 1,
      tool: 'mood_tunes',
      title: selectedLanguage === 'mr' ? 'मूडट्यून्स · थिटा साऊंडस्केप्स' : selectedLanguage === 'hi' ? 'मूडट्यून्स · थिटा संगीत' : 'MoodTunes · Theta Acoustic Grounding',
      actionLabel: selectedLanguage === 'mr' ? 'संगीत सुरू करा' : selectedLanguage === 'hi' ? 'संगीत शुरू करें' : 'Start Acoustic Grounding',
      reason: selectedLanguage === 'mr'
        ? 'परीक्षेचा ताण आणि डोक्यातील विचारांची गती मंद करण्यासाठी 5 मिनिटांचे थिटा ध्वनी ऐकणे फायदेशीर ठरेल.'
        : selectedLanguage === 'hi'
        ? 'परीक्षा की चिंता और तेज विचारों को शांत करने के लिए 5 मिनट का थिटा संगीत सबसे प्रभावी है।'
        : 'A 5-minute binaural acoustic soundscape (6Hz Theta) calms your nervous system and eases overthinking.',
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
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              AI Support-Level Routing
            </div>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {t.screen7.guidanceTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Zero-PII</span>
        </div>
      </div>

      {/* Main Guidance Cards */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-6">
        {/* ================= PROMINENT AI RECOMMENDATION HERO CARD ================= */}
        <section className="bg-gradient-to-br from-[#fdc16d]/30 via-[#f9fbeb] to-[#edefe0] border-2 border-[#815505] rounded-3xl p-4 md:p-5 shadow-sm space-y-3 animate-fadeIn relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#815505] text-[#ffddb3] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#ffddb3]" />
              <span>AI Recommendation for Your Check-in</span>
            </div>
            <span className="font-mono text-[9.5px] text-[#526140] font-bold bg-white/80 px-2 py-0.5 rounded-full border border-[#c5c8bc]/60">
              Level {rec.level} Match
            </span>
          </div>

          <div>
            <h3 className="font-fraunces text-base font-bold text-[#1a1d14] leading-snug">
              {rec.title}
            </h3>
            <p className="text-xs text-[#5e5c52] mt-1 leading-relaxed">
              "{rec.reason}"
            </p>
          </div>

          {/* Context pill chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="bg-white/90 border border-[#c5c8bc]/60 text-[#1a1d14] font-mono text-[9.5px] px-2.5 py-0.5 rounded-full font-semibold shadow-2xs">
              Mood: {checkInData?.emoji} {checkInData?.label}
            </span>
            {checkInData?.clarifiedRootCause && (
              <span className="bg-[#526140]/10 border border-[#526140]/30 text-[#526140] font-mono text-[9.5px] px-2.5 py-0.5 rounded-full font-semibold truncate max-w-[200px]">
                {checkInData.clarifiedRootCause}
              </span>
            )}
          </div>

          <button
            onClick={handleLaunchRecommended}
            className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{rec.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Section Header */}
        <div className="pt-1 flex items-center justify-between px-1">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
            Or Choose Any Support Tier (Total Autonomy)
          </span>
        </div>

        {/* 3 Level Cards */}
        <div className="space-y-2.5">
          {/* Level 1 Card */}
          <div
            onClick={() => onSelectLevel(1)}
            className={`rounded-3xl p-3.5 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              rec.level === 1
                ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="w-9 h-9 rounded-2xl bg-[#526140]/15 group-hover:bg-[#526140]/25 flex items-center justify-center flex-shrink-0 text-[#526140]">
              <Wind className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen7.levels.level1Title}</b>
                {rec.level === 1 && (
                  <span className="font-mono text-[8.5px] bg-[#526140] text-white px-2 py-0.2 rounded-full font-bold">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                {t.screen7.levels.level1Sub}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] mt-1" />
          </div>

          {/* Level 2 Card */}
          <div
            onClick={() => onSelectLevel(2)}
            className={`rounded-3xl p-3.5 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              rec.level === 2
                ? 'border-2 border-[#526140] bg-[#f3f5e6] shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-[#f3f5e6]'
            }`}
          >
            <div className="w-9 h-9 rounded-2xl bg-[#526140]/15 group-hover:bg-[#526140]/25 flex items-center justify-center flex-shrink-0 text-[#526140]">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen7.levels.level2Title}</b>
                {rec.level === 2 && (
                  <span className="font-mono text-[8.5px] bg-[#526140] text-white px-2 py-0.2 rounded-full font-bold">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                {t.screen7.levels.level2Sub}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] mt-1" />
          </div>

          {/* Level 3 Card */}
          <div
            onClick={() => onSelectLevel(3)}
            className={`rounded-3xl p-3.5 flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs group active:scale-99 ${
              rec.level === 3
                ? 'border-2 border-red-700 bg-red-50/50 shadow-sm'
                : 'border border-[#c5c8bc]/60 bg-white hover:bg-red-50/30'
            }`}
          >
            <div className="w-9 h-9 rounded-2xl bg-red-100 group-hover:bg-red-200 flex items-center justify-center flex-shrink-0 text-red-800">
              <CalendarCheck className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#1a1d14]">{t.screen7.levels.level3Title}</b>
                {rec.level === 3 && (
                  <span className="font-mono text-[8.5px] bg-red-700 text-white px-2 py-0.2 rounded-full font-bold">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5e5c52] mt-0.5 leading-snug">
                {t.screen7.levels.level3Sub}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#75786e] mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
