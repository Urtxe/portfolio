import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Menu,
  Moon,
  Sun,
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
import FluidBackground from "./FluidBackground";

const currentYear = new Date().getFullYear();

function External({
  href,
  children,
  className = "",
  label,
}: {
  href: string;
  children: React.ReactNode;
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

function App() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      let preference: string | null = null;
      try {
        preference = localStorage.getItem("portfolio-theme");
      } catch {
        /* El tema sigue disponible durante la sesión. */
      }
      const next =
        preference === "light" || preference === "dark"
          ? preference
          : media.matches
            ? "dark"
            : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
      <header className="header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label="mu_ · Mikel Urtxegi, inicio"
          >
            <span className="brand-mark">
              mu<span>_</span>
            </span>
            <span className="brand-name">
              mikelurtxegi<span>.dev</span>
            </span>
          </a>
          <nav aria-label="Navegación principal" className="desktop-nav">
            {[...navigation, { id: "contacto", label: "Contacto" }].map(
              (item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-button"
              onClick={toggleTheme}
              aria-label="Cambiar entre tema claro y oscuro"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a href="#contacto" className="header-contact">
              Hablemos <ArrowUpRight size={15} />
            </a>
            <button
              ref={menuButtonRef}
              className="icon-button menu-button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
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
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero-shell">
            <FluidBackground />
            <div className="hero-content container">
              <div className="hero-topline">
                <span className="eyebrow">
                  <i className="status-dot" /> FULL-STACK · WEB · IA
                </span>
                <span className="hero-location">
                  <MapPin size={13} /> {profile.location}
                </span>
              </div>
              <div className="hero-title-wrap">
                <h1 id="hero-title">
                  Mikel Urtxegi.
                  <br />
                  <span>Software Developer.</span>
                </h1>
              </div>
              <div className="hero-bottom">
                <p>
                  Construyo productos digitales desde la interfaz hasta el
                  despliegue. Actualmente en PKF Attest y creando proyectos
                  propios en Donostia.
                </p>
                <div className="hero-actions">
                  <a href="#proyectos" className="hero-primary-link">
                    Explorar proyectos <ArrowRight size={16} />
                  </a>
                  <a href="#contacto" className="hero-secondary-link">
                    Hablemos <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="proyectos"
          className="projects-section"
          aria-labelledby="projects-title"
        >
          <div className="container section-inner">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span>01 /</span> PROYECTOS SELECCIONADOS
                </p>
                <h2 id="projects-title">
                  Trabajo que
                  <br />
                  toma forma.
                </h2>
              </div>
              <p className="section-intro">
                Productos propios y proyectos web para clientes, desarrollados
                con atención a lo que ocurre detrás de cada pantalla.
              </p>
            </div>
            <article
              className="featured-project"
              aria-labelledby="balance-title"
            >
              <div className="featured-meta mono">
                <span>/ 01 — PRODUCTO PROPIO</span>
                <span>
                  <i className="status-dot" /> EN PRODUCCIÓN
                </span>
              </div>
              <div className="featured-layout">
                <div className="featured-copy">
                  <p className="project-kicker">WEB · ANDROID · IA APLICADA</p>
                  <h3 id="balance-title">
                    Balance
                    <br />
                    Laboral<span className="period">.</span>
                  </h3>
                  <p className="featured-lead">
                    Una herramienta para entender las horas que trabajamos.
                  </p>
                  <p className="featured-description">
                    Nació de una necesidad que conocí en hostelería. Diseñé,
                    desarrollé y publiqué una aplicación para registrar jornadas
                    y consultar el balance laboral anual.
                  </p>
                  <ul className="feature-list">
                    <li>Calendario, vacaciones, festivos y horas extra</li>
                    <li>Convenios e informes PDF</li>
                    <li>Asesor de IA con recuperación documental RAG</li>
                    <li>Usuarios, suscripciones y sincronización</li>
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
                      Detalles técnicos <span>+</span>
                    </summary>
                    <p>
                      Frontend con HTML, CSS y JavaScript. Firebase
                      Authentication para usuarios, Firestore para
                      sincronización, Cloud Functions para la lógica de servidor
                      y Firebase Hosting. Calendarios por localidad y sector,
                      históricos anuales e integración de convenios mediante
                      embeddings y recuperación documental.
                    </p>
                  </details>
                  <div className="featured-links">
                    <External
                      href="https://balancelaboral.es"
                      className="text-link"
                    >
                      Visitar balancelaboral.es <ArrowUpRight size={16} />
                    </External>
                    <External
                      href="https://play.google.com/store/apps/details?id=es.balancelaboral.app"
                      className="text-link"
                    >
                      Google Play <ArrowUpRight size={16} />
                    </External>
                  </div>
                </div>
                <div className="featured-media">
                  <a
                    className="screenshot-link"
                    href="https://balancelaboral.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir Balance Laboral"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}images/balance-laboral.webp`}
                      alt="Captura real del calendario de Balance Laboral en su vista pública, sin datos personales"
                      width="1440"
                      height="1040"
                      loading="lazy"
                      className="balance-screenshot"
                    />
                    <span className="image-link">
                      <ArrowUpRight size={19} />
                    </span>
                  </a>
                  <div className="media-caption mono">
                    <span>CAPTURA REAL · VISTA PÚBLICA</span>
                    <span>APLICACIÓN WEB Y ANDROID</span>
                  </div>
                </div>
              </div>
            </article>
            <div className="project-list" aria-label="Otros proyectos">
              {projects.map((project) => (
                <article
                  className="project-row"
                  key={project.id}
                  id={project.id}
                >
                  <span className="project-number mono">/{project.number}</span>
                  <div className="project-title">
                    <h3>{project.name}</h3>
                    <p>{project.category}</p>
                  </div>
                  <div className="project-summary">
                    <p>{project.description}</p>
                    <span>{project.status}</span>
                    <details className="project-detail">
                      <summary>
                        Leer más <span>+</span>
                      </summary>
                      <p>{project.detail}</p>
                      <p className="mono">{project.concept}</p>
                    </details>
                  </div>
                  <div className="project-action">
                    {project.link ? (
                      <External
                        href={project.link}
                        label={`${project.name} · abrir proyecto`}
                      >
                        <ArrowUpRight size={19} />
                      </External>
                    ) : (
                      <span aria-label="Sin enlace público">—</span>
                    )}
                  </div>
                  <div className="project-tags">
                    <Tags items={project.technologies} />
                  </div>
                </article>
              ))}
            </div>
            <div className="project-footnote mono">
              02 — 06 &nbsp; APLICACIONES, WEB Y PROYECTOS PARA CLIENTES
            </div>
          </div>
        </section>

        <section
          id="sobre-mi"
          className="about-section section-light"
          aria-labelledby="about-title"
        >
          <div className="container about-layout">
            <div className="about-intro">
              <p className="eyebrow">
                <span>02 /</span> SOBRE MÍ
              </p>
              <h2 id="about-title">
                Una segunda
                <br />
                vocación<span className="period">.</span>
              </h2>
              <p className="about-signature">
                {profile.fullName}
                <span>SOFTWARE DEVELOPER · DONOSTIA</span>
              </p>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                De la hostelería al software: dos formas de trabajar con una
                misma atención a las personas.
              </p>
              <p>
                Trabajé más de 15 años en hostelería, aproximadamente diez de
                ellos en el entorno de NH. Esa experiencia me enseñó a
                organizar, escuchar y entender qué necesita quien está al otro
                lado.
              </p>
              <p>
                Después completé el ciclo de Desarrollo de Aplicaciones Web en
                ILERNA y realicé prácticas en PKF Attest. Desde septiembre de
                2026 trabajo allí como Junior Software Developer y continúo mis
                estudios de Ingeniería Informática en UNIPRO.
              </p>
              <p>
                En proyectos propios exploro interfaces web, backend, bases de
                datos e inteligencia artificial aplicada. Balance Laboral reúne
                muchas de esas piezas y parte de un problema que conocí de
                primera mano.
              </p>
              <div className="languages mono">
                <span>
                  EUSKERA <b>NATIVO</b>
                </span>
                <span>
                  CASTELLANO <b>NATIVO</b>
                </span>
                <span>
                  INGLÉS <b>FLUIDO</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="trayectoria"
          className="timeline-section"
          aria-labelledby="timeline-title"
        >
          <div className="container section-inner">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span>03 /</span> EXPERIENCIA Y FORMACIÓN
                </p>
                <h2 id="timeline-title">
                  El camino
                  <br />
                  hasta aquí.
                </h2>
              </div>
              <p className="section-intro">
                Formación continua y experiencia en distintos contextos que hoy
                conviven en mi trabajo.
              </p>
            </div>
            <div className="timeline">
              {timeline.map((item, index) => (
                <article
                  className="timeline-item"
                  key={`${item.title}-${item.date}`}
                >
                  <span className="timeline-index mono">0{index + 1}</span>
                  <span className="timeline-date mono">{item.date}</span>
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
                <p className="eyebrow">FORMACIÓN CONTINUA</p>
                <h3>Cursos y certificaciones.</h3>
                <p>Formación completada</p>
              </div>
              <ul className="certification-list">
                {certifications.map((cert) => (
                  <li key={cert.title}>
                    <Check size={14} />
                    <span>
                      <strong>{cert.title}</strong>
                      <span>{cert.issuer}</span>
                    </span>
                    <span className="mono">{cert.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="stack-section section-light"
          aria-labelledby="stack-title"
        >
          <div className="container section-inner">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span>04 /</span> HERRAMIENTAS
                </p>
                <h2 id="stack-title">
                  Mi caja de
                  <br />
                  herramientas.
                </h2>
              </div>
              <p className="section-intro">
                Tecnologías que forman parte de mi trabajo, mis proyectos y mi
                formación.
              </p>
            </div>
            <div className="stack-list">
              {stack.map((group, index) => (
                <article className="stack-row" key={group.title}>
                  <span className="mono stack-index">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <div>
                    <p>{group.description}</p>
                    <Tags items={group.primary} />
                    <span className="stack-secondary">{group.secondary}</span>
                  </div>
                </article>
              ))}
            </div>
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
                <MapPin size={14} /> DONOSTIA, GIPUZKOA · ESPAÑA
              </span>
            </div>
            <div className="contact-layout">
              <div>
                <h2 id="contact-title">
                  ¿Hablamos<span className="period">?</span>
                </h2>
                <p>
                  Si tienes un proyecto, una idea o simplemente quieres saludar,
                  puedes escribirme.
                </p>
                <a className="contact-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <ArrowUpRight size={20} />
                </a>
                <div className="copy-row">
                  <button onClick={copyEmail} className="copy-button">
                    {copyStatus === "Email copiado" ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}{" "}
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
                    LinkedIn
                    <ArrowUpRight size={16} />
                  </span>
                </External>
                <External href={profile.github}>
                  <span>
                    GitHub
                    <ArrowUpRight size={16} />
                  </span>
                </External>
                <a href={`tel:${profile.phone}`}>
                  <span>
                    +34 667 808 347
                    <ArrowUpRight size={16} />
                  </span>
                </a>
                <External href="https://wa.me/34667808347">
                  <span>
                    WhatsApp
                    <ArrowUpRight size={16} />
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
        <External href={profile.github} className="footer-github">
          GITHUB <ArrowRight size={13} />
        </External>
        <a href="#inicio" className="back-top">
          VOLVER ARRIBA <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}

export default App;
