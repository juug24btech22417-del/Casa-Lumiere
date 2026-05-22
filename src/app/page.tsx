"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';
import { TrustBanner } from '@/components/sections/TrustBanner';
import { PlotExplorer } from '@/components/sections/PlotExplorer';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { Footer } from '@/components/layout/Footer';
import { AIAssistant } from '@/components/chat/AIAssistant';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { AppDock } from '@/components/ui/AppDock';
import { BookingModal } from '@/components/sections/BookingModal';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);

  return (
    <main className="relative min-h-screen bg-deep-forest overflow-x-hidden">
      <Navbar onContactClick={openBooking} />
      
      <SmoothScroll>
        <Hero onExploreClick={() => document.getElementById('plots')?.scrollIntoView({ behavior: 'smooth' })} />
        <StatsBar />
        <TrustBanner />
        <PlotExplorer />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
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
    </main>
  );
}
