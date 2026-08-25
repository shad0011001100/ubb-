import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Lock,
  Clock,
  Radio,
  Database,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';

export function AdminDashboardView() {
  const [analytics, setAnalytics] = useState(null);
  const [supervisorQueue, setSupervisorQueue] = useState([]);
  const [activeTab, setActiveTab] = useState('funnel'); // 'funnel' | 'supervisor_queue' | 'shadowban_sandbox' | 'make_automation'

  const fetchData = useCallback(async () => {
    const adminData = await api.getAdminAnalytics();
    setAnalytics(adminData);

    const queueData = await api.getSupervisorQueue();
    if (queueData && queueData.queue) {
      setSupervisorQueue(queueData.queue);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleResolveReview = async (reviewId, action) => {
    await api.resolveSupervisorReview(reviewId, action);
    fetchData();
  };

  const WEEKS_DATA = [
    { week: 'W1', height: '30%', val: '30' },
    { week: 'W2', height: '35%', val: '35' },
    { week: 'W3', height: '40%', val: '40' },
    { week: 'W4', height: '38%', val: '38' },
    { week: 'W5', height: '55%', val: '55' },
    { week: 'W6', height: '80%', val: '80' },
    { week: 'W7 (Exams)', height: '90%', val: '90' },
    { week: 'W8', height: '60%', val: '60' }
  ];

  return (
    <div className="h-full bg-[#14282B] text-white flex flex-col justify-between overflow-y-auto p-4 md:p-6 font-work select-none">
      {/* Laptop Frame Container */}
      <div className="max-w-5xl mx-auto w-full bg-[#0C1A1C] border border-white/10 rounded-2xl p-3 md:p-5 shadow-2xl space-y-4">
        {/* Laptop Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4E7C63] flex items-center justify-center text-white">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-fraunces text-base font-semibold text-white">
                Campus Wellbeing &amp; Automation Control Room
              </h3>
              <div className="font-mono text-[9.5px] text-[#8FA69C]">
                Maharashtra Student Mental Health Mesh · Aggregated Node
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="font-mono text-[9px] bg-[#4E7C63]/20 text-[#A3D1B9] border border-[#4E7C63]/40 px-3 py-1 rounded-full font-semibold">
              ANONYMIZED · AGGREGATE ONLY
            </div>
            <div className="font-mono text-[9px] bg-white/10 text-white px-2.5 py-1 rounded-full flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>Live Engine</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('funnel')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
              activeTab === 'funnel'
                ? 'bg-[#E3A06F] text-[#241208] font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Conversion Funnel &amp; Trends
          </button>

          <button
            onClick={() => setActiveTab('supervisor_queue')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'supervisor_queue'
                ? 'bg-[#E3A06F] text-[#241208] font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Workflow B: Supervisor Crisis Queue</span>
            {supervisorQueue.filter(q => q.status === 'pending_review').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('shadowban_sandbox')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
              activeTab === 'shadowban_sandbox'
                ? 'bg-[#E3A06F] text-[#241208] font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Workflow D: Troll Honeypot Sandbox
          </button>

          <button
            onClick={() => setActiveTab('make_automation')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
              activeTab === 'make_automation'
                ? 'bg-[#E3A06F] text-[#241208] font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Make.com / Voiceflow Logs
          </button>

          <button
            onClick={() => setActiveTab('supabase_schema')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'supabase_schema'
                ? 'bg-[#E3A06F] text-[#241208] font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase &amp; RLS</span>
          </button>
        </div>

        {/* Tab 1: Conversion Funnel & Weekly Trends */}
        {activeTab === 'funnel' && (
          <div className="space-y-4">
            {/* 4-Stage Support Referral Funnel */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#E3A06F] mb-2 font-semibold">
                Student Engagement &amp; Triage Funnel (Past 30 Days)
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 text-center">
                  <div className="font-fraunces text-2xl font-bold text-white">1,284</div>
                  <div className="font-mono text-[9px] text-[#8FA69C] uppercase">01 · Screened</div>
                  <div className="text-[9px] text-emerald-400 mt-1">100% Top of Funnel</div>
                </div>

                <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 text-center">
                  <div className="font-fraunces text-2xl font-bold text-[#E3A06F]">890</div>
                  <div className="font-mono text-[9px] text-[#8FA69C] uppercase">02 · Used Self-Help</div>
                  <div className="text-[9px] text-red-400 mt-1 font-mono">-31% Drop-off</div>
                </div>

                <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 text-center">
                  <div className="font-fraunces text-2xl font-bold text-[#A3D1B9]">412</div>
                  <div className="font-mono text-[9px] text-[#8FA69C] uppercase">03 · Reached Peer</div>
                  <div className="text-[9px] text-red-400 mt-1 font-mono">-54% Drop-off</div>
                </div>

                <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 text-center">
                  <div className="font-fraunces text-2xl font-bold text-white">231</div>
                  <div className="font-mono text-[9px] text-[#8FA69C] uppercase">04 · Reached Counselor</div>
                  <div className="text-[9px] text-red-400 mt-1 font-mono">-44% Drop-off</div>
                </div>
              </div>
            </div>

            {/* Academic Week Stress Trends */}
            <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">
                  Reported Campus Stress Index — by Academic Semester Week
                </span>
                <span className="font-mono text-[9.5px] text-[#E3A06F]">
                  Spikes at Mid-terms (W6) and Finals (W7)
                </span>
              </div>

              <div className="flex items-end gap-3 h-28 pt-4 pb-1">
                {WEEKS_DATA.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t-md transition-all ${
                        item.val >= 80 ? 'bg-[#B84C4C]' : item.val >= 50 ? 'bg-[#E3A06F]' : 'bg-[#4E7C63]'
                      }`}
                    />
                    <span className="font-mono text-[8.5px] text-[#8FA69C] mt-1 truncate max-w-full">
                      {item.week}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-mono text-[9.5px] text-[#8FA69C] bg-black/30 p-2.5 rounded-xl border border-white/5">
              💡 Funnel drop-offs help administrative counselors identify where stigma or barrier friction peaks. No individual identity or transcript is ever viewable here.
            </div>
          </div>
        )}

        {/* Tab 2: Workflow B Supervisor Crisis Queue */}
        {activeTab === 'supervisor_queue' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#E3A06F] font-semibold">
                  Workflow B: Auto-Crisis Detection &amp; 30-Second Manual Review Intercept
                </div>
                <p className="text-xs text-[#C3D2CB] mt-0.5">
                  When crisis confidence is between 50% and 85%, supervisor has 30 seconds to lock student to SOS or dismiss false alarm.
                </p>
              </div>
            </div>

            {supervisorQueue.length === 0 ? (
              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-8 text-center text-xs text-[#8FA69C] font-mono">
                No active crisis reviews in queue. Ollama is scanning chat inputs locally with zero leakage.
              </div>
            ) : (
              <div className="space-y-2.5">
                {supervisorQueue.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                        <span className="font-mono font-semibold text-xs text-white">
                          Target: {item.anonymousId}
                        </span>
                        <span className="font-mono text-[9px] bg-red-950/60 text-red-300 border border-red-800 px-2 py-0.5 rounded">
                          Confidence: {item.confidence}% ({item.detectedCategory})
                        </span>
                      </div>

                      <span className="font-mono text-[9px] text-[#E3A06F]">
                        Detected Language: {item.language}
                      </span>
                    </div>

                    <div className="bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs text-[#D6E2DC] italic">
                      "{item.text}"
                    </div>

                    {item.status === 'pending_review' ? (
                      <div className="flex items-center justify-between pt-1">
                        <div className="font-mono text-[10px] text-amber-300 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>30s Review Window Active</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleResolveReview(item.id, 'LOCK_TO_SOS')}
                            className="px-3 py-1.5 rounded-lg bg-[#B84C4C] hover:bg-red-700 text-white font-semibold text-xs cursor-pointer flex items-center gap-1"
                          >
                            <Lock className="w-3 h-3" />
                            <span>Confirm &amp; Lock to SOS</span>
                          </button>
                          <button
                            onClick={() => handleResolveReview(item.id, 'DISMISS_FALSE_ALARM')}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
                          >
                            Dismiss (False Alarm)
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="font-mono text-[9.5px] text-emerald-400">
                        Status: {item.status === 'approved_lock' ? 'Locked to SOS' : 'Dismissed'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Workflow D Shadowban Sandbox Inspector */}
        {activeTab === 'shadowban_sandbox' && (
          <div className="space-y-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#E3A06F] font-semibold">
                Workflow D: Shadowban Sandbox &amp; Troll Honeypot Isolation
              </div>
              <p className="text-xs text-[#C3D2CB] mt-0.5">
                Flagged trolls are never banned outright. Voiceflow silently reroutes their connection to an isolated AI bot loop mimicking a human, wasting the troll's time while protecting real volunteers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3.5 space-y-2">
                <span className="font-mono text-[10px] text-[#A3D1B9] uppercase font-semibold block">
                  Isolated Honeypot Transcripts (Simulated Bot)
                </span>
                <div className="space-y-2 text-xs">
                  <div className="bg-black/30 p-2 rounded-lg border border-red-500/20">
                    <span className="font-mono text-[9px] text-red-400 block font-semibold">Troll_Device_98x:</span>
                    <p className="text-white/80 mt-0.5">"Haha this app is stupid you guys are clowns"</p>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-emerald-500/20">
                    <span className="font-mono text-[9px] text-emerald-400 block font-semibold">Honeypot AI Loop:</span>
                    <p className="text-white/80 mt-0.5">"I understand you feel that way. Tell me more about what makes you think so?"</p>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-red-500/20">
                    <span className="font-mono text-[9px] text-red-400 block font-semibold">Troll_Device_98x:</span>
                    <p className="text-white/80 mt-0.5">"Are you even listening to me??"</p>
                  </div>
                </div>
                <div className="font-mono text-[9.5px] text-[#E3A06F]">
                  ⏱️ 18.5 Volunteer Minutes Saved by Honeypot
                </div>
              </div>

              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3.5 space-y-2">
                <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold block">
                  Active Sandbox Fingerprints
                </span>
                <div className="space-y-1.5 text-xs font-mono text-[#8FA69C]">
                  <div className="bg-black/20 p-2 rounded-lg flex items-center justify-between">
                    <span>fp_browser_hash_9281x</span>
                    <span className="text-red-400">Rerouted to Bot</span>
                  </div>
                  <div className="bg-black/20 p-2 rounded-lg flex items-center justify-between">
                    <span>fp_device_node_4412k</span>
                    <span className="text-red-400">Rerouted to Bot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Make.com / Voiceflow Automation Webhook Logs */}
        {activeTab === 'make_automation' && (
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#E3A06F] font-semibold">
              Make.com Webhooks &amp; State Toggle Stream
            </div>

            <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3.5 space-y-2 font-mono text-xs text-[#D6E2DC]">
              {analytics?.automationLogs?.length > 0 ? (
                analytics.automationLogs.map((log, idx) => (
                  <div key={idx} className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[#E3A06F]">
                      <span className="font-bold">{log.type}</span>
                      <span className="text-[9px] text-[#8FA69C]">{log.timestamp}</span>
                    </div>
                    <pre className="text-[10px] text-[#A3D1B9] overflow-x-auto">
                      {JSON.stringify(log.payloadSent || log, null, 2)}
                    </pre>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-[#8FA69C]">
                  No webhook executions yet. Trigger SOS or Consent Deadlock to view real-time payload broadcasts.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Supabase PostgreSQL Architecture & Row Level Security (RLS) */}
        {activeTab === 'supabase_schema' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#E3A06F] font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#E3A06F]" />
                  <span>Supabase PostgreSQL Schema &amp; Row Level Security (RLS)</span>
                </div>
                <p className="text-xs text-[#C3D2CB] mt-0.5">
                  6 Core PostgreSQL tables enforcing zero PII leakage and anonymous authentication.
                </p>
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px] bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>RLS Active: Zero Data Leakage</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {/* Table 1 */}
              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[#E3A06F]">
                  <span className="font-bold">1. public.profiles</span>
                  <span className="text-[9px] text-[#A3D1B9]">RLS: auth.uid() = id</span>
                </div>
                <div className="text-[10px] text-[#D6E2DC] space-y-0.5">
                  <div>• id (UUID PK &rarr; auth.users)</div>
                  <div>• anonymous_tag (VARCHAR) &mdash; e.g. "Sprout_042"</div>
                  <div>• selected_language (VARCHAR) &mdash; 'en', 'mr', 'hi'</div>
                  <div>• current_streak (INT) &bull; is_shadowbanned (BOOL)</div>
                  <div>• encrypted_break_glass_contact (TEXT)</div>
                </div>
              </div>

              {/* Table 2 */}
              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[#E3A06F]">
                  <span className="font-bold">2. public.screening_logs</span>
                  <span className="text-[9px] text-[#A3D1B9]">RLS: auth.uid() = user_id</span>
                </div>
                <div className="text-[10px] text-[#D6E2DC] space-y-0.5">
                  <div>• id (UUID PK) &bull; user_id (UUID &rarr; profiles)</div>
                  <div>• score (INT) &bull; risk_tier ('LOW' | 'MODERATE' | 'SEVERE')</div>
                  <div>• responses (JSONB PHQ-9 item scores)</div>
                  <div>• created_at (TIMESTAMPTZ)</div>
                </div>
              </div>

              {/* Table 3 */}
              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[#E3A06F]">
                  <span className="font-bold">3. public.volunteers</span>
                  <span className="text-[9px] text-[#A3D1B9]">Shift Cap: 7,200s (2h)</span>
                </div>
                <div className="text-[10px] text-[#D6E2DC] space-y-0.5">
                  <div>• id (UUID PK) &bull; display_name (VARCHAR)</div>
                  <div>• role_title &bull; supervisor_info (Verifiable Lic)</div>
                  <div>• is_active (BOOL) &bull; daily_active_seconds (INT)</div>
                  <div>• last_shift_start (TIMESTAMPTZ)</div>
                </div>
              </div>

              {/* Table 4 */}
              <div className="bg-[#1E3A3D] border border-white/10 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[#E3A06F]">
                  <span className="font-bold">4. public.support_sessions</span>
                  <span className="text-[9px] text-[#A3D1B9]">Workflow E: Refusal &ge; 3</span>
                </div>
                <div className="text-[10px] text-[#D6E2DC] space-y-0.5">
                  <div>• id (UUID PK) &bull; user_id &bull; volunteer_id</div>
                  <div>• status ('ai_triage' | 'peer_active' | 'crisis_sos')</div>
                  <div>• triage_summary (TEXT)</div>
                  <div>• consent_refusal_count (INT) &mdash; Deadlock Gate</div>
                </div>
              </div>

              {/* Table 5 & 6 */}
              <div className="md:col-span-2 bg-[#1E3A3D] border border-white/10 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[#E3A06F]">
                  <span className="font-bold">5. public.ephemeral_vents &amp; 6. public.community_letters</span>
                  <span className="text-[9px] text-emerald-300">Auto-Purged &amp; Moderated</span>
                </div>
                <div className="text-[10px] text-[#D6E2DC] grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="text-white font-semibold block">ephemeral_vents:</span>
                    <span>id (UUID), content (TEXT), created_at (NOW) &mdash; Instantly zeroized upon release.</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold block">community_letters:</span>
                    <span>id (UUID), author_tag (VARCHAR), content (TEXT), is_approved (BOOL).</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
