import React, { useState } from 'react';
import {
  ArrowLeft,
  CalendarCheck,
  ShieldAlert,
  Clock,
  PhoneCall,
  CheckCircle2,
  FileText,
  AlertOctagon,
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react';

const INITIAL_CASES = [
  {
    caseId: 'UBB-2041',
    anonId: 'UBB-7K4P-29',
    source: 'Volunteer Escalation (Kunal Joshi)',
    concernAreas: ['Family', 'Financial stress'],
    studentRequest: 'Earliest appointment',
    priority: 'High',
    status: 'awaiting_response', // 'new' | 'assigned' | 'accepted' | 'in_conversation' | 'appointment_scheduled' | 'escalated' | 'followup_required' | 'closed'
    lastTriageNote: 'Student expressing severe sleep disruption and hopelessness over exam fee burdens.',
    scheduledTime: null,
    clinicalNotes: []
  },
  {
    caseId: 'UBB-1980',
    anonId: 'UBB-4H2K-90',
    source: 'Direct Level 3 Booking',
    concernAreas: ['Academics', 'Self-confidence'],
    studentRequest: 'Consultation session',
    priority: 'Medium',
    status: 'appointment_scheduled',
    lastTriageNote: 'Follow-up consultation after mid-semester exams.',
    scheduledTime: 'Tomorrow, 10:30 AM',
    clinicalNotes: ['First check-in completed. Progressing well with cognitive reframing.']
  }
];

export function CounsellorDashboardView({
  counsellorProfile,
  onLogout
}) {
  const [cases, setCases] = useState(INITIAL_CASES);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState('Tomorrow, 11:30 AM');
  const [newClinicalNote, setNewClinicalNote] = useState('');
  const [showEmergencyTrigger, setShowEmergencyTrigger] = useState(false);

  const handleAcceptCase = (cId) => {
    const updated = cases.map((c) =>
      c.caseId === cId ? { ...c, status: 'accepted' } : c
    );
    setCases(updated);
    if (selectedCase?.caseId === cId) {
      setSelectedCase({ ...selectedCase, status: 'accepted' });
    }
  };

  const handleConfirmSchedule = () => {
    if (!selectedCase) return;
    const updated = cases.map((c) =>
      c.caseId === selectedCase.caseId
        ? { ...c, status: 'appointment_scheduled', scheduledTime: scheduledDateTime }
        : c
    );
    setCases(updated);
    setSelectedCase({
      ...selectedCase,
      status: 'appointment_scheduled',
      scheduledTime: scheduledDateTime
    });
    setShowScheduleModal(false);
  };

  const handleAddClinicalNote = () => {
    if (!newClinicalNote.trim() || !selectedCase) return;
    const updated = cases.map((c) =>
      c.caseId === selectedCase.caseId
        ? { ...c, clinicalNotes: [...c.clinicalNotes, newClinicalNote.trim()] }
        : c
    );
    setCases(updated);
    setSelectedCase({
      ...selectedCase,
      clinicalNotes: [...selectedCase.clinicalNotes, newClinicalNote.trim()]
    });
    setNewClinicalNote('');
  };

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none relative">
      {/* Top Header */}
      <div className="px-5 pt-3.5 pb-2 bg-white border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-red-800 text-white flex items-center justify-center font-bold text-xs">
            C
          </div>
          <div>
            <b className="text-xs text-[#14282B] block">{counsellorProfile?.name || 'Dr. Pratibha Deshmukh'}</b>
            <span className="font-mono text-[9px] text-red-800 block">Licensed Campus Clinical Counsellor</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#5B6E67] cursor-pointer flex items-center gap-1 text-[10px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>

      {/* Main Stream */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {!selectedCase ? (
          /* Case Cards List */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#5B6E67] font-bold">
                Assigned & Escalated Clinical Cases ({cases.length})
              </span>
            </div>

            {cases.map((c) => (
              <div
                key={c.caseId}
                className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-2.5 shadow-2xs hover:border-red-400 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 block">Case: {c.caseId}</span>
                    <b className="font-mono text-sm text-[#14282B]">{c.anonId}</b>
                  </div>
                  <span
                    className={`font-mono text-[9px] px-2.5 py-0.5 rounded-full font-bold ${
                      c.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    Priority: {c.priority}
                  </span>
                </div>

                <div className="text-xs text-[#5B6E67] space-y-1">
                  <div><b>Source:</b> {c.source}</div>
                  <div><b>Concern Areas:</b> {c.concernAreas.join(', ')}</div>
                  <div className="bg-[#F2F6F3] p-2 rounded-xl text-[11px] text-[#14282B] italic">
                    "{c.lastTriageNote}"
                  </div>
                </div>

                {/* Status Badge & Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[9.5px] bg-slate-100 text-[#5B6E67] px-2 py-0.5 rounded-md">
                    Status: {c.status}
                  </span>

                  <button
                    onClick={() => setSelectedCase(c)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    <span>Manage Case</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Case Management Detail View */
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedCase(null)}
                className="text-xs text-[#5B6E67] flex items-center gap-1 cursor-pointer hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Cases
              </button>

              <button
                onClick={() => setShowEmergencyTrigger(true)}
                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <AlertOctagon className="w-3 h-3" />
                <span>Trigger Campus SOS</span>
              </button>
            </div>

            {/* Case Overview */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-2 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9.5px] text-slate-500">Case ID: {selectedCase.caseId}</span>
                  <h3 className="font-mono font-bold text-base text-[#14282B]">{selectedCase.anonId}</h3>
                </div>
                <span className="font-mono text-[9px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
                  {selectedCase.status}
                </span>
              </div>

              <div className="text-[11px] text-[#5B6E67] space-y-0.5 pt-1">
                <div><b>Source:</b> {selectedCase.source}</div>
                <div><b>Concerns:</b> {selectedCase.concernAreas.join(', ')}</div>
                <div><b>Scheduled:</b> {selectedCase.scheduledTime || 'Not yet scheduled'}</div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="flex-1 py-2 rounded-xl bg-[#3A5F4B] hover:bg-[#2C4839] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{selectedCase.scheduledTime ? 'Reschedule' : 'Schedule Appointment'}</span>
                </button>

                <button
                  onClick={() => handleAcceptCase(selectedCase.caseId)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs cursor-pointer"
                >
                  Accept Case
                </button>
              </div>
            </div>

            {/* Private Clinical Notes */}
            <div className="bg-white border border-[#D9E2DC] rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <b className="text-xs text-[#14282B] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#3A5F4B]" />
                  <span>Private Clinical Notes (Confidential)</span>
                </b>
              </div>

              <div className="space-y-1.5">
                {selectedCase.clinicalNotes.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic block">No professional notes added yet.</span>
                ) : (
                  selectedCase.clinicalNotes.map((n, i) => (
                    <div key={i} className="bg-[#F2F6F3] p-2.5 rounded-xl text-[11px] text-[#14282B] leading-snug">
                      • {n}
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={newClinicalNote}
                  onChange={(e) => setNewClinicalNote(e.target.value)}
                  placeholder="Add confidential clinical observation..."
                  className="flex-1 bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-3 py-1.5 text-xs text-[#14282B] focus:outline-none focus:border-[#3A5F4B]"
                />
                <button
                  onClick={handleAddClinicalNote}
                  className="px-3 py-1.5 bg-[#3A5F4B] text-white rounded-xl font-bold text-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= SCHEDULE MODAL ================= */}
      {showScheduleModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 w-full max-w-xs space-y-3 shadow-2xl animate-fadeIn">
            <b className="text-xs text-[#14282B] block">Schedule Clinical Appointment</b>

            <div>
              <label className="font-mono text-[9px] uppercase tracking-wider text-[#5B6E67] block mb-1">
                Selected Date & Slot
              </label>
              <select
                value={scheduledDateTime}
                onChange={(e) => setScheduledDateTime(e.target.value)}
                className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl px-2.5 py-1.5 text-xs text-[#14282B] focus:outline-none"
              >
                <option value="Tomorrow, 10:30 AM">Tomorrow, 10:30 AM (In-Person)</option>
                <option value="Tomorrow, 11:30 AM">Tomorrow, 11:30 AM (Secure Video)</option>
                <option value="Tomorrow, 03:00 PM">Tomorrow, 03:00 PM (In-Person)</option>
                <option value="Day after, 09:30 AM">Day after, 09:30 AM (Secure Video)</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmSchedule}
                className="flex-1 py-2 rounded-xl bg-[#3A5F4B] text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Confirm Appointment
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-3 py-2 rounded-xl bg-slate-100 text-[#5B6E67] text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMERGENCY PROTOCOL TRIGGER ================= */}
      {showEmergencyTrigger && (
        <div className="absolute inset-0 z-50 bg-red-950/90 backdrop-blur-sm text-white p-5 flex flex-col justify-center text-center space-y-3 animate-fadeIn">
          <AlertOctagon className="w-12 h-12 text-red-400 mx-auto animate-pulse" />
          <h3 className="font-fraunces text-base font-bold text-white">
            Campus Crisis Protocol Dispatch
          </h3>
          <p className="text-xs text-red-200 leading-relaxed max-w-xs mx-auto">
            This triggers immediate priority alert to the Campus Medical Team, Warden on Duty, and 24x7 Emergency Contact for student <b>{selectedCase?.anonId}</b>.
          </p>
          <div className="space-y-2 pt-2 max-w-xs mx-auto w-full">
            <button
              onClick={() => {
                alert('Campus Emergency Dispatch Initiated.');
                setShowEmergencyTrigger(false);
              }}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              Confirm Emergency Dispatch
            </button>
            <button
              onClick={() => setShowEmergencyTrigger(false)}
              className="w-full py-2 rounded-xl bg-white/10 text-white text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
