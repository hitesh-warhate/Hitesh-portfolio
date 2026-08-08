import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { projects } from '@/data/projects';
import { ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Github } from '@/components/icons';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | Hitesh Warhate`,
    description: project.description,
  };
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-2">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-mono text-sm"
        >
          <ArrowLeft size={16} /> [cd ..] BACK TO PROJECTS
        </Link>
      </div>

      <Terminal title={`hitesh@portfolio:~/projects/${project.slug}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: README.md tree and info */}
          <div className="w-full md:w-1/3 space-y-8 font-mono">
            <div>
              <h1 className="text-3xl font-bold text-text">{project.title}</h1>
              <p className="text-primary mt-2">{project.description}</p>
            </div>
            
            <div>
              <div className="text-muted mb-2">README.md</div>
              <ul className="text-text space-y-1 pl-0">
                <li className="flex"><span className="text-muted mr-2">├──</span> Overview</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Problem</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Solution</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Features</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Architecture</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Technology</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Challenges</li>
                <li className="flex"><span className="text-muted mr-2">├──</span> Results</li>
                <li className="flex"><span className="text-muted mr-2">└──</span> Links</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-border-primary">
              <div className="text-muted mb-2 text-sm">Technology Stack:</div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs text-primary border border-primary/30 px-2 py-1 rounded-sm bg-primary/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-border-primary">
              <a 
                href={project.github || "#"} 
                className="flex items-center gap-2 px-4 py-2 bg-panel text-text font-medium hover:bg-border-primary transition-colors rounded-sm terminal-border text-sm"
              >
                <Github size={16} /> [ SOURCE ]
              </a>
              <a 
                href={project.live || "#"} 
                className="flex items-center gap-2 px-4 py-2 bg-primary text-background font-medium hover:bg-primary/90 transition-colors rounded-sm terminal-border text-sm"
              >
                <ExternalLink size={16} /> [ DEMO ]
              </a>
            </div>
          </div>

          {/* Right side: Project Details */}
          <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-border-primary pt-6 md:pt-0 md:pl-8">
            <TerminalPrompt command="cat README.md" />
            
            <div className="mt-6 prose prose-invert prose-p:text-text prose-headings:text-primary max-w-none font-mono">
              <h2 className="text-xl font-bold border-b border-border-primary pb-2 mb-4">Overview</h2>
              <p className="mb-8">{project.longDescription}</p>

              <div className="my-8 terminal-border rounded-md aspect-video bg-background flex flex-col items-center justify-center text-muted relative overflow-hidden group">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <>
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <p className="font-mono">PROJECT PREVIEW</p>
                    <p className="font-mono text-sm opacity-50 mt-2">IMAGE PLACEHOLDER</p>
                  </>
                )}
              </div>

              <h2 className="text-xl font-bold border-b border-border-primary pb-2 mb-4 mt-8">Key Features</h2>
              <ul className="list-none space-y-2 mb-8 pl-0">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex"><span className="text-primary mr-2">[*]</span> {feature}</li>
                ))}
              </ul>

              {project.problem && (
                <>
                  <h2 className="text-xl font-bold border-b border-border-primary pb-2 mb-4 mt-8">Problem Statement</h2>
                  <p className="mb-8">{project.problem}</p>
                </>
              )}

              {project.solution && (
                <>
                  <h2 className="text-xl font-bold border-b border-border-primary pb-2 mb-4 mt-8">Solution</h2>
                  <p className="mb-8">{project.solution}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Terminal>
    </div>
  );
}
