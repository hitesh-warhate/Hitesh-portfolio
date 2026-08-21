"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '../effects/ThemeToggle';

const NAV_LINKS = [
  { id: '01', label: 'HOME', href: '#home', color: 'hover:text-primary' },
  { id: '02', label: 'ABOUT', href: '#about', color: 'hover:text-blue-accent' },
  { id: '03', label: 'PROJECTS', href: '#projects', color: 'hover:text-warning' },
  { id: '04', label: 'SKILLS', href: '#skills', color: 'hover:text-cyan-accent' },
  { id: '05', label: 'EXPERIENCE', href: '#experience', color: 'hover:text-pink-accent' },
  { id: '06', label: 'GITHUB', href: '#github', color: 'hover:text-success' },
  { id: '07', label: 'RESUME', href: '#resume', color: 'hover:text-primary' },
  { id: '08', label: 'CONTACT', href: '#contact', color: 'hover:text-blue-accent' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden sticky top-0 z-40 w-full bg-background/90 backdrop-blur-sm pt-4 pb-2 px-4 border-b border-border-primary/50">
      <div className="flex items-center justify-between terminal-border rounded-md px-4 py-2 bg-panel">
        <span className="font-mono text-sm text-primary tracking-wider font-bold">hitesh@portfolio:~</span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-text hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-2"
          >
            <div className="terminal-border rounded-md bg-panel p-4 flex flex-col space-y-4 font-mono text-sm">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.id} 
                  href={pathname === '/' ? link.href : `/${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-2 border-b border-border-primary/30 last:border-0 text-muted hover:text-text transition-colors",
                    link.color
                  )}
                >
                  <span>[{link.id}] {link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
