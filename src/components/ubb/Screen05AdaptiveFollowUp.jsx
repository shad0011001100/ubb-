import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  Heart,
  Activity,
  Users,
  ChevronRight,
  RotateCcw,
  CalendarCheck,
  Award
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';
import { safetySentinel } from '../../services/safetySentinel';
import { SproutCompanion } from './SproutCompanion';
import { BottomNavBar } from './BottomNavBar';

// =======================================================================
// 10 RESEARCH-BACKED PSYCHOMETRIC QUESTIONS (WHO-5, GAD-7, PSS-10, PSQI, SCS)
// =======================================================================
export const PSYCHOMETRIC_QUESTIONS = [
  {
    id: 'q1',
    domain: 'Overall Mood',
    inventory: 'WHO-5 & PHQ-9',
    isReverse: false,
    text: {
      en: 'How would you rate your overall mood and energy today?',
      mr: 'आज तुमचा एकूण मूड आणि ऊर्जा पातळी कशी आहे?',
      hi: 'आज आपका समग्र मूड और ऊर्जा स्तर कैसा है?'
    },
    options: [
      { val: 1, label: { en: '😫 Terrible', mr: '😫 खूप वाईट', hi: '😫 बहुत खराब' } },
      { val: 2, label: { en: '🙁 Low', mr: '🙁 कमी', hi: '🙁 कम' } },
      { val: 3, label: { en: '😐 Okay', mr: '😐 ठीक-ठाक', hi: '😐 ठीक-ठाक' } },
      { val: 4, label: { en: '🙂 Good', mr: '🙂 चांगला', hi: '🙂 अच्छा' } },
      { val: 5, label: { en: '😊 Great', mr: '😊 उत्तम', hi: '😊 बहुत बढ़िया' } }
    ]
  },
  {
    id: 'q2',
    domain: 'Academic & Work Pressure',
    inventory: 'PSS-10 & MBI-SS',
    isReverse: false,
    text: {
      en: 'How manageable has your academic/workload stress felt over the past few days?',
      mr: 'गेल्या काही दिवसांत अभ्यासाचा किंवा कामाचा ताण किती आटोक्यात वाटला?',
      hi: 'पिछले कुछ दिनों में पढ़ाई या काम का तनाव कितना संभलने योग्य लगा?'
    },
    options: [
      { val: 1, label: { en: '🌪️ Overwhelming', mr: '🌪️ असह्य ताण', hi: '🌪️ अत्यधिक तनाव' } },
      { val: 2, label: { en: '⚡ Very High', mr: '⚡ खूप जास्त', hi: '⚡ बहुत अधिक' } },
      { val: 3, label: { en: '⚖️ Moderate', mr: '⚖️ मध्यम', hi: '⚖️ मध्यम' } },
      { val: 4, label: { en: '🌤️ Manageable', mr: '🌤️ आटोक्यात', hi: '🌤️ संभलने योग्य' } },
      { val: 5, label: { en: '🧘 Completely Calm', mr: '🧘 पूर्णपणे शांत', hi: '🧘 पूरी तरह शांत' } }
    ]
  },
  {
    id: 'q3',
    domain: 'Sleep Quality',
    inventory: 'PSQI & ISI',
    isReverse: false,
    text: {
      en: 'How rested and refreshed do you feel when waking up in the morning?',
      mr: 'सकाळी उठल्यावर तुम्हाला किती ताजेतवाने आणि विश्रांती मिळाल्यासारखे वाटते?',
      hi: 'सुबह उठने पर आप कितना तरोताजा और आराम महसूस करते हैं?'
    },
    options: [
      { val: 1, label: { en: '💤 Never rested', mr: '💤 अजिबात विश्रांती नाही', hi: '💤 बिलकुल आराम नहीं' } },
      { val: 2, label: { en: '🌘 Rarely', mr: '🌘 क्वचितच', hi: '🌘 कभी-कभार' } },
      { val: 3, label: { en: '⛅ Sometimes', mr: '⛅ कधीकधी', hi: '⛅ कभी-कभार' } },
      { val: 4, label: { en: '🌤️ Most days', mr: '🌤️ बहुतांश दिवस', hi: '🌤️ ज्यादातर दिन' } },
      { val: 5, label: { en: '⚡ Always refreshed', mr: '⚡ नेहमी ताजेतवाने', hi: '⚡ हमेशा तरोताजा' } }
    ]
  },
  {
    id: 'q4',
    domain: 'Anxiety & Restlessness',
    inventory: 'GAD-7 (Items 1 & 5)',
    isReverse: true, // Inverted so lower anxiety scores higher in wellbeing
    text: {
      en: 'How often have you felt restless, anxious, or unable to relax recently?',
      mr: 'गेल्या काही दिवसांत अस्वस्थता, चिंता किंवा शांत न बसणे किती वेळा जाणवले?',
      hi: 'हाल ही में बेचैनी, घबराहट या तनाव मुक्त न हो पाना कितनी बार महसूस हुआ?'
    },
    options: [
      { val: 1, label: { en: '🟢 Almost never', mr: '🟢 जवळजवळ कधीच नाही', hi: '🟢 लगभग कभी नहीं' } },
      { val: 2, label: { en: '🟡 Rarely', mr: '🟡 क्वचितच', hi: '🟡 कभी-कभी' } },
      { val: 3, label: { en: '🟠 Sometimes', mr: '🟠 काही वेळा', hi: '🟠 कुछ समय' } },
      { val: 4, label: { en: '🔴 Often', mr: '🔴 वारंवार', hi: '🔴 अक्सर' } },
      { val: 5, label: { en: '🚨 Constantly', mr: '🚨 सतत / अखंड', hi: '🚨 लगातार' } }
    ]
  },
  {
    id: 'q5',
    domain: 'Focus & Motivation',
    inventory: 'PHQ-9 & BDI-II',
    isReverse: false,
    text: {
      en: 'How easy has it been to stay focused and motivated on your daily studies or tasks?',
      mr: 'दैनंदिन अभ्यास किंवा कामावर लक्ष केंद्रित करणे आणि प्रेरित राहणे किती सोपे गेले?',
      hi: 'दैनिक पढ़ाई या कार्यों पर ध्यान केंद्रित करना और प्रेरित रहना कितना आसान रहा?'
    },
    options: [
      { val: 1, label: { en: '🌫️ Very difficult', mr: '🌫️ खूप कठीण', hi: '🌫️ बहुत कठिन' } },
      { val: 2, label: { en: '🌧️ Difficult', mr: '🌧️ कठीण', hi: '🌧️ कठिन' } },
      { val: 3, label: { en: '⛅ Moderate', mr: '⛅ मध्यम', hi: '⛅ मध्यम' } },
      { val: 4, label: { en: '🎯 Easy', mr: '🎯 सोपे', hi: '🎯 आसान' } },
      { val: 5, label: { en: '🚀 Very easy & focused', mr: '🚀 खूप सोपे व केंद्रित', hi: '🚀 बहुत आसान और केंद्रित' } }
    ]
  },
  {
    id: 'q6',
    domain: 'Social Connection',
    inventory: 'MSPSS & UCLA Loneliness',
    isReverse: false,
    text: {
      en: 'Have you felt connected to and supported by friends, family, or your peer group lately?',
      mr: 'मित्र, कुटुंब किंवा वर्गमित्रांकडून तुम्हाला आधार आणि जवळीक जाणवते का?',
      hi: 'क्या आपको दोस्तों, परिवार या साथियों से जुड़ाव और सहारा महसूस हुआ है?'
    },
    options: [
      { val: 1, label: { en: '🪹 Very isolated', mr: '🪹 खूप एकटेपणा', hi: '🪹 बहुत अकेलापन' } },
      { val: 2, label: { en: '🍂 Disconnected', mr: '🍂 दुरावलेपण', hi: '🍂 दूर-दूर सा' } },
      { val: 3, label: { en: '🤝 Somewhat supported', mr: '🤝 काही प्रमाणात आधार', hi: '🤝 कुछ हद तक सहारा' } },
      { val: 4, label: { en: '🫂 Well supported', mr: '🫂 चांगला आधार', hi: '🫂 अच्छा सहयोग' } },
      { val: 5, label: { en: '🌟 Deeply connected', mr: '🌟 घनिष्ठ व सुरक्षित जवळीक', hi: '🌟 गहरा जुड़ाव' } }
    ]
  },
  {
    id: 'q7',
    domain: 'Emotional Regulation',
    inventory: 'DERS & ERQ',
    isReverse: false,
    text: {
      en: 'When unexpected stress or pressure arises, how confident do you feel in calming yourself down?',
      mr: 'अचानक ताण किंवा दडपण आल्यास स्वतःला शांत ठेवण्याचा तुमचा आत्मविश्वास कसा आहे?',
      hi: 'अचानक तनाव आने पर खुद को शांत करने का आपका आत्मविश्वास कैसा रहता है?'
    },
    options: [
      { val: 1, label: { en: '🌧️ Not confident at all', mr: '🌧️ अजिबात आत्मविश्वास नाही', hi: '🌧️ बिलकुल आत्मविश्वास नहीं' } },
      { val: 2, label: { en: '🌥️ Low confidence', mr: '🌥️ कमी आत्मविश्वास', hi: '🌥️ कम भरोसा' } },
      { val: 3, label: { en: '🌤️ Moderate', mr: '🌤️ मध्यम', hi: '🌤️ मध्यम' } },
      { val: 4, label: { en: '☀️ Confident', mr: '☀️ चांगला आत्मविश्वास', hi: '☀️ अच्छा आत्मविश्वास' } },
      { val: 5, label: { en: '✨ Very confident', mr: '✨ पूर्ण खात्री व नियंत्रण', hi: '✨ पूरा आत्मविश्वास' } }
    ]
  },
  {
    id: 'q8',
    domain: 'Future Outlook',
    inventory: 'Beck Hopelessness & Hope Scale',
    isReverse: false,
    text: {
      en: 'How hopeful and positive do you feel about upcoming events, goals, or the future?',
      mr: 'भविष्यातील उद्दिष्टे, परीक्षा किंवा घटनांबद्दल तुम्हाला किती आशादायक वाटते?',
      hi: 'भविष्य, लक्ष्यों या आने वाले दिनों को लेकर आप कितना सकारात्मक महसूस करते हैं?'
    },
    options: [
      { val: 1, label: { en: '🌑 Very pessimistic', mr: '🌑 खूप निराशाजनक', hi: '🌑 बहुत निराशाजनक' } },
      { val: 2, label: { en: '🌘 Uncertain / low', mr: '🌘 साशंक व कमी आशा', hi: '🌘 अनिश्चित व कम आशा' } },
      { val: 3, label: { en: '🌓 Neutral', mr: '🌓 तटस्थ', hi: '🌓 सामान्य' } },
      { val: 4, label: { en: '🌔 Hopeful', mr: '🌔 आशावादी', hi: '🌔 आशावादी' } },
      { val: 5, label: { en: '🌕 Very positive & bright', mr: '🌕 अतिशय सकारात्मक व उज्ज्वल', hi: '🌕 बहुत सकारात्मक' } }
    ]
  },
  {
    id: 'q9',
    domain: 'Enjoyment & Hobbies',
    inventory: 'SHAPS & WHO-5 Item 2',
    isReverse: false,
    text: {
      en: 'Have you taken time for activities, hobbies, or breaks that genuinely make you happy this week?',
      mr: 'या आठवड्यात तुम्हाला मनापासून आवडणाऱ्या छंद किंवा विश्रांतीसाठी वेळ मिळाला का?',
      hi: 'इस हफ्ते क्या आपको अपने पसंदीदा शौक या सुकून देने वाली गतिविधियों के लिए समय मिला?'
    },
    options: [
      { val: 1, label: { en: '⏳ Not at all', mr: '⏳ अजिबात वेळ नाही', hi: '⏳ बिलकुल नहीं' } },
      { val: 2, label: { en: '🍂 Barely any time', mr: '🍂 क्वचितच थोडा वेळ', hi: '🍂 बहुत कम समय' } },
      { val: 3, label: { en: '🎨 A little bit', mr: '🎨 थोडाफार वेळ', hi: '🎨 थोड़ा बहुत' } },
      { val: 4, label: { en: '🌿 Good amount of time', mr: '🌿 पुरेसा वेळ', hi: '🌿 पर्याप्त समय' } },
      { val: 5, label: { en: '🌟 Plenty of joyful time', mr: '🌟 भरपूर व आनंददायी वेळ', hi: '🌟 भरपूर और आनंदमय समय' } }
    ]
  },
  {
    id: 'q10',
    domain: 'Self-Compassion',
    inventory: 'Self-Compassion Scale (Dr. Neff)',
    isReverse: true, // Inverted so being less hard on self scores higher in wellbeing
    text: {
      en: 'When things do not go according to plan, how often are you hard on yourself?',
      mr: 'गोष्टी मनासारख्या न घडल्यास तुम्ही स्वतःवर किती वेळा दोषारोप किंवा कठोर टीका करता?',
      hi: 'जब चीजें योजना के अनुसार नहीं होतीं, तब आप खुद पर कितनी बार कठोर होते हैं?'
    },
    options: [
      { val: 1, label: { en: '💚 Rarely hard on self', mr: '💚 स्वतःवर क्वचितच टीका', hi: '💚 खुद पर कभी-कभार ही कठोर' } },
      { val: 2, label: { en: '🌿 Mildly hard', mr: '🌿 सौम्य नाराजी', hi: '🌿 थोड़ी सी नाराजगी' } },
      { val: 3, label: { en: '⚖️ Sometimes', mr: '⚖️ काही वेळा', hi: '⚖️ कभी-कभी' } },
      { val: 4, label: { en: '💔 Frequently hard', mr: '💔 वारंवार स्वतःला दोष', hi: '💔 अक्सर खुद को दोष देना' } },
      { val: 5, label: { en: '🚨 Almost always hard', mr: '🚨 सतत स्वतःवर कठोर टीका', hi: '🚨 हमेशा खुद पर कठोर' } }
    ]
  }
];

