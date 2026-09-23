import React, { useState } from 'react';
import { MapPin, CheckCircle2, MessageCircle, Heart, Share2, Volume2, Music, Sparkles } from 'lucide-react';
import type { Musician } from '../types';
import { FEATURED_MUSICIANS } from '../data/musicians';

interface MusicianSpotlightProps {
  searchQuery: { genre: string; eventType: string; city: string };
  onSelectMusicianForBooking: (musician: Musician) => void;
  onPlaySample: (genreKey: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band') => void;
}

export const MusicianSpotlight: React.FC<MusicianSpotlightProps> = ({
  searchQuery,
  onSelectMusicianForBooking,
  onPlaySample,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/@${slug}`;
    navigator.clipboard?.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Filter logic
  const filteredMusicians = FEATURED_MUSICIANS.filter((m) => {
    if (activeTab === 'wedding' && !m.eventTypes.includes('Casamento')) return false;
    if (activeTab === 'acoustic' && !m.genres.some((g) => g.includes('Acústico') || g.includes('MPB'))) return false;
    if (activeTab === 'jazz' && !m.genres.some((g) => g.includes('Jazz') || g.includes('Bossa'))) return false;
    if (activeTab === 'party' && !m.genres.some((g) => g.includes('Sax') || g.includes('Rock') || g.includes('Pop Rock'))) return false;

    if (searchQuery.genre && !m.genres.some((g) => g.toLowerCase().includes(searchQuery.genre.toLowerCase()))) {
      return false;
    }
    if (searchQuery.eventType && !m.eventTypes.some((e) => e.toLowerCase().includes(searchQuery.eventType.toLowerCase()))) {
      return false;
    }
    if (searchQuery.city && !m.city.toLowerCase().includes(searchQuery.city.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <section id="artistas" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight theme-text-main">
          Músicos em Destaque
        </h2>
        <p className="mt-3 text-sm sm:text-base theme-text-muted">
          Profissionais selecionados por curadoria técnica de repertório, prontos para atender seu evento com excelência.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'Todos os Músicos' },
          { id: 'wedding', label: 'Casamento & Cerimônia' },
          { id: 'acoustic', label: 'Voz & Violão Acústico' },
          { id: 'jazz', label: 'Jazz & Bossa Nova' },
          { id: 'party', label: 'Festas & Bandas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'theme-primary-btn shadow-md'
                : 'border theme-text-muted hover:theme-text-main'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? 'var(--color-theme-primary)' : 'var(--color-theme-card-subtle)',
              borderColor: activeTab === tab.id ? 'transparent' : 'var(--color-theme-border-subtle)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Musicians Grid */}
      {filteredMusicians.length === 0 ? (
        <div
          className="p-12 text-center rounded-2xl border max-w-md mx-auto"
          style={{
            backgroundColor: 'var(--color-theme-card-subtle)',
            borderColor: 'var(--color-theme-border-subtle)',
          }}
        >
          <Music className="w-10 h-10 theme-text-muted mx-auto mb-3" />
          <h3 className="text-base font-bold theme-text-main">Nenhum músico encontrado com esses filtros</h3>
          <p className="text-xs theme-text-muted mt-1">Tente selecionar outra categoria para ver mais opções.</p>
          <button
            onClick={() => setActiveTab('all')}
            className="mt-4 px-4 py-1.5 text-xs font-semibold rounded-lg theme-primary-btn cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusicians.map((musician) => {
            const isFav = favorites.includes(musician.id);
            return (
              <div
                key={musician.id}
                className="group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
                style={{
                  backgroundColor: 'var(--color-theme-surface)',
                  borderColor: 'var(--color-theme-surface-border)',
                }}
              >
                {/* Photo & Actions */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={musician.avatar}
                    alt={musician.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Highlight pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {musician.highlightTag}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleShare(musician.slug, e)}
                      aria-label="Compartilhar perfil"
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(musician.id)}
                      aria-label="Salvar favorito"
                      className={`w-7 h-7 rounded-full backdrop-blur-md transition-all flex items-center justify-center cursor-pointer ${
                        isFav
                          ? 'bg-rose-600 text-white'
                          : 'bg-black/60 hover:bg-black/80 text-slate-300 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Share Notification */}
                  {copiedSlug === musician.slug && (
                    <div className="absolute top-12 right-3 bg-emerald-900/90 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
                      Link copiado!
                    </div>
                  )}

                  {/* Play audio preview */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <button
                      onClick={() => onPlaySample(musician.sampleGenreKey)}
                      className="w-full py-1.5 px-3 rounded-lg bg-black/70 hover:bg-black/90 border border-white/10 backdrop-blur-md text-slate-200 hover:text-white text-xs font-medium flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Volume2 className="w-3.5 h-3.5 theme-accent-text" />
                        <span className="truncate text-[11px]">{musician.sampleTrackTitle}</span>
                      </span>
                      <span className="text-[10px] theme-accent-text shrink-0 font-semibold">Ouvir</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Name, verified badge and curatorship seal */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold theme-text-main transition-colors">
                            {musician.stageName}
                          </h3>
                          {musician.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs theme-text-muted">{musician.role}</p>
                      </div>

                      {/* Launch Curatorship Badge instead of fake rating */}
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full shrink-0 text-[10px] font-semibold theme-badge border">
                        <Sparkles className="w-3 h-3 theme-accent-text" />
                        <span>Curadoria FAM</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-xs theme-text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 opacity-70" />
                        {musician.city}, {musician.state}
                      </span>
                      {musician.hasSoundEquipment && (
                        <span className="text-emerald-500 font-medium text-[10px]">Som incluso</span>
                      )}
                    </div>

                    <p className="mt-3 text-xs theme-text-muted line-clamp-2 leading-relaxed">
                      {musician.bio}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div
                    className="mt-5 pt-3.5 border-t flex items-center justify-between gap-3"
                    style={{ borderColor: 'var(--color-theme-border-subtle)' }}
                  >
                    <div>
                      <p className="text-[10px] theme-text-muted uppercase font-semibold">Cachê médio</p>
                      <p className="text-base font-bold theme-text-main">
                        R$ {musician.basePrice.toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectMusicianForBooking(musician)}
                      className="px-3.5 py-2 rounded-xl theme-primary-btn font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Conversar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
