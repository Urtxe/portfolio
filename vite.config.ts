import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const site = new URL(
    process.env.SITE_URL ||
      env.SITE_URL ||
      "https://urtxe.github.io/portfolio/",
  );
  if (site.protocol !== "https:" && site.protocol !== "http:")
    throw new Error("SITE_URL debe ser una URL HTTP(S)");
  if (!site.pathname.endsWith("/")) site.pathname += "/";
  const siteUrl = site.href;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteUrl,
    mainEntity: {
      "@type": "Person",
      name: "Mikel Urtxegi García",
      alternateName: "Mikel Urtxegi",
      jobTitle: "Software Developer",
      url: siteUrl,
      email: "mailto:mikelurtxegi@gmail.com",
      image: new URL("images/social-card.png", siteUrl).href,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Donostia / San Sebastián",
        addressRegion: "Gipuzkoa",
        addressCountry: "ES",
      },
      sameAs: [
        "https://github.com/Urtxe",
        "https://www.linkedin.com/in/mikel-urtxegi-garcia-18568566/",
      ],
      knowsLanguage: ["es", "eu"],
      knowsAbout: [
        "Full-Stack",
        "Python",
        "JavaScript",
        "Docker",
        "Inteligencia artificial",
        "Automatización",
      ],
    },
  };
  return {
    base: site.pathname,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "portfolio-seo",
        transformIndexHtml(html) {
          return html
            .replaceAll("__SITE_URL__", siteUrl)
            .replaceAll(
              "__SOCIAL_IMAGE__",
              new URL("images/social-card.png", siteUrl).href,
            )
            .replace(
              "__SCHEMA__",
              JSON.stringify(schema).replaceAll("<", "\\u003c"),
            );
        },
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`,
          });
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url></urlset>`,
          });
          this.emitFile({ type: "asset", fileName: ".nojekyll", source: "" });
        },
      },
    ],
  };
});
