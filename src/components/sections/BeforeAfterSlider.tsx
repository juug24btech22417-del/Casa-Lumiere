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
          className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none glass border border-champagne"
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          {/* AFTER layer (full width, always behind) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a25] via-[#0e2518] to-[#0a1a10]">
            {/* Developed estate visualization */}
            <svg width="100%" height="100%" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
              {/* Manicured road */}
              <rect x="0" y="62" width="160" height="6" fill="rgba(201,168,76,0.08)" rx="1" />
              <line x1="0" y1="65" x2="160" y2="65" stroke="rgba(201,168,76,0.15)" strokeWidth="0.3" strokeDasharray="3 2" />

              {/* Developed plots with structures */}
              <rect x="10" y="15" width="35" height="38" rx="1" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.25)" strokeWidth="0.4" />
              <rect x="16" y="22" width="10" height="8" fill="rgba(201,168,76,0.12)" rx="0.5" />
              <rect x="30" y="28" width="8" height="6" fill="rgba(201,168,76,0.08)" rx="0.5" />

              <rect x="55" y="12" width="30" height="42" rx="1" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.4" />
              <rect x="60" y="18" width="12" height="10" fill="rgba(201,168,76,0.12)" rx="0.5" />
              <rect x="60" y="34" width="8" height="6" fill="rgba(201,168,76,0.08)" rx="0.5" />

              <rect x="95" y="18" width="28" height="35" rx="1" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.25)" strokeWidth="0.4" />
              <rect x="100" y="24" width="9" height="7" fill="rgba(201,168,76,0.12)" rx="0.5" />

              {/* Landscaping: trees */}
              {[[12,58],[24,58],[38,58],[56,58],[68,58],[80,58],[96,58],[108,58],[118,58],[48,30],[90,25],[130,30]].map(([cx,cy],i) => (
                <circle key={`dt-${i}`} cx={cx} cy={cy} r="2.5" fill="rgba(52,211,153,0.15)" />
              ))}

              {/* Water feature */}
              <ellipse cx="140" cy="60" rx="12" ry="5" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.15)" strokeWidth="0.3" />

              {/* Labels */}
              <text x="27" y="80" textAnchor="middle" fill="rgba(52,211,153,0.3)" fontSize="2.5" fontFamily="serif">A-01</text>
              <text x="70" y="80" textAnchor="middle" fill="rgba(201,168,76,0.3)" fontSize="2.5" fontFamily="serif">A-02</text>
              <text x="109" y="80" textAnchor="middle" fill="rgba(52,211,153,0.3)" fontSize="2.5" fontFamily="serif">B-01</text>
            </svg>

            {/* "After" label */}
            <div className="absolute top-5 right-5 px-4 py-2 bg-available/20 border border-available/30 rounded-full">
              <span className="text-[10px] uppercase tracking-widest text-available font-bold">After Development</span>
            </div>
          </div>

          {/* BEFORE layer (clipped by slider position) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1a1a12] via-[#12120c] to-[#0a0a06]"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            {/* Raw land visualization */}
            <svg width="100%" height="100%" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
              {/* Rough terrain lines */}
              <path d="M 0 55 Q 30 48, 60 52 Q 90 56, 120 50 Q 140 47, 160 52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <path d="M 0 62 Q 40 58, 80 63 Q 120 68, 160 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

              {/* Scattered wild elements */}
              {[[20,30],[45,25],[75,35],[110,28],[35,50],[85,48],[130,42],[15,60],[55,58],[95,62],[140,55]].map(([cx,cy],i) => (
                <circle key={`wt-${i}`} cx={cx} cy={cy} r={1 + Math.random()} fill="rgba(100,120,80,0.1)" />
              ))}

              {/* Rough path */}
              <path d="M 0 70 Q 40 68, 80 72 Q 120 70, 160 73" fill="none" stroke="rgba(180,150,100,0.08)" strokeWidth="1.5" />
            </svg>

            {/* "Before" label */}
            <div className="absolute top-5 left-5 px-4 py-2 bg-deep-forest border border-champagne rounded-full">
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
