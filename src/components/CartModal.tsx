import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, 
  Truck, ArrowRight, CheckCircle2, MessageCircle, CreditCard, QrCode,
  PackageCheck, ArrowUpRight 
} from 'lucide-react';
import { ProductVariation } from '../types';
import { BRAND_CONFIG, SERUM_HERO_IMAGE } from '../data/content';
import { supabaseService } from '../services/supabaseService';
import { authService } from '../services/authService';

export interface CartItem {
  product: ProductVariation;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('BEAUTIFLYUR15');
  const [couponApplied, setCouponApplied] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = couponApplied ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'BEAUTIFLYUR15') {
      setCouponApplied(true);
    } else {
      alert('Cupom inválido. Tente usar "BEAUTIFLYUR15" para 15% de desconto!');
    }
  };

  const handleFinalizeOnline = async () => {
    const randomOrder = 'LB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setCheckoutStep('success');

    const currentClient = authService.getCurrentClient();
    const customerName = currentClient ? currentClient.name : 'Cliente VIP Online';
    const customerPhone = currentClient?.phone || '(11) 99999-0000';

    // Salvar pedido no Supabase
    await supabaseService.saveOrder({
      orderNumber: randomOrder,
      customerName,
      customerPhone,
      items: items.map((it) => ({
        id: it.product.id,
        name: it.product.name,
        volume: it.product.volume || '30ml',
        price: it.product.price,
        quantity: it.quantity,
      })),
      subtotal,
      discountAmount,
      couponUsed: couponApplied ? 'BEAUTIFLYUR15' : undefined,
      total,
      paymentMethod: paymentMethod === 'pix' ? 'Pix Instantâneo' : 'Cartão de Crédito',
      notes: currentClient ? `Cliente: ${currentClient.email}` : 'Pedido gerado via checkout da landing page',
    });
  };

  const handleWhatsAppCheckout = async () => {
    const randomOrder = 'LB-' + Math.floor(100000 + Math.random() * 900000);

    const currentClient = authService.getCurrentClient();
    const customerName = currentClient ? currentClient.name : 'Cliente WhatsApp';
    const customerPhone = currentClient?.phone || '(11) 99999-0000';

    // Salvar pedido no Supabase
    await supabaseService.saveOrder({
      orderNumber: randomOrder,
      customerName,
      customerPhone,
      items: items.map((it) => ({
        id: it.product.id,
        name: it.product.name,
        volume: it.product.volume || '30ml',
        price: it.product.price,
        quantity: it.quantity,
      })),
      subtotal,
      discountAmount,
      couponUsed: couponApplied ? 'BEAUTIFLYUR15' : undefined,
      total,
      paymentMethod: 'WhatsApp Concierge',
      notes: currentClient ? `Cliente: ${currentClient.email}` : 'Pedido direcionado ao WhatsApp da clínica',
    });

    const itemsText = items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} (R$ ${(item.product.price * item.quantity).toFixed(2)})`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Olá! Gostaria de finalizar meu pedido do Sérum Lopes Beautiflyur (Pedido #${randomOrder}):\n\n` +
      `${itemsText}\n\n` +
      `Subtotal: R$ ${subtotal.toFixed(2)}\n` +
      (couponApplied ? `Desconto 15% (BEAUTIFLYUR15): -R$ ${discountAmount.toFixed(2)}\n` : '') +
      `Total: R$ ${total.toFixed(2)} (Frete Grátis)\n\n` +
      `Poderia me enviar a chave Pix ou link de pagamento?`
    );

    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'success') {
      onClearCart();
      setCheckoutStep('cart');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2C799] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-marble p-5 border-b border-[#E2C799]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-luxury text-xl font-bold text-[#1A1816]">
                Sua Sacola de Skincare
              </h3>
              <p className="text-xs text-[#7A7268]">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="p-2 rounded-full text-[#7A7268] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {checkoutStep === 'success' ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#E8F8EE] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-luxury text-2xl sm:text-3xl font-bold text-[#1A1816]">
                Pedido Realizado com Sucesso!
              </h4>
              <p className="text-xs text-[#6B635A] max-w-sm mx-auto leading-relaxed">
                Seu pedido <strong className="text-[#1A1816] font-mono">{orderNumber}</strong> foi registrado na clínica. 
                Nossa concierge entrará em contato via WhatsApp com o código de rastreamento do envio expresso.
              </p>

              <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#E2C799]/60 text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#7E7569]">Total:</span>
                  <span className="font-bold text-[#1A1816]">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7E7569]">Frete:</span>
                  <span className="text-[#2E7D32] font-semibold">Grátis para Todo o Brasil</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7E7569]">Prazo Estimado:</span>
                  <span className="font-medium text-[#1A1816]">2 a 4 dias úteis</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCloseAndReset}
                  className="w-full gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Concluir & Continuar Navegando
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-[#FAF5E8] rounded-full flex items-center justify-center mx-auto text-[#B8860B]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-luxury text-xl font-medium text-[#1A1816]">
                Sua sacola está vazia
              </h4>
              <p className="text-xs text-[#7A7268] max-w-xs mx-auto">
                Adicione o Sérum Facial Lopes Beautiflyur para iniciar sua transformação de pele.
              </p>
              <button
                onClick={onClose}
                className="gold-button px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Ver Produtos
              </button>
            </div>
          ) : (
            /* Cart Items List & Form */
            <div className="space-y-6">
              {/* Item List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-[#FCFAF7] border border-[#EAE3D4] flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F2EDE4] shrink-0">
                      <img
                        src={SERUM_HERO_IMAGE}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-[#1F1C18] truncate">
                        {item.product.name}
                      </h5>
                      <span className="text-[11px] text-[#8C8377] block">
                        {item.product.volume}
                      </span>
                      <div className="text-xs font-bold text-[#9C7728] mt-1">
                        R$ {item.product.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#A3998C] hover:text-[#D32F2F] p-1 cursor-pointer transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-[#D5CABB] rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#555047] hover:bg-[#F5F2EB] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1F1C18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#555047] hover:bg-[#F5F2EB] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cupom de Desconto"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-[#D5CABB] rounded-xl focus:outline-hidden focus:border-[#B8860B] uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF5E8] hover:bg-[#F2E9D4] border border-[#E2C799] text-[#8A6317] text-xs font-bold rounded-xl uppercase transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {couponApplied && (
                <div className="p-2 rounded-lg bg-[#EBF7EE] border border-[#A5D6A7] text-[11px] text-[#2E7D32] flex items-center justify-between font-medium">
                  <span>✓ Cupom BEAUTIFLYUR15 aplicado (15% OFF)</span>
                  <button
                    onClick={() => setCouponApplied(false)}
                    className="text-[#689F38] underline text-[10px] cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              )}

              {/* Totals Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D4] text-xs space-y-2">
                <div className="flex justify-between text-[#685F54]">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#2E7D32] font-medium">
                    <span>Desconto Especial (15%):</span>
                    <span>- R$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#685F54]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Frete Expresso:</span>
                  </span>
                  <span className="text-[#2E7D32] font-semibold">GRÁTIS</span>
                </div>
                <div className="border-t border-[#E2D8C7] pt-2 flex justify-between text-sm font-bold text-[#1F1C18]">
                  <span>Total a Pagar:</span>
                  <span className="font-luxury text-xl text-[#9C7728]">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <div className="text-[10px] text-[#7E766B] text-right">
                  ou em até 6x de R$ {(total / 6).toFixed(2)} sem juros
                </div>
              </div>

              {/* Payment Methods Choice */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A7268] block">
                  Escolha como prefere finalizar:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-[#B8860B] bg-[#FAF5E8] text-[#8A6317]'
                        : 'border-[#EAE3D4] bg-white text-[#555047]'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Pix Instantâneo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'cartao'
                        ? 'border-[#B8860B] bg-[#FAF5E8] text-[#8A6317]'
                        : 'border-[#EAE3D4] bg-white text-[#555047]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleFinalizeOnline}
                  className="w-full gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Finalizar Compra Segura • R$ {total.toFixed(2)}</span>
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1F1C18] bg-white border border-[#25D366] hover:bg-[#F0FAF3] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Finalizar Direto pelo WhatsApp</span>
                </button>
              </div>

              {/* Alternative Official Stores */}
              <div className="pt-2 border-t border-[#EAE3D4] space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A6317] block text-center">
                  Prefere comprar em lojas oficiais parceiras?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={BRAND_CONFIG.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#FFF6F3] border border-[#FFD3C4] hover:border-[#EE4D2D] text-[11px] font-bold text-[#C0392B] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#EE4D2D]" />
                      Shopee Oficial
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#EE4D2D]" />
                  </a>

                  <a
                    href={BRAND_CONFIG.mercadoLivreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#FFFDF0] border border-[#FFE785] hover:border-[#D4AF37] text-[11px] font-bold text-[#806600] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <PackageCheck className="w-3.5 h-3.5 text-[#997A00]" />
                      Mercado Livre
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#997A00]" />
                  </a>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-[#8A8277] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                  Ambiente Criptografado
                </span>
                <span>•</span>
                <span>Anvisa Grau II</span>
                <span>•</span>
                <span>Garantia 30 Dias</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
