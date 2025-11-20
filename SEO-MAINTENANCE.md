# Guide de Maintenance SEO - TIC Miton

## 📋 Vue d'ensemble

Ce document fournit un plan complet pour maintenir et améliorer le référencement naturel (SEO) du site TIC Miton sur le long terme.

---

## ✅ Checklist Pré-Launch (Avant Mise en Production)

### Configuration Technique
- [x] SSL/HTTPS installé et fonctionnel
- [x] robots.txt correct (pas de `Disallow: /` global)
- [x] sitemap.xml créé et optimisé
- [x] Balises canonical sur chaque page
- [x] Titles et meta descriptions uniques par page
- [x] Logo et og:image optimisés
- [ ] Google Analytics 4 (GA4) configuré
- [ ] Google Search Console (GSC) configuré
- [ ] Noindex sur environnement staging/dev

### Performance & Core Web Vitals
- [x] Lighthouse Performance > 40 (baseline établi)
- [x] Images optimisées (WebP/AVIF, responsive)
- [x] Font-display: swap activé
- [x] Preload des ressources critiques (LCP)
- [x] Lazy loading sections off-screen
- [x] Cache headers configurés (Vercel)
- [ ] **Objectif:** Lighthouse Performance > 90 mobile/desktop

### Contenu SEO
- [x] 6 schemas JSON-LD (Organization, LocalBusiness, Service, MobileApp, Breadcrumb, FAQ)
- [x] Attributs alt descriptifs sur toutes les images
- [x] Mots-clés locaux intégrés (Porto-Novo, Bénin, VTC)
- [x] Structure H1-H6 cohérente
- [ ] Contenu minimum 300 mots par page principale

---

## 📅 Post-Launch (1-2 Semaines Après Mise en Ligne)

### Google Search Console (GSC)
1. **Soumettre le sitemap:**
   - Aller dans GSC → Sitemaps
   - Ajouter `https://ticmiton.com/sitemap.xml`
   - Vérifier indexation (0 erreurs attendues)

2. **URL Inspection sur pages clés:**
   - Page d'accueil: `/`
   - Services: `/services`
   - Téléchargement: `/download`
   - Devenir chauffeur: `/devenir-chauffeur`
   - Demander l'indexation si non visible

3. **Corriger erreurs de crawl:**
   - Aller dans Couverture → Erreurs
   - Résoudre 404, redirections cassées, pages bloquées

### Google Analytics 4 (GA4)
- Configurer événements personnalisés:
  - `download_app_click` (boutons CTA)
  - `driver_application_submit` (formulaire chauffeur)
  - `contact_form_submit`
  - `store_redirect` (tracking déjà en place)

### Contenu Initial
- [ ] Publier 2-4 articles de blog SEO:
  - "Comment fonctionne TIC Miton à Porto-Novo ?"
  - "Tarifs VTC à Porto-Novo : Comparatif et Transparence"
  - "Sécurité des Courses VTC : Nos Engagements"
  - "Témoignages Clients : Pourquoi Choisir TIC Miton"

### Backlinks Initiaux
- [ ] Outreach auprès de 5-10 partenaires locaux:
  - Commerces Porto-Novo (co-marketing)
  - Blogs tech/startup Bénin
  - Annuaires d'entreprises béninoises
  - Médias locaux (communiqués de presse)

---

## 🎯 Stratégie Éditoriale (Calendrier Mensuel)

### Objectifs
- **Fréquence:** 2-4 articles/mois minimum
- **Longueur:** 500-1500 mots par article
- **Focus:** Intention de recherche + SEO local

### Types de Contenu

#### 1. **Pages Piliers (Evergreen)**
- "Guide Complet du VTC à Porto-Novo"
- "Tarifs et Grilles Tarifaires TIC Miton"
- "Comment Devenir Chauffeur VTC au Bénin"
- "Zones Desservies : Porto-Novo et Cotonou"

