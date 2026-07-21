"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InteractiveSitePlan } from '@/components/map/InteractiveSitePlan';
import { PlotCard } from '@/components/sections/PlotCard';
import { BanashriEnclaveView } from '@/components/sections/BanashriEnclaveView';
import { TopographyOverlay } from '@/components/ui/TopographyOverlay';
import { LocationMap } from '@/components/ui/LocationMap';
import { InkReveal } from '@/components/ui/InkReveal';
import { PRICING } from '@/lib/pricing';

const MOCK_PLOTS = [
  {
    id: '1',
    plot_number: PRICING.banashriEnclave.plotNumber,
    site_name: PRICING.banashriEnclave.siteName,
    area: PRICING.banashriEnclave.sqft.toLocaleString(),
    status: 'available' as const,
    image: '/site-progress-5.jpeg',
  },
];

export const PlotExplorer = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="plots" className="py-28 relative overflow-hidden">
      {/* Rich section background (transparent to show grid) */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* ═══ SCROLLYTELLING: Topography layers build as you scroll ═══ */}
      <TopographyOverlay />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <span className="text-gold/40 text-[10px] font-mono tracking-[0.5em] uppercase block mb-4">
              02 / 04
            </span>
            <InkReveal>
              <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-3">
                Interactive <span className="text-gold-gradient">Explorer</span>
              </h2>
            </InkReveal>
            <InkReveal startAt={0.8} endAt={0.4}>
              <p className="text-cream text-lg max-w-lg font-light">
                Select a plot to step inside and explore on-site progress.
              </p>
            </InkReveal>
          </div>
        </div>

        {/* Stage — grid or immersive view */}
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Interactive Site Plan */}
                <div className="lg:col-span-7 h-[550px] lg:h-[650px] rounded-2xl overflow-hidden relative border border-champagne">
                  <InteractiveSitePlan
                    plots={MOCK_PLOTS}
                    selectedId={selectedId}
                    onPlotClick={id => setSelectedId(id)}
                  />
                </div>

                {/* Plot cards column */}
                <div className="lg:col-span-5 flex flex-col gap-5 lg:h-[650px] overflow-y-auto no-scrollbar pr-1">
                  {MOCK_PLOTS.map(plot => (
                    <motion.div
                      key={plot.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <PlotCard
                        plot={plot}
                        isActive={selectedId === plot.id}
                        onClick={() => setSelectedId(plot.id)}
                      />
                    </motion.div>
                  ))}

                  {/* Hint footer */}
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-cream/50 font-mono uppercase tracking-widest">
                    <MapPin size={11} className="text-gold/50" />
                    Click a card to enter the project
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <BanashriEnclaveView onBack={() => setSelectedId(null)} />
          )}
        </AnimatePresence>

        {/* ═══ FIND US — compact map + address, shown in the home grid view ═══ */}
        {!selectedId && (
          <div className="mt-16">
            <LocationMap
              map={PRICING.banashriEnclave.map}
              size="compact"
              layout="side-by-side"
              showCta
              title="Find Us"
            />
          </div>
        )}
      </div>
    </section>
  );
};
