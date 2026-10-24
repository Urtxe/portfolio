# Mikel Urtxegi · Portfolio

Portfolio personal en español de Mikel Urtxegi García, Software Developer en Donostia. React, TypeScript, Vite, CSS propio e iconos Lucide. Sitio estático sin backend, analítica, cookies de seguimiento ni servicios de pago.

## Desarrollo

Requiere Node.js 26.12.1 y npm 12.2.1. La versión de Node está fijada en `.nvmrc`; ambas versiones corresponden a versiones estables verificadas al actualizar este proyecto. Node se utiliza solo para construir: la web publicada es estática.

```sh
npm ci
npm run dev
```

La URL predeterminada es `http://localhost:5173/portfolio/`. Vite muestra la dirección exacta al iniciar. No se necesitan credenciales ni claves de otros proyectos.

## Comprobaciones y producción

```sh
npm run audit
npm run lint
npm run typecheck
npm run build
npm test
npm run preview
```

`build` compila TypeScript, genera los assets y prerenderiza la página con React en HTML. El contenido es accesible e indexable sin ejecutar JavaScript; React hidrata las interacciones en el navegador. `test` comprueba el HTML generado, los destinos de navegación, los proyectos, los recursos y la coherencia del SEO. Ejecutarlo después de `build`.

El resultado publicable está en `dist/`. `preview` sirve ese resultado localmente; no es un servidor de producción.

## Personalizar

- `src/data.ts`: perfil, enlaces, proyectos secundarios, tecnologías, experiencia, formación y certificaciones. Se conserva una estructura de contenido en español preparada para futuras traducciones, sin selector de idiomas incompleto.
- `src/App.tsx`: componentes de la página, presentación, contenido editorial y proyecto principal.
- `src/styles.css`: paleta, composición, responsive y preferencias de movimiento. Los colores están centralizados en variables CSS para los temas claro y oscuro.
- `src/BrandIcons.tsx`: marcas de GitHub y LinkedIn; Lucide aporta los iconos de interfaz.
- `index.html` y `vite.config.ts`: metadata y Schema.org. Actualizar los textos de SEO si cambia el posicionamiento del portfolio.
- `public/favicon.svg`: identificador visual personalizado.

Para añadir un proyecto secundario, incorpora una entrada a `projects` en `src/data.ts`. El tipo `Project` documenta los campos. `link` es opcional: los proyectos privados se presentan sin enlaces ficticios. `visual` permite reutilizar una de las composiciones conceptuales; para una nueva dirección visual, amplía `ProjectArt` en `src/App.tsx`.

### Imágenes

`public/images/balance-laboral.webp` es una captura real de la vista pública del calendario en `https://balancelaboral.es`, tomada el 24 de octubre de 2026 sin iniciar sesión ni añadir datos personales. Se rechazó la analítica opcional. Si se sustituye, actualizar dimensiones y descripción `alt` en `App.tsx`. El resto de proyectos usa gráficos SVG/CSS identificados como composiciones conceptuales, sin presentarlos como pantallas reales.

`public/images/social-card.png` es la imagen social original de 1200 × 630 px. Puede sustituirse manteniendo su tamaño y ruta, o actualizando la metadata en `vite.config.ts`. Tipografías Manrope, DM Sans e IBM Plex Mono autoalojadas a través de Fontsource; no se solicitan a Google Fonts.

### Fidelidad del contenido

Los datos profesionales y las certificaciones proceden de la información facilitada por Mikel. No se atribuyen años de experiencia profesional en desarrollo, usuarios ni resultados comerciales. Los idiomas reflejan los niveles declarados por Mikel: euskera y castellano nativos, e inglés fluido; no se atribuyen certificaciones de idiomas. No se incluyen enlaces de credenciales que no se han facilitado o verificado. El listado presenta Balance Laboral como proyecto principal, Labezio en desarrollo local, Meritum en desarrollo con versión de prueba, y Oreinbike y Carpintería Alex Val pendientes del dominio de sus clientes. La demo de Meritum responde desde el equipo de desarrollo; su acceso externo depende de su configuración de red. La información de Oreinbike se contrastó con su proyecto local sin modificarlo. Se verificaron las páginas públicas de Balance Laboral, Google Play, Calendario-Laboral y Carpintería Val. LinkedIn restringe la consulta automatizada; se conserva el enlace oficial facilitado.

## Dominio y rutas

El único ajuste de despliegue es `SITE_URL`, la URL pública completa (con el subdirectorio si lo hay). Determina automáticamente las rutas de assets, la URL canónica, Open Graph, Schema.org, `robots.txt` y `sitemap.xml`.

Por defecto: `https://urtxe.github.io/portfolio/`.

Para otro alojamiento, copia `.env.example` a `.env` y cambia:

```dotenv
SITE_URL=https://tu-dominio.example/
```

Después ejecuta `npm run build`. No se configura un dominio que todavía no existe. En GitHub Actions configura una variable de repositorio `SITE_URL` con el valor definitivo y activa un nuevo despliegue. Si se utiliza un dominio personalizado en Pages, configura también el dominio en Settings → Pages y los registros DNS indicados por GitHub. Un `robots.txt` alojado en un subdirectorio no sustituye al del dominio raíz; al usar un dominio propio se publica correctamente en la raíz.

## GitHub Pages

Repositorio: `https://github.com/Urtxe/portfolio`.

El workflow `.github/workflows/deploy.yml` ejecuta instalación reproducible, auditoría de dependencias, lint, compilación, prerenderizado y prueba del resultado. Solo despliega `main`; las pull requests se validan sin publicar. En Settings → Pages, el origen debe ser **GitHub Actions**. Cada push a `main` publica automáticamente el sitio en `https://urtxe.github.io/portfolio/`.

## Otros alojamientos estáticos

- **Cloudflare Pages:** conecta este repositorio, comando `npm run build`, directorio `dist`, Node.js 26.12.1 y variable `SITE_URL` con la URL asignada o tu dominio. Sin funciones ni backend.
- **Firebase Hosting:** usa un proyecto Firebase independiente; configura `dist` como directorio público. Este sitio de una página no necesita reescrituras de SPA. Añade `SITE_URL` antes de construir y despliega únicamente Hosting en el proyecto elegido explícitamente.
- **Cualquier servidor estático:** publica el contenido de `dist` en la ruta correspondiente a `SITE_URL`. No requiere Node.js en producción.

## Accesibilidad e interacciones

HTML semántico, salto al contenido, navegación por teclado, foco visible, menú móvil con cierre mediante Escape, navegación activa, contraste en ambos temas y respeto a `prefers-reduced-motion`. El tema sigue al sistema si no hay elección guardada; el selector conserva la preferencia local. Copiar email ofrece confirmación accesible y un estado de error real, con enlace de correo siempre disponible. Sin formulario ni envíos simulados.

Las capturas y los informes de revisión local se guardan en `output/playwright/`, excluido de Git.

## Actualizaciones y dependencias

Las dependencias directas se contrastan con el canal estable `latest` del registro npm. `package-lock.json` fija el árbol completo instalado. Se actualizan las transitivas dentro de los rangos compatibles, sin forzar versiones incompatibles con overrides.

```sh
npm outdated
npm run audit
```

La auditoría incluye dependencias de desarrollo y bloquea el despliegue ante vulnerabilidades conocidas de cualquier severidad. Un resultado de cero vulnerabilidades significa cero avisos detectados por npm en ese momento; no es una garantía absoluta frente a vulnerabilidades futuras o no publicadas. Las acciones de GitHub están actualizadas y fijadas por SHA al commit de su versión oficial, y el checkout no conserva credenciales.
