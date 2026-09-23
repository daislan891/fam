import React from 'react';
import { Gift, Compass, ShieldCheck, FileCheck, ArrowRight, Sparkles } from 'lucide-react';

interface LaunchBenefitsProps {
  onOpenBooking?: () => void;
}

export const Testimonials: React.FC<LaunchBenefitsProps> = ({ onOpenBooking }) => {
  const benefits = [
    {
      icon: Gift,
      badge: 'Exclusivo no Lançamento',
      title: 'Taxa Zero no Seu Primeiro Show',
      desc: 'Para incentivar os primeiros eventos da plataforma, não cobramos taxa de serviço de intermediação. 100% do cachê é direcionado ao talento musical.',
    },
    {
      icon: Compass,
      badge: 'Atendimento VIP',
      title: 'Curadoria & Concierge Dedicado',
      desc: 'Nossa equipe de especialistas musicais auxilia na escolha do estilo ideal para a acústica, o perfil dos convidados e o cronograma do seu evento.',
    },
    {
      icon: ShieldCheck,
      badge: 'Garantia Total',
      title: 'Custódia Segura com Reembolso Integral',
      desc: 'O valor do show permanece bloqueado com segurança e só é liberado após a apresentação acontecer com sucesso. Sem riscos para contratante ou artista.',
    },
    {
      icon: FileCheck,
      badge: 'Segurança Jurídica',
      title: 'Contrato Digital Automático',
      desc: 'Nada de acordos verbais informais. Geramos um termo formal digital especificando horários, tempo de show, repertório e equipamentos inclusos.',
    },
  ];

  return (
    <section id="lancamento" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-badge border text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Programa de Lançamento Oficial</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight theme-text-main">
          Por que contratar seu evento no lançamento do FAM?
        </h2>
        <p className="mt-3 text-sm sm:text-base theme-text-muted">
          Estamos iniciando com um compromisso inegociável de transparência, excelência artística e proteção financeira total.
        </p>
      </div>

      {/* Grid of Launch Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-sm"
              style={{
                backgroundColor: 'var(--color-theme-surface)',
                borderColor: 'var(--color-theme-surface-border)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl border theme-accent-text flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-theme-badge-bg)',
                      borderColor: 'var(--color-theme-badge-border)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: 'var(--color-theme-card-subtle)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-accent)',
                    }}
                  >
                    {b.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold theme-text-main mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div
                className="mt-6 pt-4 border-t flex items-center gap-2 text-[11px] theme-accent-text font-semibold"
                style={{ borderColor: 'var(--color-theme-border-subtle)' }}
              >
                <span>Garantia de Qualidade FAM</span>
                <span>•</span>
                <span>Edição de Abertura</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIP Launch Banner */}
      <div
        className="mt-10 rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        style={{
          backgroundColor: 'var(--color-theme-card-subtle)',
          borderColor: 'var(--color-theme-surface-border)',
        }}
      >
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-bold theme-text-main">
            Tem uma data especial nos próximos meses?
          </h4>
          <p className="text-xs sm:text-sm theme-text-muted">
            Cadastre sua solicitação agora para receber consultoria prioritária de repertório e garantir taxa zero no evento.
          </p>
        </div>

        {onOpenBooking && (
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl theme-primary-btn font-bold text-xs flex items-center gap-2 shrink-0 cursor-pointer shadow-lg transition-all"
          >
            Garantir Vaga de Lançamento
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
