// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Hitesh Warhate',
  first: 'HITESH',
  role: 'Software Developer',
  tagline: 'Full-Stack · DevOps · Backend Engineering',
  photo: '/images/hitesh.jpg',
  location: 'India',
  summary:
    'B.Tech IT student and software developer building efficient, scalable systems — from GIS platforms and IoT dashboards to CI/CD pipelines that ship them to production.',
  github: 'https://github.com/hitesh-warhate',
  githubUser: 'hitesh-warhate',
  linkedin: '', // TODO: add your LinkedIn URL
  email: '', // TODO: add your email address
  resume: 'https://drive.google.com/file/d/1pyZzi4_JEAEqgWv2NvAe7AqQzsm5nYIz/view?usp=sharing',
}

export const education = {
  degree: 'B.Tech Information Technology',
  college: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
  cgpa: '8.04',
  graduation: 'May 2027',
  span: '2023 — 2027',
}

export const focus = [
  'Full-Stack Development',
  'DevOps & Infrastructure',
  'Backend Engineering',
  'CI/CD Automation',
  'Cloud Computing',
]

export const projects = [
  {
    slug: 'fra-atlas',
    title: 'FRA-Atlas',
    genre: 'AI + Data',
    logline: 'Forest Rights Act Digital Management System.',
    overview:
      'A comprehensive digital management system built to handle and visualize data related to the Forest Rights Act. It integrates geographic information systems (GIS) with robust backend services to provide actionable insights.',
    features: [
      'Interactive map visualization',
      'Spatial data management',
      'GIS layers',
      'Role-based access control',
      'Secure access',
      'Socio-economic data visualization',
    ],
    stack: ['Next.js', 'PostgreSQL', 'PostGIS', 'Leaflet', 'Node.js', 'WebGIS'],
    year: '2025',
    match: 98,
    theme: ['#0f5132', '#16a34a', '#a3e635'],
    motif: 'map',
    source: '',
    demo: '',
  },
  {
    slug: 'krishimitra-360',
    title: 'KrishiMitra 360',
    genre: 'AI + IoT',
    logline: 'IoT Smart Farming Advisory Platform.',
    overview:
      'A smart farming platform that combines IoT sensor data with a full-stack dashboard to provide farmers with real-time advisory and automated irrigation management.',
    features: [
      'Real-time sensor dashboard',
      'Automated alerts',
      'IoT irrigation control',
      'Sensor monitoring',
      'Mobile friendly interface',
    ],
    stack: ['React Native', 'Node.js', 'Express', 'MongoDB', 'ESP32', 'IoT'],
    year: '2025',
    match: 96,
    theme: ['#7c2d12', '#ea580c', '#facc15'],
    motif: 'sensor',
    source: '',
    demo: '',
  },
  {
    slug: 'cloud-deploy-pipeline',
    title: 'Auto-Deploy Pipeline',
    genre: 'DevOps',
    logline: 'Automated CI/CD infrastructure for microservices.',
    overview:
      'A robust DevOps pipeline built to automate the testing, containerization, and deployment of microservices using Docker, GitHub Actions, and AWS.',
    features: [
      'Automated testing',
      'Container orchestration',
      'Zero-downtime deployment',
      'Infrastructure monitoring',
      'CI/CD automation',
    ],
    stack: ['Docker', 'GitHub Actions', 'AWS', 'Nginx', 'Linux'],
    year: '2026',
    match: 97,
    theme: ['#0c1e4a', '#2563eb', '#22d3ee'],
    motif: 'pipeline',
    source: '',
    demo: '',
  },
  {
    slug: 'tradex',
    title: 'TradeX',
    genre: 'Fintech',
    logline: 'Stock market management interface.',
    overview:
      'A frontend dashboard for managing and tracking stock market portfolios, displaying market information, charts, and relevant trading statistics.',
    features: ['Market dashboard', 'Stock information', 'Portfolio interface', 'Charts', 'Responsive UI'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    year: '2024',
    match: 92,
    theme: ['#4a0410', '#e50914', '#fb7185'],
    motif: 'chart',
    source: '',
    demo: '',
  },
]

export const skills = [
  {
    category: 'Languages',
    blurb: 'What I think in',
    items: [
      ['Python', 16],
      ['JavaScript', 15],
      ['TypeScript', 14],
      ['SQL', 15],
      ['C/C++', 12],
    ],
  },
  {
    category: 'Frontend',
    blurb: 'Interfaces & the web platform',
    items: [
      ['React', 16],
      ['Next.js', 14],
      ['HTML', 18],
      ['CSS', 17],
      ['Tailwind CSS', 16],
      ['Bootstrap', 15],
    ],
  },
  {
    category: 'Backend',
    blurb: 'APIs & server logic',
    items: [
      ['Node.js', 14],
      ['Express.js', 14],
      ['REST APIs', 16],
      ['FastAPI', 12],
    ],
  },
  {
    category: 'Databases',
    blurb: 'Storage, spatial & relational',
    items: [
      ['PostgreSQL', 15],
      ['MySQL', 16],
      ['PostGIS', 12],
    ],
  },
  {
    category: 'Cloud & DevOps',
    blurb: 'Shipping & automation',
    items: [
      ['Docker', 12],
      ['Git', 17],
      ['GitHub', 17],
      ['CI/CD', 11],
    ],
  },
]

// Episodes of the journey, oldest first.
export const journey = [
  {
    code: 'S01 · E01',
    title: 'The Beginning',
    when: '2023',
    kind: 'Education',
    text: 'Started B.Tech in Information Technology at St. Vincent Pallotti College of Engineering & Technology, Nagpur.',
    color: '#e50914',
  },
  {
    code: 'S01 · E02',
    title: 'The Full-Stack Arc',
    when: '2023 — Present',
    kind: 'Project Experience',
    points: [
      'Built scalable full-stack web applications using React, Next.js, and Node.js.',
      'Developed backend architectures, managed PostgreSQL databases, and integrated external APIs.',
      'Containerized applications with Docker and deployed them to cloud platforms.',
    ],
    color: '#f59e0b',
  },
  {
    code: 'S02 · E01',
    title: 'The Backend Intern',
    when: '2026',
    kind: 'Internship',
    role: 'Backend Developer Intern',
    company: '', // TODO: add company name & dates
    points: [
      'Developed and maintained RESTful APIs using Node.js and Express to support frontend applications.',
      'Optimized database queries in PostgreSQL, improving data retrieval speeds by 30%.',
      'Collaborated with frontend developers to integrate backend services.',
    ],
    color: '#8b5cf6',
  },
  {
    code: 'S02 · E02',
    title: 'The DevOps Intern',
    when: '2026',
    kind: 'Internship',
    role: 'DevOps Engineering Intern',
    company: '', // TODO: add company name & dates
    points: [
      'Automated deployment processes using GitHub Actions and Docker, reducing deployment time significantly.',
      'Managed and monitored cloud infrastructure on AWS, ensuring high availability.',
      'Implemented CI/CD pipelines to streamline testing and delivery of microservices.',
    ],
    color: '#06b6d4',
  },
  {
    code: 'S02 · E03',
    title: 'Graduation Day',
    when: 'May 2027',
    kind: 'Coming soon',
    text: 'B.Tech IT, graduating with a CGPA of 8.04 — and looking for the next season.',
    color: '#22c55e',
    upcoming: true,
  },
]
