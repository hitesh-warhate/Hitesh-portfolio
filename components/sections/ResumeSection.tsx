import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { Download, FileText } from 'lucide-react';

export function ResumeSection() {
  return (
    <section id="resume" className="w-full scroll-mt-24 flex flex-col space-y-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-text">RESUME</h2>
        <div className="h-[1px] flex-1 bg-border-primary/50" />
      </div>

      <Terminal title="resume.exe" titleClassName="text-yellow-accent" className="border-yellow-accent/30 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
        <TerminalPrompt command="resume" />
        
        <div className="mt-6 font-mono text-sm space-y-4">
          <div className="text-muted">Preparing resume...</div>
          
          <div className="flex items-center gap-2 text-blue-accent">
            <span>[</span>
            <div className="flex-1 max-w-md h-3 bg-panel border border-border-primary rounded-sm overflow-hidden">
              <div className="h-full bg-blue-accent w-full" />
            </div>
            <span>] 100%</span>
          </div>

          <div className="text-yellow-accent flex items-center gap-2 mt-4">
            <FileText size={16} />
            Hitesh_Warhate_Resume.pdf
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-4 pb-8 border-b border-border-primary/30">
            <a 
              href="https://drive.google.com/file/d/1pyZzi4_JEAEqgWv2NvAe7AqQzsm5nYIz/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-accent text-background font-bold hover:bg-yellow-accent/90 transition-colors rounded-sm terminal-border shadow-[0_0_15px_rgba(250,204,21,0.3)]"
            >
              [ VIEW IN NEW TAB ]
            </a>
            
            <a 
              href="https://drive.google.com/file/d/1pyZzi4_JEAEqgWv2NvAe7AqQzsm5nYIz/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-panel text-blue-accent font-bold hover:bg-blue-accent/10 transition-colors rounded-sm terminal-border border border-blue-accent/50"
            >
              [ DOWNLOAD PDF ] <Download size={16} />
            </a>
          </div>

          <div className="terminal-border border-blue-accent/50 mt-8 rounded-sm overflow-hidden bg-background w-full shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <iframe 
              src="https://drive.google.com/file/d/1pyZzi4_JEAEqgWv2NvAe7AqQzsm5nYIz/preview" 
              className="w-full h-[600px] md:h-[800px]"
              title="Hitesh Warhate Resume"
            />
          </div>
        </div>
      </Terminal>
    </section>
  );
}
