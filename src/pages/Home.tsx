import PhotoBand from "../components/PhotoBand";
import SeoBlock from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { PHONE_E164, MAP_URL, POSTAL_ADDRESS, GEO_LD, WHATSAPP_URL, TEL_URL, PHONE_DISPLAY } from "../config";
import { useSeo, ORG, AREAS, SITE, faqLd } from "../lib/seo";
import HeroVideo from "../components/HeroVideo";
import ServicesRows from "../components/Services";
import ProjectSlider from "../components/ProjectSlider";
import SiteList from "../components/SiteList";
import HireSection from "../components/HireSection";
import Clients from "../components/Clients";
import CtaBand from "../components/CtaBand";
import { Link } from "react-router-dom";
import { WaGlyph } from "../components/WaIcon";
export default function Home() {
  const P = PAGES.home;
  useSeo({ title: P.seoTitle, description: P.metaDescription, path: "/", image: "/hero-poster.jpg", graph: [ORG,
    { "@type": "LocalBusiness", "@id": `${SITE}/#business`, name: "RK Enterprises", url: SITE, telephone: PHONE_E164, address: POSTAL_ADDRESS, geo: GEO_LD, hasMap: MAP_URL, image: SITE + "/hero-poster.jpg", areaServed: AREAS, parentOrganization: { "@id": `${SITE}/#org` }, description: P.metaDescription },
    { "@type": "WebSite", "@id": `${SITE}/#website`, name: "RK Enterprises", url: SITE, publisher: { "@id": `${SITE}/#org` } }, faqLd(P.faqs)] });
  return (<>
    <section className="hero field field--b">
      <div className="wrap hero__in">
        <h1 className="hero__h lines" aria-label={`RK Enterprises — ${P.h1}`}>
          <span className="line"><span data-line style={{ ["--i" as string]: 0 }}>RK</span></span>
          <span className="line"><span data-line className="hero__l2" style={{ ["--i" as string]: 1 }}>Enterprises</span></span>
        </h1>
        <div className="hero__foot fade">
          <p className="hero__sub">{P.h1}. Rope suspended platforms and site plant, on hire or to own, sold and rented direct from our office in Nilaje, Kalyan-Dombivli — inspected before dispatch.</p>
          <div className="hero__act">
            <a className="btn btn--xl" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><WaGlyph size={22} /> Get a rate on WhatsApp</a>
            <a className="hero__tel" href={TEL_URL}>{PHONE_DISPLAY}</a>
          </div>
        </div>
        <div className="hero__vid fade"><HeroVideo /></div>
      </div>
    </section>
    <section className="sec intro"><div className="wrap intro__in">
      <p className="intro__t rv">Amit and Rajesh Kumar started on construction sites at fourteen. Today, from their office in Nilaje, they sell and rent direct rope suspended platforms and site plant to contractors across Mumbai, Navi Mumbai and Thane. Every machine is checked before it reaches your site, and the line opens at 5 a.m.</p>
      <img className="intro__img rv" src="/img-29414416.jpg" alt="Plant working on a building site" loading="lazy" width={900} height={900} />
      <p className="intro__note rv">{P.lead} <Link to="/about">Our story →</Link></p>
    </div></section>
    <PhotoBand tone="c" title="Plant on Mumbai sites" photos={[
      { src: "/projects/plant.jpg", alt: "Construction plant working on a Mumbai site", cap: "Site plant" },
      { src: "/img-33511139.jpg", alt: "Rope suspended platform on a building facade" },
      { src: "/projects/excavator.jpg", alt: "Excavator on a construction site" },
      { src: "/projects/concrete.jpg", alt: "Concrete work on site" },
      { src: "/projects/engineers.jpg", alt: "Engineers reviewing work on site", cap: "Checked before it reaches your site" }]} />
    <ServicesRows />
    <ProjectSlider />
    <SiteList />
    <HireSection />
    <Clients />
    <SeoBlock body={P.body} faqs={P.faqs} kicker="RK at a glance" />
    <CtaBand />
  </>);
}
