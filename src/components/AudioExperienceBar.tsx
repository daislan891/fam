import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { GENRE_PREVIEWS } from '../data/genres';
import { audioEngine } from '../utils/audioSynth';

interface AudioExperienceBarProps {
  activeGenre: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band';
  onGenreSelect: (genre: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band') => void;
}

export const AudioExperienceBar: React.FC<AudioExperienceBarProps> = ({
  activeGenre,
  onGenreSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const currentTrack = GENRE_PREVIEWS.find((g) => g.id === activeGenre) || GENRE_PREVIEWS[0];

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      audioEngine.playGenre(activeGenre);
      setIsPlaying(true);
    }
  };

  const handleSelectGenre = (genreId: string) => {
    const validGenre = genreId as 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band';
    onGenreSelect(validGenre);
    audioEngine.playGenre(validGenre);
    setIsPlaying(true);
  };

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const analyser = audioEngine.getAnalyser();
      const bufferLength = analyser ? analyser.frequencyBinCount : 64;
      const dataArray = new Uint8Array(bufferLength);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      const barCount = 44;
      const barWidth = (width / barCount) * 0.55;
      const spacing = (width / barCount) * 0.45;

      const isDark = document.documentElement.classList.contains('dark');
      const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--color-theme-accent').trim() || '#d97706';
      const idleColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.25)';

      for (let i = 0; i < barCount; i++) {
        let value = 0;
        if (isPlaying && analyser) {
          const dataIdx = Math.floor((i / barCount) * bufferLength * 0.65);
          value = (dataArray[dataIdx] / 255) * height * 0.85;
        } else {
          value = (Math.sin(phase + i * 0.3) * 0.5 + 0.5) * 6 + 3;
        }

        const x = i * (barWidth + spacing) + 4;
        const barHeight = Math.max(3, value);
        const y = height / 2 - barHeight / 2;

        ctx.fillStyle = isPlaying ? themeAccent : idleColor;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2.5);
        ctx.fill();
      }

      phase += 0.04;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <section id="ouvir-previas" className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div
        className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all"
        style={{
          backgroundColor: 'var(--color-theme-surface)',
          borderColor: 'var(--color-theme-surface-border)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Track Info & Play Controller */}
          <div className="flex items-center gap-4 w-full lg:w-5/12">
            <button
              onClick={handleTogglePlay}
              className="w-13 h-13 rounded-2xl theme-primary-btn flex items-center justify-center shadow-lg transition-all cursor-pointer shrink-0"
              aria-label={isPlaying ? 'Pausar prévia' : 'Tocar prévia musical'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-[11px] font-semibold uppercase tracking-wider theme-accent-text">
                  {isPlaying ? 'Tocando Prévia' : 'Demonstração Sonora'}
                </span>
              </div>
              <h3
                className="text-sm sm:text-base font-bold truncate mt-0.5"
                style={{ color: 'var(--color-theme-text-main)' }}
              >
                {currentTrack.label}
              </h3>
              <p
                className="text-xs truncate"
                style={{ color: 'var(--color-theme-text-muted)' }}
              >
                {currentTrack.sampleTrack}
              </p>
            </div>
            <div
              className="hidden sm:flex items-center gap-1 text-[11px] shrink-0"
              style={{ color: 'var(--color-theme-text-muted)' }}
            >
              <Volume2 className="w-3.5 h-3.5 opacity-70" />
              <span>Ao Vivo</span>
            </div>
          </div>

          {/* Soundwave canvas */}
          <div
            className="w-full lg:w-4/12 h-14 rounded-xl border p-2 overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
            }}
          >
            <canvas ref={canvasRef} width={400} height={50} className="w-full h-full object-contain" />
          </div>

          {/* Genre Quick Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
            {GENRE_PREVIEWS.map((genre) => {
              const isActive = activeGenre === genre.id;
              return (
                <button
                  key={genre.id}
                  onClick={() => handleSelectGenre(genre.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border shadow-sm"
                  style={{
                    backgroundColor: isActive ? 'var(--color-theme-primary)' : 'var(--color-theme-card-subtle)',
                    borderColor: isActive ? 'transparent' : 'var(--color-theme-border-subtle)',
                    color: isActive ? 'var(--color-theme-primary-text)' : 'var(--color-theme-text-main)',
                  }}
                >
                  {genre.label.split('&')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
