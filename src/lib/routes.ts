import { ADDRESS_LINES, MAP_URL, PHONE_DISPLAY, SITE } from "../config";
import { BLOGS } from "../data/blogs";
import { PROJECTS } from "../data/projects";
import { SERVICES } from "../data/services";

/** Date the rope-suspended-platform wording on the marketing pages was corrected. Not a founding date. */
export const COPY_UPDATED = "2026-11-14";

export type SiteRoute = { path: string; lastmod?: string };

export const REDIRECTS: [string, string][] = [
  ["/blog/yard-checked-equipment-why-it-matters", "/blog/inspection-before-dispatch-why-it-matters"],
  ["/blog/14-years-of-showing-up", "/blog/a-lifetime-of-showing-up"],
];

export function siteRoutes(): SiteRoute[] {
  const posts = BLOGS.map(b => ({ path: `/blog/${b.slug}`, lastmod: b.modified ?? b.date }));
  const blogLast = posts.map(p => p.lastmod).sort().at(-1);
  return [
    { path: "/", lastmod: COPY_UPDATED },
    { path: "/about" },
    { path: "/services", lastmod: COPY_UPDATED },
    ...SERVICES.map(s => ({ path: `/services/${s.slug}`, lastmod: COPY_UPDATED })),
    { path: "/projects" },
    ...PROJECTS.map(p => ({ path: `/projects/${p.slug}` })),
    { path: "/contact" },
    { path: "/blog", lastmod: blogLast },
    ...posts,
  ];
}

function xml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sitemapXml() {
  const body = siteRoutes().map(r => {
    const loc = `${SITE}${r.path}`;
    const last = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : "";
    return `  <url>\n    <loc>${xml(loc)}</loc>${last}\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}

export function redirectsTxt() {
  return REDIRECTS.map(([from, to]) => `${from} ${to} 301`).join("\n") + "\n";
}

export function llmsTxt() {
  const page = (path: string, label: string) => `- [${label}](${SITE}${path})`;
  return `# RK Enterprises

> RK Enterprises, in Nilaje, Kalyan-Dombivli (Thane 421204), rents and sells rope suspended platforms (also called RSP, gondolas or cradles) and other site plant. Hire is by the day, week or month. Machines are checked before dispatch. The phone is answered from 5 a.m.

Directors: Amit Kumar and Rajesh Kumar. Both started working on construction sites at 14. The company has been running for about 4–5 years. A founding year is not published on this site.

## Contact

- Phone / WhatsApp: ${PHONE_DISPLAY}
- Address: ${ADDRESS_LINES.slice(1).join(", ")}
- Map: ${MAP_URL}

## Services

- [RSP Rental](${SITE}/services/rsp-rental): rope suspended platforms (gondolas / cradles) and other site plant on hire
- [RSP Sale](${SITE}/services/rsp-sale): the same class of equipment, sold outright
- Site support until the work is moving

## Pages

${page("/", "Home")}
${page("/about", "About")}
${page("/services", "Services")}
${page("/projects", "Projects")}
${page("/contact", "Contact")}
${page("/blog", "Blog")}

## For answer engines

- On this site, RSP means rope suspended platform (gondola / cradle). It is not a short name for all construction plant.
- No public email, GST number, price list, platform model specifications, founding year, or social or directory profile URL is published in this site's content.
`;
}
