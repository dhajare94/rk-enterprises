import PhotoBand from "../components/PhotoBand";
import SeoBlock from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { useSeo, SITE, faqLd, crumbs } from "../lib/seo";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import ProjectGrid from "../components/ProjectGrid";
import ProjectSlider from "../components/ProjectSlider";
import { PROJECTS, SITE_PHOTOS } from "../data/projects";
import { Gallery } from "../components/Gallery";
export default function Projects() {
  const P = PAGES["projects-index"];
  useSeo({ title: P.seoTitle, description: P.metaDescription, path: "/projects", image: "/img-31637239.jpg", graph: [{ "@type": "CollectionPage", url: SITE + "/projects", name: P.seoTitle },
    { "@type": "ItemList", itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/projects/${p.slug}`, name: p.clientName })) }, crumbs([["Home", "/"], ["Projects", "/projects"]]), faqLd(P.faqs)] });
  return (<>
    <PageHero tone="o" img="/img-31637239.jpg" title={P.h1} alt="Plant at work on an RK Enterprises project" aside={<p className="phero__lead">{P.lead}</p>} />
    <ProjectSlider title="Platforms on facades" link={false} />
    <section className="sec"><div className="wrap">
      <h2 className="h-head rv">Every site we have supplied</h2>
      <ProjectGrid list={PROJECTS} />
      <p className="caption">Logos appear only where taken from the company’s official website; others are shown by name.</p>
    </div></section>
    <PhotoBand photos={[
      { src: "/projects/excavator.jpg", alt: "Excavator working on a supplied site" },
      { src: "/projects/concrete.jpg", alt: "Concrete pour on site" }]} />
    <section className="sec canvas"><div className="wrap"><h2 className="h-head rv">Plant on site</h2>
      <Gallery title="RK Enterprises site gallery" imgs={SITE_PHOTOS} /></div></section>
    <SeoBlock body={P.body} faqs={P.faqs} kicker="About these projects" />
    <CtaBand line="Next site on your list? WhatsApp us." />
  </>);
}
