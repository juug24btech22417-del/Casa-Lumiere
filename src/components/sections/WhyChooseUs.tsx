"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ShieldCheck, Map, Zap, FileText } from 'lucide-react';

const FEATURES = [
  { icon: <ShieldCheck size={28} />, title: "Legal Security", desc: "Every plot undergoes a 42-point legal audit with 100% clear title guarantee.", accent: "from-emerald-500/20 to-transparent" },
  { icon: <Map size={28} />, title: "Precision Mapping", desc: "GPS-tagged boundaries with centimeter-accurate digital topographical surveys.", accent: "from-gold/20 to-transparent" },
  { icon: <Zap size={28} />, title: "Rapid Infrastructure", desc: "Access roads, utilities, and sustainable amenities planned before development.", accent: "from-blue-500/20 to-transparent" },
  { icon: <FileText size={28} />, title: "Digital Vault", desc: "Access deeds, surveys, and permits anytime through our secure cloud archive.", accent: "from-purple-500/20 to-transparent" },
];

export const WhyChooseUs = () => {
  return (
    <section id="why" className="py-28 relative overflow-hidden">
      {/* Section background with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold/[0.08] rounded-full blur-[160px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/[0.05] rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">The Standard</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-5">
            Why Trust <span className="text-gold-gradient">RuralLand</span>
          </h2>
          <p className="text-cream text-lg max-w-2xl mx-auto font-light">
            We bridge the gap between traditional land acquisition and modern investment standards.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative glass-card rounded-2xl p-8 h-full hover:border-gold/20 transition-all duration-500 group overflow-hidden"
              >
                {/* Subtle colored glow per card */}
                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-lg text-ivory font-serif mb-3">{f.title}</h3>
                  <p className="text-sm text-cream font-light leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
