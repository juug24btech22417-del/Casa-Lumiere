"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock, Calendar } from 'lucide-react';
import { useLocale } from '@/lib/LocaleContext';

/**
 * A read-only viewer for the Privacy Policy / Terms of Service /
 * Security document. Each is short, public-facing, and now rendered
 * inline instead of going through a "request a copy" form.
 *
 * Content comes from the i18n dictionary (strings.ts) so it follows
 * the active locale automatically.
 *
 * Note: we portal to document.body to escape the SmoothScroll wrapper
 * — see the comment in BookingModal.tsx for the same trick.
 */

export type LegalDocumentKind = 'privacy' | 'terms' | 'security';

interface LegalDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  kind: LegalDocumentKind;
}

interface DocumentSection {
  key: string;
  index: number;
  heading: string;
  /** Lead paragraph — set when the section's strings file has a
   *  `${prefix}_b${n}_lead` key. Rendered above the body. */
  lead?: string;
  /** Main paragraph. May be empty for sections that only have a
   *  lead + bullets (e.g. terms section 5). */
  body?: string;
  /** Optional sub-line shown directly above the bullets (e.g.
   *  "We may share your information only:"). */
  bulletsSub?: string;
  /** Optional bullet list — items come from a pipe-separated string. */
  bulletItems?: string[];
}

const LAST_UPDATED = 'July 27, 2026';

const useMounted = (): boolean => {
  const [m, setM] = useState(false);
  useEffect(() => { setM(true); }, []);
  return m;
};

/** Per-kind structural metadata:
 *  - sectionCount: how many h1..hN sections the document has
 *  - introKey: which i18n key to render as the document's preamble
 *  - title/icon: shown in the header */
const KIND_META: Record<LegalDocumentKind, {
  sectionCount: number;
  introKey: string;
  title: string;
  icon: React.ReactNode;
}> = {
  privacy: {
    sectionCount: 10,
    introKey: 'legal_intro',
    title: 'footer_legal_privacy',
    icon: <ShieldCheck size={18} />,
  },
  terms: {
    sectionCount: 10,
    introKey: 'legal_intro',
    title: 'footer_legal_terms',
    icon: <FileText size={18} />,
  },
  security: {
    sectionCount: 4,
    introKey: 'security_intro',
    title: 'footer_legal_security',
    icon: <Lock size={18} />,
  },
};

