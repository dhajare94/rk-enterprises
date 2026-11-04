export type Photo = { src: string; alt: string; cap?: string };
/** A mosaic of site photographs to break up long text runs. First photo leads large. */
export default function PhotoBand({ photos, title, tone }: { photos: Photo[]; title?: string; tone?: "c" | "k" }) {
  return <section className={`sec pband${tone ? ` pband--${tone}` : ""}`}><div className="wrap">
    {title && <h2 className="h-head rv">{title}</h2>}
    <div className={`pband__grid pband__grid--${Math.min(photos.length, 4)}`}>
      {photos.map((p, i) => <figure key={p.src} className="pband__fig rv" style={{ ["--d" as string]: `${i * 90}ms` }}>
        <img src={p.src} alt={p.alt} loading="lazy" />{p.cap && <figcaption>{p.cap}</figcaption>}</figure>)}
    </div>
  </div></section>;
}
