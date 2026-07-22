"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { InkReveal } from '@/components/ui/InkReveal';
import { ShieldCheck, Map, Zap, FileText } from 'lucide-react';
import { useLocale } from '@/lib/LocaleContext';

// Icon + accent stay at module level — they have no text.
// Titles and descriptions come from the active locale at render time.
const FEATURE_ICONS = [
  { icon: <ShieldCheck size={28} />, accent: 'from-emerald-500/20 to-transparent' },
  { icon: <Map size={28} />, accent: 'from-gold/20 to-transparent' },
  { icon: <Zap size={28} />, accent: 'from-blue-500/20 to-transparent' },
  { icon: <FileText size={28} />, accent: 'from-purple-500/20 to-transparent' },
];

// Keys are looked up in the i18n dictionary, so the title/desc
// strings get re-resolved on every locale change.
const FEATURE_KEYS = [
  { titleKey: 'why_feature_legal_title', descKey: 'why_feature_legal_desc' },
  { titleKey: 'why_feature_mapping_title', descKey: 'why_feature_mapping_desc' },
  { titleKey: 'why_feature_infra_title', descKey: 'why_feature_infra_desc' },
  { titleKey: 'why_feature_vault_title', descKey: 'why_feature_vault_desc' },
];

export const WhyChooseUs = () => {
  const { t } = useLocale();

  return (
    <section id="why" className="py-28 relative overflow-hidden">
      {/* Section background with depth (transparent to show grid) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold/[0.08] rounded-full blur-[160px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/[0.05] rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-gold/40 text-[10px] font-mono tracking-[0.5em] uppercase block mb-4">03 / 04</span>
          <InkReveal direction="center">
            <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-5">
              {t('why_headline_1')}{' '}
              <span className="text-gold-gradient">{t('why_headline_2')}</span>
            </h2>
          </InkReveal>
          <InkReveal direction="center" startAt={0.9} endAt={0.5}>
            <p className="text-cream text-lg max-w-2xl mx-auto font-light">
              {t('why_subtitle')}
            </p>
          </InkReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_KEYS.map((k, i) => {
            const meta = FEATURE_ICONS[i];
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative glass-card rounded-2xl p-8 h-full hover:border-gold/20 transition-all duration-500 group overflow-hidden"
                >
                  {/* Subtle colored glow per card */}
                  <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
                      {meta.icon}
                    </div>
                    <h3 className="text-lg text-ivory font-serif mb-3">{t(k.titleKey)}</h3>
                    <p className="text-sm text-cream font-light leading-relaxed">{t(k.descKey)}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
