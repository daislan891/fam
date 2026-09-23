import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MusicianRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicianRegisterModal: React.FC<MusicianRegisterModalProps> = ({ isOpen, onClose }) => {
  const [stageName, setStageName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instruments, setInstruments] = useState('');
  const [city, setCity] = useState('');
  const [instagram, setInstagram] = useState('');
  const [basePrice, setBasePrice] = useState('800');
  const [hasEquipment, setHasEquipment] = useState(true);
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#ec4899', '#06b6d4'],
      });
    } catch {
      // fallback
    }
    setRegistered(true);
  };

  const handleResetAndClose = () => {
    setRegistered(false);
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

        {registered ? (
          <div className="py-8 text-center space-y-4">
            <div
              className="w-14 h-14 rounded-full mx-auto flex items-center justify-center border"
              style={{
                backgroundColor: 'var(--color-theme-badge-bg)',
                borderColor: 'var(--color-theme-badge-border)',
                color: 'var(--color-theme-accent)',
              }}
            >
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold theme-text-main">
              Perfil Criado com Sucesso!
            </h3>
            <p className="text-xs theme-text-muted max-w-sm mx-auto leading-relaxed">
              O pré-cadastro de <span style={{ color: 'var(--color-theme-accent)' }} className="font-bold">{stageName}</span> foi concluído.
              Nossa equipe de curadoria entrará em contato para ativar seu perfil na edição de lançamento.
            </p>
            <div
              className="p-3 rounded-xl border text-left max-w-xs mx-auto text-xs space-y-1"
              style={{
                backgroundColor: 'var(--color-theme-card-subtle)',
                borderColor: 'var(--color-theme-border-subtle)',
              }}
            >
              <span className="theme-text-muted text-[11px]">Seu link exclusivo de divulgação:</span>
              <p
                className="font-mono p-2 rounded border truncate"
                style={{
                  backgroundColor: 'var(--color-theme-badge-bg)',
                  borderColor: 'var(--color-theme-badge-border)',
                  color: 'var(--color-theme-badge-text)',
                }}
              >
                fam.com.br/@{stageName.toLowerCase().replace(/\s+/g, '-') || 'artista'}
              </p>
            </div>
            <div className="pt-2">
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
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold mb-2"
                style={{
                  backgroundColor: 'var(--color-theme-badge-bg)',
                  borderColor: 'var(--color-theme-badge-border)',
                  color: 'var(--color-theme-badge-text)',
                }}
              >
                <UserPlus className="w-3 h-3" />
                <span>Para Músicos & Bandas • Lançamento</span>
              </div>
              <h3 className="text-xl font-bold theme-text-main">
                Cadastre seu perfil profissional
              </h3>
              <p className="text-xs theme-text-muted mt-0.5">
                Receba convites de shows com cachê em custódia e taxa zero no lançamento.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Nome Artístico / Banda *</label>
                  <input
                    type="text"
                    required
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    placeholder="Ex: Amanda Trio"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Amanda Rocha"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
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
                  <label className="block text-xs font-medium theme-text-muted mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amanda@musica.com"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98888-7777"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
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
                  <label className="block text-xs font-medium theme-text-muted mb-1">Instrumentos *</label>
                  <input
                    type="text"
                    required
                    value={instruments}
                    onChange={(e) => setInstruments(e.target.value)}
                    placeholder="Ex: Violino, Voz e Violão..."
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Cidade / Estado *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: São Paulo / SP"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
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
                  <label className="block text-xs font-medium theme-text-muted mb-1">Instagram (@usuario)</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@amandatrio"
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-muted mb-1">Cachê Base Médio (R$)</label>
                  <input
                    type="number"
                    step="50"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--color-theme-input-bg)',
                      borderColor: 'var(--color-theme-border-subtle)',
                      color: 'var(--color-theme-text-main)',
                    }}
                  />
                </div>
              </div>

              <div
                className="p-2.5 rounded-lg border flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--color-theme-card-subtle)',
                  borderColor: 'var(--color-theme-border-subtle)',
                }}
              >
                <span className="text-xs theme-text-muted">Possui som e microfones próprios?</span>
                <input
                  type="checkbox"
                  checked={hasEquipment}
                  onChange={(e) => setHasEquipment(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: 'var(--color-theme-primary)' }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl theme-primary-btn font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Criar Meu Perfil
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
