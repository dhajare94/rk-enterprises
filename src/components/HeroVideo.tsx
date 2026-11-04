import { useEffect, useRef, useState } from "react";
const LOCAL = "/hero.mp4";
const CDN = "https://videos.pexels.com/video-files/20678104/20678104-hd_1280_720_30fps.mp4";
const IMGS = ["/about-platform.webp", "/img-33511139.jpg", "/site.jpg", "/img-29414416.jpg"];
const VIDEO_MS = 12000, IMG_MS = 5000;
/** The hero's moving picture: the site video, then a slow crossfade through our own site photographs. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [k, setK] = useState(0);
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const n = IMGS.length + 1;
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setK(x => (x + 1) % n), k === 0 ? VIDEO_MS : IMG_MS);
    return () => clearTimeout(t);
  }, [k, reduced, n]);
  useEffect(() => {
    const el = ref.current; if (!el || reduced) return;
    el.muted = true; el.defaultMuted = true;
    if (k === 0) {
      el.currentTime = 0;
      void el.play().catch(() => { if (!el.src.includes("pexels.com")) { el.src = CDN; el.load(); void el.play().catch(() => {}); } });
    } else el.pause();
  }, [k, reduced]);
  return <div className="hslides" aria-hidden="true">
    <video ref={ref} className={`hslide${k === 0 ? " is-on" : ""}`} autoPlay={!reduced} muted playsInline loop preload="auto" poster="/hero-poster.jpg" src={LOCAL} />
    {IMGS.map((src, i) => <img key={src} src={src} alt="" className={`hslide${k === i + 1 ? " is-on" : ""}`} width={1600} height={1000} />)}
  </div>;
}
