import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, Lock, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { getTranslation } from '../../services/translations';

// Scenario matrix based on mood & triggers
const SCENARIOS = {
  // Academic / Exams
  academic: {
    reflection: {
      en: "Exam pressure with backlogs can make everything feel urgent at the exact same time.",
      mr: "परीक्षेचा ताण आणि बॅकलॉगमुळे सर्व गोष्टी एकाच वेळी खूप कठीण आणि तातडीच्या वाटू शकतात.",
      hi: "परीक्षा और बैकलाग का दबाव सब कुछ एक साथ बहुत भारी और कठिन बना देता है।"
    },
    question: {
      en: "What is causing the biggest mental block right now?",
      mr: "सध्या सर्वात जास्त अडचण कशामुळे येत आहे?",
      hi: "इस समय सबसे बड़ी मानसिक उलझन किस बात की है?"
    },
    options: {
      en: [
        "Paralyzed by how much syllabus is left",
        "Fear of failing or disappointing family",
        "Brain feels foggy and exhausted",
        "Running out of time to revise"
      ],
      mr: [
        "अभ्यासक्रम खूप बाकी असल्याने काय करावे समजत नाही",
        "नापास होण्याची किंवा कुटुंबाला निराश करण्याची भीती",
        "मन थकलेले आणि विचार गोंधळलेले वाटतात",
        "रिव्हिजनसाठी वेळ कमी पडत आहे"
      ],
      hi: [
        "सिलेबस बहुत ज्यादा बचा है और शुरुआत नहीं हो रही",
        "फेल होने या परिवार को निराश करने का डर",
        "दिमाग बहुत थका हुआ और उलझन भरा लग रहा है",
        "रिवीजन के लिए समय की कमी लग रही है"
      ]
    }
  },

  // Career / Placements
  career: {
    reflection: {
      en: "Watching batchmates get offers while waiting for your turn can feel like an emotional rollercoaster.",
      mr: "इतरांची प्लेसमेंट होत असताना स्वतःच्या संधीची वाट पाहणे खूप अस्वस्थ करणारे असू शकते.",
      hi: "दोस्तों का प्लेसमेंट होते देखना और अपनी बारी का इंतजार करना काफी तनावपूर्ण हो सकता है।"
    },
    question: {
      en: "What thought is repeating most in your mind?",
      mr: "सध्या मनात कोणता विचार वारंवार येत आहे?",
      hi: "आपके मन में इस समय कौन सा विचार बार-बार आ रहा है?"
    },
    options: {
      en: [
        "I feel like I am falling behind everyone",
        "Questioning my own skills and worth",
        "Pressure and anxiety of upcoming interviews",
        "Financial urgency to get a job"
      ],
      mr: [
        "मी सर्वांच्या मागे पडत चाललोय असे वाटते",
        "स्वतःच्या क्षमतेवर शंका येत आहे",
        "पुढील मुलाखतींचा प्रचंड ताण जाणवतोय",
        "लवकर नोकरी मिळवण्याचा आर्थिक दबाव आहे"
      ],
      hi: [
        "लगता है कि मैं सबसे पीछे छूट रहा हूँ",
        "अपनी काबिलियत और मेहनत पर शक हो रहा है",
        "आने वाले इंटरव्यू का बहुत ज्यादा डर है",
        "जल्द नौकरी पाने का पारिवारिक और आर्थिक दबाव है"
      ]
    }
  },

  // Loneliness / Hostel
  social: {
    reflection: {
      en: "Staying away from home in a hostel often brings quiet moments that feel intensely lonely.",
      mr: "घरापासून दूर हॉस्टेलमध्ये राहताना काही क्षण खूप एकटेपणाचे आणि शांत वाटतात.",
      hi: "घर से दूर हॉस्टल में रहते हुए कई बार अकेलापन बहुत भारी लगने लगता है।"
    },
    question: {
      en: "What are you missing or needing most right now?",
      mr: "सध्या तुम्हाला सर्वात जास्त कशाची गरज वाटतेय?",
      hi: "इस समय आपको सबसे ज्यादा किस चीज की जरूरत महसूस हो रही है?"
    },
    options: {
      en: [
        "Someone genuine to talk with without judgment",
        "The comfort and warmth of home & family",
        "A sense of belonging in this college",
        "Just a safe space to be myself"
      ],
      mr: [
        "कोणीतरी समजून घेणारा व्यक्ती ज्याच्याशी बोलता येईल",
        "घरची आणि कुटुंबाची मायेची आठवण",
        "कॉलेजमध्ये स्वतःचे हक्काचे मित्र हवे आहेत",
        "फक्त शांतपणे मन मोकळे करण्याची जागा"
      ],
      hi: [
        "कोई ऐसा जिससे बिना किसी झिझक के बात कर सकूं",
        "घर और परिवार का सुकून और अपनापन",
        "कॉलेज में अच्छे दोस्तों का साथ चाहिए",
        "बस एक सुरक्षित जगह जहाँ खुद को शांत रख सकूं"
      ]
    }
  },

  // Burnout / Health
  health: {
    reflection: {
      en: "Feeling drained or numb is your mind's signal that it has carried too much stress for too long.",
      mr: "थकवा किंवा काहीच न वाटणे हे मनाचे संकेत आहे की खूप दिवसांपासून ताण साचला आहे.",
      hi: "बहुत ज्यादा थकान या सुन्न महसूस होना यह दर्शाता है कि दिमाग काफी समय से तनाव झेल रहा है।"
    },
    question: {
      en: "What is your body or mind asking for right now?",
      mr: "सध्या तुमच्या शरीराला आणि मनाला कशाची सर्वात जास्त गरज आहे?",
      hi: "इस समय आपके शरीर और मन को सबसे ज्यादा किसकी आवश्यकता है?"
    },
    options: {
      en: [
        "Deep uninterrupted rest and sleep",
        "Taking a break without guilt",
        "Acoustic calming sounds to slow racing thoughts",
        "Stepping away from screens and studies"
      ],
      mr: [
        "शांत आणि गाढ झोप हवी आहे",
        "अपराधीपणा न वाटता थोडी विश्रांती हवी आहे",
        "डोक्यातील गोंधळ कमी करण्यासाठी शांत संगीत",
        "स्क्रीन आणि अभ्यासापासून थोडा वेळ लांब राहणे"
      ],
      hi: [
        "गहरी और सुकून भरी नींद की जरूरत है",
        "बिना किसी अपराधबोध के थोड़ा आराम चाहिए",
        "मन के तेज विचारों को शांत करने वाला संगीत",
        "पढ़ाई और स्क्रीन से थोड़ी देर की दूरी"
      ]
    }
  },

  // Positive
  positive: {
    reflection: {
      en: "Acknowledging your positive milestones builds long-term resilience and emotional calm.",
      mr: "स्वतःच्या छोट्या यशाची जाणीव ठेवल्याने मनात सकारात्मकता आणि आत्मविश्वास वाढतो.",
      hi: "अपनी छोटी-बड़ी सफलताओं को पहचानना मन को सुकून और आत्मविश्वास देता है।"
    },
    question: {
      en: "What helped you feel this sense of ease today?",
      mr: "आज हे समाधान मिळवण्यासाठी कशाची मदत झाली?",
      hi: "आज इस अच्छे अनुभव के पीछे क्या मुख्य बात रही?"
    },
    options: {
      en: [
        "Consistent effort & finishing a task",
        "Quality time with friends or family",
        "Taking time to rest and breathe",
        "Overcoming a difficult challenge"
      ],
      mr: [
        "सतत प्रयत्न आणि एखादे काम पूर्ण केले",
        "मित्रांसोबत किंवा कुटुंबासोबत चांगला वेळ घालवला",
        "विश्रांती घेतली आणि मनाला वेळ दिला",
        "एका अवघड आव्हानाला तोंड दिले"
      ],
      hi: [
        "लगातार मेहनत और किसी काम का पूरा होना",
        "दोस्तों या परिवार के साथ अच्छा समय बिताना",
        "आराम करना और मन को शांत रखना",
        "किसी कठिन चुनौती को पार कर पाना"
      ]
    }
  }
};

