/** Hire terms as a spec list beside one large photograph. */
export default function Points({ items, title, img, alt, tone = "c" }: { items: { h: string; p: string }[]; title: string; img: string; alt: string; tone?: "c" | "w" | "k" }) {
  return <section className={`sec points points--${tone}`}><div className="wrap points__in">
    <div className="points__img shutter"><img src={img} alt={alt} loading="lazy" width={1200} height={1500} /></div>
    <div><h2 className="h-head rv">{title}</h2>
      <ul className="points__list">{items.map((it, i) => <li key={it.h} className="rv" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}><h3>{it.h}</h3><p>{it.p}</p></li>)}</ul></div>
  </div></section>;
}