#### 2. **Articles Informationnels (Blog)**
- Sécurité dans les transports
- Comparaisons VTC vs Taxi traditionnel
- Conseils utilisateurs (paiement, pourboires, etc.)
- Actualités transport Bénin
- Études de cas partenaires (anonymisées)

#### 3. **Articles Locaux (SEO Local)**
- "Meilleurs quartiers pour se déplacer à Porto-Novo"
- "Événements à Porto-Novo : Comment s'y rendre avec TIC Miton"
- "Transport domicile-travail à Porto-Novo : Solutions"

#### 4. **FAQ & Pages d'Aide (Featured Snippets)**
- Structurer avec schema FAQ (déjà en place)
- Répondre questions fréquentes :
  - "Combien coûte une course VTC à Porto-Novo ?"
  - "TIC Miton est-il sûr ?"
  - "Comment payer avec Mobile Money ?"
  - "Que faire si j'ai perdu un objet dans le véhicule ?"

### Intention de Recherche par Type de Page
- **Transactionnelle** (télécharger app, inscription chauffeur):
  - CTA clairs, formulaires visibles
  - Mots-clés: "télécharger", "réserver", "s'inscrire"
  
- **Informationnelle** (blog, guides):
  - Contenu long-form, structure H2/H3
  - Mots-clés: "comment", "pourquoi", "guide", "conseils"

- **Navigationnelle** (contact, à propos):
  - Infos claires, coordonnées visibles
  - Mots-clés: "contact TIC Miton", "équipe TIC Miton"

### Calendrier Mensuel Exemple

| Semaine | Type            | Sujet                                      | Mots-clés cibles                  |
|---------|-----------------|---------------------------------------------|-----------------------------------|
| S1      | Article Local   | "Transport Porto-Novo : Guide 2025"        | VTC Porto-Novo, transport Bénin   |
| S2      | FAQ/Aide        | "5 Questions sur TIC Miton"                | comment réserver, tarifs VTC      |
| S3      | Témoignage      | "Témoignage : Un Mois avec TIC Miton"      | avis TIC Miton, expérience client |
| S4      | Pilier (Update) | "Mise à jour Tarifs VTC Porto-Novo"        | prix course, grille tarifaire     |

---

## 🔗 Stratégie Backlinks & Off-Page SEO

### Objectifs
- **Court terme (3 mois):** 10-20 backlinks quality
- **Moyen terme (6 mois):** 30-50 backlinks, DA > 20
- **Long terme (12 mois):** 100+ backlinks, mentions presse

### Tactiques

#### 1. **Partenariats Locaux (High Priority)**
- Commerces Porto-Novo (restaurants, hôtels):
  - Co-branding: "Arrivez avec TIC Miton, -10% chez nous"
  - Lien sur leur site → lien sur le vôtre
  
- Blogs tech/startup Bénin:
  - Articles invités (guest posting)
  - Interviews fondateurs TIC Miton
  
- Associations professionnelles:
  - Chambre de Commerce Porto-Novo
  - Syndicats transport

#### 2. **Communiqués de Presse**
- **Occasions:**
  - Lancement officiel à Porto-Novo
  - Extension à Cotonou/nouvelles villes
  - Partenariats majeurs
  - Jalons (10 000 courses, 100 chauffeurs)
  
- **Distribution:**
  - Médias locaux (journaux béninois)
  - Sites d'actualités tech Afrique
  - Plateformes de communiqués (PR Newswire)

#### 3. **Annuaires & Listings**
- [ ] Google Business Profile (Local SEO)
- [ ] Annuaires startups Afrique (AfriLabs, etc.)
- [ ] Annuaires VTC/mobilité (comparateurs)
- [ ] Plateformes B2B (Kompass, Europages si export)

#### 4. **Éviter (Black Hat)**
- ❌ Achats de liens spammy (PBN, fermes)
- ❌ Échanges de liens excessifs non pertinents
- ❌ Commentaires spam sur blogs
- ❌ Annuaires low-quality (> 100 liens sortants)

