"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { type Locale, getStrings } from '@/lib/i18n/strings';

const STORAGE_KEY = 'banashri_locale_v1';

interface LocaleContextType {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Look up a translation key. Falls back to English if the key
   *  is missing in the active locale, then to the key itself. */
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  // Always start with 'en' on the server so SSR markup is consistent.
  // On the client, hydrate from localStorage in a useEffect.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'kn')) {
        setLocaleState(saved);
      }
    } catch {
      // ignore — localStorage may be disabled
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const active = getStrings(locale);
    if (key in active) return active[key];
    // Fallback: try English, then return the key so missing strings
    // are visible in dev (no silent empty strings).
    const fallback = getStrings('en');
    return key in fallback ? fallback[key] : key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
