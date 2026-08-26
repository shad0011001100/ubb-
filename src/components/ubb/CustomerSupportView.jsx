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
  LifeBuoy
} from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function CustomerSupportView({
  userProfile,
  onBack,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'ticket' | 'faq'
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
        ? "नमस्कार! मी Ubb विद्यार्थी साहाय्यक (Customer Support Bot) आहे. तुम्हाला ॲप वापरण्यात किंवा इतर काही मदत हवी आहे का?"
        : selectedLanguage === 'hi'
        ? "नमस्ते! मैं Ubb छात्र सहायता केंद्र (Customer Support) हूँ। आपको ऐप के उपयोग या किसी अन्य विषय में क्या सहायता चाहिए?"
        : "Hello! Welcome to Ubb Student Support & Helpdesk. How can we assist you with the app or campus resources today?",
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
      let replyText = "Thank you for reaching out! A student support representative will review your request. For immediate crisis support, please use the red SOS hotline.";
      if (query.includes('audio') || query.includes('sound') || query.includes('music')) {
        replyText = "For audio issues, ensure your device volume is turned up and silent mode is switched off. MoodTunes operates 100% offline via Web Audio.";
      } else if (query.includes('id') || query.includes('pin') || query.includes('login')) {
        replyText = "Your Ubb ID is completely anonymous. If you set a 4-digit PIN, you can restore your anonymous account anytime under Returning Student login.";
      } else if (query.includes('delete') || query.includes('privacy') || query.includes('data')) {
        replyText = "Ubb is 100% Zero-PII. You can permanently wipe all local data anytime in 'My Journey' -> 'Reset All Data'.";
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
      q: "Is my identity visible to customer support?",
      a: "No. All support queries are mapped only to your anonymous Ubb ID. We never collect names or phone numbers."
    },
    {
      q: "How do I report a bug or suggest a feature?",
      a: "You can submit a ticket in the 'Submit Ticket' tab above, and our development team will address it in the next update."
    },
    {
      q: "How to connect directly with campus IT desk?",
      a: "Reach out via email at support@campus.edu.in or visit the Student Welfare Centre during campus hours (9 AM - 5 PM)."
    }
  ];

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top App Bar */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold block">
              24x7 Helpdesk
            </span>
            <h2 className="font-fraunces text-base font-bold text-[#1a1d14]">
              Customer & Student Support
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9.5px] font-mono bg-[#edefe0] text-[#526140] px-2.5 py-0.5 rounded-full border border-[#c5c8bc]/60 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#526140]" />
          <span>Anonymous</span>
        </div>
      </div>

      {/* 3 Support Sub-Tabs */}
      <div className="px-4 pt-2.5">
        <div className="grid grid-cols-3 gap-1.5 bg-[#edefe0] p-1 rounded-2xl border border-[#c5c8bc]/60">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#526140] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Live Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('ticket')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'ticket'
                ? 'bg-[#526140] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ticket</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-[#526140] text-white font-bold shadow-xs'
                : 'text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs</span>
          </button>
        </div>
      </div>

      {/* Main Support View Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-4">
        {/* TAB 1: LIVE CHAT */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full justify-between space-y-2 animate-fadeIn">
            {/* Chat message bubbles */}
            <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 max-h-[380px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#526140] text-white rounded-tr-none'
                        : 'bg-white border border-[#c5c8bc]/60 text-[#1a1d14] rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`font-mono text-[8.5px] mt-1 block ${
                      msg.sender === 'user' ? 'text-white/75 text-right' : 'text-[#75786e]'
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-[#c5c8bc]/40">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask support a question..."
                className="flex-1 bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2.5 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="w-10 h-10 rounded-2xl bg-[#526140] hover:bg-[#435034] text-white flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-40 transition-all flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: SUBMIT TICKET */}
        {activeTab === 'ticket' && (
          <form onSubmit={handleSubmitTicket} className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3 shadow-xs animate-fadeIn">
            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#526140] font-bold block mb-1">
                Issue Category
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full bg-[#f3f5e6] border border-[#c5c8bc] rounded-2xl px-3 py-2 text-xs text-[#1a1d14] focus:outline-none"
              >
                <option>App Feature / Bug Report</option>
                <option>Campus Peer / Counsellor Query</option>
                <option>Audio / MoodTunes Issue</option>
                <option>Privacy & Data Deletion Request</option>
                <option>Other Feedback</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Short summary of the issue..."
                className="w-full bg-[#f3f5e6] border border-[#c5c8bc] rounded-2xl px-3 py-2 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140]"
              />
            </div>

            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block mb-1">
                Describe Your Issue
              </label>
              <textarea
                rows={4}
                required
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Explain what happened or what you need help with..."
                className="w-full bg-[#f3f5e6] border border-[#c5c8bc] rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
              />
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ticket submitted! Reference ID: #{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Anonymous Ticket</span>
              </button>
            )}

            <span className="font-mono text-[9px] text-[#75786e] block text-center">
              Logged to Ubb ID: {anonId} · 100% Zero-PII
            </span>
          </form>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faq' && (
          <div className="space-y-2.5 animate-fadeIn">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-[#c5c8bc]/60 rounded-2xl p-3.5 space-y-1 shadow-2xs">
                <b className="text-xs text-[#1a1d14] block">{faq.q}</b>
                <p className="text-[11px] text-[#5e5c52] leading-relaxed">{faq.a}</p>
              </div>
            ))}

            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4 text-center space-y-1.5 mt-3">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#815505] font-bold block">
                Direct Campus Email Support
              </span>
              <a
                href="mailto:support@campus.edu.in"
                className="text-xs font-mono font-bold text-[#526140] hover:underline block"
              >
                support@campus.edu.in
              </a>
              <span className="text-[10px] text-[#75786e] block">
                Campus Student Welfare Centre · Mon-Fri (9 AM - 5 PM)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
