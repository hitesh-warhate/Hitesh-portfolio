import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

export const metadata = {
  title: 'Projects | Hitesh Warhate',
  description: 'Projects built by Hitesh Warhate',
};

export default function Projects() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-4">
        <TerminalPrompt command="ls -la ~/projects" />
        <p className="text-muted mt-2">Displaying {projects.length} projects...</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
