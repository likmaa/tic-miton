// Liens centralisés. Lis d'abord les variables d'env Vite si elles existent,
// sinon on garde des valeurs par défaut faciles à remplacer.
const BASE = import.meta?.env?.VITE_BASE_URL ?? "";
const APP_URL = import.meta?.env?.VITE_APP_URL ?? `${BASE}/app`;
// Direct APK download links from Expo builds
const PASSENGER_APP_URL = "https://expo.dev/accounts/ticmiton/projects/transport/builds";
const DRIVER_APP_URL = "https://expo.dev/accounts/ticmiton/projects/driver-app/builds";
const WHATSAPP_URL = import.meta?.env?.VITE_WHATSAPP_URL ?? "https://wa.me/2290157792662";
const SUPPORT_EMAIL = import.meta?.env?.VITE_SUPPORT_EMAIL ?? "support@ticmiton.com";
const LIVE_URL = import.meta?.env?.VITE_LIVE_URL ?? "https://ticmiton.com/";

const PLACEHOLDER_LINKS = {
  // Application (web/app)
  appUrl: APP_URL,

  // Apps - Direct download links
  passengerAppUrl: PASSENGER_APP_URL,
  driverAppUrl: DRIVER_APP_URL,

  // Pages / ancres internes (utilise des routes ou ancres selon ta structure)
  features: {
    safety: "/features/safety",
    price: "/features/price",
    speed: "/features/speed",
    support: "/features/support",
    all: "/services"
  },

  stats: "/stats",
  howItWorks: "/how-it-works",
  about: "/about",
  order: "/order",
  contact: "/contact",
  driver: "/devenir-chauffeur",

  // Contact direct via WhatsApp
  whatsappUrl: WHATSAPP_URL,

  // Support email (used for mailto fallbacks)
  supportEmail: SUPPORT_EMAIL,

  // Lien démo en ligne (GitHub Pages par défaut)
  liveDemoUrl: LIVE_URL,

  // Utile pour assets/marketing
  media: {
    press: "/media/press",
    partners: "/partners"
  },

  // Exemple d'URL globale (utile pour e-mails / partages)
  home: "/",
};

export default PLACEHOLDER_LINKS;
export { PLACEHOLDER_LINKS };
