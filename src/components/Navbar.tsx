import React, { useState } from 'react';
import { Sparkles, MessageCircle, ShoppingBag, Menu, X, Instagram, MapPin, PackageCheck, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenCart: () => void;
  onOpenSupabase?: () => void;
  onOpenClient?: () => void;
  onOpenOwner?: () => void;
  cartCount: number;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenCart,
  onOpenSupabase,
  cartCount,
  onScrollTo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  const whatsappMessage = encodeURIComponent(
    'Olá! Vim pela landing page Lopes Beautiflyur e gostaria de informações sobre o Sérum Facial e tratamentos da clínica.'
  );
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E2C799]/30 transition-all duration-200">
      {/* Top Banner Bar with Channels Quick Access */}
      <div className="bg-[#1A1816] text-[#E8D39E] text-xs py-1.5 px-4 text-center tracking-wider flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#C4B7A5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          <span>Lojas Oficiais:</span>
          <a
            href={BRAND_CONFIG.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white underline transition-colors"
          >
            Shopee
          </a>
          <span>•</span>
          <a
            href={BRAND_CONFIG.mercadoLivreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white underline transition-colors"
          >
            Mercado Livre
          </a>
          <span>•</span>
          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white underline transition-colors"
          >
            Instagram
          </a>
        </div>

        <div className="mx-auto sm:mx-0 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Sérum Facial: 15% OFF com cupom BEAUTIFLYUR15
          </span>
          <button
            onClick={onOpenQuiz}
            className="hidden md:inline-block underline font-medium hover:text-[#FFFFFF] cursor-pointer"
          >
            Diagnóstico de Pele &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('hero')}
            className="cursor-pointer group flex flex-col justify-center"
            id="navbar-brand"
          >
            <div className="flex items-center gap-2">
              <span className="font-luxury text-2xl sm:text-3xl font-semibold tracking-wide text-[#1A1816] group-hover:text-[#9C7728] transition-colors">
                Lopes Beautiflyur
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block animate-pulse"></span>
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium">
              Clínica de Estética & Alta Cosmetologia
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#4A453E]">
            <button
              onClick={() => handleNavClick('serum-product')}
              className="hover:text-[#B8860B] transition-colors cursor-pointer py-1"
            >
              O Sérum Facial
            </button>
            <button
              onClick={() => handleNavClick('edicao-limitada')}
              className="hover:text-[#B8860B] transition-colors cursor-pointer py-1 flex items-center gap-1 font-semibold text-[#B8860B]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo Especial (Duo)
            </button>
            <button
              onClick={() => handleNavClick('personalized-results')}
              className="hover:text-[#B8860B] transition-colors cursor-pointer py-1"
            >
              Resultados Personalizados
            </button>
            <button
              onClick={() => handleNavClick('clinic-tour')}
              className="hover:text-[#B8860B] transition-colors cursor-pointer py-1"
            >
              A Clínica
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="hover:text-[#B8860B] transition-colors cursor-pointer py-1"
            >
              Depoimentos
            </button>
            <button
              onClick={() => handleNavClick('instagram-feed')}
              className="hover:text-[#B8860B] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4 text-[#B8860B]" />
              Instagram
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Skin Quiz CTA */}
            <button
              id="nav-quiz-button"
              onClick={onOpenQuiz}
              className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#7A5A18] bg-[#F7F3EB] hover:bg-[#EFE7D8] border border-[#E2C799]/60 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="hidden lg:inline">Diagnóstico</span>
            </button>

            {/* Cart Trigger */}
            <button
              id="nav-cart-button"
              onClick={onOpenCart}
              className="relative p-2.5 text-[#2C2926] hover:text-[#B8860B] bg-white border border-[#E2C799]/40 hover:border-[#B8860B] rounded-full transition-all cursor-pointer shadow-xs"
              title="Ver Sacola de Compras"
              aria-label="Ver sacola de compras"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Link */}
            <a
              id="nav-whatsapp-link"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Actions and Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#2C2926] bg-[#FAF8F5] border border-[#E2C799]/40 rounded-full"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="w-5 h-5 text-[#B8860B]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C2926] hover:bg-[#F5F2EC]"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2C799]/40 px-6 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-medium text-[#2C2926]">
            <button
              onClick={() => handleNavClick('serum-product')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#B8860B]"
            >
              O Sérum Facial Lopes Beautiflyur
            </button>
            <button
              onClick={() => handleNavClick('edicao-limitada')}
              className="text-left py-2 border-b border-[#F0EBE1] text-[#B8860B] font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              Catálogo Especial (2 Produtos Inclusos)
            </button>
            <button
              onClick={() => handleNavClick('personalized-results')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#B8860B]"
            >
              Resultados Personalizados
            </button>
            <button
              onClick={() => handleNavClick('clinic-tour')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#B8860B]"
            >
              Conhecer a Clínica
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#B8860B]"
            >
              Casos Reais & Depoimentos
            </button>
            <button
              onClick={() => handleNavClick('instagram-feed')}
              className="text-left py-2 border-b border-[#F0EBE1] hover:text-[#B8860B] flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-[#B8860B]" />
              Instagram Oficial ({BRAND_CONFIG.instagramHandle})
            </button>
          </div>

          {/* Official Marketplaces Quick Bar for Mobile */}
          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E2C799]/40 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A6317] block">
              Lojas Oficiais Autorizadas:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={BRAND_CONFIG.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white border border-[#FFD3C4] text-[11px] font-bold text-[#C0392B] flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#EE4D2D]" />
                  Shopee
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#EE4D2D]" />
              </a>

              <a
                href={BRAND_CONFIG.mercadoLivreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white border border-[#FFE785] text-[11px] font-bold text-[#806600] flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <PackageCheck className="w-3.5 h-3.5 text-[#997A00]" />
                  Mercado Livre
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#997A00]" />
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#7A5A18] bg-[#F7F3EB] border border-[#E2C799] rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              Fazer Diagnóstico de Pele Gratuito
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-button py-3 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp com a Clínica
            </a>

            <div className="pt-2 text-[11px] text-[#78726A] flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
              Jardins • São Paulo - SP
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
