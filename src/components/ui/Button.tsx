"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends Omit<React.ComponentProps<typeof motion.button>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) => {
  const base = "rounded-full inline-flex items-center justify-center cursor-pointer font-medium transition-all duration-300";

  const variants = {
    primary: "bg-gold text-ivory hover:bg-gold-light shadow-gold",
    secondary: "bg-surface text-ivory border border-cream/20 hover:bg-surface-light",
    outline: "border border-gold/50 text-gold-dark hover:bg-gold/10 hover:border-gold",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs tracking-wider",
    md: "px-7 py-3.5 text-sm tracking-wider",
    lg: "px-10 py-5 text-sm tracking-widest",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
