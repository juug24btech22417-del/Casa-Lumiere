"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';
import { TrustBanner } from '@/components/sections/TrustBanner';
import { PlotExplorer } from '@/components/sections/PlotExplorer';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { Footer, type LegalKind } from '@/components/layout/Footer';
import { AIAssistant } from '@/components/chat/AIAssistant';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { AppDock } from '@/components/ui/AppDock';
import { BookingModal } from '@/components/sections/BookingModal';
import { LegalRequestModal, type LegalRequestKind } from '@/components/modals/LegalRequestModal';
import { CookiePreferencesModal } from '@/components/modals/CookiePreferencesModal';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { ArchitecturalGrid } from '@/components/ui/ArchitecturalGrid';

const LEGAL_KINDS: LegalRequestKind[] = ['privacy', 'terms', 'security'];

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [legalRequest, setLegalRequest] = useState<LegalRequestKind | null>(null);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const handleLegalClick = (kind: LegalKind) => {
    if (kind === 'cookies') {
      setIsCookieModalOpen(true);
    } else if (LEGAL_KINDS.includes(kind as LegalRequestKind)) {
      setLegalRequest(kind as LegalRequestKind);
    }
  };

  return (
    <main className="relative min-h-screen bg-deep-forest overflow-x-hidden">
      <Navbar onContactClick={openBooking} />

      <SmoothScroll>
        <div className="relative w-full">
          <ArchitecturalGrid />
          <Hero onExploreClick={() => document.getElementById('plots')?.scrollIntoView({ behavior: 'smooth' })} />
          <StatsBar />
          <TrustBanner />
          <PlotExplorer />
          <WhyChooseUs />
          <Testimonials />
          <Footer onLegalClick={handleLegalClick} />
        </div>
      </SmoothScroll>

      {/* Floating UI elements (rendered outside scroll translating container) */}
      <AIAssistant />
      <WhatsAppButton />
      <AppDock />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        plotNumber="General Inquiry"
      />

      <LegalRequestModal
        isOpen={legalRequest !== null}
        kind={legalRequest ?? 'privacy'}
        onClose={() => setLegalRequest(null)}
      />

      <CookiePreferencesModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
      />
    </main>
  );
}
