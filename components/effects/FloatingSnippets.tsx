"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const snippets = [
  `function initSystem() {\n  console.log("System Online");\n}`,
  `const data = await fetch('/api/stats');\nreturn data.json();`,
  `import { useState, useEffect } from 'react';`,
  `def train_model(data, epochs=100):\n    model.fit(data, epochs)`,
  `SELECT * FROM users\nWHERE active = true;`,
  `class AIEngine:\n    def predict(self, input):\n        return self.model(input)`,
  `interface User {\n  id: string;\n  role: 'developer';\n}`,
  `<Terminal>\n  <SystemStatus />\n</Terminal>`,
  `npm install --save-dev typescript`,
  `docker-compose up -d --build`,
  `git commit -m "feat: implement AI"`,
  `const [state, setState] = useState(null);`,
  `@RestController\npublic class ApiController {}`,
  `from fastapi import FastAPI\napp = FastAPI()`,
  `export const getStaticProps = async () => {}`,
  `background-color: var(--primary);`,
  `if (error) throw new Error();`
];

export function FloatingSnippets() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 selection:bg-transparent">
      {/* Ambient Glows from previous TechBackground for depth */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4 opacity-40" />
      <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] bg-cyan-accent/5 rounded-full blur-[80px] translate-x-1/4 -translate-y-1/2 opacity-30" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-accent/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 opacity-40" />

      {snippets.map((snippet, i) => {
        // Random placement across the screen
        const top = `${Math.random() * 85 + 5}%`;
        const left = `${Math.random() * 85 + 5}%`;
        
        // Randomize speed and delays for organic feel
        const duration = 25 + Math.random() * 20;
        const delay = Math.random() * -20; // Negative delay to prevent them from all starting at the same time
        
        // Opacity based on index to create depth (some are darker)
        const opacity = 0.05 + Math.random() * 0.15;
        
        // Gentle drifting movement
        const yRange = [0, -40 + Math.random() * -80, 0];
        const xRange = [0, -30 + Math.random() * 60, 0];
        
        // Randomly pick a color theme for the snippet text
        const colors = ['text-cyan-accent', 'text-primary', 'text-blue-accent', 'text-warning', 'text-success'];
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            className={`absolute font-mono text-[10px] sm:text-xs md:text-sm ${color} bg-background-secondary/30 p-3 rounded-md border border-border-primary/20 whitespace-pre shadow-lg backdrop-blur-sm`}
            style={{ 
              top, 
              left,
              opacity: 0,
            }}
            animate={{
              y: yRange,
              x: xRange,
              opacity: [0, opacity, opacity, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: delay,
            }}
          >
            {snippet}
          </motion.div>
        );
      })}
    </div>
  );
}
