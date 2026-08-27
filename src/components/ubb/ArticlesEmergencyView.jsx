import React, { useState } from 'react';
import {
  ArrowLeft,
  PhoneCall,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  Heart,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { BottomNavBar } from './BottomNavBar';

export const ARTICLES_DATA = [
  {
    id: 'exam_anxiety',
    title: {
      en: 'Managing Exam Anxiety & Acute Panic',
      mr: 'परीक्षेचा ताण आणि अचानक येणारी भीती कशी हाताळावी',
      hi: 'परीक्षा का तनाव और अचानक घबराहट को कैसे संभालें'
    },
    category: 'Academics',
    readTime: '3 min read',
    summary: {
      en: 'Learn the 5-4-3-2-1 sensory grounding method and how physiological sighs reset your autonomic nervous system before an exam.',
      mr: 'परीक्षेपूर्वी ५-४-३-२-१ सेन्सरी ग्राउंडिंग पद्धत आणि दीर्घ श्वासोच्छ्वासाने मज्जासंस्था कशी शांत करावी ते जाणून घ्या.',
      hi: 'परीक्षा से पहले ५-४-३-२-१ ग्राउंडिंग तकनीक और गहरी सांस से तंत्रिका तंत्र को शांत करने का तरीका जानें।'
    },
    keyTakeaway: 'Prolonged exhalations activate the vagus nerve, reducing heart rate within 90 seconds.'
  },
  {
    id: 'sleep_hygiene',
    title: {
      en: 'Hostel Sleep Hygiene & Brain Recovery',
      mr: 'हॉस्टेलमधील अपुरी झोप आणि मेंदूची विश्रांती',
      hi: 'हॉस्टल में नींद की समस्या और मस्तिष्क का आराम'
    },
    category: 'Sleep & Health',
    readTime: '4 min read',
    summary: {
      en: 'Practical steps for college students to achieve restorative sleep despite noisy hostel environments and late-night study cycles.',
      mr: 'हॉस्टेलमधील गोंगाट आणि रात्रीच्या अभ्यासातही गाढ व शांत झोप मिळवण्यासाठी व्यावहारिक उपाय.',
      hi: 'शोरगुल वाले हॉस्टल और देर रात की पढ़ाई के बीच भी गहरी नींद लेने के व्यावहारिक उपाय।'
    },
    keyTakeaway: 'Consistent wake-up times anchor circadian rhythms better than irregular sleep catch-ups.'
  },
  {
    id: 'imposter_syndrome',
    title: {
      en: 'Overcoming Imposter Syndrome in College',
      mr: 'महाविद्यालयात वाटणारा न्यूनगंड कसा दूर करावा',
      hi: 'कॉलेज में खुद को दूसरों से कम समझने की भावना से कैसे उबरें'
    },
    category: 'Self-Worth',
    readTime: '3 min read',
    summary: {
      en: 'Understanding pluralistic ignorance: why 70% of high-achieving students secretly feel they are not good enough, and how self-compassion helps.',
      mr: 'इतरांशी तुलना करताना वाटणारा न्यूनगंड आणि डॉ. क्रिस्टिन नेफ यांच्या सेल्फ-कंपॅशन तंत्राचा वापर.',
      hi: 'दूसरों से तुलना करने पर होने वाली हीन भावना और आत्म-सहानुभूति की वैज्ञानिक शक्ति।'
    },
    keyTakeaway: 'You are comparing your internal mess to everyone else’s curated external highlight reel.'
  }
];

export function ArticlesEmergencyView({
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const langKey = selectedLanguage === 'mr' ? 'mr' : selectedLanguage === 'hi' ? 'hi' : 'en';

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
            <span className="font-mono text-[9px] uppercase tracking-wider text-red-700 font-bold block">
              Tab 1 · Support Resources
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {selectedLanguage === 'mr' ? 'लेख आणि आणीबाणी मदत' : selectedLanguage === 'hi' ? 'लेख एवं आपातकालीन सहायता' : 'Articles & Emergency SOS'}
            </h2>
          </div>
        </div>

        <span className="font-mono text-[9px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-bold border border-red-200">
          24x7 Lifelines
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 pb-24">
        {/* ================= 1. EMERGENCY 24X7 SOS LIFELINES ================= */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-300/80 rounded-3xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <b className="text-xs text-red-950 block">Immediate Crisis Support (24x7)</b>
              <span className="text-[10px] text-red-800">Free · Confidential · Zero Institutional Record</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <a
              href="tel:14416"
              className="w-full py-2.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-between shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Tele-MANAS (Govt of India)</span>
              </div>
              <span className="font-mono text-xs underline">14416</span>
            </a>

            <a
              href="tel:18005990019"
              className="w-full py-2.5 px-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-between shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>KIRAN Mental Health Helpline</span>
              </div>
              <span className="font-mono text-xs underline">1800-599-0019</span>
            </a>
          </div>
        </section>

        {/* ================= 2. PSYCHOEDUCATION & COPING GUIDES ================= */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold">
              Evidence-Based Coping Articles
            </span>
            <span className="text-[9.5px] font-mono text-[#526140] font-bold">
              Clinical Science
            </span>
          </div>

          <div className="space-y-2.5">
            {ARTICLES_DATA.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(selectedArticle?.id === art.id ? null : art)}
                className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-2 shadow-2xs transition-all cursor-pointer hover:border-[#526140]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2 py-0.5 rounded-full font-bold">
                    {art.category} · {art.readTime}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#75786e] transition-transform ${
                      selectedArticle?.id === art.id ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                <h3 className="font-fraunces font-bold text-sm text-[#1a1d14]">
                  {art.title[langKey] || art.title.en}
                </h3>

                <p className="text-xs text-[#5e5c52] leading-relaxed">
                  {art.summary[langKey] || art.summary.en}
                </p>

                {selectedArticle?.id === art.id && (
                  <div className="bg-[#f3f5e6] border-l-2 border-[#526140] p-3 rounded-r-2xl mt-2 animate-fadeIn space-y-1">
                    <b className="text-[10.5px] text-[#526140] block font-mono uppercase">Key Scientific Takeaway:</b>
                    <p className="text-xs text-[#1a1d14] font-medium leading-relaxed">
                      {art.keyTakeaway}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4-Tab Bottom Navigation Bar */}
      <BottomNavBar currentTab="articles_emergency" onNavigate={onNavigate} />
    </div>
  );
}
