import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalHeaderProps {
  title?: string;
  titleClassName?: string;
}

export function TerminalHeader({ title = 'hitesh@portfolio:~', titleClassName = 'text-muted' }: TerminalHeaderProps) {
  return (
    <div className="flex items-center px-4 py-2 bg-background-secondary border-b border-inherit">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-error/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-success/80" />
      </div>
      <div className={cn("flex-1 text-center text-xs font-mono tracking-wider", titleClassName)}>
        {title}
      </div>
      {/* Placeholder to balance the flex layout */}
      <div className="w-[52px]" />
    </div>
  );
}
