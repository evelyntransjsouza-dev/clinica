import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, MessageCircle, ShoppingBag, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS, BRAND_CONFIG, PRODUCT_VARIATIONS } from '../data/content';
import { ProductVariation } from '../types';
import { supabaseService } from '../services/supabaseService';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductVariation) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);

      const isClar = updated['main-concern'] === 'spots';
      const recProd = isClar ? PRODUCT_VARIATIONS[1].name : PRODUCT_VARIATIONS[0].name;
      const recProt = isClar
        ? 'Clarity Peel & Renovação de Manchas'
        : updated['main-concern'] === 'aging'
        ? 'Bio-Lifting & Colágeno 5D'
        : 'Protocolo Ouro & Infusão Glow';

      // Gravar diagnóstico no Supabase
      supabaseService.saveSkinDiagnostic({
        skinType: updated['skin-type'] || 'Pele Normal/Mista',
        mainConcern: updated['main-concern'] || 'Luminosidade',
        recommendedFormula: recProd,
        recommendedProtocol: recProt,
        quizAnswers: updated,
      });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
  };

  // Determine recommendation based on answers
  const isClarifying = answers['main-concern'] === 'spots';
  const recommendedProduct = isClarifying
    ? PRODUCT_VARIATIONS[1] // Clareador & Renovação
    : PRODUCT_VARIATIONS[0]; // Glow & Bio-Peptídeos

  const clinicProtocolRecommended = isClarifying
    ? 'Clarity Peel & Renovação de Manchas'
    : answers['main-concern'] === 'aging'
    ? 'Bio-Lifting & Colágeno 5D'
    : 'Protocolo Ouro & Infusão Glow';

  const handleWhatsAppResults = () => {
    const text = encodeURIComponent(
      `Olá, Dra. Lopes! Fiz meu diagnóstico de pele no site Lopes Beautiflyur.\n` +
      `• Tipo de Pele: ${answers['skin-type'] || 'Não informado'}\n` +
      `• Objetivo Principal: ${answers['main-concern'] || 'Luminosidade'}\n` +
      `• Sérum Recomendado: ${recommendedProduct.name}\n` +
      `• Procedimento em Clínica: ${clinicProtocolRecommended}\n\n` +
      `Gostaria de agendar minha avaliação e tirar dúvidas sobre o Sérum!`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E2C799] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-marble p-6 border-b border-[#E2C799]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF5E8] flex items-center justify-center text-[#B8860B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-luxury text-xl font-bold text-[#1A1816]">
                Diagnóstico de Pele Lopes Beautiflyur
              </h3>
              <p className="text-xs text-[#7A7268]">
                {isFinished ? 'Seu Protocolo Sob Medida' : `Etapa ${currentStep + 1} de ${QUIZ_QUESTIONS.length}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7A7268] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="w-full bg-[#EFE9DF] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#DFC28A] to-[#B8860B] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              <div>
                <h4 className="font-luxury text-2xl font-semibold text-[#1A1816]">
                  {currentQuestion.question}
                </h4>
                <p className="text-xs text-[#6B6359] mt-1">
                  {currentQuestion.description}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                    className="w-full text-left p-4 rounded-2xl border border-[#EAE3D4] hover:border-[#B8860B] hover:bg-[#FAF6EE] transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-[#2C2926] group-hover:text-[#9C7728] transition-colors">
                        {option.label}
                      </div>
                      <div className="text-xs text-[#786F64] mt-0.5">
                        {option.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-block p-2 rounded-full bg-[#EBF7EE] text-[#2E7D32]">
                  <CheckCircle2 className="w-6 h-6" />
                </span>
                <h4 className="font-luxury text-2xl sm:text-3xl font-bold text-[#1A1816]">
                  Seu Protocolo Personalizado Está Pronto!
                </h4>
                <p className="text-xs text-[#6B635A]">
                  Combinamos a biologia da sua pele com a formulação ideal da nossa linha e tratamentos em cabine.
                </p>
              </div>

              {/* Recommendation Card */}
              <div className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#E2C799] space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9C7728] bg-[#FAF5E8] px-2.5 py-0.5 rounded-md border border-[#E2C799]/40">
                    Sérum Recomendado para Você
                  </span>
                  <h5 className="font-luxury text-xl font-bold text-[#1F1C18] mt-1.5">
                    {recommendedProduct.name}
                  </h5>
                  <p className="text-xs text-[#6B6359] mt-1">
                    {recommendedProduct.subtitle}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EAE3D4] text-xs space-y-1">
                  <div className="font-bold text-[#8A6317]">Procedimento Complementar na Clínica:</div>
                  <div className="text-[#3A352F] font-medium">{clinicProtocolRecommended}</div>
                  <div className="text-[11px] text-[#7A7268]">
                    Prepara a derme e multiplica a absorção dos bio-peptídeos e ácido hialurônico.
                  </div>
                </div>

                {/* Voucher Discount */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#FAF5E8] to-[#F5EAD4] border border-[#D4AF37]/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A6317] block">Cupom Especial de Diagnóstico</span>
                    <span className="font-mono text-sm font-bold text-[#1A1816]">BEAUTIFLYUR15</span>
                  </div>
                  <span className="text-xs font-bold text-[#B8860B] bg-white px-2 py-1 rounded-md shadow-xs">
                    15% OFF
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    onAddToCart(recommendedProduct);
                    onClose();
                  }}
                  className="w-full gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Comprar Sérum Recomendado (R$ {recommendedProduct.price.toFixed(2)})</span>
                </button>

                <button
                  onClick={handleWhatsAppResults}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1F1C18] bg-white border border-[#25D366] hover:bg-[#F0FAF3] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Conversar com a Esteta no WhatsApp com Meu Diagnóstico</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full text-center py-2 text-xs text-[#8A8277] hover:text-[#2C2926] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer Diagnóstico</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
