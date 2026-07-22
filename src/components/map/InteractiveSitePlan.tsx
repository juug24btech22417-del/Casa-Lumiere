"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Compass } from 'lucide-react';
import { useUnit } from '@/lib/UnitContext';
import { useLocale } from '@/lib/LocaleContext';

interface Plot {
  id: string;
  plot_number: string;
  area: string;
  status: 'available' | 'developing' | 'sold';
  image: string;
}

interface SitePlanProps {
  plots: Plot[];
  selectedId: string | null;
  onPlotClick: (id: string) => void;
}

/**
 * A-01 hit-target on the hand-drawn master plan.
 * Coords are percentages of the rendered image bounding box.
 * (Tuned to the left-most cluster of the updated plan: A-01 is
 * the top-left plot in that cluster, roughly 18% across / 38% down.)
 */
const HOTSPOT_LAYOUT = [
  { id: '1', x: 18, y: 38, w: 4, h: 6 },
];

export const InteractiveSitePlan = ({ plots, selectedId, onPlotClick }: SitePlanProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { formatArea } = useUnit();
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle parallax + Ken-Burns drift while the section is in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-br from-[#F2EDE5] via-[#E8E1D6] via-[#E0D8CC] to-[#D8CFC0] rounded-2xl overflow-hidden select-none"
    >
      {/* Decorative background grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Ambient glow behind selected plot */}
      {selectedId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[220px] bg-gold/[0.08] rounded-full blur-[90px] pointer-events-none"
        />
      )}

      {/* ═══ Master-plan image with reveal + parallax ═══ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-6 md:inset-10 flex items-center justify-center"
      >
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative w-full h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/estate-layout.jpeg"
            alt="Banashri Enclave master plan"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(45,38,32,0.18)]"
          />

          {/* Click hotspots layered over the image (still functional for plot selection) */}
          {HOTSPOT_LAYOUT.map(layout => {
            const plot = plots.find(p => p.id === layout.id);
            if (!plot) return null;
            const isSelected = selectedId === plot.id;
            return (
              <motion.button
                key={layout.id}
                type="button"
                aria-label={`Select Plot ${plot.plot_number}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.5, ease: 'backOut' }}
                onMouseEnter={() => setHoveredId(plot.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onPlotClick(plot.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "absolute z-10 rounded-full transition-all duration-500 cursor-pointer group",
                  "w-7 h-7 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2",
                  isSelected
                    ? "bg-gold shadow-gold-lg ring-4 ring-gold/30"
                    : "bg-gold/70 hover:bg-gold shadow-md ring-2 ring-white/80"
                )}
                style={{
                  left: `${layout.x}%`,
                  top: `${layout.y}%`,
                }}
              >
                <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
                <span className="relative flex items-center justify-center w-full h-full text-[10px] font-mono font-bold text-white">
                  {plot.plot_number.replace('A-', '')}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Floating hover tooltip */}
      {hoveredId && (() => {
        const plot = plots.find(p => p.id === hoveredId);
        const layout = HOTSPOT_LAYOUT.find(l => l.id === hoveredId);
        if (!plot || !layout) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-30 glass rounded-xl px-4 py-3 shadow-gold pointer-events-none"
            style={{
              left: `${layout.x}%`,
              top: `${layout.y}%`,
              transform: 'translate(-50%, calc(-100% - 20px))',
            }}
          >
            <p className="text-ivory text-sm font-serif font-bold">Plot {plot.plot_number}</p>
            <p className="text-cream/60 text-[10px] uppercase tracking-widest mt-0.5">
              {formatArea(parseFloat(plot.area.replace(/,/g, '')))}
            </p>
          </motion.div>
        );
      })()}

      {/* Legend — matches the hand-drawn plan: yellow = sold, white = available */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm border border-cream/60 bg-white/80" />
          <span className="text-[9px] uppercase tracking-widest text-cream font-bold">{t('map_legend_available')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-sold" />
          <span className="text-[9px] uppercase tracking-widest text-cream font-bold">{t('map_legend_sold')}</span>
        </div>
      </div>

      {/* Title badge */}
      <div className="absolute top-4 left-4 z-20 px-4 py-2 glass rounded-full flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-available animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-cream/70 font-bold">{t('map_title')}</span>
      </div>

      {/* Compass icon */}
      <div className="absolute top-4 right-4 z-20 text-gold/20">
        <Compass size={20} />
      </div>
    </div>
  );
};
