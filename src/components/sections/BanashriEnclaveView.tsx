"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Navigation,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LocationMap } from '@/components/ui/LocationMap';
import { DroneVideo } from '@/components/ui/DroneVideo';
import { BookingModal } from '@/components/sections/BookingModal';
import { PRICING, buildDirectionsUrl } from '@/lib/pricing';
import { useLocale } from '@/lib/LocaleContext';

interface BanashriEnclaveViewProps {
  /** Opens the booking modal */
  onBookVisit?: () => void;
  /** Triggered when user clicks the back button */
  onBack: () => void;
}

const SITE_PHOTOS = [
  {
    src: '/site-progress-1.jpeg',
    captionKey: 'view_photo_caption_entry',
  },
  {
    src: '/site-progress-2.jpeg',
    captionKey: 'view_photo_caption_avenue',
  },
  {
    src: '/site-progress-3.jpeg',
    captionKey: 'view_photo_caption_horticulture',
  },
  {
    src: '/site-progress-5.jpeg',
    captionKey: 'view_photo_caption_dusk',
  },
  {
    src: '/site-progress-4.jpeg',
    captionKey: 'view_photo_caption_twilight',
  },
] as const;

/**
 * BanashriEnclaveView — the cinematic "enter inside" experience for Plot A-01.
 *
 * Layout:
 *   1. Photo stage (78vh) — full-bleed Ken-Burns gallery, back button,
 *      "View on map" toggle, and a glass info panel at the bottom.
 *   2. Drone section — autoplaying drone video with caption, sitting
 *      underneath the photo stage so the user sees the full aerial
 *      tour after entering the project.
 */
