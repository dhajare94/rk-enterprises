import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
/** Sites as large photo tiles: client, job, area. */
export default function ProjectGrid({ list }: { list: Project[] }) {
  return <ul className="pgrid">{list.map((p, i) => <li key={p.slug} className="rv" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
    <Link to={`/projects/${p.slug}`} className="ptile">
      <span className="ptile__img"><img src={p.img} alt={`${p.clientName} site`} loading="lazy" width={900} height={640} />{p.status && <b className="ptile__live">{p.status}</b>}</span>
      <span className="ptile__c">{p.title}</span>
      <span className="ptile__m">{p.clientName}{/not specified|registered/i.test(p.location) ? "" : ` · ${p.location.split(",")[0]}`}</span>
    </Link></li>)}</ul>;
}