### Outils de Suivi Backlinks
- **Gratuits:**
  - Google Search Console (Liens)
  - Bing Webmaster Tools
  
- **Payants (Recommandés):**
  - Ahrefs (backlink explorer, DR/UR)
  - SEMrush (backlink audit)
  - Moz (Link Explorer, DA/PA)

---

## 🌍 Internationalisation (Si Multi-Langue)

### Configuration hreflang (Exemple Français + Anglais)

```html
<!-- Dans <head> de chaque page -->
<link rel="alternate" href="https://ticmiton.com/fr/about" hreflang="fr" />
<link rel="alternate" href="https://ticmiton.com/en/about" hreflang="en" />
<link rel="alternate" href="https://ticmiton.com/about" hreflang="x-default" />
```

### Structure URLs
- **Subfolder (Recommandé):**
  - `https://ticmiton.com/fr/` (français)
  - `https://ticmiton.com/en/` (anglais)
  
- **Éviter:** Paramètres `?lang=fr` (moins SEO-friendly)

### Sitemap Multi-Langue
```xml
<url>
  <loc>https://ticmiton.com/fr/services</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://ticmiton.com/en/services"/>
  <xhtml:link rel="alternate" hreflang="fr" href="https://ticmiton.com/fr/services"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://ticmiton.com/services"/>
</url>
```

---

## 📊 Monitoring & KPIs (Mesures à Suivre)

### Google Search Console (Hebdomadaire)
- **Impressions:** Nombre d'apparitions dans SERP
- **Clics:** Visites organiques
- **CTR:** Taux de clic (objectif > 3%)
- **Position moyenne:** Classement moyen (objectif < 10 pour mots-clés principaux)
- **Couverture:** Pages indexées vs erreurs

### Google Analytics 4 (Hebdomadaire)
- **Trafic Organique:** Sessions depuis Google
- **Taux de conversion:**
  - Téléchargements app
  - Soumissions formulaire chauffeur
  - Clics contact
- **Pages de destination:** Top landing pages SEO
- **Taux de rebond:** Engagement utilisateurs (objectif < 50%)

### Core Web Vitals (Mensuel)
- **LCP (Largest Contentful Paint):** < 2.5s (bon), actuel 5.6s (à améliorer)
- **INP/FID (Interactivité):** < 200ms
- **CLS (Cumulative Layout Shift):** < 0.1 (actuel 0.004 ✅)

**Outils:**
- PageSpeed Insights (Google)
- Lighthouse CI (automatisé `npm run lh:ci`)
- GSC → Core Web Vitals

### Backlinks (Mensuel)
- **Nombre de domaines référents:** Croissance mensuelle
- **Domain Authority (DA):** Autorité site (objectif > 30)
- **Backlinks toxiques:** Désavouer si nécessaire (GSC Disavow Tool)

### Rich Results (Trimestriel)
- **Test Rich Results:** https://search.google.com/test/rich-results
- Vérifier schemas actifs (Organization, LocalBusiness, FAQ)
- Corriger erreurs de balisage JSON-LD

---

## 🛠️ Outils Recommandés

### Gratuits / Essentiels
- **Google Search Console:** Indexation, performances, erreurs
- **Google Analytics 4:** Trafic, conversions, comportement
- **Lighthouse:** Performance, accessibilité, SEO
- **PageSpeed Insights:** Core Web Vitals
- **Mobile-Friendly Test:** Compatibilité mobile
- **Rich Results Test:** Validation structured data

### Payants / Avancés
- **Ahrefs ($99/mois):** Recherche mots-clés, backlinks, concurrence
- **SEMrush ($119/mois):** Audit SEO, suivi positions, content marketing
- **Moz Pro ($99/mois):** Link building, keyword research, rank tracking
- **Screaming Frog ($259/an):** Audit technique complet (crawl)

### SEO Local
- **Google Business Profile:** Gratuit, essentiel pour SEO local Porto-Novo
- **BrightLocal ($49/mois):** Audit local, gestion avis, citations

---

