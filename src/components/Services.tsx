import { Link } from "react-router-dom";
/** Three lines of work on three full colour fields: hire (blue), buy (orange), site support (ink). */
const ROWS = [
  { to: "/services/rsp-rental", tone: "b", name: "RSP Rental", h: "Platforms on hire", p: "Rope suspended platforms and site plant by the day, week or month. Checked before dispatch, delivered on your slot.", li: ["Day / week / month", "Inspected before dispatch", "Breakdown swap"], img: "/about-platform.webp", alt: "Rope suspended platform on hire from RK Enterprises" },
  { to: "/services/rsp-sale", tone: "o", name: "RSP Sale", h: "Plant to own", p: "When the hire bill looks like a loan payment, buy the same class of plant we trust on our own jobs.", li: ["Straight hire-vs-buy advice", "Walk-through at handover", "We still answer after"], img: "/sale.jpg", alt: "Construction equipment for sale from RK Enterprises" },
  { to: "/contact", tone: "k", name: "Site support", h: "People on site", p: "Night pours, dawn lifts and short-notice swaps. Someone who knows the machine stays till the work moves.", li: ["Comes with hire and sale", "Line opens 5 a.m."], img: "/img-14100101.jpg", alt: "RK Enterprises crew supporting a site" },
];
export default function ServicesRows({ title = "Hire it. Buy it. We stay on site." }: { title?: string }) {
  return <section className="sec svc-sec" aria-labelledby="svc-h"><div className="wrap">
    <h2 id="svc-h" className="h-head rv">{title}</h2></div>
    <div className="svcs">{ROWS.map((r, i) => <Link key={r.to} to={r.to} className={`svc field--${r.tone} rv`} style={{ ["--d" as string]: `${i * 90}ms` }}>
      <div className="svc__img"><img src={r.img} alt={r.alt} loading="lazy" width={900} height={1100} /></div>
      <div className="svc__body"><h3>{r.h}</h3><p className="svc__name">{r.name}</p><p>{r.p}</p>
        <ul>{r.li.map(x => <li key={x}>{x}</li>)}</ul><span className="svc__go">Open {r.name} <i aria-hidden="true">→</i></span></div>
    </Link>)}</div>
  </section>;
}
