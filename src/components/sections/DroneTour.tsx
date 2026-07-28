"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DroneVideo } from '@/components/ui/DroneVideo';
import { useLocale } from '@/lib/LocaleContext';

export const DroneTour = () => {
  const { t } = useLocale();
  return (
    <section className="pt-2 md:pt-2 md:pb-28 relative overflow-hidden pb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">{t('drone_aerial_footage')}</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            {t('drone_tour_headline_pre')} <span className="text-gold-gradient">{t('drone_tour_headline_accent')}</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            {t('drone_tour_subtitle')}
          </p>
        </ScrollReveal>

        {/* Live drone capture — Banashri Enclave aerial video */}
        <DroneVideo
          src="/banashri-drone.mp4"
          caption={t('drone_capture_badge')}
          showBadge
          aspect="16/9"
          hasAudio
        />
      </div>
    </section>
  );
};
