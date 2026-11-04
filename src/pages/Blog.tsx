import SeoBlock from "../components/SeoBlock";
import { PAGES } from "../data/seo";
import { useSeo, ORG, SITE, faqLd, crumbs } from "../lib/seo";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import BlogCard, { fmt } from "../components/BlogCard";
import { Link } from "react-router-dom";
import { BLOGS } from "../data/blogs";
export default function Blog() {
  const P = PAGES["blog-index"];
  useSeo({ title: P.seoTitle, description: P.metaDescription, path: "/blog", image: "/img-31637239.jpg", graph: [{ "@type": "Blog", url: SITE + "/blog", name: P.seoTitle, publisher: { "@id": `${SITE}/#org` }, blogPost: BLOGS.map(b => ({ "@type": "BlogPosting", headline: b.seoTitle, url: `${SITE}/blog/${b.slug}`, datePublished: b.date })) },
    { "@type": "ItemList", itemListElement: BLOGS.map((b, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/blog/${b.slug}` })) }, ORG, crumbs([["Home", "/"], ["Blog", "/blog"]]), faqLd(P.faqs)] });
  const [f, ...rest] = [...BLOGS].sort((a, b) => b.date.localeCompare(a.date));
  return (<>
    <PageHero tone="o" img="/img-33374624.jpg" title={P.h1} alt="Construction site in Maharashtra" aside={<p className="phero__lead">{P.lead}</p>} />
    <section className="sec field field--k"><div className="wrap feat">
      <Link to={`/blog/${f.slug}`} className="feat__link rv">
        <img className="feat__img" src={f.img} alt="" loading="lazy" width={1200} height={800} />
        <div><p className="feat__t">{f.title}</p><p className="lead">{f.excerpt}</p><p className="feat__meta">{fmt(f.date)} · {f.read} read</p><span className="btn btn--k">Read the article</span></div>
      </Link>
    </div></section>
    <section className="sec"><div className="wrap"><h2 className="h-head rv">All site notes</h2>
      <ul className="bgrid">{rest.map((b, i) => <BlogCard key={b.slug} b={b} i={i} />)}</ul></div></section>
    <SeoBlock faqs={P.faqs} />
    <CtaBand word="Ask" line="Got a site question? WhatsApp us." />
  </>);
}
