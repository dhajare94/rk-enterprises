import { useEffect } from "react";
import type { SeoFaq } from "../data/seo";
import { PHONE_E164 } from "../config";
export const SITE = "https://rk-enterprises.dhajare94.workers.dev";
export const AREAS = ["Mumbai", "Navi Mumbai", "Maharashtra"].map(name => ({ "@type": "Place", name }));
export const CONTACT = { telephone: PHONE_E164, contactPoint: { "@type": "ContactPoint", telephone: PHONE_E164, contactType: "customer service", areaServed: "IN" } };
export const ORG = { "@type": "Organization", "@id": `${SITE}/#org`, name: "RK Enterprises", url: SITE, areaServed: AREAS, ...CONTACT,
  founder: [{ "@type": "Person", name: "Amit Kumar" }, { "@type": "Person", name: "Rajesh Kumar" }] };
export const faqLd = (faqs: SeoFaq[]) => ({ "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
export const crumbs = (items: [string, string][]) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + path })) });

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const prev = el?.getAttribute("content") ?? null;
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
  return () => { if (prev === null) el!.remove(); else el!.setAttribute("content", prev); };
}
export function useSeo(o: { title: string; description: string; path: string; graph?: object[]; image?: string; type?: string; noSuffix?: boolean } | null) {
  const key = o ? JSON.stringify(o) : "";
  useEffect(() => {
    if (!o) return;
    const url = SITE + o.path;
    const prevTitle = document.title;
    document.title = o.noSuffix || o.title.includes("RK") ? o.title : `${o.title} | RK Enterprises`;
    const undo = [setMeta("name", "description", o.description), setMeta("property", "og:title", o.title), setMeta("property", "og:description", o.description),
      setMeta("property", "og:type", o.type ?? "website"), setMeta("property", "og:url", url), setMeta("name", "twitter:card", "summary_large_image")];
    if (o.image) undo.push(setMeta("property", "og:image", SITE + o.image));
    const canon = document.createElement("link"); canon.rel = "canonical"; canon.href = url; document.head.appendChild(canon);
    let ld: HTMLScriptElement | null = null;
    if (o.graph?.length) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": o.graph }); document.head.appendChild(ld); }
    return () => { document.title = prevTitle; undo.forEach(f => f()); canon.remove(); ld?.remove(); };
  }, [key]);
}
