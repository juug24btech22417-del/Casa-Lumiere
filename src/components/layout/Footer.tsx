"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Globe, Mail, MessageSquare, Share2, ArrowUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '@/lib/pricing';
import { useLocale } from '@/lib/LocaleContext';
import { LOCALES, type Locale } from '@/lib/i18n/strings';

export type LegalKind = 'privacy' | 'terms' | 'security' | 'cookies';

interface FooterProps {
  /** Called when a legal link in the footer is clicked */
  onLegalClick: (kind: LegalKind) => void;
}

export const Footer = ({ onLegalClick }: FooterProps) => {
  const { t, locale, setLocale } = useLocale();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Nav links driven by translation keys so the list re-renders on locale change.
  const NAV_LINKS: { key: string; href: string }[] = [
    { key: 'footer_nav_map', href: '#plots' },
    { key: 'footer_nav_plans', href: '#' },
    { key: 'footer_nav_updates', href: '#' },
    { key: 'footer_nav_vision', href: '/vision' },
  ];

  // Legal links driven by translation.
  const LEGAL_LINKS: { kind: LegalKind; key: string }[] = [
    { kind: 'privacy', key: 'footer_legal_privacy' },
    { kind: 'terms', key: 'footer_legal_terms' },
    { kind: 'cookies', key: 'footer_legal_cookies' },
    { kind: 'security', key: 'footer_legal_security' },
  ];

  // Prefilled WhatsApp message (English — your dad will reply in English).
  const whatsappMsg = encodeURIComponent(
    `Hi! I have a question about ${CONTACT.brand}.`
  );
  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Inquiry about ${CONTACT.brand}`)}`;
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${whatsappMsg}`;

  return (
    <footer className="bg-surface border-t border-champagne pt-20 pb-10 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-gold rounded-lg flex items-center justify-center text-gold font-serif text-lg font-bold">R</div>
              <span className="font-serif text-xl text-ivory">{CONTACT.brand}</span>
            </div>
            <p className="text-cream text-sm leading-relaxed max-w-xs">
              {t('footer_brand_tagline')}
            </p>
            <div className="flex gap-3">
              {/* Globe — language switcher popover */}
              <LanguagePopover locale={locale} setLocale={setLocale} />

              {/* Mail — opens default mail client */}
              <FooterIconLink href={mailHref} label="Email">
                <Mail size={16} />
              </FooterIconLink>

              {/* MessageSquare — WhatsApp deep link */}
              <FooterIconLink href={whatsappHref} label="WhatsApp" external>
                <MessageSquare size={16} />
              </FooterIconLink>

              {/* Share2 — native share sheet with clipboard fallback */}
              <ShareButton copiedLabel={t('share_link_copied')} />
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-ivory font-serif mb-6">{t('footer_navigate')}</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.key}>
                  <a href={link.href} className="text-cream hover:text-gold transition-colors text-sm">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-ivory font-serif mb-6">{t('footer_legal')}</h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(item => (
                <li key={item.kind}>
                  <button
                    type="button"
                    onClick={() => onLegalClick(item.kind)}
                    className="text-cream hover:text-gold transition-colors text-sm text-left cursor-pointer"
                  >
                    {t(item.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-ivory font-serif mb-6">{t('footer_newsletter')}</h4>
            <p className="text-cream text-sm mb-5">{t('footer_newsletter_text')}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer_newsletter_placeholder')}
                className="bg-deep-forest border border-champagne rounded-full px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold transition-colors flex-1 placeholder:text-cream/60"
              />
              <button className="w-10 h-10 rounded-full bg-gold text-deep-forest flex items-center justify-center hover:bg-gold-light transition-colors cursor-pointer">
                <ArrowUp className="rotate-45" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-champagne flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/60 text-xs">
            {t('footer_copyright').replace('{brand}', CONTACT.brand)}
          </p>
          <button onClick={scrollTop} className="group flex items-center gap-2 text-cream hover:text-gold transition-colors cursor-pointer">
            <span className="text-[10px] uppercase tracking-widest font-bold">{t('footer_back_to_top')}</span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:border-gold/30 transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

/* ─── Small helpers (kept in-file for locality) ─── */

interface FooterIconLinkProps {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}

const FooterIconLink = ({ href, label, external, children }: FooterIconLinkProps) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    aria-label={label}
    className="w-9 h-9 rounded-full glass flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold/30 transition-all"
  >
    {children}
  </a>
);

const ShareButton = ({ copiedLabel }: { copiedLabel: string }) => {
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const onShare = async () => {
    const shareData = {
      title: typeof document !== 'undefined' ? document.title : '',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    // Native share (mobile) — wrapped because some browsers throw
    // synchronously even when navigator.share exists.
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return; // user shared — no toast
      } catch (err) {
        // AbortError = user cancelled. Fall through to clipboard.
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }
    // Clipboard fallback
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
      } else {
        // very old browsers — fallback via a hidden textarea
        const ta = document.createElement('textarea');
        ta.value = shareData.url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setToast(true);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(false), 2000);
    } catch {
      // ignore — user can copy from address bar if all else fails
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onShare}
        aria-label="Share"
        className="w-9 h-9 rounded-full glass flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
      >
        <Share2 size={16} />
      </button>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-deep-forest border border-gold/30 text-[10px] text-ivory flex items-center gap-1.5 shadow-lg z-20"
          >
            <Check size={10} className="text-available" />
            {copiedLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LanguagePopover = ({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) => {
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
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 glass rounded-xl border border-cream/20 shadow-gold-lg p-1.5 flex gap-1"
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
