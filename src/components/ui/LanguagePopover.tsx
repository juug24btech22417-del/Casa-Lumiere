"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLocale } from '@/lib/LocaleContext';
import { LOCALES } from '@/lib/i18n/strings';

interface LanguagePopoverProps {
  /** Where the popover anchors relative to the trigger.
   *  - 'down' (default): popover hangs below — used in the navbar.
   *  - 'up': popover floats above — used in the footer. */
  anchor?: 'up' | 'down';
}

/**
 * Globe icon button that opens a small popover with the three locale
 * chips (EN / हिंदी / ಕನ್ನಡ). Shared by the navbar and the footer so
 * there's one source of truth for the picker UI.
 */
export const LanguagePopover = ({ anchor = 'down' }: LanguagePopoverProps) => {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isUp = anchor === 'up';
  const popoverPosition = isUp
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="Language"
        aria-expanded={open}
        className="w-9 h-9 rounded-full glass flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
      >
        <Globe size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: isUp ? 6 : -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isUp ? 6 : -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-20 glass rounded-xl border border-cream/20 shadow-gold-lg p-1.5 flex gap-1 ${popoverPosition}`}
          >
            {LOCALES.map(opt => {
              const active = opt.code === locale;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setLocale(opt.code);
                    setOpen(false);
                  }}
                  className={[
                    'px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer min-w-[2.5rem] text-center',
                    active
                      ? 'bg-gold text-ivory'
                      : 'text-cream/70 hover:text-ivory hover:bg-white/[0.06]',
                  ].join(' ')}
                  aria-pressed={active}
                >
                  {opt.native}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};