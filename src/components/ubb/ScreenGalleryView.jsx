import React from 'react';
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

export function ScreenGalleryView({
  userProfile,
  setUserProfile,
  screeningResults,
  setScreeningResults,
  onNavigateScreen
}) {
  const dummyFn = () => {};

  const screens = [
    {
      id: '01',
      title: '01 · Onboarding',
      badge: 'updated',
      desc: 'Dark mode gradient, language choice, anonymous ID and voluntary encrypted Break-Glass contact.',
      render: (
        <Screen01Onboarding
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onComplete={() => onNavigateScreen('screening')}
        />
      )
    },
    {
      id: '02',
      title: '02 · Quick screening',
      badge: 'new',
      desc: '90-second validated check-in. Answers set the Voiceflow initial triage state variables.',
      render: (
        <Screen02Screening
          screeningResults={screeningResults}
          setScreeningResults={setScreeningResults}
          onComplete={() => onNavigateScreen('home')}
        />
      )
    },
    {
      id: '03',
      title: '03 · Home Dashboard',
      badge: 'updated',
      desc: 'Greet by anonymous ID, dynamic recommendation tier, action cards and visible SOS emergency strip.',
      render: (
        <Screen03Home
          userProfile={userProfile}
          screeningResults={screeningResults}
          onNavigate={(target) => onNavigateScreen(target)}
          onOpenSOS={() => onNavigateScreen('sos')}
        />
      )
    },
    {
      id: '04',
      title: '04 · AI first contact',
      badge: 'redesigned',
      desc: '2-3 min guided chat, multilingual Ollama NLP crisis detection and peer Escalation Flag UI card.',
      render: (
        <Screen04AIChat
          userProfile={userProfile}
          onEscalateToPeer={() => onNavigateScreen('peer_matching')}
          onTriggerCrisis={() => onNavigateScreen('auto_crisis')}
          onNavigate={(target) => onNavigateScreen(target)}
        />
      )
    },
    {
      id: '05',
      title: '05 · Peer matching',
      badge: 'updated',
      desc: 'Verified helper cards showing explicit credentials (Dr. Rao Reg. No. 4521, RCI License #A-88213).',
      render: (
        <Screen05PeerMatching
          userProfile={userProfile}
          screeningResults={screeningResults}
          onSelectPeer={() => onNavigateScreen('consent_gate')}
          onNavigate={(target) => onNavigateScreen(target)}
        />
      )
    },
    {
      id: '06',
      title: '06 · Escalation consent',
      badge: 'new',
      desc: 'Itemized permissions checklist and Workflow E consent deadlock off-ramp (3 declines = cooldown).',
      render: (
        <Screen06ConsentGate
          userProfile={userProfile}
          peerName="Amber_17"
          onAccept={() => onNavigateScreen('peer_matching')}
          onDecline={dummyFn}
          onDeadlockTriggered={dummyFn}
          onNavigate={(target) => onNavigateScreen(target)}
        />
      )
    },
    {
      id: '07',
      title: '07 · Progress Dashboard',
      badge: 'new',
      desc: '6-week stress reduction curve bar charts and atomic habit streaks (mental check-in streak).',
      render: (
        <Screen07Progress
          userProfile={userProfile}
          onNavigate={(target) => onNavigateScreen(target)}
        />
      )
    },
    {
      id: '08',
      title: '08 · SOS / Crisis Hub',
      badge: 'emergency',
      desc: 'Stark red gradient, 1-tap local dialers (Tele-MANAS 14416) and Break-Glass SMS trigger.',
      render: (
        <Screen08SOS
          userProfile={userProfile}
          onClose={() => onNavigateScreen('home')}
        />
      )
    },
    {
      id: '09',
      title: '09 · Self-Care (Private Tools)',
      badge: 'new',
      desc: 'Let It Out (ephemeral venting), Wall of Thoughts (moderated notes), and 4-7-8 Relax & Restore.',
      render: (
        <Screen09SelfCare
          userProfile={userProfile}
          onNavigate={(target) => onNavigateScreen(target)}
        />
      )
    },
    {
      id: '10',
      title: '10 · Auto-Detected Crisis',
      badge: 'ai-lock',
      desc: 'Instant emergency counselor and helpline matching when crisis phrase is typed by user.',
      render: (
        <Screen10AutoCrisis
          onOpenHelpline={() => onNavigateScreen('sos')}
          onConnectCounselor={() => onNavigateScreen('peer_matching')}
          onDismiss={() => onNavigateScreen('home')}
        />
      )
    }
  ];

  return (
    <div className="h-full bg-[#14282B] text-white p-6 overflow-y-auto font-work select-none">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="font-mono text-xs text-[#E3A06F] uppercase tracking-widest flex items-center gap-2 mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C7 2 3 6 3 11c0 5 4.5 9 9 11 4.5-2 9-6 9-11 0-5-4-9-9-9z" stroke="#E3A06F" strokeWidth="1.4"/>
          </svg>
          <span>Ubb (ऊब) — Screen-by-Screen Gallery</span>
        </div>
        <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-white leading-tight">
          Built around <em>why students don't seek help</em>, not just what they'd click.
        </h1>
        <p className="text-sm text-[#AEBFB8] mt-2 max-w-3xl leading-relaxed">
          Every barrier maps to a specific screen: stigma &rarr; anonymity by default, low literacy &rarr; early screening instead of self-report, distrust &rarr; explicit consent gate, and doubt &rarr; visible student progress.
        </p>
      </div>

      {/* Grid of Phone Mockups */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {screens.map((s) => (
          <div key={s.id} className="flex flex-col items-center">
            {/* Screen Label & Badge */}
            <div className="font-mono text-[11px] text-[#E3A06F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>{s.title}</span>
              <span className="bg-[#E3A06F] text-[#241208] text-[8.5px] px-1.5 py-0.5 rounded font-bold">
                {s.badge}
              </span>
            </div>

            {/* Phone Bezel */}
            <div className="w-[280px] h-[570px] bg-[#F2F6F3] rounded-[38px] border-[8px] border-[#0C1A1C] shadow-2xl overflow-hidden relative flex flex-col">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0C1A1C] rounded-b-xl z-30" />

              {/* Phone Screen Body */}
              <div className="flex-1 overflow-hidden pt-2">
                {s.render}
              </div>
            </div>

            {/* Description footnote */}
            <p className="text-[11px] text-[#8FA69C] text-center mt-2.5 max-w-[260px] leading-snug">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
