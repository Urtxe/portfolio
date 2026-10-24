import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Play,
  Plus,
  Sparkles,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import {
  certifications,
  navigation,
  profile,
  projects,
  stack,
  timeline,
} from "./data";
import type { Project } from "./data";
import { Github, Linkedin } from "./BrandIcons";

const currentYear = new Date().getFullYear();

function External({
  href,
  children,
  className = "",
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {children}
      <span className="sr-only"> (abre en otra pestaña)</span>
    </a>
  );
}
function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Tecnologías">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function SectionHeading({
  number,
  label,
  title,
  id,
  children,
}: {
  number: string;
  label: string;
  title: string;
  id: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> {label}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
function ProjectArt({ project }: { project: Project }) {
  return (
    <div className={`project-art art-${project.visual}`} aria-hidden="true">
      <span className="art-label">{project.category.split(" · ")[0]}</span>
      {project.visual === "kitchen" && (
        <div className="recipe-art">
          <span className="recipe-line" />
          <span className="recipe-line" />
          <span className="recipe-line" />
          <span className="recipe-symbol">
            L<span>01</span>
          </span>
          <div className="recipe-caption">
            Una buena receta.
            <br />
            Una estructura mejor.
          </div>
        </div>
      )}
      {project.visual === "layers" && (
        <div className="layers-art">
          <span>
            01 <b>Interfaz</b>
            <Code2 size={18} />
          </span>
          <span>
            02 <b>API</b>
            <GitBranch size={18} />
          </span>
          <span>
            03 <b>Datos</b>
            <Terminal size={18} />
          </span>
        </div>
      )}
      {project.visual === "signals" && (
        <div className="signal-art">
          <svg viewBox="0 0 500 150" fill="none">
            <path
              d="M0 110H500M0 60H500M0 10H500"
              stroke="currentColor"
              opacity=".12"
            />
            <path
              d="M0 100L35 100L50 80L68 125L90 30L108 110L135 86L170 86L190 60L214 104L240 104L260 24L280 135L304 66L330 90L360 90L384 45L407 105L435 77L465 77L480 60H500"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>
            capture <ChevronRight size={12} /> process{" "}
            <ChevronRight size={12} /> evaluate
          </span>
        </div>
      )}
      {project.visual === "agent" && (
        <div className="agent-art">
          <span className="agent-node">
            <Terminal size={22} />
          </span>
          <i />
          <span className="agent-node main-node">
            <Sparkles size={30} />
          </span>
          <i />
          <span className="agent-node">
            <CheckCheck size={22} />
          </span>
        </div>
      )}
      {project.visual === "wood" && (
        <div className="wood-art">
          <span>
            AV<span>CARPINTERÍA</span>
          </span>
          <div className="wood-lines" />
        </div>
      )}
      <span className="concept-label">Composición conceptual</span>
    </div>
  );
}
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`project-card project-${project.visual}`}
      id={project.id}
    >
      <ProjectArt project={project} />
      <div className="project-body">
        <div className="project-meta">
          <span className="mono">/{project.number}</span>
          <span className="project-status">{project.status}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-lead">{project.description}</p>
        <p className="project-description">{project.detail}</p>
        <Tags items={project.technologies} />
        <div className="project-bottom">
          {project.link ? (
            <External href={project.link}>
              Ver código <ArrowUpRight size={16} />
            </External>
          ) : (
            <span className="mono">{project.concept}</span>
          )}
        </div>
      </div>
    </article>
  );
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncTheme = () => {
      let preference: string | null = null;
      try {
        preference = localStorage.getItem("portfolio-theme");
      } catch {
        /* El tema del sistema funciona sin almacenamiento. */
      }
      const next =
        preference === "light" || preference === "dark"
          ? preference
          : media.matches
            ? "light"
            : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    syncTheme();
    media.addEventListener("change", syncTheme);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      media.removeEventListener("change", syncTheme);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 4000);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* La selección sigue activa durante la sesión. */
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email copiado");
    } catch {
      setCopyStatus("No se pudo copiar. Puedes usar el enlace de correo.");
    }
  }
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header
        className="header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
          }
        }}
      >
        <div className="container header-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label="mu_ mikelurtxegi.dev · Mikel Urtxegi, inicio"
          >
            <span className="brand-mark">
              mu<span>_</span>
            </span>
            <span className="brand-name">
              mikelurtxegi<span>.dev</span>
            </span>
          </a>
          <nav aria-label="Navegación principal" className="desktop-nav">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-button"
              onClick={toggleTheme}
              aria-label="Cambiar entre tema claro y oscuro"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="#contacto" className="header-contact">
              Hablemos <ArrowUpRight size={15} />
            </a>
            <button
              className="icon-button menu-button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Navegación móvil"
          className="mobile-nav"
          hidden={!menuOpen}
        >
          {[...navigation, { id: "contacto", label: "Contacto" }].map(
            (item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={16} />
              </a>
            ),
          )}
        </nav>
      </header>
      <main id="contenido">
        <section
          id="inicio"
          className="hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" /> MIKEL URTXEGI / SOFTWARE DEVELOPER
            </span>
            <span className="hero-location">
              <MapPin size={13} />
              {profile.location}
            </span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title">
                Construyo soluciones
                <br className="desktop-break" /> digitales.
                <br />
                <span className="muted-title">De la idea a</span>
                <br />
                <span className="accent-text">
                  producción<span className="title-period">.</span>
                </span>
              </h1>
              <p className="hero-description">
                Desarrollo Full-Stack, inteligencia artificial y automatización.
                Convierto problemas reales en aplicaciones que se pueden usar.
              </p>
              <div className="hero-buttons">
                <a href="#proyectos" className="button primary-button">
                  Explorar proyectos <ArrowDown size={17} />
                </a>
                <a href="#contacto" className="button secondary-button">
                  Contactar <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="hero-socials">
                <External href={profile.github}>
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={13} />
                </External>
                <External href={profile.linkedin}>
                  <Linkedin size={16} />
                  LinkedIn
                  <ArrowUpRight size={13} />
                </External>
                <span className="hero-social-divider" />
                <span className="mono">Python · JavaScript · Docker</span>
              </div>
            </div>
            <div
              className="hero-visual"
              aria-label="Mi enfoque: entender, construir y desplegar"
            >
              <div className="visual-cross cross-one">+</div>
              <div className="visual-cross cross-two">+</div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="build-card">
                <div className="build-card-top">
                  <span>
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>product.flow</span>
                  <Code2 size={14} />
                </div>
                <div className="build-card-content">
                  <span className="code-comment">
                    // Un problema real. Una solución útil.
                  </span>
                  <p>
                    <span className="code-purple">const</span> idea{" "}
                    <span className="muted">=</span>{" "}
                    <span className="code-string">entender();</span>
                  </p>
                  <p>
                    <span className="code-purple">await</span> construir(idea);
                  </p>
                  <p>
                    <span className="code-purple">await</span> desplegar();
                  </p>
                  <div className="code-spacer" />
                  <p>
                    <span className="code-comment">// Y seguir mejorando.</span>
                  </p>
                  <p>
                    producto.<span className="code-string">evolucionar</span>();
                    <span className="code-cursor" />
                  </p>
                </div>
                <div className="build-card-footer">
                  <span>
                    <GitBranch size={12} /> main
                  </span>
                  <span>
                    <span className="status-dot" /> build passing
                  </span>
                </div>
              </div>
              <div className="shipping-label">
                <span className="shipping-icon">
                  <Check size={17} />
                </span>
                <span>
                  Ideas que salen del editor.
                  <small>Y llegan a producción.</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
              <span className="visual-coordinate mono">
                43.3183° N &nbsp; 1.9812° W
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <span className="mono">Pensar. Construir. Publicar. Iterar.</span>
            <a href="#proyectos" className="scroll-link">
              Sigue explorando <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <section
          id="proyectos"
          className="section container"
          aria-labelledby="projects-title"
        >
          <SectionHeading
            id="projects-title"
            number="01"
            label="PROYECTOS SELECCIONADOS"
            title="Menos teoría. Más producto."
          >
            Aplicaciones nacidas de necesidades reales.
            <br />
            Cada una, una forma distinta de resolver un problema.
          </SectionHeading>
          <article className="featured-project" aria-labelledby="balance-title">
            <div className="featured-copy">
              <div className="featured-meta">
                <span className="mono">/01 · PROYECTO PRINCIPAL</span>
                <span className="live-badge">
                  <span className="status-dot" />
                  En producción
                </span>
              </div>
              <div className="balance-brand">
                <span className="balance-icon">
                  <GitBranch size={25} />
                </span>
                <span>Web + Android</span>
              </div>
              <h3 id="balance-title">Balance Laboral</h3>
              <p className="featured-lead">
                Tu jornada, tus datos.
                <br />
                El control, en tus manos.
              </p>
              <p className="featured-description">
                Nació de una necesidad que conocí en hostelería: entender las
                horas que trabajamos. Diseñé, desarrollé y publiqué una
                aplicación para registrar jornadas y consultar el balance
                laboral anual.
              </p>
              <ul className="feature-list">
                <li>
                  <Check size={15} />
                  Calendario, vacaciones, festivos y horas extra
                </li>
                <li>
                  <Check size={15} />
                  Convenios, informes PDF y sincronización
                </li>
                <li>
                  <Check size={15} />
                  Asesor de IA con recuperación documental RAG
                </li>
                <li>
                  <Check size={15} />
                  Usuarios, suscripciones Stripe y PWA / Android TWA
                </li>
              </ul>
              <Tags
                items={[
                  "JavaScript",
                  "Firebase",
                  "Stripe",
                  "Gemini API",
                  "RAG",
                ]}
              />
              <details className="project-details">
                <summary>
                  De la interfaz al despliegue <Plus size={13} />
                </summary>
                <p>
                  Frontend con HTML, CSS y JavaScript. Firebase Authentication
                  para usuarios, Firestore para sincronización, Cloud Functions
                  para la lógica de servidor y Firebase Hosting para
                  publicación. Calendarios por localidad y sector, históricos
                  anuales, funciones gratuitas y Premium e integración de
                  convenios mediante embeddings y recuperación documental.
                </p>
              </details>
              <div className="featured-links">
                <External
                  href="https://balancelaboral.es"
                  className="button primary-button"
                >
                  Visitar aplicación <ArrowUpRight size={16} />
                </External>
                <External
                  href="https://play.google.com/store/apps/details?id=es.balancelaboral.app"
                  label="Balance Laboral en Google Play"
                  className="project-text-link"
                >
                  <Play size={15} />
                  Google Play
                </External>
                <External
                  href="https://github.com/Urtxe/Calendario-Laboral"
                  label="Código de Balance Laboral en GitHub"
                  className="project-icon-link"
                >
                  <Github size={20} />
                </External>
              </div>
            </div>
            <div className="featured-media">
              <div className="media-top">
                <span className="mono">
                  <span className="status-dot" /> balancelaboral.es
                </span>
                <External
                  href="https://balancelaboral.es"
                  label="Abrir Balance Laboral"
                >
                  <ExternalLink size={15} />
                </External>
              </div>
              <div className="screenshot-scene">
                <img
                  src={`${import.meta.env.BASE_URL}images/balance-laboral.webp`}
                  alt="Captura real del calendario de Balance Laboral en su vista pública, sin datos personales"
                  width="1440"
                  height="1040"
                  loading="lazy"
                  className="balance-screenshot"
                />
              </div>
              <div className="media-caption">
                <span>CAPTURA REAL · VISTA PÚBLICA</span>
                <span>
                  Diseño → desarrollo → despliegue <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </article>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="lab-strip">
            <span className="lab-symbol">
              <Terminal size={24} />
            </span>
            <div>
              <p className="eyebrow">EL LABORATORIO SIGUE ABIERTO</p>
              <p>
                También experimento con pequeñas herramientas y servicios
                autoalojados.
              </p>
              <span>
                Kotxea, para organizar turnos de conducción · Raspberry Control
                Center, para supervisar mi servidor.
              </span>
            </div>
            <External
              href="https://github.com/Urtxe/kotxea-app"
              className="lab-link"
            >
              Explorar Kotxea <ArrowUpRight size={17} />
            </External>
          </div>
        </section>
        <section
          id="stack"
          className="section stack-section"
          aria-labelledby="stack-title"
        >
          <div className="container">
            <SectionHeading
              id="stack-title"
              number="02"
              label="TECNOLOGÍAS Y HERRAMIENTAS"
              title="El stack al servicio de la idea."
            >
              Elijo herramientas para resolver problemas.
              <br />
              Estos son mis entornos de trabajo y aprendizaje.
            </SectionHeading>
            <div className="stack-grid">
              {stack.map((group, index) => (
                <article
                  className={`stack-card stack-card-${index}`}
                  key={group.title}
                >
                  <div className="stack-card-top">
                    <group.icon size={23} />
                    <span className="mono">0{index + 1}</span>
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <Tags items={group.primary} />
                  <span className="stack-secondary">{group.secondary}</span>
                </article>
              ))}
            </div>
            <div className="stack-note">
              <Plus size={16} />
              <p>
                <strong>También en mi mochila:</strong> Java, C#, .NET, Oracle
                SQL, JSON, AJAX y Bootstrap. VS Code, Visual Studio y PyCharm
                como herramientas de desarrollo.
              </p>
            </div>
            <p className="stack-context">
              Mi experiencia combina prácticas profesionales y proyectos
              propios. La IA aplicada, la automatización y buena parte de la
              infraestructura proceden de desarrollo práctico personal.
            </p>
          </div>
        </section>
        <section
          id="sobre-mi"
          className="section about-section container"
          aria-labelledby="about-title"
        >
          <div className="about-intro">
            <p className="eyebrow">
              <span>03 /</span> SOBRE MÍ
            </p>
            <h2 id="about-title">
              Primero, entender.
              <br />
              Después, construir.
            </h2>
            <div className="about-signature">
              <span className="signature-mark">mu_</span>
              <div>
                Mikel Urtxegi<span>Software Developer · Donostia</span>
              </div>
            </div>
            <div className="language-pills">
              <span>
                Euskera <b>Nativo</b>
              </span>
              <span>
                Español <b>Fluido</b>
              </span>
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              Antes de escribir código, pasé más de 15 años trabajando con
              personas, equipos y problemas que había que resolver en el
              momento.
            </p>
            <p>
              La hostelería me enseñó a organizarme, asumir responsabilidades y
              entender lo que necesita quien está al otro lado. Hoy aplico esa
              experiencia al desarrollo de software.
            </p>
            <p>
              Decidí cambiar de rumbo, completé DAW en ILERNA y realicé cuatro
              meses de prácticas en PKF Attest. Ahora continúo mi formación con
              un Bachelor en Informática en UNIPRO y construyo mis propias
              aplicaciones.
            </p>
            <p>
              Mi experiencia profesional como desarrollador es reciente, pero ya
              he recorrido el camino de una idea a producción. Disfruto
              conectando las piezas: una interfaz útil, un backend que funcione,
              los datos, el despliegue y lo que viene después.
            </p>
            <p>
              Uso IA como apoyo al desarrollo y la integro en mis proyectos
              cuando aporta una solución concreta. Me interesa aprender, probar
              y entender por qué funciona lo que construyo.
            </p>
            <div className="about-principle">
              <span className="status-dot" />
              <span>
                Software útil. Aprendizaje continuo. Cuidado por los detalles.
              </span>
            </div>
          </div>
        </section>
        <section
          id="trayectoria"
          className="section timeline-section container"
          aria-labelledby="timeline-title"
        >
          <SectionHeading
            id="timeline-title"
            number="04"
            label="EXPERIENCIA Y FORMACIÓN"
            title="Un recorrido con intención."
          >
            Una nueva etapa profesional.
            <br />
            Una experiencia anterior que suma.
          </SectionHeading>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.title}>
                <div className="timeline-date mono">{item.date}</div>
                <div className="timeline-content">
                  <span className="timeline-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p className="timeline-organization">{item.organization}</p>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="certifications">
            <div className="certifications-heading">
              <p className="eyebrow">
                <span>+</span> FORMACIÓN CONTINUA
              </p>
              <h3>
                Seguir aprendiendo
                <br />
                forma parte del trabajo.
              </h3>
              <p>Certificaciones y cursos completados.</p>
            </div>
            <ul className="certification-list">
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <span className="certificate-check">
                    <Check size={15} />
                  </span>
                  <span>
                    <strong>{cert.title}</strong>
                    <span>{cert.issuer}</span>
                  </span>
                  <span className="mono">{cert.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          id="contacto"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="contact-top">
              <p className="eyebrow">
                <span>05 /</span> SIGUIENTE CONVERSACIÓN
              </p>
              <span className="contact-location">
                <MapPin size={14} />
                Donostia, Gipuzkoa · España
              </span>
            </div>
            <div className="contact-layout">
              <div>
                <h2 id="contact-title">
                  ¿Construimos
                  <br />
                  algo <span>útil?</span>
                  <ArrowUpRight className="contact-arrow" />
                </h2>
                <p>
                  ¿Tienes un proyecto en mente o quieres hablar sobre una
                  oportunidad? Me encantará conocerlo.
                </p>
                <a className="contact-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <ArrowUpRight size={23} />
                </a>
                <div className="copy-row">
                  <button onClick={copyEmail} className="copy-button">
                    {copyStatus === "Email copiado" ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                    Copiar email
                  </button>
                  <span role="status" aria-live="polite">
                    {copyStatus}
                  </span>
                </div>
              </div>
              <div className="contact-links">
                <External href={profile.linkedin}>
                  <span>
                    <Linkedin size={18} />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={18} />
                </External>
                <External href={profile.github}>
                  <span>
                    <Github size={18} />
                    GitHub
                  </span>
                  <ArrowUpRight size={18} />
                </External>
                <a href={`tel:${profile.phone}`}>
                  <span>
                    <Phone size={18} />
                    +34 667 808 347
                  </span>
                  <ArrowUpRight size={18} />
                </a>
                <External href="https://wa.me/34667808347">
                  <span>
                    <MessageCircle size={18} />
                    También por WhatsApp
                  </span>
                  <ArrowUpRight size={18} />
                </External>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer container">
        <a className="brand" href="#inicio" aria-label="mu_ · Volver al inicio">
          <span className="brand-mark">
            mu<span>_</span>
          </span>
        </a>
        <p>
          © {currentYear} Mikel Urtxegi{" "}
          <span>· Hecho con criterio y curiosidad.</span>
        </p>
        <a href="#inicio" className="back-top">
          Volver arriba <ArrowUp size={15} />
        </a>
      </footer>
    </>
  );
}
export default App;
