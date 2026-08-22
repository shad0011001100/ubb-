import React from 'react';
import { CitizenAppRoot } from './citizen/CitizenAppRoot';
import { AdminAppRoot } from './admin/AdminAppRoot';
import { Smartphone, Laptop, Zap, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const SplitScreenDemo = ({ 
  incidents, 
  onIncidentSubmitted, 
  onIncidentStatusUpdated, 
  serverOnline 
}) => {
  return (
    <div className="w-full min-h-screen bg-slate-200/80 p-3 sm:p-4 space-y-3 animate-fadeIn">
      {/* Split Screen Header Banner */}
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-blue-600 text-white">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide flex items-center gap-1.5">
              Live Dual-Frontend Synchronization Matrix
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-300">
              Two independent client applications communicating in real-time over the shared Express REST API & SSE bus.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[10.5px] font-mono">
          <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Backend: http://localhost:5000/api
          </span>
        </div>
      </div>

      {/* Side-by-Side Dual Frontend Containers */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* ======================================================== */}
        {/* FRONTEND 1: CITIZEN MOBILE CLIENT (LEFT PANE - 4.5 COLS) */}
        {/* ======================================================== */}
        <div className="xl:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-md bg-white rounded-2xl border-2 border-blue-900/30 shadow-xl overflow-hidden">
            <div className="bg-blue-900 text-white px-3.5 py-2 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center space-x-1.5">
                <Smartphone className="w-4 h-4 text-blue-200" />
                <span>FRONTEND 1: CITIZEN MOBILE APP</span>
              </div>
              <span className="text-[9.5px] font-mono bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-400/30">
                Mobile Client
              </span>
            </div>
            <CitizenAppRoot
              incidents={incidents}
              onIncidentSubmitted={onIncidentSubmitted}
              serverOnline={serverOnline}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* FRONTEND 2: ADMIN COMMAND CONSOLE (RIGHT PANE - 7.5 COLS) */}
        {/* ======================================================== */}
        <div className="xl:col-span-7 flex flex-col">
          <div className="w-full bg-white rounded-2xl border-2 border-slate-700/30 shadow-xl overflow-hidden min-h-[780px] flex flex-col">
            <div className="bg-slate-900 text-white px-3.5 py-2 flex items-center justify-between text-xs font-bold border-b border-slate-800">
              <div className="flex items-center space-x-1.5">
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span>FRONTEND 2: ADMIN VIGILANCE COMMAND CONSOLE</span>
              </div>
              <span className="text-[9.5px] font-mono bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700 text-emerald-300">
                Desktop Widescreen Client
              </span>
            </div>
            <div className="flex-1">
              <AdminAppRoot
                incidents={incidents}
                onIncidentStatusUpdated={onIncidentStatusUpdated}
                serverOnline={serverOnline}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
