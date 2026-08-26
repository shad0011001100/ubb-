import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, ShieldCheck, ArrowRight, ChevronRight, Edit3 } from 'lucide-react';
import { getTranslation } from '../../services/translations';

// =======================================================================
// EXACT QUESTION & FOLLOW-UP DECISION TREE WITH "OTHER (DESCRIBE)"
// =======================================================================

export const CHECKIN_REASONS = {
  happy: [
    { id: 'acad_good', en: 'Did well academically', mr: 'अभ्यासात उत्तम कामगिरी झाली', hi: 'पढ़ाई में अच्छा प्रदर्शन रहा' },
    { id: 'friends_good', en: 'Good time with friends or family', mr: 'मित्र किंवा कुटुंबासोबत चांगला वेळ गेला', hi: 'दोस्तों या परिवार के साथ अच्छा समय बीता' },
    { id: 'personal_good', en: 'Something personal', mr: 'काहीतरी वैयक्तिक आनंददायक घडले', hi: 'कुछ व्यक्तिगत अच्छा हुआ' },
    { id: 'general_good', en: 'Just a good day', mr: 'फक्त एक छान दिवस', hi: 'बस एक अच्छा दिन' },
    { id: 'other_happy', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  calm: [
    { id: 'peace_routine', en: 'Peaceful routine', mr: 'शांत दिनचर्या', hi: 'शांत दिनचर्या' },
    { id: 'mind_clear', en: 'Clear and quiet mind', mr: 'शांत आणि स्थिर मन', hi: 'शांत और स्पष्ट मन' },
    { id: 'rested', en: 'Well-rested and balanced', mr: 'योग्य विश्रांती आणि समतोल', hi: 'पूरी नींद और संतुलन' },
    { id: 'nature_time', en: 'Relaxing environment', mr: 'आल्हाददायक वातावरण', hi: 'सुकून भरा माहौल' },
    { id: 'other_calm', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  good: [
    { id: 'acad_good', en: 'Did well academically', mr: 'अभ्यासात उत्तम कामगिरी झाली', hi: 'पढ़ाई में अच्छा प्रदर्शन रहा' },
    { id: 'friends_good', en: 'Good time with friends or family', mr: 'मित्र किंवा कुटुंबासोबत चांगला वेळ गेला', hi: 'दोस्तों या परिवार के साथ अच्छा समय बीता' },
    { id: 'personal_good', en: 'Something personal', mr: 'काहीतरी वैयक्तिक आनंददायक घडले', hi: 'कुछ व्यक्तिगत अच्छा हुआ' },
    { id: 'general_good', en: 'Just a good day', mr: 'फक्त एक छान दिवस', hi: 'बस एक अच्छा दिन' },
    { id: 'other_good', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  okay: [
    { id: 'neutral_day', en: 'Fairly neutral day', mr: 'एक सामान्य दिवस', hi: 'एक सामान्य दिन' },
    { id: 'mixed_feelings', en: 'Mixed feelings', mr: 'मिश्र भावना', hi: 'मिली-जुली भावनाएं' },
    { id: 'routine', en: 'Just going through the routine', mr: 'नेहमीची दिनचर्या चालू आहे', hi: 'बस दिनचर्या चल रही है' },
    { id: 'nothing_major', en: 'Nothing major either way', mr: 'काही विशेष घडलेले नाही', hi: 'कुछ खास नहीं' },
    { id: 'other_okay', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  sad: [
    { id: 'acad_pressure', en: 'Academic pressure', mr: 'अभ्यासाचा ताण', hi: 'पढ़ाई का दबाव' },
    { id: 'family_issues', en: 'Family issues', mr: 'कुटुंबातील अडचणी किंवा अपेक्षा', hi: 'पारिवारिक समस्याएं' },
    { id: 'breakup', en: 'Relationship / breakup', mr: 'नातेसंबंध किंवा ब्रेकअप', hi: 'रिश्ते या ब्रेकअप' },
    { id: 'loneliness', en: 'Loneliness & isolation', mr: 'एकटेपणा किंवा घराची आठवण', hi: 'अकेलापन और उदासी' },
    { id: 'other_sad', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  anxious: [
    { id: 'exams_deadlines', en: 'Exams or deadlines', mr: 'परीक्षा किंवा प्रोजेक्ट डेडलाईन्स', hi: 'परीक्षाएं या डेडलाइन्स' },
    { id: 'financial_worries', en: 'Financial worries', mr: 'आर्थिक किंवा फी चा ताण', hi: 'आर्थिक चिंताएं' },
    { id: 'family_expectations', en: 'Family expectations', mr: 'कुटुंबाच्या अपेक्षांचे ओझे', hi: 'परिवार की उम्मीदें' },
    { id: 'career_uncertainty', en: 'Career / future uncertainty', mr: 'करिअर आणि भविष्याची अनिश्चितता', hi: 'करियर या भविष्य की चिंता' },
    { id: 'other_anxious', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  stressed: [
    { id: 'exams_deadlines', en: 'Exams or deadlines', mr: 'परीक्षा किंवा प्रोजेक्ट डेडलाईन्स', hi: 'परीक्षाएं या डेडलाइन्स' },
    { id: 'financial_worries', en: 'Financial worries', mr: 'आर्थिक किंवा फी चा ताण', hi: 'आर्थिक चिंताएं' },
    { id: 'family_expectations', en: 'Family expectations', mr: 'कुटुंबाच्या अपेक्षांचे ओझे', hi: 'परिवार की उम्मीदें' },
    { id: 'career_uncertainty', en: 'Career / future uncertainty', mr: 'करिअर आणि भविष्याची अनिश्चितता', hi: 'करियर या भविष्य की चिंता' },
    { id: 'other_stressed', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  overwhelmed: [
    { id: 'exams_deadlines', en: 'Too many deadlines piling up', mr: 'अनेक डेडलाईन्स एकत्र साचल्या आहेत', hi: 'बहुत सारे असाइनमेंट का दबाव' },
    { id: 'sleep_deprived', en: 'Exhaustion & lack of sleep', mr: 'अपुरा झोप व प्रचंड थकवा', hi: 'नींद की कमी और थकान' },
    { id: 'family_expectations', en: 'Pressure from multiple sides', mr: 'सर्व बाजूंनी येणारा एकत्र ताण', hi: 'चारों तरफ से बढ़ता दबाव' },
    { id: 'doing_alone', en: 'Feeling like doing everything alone', mr: 'सगळं एकट्यानेच सांभाळावे लागत आहे', hi: 'सब कुछ अकेले संभालना पड़ रहा है' },
    { id: 'other_overwhelmed', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  irritated: [
    { id: 'roommate_friction', en: 'Roommate or hostel friction', mr: 'रूममेट किंवा हॉस्टेलमधील वाद', hi: 'रूममेट या हॉस्टल में विवाद' },
    { id: 'unheard', en: 'Feeling unheard or disrespected', mr: 'माझे कोणी ऐकत नाही अशी भावना', hi: 'अनसुना महसूस होना' },
    { id: 'burnout_fatigue', en: 'Exhaustion from constant stress', mr: 'सततच्या ताणामुळे झालेली चिडचिड', hi: 'लगातार तनाव से चिड़चिड़ापन' },
    { id: 'other_irritated', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  numb: [
    { id: 'feeling_while', en: 'Been feeling this a while', mr: 'खूप दिवसांपासून असे जाणवतेय', hi: 'काफी समय से ऐसा महसूस हो रहा है' },
    { id: 'recent_event', en: 'Something happened recently', mr: 'नुकतीच काही घटना घडली आहे', hi: 'हाल ही में कुछ हुआ है' },
    { id: 'not_sure_why', en: 'Not sure why / just feel flat', mr: 'कारण समजत नाही / मन शून्य वाटते', hi: 'वजह नहीं पता / मन सुन्न है' },
    { id: 'other_numb', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  very_low: [
    { id: 'hopeless', en: 'Feeling deeply low and exhausted', mr: 'खूप जास्त थकवा व निराशा', hi: 'बहुत गहरी निराशा और थकान' },
    { id: 'academic_failure', en: 'Fear of failing or disappointing everyone', mr: 'अपयशाची आणि अपेक्षेची भीती', hi: 'असफलता का गहरा डर' },
    { id: 'isolated_low', en: 'Complete isolation with no one to talk to', mr: 'बोलण्यासाठी कोणीही जवळ नसणे', hi: 'बिलकुल अकेले पड़ जाना' },
    { id: 'other_low', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ],
  dont_know: [
    { id: 'general_flat', en: 'Just feel flat most days', mr: 'दिवसभर काहीच उत्साह वाटत नाही', hi: 'दिनभर कोई उत्साह नहीं रहता' },
    { id: 'mind_racing', en: 'Too many mixed thoughts', mr: 'डोक्यात एकाच वेळी अनेक विचार आहेत', hi: 'दिमाग में बहुत सारे विचार उलझे हैं' },
    { id: 'physically_tired', en: 'Physically tired and drained', mr: 'शरीर आणि मन दोन्ही थकले आहे', hi: 'शारीरिक और मानसिक रूप से थका हुआ' },
    { id: 'other_dont_know', isOther: true, en: 'Other (describe)', mr: 'इतर (थोडक्यात सांगा)', hi: 'अन्य (संक्षेप में बताएं)' }
  ]
};

export const CHECKIN_SUBREASONS = {
  'acad_pressure': [
    { id: 'sub_1', en: 'Upcoming exams', mr: 'जवळ आलेली परीक्षा', hi: 'आगामी परीक्षाएं' },
    { id: 'sub_2', en: 'Multiple deadlines at once', mr: 'एकाच वेळी अनेक डेडलाईन्स', hi: 'एक साथ कई डेडलाइन्स' },
    { id: 'sub_3', en: 'Falling behind in class', mr: 'अभ्यासात मागे पडल्याची भीती', hi: 'क्लास में पीछे छूटने का डर' },
    { id: 'sub_4', en: 'Comparing myself to others', mr: 'इतरांशी तुलना करताना वाटणारा न्यूनगंड', hi: 'दूसरों से तुलना करने पर हीन भावना' },
    { id: 'sub_acad_other', isOther: true, en: 'Other academic concern (describe)', mr: 'इतर शैक्षणिक समस्या (थोडक्यात सांगा)', hi: 'अन्य शैक्षणिक समस्या (संक्षेप में बताएं)' }
  ],
  'family_issues': [
    { id: 'sub_5', en: 'Family expectations', mr: 'कुटुंबाच्या मोठ्या अपेक्षा', hi: 'परिवार की बड़ी उम्मीदें' },
    { id: 'sub_6', en: 'Conflict at home', mr: 'घरातील वाद किंवा तणाव', hi: 'घर में मनमुटाव या झगड़ा' },
    { id: 'sub_7', en: 'Financial strain at home', mr: 'घरातील आर्थिक चणचण', hi: 'घर की आर्थिक तंगी' },
    { id: 'sub_8', en: 'Being away from family', mr: 'घरापासून दूर राहण्याचा ताण', hi: 'परिवार से दूर रहने की परेशानी' },
    { id: 'sub_fam_other', isOther: true, en: 'Other family issue (describe)', mr: 'इतर कौटुंबिक अडचण (थोडक्यात सांगा)', hi: 'अन्य पारिवारिक समस्या (संक्षेप में बताएं)' }
  ],
  'breakup': [
    { id: 'sub_9', en: 'A recent breakup', mr: 'नुकताच झालेला ब्रेकअप', hi: 'हाल ही में हुआ ब्रेकअप' },
    { id: 'sub_10', en: 'Ongoing relationship conflict', mr: 'नात्यातील सततचे वाद', hi: 'रिश्ते में लगातार तनाव' },
    { id: 'sub_11', en: 'Feeling unseen or unheard', mr: 'कोणी समजून घेत नाहीये', hi: 'अनदेखा महसूस होना' },
    { id: 'sub_12', en: 'Long-distance strain', mr: 'लांब राहण्यामुळे आलेला ताण', hi: 'लॉन्ग-डिस्टेंस का तनाव' },
    { id: 'sub_rel_other', isOther: true, en: 'Other relationship concern (describe)', mr: 'इतर नातेसंबंधातील बाब (थोडक्यात सांगा)', hi: 'अन्य व्यक्तिगत रिश्ता (संक्षेप में बताएं)' }
  ],
  'loneliness': [
    { id: 'sub_13', en: 'New to campus or city', mr: 'कॅम्पस किंवा शहरात नवीन आहे', hi: 'कैंपस या शहर में नया होना' },
    { id: 'sub_14', en: "Haven't made close friends yet", mr: 'अजून जवळचे मित्र मिळालेले नाहीत', hi: 'अभी तक गहरे दोस्त नहीं बने' },
    { id: 'sub_15', en: 'Feeling left out of a group', mr: 'ग्रुपमधून वगळल्यासारखे वाटते', hi: 'ग्रुप से अलग-थलग महसूस होना' },
    { id: 'sub_16', en: 'Missing home and comfort', mr: 'घराची तीव्र आठवण येतेय', hi: 'घर की बहुत याद आना' },
    { id: 'sub_lone_other', isOther: true, en: 'Other personal feeling (describe)', mr: 'इतर वैयक्तिक भावना (थोडक्यात सांगा)', hi: 'अन्य व्यक्तिगत भावना (संक्षेप में बताएं)' }
  ],
  'exams_deadlines': [
    { id: 'sub_17', en: 'One big upcoming exam', mr: 'समोर असलेली मोठी महत्त्वाची परीक्षा', hi: 'सामने खड़ी बड़ी परीक्षा' },
    { id: 'sub_18', en: 'Too many deadlines at once', mr: 'एकाच वेळी अनेक असाइनमेंट्स', hi: 'एक साथ बहुत सारे प्रोजेक्ट्स' },
    { id: 'sub_19', en: 'Feeling behind on the syllabus', mr: 'सिलॅबस खूप बाकी राहिला आहे', hi: 'सिलेबस में बहुत पीछे होना' },
    { id: 'sub_20', en: 'Fear of failing', mr: 'नापास होण्याची भीती', hi: 'फेल होने का गहरा डर' },
    { id: 'sub_exam_other', isOther: true, en: 'Other exam pressure (describe)', mr: 'इतर परीक्षेचा ताण (थोडक्यात सांगा)', hi: 'अन्य परीक्षा संबंधी तनाव (संक्षेप में बताएं)' }
  ],
  'financial_worries': [
    { id: 'sub_21', en: 'Tuition or college fees', mr: 'कॉलेज किंवा ट्युशन फी ची चिंता', hi: 'कॉलेज या ट्यूशन फीस की चिंता' },
    { id: 'sub_22', en: 'Day-to-day expenses', mr: 'दररोजचा खर्च भागवणे कठीण जातेय', hi: 'दैनिक खर्चों का तनाव' },
    { id: 'sub_23', en: "Family's financial pressure", mr: 'कुटुंबावर पडणारा आर्थिक भार', hi: 'परिवार का आर्थिक दबाव' },
    { id: 'sub_24', en: 'Job or internship pressure', mr: 'पार्ट-टाईम जॉब किंवा इंटर्नशिप शोधणे', hi: 'इंटर्नशिप या जॉब का दबाव' }
  ],
  'family_expectations': [
    { id: 'sub_25', en: 'Pressure over career choice', mr: 'करिअर निवडीबाबत घरचा दबाव', hi: 'करियर चुनने को लेकर दबाव' },
    { id: 'sub_26', en: 'Comparison to siblings or relatives', mr: 'नातेवाईक किंवा भावा-बहिणींशी तुलना', hi: 'रिश्तेदारों या भाई-बहनों से तुलना' },
    { id: 'sub_27', en: 'Fear of disappointing them', mr: 'त्यांना निराश करण्याची भीती', hi: 'उन्हें निराश करने का डर' },
    { id: 'sub_28', en: 'Constant pressure to perform', mr: 'सतत सर्वोत्तम कामगिरी करण्याचा ताण', hi: 'लगातार टॉप करने का तनाव' }
  ],
  'career_uncertainty': [
    { id: 'sub_29', en: "Don't know what's next", mr: 'पुढे काय करावे समजत नाहीये', hi: 'आगे क्या करना है समझ नहीं आ रहा' },
    { id: 'sub_30', en: 'Job market & recession worries', mr: 'नोकरी मिळण्याबाबत चिंता', hi: 'जॉब मार्केट और मंदी की चिंता' },
    { id: 'sub_31', en: 'Feeling I chose the wrong path', mr: 'चुकीचा कोर्स निवडला असे वाटतेय', hi: 'गलत फील्ड चुन लेने का अहसास' },
    { id: 'sub_32', en: 'Placement & package pressure', mr: 'कॅम्पस प्लेसमेंटचे दडपण', hi: 'कैंपस प्लेसमेंट का दबाव' }
  ],
  'feeling_while': [
    { id: 'sub_33', en: 'A few weeks now', mr: 'काही आठवड्यांपासून', hi: 'कुछ हफ्तों से' },
    { id: 'sub_34', en: 'A few months now', mr: 'काही महिन्यांपासून', hi: 'कुछ महीनों से' },
    { id: 'sub_35', en: "Can't really pinpoint when it started", mr: 'नेमके कधी सुरू झाले सांगता येत नाही', hi: 'सही-सही कब शुरू हुआ पता नहीं' }
  ],
  'recent_event': [
    { id: 'sub_36', en: 'A personal loss', mr: 'काहीतरी मोठे नुकसान किंवा दुःख', hi: 'कोई व्यक्तिगत आघात या नुकसान' },
    { id: 'sub_37', en: 'A conflict or argument', mr: 'कोणाशी तरी झालेला मोठा वाद', hi: 'किसी से हुआ बड़ा विवाद' },
    { id: 'sub_38', en: 'A major disappointment', mr: 'अपेक्षित गोष्ट न घडल्याचे दुःख', hi: 'एक बड़ा झटका या निराशा' },
    { id: 'sub_39', en: "Something I'd rather not name", mr: 'सांगणे कठीण असलेली गोष्ट', hi: 'ऐसी बात जो बताना मुश्किल है' }
  ],
  'not_sure_why': [
    { id: 'sub_40', en: 'Just feels flat most days', mr: 'दिवसभर काहीच उत्साह वाटत नाही', hi: 'ज्यादातर दिन नीरस महसूस होते हैं' },
    { id: 'sub_41', en: 'Going through the motions', mr: 'फक्त यंत्रासारखे जगत असल्यासारखे वाटते', hi: 'बस बिना मन के दिन काट रहे हैं' },
    { id: 'sub_42', en: 'Lost interest in things I liked', mr: 'आवडीच्या गोष्टींमधील उत्साह संपलाय', hi: 'पसंदीदा चीजों में भी मन नहीं लगता' }
  ]
};

export const CHECKIN_DURATIONS = [
  { id: 'today', en: 'Just today', mr: 'फक्त आज', hi: 'बस आज ही' },
  { id: 'few_days', en: 'A few days', mr: 'काही दिवसांपासून', hi: 'कुछ दिनों से' },
  { id: 'few_weeks', en: 'A few weeks', mr: 'काही आठवड्यांपासून', hi: 'कुछ हफ्तों से' },
  { id: 'longer', en: 'Longer than that', mr: 'त्याहून अधिक काळापासून', hi: 'उससे भी ज्यादा समय से' }
];

export const CHECKIN_IMPACTS = [
  { id: 'none', en: 'Not really', mr: 'फारसा नाही', hi: 'ज्यादा नहीं' },
  { id: 'little', en: 'A little', mr: 'थोडासा', hi: 'थोड़ा बहुत' },
  { id: 'moderately', en: 'Moderately', mr: 'मध्यम प्रमाणात', hi: 'मध्यम स्तर पर' },
  { id: 'a_lot', en: 'A lot', mr: 'खूप मोठ्या प्रमाणात', hi: 'बहुत ज्यादा असर हो रहा है' }
];

export function Screen05AdaptiveFollowUp({
  checkInData,
  onProceedToSupport,
  onBack,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const moodKey = checkInData?.moodId || 'okay';

  // Sub-stages in follow-up flow: 'reason' -> 'subreason' -> 'duration' -> 'impact'
  const [step, setStep] = useState('reason');
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedSubReason, setSelectedSubReason] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState(null);

  // Custom text for "Other (describe)"
  const [customText, setCustomText] = useState('');
  const [isDescribingOther, setIsDescribingOther] = useState(false);
  const [activeOtherOption, setActiveOtherOption] = useState(null);

  const availableReasons = CHECKIN_REASONS[moodKey] || CHECKIN_REASONS['okay'];
  const isLightMood = moodKey === 'happy' || moodKey === 'good' || moodKey === 'calm' || moodKey === 'okay';

  const handleSelectReason = (reasonObj) => {
    if (reasonObj.isOther) {
      setActiveOtherOption(reasonObj);
      setIsDescribingOther(true);
      return;
    }

    setSelectedReason(reasonObj);
    if (isLightMood || !CHECKIN_SUBREASONS[reasonObj.id]) {
      setStep('duration');
    } else {
      setStep('subreason');
    }
  };

  const handleSelectSubReason = (subObj) => {
    if (subObj.isOther) {
      setActiveOtherOption(subObj);
      setIsDescribingOther(true);
      return;
    }

    setSelectedSubReason(subObj);
    setStep('duration');
  };

  const handleConfirmOtherDescription = () => {
    const describedText = customText.trim() || activeOtherOption?.[selectedLanguage] || activeOtherOption?.en || 'Other';

    if (step === 'reason') {
      const customReasonObj = {
        id: 'other_custom',
        en: describedText,
        mr: describedText,
        hi: describedText
      };
      setSelectedReason(customReasonObj);
      setIsDescribingOther(false);
      setCustomText('');
      setActiveOtherOption(null);
      setStep('duration');
    } else if (step === 'subreason') {
      const customSubReasonObj = {
        id: 'sub_custom',
        en: describedText,
        mr: describedText,
        hi: describedText
      };
      setSelectedSubReason(customSubReasonObj);
      setIsDescribingOther(false);
      setCustomText('');
      setActiveOtherOption(null);
      setStep('duration');
    }
  };

  const handleSelectDuration = (durObj) => {
    setSelectedDuration(durObj);
    setStep('impact');
  };

  const handleSelectImpact = (impactObj) => {
    setSelectedImpact(impactObj);

    // Synthesize comprehensive checkin payload
    const finalPayload = {
      ...checkInData,
      primaryReason: selectedReason?.[selectedLanguage] || selectedReason?.en,
      subReason: selectedSubReason?.[selectedLanguage] || selectedSubReason?.en,
      duration: durObjText(selectedDuration),
      impact: impactObj[selectedLanguage] || impactObj.en,
      clarifiedRootCause: `${selectedReason?.en || ''} - ${selectedSubReason?.en || ''}`
    };

    onProceedToSupport(finalPayload);
  };

  const durObjText = (dur) => dur?.[selectedLanguage] || dur?.en || '';

  const handleBackStep = () => {
    if (isDescribingOther) {
      setIsDescribingOther(false);
      setCustomText('');
      return;
    }

    if (step === 'impact') setStep('duration');
    else if (step === 'duration') {
      if (selectedSubReason) setStep('subreason');
      else setStep('reason');
    } else if (step === 'subreason') setStep('reason');
    else onBack();
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackStep}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              Step {step === 'reason' ? '2/4' : step === 'subreason' ? '3/4' : step === 'duration' ? '3/4' : '4/4'} · Reflection
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {step === 'reason' && (isLightMood ? (selectedLanguage === 'mr' ? 'कशाने आनंद दिला?' : selectedLanguage === 'hi' ? 'किस बात से अच्छा लगा?' : "What's contributing to that?") : (selectedLanguage === 'mr' ? 'यामागे मुख्य कारण काय?' : selectedLanguage === 'hi' ? 'इसके पीछे मुख्य कारण क्या है?' : "What's mainly behind that?"))}
              {step === 'subreason' && (selectedLanguage === 'mr' ? 'नेमका कोणता भाग सर्वात जास्त बसतो?' : selectedLanguage === 'hi' ? 'कौन सा हिस्सा सबसे ज्यादा मेल खाता है?' : "Which part of that fits best?")}
              {step === 'duration' && (selectedLanguage === 'mr' ? 'तुम्हाला असे किती काळापासून जाणवतेय?' : selectedLanguage === 'hi' ? 'आप कब से ऐसा महसूस कर रहे हैं?' : "How long have you felt this way?")}
              {step === 'impact' && (selectedLanguage === 'mr' ? 'याचा दैनंदिन जीवनावर परिणाम होतोय का?' : selectedLanguage === 'hi' ? 'क्या इसका असर दिनचर्या पर पड़ रहा है?' : "Is it affecting your daily life?")}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Private</span>
        </div>
      </div>

      {/* Main Options Container */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-2.5 pb-6">
        {/* Selected Mood Chip Preview */}
        <div className="flex items-center gap-2 bg-white border border-[#c5c8bc]/60 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-xl">{checkInData?.emoji || '😐'}</span>
          <div>
            <span className="font-mono text-[8.5px] text-[#75786e] uppercase tracking-wider block">
              Current Mood
            </span>
            <b className="text-xs text-[#1a1d14] capitalize">{checkInData?.label || moodKey}</b>
          </div>
        </div>

        {/* INLINE "OTHER (DESCRIBE)" MODAL / FORM */}
        {isDescribingOther ? (
          <div className="bg-white border-2 border-[#526140] rounded-3xl p-4 space-y-3 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 text-[#526140]">
              <Edit3 className="w-4 h-4" />
              <b className="text-xs">
                {selectedLanguage === 'mr' ? 'थोडक्यात वर्णन करा' : selectedLanguage === 'hi' ? 'संक्षेप में बताएं' : 'Describe in your own words'}
              </b>
            </div>

            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={selectedLanguage === 'mr' ? 'मनातील विचार येथे लिहा...' : selectedLanguage === 'hi' ? 'अपने विचार यहाँ लिखें...' : 'What feels most pressing or on your mind right now?'}
              className="w-full bg-[#f3f5e6] border border-[#c5c8bc] rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsDescribingOther(false)}
                className="flex-1 py-2.5 rounded-full border border-[#c5c8bc] text-xs text-[#5e5c52] font-semibold cursor-pointer hover:bg-[#edefe0]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmOtherDescription}
                className="flex-1 py-2.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white text-xs font-bold shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Continue →</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1: PRIMARY CONTRIBUTING REASON */}
            {step === 'reason' && (
              <div className="space-y-2 animate-fadeIn pt-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                  Select what fits closest:
                </span>
                <div className="space-y-2">
                  {availableReasons.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleSelectReason(r)}
                      className={`w-full border rounded-2xl p-3.5 text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between group active:scale-98 ${
                        r.isOther
                          ? 'bg-[#f3f5e6] border-[#815505]/40 hover:border-[#815505]'
                          : 'bg-white hover:bg-[#f3f5e6] border-[#c5c8bc]/70 hover:border-[#526140]'
                      }`}
                    >
                      <span className={`text-xs font-medium ${r.isOther ? 'text-[#815505] font-semibold flex items-center gap-1.5' : 'text-[#1a1d14] group-hover:text-[#526140]'}`}>
                        {r.isOther && <Edit3 className="w-3 h-3" />}
                        <span>{r[selectedLanguage] || r.en}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SUB-REASON (GETTING SPECIFIC) */}
            {step === 'subreason' && selectedReason && CHECKIN_SUBREASONS[selectedReason.id] && (
              <div className="space-y-2 animate-fadeIn pt-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                  Topic: {selectedReason[selectedLanguage] || selectedReason.en}
                </span>
                <div className="space-y-2">
                  {CHECKIN_SUBREASONS[selectedReason.id].map((sr) => (
                    <button
                      key={sr.id}
                      onClick={() => handleSelectSubReason(sr)}
                      className={`w-full border rounded-2xl p-3.5 text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between group active:scale-98 ${
                        sr.isOther
                          ? 'bg-[#f3f5e6] border-[#815505]/40 hover:border-[#815505]'
                          : 'bg-white hover:bg-[#f3f5e6] border-[#c5c8bc]/70 hover:border-[#526140]'
                      }`}
                    >
                      <span className={`text-xs font-medium ${sr.isOther ? 'text-[#815505] font-semibold flex items-center gap-1.5' : 'text-[#1a1d14] group-hover:text-[#526140]'}`}>
                        {sr.isOther && <Edit3 className="w-3 h-3" />}
                        <span>{sr[selectedLanguage] || sr.en}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: DURATION QUESTION */}
            {step === 'duration' && (
              <div className="space-y-2 animate-fadeIn pt-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                  Timeline:
                </span>
                <div className="space-y-2">
                  {CHECKIN_DURATIONS.map((dur) => (
                    <button
                      key={dur.id}
                      onClick={() => handleSelectDuration(dur)}
                      className="w-full bg-white hover:bg-[#f3f5e6] border border-[#c5c8bc]/70 hover:border-[#526140] rounded-2xl p-3.5 text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between group active:scale-98"
                    >
                      <span className="text-xs font-medium text-[#1a1d14] group-hover:text-[#526140]">
                        {dur[selectedLanguage] || dur.en}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: IMPACT ON DAILY LIFE */}
            {step === 'impact' && (
              <div className="space-y-2 animate-fadeIn pt-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                  Classes, sleep, eating, or routine:
                </span>
                <div className="space-y-2">
                  {CHECKIN_IMPACTS.map((imp) => (
                    <button
                      key={imp.id}
                      onClick={() => handleSelectImpact(imp)}
                      className="w-full bg-white hover:bg-[#f3f5e6] border border-[#c5c8bc]/70 hover:border-[#526140] rounded-2xl p-3.5 text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between group active:scale-98"
                    >
                      <span className="text-xs font-medium text-[#1a1d14] group-hover:text-[#526140]">
                        {imp[selectedLanguage] || imp.en}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#75786e] group-hover:text-[#526140] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
