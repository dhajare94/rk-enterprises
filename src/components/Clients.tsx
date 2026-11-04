import { SALE_CLIENTS } from "../data/clients";
import { PROJECTS } from "../data/projects";
type Row = { name: string; logo?: string; website?: string; rental: boolean; sale: boolean; live: boolean; where?: string; slug?: string };
const ROWS: Row[] = (() => {
  const by = new Map<string, Row>();
  for (const p of PROJECTS) {
    const k = p.clientName.toLowerCase(); const r = by.get(k) ?? { name: p.clientName, rental: false, sale: false, live: false, slug: p.slug };
    r.rental = true; r.live ||= !!p.status; r.logo ??= p.logo; r.website ??= p.website;
    if (!r.where && !/not specified|registered/i.test(p.location)) r.where = p.location.split(",")[0];
    by.set(k, r);
  }
  for (const c of SALE_CLIENTS) {
    const k = c.clientName.toLowerCase(); const r = by.get(k) ?? { name: c.clientName, rental: false, sale: false, live: false };
    r.sale = true; r.logo ??= c.logo; r.website ??= c.website; by.set(k, r);
  }
  return [...by.values()].sort((a, b) => Number(!!b.logo) - Number(!!a.logo));
})();
export const CLIENT_COUNT = ROWS.length;
const initials = (n: string) => n.replace(/[^A-Za-z& ]/g, "").split(/\s+/).filter(w => !/^(ltd|limited|pvt|private|enterprises)$/i.test(w)).slice(0, 2).map(w => w[0]).join("").toUpperCase();
/** Who hires from us: real clients as cards — logo where taken from the client's own site, monogram otherwise. */
export default function Clients({ title = "Who hires from us" }: { title?: string }) {
  const nR = ROWS.filter(r => r.rental).length, nS = ROWS.filter(r => r.sale).length;
  return <section className="sec proof" aria-labelledby="proof-h"><div className="wrap">
    <div className="proof__head">
      <div className="rv"><p className="kick">Clients</p><h2 id="proof-h" className="h-big">{title}</h2></div>
      <dl className="proof__stats rv">
        <div><dt>Clients</dt><dd>{ROWS.length}</dd></div>
        <div><dt>On rental</dt><dd>{nR}</dd></div>
        <div><dt>Bought plant</dt><dd>{nS}</dd></div>
      </dl>
    </div>
    <ul className="cgrid">{ROWS.map((r, i) => {
      const inner = <>
        <div className="ccard__logo">{r.logo ? <img src={r.logo} alt={`${r.name} logo`} loading="lazy" /> : <span className="ccard__mono" aria-hidden="true">{initials(r.name)}</span>}</div>
        <div className="ccard__b"><b className="ccard__n">{r.name}</b>
          <span className="ccard__tags">{r.rental && <span className="tag tag--b">RSP Rental</span>}{r.sale && <span className="tag tag--o">RSP Sale</span>}{r.live && <span className="tag tag--live">Running now</span>}</span>
          {r.where && <span className="ccard__w">{r.where}</span>}</div></>;
      return <li key={r.name} className="ccard rv" style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
        {r.website ? <a href={r.website} target="_blank" rel="noopener noreferrer">{inner}</a> : <div>{inner}</div>}</li>;
    })}</ul>
    <p className="caption">Logos shown only where taken from the client’s own website; others by name.</p>
  </div></section>;
}
