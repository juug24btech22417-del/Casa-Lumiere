"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GoldParticles } from '@/components/ui/GoldParticles';
import { Magnetic } from '@/components/ui/Magnetic';

export const Hero = ({ onExploreClick }: { onExploreClick: () => void }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const title = "Invest in the Horizon.";

  const letterContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
  };
  const letter = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Layer 1: Rich CSS gradient (ALWAYS visible — the cinematic base) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,220,180,0.9),rgba(245,233,216,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(212,160,84,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_60%,rgba(232,192,136,0.15),transparent)]" />
      </div>

      {/* Layer 2: Photo (loads on top of gradient) */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
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

      {/* Layer 3: Ambient gold orbs */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-gold/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[20%] w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Layer 4: Particles */}
      <GoldParticles count={60} className="opacity-60" />

      {/* Layer 5: Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-gold/40 bg-gold/15 text-[10px] uppercase tracking-[0.5em] text-gold-dark font-bold backdrop-blur-sm">
            A New Standard of Living
          </span>
        </motion.div>

        <motion.h1
          variants={letterContainer}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-ivory leading-[0.95] mb-8 drop-shadow-sm"
        >
          {title.split("").map((char, i) => (
            <motion.span key={i} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Experience rural estate development redefined — meticulously curated, legally verified, and designed for generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Magnetic>
            <Button size="lg" onClick={onExploreClick} className="uppercase shadow-gold-lg">
              Explore the Map
            </Button>
          </Magnetic>
          
          <Magnetic>
            <button className="text-cream hover:text-gold-dark transition-colors text-xs font-medium tracking-widest uppercase border-b border-cream/30 hover:border-gold pb-1 cursor-pointer">
              The Vision
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
};
