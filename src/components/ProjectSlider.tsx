import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
const MS = 5500;
type Props = { title?: string; copy?: string; link?: boolean };
export default function ProjectSlider({ title = "Platforms we have hung", copy, link = true }: Props) {
  const [k, setK] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const n = PROJECTS.length;
  const go = (d: number) => setK(x => (x + d + n) % n);
  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => go(1), MS);
    return () => clearTimeout(t);
  }, [k, paused, reduced]);
  const touch = useRef<number | null>(null);
  return <section className="psec"><div className="wrap">
    <div className="psec__head"><div><h2 className="h-head">{title}</h2>{copy && <p className="psec__copy">{copy}</p>}</div>
      {link && <Link to="/projects" className="btn btn--w">All sites →</Link>}</div>
  <div className="pslider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onTouchStart={e => { touch.current = e.touches[0].clientX; setPaused(true); }}
    onTouchEnd={e => { const s = touch.current; touch.current = null; setPaused(false); if (s == null) return; const dx = e.changedTouches[0].clientX - s; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}
    aria-roledescription="carousel" aria-label="Projects">
    <div className="pslider__track" style={{ transform: `translateX(-${k * 100}%)` }}>
      {PROJECTS.map((p, i) => <div key={p.slug} className="pslide" aria-hidden={i !== k} role="group" aria-label={`${i + 1} of ${n}`}>
        <div className="pslide__img"><img src={p.img} alt={`${p.clientName} site`} loading="lazy" width={1200} height={800} /></div>
        <div className="pslide__info">
          <h3>{p.title}</h3>
          <p className="pslide__c">{p.clientName}</p>
          <dl>
            <div><dt>Location</dt><dd>{p.location}</dd></div>
            <div><dt>Client</dt><dd>{p.clientName}</dd></div>
            <div><dt>Type</dt><dd>{p.category}{p.status ? ` · ${p.status}` : ""}</dd></div>
          </dl>
          <Link to={`/projects/${p.slug}`} className="btn btn--w" tabIndex={i === k ? 0 : -1}>Open the site</Link>
        </div>
      </div>)}
    </div>
    <div className="pslider__ctrl">
      <button type="button" aria-label="Previous project" onClick={() => go(-1)}>‹</button>
      <span className="pslider__name">{PROJECTS[k].location}</span>
      <button type="button" aria-label="Next project" onClick={() => go(1)}>›</button>
    </div>
    {!reduced && <div className="pslider__prog" key={`${k}-${paused}`}><i className={paused ? "" : "run"} style={{ animationDuration: `${MS}ms` }} /></div>}
  </div>
  </div></section>;
}
