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
  const [prefMode, setPrefMode] = useState('Chat');
  const [prefTime, setPrefTime] = useState('Today, Afternoon (3:00 - 5:00 PM)');
  const [studentMessage, setStudentMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const [requestStatus, setRequestStatus] = useState('form');
  const [assignedPeer, setAssignedPeer] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSubmitRequest = async () => {
    if (!consentChecked) return;

    setRequestStatus('submitted');

    const userId = userProfile?.id || (await ubbSupabase.getCurrentUser())?.id || 'anon-' + anonId;
    await ubbSupabase.createSupportSession({
      user_id: userId,
      volunteer_id: 'vol-kunal-01',
      status: 'assigned',
      triage_summary: `Topic: ${selectedTopic} | Lang: ${prefLang} | Mode: ${prefMode}`
    });

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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              Support 2 · Talk to a Volunteer
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#1a1d14]">
              {t.level2.title}
            </h2>
          </div>
        </div>

        <button
          onClick={() => onFinishActivity('level2')}
          className="text-[10.5px] px-3 py-1 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold cursor-pointer shadow-xs"
        >
          Done
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* VIEW 1: REQUEST FORM */}
        {requestStatus === 'form' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#526140] font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {t.level2.requestFormTitle}
                </span>
                <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2.5 py-0.5 rounded-full font-bold">
                  {anonId}
                </span>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
                  {t.level2.selectedTopic}
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl px-3 py-2 text-xs text-[#1a1d14] focus:outline-none"
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
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
                    {t.level2.prefLanguage}
                  </label>
                  <select
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value)}
                    className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl px-2.5 py-2 text-xs text-[#1a1d14] focus:outline-none"
                  >
                    <option value="English">English</option>
                    <option value="मराठी">मराठी</option>
                    <option value="हिंदी">हिंदी</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
                    {t.level2.prefMode}
                  </label>
                  <div className="grid grid-cols-2 gap-1 bg-[#edefe0] p-1 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setPrefMode('Chat')}
                      className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 ${
                        prefMode === 'Chat' ? 'bg-white text-[#526140] shadow-2xs font-bold' : 'text-[#5e5c52]'
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" /> Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrefMode('Audio')}
                      className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 ${
                        prefMode === 'Audio' ? 'bg-white text-[#526140] shadow-2xs font-bold' : 'text-[#5e5c52]'
                      }`}
                    >
                      <Video className="w-3 h-3" /> Audio
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
                  {t.level2.prefTime}
                </label>
                <input
                  type="text"
                  value={prefTime}
                  onChange={(e) => setPrefTime(e.target.value)}
                  className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl px-3.5 py-2 text-xs text-[#1a1d14] focus:outline-none"
                />
              </div>

              {/* Optional Student Message */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-semibold block mb-1">
                  Optional Message for Volunteer
                </label>
                <textarea
                  rows={2}
                  value={studentMessage}
                  onChange={(e) => setStudentMessage(e.target.value)}
                  placeholder="Anything specific you'd like them to know..."
                  className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none resize-none"
                />
              </div>

              {/* Consent Gate Checkbox */}
              <div className="bg-[#f3f5e6] border border-[#526140]/40 rounded-2xl p-3 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="volunteerConsent"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 accent-[#526140] cursor-pointer"
                />
                <label htmlFor="volunteerConsent" className="text-[10.5px] text-[#1a1d14] leading-snug cursor-pointer">
                  {t.level2.consentText}
                </label>
              </div>

              <button
                onClick={handleSubmitRequest}
                disabled={!consentChecked}
                className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] disabled:opacity-40 text-white font-bold text-xs cursor-pointer shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.level2.submitRequestBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Volunteer Boundaries Reminder Card */}
            <div className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a1d14]">
                <ShieldCheck className="w-4 h-4 text-[#526140]" />
                <span>Our Volunteer Commitment</span>
              </div>
              <p className="text-[10.5px] text-[#5e5c52] leading-relaxed">
                {t.level2.volunteerBoundaries}
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: LIFECYCLE */}
        {(requestStatus === 'submitted' || requestStatus === 'assigned') && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#526140] font-bold">
                  Request Lifecycle
                </span>
                <span className="font-mono text-[9px] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                  {requestStatus === 'submitted' ? 'Matching…' : 'Volunteer Ready'}
                </span>
              </div>

              {/* Stepper */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-[#526140] font-semibold">
                  <div className="w-5 h-5 rounded-full bg-[#526140]/15 flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>{t.level2.lifecycle.step1}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${requestStatus === 'assigned' ? 'text-[#526140] font-semibold' : 'text-slate-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${requestStatus === 'assigned' ? 'bg-[#526140]/15 text-[#526140] font-bold' : 'bg-slate-100'}`}>
                    {requestStatus === 'assigned' ? '✓' : '2'}
                  </div>
                  <span>{t.level2.lifecycle.step2}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${requestStatus === 'assigned' ? 'text-[#526140] font-semibold' : 'text-slate-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${requestStatus === 'assigned' ? 'bg-[#526140]/15 text-[#526140] font-bold' : 'bg-slate-100'}`}>
                    {requestStatus === 'assigned' ? '✓' : '3'}
                  </div>
                  <span>{t.level2.lifecycle.step3}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">4</div>
                  <span>{t.level2.lifecycle.step4}</span>
                </div>
              </div>

              {assignedPeer && (
                <div className="bg-[#f3f5e6] border border-[#526140]/40 rounded-3xl p-4 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#526140] text-white flex items-center justify-center font-bold text-sm">
                      A
                    </div>
                    <div>
                      <b className="text-xs text-[#1a1d14] block">{assignedPeer.name}</b>
                      <span className="text-[10px] text-[#5e5c52] block leading-tight">{assignedPeer.role}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartLiveChat}
                    className="w-full py-2.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enter Private Live Conversation →</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: LIVE CONVERSATION */}
        {requestStatus === 'active_chat' && (
          <div className="space-y-2 animate-fadeIn flex flex-col h-full">
            <div className="bg-[#edefe0] border border-[#c5c8bc]/60 rounded-2xl p-2.5 text-[10.5px] text-[#5e5c52] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#815505] flex-shrink-0" />
              <span>Ubb is not a replacement for emergency or professional care.</span>
            </div>

            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-3 flex-1 overflow-y-auto space-y-2.5 min-h-[220px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#526140] text-white rounded-br-xs'
                        : 'bg-[#f3f5e6] text-[#1a1d14] rounded-bl-xs border border-[#c5c8bc]/50'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8.5px] text-[#75786e] px-1 font-mono mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChatMessage} className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your message to Amber..."
                className="flex-1 bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2.5 text-xs text-[#1a1d14] focus:outline-none focus:border-[#526140]"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-2xl bg-[#526140] text-white flex items-center justify-center cursor-pointer hover:bg-[#435034]"
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
