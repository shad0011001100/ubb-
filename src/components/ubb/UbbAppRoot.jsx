import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  LayoutGrid,
  Users,
  BarChart3,
  Cpu,
  ShieldCheck,
  Radio,
  ArrowLeft
} from 'lucide-react';
import { PureUserApp } from './PureUserApp';
import { Screen01Onboarding } from './Screen01Onboarding';
import { Screen02Screening } from './Screen02Screening';
import { Screen03Home } from './Screen03Home';
import { Screen04AIChat } from './Screen04AIChat';
import { Screen05PeerMatching } from './Screen05PeerMatching';
import { Screen06ConsentGate } from './Screen06ConsentGate';
import { Screen07Progress } from './Screen07Progress';
import { Screen08SOS } from './Screen08SOS';
import { Screen09SelfCare } from './Screen09SelfCare';
import { Screen10AutoCrisis } from './Screen10AutoCrisis';
import { PeerCoPilotView } from './PeerCoPilotView';
import { AdminDashboardView } from './AdminDashboardView';
import { ScreenGalleryView } from './ScreenGalleryView';
import { ArchitectureBlueprintView } from './ArchitectureBlueprintView';
import { api } from '../../services/api';

export function UbbAppRoot() {
  // Top View Mode: 'pure_user' | 'interactive_app' | 'gallery' | 'peer_copilot' | 'admin_portal' | 'blueprint'
  const [viewMode, setViewMode] = useState('pure_user');

  // Active Mobile App Screen for interactive testing
  const [mobileScreen, setMobileScreen] = useState('onboarding');

  // User Profile
  const [userProfile, setUserProfile] = useState({
    anonymousId: 'Sprout_042',
    anonymous_tag: 'Sprout_042',
    language: 'en',
    selected_language: 'en',
    current_streak: 12,
    breakGlassContact: '+91 98765 43210',
    encrypted_break_glass_contact: '+91 98765 43210'
  });

  // Screening Results
  const [screeningResults, setScreeningResults] = useState({
    score: 8,
    tier: 'peer',
    risk_tier: 'MODERATE',
    answers: { 1: 1, 2: 1, 3: 2, 4: 1, 5: 0, 6: 1, 7: 1, 8: 1 },
    recommendationText: "You've felt loss of interest & exam strain recently. A peer supporter who understands campus life could help more than a chatbot right now."
  });

  // Flagged crisis phrase
  const [flaggedCrisisContext, setFlaggedCrisisContext] = useState('');
  const [serverOnline, setServerOnline] = useState(false);
  const [latestLiveEvent, setLatestLiveEvent] = useState(null);

  // Sync with backend on mount & subscribe to SSE
  useEffect(() => {
    const initBackend = async () => {
      const health = await api.checkHealth();
      if (health && health.status === 'ONLINE') {
        setServerOnline(true);
      }
    };
    initBackend();

    const unsubscribe = api.subscribeToEvents((event) => {
      setLatestLiveEvent(event);
      if (event.type === 'CRISIS_AUTO_LOCKED') {
        setFlaggedCrisisContext(event.data?.reason || 'Crisis Language Detected');
        setMobileScreen('auto_crisis');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCrisisTrigger = (text) => {
    setFlaggedCrisisContext(text);
    setMobileScreen('auto_crisis');
  };

  // If in Pure User Mode, render only what the student sees
  if (viewMode === 'pure_user') {
    return <PureUserApp onOpenDevPortal={() => setViewMode('interactive_app')} />;
  }

  return (
    <div className="min-h-screen bg-[#14282B] text-white flex flex-col font-work selection:bg-[#E3A06F] selection:text-[#241208]">
      {/* Top Multi-Frontend Navigation Bar (Portals & Analytics) */}
      <header className="bg-[#0C1A1C] border-b border-white/10 px-4 py-2.5 sticky top-0 z-50 flex items-center justify-between flex-wrap gap-2 shadow-lg">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('pure_user')}
            className="flex items-center gap-1.5 bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Pure User App</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-fraunces font-bold text-base tracking-tight text-white">
                Ubb (ऊब)
              </span>
              <span className="font-mono text-[9px] bg-[#E3A06F]/20 text-[#E3A06F] px-1.5 py-0.5 rounded font-semibold">
                Portals &amp; Evaluation Center
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center bg-black/40 border border-white/10 p-1 rounded-xl gap-1">
          <button
            onClick={() => setViewMode('interactive_app')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'interactive_app'
                ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-xs'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Screen</span> Simulator
          </button>

          <button
            onClick={() => setViewMode('gallery')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-xs'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>10 Screens Gallery</span>
          </button>

          <button
            onClick={() => setViewMode('peer_copilot')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'peer_copilot'
                ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-xs'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Peer Co-Pilot</span>
          </button>

          <button
            onClick={() => setViewMode('admin_portal')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'admin_portal'
                ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-xs'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Admin &amp; Crisis Queue</span>
          </button>

          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'blueprint'
                ? 'bg-[#E3A06F] text-[#241208] font-bold shadow-xs'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Workflows Blueprint</span>
          </button>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[9.5px] bg-[#1E3A3D] text-[#D6E2DC] px-2.5 py-1 rounded-full border border-white/10">
            <ShieldCheck className="w-3 h-3 text-[#4E7C63]" />
            <span className="hidden md:inline">Ollama + Supabase:</span>
            <span className="text-[#A3D1B9] font-bold">Zero PII</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[9px] bg-black/40 text-[#8FA69C] px-2 py-1 rounded-full border border-white/10">
            <Radio className={`w-2.5 h-2.5 ${serverOnline ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <span>{serverOnline ? 'Backend SSE Live' : 'On-Device Engine'}</span>
          </div>
        </div>
      </header>

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* ================= VIEW 1: SCREEN SIMULATOR ================= */}
        {viewMode === 'interactive_app' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
            {/* Quick Screen Jump Toolbar */}
            <div className="mb-3 flex items-center gap-2 bg-[#0C1A1C] border border-white/15 px-3 py-1.5 rounded-2xl shadow-lg flex-wrap justify-center">
              <span className="font-mono text-[10px] text-[#E3A06F] uppercase tracking-wider font-semibold">
                Jump to Screen:
              </span>
              {[
                { id: 'onboarding', label: '01 · Onboarding' },
                { id: 'screening', label: '02 · PHQ-9' },
                { id: 'home', label: '03 · Home' },
                { id: 'ai_chat', label: '04 · AI Triage' },
                { id: 'peer_matching', label: '05 · Peers' },
                { id: 'consent_gate', label: '06 · Consent' },
                { id: 'progress', label: '07 · Progress' },
                { id: 'sos', label: '08 · SOS' },
                { id: 'self_care', label: '09 · Self-Care' },
                { id: 'auto_crisis', label: '10 · Auto-Crisis' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setMobileScreen(s.id)}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer ${
                    mobileScreen === s.id
                      ? 'bg-[#E3A06F] text-[#241208] font-bold'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Mobile Device Mockup Frame */}
            <div className="w-[360px] h-[720px] max-h-[85vh] bg-[#F2F6F3] rounded-[44px] border-[10px] border-[#0C1A1C] shadow-2xl overflow-hidden relative flex flex-col">
              {/* Top Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0C1A1C] rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-800 mr-2" />
                <div className="w-10 h-1.5 rounded-full bg-slate-800" />
              </div>

              {/* Mobile Screen Container */}
              <div className="flex-1 overflow-hidden pt-4 flex flex-col">
                {mobileScreen === 'onboarding' && (
                  <Screen01Onboarding
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    onComplete={() => setMobileScreen('screening')}
                  />
                )}

                {mobileScreen === 'screening' && (
                  <Screen02Screening
                    screeningResults={screeningResults}
                    setScreeningResults={setScreeningResults}
                    userProfile={userProfile}
                    onComplete={() => setMobileScreen('home')}
                  />
                )}

                {mobileScreen === 'home' && (
                  <Screen03Home
                    userProfile={userProfile}
                    screeningResults={screeningResults}
                    onNavigate={(screen) => setMobileScreen(screen)}
                    onOpenSOS={() => setMobileScreen('sos')}
                  />
                )}

                {mobileScreen === 'ai_chat' && (
                  <Screen04AIChat
                    userProfile={userProfile}
                    onEscalateToPeer={() => setMobileScreen('peer_matching')}
                    onTriggerCrisis={handleCrisisTrigger}
                    onNavigate={(screen) => setMobileScreen(screen)}
                  />
                )}

                {mobileScreen === 'peer_matching' && (
                  <Screen05PeerMatching
                    userProfile={userProfile}
                    screeningResults={screeningResults}
                    onSelectPeer={(_peer) => {
                      setMobileScreen('consent_gate');
                    }}
                    onNavigate={(screen) => setMobileScreen(screen)}
                  />
                )}

                {mobileScreen === 'consent_gate' && (
                  <Screen06ConsentGate
                    userProfile={userProfile}
                    peerName="Amber_17"
                    onAccept={() => setMobileScreen('peer_matching')}
                    onDecline={(_count) => {}}
                    onDeadlockTriggered={() => {}}
                    onNavigate={(screen) => setMobileScreen(screen)}
                  />
                )}

                {mobileScreen === 'progress' && (
                  <Screen07Progress
                    userProfile={userProfile}
                    onNavigate={(screen) => setMobileScreen(screen)}
                  />
                )}

                {mobileScreen === 'sos' && (
                  <Screen08SOS
                    userProfile={userProfile}
                    onClose={() => setMobileScreen('home')}
                  />
                )}

                {mobileScreen === 'self_care' && (
                  <Screen09SelfCare
                    userProfile={userProfile}
                    onNavigate={(screen) => setMobileScreen(screen)}
                  />
                )}

                {mobileScreen === 'auto_crisis' && (
                  <Screen10AutoCrisis
                    detectedText={flaggedCrisisContext || "सगळं संपवावंसं वाटतंय, काहीच सुचत नाहीये"}
                    onOpenHelpline={() => setMobileScreen('sos')}
                    onConnectCounselor={() => setMobileScreen('peer_matching')}
                    onDismiss={() => setMobileScreen('home')}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: 10 SCREENS GALLERY ================= */}
        {viewMode === 'gallery' && (
          <ScreenGalleryView
            userProfile={userProfile}
            screeningResults={screeningResults}
            onNavigateScreen={(screenId) => {
              setMobileScreen(screenId);
              setViewMode('interactive_app');
            }}
          />
        )}

        {/* ================= VIEW 3: PEER VOLUNTEER CO-PILOT ================= */}
        {viewMode === 'peer_copilot' && (
          <PeerCoPilotView
            volunteerName="Amber_17"
            supervisorInfo="Supervised by Dr. Rao (Reg. 4521)"
          />
        )}

        {/* ================= VIEW 4: ADMIN CAMPUS WELLBEING DASHBOARD ================= */}
        {viewMode === 'admin_portal' && (
          <AdminDashboardView />
        )}

        {/* ================= VIEW 5: SYSTEM ARCHITECTURE BLUEPRINT ================= */}
        {viewMode === 'blueprint' && (
          <ArchitectureBlueprintView />
        )}
      </main>
    </div>
  );
}
