/**
 * Maple Math Quest - Offline WebAudio Synthesizer & Optional Offline Speech Helper
 * Works 100% offline with zero external audio assets required.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.14, delay = 0, volume = 0.22) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playPop() {
    this.playTone(520, 'sine', 0.08, 0, 0.2);
    this.playTone(760, 'triangle', 0.09, 0.04, 0.18);
  }

  playTap() {
    this.playTone(440, 'triangle', 0.06, 0, 0.15);
  }

  playCoin() {
    this.playTone(987.77, 'sine', 0.09, 0, 0.18); // B5
    this.playTone(1318.51, 'sine', 0.22, 0.08, 0.2); // E6
  }

  playSuccess() {
    // Warm cheerful major arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 E5 G5 C6
    notes.forEach((n, idx) => {
      this.playTone(n, 'triangle', 0.18, idx * 0.075, 0.24);
    });
  }

  playFanfare() {
    // Quest completion celebration chord progression
    const seq = [
      { f: 523.25, d: 0.14, t: 0 },
      { f: 659.25, d: 0.14, t: 0.11 },
      { f: 783.99, d: 0.14, t: 0.22 },
      { f: 1046.50, d: 0.35, t: 0.34 },
      { f: 783.99, d: 0.14, t: 0.52 },
      { f: 1046.50, d: 0.45, t: 0.66 }
    ];
    seq.forEach(s => this.playTone(s.f, 'triangle', s.d, s.t, 0.26));
  }

  playGentleNudge() {
    // Non-punitive soft wooden double-boop for "let's try again"
    this.playTone(330, 'sine', 0.14, 0, 0.16);
    this.playTone(293.66, 'sine', 0.2, 0.12, 0.14);
  }

  playHeroLaser() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    // Fast rising power charge + laser zap + heroic chord
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(1120, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.28);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.31);

    // Impact chime
    this.playTone(587.33, 'triangle', 0.15, 0.14, 0.22); // D5
    this.playTone(880.00, 'triangle', 0.22, 0.21, 0.25); // A5
    this.playTone(1174.66, 'sine', 0.30, 0.28, 0.26);    // D6
  }

  playHeroUltimate() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    // Mega Ultra Slam superhero fanfare + energy burst
    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    chord.forEach((f, i) => {
      this.playTone(f, 'sawtooth', 0.26, i * 0.055, 0.2);
      this.playTone(f * 1.5, 'triangle', 0.3, i * 0.055 + 0.04, 0.18);
    });
  }

  playHeroShield() {
    // Energy shield deflection hum
    this.playTone(480, 'sine', 0.12, 0, 0.2);
    this.playTone(640, 'triangle', 0.18, 0.07, 0.18);
  }

  speak(text) {
    if (!this.voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleaned = text
        .replace(/×/g, ' times ')
        .replace(/÷/g, ' divided by ')
        .replace(/\+/g, ' plus ')
        .replace(/−|-/g, ' minus ')
        .replace(/\$/g, ' dollars ')
        .replace(/¢/g, ' cents ');
      const utter = new SpeechSynthesisUtterance(cleaned);
      utter.rate = 0.92;
      utter.pitch = 1.08;
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // Ignore if speech synthesis is unavailable on device
    }
  }
}

window.soundEngine = new SoundEngine();
