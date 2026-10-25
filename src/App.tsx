import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Bike,
  CarFront,
  FolderOpen,
  Mail,
  House,
  BriefcaseBusiness,
  Check,
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
            Recetas e ingredientes.
            <br />
            Costes y escandallos.
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
      {project.visual === "bike" && (
        <div className="bike-art">
          <Bike size={92} strokeWidth={1} />
          <span>OREINBIKE / MTB KULTURA</span>
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
      {project.visual === "car" && (
        <div className="bike-art">
          <CarFront size={92} strokeWidth={1} />
          <span>KOTXEA / BIDAIAK PARTEKATUZ</span>
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
              {project.id === "meritum" ? "Probar Meritum" : "Visitar web"}{" "}
              <ExternalLink size={14} />
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
  const [profileRunning, setProfileRunning] = useState(false);
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
              Hablemos <MessageCircle size={15} />
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
                <span className="nav-marker" aria-hidden="true" />
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
                Mikel Urtxegi.
                <br />
                <span className="muted-title">Software</span>
                <br />
                <span className="accent-text">
                  Developer<span className="title-period">.</span>
                </span>
              </h1>
              <p className="hero-description">
                Desarrollador Full-Stack en PKF Attest. Trabajo con Python,
                JavaScript y Docker, y desarrollo proyectos propios de
                aplicaciones web, inteligencia artificial y automatización.
              </p>
              <div className="hero-buttons">
                <a href="#proyectos" className="button primary-button">
                  Ver proyectos <FolderOpen size={16} />
                </a>
                <a href="#contacto" className="button secondary-button">
                  Contactar <Mail size={16} />
                </a>
              </div>
              <div className="hero-socials">
                <External href={profile.github}>
                  <Github size={16} />
                  GitHub
                </External>
                <External href={profile.linkedin}>
                  <Linkedin size={16} />
                  LinkedIn
                </External>
                <span className="hero-social-divider" />
                <span className="mono">Python · JavaScript · Docker</span>
              </div>
            </div>
            <div
              className="hero-visual"
              aria-label="Perfil técnico: Full-Stack, Python, JavaScript e inteligencia artificial"
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
                  <span>{profileRunning ? "terminal" : "perfil.ts"}</span>
                  <button
                    type="button"
                    className="run-profile"
                    aria-pressed={profileRunning}
                    aria-controls="profile-preview"
                    onClick={() => setProfileRunning(!profileRunning)}
                  >
                    {profileRunning ? <Code2 size={13} /> : <Play size={13} />}
                    {profileRunning ? "Ver código" : "Ejecutar perfil"}
                  </button>
                </div>
                <div className="profile-panels" id="profile-preview">
                  <div className="build-card-content" hidden={profileRunning}>
                    <span className="code-comment">
                      // Mikel Urtxegi · Donostia
                    </span>
                    <p>
                      <span className="code-purple">const</span> perfil = {"{"}
                    </p>
                    <p>
                      &nbsp; rol:{" "}
                      <span className="code-string">"Full-Stack"</span>,
                    </p>
                    <p>
                      &nbsp; stack: [
                      <span className="code-string">"Python", "JS"</span>],
                    </p>
                    <p>
                      &nbsp; intereses: [
                      <span className="code-string">"IA", "Web"</span>]
                    </p>
                    <p>
                      {"}"};<span className="code-cursor" />
                    </p>
                  </div>
                  <div
                    className="build-card-content profile-output"
                    hidden={!profileRunning}
                  >
                    <span className="code-comment">$ ejecutar perfil.ts</span>
                    <p>
                      <span className="code-string">✓</span> Interfaces con React y JavaScript
                    </p>
                    <p>
                      <span className="code-string">✓</span> APIs con Python y Django
                    </p>
                    <p>
                      <span className="code-string">✓</span> Despliegues con Docker
                    </p>
                    <p>
                      <span className="code-string">✓</span> IA aplicada a proyectos propios
                    </p>
                    <p>
                      <a href="#proyectos">
                        Explorar los proyectos <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </div>
                </div>
                <div className="build-card-footer">
                  <span>
                    <GitBranch size={12} /> main
                  </span>
                  <span>
                    <span className="status-dot" /> software developer
                  </span>
                </div>
              </div>
              <div className="shipping-label">
                <span className="shipping-icon">
                  <Code2 size={17} />
                </span>
                <span>
                  Junior Software Developer
                  <small>PKF Attest · desde septiembre de 2026</small>
                </span>
                <BriefcaseBusiness size={15} />
              </div>
              <span className="visual-coordinate mono">
                43.3183° N &nbsp; 1.9812° W
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <span className="mono">Full-Stack · IA · Automatización</span>
            <a href="#proyectos" className="scroll-link">
              Proyectos y trayectoria <FolderOpen size={13} />
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
            label="PROYECTOS"
            title="Aplicaciones y proyectos web."
          >
            Balance Laboral es mi aplicación principal.
            <br />
            También desarrollo aplicaciones propias y webs para clientes.
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
                Registro de jornada y balance laboral anual.
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
                  Abrir Balance Laboral <ExternalLink size={14} />
                </External>
                <External
                  href="https://play.google.com/store/apps/details?id=es.balancelaboral.app"
                  label="Balance Laboral en Google Play"
                  className="project-text-link"
                >
                  <Play size={15} />
                  Google Play
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
                  Aplicación web y Android <Code2 size={13} />
                </span>
              </div>
            </div>
          </article>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
        <section
          id="sobre-mi"
          className="section about-section container"
          aria-labelledby="about-title"
        >
          <div className="about-intro">
            <p className="eyebrow">
              <span>02 /</span> SOBRE MÍ
            </p>
            <h2 id="about-title">Sobre mí y mi recorrido.</h2>
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
                Castellano <b>Nativo</b>
              </span>
              <span>
                Inglés <b>Fluido</b>
              </span>
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              Soy Mikel Urtxegi, desarrollador de software en Donostia. Desde
              septiembre de 2026 trabajo como Junior Software Developer en PKF
              Attest.
            </p>
            <p>
              Mi trayectoria anterior está vinculada a la hostelería, donde
              trabajé durante más de 15 años, aproximadamente diez en el entorno
              de NH. Después decidí orientar mi carrera hacia el desarrollo de
              software.
            </p>
            <p>
              Completé el ciclo de Desarrollo de Aplicaciones Web en ILERNA en
              junio de 2026 y realicé cuatro meses de prácticas en PKF Attest.
              Actualmente continúo mi formación con el Bachelor en Informática
              de UNIPRO.
            </p>
            <p>
              En mis proyectos trabajo con interfaces web, backend, bases de
              datos y despliegues. Balance Laboral reúne una parte importante de
              ese trabajo y conecta con una necesidad que conocí durante mi
              etapa en hostelería.
            </p>
            <p>
              También utilizo herramientas de inteligencia artificial como apoyo
              al desarrollo e integro funcionalidades de IA y automatización en
              aplicaciones propias.
            </p>
          </div>
        </section>
        <section
          id="trayectoria"
          className="section timeline-section container"
          aria-labelledby="timeline-title"
        >
          <SectionHeading
            id="timeline-title"
            number="03"
            label="EXPERIENCIA Y FORMACIÓN"
            title="Experiencia y formación."
          >
            Mi actividad actual en desarrollo de software
            <br />y la formación que la acompaña.
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
              <h3>Certificaciones y cursos.</h3>
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
          id="stack"
          className="section stack-section"
          aria-labelledby="stack-title"
        >
          <div className="container">
            <SectionHeading
              id="stack-title"
              number="04"
              label="TECNOLOGÍAS Y HERRAMIENTAS"
              title="Tecnologías que utilizo."
            >
              Herramientas utilizadas en mi trabajo, mis proyectos
              <br />y mi formación.
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
            <p className="stack-context">
              Mi experiencia combina trabajo en PKF Attest y proyectos propios.
              La IA aplicada, la automatización y buena parte de la
              infraestructura proceden de desarrollo práctico personal.
            </p>
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
                <span>05 /</span> CONTACTO
              </p>
              <span className="contact-location">
                <MapPin size={14} />
                Donostia, Gipuzkoa · España
              </span>
            </div>
            <div className="contact-layout">
              <div>
                <h2 id="contact-title">
                  ¿<span>Hablamos?</span>
                  <MessageCircle className="contact-symbol" strokeWidth={1} />
                </h2>
                <p>
                  Mi próximo proyecto puede ser el tuyo. Si quieres comentar una
                  idea o simplemente ponerte en contacto conmigo, puedes
                  escribirme.
                </p>
                <a className="contact-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <Mail size={20} />
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
                </External>
                <External href={profile.github}>
                  <span>
                    <Github size={18} />
                    GitHub
                  </span>
                </External>
                <a href={`tel:${profile.phone}`}>
                  <span>
                    <Phone size={18} />
                    +34 667 808 347
                  </span>
                </a>
                <External href="https://wa.me/34667808347">
                  <span>
                    <MessageCircle size={18} />
                    También por WhatsApp
                  </span>
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
          <span>· Todos los derechos reservados.</span>
        </p>
        <a href="#inicio" className="back-top">
          Inicio <House size={14} />
        </a>
      </footer>
    </>
  );
}
export default App;
