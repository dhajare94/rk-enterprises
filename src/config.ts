export const WHATSAPP_NUMBER = "918421213578";
export const PHONE_E164 = "+918421213578";
export const PHONE_DISPLAY = "+91 84212 13578";
export const TEL_URL = `tel:${PHONE_E164}`;
export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20RK%20Enterprises%2C%20I%20want%20to%20know%20about%20RSP%20Rental%20and%20RSP%20Sale`;
export const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
export const ADDRESS_LINES = ["RK Enterprises", "Office, Ground Floor", "Nilaje, Kalyan-Dombivli", "Kalyan, Thane, Maharashtra 421204", "India"];
export const GEO = { latitude: 19.156462, longitude: 73.079287 };
export const MAP_URL = `https://www.google.com/maps?q=${GEO.latitude},${GEO.longitude}`;
export const POSTAL_ADDRESS = { "@type": "PostalAddress", streetAddress: "Office, Ground Floor, Nilaje", addressLocality: "Kalyan-Dombivli", addressRegion: "Maharashtra", postalCode: "421204", addressCountry: "IN" };
export const GEO_LD = { "@type": "GeoCoordinates", ...GEO };
