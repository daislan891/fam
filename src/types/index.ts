export interface Musician {
  id: number;
  slug: string;
  name: string;
  stageName: string;
  role: string; // Ex: "Violinista Clássica & Pop", "Duo Acústico Voz e Violão"
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  city: string;
  state: string;
  genres: string[];
  instruments: string[];
  eventTypes: string[];
  basePrice: number;
  bio: string;
  sampleTrackTitle: string;
  sampleGenreKey: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band';
  highlightTag: string;
  badgeColor?: string;
  repertoireSample: string[];
  hasSoundEquipment: boolean;
  availableNextWeekend: boolean;
}

export interface Review {
  id: number;
  clientName: string;
  clientRole: string;
  eventType: string;
  date: string;
  rating: number;
  avatar: string;
  comment: string;
  musicianName: string;
}

export interface GenreFilter {
  id: string;
  label: string;
  iconName: string;
  sampleTrack: string;
  bpm: number;
  color: string;
}
