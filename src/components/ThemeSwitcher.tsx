import React, { useState, useEffect } from 'react';
import { Palette, Check, ChevronUp, X, Sun, Moon } from 'lucide-react';
import { THEMES, applyThemeToDOM, type Theme, type ColorMode } from '../utils/themes';

interface ThemeSwitcherProps {
  currentThemeId: string;
  colorMode: ColorMode;
  onSelectTheme: (theme: Theme) => void;
  onToggleColorMode: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentThemeId,
  colorMode,
  onSelectTheme,
  onToggleColorMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-apply on theme or mode change
  useEffect(() => {
    const current = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];
    applyThemeToDOM(current, colorMode);
  }, [currentThemeId, colorMode]);

  const handleSelect = (theme: Theme) => {
    applyThemeToDOM(theme, colorMode);
    onSelectTheme(theme);
  };

  const currentTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Expanded Menu Panel */}
      {isOpen ? (
        <div
          className="w-80 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl animate-fade-in"
          style={{
            backgroundColor: colorMode === 'dark' ? 'rgba(15, 17, 26, 0.96)' : 'rgba(255, 255, 255, 0.97)',
            borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
            color: colorMode === 'dark' ? '#f8fafc' : '#0f172a',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between pb-3 border-b"
            style={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 theme-accent-text" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Aparência & Temas
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Light / Dark Mode Toggle Segment */}
          <div className="my-3">
            <label className="block text-[10px] uppercase font-bold tracking-wider mb-1.5 opacity-70">
              Modo de Visualização
            </label>
            <div
              className="grid grid-cols-2 p-1 rounded-xl border text-xs font-semibold gap-1"
              style={{
                backgroundColor: colorMode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.04)',
                borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (colorMode !== 'dark') onToggleColorMode();
                }}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                  colorMode === 'dark'
                    ? 'bg-white/15 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Escuro</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (colorMode !== 'light') onToggleColorMode();
                }}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                  colorMode === 'light'
                    ? 'bg-amber-500/20 text-amber-900 border border-amber-500/30 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Claro</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] opacity-75 my-2.5 leading-relaxed">
            Selecione uma paleta musical para personalizar as cores de destaque:
          </p>

          {/* Theme List */}
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {THEMES.map((theme) => {
              const isSelected = theme.id === currentThemeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelect(theme)}
                  className={`w-full p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? colorMode === 'dark'
                        ? 'bg-white/10 border-white/30 text-white shadow-sm'
                        : 'bg-amber-500/10 border-amber-500/30 text-slate-900 shadow-sm'
                      : colorMode === 'dark'
                      ? 'bg-black/30 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/15'
                      : 'bg-black/[0.02] border-black/5 text-slate-700 hover:bg-black/[0.05] hover:border-black/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Color Swatch Circle */}
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white/20"
                      style={{
                        background: `linear-gradient(135deg, ${theme.previewColor}, ${theme.previewSecondary})`,
                      }}
                    />
                    <div>
                      <p className="text-xs font-bold leading-tight">{theme.name}</p>
                      <p className="text-[10px] opacity-70 line-clamp-1">{theme.tagline}</p>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 theme-accent-text shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Active theme reminder */}
          <div
            className="mt-3 pt-2 border-t flex items-center justify-between text-[11px] opacity-75"
            style={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
          >
            <span>Tema: <strong>{currentTheme.name}</strong></span>
            <span>Modo: <strong>{colorMode === 'dark' ? 'Escuro' : 'Claro'}</strong></span>
          </div>
        </div>
      ) : (
        /* Floating Button Trigger */
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 rounded-full border text-xs font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          style={{
            backgroundColor: colorMode === 'dark' ? 'rgba(18, 20, 34, 0.92)' : 'rgba(255, 255, 255, 0.94)',
            borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
            color: colorMode === 'dark' ? '#ffffff' : '#0f172a',
          }}
          title="Clique para testar modo claro/escuro e temas visuais"
        >
          <div
            className="w-3.5 h-3.5 rounded-full border border-white/30"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.previewColor}, ${currentTheme.previewSecondary})`,
            }}
          />
          <span className="flex items-center gap-1.5">
            {colorMode === 'dark' ? (
              <Moon className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>
              Tema: <strong>{currentTheme.name}</strong> ({colorMode === 'dark' ? 'Escuro' : 'Claro'})
            </span>
          </span>
          <ChevronUp className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
        </button>
      )}
    </div>
  );
};
