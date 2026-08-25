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
    status: 'new'
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
  const [activeTab, setActiveTab] = useState('new');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedEscalateReason, setSelectedEscalateReason] = useState(ESCALATION_REASONS[0]);
  const [escalateNote, setEscalateNote] = useState('');
  const [escalationSuccess, setEscalationSuccess] = useState(false);

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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none relative font-sans">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-2xl bg-[#526140] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            V
          </div>
          <div>
            <b className="text-xs text-[#1a1d14] block">{volunteerProfile?.name || 'Kunal Joshi'}</b>
            <span className="font-mono text-[9px] text-[#526140] block font-bold">Active Peer Volunteer</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-2.5 py-1.5 rounded-full bg-[#edefe0] hover:bg-[#e8e9db] text-[#5e5c52] cursor-pointer flex items-center gap-1 text-[10px] font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="px-4 pt-2.5 pb-1 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 overflow-x-auto flex gap-1.5 scrollbar-none">
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
            className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-[#526140] text-white shadow-xs'
                : 'bg-[#edefe0] text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {!selectedRequest ? (
          <div className="space-y-2.5">
            {filteredRequests.length === 0 ? (
              <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-6 text-center text-xs text-[#5e5c52]">
                No requests in this queue right now.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2.5 shadow-2xs hover:border-[#526140] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#526140]" />
                      <span className="font-mono font-bold text-xs text-[#1a1d14]">{req.anonId}</span>
                    </div>
                    <span className="font-mono text-[9px] bg-[#f3f5e6] px-2.5 py-0.5 rounded-full text-[#526140] font-bold">
                      {req.requestedAt}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] text-[#5e5c52]">
                      <b>Areas:</b> {req.concernAreas.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-[#5e5c52]">
                      <span><b>Lang:</b> {req.preferredLanguage}</span>
                      <span>•</span>
                      <span><b>Mode:</b> {req.preferredMode}</span>
                      <span>•</span>
                      <span className="text-[#815505] font-bold"><b>Urgency:</b> {req.urgency}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    {req.status === 'new' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(req)}
                          className="flex-1 py-2 rounded-2xl bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs cursor-pointer shadow-xs"
                        >
                          Accept Request
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setShowEscalateModal(true);
                          }}
                          className="px-3.5 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs cursor-pointer"
                        >
                          Escalate
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(req.id)}
                          className="px-3 py-2 rounded-2xl bg-[#edefe0] hover:bg-[#e8e9db] text-[#5e5c52] text-xs font-semibold cursor-pointer"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {req.status === 'active' && (
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="w-full py-2.5 rounded-2xl bg-[#526140] text-white font-bold text-xs cursor-pointer"
                      >
                        Open Active Conversation →
                      </button>
                    )}

                    {req.status === 'escalated' && (
                      <span className="text-[10.5px] text-amber-800 font-mono font-semibold">
                        Escalated to Supervising Counsellor (Dr. Pratibha)
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Request Detail & Conversation */
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-xs text-[#5e5c52] flex items-center gap-1 cursor-pointer hover:underline font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Queue
              </button>

              <button
                onClick={() => setShowEscalateModal(true)}
                className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] cursor-pointer"
              >
                Escalate to Counsellor
              </button>
            </div>

            {/* Consented Info Banner */}
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#1a1d14]">{selectedRequest.anonId}</span>
                <span className="font-mono text-[9px] bg-[#f3f5e6] text-[#526140] px-2.5 py-0.5 rounded-full font-bold">
                  Consented Data Only
                </span>
              </div>
              <div className="text-[11px] text-[#5e5c52] space-y-0.5">
                <div><b>Mood Check:</b> {selectedRequest.mood} ({selectedRequest.intensity})</div>
                <div><b>Student Message:</b> "{selectedRequest.message}"</div>
              </div>
            </div>

            {/* 5-Step Structure */}
            <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-2xl p-2.5 text-[10px] text-[#526140] flex items-center justify-between font-medium">
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
            <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex-1 overflow-y-auto space-y-2 min-h-[180px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'volunteer' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'volunteer'
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

            <form onSubmit={handleSendVolunteerReply} className="flex gap-1.5">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your empathetic response..."
                className="flex-1 bg-white border border-[#c5c8bc] rounded-2xl px-3.5 py-2.5 text-xs text-[#1a1d14] focus:outline-none focus:border-[#526140]"
              />
              <button
                type="submit"
                className="px-4 rounded-2xl bg-[#526140] text-white font-bold text-xs cursor-pointer hover:bg-[#435034]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs space-y-3.5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
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
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center space-y-1.5 animate-fadeIn">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <b className="text-xs text-emerald-950 block">Case Escalated to Priority Queue</b>
                <p className="text-[10.5px] text-emerald-800">
                  Dr. Pratibha Deshmukh has been notified immediately.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block mb-1">
                    Select Escalation Reason
                  </label>
                  <select
                    value={selectedEscalateReason}
                    onChange={(e) => setSelectedEscalateReason(e.target.value)}
                    className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl px-3 py-2 text-xs text-[#1a1d14] focus:outline-none"
                  >
                    {ESCALATION_REASONS.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#5e5c52] font-bold block mb-1">
                    Volunteer Clinical Handover Note
                  </label>
                  <textarea
                    rows={2}
                    value={escalateNote}
                    onChange={(e) => setEscalateNote(e.target.value)}
                    placeholder="Brief objective observation..."
                    className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl p-2.5 text-xs text-[#1a1d14] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleConfirmEscalation}
                    className="flex-1 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Submit Escalation
                  </button>
                  <button
                    onClick={() => setShowEscalateModal(false)}
                    className="px-4 py-2.5 rounded-full bg-[#edefe0] text-[#5e5c52] text-xs font-semibold cursor-pointer"
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
