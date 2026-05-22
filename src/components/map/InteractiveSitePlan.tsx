"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Compass, TreePine, Droplets } from 'lucide-react';
import { useUnit } from '@/lib/UnitContext';

interface Plot {
  id: string;
  plot_number: string;
  price: string;
  area: string;
  status: 'available' | 'developing' | 'sold';
  image: string;
}

interface SitePlanProps {
  plots: Plot[];
  selectedId: string | null;
  onPlotClick: (id: string) => void;
}

const STATUS_FILL: Record<string, { base: string; hover: string; border: string; label: string }> = {
  available: { base: "fill-available/20", hover: "fill-available/35", border: "stroke-available/50", label: "Available" },
  developing: { base: "fill-developing/20", hover: "fill-developing/35", border: "stroke-developing/50", label: "In Progress" },
  sold: { base: "fill-sold/15", hover: "fill-sold/25", border: "stroke-sold/40", label: "Sold" },
};

// Layout coordinates for each plot on the SVG canvas (percentage-based)
const PLOT_LAYOUT = [
  { id: '1', x: 8, y: 18, w: 28, h: 30 },
  { id: '2', x: 42, y: 12, w: 24, h: 36 },
  { id: '3', x: 72, y: 22, w: 22, h: 28 },
];

export const InteractiveSitePlan = ({ plots, selectedId, onPlotClick }: SitePlanProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { formatArea } = useUnit();

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#EDE8E0] via-[#E5DED5] to-[#E0D8CC] rounded-2xl overflow-hidden select-none">

      {/* Decorative background texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Ambient glow behind selected plot */}
      {selectedId && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-gold/[0.06] rounded-full blur-[80px] pointer-events-none transition-all duration-700" />
      )}

      {/* Main SVG Site Plan */}
      <svg
        viewBox="0 0 100 70"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ═══ Decorative Elements ═══ */}

        {/* Main road */}
        <path
          d="M 0 55 Q 25 52, 50 54 Q 75 56, 100 53"
          fill="none"
          stroke="rgba(168,89,58,0.15)"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
        <text x="50" y="58" textAnchor="middle" fill="rgba(168,89,58,0.3)" fontSize="2" fontFamily="sans-serif" letterSpacing="0.3">
          MAIN ACCESS ROAD
        </text>

        {/* Secondary path */}
        <path
          d="M 38 55 L 38 48 Q 38 44, 42 44 L 42 12"
          fill="none"
          stroke="rgba(45,39,32,0.08)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Water feature */}
        <ellipse cx="88" cy="58" rx="8" ry="4" fill="rgba(56,189,248,0.06)" stroke="rgba(56,189,248,0.12)" strokeWidth="0.3" />
        <text x="88" y="59" textAnchor="middle" fill="rgba(56,189,248,0.15)" fontSize="1.4" fontFamily="sans-serif">
          LAKE
        </text>

        {/* Tree clusters */}
        {[[15, 58], [25, 60], [55, 60], [78, 58], [5, 35], [95, 40]].map(([cx, cy], i) => (
          <circle key={`tree-${i}`} cx={cx} cy={cy} r="1.5" fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.15)" strokeWidth="0.3" />
        ))}

        {/* ═══ Plot Parcels ═══ */}
        {PLOT_LAYOUT.map(layout => {
          const plot = plots.find(p => p.id === layout.id);
          if (!plot) return null;

          const style = STATUS_FILL[plot.status];
          const isSelected = selectedId === plot.id;
          const isHovered = hoveredId === plot.id;

          return (
            <g key={plot.id}>
              {/* Selection glow */}
              {isSelected && (
                <rect
                  x={layout.x - 1}
                  y={layout.y - 1}
                  width={layout.w + 2}
                  height={layout.h + 2}
                  rx="1.5"
                  fill="none"
                  stroke="rgba(201,168,76,0.4)"
                  strokeWidth="0.6"
                  className="animate-pulse"
                />
              )}

              {/* Plot shape */}
              <motion.rect
                x={layout.x}
                y={layout.y}
                width={layout.w}
                height={layout.h}
                rx="1"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  isHovered || isSelected ? style.hover : style.base,
                  style.border
                )}
                strokeWidth={isSelected ? "0.6" : "0.3"}
                onMouseEnter={() => setHoveredId(plot.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onPlotClick(plot.id)}
                whileHover={{ scale: 1.01 }}
              />

              {/* Plot label */}
              <text
                x={layout.x + layout.w / 2}
                y={layout.y + layout.h / 2 - 3}
                textAnchor="middle"
                fill={isSelected ? "rgba(168,89,58,0.9)" : "rgba(45,38,32,0.5)"}
                fontSize="3.5"
                fontFamily="serif"
                fontWeight="bold"
                className="pointer-events-none transition-all duration-300"
              >
                {plot.plot_number}
              </text>

              {/* Area label */}
              <text
                x={layout.x + layout.w / 2}
                y={layout.y + layout.h / 2 + 2}
                textAnchor="middle"
                fill="rgba(45,38,32,0.3)"
                fontSize="1.8"
                fontFamily="sans-serif"
                className="pointer-events-none"
              >
                {formatArea(parseFloat(plot.area.replace(/,/g, '')))}
              </text>

              {/* Status badge */}
              <text
                x={layout.x + layout.w / 2}
                y={layout.y + layout.h / 2 + 6}
                textAnchor="middle"
                fill={
                  plot.status === 'available' ? "rgba(52,211,153,0.5)" :
                  plot.status === 'developing' ? "rgba(251,191,36,0.5)" :
                  "rgba(248,113,113,0.4)"
                }
                fontSize="1.5"
                fontFamily="sans-serif"
                letterSpacing="0.15"
                className="pointer-events-none uppercase"
              >
                ● {style.label}
              </text>

              {/* Corner markers */}
              {[
                [layout.x, layout.y],
                [layout.x + layout.w, layout.y],
                [layout.x, layout.y + layout.h],
                [layout.x + layout.w, layout.y + layout.h],
              ].map(([cx, cy], i) => (
                <circle key={`corner-${plot.id}-${i}`} cx={cx} cy={cy} r="0.5" fill="rgba(168,89,58,0.35)" className="pointer-events-none" />
              ))}
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(92, 8)">
          <circle cx="0" cy="0" r="4" fill="rgba(247,244,240,0.7)" stroke="rgba(168,89,58,0.3)" strokeWidth="0.3" />
          <text x="0" y="-1" textAnchor="middle" fill="rgba(168,89,58,0.6)" fontSize="2.5" fontWeight="bold" fontFamily="serif">N</text>
          <line x1="0" y1="0.5" x2="0" y2="3" stroke="rgba(168,89,58,0.3)" strokeWidth="0.3" />
        </g>

        {/* Scale bar */}
        <g transform="translate(5, 66)">
          <line x1="0" y1="0" x2="15" y2="0" stroke="rgba(201,168,76,0.2)" strokeWidth="0.3" />
          <line x1="0" y1="-0.8" x2="0" y2="0.8" stroke="rgba(201,168,76,0.2)" strokeWidth="0.3" />
          <line x1="15" y1="-0.8" x2="15" y2="0.8" stroke="rgba(201,168,76,0.2)" strokeWidth="0.3" />
          <text x="7.5" y="2.5" textAnchor="middle" fill="rgba(201,168,76,0.2)" fontSize="1.5" fontFamily="sans-serif">100m</text>
        </g>
      </svg>

      {/* Floating hover tooltip */}
      {hoveredId && (() => {
        const plot = plots.find(p => p.id === hoveredId);
        const layout = PLOT_LAYOUT.find(l => l.id === hoveredId);
        if (!plot || !layout) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-30 glass rounded-xl px-4 py-3 shadow-gold pointer-events-none"
            style={{
              left: `${layout.x + layout.w / 2}%`,
              top: `${layout.y - 2}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <p className="text-ivory text-sm font-serif font-bold">Plot {plot.plot_number}</p>
            <p className="text-gold text-xs font-semibold">{plot.price}</p>
          </motion.div>
        );
      })()}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4">
        {[
          { color: 'bg-available', label: 'Available' },
          { color: 'bg-developing', label: 'Developing' },
          { color: 'bg-sold', label: 'Sold' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-[9px] uppercase tracking-widest text-cream font-bold">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Title badge */}
      <div className="absolute top-4 left-4 z-20 px-4 py-2 glass rounded-full flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-available animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-cream/70 font-bold">Estate Layout</span>
      </div>

      {/* Compass icon */}
      <div className="absolute top-4 right-4 z-20 text-gold/20">
        <Compass size={20} />
      </div>
    </div>
  );
};
