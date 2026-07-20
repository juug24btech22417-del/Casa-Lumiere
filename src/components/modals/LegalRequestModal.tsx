"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CONTACT } from '@/lib/pricing';

export type LegalRequestKind = 'privacy' | 'terms' | 'security';

interface LegalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Which document the user is requesting — drives the modal copy */
  kind: LegalRequestKind;
}

const KIND_META: Record<LegalRequestKind, {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fields: ('name' | 'phone' | 'email' | 'message')[];
  messagePlaceholder: string;
}> = {
  privacy: {
    title: 'Request Privacy Policy',
    subtitle: 'We will email you our privacy policy and walk you through how we handle your information.',
    icon: <ShieldCheck size={18} />,
    fields: ['name', 'phone', 'email'],
    messagePlaceholder: 'Any specific concern? (optional)',
  },
  terms: {
    title: 'Request Terms of Service',
    subtitle: 'Get our terms of service and any other agreement docs you need to review before committing.',
    icon: <FileText size={18} />,
    fields: ['name', 'phone', 'email'],
    messagePlaceholder: 'Any specific concern? (optional)',
  },
  security: {
    title: 'Security Archive Request',
    subtitle: 'Request copies of title verification, encumbrance certificates, or other ownership documents.',
    icon: <Lock size={18} />,
    fields: ['name', 'phone', 'email', 'message'],
    messagePlaceholder: 'Which document do you need? (e.g. title verification, encumbrance certificate)',
  },
};

export const LegalRequestModal = ({ isOpen, onClose, kind }: LegalRequestModalProps) => {
  const meta = KIND_META[kind];
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder:text-cream/15';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);

    const documentLabel = meta.title;
    const aiSummary = `Legal request — ${documentLabel}${
      form.message ? ` | Notes: ${form.message}` : ''
    }`;

    // Fire-and-forget Supabase save (don't block the WhatsApp redirect)
    void supabase
      .from('leads')
      .insert([
        {
          full_name: form.name,
          phone_number: form.phone,
          email: form.email || null,
          status: 'new',
          ai_summary: aiSummary,
        },
      ])
      .then(({ error }) => {
        if (error) console.warn('Supabase lead insert failed:', error.message);
      });

    // Open WhatsApp with a prefilled message
    const msg = encodeURIComponent(
      `Hello! I'm ${form.name} (${form.phone}${
        form.email ? `, ${form.email}` : ''
      }). I'd like to request: ${documentLabel}${
        form.message ? `. Notes: ${form.message}` : ''
      }. Please share the document at your convenience.`
    );
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`, '_blank');

    setSubmitting(false);
    setSubmitted(true);

    // Auto-close after a short pause
    setTimeout(() => {
      handleClose();
    }, 1600);
  };

  const handleClose = () => {
    setForm({ name: '', phone: '', email: '', message: '' });
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-ivory/60 backdrop-blur-md" onClick={handleClose} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative w-full max-w-xl glass rounded-2xl p-7 shadow-gold-lg overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-cream/30 hover:text-cream transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 min-h-[320px]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-16 h-16 rounded-full bg-available/20 flex items-center justify-center text-available mb-4"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <h3 className="text-2xl text-ivory font-serif mb-2">Request sent</h3>
              <p className="text-cream/70 text-sm max-w-sm">
                We've opened WhatsApp with your details. We will share the document shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  {meta.icon}
                </div>
                <div>
                  <h3 className="text-xl text-ivory font-serif leading-tight">{meta.title}</h3>
                  <p className="text-cream/60 text-xs mt-1 leading-relaxed">{meta.subtitle}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {meta.fields.includes('name') && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/35 pl-1 font-medium">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                )}
                {meta.fields.includes('phone') && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/35 pl-1 font-medium">
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 ..."
                      className={inputClass}
                    />
                  </div>
                )}
                {meta.fields.includes('email') && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/35 pl-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                )}
                {meta.fields.includes('message') && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/35 pl-1 font-medium">
                      Document Needed
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder={meta.messagePlaceholder}
                      rows={3}
                      className={inputClass}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !form.name || !form.phone}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ivory px-7 py-3.5 text-sm tracking-wider font-medium cursor-pointer hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send via WhatsApp</>
                  )}
                </button>

                <p className="text-cream/40 text-[10px] text-center leading-relaxed">
                  Submitting will open WhatsApp with your details pre-filled. We save your
                  contact to our CRM so we can follow up.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