## 🚨 Alertes & Maintenance

### Uptime Monitoring (24/7)
- **Outil:** UptimeRobot (gratuit, 50 monitors)
- **Alertes:** Email/SMS si site down > 5 min
- **Fréquence check:** Toutes les 5 minutes

### PageSpeed Alerts
- **Lighthouse CI:** Automatique sur chaque build
  ```bash
  npm run lh:ci
  ```
- **Seuil alerte:** Performance < 70, LCP > 4s
- **Action:** Investiguer regression (images, scripts)

### Crawl Errors (Hebdomadaire)
- GSC → Couverture → Erreurs
- **Types à surveiller:**
  - 404 (pages introuvables)
  - 403 (accès refusé)
  - 500 (erreurs serveur)
  - Redirections en chaîne

### Backlink Monitoring (Mensuel)
- Ahrefs/Majestic: Nouveau backlinks
- **Vérifier:**
  - Liens toxiques (spam, PBN)
  - Anchor text distribution (éviter sur-optimisation)
  - Liens cassés (demander corrections)

### Logs Serveur (Si Accès)
- Examiner crawl budget Googlebot
- Identifier URLs bloquées par robots.txt
- Repérer erreurs 403/404 non détectées

---

## ✅ Checklist Maintenance Récurrente

### Quotidienne
- [ ] Vérifier uptime site (automatique via UptimeRobot)

### Hebdomadaire
- [ ] Check GSC: nouveaux clics, impressions, erreurs
- [ ] Review GA4: trafic organique, conversions
- [ ] Identifier opportunités contenu (trending topics)

### Mensuelle
- [ ] Audit Core Web Vitals (Lighthouse CI)
- [ ] Analyser backlinks (nouveaux, perdus)
- [ ] Publier 2-4 nouveaux contenus SEO
- [ ] Update ancien contenu performant (refresh dates)

### Trimestrielle
- [ ] Audit SEO complet (Screaming Frog)
- [ ] Test Rich Results (tous schemas)
- [ ] Review stratégie mots-clés (ajuster si besoin)
- [ ] Analyse concurrence (nouveaux players VTC Bénin)

### Annuelle
- [ ] Refonte contenu pages piliers
- [ ] Migration technique si nécessaire (framework upgrade)
- [ ] Réévaluation stratégie backlinks
- [ ] Formation équipe SEO (nouvelles best practices)

---

## 🎯 Objectifs SEO 2025-2026

### Court Terme (3 mois)
- [ ] 10+ backlinks quality (DA > 20)
- [ ] 50+ pages indexées GSC
- [ ] Lighthouse Performance > 70 mobile
- [ ] 500+ sessions/mois trafic organique
- [ ] Position < 10 pour "VTC Porto-Novo"

### Moyen Terme (6 mois)
- [ ] 30+ backlinks, DA site > 25
- [ ] 100+ pages indexées
- [ ] Lighthouse Performance > 85
- [ ] 1500+ sessions/mois organique
- [ ] Top 3 pour "VTC Porto-Novo", "transport Bénin"

### Long Terme (12 mois)
- [ ] 100+ backlinks, DA > 35
- [ ] 200+ pages indexées (blog actif)
- [ ] Lighthouse Performance > 90
- [ ] 5000+ sessions/mois organique
- [ ] Featured snippets pour 5+ requêtes FAQ
- [ ] Expansion Cotonou avec SEO local dédié

---

## 📚 Ressources & Documentations

### Guides Google
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Core Web Vitals](https://web.dev/vitals/)
- [Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### Communautés
- Reddit: r/SEO, r/bigseo
- Twitter: @searchliaison (Google Search), @JohnMu
- Forums: WebmasterWorld, Moz Community

### Blogs à Suivre
- Search Engine Journal
- Moz Blog
- Ahrefs Blog
- Search Engine Land

---

**Dernière mise à jour:** 20 novembre 2025  
**Prochaine révision:** Février 2026  
**Contact SEO:** contact@ticmiton.com
