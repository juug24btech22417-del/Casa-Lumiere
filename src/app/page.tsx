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
import { LegalDocumentModal, type LegalDocumentKind } from '@/components/modals/LegalDocumentModal';
import { CookiePreferencesModal } from '@/components/modals/CookiePreferencesModal';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { ArchitecturalGrid } from '@/components/ui/ArchitecturalGrid';

// All three legal documents (Privacy, Terms, Security) render inline
// in the LegalDocumentModal — short, public-facing contracts, no form
// needed. The Cookie Policy still has its own preferences modal because
// it lets the user toggle actual cookie categories.
const DOCUMENT_LEGAL_KINDS: LegalDocumentKind[] = ['privacy', 'terms', 'security'];

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [legalDocument, setLegalDocument] = useState<LegalDocumentKind | null>(null);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const handleLegalClick = (kind: LegalKind) => {
    if (kind === 'cookies') {
      setIsCookieModalOpen(true);
    } else if (DOCUMENT_LEGAL_KINDS.includes(kind as LegalDocumentKind)) {
      setLegalDocument(kind as LegalDocumentKind);
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

      <LegalDocumentModal
        isOpen={legalDocument !== null}
        kind={legalDocument ?? 'privacy'}
        onClose={() => setLegalDocument(null)}
      />

      <CookiePreferencesModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
      />
    </main>
  );
}
