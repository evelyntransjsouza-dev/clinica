import React, { useState } from 'react';
import { Sparkles, Star, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { TESTIMONIALS, BRAND_CONFIG } from '../data/content';

interface PersonalizedResultsProps {
  onOpenQuiz: () => void;
  onBuyProduct: () => void;
}

export const PersonalizedResults: React.FC<PersonalizedResultsProps> = ({
  onOpenQuiz,
  onBuyProduct,
}) => {
  const [selectedCase, setSelectedCase] = useState(0);
  const currentCase = TESTIMONIALS[selectedCase];

  return (
    <section id="personalized-results" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E2C799]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#E2C799] text-xs uppercase font-bold tracking-widest text-[#9C7728]">
            <TrendingUp className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Casos Clínicos & Eficácia Comprovada</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
            Resultados Personalizados com a Nossa Linha Própria
          </h2>
          <p className="text-base text-[#615A52] font-light">
            Não acreditamos em fórmulas genéricas. Cada pele recebe um plano exclusivo que associa
            a dosagem exata do <strong className="text-[#1F1C18] font-semibold">Sérum Facial Lopes Beautiflyur</strong> aos protocolos em cabine.
          </p>
        </div>

        {/* Clinical Evolution Timeline */}
        <div className="mb-16 bg-gradient-to-r from-[#FAF8F5] via-[#FFF] to-[#FAF8F5] p-6 sm:p-10 rounded-3xl border border-[#E2C799]/40 shadow-sm">
          <h3 className="font-luxury text-xl sm:text-2xl font-bold text-center text-[#1A1816] mb-8">
            Cronograma da Transformação Cutânea
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs relative">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#FAF5E8] text-[#8E6A21] px-2.5 py-1 rounded-full border border-[#E2C799]/50 inline-block mb-3">
                Dias 1 a 7 • Fase 1
              </span>
              <h4 className="font-luxury text-lg font-bold text-[#1F1C18]">Restauração & Barreira</h4>
              <p className="text-xs text-[#635B51] mt-2 leading-relaxed">
                O Ácido Hialurônico 5D penetra nas camadas profundas, cessando a sensação de repuxamento e criando uma película protetora sedosa contra agressões urbanas.
              </p>
              <div className="mt-4 text-xs font-semibold text-[#B8860B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>+98% hidratação dérmica</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#B8860B]/40 shadow-xs relative ring-1 ring-[#B8860B]/15">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#B8860B] text-white px-2.5 py-1 rounded-full inline-block mb-3">
                Dias 8 a 14 • Fase 2
              </span>
              <h4 className="font-luxury text-lg font-bold text-[#1F1C18]">Luminosidade & Ouro 24K</h4>
              <p className="text-xs text-[#635B51] mt-2 leading-relaxed">
                As micropartículas de ouro e a Niacinamida purificada uniformizam micro-despigmentações e revelam um glow saudável radiante, atenuando sinais de fadiga.
              </p>
              <div className="mt-4 text-xs font-semibold text-[#B8860B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>+94% viço natural visível</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs relative">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#FAF5E8] text-[#8E6A21] px-2.5 py-1 rounded-full border border-[#E2C799]/50 inline-block mb-3">
                Dias 15 a 28 • Fase 3
              </span>
              <h4 className="font-luxury text-lg font-bold text-[#1F1C18]">Bio-Lifting & Densidade</h4>
              <p className="text-xs text-[#635B51] mt-2 leading-relaxed">
                Os Bio-Peptídeos tensores estimulam os fibroblastos a sintetizar novo colágeno tipo I e elastina, redefinindo o contorno facial e suavizando linhas de expressão.
              </p>
              <div className="mt-4 text-xs font-semibold text-[#B8860B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>+89% sustentação e firmeza</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonials Spotlight */}
        <div id="testimonials" className="bg-[#FAF8F5] rounded-3xl border border-[#E2C799]/50 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Client Avatar & Real Story Details */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="relative inline-block">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md mx-auto lg:mx-0">
                  <img
                    src={currentCase.image}
                    alt={currentCase.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-1 right-1 bg-[#2E7D32] text-white p-1 rounded-full shadow-xs" title="Paciente Verificada">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-luxury text-2xl font-bold text-[#1A1816]">
                  {currentCase.name}
                </h3>
                <p className="text-xs text-[#827A70] mt-0.5">
                  {currentCase.age} anos • {currentCase.treatment}
                </p>
                <p className="text-xs font-semibold text-[#9C7728] mt-1">
                  {currentCase.serumUsage}
                </p>
              </div>

              {/* Verified Metric Pill */}
              <div className="p-3 rounded-xl bg-white border border-[#E2C799]/40 shadow-xs inline-block">
                <span className="text-[11px] text-[#786F64] block">{currentCase.metrics.label}</span>
                <span className="font-luxury text-2xl font-bold text-[#9C7728]">{currentCase.metrics.value}</span>
              </div>

              {/* Selector Tabs */}
              <div className="pt-2 flex lg:flex-col gap-2 justify-center lg:justify-start">
                {TESTIMONIALS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCase(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                      selectedCase === idx
                        ? 'bg-[#1A1816] text-[#E8D39E]'
                        : 'bg-white text-[#524B43] hover:bg-[#F2ECE1] border border-[#E2C799]/40'
                    }`}
                  >
                    {item.name.split(' ')[0]} ({item.timeframe})
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: In-depth Testimonial Quote & Medical Feedback */}
            <div className="lg:col-span-8 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2C799]/40 shadow-sm">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
                <span className="text-xs font-bold text-[#1F1C18] ml-2">5.0 de Avaliação Clínica</span>
              </div>

              <blockquote className="text-base sm:text-lg text-[#3A352F] italic font-serif leading-relaxed">
                "{currentCase.quote}"
              </blockquote>

              <div className="p-4 rounded-xl bg-[#FAF6ED] border-l-4 border-[#B8860B] space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A6317]">
                  Avaliação do Scanner Dermatológico 3D:
                </span>
                <p className="text-xs text-[#524B43]">
                  {currentCase.beforeAfterDescription}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onBuyProduct}
                  className="gold-button px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span>Quero Esse Resultado • Comprar Sérum</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#7A5A18] bg-[#F7F3EB] hover:bg-[#EFE7D8] border border-[#E2C799] transition-all cursor-pointer"
                >
                  Montar Meu Protocolo Sob Medida
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
