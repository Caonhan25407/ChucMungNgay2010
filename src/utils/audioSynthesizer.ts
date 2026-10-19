/**
 * Web Audio API synthesizer for romantic ambient soundscapes and interaction chimes.
 * Safe for all browsers, zero external dependencies or network assets.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  private noteIndex: number = 0;

  // Gentle, nostalgic romantic melody notes (Frequencies in Hz: C, D, E, G, A in octaves 4 and 5)
  private readonly melodyNotes = [
    523.25, // C5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    659.25, // E5
    587.33, // D5
    523.25, // C5
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    1046.50, // C6
    880.00, // A5
    783.99, // G5
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.stopBGM();
      this.isBgmPlaying = true; // preserve state so unmuting can resume if desired
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.isMuted;
  }

  public isMute(): boolean {
    return this.isMuted;
  }

  public getBgmState(): boolean {
    return this.isBgmPlaying && !this.isMuted;
  }

  /**
   * Magical envelope unsealing / open chime
   */
  public playOpenEnvelopeSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.9);
    });
  }

  /**
   * Heart / Petal burst chime
   */
  public playSparkleSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /**
   * Gentle continuous musical note loop (music-box style romantic ambient)
   */
  public startBGM() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    if (this.bgmTimer) window.clearInterval(this.bgmTimer);

    const playNextNote = () => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const curCtx = this.getContext();
      if (!curCtx) return;

      const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.noteIndex++;

      const now = curCtx.currentTime;
      const osc = curCtx.createOscillator();
      const gain = curCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(curCtx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    };

    // Play immediately, then every 950ms for a peaceful slow cadence
    playNextNote();
    this.bgmTimer = window.setInterval(playNextNote, 950);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }
}

export const soundEngine = new SoundEngine();
