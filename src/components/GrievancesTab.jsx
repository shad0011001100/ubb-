import React from 'react';
import { FileQuestion, CheckCircle2, Clock, Plus, ShieldCheck, AlertCircle } from 'lucide-react';

export const GrievancesTab = ({ onStartCapture }) => {
  return (
    <div className="space-y-3 pb-16 animate-fadeIn">
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <FileQuestion className="w-4 h-4 text-blue-900" />
            Citizen Grievance Redressal (नागरिक तक्रार निवारण)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Standard municipal complaints for potholes, streetlights, and drainage are publicly tracked under RTSA 2015 with standard 15-day resolution SLAs.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-[11px] font-bold uppercase text-slate-500">Recent Service Requests</h4>
        
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              RESOLVED
            </span>
            <span className="text-[10px] text-slate-400 font-mono">14 Aug 2026</span>
          </div>
          <h5 className="text-xs font-bold text-slate-800">
            Streetlight flickering at Paud Road Junction
          </h5>
          <p className="text-[11px] text-slate-600">
            PMC Electrical Division replaced LED fixture under Ticket #PMC-GR-4091.
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              CLOSED
            </span>
            <span className="text-[10px] text-slate-400 font-mono">02 Jul 2026</span>
          </div>
          <h5 className="text-xs font-bold text-slate-800">
            Stormwater drain desilting near Mayur Colony
          </h5>
          <p className="text-[11px] text-slate-600">
            Pre-monsoon cleaning completed by Ward 14 sanitation team.
          </p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-start space-x-2">
        <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-orange-950">
          <strong className="block font-bold">Have evidence of corruption or extortion?</strong>
          Do not file public grievances. Use the encrypted <button onClick={onStartCapture} className="text-blue-900 font-bold underline cursor-pointer">Zero-Trace Vigilance Portal</button> for identity protection.
        </div>
      </div>
    </div>
  );
};
