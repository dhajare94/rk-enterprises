import type { ReactNode } from "react";
/** Inner-page hoarding: a full colour field with the title at display size, then the page's photograph full width. */
export default function PageHero({ img, title, aside, children, alt, tone = "b" }: { alt?: string; img: string; eyebrow?: string; title: string; aside?: ReactNode; children?: ReactNode; tone?: "b" | "o" | "k" }) {
  const m = title.match(/^(.+?(?:\?| —|:))\s+(.+)$/);
  const head = m ? m[1].replace(/ —$/, "") : title, sub = m ? m[2] : "";
  const long = head.length > 22;
  return <>
    <section className={`phero field field--${tone}`}><div className="wrap phero__in">
      <h1 className={`phero__h lines${long ? " phero__h--long" : ""}`}><span className="line"><span data-line style={{ ["--i" as string]: 0 }}>{head}</span></span></h1>
      {sub && <p className="phero__sub">{sub.charAt(0).toUpperCase() + sub.slice(1)}</p>}
      {aside && <div className="phero__aside">{aside}</div>}
      {children}
    </div></section>
    <div className="phero__img shutter"><img src={img} alt={alt ?? title} width={1600} height={700} /></div>
  </>;
}
