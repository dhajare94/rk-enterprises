import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const mode = process.argv[2];
if (mode !== "files" && mode !== "html") {
  console.error("usage: node scripts/site-build.mjs <files|html>");
  process.exit(1);
}

const vite = await createServer({
  configFile: false,
  mode: "production",
  root: process.cwd(),
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  plugins: [react()],
});

const HOST = "https://therkenterprises.co.in";

try {
  const mod = await vite.ssrLoadModule("/src/entry-server.tsx");
  if (mode === "files") writePublic(mod);
  else prerender(mod);
} finally {
  await vite.close();
}

function writePublic(mod) {
  writeFileSync("public/robots.txt", mod.robotsTxt());
  writeFileSync("public/sitemap.xml", mod.sitemapXml());
  writeFileSync("public/llms.txt", mod.llmsTxt());
  writeFileSync("public/_redirects", mod.redirectsTxt());
  console.log("wrote public/robots.txt, sitemap.xml, llms.txt, _redirects");
}

function apply(template, html, headHtml) {
  if (!template.includes("<!--seo:start-->") || !template.includes("<!--seo:end-->")) {
    throw new Error("seo markers missing from built index.html");
  }
  const withHead = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->${headHtml}<!--seo:end-->`);
  const start = withHead.indexOf('<div id="root">');
  const endBody = withHead.lastIndexOf("</body>");
  const endRoot = withHead.lastIndexOf("</div>", endBody);
  if (start < 0 || endRoot < start) throw new Error("#root placeholder missing from built index.html");
  return withHead.slice(0, start) + `<div id="root">${html}</div>` + withHead.slice(endRoot + "</div>".length);
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textOf(html, tag) {
  const m = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
}

function assertPage(path, html, head) {
  if (!head.canonical?.startsWith(HOST)) throw new Error(`${path} canonical is ${head.canonical}`);
  if (!html.includes(`<link rel="canonical" href="${head.canonical}"/>`)) throw new Error(`${path} HTML missing canonical ${head.canonical}`);
  if (!html.includes(`property="og:url" content="${head.canonical}"`)) throw new Error(`${path} HTML missing og:url`);
  if (html.includes("workers.dev")) throw new Error(`${path} still mentions workers.dev`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) throw new Error(`${path} should have exactly one h1`);
  if (!html.includes("application/ld+json")) throw new Error(`${path} missing JSON-LD`);
  if (!html.includes(HOST)) throw new Error(`${path} missing production host`);
  const text = visibleText(html);
  if (text.length < 400) throw new Error(`${path} prerendered text is only ${text.length} characters`);
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = img[0].match(/\balt="([^"]*)"/);
    if (!alt || !alt[1].trim()) throw new Error(`${path} has an image without alt text: ${img[0].slice(0, 140)}`);
  }
  if (path === "/" || path === "/projects") {
    const h3s = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    const dup = h3s.filter((t, i) => h3s.indexOf(t) !== i);
    if (dup.length) throw new Error(`${path} has duplicate h3s: ${[...new Set(dup)].join(" | ")}`);
  }
  if (path.startsWith("/projects/") && textOf(html, "h1") && textOf(html, "h1") === textOf(html, "h2")) {
    throw new Error(`${path} repeats the h1 as the first h2`);
  }
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function prerender(mod) {
  const clientDir = existsSync(join("dist", "client", "index.html")) ? join("dist", "client") : "dist";
  const templatePath = join(clientDir, "index.html");
  if (!existsSync(templatePath)) throw new Error(`${templatePath} is missing. Run vite build first.`);
  const template = readFileSync(templatePath, "utf8");
  writeFileSync(join(clientDir, "robots.txt"), mod.robotsTxt());
  writeFileSync(join(clientDir, "sitemap.xml"), mod.sitemapXml());
  writeFileSync(join(clientDir, "llms.txt"), mod.llmsTxt());
  writeFileSync(join(clientDir, "_redirects"), mod.redirectsTxt());

  const routes = mod.siteRoutes();
  for (const route of routes) {
    const rendered = mod.render(route.path);
    const page = apply(template, rendered.html.replace(/<link rel="preload"[^>]*>/g, ""), rendered.headHtml);
    const out = route.path === "/" ? templatePath : join(clientDir, route.path.slice(1), "index.html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, page);
    assertPage(route.path, page, rendered.head);
  }

  const missing = mod.render("/this-page-does-not-exist");
  const notFound = apply(template, missing.html.replace(/<link rel="preload"[^>]*>/g, ""), missing.headHtml);
  if (missing.head.canonical) throw new Error("404 page should not publish a canonical");
  if (!notFound.includes("Page not found") || !notFound.includes('name="robots" content="noindex"')) {
    throw new Error("404.html is missing the not-found copy or noindex");
  }
  writeFileSync(join(clientDir, "404.html"), notFound);

  const home = readFileSync(templatePath, "utf8");
  for (const phrase of ["rope suspended platform", "gondola", "cradle"]) {
    if (!home.toLowerCase().includes(phrase)) throw new Error(`home HTML is missing “${phrase}”`);
  }
  for (const path of ["/services/rsp-rental/index.html", "/services/rsp-sale/index.html"]) {
    const html = readFileSync(join(clientDir, path), "utf8").toLowerCase();
    if (!html.includes("rope suspended platform") || !html.includes("gondola")) throw new Error(`${path} is missing the platform phrase`);
  }
  const contact = readFileSync(join(clientDir, "contact/index.html"), "utf8");
  if (!contact.includes(`${HOST}/about-platform.webp`)) throw new Error("contact page is missing og:image");
  const story = readFileSync(join(clientDir, "blog/a-lifetime-of-showing-up/index.html"), "utf8");
  if (!story.includes("dateModified")) throw new Error("story post is missing dateModified");

  const sitemap = readFileSync(join(clientDir, "sitemap.xml"), "utf8");
  const robots = readFileSync(join(clientDir, "robots.txt"), "utf8");
  if (!robots.includes(`Sitemap: ${HOST}/sitemap.xml`)) throw new Error("robots.txt Sitemap line is wrong");
  if (sitemap.includes("14-years-of-showing-up") || sitemap.includes("workers.dev")) throw new Error("sitemap lists a retired or workers.dev URL");
  const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);
  if (new Set(lastmods).size < 4) throw new Error(`expected distinct per-post lastmods, found ${[...new Set(lastmods)].join(", ")}`);
  if (!sitemap.includes("<loc>https://therkenterprises.co.in/</loc>")) throw new Error("sitemap home loc is wrong");
  if ((sitemap.match(/<loc>/g) ?? []).length !== routes.length) throw new Error("sitemap URL count does not match routes");

  const bad = walk(clientDir).filter(p => /\.(html|xml|txt)$/.test(p) && readFileSync(p, "utf8").includes("workers.dev"));
  if (bad.length) throw new Error(`workers.dev still present in ${bad.join(", ")}`);
  console.log(`prerendered ${routes.length} routes and 404.html`);
}
