import { useEffect, useState } from "react";
export function RotatingImg({ imgs, className, children, thumbs }: { imgs: string[]; className?: string; children?: React.ReactNode; thumbs?: boolean }) {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setK(x => (x + 1) % imgs.length), 3500 + Math.random() * 1500);
    return () => clearInterval(t);
  }, [imgs.length]);
  return <div className={`rot ${className ?? ""}`}>
    {imgs.map((src, i) => <div key={src + i} className={`rot__img${i === k ? " is-on" : ""}`} style={{ backgroundImage: `url(${src})` }} />)}
    {!thumbs && <div className="rot__dots">{imgs.map((_, i) => <button key={i} type="button" aria-label={`Show image ${i + 1}`} className={i === k ? "is-on" : ""} onClick={e => { e.preventDefault(); e.stopPropagation(); setK(i); }} />)}</div>}
    {children}
    {thumbs && <div className="rot__thumbs">{imgs.map((src, i) => <button key={src + i} type="button" aria-label={`Show image ${i + 1}`} className={i === k ? "is-on" : ""} style={{ backgroundImage: `url(${src})` }} onClick={e => { e.preventDefault(); e.stopPropagation(); setK(i); }} />)}</div>}
  </div>;
}
export function Gallery({ imgs, title }: { imgs: string[]; title: string }) {
  const [k, setK] = useState(0);
  const go = (d: number) => setK(x => (x + d + imgs.length) % imgs.length);
  return <div className="gal">
    <div className="gal__main" style={{ backgroundImage: `url(${imgs[k]})` }} role="img" aria-label={`${title} — photo ${k + 1} of ${imgs.length}`}>
      <button type="button" className="gal__nav gal__nav--l" aria-label="Previous photo" onClick={() => go(-1)}>‹</button>
      <button type="button" className="gal__nav gal__nav--r" aria-label="Next photo" onClick={() => go(1)}>›</button>
      <span className="gal__count">{k + 1} / {imgs.length}</span>
    </div>
    <div className="gal__thumbs">{imgs.map((src, i) => <button key={src + i} type="button" aria-label={`Photo ${i + 1}`} className={i === k ? "is-on" : ""} style={{ backgroundImage: `url(${src})` }} onClick={() => setK(i)} />)}</div>
  </div>;
}
