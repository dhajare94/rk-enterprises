import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import ProjectGrid from "../components/ProjectGrid";
import CtaBand from "../components/CtaBand";
import { PROJECTS } from "../data/projects";
import { Gallery } from "../components/Gallery";
import { PROJECT_SEO, type SeoPage } from "../data/seo";
import { FaqList } from "../components/SeoBlock";
import Markdown from "../components/Markdown";
import { useSeo, SITE, faqLd, crumbs } from "../lib/seo";
import type { Project } from "../data/projects";

const UNSPEC = (p: Project) => /not specified/i.test(p.location) || p.slug === "vgms-buildcon";
const area = (p: Project) => p.location.split(",")[0].trim();
/** Fallback following /workspace/rk-seo-pages/projects/_template-notes.md */
function templateSeo(p: Project): SeoPage {
  if (UNSPEC(p)) return { path: `/projects/${p.slug}`, seoTitle: `${p.clientName} – Plant Rental Engagement | RK Enterprises`, metaDescription: `RK Enterprises has a construction plant rental engagement with ${p.clientName}. We hire dispatch-checked plant across Mumbai, Navi Mumbai and Maharashtra.`, h1: `${p.clientName} — plant rental engagement`, lead: `RK Enterprises supplied construction plant on rental (RSP Rental) to ${p.clientName}. The site location was not recorded, so we do not list one. Need plant for your site? Call or WhatsApp us with the dates and task.`, body: "", faqs: [
    { q: `What did RK Enterprises provide for ${p.clientName}?`, a: "Construction plant on rental (RSP Rental)." },
    { q: "Which areas does RK Enterprises cover?", a: "Mumbai, Navi Mumbai and sites across Maharashtra." },
    { q: "How do I hire similar equipment?", a: "Call or WhatsApp with your site, dates and task. Hire is available by the day, week or month." }] };
  const a = area(p); const t = p.title === a ? `${a} site` : p.title;
  return { path: `/projects/${p.slug}`, seoTitle: `${p.clientName} – ${t}, ${a} | Plant Rental by RK Enterprises`, metaDescription: `RK Enterprises supplied dispatch-checked construction plant on rental to ${p.clientName} for ${t} in ${p.location}. Hire plant in ${a} — call or WhatsApp.`, h1: `${p.clientName} — ${t}, ${p.location}`, lead: `RK Enterprises supplied construction plant on rental (RSP Rental) to ${p.clientName} for ${t} in ${p.location}. Machines were checked before dispatch. Running a site near ${a}? Call or WhatsApp us.`, body: "", faqs: [
    { q: `What did RK Enterprises provide for ${p.clientName}?`, a: `Construction plant on rental (RSP Rental) for ${t}, ${p.location}.` },
    { q: `Does RK Enterprises supply plant in ${a}?`, a: `Yes. We have worked in ${a} and serve sites across Mumbai, Navi Mumbai and Maharashtra.` },
    { q: "How do I hire similar equipment?", a: "Call or WhatsApp with your site, dates and task. Hire is available by the day, week or month." }] };
}
export default function ProjectDetail() {
  const { slug } = useParams();
  const p = PROJECTS.find(x => x.slug === slug);
  const S = p ? (PROJECT_SEO[p.slug] ?? templateSeo(p)) : undefined;
  useSeo(p && S ? { title: S.seoTitle, description: S.metaDescription, path: `/projects/${p.slug}`, image: p.img, graph: [
    { "@type": "WebPage", url: `${SITE}/projects/${p.slug}`, name: S.seoTitle, description: S.metaDescription },
    crumbs([["Home", "/"], ["Projects", "/projects"], [p.clientName, `/projects/${p.slug}`]]), faqLd(S.faqs)] } : null);
  if (!p) return <section className="sec nf"><div className="wrap"><h1 className="h-head">Project not found</h1><Link className="btn btn--k" to="/projects">All projects</Link></div></section>;
  const more = PROJECTS.filter(x => x.slug !== p.slug).slice(0, 3);
  const meta: [string, string][] = p.slug === "vgms-buildcon" ? [["Client", p.clientName], ["Registered office (client)", p.location.replace(/\s*\(registered address\)/i, "")], ["Site location", "Not specified"], ["Category", p.category]] : [["Project", p.title], ["Client", p.clientName], ["Location", p.location], ["Category", p.category]];
  if (p.status) meta.push(["Status", p.status]);
  const h1 = S!.h1.length > 60 ? `${p.clientName} — ${p.title}` : S!.h1;
  return (<>
    <PageHero tone="k" img={p.img} title={h1} alt={`${p.clientName} project site`} aside={<p className="phero__lead">{S!.lead}</p>} />
    <section className="sec field field--b metabar"><div className="wrap">
      <h2 className="h-head rv">{p.clientName}</h2>
      <dl className="metabar__in">{meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      {(p.website || p.logo) && <div className="metabar__site">{p.logo && <img src={p.logo} alt={`${p.clientName} logo`} className="detail__logo" />}
        {p.website && <a className="btn btn--w" href={p.website} target="_blank" rel="noopener noreferrer">Client website</a>}</div>}
    </div></section>
    {S!.body && <section className="sec"><div className="wrap article">
      <Markdown src={S!.body.split(/\n(?=## )/).filter(b => !/^## Project\b/.test(b.trim())).join("\n").replace(/^## Body copy\s*$/m, "")} />
    </div></section>}
    <FaqList faqs={S!.faqs} title="About this job" />
    <section className="sec"><div className="wrap"><h2 className="h-head rv">{p.title} on site</h2>
      <Gallery title={p.title} imgs={p.images} /></div></section>
    <section className="sec canvas"><div className="wrap"><div className="sechead"><h2 className="h-head rv">More sites</h2><Link to="/projects" className="btn btn--k">All sites</Link></div>
      <ProjectGrid list={more} /></div></section>
    <CtaBand line="Same job on your site? WhatsApp us." />
  </>);
}
