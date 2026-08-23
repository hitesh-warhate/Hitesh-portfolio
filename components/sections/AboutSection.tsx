import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalCursor } from '@/components/terminal/TerminalCursor';

export function AboutSection() {
  return (
    <section id="about" className="w-full scroll-mt-24 flex flex-col space-y-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-text">ABOUT ME</h2>
        <div className="h-[1px] flex-1 bg-border-primary/50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col">
          <Terminal title="bash" className="h-full">
            <TerminalPrompt command="cat about.md" />
            <div className="mt-6 font-mono text-text/90 leading-relaxed">
              <h3 className="text-2xl font-bold text-text mb-4">Hitesh Warhate</h3>
              <p className="mb-4">Software Developer focused on:</p>
              <ul className="space-y-2 mb-6 ml-4">
                <li className="flex gap-2 text-primary"><span className="text-muted">{'*'}</span> <span>Full-Stack Development</span></li>
                <li className="flex gap-2 text-cyan-accent"><span className="text-muted">{'*'}</span> <span>DevOps & Infrastructure</span></li>
                <li className="flex gap-2 text-text"><span className="text-muted">{'*'}</span> <span>Backend Engineering</span></li>
                <li className="flex gap-2 text-text"><span className="text-muted">{'*'}</span> <span>CI/CD Automation</span></li>
                <li className="flex gap-2 text-text"><span className="text-muted">{'*'}</span> <span>Cloud Computing</span></li>
              </ul>
              
              <p className="mb-4">
                I am passionate about creating efficient, scalable systems that solve complex problems. 
                My focus is primarily on backend infrastructure, building full-stack platforms, and integrating 
                robust DevOps pipelines into production-ready applications.
              </p>
              
              <div className="flex items-center text-primary mt-6">
                hitesh@portfolio:~$ <TerminalCursor className="ml-2" />
              </div>
            </div>
          </Terminal>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          <Terminal title="system_info" className="h-full">
            <div className="mt-2 font-mono">
              <h3 className="text-primary mb-6 font-bold tracking-wider border-b border-border-primary pb-2 inline-block">QUICK FACTS</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-6 gap-x-4">
                <span className="text-muted tracking-wider text-sm">EDUCATION</span>
                <span className="text-text font-bold">B.Tech Information Technology</span>
                
                <span className="text-muted tracking-wider text-sm">COLLEGE</span>
                <span className="text-text">St. Vincent Pallotti College of Engineering & Technology, Nagpur</span>
                
                <span className="text-muted tracking-wider text-sm">CGPA</span>
                <span className="text-cyan-accent font-bold text-xl">8.04</span>
                
                <span className="text-muted tracking-wider text-sm">GRADUATION</span>
                <span className="text-text">May 2027</span>
                
                <span className="text-muted tracking-wider text-sm">CORE FOCUS</span>
                <span className="text-text">
                  <span className="text-primary">DevOps</span> + <span className="text-cyan-accent">Full Stack</span> + Software Engineering
                </span>
                
                <span className="text-muted tracking-wider text-sm">LOCATION</span>
                <span className="text-text">India</span>
              </div>
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
