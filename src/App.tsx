/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { LimitedEditionSection } from './components/LimitedEditionSection';
import { PersonalizedResults } from './components/PersonalizedResults';
import { ClinicTourSection } from './components/ClinicTourSection';
import { OfficialChannelsBar } from './components/OfficialChannelsBar';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { SkinQuizModal } from './components/SkinQuizModal';
import { CartModal, CartItem } from './components/CartModal';
import { ClinicModal } from './components/ClinicModal';
import { SupabaseModal } from './components/SupabaseModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { ClientEntryScreen } from './components/ClientEntryScreen';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FloatingRobotChat } from './components/FloatingRobotChat';
import { PRODUCT_VARIATIONS, CLINIC_SPACES } from './data/content';
import { ProductVariation, ClinicSpace } from './types';

export default function App() {
  const [hasEnteredApp, setHasEnteredApp] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('LB_ENTERED_APP') === 'true';
    } catch {
      return false;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCT_VARIATIONS[0], quantity: 1 }
  ]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isOwnerOpen, setIsOwnerOpen] = useState(false);
  const [selectedClinicSpace, setSelectedClinicSpace] = useState<ClinicSpace | null>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleEnterApp = () => {
    setHasEnteredApp(true);
    try {
      sessionStorage.setItem('LB_ENTERED_APP', 'true');
    } catch {
      // ignore
    }
  };

  if (!hasEnteredApp) {
    return (
      <>
        <ClientEntryScreen onEnter={handleEnterApp} />
        <FloatingRobotChat />
      </>
    );
  }

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: ProductVariation) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#262422] flex flex-col selection:bg-[#E2C799]/50 selection:text-[#1A1816]">
      {/* Sticky Luxury Header */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        onScrollTo={handleScrollTo}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onBuyProduct={() => handleScrollTo('serum-product')}
          onViewClinic={() => handleScrollTo('clinic-tour')}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Elegant Official Channels: Instagram, Shopee & Mercado Livre */}
        <OfficialChannelsBar />

        {/* Hero Product: Sérum Facial Lopes Beautiflyur */}
        <ProductSection
          onAddToCart={handleAddToCart}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 2 Produtos Limitados e Especiais com Checkout Direto Stripe */}
        <LimitedEditionSection />

        {/* Personalized Results & Before/After */}
        <PersonalizedResults
          onOpenQuiz={() => setIsQuizOpen(true)}
          onBuyProduct={() => handleScrollTo('serum-product')}
        />

        {/* Clinic Tour & Environments */}
        <ClinicTourSection
          onSelectSpace={(space) => setSelectedClinicSpace(space)}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Instagram Feed & Social Community */}
        <InstagramSection />
      </main>

      {/* Luxury Footer with FAQs and Contact info */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenOwner={() => setIsOwnerOpen(true)}
      />

      {/* Interactive Skin Diagnostic Quiz Modal */}
      <SkinQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag & Express Checkout Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Clinic Space Detailed Lightbox Modal */}
      <ClinicModal
        space={selectedClinicSpace}
        onClose={() => setSelectedClinicSpace(null)}
        onSelectSpace={(space) => setSelectedClinicSpace(space)}
      />

      {/* Client VIP Portal (Gmail & Password Access) */}
      <ClientPortalModal
        isOpen={isClientOpen}
        onClose={() => setIsClientOpen(false)}
        onOpenQuiz={() => {
          setIsClientOpen(false);
          setIsQuizOpen(true);
        }}
        onOpenCart={() => {
          setIsClientOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Owner Restricted Access (Padlock Protected with 'lopes123') */}
      <OwnerDashboardModal
        isOpen={isOwnerOpen}
        onClose={() => setIsOwnerOpen(false)}
        onOpenSupabase={() => {
          setIsOwnerOpen(false);
          setIsSupabaseOpen(true);
        }}
      />

      {/* Supabase Connection & Data Management Modal */}
      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Floating Automated Robot Chat (n8n Webhook) */}
      <FloatingRobotChat />
    </div>
  );
}
