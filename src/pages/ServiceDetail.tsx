import SeoBlock, { FaqList } from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { useSeo, ORG, AREAS, SITE, faqLd, crumbs } from "../lib/seo";
import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Points from "../components/Points";
import ProjectGrid from "../components/ProjectGrid";
import { PROJECTS } from "../data/projects";
import HireSection from "../components/HireSection";
import { WaGlyph } from "../components/WaIcon";
import { SERVICES, EXTRA } from "../data/services";
import { waLink } from "../config";
export default function ServiceDetail() {
  const { slug } = useParams();
  const s = SERVICES.find(x => x.slug === slug);
  const P = s ? PAGES[s.slug] : undefined;
  useSeo(s && P ? { title: P.seoTitle, description: P.metaDescription, path: `/services/${s.slug}`, image: s.img, graph: [
    { "@type": "Service", name: s.name, serviceType: s.slug === "rsp-rental" ? "Construction equipment rental" : "Construction equipment sale", url: `${SITE}/services/${s.slug}`, description: P.lead, provider: { "@id": `${SITE}/#org` }, areaServed: AREAS },
    { "@type": "HowTo", name: P.h1, step: (EXTRA[s.slug]?.steps ?? []).map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.h, text: st.p })) },
    ORG, crumbs([["Home", "/"], ["Services", "/services"], [s.name, `/services/${s.slug}`]]), faqLd(EXTRA[s.slug]?.faqs ?? P.faqs)] } : null);
  if (!s) return <section className="sec nf"><div className="wrap"><h1 className="h-head">Service not found</h1><Link className="btn btn--k" to="/services">All services</Link></div></section>;
  const x = EXTRA[s.slug];
  const other = SERVICES.find(o => o.slug !== s.slug)!;
  const wa = waLink(`Hello RK Enterprises, I want to know about ${s.name}`);
  const rental = s.slug === "rsp-rental";
  return (<>
    <PageHero tone={slug === "rsp-rental" ? "b" : "o"} img={s.img} title={P?.h1 ?? s.name} alt={`${s.name} equipment on site`} aside={<><p className="phero__lead">{P?.lead ?? s.short}</p><a className="btn btn--xl" href={wa} target="_blank" rel="noopener noreferrer"><WaGlyph size={20} /> Ask about {s.name}</a></>} />
    <section className={`sec field field--${rental ? "b" : "o"}`}><div className="wrap two">
      <h2 className="h-head rv">{rental ? "Hire for the stretch the work needs" : "Own the plant you keep hiring"}</h2>
      <div className="rv" style={{ ["--d" as string]: "120ms" }}><p className="lead">{s.lead}</p><p className="body">{s.short}</p></div>
    </div></section>
    <Points title="What comes with it" items={s.gets} img={s.img2} alt={`${s.name} on site`} />
    <section className="sec"><div className="wrap"><h2 className="h-head rv">Sites where it has worked</h2><ProjectGrid list={PROJECTS.slice(rental ? 0 : 3, rental ? 3 : 6)} /></div></section>
    <section className="sec field field--k"><div className="wrap">
      <h2 className="h-head rv">How {s.name} works</h2>
      <ol className="steps">{x.steps.map((st, i) => <li key={st.h} className="rv" style={{ ["--d" as string]: `${i * 90}ms` }}><h3>{st.h}</h3><p>{st.p}</p></li>)}</ol>
    </div></section>
    <section className="sec canvas"><div className="wrap two">
      <div className="rv"><h2 className="h-head">Every job includes</h2><ul className="bul">{x.incl.map(w => <li key={w}>{w}</li>)}</ul></div>
      <div className="rv" style={{ ["--d" as string]: "120ms" }}><h2 className="h-head">It makes sense when</h2><ul className="bul">{s.when.map(w => <li key={w}>{w}</li>)}</ul></div>
    </div></section>
    <FaqList faqs={x.faqs} title="Questions contractors ask" />
    <section className={`sec field field--${rental ? "o" : "b"} next`}><div className="wrap next__in">
      <h2 className="h-head rv">Also from RK: {other.name}</h2><p className="lead rv">{other.short}</p>
      <Link to={`/services/${other.slug}`} className="btn btn--w rv">See {other.name}</Link>
    </div></section>
    {P && <SeoBlock body={P.body.split(/\n(?=## )/).filter(b => /^## (When|Related)/.test(b.trim())).join("\n")} faqs={[]} kicker="Good to know" img={s.img2} />}
    <HireSection title={rental ? "Book a platform" : "Buy a platform"} preset={rental ? "RSP platform" : "Buy"} />
    <CtaBand word={rental ? "Hire" : "Buy"} />
  </>);
}
