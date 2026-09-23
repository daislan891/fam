import React, { useState, useEffect } from 'react';
import { X, Send, Music, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Musician } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMusician?: Musician | null;
  initialDetails?: {
    eventType: string;
    guests: number;
    format: string;
    estimatedCache: number;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedMusician,
  initialDetails,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('Casamento');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialDetails?.eventType) {
      setEventType(initialDetails.eventType);
    }
  }, [initialDetails]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#10b981'],
      });
    } catch {
      // fallback
    }
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl border p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-theme-surface)',
          borderColor: 'var(--color-theme-surface-border)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-full border theme-text-muted hover:theme-text-main transition-all cursor-pointer"
          style={{
            backgroundColor: 'var(--color-theme-card-subtle)',
            borderColor: 'var(--color-theme-border-subtle)',
          }}
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold theme-text-main">
              Solicitação de Lançamento Enviada!
            </h3>
            <p className="text-xs theme-text-muted max-w-sm mx-auto leading-relaxed">
              O músico e nossa equipe de concierge foram notificados. Entraremos em contato via WhatsApp para alinhar detalhes de repertório e garantir sua condição especial de lançamento.
            </p>
            <div className="pt-3">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl theme-primary-btn font-semibold text-xs cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full theme-badge border text-xs font-semibold mb-2">
                <Music className="w-3 h-3 theme-accent-text" />
                <span>Solicitação de Proposta • Lançamento</span>
              </div>
              <h3 className="text-xl font-bold theme-text-main">
                {selectedMusician ? `Falar com ${selectedMusician.stageName}` : 'Solicitar Orçamento'}
              </h3>
              <p className="text-xs theme-text-muted mt-0.5">
                Envie os detalhes do seu evento sem compromisso financeiro antecipado.
              </p>
            </div>

            {/* Selected Musician Ribbon */}
            {selectedMusician && (
              <div
                className="p-3 rounded-xl border flex items-center gap-3 mb-5"
                style={{
                  backgroundColor: 'var(--color-theme-card-subtle)',
                  borderColor: 'var(--color-theme-border-subtle)',
                }}
              >
                <img
                  src={selectedMusician.avatar}
                  alt={selectedMusician.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold theme-text-main truncate">{selectedMusician.stageName}</p>
                  <p className="text-[11px] theme-text-muted truncate">{selectedMusician.role}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Beatriz Lima"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Tipo de Evento</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  >
                    <option value="Casamento" className="bg-slate-900 text-white dark:bg-[#121218]">Casamento</option>
                    <option value="Bar e Restaurante" className="bg-slate-900 text-white dark:bg-[#121218]">Bar / Bistrô</option>
                    <option value="Evento Corporativo" className="bg-slate-900 text-white dark:bg-[#121218]">Corporativo</option>
                    <option value="Aniversário" className="bg-slate-900 text-white dark:bg-[#121218]">Aniversário / Festa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Data do Evento *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium theme-text-muted mb-1">Cidade e Local *</label>
                <input
                  type="text"
                  required
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Ex: São Paulo / SP - Espaço Vila da Mata"
                  className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
                  style={{
                    backgroundColor: 'var(--color-theme-input-bg)',
                    borderColor: 'var(--color-theme-border-subtle)',
                    color: 'var(--color-theme-text-main)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium theme-text-muted mb-1">
                  Músicas desejadas ou observações
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Músicas para entrada, duração da apresentação..."
                  className="w-full px-3 py-2 rounded-lg border text-xs outline-none resize-none"
                  style={{
                    backgroundColor: 'var(--color-theme-input-bg)',
                    borderColor: 'var(--color-theme-border-subtle)',
                    color: 'var(--color-theme-text-main)',
                  }}
                />
              </div>

              {/* Safety banner */}
              <div
                className="p-2.5 rounded-lg border flex items-center gap-2 text-[11px]"
                style={{
                  backgroundColor: 'var(--color-theme-badge-bg)',
                  borderColor: 'var(--color-theme-badge-border)',
                  color: 'var(--color-theme-accent)',
                }}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>O pagamento é seguro em custódia e só é liberado após o show acontecer.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl theme-primary-btn font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar Solicitação
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
