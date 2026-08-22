import React, { useState } from 'react';
import { AdminLoginScreen } from './AdminLoginScreen';
import { AdminInboxScreen } from './AdminInboxScreen';
import { AdminCaseVaultScreen } from './AdminCaseVaultScreen';
import { BsaCertificateModal } from '../BsaCertificateModal';
import { api } from '../../services/api';

export const AdminAppRoot = ({ incidents, onIncidentStatusUpdated, serverOnline }) => {
  const [adminScreen, setAdminScreen] = useState('login');
  const [adminSession, setAdminSession] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [activeBsaModalIncident, setActiveBsaModalIncident] = useState(null);

  const handleAdminLoginSuccess = async (session) => {
    // Authenticate with shared backend
    await api.verifyWebAuthn(session.officerId, "challenge_token_fido2");
    setAdminSession(session);
    setAdminScreen('inbox');
  };

  const handleSelectIncidentToInvestigate = (incident) => {
    setSelectedIncident(incident);
    setAdminScreen('vault');
  };

  const handleResolveCase = async (caseId, newStatus) => {
    // Call shared backend PATCH endpoint
    await api.updateIncidentStatus(caseId, newStatus, adminSession?.name || "Officer R. Kulkarni");
    
    if (onIncidentStatusUpdated) {
      onIncidentStatusUpdated(caseId, newStatus);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col">
      {/* Screen 2A: Officer Login & Passkey */}
      {adminScreen === 'login' && (
        <AdminLoginScreen onAdminLoginSuccess={handleAdminLoginSuccess} />
      )}

      {/* Screen 2B: Triage Inbox & Matrix */}
      {adminScreen === 'inbox' && (
        <AdminInboxScreen
          incidents={incidents}
          activeOfficer={adminSession}
          onSelectIncident={handleSelectIncidentToInvestigate}
          onAdminLogout={() => {
            setAdminSession(null);
            setAdminScreen('login');
          }}
        />
      )}

      {/* Screen 2C: Case Investigation & Vault */}
      {adminScreen === 'vault' && (
        <AdminCaseVaultScreen
          incident={selectedIncident || incidents[0]}
          onBackToInbox={() => setAdminScreen('inbox')}
          onGenerateBsaCertificate={(inc) => setActiveBsaModalIncident(inc)}
          onResolveCase={handleResolveCase}
        />
      )}

      {/* BSA Certificate Modal */}
      {activeBsaModalIncident && (
        <BsaCertificateModal
          incident={activeBsaModalIncident}
          onClose={() => setActiveBsaModalIncident(null)}
        />
      )}
    </div>
  );
};
