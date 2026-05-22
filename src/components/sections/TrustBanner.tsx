"use client";

import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = ["HDFC BANK", "SBI REALTY", "TATA PROJECTS", "SOTHEBY'S", "GODREJ PROPERTIES", "DLF LUXURY"];

export const TrustBanner = () => {
  return (
    <section className="py-12 border-y border-champagne overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-[0.4em] text-cream font-medium mb-8">
        Trusted by Industry Leaders
      </p>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-20 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span key={i} className="text-xl md:text-2xl font-serif text-cream hover:text-gold transition-colors duration-500 cursor-default tracking-widest">
              {name}
            </span>
          ))}
        </motion.div>
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep-forest to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-deep-forest to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};
