"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DroneVideo } from '@/components/ui/DroneVideo';

export const DroneTour = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Aerial Footage</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            Drone <span className="text-gold-gradient">Tour</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            Experience the estate from above before you visit.
          </p>
        </ScrollReveal>

        {/* Live drone capture — Banashri Enclave aerial video */}
        <DroneVideo
          src="/banashri-drone.mp4"
          caption="Drone Capture"
          showBadge
          aspect="16/9"
          hasAudio
        />
      </div>
    </section>
  );
};
