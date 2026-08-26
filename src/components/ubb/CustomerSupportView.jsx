import React, { useState } from 'react';
import {
  ArrowLeft,
  Headphones,
  MessageCircle,
  Mail,
  HelpCircle,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  FileQuestion,
  LifeBuoy,
  Wind,
  Users,
  CalendarCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function CustomerSupportView({
  userProfile,
  onBack,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  // Sub-tabs: 'supports' (All 3 Supports) | 'chat' | 'ticket' | 'faq'
  const [activeTab, setActiveTab] = useState('supports');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('App Feature / Bug');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live Helpdesk Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: selectedLanguage === 'mr'
        ? "नमस्कार! मी Ubb विद्यार्थी साहाय्यक आहे. तुम्हाला Support 1, 2, किंवा 3 बाबत काही प्रश्न आहेत का?"
        : selectedLanguage === 'hi'
        ? "नमस्ते! मैं Ubb छात्र सहायता केंद्र हूँ। क्या आपको Support 1, 2, या 3 के संबंध में कोई सहायता चाहिए?"
        : "Hello! Welcome to Ubb Support. You can access Support 1 (Self-Help), Support 2 (Peer Volunteers), or Support 3 (Campus Counsellor) anytime here.",
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMsg.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMsg.trim(),
      time: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const query = inputMsg.toLowerCase();
    setInputMsg('');

    setTimeout(() => {
      let replyText = "Thank you for reaching out! You can freely explore Support 1 (Self Help Tools), Support 2 (Peer Talk), or Support 3 (Licensed Counsellor) anytime from this hub.";
      if (query.includes('audio') || query.includes('sound') || query.includes('music') || query.includes('moodtunes')) {
        replyText = "Support 1 includes MoodTunes and Let It Out (audio vent). All audio recordings are deleted immediately on your device with zero data transfer.";
      } else if (query.includes('peer') || query.includes('volunteer') || query.includes('talk')) {
        replyText = "Support 2 connects you 1-on-1 with trained psychology department peers for confidential private chat.";
      } else if (query.includes('counsellor') || query.includes('doctor') || query.includes('appointment')) {
        replyText = "Support 3 provides licensed clinical guidance, such as Manas Counselling Centre from Fergusson College.";
      } else if (query.includes('id') || query.includes('pin') || query.includes('login')) {
        replyText = "Your Ubb ID is completely anonymous. If you set a 4-digit PIN, you can restore your account anytime under Returning Student login.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
      setActiveTab('chat');
    }, 2500);
  };

  const FAQS = [
    {
      q: "What is Support 1 (Self Help Tools)?",
      a: "Support 1 gives you instant, private self-care tools: Let It Out (record voice notes that delete immediately with zero data transfer), Private Journal, and MoodTunes music therapy."
    },
    {
      q: "What is Support 2 (Talk to a Volunteer)?",
      a: "Support 2 connects you to trained psychology students from your college for 1-on-1 private chat. If needed, your conversation can be smoothly escalated to professional care."
    },
    {
      q: "What is Support 3 (Meet a Counsellor)?",
      a: "Support 3 provides licensed, college-level mental health professionals (such as Manas Counselling Centre at Fergusson College) with structured ongoing care follow-up."
    },
    {
      q: "Is my identity visible on support tickets or chats?",
      a: "No. All queries and check-ins are mapped solely to your anonymous Ubb ID. We never collect names, phone numbers, or personal identity."
    }
  ];

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              Campus Support Hub
            </div>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              {selectedLanguage === 'mr' ? 'सर्व साहाय्य पर्याय' : selectedLanguage === 'hi' ? 'सभी सहायता विकल्प' : 'All 3 Support Options'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>{anonId}</span>
        </div>
      </div>

      {/* Segmented Top Navigation Tabs */}
      <div className="px-4 pt-2.5 pb-1">
        <div className="grid grid-cols-3 gap-1 bg-[#edefe0] p-1 rounded-2xl border border-[#c5c8bc]/60">
          <button
            onClick={() => setActiveTab('supports')}
            className={`py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'supports'
                ? 'bg-[#526140] text-white shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <LifeBuoy className="w-3 h-3" />
            <span>3 Supports</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'chat'
                ? 'bg-[#526140] text-white shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <MessageCircle className="w-3 h-3" />
            <span>Helpdesk</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'faq'
                ? 'bg-[#526140] text-white shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <HelpCircle className="w-3 h-3" />
            <span>FAQs</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 px-4 py-2.5 overflow-y-auto space-y-3 pb-6">
        {/* ================= TAB 1: ALL 3 SUPPORTS SCREEN ================= */}
        {activeTab === 'supports' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl p-3 shadow-2xs">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block mb-0.5">
                Campus Care Framework
              </span>
              <p className="text-xs text-[#1a1d14] font-medium leading-tight">
                Choose the level of care that feels most comfortable for you right now:
              </p>
            </div>

            {/* SUPPORT 1 CARD */}
            <div
              onClick={() => onNavigate && onNavigate('level1_express')}
              className="bg-white hover:bg-[#f3f5e6] border-2 border-[#526140] rounded-3xl p-4 shadow-sm cursor-pointer transition-all active:scale-98 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#526140]/15 text-[#526140] flex items-center justify-center shadow-2xs">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-xs text-[#1a1d14] block">Support 1 : Self Help Tools</b>
                    <span className="font-mono text-[8.5px] text-[#526140] font-bold">
                      Instant · 100% Private · 0 Data Transfer
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[8.5px] bg-[#526140] text-white px-2 py-0.5 rounded-full font-bold">
                  Open →
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>Let It Out</b> — Record voice note of what you are feeling and let out expressions, deleted immediately, no data transfer.
                </div>
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>Journal</b> — Write out what you're feeling on encrypted local canvas.
                </div>
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>MoodTunes</b> — Music therapy with acoustic grounding.
                </div>
              </div>
            </div>

            {/* SUPPORT 2 CARD */}
            <div
              onClick={() => onNavigate && onNavigate('level2_peer')}
              className="bg-white hover:bg-[#f3f5e6] border-2 border-[#815505] rounded-3xl p-4 shadow-sm cursor-pointer transition-all active:scale-98 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#815505]/15 text-[#815505] flex items-center justify-center shadow-2xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-xs text-[#1a1d14] block">Support 2 : Talk to a Volunteer</b>
                    <span className="font-mono text-[8.5px] text-[#815505] font-bold">
                      Peers · 1-on-1 Private Chat · Escalation
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[8.5px] bg-[#815505] text-white px-2 py-0.5 rounded-full font-bold">
                  Connect →
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>Psychology Peers</b> — Trained peer supporters from psychology department of college.
                </div>
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>One-on-One Private Chat</b> — Anonymous, non-judgmental student listener.
                </div>
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>Escalated Further If Needed</b> — Seamless handoff to clinical experts whenever necessary.
                </div>
              </div>
            </div>

            {/* SUPPORT 3 CARD */}
            <div
              onClick={() => onNavigate && onNavigate('level3_care')}
              className="bg-white hover:bg-red-50/50 border-2 border-red-700 rounded-3xl p-4 shadow-sm cursor-pointer transition-all active:scale-98 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center shadow-2xs">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="text-xs text-[#1a1d14] block">Support 3 : Meet a Counsellor</b>
                    <span className="font-mono text-[8.5px] text-red-700 font-bold">
                      Licensed Clinical Support · Ongoing Care
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[8.5px] bg-red-700 text-white px-2 py-0.5 rounded-full font-bold">
                  Book →
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>Licensed Support</b> — Certified mental health professionals & clinical counselors.
                </div>
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>College Level</b> — e.g. "Manas Counselling Centre" from Fergusson College.
                </div>
                <div className="bg-[#f9fbeb] border border-[#c5c8bc]/40 rounded-xl p-2 text-[10.5px] text-[#1a1d14] leading-snug">
                  ★ <b>Ongoing Care Follow-up</b> — Long-term care plans, follow-ups, and recovery monitoring.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LIVE HELPDESK CHAT ================= */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[380px] justify-between animate-fadeIn">
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#526140] text-white rounded-br-xs'
                        : 'bg-white border border-[#c5c8bc]/70 text-[#1a1d14] rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[8.5px] mt-1 block text-right font-mono ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-[#75786e]'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="pt-2 flex items-center gap-1.5">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={selectedLanguage === 'mr' ? 'येथे प्रश्न विचारा...' : selectedLanguage === 'hi' ? 'यहाँ सवाल पूछें...' : 'Ask about support, tools, or privacy...'}
                className="flex-1 bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2.5 text-xs text-[#1a1d14] focus:outline-none focus:border-[#526140] shadow-2xs"
              />
              <button
                type="submit"
                className="p-2.5 rounded-2xl bg-[#526140] text-white hover:bg-[#435034] cursor-pointer shadow-xs active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 3: FAQS ================= */}
        {activeTab === 'faq' && (
          <div className="space-y-2.5 animate-fadeIn">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#c5c8bc]/70 rounded-2xl p-3.5 shadow-2xs space-y-1"
              >
                <b className="text-xs text-[#1a1d14] flex items-start gap-1.5">
                  <span className="text-[#526140] font-mono">Q.</span>
                  <span>{faq.q}</span>
                </b>
                <p className="text-[11px] text-[#5e5c52] leading-relaxed pl-4">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
