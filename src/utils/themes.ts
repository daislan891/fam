export type ColorMode = 'dark' | 'light';

export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceHover: string;
  surfaceBorder: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  accent: string;
  textMain: string;
  textMuted: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  searchBg: string;
  cardSubtle: string;
  borderSubtle: string;
  inputBg: string;
  navBg: string;
  navBorder: string;
}

export interface Theme {
  id: string;
  name: string;
  tagline: string;
  previewColor: string;
  previewSecondary: string;
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
}

export const THEMES: Theme[] = [
  {
    id: 'amber-gold',
    name: 'Warm Gold & Brass',
    tagline: 'Elegância clássica com ouro e tons quentes.',
    previewColor: '#f59e0b',
    previewSecondary: '#d97706',
    colors: {
      dark: {
        bg: '#090a10',
        surface: '#111422',
        surfaceHover: '#181b2e',
        surfaceBorder: 'rgba(245, 158, 11, 0.2)',
        primary: '#d97706',
        primaryHover: '#b45309',
        primaryText: '#ffffff',
        accent: '#f59e0b',
        textMain: '#f8fafc',
        textMuted: '#94a3b8',
        badgeBg: 'rgba(245, 158, 11, 0.12)',
        badgeBorder: 'rgba(245, 158, 11, 0.28)',
        badgeText: '#fde68a',
        searchBg: '#111422',
        cardSubtle: 'rgba(255, 255, 255, 0.04)',
        borderSubtle: 'rgba(255, 255, 255, 0.08)',
        inputBg: 'rgba(0, 0, 0, 0.4)',
        navBg: 'rgba(9, 10, 16, 0.94)',
        navBorder: 'rgba(255, 255, 255, 0.08)',
      },
      light: {
        bg: '#f8fafc',
        surface: '#ffffff',
        surfaceHover: '#f8fafc',
        surfaceBorder: 'rgba(217, 119, 6, 0.25)',
        primary: '#d97706',
        primaryHover: '#b45309',
        primaryText: '#ffffff',
        accent: '#b45309',
        textMain: '#0f172a',
        textMuted: '#64748b',
        badgeBg: 'rgba(245, 158, 11, 0.12)',
        badgeBorder: 'rgba(245, 158, 11, 0.3)',
        badgeText: '#92400e',
        searchBg: '#ffffff',
        cardSubtle: '#f1f5f9',
        borderSubtle: '#e2e8f0',
        inputBg: '#ffffff',
        navBg: 'rgba(255, 255, 255, 0.94)',
        navBorder: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  {
    id: 'midnight-emerald',
    name: 'Midnight Jazz & Esmeralda',
    tagline: 'Inspiração nos clubes de jazz clássicos e sofisticação noturna.',
    previewColor: '#10b981',
    previewSecondary: '#059669',
    colors: {
      dark: {
        bg: '#060a08',
        surface: '#0d1612',
        surfaceHover: '#14221c',
        surfaceBorder: 'rgba(16, 185, 129, 0.2)',
        primary: '#059669',
        primaryHover: '#047857',
        primaryText: '#ffffff',
        accent: '#34d399',
        textMain: '#f8fafc',
        textMuted: '#94a3b8',
        badgeBg: 'rgba(16, 185, 129, 0.12)',
        badgeBorder: 'rgba(16, 185, 129, 0.28)',
        badgeText: '#a7f3d0',
        searchBg: '#0d1612',
        cardSubtle: 'rgba(255, 255, 255, 0.04)',
        borderSubtle: 'rgba(255, 255, 255, 0.08)',
        inputBg: 'rgba(0, 0, 0, 0.4)',
        navBg: 'rgba(6, 10, 8, 0.94)',
        navBorder: 'rgba(255, 255, 255, 0.08)',
      },
      light: {
        bg: '#f4fbf7',
        surface: '#ffffff',
        surfaceHover: '#f0fdf4',
        surfaceBorder: 'rgba(5, 150, 105, 0.25)',
        primary: '#059669',
        primaryHover: '#047857',
        primaryText: '#ffffff',
        accent: '#047857',
        textMain: '#06281e',
        textMuted: '#476355',
        badgeBg: 'rgba(16, 185, 129, 0.12)',
        badgeBorder: 'rgba(16, 185, 129, 0.3)',
        badgeText: '#065f46',
        searchBg: '#ffffff',
        cardSubtle: '#f0fdf4',
        borderSubtle: '#dcfce7',
        inputBg: '#ffffff',
        navBg: 'rgba(255, 255, 255, 0.94)',
        navBorder: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  {
    id: 'spotify-clean',
    name: 'Spotify Minimal & Lime',
    tagline: 'Visual moderno, minimalista e foco absoluto na música.',
    previewColor: '#1db954',
    previewSecondary: '#22c55e',
    colors: {
      dark: {
        bg: '#09090b',
        surface: '#121216',
        surfaceHover: '#18181f',
        surfaceBorder: 'rgba(255, 255, 255, 0.1)',
        primary: '#1db954',
        primaryHover: '#169944',
        primaryText: '#000000',
        accent: '#4ade80',
        textMain: '#f8fafc',
        textMuted: '#a1a1aa',
        badgeBg: 'rgba(29, 185, 84, 0.12)',
        badgeBorder: 'rgba(29, 185, 84, 0.28)',
        badgeText: '#86efac',
        searchBg: '#121216',
        cardSubtle: 'rgba(255, 255, 255, 0.04)',
        borderSubtle: 'rgba(255, 255, 255, 0.08)',
        inputBg: 'rgba(0, 0, 0, 0.4)',
        navBg: 'rgba(9, 9, 11, 0.94)',
        navBorder: 'rgba(255, 255, 255, 0.08)',
      },
      light: {
        bg: '#f8fafc',
        surface: '#ffffff',
        surfaceHover: '#f8fafc',
        surfaceBorder: 'rgba(0, 0, 0, 0.1)',
        primary: '#16a34a',
        primaryHover: '#15803d',
        primaryText: '#ffffff',
        accent: '#15803d',
        textMain: '#09090b',
        textMuted: '#64748b',
        badgeBg: 'rgba(22, 163, 74, 0.12)',
        badgeBorder: 'rgba(22, 163, 74, 0.3)',
        badgeText: '#14532d',
        searchBg: '#ffffff',
        cardSubtle: '#f1f5f9',
        borderSubtle: '#e2e8f0',
        inputBg: '#ffffff',
        navBg: 'rgba(255, 255, 255, 0.94)',
        navBorder: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  {
    id: 'royal-indigo',
    name: 'Royal Navy & Índigo',
    tagline: 'Atmosfera de lounge e festivais, transmitindo confiança e tecnologia.',
    previewColor: '#3b82f6',
    previewSecondary: '#6366f1',
    colors: {
      dark: {
        bg: '#060812',
        surface: '#0d1124',
        surfaceHover: '#131936',
        surfaceBorder: 'rgba(99, 102, 241, 0.22)',
        primary: '#4f46e5',
        primaryHover: '#4338ca',
        primaryText: '#ffffff',
        accent: '#60a5fa',
        textMain: '#f8fafc',
        textMuted: '#94a3b8',
        badgeBg: 'rgba(99, 102, 241, 0.12)',
        badgeBorder: 'rgba(99, 102, 241, 0.28)',
        badgeText: '#c7d2fe',
        searchBg: '#0d1124',
        cardSubtle: 'rgba(255, 255, 255, 0.04)',
        borderSubtle: 'rgba(255, 255, 255, 0.08)',
        inputBg: 'rgba(0, 0, 0, 0.4)',
        navBg: 'rgba(6, 8, 18, 0.94)',
        navBorder: 'rgba(255, 255, 255, 0.08)',
      },
      light: {
        bg: '#f6f8fd',
        surface: '#ffffff',
        surfaceHover: '#f8faff',
        surfaceBorder: 'rgba(79, 70, 229, 0.22)',
        primary: '#4f46e5',
        primaryHover: '#4338ca',
        primaryText: '#ffffff',
        accent: '#3730a3',
        textMain: '#0f172a',
        textMuted: '#64748b',
        badgeBg: 'rgba(79, 70, 229, 0.1)',
        badgeBorder: 'rgba(79, 70, 229, 0.28)',
        badgeText: '#312e81',
        searchBg: '#ffffff',
        cardSubtle: '#eef2ff',
        borderSubtle: '#e0e7ff',
        inputBg: '#ffffff',
        navBg: 'rgba(255, 255, 255, 0.94)',
        navBorder: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  {
    id: 'stage-violet',
    name: 'Electric Stage (Violeta Sóbrio)',
    tagline: 'Versão refinada do roxo de palco, limpa e moderna.',
    previewColor: '#8b5cf6',
    previewSecondary: '#7c3aed',
    colors: {
      dark: {
        bg: '#070611',
        surface: '#100e26',
        surfaceHover: '#181538',
        surfaceBorder: 'rgba(139, 92, 246, 0.22)',
        primary: '#7c3aed',
        primaryHover: '#6d28d9',
        primaryText: '#ffffff',
        accent: '#c084fc',
        textMain: '#f8fafc',
        textMuted: '#94a3b8',
        badgeBg: 'rgba(139, 92, 246, 0.12)',
        badgeBorder: 'rgba(139, 92, 246, 0.28)',
        badgeText: '#ddd6fe',
        searchBg: '#100e26',
        cardSubtle: 'rgba(255, 255, 255, 0.04)',
        borderSubtle: 'rgba(255, 255, 255, 0.08)',
        inputBg: 'rgba(0, 0, 0, 0.4)',
        navBg: 'rgba(7, 6, 17, 0.94)',
        navBorder: 'rgba(255, 255, 255, 0.08)',
      },
      light: {
        bg: '#faf8fe',
        surface: '#ffffff',
        surfaceHover: '#faf5ff',
        surfaceBorder: 'rgba(124, 58, 237, 0.22)',
        primary: '#7c3aed',
        primaryHover: '#6d28d9',
        primaryText: '#ffffff',
        accent: '#5b21b6',
        textMain: '#1e1b4b',
        textMuted: '#6b7280',
        badgeBg: 'rgba(124, 58, 237, 0.1)',
        badgeBorder: 'rgba(124, 58, 237, 0.28)',
        badgeText: '#4c1d95',
        searchBg: '#ffffff',
        cardSubtle: '#f5f3ff',
        borderSubtle: '#ede9fe',
        inputBg: '#ffffff',
        navBg: 'rgba(255, 255, 255, 0.94)',
        navBorder: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
];

export const applyThemeToDOM = (theme: Theme, mode: ColorMode) => {
  const root = document.documentElement;
  const colors = theme.colors[mode];

  // Set html class for mode
  if (mode === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }

  // Set CSS Variables on root
  root.style.setProperty('--color-theme-bg', colors.bg);
  root.style.setProperty('--color-theme-surface', colors.surface);
  root.style.setProperty('--color-theme-surface-hover', colors.surfaceHover);
  root.style.setProperty('--color-theme-surface-border', colors.surfaceBorder);
  root.style.setProperty('--color-theme-primary', colors.primary);
  root.style.setProperty('--color-theme-primary-hover', colors.primaryHover);
  root.style.setProperty('--color-theme-primary-text', colors.primaryText);
  root.style.setProperty('--color-theme-accent', colors.accent);
  root.style.setProperty('--color-theme-text-main', colors.textMain);
  root.style.setProperty('--color-theme-text-muted', colors.textMuted);
  root.style.setProperty('--color-theme-badge-bg', colors.badgeBg);
  root.style.setProperty('--color-theme-badge-border', colors.badgeBorder);
  root.style.setProperty('--color-theme-badge-text', colors.badgeText);
  root.style.setProperty('--color-theme-search-bg', colors.searchBg);
  root.style.setProperty('--color-theme-card-subtle', colors.cardSubtle);
  root.style.setProperty('--color-theme-border-subtle', colors.borderSubtle);
  root.style.setProperty('--color-theme-input-bg', colors.inputBg);
  root.style.setProperty('--color-theme-nav-bg', colors.navBg);
  root.style.setProperty('--color-theme-nav-border', colors.navBorder);

  // Directly set document.body style
  document.body.style.backgroundColor = colors.bg;
  document.body.style.color = colors.textMain;
};
