import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { skillsData } from '@/data/skills';

export const metadata = {
  title: 'Skills | Hitesh Warhate',
  description: 'Technical skills and expertise of Hitesh Warhate',
};

export default function Skills() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Terminal title="bash">
        <TerminalPrompt command="skills --all" />
        
        <div className="mt-6 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {skillsData.map((category) => (
              <div key={category.title}>
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-border-primary pb-2">
                  ### {category.title}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between group">
                      <span className="w-32 text-text mb-1 sm:mb-0 group-hover:text-primary transition-colors">{skill.name}</span>
                      <span className="flex text-sm">
                        <span className="text-primary">
                          {'█'.repeat(skill.level)}
                        </span>
                        <span className="text-muted">
                          {'░'.repeat(20 - skill.level)}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Terminal>
    </div>
  );
}
