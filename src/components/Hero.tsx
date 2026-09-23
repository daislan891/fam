import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Calendar, Music, Play, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onSearch: (filters: { genre: string; eventType: string; city: string }) => void;
  onPlayPreview: (genreKey: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onPlayPreview }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      genre: selectedGenre,
      eventType: selectedEventType,
      city: selectedCity,
    });
    const target = document.getElementById('artistas');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-15 dark:opacity-20"
        style={{ backgroundColor: 'var(--color-theme-primary)' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Clean Pill Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-6 backdrop-blur-md shadow-sm"
          style={{
            backgroundColor: 'var(--color-theme-badge-bg)',
            borderColor: 'var(--color-theme-badge-border)',
            color: 'var(--color-theme-badge-text)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lançamento Oficial • A plataforma que conecta eventos aos melhores músicos</span>
        </div>

        {/* Clean, Solid Typography */}
        <h1
          className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.18]"
          style={{ color: 'var(--color-theme-text-main)' }}
        >
          A trilha sonora perfeita para o seu momento especial
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
          style={{ color: 'var(--color-theme-text-muted)' }}
        >
          Encontre violinistas para casamentos, duos acústicos para recepções, jazz para coquetéis ou bandas de baile completas. Ouça prévias ao vivo e contrate com cachê 100% seguro em custódia.
        </p>

        {/* Quick Audio Samples */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span
            className="text-xs font-medium mr-1 flex items-center gap-1.5"
            style={{ color: 'var(--color-theme-text-muted)' }}
          >
            <Play className="w-3 h-3 theme-accent-text" /> Ouvir estilos:
          </span>
          {[
            { key: 'strings', label: 'Violino & Cerimônia' },
            { key: 'pop-acoustic', label: 'Voz & Violão Acústico' },
            { key: 'jazz', label: 'Jazz & Bossa Nova' },
            { key: 'sax-house', label: 'Live Sax Sunset' },
            { key: 'rock-band', label: 'Banda de Baile' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => onPlayPreview(item.key as any)}
              className="text-xs px-3.5 py-1.5 rounded-full border shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95 font-medium"
              style={{
                backgroundColor: 'var(--color-theme-surface)',
                borderColor: 'var(--color-theme-border-subtle)',
                color: 'var(--color-theme-text-main)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Clean Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full border shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2"
            style={{
              backgroundColor: 'var(--color-theme-search-bg)',
              borderColor: 'var(--color-theme-surface-border)',
            }}
          >
            {/* Estilo */}
            <div className="flex-1 w-full sm:w-auto flex items-center gap-2 px-4 py-2 sm:py-1 text-left">
              <Music className="w-4 h-4 theme-accent-text shrink-0" />
              <div className="w-full">
                <label
                  className="block text-[10px] uppercase font-bold"
                  style={{ color: 'var(--color-theme-text-muted)' }}
                >
                  Estilo Musical
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                  style={{ color: 'var(--color-theme-text-main)' }}
                >
                  <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Todos os estilos</option>
                  <option value="Erudito" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Violino & Cerimônia</option>
                  <option value="Pop Acústico" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Voz e Violão / MPB</option>
                  <option value="Jazz Tradicional" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Jazz & Bossa Nova</option>
                  <option value="Sax House" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Live Sax & Sunset</option>
                  <option value="Pop Rock" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Banda de Baile</option>
                </select>
              </div>
            </div>

            <div
              className="hidden sm:block w-[1px] h-8"
              style={{ backgroundColor: 'var(--color-theme-border-subtle)' }}
            />

            {/* Evento */}
            <div className="flex-1 w-full sm:w-auto flex items-center gap-2 px-4 py-2 sm:py-1 text-left">
              <Calendar className="w-4 h-4 theme-accent-text shrink-0" />
              <div className="w-full">
                <label
                  className="block text-[10px] uppercase font-bold"
                  style={{ color: 'var(--color-theme-text-muted)' }}
                >
                  Tipo de Evento
                </label>
                <select
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                  style={{ color: 'var(--color-theme-text-main)' }}
                >
                  <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Qualquer evento</option>
                  <option value="Casamento" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Casamento</option>
                  <option value="Bar e Restaurante" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Bar ou Bistrô</option>
                  <option value="Evento Corporativo" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Corporativo</option>
                  <option value="Aniversário" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Aniversário</option>
                </select>
              </div>
            </div>

            <div
              className="hidden sm:block w-[1px] h-8"
              style={{ backgroundColor: 'var(--color-theme-border-subtle)' }}
            />

            {/* Cidade */}
            <div className="flex-1 w-full sm:w-auto flex items-center gap-2 px-4 py-2 sm:py-1 text-left">
              <MapPin className="w-4 h-4 theme-accent-text shrink-0" />
              <div className="w-full">
                <label
                  className="block text-[10px] uppercase font-bold"
                  style={{ color: 'var(--color-theme-text-muted)' }}
                >
                  Localização
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                  style={{ color: 'var(--color-theme-text-main)' }}
                >
                  <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Brasil inteiro</option>
                  <option value="São Paulo" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">São Paulo / SP</option>
                  <option value="Rio de Janeiro" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Rio de Janeiro / RJ</option>
                  <option value="Curitiba" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Curitiba / PR</option>
                  <option value="Belo Horizonte" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Belo Horizonte / MG</option>
                </select>
              </div>
            </div>

            {/* Search CTA */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl sm:rounded-full theme-primary-btn font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              Buscar
            </button>
          </form>
        </div>

        {/* Launch Trust Pillars */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold"
          style={{ color: 'var(--color-theme-text-muted)' }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 theme-accent-text" />
            <span style={{ color: 'var(--color-theme-text-main)' }}>Cachê 100% Protegido em Custódia</span>
          </div>
          <div
            className="w-1.5 h-1.5 rounded-full hidden sm:block"
            style={{ backgroundColor: 'var(--color-theme-border-subtle)' }}
          />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 theme-accent-text" />
            <span style={{ color: 'var(--color-theme-text-main)' }}>Curadoria Técnica Auditada</span>
          </div>
          <div
            className="w-1.5 h-1.5 rounded-full hidden sm:block"
            style={{ backgroundColor: 'var(--color-theme-border-subtle)' }}
          />
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 theme-accent-text" />
            <span style={{ color: 'var(--color-theme-text-main)' }}>Prévias em Áudio Real</span>
          </div>
          <div
            className="w-1.5 h-1.5 rounded-full hidden sm:block"
            style={{ backgroundColor: 'var(--color-theme-border-subtle)' }}
          />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span style={{ color: 'var(--color-theme-text-main)' }}>Vagas Abertas de Lançamento</span>
          </div>
        </div>
      </div>
    </section>
  );
};
