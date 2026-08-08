import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  directory?: string;
  command?: string;
  user?: string;
  host?: string;
}

export function TerminalPrompt({ 
  directory = '~', 
  command, 
  user = 'hitesh', 
  host = 'portfolio',
  className,
  ...props 
}: TerminalPromptProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 font-mono", className)} {...props}>
      <span className="text-primary">{user}@{host}</span>
      <span className="text-muted">:</span>
      <span className="text-cyan-accent">{directory}</span>
      <span className="text-muted">$</span>
      {command && <span className="text-text ml-1">{command}</span>}
    </div>
  );
}
