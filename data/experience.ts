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
    role: "Data Science Intern",
    company: "[Company Name]",
    duration: "[Start Date] - [End Date]",
    type: "Internship",
    description: [
      "Conducted extensive data analysis and cleaning using Python and Pandas to prepare datasets for modeling.",
      "Created visualizations to extract meaningful insights and communicate findings to stakeholders.",
      "Assisted in building statistical models to analyze trends and patterns."
    ]
  },
  {
    id: "exp-2",
    role: "AI/ML Intern",
    company: "[Company Name]",
    duration: "[Start Date] - [End Date]",
    type: "Internship",
    description: [
      "Developed a machine learning model for medical insurance cost prediction, achieving high accuracy.",
      "Performed data preprocessing, feature engineering, and model optimization.",
      "Collaborated with the team to deploy AI applications into testing environments."
    ]
  },
  {
    id: "exp-3",
    role: "Full-Stack Developer",
    company: "Personal / Academic Projects",
    duration: "2023 - Present",
    type: "Project Experience",
    description: [
      "Built full-stack web applications using React, Next.js, and Spring Boot.",
      "Developed backend systems, REST APIs, and managed database architectures (PostgreSQL, MongoDB).",
      "Integrated AI/ML models into web interfaces and mobile applications (React Native).",
      "Created WebGIS solutions using PostGIS and Leaflet for spatial data visualization."
    ]
  }
];
