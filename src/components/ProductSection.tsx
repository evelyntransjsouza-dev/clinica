import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Truck, RefreshCw, 
  MessageCircle, ShoppingBag, Droplets, Zap, Heart, Star,
  PackageCheck, ArrowUpRight, Instagram
} from 'lucide-react';
import { PRODUCT_VARIATIONS, BRAND_CONFIG, SERUM_HERO_IMAGE } from '../data/content';
import { ProductVariation } from '../types';

interface ProductSectionProps {
  onAddToCart: (product: ProductVariation) => void;
  onOpenQuiz: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onAddToCart,
  onOpenQuiz,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductVariation>(PRODUCT_VARIATIONS[0]);
  const [activeTab, setActiveTab] = useState<'ativos' | 'como-usar' | 'estudos'>('ativos');

  const handleBuyWhatsApp = (product: ProductVariation) => {
    const text = encodeURIComponent(
      `Olá! Desejo comprar o "${product.name}" (R$ ${product.price.toFixed(2)}) da linha Lopes Beautiflyur. Pode me orientar com o pagamento e entrega?`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="serum-product" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E2C799]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#E2C799] text-xs uppercase font-bold tracking-widest text-[#9C7728]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Produto Estrela da Nossa Linha Própria</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
            Sérum Facial Lopes Beautiflyur
          </h2>
          <p className="text-base text-[#615A52] font-light">
            Formulado em laboratório clínico para quem não abre mão de sofisticação e eficácia comprovada.
            A textura líquida-aveludada que potencializa os tratamentos em cabine e transforma sua rotina diária em casa.
          </p>
        </div>

        {/* Main Product Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Product Images & Visual Proof */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF8F5] to-[#F1EDE4] border border-[#E2C799]/50 p-6 sm:p-10 shadow-lg text-center">
              
              {/* Product Badge */}
              <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#8E6A21] border border-[#E2C799] flex items-center gap-1.5 shadow-xs">
                <Star className="w-3.5 h-3.5 text-[#B8860B] fill-[#B8860B]" />
                <span>Alta Cosmetologia</span>
              </div>

              {/* High-res Hero Serum Photo */}
              <div className="relative max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-md">
                <img
                  src={SERUM_HERO_IMAGE}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Clinical Verification Strip */}
              <div className="mt-8 grid grid-cols-3 gap-3 text-center border-t border-[#E5DEC9] pt-6">
                <div className="p-2 rounded-xl bg-white/70">
                  <div className="font-luxury text-2xl font-bold text-[#9C7728]">98%</div>
                  <div className="text-[11px] font-medium text-[#6E665C]">Hidratação Dérmica 24h</div>
                </div>
                <div className="p-2 rounded-xl bg-white/70">
                  <div className="font-luxury text-2xl font-bold text-[#9C7728]">94%</div>
                  <div className="text-[11px] font-medium text-[#6E665C]">Mais Luminosidade & Viço</div>
                </div>
                <div className="p-2 rounded-xl bg-white/70">
                  <div className="font-luxury text-2xl font-bold text-[#9C7728]">89%</div>
                  <div className="text-[11px] font-medium text-[#6E665C]">Atenuação de Rugas Finas</div>
                </div>
              </div>
            </div>

            {/* Need Help Choosing? Quiz Trigger Callout */}
            <div className="p-5 rounded-2xl bg-marble-card border border-[#E2C799] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B] shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2C2926]">Dúvida sobre a sua versão ideal?</h4>
                  <p className="text-xs text-[#6B6359]">Responda 3 perguntas rápidas e receba a prescrição precisa.</p>
                </div>
              </div>
              <button
                onClick={onOpenQuiz}
                className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#7A5A18] bg-white border border-[#E2C799] hover:bg-[#FAF6EE] transition-all cursor-pointer"
              >
                Fazer Quiz Grátis
              </button>
            </div>

          </div>

          {/* Right: Product Selector & Purchase Details */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Variation Selector Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#7E7569]">
                <span>Escolha sua Versão ou Kit:</span>
                <span className="text-[#B8860B]">3 Opções Disponíveis</span>
              </div>

              <div className="space-y-2.5">
                {PRODUCT_VARIATIONS.map((product) => {
                  const isSelected = selectedProduct.id === product.id;
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#B8860B] bg-[#FCFAF6] shadow-sm ring-1 ring-[#B8860B]/20'
                          : 'border-[#EAE3D4] bg-white hover:border-[#D4AF37]/60'
                      }`}
                    >
                      {product.tag && (
                        <span className="absolute -top-2.5 right-4 bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                          {product.tag}
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#B8860B] bg-[#B8860B]' : 'border-[#C2B7A8]'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-[#1F1C18]">{product.name}</h3>
                            <p className="text-xs text-[#6B635A] mt-0.5">{product.subtitle}</p>
                            <span className="inline-block mt-1 text-[11px] text-[#9C7728] font-medium bg-[#FAF4E6] px-2 py-0.5 rounded-md">
                              {product.volume} • Ideal: {product.idealFor}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs text-[#9E9588] line-through block">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-base font-bold text-[#1F1C18]">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-[#2E7D32] block font-semibold">
                            ou 3x de R$ {(product.price / 3).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Key Formula Bullets */}
            <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E2C799]/40 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8A6317]">
                Destaques da Fórmula Exclusiva:
              </span>
              <ul className="space-y-1.5 text-xs text-[#524C44]">
                {selectedProduct.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons: Add to Cart & Buy on WhatsApp */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="add-to-cart-button"
                  onClick={() => onAddToCart(selectedProduct)}
                  className="gold-button py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Comprar Agora • R$ {selectedProduct.price.toFixed(2)}</span>
                </button>

                <button
                  id="buy-whatsapp-button"
                  onClick={() => handleBuyWhatsApp(selectedProduct)}
                  className="py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1F1C18] bg-white border border-[#25D366] hover:bg-[#E8F8EE] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Comprar pelo WhatsApp</span>
                </button>
              </div>

              {/* Official Marketplaces & Social Links - Elegant Selector */}
              <div className="p-3.5 rounded-2xl bg-[#FCFAF7] border border-[#E8DEC9] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6317] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    Prefere Comprar nos Marketplaces Oficiais?
                  </span>
                  <span className="text-[10px] text-[#2E7D32] font-semibold bg-[#EBF7EE] px-2 py-0.5 rounded-md">
                    Lojas 100% Verificadas
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    id="product-btn-shopee"
                    href={BRAND_CONFIG.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white hover:bg-[#FFF6F3] border border-[#FFD3C4] hover:border-[#EE4D2D] transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#FFF0EC] flex items-center justify-center text-[#EE4D2D]">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2C2926] group-hover:text-[#C0392B]">
                          Shopee Oficial
                        </div>
                        <div className="text-[10px] text-[#8C8377]">
                          Cupons & Frete Shopee
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#EE4D2D] group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    id="product-btn-mercadolivre"
                    href={BRAND_CONFIG.mercadoLivreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white hover:bg-[#FFFDF0] border border-[#FFE785] hover:border-[#D4AF37] transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#FFFBE6] flex items-center justify-center text-[#997A00]">
                        <PackageCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2C2926] group-hover:text-[#806600]">
                          Mercado Livre
                        </div>
                        <div className="text-[10px] text-[#8C8377]">
                          Envio Full • 24 horas
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#997A00] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-[#7A7268]">
                  <span>Quer ver a textura e antes & depois?</span>
                  <a
                    href={BRAND_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9C7728] hover:text-[#5B410D] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Instagram className="w-3 h-3 text-[#B8860B]" />
                    Ver no Instagram
                  </a>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-[#786F64] pt-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Frete Grátis Brasil</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Garantia 30 Dias</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Cruelty-Free / Vegano</span>
                </div>
              </div>
            </div>

            {/* Expandable Tabs: Ativos, Como Usar, Estudos Clínicos */}
            <div className="border-t border-[#EAE3D4] pt-4">
              <div className="flex border-b border-[#EAE3D4] text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('ativos')}
                  className={`pb-2 mr-6 transition-all border-b-2 cursor-pointer ${
                    activeTab === 'ativos'
                      ? 'border-[#B8860B] text-[#9C7728]'
                      : 'border-transparent text-[#7D756A] hover:text-[#2C2926]'
                  }`}
                >
                  Ativos & Alquimia
                </button>
                <button
                  onClick={() => setActiveTab('como-usar')}
                  className={`pb-2 mr-6 transition-all border-b-2 cursor-pointer ${
                    activeTab === 'como-usar'
                      ? 'border-[#B8860B] text-[#9C7728]'
                      : 'border-transparent text-[#7D756A] hover:text-[#2C2926]'
                  }`}
                >
                  Ritual de Aplicação
                </button>
                <button
                  onClick={() => setActiveTab('estudos')}
                  className={`pb-2 transition-all border-b-2 cursor-pointer ${
                    activeTab === 'estudos'
                      ? 'border-[#B8860B] text-[#9C7728]'
                      : 'border-transparent text-[#7D756A] hover:text-[#2C2926]'
                  }`}
                >
                  Associação com a Clínica
                </button>
              </div>

              <div className="pt-3 text-xs text-[#635B51] leading-relaxed">
                {activeTab === 'ativos' && (
                  <p>
                    A fórmula integra <strong>Ácido Hialurônico 5D</strong> (com partículas de altíssimo e baixíssimo peso molecular que agem desde a epiderme até a derme reticular), estabilizado com <strong>Bio-Peptídeos de Cobre</strong> e micropartículas de <strong>Ouro 24K</strong> que aumentam em até 70% a permeação celular dos nutrientes essenciais.
                  </p>
                )}
                {activeTab === 'como-usar' && (
                  <p>
                    <strong>Manhã:</strong> Aplique de 3 a 4 gotas no rosto limpo e seco, espalhando em movimentos ascendentes até completa absorção. Finalize com protetor solar. <br />
                    <strong>Noite:</strong> Aplique 4 a 5 gotas no rosto, pescoço e colo após o banho para reparação noturna profunda.
                  </p>
                )}
                {activeTab === 'estudos' && (
                  <p>
                    Pacientes da clínica que realizaram procedimentos a laser, ultraformer ou peelings e continuaram o tratamento em casa com o <strong>Sérum Lopes Beautiflyur</strong> apresentaram tempo de recuperação 40% menor e retenção de colágeno até 3x mais prolongada em avaliações de scanner 3D.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
