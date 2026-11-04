import { WHATSAPP_URL } from "../config";
/** The one word is the button: the whole orange band opens WhatsApp. */
export default function CtaBand({ word = "Hire", line = "WhatsApp us. Rate and availability, same day." }: { word?: string; line?: string }) {
  return <a className="cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`${word} — ${line}`}>
    <span className="cta__line">{line}</span>
    <svg className="cta__arr" viewBox="0 0 48 48" aria-hidden="true"><path d="M12 36 36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="5" /></svg>
    <span className="cta__word" aria-hidden="true">{word}</span>
  </a>;
}
