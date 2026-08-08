import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { skillsData } from '@/data/skills';

const getCategoryStyle = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('languages')) return { text: 'text-primary', bg: 'bg-primary', border: 'border-primary/50' };
  if (t.includes('frontend')) return { text: 'text-pink-accent', bg: 'bg-pink-accent', border: 'border-pink-accent/50' };
  if (t.includes('backend')) return { text: 'text-blue-accent', bg: 'bg-blue-accent', border: 'border-blue-accent/50' };
  if (t.includes('databases')) return { text: 'text-cyan-accent', bg: 'bg-cyan-accent', border: 'border-cyan-accent/50' };
  if (t.includes('ai')) return { text: 'text-primary', bg: 'bg-primary', border: 'border-primary/50' };
  if (t.includes('cloud')) return { text: 'text-warning', bg: 'bg-warning', border: 'border-warning/50' };
  return { text: 'text-success', bg: 'bg-success', border: 'border-success/50' };
};

export function SkillsSection() {
  return (
    <section id="skills" className="w-full scroll-mt-24 flex flex-col space-y-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-text">TECHNICAL SKILLS</h2>
        <div className="h-[1px] flex-1 bg-border-primary/50" />
      </div>

      <Terminal title="skills.exe" titleClassName="text-pink-accent" className="border-pink-accent/30 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
        <TerminalPrompt command="skills --all --multicolor" />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {skillsData.map((category) => {
            const style = getCategoryStyle(category.title);
            
            return (
              <div key={category.title} className={`border border-border-primary p-5 rounded-sm bg-panel hover:${style.border} transition-colors shadow-sm`}>
                <h3 className={`font-bold mb-4 tracking-wider text-sm border-b pb-2 ${style.text} ${style.border}`}>
                  {category.title.toUpperCase()}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-text/90">{skill.name}</span>
                        <span className="text-muted opacity-50">{skill.level}/20</span>
                      </div>
                      <div className="flex gap-[2px]">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 h-1.5 rounded-[1px] ${i < skill.level ? style.bg : 'bg-background border border-border-primary/30'}`}
                            style={{ opacity: i < skill.level ? 0.3 + (0.7 * (i / 20)) : 1 }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Terminal>
    </section>
  );
}
