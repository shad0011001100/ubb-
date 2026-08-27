import React, { useState, useEffect } from 'react';
import { Screen00AnimatedShowcase } from './Screen00AnimatedShowcase';
import { Screen01LoginSelection } from './Screen01LoginSelection';
import { Screen02AnonymousLogin } from './Screen02AnonymousLogin';
import { Screen03StudentDashboard } from './Screen03StudentDashboard';
import { Screen04MoodCheckIn } from './Screen04MoodCheckIn';
import { Screen05AdaptiveFollowUp } from './Screen05AdaptiveFollowUp';
import { Screen06SafetyCheck } from './Screen06SafetyCheck';
import { Screen07SupportGuidance } from './Screen07SupportGuidance';
import { Screen08Level1Express } from './Screen08Level1Express';
import { Screen09Level2PeerSupport } from './Screen09Level2PeerSupport';
import { Screen10Level3UrgentCare } from './Screen10Level3UrgentCare';
import { ScreenFeedbackModal } from './ScreenFeedbackModal';
import { VolunteerAuthScreen } from './VolunteerAuthScreen';
import { VolunteerDashboardView } from './VolunteerDashboardView';
import { CounsellorDashboardView } from './CounsellorDashboardView';
import { WallOfThoughtsView } from './WallOfThoughtsView';
import { MyJourneyView } from './MyJourneyView';
import { CustomerSupportView } from './CustomerSupportView';
import { ArticlesEmergencyView } from './ArticlesEmergencyView';
import { ProgressTrackerView } from './ProgressTrackerView';
import { PhoneCall, ShieldAlert, X, Sparkles } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function PureUserApp({ onOpenDevPortal }) {
  // Navigation stack:
  // 'showcase' | 'login_selection' | 'anon_login' | 'dashboard' | 'mood_checkin' | 'adaptive_followup' |
  // 'support_guidance' | 'safety_check' | 'level1_express' | 'level2_peer' | 'level3_care' |
  // 'feedback' | 'wall_of_thoughts' | 'my_journey' | 'volunteer_auth' | 'volunteer_dashboard' | 'counsellor_dashboard'
  const [currentScreen, setCurrentScreen] = useState('showcase');
  const [screenParams, setScreenParams] = useState({});

  // Language state: 'en' | 'mr' | 'hi'
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Student profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ubb_user_profile');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'anon-UBB-7K4P-29',
            anonymousId: 'UBB-7K4P-29',
            anonymous_tag: 'UBB-7K4P-29',
            language: 'en',
            selected_language: 'en',
            current_streak: 3
          };
    } catch {
      return {
        id: 'anon-UBB-7K4P-29',
        anonymousId: 'UBB-7K4P-29',
        anonymous_tag: 'UBB-7K4P-29',
        language: 'en',
        selected_language: 'en',
        current_streak: 3
      };
    }
  });

  // Volunteer/Counsellor profile
  const [staffProfile, setStaffProfile] = useState(null);

  // Active check-in payload
  const [currentCheckIn, setCurrentCheckIn] = useState(null);

  // Emergency SOS Overlay
  const [showGlobalSOS, setShowGlobalSOS] = useState(false);

  const t = getTranslation(selectedLanguage);

  const handleNavigate = (screen, params = {}) => {
    setScreenParams(params);
    setCurrentScreen(screen);
  };

  // When student selects mood on Screen 4 -> Immediately navigate to the Adaptive Follow-up Scenario Screen!
  const handleMoodSelect = (checkInData) => {
    setCurrentCheckIn(checkInData);
    setCurrentScreen('adaptive_followup');
  };

  // From Adaptive Follow-up -> Go to Support Guidance (Screen 7)
  const handleFollowUpProceed = (updatedCheckIn) => {
    setCurrentCheckIn(updatedCheckIn);
    setCurrentScreen('support_guidance');
  };

  const handleSelectLevel = (levelNum) => {
    if (levelNum === 1) {
      setCurrentScreen('level1_express');
    } else if (levelNum === 2) {
      setCurrentScreen('level2_peer');
    } else if (levelNum === 3) {
      // Immediate Safety Check is triggered ONLY when 3rd Level is selected
      setCurrentScreen('safety_check');
    }
  };

  const handleSafetyProceed = (updatedCheckIn) => {
    setCurrentCheckIn(updatedCheckIn);
    setCurrentScreen('level3_care');
  };

  const handleFinishActivity = (activityType) => {
    setScreenParams({ activityType });
    setCurrentScreen('feedback');
  };

  const handleResetData = () => {
    setUserProfile({
      id: 'anon-UBB-7K4P-29',
      anonymousId: 'UBB-7K4P-29',
      anonymous_tag: 'UBB-7K4P-29',
      language: selectedLanguage,
      selected_language: selectedLanguage,
      current_streak: 1
    });
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#f9fbeb] sm:bg-[#0E1E20] flex items-center justify-center p-0 sm:p-4 font-work selection:bg-[#E3A06F] selection:text-[#241208]">
      {/* Top Floating Gateway Switcher for SIH Evaluators (Desktop / Tablet) */}
      <div className="hidden sm:flex fixed top-3 left-1/2 -translate-x-1/2 z-50 items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-xl text-[10.5px] text-white">
        <button
          onClick={() => setCurrentScreen('showcase')}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
            currentScreen === 'showcase'
              ? 'bg-[#815505] text-[#ffddb3] font-bold'
              : 'text-amber-300 hover:text-amber-100'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Showcase</span>
        </button>
        <span>|</span>
        <button
          onClick={() => setCurrentScreen('login_selection')}
          className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
            currentScreen !== 'showcase' && currentScreen !== 'volunteer_dashboard' && currentScreen !== 'counsellor_dashboard'
              ? 'bg-[#526140] text-white font-bold'
              : 'hover:text-[#ffddb3]'
          }`}
        >
          Student View
        </button>
        <span>|</span>
        <button
          onClick={() => {
            setStaffProfile({
              id: 'vol-kunal-01',
              name: 'Kunal Joshi (Psychology Volunteer)',
              role: 'volunteer'
            });
            setCurrentScreen('volunteer_dashboard');
          }}
          className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
            currentScreen === 'volunteer_dashboard'
              ? 'bg-[#4E7C63] text-white font-bold'
              : 'hover:text-[#A3D1B9]'
          }`}
        >
          Volunteer Portal
        </button>
        <span>|</span>
        <button
          onClick={() => {
            setStaffProfile({
              id: 'counsellor-pratibha-01',
              name: 'Dr. Pratibha Deshmukh (Licensed Counsellor)',
              role: 'counsellor'
            });
            setCurrentScreen('counsellor_dashboard');
          }}
          className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
            currentScreen === 'counsellor_dashboard'
              ? 'bg-red-800 text-white font-bold'
              : 'hover:text-red-300'
          }`}
        >
          Counsellor Portal
        </button>
      </div>

      {/* Main Mobile App Frame */}
      <div className="w-full max-w-full sm:max-w-md h-[100dvh] sm:h-[844px] bg-[#f9fbeb] sm:rounded-[44px] shadow-none sm:shadow-2xl overflow-hidden border-0 sm:border-[8px] sm:border-[#1E3A3D] relative flex flex-col">
        {/* Render Active Screen */}
        {currentScreen === 'showcase' && (
          <Screen00AnimatedShowcase
            selectedLanguage={selectedLanguage}
            onSelectLanguage={(lang) => setSelectedLanguage(lang)}
            onEnterApp={() => setCurrentScreen('login_selection')}
          />
        )}

        {currentScreen === 'login_selection' && (
          <Screen01LoginSelection
            selectedLanguage={selectedLanguage}
            onSelectLanguage={(lang) => setSelectedLanguage(lang)}
            onContinueAsStudent={() => setCurrentScreen('anon_login')}
            onVolunteerLogin={() => setCurrentScreen('volunteer_auth')}
            onBackToShowcase={() => setCurrentScreen('showcase')}
          />
        )}

        {currentScreen === 'anon_login' && (
          <Screen02AnonymousLogin
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            selectedLanguage={selectedLanguage}
            onBack={() => setCurrentScreen('login_selection')}
            onContinue={(authMode) => {
              if (authMode === 'new') {
                // New users do their initial mood check-up immediately upon sign up
                setCurrentScreen('mood_checkin');
              } else {
                // Returning users go directly to their dashboard
                setCurrentScreen('dashboard');
              }
            }}
          />
        )}

        {currentScreen === 'dashboard' && (
          <Screen03StudentDashboard
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onOpenSOS={() => setShowGlobalSOS(true)}
          />
        )}

        {currentScreen === 'mood_checkin' && (
          <Screen04MoodCheckIn
            selectedLanguage={selectedLanguage}
            onSelectMoodFlow={handleMoodSelect}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'adaptive_followup' && (
          <Screen05AdaptiveFollowUp
            checkInData={currentCheckIn}
            selectedLanguage={selectedLanguage}
            onProceedToSupport={(enrichedData) => {
              setCurrentCheckIn(enrichedData);
              setCurrentScreen('support_guidance');
            }}
            onProceedToGuidance={(enrichedData) => {
              setCurrentCheckIn(enrichedData);
              setCurrentScreen('support_guidance');
            }}
            onBack={() => setCurrentScreen('mood_checkin')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'support_guidance' && (
          <Screen07SupportGuidance
            assessmentResult={screenParams?.assessmentResult || currentCheckIn?.assessmentResult || currentCheckIn}
            checkInData={currentCheckIn}
            selectedLanguage={selectedLanguage}
            onSelectLevel={handleSelectLevel}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'safety_check' && (
          <Screen06SafetyCheck
            checkInData={currentCheckIn}
            selectedLanguage={selectedLanguage}
            onProceedToCare={handleSafetyProceed}
            onTriggerCrisis={() => setShowGlobalSOS(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'level1_express' && (
          <Screen08Level1Express
            defaultTab={screenParams?.defaultTab || 'let_it_out'}
            selectedLanguage={selectedLanguage}
            onFinishActivity={handleFinishActivity}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'level2_peer' && (
          <Screen09Level2PeerSupport
            checkInData={currentCheckIn}
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onFinishActivity={handleFinishActivity}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'level3_care' && (
          <Screen10Level3UrgentCare
            selectedLanguage={selectedLanguage}
            onFinishActivity={handleFinishActivity}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'feedback' && (
          <ScreenFeedbackModal
            activityType={screenParams?.activityType || 'general'}
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onSubmitFeedback={() => handleNavigate('dashboard')}
          />
        )}

        {currentScreen === 'wall_of_thoughts' && (
          <WallOfThoughtsView
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'my_journey' && (
          <MyJourneyView
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onResetAllData={handleResetData}
          />
        )}

        {currentScreen === 'articles_emergency' && (
          <ArticlesEmergencyView
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'progress_tracker' && (
          <ProgressTrackerView
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'questions_flow' && (
          <Screen05AdaptiveFollowUp
            selectedLanguage={selectedLanguage}
            userProfile={userProfile}
            onCompleteAssessment={(result) => {
              setCurrentCheckIn(result);
              handleNavigate('support_guidance', { assessmentResult: result });
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'customer_support' && (
          <CustomerSupportView
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onBack={() => setCurrentScreen('dashboard')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'volunteer_auth' && (
          <VolunteerAuthScreen
            selectedLanguage={selectedLanguage}
            onBack={() => setCurrentScreen('login_selection')}
            onLoginSuccess={(staff) => {
              setStaffProfile(staff);
              if (staff.role === 'counsellor') {
                setCurrentScreen('counsellor_dashboard');
              } else {
                setCurrentScreen('volunteer_dashboard');
              }
            }}
          />
        )}

        {currentScreen === 'volunteer_dashboard' && (
          <VolunteerDashboardView
            volunteerProfile={staffProfile}
            onLogout={() => setCurrentScreen('login_selection')}
            onOpenCounsellorEscalation={() => setCurrentScreen('counsellor_dashboard')}
          />
        )}

        {currentScreen === 'counsellor_dashboard' && (
          <CounsellorDashboardView
            counsellorProfile={staffProfile}
            onLogout={() => setCurrentScreen('login_selection')}
          />
        )}

        {/* Global Urgent SOS Modal */}
        {showGlobalSOS && (
          <div className="absolute inset-0 z-50 bg-[#7A2E2E]/95 backdrop-blur-md text-white p-5 flex flex-col justify-between overflow-y-auto animate-fadeIn select-none">
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-red-200 font-bold">
                Emergency Crisis Protocol
              </span>
              <button
                onClick={() => setShowGlobalSOS(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-2 my-auto">
              <div className="w-14 h-14 rounded-3xl bg-white/20 text-white flex items-center justify-center mx-auto animate-pulse shadow-lg">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="font-fraunces text-xl font-bold text-white">
                {t.screen6.urgentTitle}
              </h3>
              <p className="text-xs text-red-100 leading-relaxed max-w-xs mx-auto">
                {t.screen6.urgentSub}
              </p>

              {/* Contacts */}
              <div className="space-y-2 pt-2 text-left">
                {t.screen6.urgentContacts.map((c, i) => (
                  <div key={i} className="bg-black/30 border border-white/20 rounded-3xl p-3.5 flex items-center justify-between">
                    <div>
                      <b className="text-xs text-white block">{c.name}</b>
                      <span className="font-mono text-[11.5px] text-[#fdc16d] font-bold block">{c.number}</span>
                    </div>
                    <a
                      href={`tel:${c.number.replace(/[^0-9+]/g, '')}`}
                      className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowGlobalSOS(false);
                  setCurrentScreen('safety_check');
                }}
                className="w-full py-3 rounded-full bg-white text-red-900 font-bold text-xs cursor-pointer hover:bg-slate-100 shadow-md"
              >
                Book Earliest Licensed Counsellor →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