// Red-Flag Keyword Patterns
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'dont want to live',
  'don\'t want to live', 'hang myself', 'overdose', 'self harm', 'self-harm',
  'cut myself', 'hurting myself', 'no point in living', 'mar jau', 'aatmhatya'
];

export function Screen05AdaptiveFollowUp({
  onCompleteAssessment,
  onNavigate,
  selectedLanguage = 'en',
  userProfile
}) {
  const t = getTranslation(selectedLanguage);
  const [currentStep, setCurrentStep] = useState(0); // 0 to 9 for questions
  const [responses, setResponses] = useState({});
  const [customNotes, setCustomNotes] = useState('');
  const [showSosModal, setShowSosModal] = useState(false);
  const [existingCheckIn, setExistingCheckIn] = useState(null);
  const [isRetaking, setIsRetaking] = useState(false);

  const langKey = selectedLanguage === 'mr' ? 'mr' : selectedLanguage === 'hi' ? 'hi' : 'en';

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ubb_active_assessment');
      if (saved) {
        const parsed = JSON.parse(saved);
        setExistingCheckIn(parsed);
      }
    } catch {}
  }, []);

  const handleSelectOption = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  // Real-Time Safety Sentinel keyword scan
  const handleCustomNoteChange = (text) => {
    setCustomNotes(text);
    const analysis = safetySentinel.analyzeText(text);
    if (analysis.isCrisis) {
      setShowSosModal(true);
    }
  };

  const calculateScore = () => {
    let totalPoints = 0;
    PSYCHOMETRIC_QUESTIONS.forEach((q) => {
      let val = responses[q.id] || 3;
      if (q.isReverse) {
        val = 6 - val;
      }
      totalPoints += val;
    });

    // Min-Max Normalization to 1 - 10 Scale
    // Formula: 1 + [(Raw - 10) / 40] * 9
    const normalized = 1 + ((totalPoints - 10) / 40) * 9;
    return Number(normalized.toFixed(1));
  };

  const handleFinish = async () => {
    const finalScore = calculateScore();
    let riskTier = 'LOW';
    let recommendedSupport = 'support_1';

    if (finalScore >= 7.5) {
      riskTier = 'LOW';
      recommendedSupport = 'support_1';
    } else if (finalScore >= 4.5) {
      riskTier = 'MODERATE';
      recommendedSupport = 'support_2';
    } else {
      riskTier = 'SEVERE';
      recommendedSupport = 'support_3';
    }

    const payload = {
      score: finalScore,
      risk_tier: riskTier,
      recommended_support: recommendedSupport,
      responses,
      customNotes,
      completedAt: new Date().toISOString()
    };

    // Save to LocalStorage & Supabase
    try {
      localStorage.setItem('ubb_active_assessment', JSON.stringify(payload));
      setExistingCheckIn(payload);
      setIsRetaking(false);

      const user = await ubbSupabase.getCurrentUser();
      await ubbSupabase.saveScreeningLog({
        user_id: user?.id || 'anon_user',
        score: finalScore,
        risk_tier: riskTier,
        responses: { ...responses, customNotes }
      });
    } catch {}

    if (onCompleteAssessment) {
      onCompleteAssessment(payload);
    } else if (onNavigate) {
      onNavigate('support_guidance', { assessmentResult: payload });
    }
  };

  // ================= VIEW A: TODAY'S COMPLETED CHECK-IN ACTIVE SUMMARY =================
  if (existingCheckIn && !isRetaking) {
    const score = Number(Number(existingCheckIn.score).toFixed(1));
    const isSupport1 = score >= 7.5;
    const isSupport2 = score >= 4.5 && score < 7.5;

    return (
      <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
        {/* Header */}
        <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold block">
                Tab 4 · Assessment Status
              </span>
              <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
                Today's Check-in Complete
              </h2>
            </div>
          </div>

          <span className="font-mono text-[9px] bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
            ✓ Active
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 px-4 py-3.5 overflow-y-auto space-y-3.5 pb-24">
          {/* Sprout Companion */}
          <div className="flex justify-center">
            <SproutCompanion
              emotion={isSupport1 ? 'joy' : 'cozy'}
              size="md"
              message="Your check-in is saved for today. Here is your active wellbeing overview."
              showSpeech={true}
            />
          </div>

          {/* Active Score Card */}
          <div className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block">
                  Active Wellbeing Score
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-fraunces text-3xl font-extrabold text-[#1a1d14]">{score}</span>
                  <span className="text-xs text-[#5e5c52] font-mono font-bold">/ 10.0</span>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold border ${
                  isSupport1
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : isSupport2
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-red-50 text-red-800 border-red-300'
                }`}
              >
                {isSupport1 ? '🟢 Flourishing' : isSupport2 ? '🟡 Moderate Strain' : '🔴 High Distress'}
              </div>
            </div>

            <div className="w-full bg-[#edefe0] h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.min(100, Math.max(10, score * 10))}%` }}
                className={`h-full rounded-full ${
                  isSupport1 ? 'bg-[#526140]' : isSupport2 ? 'bg-[#815505]' : 'bg-[#ba1a1a]'
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => onNavigate('support_guidance', { assessmentResult: existingCheckIn })}
              className="w-full py-3 rounded-2xl bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Recommended Support Tier →</span>
            </button>

            <button
              onClick={() => {
                setResponses({});
                setCurrentStep(0);
                setIsRetaking(true);
              }}
              className="w-full py-2.5 rounded-2xl bg-white border border-[#c5c8bc] hover:bg-[#f3f5e6] text-[#5e5c52] font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake or Update Assessment</span>
            </button>
          </div>
        </div>

        {/* 4-Tab Bottom Navigation Bar */}
        <BottomNavBar currentTab="questions_flow" onNavigate={onNavigate} />
      </div>
    );
  }

  // ================= VIEW B: 10-QUESTION INTERACTIVE ASSESSMENT =================
  const currentQ = PSYCHOMETRIC_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / PSYCHOMETRIC_QUESTIONS.length) * 100);

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* CRISIS RED-FLAG EMERGENCY MODAL */}
      {showSosModal && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 p-5 flex items-center justify-center animate-fadeIn">
          <div className="bg-[#14282B] text-white border border-red-500/50 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center mx-auto animate-pulse">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <div>
              <h3 className="font-fraunces text-xl font-bold text-red-300">
                You Are Not Alone
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                We detected that you may be going through intense distress. Confidential help is available right now, 24x7, completely free.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="tel:14416"
                className="w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call National Tele-MANAS (14416)</span>
              </a>

              <a
                href="tel:18005990019"
                className="w-full py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call KIRAN Helpline (1800-599-0019)</span>
              </a>

              <button
                onClick={() => setShowSosModal(false)}
                className="w-full py-2 text-[11px] text-gray-400 hover:text-white font-semibold cursor-pointer underline"
              >
                I am safe · Return to checkup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header & Progress */}
      <div className="px-5 pt-3.5 pb-2 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (existingCheckIn) {
                  setIsRetaking(false);
                } else {
                  onNavigate('dashboard');
                }
              }}
              className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              Question {currentStep + 1} of {PSYCHOMETRIC_QUESTIONS.length}
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {currentQ?.domain}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9px] bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full border border-[#526140]/20 font-bold">
          {currentQ?.inventory}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#edefe0] h-1.5 overflow-hidden">
        <div
          style={{ width: `${progressPercent}%` }}
          className="h-full bg-gradient-to-r from-[#526140] to-[#E3A06F] transition-all duration-300"
        />
      </div>

      {/* Question Card Body */}
      <div className="flex-1 px-4 py-2.5 overflow-y-auto space-y-3 pb-24">
        {/* Expressive Companion (Listening Mode) */}
        <div className="flex justify-center pt-1">
          <SproutCompanion
            emotion="listening"
            size="sm"
            message={
              currentStep === 0
                ? "Let's check in gently. Take your time."
                : currentStep === 9
                ? "Last step! You did wonderful reflecting today."
                : `Question ${currentStep + 1} of 10: I am listening with an open heart.`
            }
            showSpeech={true}
          />
        </div>

        <div className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 shadow-xs space-y-3 animate-fadeIn">
          <p className="text-sm font-semibold text-[#1a1d14] leading-relaxed">
            {currentQ?.text[langKey] || currentQ?.text.en}
          </p>

          {/* 5 Likert Options */}
          <div className="space-y-2">
            {currentQ?.options.map((opt) => {
              const isSelected = responses[currentQ.id] === opt.val;
              return (
                <button
                  key={opt.val}
                  onClick={() => handleSelectOption(currentQ.id, opt.val)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer active:scale-98 ${
                    isSelected
                      ? 'border-2 border-[#526140] bg-[#f3f5e6] text-[#1a1d14] shadow-xs'
                      : 'border-[#c5c8bc]/60 bg-white hover:bg-[#f9fbeb] text-[#5e5c52]'
                  }`}
                >
                  <span>{opt.label[langKey] || opt.label.en}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#526140]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Open-Ended Text Box */}
        {currentStep === PSYCHOMETRIC_QUESTIONS.length - 1 && (
          <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-3.5 space-y-2 animate-fadeIn">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block">
              Optional: Anything else on your mind? (100% Private)
            </span>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => handleCustomNoteChange(e.target.value)}
              placeholder="Describe any specific thoughts or pressures in your own words..."
              className="w-full bg-white border border-[#c5c8bc]/60 rounded-2xl p-2.5 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
            />
          </div>
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="px-4 py-3 bg-[#f9fbeb] border-t border-[#c5c8bc]/40 flex items-center justify-between z-20">
        <span className="font-mono text-[10px] text-[#5e5c52]">
          {Object.keys(responses).length} of 10 Answered
        </span>

        {currentStep < PSYCHOMETRIC_QUESTIONS.length - 1 ? (
          <button
            disabled={!responses[currentQ?.id]}
            onClick={() => setCurrentStep((s) => s + 1)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
              responses[currentQ?.id]
                ? 'bg-[#526140] hover:bg-[#435034] text-white cursor-pointer active:scale-98'
                : 'bg-[#c5c8bc]/50 text-[#75786e] cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            disabled={Object.keys(responses).length < 8}
            onClick={handleFinish}
            className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md transition-all ${
              Object.keys(responses).length >= 8
                ? 'bg-[#526140] hover:bg-[#435034] text-white cursor-pointer active:scale-98 animate-pulse'
                : 'bg-[#c5c8bc]/50 text-[#75786e] cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calculate Wellbeing Score →</span>
          </button>
        )}
      </div>
    </div>
  );
}
