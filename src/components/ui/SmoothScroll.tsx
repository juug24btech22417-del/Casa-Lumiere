"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Standard scroll position tracker
  const { scrollY } = useScroll();

  // Fine-tuned luxury spring physics interpolation
  const springScroll = useSpring(scrollY, {
    stiffness: 45, // Soft, heavy luxury travel feel
    damping: 15,
    mass: 0.15,
    restDelta: 0.005,
    restSpeed: 0.005,
  });

  // Translate scroll direction into translate3d movement
  const y = useTransform(springScroll, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    // Initial resize trigger
    handleResize();

    // Observe layout/dom shifts and recalculate height
    const resizeObserver = new ResizeObserver(() => {
      // Small timeout to allow DOM changes to settle
      setTimeout(handleResize, 100);
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      {/* Ghost scroll spacer matching dynamic viewport height */}
      <div 
        style={{ height: contentHeight }} 
        className="w-full relative pointer-events-none z-0" 
      />
      
      {/* Rigid viewport boundary that performs soft inertia travel */}
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden flex flex-col will-change-transform z-10"
      >
        {children}
      </motion.div>
    </>
  );
};
