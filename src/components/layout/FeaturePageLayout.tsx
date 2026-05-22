"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const FeaturePageLayout = ({
  children,
  backLabel = "Back to Home",
}: {
  children: React.ReactNode;
  backLabel?: string;
}) => {
  return (
    <main className="relative min-h-screen bg-deep-forest overflow-x-hidden">
      {/* Fixed back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 glass rounded-full text-cream/50 hover:text-gold transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">{backLabel}</span>
        </Link>
      </motion.div>

      {/* Page content */}
      <div className="pt-20 pb-16">
        {children}
      </div>
    </main>
  );
};
