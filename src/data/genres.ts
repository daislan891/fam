import type { GenreFilter } from '../types';

export const GENRE_PREVIEWS: GenreFilter[] = [
  {
    id: 'jazz',
    label: 'Jazz & Bossa Nova',
    iconName: 'Music2',
    sampleTrack: 'Autumn Leaves / Garota de Ipanema (Arr. Sofisticado)',
    bpm: 88,
    color: 'from-amber-500 to-rose-500'
  },
  {
    id: 'pop-acoustic',
    label: 'Pop Acústico & MPB',
    iconName: 'Guitar',
    sampleTrack: 'Ed Sheeran & Tiago Iorc (Voz e Violão)',
    bpm: 96,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'strings',
    label: 'Quarteto de Cordas & Erudito',
    iconName: 'Sparkles',
    sampleTrack: 'Viva La Vida & Canon em Ré (Cerimônia)',
    bpm: 72,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'sax-house',
    label: 'Sax Live & Lounge House',
    iconName: 'Radio',
    sampleTrack: 'Deep House & Saxophone Improvisation',
    bpm: 124,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'rock-band',
    label: 'Banda Rock & Baile',
    iconName: 'Flame',
    sampleTrack: 'Classic Rock Hits & Festas Animadas',
    bpm: 130,
    color: 'from-amber-600 to-red-500'
  }
];

export const EVENT_TYPES = [
  { id: 'wedding', label: 'Casamento (Cerimônia ou Festa)', defaultBudget: 3500 },
  { id: 'bar', label: 'Bar, Pub & Restaurante', defaultBudget: 750 },
  { id: 'corporate', label: 'Evento Corporativo & Confraternização', defaultBudget: 2800 },
  { id: 'birthday', label: 'Aniversário & Festa Privada', defaultBudget: 1200 },
  { id: 'hotel', label: 'Hotel & Lounge Sofisticado', defaultBudget: 1500 }
];
