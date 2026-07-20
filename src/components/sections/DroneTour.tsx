"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DroneVideo } from '@/components/ui/DroneVideo';
import { Play, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GALLERY = [
  { id: 1, label: 'Aerial Overview', desc: 'Full estate from 200ft altitude', gradient: 'from-[#e8ddd0] via-[#ddd0c0] to-[#d4c5b2]' },
  { id: 2, label: 'Plot A-01 Boundary', desc: 'GPS-marked corners with survey pins', gradient: 'from-[#e0d5c5] via-[#d8cab8] to-[#cfc0ac]' },
  { id: 3, label: 'Access Road', desc: '40ft wide, connecting to NH-48', gradient: 'from-[#ddd5cc] via-[#d4ccc2] to-[#ccc2b8]' },
  { id: 4, label: 'Water Reservoir', desc: 'Natural lake on the eastern edge', gradient: 'from-[#d8d2cc] via-[#d0c8c0] to-[#c8c0b5]' },
  { id: 5, label: 'Sunset View', desc: 'West-facing plots, golden hour capture', gradient: 'from-[#e5d8c5] via-[#dccbb5] to-[#d2c0a8]' },
];

export const DroneTour = () => {
  const [active, setActive] = useState(0);
  const prev = () => setActive((active - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setActive((active + 1) % GALLERY.length);
  const item = GALLERY[active];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Aerial Footage</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            Drone <span className="text-gold-gradient">Tour</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            Experience the estate from above before you visit.
          </p>
        </ScrollReveal>

        {/* ═══ LIVE DRONE CAPTURE — Banashri Enclave aerial video ═══ */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-5">
            <div>
              <span className="text-gold/40 text-[10px] font-mono tracking-[0.5em] uppercase block mb-2">
                Live Capture
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-ivory">
                Banashri <span className="text-gold-gradient">Enclave</span> from above
              </h3>
            </div>
            <p className="hidden md:block text-cream/50 text-xs max-w-xs text-right font-light">
              A real drone pass — roads, lighting and landscape as they stand today.
            </p>
          </div>
          <DroneVideo
            src="/banashri-drone.mp4"
            caption="Drone Capture"
            showBadge
            aspect="16/9"
          />
        </div>

        {/* Main viewer */}
        <div className="relative rounded-2xl overflow-hidden glass border border-champagne">
          <div className="aspect-[16/9] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              >
                {/* Simulated drone view pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`topo-${active}`} width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(168,89,58,0.25)" strokeWidth="0.5" />
                        <circle cx="30" cy="30" r="12" fill="none" stroke="rgba(168,89,58,0.15)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#topo-${active})`} />
                  </svg>
                </div>

                {/* Center play indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-gold/60 hover:text-gold hover:scale-110 transition-all cursor-pointer group">
                    <Play size={28} className="ml-1 group-hover:drop-shadow-[0_0_8px_rgba(168,89,58,0.4)]" />
                  </div>
                </div>

                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-surface/90 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-serif text-ivory mb-1">{item.label}</h3>
                      <p className="text-cream text-sm">{item.desc}</p>
                    </div>
                    <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold/50 hover:text-gold transition-colors cursor-pointer">
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Drone badge */}
                <div className="absolute top-5 left-5 px-4 py-2 glass rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sold animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest text-cream/60 font-bold">Drone Capture</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-cream/50 hover:text-gold z-20 cursor-pointer"><ChevronLeft size={20} /></button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-cream/50 hover:text-gold z-20 cursor-pointer"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar pb-2">
          {GALLERY.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-28 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                i === active ? 'ring-2 ring-gold scale-105' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${g.gradient} flex items-center justify-center`}>
                <span className="text-[8px] uppercase tracking-widest text-cream font-bold text-center px-1">{g.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
