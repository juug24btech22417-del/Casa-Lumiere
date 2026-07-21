"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { GoldParticles } from '@/components/ui/GoldParticles';
import { ESTATES, type EstateMeta } from '@/lib/pricing';

const STATUS_STYLE: Record<EstateMeta['status'], string> = {
  available: 'text-available bg-available/15 border-available/30',
  'coming-soon': 'text-cream/55 bg-cream/10 border-cream/20',
};

const STATUS_LABEL: Record<EstateMeta['status'], string> = {
  available: 'Available',
  'coming-soon': 'Coming soon',
};

export const Hero = ({ onExploreClick }: { onExploreClick: () => void }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // ── Scroll-linked Museum Frame Effect (unchanged) ──
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const framePadding = useTransform(scrollYProgress, [0, 0.45], [36, 0]);
  const frameBorderRadius = useTransform(scrollYProgress, [0, 0.45], [20, 0]);
  const frameBorderOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.7], [0, -60]);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* ══════ MUSEUM FRAME WRAPPER (unchanged) ══════ */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ padding: framePadding }}
      >
        <motion.div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: frameBorderRadius,
            boxShadow: useTransform(
              frameBorderOpacity,
              (o) => `inset 0 0 0 1px rgba(168,89,58,${o * 0.3}), 0 20px 60px -15px rgba(0,0,0,${o * 0.08})`
            ),
          }}
        >
          {/* Cinematic gradient base */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,220,180,0.9),rgba(245,233,216,1))]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(212,160,84,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_60%,rgba(232,192,136,0.15),transparent)]" />
          </div>

          {/* Photo */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.08] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
              className="w-full h-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed7ee27?q=80&w=2000"
                alt="Luxury Estate"
                className={`w-full h-full object-cover transition-opacity duration-1000 ${imgLoaded ? 'opacity-25' : 'opacity-0'}`}
                loading="eager"
                onLoad={() => setImgLoaded(true)}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/60 via-transparent to-deep-forest" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/50 via-transparent to-deep-forest/50" />
          </div>

          {/* Ambient gold orbs */}
          <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-gold/[0.06] rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[15%] right-[20%] w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px] pointer-events-none" />

          {/* Particles */}
          <GoldParticles count={60} className="opacity-60" />

          {/* Decorative grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-white" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* ══════ CONTENT ══════ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <motion.div
          className="w-full max-w-6xl flex flex-col items-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Overline pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 rounded-full border border-gold/40 bg-gold/15 text-[10px] uppercase tracking-[0.5em] text-gold-dark font-bold backdrop-blur-sm">
              Estates · Live and upcoming
            </span>
          </motion.div>

          {/* Headline — 2 lines, centred, ~2pt smaller than before */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.75rem] sm:text-[3.25rem] md:text-[4.125rem] font-serif text-ivory leading-[1.05] mb-7 text-center"
          >
            <span className="block">A growing collection</span>
            <span className="block">of hand-built estates.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-cream/80 text-[0.95rem] md:text-[1.0625rem] font-light leading-relaxed text-center max-w-2xl mb-10"
          >
            Each one is its own project— planned, plotted, and built end-to-end. Pick the one closest to you.
          </motion.p>

        {/* ══════ ESTATE INDEX CARDS ══════ */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.6, delayChildren: 0.9, staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10"
        >
          {ESTATES.map(estate => {
            const isActive = estate.status === 'available';
            return (
              <motion.button
                key={estate.slug}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: isActive ? 1 : 0.55, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={isActive ? { y: -4 } : undefined}
                onClick={isActive ? onExploreClick : undefined}
                disabled={!isActive}
                className={[
                  'group relative text-left p-4 rounded-xl border bg-white/[0.04] backdrop-blur-sm transition-all',
                  isActive
                    ? 'border-gold/30 hover:border-gold/60 hover:bg-white/[0.07] cursor-pointer'
                    : 'border-cream/15 cursor-default',
                ].join(' ')}
              >
                {/* Status badge */}
                <span
                  className={[
                    'inline-block text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full border mb-2.5',
                    STATUS_STYLE[estate.status],
                  ].join(' ')}
                >
                  {STATUS_LABEL[estate.status]}
                </span>

                {/* Name + location */}
                <h3 className="text-ivory text-base font-serif font-semibold leading-tight mb-1.5">
                  {estate.name}
                </h3>
                <p className="flex items-center gap-1.5 text-cream/60 text-[11px] font-light">
                  <MapPin size={10} className="text-gold/60" />
                  {estate.location} · {estate.plotCount} plots
                </p>

                {/* Hover chevron for active card */}
                {isActive && (
                  <ArrowRight
                    size={14}
                    className="absolute top-4 right-4 text-gold/0 group-hover:text-gold transition-colors"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Single primary CTA */}
        {/* Removed: the hero CTA. Visitors will discover the active
            Banashri Enclave card and click it (it's the only card
            with a hover-lift) or scroll to discover the rest of the
            page. */}
        </motion.div>
      </div>

      {/* Scroll indicator (unchanged) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        </motion.div>
        <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
};
