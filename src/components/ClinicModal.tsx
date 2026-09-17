import React from 'react';
import { X, Sparkles, MapPin, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { ClinicSpace } from '../types';
import { BRAND_CONFIG, CLINIC_SPACES } from '../data/content';

interface ClinicModalProps {
  space: ClinicSpace | null;
  onClose: () => void;
  onSelectSpace: (space: ClinicSpace) => void;
}

export const ClinicModal: React.FC<ClinicModalProps> = ({
  space,
  onClose,
  onSelectSpace,
}) => {
  if (!space) return null;

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Olá! Estive vendo o ambiente "${space.title}" da clínica Lopes Beautiflyur e gostaria de agendar uma visita presencial e avaliação de pele.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E2C799] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="bg-marble px-6 py-4 border-b border-[#E2C799]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span className="font-luxury text-lg font-bold text-[#1A1816]">
              Espaço Lopes Beautiflyur • {space.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7A7268] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main High-Res Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-[#1A1816]">
            <img
              src={space.image}
              alt={space.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              {space.category}
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-[#1A1816]">
              {space.title}
            </h3>
            <p className="text-sm text-[#554E46] leading-relaxed">
              {space.description}
            </p>
          </div>

          {/* Technology & Amenities Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#E2C799]/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A6317]">
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>Tecnologia & Biossegurança</span>
              </div>
              <p className="text-xs text-[#524B43] leading-relaxed">
                {space.techHighlight}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#E2C799]/50 space-y-2">
              <div className="text-xs font-bold text-[#8A6317]">
                Diferenciais Exclusivos:
              </div>
              <ul className="space-y-1.5 text-xs text-[#524B43]">
                {space.features.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other Clinic Spaces Gallery Thumbnails */}
          <div className="space-y-2 pt-2 border-t border-[#EAE3D4]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7E7569] block">
              Explorar Outros Ambientes da Clínica:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CLINIC_SPACES.map((otherSpace) => (
                <button
                  key={otherSpace.id}
                  onClick={() => onSelectSpace(otherSpace)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    otherSpace.id === space.id
                      ? 'border-[#B8860B] bg-[#FAF5E8] ring-1 ring-[#B8860B]'
                      : 'border-[#EAE3D4] hover:border-[#B8860B]/50'
                  }`}
                >
                  <div className="aspect-video w-full rounded-lg overflow-hidden mb-1.5 bg-[#EAE5DC]">
                    <img
                      src={otherSpace.image}
                      alt={otherSpace.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#2C2926] line-clamp-1 block">
                    {otherSpace.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Scheduling Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE3D4]">
            <div className="text-xs text-[#7A7268] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B8860B]" />
              <span>{BRAND_CONFIG.address}</span>
            </div>

            <button
              onClick={handleWhatsAppBooking}
              className="w-full sm:w-auto gold-button px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Agendar Visita com a Concierge</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
