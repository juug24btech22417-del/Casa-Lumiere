"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * SmoothScroll — premium soft-inertia scroll wrapper.
 *
 * Architecture:
 *   - <motion.div data-smooth-scroll-content> is position:fixed at top:0
 *     and translates by -springScroll, so a sibling ghost spacer
 *     (height = wrapper.scrollHeight) is what the browser actually
 *     scrolls.
 *   - useScroll().scrollY is the live window position.
 *   - springScroll = useSpring(scrollY, …) gives the soft luxury feel
 *     — the wrapper keeps gliding briefly after the user lifts their
 *     finger (high mass, low damping).
 *
 * Anchor navigation (see src/lib/smoothScroll.ts):
 *   Spring under-damp by itself → wrapper translate lags scrollY →
 *   anchors land 1-2 sections short. Fix: scrollToAnchor calls
 *   window.__smoothScrollSnap(targetY). We use springScroll.set() to
 *   instantaneously re-seed the spring at the target. The spring then
 *   tracks the window's smooth-scroll from its starting point (now
 *   already at the target) → wrapper ends up exactly at -targetY.
 *
 *   The trick is that `springScroll.set(targetY)` only sets the
 *   spring's CURRENT value. As the browser smooth-scrolls the window
 *   toward targetY, scrollY updates, the spring receives that as its
 *   source, and wraps a smooth easing curve over it — but the spring
 *   is already AT the target, so it doesn't need to chase anything.
 *   Both the window and the wrapper land at the target at the same
 *   moment.
 */

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollY } = useScroll();

  // Premium soft-spring feel — same tuning the user liked originally.
  const springScroll = useSpring(scrollY, {
    stiffness: 45,
    damping: 15,
    mass: 0.15,
    restDelta: 0.005,
    restSpeed: 0.005,
  });

  // Re-seed the spring at the anchor target so it doesn't lag behind
  // the window's smooth-scroll. Called from scrollToAnchor.
  useEffect(() => {
    window.__smoothScrollSnap = (targetY: number) => {
      // springScroll.set writes to the spring's current value, so on
      // the very next frame the wrapper's translate is -targetY. The
      // window's smooth-scroll then drags scrollY to the same target,
      // and the spring — already there — tracks it 1:1 (it's at
      // rest, so the spring's eased curve is a no-op).
      springScroll.set(targetY);
    };
    return () => {
      window.__smoothScrollSnap = undefined;
    };
  }, [springScroll]);

  const visualY = useTransform(springScroll, (v) => -v);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
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
        style={{ y: visualY }}
        data-smooth-scroll-content
        className="fixed top-0 left-0 w-full overflow-hidden flex flex-col will-change-transform z-10"
      >
        {children}
      </motion.div>
    </>
  );
};