export const BanashriEnclaveView = ({ onBack }: BanashriEnclaveViewProps) => {
  const pricing = PRICING.banashriEnclave;
  const { t, locale } = useLocale();
  const siteName = pricing.siteNameI18n[locale];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const openBooking = () => {
    // Modal opens centered on the current viewport — wherever the
    // user happens to be. No scroll-back, because the modal uses
    // a full-viewport backdrop blur, so the underlying section
    // (photo stage vs drone video) is invisible to the user
    // regardless of where they were when they tapped the button.
    setBookingOpen(true);
  };

  // Auto-advance photos every 5s
  useEffect(() => {
    if (SITE_PHOTOS.length <= 1) return;
    const t = setTimeout(() => {
      setDirection(1);
      setPhotoIndex(i => (i + 1) % SITE_PHOTOS.length);
    }, 5000);
    return () => clearTimeout(t);
  }, [photoIndex]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setPhotoIndex(i => (i + dir + SITE_PHOTOS.length) % SITE_PHOTOS.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* ═══ STAGE 1 — PHOTO STAGE (78vh) ═══ */}
      <div className="relative w-full h-[78vh] min-h-[640px] rounded-3xl overflow-hidden border border-champagne bg-deep-forest">
        {/* Photo layer */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={photoIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1.12, x: direction * 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.04, x: direction * -60 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_PHOTOS[photoIndex].src}
                alt={t(SITE_PHOTOS[photoIndex].captionKey)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/60 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/15 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Map overlay (toggled) */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-20 p-4 md:p-7"
            >
              <LocationMap
                map={pricing.map}
                size="full"
                showCta
                className="h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 p-5 md:p-7">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={onBack}
            // whitespace-nowrap keeps the label on one line even
            // when the photo stage is narrow on phones. shrink-0
            // prevents the button from being squeezed by the right
            // group. Tighter padding + smaller text on mobile so
            // the pill takes less space on phones.
            className="group shrink-0 flex items-center gap-1.5 md:gap-2.5 px-3 py-2 md:px-4 md:py-2.5 rounded-full glass border border-cream/30 hover:border-gold/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft size={14} className="md:size-4 text-ivory group-hover:text-gold transition-colors shrink-0" />
            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-ivory group-hover:text-gold transition-colors">
              {t('view_back_to_all_plots')}
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-2 md:gap-3 shrink-0"
          >
            <button
              type="button"
              onClick={() => setShowMap(s => !s)}
              // Hidden on mobile — the back button already takes
              // most of the top bar's width on phones and the
              // 'View on map' label was being clipped at the right
              // edge. Desktop keeps it.
              className={cn(
                "hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full glass border transition-all cursor-pointer whitespace-nowrap",
                showMap
                  ? "border-gold/60 bg-gold/15"
                  : "border-cream/30 hover:border-gold/50"
              )}
            >
              <MapPin size={12} className={showMap ? 'text-gold' : 'text-ivory'} />
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-[0.3em]",
                  showMap ? 'text-gold' : 'text-ivory'
                )}
              >
                {showMap ? t('view_hide_map') : t('view_view_on_map')}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full glass border border-gold/30">
              <span className="w-1.5 h-1.5 rounded-full bg-available animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">
                {siteName}
              </span>
            </div>
            <div className="hidden lg:block px-3.5 py-2 rounded-full glass border border-cream/20">
              <span className="text-[10px] font-mono tracking-widest text-cream/80">
                {String(photoIndex + 1).padStart(2, '0')} / {String(SITE_PHOTOS.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Center caption — positioned higher on mobile so it
            doesn't get covered by the bottom info panel when the
            headline wraps to two lines. Desktop stays centered. */}
        <div className="absolute top-1/3 md:top-1/2 left-0 -translate-y-1/2 md:-translate-y-1/2 z-20 px-6 md:px-12 max-w-xl pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-gold/70 text-[10px] font-mono uppercase tracking-[0.5em] mb-3">
                {t('view_live_from_site')}
              </span>
              <p className="text-ivory font-serif text-2xl md:text-4xl leading-tight">
                {t(SITE_PHOTOS[photoIndex].captionKey)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom info panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 z-30 p-5 md:p-7"
        >
          <div className="rounded-2xl border border-cream/30 bg-white/35 p-5 md:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center font-serif text-gold text-xl font-bold">
                {pricing.plotNumber}
              </div>
              <div>
                <p className="text-ivory font-serif text-lg md:text-xl leading-tight">
                  {siteName}
                </p>
                <p className="text-[10px] text-cream/50 font-mono uppercase tracking-widest mt-1">
                  {t('view_premium_sector')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-light border border-cream/20">
                <Maximize2 size={13} className="text-gold/70" />
                <div className="text-left">
                  <p className="text-[9px] text-cream/50 uppercase tracking-widest font-mono">
                    {t('plot_plot_label')}
                  </p>
                  <p className="text-ivory text-sm font-medium">
                    {pricing.dimensions}{' '}
                    <span className="text-cream/60 font-light">
                      ({pricing.sqft.toLocaleString()} {t('view_sqft_suffix')})
                    </span>
                  </p>
                </div>
              </div>
              <a
                href={buildDirectionsUrl(pricing.map)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-cream/30 text-ivory text-xs tracking-widest font-medium hover:border-gold/50 hover:text-gold transition-colors cursor-pointer"
                aria-label={t('view_directions')}
              >
                <Navigation size={13} />
                {t('view_directions')}
              </a>
              <Button
                size="md"
                onClick={openBooking}
                className="animate-pulse-gold"
              >
                {t('view_book_site_visit')}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next arrows */}
        <button
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass border border-cream/30 flex items-center justify-center text-ivory hover:text-gold hover:border-gold/50 transition-all opacity-0 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next photo"
          onClick={() => go(1)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass border border-cream/30 flex items-center justify-center text-ivory hover:text-gold hover:border-gold/50 transition-all opacity-0 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={20} />
        </button>

        {/* Vertical dot indicators */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2.5">
          {SITE_PHOTOS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => {
                setDirection(i > photoIndex ? 1 : -1);
                setPhotoIndex(i);
              }}
              className={cn(
                "w-1.5 rounded-full transition-all duration-500",
                i === photoIndex
                  ? "h-8 bg-gold"
                  : "h-1.5 bg-cream/40 hover:bg-cream/70"
              )}
            />
          ))}
        </div>
      </div>

      {/* ═══ STAGE 2 — DRONE VIDEO (under the photo stage) ═══ */}
      <div className="mt-10 md:mt-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-5"
        >
          <div>
            <span className="text-gold/40 text-[10px] font-mono tracking-[0.5em] uppercase block mb-2">
              {t('view_aerial_tour')}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-ivory">
              {t('view_see_from_headline_pre')}<span className="text-gold-gradient">{t('view_see_from_headline_accent')}</span>
            </h3>
          </div>
          <p className="hidden md:block text-cream/50 text-xs max-w-xs text-right font-light">
            {t('view_drone_subtitle').replace('{name}', siteName)}
          </p>
        </motion.div>
        <DroneVideo
          src="/banashri-drone.mp4"
          caption={t('drone_capture_badge')}
          showBadge
          aspect="16/9"
          hasAudio
        />
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        plotNumber={`${siteName} — ${pricing.plotNumber}`}
      />
    </motion.div>
  );
};
