import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  Check,
  Clock,
  MessageSquare,
  Video,
  Send,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';

export function Screen09Level2PeerSupport({
  checkInData,
  userProfile,
  onFinishActivity,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  const [selectedTopic, setSelectedTopic] = useState(checkInData?.topics?.[0] || 'Academics & Exam Stress');
  const [prefLang, setPrefLang] = useState(selectedLanguage === 'mr' ? 'मराठी' : selectedLanguage === 'hi' ? 'हिंदी' : 'English');
  const [prefMode, setPrefMode] = useState('Chat'); // 'Chat' | 'Audio/Video'
  const [prefTime, setPrefTime] = useState('Today, Afternoon (3:00 - 5:00 PM)');
  const [studentMessage, setStudentMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Request Lifecycle state: 'form' | 'submitted' | 'assigned' | 'active_chat'
  const [requestStatus, setRequestStatus] = useState('form');
  const [assignedPeer, setAssignedPeer] = useState(null);

  // Live Chat Simulator State
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSubmitRequest = async () => {
    if (!consentChecked) return;

    setRequestStatus('submitted');

    // Create session in Supabase public.support_sessions
    const userId = userProfile?.id || (await ubbSupabase.getCurrentUser())?.id || 'anon-' + anonId;
    await ubbSupabase.createSupportSession({
      user_id: userId,
      volunteer_id: 'vol-kunal-01',
      status: 'assigned',
      triage_summary: `Topic: ${selectedTopic} | Lang: ${prefLang} | Mode: ${prefMode}`
    });

    // Simulate Volunteer Assignment after 2 seconds
    setTimeout(() => {
      setAssignedPeer({
        name: 'Amber_17 (Psychology Guide)',
        role: '3rd Year Psychology Student · Supervised by Dr. Rao (Reg 4521)',
        languages: 'English, Marathi, Hindi'
      });
      setRequestStatus('assigned');
    }, 2000);
  };

  const handleStartLiveChat = () => {
    setRequestStatus('active_chat');
    setChatMessages([
      {
        id: 1,
        sender: 'peer',
        text: selectedLanguage === 'mr'
          ? "नमस्कार! मी अंबर आहे. मी तुमचा मेसेज वाचला. काळजी करू नका, आपण मिळून यावर बोलूया. सध्या तुम्हाला सर्वात जास्त ताण कशाचा वाटतोय?"
          : "Hey! I'm Amber. I saw your check-in notes. Take your time, there's no rush or judgment here. What's been on your mind today?",
        time: "Just now"
      }
    ]);
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    // Simulate peer empathetic response following the 5-step conversation structure
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'peer',
        text: selectedLanguage === 'mr'
          ? "हे समजण्यासारखं आहे. परीक्षेच्या काळात असा ताण खूप विद्यार्थ्यांना जाणवतो. आपण एक छोटासा प्लॅन बनवूया का?"
          : "Thank you for sharing that with me. It is completely natural to feel stretched thin during exam season. Would it help if we broke down just one small task for today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#C9814F] font-bold">
              Level 2 · Peer Support
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.level2.title}
            </h2>
          </div>
        </div>

        <button
          onClick={() => onFinishActivity('level2')}
          className="text-[10px] px-2.5 py-1 rounded-full bg-[#3A5F4B] text-white font-semibold cursor-pointer"
        >
          Done
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* ================= VIEW 1: VOLUNTEER REQUEST FORM ================= */}
        {requestStatus === 'form' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#3A5F4B] font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {t.level2.requestFormTitle}
                </span>
                <span className="font-mono text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  {anonId}
                </span>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] block mb-1">
                  {t.level2.selectedTopic}
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-3 py-2 text-xs text-[#14282B] focus:outline-none"
                >
                  <option value="Academics & Exam Stress">Academics & Exam Stress</option>
                  <option value="Career & Future Uncertainty">Career & Future Uncertainty</option>
                  <option value="Family & Relationship Pressure">Family & Relationship Pressure</option>
                  <option value="Loneliness & Isolation">Loneliness & Isolation</option>
                  <option value="General Wellbeing">General Wellbeing</option>
                </select>
              </div>

              {/* Preferred Language & Mode */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] block mb-1">
                    {t.level2.prefLanguage}
                  </label>
                  <select
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value)}
                    className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-2.5 py-1.5 text-xs text-[#14282B] focus:outline-none"
                  >
                    <option value="English">English</option>
                    <option value="मराठी">मराठी</option>
                    <option value="हिंदी">हिंदी</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] block mb-1">
                    {t.level2.prefMode}
                  </label>
                  <div className="grid grid-cols-2 gap-1 bg-[#F2F6F3] p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPrefMode('Chat')}
                      className={`py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${
                        prefMode === 'Chat' ? 'bg-white text-[#3A5F4B] shadow-2xs' : 'text-[#5B6E67]'
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" /> Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrefMode('Audio')}
                      className={`py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${
                        prefMode === 'Audio' ? 'bg-white text-[#3A5F4B] shadow-2xs' : 'text-[#5B6E67]'
                      }`}
                    >
                      <Video className="w-3 h-3" /> Audio
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] block mb-1">
                  {t.level2.prefTime}
                </label>
                <input
                  type="text"
                  value={prefTime}
                  onChange={(e) => setPrefTime(e.target.value)}
                  className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-3 py-1.5 text-xs text-[#14282B] focus:outline-none"
                />
              </div>

              {/* Optional Student Message */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] block mb-1">
                  Optional Message for Volunteer
                </label>
                <textarea
                  rows={2}
                  value={studentMessage}
                  onChange={(e) => setStudentMessage(e.target.value)}
                  placeholder="Anything specific you'd like them to know..."
                  className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl p-2.5 text-xs text-[#14282B] placeholder-[#8FA69C] focus:outline-none resize-none"
                />
              </div>

              {/* Explicit Consent Gate Checkbox */}
              <div className="bg-[#FFFBF7] border border-[#E3A06F]/50 rounded-xl p-3 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="volunteerConsent"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 accent-[#E3A06F] cursor-pointer"
                />
                <label htmlFor="volunteerConsent" className="text-[10.5px] text-[#7A4A26] leading-snug cursor-pointer">
                  {t.level2.consentText}
                </label>
              </div>

              <button
                onClick={handleSubmitRequest}
                disabled={!consentChecked}
                className="w-full py-2.5 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] disabled:opacity-40 text-[#241208] font-bold text-xs cursor-pointer shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.level2.submitRequestBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Volunteer Boundaries Reminder Card */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#14282B]">
                <ShieldCheck className="w-4 h-4 text-[#4E7C63]" />
                <span>Our Volunteer Commitment</span>
              </div>
              <p className="text-[10.5px] text-[#5B6E67] leading-relaxed">
                {t.level2.volunteerBoundaries}
              </p>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: LIFECYCLE TRACKER / ASSIGNED ================= */}
        {(requestStatus === 'submitted' || requestStatus === 'assigned') && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#3A5F4B] font-bold">
                  Request Lifecycle
                </span>
                <span className="font-mono text-[9px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {requestStatus === 'submitted' ? 'Matching…' : 'Volunteer Ready'}
                </span>
              </div>

              {/* 5-Step Progress Stepper */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-emerald-800 font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</div>
                  <span>{t.level2.lifecycle.step1}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${requestStatus === 'assigned' ? 'text-emerald-800 font-semibold' : 'text-slate-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${requestStatus === 'assigned' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100'}`}>
                    {requestStatus === 'assigned' ? '✓' : '2'}
                  </div>
                  <span>{t.level2.lifecycle.step2}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${requestStatus === 'assigned' ? 'text-emerald-800 font-semibold' : 'text-slate-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${requestStatus === 'assigned' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100'}`}>
                    {requestStatus === 'assigned' ? '✓' : '3'}
                  </div>
                  <span>{t.level2.lifecycle.step3}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">4</div>
                  <span>{t.level2.lifecycle.step4}</span>
                </div>
              </div>

              {/* Assigned Volunteer Card */}
              {assignedPeer && (
                <div className="bg-[#FFFBF7] border border-[#E3A06F] rounded-xl p-3 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E3A06F] text-[#241208] flex items-center justify-center font-bold text-sm">
                      A
                    </div>
                    <div>
                      <b className="text-xs text-[#14282B] block">{assignedPeer.name}</b>
                      <span className="text-[10px] text-[#7A4A26] block leading-tight">{assignedPeer.role}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartLiveChat}
                    className="w-full py-2 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enter Private Live Conversation →</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= VIEW 3: ACTIVE LIVE CONVERSATION ================= */}
        {requestStatus === 'active_chat' && (
          <div className="space-y-2 animate-fadeIn flex flex-col h-full">
            {/* Conversation Safety Banner */}
            <div className="bg-[#FBECE5] border border-[#E3A06F]/60 rounded-xl p-2 text-[10px] text-[#7A4A26] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#C9814F] flex-shrink-0" />
              <span>Ubb is not a replacement for emergency or professional care. Safety concerns are escalated to clinical staff.</span>
            </div>

            {/* Chat Message Stream */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3 flex-1 overflow-y-auto space-y-2.5 min-h-[220px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#3A5F4B] text-white rounded-br-xs'
                        : 'bg-[#F2F6F3] text-[#14282B] rounded-bl-xs border border-[#D9E2DC]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8.5px] text-[#5B6E67] px-1 font-mono mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendChatMessage} className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your message to Amber..."
                className="flex-1 bg-white border border-[#D9E2DC] rounded-xl px-3 py-2 text-xs text-[#14282B] focus:outline-none focus:border-[#3A5F4B]"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#3A5F4B] text-white flex items-center justify-center cursor-pointer hover:bg-[#2C4839]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
