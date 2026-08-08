import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { Github } from '@/components/icons';
import { getGithubStats } from '@/lib/github';
import { Star } from 'lucide-react';

export async function GithubSection() {
  const stats = await getGithubStats('hitesh-warhate');

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-[#161b22]';
    if (count <= 2) return 'bg-[#0e4429]';
    if (count <= 4) return 'bg-[#006d32]';
    if (count <= 6) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
  };

  const getLanguageColor = (lang: string) => {
    const map: any = {
      Python: 'text-blue-accent border-blue-accent/30',
      JavaScript: 'text-yellow-accent border-yellow-accent/30',
      TypeScript: 'text-cyan-accent border-cyan-accent/30',
      Java: 'text-warning border-warning/30',
      HTML: 'text-warning border-warning/30',
      CSS: 'text-pink-accent border-pink-accent/30',
    };
    return map[lang] || 'text-primary border-primary/30';
  };

  const getActivityStyle = (type: string) => {
    if (type.includes('Push')) return 'bg-cyan-accent shadow-[0_0_8px_rgba(6,182,212,0.5)]';
    if (type.includes('Creat')) return 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]';
    if (type.includes('Pull')) return 'bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]';
    if (type.includes('Issue')) return 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    if (type.includes('Fork')) return 'bg-pink-accent shadow-[0_0_8px_rgba(236,72,153,0.5)]';
    return 'bg-blue-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]';
  };

  // Language analytics
  const languageCounts = stats.recentRepos.reduce((acc: any, repo: any) => {
    if (repo.language && repo.language !== 'Unknown') {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});
  
  const topLanguages = Object.entries(languageCounts).sort((a: any, b: any) => b[1] - a[1]);

  return (
    <section id="github" className="w-full scroll-mt-24 flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
      <Terminal title="github_dashboard.exe" titleClassName="text-cyan-accent" className="border-cyan-accent/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <TerminalPrompt command="github --live --multicolor" />
        
        <div className="mt-6 font-mono">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-primary pb-4">
            <h2 className="text-2xl font-bold text-text inline-flex items-center gap-3">
              <Github className="text-primary" /> LIVE GITHUB DATA
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-panel border border-border-primary rounded-sm">
              <span className={`w-2 h-2 rounded-full animate-pulse ${stats.isAvailable ? 'bg-success' : 'bg-error'}`} />
              <span className={`text-xs tracking-wider font-bold ${stats.isAvailable ? 'text-success' : 'text-error'}`}>
                {stats.isAvailable ? 'LIVE GITHUB DATA' : 'GITHUB DATA UNAVAILABLE'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
            {[
              { label: 'REPOSITORIES', value: stats.repositories, color: 'text-blue-accent', border: 'border-blue-accent/30 hover:border-blue-accent/60', hoverText: 'group-hover:text-blue-accent' },
              { label: 'FOLLOWERS', value: stats.followers, color: 'text-pink-accent', border: 'border-pink-accent/30 hover:border-pink-accent/60', hoverText: 'group-hover:text-pink-accent' },
              { label: 'FOLLOWING', value: stats.following, color: 'text-primary', border: 'border-primary/30 hover:border-primary/60', hoverText: 'group-hover:text-primary' },
              { label: 'CONTRIBUTIONS', value: stats.contributions, color: 'text-cyan-accent', border: 'border-cyan-accent/30 hover:border-cyan-accent/60', hoverText: 'group-hover:text-cyan-accent' },
              { label: 'STARS', value: stats.stars, color: 'text-warning', border: 'border-warning/30 hover:border-warning/60', hoverText: 'group-hover:text-warning' },
              { label: 'FORKS', value: stats.forks, color: 'text-success', border: 'border-success/30 hover:border-success/60', hoverText: 'group-hover:text-success' },
            ].map((stat, i) => (
              <div key={i} className={`border rounded-sm p-4 bg-panel flex flex-col items-start justify-center transition-colors group ${stat.border}`}>
                <span className={`text-[10px] text-muted mb-2 tracking-wider transition-colors ${stat.hoverText}`}>{stat.label}</span>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-8">
              <style>{`
                .github-scrollbar::-webkit-scrollbar { height: 10px; }
                .github-scrollbar::-webkit-scrollbar-track { background: #161b22; border-radius: 6px; }
                .github-scrollbar::-webkit-scrollbar-thumb { background: #484f58; border-radius: 6px; }
                .github-scrollbar::-webkit-scrollbar-thumb:hover { background: #6e7681; }
              `}</style>
              
              <div className="border border-[#30363d] rounded-xl p-4 sm:p-6 bg-[#0d1117] flex flex-col gap-4 shadow-lg mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col">
                    <h3 className="text-white font-semibold text-base">Contribution Calendar</h3>
                    <span className="text-[#8b949e] text-xs">Last 12 months — live from GitHub</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8b949e] text-sm">
                    <Github className="w-5 h-5" />
                    <span>hitesh-warhate</span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-4 github-scrollbar">
                  <div className="flex flex-col gap-1.5 min-w-max pt-2">
                    {/* Month labels */}
                    <div className="flex gap-1.5 text-xs text-[#8b949e] mb-1">
                      {stats.contributionData.length > 0 && (() => {
                        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        let currentMonth = -1;
                        return stats.contributionData.map((week, index) => {
                          const firstValidDay = week.find((d: any) => d.date);
                          if (firstValidDay) {
                            const month = new Date(firstValidDay.date).getMonth();
                            if (month !== currentMonth) {
                              currentMonth = month;
                              return <div key={index} className="w-3.5 relative"><span className="absolute left-0 whitespace-nowrap">{monthNames[month]}</span></div>;
                            }
                          }
                          return <div key={index} className="w-3.5"></div>;
                        });
                      })()}
                    </div>
                    
                    {/* Grid */}
                    <div className="flex gap-1.5">
                      {stats.contributionData.length > 0 ? (
                        stats.contributionData.map((week: any, weekIndex: number) => (
                          <div key={weekIndex} className="flex flex-col gap-1.5">
                            {week.map((day: any, dayIndex: number) => (
                              <div 
                                key={`${weekIndex}-${dayIndex}`} 
                                className={`w-3.5 h-3.5 rounded-[2px] ${day.contributionCount === -1 ? 'bg-transparent' : getContributionColor(day.contributionCount)} ${day.contributionCount !== -1 ? 'hover:ring-1 hover:ring-white transition-all duration-100 cursor-help' : ''}`}
                                title={day.contributionCount !== -1 ? `${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}` : ''}
                              />
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center w-full h-[120px] text-[#8b949e]">
                          Graph data requires GitHub Token in .env.local
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[#8b949e] text-xs gap-4 mt-2">
                  <span>{stats.contributions} contributions in the last year</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-[2px] bg-[#161b22]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#0e4429]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#006d32]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#26a641]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#39d353]"></div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div>
                <h3 className="text-warning mb-4 pb-1 text-sm tracking-wider">RECENT REPOSITORIES</h3>
                <div className="flex flex-col gap-3">
                  {stats.recentRepos.length > 0 ? stats.recentRepos.map((repo, i) => {
                    const repoColors = ['hover:border-primary', 'hover:border-blue-accent', 'hover:border-cyan-accent', 'hover:border-pink-accent'];
                    const hoverBorder = repoColors[i % repoColors.length];
                    const hoverText = hoverBorder.replace('border', 'text');
                    return (
                    <a key={i} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`border border-border-primary bg-panel p-3 rounded-sm flex flex-col transition-colors group ${hoverBorder}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-text font-bold truncate transition-colors ${hoverText}`}>{repo.name}</span>
                        <span className="text-xs text-warning flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className={`text-xs px-2 py-0.5 border rounded-sm ${getLanguageColor(repo.language)} bg-background`}>{repo.language}</span>
                        <span className="text-[10px] text-muted/50">{new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>
                    </a>
                  )}) : (
                    <div className="text-sm text-muted">No public repositories found.</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-success mb-4 pb-1 text-sm tracking-wider">RECENT ACTIVITY</h3>
                <div className="flex flex-col gap-3">
                  {stats.recentActivity.length > 0 ? stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3 text-sm">
                      <div className="mt-1"><span className={`w-2.5 h-2.5 rounded-full inline-block ${getActivityStyle(activity.type)}`} /></div>
                      <div className="flex flex-col">
                        <span className="text-text/90">{activity.type}</span>
                        <span className="text-xs text-muted">{activity.repo}</span>
                        <span className="text-[10px] text-muted/50 mt-1">{new Date(activity.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-sm text-muted">No recent public activity found.</div>
                  )}
                </div>
              </div>
              
              {topLanguages.length > 0 && (
                <div>
                  <h3 className="text-pink-accent mb-4 pb-1 text-sm tracking-wider">LANGUAGE ANALYTICS</h3>
                  <div className="flex flex-wrap gap-2">
                    {topLanguages.map(([lang, count]: any, i) => (
                      <div key={i} className={`flex items-center gap-2 px-3 py-1.5 border rounded-sm text-xs ${getLanguageColor(lang)} bg-background`}>
                        <span className="font-bold">{lang}</span>
                        <span className="text-muted border-l pl-2 border-inherit">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-6 border-t border-border-primary gap-4">
            <div className="text-xs text-muted">
              Data source: GitHub API <br className="sm:hidden" />
              <span className="hidden sm:inline"> | </span> 
              Last updated: {new Date().toLocaleString()}
            </div>
            <a 
              href="https://github.com/hitesh-warhate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-panel text-cyan-accent font-medium hover:bg-cyan-accent/10 transition-colors rounded-sm terminal-border border border-cyan-accent/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              [ VIEW FULL GITHUB PROFILE → ]
            </a>
          </div>
        </div>
      </Terminal>
    </section>
  );
}
