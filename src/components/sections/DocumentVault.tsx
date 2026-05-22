"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FileText, Shield, MapPin, Scale, Download, Lock, Eye, ChevronDown } from 'lucide-react';

const DOCUMENTS = [
  {
    plot: 'A-01',
    docs: [
      { name: 'Title Deed Certificate', type: 'Legal', icon: <Scale size={18} />, size: '2.4 MB', verified: true },
      { name: 'Survey & Boundary Map', type: 'Survey', icon: <MapPin size={18} />, size: '5.1 MB', verified: true },
      { name: 'Encumbrance Certificate', type: 'Legal', icon: <Shield size={18} />, size: '1.8 MB', verified: true },
      { name: 'Land Use Approval', type: 'Govt', icon: <FileText size={18} />, size: '3.2 MB', verified: true },
    ],
  },
  {
    plot: 'A-02',
    docs: [
      { name: 'Title Deed Certificate', type: 'Legal', icon: <Scale size={18} />, size: '2.1 MB', verified: true },
      { name: 'Survey & Boundary Map', type: 'Survey', icon: <MapPin size={18} />, size: '4.8 MB', verified: true },
      { name: 'Development Plan', type: 'Planning', icon: <FileText size={18} />, size: '6.3 MB', verified: false },
    ],
  },
  {
    plot: 'B-01',
    docs: [
      { name: 'Title Deed Certificate', type: 'Legal', icon: <Scale size={18} />, size: '2.3 MB', verified: true },
      { name: 'Survey & Boundary Map', type: 'Survey', icon: <MapPin size={18} />, size: '5.5 MB', verified: true },
      { name: 'Encumbrance Certificate', type: 'Legal', icon: <Shield size={18} />, size: '1.6 MB', verified: true },
    ],
  },
];

export const DocumentVault = () => {
  const [openPlot, setOpenPlot] = useState<string | null>('A-01');

  return (
    <section id="documents" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-gold/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Transparency First</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            Document <span className="text-gold-gradient">Vault</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            Every legal document, verified and accessible. No hidden surprises.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {DOCUMENTS.map(plotDocs => {
            const isOpen = openPlot === plotDocs.plot;
            const verifiedCount = plotDocs.docs.filter(d => d.verified).length;

            return (
              <div key={plotDocs.plot} className="glass rounded-2xl overflow-hidden">
                {/* Plot header */}
                <button
                  onClick={() => setOpenPlot(isOpen ? null : plotDocs.plot)}
                  className="w-full px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-deep-forest/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-serif font-bold text-sm">
                      {plotDocs.plot}
                    </div>
                    <div className="text-left">
                      <h3 className="text-ivory font-serif text-lg">Plot {plotDocs.plot}</h3>
                      <p className="text-cream/70 text-xs">
                        {plotDocs.docs.length} documents · <span className="text-available">{verifiedCount} verified</span>
                      </p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="text-cream/60" size={20} />
                  </motion.div>
                </button>

                {/* Documents list */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 space-y-2">
                        {plotDocs.docs.map((doc, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-4 rounded-xl bg-deep-forest hover:bg-deep-forest/80 transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold/80 group-hover:text-gold transition-colors">
                                {doc.icon}
                              </div>
                              <div>
                                <p className="text-ivory text-sm font-medium">{doc.name}</p>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-[9px] uppercase tracking-widest text-cream font-bold">{doc.type}</span>
                                  <span className="text-cream/30 text-[9px]">·</span>
                                  <span className="text-cream font-medium text-[9px]">{doc.size}</span>
                                  {doc.verified && (
                                    <>
                                      <span className="text-cream/30 text-[9px]">·</span>
                                      <span className="flex items-center gap-1 text-available text-[9px] uppercase tracking-widest font-bold">
                                        <Shield size={9} /> Verified
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="w-8 h-8 rounded-full flex items-center justify-center text-cream/60 hover:text-gold transition-colors cursor-pointer" title="Preview">
                                <Eye size={14} />
                              </button>
                              <button className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold/60 hover:text-gold hover:bg-gold/20 transition-all cursor-pointer" title="Download">
                                <Download size={14} />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Security note */}
                        <div className="flex items-center gap-2 pt-3 px-2">
                          <Lock size={11} className="text-cream/40" />
                          <span className="text-[9px] text-cream/40 uppercase tracking-widest">Documents secured with 256-bit encryption</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
