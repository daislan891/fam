// Real-time Web Audio Synthesizer for Musical Previews & Frequency Visualizer

class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentGenre: string | null = null;
  private intervalId: number | null = null;
  private step: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentGenre(): string | null {
    return this.currentGenre;
  }

  public stop() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
    this.currentGenre = null;
    this.step = 0;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.08);
    }
  }

  public playGenre(genre: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying && this.currentGenre === genre) {
      this.stop();
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.currentGenre = genre;
    this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    // Chords and tempo by genre
    const patterns: Record<string, { tempo: number; notes: number[][] }> = {
      'jazz': {
        tempo: 680,
        // Dm9, G13, Cmaj7, A7alt (MIDI note numbers converted to freq)
        notes: [
          [293.66, 349.23, 440.0, 523.25, 659.25], // D4, F4, A4, C5, E5
          [196.00, 329.63, 392.0, 493.88, 659.25], // G3, E4, G4, B4, E5
          [261.63, 329.63, 392.0, 493.88, 587.33], // C4, E4, G4, B4, D5
          [220.00, 293.66, 349.23, 440.0, 554.37], // A3, D4, F4, A4, C#5
        ]
      },
      'pop-acoustic': {
        tempo: 480,
        // C, G, Am, F arpeggio style
        notes: [
          [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5
          [196.00, 293.66, 392.00, 493.88], // G3, D4, G4, B4
          [220.00, 261.63, 329.63, 440.00], // A3, C4, E4, A4
          [174.61, 261.63, 349.23, 440.00], // F3, C4, F4, A4
        ]
      },
      'sax-house': {
        tempo: 380,
        // Funky House minor vibes: Am, Em, F, G
        notes: [
          [110.00, 220.00, 329.63, 523.25, 659.25],
          [164.81, 246.94, 392.00, 493.88, 587.33],
          [174.61, 261.63, 349.23, 523.25, 698.46],
          [196.00, 293.66, 392.00, 587.33, 783.99],
        ]
      },
      'strings': {
        tempo: 900,
        // Orchestral slow cinematic progression: Dm, Bb, F, C
        notes: [
          [146.83, 220.00, 293.66, 349.23, 440.00],
          [116.54, 233.08, 293.66, 349.23, 466.16],
          [174.61, 261.63, 349.23, 440.00, 523.25],
          [130.81, 261.63, 329.63, 392.00, 523.25],
        ]
      },
      'rock-band': {
        tempo: 420,
        // Punchy Rock riff: E5, G5, A5, C5, D5
        notes: [
          [82.41, 164.81, 246.94, 329.63],
          [98.00, 196.00, 293.66, 392.00],
          [110.00, 220.00, 329.63, 440.00],
          [146.83, 293.66, 440.00, 587.33],
        ]
      }
    };

    const current = patterns[genre] || patterns['jazz'];
    const playChord = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const chord = current.notes[this.step % current.notes.length];
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Waveform characteristics per genre
        if (genre === 'jazz') {
          osc.type = 'triangle';
        } else if (genre === 'sax-house') {
          osc.type = idx === 0 ? 'sawtooth' : 'sine';
        } else if (genre === 'strings') {
          osc.type = 'sine';
        } else if (genre === 'rock-band') {
          osc.type = idx === 0 ? 'square' : 'sawtooth';
        } else {
          osc.type = 'sine';
        }

        // Slight micro-detune for richness
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

        const attackTime = genre === 'strings' ? 0.35 : 0.04;
        const decayTime = (current.tempo / 1000) * 0.9;
        const maxGain = (0.28 / chord.length) * (idx === 0 ? 1.4 : 1.0);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(maxGain, now + attackTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attackTime + decayTime);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + attackTime + decayTime + 0.1);
      });

      this.step++;
    };

    playChord();
    this.intervalId = window.setInterval(playChord, current.tempo);
  }
}

export const audioEngine = new AudioEngine();
