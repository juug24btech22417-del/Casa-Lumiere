"use client";

/**
 * Smooth-scroll to a page anchor. The site wraps content in a
 * <SmoothScroll> component (a motion.div with will-change: transform)
 * which intercepts native window scroll. Default browser behaviour
 * for `<a href="#plots">` does scroll the window, but the smooth-scroll
 * wrapper sometimes doesn't fully catch up, leaving the page visually
 * pinned. We bypass that by computing the target's offsetTop from the
 * document and calling window.scrollTo ourselves.
 *
 * If we're already past the target, we still scroll to it (this lets
 * the user "jump back up" from a later section).
 *
 * Callers should pass only the fragment without the `#` (e.g.
 * scrollToAnchor('plots')). The function silently no-ops if the
 * target doesn't exist on the current page.
 */
export const scrollToAnchor = (id: string): void => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });
};