import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = (topic: string) => {
    let text = '';
    if (topic === 'serum') {
      text = 'Olá! Gostaria de tirar dúvidas e comprar o Sérum Facial Lopes Beautiflyur com 15% OFF.';
    } else if (topic === 'clinic') {
      text = 'Olá! Gostaria de agendar uma consulta e avaliação presencial na clínica Lopes Beautiflyur nos Jardins.';
    } else {
      text = 'Olá! Gostaria de conversar com uma especialista da clínica Lopes Beautiflyur.';
    }

    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start">
      {/* Quick Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-[#E2C799] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1F1C18] to-[#2B2721] p-4 text-white flex items-center justify-between border-b border-[#D4AF37]/40">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B] font-luxury font-bold">
                  LB
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-[#1F1C18]"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wide">Concierge Lopes Beautiflyur</h4>
                <span className="text-[10px] text-[#D8CFBF] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  Atendimento Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#BDB4A8] hover:text-white p-1 rounded-lg cursor-pointer transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-marble space-y-3 text-xs">
            <div className="p-3 bg-white rounded-2xl rounded-tl-none border border-[#EAE3D4] shadow-xs text-[#3D3730] leading-relaxed">
              Olá! Seja bem-vinda à <strong>Lopes Beautiflyur</strong>. Como podemos cuidar da sua pele hoje?
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleSendMessage('serum')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#FAF5E8] border border-[#EAE3D4] hover:border-[#B8860B] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="font-semibold text-[#2C2926] group-hover:text-[#8A6317]">
                  ✨ Quero Comprar o Sérum Facial
                </span>
                <Send className="w-3.5 h-3.5 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => handleSendMessage('clinic')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#FAF5E8] border border-[#EAE3D4] hover:border-[#B8860B] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="font-semibold text-[#2C2926] group-hover:text-[#8A6317]">
                  🏛️ Agendar Avaliação na Clínica
                </span>
                <Send className="w-3.5 h-3.5 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => handleSendMessage('duvidas')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#FAF5E8] border border-[#EAE3D4] hover:border-[#B8860B] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="font-semibold text-[#2C2926] group-hover:text-[#8A6317]">
                  💬 Falar com a Biomédica Esteta
                </span>
                <Send className="w-3.5 h-3.5 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <div className="pt-1 text-[10px] text-center text-[#8C8377] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
              Atendimento seguro e confidencial
            </div>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center border-2 border-white ring-2 ring-[#B8860B]/40"
        title="Falar no WhatsApp"
        aria-label="Abrir WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-white"></span>
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
