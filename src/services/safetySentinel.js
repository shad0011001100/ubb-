/**
 * Ubb (ऊब) - Real-Time Safety Sentinel & Severity-Graded NLP Classifier
 * 
 * Multilingual, client-side zero-latency threat detection:
 * - English, Marathi (मराठी), Hindi (हिंदी), and Romanized/Hinglish.
 * - Detects acute self-harm, suicide ideation, clinical distress, and panic breakdowns.
 * - Graded 4-Tier Triage Engine: Redirects strictly to Emergency Lifelines, Support Level 3, or Support Level 2.
 * - 0ms latency, works 100% offline, Zero PII.
 */

// 1. LEVEL 4: ACUTE CRISIS & SUICIDE PATTERNS (Immediate 24x7 Lifeline Redirection)
const ACUTE_CRISIS_PATTERNS = [
  // English
  /\b(suicide|suicidal|kill\s+(myself|me)|end\s+my\s+life|want\s+to\s+die|wanna\s+die|hanging\s+myself|hang\s+myself|overdose|slit\s+(my\s+)?wrist|cut\s+(my\s+)?wrist|jump\s+off|better\s+off\s+dead|no\s+point\s+in\s+living|take\s+my\s+(own\s+)?life|dont\s+want\s+to\s+live|don't\s+want\s+to\s+live|goodbye\s+cruel\s+world|poison\s+myself|shoot\s+myself|drink\s+poison)\b/i,
  
  // Romanized Hindi / Marathi (Hinglish / Marathlish)
  /\b(mar\s+jau|mar\s+jaunga|mar\s+jaungi|marne\s+ka\s+man|marna\s+chahta|marna\s+chahti|aatmhatya|atmarpan|khudkushi|jaan\s+de\s+dunga|jaan\s+de\s+dungi|jeene\s+ka\s+mann\s+nahi|zeher\s+kha|jeev\s+dyava|jeev\s+dene|marun\s+jaavasa|fasi\s+ghene|khud\s+ko\s+khatam)\b/i,
  
  // Devanagari Hindi & Marathi (हिंदी / मराठी)
  /(आत्महत्या|खुदकुशी|मर\s*जाऊ|मरना\s*चाहता|मरना\s*चाहती|जान\s*दे\s*दूंगा|जीने\s*की\s*इच्छा\s*नहीं|जहर\s*खाना|फांसी|जीव\s*द्यावा\s*वाटतो|मरून\s*जावे|हात\s*कापून|जीवन\s*संपवतो|गळफास|विष\s*पिऊन)/i
];

// 2. LEVEL 3: SEVERE CLINICAL DEPRESSION & SELF-HARM INTENT (Redirect to Support 3 Counsellor)
const CLINICAL_SEVERE_PATTERNS = [
  // English
  /\b(can't\s+take\s+this|cant\s+take\s+this|give\s+up\s+on\s+everything|self\s*harm|harming\s+myself|hurting\s+myself|cut\s+myself|cutting\s+myself|punish\s+myself|deep\s+hopelessness|trapped|exhausted\s+from\s+living|nobody\s+would\s+care\s+if\s+i'm\s+gone|worthless|severe\s+depression|mental\s+breakdown)\b/i,
  
  // Romanized Hindi / Marathi
  /\b(sab\s+khatam|kuch\s+nahi\s+bacha|thak\s+gaya\s+hoon|sarva\s+sampala|khud\s+ko\s+chot|haath\s+kaatna|apne\s+aap\s+ko\s+takleef)\b/i,
  
  // Devanagari Hindi & Marathi
  /(सब\s*खत्म|थक\s*गया\s*हूँ|काहीच\s*उरले\s*नाही|सगळं\s*संपलं|स्वतःला\s*दुखापत|स्वतःला\s*त्रास|असह्य\s*वेदना|तीव्र\s*निराशा)/i
];

// 3. LEVEL 2: HIGH PANIC, ANXIETY & ACADEMIC BREAKDOWN (Redirect to Support 2 Volunteer Chat)
const MODERATE_PEER_PATTERNS = [
  // English
  /\b(panic\s+attack|hyperventilating|can't\s+breathe|cant\s+breathe|crying\s+unstoppably|crying\s+all\s+day|shaking\s+from\s+fear|overwhelming\s+pressure|failing\s+everything|so\s+isolated|nobody\s+to\s+talk|lonely\s+in\s+hostel)\b/i,
  
  // Romanized Hindi / Marathi
  /\b(bahut\s+dar\s+lag\s+raha|saans\s+nahi\s+aa\s+rahi|ro\s+raha\s+hoon|ro\s+rahi\s+hoon|bahut\s+akelapan|hostel\s+mein\s+akela|khup\s+ekta\s+vattoy)\b/i,
  
  // Devanagari Hindi & Marathi
  /(पैनिक\s*अटैक|सांस\s*फूल\s*रही|रो\s*रहा\s*हूँ|रो\s*रही\s*हूँ|खूप\s*भीती\s*वाटते|खूप\s*एकटं\s*वाटतंय|अतिशय\s*घाबरलोय)/i
];

export const safetySentinel = {
  /**
   * Evaluates text for safety triggers and returns appropriate clinical redirection tier
   * @param {string} text - User input string
   * @returns {Object} - Triage evaluation result
   */
  analyzeText(text) {
    if (!text || typeof text !== 'string') {
      return {
        isCrisis: false,
        severity: 'SAFE',
        targetTier: 1,
        targetScreen: 'level1_express',
        matchedKeyword: null
      };
    }

    const cleanText = text.trim();

    // 1. Check Level 4: Acute Suicide / Life Threat
    for (const pattern of ACUTE_CRISIS_PATTERNS) {
      const match = cleanText.match(pattern);
      if (match) {
        return {
          isCrisis: true,
          severity: 'ACUTE_CRISIS',
          targetTier: 4,
          targetScreen: 'emergency_crisis_redirect',
          matchedKeyword: match[0],
          title: '🚨 Immediate Safety Support Required',
          subtitle: 'We detected words related to acute distress or self-harm. Your life and safety are our highest priority.',
          recommendedAction: 'EMERGENCY_HELPLINES_AND_CRISIS_CARE',
          hotlines: [
            { name: 'National Tele-MANAS Lifeline', number: '14416', tel: 'tel:14416', available: '24x7 Free & Confidential' },
            { name: 'KIRAN National Mental Health', number: '1800-599-0019', tel: 'tel:18005990019', available: '24x7 Govt of India' },
            { name: 'AASRA Suicide Prevention Helpline', number: '91-9820466726', tel: 'tel:919820466726', available: '24x7 Confidential' }
          ]
        };
      }
    }

    // 2. Check Level 3: Severe Clinical Depression & Self-Harm Urge
    for (const pattern of CLINICAL_SEVERE_PATTERNS) {
      const match = cleanText.match(pattern);
      if (match) {
        return {
          isCrisis: true,
          severity: 'CLINICAL_SEVERE',
          targetTier: 3,
          targetScreen: 'emergency_crisis_redirect',
          matchedKeyword: match[0],
          title: '🩺 Priority Clinical Support Recommended',
          subtitle: 'You appear to be carrying deep emotional pain. Connecting with our licensed campus counsellor or crisis support is strongly advised.',
          recommendedAction: 'COUNSELLOR_AND_CRISIS_MATCH',
          hotlines: [
            { name: 'Tele-MANAS Hotline', number: '14416', tel: 'tel:14416', available: '24x7 Support' },
            { name: 'KIRAN Helpline', number: '1800-599-0019', tel: 'tel:18005990019', available: '24x7 Govt Helpline' }
          ]
        };
      }
    }

    // 3. Check Level 2: Intense Anxiety, Panic, or Breakdown
    for (const pattern of MODERATE_PEER_PATTERNS) {
      const match = cleanText.match(pattern);
      if (match) {
        return {
          isCrisis: true,
          severity: 'MODERATE_PEER',
          targetTier: 2,
          targetScreen: 'emergency_crisis_redirect',
          matchedKeyword: match[0],
          title: '🫂 Peer Support & Human Connection',
          subtitle: 'You do not have to carry this overwhelming pressure alone. A trained psychology senior is online to listen right now.',
          recommendedAction: 'PEER_VOLUNTEER_CHAT',
          hotlines: [
            { name: 'Tele-MANAS Hotline', number: '14416', tel: 'tel:14416', available: '24x7 Free' }
          ]
        };
      }
    }

    // 4. Safe State
    return {
      isCrisis: false,
      severity: 'SAFE',
      targetTier: 1,
      targetScreen: 'level1_express',
      matchedKeyword: null,
      title: 'Self-Care & Exploration',
      subtitle: 'Standard wellness tools available.',
      recommendedAction: 'NONE',
      hotlines: []
    };
  }
};
