"use client";

import React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const STATS = [
  { value: 12, label: 'Premium Plots', suffix: '+' },
  { value: 100, label: 'Acres Managed', suffix: '' },
  { value: 24, label: 'Site Security', suffix: '/7' },
  { value: 100, label: 'Legal Verified', suffix: '%' },
];

export const StatsBar = () => {
  return (
    <section className="relative z-20 -mt-14 mx-auto max-w-5xl px-6">
      <div className="relative glass rounded-3xl p-8 md:p-12 shadow-gold-lg overflow-hidden">
        {/* Inner ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-gold/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center relative z-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-serif text-gold mb-2 flex justify-center items-baseline drop-shadow-[0_0_8px_rgba(168,89,58,0.3)]">
                <AnimatedCounter target={stat.value} duration={2} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70 font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
