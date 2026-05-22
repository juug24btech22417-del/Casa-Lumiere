"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: "Vikram Sethi", role: "Tech Entrepreneur", content: "The level of transparency in their mapping and legal documentation is unheard of in rural land deals. RuralLand didn't just sell me a plot — they sold me peace of mind.", avatar: "VS" },
  { name: "Ananya Iyer", role: "Architectural Designer", content: "Seeing drone tours and GPS-mapped boundaries before even visiting saved me weeks. The digital experience perfectly mirrors the luxury of the land itself.", avatar: "AI" },
  { name: "Rohan Malhotra", role: "Estate Investor", content: "Premium plots, meticulous planning, and an AI assistant that actually knows the details. This is the future of real estate development in India.", avatar: "RM" },
];

export const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((idx + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute inset-0 border-t border-champagne" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gold/[0.06] rounded-full blur-[160px] rotate-12 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-14">
          <Quote className="mx-auto text-gold/30 mb-5" size={36} />
          <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-3">
            Voices of our <span className="text-gold-gradient">Patrons</span>
          </h2>
        </ScrollReveal>

        <div className="relative glass rounded-3xl p-8 md:p-14 shadow-gold-lg overflow-hidden">
          {/* Inner ambient light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[80px] bg-gold/10 rounded-full blur-[50px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-cream font-light italic leading-relaxed mb-10 max-w-2xl">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Avatar as initials (no external image dependency) */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center text-gold font-serif font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <h4 className="text-ivory font-serif text-base">{t.name}</h4>
                  <p className="text-gold text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-10 relative z-10">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === idx ? 'bg-gold scale-125' : 'bg-champagne hover:bg-cream/30'}`} />
            ))}
            <button onClick={next} className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
