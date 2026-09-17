import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS, BRAND_CONFIG } from '../data/content';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram-feed" className="py-20 bg-marble relative border-b border-[#E2C799]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E2C799] text-xs uppercase font-bold tracking-widest text-[#9C7728] shadow-xs">
              <Instagram className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Siga Nossos Bastidores</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl font-medium text-[#1A1816]">
              Acompanhe a Experiência no Instagram
            </h2>
            <p className="text-sm text-[#6B6359] font-light">
              Dicas diárias de skincare, procedimentos ao vivo na clínica e resultados das nossas clientes em {BRAND_CONFIG.instagramHandle}.
            </p>
          </div>

          <a
            id="instagram-follow-button"
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-button px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shrink-0 shadow-md transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir {BRAND_CONFIG.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Instagram Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2C799]/40 shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <div className="aspect-square overflow-hidden bg-[#F2EDE4] relative">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3 bg-[#1A1816]/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/20">
                  {post.type}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#1A1816]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-end">
                    <ExternalLink className="w-4 h-4 text-[#E8D39E]" />
                  </div>
                  
                  <p className="text-xs line-clamp-3 text-[#EDE8E1]">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#E8D39E] font-semibold pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[#E8D39E]" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Snippet */}
              <div className="p-3.5 bg-white">
                <div className="flex items-center justify-between text-[11px] text-[#786F64]">
                  <span className="font-semibold text-[#2C2926] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    {BRAND_CONFIG.instagramHandle}
                  </span>
                  <span>Ver post &rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
