"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Eye, MapPin, Ruler, ShieldCheck } from 'lucide-react';
import { useUnit } from '@/lib/UnitContext';

interface PlotCardProps {
  plot: {
    id: string;
    plot_number: string;
    price: string;
    area: string;
    status: 'available' | 'developing' | 'sold';
    image: string;
  };
  isActive?: boolean;
  onClick: () => void;
}

const STATUS_STYLE: Record<string, string> = {
  available: "text-available bg-available/15 border-available/25",
  developing: "text-developing bg-developing/15 border-developing/25",
  sold: "text-sold bg-sold/15 border-sold/25",
};

const GRADIENTS = [
  "from-[#e8d5b8] via-[#dfc9a8] to-[#d4bc96]",
  "from-[#ecddc4] via-[#e3d0b4] to-[#d8c4a2]",
  "from-[#e6d3b6] via-[#dcc7a6] to-[#d2ba94]",
];

export const PlotCard = ({ plot, isActive, onClick }: PlotCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { formatArea } = useUnit();
  const [imgLoaded, setImgLoaded] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 20 });
  const springY = useSpring(my, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const gradIndex = parseInt(plot.id, 10) % GRADIENTS.length;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative cursor-pointer glass-card rounded-2xl overflow-hidden transition-all duration-500",
        isActive ? "ring-2 ring-gold shadow-gold-lg" : "hover:border-white/15"
      )}
    >
      {/* Image area — gradient is always visible, image overlays on load */}
      <div className="relative h-48 overflow-hidden">
        {/* Base: always-visible gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[gradIndex]}`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-gold/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-gold/5 rounded-full" />
          </div>
          <div className="absolute bottom-4 right-4 text-gold/10 font-serif text-5xl font-bold">{plot.plot_number}</div>
        </div>

        {/* Overlay: real image fades in when loaded */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={plot.image}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110",
            imgLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
        />

        {/* Top gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent z-10" />

        {/* Status badge */}
        <span className={cn("absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border backdrop-blur-sm", STATUS_STYLE[plot.status])}>
          {plot.status}
        </span>

        {/* Hover arrow */}
        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full glass flex items-center justify-center text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={15} />
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-serif text-ivory">Plot {plot.plot_number}</h3>
            <div className="flex items-center gap-1.5 text-gold-dark mt-1">
              <MapPin size={12} />
              <span className="text-[10px] uppercase tracking-widest">Premium Sector</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-gold-dark text-lg font-semibold">{plot.price}</span>
            <p className="text-[9px] text-cream/50 uppercase tracking-widest">{formatArea(parseFloat(plot.area.replace(/,/g, '')))}</p>
          </div>
        </div>

        <div className="flex gap-6 pt-3 border-t border-cream/15 text-cream/60 text-xs">
          <span className="flex items-center gap-1.5"><Ruler size={13} className="text-gold/50" /> {formatArea(parseFloat(plot.area.replace(/,/g, '')))}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-gold/50" /> Verified</span>
        </div>

        {/* Visitor counter — social proof */}
        {plot.status === 'available' && (
          <div className="flex items-center gap-2 pt-2 text-[9px] text-cream/50">
            <Eye size={11} className="text-gold/40" />
              <span className="uppercase tracking-widest font-bold">
              <span className="text-gold-dark">{12 + parseInt(plot.id) * 7}</span> people viewing today
            </span>
          </div>
        )}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
