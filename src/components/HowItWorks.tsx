import React, { useState } from 'react';
import { Search, MessageSquare, ShieldCheck, HeartHandshake, UserPlus, FileCheck, DollarSign, Award, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
  onOpenMusicianRegister: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking, onOpenMusicianRegister }) => {
  const [activeTab, setActiveTab] = useState<'client' | 'musician'>('client');

  const clientSteps = [
    {
      icon: Search,
      title: '1. Encontre e Ouça',
      desc: 'Filtre por estilo e cidade. Ouça o repertório em áudio e veja fotos de apresentações reais.',
    },
    {
      icon: MessageSquare,
      title: '2. Combine no Chat',
      desc: 'Converse diretamente com o músico. Alinhe músicas especiais, horários e sonorização.',
    },
    {
      icon: ShieldCheck,
      title: '3. Contratação Segura',
      desc: 'Pague parcelado ou via Pix. O cachê fica retido com segurança na plataforma até a conclusão do evento.',
    },
    {
      icon: HeartHandshake,
      title: '4. Curta seu Momento',
      desc: 'Aproveite seu show inesquecível. Após o evento, libere o pagamento e confirme a conclusão.',
    },
  ];

  const musicianSteps = [
    {
      icon: UserPlus,
      title: '1. Crie seu Perfil',
      desc: 'Cadastre suas fotos, instrumentos, repertório e receba um link personalizado.',
    },
    {
      icon: FileCheck,
      title: '2. Receba Propostas',
      desc: 'Clientes interessados enviam data, local e orçamento diretamente pelo chat.',
    },
    {
      icon: DollarSign,
      title: '3. Pagamento Garantido',
      desc: 'O valor do show é garantido antes de você subir no palco, sem risco de calote.',
    },
    {
      icon: Award,
      title: '4. Construa sua Reputação',
      desc: 'Construa seu histórico com contratos formais e receba convites para eventos cada vez maiores.',
    },
  ];

  const currentSteps = activeTab === 'client' ? clientSteps : musicianSteps;

  return (
    <section id="como-funciona" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight theme-text-main">
          Como funciona o FAM
        </h2>
        <p className="mt-2 text-sm sm:text-base theme-text-muted">
          Tudo simples, transparente e seguro para contratantes e artistas.
        </p>

        {/* Tab switch */}
        <div
          className="mt-6 inline-flex p-1 rounded-xl border"
          style={{
            backgroundColor: 'var(--color-theme-card-subtle)',
            borderColor: 'var(--color-theme-border-subtle)',
          }}
        >
          <button
            onClick={() => setActiveTab('client')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'client'
                ? 'theme-primary-btn shadow-md'
                : 'theme-text-muted hover:theme-text-main'
            }`}
          >
            Para Quem Contrata
          </button>
          <button
            onClick={() => setActiveTab('musician')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'musician'
                ? 'theme-primary-btn shadow-md'
                : 'theme-text-muted hover:theme-text-main'
            }`}
          >
            Para Quem Toca
          </button>
        </div>
      </div>

      {/* 4 Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--color-theme-surface)',
                borderColor: 'var(--color-theme-surface-border)',
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl border theme-accent-text flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--color-theme-badge-bg)',
                    borderColor: 'var(--color-theme-badge-border)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold theme-text-main mb-1.5">{step.title}</h3>
                <p className="text-xs theme-text-muted leading-relaxed">{step.desc}</p>
              </div>
              <div
                className="mt-4 pt-3 border-t text-[10px] theme-text-muted font-medium opacity-70"
                style={{ borderColor: 'var(--color-theme-border-subtle)' }}
              >
                Etapa {idx + 1} de 4
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        {activeTab === 'client' ? (
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl theme-primary-btn font-semibold text-xs shadow-lg cursor-pointer transition-all"
          >
            Encontrar Músicos
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onOpenMusicianRegister}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl theme-primary-btn font-semibold text-xs shadow-lg cursor-pointer transition-all"
          >
            Cadastrar Meu Perfil
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
