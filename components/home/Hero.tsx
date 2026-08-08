"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { TerminalPrompt } from '../terminal/TerminalPrompt';
import { TerminalCursor } from '../terminal/TerminalCursor';
import { SystemStatus } from './SystemStatus';
import { CommandTerminal } from './CommandTerminal';
import { cn } from '@/lib/utils';

export function Hero() {
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "hitesh@portfolio:~$ whoami";
  
  useEffect(() => {
    // Fast boot sequence
    const bootInterval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => setBootSequenceComplete(true), 300);
          return 100;
        }
        return prev + 25; // Completes in ~400ms
      });
    }, 100);
    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    if (bootSequenceComplete) {
      let index = 0;
      const typeInterval = setInterval(() => {
        setText(fullText.substring(0, index));
        index++;
        if (index > fullText.length) {
          clearInterval(typeInterval);
          setTimeout(() => setIsTyping(false), 500);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [bootSequenceComplete, fullText]);

  if (!bootSequenceComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center font-mono min-h-[60vh]">
        <div className="w-full max-w-md">
          <p className="text-primary mb-2">INITIALIZING HITESH.OS</p>
          <div className="space-y-1 text-muted text-sm mb-4">
            <p className={cn("opacity-0", bootProgress > 10 && "opacity-100")}>Loading portfolio...</p>
            <p className={cn("opacity-0", bootProgress > 40 && "opacity-100")}>Loading projects...</p>
            <p className={cn("opacity-0", bootProgress > 70 && "opacity-100")}>Loading skills...</p>
            <p className={cn("opacity-0", bootProgress >= 100 && "opacity-100")}>Loading experience...</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <span>[</span>
            <div className="flex-1 h-3 bg-panel border border-border-primary rounded-sm overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-100 ease-linear"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <span>] {bootProgress}%</span>
          </div>
          {bootProgress >= 100 && (
            <p className="text-primary mt-4 text-center animate-pulse">SYSTEM READY</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-start pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
          <div className="font-mono text-sm sm:text-base text-primary mb-6 flex items-center h-6">
            <span>{text}</span>
            {isTyping && <TerminalCursor className="ml-1" />}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 20 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-[clamp(48px,6vw,88px)] leading-[1.1] font-bold tracking-tighter mb-4 glow-text flex flex-col">
              <span className="text-text">HITESH</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-accent to-cyan-accent -mt-2">WARHATE</span>
            </h1>
            
            <div className="flex flex-col space-y-2 mb-8">
              <h2 className="text-xl sm:text-2xl text-secondary font-mono flex items-center gap-2">
                <span className="text-muted">{'<'}</span>
                Software Developer
                <span className="text-muted">{'/>'}</span>
              </h2>
              <div className="text-sm font-mono flex flex-wrap gap-3">
                <span className="px-2 py-1 border border-primary/30 text-primary bg-primary/5 rounded-sm">AI/ML</span>
                <span className="px-2 py-1 border border-cyan-accent/30 text-cyan-accent bg-cyan-accent/5 rounded-sm">Data</span>
                <span className="px-2 py-1 border border-blue-accent/30 text-blue-accent bg-blue-accent/5 rounded-sm">Backend</span>
                <span className="px-2 py-1 border border-warning/30 text-warning bg-warning/5 rounded-sm">Full-Stack</span>
              </div>
            </div>
            
            <div className="mb-10 text-lg text-text/80 max-w-lg leading-relaxed">
              <div className="font-mono text-sm text-primary mb-3">hitesh@portfolio:~$ cat introduction.txt</div>
              "I build scalable full-stack applications 
              and AI-powered solutions that solve real-world 
              problems and create impact."
            </div>
            
            <div className="font-mono text-sm text-primary mb-4">hitesh@portfolio:~$ ls -la</div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/projects" 
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-background font-bold hover:bg-primary/90 transition-all rounded-sm terminal-border overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  [ VIEW PROJECTS ]
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-panel text-blue-accent font-bold hover:bg-blue-accent/10 transition-colors rounded-sm terminal-border border border-blue-accent/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
              >
                [ CONTACT_ME ] <Mail size={18} />
              </Link>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/hitesh-warhate" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted hover:text-blue-accent transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://drive.google.com/file/d/1pyZzi4_JEAEqgWv2NvAe7AqQzsm5nYIz/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-pink-accent transition-colors flex items-center gap-2 font-mono text-sm">
                <Download size={20} />
                <span>RESUME.pdf</span>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Right Column - Visuals & Profile */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isTyping ? 0 : 1, scale: isTyping ? 0.95 : 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full flex flex-col gap-6"
          >
            {/* Professional Profile Photo Container */}
            <div className="terminal-border border-primary/50 bg-panel rounded-sm overflow-hidden flex flex-col group transition-all duration-300 hover:border-cyan-accent/50 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] relative">
              <div className="bg-background-secondary border-b border-primary/30 p-2 flex items-center gap-2 group-hover:border-cyan-accent/50 transition-colors">
                <div className="flex gap-1.5 pl-1">
                  <div className="w-3 h-3 rounded-full bg-error/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="text-xs font-mono text-primary group-hover:text-cyan-accent transition-colors flex-1 text-center pr-6">
                  user_profile.exe
                </div>
              </div>
              
              <div className="p-4 relative overflow-hidden flex justify-center items-center">
                {/* Subtle gradient overlay effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-cyan-accent/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none mix-blend-screen" />
                
                <div className="relative w-full aspect-[4/5] max-w-[280px] rounded-md overflow-hidden border border-border-primary/50 group-hover:scale-[1.02] transition-transform duration-500 ease-out z-0 bg-background-secondary flex justify-center items-center">
                  <Image 
                    src="/images/hitesh-warhate-profile.jpg"
                    alt="Hitesh Warhate — Software Developer"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Grain overlay for terminal aesthetic */}
                  <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
                </div>
              </div>

              <div className="bg-background-secondary border-t border-border-primary p-4 font-mono text-sm group-hover:border-cyan-accent transition-colors relative z-20">
                
                {/* On Hover Info overlay */}
                <div className="absolute inset-0 bg-background-secondary p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
                   <div className="text-primary mb-1">hitesh@portfolio:~$ whoami</div>
                   <div className="text-text font-bold">Hitesh Warhate</div>
                   <div className="text-muted">Software Developer</div>
                </div>

                {/* Default Info */}
                <div className="flex flex-col gap-1 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="flex justify-between">
                    <span className="text-muted">USER:</span>
                    <span className="text-text">hitesh-warhate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">ROLE:</span>
                    <span className="text-text">Software Developer</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted">STATUS:</span>
                    <span className="text-success flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> 
                      AVAILABLE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="terminal-border p-4 bg-panel rounded-sm">
                 <div className="text-xs text-muted font-mono mb-2">FOCUS</div>
                 <div className="flex flex-col gap-1 font-mono text-sm">
                   <span className="text-primary">AI/ML</span>
                   <span className="text-cyan-accent">Data</span>
                   <span className="text-text">Backend</span>
                 </div>
              </div>
              <div className="col-span-1 h-full">
                 <SystemStatus />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
