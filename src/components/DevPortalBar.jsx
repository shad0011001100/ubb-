import React from 'react';
import { Smartphone, Laptop, Columns, RefreshCw, Layers, CheckCircle2, Server } from 'lucide-react';

export const DevPortalBar = ({ 
  activeViewMode, 
  onSelectViewMode, 
  onResetSession, 
  serverOnline,
  incidentsCount 
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Left: Backend Architecture & Live Health Status */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              Shared Backend
            </span>
            <span className="text-[9.5px] font-mono text-emerald-400">
              {serverOnline ? ':5000 (REST + SSE Live)' : ':5000 (Connecting...)'}
            </span>
          </div>

          <span className="hidden md:inline-block text-[10px] text-slate-400 font-mono">
            {incidentsCount} Incidents Synced
          </span>
        </div>

        {/* Right: The 3 Navigation Modes (Citizen App, Admin Dashboard, Split-Screen Demo) */}
        <div className="flex items-center space-x-1.5">
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex items-center space-x-0.5 text-xs font-bold">
            {/* Button 1: Frontend 1 (Citizen) */}
            <button
              onClick={() => onSelectViewMode('citizen')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'citizen'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>1. Citizen App</span>
            </button>

            {/* Button 2: Frontend 2 (Admin) */}
            <button
              onClick={() => onSelectViewMode('admin')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'admin'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>2. Admin Console</span>
            </button>

            {/* Button 3: Split-Screen Live Demo */}
            <button
              onClick={() => onSelectViewMode('split')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'split'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-300/80 hover:text-amber-200'
              }`}
              title="Show both Frontends side-by-side with real-time backend synchronization"
            >
              <Columns className="w-3.5 h-3.5 text-amber-300" />
              <span>Dual Split Demo</span>
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={onResetSession}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Reset active sessions"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
