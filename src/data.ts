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
  visual: "kitchen" | "layers" | "bike" | "wood";
  concept: string;
  link?: string;
};
export const projects: Project[] = [
  {
    id: "labezio",
    number: "02",
    name: "Labezio",
    category: "Aplicación · Full-Stack",
    status: "En desarrollo · entorno local",
    visual: "kitchen",
    concept: "Recetas, ingredientes y escandallos",
    description: "Gestión de recetas y operaciones de cocina.",
    detail:
      "Evolución de RestaurantRecipes. Reúne recetas, ingredientes, costes y escalado de cantidades en una aplicación con frontend y backend separados. Actualmente continúa en desarrollo en local.",
    technologies: ["Next.js", "Django REST", "PostgreSQL", "Docker"],
  },
  {
    id: "meritum",
    number: "03",
    name: "Meritum",
    category: "Aplicación · Full-Stack",
    status: "En desarrollo · versión de prueba",
    visual: "layers",
    concept: "Versión de prueba",
    link: "https://pi4-urtxe.tailb33363.ts.net",
    description: "Gestión de méritos e información académica.",
    detail:
      "Plataforma para organizar méritos e información académica o de investigación. Cuenta con frontend, APIs y persistencia en PostgreSQL, con contenedores y despliegue en servidor propio. Sigue en desarrollo y dispone de una versión que se puede probar.",
    technologies: ["APIs REST", "PostgreSQL", "Docker", "Linux"],
  },
  {
    id: "oreinbike",
    number: "04",
    name: "Oreinbike",
    category: "Web · Proyecto para cliente",
    status: "Pendiente de dominio del cliente",
    visual: "bike",
    concept: "Publicación en dominio del cliente pendiente",
    description: "Web de una iniciativa vinculada a la cultura MTB.",
    detail:
      "Proyecto web en euskera sobre infraestructuras ciclistas, instalaciones, comunidad y formación MTB. Incluye presentación de servicios, trabajos realizados y galerías. Desarrollado y pendiente de su despliegue en un dominio propio del cliente.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
  },
  {
    id: "carpinteria",
    number: "05",
    name: "Carpintería Alex Val",
    category: "Web · Proyecto para cliente",
    status: "Pendiente de dominio del cliente",
    visual: "wood",
    concept: "Publicación en dominio del cliente pendiente",
    description: "Web corporativa para un profesional de carpintería.",
    detail:
      "Presentación de servicios y galería de trabajos con diseño responsive y contacto por WhatsApp. Incluye formularios con PHP, PHPMailer y SMTP. Desarrollada y pendiente de su despliegue en un dominio propio del cliente.",
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
    date: "Septiembre de 2026 — actualidad",
    tag: "Experiencia · puesto actual",
    title: "Junior Software Developer",
    organization: "PKF Attest",
    text: "Desde septiembre trabajo como Junior Software Developer en PKF Attest, donde continúo mi trayectoria profesional en desarrollo de software tras las prácticas.",
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
