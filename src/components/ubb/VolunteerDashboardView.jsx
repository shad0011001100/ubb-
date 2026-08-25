import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Shield,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  ChevronRight,
  LogOut,
  X,
  PhoneCall
} from 'lucide-react';

const INITIAL_REQUESTS = [
  {
    id: 'REQ-101',
    anonId: 'UBB-7K4P-29',
    concernAreas: ['Academics', 'Anxiety'],
    preferredLanguage: 'English',
    preferredMode: 'Chat',
    urgency: 'Moderate',
    requestedAt: '10:25 PM',
    mood: '😟 Anxious',
    intensity: 'Strong',
    message: "I have semester exams starting Monday and I'm feeling overwhelmed with syllabus backlogs.",
    status: 'new' // 'new' | 'active' | 'waiting' | 'escalated' | 'closed'
  },
  {
    id: 'REQ-102',
    anonId: 'UBB-3M9X-14',
    concernAreas: ['Loneliness', 'Family'],
    preferredLanguage: 'मराठी',
    preferredMode: 'Chat',
    urgency: 'Low',
    requestedAt: '09:40 PM',
    mood: '😔 Sad',
    intensity: 'Moderate',
    message: "गावातून नवीन आलोय, हॉस्टेलमध्ये खूप एकटं वाटतंय.",
    status: 'active'
  },
  {
    id: 'REQ-103',
    anonId: 'UBB-9V2K-88',
    concernAreas: ['Career', 'Future uncertainty'],
    preferredLanguage: 'हिंदी',
    preferredMode: 'Audio',
    urgency: 'Moderate',
    requestedAt: '08:15 PM',
    mood: '😣 Overwhelmed',
    intensity: 'Strong',
    message: "Placement season pressure is getting too much.",
    status: 'waiting'
  }
];

const ESCALATION_REASONS = [
  'Student requests professional help',
  'Concern appears beyond volunteer role',
  'Immediate safety concern',
  'Repeated distress or worsening check-ins',
  'Volunteer is unsure how to proceed',
  'Student requires institutional support'
];

