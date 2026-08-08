import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ArrowRight } from 'lucide-react';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full scroll-mt-24 flex flex-col space-y-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-text">SELECTED PROJECTS</h2>
        <div className="h-[1px] flex-1 bg-border-primary/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {projects.map((project, index) => {
          const numStr = (index + 1).toString().padStart(2, '0');
          
          let primaryColor = 'text-primary';
          let borderColor = 'border-primary/30 group-hover:border-primary';
          let shadowColor = 'hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]';
          let secondaryColor = 'text-cyan-accent border-cyan-accent/30 bg-cyan-accent/10';
          let category = 'Full-Stack';

          if (project.slug === 'fra-atlas') {
            primaryColor = 'group-hover:text-cyan-accent';
            borderColor = 'border-cyan-accent/30 group-hover:border-cyan-accent';
            shadowColor = 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]';
            secondaryColor = 'text-warning border-warning/30 bg-warning/10';
            category = 'AI + DATA';
          } else if (project.slug === 'krishimitra-360') {
            primaryColor = 'group-hover:text-success';
            borderColor = 'border-success/30 group-hover:border-success';
            shadowColor = 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';
            secondaryColor = 'text-cyan-accent border-cyan-accent/30 bg-cyan-accent/10';
            category = 'AI + IOT';
          } else if (project.slug === 'pashurakshak') {
            primaryColor = 'group-hover:text-primary';
            borderColor = 'border-primary/30 group-hover:border-primary';
            shadowColor = 'hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]';
            secondaryColor = 'text-pink-accent border-pink-accent/30 bg-pink-accent/10';
            category = 'AI / ML';
          } else if (project.slug === 'tradex') {
            primaryColor = 'group-hover:text-blue-accent';
            borderColor = 'border-blue-accent/30 group-hover:border-blue-accent';
            shadowColor = 'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
            secondaryColor = 'text-cyan-accent border-cyan-accent/30 bg-cyan-accent/10';
            category = 'FINTECH';
          }

          const getTechColor = (tech: string) => {
            if (['Python', 'PostgreSQL', 'PostGIS'].includes(tech)) return 'text-blue-accent';
            if (['React Native', 'Next.js'].includes(tech)) return 'text-cyan-accent';
            if (['Machine Learning', 'AI', 'AI/ML'].includes(tech)) return 'text-primary';
            if (['TensorFlow', 'HTML'].includes(tech)) return 'text-warning';
            if (['IoT', 'ESP32'].includes(tech)) return 'text-success';
            if (['Computer Vision', 'CSS'].includes(tech)) return 'text-pink-accent';
            if (['JavaScript'].includes(tech)) return 'text-yellow-accent';
            return 'text-muted';
          };
          
          return (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="group block h-full">
              <div className={cn("h-full flex flex-col bg-panel rounded-sm overflow-hidden transition-all duration-300 relative border", borderColor, shadowColor)}>
                
                {/* On Hover Terminal Command overlay */}
                <div className="absolute top-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none flex justify-between items-start">
                  <div className="text-xs font-mono text-text bg-panel/90 backdrop-blur-sm px-2 py-1 rounded-sm border border-border-primary">
                    <TerminalPrompt command={`./run ${project.slug}`} />
                  </div>
                </div>

                {/* Project Image Area (Abstract terminal style placeholder) */}
                <div className="h-48 w-full bg-background-secondary border-b border-inherit relative overflow-hidden transition-colors z-10 flex flex-col justify-end p-4">
                  <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
                  
                  {/* Decorative terminal grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(36,48,71,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(36,48,71,0.3)_1px,transparent_1px)] bg-[size:20px_20px] transition-transform duration-700 ease-out group-hover:scale-105" />
                  
                  <div className="relative z-10 flex justify-between items-end">
                    <span className={`text-5xl font-black text-border-primary/40 tracking-tighter transition-colors ${primaryColor.replace('group-hover:', 'group-hover:text-opacity-20 ')}`}>{numStr}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded-sm border ${secondaryColor}`}>{category}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 relative z-10 bg-panel">
                  <h3 className={`text-2xl font-bold text-text mb-2 transition-colors ${primaryColor}`}>{project.title}</h3>
                  <p className="text-sm text-text/80 leading-relaxed mb-4">{project.description}</p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-col gap-2 mb-8 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className={`text-xs font-mono ${getTechColor(tech)}`}>
                          [{tech}]
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs font-mono text-muted">
                          + {project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end items-center text-sm font-bold font-mono text-muted group-hover:text-text transition-colors">
                    [ OPEN PROJECT <ArrowRight size={14} className="ml-1 inline transition-transform group-hover:translate-x-1" /> ]
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
