"use client";

import React, { useRef, useState, useCallback } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = useCallback((e: React.MouseEvent) => { if (isDragging) updatePosition(e.clientX); }, [isDragging, updatePosition]);
  const onTouchMove = useCallback((e: React.TouchEvent) => { updatePosition(e.touches[0].clientX); }, [updatePosition]);

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-gold/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">The Vision</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            Before & <span className="text-gold-gradient">After</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            Drag the slider to see the transformation from raw land to developed estate.
          </p>
        </ScrollReveal>

        {/* Slider container */}
        <div
          ref={containerRef}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none glass border border-champagne bg-deep-forest"
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          {/* AFTER layer (full width, always behind) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vision-after.jpeg"
            alt="Banashri Enclave — after development"
            className="absolute inset-0 w-full h-full object-cover saturate-[1.15] contrast-[1.08]"
          />
          {/* Deep-forest darken (40%) + top/bottom vignette so the colours
              read richer and the labels stay legible on bright skies. */}
          <div className="absolute inset-0 bg-deep-forest/40 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-deep-forest/55 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-deep-forest/55 to-transparent pointer-events-none" />

          {/* "After" label */}
          <div className="absolute top-5 right-5 px-4 py-2 bg-available/25 border border-available/40 rounded-full z-10 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-widest text-available font-bold">After Development</span>
          </div>

          {/* BEFORE layer (clipped by slider position) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/vision-before.jpeg"
              alt="Banashri Enclave — raw land before development"
              className="absolute inset-0 w-full h-full object-cover saturate-[1.15] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-deep-forest/40 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-deep-forest/55 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-deep-forest/55 to-transparent pointer-events-none" />

            {/* "Before" label */}
            <div className="absolute top-5 left-5 px-4 py-2 bg-deep-forest/90 border border-champagne rounded-full backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-widest text-cream font-bold">Raw Land</span>
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-20"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
          >
            {/* Vertical line */}
            <div className="w-0.5 h-full bg-gold mx-auto" />
            {/* Handle knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-gold-lg cursor-grab active:cursor-grabbing">
              <ArrowLeftRight size={16} className="text-surface" />
            </div>
          </div>
        </div>

        {/* Labels below */}
        <div className="flex justify-between mt-4 px-2">
          <span className="text-[10px] uppercase tracking-widest text-cream/60 font-bold">← Raw Land</span>
          <span className="text-[10px] uppercase tracking-widest text-cream/60 font-bold">Developed Estate →</span>
        </div>
      </div>
    </section>
  );
};
