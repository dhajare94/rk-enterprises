import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";

export default function NotFound() {
  useSeo({
    title: "Page not found | RK Enterprises",
    description: "That address is not a page on the RK Enterprises site.",
    path: "/404",
    noindex: true,
  });
  return (
    <section className="sec nf">
      <div className="wrap">
        <h1 className="h-head">Page not found</h1>
        <p className="lead">That address is not a page on this site.</p>
        <p className="body"><Link to="/">Back to the home page</Link> · <Link to="/services/rsp-rental">Rope suspended platform hire</Link> · <Link to="/contact">Contact</Link></p>
      </div>
    </section>
  );
}
