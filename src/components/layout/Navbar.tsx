"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { Magnetic } from '@/components/ui/Magnetic';
import { useLocale } from '@/lib/LocaleContext';

const NAV_LINKS = [
  { label: 'The Map', href: '#plots' },
  { label: 'Our Edge', href: '#why' },
  { label: 'Stories', href: '#testimonials' },
];

export const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const { t } = useLocale();
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
              className="relative text-xs uppercase tracking-widest text-cream hover:text-gold-dark transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <div className="w-px h-5 bg-cream/20 mx-2" />
          <Magnetic>
            <UnitToggle />
          </Magnetic>
          <Magnetic>
            {/* Custom fill-sweep hover: white -> crimson wiping in from
                the left on hover, and wiping back out to the left on
                mouse-leave (transform-origin: left). */}
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
          </Magnetic>
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
                <a key={link.label} href={link.href} className="text-sm uppercase tracking-widest text-cream" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <Button size="sm" onClick={() => { onContactClick(); setMobileOpen(false); }}>{t('contact_us')}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
