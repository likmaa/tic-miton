// Liens centralisés. Lis d'abord les variables d'env Vite si elles existent,
// sinon on garde des valeurs par défaut faciles à remplacer.
const BASE = import.meta?.env?.VITE_BASE_URL ?? "";
const APP_URL = import.meta?.env?.VITE_APP_URL ?? `${BASE}/app`;
// Liens RÉELS des boutiques (vérifiés le 19/11/2026).
// Passager : Android (Play Store) + iOS (App Store). Chauffeur : Android uniquement.
const PASSENGER_PLAY_STORE = "https://play.google.com/store/apps/details?id=com.apktic.passenger";
const PASSENGER_APP_STORE = "https://apps.apple.com/bj/app/tic-miton/id6766707068";
const DRIVER_PLAY_STORE = "https://play.google.com/store/apps/details?id=com.apktic.driver";
const WHATSAPP_URL = import.meta?.env?.VITE_WHATSAPP_URL ?? "https://wa.me/2290157792662";
const SUPPORT_EMAIL = import.meta?.env?.VITE_SUPPORT_EMAIL ?? "support@ticmiton.com";
const LIVE_URL = import.meta?.env?.VITE_LIVE_URL ?? "https://ticmiton.com/";

const PLACEHOLDER_LINKS = {
  // Application (web/app)
  appUrl: APP_URL,

  // Apps — lien « principal » mono-URL (marché très majoritairement Android au Bénin).
  passengerAppUrl: PASSENGER_PLAY_STORE, // iOS passager : voir appStoreUrl / passengerAppStoreUrl
  driverAppUrl: DRIVER_PLAY_STORE,       // chauffeur = Android uniquement (aucun lien iOS)

  // Liens boutiques explicites (pour badges « Play Store » / « App Store »).
  playStoreUrl: PASSENGER_PLAY_STORE,
  appStoreUrl: PASSENGER_APP_STORE,
  passengerPlayStoreUrl: PASSENGER_PLAY_STORE,
  passengerAppStoreUrl: PASSENGER_APP_STORE,
  driverPlayStoreUrl: DRIVER_PLAY_STORE,

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
