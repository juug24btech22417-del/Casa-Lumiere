"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Preferences {
  essential: boolean; // always true, locked
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'banashri_cookie_prefs_v1';

const DEFAULT_PREFS: Preferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const CookiePreferencesModal = ({ isOpen, onClose }: CookiePreferencesModalProps) => {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);
  const [saved, setSaved] = useState(false);

  // Load saved preferences on open
  useEffect(() => {
    if (!isOpen) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Preferences>;
        setPrefs({
          essential: true,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      } else {
        setPrefs(DEFAULT_PREFS);
      }
    } catch {
      setPrefs(DEFAULT_PREFS);
    }
  }, [isOpen]);

  const save = (next: Preferences) => {
    setPrefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors (e.g. disabled cookies entirely)
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const acceptAll = () => save({ essential: true, analytics: true, marketing: true });
  const rejectAll = () => save({ essential: true, analytics: false, marketing: false });
  const saveCurrent = () => save(prefs);

  if (!isOpen) return null;

  const categories: {
    key: keyof Preferences;
    title: string;
    desc: string;
    locked?: boolean;
  }[] = [
    {
      key: 'essential',
      title: 'Essential',
      desc: 'Required for the site to function. Includes session, security, and form submissions. Always on.',
      locked: true,
    },
    {
      key: 'analytics',
      title: 'Analytics',
      desc: 'Anonymous usage data so we can understand which parts of the site are most useful. Helps us improve.',
    },
    {
      key: 'marketing',
      title: 'Marketing',
      desc: 'Used to personalize the content and ads you see across other sites. Off by default.',
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-ivory/60 backdrop-blur-md" onClick={onClose} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative w-full max-w-lg glass rounded-2xl p-7 shadow-gold-lg overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cream/30 hover:text-cream transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {saved ? (
            <div className="flex flex-col items-center justify-center text-center py-10 min-h-[280px]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-16 h-16 rounded-full bg-available/20 flex items-center justify-center text-available mb-4"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <h3 className="text-2xl text-ivory font-serif mb-2">Preferences saved</h3>
              <p className="text-cream/70 text-sm max-w-sm">
                You can change these any time from the footer.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <Cookie size={18} />
                </div>
                <div>
                  <h3 className="text-xl text-ivory font-serif leading-tight">Cookie preferences</h3>
                  <p className="text-cream/60 text-xs mt-1 leading-relaxed">
                    Choose which cookies we may use while you browse. Your choice is saved on this device.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {categories.map(cat => {
                  const enabled = prefs[cat.key];
                  return (
                    <div
                      key={cat.key}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-ivory text-sm font-medium">{cat.title}</h4>
                          {cat.locked && (
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-gold/70 font-bold">
                              <Lock size={9} /> Always on
                            </span>
                          )}
                        </div>
                        <p className="text-cream/55 text-xs leading-relaxed">{cat.desc}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          !cat.locked &&
                          setPrefs(p => ({ ...p, [cat.key]: !p[cat.key] }))
                        }
                        disabled={cat.locked}
                        className={[
                          'relative shrink-0 w-11 h-6 rounded-full transition-colors',
                          enabled ? 'bg-gold' : 'bg-white/10',
                          cat.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                        ].join(' ')}
                        aria-label={`${cat.title} cookies`}
                      >
                        <span
                          className={[
                            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-ivory shadow transition-transform',
                            enabled ? 'translate-x-5' : 'translate-x-0',
                          ].join(' ')}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" onClick={rejectAll} className="flex-1">
                  Reject all
                </Button>
                <Button variant="outline" size="sm" onClick={saveCurrent} className="flex-1">
                  Save choices
                </Button>
                <Button size="sm" onClick={acceptAll} className="flex-1">
                  Accept all
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
