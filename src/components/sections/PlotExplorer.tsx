"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InteractiveSitePlan } from '@/components/map/InteractiveSitePlan';
import { PlotCard } from '@/components/sections/PlotCard';
import { BookingModal } from '@/components/sections/BookingModal';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TopographyOverlay } from '@/components/ui/TopographyOverlay';
import { InkReveal } from '@/components/ui/InkReveal';

const MOCK_PLOTS = [
  { id: '1', plot_number: 'A-01', price: '₹45,00,000', area: '2,400', status: 'available' as const, image: 'https://images.unsplash.com/photo-1500382017468-9049fed7ee27?q=80&w=800' },
  { id: '2', plot_number: 'A-02', price: '₹52,00,000', area: '3,000', status: 'developing' as const, image: 'https://images.unsplash.com/photo-1441974231531-c0083fbc8832?q=80&w=800' },
  { id: '3', plot_number: 'B-01', price: '₹38,00,000', area: '1,800', status: 'available' as const, image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800' },
];

const FILTERS = ['all', 'available', 'developing'] as const;

export const PlotExplorer = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all');
  const [bookingOpen, setBookingOpen] = useState(false);

  const filtered = MOCK_PLOTS.filter(p => filter === 'all' || p.status === filter);
  const activePlot = MOCK_PLOTS.find(p => p.id === selectedId);

  return (
    <section id="plots" className="py-28 relative overflow-hidden">
      {/* Rich section background (transparent to show grid) */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* ═══ SCROLLYTELLING: Topography layers build as you scroll ═══ */}
      <TopographyOverlay />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <span className="text-gold/40 text-[10px] font-mono tracking-[0.5em] uppercase block mb-4">02 / 04</span>
            <InkReveal>
              <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-3">
                Interactive <span className="text-gold-gradient">Explorer</span>
              </h2>
            </InkReveal>
            <InkReveal startAt={0.8} endAt={0.4}>
              <p className="text-cream text-lg max-w-lg font-light">
                Navigate our premium holdings. Select a plot for full details.
              </p>
            </InkReveal>
          </div>

          <div className="flex p-1 glass rounded-full">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer",
                  filter === f ? "bg-gold text-surface shadow-md" : "text-cream hover:text-ivory"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid: Site Plan + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Site Plan (replaces Mapbox) */}
          <div className="lg:col-span-7 h-[550px] lg:h-[650px] rounded-2xl overflow-hidden relative order-2 lg:order-1 border border-champagne">
            <InteractiveSitePlan
              plots={MOCK_PLOTS}
              selectedId={selectedId}
              onPlotClick={(id) => setSelectedId(id)}
            />
          </div>

          {/* Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 order-1 lg:order-2 lg:h-[650px] overflow-y-auto no-scrollbar pr-1">
            <AnimatePresence mode="popLayout">
              {filtered.map(plot => (
                <motion.div
                  key={plot.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <PlotCard
                    plot={plot}
                    isActive={selectedId === plot.id}
                    onClick={() => setSelectedId(plot.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected plot action bar */}
        <AnimatePresence>
          {selectedId && activePlot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-10 p-6 md:p-8 glass rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-xl font-serif font-bold">
                  {activePlot.plot_number}
                </div>
                <div>
                  <h4 className="text-lg text-ivory font-serif">Plot {activePlot.plot_number} Selected</h4>
                  <p className="text-cream text-sm">Review documentation or schedule a visit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">Download Brochure</Button>
                <Button size="sm" onClick={() => setBookingOpen(true)} className="animate-pulse-gold">
                  Book Site Visit
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        plotNumber={activePlot?.plot_number || 'N/A'}
      />
    </section>
  );
};
