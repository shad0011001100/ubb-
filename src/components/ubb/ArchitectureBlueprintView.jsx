import React from 'react';
import { Cpu, Database } from 'lucide-react';

export function ArchitectureBlueprintView() {
  return (
    <div className="h-full bg-[#14282B] text-white p-6 overflow-y-auto font-work space-y-6 select-none">
      {/* Blueprint Header */}
      <div className="max-w-5xl mx-auto border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-[#E3A06F] font-mono text-xs uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" />
          <span>Full Stack Logic &amp; Automation Architecture</span>
        </div>
        <h2 className="font-fraunces text-2xl font-semibold text-white">
          Ubb (ऊब) — Automation Workflows &amp; Zero Data Leakage Blueprint
        </h2>
        <p className="text-xs text-[#AEBFB8] mt-1 max-w-2xl leading-relaxed">
          Designed specifically to overcome psychological barriers to seeking help (stigma, low literacy, confidentiality distrust) via edge-computing privacy and automated safeguards.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Workflow A */}
        <div className="bg-[#1E3A3D] border border-white/10 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold">
              Workflow A: Device-Side Routing &amp; "Break-Glass" SOS
            </span>
            <span className="text-[9px] font-mono bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
              Zero Geolocation
            </span>
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed">
            <b>Trigger:</b> User taps SOS or Ollama detects crisis intent.<br />
            <b>Action:</b> Instant render of SOS screen pre-loaded with local dialers (Tele-MANAS 14416, KIRAN, Maitri NGO).<br />
            <b>Make.com Webhook:</b> Fires Twilio SMS API to voluntary Break-Glass Contact with anonymized payload:
          </p>
          <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-emerald-300">
            {`{\n  "event": "BREAK_GLASS_TRIGGERED",\n  "recipientPhone": "+91******4321",\n  "smsBody": "Your friend using the Ubb app has triggered an SOS alert and needs you to check on them.",\n  "piiIncluded": false\n}`}
          </div>
        </div>

        {/* Workflow B */}
        <div className="bg-[#1E3A3D] border border-white/10 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold">
              Workflow B: Local NLP &amp; Auto-Crisis Detection
            </span>
            <span className="text-[9px] font-mono bg-[#4E7C63]/30 text-[#A3D1B9] px-2 py-0.5 rounded border border-[#4E7C63]">
              Ollama + Voiceflow
            </span>
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed">
            <b>Trigger:</b> Every chat input passes through local private Ollama instance.<br />
            <b>Logic:</b> Parses Hinglish &amp; Marathi slang alongside English (e.g. <i>"सगळं संपवावंसं वाटतंय"</i>).<br />
            <b>Routing:</b> Confidence &gt; 85% &rarr; Instant SOS lock. Confidence 50-84% &rarr; Voiceflow routes to Supervisor Dashboard for 30s manual review.
          </p>
          <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-amber-300">
            {`{\n  "crisisConfidence": 0.98,\n  "language": "mr",\n  "matchedCategory": "suicide_ideation",\n  "routing": "AUTO_LOCK_CRISIS_HUB"\n}`}
          </div>
        </div>

        {/* Workflow C */}
        <div className="bg-[#1E3A3D] border border-white/10 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold">
              Workflow C: Peer Guardrails &amp; AI Co-Pilot
            </span>
            <span className="text-[9px] font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
              Anti-Burnout Engine
            </span>
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed">
            <b>Time Limit:</b> Make.com tracks active chat times; at 2 hours (120 mins), volunteer status changes to offline for 24h rest.<br />
            <b>AI Co-Pilot:</b> Pings Ollama to generate 3 clinically safe, boundary-respecting response options to prevent accidental medical prescriptions.
          </p>
          <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-blue-300">
            {`{\n  "volunteerId": "Amber_17",\n  "activeMinutes": 120,\n  "action": "TOGGLE_OFFLINE_REST_24H",\n  "clinicalSafetyScore": "100% Non-Prescriptive"\n}`}
          </div>
        </div>

        {/* Workflow D */}
        <div className="bg-[#1E3A3D] border border-white/10 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold">
              Workflow D: Shadowban Sandbox (Troll Management)
            </span>
            <span className="text-[9px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
              Honeypot Bot Loop
            </span>
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed">
            <b>Logic:</b> Uses lightweight device fingerprinting for harassment flags.<br />
            <b>Action:</b> Make.com sets user state to shadowbanned. Voiceflow silently reroutes connection to an isolated AI bot mimicking a human, wasting the troll's time while protecting real volunteers.
          </p>
          <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-purple-300">
            {`{\n  "deviceFingerprint": "fp_browser_9281x",\n  "status": "SHADOWBANNED",\n  "queueTarget": "HONEYPOT_AI_BOT_LOOP",\n  "volunteerProtected": true\n}`}
          </div>
        </div>

        {/* Workflow E */}
        <div className="md:col-span-2 bg-[#1E3A3D] border border-white/10 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold">
              Workflow E: The Consent Deadlock Off-Ramp
            </span>
            <span className="text-[9px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
              Clinical Escalation Guard
            </span>
          </div>
          <p className="text-xs text-[#D6E2DC] leading-relaxed">
            <b>Trigger:</b> Peer suggests clinical escalation via Consent Gate.<br />
            <b>Logic:</b> If student clicks "Not right now" 3 times in one session &rarr; DEADLOCK state triggered.<br />
            <b>Action:</b> Live chat locks with mandated closing script: <i>"I want to ensure you get the best support, which is beyond my training. I'm pausing our live chat, but the self-care tools are here for you."</i> Make.com enforces a 24-hour cooldown on "Talk to a Peer" button.
          </p>
        </div>

        {/* Database & Auth Architecture */}
        <div className="md:col-span-2 bg-[#1E3A3D] border border-[#E3A06F]/30 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#E3A06F] uppercase font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#E3A06F]" />
              <span>Database &amp; Anonymous Auth Architecture (Supabase PostgreSQL + RLS)</span>
            </span>
            <span className="text-[9px] font-mono bg-[#4E7C63]/30 text-[#A3D1B9] px-2 py-0.5 rounded border border-[#4E7C63]">
              Zero-PII Storage
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#D6E2DC] font-mono">
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <b className="text-white block mb-1">public.profiles</b>
              <span className="text-[10px] text-[#AEBFB8]">
                id (auth.uid), anonymous_tag, selected_language, current_streak, encrypted_break_glass_contact
              </span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <b className="text-white block mb-1">public.screening_logs</b>
              <span className="text-[10px] text-[#AEBFB8]">
                score, risk_tier ('LOW' | 'MODERATE' | 'SEVERE'), responses (JSONB), created_at
              </span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <b className="text-white block mb-1">public.volunteers</b>
              <span className="text-[10px] text-[#AEBFB8]">
                display_name, role_title, supervisor_info, daily_active_seconds (max 7200s), is_active
              </span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <b className="text-white block mb-1">public.support_sessions</b>
              <span className="text-[10px] text-[#AEBFB8]">
                user_id, volunteer_id, status, triage_summary, consent_refusal_count (&ge; 3 deadlock)
              </span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <b className="text-white block mb-1">public.ephemeral_vents</b>
              <span className="text-[10px] text-[#AEBFB8]">
                Auto-purged on release. Cryptographic zeroization upon vent burn.
              </span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <b className="text-white block mb-1">public.community_letters</b>
              <span className="text-[10px] text-[#AEBFB8]">
                author_tag, content, is_approved. Moderated warmth notes wall.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
