import React, { useState, useEffect } from 'react';
import { UserCheck, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import type { ColorMode } from '../utils/themes';

interface NavbarProps {
  colorMode: ColorMode;
  onToggleColorMode: () => void;
  onOpenBooking: () => void;
  onOpenMusicianRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  colorMode,
  onToggleColorMode,
  onOpenBooking,
  onOpenMusicianRegister,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'backdrop-blur-xl py-3 shadow-md'
          : 'bg-transparent border-transparent py-4 sm:py-5'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--color-theme-nav-bg)' : 'transparent',
        borderColor: scrolled ? 'var(--color-theme-nav-border)' : 'transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl theme-primary-btn flex items-center justify-center font-extrabold text-sm shadow-md">
            FAM
          </div>
          <div>
            <span
              className="text-lg font-bold tracking-tight leading-none block"
              style={{ color: 'var(--color-theme-text-main)' }}
            >
              FAM
            </span>
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ color: 'var(--color-theme-text-muted)' }}
            >
              Encontre um Músico
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold">
          <a
            href="#ouvir-previas"
            className="transition-colors hover:opacity-100 opacity-80"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Ouvir Prévias
          </a>
          <a
            href="#artistas"
            className="transition-colors hover:opacity-100 opacity-80"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Músicos
          </a>
          <a
            href="#simulador"
            className="transition-colors hover:opacity-100 opacity-80"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Simulador
          </a>
          <a
            href="#como-funciona"
            className="transition-colors hover:opacity-100 opacity-80"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Como Funciona
          </a>
          <a
            href="#lancamento"
            className="transition-colors hover:opacity-100 opacity-80"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Lançamento
          </a>
          <a
            href="#seguranca"
            className="transition-colors hover:opacity-100 opacity-80"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Segurança
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleColorMode}
            className="p-2 rounded-xl border shadow-sm transition-all cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
            title={colorMode === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            aria-label="Alternar modo claro e escuro"
          >
            {colorMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          <button
            onClick={onOpenMusicianRegister}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border shadow-sm transition-all flex items-center gap-1.5 cursor-pointer hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
          >
            <UserCheck className="w-3.5 h-3.5 theme-accent-text" />
            Sou Músico
          </button>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-bold rounded-xl theme-primary-btn transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            Contratar
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile Hamburger & Mode Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onToggleColorMode}
            className="p-1.5 rounded-lg border shadow-sm"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
            aria-label="Alternar modo claro e escuro"
          >
            {colorMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-bold rounded-lg theme-primary-btn"
          >
            Contratar
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border"
            style={{
              backgroundColor: 'var(--color-theme-card-subtle)',
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b px-6 py-5 space-y-3 backdrop-blur-xl shadow-xl"
          style={{
            backgroundColor: 'var(--color-theme-nav-bg)',
            borderColor: 'var(--color-theme-nav-border)',
          }}
        >
          <a
            href="#ouvir-previas"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium py-1.5 border-b text-sm"
            style={{
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
          >
            Ouvir Prévias em Áudio
          </a>
          <a
            href="#artistas"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium py-1.5 border-b text-sm"
            style={{
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
          >
            Explorar Músicos
          </a>
          <a
            href="#simulador"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium py-1.5 border-b text-sm"
            style={{
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
          >
            Simulador de Orçamento
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium py-1.5 border-b text-sm"
            style={{
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
          >
            Como Funciona
          </a>
          <a
            href="#lancamento"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium py-1.5 border-b text-sm"
            style={{
              borderColor: 'var(--color-theme-border-subtle)',
              color: 'var(--color-theme-text-main)',
            }}
          >
            Vantagens de Lançamento
          </a>
          <a
            href="#seguranca"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium py-1.5 text-sm"
            style={{ color: 'var(--color-theme-text-main)' }}
          >
            Segurança de Pagamento
          </a>

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMusicianRegister();
              }}
              className="w-full py-2 text-center text-xs font-semibold rounded-lg border shadow-sm"
              style={{
                backgroundColor: 'var(--color-theme-card-subtle)',
                borderColor: 'var(--color-theme-border-subtle)',
                color: 'var(--color-theme-text-main)',
              }}
            >
              Sou Músico (Cadastre-se)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-xs font-bold rounded-lg theme-primary-btn"
            >
              Contratar Músicos
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
