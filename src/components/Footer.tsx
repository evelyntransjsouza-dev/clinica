import React from 'react';
import { Sparkles, Instagram, MessageCircle, MapPin, Mail, Clock, ShieldCheck, Heart, ShoppingBag, PackageCheck, ArrowUpRight, Lock, Bot } from 'lucide-react';
import { BRAND_CONFIG, FAQS, ROBOT_CHAT_WEBHOOK_URL } from '../data/content';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenQuiz: () => void;
  onOpenSupabase?: () => void;
  onOpenClient?: () => void;
  onOpenOwner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onScrollTo, 
  onOpenQuiz, 
  onOpenOwner
}) => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com a equipe Lopes Beautiflyur.'
  )}`;

  return (
    <footer className="bg-[#171513] text-[#D3CCC4] pt-16 pb-12 border-t border-[#D4AF37]/30">
      
      {/* FAQ Section Inside Footer Area for Trust & Clarity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#2D2823]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#DFC28A]">
            Dúvidas Frequentes
          </span>
          <h3 className="font-luxury text-2xl sm:text-3xl font-medium text-white">
            Perguntas & Respostas sobre o Sérum e a Clínica
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#211E1B] border border-[#3A332B] space-y-2"
            >
              <h4 className="text-sm font-bold text-[#E8D39E]">
                {faq.question}
              </h4>
              <p className="text-xs text-[#ABA094] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="font-luxury text-2xl font-bold text-white tracking-wide">
                Lopes Beautiflyur
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#DFC28A]">
                Clínica & Alta Cosmetologia
              </p>
            </div>
            <p className="text-xs text-[#9E9487] leading-relaxed">
              O ponto de encontro entre procedimentos estéticos personalizados de padrão ouro e a eficácia regenerativa diária do nosso Sérum Facial exclusivo.
            </p>
            <div className="pt-2 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFC28A] block">
                Canais & Lojas Oficiais:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  id="footer-instagram-link"
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#2B2620] hover:bg-[#D4AF37] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#3A332B]"
                  title="Instagram Lopes Beautiflyur"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  id="footer-shopee-link"
                  href={BRAND_CONFIG.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#2B2620] hover:bg-[#EE4D2D] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#3A332B]"
                  title="Shopee Oficial Lopes Beautiflyur"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shopee</span>
                </a>
                <a
                  id="footer-mercadolivre-link"
                  href={BRAND_CONFIG.mercadoLivreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#2B2620] hover:bg-[#D4AF37] hover:text-[#171513] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#3A332B]"
                  title="Mercado Livre Oficial Lopes Beautiflyur"
                >
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>Mercado Livre</span>
                </a>
                <a
                  id="footer-whatsapp-link"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="WhatsApp Lopes Beautiflyur"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  id="footer-assistant-chat-link"
                  href={ROBOT_CHAT_WEBHOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#2B2620] hover:bg-[#DFC28A] hover:text-[#171513] text-[#DFC28A] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#DFC28A]/40"
                  title="Chat com Rafaela, sua assistente virtual"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rafaela • Assistente Virtual</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC28A]">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li>
                <button
                  onClick={() => onScrollTo('serum-product')}
                  className="hover:text-[#DFC28A] transition-colors cursor-pointer"
                >
                  Sérum Facial Lopes Beautiflyur
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('personalized-results')}
                  className="hover:text-[#DFC28A] transition-colors cursor-pointer"
                >
                  Resultados Personalizados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('clinic-tour')}
                  className="hover:text-[#DFC28A] transition-colors cursor-pointer"
                >
                  Ambientes da Clínica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('testimonials')}
                  className="hover:text-[#DFC28A] transition-colors cursor-pointer"
                >
                  Casos de Pacientes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-[#DFC28A] transition-colors cursor-pointer flex items-center gap-1 text-[#DFC28A]"
                >
                  <Sparkles className="w-3 h-3" />
                  Diagnóstico de Pele Gratuito
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="space-y-3 text-xs text-[#B5ABA0]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC28A]">
              Atendimento & Visitas
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFC28A] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DFC28A] shrink-0" />
                <span>Seg a Sex: 08h às 20h | Sáb: 09h às 16h</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DFC28A] shrink-0" />
                <span>{BRAND_CONFIG.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-semibold"
                >
                  {BRAND_CONFIG.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Safety & Medical Responsibility */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC28A]">
              Garantia & Biossegurança
            </h4>
            <p className="text-xs text-[#8C8376] leading-relaxed">
              {BRAND_CONFIG.crmv}. Produtos notificados na ANVISA, formulados sem parabenos e livres de crueldade animal.
            </p>
            <div className="p-3 rounded-xl bg-[#211E1A] border border-[#3D352B] text-[11px] text-[#A69C90] space-y-1">
              <div className="flex items-center gap-1.5 text-[#DFC28A] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantia de Satisfação</span>
              </div>
              <p>
                Experimente o Sérum por 30 dias. Se sua pele não demonstrar mais viço e hidratação, devolvemos 100% do valor.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2B2620] flex flex-col sm:flex-row items-center justify-between text-xs text-[#786F64] gap-4">
          <p>© {new Date().getFullYear()} Lopes Beautiflyur. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram @lopesbeautiflyur
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp Concierge
            </a>
            <button
              onClick={onOpenOwner}
              className="flex items-center gap-1 text-[#8C8377] hover:text-[#DFC28A] transition-colors cursor-pointer"
              title="Termos & Privacidade"
            >
              <Lock className="w-3 h-3 opacity-60 hover:opacity-100 text-[#DFC28A]" />
              <span>Termos & Privacidade</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
