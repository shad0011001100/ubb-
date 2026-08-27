/**
 * Ubb (ऊब) - Real-Time Safety Sentinel & Crisis NLP Classifier
 * 
 * Multilingual, client-side zero-latency threat detection:
 * - English, Marathi (मराठी), Hindi (हिंदी), and Romanized/Hinglish (mar jau, aatmhatya)
 * - Detects acute self-harm, suicide ideation, and intent to harm.
 * - 0ms latency, works 100% offline, Zero PII.
 */

// 1. ACUTE CRISIS KEYWORDS (Immediate Tele-MANAS 14416 Trigger)
const ACUTE_CRISIS_PATTERNS = [
  // English
  /\b(suicide|suicidal|kill\s+(myself|me)|end\s+my\s+life|want\s+to\s+die|wanna\s+die|hanging\s+myself|hang\s+myself|overdose|slit\s+(my\s+)?wrist|cut\s+(my\s+)?wrist|jump\s+off|better\s+off\s+dead|no\s+point\s+in\s+living|take\s+my\s+(own\s+)?life|dont\s+want\s+to\s+live|don't\s+want\s+to\s+live|goodbye\s+cruel\s+world|poison\s+myself)\b/i,
  
  // Romanized Hindi / Marathi (Hinglish / Marathlish)
  /\b(mar\s+jau|mar\s+jaunga|mar\s+jaungi|marne\s+ka\s+man|marna\s+chahta|marna\s+chahti|aatmhatya|atmarpan|khudkushi|jaan\s+de\s+dunga|jaan\s+de\s+dungi|jeene\s+ka\s+mann\s+nahi|zeher\s+kha|jeev\s+dyava|jeev\s+dene|marun\s+jaavasa|fasi\s+ghene)\b/i,
  
  // Devanagari Hindi & Marathi (हिंदी / मराठी)
  /(आत्महत्या|खुदकुशी|मर\s*जाऊ|मरना\s*चाहता|मरना\s*चाहती|जान\s*दे\s*दूंगा|जीने\s*की\s*इच्छा\s*नहीं|जहर\s*खाना|फांसी|जीव\s*द्यावा\s*वाटतो|मरून\s*जावे|हात\s*कापून|जीवन\s*संपवतो|गळफास)/i
];

// 2. MODERATE DISTRESS PATTERNS (Proactive Care & Volunteer Escalation)
const ELEVATED_DISTRESS_PATTERNS = [
  /\b(can't\s+take\s+this|cant\s+take\s+this|losing\s+my\s+mind|give\s+up\s+on\s+everything|worthless|nobody\s+cares|deep\s+hopelessness|trapped|exhausted\s+from\s+living)\b/i,
  /\b(sab\s+khatam|kuch\s+nahi\s+bacha|thak\s+gaya\s+hoon|sarva\s+sampala)\b/i,
  /(सब\s*खत्म|थक\s*गया\s*हूँ|काहीच\s*उरले\s*नाही|सगळं\s*संपलं)/i
];

export const safetySentinel = {
  /**
   * Evaluates text for safety triggers
   * @param {string} text - User input string
   * @returns {Object} - { isCrisis: boolean, severity: 'ACUTE' | 'MODERATE' | 'SAFE', matchedPattern: string | null }
   */
  analyzeText(text) {
    if (!text || typeof text !== 'string') {
      return { isCrisis: false, severity: 'SAFE', matchedPattern: null };
    }

    const cleanText = text.trim();

    // Check for Acute Crisis
    for (const pattern of ACUTE_CRISIS_PATTERNS) {
      const match = cleanText.match(pattern);
      if (match) {
        return {
          isCrisis: true,
          severity: 'ACUTE',
          matchedPattern: match[0],
          recommendedAction: 'SHOW_IMMEDIATE_SOS_MODAL',
          hotlines: [
            { name: 'Tele-MANAS (Govt of India)', number: '14416', tel: 'tel:14416' },
            { name: 'KIRAN National Mental Health', number: '1800-599-0019', tel: 'tel:18005990019' }
          ]
        };
      }
    }

    // Check for Elevated Distress
    for (const pattern of ELEVATED_DISTRESS_PATTERNS) {
      const match = cleanText.match(pattern);
      if (match) {
        return {
          isCrisis: false,
          severity: 'MODERATE',
          matchedPattern: match[0],
          recommendedAction: 'PROMPT_VOLUNTEER_OR_BREATHING',
          hotlines: []
        };
      }
    }

    return {
      isCrisis: false,
      severity: 'SAFE',
      matchedPattern: null,
      recommendedAction: 'NONE',
      hotlines: []
    };
  }
};