const TRIGGER_CHIPS = [
  { id: 'exams', labelKey: 'Exams & Backlogs', category: 'academic' },
  { id: 'deadlines', labelKey: 'Study Pressure & Deadlines', category: 'academic' },
  { id: 'placements', labelKey: 'Placements & Job Uncertainty', category: 'career' },
  { id: 'career_dir', labelKey: 'Career Direction', category: 'career' },
  { id: 'family', labelKey: 'Family Expectations', category: 'social' },
  { id: 'friends', labelKey: 'Friends & Peer Conflicts', category: 'social' },
  { id: 'hostel', labelKey: 'Loneliness & Hostel Adjustment', category: 'social' },
  { id: 'sleep', labelKey: 'Lack of Sleep & Exhaustion', category: 'health' },
  { id: 'overthinking', labelKey: 'Overthinking & Self-Doubt', category: 'health' },
  { id: 'good_news', labelKey: 'Accomplished a Goal / Good News', category: 'positive' }
];

export function Screen05ReasonAssessment({
  checkInData,
  onProceedToGuidance,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  // Active trigger chips
  const [selectedTriggers, setSelectedTriggers] = useState(['Exams & Backlogs']);
  const [activeCategory, setActiveCategory] = useState(
    checkInData?.type === 'positive' ? 'positive' : 'academic'
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [customNote, setCustomNote] = useState('');

  const currentScenario = SCENARIOS[activeCategory] || SCENARIOS.academic;

  const toggleTrigger = (chip) => {
    if (selectedTriggers.includes(chip.labelKey)) {
      const remaining = selectedTriggers.filter((t) => t !== chip.labelKey);
      setSelectedTriggers(remaining);
    } else {
      setSelectedTriggers([...selectedTriggers, chip.labelKey]);
      setActiveCategory(chip.category);
      setSelectedOption(null);
    }
  };

  const handleContinue = (isSkipped = false) => {
    const payload = {
      ...checkInData,
      topics: isSkipped ? ['General Support'] : selectedTriggers,
      clarifiedBlock: selectedOption,
      moreDetails: isSkipped ? '' : customNote.trim()
    };
    onProceedToGuidance(payload);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top App Bar from Stitch */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              STEP 2 · WHAT IS ON YOUR MIND
            </span>
          </div>
        </div>

        {/* Selected Mood Badge */}
        <div className="flex items-center gap-1.5 bg-[#edefe0] border border-[#c5c8bc]/60 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#526140] shadow-2xs">
          <span>{checkInData?.emoji || '😟'}</span>
          <span>{checkInData?.label || 'Anxious'} · {checkInData?.intensity || 'Moderate'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 pb-6">
        {/* Header */}
        <div>
          <h2 className="font-fraunces text-lg font-bold text-[#1a1d14] leading-snug">
            {selectedLanguage === 'mr'
              ? 'या भावनेमागील मुख्य कारण काय आहे?'
              : selectedLanguage === 'hi'
              ? 'इस भावना के पीछे क्या मुख्य वजह है?'
              : 'What is contributing to this feeling?'}
          </h2>
          <p className="text-xs text-[#5e5c52] mt-0.5">
            {selectedLanguage === 'mr'
              ? 'सध्या तुमच्या मनात काय चालू आहे ते विषय निवडा.'
              : selectedLanguage === 'hi'
              ? 'वे विषय चुनें जो आज आपके मन में चल रहे हैं।'
              : 'Select the areas or triggers that describe what you are experiencing.'}
          </p>
        </div>

        {/* Trigger Chips Grid */}
        <div className="flex flex-wrap gap-1.5">
          {TRIGGER_CHIPS.map((chip) => {
            const isSelected = selectedTriggers.includes(chip.labelKey);
            return (
              <button
                key={chip.id}
                onClick={() => toggleTrigger(chip)}
                className={`text-[11.5px] px-3.5 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                  isSelected
                    ? 'bg-[#526140] border-[#526140] text-white font-semibold shadow-xs'
                    : 'bg-white border-[#c5c8bc]/60 text-[#1a1d14] hover:bg-[#f3f5e6]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
                <span>{chip.labelKey}</span>
              </button>
            );
          })}
        </div>

        {/* Highlighted On-Device Adaptive Reflection Bento Card */}
        <div className="bg-gradient-to-br from-[#fdc16d]/20 to-[#f9fbeb] border border-[#815505]/30 rounded-3xl p-4 md:p-5 space-y-3 shadow-xs relative overflow-hidden animate-fadeIn">
          {/* Top Label */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#815505] font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#815505]" />
              On-Device Reflection
            </span>
            <span className="bg-white/80 text-[#526140] px-2 py-0.5 rounded-full border border-[#c5c8bc]/50 font-bold">
              100% Private
            </span>
          </div>

          {/* Compassionate Validation Quote */}
          <p className="font-fraunces text-xs italic text-[#1a1d14] leading-relaxed">
            "{currentScenario.reflection[selectedLanguage] || currentScenario.reflection.en}"
          </p>

          {/* Follow-up Question */}
          <div className="pt-2 border-t border-[#815505]/20 space-y-2">
            <b className="text-xs text-[#1a1d14] block">
              {currentScenario.question[selectedLanguage] || currentScenario.question.en}
            </b>

            {/* Quick-Tap Options */}
            <div className="space-y-1.5">
              {(currentScenario.options[selectedLanguage] || currentScenario.options.en).map((opt, idx) => {
                const isOptSelected = selectedOption === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full text-left p-2.5 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
                      isOptSelected
                        ? 'border-[#526140] bg-[#526140] text-white font-semibold shadow-xs'
                        : 'border-[#c5c8bc]/60 bg-white/80 hover:bg-white text-[#1a1d14]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isOptSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Optional Private Note */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute top-3 left-3 text-[#75786e]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Add a private note in your own words (Optional)..."
              className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-2xl pl-9 pr-3 py-2 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
            />
          </div>
          <span className="font-mono text-[9px] text-[#75786e] block px-1">
            Stored securely on your device · Zero cloud transmission
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#c5c8bc]/50 bg-[#f9fbeb] space-y-1.5">
        <button
          onClick={() => handleContinue(false)}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue to Support Guidance</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleContinue(true)}
          className="w-full py-1 text-center text-xs text-[#5e5c52] hover:text-[#1a1d14] cursor-pointer"
        >
          Skip this step
        </button>
      </div>
    </div>
  );
}
