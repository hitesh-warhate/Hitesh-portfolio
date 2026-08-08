"use client";

import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { Download, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Resume() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setReady(true), 400);
          return 100;
        }
        return prev + 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Terminal title="bash">
        <TerminalPrompt command="resume" />
        
        <div className="mt-6 font-mono">
          {!ready ? (
            <div className="space-y-4">
              <p className="text-muted">Preparing resume...</p>
              <div className="flex items-center gap-2 text-primary">
                <span>[</span>
                <div className="w-64 sm:w-80 h-3 bg-panel border border-border-primary rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>] {Math.min(100, Math.round(progress))}%</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-500">
              <p className="text-primary">Resume ready.</p>
              
              <div className="mt-8 terminal-border rounded-md p-6 bg-panel inline-block">
                <div className="flex items-center gap-3 mb-6 border-b border-border-primary pb-4">
                  <FileText className="text-primary" size={24} />
                  <span className="text-text font-bold">Hitesh_Warhate_Resume.pdf</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/resume/Hitesh_Warhate_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-panel text-text font-medium hover:bg-border-primary transition-colors rounded-sm terminal-border"
                  >
                    [ VIEW RESUME ]
                  </a>
                  <a 
                    href="/resume/Hitesh_Warhate_Resume.pdf"
                    download
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-background font-medium hover:bg-primary/90 transition-colors rounded-sm terminal-border"
                  >
                    [ DOWNLOAD PDF ] <Download size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </Terminal>
    </div>
  );
}
