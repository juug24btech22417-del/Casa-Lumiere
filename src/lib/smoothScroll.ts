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

  // The page wraps content in <SmoothScroll>, a fixed-position
  // motion.div that translates -scrollY. The ghost spacer is what
  // actually scrolls the window. To land on the target, we need
  // the target's position WITHIN the content wrapper's natural
  // layout — i.e. where the ghost spacer should scroll to.
  //
  // Walk up from the target until we hit the content wrapper (the
  // smooth-scroll content element). The walk sums every intervening
  // sibling's offsetTop on the way up, giving us the target's
  // natural offset from the top of the content. Then scroll the
  // window to that offset.
  //
  // The wrapper element is identified by either the data attribute
  // we set or by being the only fixed-position ancestor.
  const wrapper = document.querySelector<HTMLElement>('[data-smooth-scroll-content]');
  let target: number | null = null;
  if (wrapper) {
    let cur: HTMLElement | null = el;
    let acc = 0;
    while (cur && cur !== wrapper) {
      acc += cur.offsetTop;
      cur = cur.offsetParent as HTMLElement | null;
    }
    target = acc;
  }
  if (target == null) {
    // Fallback: use the target's own offsetTop from the document.
    target = el.getBoundingClientRect().top + window.scrollY;
  }
  window.scrollTo({ top: target, behavior: 'smooth' });
};