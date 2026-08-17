"use client";

import React, { useEffect, useRef } from 'react';

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Katakana + Latin + Numerals
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const characters = letters.split('');

    const fontSize = 16;
    let columns = width / fontSize;
    const drops: number[] = [];

    // Initialize drops with random negative starting points so they don't all fall at once
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    const draw = () => {
      // Dark translucent background to create trailing effect
      // Using #0B0F19 which is the app's dark navy background
      ctx.fillStyle = 'rgba(11, 15, 25, 0.1)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        // Draw only if the drop is visible (y > 0)
        if (drops[i] > 0) {
          const text = characters[Math.floor(Math.random() * characters.length)];
          
          // Theme colors: mix of primary (purple #8B5CF6) and cyan (#06B6D4) and classic green (#10B981)
          // The user specifically asked for Matrix, so a classic green or tech blue-cyan is good.
          // Let's use a nice tech green/cyan mix
          const colorRoll = Math.random();
          if (colorRoll > 0.8) {
            ctx.fillStyle = '#06B6D4'; // Cyan
          } else if (colorRoll > 0.6) {
            ctx.fillStyle = '#8B5CF6'; // Purple (Primary)
          } else {
            ctx.fillStyle = '#10B981'; // Green (Matrix)
          }

          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        // Reset drop if it reaches the bottom
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = width / fontSize;
      
      // Re-initialize drops if screen gets wider
      for (let x = drops.length; x < columns; x++) {
        drops[x] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
