"use client";

import React, { useState, useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, X, CheckCircle2 } from 'lucide-react';
import { CONTACT } from '@/lib/pricing';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plotNumber: string;
}

export const BookingModal = ({ isOpen, onClose, plotNumber }: BookingModalProps) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'calendar'>('whatsapp');
  const [form, setForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", { "styles": { "branding": { "brandColor": "#c9a84c" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hello! I'm ${form.name}. I'd like to inquire about Plot ${plotNumber}. Phone: ${form.phone}`);
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = "w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder:text-cream/15";

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ivory/60 backdrop-blur-md" onClick={onClose} />
        {/* Ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative w-full max-w-xl glass rounded-2xl p-7 shadow-gold-lg overflow-hidden flex flex-col"
          style={{ minHeight: '500px' }}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 text-cream/30 hover:text-cream transition-colors cursor-pointer z-10"><X size={16} /></button>

          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl text-ivory font-serif mb-1">Book Plot {plotNumber}</h3>
            <p className="text-cream/70 text-sm">Choose how you would like to proceed.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6">
            <button 
              onClick={() => setActiveTab('whatsapp')}
              className={cn("flex-1 py-2 text-xs uppercase tracking-widest font-bold rounded-lg transition-colors", activeTab === 'whatsapp' ? "bg-gold text-ivory" : "text-cream/60 hover:text-cream")}
            >
              Quick Inquiry
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={cn("flex-1 py-2 text-xs uppercase tracking-widest font-bold rounded-lg transition-colors", activeTab === 'calendar' ? "bg-gold text-deep-forest" : "text-cream/40 hover:text-cream/70")}
            >
              Schedule Visit
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {activeTab === 'whatsapp' ? (
                <motion.div key="whatsapp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5 h-full flex flex-col justify-center">
                  <div className="space-y-4 flex-1">
                    <div><label className="text-[10px] uppercase tracking-widest text-cream/35 pl-1 font-medium">Full Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className={inputClass} /></div>
                    <div><label className="text-[10px] uppercase tracking-widest text-cream/35 pl-1 font-medium">Phone Number</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." className={inputClass} /></div>
                  </div>
                  <Button onClick={handleWhatsApp} className="w-full mt-auto">Send WhatsApp Inquiry</Button>
                </motion.div>
              ) : (
                <motion.div key="calendar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <Cal
                    calLink="dhruv-bijapur-3xhyri/15min"
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{ layout: 'month_view', theme: 'dark' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
