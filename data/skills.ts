export interface Skill {
  name: string;
  level: number; // 0 to 20 (representing blocks)
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", level: 18 },
      { name: "Python", level: 16 },
      { name: "JavaScript", level: 15 },
      { name: "TypeScript", level: 14 },
      { name: "SQL", level: 15 },
      { name: "C/C++", level: 12 },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 16 },
      { name: "Next.js", level: 14 },
      { name: "HTML", level: 18 },
      { name: "CSS", level: 17 },
      { name: "Tailwind CSS", level: 16 },
      { name: "Bootstrap", level: 15 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", level: 17 },
      { name: "Node.js", level: 14 },
      { name: "Express.js", level: 14 },
      { name: "REST APIs", level: 16 },
      { name: "FastAPI", level: 12 },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 15 },
      { name: "MongoDB", level: 13 },
      { name: "MySQL", level: 16 },
      { name: "PostGIS", level: 12 },
    ]
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Python", level: 16 },
      { name: "TensorFlow", level: 13 },
      { name: "PyTorch", level: 11 },
      { name: "Machine Learning", level: 14 },
      { name: "Computer Vision", level: 13 },
      { name: "CNN", level: 12 },
    ]
  },
  {
    title: "Cloud / DevOps",
    skills: [
      { name: "AWS", level: 10 },
      { name: "Docker", level: 12 },
      { name: "Git", level: 17 },
      { name: "GitHub", level: 17 },
      { name: "CI/CD", level: 11 },
      { name: "Linux", level: 14 },
    ]
  }
];
