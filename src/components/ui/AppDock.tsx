"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Camera, SlidersHorizontal } from 'lucide-react';

const APPS = [
  { icon: <Calculator size={20} />, label: 'EMI', href: '/emi-calculator' },
  { icon: <Camera size={20} />, label: 'Drone', href: '/drone-tour' },
  { icon: <SlidersHorizontal size={20} />, label: 'Vision', href: '/vision' },
];

export const AppDock = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Hide when scrolling down, show when scrolling up
      if (y > lastY && y > 300) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastY(y);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="glass rounded-2xl px-3 py-2 flex items-center gap-1 border border-champagne shadow-xl">
            {APPS.map((app, i) => (
              <Link key={i} href={app.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-deep-forest/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold/60 group-hover:text-gold group-hover:bg-gold/20 transition-all duration-300">
                    {app.icon}
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-cream font-bold transition-colors">
                    {app.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
