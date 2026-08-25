import React, { useState, useEffect } from 'react';
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
import { api } from '../../services/api';

export function PureUserApp({ onOpenDevPortal }) {
  // Navigation state for the student
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

  // Crisis context
  const [flaggedCrisisContext, setFlaggedCrisisContext] = useState('');

  // Subscribe to real-time events (e.g. crisis auto-lock)
  useEffect(() => {
    const unsubscribe = api.subscribeToEvents((event) => {
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

  return (
    <div className="min-h-screen bg-[#0E1E20] flex items-center justify-center p-0 sm:p-4 font-work selection:bg-[#E3A06F] selection:text-[#241208]">
      {/* Discreet floating switch to portal view for evaluators */}
      {onOpenDevPortal && (
        <button
          onClick={onOpenDevPortal}
          className="fixed top-3 right-3 z-50 text-[10px] font-mono bg-black/60 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg"
          title="Switch to Admin & Evaluation Portals"
        >
          ⚙️ Portals &amp; Analytics
        </button>
      )}

      {/* Responsive Pure Mobile Application Container */}
      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[840px] sm:max-h-[92vh] bg-white sm:rounded-[36px] sm:border-[8px] sm:border-[#1E3A3D] shadow-2xl overflow-hidden relative flex flex-col">
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
  );
}
