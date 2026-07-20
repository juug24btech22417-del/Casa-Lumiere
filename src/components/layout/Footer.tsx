"use client";

import React from 'react';
import { Globe, Mail, MessageSquare, Share2, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-surface border-t border-champagne pt-20 pb-10 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-gold rounded-lg flex items-center justify-center text-gold font-serif text-lg font-bold">R</div>
              <span className="font-serif text-xl text-ivory">RuralLand</span>
            </div>
            <p className="text-cream text-sm leading-relaxed max-w-xs">
              Premium rural estates — sustainable, secure, and crafted for the modern investor.
            </p>
            <div className="flex gap-3">
              {[Globe, Mail, MessageSquare, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold/30 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-ivory font-serif mb-6">Navigate</h4>
            <ul className="space-y-3">
              {['The Map', 'Investment Plans', 'Development Updates', 'Our Vision'].map(l => (
                <li key={l}><a href="#" className="text-cream hover:text-gold transition-colors text-sm">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-ivory font-serif mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                { label: 'Privacy Policy', desc: 'How we handle your information' },
                { label: 'Terms of Service', desc: 'The basics of working with us' },
                { label: 'Cookie Policy', desc: 'What we track on this site' },
                { label: 'Security Archive', desc: 'Our track record to date' },
              ].map(item => (
                <li key={item.label}>
                  <a
                    href="#"
                    className="block group"
                  >
                    <span className="text-cream group-hover:text-gold transition-colors text-sm">
                      {item.label}
                    </span>
                    <span className="block text-cream/50 text-[11px] font-light leading-snug mt-0.5">
                      {item.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-ivory font-serif mb-6">Newsletter</h4>
            <p className="text-cream text-sm mb-5">Exclusive updates on new estate releases.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-deep-forest border border-champagne rounded-full px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold transition-colors flex-1 placeholder:text-cream/60" />
              <button className="w-10 h-10 rounded-full bg-gold text-deep-forest flex items-center justify-center hover:bg-gold-light transition-colors cursor-pointer">
                <ArrowUp className="rotate-45" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-champagne flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/60 text-xs">© 2026 RuralLand Estates. All rights reserved.</p>
          <button onClick={scrollTop} className="group flex items-center gap-2 text-cream hover:text-gold transition-colors cursor-pointer">
            <span className="text-[10px] uppercase tracking-widest font-bold">Back to Top</span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:border-gold/30 transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