export function VolunteerDashboardView({
  volunteerProfile,
  onLogout,
  onOpenCounsellorEscalation
}) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'active' | 'waiting' | 'escalated' | 'closed'
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Escalate Modal
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedEscalateReason, setSelectedEscalateReason] = useState(ESCALATION_REASONS[0]);
  const [escalateNote, setEscalateNote] = useState('');
  const [escalationSuccess, setEscalationSuccess] = useState(false);

  // Volunteer Live Chat
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'student',
      text: "Hello, thank you for accepting my request. I'm feeling really anxious about my backlog exams.",
      time: "10:26 PM"
    }
  ]);
  const [replyText, setReplyText] = useState('');

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'new') return r.status === 'new';
    if (activeTab === 'active') return r.status === 'active';
    if (activeTab === 'waiting') return r.status === 'waiting';
    if (activeTab === 'escalated') return r.status === 'escalated';
    if (activeTab === 'closed') return r.status === 'closed';
    return true;
  });

  const handleAcceptRequest = (req) => {
    const updated = requests.map((r) => (r.id === req.id ? { ...r, status: 'active' } : r));
    setRequests(updated);
    setSelectedRequest({ ...req, status: 'active' });
  };

  const handleDeclineRequest = (reqId) => {
    const updated = requests.filter((r) => r.id !== reqId);
    setRequests(updated);
    if (selectedRequest?.id === reqId) setSelectedRequest(null);
  };

  const handleConfirmEscalation = () => {
    if (!selectedRequest) return;
    const updated = requests.map((r) =>
      r.id === selectedRequest.id ? { ...r, status: 'escalated' } : r
    );
    setRequests(updated);
    setEscalationSuccess(true);
    setTimeout(() => {
      setEscalationSuccess(false);
      setShowEscalateModal(false);
      setSelectedRequest(null);
    }, 2000);
  };

  const handleSendVolunteerReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'volunteer',
      text: replyText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMsg]);
    setReplyText('');
  };

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2 bg-white border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#4E7C63] text-white flex items-center justify-center font-bold text-xs">
            V
          </div>
          <div>
            <b className="text-xs text-[#14282B] block">{volunteerProfile?.name || 'Kunal Joshi'}</b>
            <span className="font-mono text-[9px] text-[#4E7C63] block">Active Peer Volunteer</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#5B6E67] cursor-pointer flex items-center gap-1 text-[10px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="px-4 pt-2 pb-1 bg-white border-b border-[#D9E2DC]/60 overflow-x-auto flex gap-1.5 scrollbar-none">
        {[
          { id: 'new', label: 'New Requests' },
          { id: 'active', label: 'Active Chats' },
          { id: 'waiting', label: 'Waiting' },
          { id: 'escalated', label: 'Escalated' },
          { id: 'closed', label: 'Closed' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedRequest(null);
            }}
            className={`px-3 py-1 rounded-lg text-[10.5px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-[#3A5F4B] text-white shadow-2xs'
                : 'bg-[#F2F6F3] text-[#5B6E67] hover:text-[#14282B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content: Request List or Request Detail / Conversation */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {!selectedRequest ? (
          /* Request Cards Stream */
          <div className="space-y-2.5">
            {filteredRequests.length === 0 ? (
              <div className="bg-white border border-[#D9E2DC] rounded-2xl p-6 text-center text-xs text-[#5B6E67]">
                No requests in this queue right now.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2.5 shadow-2xs hover:border-[#3A5F4B] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-mono font-bold text-xs text-[#14282B]">{req.anonId}</span>
                    </div>
                    <span className="font-mono text-[9px] bg-slate-100 px-2 py-0.5 rounded-full text-[#5B6E67]">
                      {req.requestedAt}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] text-[#5B6E67]">
                      <b>Areas:</b> {req.concernAreas.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-[#5B6E67]">
                      <span><b>Lang:</b> {req.preferredLanguage}</span>
                      <span>•</span>
                      <span><b>Mode:</b> {req.preferredMode}</span>
                      <span>•</span>
                      <span className="text-[#C9814F] font-semibold"><b>Urgency:</b> {req.urgency}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    {req.status === 'new' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(req)}
                          className="flex-1 py-1.5 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs cursor-pointer shadow-xs"
                        >
                          Accept Request
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setShowEscalateModal(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs cursor-pointer"
                        >
                          Escalate
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(req.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#5B6E67] text-xs cursor-pointer"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {req.status === 'active' && (
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="w-full py-1.5 rounded-xl bg-[#3A5F4B] text-white font-bold text-xs cursor-pointer"
                      >
                        Open Active Conversation →
                      </button>
                    )}

                    {req.status === 'escalated' && (
                      <span className="text-[10px] text-amber-800 font-mono">
                        Escalated to Supervising Counsellor (Dr. Pratibha)
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Request Detail & Conversation View */
          <div className="space-y-3 animate-fadeIn">
            {/* Header for Detail */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-xs text-[#5B6E67] flex items-center gap-1 cursor-pointer hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Queue
              </button>

              <button
                onClick={() => setShowEscalateModal(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[10px] cursor-pointer"
              >
                Escalate to Counsellor
              </button>
            </div>

            {/* Consented Info Banner */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3 space-y-1.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#14282B]">{selectedRequest.anonId}</span>
                <span className="font-mono text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full">
                  Consented Data Only
                </span>
              </div>
              <div className="text-[11px] text-[#5B6E67] space-y-0.5">
                <div><b>Mood Check:</b> {selectedRequest.mood} ({selectedRequest.intensity})</div>
                <div><b>Student Message:</b> "{selectedRequest.message}"</div>
              </div>
            </div>

            {/* 5-Step Conversation Structure Helper for Volunteer */}
            <div className="bg-[#FFFBF7] border border-[#E3A06F]/50 rounded-xl p-2 text-[9.5px] text-[#7A4A26] flex items-center justify-between">
              <span className="font-bold">Structure:</span>
              <span>1. Acknowledge</span>
              <span>→</span>
              <span>2. Listen</span>
              <span>→</span>
              <span>3. Clarify</span>
              <span>→</span>
              <span>4. Support</span>
              <span>→</span>
              <span>5. Close</span>
            </div>

            {/* Live Chat Window */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3 flex-1 overflow-y-auto space-y-2 min-h-[180px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'volunteer' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'volunteer'
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

            {/* Reply Input Form */}
            <form onSubmit={handleSendVolunteerReply} className="flex gap-1.5">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your empathetic response..."
                className="flex-1 bg-white border border-[#D9E2DC] rounded-xl px-3 py-2 text-xs text-[#14282B] focus:outline-none focus:border-[#3A5F4B]"
              />
              <button
                type="submit"
                className="px-3 rounded-xl bg-[#3A5F4B] text-white font-bold text-xs cursor-pointer hover:bg-[#2C4839]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ================= ESCALATION MODAL ================= */}
      {showEscalateModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 w-full max-w-xs space-y-3 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Escalate to Licensed Counsellor</span>
              </div>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {escalationSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-center space-y-1 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <b className="text-xs text-emerald-950 block">Case Escalated to Priority Queue</b>
                <p className="text-[10.5px] text-emerald-800">
                  Dr. Pratibha Deshmukh has been notified immediately.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] font-semibold block mb-1">
                    Select Escalation Reason
                  </label>
                  <select
                    value={selectedEscalateReason}
                    onChange={(e) => setSelectedEscalateReason(e.target.value)}
                    className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-2.5 py-1.5 text-xs text-[#14282B] focus:outline-none"
                  >
                    {ESCALATION_REASONS.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] font-semibold block mb-1">
                    Volunteer Clinical Handover Note
                  </label>
                  <textarea
                    rows={2}
                    value={escalateNote}
                    onChange={(e) => setEscalateNote(e.target.value)}
                    placeholder="Brief objective observation..."
                    className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl p-2 text-xs text-[#14282B] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleConfirmEscalation}
                    className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Submit Escalation
                  </button>
                  <button
                    onClick={() => setShowEscalateModal(false)}
                    className="px-3 py-2 rounded-xl bg-slate-100 text-[#5B6E67] text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
