export type Service = { slug: string; name: string; img: string; img2: string; short: string; lead: string;
  gets: { h: string; p: string }[]; when: string[]; };
export const SERVICES: Service[] = [
  { slug: "rsp-rental", name: "RSP Rental", img: "/img-29414416.jpg", img2: "/img-31637239.jpg",
    short: "Plant and support on hire, for the days the job needs more than your own fleet can send.",
    lead: "When the pour is booked and the crane has to be there at dawn, hire direct from people who have stood on those sites since they were fourteen.",
    gets: [
      { h: "Ready equipment", p: "Plant checked before it is dispatched, so it works when it arrives." },
      { h: "On-site support", p: "People who know the machine and stay until the job is moving." },
      { h: "Flexible terms", p: "Day, week or month — hire for exactly the stretch the work needs." },
    ],
    when: ["A peak phase needs more machines than you own", "A one-off task needs equipment you rarely use", "Your own plant is down and the schedule cannot wait", "You want to try a class of equipment before buying"] },
  { slug: "rsp-sale", name: "RSP Sale", img: "/img-33511139.jpg", img2: "/img-31637239.jpg",
    short: "The same class of equipment, sold outright when your firm should own it.",
    lead: "When hire bills start to look like a loan payment, it is time to own. We sell the equipment we trust on our own sites.",
    gets: [
      { h: "Proven equipment", p: "The same class of plant we run on our own jobs, not stock we have never used." },
      { h: "Straight advice", p: "We will tell you honestly whether buying or hiring makes more sense." },
      { h: "After-sale contact", p: "The phone still rings at RK after the sale — and we pick it up." },
    ],
    when: ["You hire the same machine month after month", "Your pipeline of work is steady and long", "You want full control over availability", "You are building your own fleet for the years ahead"] },
];
export type ServiceExtra = { steps: { h: string; p: string }[]; incl: string[]; faqs: { q: string; a: string }[] };
export const EXTRA: Record<string, ServiceExtra> = {
  "rsp-rental": {
    steps: [
      { h: "Tell us the job", p: "Send the site, dates and task on WhatsApp. A photo of the site helps." },
      { h: "We match the plant", p: "We suggest the right class of machine and term — day, week or month." },
      { h: "Check & dispatch", p: "The machine is checked before dispatch and delivered on the agreed slot." },
      { h: "Support till it moves", p: "Our people stay until the work is running, and answer when you call." },
    ],
    incl: ["Pre-dispatch inspection", "Delivery and pick-up coordination", "On-site handover and briefing", "Flexible day / week / month terms", "Breakdown response and replacement", "Extension or early return on request"],
    faqs: [
      { q: "How fast can you deliver?", a: "For standard plant, often within 24–72 hours depending on location and availability. Message us early for big pours or lifts." },
      { q: "What is the minimum hire period?", a: "Day hire is available for most equipment. Weekly and monthly terms bring the effective rate down." },
      { q: "What happens if a machine breaks down?", a: "Call or WhatsApp us. We repair on site or swap the machine so the schedule keeps moving." },
      { q: "Can I extend the hire mid-job?", a: "Yes. Tell us a few days before the end date and we will roll the term forward." },
      { q: "Can I return equipment early?", a: "Yes — early return is available on request. Talk to us about how it affects your term." },
      { q: "Do you support night pours or dawn lifts?", a: "Yes. Tell us the slot in advance; the phone is answered from 5 a.m. and we plan dispatch around your pour or lift time." },
    ] },
  "rsp-sale": {
    steps: [
      { h: "Share your usage", p: "Tell us what you hire today and how often. We look at the real numbers." },
      { h: "Honest hire-vs-buy", p: "We tell you straight whether owning makes sense — even when it does not." },
      { h: "Pick proven stock", p: "Choose from the same class of plant we trust on our own sites." },
      { h: "Handover & after-sale", p: "Walk-through on delivery, and a team that still answers after the sale." },
    ],
    incl: ["Hire-vs-buy cost comparison", "Equipment from proven RK stock", "Inspection report before handover", "Operator walk-through on delivery", "Option of phased purchases", "After-sale contact with RK"],
    faqs: [
      { q: "Do you sell new or used equipment?", a: "We sell the class of equipment we run on our own jobs. Tell us your budget and we will show what fits." },
      { q: "Can I try before I buy?", a: "Yes — many clients hire first through RSP Rental and then move to ownership." },
      { q: "Do you help after the sale?", a: "Yes. The phone still rings at RK after the sale, and we pick it up." },
      { q: "Can I buy in phases?", a: "We can phase purchases across months so your cashflow stays healthy." },
      { q: "How do I know if buying is right for me?", a: "If you hire the same machine month after month on a steady, long pipeline, buying often wins. Share your usage and we will compare honestly." },
    ] },
};
