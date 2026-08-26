import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Lock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { getTranslation } from '../../services/translations';

// Comprehensive On-Device Scenario Matrix mapped directly to each Mood & Intensity
const MOOD_SCENARIO_MATRIX = {
  // 1. ANXIOUS 😟
  anxious: {
    reflection: {
      en: "When worry or exam pressure builds up, your brain goes into high-alert, making everything feel urgent all at once.",
      mr: "जेव्हा काळजी किंवा परीक्षेचा ताण वाढतो, तेव्हा सर्व गोष्टी एकाच वेळी खूप तातडीच्या आणि कठीण वाटू लागतात.",
      hi: "जब चिंता या परीक्षा का दबाव बढ़ता है, तो दिमाग सब कुछ एक साथ भारी और बहुत जरूरी बना देता है।"
    },
    question: {
      en: "What is causing the biggest mental block right now?",
      mr: "सध्या सर्वात जास्त अडचण किंवा भीती कशामुळे वाटतेय?",
      hi: "इस समय सबसे बड़ी मानसिक उलझन या डर किस बात का है?"
    },
    options: {
      en: [
        "Paralyzed by how much syllabus or work is left",
        "Fear of failing or disappointing family expectations",
        "Racing thoughts and unable to quiet my mind",
        "Running out of time before deadlines or exams"
      ],
      mr: [
        "अभ्यासक्रम खूप बाकी असल्याने सुरुवात कुठून करावी समजत नाही",
        "नापास होण्याची किंवा कुटुंबाला निराश करण्याची भीती",
        "मनात सतत विचारांचे वादळ चालू आहे",
        "डेडलाईन किंवा परीक्षेसाठी वेळ कमी पडत आहे"
      ],
      hi: [
        "सिलेबस बहुत बचा है और समझ नहीं आ रहा कहाँ से शुरू करें",
        "फेल होने या परिवार को निराश करने का डर",
        "मन में लगातार विचार चल रहे हैं और शांति नहीं मिल रही",
        "परीक्षा या डेडलाइन के लिए समय कम लग रहा है"
      ]
    },
    recommendedTool: 'mood_tunes'
  },

  // 2. OVERWHELMED 😣
  overwhelmed: {
    reflection: {
      en: "Feeling overloaded is a sign that you have been juggling too many demands without enough mental breathing room.",
      mr: "खूप जास्त ताण जाणवणे हे दर्शवते की तुम्ही विश्रांती न घेता एकाच वेळी अनेक गोष्टी सांभाळण्याचा प्रयत्न करत आहात.",
      hi: "बहुत ज्यादा बोझ महसूस होना यह दिखाता है कि आप बिना आराम किए एक साथ बहुत सारी जिम्मेदारियां संभाल रहे हैं।"
    },
    question: {
      en: "What part of your day is feeling the heaviest?",
      mr: "सध्या कोणत्या गोष्टीचा भार सर्वात जास्त वाटतोय?",
      hi: "इस समय किस चीज का बोझ सबसे ज्यादा महसूस हो रहा है?"
    },
    options: {
      en: [
        "Multiple deadlines and backlogs piling up together",
        "Physical and mental exhaustion from sleep deprivation",
        "Balancing college, family, and future career pressure",
        "Feeling like I have to do everything alone"
      ],
      mr: [
        "अनेक डेडलाईन्स आणि बॅकलॉग एकत्र साचले आहेत",
        "झोप न झाल्यामुळे आलेला शारीरिक आणि मानसिक थकवा",
        "कॉलेज, घर आणि करिअरचा एकत्र येणारा ताण",
        "सर्व काही मला एकट्यालाच करावे लागत आहे असे वाटते"
      ],
      hi: [
        "एक साथ बहुत सारे असाइनमेंट और बैकलाग का दबाव",
        "नींद पूरी न होने से शारीरिक और मानसिक थकान",
        "कॉलेज, परिवार और भविष्य की चिंता का एक साथ आना",
        "लगता है कि सब कुछ अकेले ही संभालना पड़ रहा है"
      ]
    },
    recommendedTool: 'let_it_out'
  },

  // 3. SAD 😔
  sad: {
    reflection: {
      en: "Staying in a hostel away from home or facing setbacks often brings moments that feel quiet and heavy.",
      mr: "घरापासून दूर राहताना किंवा काही अडचणी आल्यावर मन खूप उदास आणि शांत होऊन जाते.",
      hi: "घर से दूर रहने पर या किसी असफलता के बाद मन में उदासी और भारीपन आना स्वाभाविक है।"
    },
    question: {
      en: "What are you missing or needing most in this moment?",
      mr: "सध्या तुम्हाला सर्वात जास्त कशाची गरज किंवा आठवण वाटतेय?",
      hi: "इस समय आपको सबसे ज्यादा किस चीज की जरूरत या कमी महसूस हो रही है?"
    },
    options: {
      en: [
        "Someone genuine to listen to me without judgment",
        "The comfort and warmth of home and family",
        "A sense of belonging and real friends in college",
        "A quiet space to let out my tears and emotions"
      ],
      mr: [
        "कोणीतरी समजून घेणारा व्यक्ती ज्याच्याशी मोकळेपणाने बोलता येईल",
        "घरची आणि कुटुंबाच्या प्रेमाची मायेची आठवण",
        "कॉलेजमध्ये स्वतःचे हक्काचे आणि जवळचे मित्र हवे आहेत",
        "शांतपणे मन मोकळे करण्याची आणि अश्रू ढाळण्याची जागा"
      ],
      hi: [
        "कोई ऐसा जो बिना परखे मेरी बात को ध्यान से सुने",
        "घर और परिवार का सुकून और अपनापन",
        "कॉलेज में सच्चे और अच्छे दोस्तों का साथ",
        "एक शांत कोना जहाँ बिना झिझक मन हल्का कर सकूँ"
      ]
    },
    recommendedTool: 'peer'
  },

  // 4. IRRITATED / ANGRY 😠
  irritated: {
    reflection: {
      en: "When boundaries are crossed or things feel unfair, holding in frustration drains your emotional energy.",
      mr: "जेव्हा गोष्टी मनासारख्या घडत नाहीत किंवा अन्याय वाटतो, तेव्हा राग दाबून ठेवल्याने अधिक त्रास होतो.",
      hi: "जब चीजें हमारे हिसाब से नहीं होतीं या गलत लगती हैं, तो गुस्सा दबाए रखने से ज्यादा तनाव होता है।"
    },
    question: {
      en: "Where is this frustration rooted right now?",
      mr: "हा राग किंवा चिडचिड मुख्यत्वे कशामुळे होत आहे?",
      hi: "यह गुस्सा या चिड़चिड़ापन मुख्य रूप से किस कारण से है?"
    },
    options: {
      en: [
        "Roommate or friend conflicts in the hostel",
        "Unfair academic grading or group project issues",
        "Feeling unheard and misunderstood by others",
        "Frustrated with my own lack of progress"
      ],
      mr: [
        "हॉस्टेलमध्ये रूममेट किंवा मित्रांसोबतचे वाद",
        "कॉलेज किंवा ग्रुप प्रोजेक्टमधील पक्षपातीपणा",
        "इतर कोणीही मला समजून घेत नाही अशी भावना",
        "स्वतःच्या अभ्यासात प्रगती न झाल्यामुळे आलेली चिडचिड"
      ],
      hi: [
        "हॉस्टल में रूममेट या दोस्तों के साथ मतभेद",
        "कॉलेज या ग्रुप प्रोजेक्ट में अनुचित व्यवहार",
        "लगता है कि कोई मेरी बात समझ नहीं रहा",
        "अपनी ही पढ़ाई में रुकावट से खुद पर गुस्सा"
      ]
    },
    recommendedTool: 'let_it_out'
  },

  // 5. NUMB 😶
  numb: {
    reflection: {
      en: "Feeling numb or detached is your mind's defense mechanism when it has carried too much stress for too long.",
      mr: "काहीच न वाटणे हे मनाचे संकेत आहे की ताणाचा भार सहन करून मन खूप थकले आहे.",
      hi: "सुन्न या खालीपन महसूस होना यह दर्शाता है कि दिमाग काफी समय से तनाव झेलते हुए थक चुका है।"
    },
    question: {
      en: "How does this detachment feel right now?",
      mr: "सध्या हा एकटेपणा किंवा शून्यता कशी जाणवतेय?",
      hi: "यह खालीपन या अलगाव इस समय आपको कैसा लग रहा है?"
    },
    options: {
      en: [
        "Going through classes like a robot without feeling anything",
        "Disconnected from friends and activities I used to enjoy",
        "Mentally drained with zero motivation to study",
        "Just want the world to pause for a while"
      ],
      mr: [
        "कोणतीही भावना न ठेवता फक्त रोबोटसारखे काम करणे",
        "पूर्वी आवडणाऱ्या गोष्टी आणि मित्रांपासून तुटल्यासारखे वाटणे",
        "अभ्यास करण्याची अजिबात ऊर्जा किंवा इच्छा नसणे",
        "फक्त काही वेळासाठी सर्व काही थांबून जावे असे वाटते"
      ],
      hi: [
        "बिना किसी भावना के रोबोट की तरह दिन बिताना",
        "दोस्तों और पसंदीदा कामों से मन का हट जाना",
        "पढ़ाई या किसी काम के लिए बिल्कुल ऊर्जा न होना",
        "बस लगता है कि कुछ देर के लिए सब कुछ थम जाए"
      ]
    },
    recommendedTool: 'mood_tunes'
  },

  // 6. VERY LOW 😞
  very_low: {
    reflection: {
      en: "You have been carrying a very heavy burden, and it makes complete sense that you feel drained and hopeless.",
      mr: "तुम्ही खूप मोठा मानसिक भार सहन करत आहात, त्यामुळे अत्यंत निराश वाटणे समजण्यासारखे आहे.",
      hi: "आप बहुत समय से एक भारी मानसिक दबाव झेल रहे हैं, इसलिए निराशा महसूस होना स्वाभाविक है।"
    },
    question: {
      en: "What would provide the safest support for you right now?",
      mr: "सध्या तुम्हाला सर्वात जास्त सुरक्षित आणि आधार देणारे काय वाटेल?",
      hi: "इस समय आपको सबसे सुरक्षित और मददगार क्या लगेगा?"
    },
    options: {
      en: [
        "Confidential 1-on-1 talk with a licensed campus counsellor",
        "Gentle acoustic sounds to slow my thoughts safely",
        "Private audio venting that deletes itself immediately",
        "I need immediate campus crisis hotline assistance"
      ],
      mr: [
        "परवानाधारक कॉलेज कौन्सिलरशी खाजगी संवाद",
        "डोक्यातील विचार शांत करण्यासाठी संथ आणि सुखद ध्वनी",
        "ताबडतोब नष्ट होणारे खाजगी ऑडिओ रेकॉर्डिंग",
        "मला तातडीच्या हेल्पलाइन किंवा मदतीची गरज आहे"
      ],
      hi: [
        "कॉलेज के लाइसेंस प्राप्त काउंसलर से गोपनीय बातचीत",
        "मन के विचारों को शांत करने वाला धीमा संगीत",
        "तुरंत मिट जाने वाला निजी ऑडियो वेंट",
        "मुझे तत्काल हेल्पलाइन या आपातकालीन सहायता चाहिए"
      ]
    },
    recommendedTool: 'level3_care'
  },

  // 7. GOOD 😊
  good: {
    reflection: {
      en: "Every milestone and productive day in college matters. Recognizing your small wins builds long-term resilience.",
      mr: "कॉलेजमधील प्रत्येक लहान यश महत्त्वाचे असते. आजच्या चांगल्या दिवसाचा आनंद घेणे मनाला बळ देते.",
      hi: "कॉलेज में हर छोटी सफलता मायने रखती है। अपने अच्छे पलों को पहचानना आत्मविश्वास बढ़ाता है।"
    },
    question: {
      en: "What helped you create this positive momentum today?",
      mr: "आज हा चांगला अनुभव मिळवण्यासाठी कशाची मदत झाली?",
      hi: "आज इस अच्छे दिन और सफलता के पीछे क्या बात रही?"
    },
    options: {
      en: [
        "Completed a difficult academic task or exam",
        "Spent quality, uplifting time with friends or family",
        "Took proper rest and paced myself without stress",
        "Overcame a personal fear or obstacle"
      ],
      mr: [
        "एखादा अवघड अभ्यास किंवा परीक्षा यशस्वीपणे पूर्ण केली",
        "मित्रांसोबत किंवा कुटुंबासोबत आनंददायी वेळ घालवला",
        "ताण न घेता योग्य विश्रांती घेतली",
        "एखाद्या भीतीवर किंवा अडचणीवर मात केली"
      ],
      hi: [
        "कोई कठिन काम या परीक्षा सफलतापूर्वक पूरी की",
        "दोस्तों या परिवार के साथ अच्छा और सुकून भरा समय बिताया",
        "बिना तनाव के सही आराम किया और खुद को समय दिया",
        "किसी डर या परेशानी का डटकर सामना किया"
      ]
    },
    recommendedTool: 'wall'
  },

  // 8. CALM 🙂
  calm: {
    reflection: {
      en: "Feeling grounded and calm is a valuable state of mind. It allows your nervous system to recover and recharge.",
      mr: "शांत आणि समाधानी वाटणे हे मनासाठी अतिशय आरोग्यदायी आहे. यामुळे पुढील दिवसांसाठी नवी ऊर्जा मिळते.",
      hi: "शांत और संतुलित महसूस होना मन के लिए बहुत अच्छा है। इससे आगे के लिए नई ऊर्जा मिलती है।"
    },
    question: {
      en: "How would you like to nurture this peaceful space?",
      mr: "या शांततेचा अनुभव अधिक चांगल्या प्रकारे कसा घ्यायला आवडेल?",
      hi: "इस शांत और अच्छे अनुभव को आप कैसे आगे बढ़ाना चाहेंगे?"
    },
    options: {
      en: [
        "Write thoughts and insights into my private Journal",
        "Listen to gentle binaural soundscapes to stay centered",
        "Share an encouraging note on the Wall of Thoughts for peers",
        "Just enjoy the quiet stillness without any pressure"
      ],
      mr: [
        "माझ्या खाजगी डायरीत आजचे चांगले विचार नोंदवणे",
        "मन शांत ठेवण्यासाठी मंद संगीत ऐकणे",
        "इतर विद्यार्थ्यांसाठी 'वॉल ऑफ थॉट्स'वर एक चांगला संदेश देणे",
        "कोणताही ताण न घेता या शांततेचा आनंद घेणे"
      ],
      hi: [
        "अपनी निजी डायरी में कुछ अच्छे विचार और अनुभव लिखना",
        "मन को एकाग्र रखने के लिए शांत संगीत सुनना",
        "दूसरे छात्रों के लिए 'वॉल ऑफ थॉट्स' पर एक प्रेरणादायक संदेश लिखना",
        "बिना किसी दबाव के बस इस सुकून को महसूस करना"
      ]
    },
    recommendedTool: 'journal'
  },

  // 9. DEFAULT / DON'T KNOW / OTHER 🤷
  default: {
    reflection: {
      en: "You don't need to have a clear reason or label to take a gentle pause for your wellbeing.",
      mr: "स्वतःची काळजी घेण्यासाठी किंवा विश्रांती घेण्यासाठी कोणत्याही स्पष्ट कारणाची गरज नसते.",
      hi: "अपने मन को थोड़ा आराम देने के लिए किसी स्पष्ट वजह का होना जरूरी नहीं है।"
    },
    question: {
      en: "What kind of environment would feel most comforting right now?",
      mr: "सध्या तुम्हाला कोणत्या प्रकारची मदत किंवा वातावरण हवे आहे?",
      hi: "इस समय आपको किस तरह का माहौल सबसे आरामदायक लगेगा?"
    },
    options: {
      en: [
        "Quiet acoustic sounds to ease tension without words",
        "A private space to speak freely and auto-delete",
        "Reading kind anonymous notes from other students",
        "Speaking confidentially with a trained peer volunteer"
      ],
      mr: [
        "शब्दांशिवाय मनाचा ताण कमी करणारे संथ संगीत",
        "मनमोकळे बोलण्यासाठी आणि लगेच नष्ट होणारी खाजगी जागा",
        "इतर विद्यार्थ्यांनी लिहिलेले सकारात्मक संदेश वाचणे",
        "प्रशिक्षित स्वयंसेवकाशी खाजगीत बोलणे"
      ],
      hi: [
        "बिना शब्दों के मन का तनाव हल्का करने वाला संगीत",
        "अपनी बात बोलकर तुरंत मिटा देने वाली सुरक्षित जगह",
        "अन्य छात्रों द्वारा लिखे गए अच्छे विचार पढ़ना",
        "प्रशिक्षित सहपाठी स्वयंसेवक से बात करना"
      ]
    },
    recommendedTool: 'mood_tunes'
  }
};

