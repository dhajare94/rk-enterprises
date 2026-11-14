import { useEffect } from "react";
import type { SeoFaq } from "../data/seo";
import { GEO_LD, MAP_URL, PHONE_E164, POSTAL_ADDRESS, SITE } from "../config";

export { SITE };

export const AREAS = ["Mumbai", "Navi Mumbai", "Maharashtra"].map(name => ({ "@type": "Place", name }));
export const CONTACT = { telephone: PHONE_E164, contactPoint: { "@type": "ContactPoint", telephone: PHONE_E164, contactType: "customer service", areaServed: "IN" } };
export const ORG = { "@type": "Organization", "@id": `${SITE}/#org`, name: "RK Enterprises", url: SITE, areaServed: AREAS, ...CONTACT,
  founder: [{ "@type": "Person", name: "Amit Kumar" }, { "@type": "Person", name: "Rajesh Kumar" }] };

/**
 * LocalBusiness fields supported by facts already in this repo.
 * TODO(business): logo — public/cm-logo.png is the Construction Minutes mark, not an RK Enterprises logo. No company logo file exists.
 * TODO(business): openingHours — copy only says the phone is answered from 5 a.m. There is no closing time, so an OpeningHoursSpecification would invent one.
 * TODO(business): email — no email address is published in this repo.
 * TODO(business): sameAs — no Google Business Profile, IndiaMART, Justdial or social profile URL is in this repo. The Maps link is a lat/long pin, not a profile.
 * TODO(business): foundingDate — copy says the company has run for about 4–5 years and does not give a year.
 */
export const LOCAL_BUSINESS = {
  "@type": "LocalBusiness",
  "@id": `${SITE}/#business`,
  name: "RK Enterprises",
  url: SITE,
  telephone: PHONE_E164,
  address: POSTAL_ADDRESS,
  geo: GEO_LD,
  hasMap: MAP_URL,
  areaServed: AREAS,
  parentOrganization: { "@id": `${SITE}/#org` },
};

export const faqLd = (faqs: SeoFaq[]) => ({ "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
export const crumbs = (items: [string, string][]) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + path })) });

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  graph?: object[];
  image?: string;
  type?: string;
  noSuffix?: boolean;
  noindex?: boolean;
};

export type SeoHead = {
  title: string;
  ogTitle: string;
  description: string;
  canonical?: string;
  image?: string;
  ogType: string;
  robots?: string;
  ld?: string;
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildHead(o: SeoInput): SeoHead {
  const title = o.noSuffix || o.title.includes("RK") ? o.title : `${o.title} | RK Enterprises`;
  return {
    title,
    ogTitle: o.title,
    description: o.description,
    canonical: o.noindex ? undefined : SITE + o.path,
    image: o.image ? (o.image.startsWith("http") ? o.image : SITE + o.image) : undefined,
    ogType: o.type ?? "website",
    robots: o.noindex ? "noindex" : undefined,
    ld: o.graph?.length ? JSON.stringify({ "@context": "https://schema.org", "@graph": o.graph }).replace(/</g, "\\u003c") : undefined,
  };
}

export function headTags(h: SeoHead): string {
  const meta = (attr: "name" | "property", key: string, content: string) => `<meta ${attr}="${key}" content="${esc(content)}"/>`;
  const lines = [
    `<title>${esc(h.title)}</title>`,
    meta("name", "description", h.description),
    meta("property", "og:title", h.ogTitle),
    meta("property", "og:description", h.description),
    meta("property", "og:type", h.ogType),
    meta("name", "twitter:card", "summary_large_image"),
  ];
  if (h.robots) lines.push(meta("name", "robots", h.robots));
  if (h.canonical) {
    lines.push(`<link rel="canonical" href="${esc(h.canonical)}"/>`);
    lines.push(meta("property", "og:url", h.canonical));
  }
  if (h.image) lines.push(meta("property", "og:image", h.image));
  if (h.ld) lines.push(`<script type="application/ld+json" data-seo-ld>${h.ld}</script>`);
  return lines.join("");
}

let serverHead: SeoHead | null = null;
export function resetServerHead() { serverHead = null; }
export function takeServerHead() { const head = serverHead; serverHead = null; return head; }

function setMeta(attr: "name" | "property", key: string, content: string | undefined) {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content == null) {
    if (!existing) return () => {};
    const prev = existing.getAttribute("content");
    existing.remove();
    return () => {
      const node = document.createElement("meta");
      node.setAttribute(attr, key);
      if (prev != null) node.setAttribute("content", prev);
      document.head.appendChild(node);
    };
  }
  const prev = existing?.getAttribute("content") ?? null;
  const node = existing ?? document.createElement("meta");
  if (!existing) { node.setAttribute(attr, key); document.head.appendChild(node); }
  node.setAttribute("content", content);
  return () => { if (prev === null) node.remove(); else node.setAttribute("content", prev); };
}

function setCanonical(href: string | undefined) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href == null) {
    if (!existing) return () => {};
    const prev = existing.getAttribute("href");
    existing.remove();
    return () => {
      const node = document.createElement("link");
      node.rel = "canonical";
      if (prev) node.href = prev;
      document.head.appendChild(node);
    };
  }
  const prev = existing?.getAttribute("href") ?? null;
  const node = existing ?? document.createElement("link");
  if (!existing) { node.rel = "canonical"; document.head.appendChild(node); }
  node.href = href;
  return () => { if (prev === null) node.remove(); else node.setAttribute("href", prev); };
}

function setLd(json: string | undefined) {
  const existing = document.head.querySelector<HTMLScriptElement>("script[data-seo-ld]");
  if (json == null) {
    if (!existing) return () => {};
    const prev = existing.textContent;
    existing.remove();
    return () => {
      const node = document.createElement("script");
      node.type = "application/ld+json";
      node.dataset.seoLd = "";
      node.textContent = prev;
      document.head.appendChild(node);
    };
  }
  const prev = existing?.textContent ?? null;
  const node = existing ?? document.createElement("script");
  if (!existing) { node.type = "application/ld+json"; node.dataset.seoLd = ""; document.head.appendChild(node); }
  node.textContent = json;
  return () => { if (prev === null) node.remove(); else node.textContent = prev; };
}

function applyHead(h: SeoHead) {
  const prevTitle = document.title;
  document.title = h.title;
  const undo = [
    setMeta("name", "description", h.description),
    setMeta("property", "og:title", h.ogTitle),
    setMeta("property", "og:description", h.description),
    setMeta("property", "og:type", h.ogType),
    setMeta("name", "twitter:card", "summary_large_image"),
    setMeta("name", "robots", h.robots),
    setMeta("property", "og:url", h.canonical),
    setCanonical(h.canonical),
    setMeta("property", "og:image", h.image),
    setLd(h.ld),
  ];
  return () => { document.title = prevTitle; undo.forEach(fn => fn()); };
}

export function useSeo(o: SeoInput | null) {
  const head = o ? buildHead(o) : null;
  if (typeof document === "undefined") serverHead = head;
  const key = head ? JSON.stringify(head) : "";
  useEffect(() => {
    if (!head) return;
    return applyHead(head);
  }, [key]);
}
