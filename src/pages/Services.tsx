import PhotoBand from "../components/PhotoBand";
import SeoBlock from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { useSeo, ORG, AREAS, SITE, faqLd, crumbs } from "../lib/seo";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Points from "../components/Points";
import HireSection from "../components/HireSection";
import ServicesRows from "../components/Services";
export default function Services() {
  const P = PAGES.services;
  useSeo({ title: P.seoTitle, description: P.metaDescription, path: "/services", image: "/img-31637239.jpg", graph: [{ "@type": "CollectionPage", url: SITE + "/services", name: P.seoTitle },
    { "@type": "ItemList", itemListElement: [["RSP Rental", "rsp-rental", "Construction equipment rental"], ["RSP Sale", "rsp-sale", "Construction equipment sale"]].map(([name, slug, serviceType], i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name, serviceType, url: `${SITE}/services/${slug}`, provider: { "@id": `${SITE}/#org` }, areaServed: AREAS } })) },
    ORG, crumbs([["Home", "/"], ["Services", "/services"]]), faqLd(P.faqs)] });
  return (<>
    <PageHero img="/img-31637239.jpg" title={P.h1} alt="Construction plant on an RK Enterprises site" aside={<p className="phero__lead">{P.lead}</p>} />
    <section className="sec"><div className="wrap two">
      <h2 className="h-head rv">On hire or to own</h2>
      <div className="rv" style={{ ["--d" as string]: "120ms" }}><p className="lead">Whether the job needs extra plant for a few weeks or your firm is ready to own its equipment, RK Enterprises supplies the same trusted class of machinery, backed by founders who have worked on construction sites since they were fourteen.</p>
        <p className="body">Every machine is checked before dispatch. Every client gets a person to call, not a ticket number. And because we both hire and sell, our advice on which route to take is straight.</p></div>
    </div></section>
    <PhotoBand tone="c" photos={[
      { src: "/rental.jpg", alt: "Construction plant available on rental", cap: "RSP Rental" },
      { src: "/sale.jpg", alt: "Construction equipment for direct sale", cap: "RSP Sale" },
      { src: "/img-33374624.jpg", alt: "Plant working on a building site" }]} />
    <ServicesRows title="Three ways to get plant on site" />
    <Points title="Every load-out includes" img="/img-2137670.jpg" alt="Plant at work on site" tone="c" items={[
      { h: "Inspected before dispatch", p: "Inspected before it leaves, so it works when it arrives." },
      { h: "A real person", p: "Call or WhatsApp us. Amit, Rajesh and the team answer." },
      { h: "Straight advice", p: "Hire, buy, or own the core and rent the peak. We tell you which." },
      { h: "On-call support", p: "Night pours, dawn lifts, breakdown swaps. We stay till it moves." },
    ]} />
    <SeoBlock body={P.body} faqs={P.faqs} kicker="How it works" />
    <HireSection />
    <CtaBand />
  </>);
}
