"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { TerminalHeader } from '../terminal/TerminalHeader';
import { ThemeToggle } from '../effects/ThemeToggle';

const NAV_LINKS = [
  { id: '01', label: 'HOME', href: '#home', color: 'hover:text-primary hover:shadow-[0_1px_0_var(--color-primary)]' },
  { id: '02', label: 'ABOUT', href: '#about', color: 'hover:text-blue-accent hover:shadow-[0_1px_0_var(--color-blue-accent)]' },
  { id: '03', label: 'PROJECTS', href: '#projects', color: 'hover:text-warning hover:shadow-[0_1px_0_var(--color-warning)]' },
  { id: '04', label: 'SKILLS', href: '#skills', color: 'hover:text-cyan-accent hover:shadow-[0_1px_0_var(--color-cyan-accent)]' },
  { id: '05', label: 'EXPERIENCE', href: '#experience', color: 'hover:text-pink-accent hover:shadow-[0_1px_0_var(--color-pink-accent)]' },
  { id: '06', label: 'GITHUB', href: '#github', color: 'hover:text-success hover:shadow-[0_1px_0_var(--color-success)]' },
  { id: '07', label: 'RESUME', href: '#resume', color: 'hover:text-primary hover:shadow-[0_1px_0_var(--color-primary)]' },
  { id: '08', label: 'CONTACT', href: '#contact', color: 'hover:text-blue-accent hover:shadow-[0_1px_0_var(--color-blue-accent)]' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block w-full mt-6 mb-12">
      <div className="terminal-border rounded-md overflow-hidden bg-panel">
        <div className="bg-background-secondary border-b border-border-primary p-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-error/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
            </div>
            <span className="text-sm font-mono text-muted hidden lg:block tracking-wider font-bold">HITESH.OS</span>
            <span className="text-sm font-mono text-muted lg:hidden tracking-wider font-bold">hitesh@portfolio:~</span>
          </div>
          
          <div className="flex flex-wrap gap-x-4 lg:gap-x-6 font-mono text-xs lg:text-sm h-full items-center">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id} 
                href={pathname === '/' ? link.href : `/${link.href}`}
                className={cn(
                  "group flex items-center h-full py-2 transition-all duration-300 text-muted hover:text-text",
                  link.color
                )}
              >
                <span>[{link.id}] {link.label}</span>
              </a>
            ))}
            <div className="ml-2 flex items-center border-l border-border-primary pl-4 h-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
