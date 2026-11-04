import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
const inline = (s: string): ReactNode[] => s.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((t, i) => {
  if (t.startsWith("**") && t.endsWith("**")) return <strong key={i}>{inline(t.slice(2, -2))}</strong>;
  const m = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (m) return m[2].startsWith("/") ? <Link key={i} to={m[2]}>{m[1]}</Link> : <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>;
  return <Fragment key={i}>{t}</Fragment>;
});
export default function Markdown({ src }: { src: string }) {
  const out: ReactNode[] = []; const lines = src.split("\n"); let i = 0, k = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---\s*$/.test(l)) { i++; continue; }
    if (l.startsWith("### ")) { out.push(<h3 key={k++} className="article__h3">{inline(l.slice(4))}</h3>); i++; continue; }
    if (l.startsWith("## ")) { out.push(<h2 key={k++} className="h3 article__h2">{inline(l.slice(3))}</h2>); i++; continue; }
    if (/^[-*] /.test(l) || /^\d+\. /.test(l)) {
      const ol = /^\d+\. /.test(l); const items: string[] = [];
      while (i < lines.length && (ol ? /^\d+\. /.test(lines[i]) : /^[-*] /.test(lines[i]))) { items.push(lines[i].replace(/^([-*]|\d+\.) /, "")); i++; }
      const L = ol ? "ol" : "ul";
      out.push(<L key={k++} className="article__list">{items.map((t, j) => <li key={j}>{inline(t)}</li>)}</L>); continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |[-*] |\d+\. |---\s*$)/.test(lines[i])) { para.push(lines[i]); i++; }
    out.push(<p key={k++} className="body">{inline(para.join(" "))}</p>);
  }
  return <>{out}</>;
}
