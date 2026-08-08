"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const techElements = [
  { text: "Python", color: "text-blue-accent" },
  { text: "React", color: "text-cyan-accent" },
  { text: "TensorFlow", color: "text-warning" },
  { text: "Node.js", color: "text-success" },
  { text: "Java", color: "text-warning" },
  { text: "Git", color: "text-primary" },
  { text: "GitHub", color: "text-text" },
  { text: "AWS", color: "text-warning" },
  { text: "Docker", color: "text-cyan-accent" },
  { text: "PostgreSQL", color: "text-blue-accent" },
  { text: "MySQL", color: "text-blue-accent" },
  { text: "AI", color: "text-primary" },
  { text: "Data", color: "text-cyan-accent" },
  { text: "JavaScript", color: "text-yellow-accent" },
  { text: "TypeScript", color: "text-blue-accent" },
  { text: "Next.js", color: "text-text" },
  { text: "FastAPI", color: "text-success" },
  { text: "PyTorch", color: "text-warning" },
  { text: "Linux", color: "text-yellow-accent" },
  { text: "GraphQL", color: "text-pink-accent" },
  { text: "REST", color: "text-success" },
  { text: "JSON", color: "text-muted" },
  { text: "SQL", color: "text-blue-accent" },
  { text: "HTML", color: "text-warning" },
  { text: "CSS", color: "text-blue-accent" },
  { text: "C++", color: "text-blue-accent" },
  { text: "Spring Boot", color: "text-success" },
  
  // Coding Fragments
  { text: "const", color: "text-primary" },
  { text: "function", color: "text-blue-accent" },
  { text: "class", color: "text-cyan-accent" },
  { text: "import", color: "text-pink-accent" },
  { text: "return", color: "text-primary" },
  { text: "async", color: "text-blue-accent" },
  { text: "await", color: "text-blue-accent" },
  { text: "if", color: "text-primary" },
  { text: "else", color: "text-primary" },
  { text: "for", color: "text-primary" },
  { text: "while", color: "text-primary" },
  { text: "try", color: "text-pink-accent" },
  { text: "catch", color: "text-pink-accent" },
  { text: "interface", color: "text-cyan-accent" },
  { text: "extends", color: "text-cyan-accent" },
  { text: "null", color: "text-error" },
  { text: "true", color: "text-success" },
  { text: "false", color: "text-error" },
  { text: "404", color: "text-error" },
  { text: "200", color: "text-success" },
  
  // Symbols
  { text: "< >", color: "text-muted" },
  { text: "{ }", color: "text-muted" },
  { text: "[ ]", color: "text-muted" },
  { text: "( )", color: "text-muted" },
  { text: ";", color: "text-muted" },
  { text: "=>", color: "text-primary" },
  { text: "/>", color: "text-muted" },
  { text: "::", color: "text-muted" },
  { text: "#", color: "text-muted" }
];

export function TechBackground() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 selection:bg-transparent">
      
      {/* Ambient Multi-radial Glows */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4 opacity-50" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-accent/5 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4 opacity-50" />
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-cyan-accent/5 rounded-full blur-[80px] -translate-x-1/4 -translate-y-1/2 opacity-50" />
      <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] bg-pink-accent/5 rounded-full blur-[80px] translate-x-1/4 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-warning/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 opacity-50" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-success/5 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 opacity-50" />
      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-40" />

      {/* Animated Tech Elements */}
      {techElements.map((tech, i) => {
        // Random starting positions
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // Faster animation duration and delay so movement is noticeable
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * 10;
        
        // Very low opacity (0.03 to 0.08)
        const opacity = 0.03 + Math.random() * 0.05;
        
        // Larger float movement range to be perceptible
        const yRange = [0, -50 + Math.random() * -100, 0];
        const xRange = [0, 30 + Math.random() * 80, 0];

        return (
          <motion.div
            key={i}
            className={`absolute font-mono text-sm sm:text-base md:text-lg lg:text-xl font-bold ${tech.color}`}
            style={{ 
              top, 
              left,
              opacity: 0 // initial opacity
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
            {tech.text}
          </motion.div>
        );
      })}
    </div>
  );
}
