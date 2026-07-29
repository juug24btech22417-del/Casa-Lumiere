"use client";

/**
 * Smooth-scroll to a page anchor.
 *
 * Architecture: <SmoothScroll> wraps content in a position:fixed
 * motion.div that translates -scrollY (running through a soft
 * useSpring for the weighted luxury feel). A sibling ghost spacer
 * provides the actual scrollable height.
 *
 * Challenge: the spring under-damps just enough that on plain
 * `window.scrollTo(target)`, the wrapper's translate lags behind
 * `scrollY` and the user sees the page stop 1-2 sections short
 * of the target. To compensate, the SmoothScroll component
 * exposes a window-level `__smoothScrollSnap(y)` that snaps the
 * wrapper translate to `-y` for the duration of the browser's
 * smooth scroll. We call that here, then `window.scrollTo`.
 */

declare global {
  interface Window {
    /** Set by <SmoothScroll> on mount. Snaps the wrapper to
     *  translateY(-targetY) for ~1.2s, bypassing the spring so
     *  anchor nav lands exactly. */
    __smoothScrollSnap?: (targetY: number) => void;
  }
}

export const scrollToAnchor = (id: string): void => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;

  // No SmoothScroll wrapper on this page (rare): use native scroll.
  const wrapper = document.querySelector<HTMLElement>('[data-smooth-scroll-content]');
  if (!wrapper) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Recover the target's natural offset within the wrapper. With
  // the wrapper translated by -scrollY, getBoundingClientRect().top
  // is shifted by -scrollY, so adding scrollY back gives the value
  // scrollY needs to be for the target to hit viewport top.
  const naturalOffset = el.getBoundingClientRect().top + window.scrollY;

  // Snap the wrapper instantly so the spring doesn't lag.
  window.__smoothScrollSnap?.(naturalOffset);

  window.scrollTo({ top: naturalOffset, behavior: 'smooth' });
};
