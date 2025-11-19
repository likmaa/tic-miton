# TIC Miton — Site Web / Landing React

[![Deploy to GitHub Pages](https://github.com/likmaa/tic-miton/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/likmaa/tic-miton/actions/workflows/deploy-pages.yml)

Live: https://likmaa.github.io/tic-miton/

Application de mobilité locale (Porto‑Novo). Ce dépôt contient le site marketing/landing et les composants React (Accueil, À propos, Services, Recrutement Chauffeurs, Contact, etc.).

## Sommaire
- Caractéristiques principales
- Stack technique
- Prérequis et installation
- Configuration (variables d’environnement)
- Scripts de développement
- Structure du projet
- Déploiement
- Accessibilité & responsive
- Liens utiles / prochains ajouts

## Caractéristiques principales
- Pages clés: Accueil, À propos, Services, Devenir chauffeur, Contact.
- Formulaire d’estimation prix (Services):
	- Géolocalisation, suggestions d’adresses (Nominatim/OSM) limitées au Bénin.
	- Calcul approximatif des distances (Haversine) et affichage du tarif sur clic “Voir les prix”.
	- Bouton “Annuler” pour stopper les requêtes et réinitialiser les états.
- Parcours de téléchargement:
	- Modal de sélection de store (Google Play / App Store) avec liens configurables.
	- Sections QR Code (Accueil, Services, À propos) pointant vers les stores.
- “Comment ça marche”: étapes animées, CTA “Je veux essayer”, progression, design cohérent.
- Recrutement chauffeurs: formulaire stylé (uploads avec aperçu, validations basiques, barre de progression simulée).
- Contact: formulaire mailto + cartes d’infos, lien direct WhatsApp.
- WhatsApp unifié: tous les boutons WhatsApp mènent directement au chat (lien centralisé).
- Contrôles de scroll globaux: boutons “haut/bas” flottants sur toutes les pages.
- Accessibilité de base (focus visible, aria-labels) et respect de prefers-reduced-motion.

## Stack technique
- React + Vite
- react-router-dom (routing SPA)
- Tailwind CSS (utilitaires UI)
- framer-motion (animations, avec reduced-motion)
- lucide-react (icônes)
- Nominatim (OpenStreetMap) pour géocodage/reverse
- vite-imagetools (sources responsive pour certaines images)

## Prérequis et installation
- Node.js recommandé: 20.19+ (ou 22.12+) — Vite l’exige. Des versions 20.16 peuvent builder mais affichent un avertissement.

Installation des dépendances:
```bash
npm install
# ou
yarn
```

## Configuration (variables d’environnement)
Les URLs publiques et liens stores sont centralisés dans `src/config/links.js` et peuvent être surchargés via variables Vite.

Créez un fichier `.env` à la racine avec, par exemple:
```bash
VITE_BASE_URL=https://exemple.com/tic-miton
VITE_APP_URL=https://exemple.com/app
VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=ton.app
VITE_APP_STORE_URL=https://apps.apple.com/app/id123456789
VITE_DOWNLOAD_URL=https://exemple.com/tic-miton/download
VITE_WHATSAPP_URL=https://wa.me/2290157792662?text=Bonjour%20TIC%20Miton
```

Par défaut (si non définies), des valeurs “placeholder” sont utilisées.

## Scripts de développement
```bash
# Lancer le serveur de dev (HMR)
npm run dev

# Lint (si configuré)
npm run lint

# Build de production (sortie dans dist/)
npm run build

# Prévisualiser le build localement
npm run preview
```

## Structure du projet
```
src/
	components/        # Composants réutilisables (Hero, Stats, Features, Services*, DownloadQR, Modals...)
	pages/             # Pages: Home, About, Services, DevenirChauffeur, Contact
	config/links.js    # Centralisation des liens (stores, routes, WhatsApp, etc.) avec overrides via VITE_*
	assets/            # Images (optimisées via Vite quand pertinent)
public/              # Assets statiques
```

Sections notables:
- `components/ServicesHero.jsx`: estimation prix, géocodage/reverse, suggestions Benin-only, calcul Haversine.
- `components/ServicesGrid.jsx`: cartes service + modal stores.
- `components/ServicesHowItWorks.jsx` ou `HowItWorksSection.jsx`: étapes animées, CTA.
- `components/FeaturesZSection.jsx`: blocs visuels alternés en “Z”, modal téléchargement.
- `components/DownloadQRSection.jsx`: cartes QR vers les stores.
- `components/DriverRecruitmentForm.jsx`: formulaire recrut. chauffeurs (uploads, validations).
- `components/ScrollControls.jsx`: boutons scroll haut/bas flottants, respect reduced-motion.
- `components/Navbar.jsx` / `Footer.jsx`: navigation, CTA WhatsApp, liens stores.

## Déploiement
Le build génère `dist/`, prêt pour un hébergement statique (Netlify, Vercel, S3/CloudFront, GitHub Pages…).
- Assurez-vous de définir les variables d’environnement côté plateforme si vous en utilisez (VITE_* ci-dessus).
- SPA routing: activez la redirection “fallback → index.html” pour les routes internes (selon l’hébergeur).

### GitHub Pages
- L’Action GitHub `Deploy to GitHub Pages` build avec `--base=/tic-miton/` et publie automatiquement.
- URL de production: https://likmaa.github.io/tic-miton/
- Pour activer:
	1. Repo > Settings > Pages
	2. Source: "GitHub Actions"
	3. Sauvegarder. Le déploiement se fera à chaque push sur `main`.

### Netlify
- Publis: dossier `dist/`, build command `npm run build`
- SPA fallback: fichier `public/_redirects` déjà présent (`/* /index.html 200`).

### Vercel
- Config `vercel.json` incluse (rewrite SPA); build `npm run build`, output `dist/`.

## Accessibilité & responsive
- Typographies et contrastes conformes à la charte.
- Focus visible sur éléments d’interaction clés.
- Animations désactivées si `prefers-reduced-motion`.
- Layouts testés mobile-first (grilles 1→2→3 colonnes, images adaptatives, CTAs sans débordement).

## Liens utiles / prochains ajouts
- Renseigner les liens stores définitifs (Play/App Store) dans `.env`.
- Ajouter des tests E2E (ex: Playwright) pour valider “estimation de prix”, modals, et navigation SPA.
- Optionnel: améliorer le piégeage de focus dans les modals et ajouter « Échap pour fermer » partout.

## Optimisations & Pipeline images

### Typographie héro unifiée
Toutes les sections héro utilisent désormais une échelle cohérente: `text-3xl sm:text-4xl lg:text-5xl` (lisible mobile, sans sauts visuels excessifs).

### Images & CLS
- Ajout systématique des attributs `width`/`height` ou dimensions tailwind contrôlées sur les images critiques (logo, avatars, mockups) pour réduire le Cumulative Layout Shift.
- `decoding="async"` sur images non critiques et `loading="lazy"` sauf pour les héro principales (préchargées pour LCP).

### Favicon & PWA
- Manifest PWA (`public/site.webmanifest`) avec icônes multi-tailles (32, 192, 512). Apple touch icon 180×180 gérée séparément.
- Variantes intermédiaires (transparent / fond blanc) nettoyées pour réduire le bruit du repo.

### Script d’optimisation (Sharp)
Un script Node `scripts/optimize-images.js` génère les icônes à partir du logo source (WebP ou PNG). Commande:
```bash
npm run optimize:images
```
Production des tailles nécessaires: 32, 180, 192, 512 (PNG). Peut être étendu pour WebP/AVIF future.

### Couleurs brand
La couleur primaire `#3650D0` est exposée dans Tailwind comme `bg-brand-blue`, éviter les hex directs dans le JSX. Prochain durcissement possible: lint custom pour interdire `#3650D0` en dur.

### Axes de suivi futurs
- Responsive sets supplémentaires pour images lourdes >150KB (Unsplash hero Services, etc.) via `?w=` multi-sources.
- Preload police display (Unbounded) si LCP nécessite un gain supplémentaire.
- Code splitting plus fin (animations / pages) si bundle >350KB persiste.
- Audit Lighthouse CI automatisé (script `npm run lh` futur).

---

TIC Miton © {new Date().getFullYear()} — Tous droits réservés.

---

TIC Miton © {new Date().getFullYear()} — Tous droits réservés.
