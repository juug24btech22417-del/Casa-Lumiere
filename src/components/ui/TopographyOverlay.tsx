"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * TopographyOverlay renders 3 sequential SVG layers that build as you scroll:
 *   Layer 1: Topo contour lines (pathLength draw)
 *   Layer 2: Water features (opacity fade)
 *   Layer 3: Plot grid boundaries (drop in from above)
 */
export const TopographyOverlay = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  // ── Layer 1: Contour lines draw over 0%→40% of section scroll ──
  const contourDraw = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const contourOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // ── Layer 2: Water features fade in over 25%→55% ──
  const waterOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  // ── Layer 3: Plot boundaries drop in over 45%→75% ──
  const plotOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const plotY = useTransform(scrollYProgress, [0.45, 0.7], [-30, 0]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ═══ LAYER 1: Topographic contour lines ═══ */}
        <motion.g style={{ opacity: contourOpacity }}>
          {/* Outer contours */}
          <motion.path
            d="M 50 300 Q 150 180 300 220 Q 450 260 550 180 Q 650 100 750 200"
            stroke="oklch(52% 0.10 28 / 0.12)"
            strokeWidth="1"
            fill="none"
            style={{ pathLength: contourDraw }}
          />
          <motion.path
            d="M 60 340 Q 180 240 320 260 Q 460 280 560 220 Q 660 160 740 240"
            stroke="oklch(52% 0.10 28 / 0.10)"
            strokeWidth="0.8"
            fill="none"
            style={{ pathLength: contourDraw }}
          />
          <motion.path
            d="M 70 380 Q 200 300 340 310 Q 480 320 580 260 Q 670 210 730 280"
            stroke="oklch(52% 0.10 28 / 0.08)"
            strokeWidth="0.8"
            fill="none"
            style={{ pathLength: contourDraw }}
          />
          {/* Inner contours */}
          <motion.path
            d="M 100 420 Q 230 350 370 360 Q 500 370 600 310 Q 680 270 720 320"
            stroke="oklch(52% 0.10 28 / 0.06)"
            strokeWidth="0.6"
            fill="none"
            style={{ pathLength: contourDraw }}
          />
          <motion.path
            d="M 80 460 Q 250 400 400 400 Q 530 400 620 360 Q 700 330 750 370"
            stroke="oklch(52% 0.10 28 / 0.06)"
            strokeWidth="0.6"
            fill="none"
            style={{ pathLength: contourDraw }}
          />
          {/* Elevation markers */}
          <motion.text
            x="300" y="210" fontSize="8" fill="oklch(52% 0.10 28 / 0.15)"
            fontFamily="monospace"
            style={{ opacity: contourDraw }}
          >
            +820m
          </motion.text>
          <motion.text
            x="560" y="170" fontSize="8" fill="oklch(52% 0.10 28 / 0.15)"
            fontFamily="monospace"
            style={{ opacity: contourDraw }}
          >
            +835m
          </motion.text>
        </motion.g>

        {/* ═══ LAYER 2: Water features (streams & reservoir) ═══ */}
        <motion.g style={{ opacity: waterOpacity }}>
          {/* Main stream */}
          <motion.path
            d="M 200 100 Q 220 200 250 280 Q 280 360 260 450 Q 240 520 280 580"
            stroke="oklch(60% 0.08 230 / 0.2)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
            style={{ pathLength: waterOpacity }}
          />
          {/* Small reservoir */}
          <motion.ellipse
            cx="260" cy="420" rx="30" ry="18"
            fill="oklch(60% 0.08 230 / 0.06)"
            stroke="oklch(60% 0.08 230 / 0.15)"
            strokeWidth="0.8"
          />
          <motion.text
            x="295" y="425" fontSize="7" fill="oklch(60% 0.08 230 / 0.2)"
            fontFamily="monospace" fontStyle="italic"
          >
            reservoir
          </motion.text>
        </motion.g>

        {/* ═══ LAYER 3: Plot grid boundaries (drop in) ═══ */}
        <motion.g style={{ opacity: plotOpacity, y: plotY }}>
          {/* Plot boundary rectangles */}
          <motion.rect x="380" y="180" width="120" height="100" rx="3"
            stroke="oklch(52% 0.10 28 / 0.2)" strokeWidth="1.2" fill="oklch(52% 0.10 28 / 0.03)"
          />
          <motion.rect x="520" y="180" width="100" height="100" rx="3"
            stroke="oklch(52% 0.10 28 / 0.2)" strokeWidth="1.2" fill="oklch(52% 0.10 28 / 0.03)"
          />
          <motion.rect x="380" y="300" width="120" height="110" rx="3"
            stroke="oklch(52% 0.10 28 / 0.2)" strokeWidth="1.2" fill="oklch(52% 0.10 28 / 0.03)"
          />
          <motion.rect x="520" y="300" width="100" height="110" rx="3"
            stroke="oklch(52% 0.10 28 / 0.2)" strokeWidth="1.2" fill="oklch(52% 0.10 28 / 0.03)"
          />

          {/* Plot labels */}
          <motion.text x="420" y="240" fontSize="10" fill="oklch(52% 0.10 28 / 0.3)"
            fontFamily="serif" textAnchor="middle">A-01</motion.text>
          <motion.text x="565" y="240" fontSize="10" fill="oklch(52% 0.10 28 / 0.3)"
            fontFamily="serif" textAnchor="middle">A-02</motion.text>
          <motion.text x="420" y="360" fontSize="10" fill="oklch(52% 0.10 28 / 0.3)"
            fontFamily="serif" textAnchor="middle">B-01</motion.text>
          <motion.text x="565" y="360" fontSize="10" fill="oklch(52% 0.10 28 / 0.3)"
            fontFamily="serif" textAnchor="middle">B-02</motion.text>

          {/* Access road */}
          <motion.path
            d="M 380 430 L 380 520 Q 380 540 400 540 L 620 540"
            stroke="oklch(48% 0.015 70 / 0.15)"
            strokeWidth="3"
            strokeDasharray="8 4"
            fill="none"
          />
          <motion.text x="500" y="558" fontSize="7" fill="oklch(48% 0.015 70 / 0.2)"
            fontFamily="monospace" textAnchor="middle">ACCESS ROAD — 40FT</motion.text>
        </motion.g>
      </svg>
    </div>
  );
};
