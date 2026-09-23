import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudioExperienceBar } from './components/AudioExperienceBar';
import { MusicianSpotlight } from './components/MusicianSpotlight';
import { EventSimulator } from './components/EventSimulator';
import { HowItWorks } from './components/HowItWorks';
import { EscrowTrust } from './components/EscrowTrust';
import { Testimonials } from './components/Testimonials';
import { BookingModal } from './components/BookingModal';
import { MusicianRegisterModal } from './components/MusicianRegisterModal';
import { Footer } from './components/Footer';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import type { Musician } from './types';
import type { ColorMode } from './utils/themes';
import { audioEngine } from './utils/audioSynth';

export function App() {
  const [currentThemeId, setCurrentThemeId] = useState('amber-gold');
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [musicianRegisterModalOpen, setMusicianRegisterModalOpen] = useState(false);
  const [selectedMusician, setSelectedMusician] = useState<Musician | null>(null);
  const [initialBookingDetails, setInitialBookingDetails] = useState<{
    eventType: string;
    guests: number;
    format: string;
    estimatedCache: number;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<{
    genre: string;
    eventType: string;
    city: string;
  }>({
    genre: '',
    eventType: '',
    city: '',
  });

  const [activeAudioGenre, setActiveAudioGenre] = useState<
    'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band'
  >('strings');

  const handleToggleColorMode = () => {
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Trigger audio sample and switch active genre
  const handlePlaySample = (
    genreKey: 'jazz' | 'pop-acoustic' | 'sax-house' | 'strings' | 'rock-band'
  ) => {
    setActiveAudioGenre(genreKey);
    audioEngine.playGenre(genreKey);
  };

  // Open booking modal with a selected musician
  const handleSelectMusician = (musician: Musician) => {
    setSelectedMusician(musician);
    setInitialBookingDetails(null);
    setBookingModalOpen(true);
  };

  // Open booking modal from simulator
  const handleOpenBookingWithDetails = (details: {
    eventType: string;
    guests: number;
    format: string;
    estimatedCache: number;
    recommendedMusician?: Musician;
  }) => {
    if (details.recommendedMusician) {
      setSelectedMusician(details.recommendedMusician);
    }
    setInitialBookingDetails({
      eventType: details.eventType,
      guests: details.guests,
      format: details.format,
      estimatedCache: details.estimatedCache,
    });
    setBookingModalOpen(true);
  };

  // Open generic booking modal
  const handleGenericBooking = () => {
    setSelectedMusician(null);
    setInitialBookingDetails(null);
    setBookingModalOpen(true);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-theme-bg)',
        color: 'var(--color-theme-text-main)',
      }}
    >
      {/* Sticky Navbar with Light/Dark Mode toggle */}
      <Navbar
        colorMode={colorMode}
        onToggleColorMode={handleToggleColorMode}
        onOpenBooking={handleGenericBooking}
        onOpenMusicianRegister={() => setMusicianRegisterModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onSearch={setSearchQuery}
        onPlayPreview={handlePlaySample}
      />

      {/* Audio Experience Bar with Canvas Visualizer */}
      <AudioExperienceBar
        activeGenre={activeAudioGenre}
        onGenreSelect={setActiveAudioGenre}
      />

      {/* Musician Spotlight Grid */}
      <MusicianSpotlight
        searchQuery={searchQuery}
        onSelectMusicianForBooking={handleSelectMusician}
        onPlaySample={handlePlaySample}
      />

      {/* Interactive Event Budget & Matcher Simulator */}
      <EventSimulator
        onOpenBookingWithDetails={handleOpenBookingWithDetails}
      />

      {/* How It Works (Client vs Musician) */}
      <HowItWorks
        onOpenBooking={handleGenericBooking}
        onOpenMusicianRegister={() => setMusicianRegisterModalOpen(true)}
      />

      {/* Escrow Custody & Platform Trust */}
      <EscrowTrust />

      {/* Launch Benefits & Exclusive Guarantees */}
      <Testimonials onOpenBooking={handleGenericBooking} />

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Theme & Mode Switcher */}
      <ThemeSwitcher
        currentThemeId={currentThemeId}
        colorMode={colorMode}
        onSelectTheme={(theme) => setCurrentThemeId(theme.id)}
        onToggleColorMode={handleToggleColorMode}
      />

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedMusician={selectedMusician}
        initialDetails={initialBookingDetails}
      />

      <MusicianRegisterModal
        isOpen={musicianRegisterModalOpen}
        onClose={() => setMusicianRegisterModalOpen(false)}
      />
    </div>
  );
}

export default App;
