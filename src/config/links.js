// Liens centralisés. Lis d'abord les variables d'env Vite si elles existent,
// sinon on garde des valeurs par défaut faciles à remplacer.
const BASE = import.meta?.env?.VITE_BASE_URL ?? "https://example.com/tic-miton";
const APP_URL = import.meta?.env?.VITE_APP_URL ?? `${BASE}/app`;
// Defaults set to official store home pages (replace with real app links when ready)
const PLAY_STORE_URL = import.meta?.env?.VITE_PLAY_STORE_URL ?? "https://play.google.com/store/apps";
const APP_STORE_URL = import.meta?.env?.VITE_APP_STORE_URL ?? "https://apps.apple.com/";
const DOWNLOAD_URL = import.meta?.env?.VITE_DOWNLOAD_URL ?? `${BASE}/download`;
const LIVE_URL = import.meta?.env?.VITE_LIVE_URL ?? "https://likmaa.github.io/tic-miton/";
const WHATSAPP_URL = import.meta?.env?.VITE_WHATSAPP_URL ?? "https://wa.me/2290157792662";
const SUPPORT_EMAIL = import.meta?.env?.VITE_SUPPORT_EMAIL ?? "support@ticmition.com";

const PLACEHOLDER_LINKS = {
  // Primary download landing (page interne)
  downloadUrl: DOWNLOAD_URL,

  // Application (web/app)
  appUrl: APP_URL,

  // Stores
  playStoreUrl: PLAY_STORE_URL, // remplacer par le lien réel Google Play via VITE_PLAY_STORE_URL
  appStoreUrl: APP_STORE_URL,   // remplacer par le lien réel App Store via VITE_APP_STORE_URL

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
