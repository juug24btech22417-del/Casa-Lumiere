"use client";

/**
 * Smooth-scroll to a page anchor.
 *
 * The page wraps content in <SmoothScroll>, a position:fixed
 * motion.div that translates -scrollY. A sibling ghost spacer
 * (height = wrapper.scrollHeight) is what the browser actually
 * scrolls through — the wrapper just paints content on top of
 * the viewport at top:0.
 *
 * With the wrapper translated by -scrollY, the target's
 * getBoundingClientRect().top equals its natural offset within
 * the wrapper MINUS the current scrollY. So:
 *
 *     naturalOffset = rect.top + window.scrollY
 *
 * That's the value we want to scroll the window to — the ghost
 * spacer's scrollHeight equals the wrapper's, so when
 * window.scrollY == naturalOffset the ghost has scrolled by
 * exactly that amount, which brings the target to viewport top.
 *
 * We deliberately do NOT strip the wrapper's transform to measure,
 * because that would cause the wrapper to snap to viewport top:0
 * mid-click — the user would see a flash to the top of the page
 * before the smooth scroll kicks in.
 *
 * Callers should pass only the fragment without the `#` (e.g.
 * `scrollToAnchor('plots')`). The function silently no-ops if
 * the target doesn't exist on the current page.
 */
export const scrollToAnchor = (id: string): void => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;

  const wrapper = document.querySelector<HTMLElement>('[data-smooth-scroll-content]');
  if (!wrapper) {
    // No SmoothScroll wrapper — the page scrolls natively.
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Add the current scroll position to recover the target's
  // natural offset within the wrapper (the value that maps
  // directly to window.scrollY via the ghost spacer).
  const target = el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top: target, behavior: 'smooth' });
};
