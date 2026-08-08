import React from 'react';
import { experienceData } from '@/data/experience';

const getRoleStyle = (role: string, type: string) => {
  const r = role.toLowerCase();
  const t = type.toLowerCase();
  if (r.includes('ai') || r.includes('ml')) return { text: 'text-primary', border: 'border-primary', bg: 'bg-primary', shadow: 'shadow-[0_0_10px_rgba(139,92,246,0.6)]', groupHover: 'group-hover:text-primary', groupBorder: 'group-hover:border-primary/50' };
  if (r.includes('data')) return { text: 'text-cyan-accent', border: 'border-cyan-accent', bg: 'bg-cyan-accent', shadow: 'shadow-[0_0_10px_rgba(6,182,212,0.6)]', groupHover: 'group-hover:text-cyan-accent', groupBorder: 'group-hover:border-cyan-accent/50' };
  if (t.includes('intern')) return { text: 'text-warning', border: 'border-warning', bg: 'bg-warning', shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.6)]', groupHover: 'group-hover:text-warning', groupBorder: 'group-hover:border-warning/50' };
  if (t.includes('project')) return { text: 'text-pink-accent', border: 'border-pink-accent', bg: 'bg-pink-accent', shadow: 'shadow-[0_0_10px_rgba(236,72,153,0.6)]', groupHover: 'group-hover:text-pink-accent', groupBorder: 'group-hover:border-pink-accent/50' };
  return { text: 'text-blue-accent', border: 'border-blue-accent', bg: 'bg-blue-accent', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.6)]', groupHover: 'group-hover:text-blue-accent', groupBorder: 'group-hover:border-blue-accent/50' };
};

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full scroll-mt-24 flex flex-col space-y-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-text">EXPERIENCE</h2>
        <div className="h-[1px] flex-1 bg-border-primary/50" />
      </div>

      <div className="border border-border-primary p-6 md:p-10 bg-panel rounded-sm overflow-hidden relative shadow-sm">
        <div className="absolute top-0 left-[27px] md:left-[39px] bottom-0 w-[2px] bg-border-primary/50" />
        
        <div className="font-mono text-2xl font-black text-blue-accent mb-8 relative z-10 flex items-center gap-4">
          <div className="w-4 h-4 rounded-sm bg-blue-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          2026_PRESENT
        </div>

        <div className="space-y-12">
          {experienceData.map((exp, index) => {
            const style = getRoleStyle(exp.role, exp.type);
            
            return (
              <div key={exp.id} className="relative z-10 flex gap-6 md:gap-8 group">
                <div className="mt-1.5 relative flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full border-2 bg-panel transition-all ${style.border} group-hover:${style.bg} group-hover:${style.shadow}`} />
                  {/* The horizontal connecting line */}
                  <div className="absolute top-2 left-4 w-6 md:w-8 h-[2px] bg-border-primary/50" />
                </div>
                
                <div className={`flex-1 border border-border-primary p-6 rounded-sm bg-background-secondary transition-colors ${style.groupBorder}`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className={`text-xl font-bold text-text transition-colors ${style.groupHover}`}>{exp.role}</h3>
                      <div className={`${style.text} font-mono text-sm mt-1`}>{exp.company}</div>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-muted">
                      <span className="bg-panel px-2 py-1 rounded-sm border border-border-primary/50">{exp.duration}</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex gap-3 text-sm text-text/80">
                        <span className={`${style.text} opacity-50 mt-1`}>{'>>'}</span>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
