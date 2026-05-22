"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const ArchitecturalGrid = () => {
  return (
    <div className="absolute inset-0 w-full h-full min-h-screen overflow-hidden pointer-events-none z-0">
      {/* 4 Fine grid lines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-champagne/15" />
      <div className="absolute inset-y-0 left-2/4 w-[1px] bg-champagne/15" />
      <div className="absolute inset-y-0 left-3/4 w-[1px] bg-champagne/15" />

      {/* Grid Coordinates & Blueprint Markers */}
      <div className="sticky top-12 left-0 w-full flex justify-between px-8 text-[7px] text-cream/30 uppercase tracking-[0.4em] font-mono">
        <span>[ LAT. 13.0827° N ]</span>
        <span>[ EST. 2026 ]</span>
        <span>[ LNG. 80.2707° E ]</span>
      </div>

      {/* Floating Blueprint Crosshairs */}
      <div className="absolute top-[20%] left-1/4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] text-gold/20 font-light select-none">+</div>
      <div className="absolute top-[45%] left-3/4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] text-gold/20 font-light select-none">+</div>
      <div className="absolute top-[70%] left-2/4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] text-gold/20 font-light select-none">+</div>
      <div className="absolute top-[90%] left-1/4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] text-gold/20 font-light select-none">+</div>

      {/* Subtle coordinate stamp */}
      <div className="absolute top-[60%] left-6 text-[8px] tracking-[0.3em] font-serif italic text-cream/20 origin-left -rotate-90 select-none">
        RURALLAND ARCHITECTURAL PLAN
      </div>
    </div>
  );
};
