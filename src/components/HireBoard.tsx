import { useState } from "react";
import { waLink } from "../config";
import { WaGlyph } from "./WaIcon";
const PLANT = ["RSP platform", "Scaffold & access", "Site plant", "Breakdown swap"];
const TERM = ["Day hire", "Week hire", "Month hire", "Buy outright"];
const SITE = ["Kalyan-Dombivli", "Thane", "Navi Mumbai", "Mumbai", "Rest of Maharashtra"];
const START = ["Today", "This week", "This month"];
function Row({ label, opts, val, set, name }: { label: string; opts: string[]; val: string; set: (v: string) => void; name: string }) {
  return <fieldset className="hb__row"><legend>{label}</legend><div className="hb__opts">
    {opts.map(o => <label key={o} className={val === o ? "on" : ""}><input type="radio" name={name} checked={val === o} onChange={() => set(o)} />{o}</label>)}</div></fieldset>;
}
/** Live thing: pick the plant, the term, the site and the start — the WhatsApp message to RK writes itself. */
export default function HireBoard({ preset }: { preset?: string }) {
  const [plant, setPlant] = useState(preset && PLANT.includes(preset) ? preset : PLANT[0]);
  const [term, setTerm] = useState(preset === "Buy" ? TERM[3] : TERM[1]);
  const [site, setSite] = useState(SITE[0]);
  const [start, setStart] = useState(START[1]);
  const msg = `Hello RK Enterprises, I need ${plant} — ${term.toLowerCase()} — for a site in ${site}, starting ${start.toLowerCase()}. Please send rate and availability.`;
  return <form className="hb" onSubmit={e => { e.preventDefault(); window.open(waLink(msg), "_blank", "noopener,noreferrer"); }}>
    <Row label="Plant" name="plant" opts={PLANT} val={plant} set={setPlant} />
    <Row label="Term" name="term" opts={TERM} val={term} set={setTerm} />
    <Row label="Site" name="site" opts={SITE} val={site} set={setSite} />
    <Row label="Start" name="start" opts={START} val={start} set={setStart} />
    <p className="hb__msg" aria-live="polite">{msg}</p>
    <button className="btn btn--xl" type="submit"><WaGlyph size={22} /> Send to RK on WhatsApp</button>
  </form>;
}
