import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Video, 
  ShieldAlert, 
  Car, 
  Scale, 
  HeartPulse, 
  Bus, 
  Building2, 
  Landmark, 
  GraduationCap, 
  Droplet, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  AlertCircle,
  Lock,
  LogOut,
  Fingerprint,
  Info
} from 'lucide-react';
import { Emblem } from '../Emblem';

export const CitizenDashboardScreen = ({ 
  userSession, 
  incidents, 
  onStartSecureCapture, 
  onOpenReportDetails,
  onLogout 
}) => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [deptFeedback, setDeptFeedback] = useState(null);

  const departments = [
    { id: 'police', label: 'Police', marathi: 'पोलीस', icon: ShieldAlert, color: 'text-red-700 bg-red-50 border-red-200' },
    { id: 'traffic', label: 'Traffic', marathi: 'वाहतूक', icon: Car, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { id: 'anti-corruption', label: 'Anti-Corruption', marathi: 'लाचलुचपत', icon: Scale, color: 'text-amber-800 bg-amber-50 border-amber-200' },
    { id: 'health', label: 'Health', marathi: 'आरोग्य', icon: HeartPulse, color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { id: 'transport', label: 'Transport', marathi: 'परिवहन', icon: Bus, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { id: 'infrastructure', label: 'Infrastructure', marathi: 'पायाभूत', icon: Building2, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { id: 'revenue', label: 'Revenue & Tax', marathi: 'महसूल', icon: Landmark, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { id: 'education', label: 'Education', marathi: 'शिक्षण', icon: GraduationCap, color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
    { id: 'sanitation', label: 'Water & Waste', marathi: 'पाणी व स्वच्छता', icon: Droplet, color: 'text-teal-700 bg-teal-50 border-teal-200' }
  ];

  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
    setDeptFeedback(`Standard reporting form for ${dept.label} initiated. For confidential evidence with zero local trace, use the Secure Red Button above.`);
    setTimeout(() => setDeptFeedback(null), 5000);
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* 1. TOP BAR: ZK BADGE + CITIZEN IDENTITY + LOGOUT */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <Emblem className="w-8 h-8 flex-shrink-0" />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-900 leading-none">JanPraman</span>
              {/* Green Badge: ShieldCheck ZK-Verified: Anonymous */}
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9.5px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-emerald-600 stroke-[3]" />
                ZK-Verified: Anonymous
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono leading-none mt-1">
              Pune Municipal Corporation • Ward 14
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* 2. HERO SECTION: LARGE RED ACTION BUTTON (REPORT MALPRACTICE - SECURE MODE) */}
      <section>
        <button
          onClick={onStartSecureCapture}
          className="w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-[0.99] text-white p-4 rounded-2xl shadow-md border-2 border-red-500 flex items-center space-x-3.5 text-left transition-all cursor-pointer group relative overflow-hidden"
        >
          {/* Subtle animated light sweep */}
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-105 transition-transform shadow-inner">
            <Video className="w-6 h-6 text-white animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="bg-red-900/70 text-red-100 font-mono text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border border-red-400/40">
                WHISTLEBLOWER ENCLAVE
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white leading-tight mt-0.5">
              Report Malpractice (Secure Mode)
            </h2>
            <p className="text-[11px] text-red-100 leading-snug mt-0.5">
              Volatile RAM recording • Zero local storage • AI face blur
            </p>
          </div>

          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </button>
      </section>

      {deptFeedback && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 p-2.5 rounded-lg text-xs flex items-start gap-2 animate-fadeIn">
          <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
          <span>{deptFeedback}</span>
        </div>
      )}

      {/* 3. DEPARTMENT GRID: 3X3 GRID OF SQUARE BUTTONS FOR NORMAL REPORTING */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-900 rounded-xs"></span>
            Standard Department Registry
          </h3>
          <span className="text-[10px] font-mono text-slate-400">3x3 Grid</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <button
                key={dept.id}
                onClick={() => handleDeptClick(dept)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-150 hover:shadow-sm bg-white hover:border-slate-400 cursor-pointer ${
                  selectedDept?.id === dept.id ? 'ring-2 ring-blue-900 border-blue-900' : 'border-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 border ${dept.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight block truncate w-full">
                  {dept.label}
                </span>
                <span className="text-[8.5px] text-slate-500 font-medium leading-none mt-0.5">
                  {dept.marathi}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. BOTTOM SHEET / CARD: "MY ACTIVE REPORTS" */}
      <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-900" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              My Active Reports (Audit Trail)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
            {incidents.length} Active
          </span>
        </div>

        <div className="space-y-2.5">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => onOpenReportDetails(incident)}
              className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-100 px-1.5 py-0.2 rounded border border-blue-200">
                  {incident.id}
                </span>
                <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded border ${incident.priorityColor}`}>
                  {incident.priority} Priority
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                {incident.subCategory || incident.category}
              </h4>
              <p className="text-[10.5px] text-slate-600 leading-tight">
                {incident.locationName || incident.ward}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] font-mono">
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  {incident.status}
                </span>
                <span className="text-slate-400">{incident.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
