import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WaLogo from "./WaLogo";
import { WHATSAPP_URL, waLink } from "../config";
import { SERVICES } from "../data/services";
export default function Layout() {
  const { pathname } = useLocation();
  const [fab, setFab] = useState(false);
  const [tuck, setTuck] = useState(false);
  const svc = SERVICES.find(s => pathname === `/services/${s.slug}`);
  useEffect(() => {
    let y = window.scrollY;
    const f = () => { const n = window.scrollY; setFab(n > window.innerHeight * 0.6); setTuck(n > y); y = n; };
    f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    let io: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll<HTMLElement>(".rv:not(.in), .shutter:not(.in)");
      if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
      io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io!.unobserve(e.target); } }), { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
      els.forEach(e => io!.observe(e));
    });
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, [pathname]);
  return (<><Header /><main><Outlet /></main><Footer />
    {<a className={`wafab${fab ? " is-on" : ""}${tuck ? " is-tuck" : ""}`} href={svc ? waLink(`Hello RK Enterprises, I want to know about ${svc.name}`) : WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with RK Enterprises on WhatsApp"><WaLogo size={24} /><span className="wafab__t">WhatsApp us</span></a>}</>);
}
