export type SaleClient = { slug: string; clientName: string; website?: string; logo?: string };
export const SALE_CLIENTS: SaleClient[] = [
  {"slug": "ikra", "clientName": "Ikra Enterprises"},
  {"slug": "kp-infra", "clientName": "KP Infra"},
  {"slug": "s-h", "clientName": "S&H Enterprises"},
  {"slug": "ncc", "clientName": "NCC Limited", "logo": "/clients/ncc.png", "website": "https://www.ncclimited.com/"},
];
