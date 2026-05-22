"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ArchitecturalGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // ── Grid lines draw themselves over the first 15% (they don't follow the whole way) ──
  const line1Scale = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const line2Scale = useTransform(scrollYProgress, [0.03, 0.2], [0, 1]);
  const line3Scale = useTransform(scrollYProgress, [0.06, 0.25], [0, 1]);

  // ── Coordinates and crosshairs fade in staggered ──
  const coordsOpacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const crosshair1Opacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 0.25]);
  const crosshair2Opacity = useTransform(scrollYProgress, [0.18, 0.26], [0, 0.25]);
  const crosshair3Opacity = useTransform(scrollYProgress, [0.24, 0.32], [0, 0.25]);
  const crosshair4Opacity = useTransform(scrollYProgress, [0.30, 0.38], [0, 0.25]);

  // ── Rotated stamp slides in ──
  const stampOpacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 0.2]);
  const stampX = useTransform(scrollYProgress, [0.15, 0.28], [-20, 0]);

  // ── The Elegant Flowing Topography Line (Draws down the page) ──
  const journeyDraw = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      {/* ── Whisper-thin organic flowing lines ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Primary flowing line — wide organic S-curves */}
        <motion.path
          d="M 35 0 C 90 8, 10 18, 70 28 C 95 35, 5 45, 60 55 C 90 62, 15 72, 55 80 C 85 88, 30 95, 50 100"
          stroke="oklch(65% 0.06 230)"
          strokeWidth="0.15"
          strokeDasharray="0.8 0.6"
          fill="none"
          style={{ pathLength: journeyDraw }}
        />
        {/* Echo line — offset, even thinner */}
        <motion.path
          d="M 40 0 C 85 10, 15 22, 65 32 C 90 40, 10 50, 55 58 C 85 66, 20 76, 50 84 C 80 92, 35 98, 45 100"
          stroke="oklch(58% 0.05 45)"
          strokeWidth="0.08"
          fill="none"
          style={{ pathLength: journeyDraw }}
        />
      </svg>

      {/* ── 3 Fine vertical grid lines that "draw" downward ── */}
      <motion.div
        className="absolute inset-y-0 left-1/4 w-[1px] bg-champagne/20 origin-top"
        style={{ scaleY: line1Scale }}
      />
      <motion.div
        className="absolute inset-y-0 left-2/4 w-[1px] bg-champagne/20 origin-top"
        style={{ scaleY: line2Scale }}
      />
      <motion.div
        className="absolute inset-y-0 left-3/4 w-[1px] bg-champagne/20 origin-top"
        style={{ scaleY: line3Scale }}
      />

      {/* ── Grid Coordinates that fade in ── */}
      <motion.div
        style={{ opacity: coordsOpacity }}
        className="fixed top-12 left-0 w-full flex justify-between px-8 text-[7px] text-cream/30 uppercase tracking-[0.4em] font-mono"
      >
        <span>[ LAT. 13.0827° N ]</span>
        <span>[ EST. 2026 ]</span>
        <span>[ LNG. 80.2707° E ]</span>
      </motion.div>

      {/* ── Blueprint Crosshairs that appear sequentially ── */}
      <motion.div
        style={{ opacity: crosshair1Opacity }}
        className="absolute top-[20%] left-1/4 -translate-x-1/2 -translate-y-1/2 text-[14px] text-gold font-light select-none"
      >
        +
      </motion.div>
      <motion.div
        style={{ opacity: crosshair2Opacity }}
        className="absolute top-[45%] left-3/4 -translate-x-1/2 -translate-y-1/2 text-[14px] text-gold font-light select-none"
      >
        +
      </motion.div>
      <motion.div
        style={{ opacity: crosshair3Opacity }}
        className="absolute top-[70%] left-2/4 -translate-x-1/2 -translate-y-1/2 text-[14px] text-gold font-light select-none"
      >
        +
      </motion.div>
      <motion.div
        style={{ opacity: crosshair4Opacity }}
        className="absolute top-[90%] left-1/4 -translate-x-1/2 -translate-y-1/2 text-[14px] text-gold font-light select-none"
      >
        +
      </motion.div>

      {/* ── Small coordinate captions at crosshairs ── */}
      <motion.div
        style={{ opacity: crosshair1Opacity }}
        className="absolute top-[20%] left-1/4 translate-x-3 translate-y-1 text-[6px] text-cream/20 font-mono uppercase tracking-widest select-none"
      >
        N 13.082
      </motion.div>
      <motion.div
        style={{ opacity: crosshair2Opacity }}
        className="absolute top-[45%] left-3/4 translate-x-3 translate-y-1 text-[6px] text-cream/20 font-mono uppercase tracking-widest select-none"
      >
        E 80.271
      </motion.div>

      {/* ── Rotated side stamp that slides in ── */}
      <motion.div
        style={{ opacity: stampOpacity, x: stampX }}
        className="fixed top-[60%] left-6 text-[8px] tracking-[0.3em] font-serif italic text-cream origin-left -rotate-90 select-none"
      >
        CASA LUMIÈRE — ARCHITECTURAL PLAN
      </motion.div>
    </div>
  );
};
