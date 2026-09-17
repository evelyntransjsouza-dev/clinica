import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Droplets, Eye, MessageCircle, Instagram, ShoppingBag, PackageCheck, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG, SERUM_HERO_IMAGE } from '../data/content';

interface HeroProps {
  onBuyProduct: () => void;
  onViewClinic: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBuyProduct,
  onViewClinic,
  onOpenQuiz,
}) => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Quero conhecer mais sobre o Sérum Facial Lopes Beautiflyur e os protocolos da clínica.'
  )}`;

  return (
    <section id="hero" className="relative overflow-hidden bg-marble pt-8 pb-16 lg:py-24 border-b border-[#E2C799]/30">
      {/* Background Subtle Veins and Gold Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E2C799]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E2C799] shadow-xs text-xs tracking-wider uppercase font-semibold text-[#8E6A21]">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Estética Médica & Alta Cosmetologia Própria</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A1816] leading-[1.12]">
              A Alquimia Perfeita Entre a <br />
              <span className="gold-gradient-text font-semibold italic">Nossa Clínica</span> & Seu{' '}
              <span className="gold-gradient-text font-semibold">Sérum Facial</span>
            </h1>

            {/* Subheadline with Personalization Focus */}
            <p className="text-base sm:text-lg text-[#555047] leading-relaxed max-w-2xl font-light">
              Desperte o máximo potencial da sua pele com o{' '}
              <strong className="font-semibold text-[#2C2926]">Sérum Facial Lopes Beautiflyur</strong>. 
              Um tratamento dermatológico formulado com Ácido Hialurônico 5D e Bio-Peptídeos Dourados, 
              projetado para agir em perfeita sinergia com os protocolos personalizados da nossa clínica.
            </p>

            {/* Key Differentiators Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E2C799]/40 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C2926]">Resultados Únicos</div>
                  <div className="text-[11px] text-[#7E776F]">Protocolo sob medida</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E2C799]/40 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B] shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C2926]">Linha Própria</div>
                  <div className="text-[11px] text-[#7E776F]">Alta pureza dérmica</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E2C799]/40 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C2926]">Clínica Conceito</div>
                  <div className="text-[11px] text-[#7E776F]">Jardins, São Paulo</div>
                </div>
              </div>
            </div>

            {/* CTAs Group */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              {/* Buy Product CTA */}
              <button
                id="hero-buy-button"
                onClick={onBuyProduct}
                className="gold-button px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center gap-2.5 cursor-pointer"
              >
                <span>Comprar Sérum Facial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* View Clinic CTA */}
              <button
                id="hero-clinic-button"
                onClick={onViewClinic}
                className="px-6 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase text-[#3C362F] bg-white hover:bg-[#F9F7F3] border border-[#E2C799] shadow-xs hover:border-[#B8860B] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#B8860B]" />
                <span>Ver a Clínica</span>
              </button>

              {/* Free Quiz Button */}
              <button
                id="hero-quiz-button"
                onClick={onOpenQuiz}
                className="px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#8A6317] hover:text-[#5B410D] underline underline-offset-4 decoration-[#D4AF37] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                Diagnóstico de Pele Online
              </button>
            </div>

            {/* Elegant Marketplace & Social Channels Strip */}
            <div className="pt-4 border-t border-[#E8DFC8]/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6317] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B8860B]" />
                  Canais & Lojas Oficiais Autorizadas:
                </span>
                <span className="text-[11px] text-[#998F84]">Envio Rápido & Seguro</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Instagram Button */}
                <a
                  id="hero-btn-instagram"
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#E2C799] hover:border-[#B8860B] text-xs font-semibold text-[#2C2926] hover:text-[#B8860B] transition-all flex items-center gap-2 shadow-xs group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B]">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B8860B] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Shopee Button */}
                <a
                  id="hero-btn-shopee"
                  href={BRAND_CONFIG.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFF6F3] border border-[#FFD3C4] hover:border-[#EE4D2D] text-xs font-semibold text-[#2C2926] hover:text-[#C0392B] transition-all flex items-center gap-2 shadow-xs group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FFF0EC] flex items-center justify-center text-[#EE4D2D]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <span>Shopee Oficial</span>
                  <ArrowUpRight className="w-3 h-3 text-[#EE4D2D] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Mercado Livre Button */}
                <a
                  id="hero-btn-mercadolivre"
                  href={BRAND_CONFIG.mercadoLivreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFFDF0] border border-[#FFE785] hover:border-[#D4AF37] text-xs font-semibold text-[#2C2926] hover:text-[#806600] transition-all flex items-center gap-2 shadow-xs group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FFFBE6] flex items-center justify-center text-[#997A00]">
                    <PackageCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Mercado Livre Full</span>
                  <ArrowUpRight className="w-3 h-3 text-[#997A00] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>

              {/* Social Proof Quick Strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B635A] pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-full bg-[#E2C799] border border-white flex items-center justify-center text-[9px] font-bold text-[#5B410D]">★</span>
                    <span className="w-5 h-5 rounded-full bg-[#DFC28A] border border-white flex items-center justify-center text-[9px] font-bold text-[#5B410D]">★</span>
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] border border-white flex items-center justify-center text-[9px] font-bold text-white">★</span>
                  </div>
                  <span className="font-semibold text-[#2C2926]">4.9/5 avaliação</span>
                  <span className="text-[#998F84]">(+1.200 frascos)</span>
                </div>
                <span className="text-[#D8CFBF]">•</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8860B] flex items-center gap-1 transition-colors font-medium text-[#7A5A18]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Atendimento WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Product Visual with Marble & Gold Display */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Decorative Gold Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 sm:w-88 h-72 sm:h-88 rounded-full border border-[#D4AF37]/25 animate-[spin_40s_linear_infinite]"></div>
              <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full border border-[#E2C799]/20"></div>
            </div>

            {/* Product Display Card with Marble Texture */}
            <div className="relative z-10 w-full max-w-md rounded-3xl p-4 sm:p-5 bg-white shadow-2xl border border-[#E2C799]/50 transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Tag Over Image */}
              <div className="absolute top-7 left-7 z-20 bg-[#1A1816]/90 backdrop-blur-md text-[#E8D39E] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 border border-[#D4AF37]/50">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>O Sérum dos Sonhos</span>
              </div>

              {/* Discount Ribbon */}
              <div className="absolute top-7 right-7 z-20 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
                15% OFF
              </div>

              {/* Main Product Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7F5F0] to-[#EFECE4] border border-[#E2C799]/30">
                <img
                  src={SERUM_HERO_IMAGE}
                  alt="Sérum Facial Lopes Beautiflyur em frasco de vidro fosco com tampa dourada sobre pedestal de mármore branco"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Highlight Feature Pill */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E2C799]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9C7728]">Fórmula Patenteada</span>
                  <p className="text-xs font-semibold text-[#1F1C18]">Ácido Hialurônico 5D + Ouro 24K</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#8C8377] line-through block">R$ 320,00</span>
                  <span className="text-sm font-bold text-[#1F1C18]">R$ 249,00</span>
                </div>
              </div>

              {/* Quick Card Action */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={onBuyProduct}
                  className="gold-button py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Garantir o Meu</span>
                </button>
                <button
                  onClick={onViewClinic}
                  className="py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#4A453E] bg-white hover:bg-[#F7F4EC] border border-[#E2C799] text-center transition-colors cursor-pointer"
                >
                  <span>Tour na Clínica</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
