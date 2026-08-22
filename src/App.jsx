import React, { useState, useEffect } from 'react';
import { INITIAL_INCIDENTS } from './data/mockIncidents';
import { DevPortalBar } from './components/DevPortalBar';
import { CitizenAppRoot } from './components/citizen/CitizenAppRoot';
import { AdminAppRoot } from './components/admin/AdminAppRoot';
import { SplitScreenDemo } from './components/SplitScreenDemo';
import { api } from './services/api';

export function App() {
  // Navigation View Mode: 'citizen' | 'admin' | 'split'
  const [activeViewMode, setActiveViewMode] = useState('split');
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [serverOnline, setServerOnline] = useState(false);

  // Sync with Shared Express Backend Server on mount
  useEffect(() => {
    const initBackend = async () => {
      const health = await api.checkHealth();
      if (health && health.status === 'ONLINE') {
        setServerOnline(true);
        const serverIncidents = await api.getIncidents();
        if (serverIncidents && serverIncidents.length > 0) {
          setIncidents(serverIncidents);
        }
      } else {
        setServerOnline(false);
      }
    };

    initBackend();

    // Subscribe to real-time Server-Sent Events (SSE) from shared backend
    const unsubscribe = api.subscribeToEvents((event) => {
      if (event.type === 'NEW_INCIDENT') {
        setIncidents((prev) => [event.data, ...prev.filter(i => i.id !== event.data.id)]);
      } else if (event.type === 'STATUS_UPDATED') {
        setIncidents((prev) => prev.map(i => i.id === event.data.id ? event.data : i));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleIncidentSubmitted = (newIncident) => {
    setIncidents((prev) => [newIncident, ...prev.filter(i => i.id !== newIncident.id)]);
  };

  const handleIncidentStatusUpdated = (caseId, newStatus) => {
    setIncidents((prev) => prev.map(i => i.id === caseId ? { ...i, status: newStatus } : i));
  };

  const handleResetSession = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Top Multi-Frontend Navigation Bar */}
      <DevPortalBar
        activeViewMode={activeViewMode}
        onSelectViewMode={(mode) => setActiveViewMode(mode)}
        onResetSession={handleResetSession}
        serverOnline={serverOnline}
        incidentsCount={incidents.length}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: STANDALONE CITIZEN MOBILE APP */}
        {activeViewMode === 'citizen' && (
          <div className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 bg-slate-100/60">
            <CitizenAppRoot
              incidents={incidents}
              onIncidentSubmitted={handleIncidentSubmitted}
              serverOnline={serverOnline}
            />
          </div>
        )}

        {/* VIEW 2: STANDALONE ADMIN WIDESCREEN DASHBOARD */}
        {activeViewMode === 'admin' && (
          <div className="flex-1 w-full">
            <AdminAppRoot
              incidents={incidents}
              onIncidentStatusUpdated={handleIncidentStatusUpdated}
              serverOnline={serverOnline}
            />
          </div>
        )}

        {/* VIEW 3: LIVE DUAL-FRONTEND SPLIT SCREEN DEMO (BOTH SIDE-BY-SIDE) */}
        {activeViewMode === 'split' && (
          <SplitScreenDemo
            incidents={incidents}
            onIncidentSubmitted={handleIncidentSubmitted}
            onIncidentStatusUpdated={handleIncidentStatusUpdated}
            serverOnline={serverOnline}
          />
        )}
      </main>
    </div>
  );
}

export default App;
