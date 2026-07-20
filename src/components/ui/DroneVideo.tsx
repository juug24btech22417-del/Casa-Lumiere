"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DroneVideoProps {
  /** Path under /public, e.g. "/banashri-drone.mp4" */
  src: string;
  /** Optional poster image shown until the video plays */
  poster?: string;
  /** Caption shown as a small label */
  caption?: string;
  /** Show a "Drone Capture" badge in the top-left */
  showBadge?: boolean;
  /** Custom aspect ratio. Default 16/9 */
  aspect?: '16/9' | '4/3' | '21/9' | '9/16';
  /** Whether to autoplay + loop. Default true */
  autoplay?: boolean;
  className?: string;
}

/**
 * DroneVideo — autoplaying, muted, looped video player with optional
 * tap-to-unmute and fullscreen controls. Cinematic styling with
 * a gold play overlay.
 */
export const DroneVideo = ({
  src,
  poster,
  caption = 'Drone capture',
  showBadge = true,
  aspect = '16/9',
  autoplay = true,
  className,
}: DroneVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '21/9': 'aspect-[21/9]',
    '9/16': 'aspect-[9/16]',
  }[aspect];

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
  };

  const requestFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };

  return (
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

        {/* Bottom controls bar (visible on hover) */}
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
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <div className="flex-1" />
          <button
            onClick={requestFullscreen}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors cursor-pointer"
            aria-label="Fullscreen"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
