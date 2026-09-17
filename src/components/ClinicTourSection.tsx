import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, ShieldCheck, ChevronRight, Eye, MessageCircle, CheckCircle2 } from 'lucide-react';
import { CLINIC_SPACES, CLINIC_PROTOCOLS, BRAND_CONFIG } from '../data/content';
import { ClinicSpace } from '../types';

interface ClinicTourSectionProps {
  onSelectSpace: (space: ClinicSpace) => void;
  onOpenQuiz: () => void;
}

export const ClinicTourSection: React.FC<ClinicTourSectionProps> = ({
  onSelectSpace,
  onOpenQuiz,
}) => {
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);
  const currentSpace = CLINIC_SPACES[selectedSpaceIndex];

  const handleWhatsAppBooking = (protocolName?: string) => {
    const text = encodeURIComponent(
      protocolName
        ? `Olá! Gostaria de agendar uma avaliação na clínica Lopes Beautiflyur para o "${protocolName}".`
        : `Olá! Gostaria de agendar uma visita e avaliação personalizada na clínica Lopes Beautiflyur nos Jardins.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="clinic-tour" className="py-20 lg:py-28 bg-marble relative border-b border-[#E2C799]/30">
      
      {/* Decorative Gold Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E2C799] text-xs uppercase font-bold tracking-widest text-[#9C7728] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Espaço Conceito em São Paulo</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
            Conheça a Clínica Lopes Beautiflyur
          </h2>
          <p className="text-base text-[#615A52] font-light">
            Arquitetura contemporânea em mármore branco com toques dourados, concebida para oferecer
            máxima privacidade, tecnologia médica de ponta e um refúgio sensorial exclusivo no coração dos Jardins.
          </p>
        </div>

        {/* Featured Interactive Clinic Showcase */}
        <div className="bg-white rounded-3xl border border-[#E2C799]/50 shadow-xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Big Image Display with clickable zoom */}
            <div className="lg:col-span-7 relative group min-h-[350px] lg:min-h-[500px]">
              <img
                src={currentSpace.image}
                alt={currentSpace.title}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-[#E8D39E]">
                  {currentSpace.category}
                </span>
                <h3 className="font-luxury text-2xl sm:text-3xl font-medium mt-1">
                  {currentSpace.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E2DCDB] mt-2 max-w-xl line-clamp-2">
                  {currentSpace.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => onSelectSpace(currentSpace)}
                    className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-[#1F1C18] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Eye className="w-4 h-4 text-[#B8860B]" />
                    <span>Ver em Tela Cheia & Detalhes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Room Selector Navigation & Technology Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white to-[#FBF9F5]">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAE3D4] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7E7569]">
                    Ambientes da Clínica
                  </span>
                  <span className="text-xs text-[#B8860B] font-semibold">
                    {selectedSpaceIndex + 1} de {CLINIC_SPACES.length}
                  </span>
                </div>

                {/* List of Spaces */}
                <div className="space-y-2">
                  {CLINIC_SPACES.map((space, idx) => {
                    const isActive = selectedSpaceIndex === idx;
                    return (
                      <button
                        key={space.id}
                        onClick={() => setSelectedSpaceIndex(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'border-[#B8860B] bg-[#FAF5E8] shadow-xs ring-1 ring-[#B8860B]/20'
                            : 'border-[#EDE7DC] bg-white hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="pr-2">
                          <div className={`text-xs font-bold ${isActive ? 'text-[#8A6317]' : 'text-[#2C2926]'}`}>
                            {space.title}
                          </div>
                          <div className="text-[11px] text-[#7E7569]">{space.category}</div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#B8860B]' : 'text-[#C5BBAE]'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Technology and Safety Highlight Box */}
                <div className="p-4 rounded-2xl bg-white border border-[#E2C799]/40 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8A6317]">
                    <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                    <span>Diferencial Tecnológico</span>
                  </div>
                  <p className="text-xs text-[#524B43] leading-relaxed">
                    {currentSpace.techHighlight}
                  </p>
                  <ul className="pt-2 space-y-1 text-xs text-[#635B51]">
                    {currentSpace.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom WhatsApp CTA for Scheduling */}
              <div className="pt-2 border-t border-[#EAE3D4]">
                <button
                  onClick={() => handleWhatsAppBooking(currentSpace.title)}
                  className="w-full gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agendar Horário Privativo na Clínica</span>
                </button>
                <div className="mt-2 text-center text-[11px] text-[#8C8377] flex items-center justify-center gap-2">
                  <MapPin className="w-3 h-3 text-[#B8860B]" />
                  <span>{BRAND_CONFIG.address}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Combined Protocols: Clinica + Sérum Lopes Beautiflyur */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9C7728]">
              Tratamentos em Cabine & Manutenção em Casa
            </span>
            <h3 className="font-luxury text-2xl sm:text-3xl font-semibold text-[#1A1816] mt-1">
              Protocolos Combinados: Clínica + Sérum Facial
            </h3>
            <p className="text-xs sm:text-sm text-[#615A52] mt-2">
              Descubra como os procedimentos presenciais na clínica potencializam em até 3x a absorção dos ativos do Sérum Facial Lopes Beautiflyur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINIC_PROTOCOLS.map((protocol) => (
              <div
                key={protocol.id}
                className="bg-white rounded-2xl p-6 border border-[#E2C799]/40 shadow-sm hover:shadow-md transition-all hover:border-[#B8860B] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-[#FAF5E8] text-[#8E6A21] px-2.5 py-1 rounded-full border border-[#E2C799]/50">
                      {protocol.badge}
                    </span>
                    <span className="text-xs text-[#8A8277] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B8860B]" />
                      {protocol.duration}
                    </span>
                  </div>

                  <h4 className="font-luxury text-xl font-bold text-[#1A1816]">
                    {protocol.title}
                  </h4>

                  <p className="text-xs text-[#59524A] leading-relaxed">
                    {protocol.description}
                  </p>

                  <div className="p-3 rounded-xl bg-[#FBF9F5] border border-[#EBE3D3] text-xs">
                    <span className="font-semibold text-[#8A6317] block mb-0.5">Resultado Esperado:</span>
                    <span className="text-[#4E4841]">{protocol.results}</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#F0EBE1]">
                  <button
                    onClick={() => handleWhatsAppBooking(protocol.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#7A5A18] bg-[#F7F3EB] hover:bg-[#EFE7D8] border border-[#E2C799] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Consultar no WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
