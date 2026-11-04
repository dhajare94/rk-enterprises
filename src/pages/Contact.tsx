import PhotoBand from "../components/PhotoBand";
import SeoBlock from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { PHONE_E164, ADDRESS_LINES, MAP_URL, POSTAL_ADDRESS, GEO_LD, TEL_URL, PHONE_DISPLAY } from "../config";
import { useSeo, AREAS, SITE, faqLd, crumbs } from "../lib/seo";
import { Link } from "react-router-dom";
import HireBoard from "../components/HireBoard";
import ProjectGrid from "../components/ProjectGrid";
import { PROJECTS } from "../data/projects";
export default function Contact() {
  const P = PAGES.contact;
  useSeo({ title: P.seoTitle, description: P.metaDescription, path: "/contact", graph: [{ "@type": "ContactPage", url: SITE + "/contact", name: P.seoTitle, about: { "@id": `${SITE}/#org` } },
    { "@type": "LocalBusiness", "@id": `${SITE}/#business`, name: "RK Enterprises", url: SITE, telephone: PHONE_E164, address: POSTAL_ADDRESS, geo: GEO_LD, hasMap: MAP_URL, areaServed: AREAS }, crumbs([["Home", "/"], ["Contact", "/contact"]]), faqLd(P.faqs)] });
  return (<>
    <section className="contact field field--b">
      <div className="wrap contact__in">
        <div className="contact__l">
          <h1 className="h-display">{P.h1}</h1>
          <p className="phero__lead">{P.lead}</p>
          <a className="contact__phone" href={TEL_URL}>{PHONE_DISPLAY}</a>
          <address className="contact__addr">{ADDRESS_LINES.map((l, i) => <span key={i}>{l}</span>)}</address>
          <a className="btn btn--w" href={MAP_URL} target="_blank" rel="noopener noreferrer">Open our office in Google Maps</a>
          <img className="contact__img" src="/about-platform.webp" alt="Rope suspended platform from RK Enterprises" width={1468} height={1071} />
        </div>
        <div className="contact__r">
          
          <div className="contact__card"><h2 className="h-head">Book plant in four picks</h2>
            <p className="body">WhatsApp opens with your message written. Nothing is stored on this site.</p>
            <HireBoard /></div>
          <p className="contact__more">Prefer to read first? <Link to="/services/rsp-rental">RSP Rental</Link>, <Link to="/services/rsp-sale">RSP Sale</Link> or <Link to="/projects">our projects</Link>.</p>
        </div>
      </div>
    </section>
    <PhotoBand tone="c" title="What arrives on your site" photos={[
      { src: "/rental.jpg", alt: "Plant ready for direct hire", cap: "Direct hire" },
      { src: "/sale.jpg", alt: "Equipment ready for direct sale", cap: "Direct sale" },
      { src: "/img-2137670.jpg", alt: "Plant working on site" }]} />
    <section className="sec"><div className="wrap"><h2 className="h-head rv">Recent sites</h2><ProjectGrid list={PROJECTS.slice(0, 3)} /></div></section>
    <SeoBlock body={P.body} faqs={P.faqs} kicker="Before you message" />
  </>);
}
