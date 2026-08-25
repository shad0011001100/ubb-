import React, { useState, useEffect } from 'react';
import {
  Clock,
  ShieldCheck,
  Sparkles,
  Send,
  HeartHandshake,
  UserX,
  Coffee
} from 'lucide-react';
import { api } from '../../services/api';

export function PeerCoPilotView({
  peer = {
    id: "peer-amber-17",
    name: "Amber_17",
    role: "3RD YR PSYCHOLOGY",
    verificationType: "Supervised by Dr. Rao, Reg. No. 4521",
    activeMinutesToday: 75,
    maxAllowedMinutes: 120,
    status: "online"
  },
  studentId = "Sprout_042",
  onSuggestEscalation,
  onFlagTroll
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'student',
      text: "I haven't been able to sleep for 3 days and feel like I'm failing everyone with mid-terms.",
      time: "10:14 PM"
    },
    {
      id: 2,
      sender: 'peer',
      text: "Hey, thank you for sharing that with me. Mid-terms are horribly stressful. Let's take a deep breath together.",
      time: "10:15 PM"
    },
    {
      id: 3,
      sender: 'student',
      text: "My parents expect top grades and I just feel paralyzed whenever I open my textbook.",
      time: "10:16 PM"
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [activeMinutes, setActiveMinutes] = useState(peer.activeMinutesToday || 75);
  const [peerStatus, setPeerStatus] = useState(peer.status || 'online');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [trollFlagged, setTrollFlagged] = useState(false);

  // Load AI Co-pilot suggestions for student's last message
  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      const lastStudentMsg = messages.filter(m => m.sender === 'student').pop();
      const res = await api.getCoPilotSuggestions({
        userMessage: lastStudentMsg ? lastStudentMsg.text : "I feel stressed",
        peerName: peer.name
      });
      if (res && res.suggestions) {
        setSuggestions(res.suggestions);
      }
      setIsLoadingSuggestions(false);
    };
    fetchSuggestions();
  }, [messages, peer.name]);

  const handleSendMessage = () => {
    if (!inputMsg.trim() || peerStatus === 'burnout_cooldown') return;
    const newMsg = {
      id: Date.now(),
      sender: 'peer',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  const handleApplySuggestion = (text) => {
    setInputMsg(text);
  };

  // Workflow C: Time Tracker Simulation
  const handleSimulateTime = async (minutes) => {
    const updatedMinutes = activeMinutes + minutes;
    setActiveMinutes(updatedMinutes);

    const res = await api.updatePeerActiveTime(peer.id, minutes);
    if (res.peer && res.peer.status === 'burnout_cooldown') {
      setPeerStatus('burnout_cooldown');
    } else if (updatedMinutes >= 120) {
      setPeerStatus('burnout_cooldown');
    }
  };

  const handleEscalationClick = () => {
    setIsEscalated(true);
    if (onSuggestEscalation) onSuggestEscalation();
  };

  const handleFlagTrollClick = async () => {
    setTrollFlagged(true);
    await api.toggleShadowban({
      deviceFingerprint: "fp_browser_hash_9281x",
      reason: "Harassment and offensive behavior flagged by peer volunteer",
      anonymousId: studentId
    });
    if (onFlagTroll) onFlagTroll();
  };

  const isBurnout = peerStatus === 'burnout_cooldown' || activeMinutes >= 120;

  return (
    <div className="h-full bg-[#14282B] text-white flex flex-col justify-between select-none overflow-hidden font-work">
      {/* Top Volunteer Console Header */}
      <div className="bg-[#1E3A3D] border-b border-white/10 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E3A06F] text-[#241208] font-bold text-sm flex items-center justify-center">
            {peer.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-fraunces font-semibold text-sm text-white">{peer.name} (Volunteer Console)</span>
              <span className="font-mono text-[9px] bg-white/10 text-[#C3D2CB] px-2 py-0.5 rounded">
                Chatting with: {studentId}
              </span>
            </div>
            <div className="font-mono text-[9.5px] text-[#8FA69C] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#4E7C63]" />
              <span>{peer.verificationType}</span>
            </div>
          </div>
        </div>

        {/* Workflow C: Burnout Timer & Guardrail Status */}
        <div className="flex items-center gap-3 bg-black/30 border border-white/10 px-3.5 py-1.5 rounded-xl">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isBurnout ? 'text-[#B84C4C] animate-pulse' : 'text-[#E3A06F]'}`} />
            <div>
              <div className="font-mono text-[10px] text-white flex items-center gap-1">
                <span>Active Shift:</span>
                <b className={isBurnout ? 'text-red-400' : 'text-[#E3A06F]'}>
                  {activeMinutes} / 120 mins
                </b>
              </div>
              <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden mt-0.5">
                <div
                  style={{ width: `${Math.min(100, (activeMinutes / 120) * 100)}%` }}
                  className={`h-full ${isBurnout ? 'bg-red-500' : 'bg-[#E3A06F]'}`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSimulateTime(30)}
            className="text-[9.5px] font-mono bg-white/10 hover:bg-white/20 text-[#E3A06F] px-2 py-1 rounded cursor-pointer transition-all"
            title="Simulate adding active chat time to test 2-hour burnout guardrail"
          >
            +30m Shift
          </button>
        </div>
      </div>

      {/* Burnout Cooldown Alert Banner */}
      {isBurnout && (
        <div className="bg-[#B84C4C] text-white px-4 py-2.5 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Coffee className="w-4 h-4" />
            <span>Workflow C Triggered: 2-Hour Active Shift Limit Reached. 24-Hour Mandatory Rest Enforced.</span>
          </div>
          <span className="font-mono text-[10px] bg-black/30 px-2 py-0.5 rounded">
            Rest Period Active
          </span>
        </div>
      )}

      {/* Main Split: Live Chat (Left) + AI Co-Pilot Guardrails (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {/* Left 2 Cols: Live Chat Room */}
        <div className="md:col-span-2 flex flex-col justify-between bg-[#14282B] border-r border-white/10 overflow-hidden">
          {/* Chat transcript */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'peer' ? 'items-end' : 'items-start'}`}
              >
                <div className="font-mono text-[9px] text-[#8FA69C] mb-0.5">
                  {msg.sender === 'peer' ? `${peer.name} (You)` : studentId} · {msg.time}
                </div>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'peer'
                      ? 'bg-[#3A5F4B] text-white rounded-br-xs'
                      : 'bg-white/10 text-white rounded-bl-xs border border-white/10'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Action Toolbar & Input */}
          <div className="p-3 border-t border-white/10 bg-[#1E3A3D]/70 space-y-2">
            {/* Quick Actions */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={handleEscalationClick}
                disabled={isEscalated}
                className={`text-[10px] font-mono px-3 py-1 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-all ${
                  isEscalated
                    ? 'bg-emerald-900/50 border-emerald-500 text-emerald-300'
                    : 'bg-white/10 border-white/20 text-[#E3A06F] hover:bg-white/20'
                }`}
              >
                <HeartHandshake className="w-3 h-3" />
                <span>{isEscalated ? 'Consent Gate Dispatched' : 'Suggest Clinical Escalation'}</span>
              </button>

              <button
                onClick={handleFlagTrollClick}
                disabled={trollFlagged}
                className={`text-[10px] font-mono px-3 py-1 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-all ${
                  trollFlagged
                    ? 'bg-red-900/50 border-red-500 text-red-300'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-red-950/40 hover:text-red-300'
                }`}
                title="Workflow D: Silently reroutes troll to bot honeypot sandbox"
              >
                <UserX className="w-3 h-3" />
                <span>{trollFlagged ? 'Troll Isolated in Honeypot' : 'Flag Troll Harassment'}</span>
              </button>
            </div>

            {/* Message input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled={isBurnout}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isBurnout
                    ? "Shift locked for 24h rest period..."
                    : "Type clinically-safe response or click an AI suggestion on the right..."
                }
                className="flex-1 bg-black/30 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E3A06F] disabled:opacity-30"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMsg.trim() || isBurnout}
                className="px-4 py-2 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] disabled:opacity-30 text-[#241208] font-semibold text-xs transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Co-Pilot & Boundary Guardrails */}
        <div className="bg-[#1E3A3D] p-4 flex flex-col justify-between overflow-y-auto space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[10px] text-[#E3A06F] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E3A06F]" />
                <span>AI Co-Pilot Guardrails</span>
              </div>
              <span className="font-mono text-[8.5px] bg-[#4E7C63]/20 text-[#A3D1B9] px-2 py-0.5 rounded">
                Ollama Engine
              </span>
            </div>

            <p className="text-[11px] text-[#C3D2CB] leading-relaxed mb-3">
              3 boundary-respecting responses generated in real-time. Peer volunteers must never diagnose or offer medical prescriptions.
            </p>

            {/* Suggestions cards */}
            <div className="space-y-2.5">
              {isLoadingSuggestions ? (
                <div className="text-center py-6 text-xs text-white/50 font-mono">
                  Synthesizing boundary-safe responses…
                </div>
              ) : (
                suggestions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => handleApplySuggestion(opt.text)}
                    className="bg-black/20 hover:bg-black/40 border border-white/10 hover:border-[#E3A06F] rounded-xl p-3 space-y-1.5 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-[#E3A06F] font-semibold">
                        {opt.tone}
                      </span>
                      <span className="text-[8.5px] text-[#8FA69C] group-hover:text-white transition-colors">
                        Click to Use ↵
                      </span>
                    </div>
                    <p className="text-xs text-white/90 leading-snug group-hover:text-white">
                      "{opt.text}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Guidelines footer */}
          <div className="bg-black/30 border border-white/10 rounded-xl p-3 text-[10px] text-[#8FA69C] space-y-1 font-mono">
            <div className="font-semibold text-white">Peer Volunteer Standards:</div>
            <div>• Active listening &amp; emotional validation</div>
            <div>• Never promise outcomes or prescribe drugs</div>
            <div>• Escalate to Dr. Priya if crisis ideation emerges</div>
          </div>
        </div>
      </div>
    </div>
  );
}
