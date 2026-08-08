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
    longDescription: "A comprehensive digital management system built to handle and visualize data related to the Forest Rights Act. It integrates geographic information systems (GIS) with machine learning to provide actionable insights.",
    technologies: ["Next.js", "PostgreSQL", "PostGIS", "Leaflet", "AI/ML", "WebGIS"],
    features: [
      "Interactive map visualization",
      "Spatial data management",
      "GIS layers",
      "AI-powered insights",
      "Secure access",
      "Socio-economic data visualization"
    ],
    github: "",
    live: "",
  },
  {
    slug: "krishimitra-360",
    title: "KRISHIMITRA 360",
    description: "AI + IoT Smart Farming Advisory Platform.",
    longDescription: "An intelligent farming platform that combines IoT sensor data with artificial intelligence to provide farmers with real-time advisory, disease detection, and automated irrigation management.",
    technologies: ["React Native", "Python", "Machine Learning", "TensorFlow", "ESP32", "IoT"],
    features: [
      "AI crop advisory",
      "Disease detection",
      "IoT irrigation",
      "Sensor monitoring",
      "Voice chatbot"
    ],
    github: "",
    live: "",
  },
  {
    slug: "pashurakshak",
    title: "PASHURAKSHAK",
    description: "AI-based animal disease detection platform.",
    longDescription: "A machine learning platform designed to help farmers identify animal diseases through image uploads, providing confidence scores and diagnostic assistance.",
    technologies: ["Python", "Computer Vision", "Machine Learning", "CNN", "AI"],
    features: [
      "Image upload",
      "Disease prediction",
      "Confidence score",
      "Farmer-focused interface",
      "AI-assisted diagnosis"
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
