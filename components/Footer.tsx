"use client";

import React, { useState, useEffect } from 'react';
import { TerminalPrompt } from './terminal/TerminalPrompt';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <footer className="w-full mt-24 pt-16 pb-8 px-4 md:px-0 max-w-[1400px] mx-auto font-mono text-sm border-t border-border-primary/50">
      <div className="mb-4">
        <TerminalPrompt command="exit" />
      </div>
      
      <div className="space-y-4 text-muted">
        <p className="text-text">Thanks for visiting.</p>
        <p>Let's build something amazing together.</p>
        
        <div className="flex items-center gap-6 pt-2 pb-4">
          <a href="https://github.com/hitesh-warhate" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Github size={16} /> GitHub
          </a>
          <a href="#" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="#" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Mail size={16} /> Email
          </a>
        </div>
        
        <div className="border-t border-border-primary/50 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Hitesh Warhate</p>
            <p className="text-xs">Built with: Next.js, TypeScript, Tailwind CSS, Framer Motion</p>
          </div>
          
          <div className="flex items-center gap-2 terminal-border bg-panel px-3 py-1.5 rounded-sm text-xs">
            STATUS: <span className="w-2 h-2 rounded-full bg-primary animate-pulse ml-1" /> <span className="text-primary">ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
