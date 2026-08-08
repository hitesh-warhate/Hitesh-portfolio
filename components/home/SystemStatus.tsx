"use client";

import React, { useState, useEffect } from 'react';
import { Terminal } from '../terminal/Terminal';
import { cn } from '@/lib/utils';

export function SystemStatus() {
  const [uptime, setUptime] = useState(99.9);
  
  // Optional: slowly increment uptime or simulate network activity
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => Math.min(99.99, prev + 0.01));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Terminal title="system_status.exe" titleClassName="text-blue-accent" className="h-full border-blue-accent/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
      <div className="flex flex-col space-y-6">
        <div>
          <h3 className="text-primary mb-2 font-bold tracking-wider border-b border-primary/30 pb-1 inline-block">SYSTEM STATUS</h3>
          <div className="grid grid-cols-[100px_1fr] gap-2 mt-2">
            <span className="text-muted">OS</span>
            <span className="text-primary">: HiteshOS</span>
            
            <span className="text-muted">ROLE</span>
            <span className="text-blue-accent">: Software Developer</span>
            
            <span className="text-muted">LOCATION</span>
            <span className="text-cyan-accent">: India</span>
          </div>
        </div>

        <div>
          <h3 className="text-cyan-accent mb-2 font-bold tracking-wider border-b border-cyan-accent/30 pb-1 inline-block">FOCUS</h3>
          <ul className="mt-2 space-y-1">
            <li className="flex gap-2"><span className="text-primary">▸</span> <span className="text-primary">AI / ML</span></li>
            <li className="flex gap-2"><span className="text-cyan-accent">▸</span> <span className="text-cyan-accent">Data</span></li>
            <li className="flex gap-2"><span className="text-blue-accent">▸</span> <span className="text-blue-accent">Backend</span></li>
            <li className="flex gap-2"><span className="text-warning">▸</span> <span className="text-warning">Full-Stack</span></li>
            <li className="flex gap-2"><span className="text-pink-accent">▸</span> <span className="text-pink-accent">DevOps</span></li>
          </ul>
        </div>

        <div>
          <h3 className="text-pink-accent mb-2 font-bold tracking-wider border-b border-pink-accent/30 pb-1 inline-block">CURRENTLY</h3>
          <ul className="mt-2 space-y-1">
            <li className="flex gap-2"><span className="text-warning">▸</span> <span className="text-text">Building cool projects</span></li>
            <li className="flex gap-2"><span className="text-blue-accent">▸</span> <span className="text-text">Learning new technologies</span></li>
            <li className="flex gap-2"><span className="text-primary">▸</span> <span className="text-text">Improving DSA</span></li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border-primary mt-auto">
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <span className="text-muted">STATUS</span>
            <span className="flex items-center gap-2 text-success">
              : <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> AVAILABLE
            </span>
            
            <span className="text-muted">UPTIME</span>
            <span className="text-text">: {uptime.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </Terminal>
  );
}
