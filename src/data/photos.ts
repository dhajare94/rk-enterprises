/** Honest descriptions of photographs already on the site. Shared files keep one description. */
const ALT: Record<string, string> = {
  "/about-platform.webp": "Rope suspended platform from RK Enterprises",
  "/img-33511139.jpg": "Rope suspended platform on a building facade",
  "/img-29414416.jpg": "Plant working on a building site",
  "/img-31637239.jpg": "Site plant on a building job",
  "/img-33374624.jpg": "Plant working on a building site",
  "/img-2137670.jpg": "Plant at work on site",
  "/img-14100101.jpg": "Construction work in progress",
  "/rental.jpg": "Plant ready for direct hire",
  "/sale.jpg": "Equipment ready for direct sale",
  "/site.jpg": "Building site served by RK Enterprises",
  "/story.jpg": "RK Enterprises team on a construction site",
  "/hero-poster.jpg": "RK Enterprises site photograph",
  "/projects/plant.jpg": "Construction plant working on a Mumbai site",
  "/projects/excavator.jpg": "Excavator on a construction site",
  "/projects/concrete.jpg": "Concrete work on site",
  "/projects/engineers.jpg": "Engineers reviewing work on site",
};

export function photoAlt(src: string) {
  return ALT[src] ?? "RK Enterprises site photograph";
}
