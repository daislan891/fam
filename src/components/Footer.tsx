import React, { useState } from 'react';
import { ArrowRight, Globe, Radio, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer
      className="relative border-t pt-16 pb-12 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-theme-card-subtle)',
        borderColor: 'var(--color-theme-border-subtle)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b"
          style={{ borderColor: 'var(--color-theme-border-subtle)' }}
        >
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg theme-primary-btn flex items-center justify-center font-black text-sm shadow-md">
                FAM
              </div>
              <span className="text-xl font-bold tracking-tight theme-text-main">FAM — Encontre um Músico</span>
            </div>

            <p className="text-xs theme-text-muted leading-relaxed max-w-sm">
              Conectamos pessoas e estabelecimentos aos melhores talentos musicais com demonstração sonora real e garantia de pagamento protegido em custódia.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg border theme-text-muted hover:theme-text-main flex items-center justify-center transition-all"
                style={{
                  backgroundColor: 'var(--color-theme-surface)',
                  borderColor: 'var(--color-theme-border-subtle)',
                }}
                title="Compartilhar"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="#ouvir-previas"
                className="w-8 h-8 rounded-lg border theme-text-muted hover:theme-text-main flex items-center justify-center transition-all"
                style={{
                  backgroundColor: 'var(--color-theme-surface)',
                  borderColor: 'var(--color-theme-border-subtle)',
                }}
                title="Demonstração Sonora"
              >
                <Radio className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg border theme-text-muted hover:theme-text-main flex items-center justify-center transition-all"
                style={{
                  backgroundColor: 'var(--color-theme-surface)',
                  borderColor: 'var(--color-theme-border-subtle)',
                }}
                title="Website Oficial"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 1: Para Contratantes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider theme-text-main">Contratar</h4>
            <ul className="space-y-2 text-xs theme-text-muted">
              <li><a href="#artistas" className="hover:theme-text-main transition-colors">Buscar Músicos</a></li>
              <li><a href="#simulador" className="hover:theme-text-main transition-colors">Simulador de Cachê</a></li>
              <li><a href="#ouvir-previas" className="hover:theme-text-main transition-colors">Ouvir Prévias</a></li>
              <li><a href="#como-funciona" className="hover:theme-text-main transition-colors">Como Funciona</a></li>
            </ul>
          </div>

          {/* Col 2: Para Músicos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider theme-text-main">Músicos</h4>
            <ul className="space-y-2 text-xs theme-text-muted">
              <li><a href="#como-funciona" className="hover:theme-text-main transition-colors">Cadastrar Perfil</a></li>
              <li><a href="#seguranca" className="hover:theme-text-main transition-colors">Cachê em Custódia</a></li>
              <li><a href="#lancamento" className="hover:theme-text-main transition-colors">Taxa Zero no Lançamento</a></li>
              <li><a href="#seguranca" className="hover:theme-text-main transition-colors">Garantia & Suporte</a></li>
            </ul>
          </div>

          {/* Col 3: Newsletter de Lançamento */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider theme-text-main">Novidades</h4>
            <p className="text-xs theme-text-muted">
              Receba avisos de novos artistas e oportunidades de eventos na sua cidade.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full px-3 py-2 rounded-lg border theme-text-main text-xs outline-none pr-8 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-theme-surface)',
                    borderColor: 'var(--color-theme-border-subtle)',
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 rounded theme-primary-btn cursor-pointer"
                  aria-label="Inscrever-se"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-500 font-semibold">
                  ✓ Inscrição confirmada na lista VIP!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-text-muted">
          <p>© 2026 FAM — Encontre um Músico. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:theme-text-main transition-colors">Termos de Uso</a>
            <a href="#" className="hover:theme-text-main transition-colors">Privacidade</a>
            <a href="#" className="hover:theme-text-main transition-colors">Ajuda</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
