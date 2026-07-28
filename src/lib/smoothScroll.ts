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

  // The page wraps content in <SmoothScroll>, a position:fixed
  // motion.div that translates -scrollY. The translate is driven
  // by a spring (stiffness: 45, damping: 15) — so even after
  // window.scrollTo reaches the right scrollY, the wrapper's
  // translate-y under-damps and visually stops short of the
  // target. The spring physics ignore the target and follow
  // scrollY with overshoot/undershoot.
  //
  // Fix: disable the transform during the scroll, then restore
  // once the smooth scroll completes. With transform:none the
  // wrapper stays at viewport top:0 always (it's position:fixed),
  // and the ghost spacer alone controls which part of the page
  // is visible. window.scrollTo lands exactly on the target and
  // stays there.
  const wrapper = document.querySelector<HTMLElement>('[data-smooth-scroll-content]');
  if (!wrapper) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const prevTransform = wrapper.style.transform;
  wrapper.style.transform = 'none';

  // Compute target — with transform stripped, getBoundingClientRect
  // gives the natural viewport position of the target. Add
  // window.scrollY to get the document position, which is where
  // the ghost spacer (the actual scrolling element) should land.
  const target = el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top: target, behavior: 'smooth' });

  // Restore the transform after the smooth scroll settles. We
  // wait 700ms because 'smooth' scroll on mobile can take that
  // long, and we want the wrapper to take over translating
  // again only after the scroll has actually finished — otherwise
  // the user sees a visible jump if the spring kicks in mid-scroll.
  window.setTimeout(() => {
    wrapper.style.transform = prevTransform;
  }, 700);
};