"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface InkRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Where in the viewport the reveal begins (0 = top, 1 = bottom) */
  startAt?: number;
  /** Where in the viewport the reveal completes */
  endAt?: number;
  /** Direction the ink spreads from */
  direction?: 'left' | 'right' | 'center';
}

export const InkReveal = ({
  children,
  className = '',
  startAt = 0.85,
  endAt = 0.35,
  direction = 'left',
}: InkRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startAt}`, `start ${endAt}`],
  });

  // 0% → 115% (overshoot ensures full reveal)
  const revealPercent = useTransform(scrollYProgress, [0, 1], [0, 115]);

  // Build the mask gradient direction
  const maskDirection =
    direction === 'right' ? 'to left' :
    direction === 'center' ? 'to right' : // center uses dual mask below
    'to right';

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        // @ts-expect-error CSS custom property
        '--ink-reveal': useTransform(revealPercent, (v) => `${v}%`),
      }}
    >
      <div
        className="ink-reveal-mask"
        style={{
          maskImage:
            direction === 'center'
              ? `linear-gradient(to right, transparent calc(50% - var(--ink-reveal, 0%) / 2), black calc(50% - var(--ink-reveal, 0%) / 2 + 10%), black calc(50% + var(--ink-reveal, 0%) / 2 - 10%), transparent calc(50% + var(--ink-reveal, 0%) / 2))`
              : `linear-gradient(${maskDirection}, black calc(var(--ink-reveal, 0%) - 10%), transparent var(--ink-reveal, 0%))`,
          WebkitMaskImage:
            direction === 'center'
              ? `linear-gradient(to right, transparent calc(50% - var(--ink-reveal, 0%) / 2), black calc(50% - var(--ink-reveal, 0%) / 2 + 10%), black calc(50% + var(--ink-reveal, 0%) / 2 - 10%), transparent calc(50% + var(--ink-reveal, 0%) / 2))`
              : `linear-gradient(${maskDirection}, black calc(var(--ink-reveal, 0%) - 10%), transparent var(--ink-reveal, 0%))`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
