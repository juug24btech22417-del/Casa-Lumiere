"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Calculator, Camera, FileText, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

const TOOLS = [
  {
    title: "EMI Calculator",
    desc: "Plan your investment with transparent monthly breakdowns and payment splits.",
    icon: <Calculator size={26} />,
    href: "/emi-calculator",
    accent: "from-gold/20 to-transparent",
    badge: "Financial Tool",
  },
  {
    title: "Drone Tour",
    desc: "Experience the estate from above with aerial footage and panoramic views.",
    icon: <Camera size={26} />,
    href: "/drone-tour",
    accent: "from-blue-400/15 to-transparent",
    badge: "Visual Tour",
  },
  {
    title: "Document Vault",
    desc: "Access verified title deeds, survey maps, and legal documents for every plot.",
    icon: <FileText size={26} />,
    href: "/documents",
    accent: "from-emerald-400/15 to-transparent",
    badge: "Legal Hub",
  },
  {
    title: "The Vision",
    desc: "Drag the slider to see the transformation from raw land to developed estate.",
    icon: <SlidersHorizontal size={26} />,
    href: "/vision",
    accent: "from-purple-400/15 to-transparent",
    badge: "Before & After",
  },
];

export const ToolsSection = () => {
  return (
    <section id="tools" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gold/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Investor Toolkit</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            Tools & <span className="text-gold-gradient">Resources</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            Everything you need to make an informed decision, at your fingertips.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link href={tool.href}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative glass-card rounded-2xl p-8 h-full hover:border-gold/20 transition-all duration-500 group overflow-hidden cursor-pointer"
                >
                  {/* Hover glow */}
                  <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Badge + Arrow */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[9px] uppercase tracking-widest text-cream font-bold px-3 py-1 rounded-full border border-champagne">
                        {tool.badge}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-deep-forest border border-champagne flex items-center justify-center text-cream/60 group-hover:text-gold group-hover:bg-gold/10 transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
                      {tool.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl text-ivory font-serif mb-2 group-hover:text-gold transition-colors">{tool.title}</h3>
                    <p className="text-sm text-cream font-light leading-relaxed">{tool.desc}</p>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
