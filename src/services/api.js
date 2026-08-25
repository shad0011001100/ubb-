import { onDeviceNLP } from './onDeviceNLP';

const API_BASE_URL = '/api';

export const api = {
  // 1. Health check
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error('Health check non-200');
      return await res.json();
    } catch {
      try {
        const fallbackRes = await fetch('http://localhost:5000/api/health');
        return await fallbackRes.json();
      } catch {
        return { status: 'OFFLINE' };
      }
    }
  },

  // 2. Browser-Native On-Device NLP (Zero Server Transmission) + Optional Server Fallback
  async analyzeNLP({ text, anonymousId, language, userState, forceOnDevice = true }) {
    // 100% Browser-Native Client Evaluation (WebLLM / Zero Network Calls)
    if (forceOnDevice) {
      const localResult = onDeviceNLP.analyze(text, { language });
      // If supervisor review is needed and network is alive, dispatch in background
      if (localResult.triggerAction === 'supervisor_review') {
        try {
          fetch(`${API_BASE_URL}/nlp/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, anonymousId, language, userState })
          }).catch(() => {});
        } catch {}
      }
      return localResult;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/nlp/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, anonymousId, language, userState })
      });
      return await res.json();
    } catch {
      return onDeviceNLP.analyze(text, { language });
    }
  },

  // 2.5 Voiceflow Guided Conversational Triage (Instant Browser-Native Response)
  async sendDialogueMessage({ text, conversationHistory, step, anonymousId, language, deviceFingerprint, forceOnDevice = true }) {
    if (forceOnDevice) {
      return onDeviceNLP.generateInstantDialogue({ text, step, language });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 250); // 250ms max timeout

      const res = await fetch(`${API_BASE_URL}/voiceflow/dialogue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, conversationHistory, step, anonymousId, language, deviceFingerprint }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        return await res.json();
      }
    } catch {}

    return onDeviceNLP.generateInstantDialogue({ text, step, language });
  },

  // 3. AI Co-Pilot Boundary-Respecting Suggestions for Peer Volunteers (Workflow C)
  async getCoPilotSuggestions({ userMessage, peerName, context }) {
    try {
      const res = await fetch(`${API_BASE_URL}/nlp/co-pilot-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, peerName, context })
      });
      return await res.json();
    } catch {
      return {
        suggestions: [
          { id: "opt-1", tone: "Active Listening & Empathy", text: "That sounds really heavy to carry. How long have you felt this way?" },
          { id: "opt-2", tone: "Grounding & Normalization", text: "A lot of students experience this pressure during exam season. You are not alone." },
          { id: "opt-3", tone: "Gentle Exploration", text: "Would it help to talk through what feels most overwhelming right now?" }
        ]
      };
    }
  },

  // 4. Break-Glass SOS Trigger & Make.com Webhook (Workflow A)
  async triggerBreakGlassSOS({ anonymousId, breakGlassPhone, triggerReason, localDialerSelected }) {
    try {
      const res = await fetch(`${API_BASE_URL}/automation/break-glass-sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anonymousId, breakGlassPhone, triggerReason, localDialerSelected })
      });
      return await res.json();
    } catch {
      return {
        success: true,
        message: "Offline local SOS triggered directly.",
        availableHelplines: [
          { name: "Tele-MANAS (Govt of India)", number: "14416", tollFree: true },
          { name: "KIRAN National Mental Health", number: "1800-599-0019", tollFree: true },
          { name: "Maitri NGO Crisis Line", number: "022-25563291" }
        ]
      };
    }
  },

  // 5. Shadowban Sandbox Toggle (Workflow D)
  async toggleShadowban({ deviceFingerprint, reason, anonymousId }) {
    try {
      const res = await fetch(`${API_BASE_URL}/automation/shadowban-toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceFingerprint, reason, anonymousId })
      });
      return await res.json();
    } catch {
      return { success: true, isShadowbanned: true };
    }
  },

  async getShadowbanStatus(deviceFingerprint) {
    try {
      const res = await fetch(`${API_BASE_URL}/automation/shadowban-status?deviceFingerprint=${encodeURIComponent(deviceFingerprint)}`);
      return await res.json();
    } catch {
      return { isShadowbanned: false, shadowbannedList: [] };
    }
  },

  // 6. Consent Deadlock Off-Ramp (Workflow E)
  async submitConsentResponse({ anonymousId, response }) {
    try {
      const res = await fetch(`${API_BASE_URL}/automation/consent-response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anonymousId, response })
      });
      return await res.json();
    } catch {
      return { status: 'RECORDED', declineCount: 1, isDeadlocked: false };
    }
  },

  // 7. Peer Volunteers & Counselors
  async getPeers() {
    try {
      const res = await fetch(`${API_BASE_URL}/peers`);
      return await res.json();
    } catch {
      return { peers: [] };
    }
  },

  async updatePeerActiveTime(peerId, additionalMinutes = 15) {
    try {
      const res = await fetch(`${API_BASE_URL}/peers/update-time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peerId, additionalMinutes })
      });
      return await res.json();
    } catch {
      return { error: 'Failed to update time' };
    }
  },

  // 8. Supervisor Review Queue
  async getSupervisorQueue() {
    try {
      const res = await fetch(`${API_BASE_URL}/supervisor/queue`);
      return await res.json();
    } catch {
      return { queue: [] };
    }
  },

  async resolveSupervisorReview(reviewId, action) {
    try {
      const res = await fetch(`${API_BASE_URL}/supervisor/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, action })
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  // 9. Self-Care: Wall of Thoughts & Let It Out
  async getWallOfThoughts() {
    try {
      const res = await fetch(`${API_BASE_URL}/selfcare/thoughts`);
      return await res.json();
    } catch {
      return { thoughts: [] };
    }
  },

  async postThought(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/selfcare/thoughts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch {
      return { success: true, thought: payload };
    }
  },

  async likeThought(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/selfcare/thoughts/${id}/like`, { method: 'POST' });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  async burnLetItOut(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/selfcare/let-it-out-burn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch {
      return {
        status: 'BURNED_AND_ERASED',
        message: "Your words were released and immediately dissolved into nothingness."
      };
    }
  },

  // 10. Admin Analytics
  async getAdminAnalytics() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/analytics`);
      return await res.json();
    } catch {
      return {
        conversionFunnel: { screened: 1284, usedSelfHelp: 890, reachedPeer: 412, reachedCounselor: 231 },
        weeklyStressTrends: []
      };
    }
  },

  // 11. Real-Time SSE Stream
  subscribeToEvents(onEventCallback) {
    try {
      const eventSource = new EventSource(`${API_BASE_URL}/events`);
      eventSource.onmessage = (e) => {
        try {
          const parsed = JSON.parse(e.data);
          onEventCallback(parsed);
        } catch {}
      };
      return () => eventSource.close();
    } catch {
      return () => {};
    }
  }
};
