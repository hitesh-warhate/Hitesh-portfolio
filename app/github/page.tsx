import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { Star, GitFork, BookOpen } from 'lucide-react';
import { Github } from '@/components/icons';
import { getGithubStats } from '@/lib/github';

export const metadata = {
  title: 'GitHub | Hitesh Warhate',
  description: 'GitHub activity and repositories of Hitesh Warhate',
};

export default async function GithubPage() {
  const stats = await getGithubStats('hitesh-warhate');

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Terminal title="bash">
        <TerminalPrompt command="github" />
        
        <div className="mt-6 font-mono">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text border-b border-border-primary pb-2 inline-flex items-center gap-3">
              <Github className="text-primary" /> GitHub Dashboard
            </h1>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-muted">
              <span>Username: <a href="https://github.com/hitesh-warhate" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@hitesh-warhate</a></span>
              <span className="hidden sm:inline">•</span>
              <span>Status: <span className="text-success">Active</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="terminal-border rounded-md p-4 bg-panel flex flex-col items-center justify-center">
              <BookOpen className="text-muted mb-2" size={20} />
              <span className="text-2xl font-bold text-text">{stats.repositories}</span>
              <span className="text-xs text-muted">Repositories</span>
            </div>
            <div className="terminal-border rounded-md p-4 bg-panel flex flex-col items-center justify-center">
              <Star className="text-warning mb-2" size={20} />
              <span className="text-2xl font-bold text-text">{stats.stars}</span>
              <span className="text-xs text-muted">Total Stars</span>
            </div>
            <div className="terminal-border rounded-md p-4 bg-panel flex flex-col items-center justify-center">
              <GitFork className="text-cyan-accent mb-2" size={20} />
              <span className="text-2xl font-bold text-text">{stats.forks}</span>
              <span className="text-xs text-muted">Forks</span>
            </div>
            <div className="terminal-border rounded-md p-4 bg-panel flex flex-col items-center justify-center">
              <div className="text-primary mb-2 font-bold text-xl">{'</>'}</div>
              <span className="text-2xl font-bold text-text">{stats.contributions}</span>
              <span className="text-xs text-muted">Contributions</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-primary mb-4 border-b border-border-primary pb-1 inline-block">CONTRIBUTION GRAPH (Simulated)</h3>
            <div className="terminal-border rounded-md p-4 bg-panel overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {Array.from({ length: 52 }).map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, rowIndex) => {
                      // Generate a random intensity for the mock graph
                      const intensity = Math.random();
                      let bgClass = "bg-border-primary"; // Empty
                      if (intensity > 0.9) bgClass = "bg-primary";
                      else if (intensity > 0.7) bgClass = "bg-primary/80";
                      else if (intensity > 0.5) bgClass = "bg-primary/60";
                      else if (intensity > 0.3) bgClass = "bg-primary/40";
                      
                      return (
                        <div 
                          key={`${colIndex}-${rowIndex}`} 
                          className={`w-3 h-3 rounded-sm ${bgClass}`}
                          title="Contribution"
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted mt-2 italic">* Note: Graph is a static placeholder. Stats above are live from GitHub API.</p>
          </div>

          <div className="text-center mt-8 pt-4 border-t border-border-primary">
            <a 
              href="https://github.com/hitesh-warhate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-medium hover:bg-primary/90 transition-colors rounded-sm terminal-border"
            >
              <Github size={18} /> [ OPEN GITHUB PROFILE ]
            </a>
          </div>
        </div>
      </Terminal>
    </div>
  );
}