export function Screen05AdaptiveFollowUp({
  checkInData,
  onProceedToGuidance,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);

  const moodKey = checkInData?.moodId || 'anxious';
  const scenario = MOOD_SCENARIO_MATRIX[moodKey] || MOOD_SCENARIO_MATRIX.default;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [customNote, setCustomNote] = useState('');

  const reflectionText = scenario.reflection[selectedLanguage] || scenario.reflection.en;
  const questionText = scenario.question[selectedLanguage] || scenario.question.en;
  const optionsList = scenario.options[selectedLanguage] || scenario.options.en;

  const handleProceed = (isSkipped = false) => {
    const payload = {
      ...checkInData,
      clarifiedRootCause: isSkipped ? null : selectedAnswer,
      moreDetails: isSkipped ? '' : customNote.trim(),
      recommendedTool: scenario.recommendedTool
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
              STEP 2 · UNDERSTANDING WHAT HAPPENED
            </span>
          </div>
        </div>

        {/* Selected Mood Badge */}
        <div className="flex items-center gap-1.5 bg-[#edefe0] border border-[#c5c8bc]/60 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#526140] shadow-2xs">
          <span>{checkInData?.emoji || '😐'}</span>
          <span>{checkInData?.label || 'Check-in'} · {checkInData?.intensity || 'Moderate'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 pb-6">
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
            "{reflectionText}"
          </p>

          {/* Targeted Follow-up Question */}
          <div className="pt-2 border-t border-[#815505]/20 space-y-2">
            <b className="text-xs text-[#1a1d14] block">
              {questionText}
            </b>

            {/* Quick-Tap Options */}
            <div className="space-y-1.5">
              {optionsList.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`w-full text-left p-3 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
                      isSelected
                        ? 'border-[#526140] bg-[#526140] text-white font-semibold shadow-xs'
                        : 'border-[#c5c8bc]/60 bg-white/90 hover:bg-white text-[#1a1d14]'
                    }`}
                  >
                    <span className="leading-snug pr-2">{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-white flex-shrink-0" />}
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
              placeholder={selectedLanguage === 'mr' ? "काही अधिक सांगायचे असल्यास येथे लिहा (पर्यायी)..." : selectedLanguage === 'hi' ? "अपने शब्दों में कोई बात जोड़ना चाहें तो यहाँ लिखें (वैकल्पिक)..." : "Add a private note in your own words (Optional)..."}
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
          onClick={() => handleProceed(false)}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue to Support Guidance</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleProceed(true)}
          className="w-full py-1 text-center text-xs text-[#5e5c52] hover:text-[#1a1d14] cursor-pointer"
        >
          Skip this step
        </button>
      </div>
    </div>
  );
}
