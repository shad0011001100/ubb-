/**
 * Ubb (ऊब) - Comprehensive Multilingual Translation Dictionary
 * Languages: English ('en'), Marathi ('mr'), Hindi ('hi')
 */

export const TRANSLATIONS = {
  en: {
    common: {
      appName: "Ubb",
      tagline: "A warm space for every thought",
      back: "Back",
      continue: "Continue",
      save: "Save",
      cancel: "Cancel",
      submit: "Submit",
      skip: "Skip for now",
      home: "Home",
      talk: "Talk",
      progress: "Progress",
      selfCare: "Self-Care",
      emergencySOS: "Need urgent help right now?",
      emergencySub: "24x7 Campus Crisis & Tele-MANAS 14416",
      rlsProtected: "RLS Protected · Zero-PII",
      permanentDeleteNotice: "Your recording has been permanently deleted. Zero bytes remain.",
      wasThisHelpful: "Was this helpful for you?",
      reallyHelpful: "Really helpful",
      good: "Good",
      okay: "Okay",
      notGreat: "Not that great",
      stillNeedSupport: "I still need support"
    },
    screen1: {
      title: "Welcome to Ubb",
      subtitle: "A warm space for every thought",
      studentBtn: "Continue as Student",
      studentSub: "Anonymous · Private · No personal details required",
      volunteerBtn: "Volunteer / Counsellor Login",
      volunteerSub: "Access peer queue, moderation & appointments",
      privacyNotice: "You do not need to share your name, phone number, or academic record to be heard."
    },
    screen2: {
      title: "Your private Ubb ID has been created",
      subtitle: "You can use this ID to access your journey safely across any device.",
      saveNotice: "Please save your Ubb ID securely.",
      pinLabel: "Create an optional 4-digit private PIN",
      pinPlaceholder: "••••",
      privacyPill: "No name · No phone · End-to-end zero PII",
      continueBtn: "Continue to Dashboard →",
      deleteDataNote: "You can permanently delete all your data anytime in Settings."
    },
    screen3: {
      welcome: "Welcome back",
      quote: "You don't have to solve everything today. Start with one small step.",
      pulseTitle: "UbbPulse",
      pulseDesc: "Quick mood check-in & personalized guidance",
      letItOutTitle: "Let It Out",
      letItOutDesc: "Temporary voice or text vent · Automatically deleted",
      moodTunesTitle: "MoodTunes",
      moodTunesDesc: "Calm music, nature sounds & acoustic binaural beats",
      journalTitle: "Private Journal",
      journalDesc: "Secure written expression saved locally on your device",
      wallTitle: "Wall of Thoughts",
      wallDesc: "Read & share anonymous encouraging notes with peers",
      talkTitle: "Talk to Someone",
      talkDesc: "Connect with a trained psychology peer or counsellor",
      journeyTitle: "My Journey",
      journeyDesc: "Review your check-in trends and helpfulness insights"
    },
    screen4: {
      title: "How are you feeling right now?",
      subtitle: "Treat this as a private check-in, not a clinical test.",
      moods: {
        good: "Good",
        calm: "Calm",
        sad: "Sad",
        anxious: "Anxious",
        irritated: "Irritated",
        overwhelmed: "Overwhelmed",
        numb: "Numb",
        veryLow: "Very low",
        dontKnow: "I don't know",
        other: "Other",
        preferNotToSay: "Prefer not to say"
      },
      intensityTitle: "How intense does this feeling feel right now?",
      intensityLevels: {
        little: "A little",
        moderate: "Moderate",
        strong: "Strong",
        veryStrong: "Very strong"
      },
      nextBtn: "Next →"
    },
    screen5A: {
      title: "What would you like to do next?",
      expressOpt: "Express myself",
      expressSub: "Relax with MoodTunes or write in my Journal",
      helpPeersOpt: "Help my peers",
      helpPeersSub: "Share an encouraging thought on the Wall of Thoughts",
      activityOpt: "Explore a wellbeing activity",
      activitySub: "4-7-8 Breathing, 5-4-3-2-1 Grounding, or Soundscapes",
      dashOpt: "Continue to Dashboard",
      wallPromptTitle: "Write something encouraging for another student",
      wallPromptDesc: "Your message will be anonymous and reviewed by our moderation queue before appearing.",
      starters: [
        "One thing that helped me today was...",
        "A reminder someone may need today...",
        "I am proud of myself for..."
      ],
      postBtn: "Post Anonymously",
      draftBtn: "Save as Draft",
      moderationStatus: "Automated Safety Filter → Volunteer Moderation Queue → Published"
    },
    screen5B: {
      title: "What would you like support with?",
      subtitle: "Select all that apply. You can choose more than one.",
      topics: [
        "Academics",
        "Career",
        "Future uncertainty",
        "Family",
        "Friends",
        "Relationship",
        "Financial stress",
        "Loneliness",
        "Self-confidence",
        "Sleep or routine",
        "Other",
        "I don't know"
      ],
      moreDetailsLabel: "Would you like to tell us a little more? (Optional)",
      moreDetailsPlaceholder: "Feel free to write a few words here... you can skip this if you prefer."
    },
    screen6: {
      title: "Immediate Safety Check",
      subtitle: "Before we guide you to support, let's make sure you're safe right now.",
      question: "Are you in immediate danger or thinking about hurting yourself or someone else?",
      options: {
        yes: "Yes, I need urgent help",
        no: "No",
        notSure: "I'm not sure",
        preferNotToAnswer: "Prefer not to answer"
      },
      urgentTitle: "You deserve immediate human support",
      urgentSub: "Please contact campus crisis services or official national helplines right now.",
      urgentContacts: [
        { name: "Campus Emergency Counselor Hotline", number: "+91 8000 123 456", note: "Available 24x7 on campus" },
        { name: "Tele-MANAS (Govt of India)", number: "14416", note: "Toll-free 24x7 clinical support" },
        { name: "KIRAN National Helpline", number: "1800-599-0019", note: "Ministry of Social Justice" }
      ],
      safetyDisclaimer: "Do not rely only on Ubb in an emergency. AI systems are not a substitute for professional clinical crisis intervention."
    },
    screen7: {
      guidanceTitle: "Ubb Support Guidance",
      guidanceSub: "Based on your check-in, Ubb suggests starting with:",
      levels: {
        level1Title: "Support 1 — Self-Help Tools",
        level1Desc: "Let It Out (record voice note, deleted immediately), Private Journal, or MoodTunes music therapy.",
        level2Title: "Support 2 — Talk to a Volunteer",
        level2Desc: "Connect in a 1-on-1 private chat with psychology peers from college. Escalated further if needed.",
        level3Title: "Support 3 — Meet a Counsellor",
        level3Desc: "Licensed college-level clinical support (e.g., Manas Counselling Centre) with ongoing care follow-up."
      },
      exploreBtn: "Open Suggested Level →"
    },
    level1: {
      title: "Take a gentle moment for yourself",
      tabLetItOut: "Let It Out",
      tabMoodTunes: "MoodTunes",
      tabJournal: "Private Journal",
      recordInstruction: "Record an audio vent. Pause, resume, or delete anytime. Zero audio is stored after playback.",
      permanentDeleteConfirm: "✓ Your audio recording was permanently deleted from memory. Zero bytes remain.",
      journalPrompt: "Write down whatever is taking up space in your head today...",
      savedLocally: "Saved locally on your device · 100% private"
    },
    level2: {
      title: "You don't have to handle this alone",
      subtitle: "Connect with a trained peer supporter in a safe, confidential environment.",
      requestFormTitle: "Volunteer Support Request",
      selectedTopic: "Selected Topic",
      prefLanguage: "Preferred Language",
      prefMode: "Preferred Mode",
      prefTime: "Preferred Time",
      consentText: "I agree to share the selected check-in summary with the assigned psychology volunteer.",
      submitRequestBtn: "Submit Support Request",
      lifecycle: {
        step1: "Request submitted",
        step2: "Volunteer assigned",
        step3: "Volunteer accepts",
        step4: "Private conversation",
        step5: "Feedback & Close"
      },
      volunteerBoundaries: "Volunteer Guidelines: Listen empathetically without judging. Do not diagnose or prescribe medication. Escalate safety concerns immediately to the supervising counsellor."
    },
    level3: {
      title: "Connect with professional support",
      subtitle: "Book an appointment with a licensed mental health professional.",
      counsellorA: {
        name: "Dr. Pratibha Deshmukh",
        specialization: "Student Wellbeing & Cognitive Resilience",
        available: "Tomorrow, 10:30 AM"
      },
      counsellorB: {
        name: "Dr. Anand Joshi",
        specialization: "Academic & Personal Stress Management",
        available: "Today, 4:30 PM"
      },
      bookBtn: "Book Appointment",
      midnightTitle: "No counsellor is available right now",
      midnightSub: "Your request has been marked as urgent. Earliest appointment: 8:30 AM tomorrow.",
      whileYouWait: "While you wait for your appointment:",
      whileYouWaitTools: [
        "Contact designated campus emergency support",
        "Use Let It Out for private temporary voice venting",
        "Start MoodTunes acoustic binaural frequencies",
        "Write in your private Journal",
        "Reach out to a trusted person nearby"
      ]
    }
  },
  mr: {
    common: {
      appName: "ऊब (Ubb)",
      tagline: "प्रत्येक विचारासाठी एक आपुलकीची जागा",
      back: "मागे",
      continue: "पुढे जा",
      save: "जतन करा",
      cancel: "रद्द करा",
      submit: "सबमिट करा",
      skip: "सध्या वगळा",
      home: "मुख्यपृष्ठ",
      talk: "संवाद",
      progress: "प्रगती",
      selfCare: "स्वतःची काळजी",
      emergencySOS: "सध्या तात्काळ मदतीची गरज आहे?",
      emergencySub: "२४x७ कॅम्पस आपत्कालीन व Tele-MANAS १४४१६",
      rlsProtected: "RLS सुरक्षित · शून्य वैयक्तिक माहिती",
      permanentDeleteNotice: "तुमचा रेकॉर्ड केलेला ऑडिओ कायमचा हटवला गेला आहे.",
      wasThisHelpful: "हा अनुभव तुमच्यासाठी उपयुक्त ठरला का?",
      reallyHelpful: "खूप उपयुक्त",
      good: "छान",
      okay: "ठीकठाक",
      notGreat: "फारसा नाही",
      stillNeedSupport: "मला अजून मदतीची गरज आहे"
    },
    screen1: {
      title: "ऊब मध्ये आपले स्वागत आहे",
      subtitle: "प्रत्येक विचारासाठी एक सुरक्षित आणि आपुलकीची जागा",
      studentBtn: "विद्यार्थी म्हणून पुढे जा",
      studentSub: "पूर्णपणे अनामिक · १००% खाजगी · नाव-फोनची गरज नाही",
      volunteerBtn: "व्हॉलंटिअर / समुपदेशक लॉगिन",
      volunteerSub: "पीअर चॅट, मॉडरेशन आणि अपॉइंटमेंट व्यवस्थापन",
      privacyNotice: "तुमचं म्हणणं ऐकण्यासाठी तुमचं नाव, फोन किंवा ओळख उघड करण्याची कोणतीही गरज नाही."
    },
    screen2: {
      title: "तुमची खाजगी Ubb ID तयार झाली आहे",
      subtitle: "तुम्ही कोणत्याही डिव्हाइसवर तुमच्या प्रवासासाठी हा ID वापरू शकता.",
      saveNotice: "कृपया तुमचा हा Ubb ID सुरक्षित ठिकाणी नोंदवून ठेवा.",
      pinLabel: "ऐच्छिक ४-अंकी खाजगी PIN तयार करा",
      pinPlaceholder: "••••",
      privacyPill: "नाव नाही · नंबर नाही · पूर्ण सुरक्षितता",
      continueBtn: "डॅशबोर्डकडे चला →",
      deleteDataNote: "तुम्ही सेटिंग्जमधून तुमचा डेटा कधीही कायमचा नष्ट करू शकता."
    },
    screen3: {
      welcome: "पुन्हा स्वागत आहे",
      quote: "आजच सगळं सोडवलं पाहिजे असं नाही. एका छोट्या पावलाने सुरुवात करा.",
      pulseTitle: "ऊब पल्स (UbbPulse)",
      pulseDesc: "सध्याची मनःस्थिती तपासा आणि मार्गदर्शन मिळवा",
      letItOutTitle: "मनातील सल (Let It Out)",
      letItOutDesc: "हंगामी आवाज किंवा मजकूर · ऐकल्यानंतर लगेच नष्ट",
      moodTunesTitle: "मूडट्यून्स (MoodTunes)",
      moodTunesDesc: "शांत संगीत, निसर्गाचे नाद आणि बायनॉरॉल बीट्स",
      journalTitle: "खाजगी डायरी (Journal)",
      journalDesc: "तुमच्या डिव्हाइसवर १००% सुरक्षितपणे साठवलेले विचार",
      wallTitle: "उब देणारे विचार (Wall of Thoughts)",
      wallDesc: "इतर विद्यार्थ्यांचे सकारात्मक संदेश वाचा व लिहा",
      talkTitle: "कोणाशीतरी बोला (Talk to Someone)",
      talkDesc: "प्रशिक्षित समवयस्क मार्गदर्शक किंवा समुपदेशकाशी जोडा",
      journeyTitle: "माझा प्रवास (My Journey)",
      journeyDesc: "तुमच्या प्रगतीचा आलेख आणि आधीच्या नोंदी"
    },
    screen4: {
      title: "तुम्हाला सध्या कसं वाटतंय?",
      subtitle: "हा एक खाजगी चेक-इन आहे, कोणतीही वैद्यकीय तपासणी नाही.",
      moods: {
        good: "छान",
        calm: "शांत",
        sad: "उदास",
        anxious: "चिंताग्रस्त",
        irritated: "चिडचिड",
        overwhelmed: "खूप जास्त ताण",
        numb: "काहीच सुचेना",
        veryLow: "खूप खचल्यासारखं",
        dontKnow: "सांगता येत नाही",
        other: "इतर",
        preferNotToSay: "सांगायचे नाही"
      },
      intensityTitle: "या भावनेची तीव्रता सध्या किती वाटते?",
      intensityLevels: {
        little: "थोडीशी",
        moderate: "मध्यम",
        strong: "तीव्र",
        veryStrong: "खूप जास्त तीव्र"
      },
      nextBtn: "पुढे जा →"
    },
    screen5A: {
      title: "तुम्हाला आता काय करायला आवडेल?",
      expressOpt: "स्वतःला व्यक्त करा",
      expressSub: "MoodTunes संगीत ऐका किंवा डायरीत लिहा",
      helpPeersOpt: "मित्रांना मदत करा",
      helpPeersSub: "Wall of Thoughts वर सकारात्मक विचार लिहा",
      activityOpt: "मनःशांती व्यायाम करा",
      activitySub: "४-७-८ श्वसन व्यायाम किंवा निसर्ग ध्वनी",
      dashOpt: "डॅशबोर्डवर परत जा",
      wallPromptTitle: "इतर विद्यार्थ्यांसाठी एखादा उत्साहवर्धक विचार लिहा",
      wallPromptDesc: "तुमचा संदेश अनामिक राहील आणि तपासणीनंतर वॉलवर दिसेल.",
      starters: [
        "आज मला मदत करणारी एक गोष्ट म्हणजे...",
        "एखाद्याला आज ऐकण्याची गरज असलेला विचार...",
        "मला स्वतःचा अभिमान वाटतो कारण..."
      ],
      postBtn: "अनामिकपणे पोस्ट करा",
      draftBtn: "ड्राफ्ट म्हणून ठेवा",
      moderationStatus: "सुरक्षा तपासणी → व्हॉलंटिअर मॉडरेशन → प्रसिद्ध"
    },
    screen5B: {
      title: "तुम्हाला कोणत्या बाबतीत मदत हवी आहे?",
      subtitle: "लागू असलेले सर्व पर्याय निवडा. एकापेक्षा जास्त निवडू शकता.",
      topics: [
        "अभ्यास व परीक्षा",
        "करिअर",
        "भविष्याची चिंता",
        "कुटुंब",
        "मित्र",
        "नातेसंबंध",
        "आर्थिक ताण",
        "एकटेपणा",
        "आत्मविश्वास",
        "झोप किंवा दिनचर्या",
        "इतर",
        "सांगता येत नाही"
      ],
      moreDetailsLabel: "थोडं अधिक सांगायला आवडेल का? (ऐच्छिक)",
      moreDetailsPlaceholder: "इथे काही ओळी लिहू शकता... हवे असल्यास वगळू शकता."
    },
    screen6: {
      title: "तात्काळ सुरक्षा तपासणी",
      subtitle: "मदत देण्यापूर्वी तुम्ही सुरक्षित असल्याची खात्री करूया.",
      question: "तुम्ही सध्या काही धोक्यात आहात किंवा स्वतःला दुखावण्याचा विचार मनात येतोय का?",
      options: {
        yes: "होय, मला तात्काळ मदत हवी आहे",
        no: "नाही",
        notSure: "सांगता येत नाही",
        preferNotToAnswer: "उत्तर द्यायचे नाही"
      },
      urgentTitle: "तुम्हाला लगेच प्रत्यक्ष मानवी मदतीची गरज आहे",
      urgentSub: "कृपया लगेच कॅम्पस मदत क्रमांक किंवा राष्ट्रीय हेल्पलाईनशी संपर्क साधा.",
      urgentContacts: [
        { name: "कॅम्पस आपत्कालीन समुपदेशक हेल्पलाइन", number: "+91 8000 123 456", note: "२४ तास कॅम्पसमध्ये उपलब्ध" },
        { name: "Tele-MANAS (भारत सरकार)", number: "१४४१६", note: "टोल-फ्री २४x७ क्लिनिकल मदत" },
        { name: "KIRAN राष्ट्रीय हेल्पलाइन", number: "१८००-५९९-००१९", note: "सामाजिक न्याय मंत्रालय" }
      ],
      safetyDisclaimer: "आपत्कालीन परिस्थितीत केवळ ॲपवर अवलंबून राहू नका. AI प्रणाली ही मानवी उपचाराचा पर्याय नाही."
    },
    screen7: {
      guidanceTitle: "ऊब मदत मार्गदर्शन",
      guidanceSub: "तुमच्या चेक-इननुसार, ऊब सुचवते की येथून सुरुवात करा:",
      levels: {
        level1Title: "सपोर्ट १ — सेल्फ-हेल्प टूल्स",
        level1Desc: "मनातील सल बोलून मोकळे व्हा (लगेच नष्ट), खाजगी डायरी, किंवा मूडट्यून्स संगीत.",
        level2Title: "सपोर्ट २ — व्हॉलंटिअरशी बोला",
        level2Desc: "सायकोलॉजी विभागातील विद्यार्थ्यांशी १-ऑन-१ खाजगी चॅट. आवश्यकतेनुसार पुढील मदत.",
        level3Title: "सपोर्ट ३ — समुपदेशकांना भेटा",
        level3Desc: "कॉलेज-स्तरीय परवानाधारक समुपदेशन (उदा. मानस सेंटर) व पुढील काळजी."
      },
      exploreBtn: "सुचवलेली पातळी उघडा →"
    },
    level1: {
      title: "स्वतःसाठी थोडा वेळ द्या",
      tabLetItOut: "मनातील सल (Let It Out)",
      tabMoodTunes: "मूडट्यून्स (MoodTunes)",
      tabJournal: "खाजगी डायरी",
      recordInstruction: "मनातील भावना आवाजात रेकॉर्ड करा. ऐकल्यानंतर हा आवाज कायमचा नष्ट केला जातो.",
      permanentDeleteConfirm: "✓ तुमचा ऑडिओ मेमरीमधून कायमचा हटवला गेला आहे. शून्य बाइट्स शिल्लक.",
      journalPrompt: "आज डोक्यात जे काही विचार चालू आहेत ते मोकळेपणाने लिहा...",
      savedLocally: "तुमच्या फोनवर १००% सुरक्षितपणे साठवले आहे"
    },
    level2: {
      title: "तुम्ही एकटे नाही आहात",
      subtitle: "गोपनीय वातावरणात प्रशिक्षित पीअर व्हॉलंटिअरशी जोडा.",
      requestFormTitle: "पीअर व्हॉलंटिअर मदत विनंती",
      selectedTopic: "निवडलेला विषय",
      prefLanguage: "संवादाची भाषा",
      prefMode: "संवादाचे माध्यम",
      prefTime: "सोयीची वेळ",
      consentText: "मी माझी निवडलेली माहिती नियुक्त केलेल्या व्हॉलंटिअरसोबत शेअर करण्यास संमती देतो/देते.",
      submitRequestBtn: "मदत विनंती पाठवा",
      lifecycle: {
        step1: "विनंती पाठवली",
        step2: "व्हॉलंटिअर नियुक्त",
        step3: "व्हॉलंटिअरने स्वीकारले",
        step4: "खाजगी चॅट",
        step5: "अभिप्राय व समाप्त"
      },
      volunteerBoundaries: "व्हॉलंटिअर मार्गदर्शक तत्त्वे: न्याय न करता सहानुभूतीने ऐका. औषधे किंवा वैद्यकीय सल्ला देऊ नका. गंभीर धोका आढळल्यास लगेच समुपदेशकांना कळवा."
    },
    level3: {
      title: "व्यावसायिक समुपदेशकांशी संपर्क",
      subtitle: "परवानाधारक क्लिनिकल कौन्सिलरची भेट निश्चित करा.",
      counsellorA: {
        name: "डॉ. प्रतिभा देशमुख",
        specialization: "विद्यार्थी मानसिक आरोग्य व ताण निवारण",
        available: "उद्या, सकाळी १०:३०"
      },
      counsellorB: {
        name: "डॉ. आनंद जोशी",
        specialization: "अभ्यास व वैयक्तिक समस्या समुपदेशन",
        available: "आज, दुपारी ४:३०"
      },
      bookBtn: "भेट बुक करा",
      midnightTitle: "सध्या कोणताही समुपदेशक उपलब्ध नाही",
      midnightSub: "तुमची विनंती तात्काळ म्हणून नोंदवली आहे. पहिली उपलब्ध वेळ: उद्या सकाळी ८:३०.",
      whileYouWait: "भेट होईपर्यंत खालील साधने वापरा:",
      whileYouWaitTools: [
        "कॅम्पस आपत्कालीन क्रमांकावर संपर्क साधा",
        "मनातील सल (Let It Out) मध्ये तात्पुरता आवाज रेकॉर्ड करा",
        "MoodTunes बायनॉरॉल बीट्स ऐका",
        "खाजगी डायरीत भावना लिहा",
        "जवळच्या विश्वासू मित्राशी बोला"
      ]
    }
  },
  hi: {
    common: {
      appName: "ऊब (Ubb)",
      tagline: "हर विचार के लिए एक सुरक्षित जगह",
      back: "पीछे",
      continue: "आगे बढ़ें",
      save: "सहेजें",
      cancel: "रद्द करें",
      submit: "सबमिट करें",
      skip: "छोड़ें",
      home: "होम",
      talk: "बातचीत",
      progress: "प्रगति",
      selfCare: "आत्म-देखभाल",
      emergencySOS: "तत्काल सहायता चाहिए?",
      emergencySub: "24x7 कैंपस इमरजेंसी व Tele-MANAS 14416",
      rlsProtected: "RLS सुरक्षित · शून्य व्यक्तिगत जानकारी",
      permanentDeleteNotice: "आपकी ऑडियो रिकॉर्डिंग हमेशा के लिए हटा दी गई है।",
      wasThisHelpful: "क्या यह आपके लिए मददगार रहा?",
      reallyHelpful: "बहुत मददगार",
      good: "अच्छा",
      okay: "ठीक-ठाक",
      notGreat: "खास नहीं",
      stillNeedSupport: "मुझे अभी और मदद चाहिए"
    },
    screen1: {
      title: "ऊब (Ubb) में आपका स्वागत है",
      subtitle: "हर विचार के लिए एक सुरक्षित और अपनापन भरी जगह",
      studentBtn: "विद्यार्थी के रूप में आगे बढ़ें",
      studentSub: "गुमनाम · 100% निजी · नाम या फोन की आवश्यकता नहीं",
      volunteerBtn: "वॉलंटियर / काउंसलर लॉगिन",
      volunteerSub: "सपोर्ट कतार, मॉडरेशन और अपॉइंटमेंट देखें",
      privacyNotice: "अपनी बात रखने के लिए आपको नाम या फोन नंबर साझा करने की आवश्यकता नहीं है।"
    },
    screen2: {
      title: "आपकी निजी Ubb ID बन गई है",
      subtitle: "आप अपनी यात्रा जारी रखने के लिए इस ID का उपयोग कर सकते हैं।",
      saveNotice: "कृपया अपनी यह Ubb ID सुरक्षित रूप से नोट कर लें।",
      pinLabel: "वैकल्पिक 4-अंकों का निजी PIN बनाएं",
      pinPlaceholder: "••••",
      privacyPill: "कोई नाम नहीं · कोई नंबर नहीं · पूरी गोपनीयता",
      continueBtn: "डैशबोर्ड पर जाएं →",
      deleteDataNote: "आप सेटिंग्स से किसी भी समय अपना पूरा डेटा हटा सकते हैं।"
    },
    screen3: {
      welcome: "वापसी पर स्वागत है",
      quote: "आज ही सब कुछ हल करने की आवश्यकता नहीं है। एक छोटे कदम से शुरुआत करें।",
      pulseTitle: "ऊब पल्स (UbbPulse)",
      pulseDesc: "मूड चेक-इन करें और व्यक्तिगत मार्गदर्शन पाएं",
      letItOutTitle: "मन की बात (Let It Out)",
      letItOutDesc: "अस्थायी वॉयस या टेक्स्ट · सुनने के तुरंत बाद नष्ट",
      moodTunesTitle: "मूडट्यून्स (MoodTunes)",
      moodTunesDesc: "शांत संगीत, प्रकृति की ध्वनियां और बाइनॉरल बीट्स",
      journalTitle: "निजी डायरी (Journal)",
      journalDesc: "आपके डिवाइस पर 100% सुरक्षित रूप से सहेजे गए विचार",
      wallTitle: "सकारात्मक विचार (Wall of Thoughts)",
      wallDesc: "साथी छात्रों के प्रेरक संदेश पढ़ें और साझा करें",
      talkTitle: "किसी से बात करें (Talk to Someone)",
      talkDesc: "प्रशिक्षित मनोविज्ञान वॉलंटियर या काउंसलर से जुड़ें",
      journeyTitle: "मेरी यात्रा (My Journey)",
      journeyDesc: "अपने मूड के रुझान और पूर्व चेक-इन देखें"
    },
    screen4: {
      title: "आप अभी कैसा महसूस कर रहे हैं?",
      subtitle: "यह एक निजी चेक-इन है, कोई चिकित्सीय मूल्यांकन नहीं।",
      moods: {
        good: "अच्छा",
        calm: "शांत",
        sad: "उदास",
        anxious: "चिंतित",
        irritated: "चिड़चिड़ा",
        overwhelmed: "बहुत अधिक तनाव",
        numb: "सुन्न / कुछ समझ नहीं आ रहा",
        veryLow: "बहुत निराश",
        dontKnow: "पता नहीं",
        other: "अन्य",
        preferNotToSay: "बताना नहीं चाहते"
      },
      intensityTitle: "इस भावना की तीव्रता अभी कितनी महसूस हो रही है?",
      intensityLevels: {
        little: "थोड़ी सी",
        moderate: "मध्यम",
        strong: "तीव्र",
        veryStrong: "अत्यधिक तीव्र"
      },
      nextBtn: "आगे बढ़ें →"
    },
    screen5A: {
      title: "अब आप क्या करना चाहेंगे?",
      expressOpt: "खुद को व्यक्त करें",
      expressSub: "MoodTunes सुनें या निजी डायरी में लिखें",
      helpPeersOpt: "साथियों की मदद करें",
      helpPeersSub: "Wall of Thoughts पर कोई प्रेरक विचार साझा करें",
      activityOpt: "शांति गतिविधि का अभ्यास करें",
      activitySub: "4-7-8 श्वास व्यायाम या प्रकृति ध्वनियां",
      dashOpt: "डैशबोर्ड पर जाएं",
      wallPromptTitle: "अन्य छात्रों के लिए कोई प्रेरक संदेश लिखें",
      wallPromptDesc: "आपका संदेश गुमनाम रहेगा और समीक्षा के बाद वॉल पर दिखाई देगा।",
      starters: [
        "आज जिस बात ने मेरी मदद की वो थी...",
        "एक बात जो आज किसी को सुनने की जरूरत हो सकती है...",
        "मुझे खुद पर गर्व है क्योंकि..."
      ],
      postBtn: "गुमनाम रूप से पोस्ट करें",
      draftBtn: "ड्राफ्ट सहेजें",
      moderationStatus: "सुरक्षा जांच → वॉलंटियर समीक्षा → प्रकाशित"
    },
    screen5B: {
      title: "आप किस विषय में सहायता चाहते हैं?",
      subtitle: "लागू होने वाले सभी विकल्प चुनें। एक से अधिक चुन सकते हैं।",
      topics: [
        "पढ़ाई और परीक्षा",
        "करियर",
        "भविष्य की अनिश्चितता",
        "परिवार",
        "मित्र",
        "रिश्ते",
        "आर्थिक तनाव",
        "अकेलापन",
        "आत्मविश्वास",
        "नींद या दिनचर्या",
        "अन्य",
        "पता नहीं"
      ],
      moreDetailsLabel: "क्या आप थोड़ा और बताना चाहेंगे? (वैकल्पिक)",
      moreDetailsPlaceholder: "यहाँ कुछ शब्द लिख सकते हैं... चाहें तो इसे छोड़ भी सकते हैं।"
    },
    screen6: {
      title: "तत्काल सुरक्षा जांच",
      subtitle: "सहायता की ओर बढ़ने से पहले आइए सुनिश्चित करें कि आप सुरक्षित हैं।",
      question: "क्या आप किसी खतरे में हैं या खुद को नुकसान पहुंचाने का विचार आ रहा है?",
      options: {
        yes: "हाँ, मुझे तुरंत मदद चाहिए",
        no: "नहीं",
        notSure: "निश्चित नहीं हूँ",
        preferNotToAnswer: "उत्तर नहीं देना चाहते"
      },
      urgentTitle: "आपको तुरंत प्रत्यक्ष मानवीय सहायता की आवश्यकता है",
      urgentSub: "कृपया तुरंत कैंपस आपातकालीन सेवाओं या राष्ट्रीय हेल्पलाइन से संपर्क करें।",
      urgentContacts: [
        { name: "कैंपस आपातकालीन काउंसलर हेल्पलाइन", number: "+91 8000 123 456", note: "कैंपस में 24x7 उपलब्ध" },
        { name: "Tele-MANAS (भारत सरकार)", number: "14416", note: "टोल-फ्री 24x7 मानसिक स्वास्थ्य सहायता" },
        { name: "KIRAN राष्ट्रीय हेल्पलाइन", number: "1800-599-0019", note: "सामाजिक न्याय मंत्रालय" }
      ],
      safetyDisclaimer: "आपातकाल में केवल ऐप पर निर्भर न रहें। AI प्रणाली पेशेवर मानवीय देखभाल का विकल्प नहीं है।"
    },
    screen7: {
      guidanceTitle: "ऊब सहायता मार्गदर्शन",
      guidanceSub: "आपके चेक-इन के आधार पर, ऊब सुझाव देती है कि यहाँ से शुरुआत करें:",
      levels: {
        level1Title: "सपोर्ट १ — सेल्फ-हेल्प टूल्स",
        level1Desc: "ऑडियो वेंट (तुरंत नष्ट), निजी डायरी, या मूडट्यून्स संगीत चिकित्सा।",
        level2Title: "सपोर्ट २ — स्वयंसेवक से बात करें",
        level2Desc: "मनोविज्ञान विभाग के सहपाठियों से 1-ऑन-1 निजी चैट। आवश्यकता पड़ने पर आगे मार्गदर्शन।",
        level3Title: "सपोर्ट ३ — काउंसलर से मिलें",
        level3Desc: "लाइसेंस प्राप्त कॉलेज-स्तरीय सहायता (उदा. मानस काउंसलिंग सेंटर) और निरंतर देखभाल।"
      },
      exploreBtn: "सुझाए गए स्तर पर जाएं →"
    },
    level1: {
      title: "खुद के लिए एक शांत पल निकालें",
      tabLetItOut: "मन की बात (Let It Out)",
      tabMoodTunes: "मूडट्यून्स (MoodTunes)",
      tabJournal: "निजी डायरी",
      recordInstruction: "अपनी बात वॉयस में रिकॉर्ड करें। सुनने के तुरंत बाद यह पूरी तरह नष्ट हो जाती है।",
      permanentDeleteConfirm: "✓ आपकी ऑडियो रिकॉर्डिंग हमेशा के लिए हटा दी गई है। शून्य बाइट्स शेष।",
      journalPrompt: "आज जो भी विचार मन में चल रहे हैं उन्हें खुलकर लिखें...",
      savedLocally: "आपके फोन पर 100% सुरक्षित रूप से सहेजा गया"
    },
    level2: {
      title: "आप अकेले नहीं हैं",
      subtitle: "सुरक्षित वातावरण में प्रशिक्षित साथी वॉलंटियर से जुड़ें।",
      requestFormTitle: "वॉलंटियर सहायता अनुरोध",
      selectedTopic: "चयनित विषय",
      prefLanguage: "पसंदीदा भाषा",
      prefMode: "बातचीत का माध्यम",
      prefTime: "सुविधाजनक समय",
      consentText: "मैं अपनी चयनित चेक-इन जानकारी को नियुक्त वॉलंटियर के साथ साझा करने की सहमति देता/देती हूँ।",
      submitRequestBtn: "सहायता अनुरोध भेजें",
      lifecycle: {
        step1: "अनुरोध भेजा गया",
        step2: "वॉलंटियर नियुक्त",
        step3: "वॉलंटियर ने स्वीकार किया",
        step4: "निजी चैट",
        step5: "प्रतिक्रिया व समाप्त"
      },
      volunteerBoundaries: "वॉलंटियर दिशानिर्देश: बिना किसी पूर्वाग्रह के सहानुभूति से सुनें। कोई दवा या चिकित्सीय सलाह न दें। सुरक्षा का गंभीर जोखिम होने पर तुरंत काउंसलर को सूचित करें।"
    },
    level3: {
      title: "पेशेवर सहायता से जुड़ें",
      subtitle: "लाइसेंस प्राप्त काउंसलर के साथ अपॉइंटमेंट बुक करें।",
      counsellorA: {
        name: "डॉ. प्रतिभा देशमुख",
        specialization: "छात्र मानसिक स्वास्थ्य और तनाव प्रबंधन",
        available: "कल, सुबह 10:30"
      },
      counsellorB: {
        name: "डॉ. आनंद जोशी",
        specialization: "अकादमिक और व्यक्तिगत परामर्श",
        available: "आज, शाम 4:30"
      },
      bookBtn: "अपॉइंटमेंट बुक करें",
      midnightTitle: "अभी कोई काउंसलर उपलब्ध नहीं है",
      midnightSub: "आपका अनुरोध अत्यंत महत्वपूर्ण के रूप में दर्ज है। पहली उपलब्ध अपॉइंटमेंट: कल सुबह 8:30।",
      whileYouWait: "अपॉइंटमेंट का इंतज़ार करते समय इन टूल्स का उपयोग करें:",
      whileYouWaitTools: [
        "कैंपस आपातकालीन नंबर पर संपर्क करें",
        "Let It Out में अस्थायी वॉयस रिकॉर्ड करें",
        "MoodTunes बाइनॉरल बीट्स सुनें",
        "निजी डायरी में विचार लिखें",
        "पास के किसी भरोसेमंद व्यक्ति से बात करें"
      ]
    }
  }
};

export const getTranslation = (lang = 'en') => {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
};
