import React from 'react';
import {
  TransitionSeries,
  linearTiming
} from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { ScreenSlide } from './ScreenSlide';
import { ScreenData } from './types';

const SCREENS: ScreenData[] = [
  {
    id: '01_login_selection',
    title: '1. Multi-Role Portal Entry',
    description: 'Anonymous Student, Volunteer, and Licensed Counsellor gateways with instant role switching.',
    badge: 'Onboarding · Access Control',
    imagePath: 'screens/01_login_selection.png',
    durationInSeconds: 3.5
  },
  {
    id: '02_anonymous_id',
    title: '2. Zero-PII Anonymous ID Generation',
    description: 'Instant UBB-7K4P-29 identity generation with optional 4-digit PIN for device restoration.',
    badge: 'Confidentiality · Zero Logs',
    imagePath: 'screens/02_anonymous_id.png',
    durationInSeconds: 3.5
  },
  {
    id: '03_mood_checkin',
    title: '3. 1-Tap Mood Check-in',
    description: 'Grounding emotional reflection across 5 core states with zero judgment and instant response.',
    badge: 'Sanctuary · Emotional Tracking',
    imagePath: 'screens/03_mood_checkin.png',
    durationInSeconds: 3.5
  },
  {
    id: '04_adaptive_questions',
    title: '4. Contextual Decision Tree',
    description: 'Sub-reason branching and custom "Other (describe)" text inputs to capture student context.',
    badge: 'AI Diagnostics · Personalized Care',
    imagePath: 'screens/04_adaptive_questions.png',
    durationInSeconds: 3.5
  },
  {
    id: '05_support_guidance',
    title: '5. AI Support Match & Guidance',
    description: 'Instant triaging across Support 1 (Self-Help), Support 2 (Peer Talk), and Support 3 (Clinical Care).',
    badge: 'Triage Engine · Stepped Care',
    imagePath: 'screens/05_support_guidance.png',
    durationInSeconds: 3.5
  },
  {
    id: '06_student_dashboard',
    title: '6. Student Sanctuary Dashboard',
    description: 'Instant access to Self-Help Tools, Wall of Thoughts, Peer Volunteer Talk, and 24x7 Emergency SOS.',
    badge: 'Student Hub · Core Experience',
    imagePath: 'screens/06_student_dashboard.png',
    durationInSeconds: 4
  },
  {
    id: '07_volunteer_chat',
    title: '7. Confidential Peer & Clinical Care',
    description: '1-on-1 private chat with psychology students and seamless escalation to licensed campus counsellors.',
    badge: 'Human Support · Ongoing Care',
    imagePath: 'screens/07_volunteer_chat.png',
    durationInSeconds: 4
  }
];

export const WalkthroughComposition: React.FC = () => {
  const FPS = 30;
  const TRANSITION_DURATION = 15; // 0.5s transition

  return (
    <TransitionSeries>
      {SCREENS.map((screen, idx) => {
        const durationInFrames = Math.round(screen.durationInSeconds * FPS);
        const isLast = idx === SCREENS.length - 1;

        return (
          <React.Fragment key={screen.id}>
            <TransitionSeries.Sequence durationInFrames={durationInFrames}>
              <ScreenSlide
                screen={screen}
                index={idx}
                totalScreens={SCREENS.length}
              />
            </TransitionSeries.Sequence>

            {!isLast && (
              <TransitionSeries.Transition
                presentation={idx % 2 === 0 ? fade() : slide({ direction: 'from-right' })}
                timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
              />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
  );
};
