"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal } from '../terminal/Terminal';
import { Project } from '@/data/projects';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Terminal 
        title={`hitesh@portfolio:~/projects/${project.slug}`}
        className="h-full flex flex-col group hover:terminal-border-glow transition-all duration-300"
      >
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <p className="text-muted mb-4 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="text-xs text-cyan-accent border border-cyan-accent/30 px-2 py-1 rounded-sm bg-cyan-accent/5">
                [{tech}]
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-muted border border-muted/30 px-2 py-1 rounded-sm">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          
          <div className="pt-4 border-t border-border-primary mt-auto">
            <div className="text-muted mb-2 text-xs">$ ./open-project</div>
            <Link 
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
            >
              [ VIEW PROJECT <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> ]
            </Link>
          </div>
        </div>
      </Terminal>
    </motion.div>
  );
}
