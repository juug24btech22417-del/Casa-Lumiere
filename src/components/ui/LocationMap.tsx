"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  buildMapEmbedUrl,
  buildDirectionsUrl,
  ProjectPricing,
} from '@/lib/pricing';

interface LocationMapProps {
  /** Map config block from the project's PRICING entry */
  map: ProjectPricing['map'];
  /** Visual size — 'compact' for cards/home, 'full' for the immersive view */
  size?: 'compact' | 'full';
  /**
   * Layout of the map card:
   *  - 'stacked'    : map on top, CTA below (default; good for narrow widths)
   *  - 'side-by-side' : map on the left, address/CTA on the right
   */
  layout?: 'stacked' | 'side-by-side';
  /** Show the CTA row beneath the map (directions button etc.) */
  showCta?: boolean;
  /** Optional override for the title above the map */
  title?: string;
  className?: string;
}

/**
 * LocationMap — Google Maps embed (no API key required).
 * Renders an iframe with the project's coordinates, plus optional
 * address header and "Get Directions" CTA.
 */
export const LocationMap = ({
  map,
  size = 'full',
  layout = 'stacked',
  showCta = true,
  title,
  className,
}: LocationMapProps) => {
  const embedUrl = buildMapEmbedUrl(map);
  const directionsUrl = buildDirectionsUrl(map);

  // Cap iframe height. On the home page we want a compact 280px
  // block (small enough not to dominate the section), and on the
  // immersive view the map can fill more space.
  const isCompact = size === 'compact';
  const isSideBySide = layout === 'side-by-side';
  const iframeHeightClass = isCompact
    ? 'h-[220px] sm:h-[260px]'
    : 'h-[300px] sm:h-[400px] md:h-[480px]';
  const titleSize = isCompact
    ? 'text-xl sm:text-2xl'
    : 'text-2xl md:text-3xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('w-full', className)}
    >
      {/* Header */}
      {title && (
        <div className="flex items-end justify-between mb-4 md:mb-5">
          <div>
            <span className="text-gold/40 text-[10px] font-mono tracking-[0.5em] uppercase block mb-2">
              Location
            </span>
            <h3 className={cn('font-serif text-ivory', titleSize)}>
              {title}
            </h3>
          </div>
        </div>
      )}

      <div
        className={cn(
          'relative rounded-2xl overflow-hidden border border-champagne bg-surface-light shadow-gold-lg',
          isSideBySide
            ? 'grid grid-cols-1 md:grid-cols-5'
            : 'flex flex-col'
        )}
      >
        {/* ═══ MAP IFRAME ═══ */}
        <div
          className={cn(
            'relative w-full',
            isSideBySide ? 'md:col-span-3' : '',
            isCompact ? 'h-[220px] sm:h-[260px]' : iframeHeightClass
          )}
        >
          <iframe
            src={embedUrl}
            title={`${map.label} — Google Maps`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating address chip (top-left, over the map) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass border border-cream/30 max-w-[80%]">
            <MapPin size={11} className="text-gold shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ivory truncate">
              {map.label}
            </span>
          </div>
        </div>

        {/* ═══ SIDE PANEL (only in side-by-side mode) ═══ */}
        {isSideBySide && (
          <div className="md:col-span-2 p-5 md:p-6 flex flex-col justify-center gap-4 bg-deep-forest/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-ivory text-sm font-medium leading-tight truncate">
                  {map.label}
                </p>
                <p className="text-cream/60 text-[10px] font-mono uppercase tracking-widest mt-0.5">
                  {map.region}
                </p>
              </div>
            </div>

            <p className="text-cream/70 text-xs leading-relaxed font-light">
              Strategically located in Karnataka with strong road connectivity
              and easy access to the city. Tap below for turn-by-turn directions.
            </p>

            <div className="text-[10px] text-cream/50 font-mono">
              {map.lat.toFixed(4)}°N, {map.lng.toFixed(4)}°E
            </div>

            {showCta && (
              <div className="flex flex-col gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gold text-ivory text-xs tracking-widest font-medium hover:bg-gold-light transition-colors cursor-pointer w-full"
                >
                  <Navigation size={13} />
                  Get Directions
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${map.lat},${map.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-cream/30 text-ivory text-xs tracking-widest font-medium hover:border-gold/50 hover:text-gold transition-colors cursor-pointer w-full"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink size={12} />
                  Open in Google Maps
                </a>
              </div>
            )}
          </div>
        )}

        {/* ═══ CTA ROW (only in stacked mode) ═══ */}
        {showCta && !isSideBySide && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 md:p-5 glass border-t border-cream/30">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-ivory text-sm font-medium leading-tight truncate">
                  {map.label}
                </p>
                <p className="text-cream/60 text-[10px] font-mono uppercase tracking-widest mt-0.5 truncate">
                  {map.lat.toFixed(4)}°N, {map.lng.toFixed(4)}°E · {map.region}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gold text-ivory text-xs tracking-widest font-medium hover:bg-gold-light transition-colors cursor-pointer"
              >
                <Navigation size={13} />
                Get Directions
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${map.lat},${map.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-cream/30 text-ivory text-xs tracking-widest font-medium hover:border-gold/50 hover:text-gold transition-colors cursor-pointer"
                aria-label="Open in Google Maps"
              >
                <ExternalLink size={12} />
                View larger
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
