import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

test("el build publica HTML completo, enlaces internos válidos y SEO coherente", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<html lang="es"/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const title of [
    "Balance Laboral",
    "Labezio",
    "Meritum",
    "Oreinbike",
    "Junior Software Developer",
    "Carpintería Alex Val",
    "Kotxea",
    "PKF Attest",
  ])
    assert.ok(html.includes(title), title);
  const featuredOrder = [
    html.indexOf('id="balance-title"'),
    html.indexOf('id="carpinteria-title"'),
    html.indexOf('id="kotxea-title"'),
  ];
  assert.ok(featuredOrder.every((position, index) =>
    position >= 0 && (index === 0 || position > featuredOrder[index - 1]),
  ));
  for (const removed of [
    "Trading Bot",
    "AI Content Agent",
    "Hecho con criterio y curiosidad",
    "Conocimientos complementarios",
  ])
    assert.ok(!html.includes(removed), removed);
  assert.ok(html.includes('href="https://pi4-urtxe.tailb33363.ts.net"'));
  assert.ok(html.includes('href="https://kotxea-urtxe.web.app"'));
  assert.ok(html.includes("DEMO · DATOS FICTICIOS"));
  assert.ok(html.includes("Todos los derechos reservados"));
  assert.ok(html.includes('aria-controls="profile-preview"'));
  assert.ok(html.includes("Ejecutar perfil"));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(html.includes(`id="${id}"`), `Destino #${id}`);
  assert.ok(!html.includes("__SITE_URL__") && !html.includes("__SCHEMA__"));
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.ok((await readFile("dist/sitemap.xml", "utf8")).includes(canonical));
  assert.ok(
    (await readFile("dist/robots.txt", "utf8")).includes(
      `${canonical}sitemap.xml`,
    ),
  );
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(schema.mainEntity.name, "Mikel Urtxegi García");
  for (const file of [
    "images/balance-laboral.webp",
    "images/carpinteria-alex-val.webp",
    "images/kotxea-app.webp",
    "images/social-card.png",
    "favicon.svg",
  ])
    await access(`dist/${file}`);
});
