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
  PhoneCall,
  Heart,
  Plus,
  Edit3
} from 'lucide-react';
import { ubbSupabase } from '../../services/supabase';

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

const SAMPLE_VOLUNTEER_POSTS = [
  {
    id: 'vp-1',
    author: 'Kunal Joshi (Peer Guide)',
    text: 'To everyone studying through the night: taking a 10-minute water & stretch break actually boosts your cognitive recall. You have got this!',
    tag: '#StudyEncouragement',
    warmthCount: 34,
    date: 'Today'
  },
  {
    id: 'vp-2',
    author: 'Amber_17 (Psychology Dept)',
    text: 'Exam results do not define your human worth. Be gentle with your mind today.',
    tag: '#SelfCompassion',
    warmthCount: 52,
    date: 'Yesterday'
  }
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

  // Volunteer Wall of Thoughts Post State
  const [volunteerPosts, setVolunteerPosts] = useState(SAMPLE_VOLUNTEER_POSTS);
  const [showWallComposerModal, setShowWallComposerModal] = useState(false);
  const [newWallThought, setNewWallThought] = useState('');
  const [selectedTag, setSelectedTag] = useState('#StudyEncouragement');
  const [postSuccess, setPostSuccess] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'student',
      text: "Hello, thank you for accepting my request. I'm feeling really anxious about my backlog exams.",
      time: "10:26 PM"
    }
  ]);
  const [replyText, setReplyText] = useState('');

  const volunteerName = volunteerProfile?.name || 'Kunal Joshi';

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

  const handlePostWallThought = async (e) => {
    e.preventDefault();
    if (!newWallThought.trim()) return;

    const newPost = {
      id: `vp-${Date.now()}`,
      author: `${volunteerName} (Peer Guide)`,
      text: newWallThought.trim(),
      tag: selectedTag,
      warmthCount: 1,
      date: 'Just now'
    };

    setVolunteerPosts([newPost, ...volunteerPosts]);
    setNewWallThought('');
    setPostSuccess(true);

    try {
      await ubbSupabase.createCommunityLetter({
        content: newPost.text,
        author_tag: newPost.author
      });
    } catch {}

    setTimeout(() => {
      setPostSuccess(false);
      setShowWallComposerModal(false);
    }, 2000);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none relative font-sans">
      {/* Top Header with Direct Wall of Thoughts Button */}
      <div className="px-4 pt-3.5 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-[#526140] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            V
          </div>
          <div>
            <b className="text-xs text-[#1a1d14] block leading-tight">{volunteerName}</b>
            <span className="font-mono text-[8.5px] text-[#526140] block font-bold">Active Peer Volunteer</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Unmistakable Direct Header Action */}
          <button
            onClick={() => setShowWallComposerModal(true)}
            className="px-2.5 py-1.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white cursor-pointer flex items-center gap-1 text-[10px] font-bold shadow-2xs"
          >
            <Sparkles className="w-3 h-3 text-[#ffddb3]" />
            <span>Post on Wall</span>
          </button>

          <button
            onClick={onLogout}
            className="p-1.5 rounded-full bg-[#edefe0] hover:bg-[#e8e9db] text-[#5e5c52] cursor-pointer"
            title="Exit"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Row (Wall of Thoughts is Placed 2nd for Instant Visibility!) */}
      <div className="px-4 pt-2 pb-1 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 overflow-x-auto flex gap-1.5 scrollbar-none">
        {[
          { id: 'new', label: 'New Requests' },
          { id: 'wall', label: '🌟 Wall of Thoughts' },
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
            className={`px-3 py-1.5 rounded-full text-[10.5px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-[#526140] text-white shadow-xs'
                : 'bg-[#edefe0] text-[#5e5c52] hover:text-[#1a1d14]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 pb-6">
        {/* ================= TAB 2: WALL OF THOUGHTS COMPOSER & FEED ================= */}
        {activeTab === 'wall' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Direct Publisher Card */}
            <div className="bg-gradient-to-br from-[#f3f5e6] to-[#edefe0] border border-[#526140]/40 rounded-3xl p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#526140] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#526140]" />
                  <span>Post Verified Peer Encouragement</span>
                </span>
                <span className="font-mono text-[8.5px] bg-[#526140]/15 text-[#526140] px-2 py-0.5 rounded-full font-bold">
                  🌟 Verified Guide
                </span>
              </div>

              <p className="text-xs text-[#5e5c52] leading-relaxed">
                As a psychology peer guide, your words offer tremendous comfort to students reading the <b>Wall of Thoughts</b> on the Home Screen.
              </p>

              <form onSubmit={handlePostWallThought} className="space-y-2.5 pt-1">
                <textarea
                  rows={3}
                  value={newWallThought}
                  onChange={(e) => setNewWallThought(e.target.value)}
                  placeholder="Write an uplifting message, study grounding tip, or reminder for students today..."
                  className="w-full bg-white border border-[#c5c8bc]/70 rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none shadow-2xs"
                />

                {/* Tag Selection */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '#StudyEncouragement',
                    '#ExamRelief',
                    '#SelfCompassion',
                    '#PeerGuideTip',
                    '#HostelLife'
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                        selectedTag === tag
                          ? 'bg-[#526140] text-white font-bold'
                          : 'bg-white border border-[#c5c8bc]/60 text-[#5e5c52]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!newWallThought.trim()}
                  className={`w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    newWallThought.trim()
                      ? 'bg-[#526140] hover:bg-[#435034] text-white cursor-pointer'
                      : 'bg-[#c5c8bc]/50 text-[#75786e] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Student Wall of Thoughts</span>
                </button>
              </form>

              {postSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-2.5 text-center text-xs font-bold text-emerald-950 animate-fadeIn">
                  ✨ Published! Your message is now live on the Student Home Wall.
                </div>
              )}
            </div>

            {/* Volunteer Posts Feed */}
            <div className="space-y-2">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block px-1">
                Recent Thoughts from Peer Guides
              </span>

              {volunteerPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-3.5 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[9.5px] font-mono">
                    <span className="font-bold text-[#526140]">{post.author}</span>
                    <span className="text-[#75786e]">{post.date}</span>
                  </div>
                  <p className="text-xs text-[#1a1d14] leading-relaxed">
                    "{post.text}"
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-[#f3f5e6]">
                    <span className="font-mono text-[9px] bg-[#ffddb3]/30 text-[#815505] px-2 py-0.5 rounded-full font-semibold">
                      {post.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[#5e5c52] flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                      {post.warmthCount} Warmth
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TABS: PEER REQUESTS & LIVE CHAT ================= */}
        {activeTab !== 'wall' && !selectedRequest && (
          <div className="space-y-2.5">
            {/* Quick-Prompt Banner on New Requests Tab */}
            {activeTab === 'new' && (
              <div className="bg-[#f3f5e6] border border-[#526140]/30 rounded-3xl p-3 flex items-center justify-between shadow-2xs mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#526140]" />
                  <span className="text-xs font-semibold text-[#1a1d14]">Want to post peer encouragement?</span>
                </div>
                <button
                  onClick={() => setShowWallComposerModal(true)}
                  className="px-2.5 py-1 rounded-full bg-[#526140] text-white text-[10px] font-bold cursor-pointer"
                >
                  Post Thought ✍️
                </button>
              </div>
            )}

            {filteredRequests.length === 0 ? (
              <div className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-6 text-center text-xs text-[#5e5c52]">
                No requests in this queue right now.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#edefe0] text-[#526140] font-bold px-2 py-0.5 rounded-md">
                        {req.anonId}
                      </span>
                      <span className="font-mono text-[9px] text-[#75786e]">{req.requestedAt}</span>
                    </div>

                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        req.urgency === 'High'
                          ? 'bg-red-100 text-red-800'
                          : req.urgency === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {req.urgency} Urgency
                    </span>
                  </div>

                  <p className="text-xs text-[#1a1d14] leading-relaxed">
                    "{req.message}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#f3f5e6]">
                    <div className="flex gap-1">
                      {req.concernAreas.map((c) => (
                        <span key={c} className="text-[9px] bg-[#f3f5e6] text-[#5e5c52] px-2 py-0.5 rounded-full font-medium">
                          {c}
                        </span>
                      ))}
                    </div>

                    {req.status === 'new' ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleAcceptRequest(req)}
                          className="px-3 py-1.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white text-[10.5px] font-bold cursor-pointer shadow-2xs"
                        >
                          Accept Chat
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(req.id)}
                          className="px-2.5 py-1.5 rounded-full bg-[#edefe0] hover:bg-[#e0e2d3] text-[#5e5c52] text-[10.5px] font-semibold cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="px-3.5 py-1.5 rounded-full bg-[#526140] text-white text-[10.5px] font-bold cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <span>Open Chat</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Selected Request Chat View */}
        {activeTab !== 'wall' && selectedRequest && (
          <div className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-3 shadow-xs animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#f3f5e6]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-1 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <b className="text-xs text-[#1a1d14] block">Chatting with {selectedRequest.anonId}</b>
                  <span className="font-mono text-[9px] text-[#526140]">Confidential Peer Session</span>
                </div>
              </div>

              <button
                onClick={() => setShowEscalateModal(true)}
                className="px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold cursor-pointer flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3 text-amber-700" />
                <span>Escalate to Counsellor</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-2 max-h-64 overflow-y-auto p-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'volunteer' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-2xl text-xs ${
                      msg.sender === 'volunteer'
                        ? 'bg-[#526140] text-white rounded-br-none'
                        : 'bg-[#f3f5e6] text-[#1a1d14] rounded-bl-none border border-[#c5c8bc]/50'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8.5px] font-mono text-[#75786e] mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <form onSubmit={handleSendVolunteerReply} className="flex gap-2 pt-1 border-t border-[#f3f5e6]">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type an empathetic reply..."
                className="flex-1 bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-2xl px-3 py-2 text-xs text-[#1a1d14] focus:outline-none focus:border-[#526140]"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="p-2 rounded-2xl bg-[#526140] text-white hover:bg-[#435034] disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* POPUP MODAL: WALL OF THOUGHTS COMPOSER */}
      {showWallComposerModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-[#f3f5e6]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#526140]" />
                <b className="text-xs text-[#1a1d14]">Post to Student Wall of Thoughts</b>
              </div>
              <button
                onClick={() => setShowWallComposerModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {postSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center space-y-1 animate-fadeIn">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <b className="text-xs text-emerald-950 block">Published to Sanctuary Wall!</b>
                <p className="text-[10.5px] text-emerald-800">
                  Your encouragement is now visible to all students.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePostWallThought} className="space-y-2.5">
                <textarea
                  rows={3}
                  value={newWallThought}
                  onChange={(e) => setNewWallThought(e.target.value)}
                  placeholder="Share a gentle thought, study reminder, or words of encouragement for students..."
                  className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/70 rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
                />

                {/* Tag Selection */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '#StudyEncouragement',
                    '#ExamRelief',
                    '#SelfCompassion',
                    '#PeerGuideTip'
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                        selectedTag === tag
                          ? 'bg-[#526140] text-white font-bold'
                          : 'bg-[#edefe0] text-[#5e5c52]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={!newWallThought.trim()}
                    className="flex-1 py-2.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    Publish Thought
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWallComposerModal(false)}
                    className="px-4 py-2.5 rounded-full bg-[#edefe0] text-[#5e5c52] text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {showEscalateModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>Escalate to Licensed Counsellor</span>
              </div>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
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
