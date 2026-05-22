"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useUnit, UnitType } from '@/lib/UnitContext';

export const UnitToggle = () => {
  const { unit, setUnit } = useUnit();

  const options: UnitType[] = ['Sq.Ft', 'Sq.Yd', 'Acres'];

  return (
    <div className="flex bg-white/5 border border-white/10 p-1 rounded-full items-center">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setUnit(opt)}
          className={`relative px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full transition-colors z-10 ${
            unit === opt ? 'text-deep-forest' : 'text-cream/50 hover:text-cream/80'
          }`}
        >
          {unit === opt && (
            <motion.div
              layoutId="unit-toggle"
              className="absolute inset-0 bg-gold rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {opt}
        </button>
      ))}
    </div>
  );
};
