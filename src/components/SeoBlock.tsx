import Markdown from "./Markdown";
import type { SeoFaq } from "../data/seo";
/** Wide heading, questions indented under it. Native exclusive <details>. */
export function FaqList({ faqs, title = "Straight answers", tone = "w" }: { faqs: SeoFaq[]; title?: string; tone?: "w" | "c" }) {
  if (!faqs.length) return null;
  return <section className={`sec faq faq--${tone}`}><div className="wrap">
    <h2 className="h-big rv">{title}</h2>
    <div className="faq__list">{faqs.map((f, i) => <details key={f.q} name="faq" open={i === 0} className="rv"><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
  </div></section>;
}
/** The page's long copy beside a photograph; questions follow. */
export default function SeoBlock({ body, faqs, kicker = "Good to know", canvas, img = "/img-14100101.jpg" }: { body?: string; faqs: SeoFaq[]; kicker?: string; canvas?: boolean; img?: string }) {
  return <>
    {body ? <section className={`sec copy${canvas ? " copy--c" : ""}`}><div className="wrap copy__in">
      <div className="copy__side"><h2 className="h-head rv">{kicker}</h2><img className="rv" src={img} alt="RK Enterprises plant on site" loading="lazy" width={800} height={1000} /></div>
      <div className="article rv"><Markdown src={body} /></div>
    </div></section> : null}
    <FaqList faqs={faqs} tone={canvas ? "w" : "c"} />
  </>;
}
