"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/LocaleContext';

interface DroneVideoProps {
  /** Path under /public, e.g. "/banashri-drone.mp4" */
  src: string;
  /** Optional poster image shown until the video plays */
  poster?: string;
  /** Caption shown as a small label */
  caption?: string;
  /** Show a "Drone Capture" badge in the top-left */
  showBadge?: boolean;
  /**
   * Custom aspect ratio. Accepts either a shorthand key from the
   * list below (e.g. "16/9"), or a raw Tailwind aspect class to
   * enable responsive overrides (e.g. "aspect-[4/3] md:aspect-[16/9]").
   * Default 16/9.
   */
  aspect?: '16/9' | '4/3' | '21/9' | '9/16' | (string & {});
  /** Whether to autoplay + loop. Default true */
  autoplay?: boolean;
  /**
   * Whether the video has an audio track. When true, the player shows
   * a "Tap for sound" hint for the first 6 seconds so the user knows
   * they can enable audio (browsers require user interaction before
   * unmuted playback).
   */
  hasAudio?: boolean;
  className?: string;
}

/**
 * DroneVideo — autoplaying, muted, looped video player with optional
 * tap-to-unmute and an in-page expanded view.
 *
 * Why an in-page overlay instead of the native fullscreen API?
 * Browsers (especially mobile Safari and Chrome on Android) render
 * native fullscreen with their own chrome and no app back button —
 * users get stuck and have to swipe down or hit OS controls. An
 * in-page portal overlay keeps the user on the page, gives us a
 * guaranteed close button, and works identically on every device.
 *
 * The overlay is portaled to document.body because SmoothScroll wraps
 * the page in a motion.div with `will-change: transform`, which
 * makes that ancestor the containing block for any `position: fixed`
 * descendants — so a modal rendered inside it would slide off-screen
 * as the page scrolls.
 */
const ASPECT_KEYS = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '21/9': 'aspect-[21/9]',
  '9/16': 'aspect-[9/16]',
} as const;
export const DroneVideo = ({
  src,
  poster,
  caption = 'Drone capture',
  showBadge = true,
  aspect = '16/9',
  autoplay = true,
  hasAudio = false,
  className,
}: DroneVideoProps) => {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(hasAudio);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target: document.body. See comment above for why.
  useEffect(() => setMounted(true), []);

  // Auto-fade the "Tap for sound" hint after 6 seconds
  useEffect(() => {
    if (!hasAudio) return;
    const t = setTimeout(() => setShowSoundHint(false), 6000);
    return () => clearTimeout(t);
  }, [hasAudio]);

  // Lock body scroll while the overlay is open so the page doesn't
  // drift behind the modal on touch devices.
  useEffect(() => {
    if (!isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isExpanded]);

  // Allow either a shorthand key from the typed union (resolved to
  // a plain Tailwind aspect class) or a raw responsive class like
  // "aspect-[4/3] md:aspect-[16/9]" for callers that need breakpoints.
  const aspectClass = aspect.includes(' ')
    ? aspect
    : (ASPECT_KEYS as Record<string, string>)[aspect];

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) {
      // Dismiss the sound hint as soon as audio is enabled
      setShowSoundHint(false);
    }
  };

  const openExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  const closeExpand = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn('relative w-full', className)}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-2xl border border-champagne bg-surface-light shadow-gold-lg group/dv',
            aspectClass
          )}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoplay}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          >
            <track kind="captions" />
          </video>

          {/* Cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-deep-forest/20 pointer-events-none" />

          {/* Drone badge (top-left) */}
          {showBadge && (
            <div className="absolute top-4 left-4 z-10 px-4 py-2 glass rounded-full flex items-center gap-2 pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sold opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sold" />
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cream/80 font-bold">
                {caption}
              </span>
            </div>
          )}

          {/* Sound hint (top-right, auto-fades) */}
          <AnimatePresence>
            {hasAudio && showSoundHint && isMuted && (
              <motion.button
                type="button"
                onClick={toggleMute}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-4 right-4 z-10 px-3.5 py-2 rounded-full glass border border-gold/50 flex items-center gap-2 hover:border-gold transition-colors cursor-pointer"
                aria-label="Enable sound"
              >
                <VolumeX size={12} className="text-gold" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold">
                  {t('drone_tap_for_sound')}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Center play / pause indicator (visible when paused) */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                key="play-overlay"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              >
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-gold shadow-gold-lg">
                  <Play size={28} className="ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom controls bar (visible on hover or when paused) */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 z-10 p-4 flex items-center gap-3 transition-opacity duration-300',
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            )}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              className={cn(
                "w-9 h-9 rounded-full glass flex items-center justify-center transition-colors cursor-pointer",
                hasAudio && isMuted
                  ? "text-gold border border-gold/40 hover:border-gold"
                  : "text-cream hover:text-gold"
              )}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <div className="flex-1" />
            <button
              onClick={openExpand}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors cursor-pointer"
              aria-label="Expand to full view"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══ In-page expanded overlay (replaces native fullscreen) ═══ */}
      {mounted && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="drone-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-deep-forest/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
              {/* Close button — always visible, always top-right. This
                  is the back button the user is missing on mobile. */}
              <button
                type="button"
                onClick={closeExpand}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors cursor-pointer"
                aria-label="Close full view"
              >
                <X size={18} />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-6xl max-h-full aspect-video rounded-2xl overflow-hidden border border-champagne shadow-gold-lg bg-black"
              >
                <video
                  ref={overlayVideoRef}
                  src={src}
                  poster={poster}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-contain"
                >
                  <track kind="captions" />
                </video>

                {/* Tap-to-unmute hint (only if hasAudio and still muted) */}
                {hasAudio && isMuted && (
                  <button
                    type="button"
                    onClick={() => {
                      const v = overlayVideoRef.current;
                      if (!v) return;
                      v.muted = false;
                      setIsMuted(false);
                    }}
                    className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full glass border border-gold/50 flex items-center gap-2 hover:border-gold transition-colors cursor-pointer"
                    aria-label="Enable sound"
                  >
                    <VolumeX size={14} className="text-gold" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold">
                      {t('drone_tap_for_sound')}
                    </span>
                  </button>
                )}

                {/* Caption badge (bottom-left) */}
                {showBadge && (
                  <div className="absolute bottom-4 left-4 z-10 px-4 py-2 glass rounded-full flex items-center gap-2 pointer-events-none">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-sold opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sold" />
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-cream/80 font-bold">
                      {caption}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};