export const LegalDocumentModal = ({ isOpen, onClose, kind }: LegalDocumentModalProps) => {
  const { t } = useLocale();
  const mounted = useMounted();

  // Resolve {brand} once and substitute everywhere it appears.
  const brand = t('legal_brand_name');
  const sub = (s: string) => s.replace(/\{brand\}/g, brand);

  // Treat a t() result that equals its key as missing. This is the
  // same fallback convention used elsewhere in the project.
  const isMissing = (v: string, k: string) => !v || v === k;

  const meta = KIND_META[kind];

  /** Build one document section by index. Reads from i18n keys
   *  `${prefix}_h${n}`, `${prefix}_b${n}`, plus optional
   *  `${prefix}_b${n}_lead` / `_sub` / `_intro` / `_items` variants.
   *
   *  Rules for combining the parts:
   *  1. `lead` is the lead paragraph above everything else.
   *     It comes from `b${n}_lead` when present (e.g. "We do not
   *     sell or rent your personal information.").
   *  2. `bulletsSub` is a short pre-bullet line. It comes from
   *     `b${n}_intro` (security) or `b${n}_sub` (privacy section 4),
   *     or, for sections where the pre-bullet text was stored as the
   *     base `b${n}` key (privacy section 1), from `b${n}` itself.
   *  3. `body` is the main paragraph. It is `b${n}` when there is
   *     no `_items` and no `_lead` (privacy section 3, security
   *     sections 3 & 4). Otherwise no body — the section reads as
   *     `lead → (bulletsSub) → bullets` or `bulletsSub → bullets`. */
  const buildSection = (idx: number): DocumentSection => {
    const n = String(idx);
    const prefix = kind;
    const baseKey = `${prefix}_b${n}`;
    const heading = t(`${prefix}_h${n}`);

    const leadKey = `${baseKey}_lead`;
    const leadRaw = t(leadKey);
    const lead = isMissing(leadRaw, leadKey) ? undefined : sub(leadRaw);

    const itemsKey = `${baseKey}_items`;
    const itemsRaw = t(itemsKey);
    const bulletItems = isMissing(itemsRaw, itemsKey)
      ? undefined
      : itemsRaw.split('|').map(s => s.trim()).filter(Boolean);

    // Pre-bullet line: try `_intro` (security), then `_sub` (privacy
    // section 4), then fall back to the base `b${n}` (privacy section
    // 1 — "When you use our website...").
    let bulletsSub: string | undefined;
    if (bulletItems) {
      const introRaw = t(`${baseKey}_intro`);
      const subRaw = t(`${baseKey}_sub`);
      const baseRaw = t(baseKey);
      if (!isMissing(introRaw, `${baseKey}_intro`)) {
        bulletsSub = sub(introRaw);
      } else if (!isMissing(subRaw, `${baseKey}_sub`)) {
        bulletsSub = sub(subRaw);
      } else if (!isMissing(baseRaw, baseKey)) {
        bulletsSub = sub(baseRaw);
      }
    }

    // Body: only when there are no bullets and no lead. The base key
    // is the body in that case.
    let body: string | undefined;
    if (!bulletItems && !lead) {
      const bodyRaw = t(baseKey);
      body = isMissing(bodyRaw, baseKey) ? undefined : sub(bodyRaw);
    }

    return {
      key: `${prefix}-h${n}`,
      index: idx,
      heading,
      lead,
      body,
      bulletsSub,
      bulletItems,
    };
  };

  const sections: DocumentSection[] = [];
  for (let i = 1; i <= meta.sectionCount; i++) sections.push(buildSection(i));

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ivory/60 backdrop-blur-md" onClick={onClose} />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative w-full max-w-2xl max-h-[85vh] glass rounded-2xl shadow-gold-lg overflow-hidden flex flex-col"
        >
          {/* Header — pinned, doesn't scroll with the body. */}
          <div className="px-7 pt-7 pb-5 border-b border-cream/10 flex items-start gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              {meta.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl text-ivory font-serif leading-tight">
                {t(meta.title)}
              </h3>
              <p className="text-cream/55 text-[11px] mt-1.5 flex items-center gap-1.5">
                <Calendar size={11} className="text-gold/70" />
                {t('legal_last_updated')}: {LAST_UPDATED}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-cream/30 hover:text-cream transition-colors cursor-pointer -mr-1 -mt-1 p-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Document body — scrollable. The "01", "02" ... prefix on
              each section heading is rendered in a muted gold for an
              editorial / contract feel. */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            <p className="text-cream/75 text-sm leading-relaxed mb-6">
              {sub(t(meta.introKey))}
            </p>
            {sections.map(s => (
              <section key={s.key} className="mb-5 last:mb-2">
                <h4 className="text-ivory text-sm font-medium mb-2 flex gap-2">
                  <span className="text-gold/70 font-mono text-xs pt-0.5 shrink-0">
                    {String(s.index).padStart(2, '0')}
                  </span>
                  <span>{s.heading}</span>
                </h4>
                {s.lead && (
                  <p className="text-cream/70 text-sm leading-relaxed mb-2">{s.lead}</p>
                )}
                {s.body && (
                  <p className="text-cream/70 text-sm leading-relaxed mb-2">{s.body}</p>
                )}
                {s.bulletItems && (
                  <>
                    {s.bulletsSub && (
                      <p className="text-cream/70 text-sm leading-relaxed mb-2">{s.bulletsSub}</p>
                    )}
                    <ul className="list-disc pl-6 space-y-1.5 text-cream/70 text-sm leading-relaxed">
                      {s.bulletItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            ))}
          </div>

          {/* Footer close — single CTA. Keeps the modal predictable. */}
          <div className="px-7 py-4 border-t border-cream/10 flex justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-gold text-ivory text-xs font-medium tracking-wider hover:bg-gold-light transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};


