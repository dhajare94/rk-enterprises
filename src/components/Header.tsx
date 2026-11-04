import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { WHATSAPP_URL } from "../config";
import { WaGlyph } from "./WaIcon";
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className={`hdr${open ? " hdr--open" : ""}`}>
      <div className="wrap hdr__in">
        <Link to="/" className="logo" aria-label="RK Enterprises, home"><b>RK</b> Enterprises</Link>
        <nav className="nav" aria-label="Main">
          <NavLink to="/services">Hire &amp; buy</NavLink>
          <NavLink to="/projects">Sites</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Site notes</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--sm hdr__cta"><WaGlyph size={18} /><span>WhatsApp</span></a>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </header>
  );
}
