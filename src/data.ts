import { Braces, Database, Layers3, Network, Sparkles } from "lucide-react";

// Contenido en español. Las futuras traducciones pueden conservar esta estructura.
export const profile = {
  name: "Mikel Urtxegi",
  fullName: "Mikel Urtxegi García",
  email: "mikelurtxegi@gmail.com",
  phone: "+34667808347",
  github: "https://github.com/Urtxe",
  linkedin: "https://www.linkedin.com/in/mikel-urtxegi-garcia-18568566/",
  location: "Donostia / San Sebastián",
};
export const navigation = [
  { id: "proyectos", label: "Proyectos" },
  { id: "stack", label: "Stack" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "trayectoria", label: "Trayectoria" },
];
export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  status: string;
  description: string;
  detail: string;
  technologies: string[];
  visual: "kitchen" | "layers" | "signals" | "agent" | "wood";
  concept: string;
  link?: string;
};
export const projects: Project[] = [
  {
    id: "labezio",
    number: "02",
    name: "Labezio",
    category: "Producto · Full-Stack",
    status: "En desarrollo · privado",
    visual: "kitchen",
    concept: "recetas → ingredientes → escandallos",
    description: "La experiencia en cocina, convertida en software.",
    detail:
      "Evolución de RestaurantRecipes: una plataforma para organizar recetas, ingredientes, costes y cantidades. Frontend y backend separados, con trabajo en arquitectura, integración y preparación del despliegue.",
    technologies: ["Next.js", "Django REST", "PostgreSQL", "Docker"],
  },
  {
    id: "meritum",
    number: "03",
    name: "Meritum",
    category: "Plataforma · Infraestructura",
    status: "Proyecto propio · privado",
    visual: "layers",
    concept: "interfaz / API / persistencia",
    description: "Información académica con una estructura clara.",
    detail:
      "Plataforma para gestionar méritos e información académica o de investigación. Desarrollo por capas con APIs, persistencia en PostgreSQL y contenedores; despliegue, operación y mantenimiento en servidor propio.",
    technologies: ["APIs REST", "PostgreSQL", "Docker", "Linux"],
  },
  {
    id: "trading-bot",
    number: "04",
    name: "Trading Bot",
    category: "Ingeniería · Experimentación",
    status: "Experimental · privado",
    visual: "signals",
    concept: "datos → workers → evaluación",
    description: "Un laboratorio de datos y automatización.",
    detail:
      "Sistema experimental de análisis de datos financieros, generación de señales y evaluación de estrategias y costes. Panel web, workers, históricos e investigación de machine learning y etiquetado en Raspberry Pi. Su foco es la ingeniería y la experimentación.",
    technologies: ["Workers", "PostgreSQL", "Docker", "Raspberry Pi"],
  },
  {
    id: "ai-agent",
    number: "05",
    name: "AI Content Agent",
    category: "IA aplicada · Automatización",
    status: "Proyecto personal",
    visual: "agent",
    concept: "idea → generación → revisión humana",
    description: "Menos tareas repetitivas. Más criterio humano.",
    detail:
      "AI Content Automation Agent explora la generación, organización y planificación de contenido para redes sociales con Gemini API e integración de herramientas. Incluye validaciones y pruebas, con supervisión humana en el flujo de publicaciones.",
    technologies: ["Gemini API", "LLM", "Automatización", "Integraciones"],
  },
  {
    id: "carpinteria",
    number: "06",
    name: "Carpintería Alex Val",
    category: "Web · Pequeño negocio",
    status: "Código público",
    visual: "wood",
    concept: "oficio + presencia digital",
    description: "Un escaparate digital para un oficio real.",
    detail:
      "Web corporativa con presentación de servicios, galería de trabajos, navegación responsive y contacto por WhatsApp. Formularios integrados con PHP, PHPMailer y SMTP para facilitar el contacto con clientes.",
    technologies: ["HTML / CSS", "JavaScript", "PHP", "SMTP"],
    link: "https://github.com/Urtxe/carpinteria-val",
  },
];
export const stack = [
  {
    title: "Frontend",
    icon: Braces,
    description: "Interfaces claras, accesibles y adaptadas a cada pantalla.",
    primary: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML & CSS",
      "Tailwind CSS",
    ],
    secondary:
      "Responsive design · APIs REST · SPA & PWA · desarrollo sin frameworks",
  },
  {
    title: "Backend",
    icon: Layers3,
    description: "La lógica que conecta el producto con sus datos.",
    primary: [
      "Python",
      "Django",
      "Django REST Framework",
      "Node.js",
      "Express",
      "PHP",
    ],
    secondary: "APIs REST · autenticación y usuarios · servicios externos",
  },
  {
    title: "Bases de datos",
    icon: Database,
    description: "Persistencia e información con una estructura útil.",
    primary: ["PostgreSQL", "MySQL", "Firestore", "SQL"],
    secondary: "Conocimientos complementarios de Oracle SQL",
  },
  {
    title: "DevOps & Cloud",
    icon: Network,
    description: "Del entorno local a una aplicación en producción.",
    primary: [
      "Docker",
      "Docker Compose",
      "Git",
      "GitHub Actions",
      "Linux",
      "Firebase",
    ],
    secondary:
      "Raspberry Pi · Hosting & Cloud Functions · Vercel · CI/CD · operación básica de servicios",
  },
  {
    title: "AI & Automation",
    icon: Sparkles,
    description: "IA integrada en productos y flujos de trabajo reales.",
    primary: ["Gemini API", "LLM", "RAG", "Embeddings", "Automatización"],
    secondary:
      "Recuperación semántica · asistentes · clasificación de intenciones · herramientas y agentes · desarrollo asistido con Codex",
  },
];
export const timeline = [
  {
    date: "2026 — actualidad",
    tag: "Formación · en curso",
    title: "Bachelor en Informática",
    organization: "UNIPRO · Universitat Digital Europea",
    text: "Continúo ampliando mi formación en informática mientras desarrollo mis propios proyectos.",
  },
  {
    date: "2026 · 4 meses",
    tag: "Experiencia · prácticas",
    title: "Desarrollo web",
    organization: "PKF Attest",
    text: "Prácticas en un entorno real con frontend, backend y base de datos separados. Python, Django, DRF, Next.js, React, PostgreSQL, Docker Compose, Git, Bitbucket y APIs REST.",
  },
  {
    date: "2024 — junio de 2026",
    tag: "Formación · finalizada",
    title: "Desarrollo de Aplicaciones Web",
    organization: "ILERNA · Técnico Superior",
    text: "La base formal de mi cambio profesional, complementada con el desarrollo y despliegue de aplicaciones propias.",
  },
  {
    date: "Más de 15 años",
    tag: "Trayectoria anterior",
    title: "Hostelería y restauración",
    organization:
      "Entorno hotelero · aproximadamente 10 años en el entorno de NH",
    text: "Experiencia operativa, de organización y de trabajo en equipo, junto con formación previa en hostelería. Una etapa que hoy aporta contexto y orientación al usuario a mi trabajo como desarrollador.",
  },
];
export const certifications = [
  { title: "Next.js App Router Fundamentals", issuer: "Vercel", year: "2026" },
  { title: "React Foundations for Next.js", issuer: "Vercel", year: "2026" },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2025",
  },
  {
    title: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp",
    year: "2025",
  },
  { title: "Python for Everybody", issuer: "freeCodeCamp", year: "2025" },
];
