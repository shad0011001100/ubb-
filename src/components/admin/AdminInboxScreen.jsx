import React, { useState } from 'react';
import { 
  Inbox, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ShieldAlert, 
  Scale, 
  BarChart3, 
  UserCheck, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Eye,
  Layers,
  Building,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { Emblem } from '../Emblem';

export const AdminInboxScreen = ({ 
  incidents, 
  activeOfficer, 
  onSelectIncident, 
  onAdminLogout 
}) => {
  const [activeSidebarTab, setActiveSidebarTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inc.ward || inc.location?.ward || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || inc.priority.toLowerCase() === filterPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 animate-fadeIn">
      {/* 1. SIDEBAR (DESKTOP NAVIGATION) */}
      <aside className="w-full md:w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Sidebar Top Header */}
          <div className="p-4 border-b border-slate-800 flex items-center space-x-2.5">
            <Emblem className="w-9 h-9 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">JanPraman Vigilance</h2>
              <p className="text-[10px] text-slate-400 font-mono">Admin Command Matrix</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveSidebarTab('inbox')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeSidebarTab === 'inbox' 
                  ? 'bg-blue-900 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Inbox className="w-4 h-4" />
                <span>Inbox (AI Triage)</span>
              </div>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                {incidents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('assigned')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeSidebarTab === 'assigned' 
                  ? 'bg-blue-900 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Assigned Cases</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('closed')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeSidebarTab === 'closed' 
                  ? 'bg-blue-900 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Closed & Judged</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('analytics')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeSidebarTab === 'analytics' 
                  ? 'bg-blue-900 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>SLA Analytics</span>
            </button>
          </nav>
        </div>

        {/* Officer Profile & Sign Out */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                RK
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{activeOfficer?.name || 'Officer R. Kulkarni'}</h4>
                <p className="text-[9.5px] text-slate-400 font-mono truncate">{activeOfficer?.rank || 'Superintendent (Desk 4)'}</p>
              </div>
            </div>
            <button
              onClick={onAdminLogout}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (WIDESCREEN DASHBOARD) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight">
              Anti-Corruption Triage Matrix & Evidence Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Unified database queue powered by shared REST API connector with cloud evidence storage.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Shared Database Live
            </span>
          </div>
        </div>

        {/* 3. TOP STATS: 4 KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Open Cases</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-slate-900">{incidents.length}</h3>
              <span className="text-[10.5px] text-blue-900 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                Shared Queue
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500">Across 15 Pune municipal wards</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Critical Priority</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-red-600">
                {incidents.filter(i => i.priority === 'Critical').length || 1}
              </h3>
              <span className="text-[10.5px] text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Extortion
              </span>
            </div>
            <p className="text-[10.5px] text-red-600 font-medium">Immediate field action required</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">SLA &lt; 48h Escalation</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-orange-600">2</h3>
              <span className="text-[10.5px] text-orange-800 font-bold bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                ACB Threshold
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500">Auto-transfers on SLA timeout</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Resolved Cases</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-emerald-600">84</h3>
              <span className="text-[10.5px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                100% BSA Admitted
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500">Charge-sheets filed in court</p>
          </div>
        </div>

        {/* 4. DATA TABLE SECTION (AI-SORTED INCIDENTS WITH CLOUD PHOTO THUMBNAIL) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-900" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Live Incident Triage Queue (Shared Database)
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter case ID, category, ward..."
                  className="bg-white border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>
          </div>

          {/* Table Component */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="py-3 px-4">Evidence Media</th>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Ward / Location</th>
                  <th className="py-3 px-4">Integrity Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIncidents.map((incident) => {
                  const photo = incident.photoUrl || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80";
                  const wardName = incident.location?.ward || incident.ward || "Ward 14 (Kothrud)";
                  const coords = incident.location?.coordinates || incident.coordinates || "18.5204° N, 73.8567° E";
                  return (
                    <tr 
                      key={incident.id}
                      className="hover:bg-blue-50/40 transition-colors"
                    >
                      {/* Cloud Photo Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-300 bg-slate-950 flex-shrink-0 relative group">
                          <img
                            src={photo}
                            alt="Cloud Evidence"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                      </td>

                      {/* Case ID */}
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">
                        {incident.id}
                        <span className="block text-[9.5px] text-slate-400 font-normal">{incident.timeAgo}</span>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded border text-[10.5px] ${incident.priorityColor}`}>
                          {incident.priority === 'Critical' && <ShieldAlert className="w-3 h-3 text-red-600" />}
                          {incident.priority}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{incident.category}</span>
                        <span className="text-[10.5px] text-slate-500">{incident.subCategory}</span>
                      </td>

                      {/* Ward */}
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          {wardName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{coords}</span>
                      </td>

                      {/* Integrity Status */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1.5 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                          <span>Integrity: {incident.integrityStatus}</span>
                        </div>
                        <span className="text-[9.5px] text-slate-400 font-mono block truncate max-w-[150px]">
                          SHA-256: {incident.sha256Hash.substring(0, 16)}...
                        </span>
                      </td>

                      {/* Action: Investigate Button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onSelectIncident(incident)}
                          className="py-1.5 px-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-md shadow-2xs transition-colors inline-flex items-center gap-1.5 cursor-pointer text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Investigate</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
