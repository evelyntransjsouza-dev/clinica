import React from 'react';
import { 
  Sparkles, ShieldCheck, Lock, CreditCard, Flame, Gift, 
  CheckCircle2, ArrowUpRight, Award, Clock, PackageCheck, Sun, Moon
} from 'lucide-react';
import { SPECIAL_CATALOG_PACKAGE, BRAND_CONFIG } from '../data/content';

export const LimitedEditionSection: React.FC = () => {
  const pkg = SPECIAL_CATALOG_PACKAGE;
  const percentSold = Math.round(((pkg.totalBatch - pkg.unitsRemaining) / pkg.totalBatch) * 100);

  return (
    <section 
      id="edicao-limitada" 
      className="py-24 bg-[#141210] relative overflow-hidden text-white border-y border-[#DFC28A]/30"
    >
      {/* Subtle Luxury Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DFC28A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A2318] border border-[#DFC28A]/40 text-[#DFC28A] text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC28A] animate-pulse" />
            <span>{pkg.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F9F6F0] tracking-tight leading-tight">
            1 Catálogo Especial com os <span className="italic text-[#DFC28A]">2 Produtos Inclusos</span>
          </h2>

          <p className="mt-4 text-[#C4B7A5] text-base sm:text-lg font-light leading-relaxed">
            {pkg.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A89D8E]">
            <span className="flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-[#DFC28A]" />
              Box Duo Completo (Dia & Noite)
            </span>
            <span className="hidden sm:inline text-[#DFC28A]/40">•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#DFC28A]" />
              Link de Pagamento Direto Oficial
            </span>
            <span className="hidden sm:inline text-[#DFC28A]/40">•</span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#DFC28A]" />
              Stripe Checkout Seguro
            </span>
          </div>
        </div>

        {/* 1 Master Catalog Card Presentation */}
        <div className="bg-[#1C1917] border border-[#DFC28A]/40 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Catalog Main Visual Stage (5 cols on large screens) */}
            <div className="lg:col-span-5 relative bg-[#0D0B0A] flex flex-col justify-between overflow-hidden">
              <div className="relative aspect-16/10 lg:aspect-auto lg:h-full min-h-[340px] overflow-hidden group">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/50" />

                {/* Badges on Visual */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C1917]/90 backdrop-blur-md border border-[#DFC28A]/60 text-[#DFC28A] text-xs font-semibold tracking-wide">
                    Estojo Colecionador Numerado
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-red-950/80 backdrop-blur-md border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    Restam {pkg.unitsRemaining} unidades
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#141210]/85 backdrop-blur-md border border-[#DFC28A]/30 p-3.5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#DFC28A] font-medium flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#DFC28A]" />
                      Lote: <strong className="text-white">{pkg.batchCode}</strong>
                    </span>
                    <span className="text-[#DFC28A] font-bold">
                      {percentSold}% reservado
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2A241E] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#B8860B] to-[#DFC28A] rounded-full"
                      style={{ width: `${percentSold}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Catalog Details & Included Products Breakdown (7 cols on large screens) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#DFC28A]/20 text-[#DFC28A] border border-[#DFC28A]/40">
                    1 Catálogo • 2 Fórmulas Inclusas
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0] leading-snug">
                  {pkg.name}
                </h3>

                <p className="mt-2 text-sm text-[#C4B7A5] leading-relaxed">
                  {pkg.description}
                </p>

                {/* The 2 Products Included Inside Banner */}
                <div className="mt-6 pt-6 border-t border-[#DFC28A]/25">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC28A] flex items-center gap-2 mb-4">
                    <PackageCheck className="w-4 h-4 text-[#DFC28A]" />
                    Os 2 Produtos Que Já Vêm Inclusos Dentro Deste Catálogo:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.includedProducts.map((item, idx) => (
                      <div 
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#141210] border border-[#DFC28A]/30 hover:border-[#DFC28A]/60 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-[#DFC28A]/30">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#DFC28A] uppercase tracking-wider flex items-center gap-1">
                                {idx === 0 ? <Sun className="w-3 h-3 text-[#E8D39E]" /> : <Moon className="w-3 h-3 text-[#9EBEE8]" />}
                                {item.role}
                              </span>
                              <h5 className="font-serif text-sm font-semibold text-white leading-tight">
                                {item.name}
                              </h5>
                              <span className="text-[10px] font-mono text-[#A89D8E]">
                                {item.volume}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#EAE5DC] leading-relaxed mb-2 font-light">
                            {item.benefit}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#2A241E] text-[11px] text-[#A89D8E]">
                          <strong className="text-[#DFC28A] font-medium">Ativos: </strong>
                          {item.actives}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included Exclusive Gifts in the Box */}
                <div className="mt-6 p-4 rounded-2xl bg-[#2A2318]/60 border border-[#DFC28A]/30">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#DFC28A] flex items-center gap-1.5 mb-2.5">
                    <Gift className="w-4 h-4 text-[#DFC28A]" />
                    Incluso no Estojo de Colecionador:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#EAE5DC]">
                    {pkg.exclusiveGifts.map((gift, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DFC28A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{gift}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Single Direct Stripe Payment CTA */}
              <div className="pt-5 border-t border-[#DFC28A]/25 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#8C8377] line-through mr-2">
                      R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-[#DFC28A]">R$</span>
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F9F6F0]">
                        {pkg.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-[#DFC28A] font-medium ml-1">
                        (Valor Total do Catálogo com os 2 Produtos)
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A89D8E] block mt-1">
                      Parcelamento em até 12x no Cartão ou Pix à vista via Stripe
                    </span>
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-[#DFC28A]/15 text-[#DFC28A] border border-[#DFC28A]/35">
                      Economia Especial de R$ {(pkg.originalPrice - pkg.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Direct Stripe Checkout Button for the Complete Catalog */}
                <a
                  id="btn-stripe-pay-catalog-duo"
                  href={pkg.stripePaymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#DFC28A] via-[#E8D39E] to-[#C9A96E] hover:from-[#E8D39E] hover:to-[#DFC28A] text-[#141210] font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-[#DFC28A]/20 hover:shadow-[#DFC28A]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5 text-[#141210]" />
                  <span>Comprar Catálogo com os 2 Produtos Inclusos (Stripe Direto)</span>
                  <ArrowUpRight className="w-4 h-4 text-[#141210]" />
                </a>

                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#8C8377] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#DFC28A]" />
                    Checkout 100% Criptografado Stripe
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFC28A]" />
                    Garantia Oficial Sanluer & Lopes Beautiflyur
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#DFC28A]" />
                    Envio Prioritário com Seguro de Carga
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Concierge VIP Support */}
        <div className="mt-8 p-5 rounded-2xl bg-[#1C1917]/70 border border-[#DFC28A]/25 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DFC28A]/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#DFC28A]" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base text-[#F9F6F0]">
                Precisa de auxílio antes de finalizar seu pedido do Catálogo no Stripe?
              </h4>
              <p className="text-xs text-[#A89D8E]">
                Nosso Concierge da clínica está online para tirar dúvidas sobre a aplicação dos 2 produtos.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 shrink-0">
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com o concierge sobre o Catálogo Especial com os 2 Produtos Inclusos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#DFC28A]/60 text-[#DFC28A] hover:bg-[#DFC28A]/10 text-xs font-semibold transition-all"
            >
              <span>Falar com Concierge VIP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
