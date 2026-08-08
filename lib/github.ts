export interface GithubRepo {
  name: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

export interface GithubActivity {
  id: string;
  type: string;
  repo: string;
  created_at: string;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday?: number;
}

export interface GithubStats {
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
  contributions: number;
  contributionData: ContributionDay[][];
  recentRepos: GithubRepo[];
  recentActivity: GithubActivity[];
  isAvailable: boolean;
}

export async function getGithubStats(username: string = 'hitesh-warhate'): Promise<GithubStats> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const defaultStats: GithubStats = {
    repositories: 0,
    followers: 0,
    following: 0,
    stars: 0,
    forks: 0,
    contributions: 0,
    contributionData: [],
    recentRepos: [],
    recentActivity: [],
    isAvailable: false
  };

  try {
    const headers: HeadersInit = {};
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `bearer ${GITHUB_TOKEN}`;
    }

    // 1. Fetch User Data (REST)
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } });
    if (!userRes.ok) throw new Error('Failed to fetch user');
    const userData = await userRes.json();

    // 2. Fetch Repos (REST)
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } });
    if (!repoRes.ok) throw new Error('Failed to fetch repos');
    const repoData = await repoRes.json();

    // 3. Fetch Activity (REST)
    const eventRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`, { headers, next: { revalidate: 3600 } });
    const activityData = eventRes.ok ? await eventRes.json() : [];

    // Calculate totals
    const stars = repoData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const forks = repoData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

    // Format recent repos
    const recentRepos = repoData
      .filter((repo: any) => !repo.fork)
      .slice(0, 4)
      .map((repo: any) => ({
        name: repo.name,
        language: repo.language || 'Unknown',
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        html_url: repo.html_url
      }));

    // Format activity
    const recentActivity = activityData.map((event: any) => {
      let typeLabel = "Activity";
      if (event.type === 'PushEvent') typeLabel = "Pushed to repository";
      if (event.type === 'CreateEvent') typeLabel = "Created repository";
      if (event.type === 'PullRequestEvent') typeLabel = "Pull request";
      if (event.type === 'IssuesEvent') typeLabel = "Issue activity";
      if (event.type === 'ForkEvent') typeLabel = "Forked repository";

      return {
        id: event.id,
        type: typeLabel,
        repo: event.repo.name,
        created_at: event.created_at
      };
    });

    // 4. Fetch Contributions (GraphQL - Requires Token)
    let totalContributions = 0;
    let contributionData: ContributionDay[][] = [];

    if (GITHUB_TOKEN) {
      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `;

      const gqlRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const calendar = gqlData.data?.user?.contributionsCollection?.contributionCalendar;
        
        if (calendar) {
          totalContributions = calendar.totalContributions;
          contributionData = calendar.weeks.map((week: any) => {
            const days = week.contributionDays.map((day: any) => ({
              contributionCount: day.contributionCount,
              date: day.date,
              weekday: day.weekday
            }));
            
            // Pad the first week if it doesn't start on Sunday (weekday 0)
            if (days.length > 0 && days.length < 7 && days[0].weekday > 0) {
              const padding = Array(days[0].weekday).fill({ contributionCount: -1, date: '' });
              return [...padding, ...days];
            }
            return days;
          });
        }
      }
    }

    return {
      repositories: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      stars,
      forks,
      contributions: totalContributions,
      contributionData,
      recentRepos,
      recentActivity,
      isAvailable: true
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return defaultStats;
  }
}
