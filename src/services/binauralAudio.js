/**
 * Ubb (ऊब) - Web Audio API Binaural Beats Generator
 * 
 * Generates exact left/right sine wave differences in mathematical real-time:
 * - Delta (1-4 Hz): Deep sleep, restorative recovery
 * - Theta (4-8 Hz): Deep relaxation, meditation, panic/anxiety relief
 * - Alpha (8-13 Hz): Calm alertness, learning, exam focus & ADHD flow
 * 
 * 100% Offline & zero audio files needed.
 */

class BinauralBeatsEngine {
  constructor() {
    this.audioCtx = null;
    this.leftOsc = null;
    this.rightOsc = null;
    this.leftGain = null;
    this.rightGain = null;
    this.masterGain = null;
    this.noiseNode = null;
    this.isPlaying = false;
    this.currentPreset = 'theta'; // 'delta' | 'theta' | 'alpha'
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Start generating binaural frequencies in real-time
   * @param {Object} config - { baseFrequency: number, beatFrequency: number, volume: number, preset: string }
   */
  start({ baseFrequency = 200, beatFrequency = 6, volume = 0.5, preset = 'theta' }) {
    this.stop(); // Clean any active nodes
    this.initContext();
    this.currentPreset = preset;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Master Gain for smooth fade-in
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.18), now + 1.2);
    this.masterGain.connect(ctx.destination);

    // Left Ear Channel (Base Frequency)
    this.leftOsc = ctx.createOscillator();
    this.leftOsc.type = 'sine';
    this.leftOsc.frequency.setValueAtTime(baseFrequency, now);

    // Right Ear Channel (Base Frequency + Beat Difference)
    this.rightOsc = ctx.createOscillator();
    this.rightOsc.type = 'sine';
    this.rightOsc.frequency.setValueAtTime(baseFrequency + beatFrequency, now);

    // Create Stereo Panning (Left = -1, Right = +1)
    if (ctx.createStereoPanner) {
      const leftPanner = ctx.createStereoPanner();
      leftPanner.pan.setValueAtTime(-1, now);
      this.leftOsc.connect(leftPanner);
      leftPanner.connect(this.masterGain);

      const rightPanner = ctx.createStereoPanner();
      rightPanner.pan.setValueAtTime(1, now);
      this.rightOsc.connect(rightPanner);
      rightPanner.connect(this.masterGain);
    } else {
      // Fallback for older browsers using ChannelMerger
      const merger = ctx.createChannelMerger(2);
      this.leftOsc.connect(merger, 0, 0);
      this.rightOsc.connect(merger, 0, 1);
      merger.connect(this.masterGain);
    }

    // Gentle 432Hz Sub-Harmonic Drone Layer for extra warmth & organic presence
    try {
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(baseFrequency / 2, now);
      droneGain.gain.setValueAtTime(0.04, now);
      droneOsc.connect(droneGain);
      droneGain.connect(this.masterGain);
      droneOsc.start(now);
      this.droneOsc = droneOsc;
    } catch {}

    this.leftOsc.start(now);
    this.rightOsc.start(now);
    this.isPlaying = true;
  }

  setVolume(volume) {
    if (this.masterGain && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(Math.max(0.0001, volume * 0.18), now + 0.1);
    }
  }

  stop(fadeDuration = 0.8) {
    if (!this.isPlaying || !this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
      }

      setTimeout(() => {
        try {
          if (this.leftOsc) { this.leftOsc.stop(); this.leftOsc.disconnect(); this.leftOsc = null; }
          if (this.rightOsc) { this.rightOsc.stop(); this.rightOsc.disconnect(); this.rightOsc = null; }
          if (this.droneOsc) { this.droneOsc.stop(); this.droneOsc.disconnect(); this.droneOsc = null; }
          if (this.masterGain) { this.masterGain.disconnect(); this.masterGain = null; }
        } catch {}
        this.isPlaying = false;
      }, fadeDuration * 1000 + 50);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const binauralEngine = new BinauralBeatsEngine();

export const BRAINWAVE_PRESETS = {
  delta: {
    id: 'delta',
    name: 'Delta Waves (1–4 Hz)',
    title: 'Deep Sleep & Power Down',
    baseFrequency: 150,
    beatFrequency: 2.5,
    pulseSpeedSec: 4.0,
    distressState: 'Insomnia / Exhaustion / Burnout',
    effect: 'Mimics deep, dreamless sleep to help the brain power down.',
    tag: 'Sleep & Recovery'
  },
  theta: {
    id: 'theta',
    name: 'Theta Waves (4–8 Hz)',
    title: 'Anxiety Relief & Meditation',
    baseFrequency: 200,
    beatFrequency: 6.0,
    pulseSpeedSec: 2.8,
    distressState: 'Anxiety / Panic / Overwhelm',
    effect: 'Promotes deep relaxation, meditation, and reduces severe stress.',
    tag: 'Panic Relief'
  },
  alpha: {
    id: 'alpha',
    name: 'Alpha Waves (8–13 Hz)',
    title: 'Exam Focus & Calm Alertness',
    baseFrequency: 250,
    beatFrequency: 10.0,
    pulseSpeedSec: 1.8,
    distressState: 'Exam Stress / Lack of Focus / ADHD Paralysis',
    effect: 'Promotes calm alertness, learning, and flow-state focus.',
    tag: 'Focus & Study'
  }
};
