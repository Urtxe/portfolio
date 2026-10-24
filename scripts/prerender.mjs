import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

// Genera HTML completo usando los mismos componentes que hidrata el navegador.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const html = await readFile("dist/index.html", "utf8");
  await writeFile(
    "dist/index.html",
    html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(createElement(App))}</div>`,
    ),
  );
  console.log("HTML prerenderizado: contenido completo sin JavaScript.");
} finally {
  await server.close();
}
