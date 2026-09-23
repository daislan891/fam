import React from 'react';
import { ShieldCheck, Lock, RefreshCw, UserCheck } from 'lucide-react';

export const EscrowTrust: React.FC = () => {
  return (
    <section id="seguranca" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div
        className="rounded-3xl border p-8 sm:p-12 backdrop-blur-xl shadow-xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-theme-surface)',
          borderColor: 'var(--color-theme-surface-border)',
        }}
      >
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 transition-colors"
            style={{
              backgroundColor: 'var(--color-theme-badge-bg)',
              borderColor: 'var(--color-theme-badge-border)',
              color: 'var(--color-theme-badge-text)',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Segurança e Garantia no Lançamento</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight theme-text-main">
            Seu evento sem imprevistos. <br />
            <span style={{ color: 'var(--color-theme-accent)' }}>
              Pagamento 100% protegido em custódia.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed theme-text-muted">
            Eliminamos a incerteza de contratações informais. No FAM, tanto contratantes quanto músicos contam com proteção de pagamento garantido, contrato digital e mediação dedicada.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-5 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
            }}
          >
            <Lock className="w-7 h-7 mb-3 transition-colors" style={{ color: 'var(--color-theme-accent)' }} />
            <h3 className="text-sm font-bold mb-1 theme-text-main">Cachê em Custódia</h3>
            <p className="text-xs leading-relaxed theme-text-muted">
              O pagamento fica retido com segurança na plataforma e só é liberado para o músico após o show ser realizado com sucesso.
            </p>
          </div>

          <div
            className="p-5 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
            }}
          >
            <RefreshCw className="w-7 h-7 mb-3 transition-colors" style={{ color: 'var(--color-theme-accent)' }} />
            <h3 className="text-sm font-bold mb-1 theme-text-main">Garantia de Substituição</h3>
            <p className="text-xs leading-relaxed theme-text-muted">
              Em caso de imprevisto ou força maior com o artista, auxiliamos na substituição por outro músico equivalente ou realizamos estorno integral.
            </p>
          </div>

          <div
            className="p-5 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
            }}
          >
            <UserCheck className="w-7 h-7 mb-3 transition-colors" style={{ color: 'var(--color-theme-accent)' }} />
            <h3 className="text-sm font-bold mb-1 theme-text-main">Curadoria de Artistas</h3>
            <p className="text-xs leading-relaxed theme-text-muted">
              Identidade, repertório em áudio e conformidade técnica verificados individualmente por nossa equipe antes da ativação do perfil na plataforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
