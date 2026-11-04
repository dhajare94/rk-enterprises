import { Link } from "react-router-dom";
import { ADDRESS_LINES, MAP_URL, TEL_URL, PHONE_DISPLAY, WHATSAPP_URL } from "../config";
export default function Footer() {
  return <footer className="ftr"><div className="wrap ftr__in">
    <div className="ftr__cols">
      <div><p className="ftr__h">Our office</p><address>{ADDRESS_LINES.slice(1).map(l => <span key={l}>{l}</span>)}</address><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Directions on Google Maps</a></div>
      <div><p className="ftr__h">Hire and buy</p><Link to="/services/rsp-rental">RSP Rental</Link><Link to="/services/rsp-sale">RSP Sale</Link><Link to="/services">All services</Link><Link to="/projects">Sites</Link></div>
      <div><p className="ftr__h">Company</p><Link to="/about">About</Link><Link to="/blog">Site notes</Link><Link to="/contact">Contact</Link></div>
      <div><p className="ftr__h">Line opens 5 a.m.</p><a href={TEL_URL}>{PHONE_DISPLAY}</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
    </div>
    <div className="ftr__mark" aria-hidden="true"><svg viewBox="0 0 1000 150" preserveAspectRatio="xMinYMax meet"><text x="-6" y="132" textLength="1006" lengthAdjust="spacingAndGlyphs">RK Enterprises</text></svg></div>
    <p className="ftr__legal">© {new Date().getFullYear()} RK Enterprises, Kalyan-Dombivli. Construction plant hire and sale.</p>
  </div></footer>;
}
