"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Standard scroll position tracker. Bind DIRECTLY to translate-y
  // — earlier we ran scrollY through a useSpring for a soft luxury
  // feel, but the spring under-damps enough that anchor-link clicks
  // visually stop 1-2 sections short of the target. The viewport
  // still scrolls to the right scrollY, but the wrapper's translate
  // lags behind and overshoots/undershoots. Without the spring the
  // wrapper tracks scrollY 1:1, so window.scrollTo lands the user
  // exactly on whatever section they asked for.
  const { scrollY } = useScroll();

  // Translate scroll direction into translate3d movement.
  const y = useTransform(scrollY, (value) => -value);

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
        data-smooth-scroll-content
        className="fixed top-0 left-0 w-full overflow-hidden flex flex-col will-change-transform z-10"
      >
        {children}
      </motion.div>
    </>
  );
};
