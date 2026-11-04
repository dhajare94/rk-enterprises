import { Link } from "react-router-dom";
import type { Blog } from "../data/blogs";
export const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
/** An article as a photo row: picture, title, date. */
export default function BlogCard({ b, i }: { b: Blog; i: number }) {
  return <li className="bcard rv" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
    <Link to={`/blog/${b.slug}`}>
      <span className="bcard__img"><img src={b.img} alt="" loading="lazy" width={800} height={560} /></span>
      <span className="bcard__t">{b.title}</span>
      <span className="bcard__m">{fmt(b.date)} · {b.read} read</span>
    </Link>
  </li>;
}
