import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { getStoreUrl, trackEvent } from "../utils/storeRedirect";
import PLACEHOLDER_LINKS from "../config/links";

/*
  FAQSection.jsx
  - Accordion FAQ accessible et keyboard-friendly.
  - Mobile-first, responsive layout, visuel cohérent (fonts: font-display / font-sans).
  - Respecte prefers-reduced-motion (désactive les animations si demandé).
  - Comportement:
    - Une seule question ouverte à la fois (mode "single open"). Tu peux facilement adapter pour permettre plusieurs ouvertures.
    - Navigation clavier : ↑ ↓ Home End pour naviguer entre les entêtes; Entrée / Espace pour ouvrir/fermer.
  - Personnalisation:
    - Props: items (array de { id, q, a }), className
    - Couleurs: utilise brand-blue pour accents et brand-orange si besoin pour CTA.
*/

const DEFAULT_ITEMS = [
  {
    id: "faq-1",
    q: "Comment commander un trajet ?",
    a:
      "Ouvrez l'application, entrez votre point de départ et votre destination, choisissez le type de course puis confirmez. Le temps d'arrivée estimé et le prix s'affichent avant confirmation.",
  },
  {
    id: "faq-2",
    q: "Quels moyens de paiement sont acceptés ?",
    a:
      "Nous acceptons les paiements par carte bancaire, mobile money (selon disponibilité locale) et paiement en espèces. Les options disponibles s'affichent lors de la réservation.",
  },
  {
    id: "faq-3",
    q: "Comment puis‑je devenir chauffeur pour TIC Miton ?",
    a:
      "Rendez-vous sur la page 'Devenir chauffeur' depuis le menu ou notre site web, remplissez le formulaire et soumettez les documents requis. Notre équipe vous contactera pour la validation et la formation locale.",
  },
  {
    id: "faq-4",
    q: "Comment est assurée la sécurité pendant les trajets ?",
    a:
      "Tous nos chauffeurs sont vérifiés, chaque trajet peut être partagé en temps réel et nous proposons une assistance 24/7. Nous encourageons également les retours pour améliorer continuellement la sécurité.",
  },
  {
    id: "faq-5",
    q: "Dans quelles villes êtes‑vous disponibles ?",
    a:
      "Nous opérons actuellement à Porto‑Novo et les environs. Nous annonçons chaque nouvelle ville via l'application et nos canaux officiels.",
  },
  {
    id: "faq-6",
    q: "Puis‑je annuler une commande ?",
    a:
      "Oui. L'annulation est gratuite tant qu'aucun chauffeur ne vous a été attribué. Une fois le chauffeur en route, des frais symboliques peuvent s'appliquer pour dédommager le déplacement.",
  },
  {
    id: "faq-7",
    q: "Que faire si j'ai oublié un objet dans le véhicule ?",
    a:
      "Ouvrez l'application > Historique des trajets > Sélectionnez le trajet concerné > 'Objet perdu'. Nous contactons le chauffeur et facilitons la restitution. Vous pouvez aussi joindre notre support 24/7.",
  },
  {
    id: "faq-8",
    q: "Comment partager mon trajet en temps réel ?",
    a:
      "Depuis l'écran de course, appuyez sur 'Partager le trajet' pour envoyer un lien suivi à vos proches (SMS, WhatsApp, etc.). Ils verront votre position et l'heure d'arrivée estimée en direct.",
  },
  {
    id: "faq-9",
    q: "Comment utiliser un code promo ?",
    a:
      "Rendez‑vous dans Profil > Promotions > 'Ajouter un code'. Le code valide s'applique automatiquement à votre prochaine course éligible.",
  },
  {
    id: "faq-10",
    q: "Comment contacter l'assistance ?",
    a:
      "Depuis l'application: Profil > Aide, ou via la page Contact de notre site. Support disponible par chat et téléphone, 7j/7 (horaires étendus).",
  },
  {
    id: "faq-11",
    q: "Comment sont traitées mes données personnelles ?",
    a:
      "Nous appliquons une politique de confidentialité stricte: données chiffrées en transit et au repos, conservation limitée, et aucun partage sans consentement explicite. Consultez 'Confidentialité' dans l'app.",
  },
  {
    id: "faq-12",
    q: "Proposez‑vous des livraisons de colis ?",
    a:
      "Oui, sélectionnez l'option Livraison lors de la commande. Indiquez l'adresse d'enlèvement et de dépôt; le suivi et la confirmation de remise sont inclus.",
  },
];

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
  headerRef,
  reducedMotion,
}) => {
  const contentId = `${item.id}-content`;
  const headerId = `${item.id}-header`;

  return (
    <div className="border-b border-gray-100 last:border-b-0" key={item.id}>
      <h3>
        <button
          id={headerId}
          ref={(el) => (headerRef.current[index] = el)}
          aria-controls={contentId}
          aria-expanded={isOpen}
          onClick={() => onToggle(index)}
          className="w-full text-left px-4 py-5 md:px-6 md:py-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/20"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="font-sans text-base md:text-lg text-gray-900 font-semibold">
                {item.q}
              </span>
            </div>
          </div>

          {/* chevron / indicator */}
          <span
            aria-hidden="true"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 ${isOpen ? "bg-brand-blue text-white" : "bg-white text-gray-600"
              }`}
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                }`}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={reducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={reducedMotion ? {} : { height: "auto", opacity: 1 }}
            exit={reducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: "easeOut" }}
            className="px-4 md:px-6 pb-6 text-gray-700"
          >
            <div className="pt-2 font-sans text-sm leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = ({ items = DEFAULT_ITEMS, className = "" }) => {
  const reducedMotion = useReducedMotion();
  // Support multiple open items
  const [openedIds, setOpenedIds] = useState(new Set([items[0]?.id]));

  // Refs for keyboard navigation
  const headerRef = useRef([]);

  useEffect(() => {
    headerRef.current = headerRef.current.slice(0, items.length);
  }, [items.length]);

  const toggle = (id) => {
    setOpenedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const openAll = () => setOpenedIds(new Set(items.map((it) => it.id)));
  const closeAll = () => setOpenedIds(new Set());

  // Keyboard navigation handler
  const onHeaderKeyDown = (e, currentIndex) => {
    const key = e.key;
    const max = items.length - 1;

    const focusIndex = (i) => {
      const el = headerRef.current[i];
      if (el && typeof el.focus === "function") el.focus();
    };

    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        focusIndex(currentIndex === max ? 0 : currentIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusIndex(currentIndex === 0 ? max : currentIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(max);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        toggle(items[currentIndex].id);
        break;
      default:
        break;
    }
  };

  // Schema.org FAQ Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(it => ({
      "@type": "Question",
      "name": it.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": it.a
      }
    }))
  };

  return (
    <section className={`bg-white py-16 px-6 md:px-12 lg:px-20 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="section-badge opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <Sparkles className="w-4 h-4" />
            Aide & FAQ
          </div>
          <h2 className="section-title text-brand-blue font-bold tracking-tight mb-4 sm:mb-6">
            Questions fréquentes (FAQ)
          </h2>
          <p className="mt-3 font-sans text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement des réponses à vos questions les plus courantes sur l'utilisation de TIC Miton.
          </p>

          {/* Global Controls */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={openAll}
              className="text-sm font-sans font-semibold text-brand-blue hover:text-brand-orange transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-blue/5 hover:bg-brand-blue/10"
            >
              Tout ouvrir
            </button>
            <button
              onClick={closeAll}
              className="text-sm font-sans font-semibold text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              Tout fermer
            </button>
          </div>
        </div>

        {/* Grid disposition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {items.map((it, idx) => {
            const isOpen = openedIds.has(it.id);
            return (
              <div key={it.id} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
                <h3>
                  <button
                    id={`${it.id}-header`}
                    ref={(el) => (headerRef.current[idx] = el)}
                    aria-controls={`${it.id}-content`}
                    aria-expanded={isOpen}
                    onClick={() => toggle(it.id)}
                    onKeyDown={(e) => onHeaderKeyDown(e, idx)}
                    className="w-full text-left px-4 py-5 md:px-6 md:py-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/20 group"
                  >
                    <span className={`font-sans font-bold transition-colors ${isOpen ? "text-brand-blue" : "text-gray-900 group-hover:text-brand-blue"}`}>
                      {it.q}
                    </span>

                    {/* Icône + / - */}
                    <span
                      aria-hidden="true"
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all ${isOpen
                        ? "bg-brand-blue text-white border-brand-blue rotate-180"
                        : "bg-white text-gray-600 border-gray-200"
                        }`}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 10h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        {!isOpen && (
                          <path d="M10 5v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        )}
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${it.id}-content`}
                      role="region"
                      aria-labelledby={`${it.id}-header`}
                      key={`${it.id}-panel`}
                      initial={reducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={reducedMotion ? {} : { height: "auto", opacity: 1 }}
                      exit={reducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="px-4 md:px-6 pb-6 text-gray-700"
                    >
                      <div className="pt-2 font-sans text-sm leading-relaxed border-t border-gray-100 mt-1 pt-4">
                        {it.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA bas de section comme dans la maquette */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <motion.a
            href={PLACEHOLDER_LINKS.whatsappUrl}
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            className="bg-brand-blue text-white px-8 py-4 rounded-md font-sans font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:bg-[#2b42b5] transition-all"
            aria-label="Contacter le support TIC Miton"
          >
            Contact WhatsApp
            <MessageCircle className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={PLACEHOLDER_LINKS.passengerAppUrl}
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            className="bg-white text-black px-8 py-4 rounded-md font-sans font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all"
            aria-label="Télécharger l'application Passager"
          >
            Télécharger Passager
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
