"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Calculator, IndianRupee } from 'lucide-react';

export const EMICalculator = () => {
  const [price, setPrice] = useState(4500000);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(15);

  const emi = useMemo(() => {
    const principal = price - (price * downPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }, [price, downPercent, rate, years]);

  const downPayment = price * downPercent / 100;
  const loanAmount = price - downPayment;
  const totalPayable = emi * years * 12;
  const totalInterest = totalPayable - loanAmount;

  const formatINR = (n: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  };

  const inputClass = "w-full h-1.5 rounded-full appearance-none cursor-pointer bg-champagne accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-gold [&::-webkit-slider-thumb]:cursor-pointer";

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-surface to-deep-forest" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Financial Planning</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-4">
            EMI <span className="text-gold-gradient">Calculator</span>
          </h2>
          <p className="text-cream text-lg max-w-xl mx-auto font-light">
            Plan your investment with transparent monthly breakdowns.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sliders */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 space-y-8">
            {/* Price */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[10px] uppercase tracking-widest text-cream font-bold">Plot Price</label>
                <span className="text-gold font-semibold text-sm">{formatINR(price)}</span>
              </div>
              <input type="range" min={1000000} max={15000000} step={100000} value={price} onChange={e => setPrice(+e.target.value)} className={inputClass} />
              <div className="flex justify-between text-[9px] text-cream/60 mt-1"><span>₹10L</span><span>₹1.5Cr</span></div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[10px] uppercase tracking-widest text-cream font-bold">Down Payment</label>
                <span className="text-gold font-semibold text-sm">{downPercent}% ({formatINR(downPayment)})</span>
              </div>
              <input type="range" min={10} max={90} step={5} value={downPercent} onChange={e => setDownPercent(+e.target.value)} className={inputClass} />
              <div className="flex justify-between text-[9px] text-cream/60 mt-1"><span>10%</span><span>90%</span></div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[10px] uppercase tracking-widest text-cream font-bold">Interest Rate</label>
                <span className="text-gold font-semibold text-sm">{rate}% p.a.</span>
              </div>
              <input type="range" min={5} max={15} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} className={inputClass} />
              <div className="flex justify-between text-[9px] text-cream/60 mt-1"><span>5%</span><span>15%</span></div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[10px] uppercase tracking-widest text-cream font-bold">Loan Tenure</label>
                <span className="text-gold font-semibold text-sm">{years} years</span>
              </div>
              <input type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(+e.target.value)} className={inputClass} />
              <div className="flex justify-between text-[9px] text-cream/60 mt-1"><span>1 yr</span><span>30 yrs</span></div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-5">
            {/* EMI highlight */}
            <motion.div layout className="glass rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[80px] bg-gold/10 rounded-full blur-[50px] pointer-events-none" />
              <Calculator className="mx-auto text-gold/40 mb-3" size={28} />
              <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-2 font-bold">Monthly EMI</p>
              <p className="text-4xl md:text-5xl font-serif text-gold drop-shadow-[0_0_8px_rgba(168,89,58,0.3)]">
                {formatINR(Math.round(emi))}
              </p>
              <p className="text-cream/60 text-xs mt-2">per month</p>
            </motion.div>

            {/* Breakdown */}
            <div className="glass rounded-2xl p-6 space-y-4">
              {[
                { label: 'Loan Amount', value: formatINR(loanAmount), color: 'text-ivory' },
                { label: 'Total Interest', value: formatINR(Math.round(totalInterest)), color: 'text-developing' },
                { label: 'Total Payable', value: formatINR(Math.round(totalPayable)), color: 'text-gold' },
                { label: 'Down Payment', value: formatINR(downPayment), color: 'text-available' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-champagne last:border-0">
                  <span className="text-[10px] uppercase tracking-widest text-cream font-bold">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Visual bar */}
            <div className="glass rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest text-cream font-bold mb-3">Payment Split</p>
              <div className="h-3 rounded-full overflow-hidden flex bg-champagne">
                <div className="bg-available h-full transition-all duration-500 rounded-l-full" style={{ width: `${(downPayment / totalPayable) * 100}%` }} title="Down Payment" />
                <div className="bg-gold h-full transition-all duration-500" style={{ width: `${(loanAmount / totalPayable) * 100}%` }} title="Principal" />
                <div className="bg-developing h-full transition-all duration-500 rounded-r-full" style={{ width: `${(totalInterest / totalPayable) * 100}%` }} title="Interest" />
              </div>
              <div className="flex justify-between mt-2 text-[8px] text-cream/60 uppercase tracking-widest">
                <span>Down</span><span>Principal</span><span>Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
