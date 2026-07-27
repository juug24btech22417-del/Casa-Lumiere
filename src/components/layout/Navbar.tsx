"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { LanguagePopover } from '@/components/ui/LanguagePopover';
import { useLocale } from '@/lib/LocaleContext';
import { LOCALES } from '@/lib/i18n/strings';
import { scrollToAnchor } from '@/lib/smoothScroll';

const NAV_LINKS = [
  { label: 'The Map', href: '#plots' },
  { label: 'Our Edge', href: '#why' },
  { label: 'Stories', href: '#testimonials' },
];

// The navbar's in-page links point to `#plots`, `#why`, `#testimonials`.
// Plain `<a href="#...">` would rely on the browser's default fragment
// scroll, which doesn't play nicely with our <SmoothScroll> wrapper
// (a motion.div with will-change: transform). We intercept the click
// and call our own smoothScroll helper so the page actually moves.
const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
  const id = href.startsWith('#') ? href.slice(1) : '';
  if (!id) return;
  // If we're on a different page, let the link navigate normally.
  if (typeof window !== 'undefined' && window.location.pathname !== '/') return;
  e.preventDefault();
  scrollToAnchor(id);
};

export const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled ? "py-3 glass shadow-lg" : "py-6 bg-transparent"
    )}>
      {/* Gold scroll progress */}
      <div className="absolute top-0 left-0 h-[2px] bg-gold transition-all duration-150" style={{ width: `${progress}%` }} />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border-2 border-gold rounded-lg flex items-center justify-center text-gold font-serif text-lg font-bold group-hover:bg-gold group-hover:text-ivory transition-all duration-400">
            R
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-xl text-ivory">RuralLand</span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gold-dark font-semibold">Premium Estate</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleAnchorClick(link.href)}
              className="relative text-xs uppercase tracking-widest text-cream hover:text-gold-dark transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <div className="w-px h-5 bg-cream/20 mx-2" />
          <UnitToggle />
          <div className="w-px h-5 bg-cream/20 mx-2" />
          <LanguagePopover />
          <button
            type="button"
            onClick={onContactClick}
            className={cn(
              "relative overflow-hidden ml-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wider",
              "border border-cream/30 text-ivory cursor-pointer",
              // Pseudo-element that scales from 0 -> 1 on hover, and
              // back to 0 on mouse-leave (origin: left).
              "before:absolute before:inset-0 before:bg-gold-dark before:origin-left",
              "before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:before:scale-x-100 hover:border-gold-dark hover:text-ivory",
              "transition-colors duration-500"
            )}
          >
            <span className="relative z-10">{t('contact_us')}</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-ivory p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} onClick={(e) => { handleAnchorClick(link.href)(e); setMobileOpen(false); }} className="text-sm uppercase tracking-widest text-cream">
                  {link.label}
                </a>
              ))}

              {/* Language picker — row of pills for mobile (popover lives in the desktop cluster) */}
              <div className="flex items-center gap-1 p-1 glass rounded-full border border-cream/15">
                {LOCALES.map(opt => {
                  const active = opt.code === locale;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => setLocale(opt.code)}
                      aria-pressed={active}
                      className={[
                        'px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest transition-colors cursor-pointer min-w-[2.5rem]',
                        active
                          ? 'bg-gold text-ivory'
                          : 'text-cream/70 hover:text-ivory',
                      ].join(' ')}
                    >
                      {opt.native}
                    </button>
                  );
                })}
              </div>

              <Button size="sm" onClick={() => { onContactClick(); setMobileOpen(false); }}>{t('contact_us')}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
