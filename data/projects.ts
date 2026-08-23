export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  github: string;
  live: string;
  image?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  challenges?: string[];
  results?: string[];
}

export const projects: Project[] = [
  {
    slug: "fra-atlas",
    title: "FRA-ATLAS",
    description: "Forest Rights Act Digital Management System.",
    longDescription: "A comprehensive digital management system built to handle and visualize data related to the Forest Rights Act. It integrates geographic information systems (GIS) with robust backend services to provide actionable insights.",
    technologies: ["Next.js", "PostgreSQL", "PostGIS", "Leaflet", "Node.js", "WebGIS"],
    features: [
      "Interactive map visualization",
      "Spatial data management",
      "GIS layers",
      "Role-based access control",
      "Secure access",
      "Socio-economic data visualization"
    ],
    github: "",
    live: "",
  },
  {
    slug: "krishimitra-360",
    title: "KRISHIMITRA 360",
    description: "IoT Smart Farming Advisory Platform.",
    longDescription: "A smart farming platform that combines IoT sensor data with a full-stack dashboard to provide farmers with real-time advisory and automated irrigation management.",
    technologies: ["React Native", "Node.js", "Express", "MongoDB", "ESP32", "IoT"],
    features: [
      "Real-time sensor dashboard",
      "Automated alerts",
      "IoT irrigation control",
      "Sensor monitoring",
      "Mobile friendly interface"
    ],
    github: "",
    live: "",
  },
  {
    slug: "cloud-deploy-pipeline",
    title: "AUTO-DEPLOY PIPELINE",
    description: "Automated CI/CD infrastructure for microservices.",
    longDescription: "A robust DevOps pipeline built to automate the testing, containerization, and deployment of microservices using Docker, GitHub Actions, and AWS.",
    technologies: ["Docker", "GitHub Actions", "AWS", "Nginx", "Linux"],
    features: [
      "Automated testing",
      "Container orchestration",
      "Zero-downtime deployment",
      "Infrastructure monitoring",
      "CI/CD automation"
    ],
    github: "",
    live: "",
  },
  {
    slug: "tradex",
    title: "TRADEX",
    description: "Stock market management interface.",
    longDescription: "A frontend dashboard for managing and tracking stock market portfolios, displaying market information, charts, and relevant trading statistics.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    features: [
      "Market dashboard",
      "Stock information",
      "Portfolio interface",
      "Charts",
      "Responsive UI"
    ],
    github: "",
    live: "",
  }
];
