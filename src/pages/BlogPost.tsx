import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import BlogCard, { fmt } from "../components/BlogCard";
import Markdown from "../components/Markdown";
import { BLOGS } from "../data/blogs";
import { useSeo, SITE, faqLd, crumbs } from "../lib/seo";
import { waLink } from "../config";

export default function BlogPost() {
  const { slug } = useParams();
  const b = BLOGS.find(x => x.slug === slug);
  useSeo(b ? { title: b.seoTitle, description: b.metaDescription, path: `/blog/${b.slug}`, image: b.img, type: "article", graph: [
    { "@type": "BlogPosting", headline: b.seoTitle, description: b.metaDescription, image: SITE + b.img, datePublished: b.date, mainEntityOfPage: `${SITE}/blog/${b.slug}`, author: { "@type": "Organization", name: "RK Enterprises", url: SITE }, publisher: { "@id": `${SITE}/#org`, "@type": "Organization", name: "RK Enterprises" } },
    crumbs([["Home", "/"], ["Blog", "/blog"], [b.title, `/blog/${b.slug}`]]), ...(b.faqs.length ? [faqLd(b.faqs)] : [])] } : null);
  if (!b) return <section className="sec nf"><div className="wrap"><h1 className="h-head">Article not found</h1><Link className="btn btn--k" to="/blog">All articles</Link></div></section>;
  const more = BLOGS.filter(x => x.slug !== b.slug).slice(0, 3);
  return (<>
    <PageHero tone="k" img={b.img} title={b.title} alt="" aside={<p className="phero__lead">{fmt(b.date)} · {b.read} read</p>} />
    <article className="sec"><div className="wrap article">
      <div className="article__answer rv"><strong>Short answer</strong><p>{b.lead}</p></div>
      <Markdown src={b.body} />
      {b.faqs.length > 0 && <section className="faq rv" aria-labelledby="faq-h"><h2 id="faq-h" className="h3 article__h2">Frequently asked questions</h2>
        <div className="faq__list faq__list--flat">{b.faqs.map((f, i) => <details key={f.q} name="bfaq" open={i === 0}><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div></section>}
      <div className="article__cta rv"><p>Want a straight answer for your site?</p>
        <a className="btn" href={waLink(`Hello RK Enterprises, I read "${b.title}" and have a question.`)} target="_blank" rel="noopener noreferrer">Ask RK on WhatsApp</a></div>
      <Link to="/blog" className="btn btn--k">All articles</Link>
    </div></article>
    <section className="sec canvas"><div className="wrap"><h2 className="h-head rv">Read next</h2>
      <ul className="bgrid">{more.map((m, i) => <BlogCard key={m.slug} b={m} i={i} />)}</ul></div></section>
    <CtaBand />
  </>);
}
