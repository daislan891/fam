import React, { useState } from 'react';
import { Calculator, Users, Music2, Check, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Musician } from '../types';
import { FEATURED_MUSICIANS } from '../data/musicians';

interface EventSimulatorProps {
  onOpenBookingWithDetails: (details: {
    eventType: string;
    guests: number;
    format: string;
    estimatedCache: number;
    recommendedMusician?: Musician;
  }) => void;
}

export const EventSimulator: React.FC<EventSimulatorProps> = ({ onOpenBookingWithDetails }) => {
  const [eventType, setEventType] = useState<'wedding' | 'corporate' | 'bar' | 'birthday'>('wedding');
  const [guestCount, setGuestCount] = useState<number>(120);
  const [format, setFormat] = useState<'solo' | 'duo' | 'quartet' | 'band'>('duo');
  const [includeSoundEquip, setIncludeSoundEquip] = useState<boolean>(true);

  // Price matrix calculation
  const calculateEstimate = () => {
    let base = 800;
    if (format === 'solo') base = 950;
    if (format === 'duo') base = 1600;
    if (format === 'quartet') base = 3200;
    if (format === 'band') base = 5800;

    let multiplier = 1.0;
    if (eventType === 'wedding') multiplier = 1.25;
    if (eventType === 'corporate') multiplier = 1.15;
    if (eventType === 'bar') multiplier = 0.85;

    let guestBump = 0;
    if (guestCount > 200) guestBump = 500;
    if (guestCount > 350) guestBump = 1000;

    const soundFee = includeSoundEquip ? 350 : 0;
    const total = Math.round((base * multiplier + guestBump + soundFee) / 50) * 50;

    return { total };
  };

  const { total } = calculateEstimate();

  const getMatchedMusician = () => {
    if (format === 'solo') return FEATURED_MUSICIANS[0];
    if (format === 'duo') return FEATURED_MUSICIANS[1];
    if (format === 'quartet') return FEATURED_MUSICIANS[2];
    return FEATURED_MUSICIANS[4];
  };

  const matchedArtist = getMatchedMusician();

  const handleSimulateFinish = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#10b981'],
      });
    } catch {
      // fallback
    }

    onOpenBookingWithDetails({
      eventType:
        eventType === 'wedding'
          ? 'Casamento'
          : eventType === 'corporate'
          ? 'Corporativo'
          : eventType === 'bar'
          ? 'Bar / Restaurante'
          : 'Aniversário',
      guests: guestCount,
      format:
        format === 'solo'
          ? 'Instrumentista Solo'
          : format === 'duo'
          ? 'Duo Acústico'
          : format === 'quartet'
          ? 'Quarteto Sofisticado'
          : 'Banda Completa',
      estimatedCache: total,
      recommendedMusician: matchedArtist,
    });
  };

  return (
    <section id="simulador" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div
        className="rounded-3xl border p-6 sm:p-10 backdrop-blur-xl shadow-2xl"
        style={{
          backgroundColor: 'var(--color-theme-surface)',
          borderColor: 'var(--color-theme-surface-border)',
        }}
      >
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-badge border text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Orçamento</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight theme-text-main">
            Descubra o formato e o cachê ideal para seu evento
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Calcule em segundos uma estimativa realista conforme o estilo e o porte da sua comemoração.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulator Form Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Ocasião */}
            <div>
              <label className="block text-xs font-semibold theme-text-muted mb-2">
                1. Tipo de Ocasião
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'wedding', label: 'Casamento', emoji: '💍' },
                  { id: 'corporate', label: 'Corporativo', emoji: '💼' },
                  { id: 'bar', label: 'Bar & Bistrô', emoji: '🍸' },
                  { id: 'birthday', label: 'Aniversário', emoji: '🎉' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEventType(item.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      eventType === item.id
                        ? 'theme-badge border shadow-md'
                        : 'border theme-text-muted hover:theme-text-main'
                    }`}
                    style={{
                      backgroundColor: eventType === item.id ? 'var(--color-theme-badge-bg)' : 'var(--color-theme-card-subtle)',
                      borderColor: eventType === item.id ? 'var(--color-theme-badge-border)' : 'var(--color-theme-border-subtle)',
                    }}
                  >
                    <span className="text-base block mb-0.5">{item.emoji}</span>
                    <span className="text-xs font-semibold block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Convidados */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold theme-text-muted flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 theme-accent-text" />
                  2. Quantidade de Convidados
                </label>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded border theme-text-main"
                  style={{
                    backgroundColor: 'var(--color-theme-card-subtle)',
                    borderColor: 'var(--color-theme-border-subtle)',
                  }}
                >
                  {guestCount} pessoas
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-300 dark:bg-slate-800"
                style={{ accentColor: 'var(--color-theme-primary)' }}
              />
              <div className="flex justify-between text-[10px] theme-text-muted mt-1">
                <span>Até 50 (intimista)</span>
                <span>250 convidados</span>
                <span>500+ convidados</span>
              </div>
            </div>

            {/* 3. Formação Musical */}
            <div>
              <label className="block text-xs font-semibold theme-text-muted mb-2 flex items-center gap-1.5">
                <Music2 className="w-3.5 h-3.5 theme-accent-text" />
                3. Formato Musical
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'solo',
                    title: 'Solo (Violino ou Sax)',
                    desc: 'Cerimônias, entradas e recepções intimistas.',
                  },
                  {
                    id: 'duo',
                    title: 'Duo Voz & Violão',
                    desc: 'Pop acústico, MPB e sucessos leves para bistrôs e festas.',
                  },
                  {
                    id: 'quartet',
                    title: 'Quarteto Elegante',
                    desc: 'Jazz ou cordas para eventos corporativos e jantares refinados.',
                  },
                  {
                    id: 'band',
                    title: 'Banda Completa',
                    desc: 'Show ao vivo de 5 a 7 integrantes para agitar a pista de dança.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormat(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      format === item.id
                        ? 'theme-badge border shadow-md'
                        : 'border theme-text-muted hover:theme-text-main'
                    }`}
                    style={{
                      backgroundColor: format === item.id ? 'var(--color-theme-badge-bg)' : 'var(--color-theme-card-subtle)',
                      borderColor: format === item.id ? 'var(--color-theme-badge-border)' : 'var(--color-theme-border-subtle)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold theme-text-main">{item.title}</span>
                      {format === item.id && <Check className="w-3.5 h-3.5 theme-accent-text" />}
                    </div>
                    <p className="text-[11px] theme-text-muted leading-snug">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Sonorização */}
            <div
              className="p-3 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: 'var(--color-theme-card-subtle)',
                borderColor: 'var(--color-theme-border-subtle)',
              }}
            >
              <div>
                <p className="text-xs font-semibold theme-text-main">Músico leva som e microfones próprios?</p>
                <p className="text-[11px] theme-text-muted">Caixas de som ativas adequadas para a capacidade do espaço.</p>
              </div>
              <button
                type="button"
                onClick={() => setIncludeSoundEquip(!includeSoundEquip)}
                className="w-11 h-6 rounded-full transition-colors relative cursor-pointer"
                style={{
                  backgroundColor: includeSoundEquip ? 'var(--color-theme-primary)' : 'rgba(150,150,150,0.3)',
                }}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    includeSoundEquip ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Summary */}
          <div
            className="lg:col-span-5 rounded-2xl p-6 border flex flex-col justify-between shadow-lg"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
            }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold theme-text-muted">
                Estimativa Média de Cachê
              </p>

              <div className="my-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black theme-text-main font-['Outfit']">
                    R$ {total.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs theme-text-muted">/ apresentação</span>
                </div>
                <p className="text-xs theme-text-muted mt-1">
                  Valores médios de mercado para show de 2h a 3h com repertório personalizado.
                </p>
              </div>

              {/* Matched Musician */}
              <div
                className="mt-5 p-3 rounded-xl border flex items-center gap-3"
                style={{
                  backgroundColor: 'var(--color-theme-surface)',
                  borderColor: 'var(--color-theme-surface-border)',
                }}
              >
                <img
                  src={matchedArtist.avatar}
                  alt={matchedArtist.name}
                  className="w-11 h-11 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold theme-text-main truncate">{matchedArtist.stageName}</p>
                    <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                  </div>
                  <p className="text-[11px] theme-text-muted truncate">{matchedArtist.role}</p>
                  <p className="text-[10px] theme-accent-text font-semibold flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Curadoria FAM • Audição Aprovada</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-[11px] theme-text-muted space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Pagamento seguro em custódia liberado pós-show</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Negociação direta com o artista pelo chat</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Sem cobranças ou taxas ocultas de intermediação</span>
                </p>
              </div>
            </div>

            <div
              className="mt-6 pt-4 border-t"
              style={{ borderColor: 'var(--color-theme-border-subtle)' }}
            >
              <button
                type="button"
                onClick={handleSimulateFinish}
                className="w-full py-3 rounded-xl theme-primary-btn font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                Solicitar Proposta para este Formato
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
