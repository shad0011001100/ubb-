/**
 * Ubb (ऊब) - Therapeutic & Tactile Sound Effects Engine (SFX)
 * 
 * Powered by native Web Audio API (Zero external MP3 dependencies, 100% offline, 0ms latency).
 * Produces organic, pleasing, and relaxing soundscapes for taps, unlocks, and milestones.
 */

class SoundEffectsEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;

    // Load saved sound preference
    try {
      const saved = localStorage.getItem('ubb_sfx_muted');
      if (saved !== null) {
        this.muted = JSON.parse(saved);
      }
    } catch {}
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('ubb_sfx_muted', JSON.stringify(this.muted));
    } catch {}
    if (!this.muted) {
      this.playTap();
    }
    return this.muted;
  }

  setMuted(val) {
    this.muted = !!val;
    try {
      localStorage.setItem('ubb_sfx_muted', JSON.stringify(this.muted));
    } catch {}
  }

  /**
   * 1. Gentle Tactile Tap / Click (Soft Wooden Pebble Click)
   * Used for buttons, navigation tabs, and questionnaire option selections.
   */
  playTap(frequency = 520) {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.04);

      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {}
  }

  /**
   * 2. Soft Bubbly Selection Pop
   * Used for toggling items, chips, and radio pills.
   */
  playPop() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(680, t + 0.05);

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {}
  }

  /**
   * 3. Warmth Heart Bloom (Warm ascending resonant bubble)
   * Used when student or volunteer sends warmth to a thought on the Wall of Thoughts.
   */
  playWarmth() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;

      // Fundamental and gentle harmonic overtone
      const freqs = [350, 700];
      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, t + 0.09);

        const vol = i === 0 ? 0.12 : 0.05;
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.14);
      });
    } catch {}
  }

  /**
   * 4. Milestone & Badge Unlock Chime (Celestial Major 9th Arpeggio)
   * Used when unlocking a new mindfulness badge, milestone streak, or level upgrade.
   */
  playUnlock() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      // Celestial Major pentatonic notes: C5, E5, G5, B5, D6, E6
      const chord = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51];

      chord.forEach((freq, idx) => {
        const noteStart = t + idx * 0.075;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.12, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.9);
      });
    } catch {}
  }

  /**
   * 5. Solfeggio 528Hz Transformation Bell (Deep Peace & Assessment Completion)
   * Used upon completing the 10-Q checkup or finishing a 4-7-8 breathing session.
   */
  playSuccess() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      // 528Hz (Love/Miracle tone), 1056Hz harmonic shimmer, 264Hz ground
      const harmonics = [
        { f: 528, vol: 0.16, decay: 1.8 },
        { f: 1056, vol: 0.07, decay: 1.4 },
        { f: 264, vol: 0.1, decay: 2.0 },
        { f: 792, vol: 0.05, decay: 1.2 }
      ];

      harmonics.forEach(({ f, vol, decay }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + decay);
      });
    } catch {}
  }

  /**
   * 6. Calming Breath Guide Swell
   * Used to smoothly guide breathing rhythm.
   */
  playBreathCue(phase = 'inhale') {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';

      if (phase === 'inhale') {
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(440, t + 3.8);
        gain.gain.setValueAtTime(0.02, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 3.5);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 3.9);
        osc.start(t);
        osc.stop(t + 4.0);
      } else if (phase === 'exhale') {
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 4.0);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 4.0);
        osc.start(t);
        osc.stop(t + 4.1);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);
    } catch {}
  }
}

export const soundEffects = new SoundEffectsEngine();
