"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X, Send, Sparkles, User, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  "Available plots?",
  "Legal process",
  "Book a visit",
  "Investment ROI",
];

export const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Welcome to RuralLand's Private Concierge. I can help with plot details, legal verification, and booking. How may I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Our concierge is temporarily unavailable. Please try again or reach us via WhatsApp." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-7 right-7 z-50">
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-gold-lg transition-all duration-300 cursor-pointer",
          open ? "bg-surface-light text-ivory rotate-90" : "bg-gold text-ivory animate-pulse-gold"
        )}
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute bottom-[72px] right-0 w-[370px] h-[520px] glass rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gold/10 border-b border-gold/15 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-ivory font-serif text-sm leading-tight">AI Concierge</h3>
                <span className="text-[9px] uppercase tracking-widest text-gold-dark font-semibold">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-2.5", msg.role === 'user' ? "flex-row-reverse" : "")}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs border border-champagne",
                    msg.role === 'user' ? "bg-deep-forest text-cream" : "bg-gold/10 text-gold"
                  )}>
                    {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                  </div>
                  <div className={cn(
                    "px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed max-w-[80%]",
                    msg.role === 'user'
                      ? "bg-gold/10 text-ivory rounded-tr-sm border border-gold/15"
                      : "bg-surface text-ivory rounded-tl-sm border border-champagne"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-1.5 px-3 py-2">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 bg-gold/40 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map(p => (
                <button key={p} onClick={() => send(p)} className="px-3 py-1 rounded-full border border-champagne bg-surface text-[10px] text-cream whitespace-nowrap hover:border-gold hover:text-gold-dark transition-all cursor-pointer">
                  {p}
                </button>
              ))}
            </div>
 
            {/* Input */}
            <div className="p-4 border-t border-champagne bg-surface/60">
              <div className="relative">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send(input)}
                  placeholder="Ask about our estate..."
                  className="w-full bg-surface border border-champagne rounded-xl py-3 pl-4 pr-11 text-sm text-ivory focus:outline-none focus:border-gold/50 transition-colors placeholder:text-cream/60"
                />
                <button onClick={() => send(input)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-gold text-surface flex items-center justify-center hover:bg-gold-light transition-colors cursor-pointer">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
