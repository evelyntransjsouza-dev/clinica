import React from 'react';
import { Instagram, ShoppingBag, PackageCheck, ArrowUpRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

export const OfficialChannelsBar: React.FC = () => {
  return (
    <section className="py-10 bg-[#FAF8F5] border-y border-[#E2C799]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Label */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2C799]/60 text-[11px] uppercase font-bold tracking-widest text-[#9C7728] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#B8860B]" />
              <span>Canais Autorizados & Lojas Oficiais</span>
            </div>
            <h3 className="font-luxury text-xl sm:text-2xl font-bold text-[#1A1816] mt-1">
              Onde Encontrar a Lopes Beautiflyur
            </h3>
          </div>
          <p className="text-xs text-[#7A7268] max-w-md font-light">
            Garantia de originalidade, lote rastreado e envio direto da nossa clínica para a sua casa.
          </p>
        </div>

        {/* 3 Luxury Official Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Instagram Oficial */}
          <a
            id="channel-instagram"
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-5 rounded-2xl bg-white border border-[#E2C799]/60 hover:border-[#B8860B] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FAF2E1] to-[#F5E6C7] border border-[#E2C799]/70 flex items-center justify-center text-[#9C7728] group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A6317] bg-[#FAF5E8] px-2.5 py-0.5 rounded-full border border-[#E2C799]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                  Perfil Verificado
                </span>
              </div>

              <h4 className="font-luxury text-lg font-bold text-[#1A1816] group-hover:text-[#9C7728] transition-colors">
                Instagram Oficial
              </h4>
              <p className="text-xs text-[#6B635A] mt-1 line-clamp-2">
                Bastidores de atendimentos, dicas diárias da biomédica e relatos ao vivo de pacientes.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-bold text-[#1A1816] group-hover:text-[#B8860B] transition-colors">
              <span>Acessar {BRAND_CONFIG.instagramHandle}</span>
              <div className="w-7 h-7 rounded-full bg-[#FAF6EE] group-hover:bg-[#B8860B] group-hover:text-white flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* 2. Shopee Loja Oficial */}
          <a
            id="channel-shopee"
            href={BRAND_CONFIG.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-5 rounded-2xl bg-white border border-[#E2C799]/60 hover:border-[#EE4D2D]/60 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFF3EF] to-[#FFE5DC] border border-[#FFCCBA] flex items-center justify-center text-[#EE4D2D] group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C0392B] bg-[#FFF2ED] px-2.5 py-0.5 rounded-full border border-[#FFCCBA] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#EE4D2D] text-[#EE4D2D]" />
                  Loja Oficial Shopee
                </span>
              </div>

              <h4 className="font-luxury text-lg font-bold text-[#1A1816] group-hover:text-[#C0392B] transition-colors">
                Shopee Oficial
              </h4>
              <p className="text-xs text-[#6B635A] mt-1 line-clamp-2">
                Aproveite seus cupons de moedas, frete grátis Shopee e parcelamento facilitado no app.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-bold text-[#1A1816] group-hover:text-[#EE4D2D] transition-colors">
              <span>Ir para a Loja na Shopee</span>
              <div className="w-7 h-7 rounded-full bg-[#FFF2ED] group-hover:bg-[#EE4D2D] group-hover:text-white flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* 3. Mercado Livre Oficial */}
          <a
            id="channel-mercadolivre"
            href={BRAND_CONFIG.mercadoLivreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-5 rounded-2xl bg-white border border-[#E2C799]/60 hover:border-[#D4AF37] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFFBE6] to-[#FFF0B3] border border-[#FFE270] flex items-center justify-center text-[#997A00] group-hover:scale-105 transition-transform">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#806600] bg-[#FFFBE6] px-2.5 py-0.5 rounded-full border border-[#FFE270] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#997A00]" />
                  Envio Full • 24h
                </span>
              </div>

              <h4 className="font-luxury text-lg font-bold text-[#1A1816] group-hover:text-[#997A00] transition-colors">
                Mercado Livre Oficial
              </h4>
              <p className="text-xs text-[#6B635A] mt-1 line-clamp-2">
                Compre com a garantia do Mercado Livre, entrega rápida no mesmo dia pelo Mercado Envios Full.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-bold text-[#1A1816] group-hover:text-[#997A00] transition-colors">
              <span>Ir para Mercado Livre Full</span>
              <div className="w-7 h-7 rounded-full bg-[#FFFBE6] group-hover:bg-[#E5B800] group-hover:text-[#1A1816] flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
