export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    role: "Backend Developer Intern",
    company: "[Company Name]",
    duration: "[Start Date] - [End Date]",
    type: "Internship",
    description: [
      "Developed and maintained RESTful APIs using Node.js and Express to support frontend applications.",
      "Optimized database queries in PostgreSQL, improving data retrieval speeds by 30%.",
      "Collaborated with frontend developers to seamlessly integrate backend services."
    ]
  },
  {
    id: "exp-2",
    role: "DevOps Engineering Intern",
    company: "[Company Name]",
    duration: "[Start Date] - [End Date]",
    type: "Internship",
    description: [
      "Automated deployment processes using GitHub Actions and Docker, reducing deployment time significantly.",
      "Managed and monitored cloud infrastructure on AWS, ensuring high availability.",
      "Implemented CI/CD pipelines to streamline testing and delivery of microservices."
    ]
  },
  {
    id: "exp-3",
    role: "Full-Stack Developer",
    company: "Personal / Academic Projects",
    duration: "2023 - Present",
    type: "Project Experience",
    description: [
      "Built scalable full-stack web applications using React, Next.js, and Node.js.",
      "Developed robust backend architectures, managed PostgreSQL databases, and integrated external APIs.",
      "Containerized applications using Docker and deployed them to cloud platforms for reliable scaling."
    ]
  }
];
