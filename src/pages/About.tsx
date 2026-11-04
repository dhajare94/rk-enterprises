import PhotoBand from "../components/PhotoBand";
import SeoBlock from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { useSeo, ORG, SITE, faqLd, crumbs } from "../lib/seo";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Points from "../components/Points";
const STORY = "Amit Kumar and Rajesh Kumar were fourteen when they first walked into a contractor’s lobby looking for work. There was no plan and no safety net — just early starts, heavy lifting, and learning every job on site by watching the people who did it well. Over the years that followed they did almost everything a site asks of you: loading, operating, coordinating crews, keeping machines running when the schedule had no room for a breakdown. By around forty, the contractors who had once hired them as boys were treating them as partners. About four to five years ago they took the step they had been working toward their whole lives and started RK Enterprises. Today RK runs RSP Rental and RSP Sale, serves contractors and developers across Maharashtra, and is trusted on sites they once only hoped to stand on. The company is young. The experience behind it is not.";
const VALUES = [
  { h: "Showing up", p: "If the pour is at 2 a.m., the machine is ready at 1. Turning up is the whole job." },
  { h: "Team work", p: "Our people work with your crew, not around it, until the work is moving." },
  { h: "Integrity", p: "We tell you straight whether to hire or buy, even when the honest answer costs us a sale." },
  { h: "Commitment", p: "The phone at RK keeps ringing after the hire ends and after the sale closes. We pick it up." },
];
const STEPS = [
  { h: "Listen", p: "You tell us the site, the task and the dates. We ask the questions that prevent surprises." },
  { h: "Match", p: "We match the right class of plant and the right term: hire, sale, or a mix." },
  { h: "Check & deliver", p: "Every machine is checked before it is dispatched, then delivered on the agreed slot." },
  { h: "Stay", p: "We support on site until the job is moving, and answer when you call afterwards." },
];
export default function About() {
  const P = PAGES.about;
  useSeo({ title: P.seoTitle, description: P.metaDescription, path: "/about", image: "/img-31637239.jpg", graph: [{ "@type": "AboutPage", url: SITE + "/about", name: P.seoTitle, about: { "@id": `${SITE}/#org` } }, ORG, crumbs([["Home", "/"], ["About", "/about"]]), faqLd(P.faqs)] });
  return (<>
    <PageHero tone="k" img="/story.jpg" title={P.h1} alt="On site with RK Enterprises" aside={<p className="phero__lead">{P.lead}</p>} />
    <section className="sec"><div className="wrap two">
      <div className="rv"><h2 className="h-head">From site hands to plant owners</h2>
        <p className="lead">RK Enterprises supplies construction plant on hire and for sale, and the people who make sure it works when the job needs it.</p></div>
      <div className="rv" style={{ ["--d" as string]: "120ms" }}><p className="body body--story">{STORY}</p></div>
    </div></section>
    <section className="sec field field--b"><div className="wrap two">
      <div className="rv"><h2 className="h-head">Builders who cannot afford a late machine</h2>
        <p className="body">Residential developers racing the monsoon, infrastructure crews working night windows on live highways, industrial contractors running shed after shed, and growing firms building their own fleets. Different jobs, the same need: plant that works when it arrives and a supplier who answers.</p></div>
      <div className="rv" style={{ ["--d" as string]: "120ms" }}><h2 className="h-head">We hire and we sell, so we tell you straight</h2>
        <p className="body">Because RK runs both RSP Rental and RSP Sale, we have no reason to push you one way. Hire when the work is short or uncertain. Buy when the hire bills look like a loan payment. Own the core and rent the peak when it is somewhere in between.</p></div>
    </div></section>
    <PhotoBand title="On site, every week" photos={[
      { src: "/story.jpg", alt: "RK Enterprises team on a construction site" },
      { src: "/site.jpg", alt: "Building site served by RK Enterprises" },
      { src: "/img-14100101.jpg", alt: "Construction work in progress" },
      { src: "/projects/engineers.jpg", alt: "Engineers planning work on site", cap: "Direct hire & sale, run from Nilaje" }]} />
    <Points title="How we work" items={VALUES} img="/about-platform.webp" alt="Rope suspended platform from RK Enterprises" />
    <section className="sec canvas"><div className="wrap">
      <h2 className="h-head rv">The directors</h2>
      <div className="dirs">
        {[["Amit Kumar", "/directors/amit-kumar.webp", "o"], ["Rajesh Kumar", "/directors/rajesh-kumar.webp", "b"]].map(([n, src, t], i) => <figure key={n} className={`dir dir--${t} rv`} style={{ ["--d" as string]: `${i * 120}ms` }}>
                    <img src={src} alt={`${n}, Director, RK Enterprises`} loading="lazy" width={900} height={1200} />
          <figcaption><b>{n}</b> Director</figcaption></figure>)}
      </div>
    </div></section>
    <section className="sec field field--k"><div className="wrap">
      <h2 className="h-head rv">From the first message to a moving site</h2>
      <ol className="steps">{STEPS.map((st, i) => <li key={st.h} className="rv" style={{ ["--d" as string]: `${i * 90}ms` }}><h3>{st.h}</h3><p>{st.p}</p></li>)}</ol>
    </div></section>
    <section className="sec"><div className="wrap">
      <h2 className="h-head rv">Fourteen to forty</h2>
      <ol className="timeline">
        <li className="rv tl--b"><b>At 14</b><p>Working in contractors’ lobbies and on construction sites: long days, hard lessons, learning the trade from the ground up.</p></li>
        <li className="rv tl--o" style={{ ["--d" as string]: "120ms" }}><b>Around 40</b><p>Decades of site experience later, trusted enough to stand as partners with the contractors they once worked for.</p></li>
        <li className="rv tl--k" style={{ ["--d" as string]: "240ms" }}><b>4–5 years ago to today</b><p>RK Enterprises is founded. Today: RSP Rental and RSP Sale, trusted clients, and projects across Maharashtra.</p></li>
      </ol>
    </div></section>
    <SeoBlock body={P.body} faqs={P.faqs} kicker="In short" canvas img="/img-2137670.jpg" />
    <CtaBand />
  </>);
}
