import React from 'react';
import Link from 'next/link';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalCursor } from '@/components/terminal/TerminalCursor';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-2xl">
        <Terminal title="bash" glow>
          <div className="font-mono text-sm sm:text-base">
            <TerminalPrompt command="cd /unknown-page" />
            
            <div className="mt-2 mb-6">
              <span className="text-error">bash: cd: /unknown-page: No such file or directory</span>
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-bold text-error mb-4">ERROR 404</h1>
              <p className="text-text text-lg">The requested page does not exist or has been moved.</p>
            </div>
            
            <TerminalPrompt command="cd /home" />
            <div className="mt-6 flex items-center">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-medium hover:bg-primary/90 transition-colors rounded-sm terminal-border"
              >
                [ RETURN HOME ]
              </Link>
            </div>
            
            <div className="mt-8 flex items-center">
              <TerminalPrompt />
              <TerminalCursor className="ml-1" />
            </div>
          </div>
        </Terminal>
      </div>
    </div>
  );
}
