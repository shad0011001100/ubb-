import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, ArrowLeft, Bot, Zap, Settings, X, Check } from 'lucide-react';
import { api } from '../../services/api';
import { getTranslation } from '../../services/translations';
import { fastAIEngine } from '../../services/fastAIStreaming';

export function Screen04AIChat({
  userProfile,
  onEscalateToPeer,
  onTriggerCrisis,
  onNavigate
}) {
  const userLang = userProfile?.selected_language || userProfile?.language || 'en';
  const t = getTranslation(userLang);

  const initialGreetingText = t.aiChat.initialGreeting;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: initialGreetingText,
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [escalationReady, setEscalationReady] = useState(false);
  const [triageStep, setTriageStep] = useState(1);
  const [triageSummary, setTriageSummary] = useState('');
  const [matchedPeer, setMatchedPeer] = useState({
    name: 'Amber_17',
    role: userLang === 'mr' ? 'पीअर गाईड (३रे वर्ष सायकॉलॉजी)' : 'Peer Guide (3rd Yr Psychology)',
    verificationType: 'Supervised by Dr. Rao, Reg. No. 4521'
  });
  const [latestNlpBadge, setLatestNlpBadge] = useState(null);
  const [showEngineModal, setShowEngineModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(fastAIEngine.getProvider().provider);
  const [groqKeyInput, setGroqKeyInput] = useState(localStorage.getItem('ubb_groq_key') || '');
  const messagesEndRef = useRef(null);

  const PRESET_PROMPTS = userLang === 'mr' ? [
    "गेले काही दिवस अजिबात झोप येत नाहीये आणि परीक्षेचा प्रचंड ताण आलाय",
    "खूप भीती वाटतेय, अभ्यास होत नाहीये आणि घरच्यांच्या खूप अपेक्षा आहेत",
    "माझ्या वर्गमित्रांच्या तुलनेत मी खूप मागे पडलोय असं वाटतं",
    "सगळं संपवावंसं वाटतंय, काहीच सुचत नाहीये" // Crisis test phrase
  ] : [
    "I haven't been able to sleep in days and feel like I can't cope with exams",
    "खूप भीती वाटतेय, अभ्यास होत नाहीये आणि घरचे अपेक्षा ठेवतात",
    "I feel like a total failure compared to my classmates",
    "सगळं संपवावंसं वाटतंय, काहीच सुचत नाहीये" // Crisis test phrase
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, escalationReady, isTyping]);

  const handleSendMessage = async (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 1. Instant Crisis & Sentiment Detection (<1ms)
    const nlpResult = await api.analyzeNLP({
      text: textToSend,
      anonymousId: userProfile?.anonymous_tag || userProfile?.anonymousId || 'Sprout_042',
      language: userLang,
      forceOnDevice: true
    });

    setLatestNlpBadge(nlpResult);

    // 2. Instant Crisis Auto-Lock
    if (nlpResult.triggerAction === 'auto_lock' || nlpResult.isCrisis) {
      setIsTyping(false);
      if (onTriggerCrisis) {
        onTriggerCrisis(textToSend, nlpResult);
      }
      return;
    }

    // 3. Real-Time Streaming Output (Begins instantly with 0ms wait)
    const botMsgId = Date.now() + 1;
    let hasCreatedBotMsg = false;

    await fastAIEngine.streamResponse({
      text: textToSend,
      step: triageStep,
      language: userLang,
      conversationHistory: messages,
      onToken: (_token, accumulatedText) => {
        setIsTyping(false);
        if (!hasCreatedBotMsg) {
          hasCreatedBotMsg = true;
          setMessages((prev) => [
            ...prev,
            {
              id: botMsgId,
              sender: 'bot',
              text: accumulatedText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, text: accumulatedText } : m))
          );
        }
      },
      onDone: (result) => {
        setIsTyping(false);
        setTriageStep(result.step || triageStep + 1);

        if (result.escalationReady) {
          setEscalationReady(true);
          if (result.triageSummary) setTriageSummary(result.triageSummary);
          if (result.matchedPeer) setMatchedPeer(result.matchedPeer);
        }
      }
    });
  };

  const handleSaveEngineSettings = () => {
    fastAIEngine.setProvider(selectedProvider, groqKeyInput.trim());
    setShowEngineModal(false);
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-[#D9E2DC] flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-full bg-[#4E7C63] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-xs text-[#14282B] flex items-center gap-1.5">
              <span>{t.aiChat.headerTitle}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E7C63] animate-pulse" />
            </div>
            <div className="text-[9.5px] text-[#4E7C63] font-mono">
              {t.aiChat.stepSub.replace('{step}', Math.min(3, triageStep))}
            </div>
          </div>
        </div>

        {/* Engine Switcher Badge */}
        <button
          onClick={() => setShowEngineModal(true)}
          className="flex items-center gap-1.5 text-[9px] font-mono bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 shadow-2xs cursor-pointer transition-all active:scale-95"
        >
          <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600 animate-pulse" />
          <span className="font-bold">
            {selectedProvider === 'groq' ? '🚀 Groq LPU' : '⚡ 0ms Instant'}
          </span>
          <Settings className="w-2.5 h-2.5 text-emerald-700 ml-0.5" />
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#4E7C63] text-white rounded-br-xs shadow-xs'
                  : 'bg-[#F2F6F3] text-[#14282B] rounded-bl-xs border border-[#D9E2DC]/80'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[8.5px] text-[#5B6E67] mt-0.5 px-1 font-mono">{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-[#5B6E67] text-[10px] px-2 py-1 bg-[#F2F6F3]/50 rounded-lg w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4E7C63] animate-bounce" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#4E7C63] animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#4E7C63] animate-bounce [animation-delay:0.4s]" />
            <span className="font-mono text-[9px] ml-1">{t.aiChat.analyzingText}</span>
          </div>
        )}

        {/* Workflow B: Escalation Flag UI Component with Brainwave Map */}
        {escalationReady && (
          <div className="bg-[#FBECE5] border border-[#E3A06F] rounded-xl p-3.5 text-[#7A4A26] space-y-2.5 animate-fadeIn shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#E3A06F] text-[#241208] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-2xs">
                ★
              </div>
              <div className="text-xs flex-1">
                <div className="font-bold text-[#241208] text-xs mb-0.5">
                  {t.aiChat.matchedPeerTitle.replace('{name}', matchedPeer.name).replace('{role}', matchedPeer.role)}
                </div>
                <p className="text-[11px] text-[#7A4A26] leading-relaxed">
                  {userLang === 'mr'
                    ? "परीक्षेच्या ताणावर मात करण्यासाठी मी तुम्हाला समवयस्क मार्गदर्शकाशी जोडत आहे. पण तोपर्यंत तुमचे विचार शांत करण्यासाठी मी 'सेल्फ-केअर' टॅबमध्ये थीटा-वेव्ह ऑडिओ (६Hz) लोड केला आहे."
                    : "It sounds like you're dealing with severe strain. I'm routing you to a peer, but while you wait, I've loaded an AI-prescribed Theta-wave binaural track in your Self-Care tab to help slow your racing thoughts."}
                </p>
              </div>
            </div>

            {/* AI Prescribed Audio Quick Action */}
            <div className="bg-white/80 border border-[#E3A06F]/40 rounded-lg p-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-[#241208] font-mono">
                <span className="text-base">🎧</span>
                <span><b>Theta Waves (6Hz)</b> · Anxiety Relief</span>
              </div>
              <button
                onClick={() => onNavigate('self_care')}
                className="text-[9.5px] px-2.5 py-1 rounded-full bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-semibold cursor-pointer transition-all shadow-2xs"
              >
                {userLang === 'mr' ? 'ऐका →' : 'Listen Now →'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => onEscalateToPeer(matchedPeer)}
                className="text-[11px] px-3.5 py-1.5 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {t.aiChat.startPeerBtn.replace('{name}', matchedPeer.name)}
              </button>
              <button
                onClick={() => onNavigate('peer_matching')}
                className="text-[10px] px-3 py-1.5 rounded-full bg-white border border-[#D9E2DC] text-[#14282B] hover:bg-slate-50 cursor-pointer"
              >
                {t.aiChat.chooseElseBtn}
              </button>
            </div>
          </div>
        )}

        {/* Test Prompt Chips */}
        {!escalationReady && (
          <div className="pt-2">
            <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#5B6E67] mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E3A06F]" />
                {t.aiChat.testPromptTitle}
              </span>
              {latestNlpBadge && (
                <span className="text-[8.5px] text-[#3A5F4B] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {latestNlpBadge.detectedLanguage?.toUpperCase()} · {latestNlpBadge.sentiment}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {PRESET_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className={`text-left text-[10.5px] p-2 rounded-lg border transition-all cursor-pointer active:scale-98 ${
                    prompt.includes('सगळं संपवावंसं')
                      ? 'border-red-200 bg-red-50/80 text-red-900 hover:bg-red-100'
                      : 'border-[#D9E2DC] bg-[#F2F6F3]/70 hover:bg-[#F2F6F3] text-[#14282B]'
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#C9814F] mr-1 font-semibold">
                    {prompt.includes('सगळं संपवावंसं') ? '🚨 [Crisis Trigger]' : `[Scenario ${idx + 1}]`}
                  </span>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 border-t border-[#D9E2DC] bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={t.aiChat.inputPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-3.5 py-2 text-xs text-[#14282B] placeholder-[#5B6E67] focus:outline-none focus:border-[#4E7C63]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-xl bg-[#4E7C63] hover:bg-[#3A5F4B] disabled:opacity-40 text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* AI Engine Settings Modal */}
      {showEngineModal && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full space-y-3.5 shadow-2xl border border-[#D9E2DC]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-[#14282B]">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>AI Speed &amp; Engine Settings</span>
              </div>
              <button
                onClick={() => setShowEngineModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {/* Option 1: Instant On-Device (0ms) */}
              <button
                onClick={() => setSelectedProvider('instant')}
                className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedProvider === 'instant'
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-900 flex items-center gap-1">
                    ⚡ Instant On-Device (0ms)
                  </span>
                  {selectedProvider === 'instant' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  100% Free, zero lag, private in-browser neural processing.
                </p>
              </button>

              {/* Option 2: Groq LPU (Ultra Fast Cloud) */}
              <button
                onClick={() => setSelectedProvider('groq')}
                className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedProvider === 'groq'
                    ? 'border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-900 flex items-center gap-1">
                    🚀 Groq LPU (800 tok/s)
                  </span>
                  {selectedProvider === 'groq' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Blazing fast Llama-3.1-8B cloud inference.
                </p>

                {selectedProvider === 'groq' && (
                  <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="password"
                      placeholder="Paste Groq API Key (gsk_...)"
                      value={groqKeyInput}
                      onChange={(e) => setGroqKeyInput(e.target.value)}
                      className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-[10.5px] text-slate-800 focus:outline-none"
                    />
                    <span className="text-[9px] text-slate-500 block mt-0.5">
                      Optional: Keys saved locally only.
                    </span>
                  </div>
                )}
              </button>
            </div>

            <button
              onClick={handleSaveEngineSettings}
              className="w-full py-2.5 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
            >
              Apply Speed Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
