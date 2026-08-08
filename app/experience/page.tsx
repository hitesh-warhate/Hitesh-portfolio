import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { experienceData } from '@/data/experience';

export const metadata = {
  title: 'Experience | Hitesh Warhate',
  description: 'Work experience and timeline of Hitesh Warhate',
};

export default function Experience() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Terminal title="bash">
        <TerminalPrompt command="experience --timeline" />
        
        <div className="mt-8 font-mono relative">
          {/* Timeline Line */}
          <div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-px bg-border-primary" />
          
          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <div key={exp.id} className="relative pl-10 sm:pl-16 group">
                {/* Timeline Node */}
                <div className="absolute left-[11px] sm:left-[19px] top-1.5 w-[9px] h-[9px] rounded-full bg-panel border-2 border-primary group-hover:bg-primary transition-colors shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-muted text-sm sm:text-base mt-1 sm:mt-0">
                    {exp.duration}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary">{exp.company}</span>
                  <span className="text-muted">•</span>
                  <span className="text-xs border border-border-primary px-2 py-0.5 rounded-sm bg-panel text-muted">
                    {exp.type}
                  </span>
                </div>
                
                <ul className="list-none space-y-2 pl-0">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex text-text/90">
                      <span className="text-primary mr-2">→</span> 
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Terminal>
    </div>
  );
}
