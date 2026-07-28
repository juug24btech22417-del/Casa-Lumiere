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
 * DIAGNOSTIC BUILD — also writes a banner onto the page so we
 * can see what the function sees without DevTools.
 */

interface ScrollDiag {
  id: string;
  rectTop: number;
  scrollY: number;
  computed: number;
  clamped: number;
  ghostHeight: number;
  docScrollHeight: number;
  windowInnerHeight: number;
  maxScroll: number;
  wrapperTransform: string;
  ts: string;
}

declare global {
  interface Window {
    __scrollDiag?: ScrollDiag[];
  }
}

const writeBanner = (d: ScrollDiag) => {
  if (typeof document === 'undefined') return;
  let banner = document.getElementById('__scroll_diag_banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = '__scroll_diag_banner';
    banner.style.cssText = [
      'position:fixed','top:0','left:0','right:0','z-index:99999',
      'background:rgba(0,0,0,0.92)','color:#7CFC00',
      'font:11px/1.4 monospace','padding:8px 10px',
      'white-space:pre','max-height:90vh','overflow:auto',
      'border-bottom:2px solid #7CFC00',
    ].join(';');
    document.body.appendChild(banner);
  }
  const lines = [
    `id=${d.id}  ts=${d.ts}`,
    `rectTop=${d.rectTop.toFixed(0)}  scrollY=${d.scrollY.toFixed(0)}`,
    `computed=${d.computed.toFixed(0)}  clamped=${d.clamped.toFixed(0)}`,
    `ghost=${d.ghostHeight.toFixed(0)}  docScrollH=${d.docScrollHeight.toFixed(0)}`,
    `innerH=${d.windowInnerHeight.toFixed(0)}  maxScroll=${d.maxScroll.toFixed(0)}`,
    `wrapper.transform=${d.wrapperTransform.slice(0, 80)}`,
  ];
  banner.textContent = lines.join('\n') + '\n\n' + (banner.dataset.prev ?? '');
  banner.dataset.prev = banner.textContent;
};

const collect = (id: string): ScrollDiag | null => {
  if (typeof window === 'undefined') return null;
  const el = document.getElementById(id);
  if (!el) return null;
  const wrapper = document.querySelector<HTMLElement>('[data-smooth-scroll-content]');
  const ghost = wrapper?.previousElementSibling as HTMLElement | null;
  const rectTop = el.getBoundingClientRect().top;
  const scrollY = window.scrollY;
  const computed = rectTop + scrollY;
  const ghostHeight = ghost?.clientHeight ?? NaN;
  const docScrollHeight = document.documentElement.scrollHeight;
  const windowInnerHeight = window.innerHeight;
  const maxScroll = Math.max(0, docScrollHeight - windowInnerHeight);
  const wrapperTransform = wrapper ? getComputedStyle(wrapper).transform : 'NO_WRAPPER';
  const d: ScrollDiag = {
    id,
    rectTop,
    scrollY,
    computed,
    clamped: 0, // filled in by caller
    ghostHeight,
    docScrollHeight,
    windowInnerHeight,
    maxScroll,
    wrapperTransform,
    ts: new Date().toISOString().slice(11, 23),
  };
  return d;
};

export const scrollToAnchor = (id: string): void => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) {
    console.warn('[scrollToAnchor] no element with id', id);
    return;
  }

  const wrapper = document.querySelector<HTMLElement>('[data-smooth-scroll-content]');

  if (!wrapper) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const d = collect(id);
  if (!d) return;
  d.clamped = Math.max(0, Math.min(d.computed, d.maxScroll));

  // Persist for postmortem.
  window.__scrollDiag = (window.__scrollDiag ?? []).concat(d).slice(-5);
  writeBanner(d);

  // Try smooth scroll.
  window.scrollTo({ top: d.clamped, behavior: 'smooth' });

  // After 1.5s, verify where we actually ended up.
  window.setTimeout(() => {
    const endY = window.scrollY;
    const endBanner = document.getElementById('__scroll_diag_banner');
    const extra = [
      `── after 1500ms ──`,
      `endScrollY=${endY.toFixed(0)}  expected≈${d.clamped.toFixed(0)}`,
      `Δ=${(endY - d.clamped).toFixed(0)}`,
    ].join('\n');
    if (endBanner) endBanner.textContent = endBanner.textContent + '\n' + extra;
  }, 1500);
};