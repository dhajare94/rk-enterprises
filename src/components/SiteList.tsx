import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
/** Every site as one run of names, each a link, photo frames after the first few. */
export default function SiteList({ title = "Sites on our books:" }: { title?: string }) {
  return <section className="sec sites"><div className="wrap">
    <p className="sites__run rv"><span className="sites__h">{title}</span>{" "}
      {PROJECTS.map((p, i) => <span key={p.slug}><Link to={`/projects/${p.slug}`}>{p.clientName.replace(/ (Pvt\. Ltd\.|LLP|Enterprises)$/, "")}{i < 4 && <img className="sites__f" src={p.img} alt="" loading="lazy" width={120} height={80} />}</Link>{i < PROJECTS.length - 1 ? ", " : "."}</span>)}</p>
    <p className="sites__n">{PROJECTS.length} rental jobs across Mumbai, Navi Mumbai, Thane and Vasai. <Link to="/projects">See every site →</Link></p>
  </div></section>;
}
