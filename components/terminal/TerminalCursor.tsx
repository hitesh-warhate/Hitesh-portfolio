"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TerminalCursorProps {
  blink?: boolean;
  className?: string;
}

export function TerminalCursor({ blink = true, className }: TerminalCursorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!blink) {
      setIsVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setIsVisible((v) => !v);
    }, 500);

    return () => clearInterval(interval);
  }, [blink]);

  return (
    <span 
      className={cn(
        "inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-primary ml-1 translate-y-1 align-baseline",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )} 
    />
  );
}
