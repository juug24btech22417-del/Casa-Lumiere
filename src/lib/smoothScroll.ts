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
 * To land on the target we need its offset within the wrapper's
 * natural content layout. Temporarily strip the transform so we
 * can measure the target's position relative to the wrapper, then
 * scroll the window to that offset. The window's smooth-scroll
 * then drags scrollY there, and once the wrapper's transform is
 * restored, the spring tracks the new scroll position.
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

  // Temporarily remove the wrapper's transform so the target's
  // getBoundingClientRect is in the wrapper's NATURAL coordinate
  // space (i.e. its offset from the wrapper's top:0 origin).
  // With the transform in place, rect.top is shifted by -scrollY
  // and "target - scrollY" doesn't equal any meaningful number.
  const prevTransform = wrapper.style.transform;
  wrapper.style.transform = 'none';

  // rect.top is the target's natural y-offset within the wrapper.
  // The ghost spacer's scrollHeight equals the wrapper's, so
  // when window.scrollY == rect.top the ghost has scrolled by
  // exactly that amount, which brings the target to viewport top.
  const target = el.getBoundingClientRect().top;

  window.scrollTo({ top: target, behavior: 'smooth' });

  // Restore the transform after the smooth scroll completes so
  // the wrapper continues to translate for normal scrolling.
  // 700ms covers most smooth-scroll animations on mobile; the
  // wrapper will resume tracking scrollY via Framer Motion's
  // useScroll either way, but restoring after the scroll avoids
  // a single-frame jump where the transform snaps back into
  // place at the old position.
  window.setTimeout(() => {
    wrapper.style.transform = prevTransform;
  }, 700);
};
