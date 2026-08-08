import React from 'react';
import { cn } from '@/lib/utils';
import { TerminalHeader } from './TerminalHeader';

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function Terminal({ title, titleClassName, children, className, glow = false, ...props }: TerminalProps) {
  return (
    <div 
      className={cn(
        "rounded-md overflow-hidden bg-panel border",
        glow ? "terminal-border-glow" : "terminal-border",
        className
      )}
      {...props}
    >
      <TerminalHeader title={title} titleClassName={titleClassName} />
      <div className="p-4 sm:p-6 font-mono text-sm sm:text-base text-text overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
