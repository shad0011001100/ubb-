import React, { useState, useEffect } from 'react';
import { CitizenLoginScreen } from './CitizenLoginScreen';
import { CitizenDashboardScreen } from './CitizenDashboardScreen';
import { CitizenCaptureScreen } from './CitizenCaptureScreen';
import { CitizenEvidenceScreen } from './CitizenEvidenceScreen';
import { BurnAnimationOverlay } from '../BurnAnimationOverlay';
import { api } from '../../services/api';

export const CitizenAppRoot = ({ incidents, onIncidentSubmitted, serverOnline }) => {
  const [citizenScreen, setCitizenScreen] = useState('login');
  const [citizenSession, setCitizenSession] = useState(null);
  const [latestCapture, setLatestCapture] = useState(null);
  const [showBurnOverlay, setShowBurnOverlay] = useState(false);

  const handleCitizenLoginSuccess = async (session) => {
    if (session.type === 'anon_aadhaar') {
      await api.verifyAnonAadhaar({ zkProof: "0x7f4a...92b1" });
    }
    setCitizenSession(session);
    setCitizenScreen('dashboard');
  };

  const handleStartCapture = () => {
    setCitizenScreen('capture');
  };

  const handleCaptureComplete = async (captureData) => {
    // 1. Upload photo to Cloud Storage endpoint -> returns cloud photoUrl
    const cloudPhotoUrl = await api.uploadPhoto(captureData.capturedPhoto);

    // 2. Citizen app POSTs the report (photoUrl, location, text) to the shared API
    const reportPayload = {
      photoUrl: cloudPhotoUrl,
      category: captureData.category || "Anti-Corruption",
      subCategory: captureData.subCategory || "Town Planning Extortion & Bribery",
      location: {
        ward: captureData.ward || "Ward 14 (Kothrud)",
        locationName: captureData.locationName || "Paud Road Divisional Office, Pune",
        coordinates: captureData.coordinates || "18.5204° N, 73.8567° E"
      },
      text: captureData.text || {
        description: "Town Planning officer explicitly demanding 500 rupees cash bribe to clear file.",
        transcript: [
          { speaker: "Officer", time: "00:02", text: "Give me 500 rupees or I won't clear the file.", highlight: "500 rupees" }
        ]
      },
      sha256Hash: captureData.sha256Hash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      bystanderRedaction: captureData.bystanderRedacted !== undefined ? captureData.bystanderRedacted : true
    };

    const res = await api.submitIncident(reportPayload);

    const savedIncident = res?.incident || {
      id: `PMC-VIG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      priority: "Critical",
      priorityColor: "bg-red-100 text-red-700 border-red-200",
      photoUrl: cloudPhotoUrl,
      category: reportPayload.category,
      subCategory: reportPayload.subCategory,
      ward: reportPayload.location.ward,
      locationName: reportPayload.location.locationName,
      coordinates: reportPayload.location.coordinates,
      timestamp: new Date().toISOString(),
      timeAgo: "Just now",
      integrityStatus: "Verified",
      sha256Hash: reportPayload.sha256Hash,
      status: "Pending Officer Verification",
      slaRemaining: "6d 23h 59m"
    };

    if (onIncidentSubmitted) {
      onIncidentSubmitted(savedIncident);
    }

    setLatestCapture(savedIncident);
    setCitizenScreen('evidence');
  };

  const handleBurnProtocol = () => {
    setShowBurnOverlay(true);
  };

  const handleBurnComplete = () => {
    setShowBurnOverlay(false);
    setCitizenScreen('dashboard');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[780px] bg-slate-50 flex flex-col relative">
      {/* Citizen Mobile App Top Status Banner */}
      <div className="bg-slate-900 text-slate-300 text-[10px] font-mono px-4 py-1.5 flex items-center justify-between border-b border-slate-800 rounded-t-xl select-none">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white">CITIZEN WHISTLEBLOWER PORTAL</span>
        </div>
        <div className="flex items-center space-x-1.5 text-[9.5px]">
          <span className="text-emerald-400 font-bold">5G • Jio Plus</span>
          <span>📶</span>
          <span>🔋 96%</span>
        </div>
      </div>

      {/* Dynamic Screens */}
      <div className="p-3 sm:p-4 flex-1">
        {citizenScreen === 'login' && (
          <CitizenLoginScreen onLoginSuccess={handleCitizenLoginSuccess} />
        )}

        {citizenScreen === 'dashboard' && (
          <CitizenDashboardScreen
            userSession={citizenSession}
            incidents={incidents}
            onStartSecureCapture={handleStartCapture}
            onOpenReportDetails={(inc) => {
              setLatestCapture(inc);
              setCitizenScreen('evidence');
            }}
            onLogout={() => {
              setCitizenSession(null);
              setCitizenScreen('login');
            }}
          />
        )}

        {citizenScreen === 'capture' && (
          <CitizenCaptureScreen
            onCaptureComplete={handleCaptureComplete}
            onBurnProtocol={handleBurnProtocol}
            onCancel={() => setCitizenScreen('dashboard')}
          />
        )}

        {citizenScreen === 'evidence' && (
          <CitizenEvidenceScreen
            captureResult={latestCapture}
            onReturnToDashboard={() => setCitizenScreen('dashboard')}
          />
        )}
      </div>

      {/* Burn Protocol Overlay */}
      {showBurnOverlay && (
        <BurnAnimationOverlay onComplete={handleBurnComplete} />
      )}
    </div>
  );
};
