import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Tag, Zap, LifeBuoy, ArrowRight, X, Apple, Play } from "lucide-react";
import LINKS from "../config/links";
// Responsive, optimized sources via vite-imagetools
import safetyPic from "../assets/features/safety.jpg?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";
import payementPic from "../assets/features/payement.jpg?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";
import puissancePic from "../assets/features/puissance.jpeg?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";
import supportPic from "../assets/features/support.jpg?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";

/*
  FeaturesZSection.jsx
  - Layout "en Z" : 4 lignes (rows). Sur desktop chaque ligne est une rangée
    avec image à gauche / texte à droite pour les lignes impaires, et image à droite
    / texte à gauche pour les lignes paires.
  - Mobile-first : chaque bloc stacké (image au-dessus, texte dessous) pour une lecture simple.
  - Images "réelles" : exemples fournis depuis Unsplash via source.unsplash.com (remplaçables par des fichiers locaux).
  - Chaque avantage est rendu sur plusieurs lignes (j'ai forcé 4 courtes phrases séparées par <br/> pour s'assurer de la structure "4 lignes").
  - Accessibilité : alt text, focus styles, aria-labels, respects prefers-reduced-motion.
  - Dépendances : framer-motion et lucide-react (comme dans ton projet actuel).
*/

const features = [
  {
    id: "safety",
    title: "Sécurité prioritaire",
    // 4 courtes lignes pour garantir l'aspect "quatre lignes" dans la description
    lines: [
      "Vérification complète des chauffeurs.",
      "Trajets suivis en temps réel pour votre tranquillité.",
      "Assistance 24/7 disponible localement.",
      "Politique zéro tolérance pour les comportements à risque.",
    ],
    // Image optimisée responsive
    image: safetyPic,
    alt: "Chauffeur professionnel vérifié",
    Icon: ShieldCheck,
  },
  {
    id: "price",
    title: "Tarifs transparents",
    lines: [
      "Prix affichés avant confirmation.",
      "Pas de frais cachés ni surprises en fin de course.",
      "Promotions régulières pour les trajets fréquents.",
      "Options économiques et partagées disponibles.",
    ],
    image: payementPic,
    alt: "Paiement et reçu clair",
    Icon: Tag,
  },
  {
    id: "speed",
    title: "Rapidité & optimisation",
    lines: [
      "Algorithmes d'optimisation pour réduire l'attente.",
      "Réseau de chauffeurs disponibles rapidement en ville.",
      "Itinéraires optimisés selon le trafic en temps réel.",
      "Délais d'arrivée courts pour vos urgences quotidiennes.",
    ],
    image: puissancePic,
    alt: "Voiture rapide en ville",
    Icon: Zap,
  },
  {
    id: "support",
    title: "Support humain & local",
    lines: [
      "Équipe locale formée pour répondre rapidement.",
      "Support téléphonique et chat intégrés dans l'app.",
      "Gestion des incidents avec suivi personnalisé.",
      "Satisfaction client au cœur de notre service.",
    ],
    image: supportPic,
    alt: "Agent support aidant un client",
    Icon: LifeBuoy,
  },
];

const FeaturesZSection = () => {
  const [showStoreModal, setShowStoreModal] = useState(false);
  const reduceMotion = useReducedMotion();

  const containerVariants = reduceMotion
    ? {}
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      };

  const itemVariants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
      };

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
  <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3650D0]">
            Ce qui nous distingue
          </h2>
          <p className="mt-3 font-sans text-gray-600 max-w-2xl mx-auto">
            Sécurité, prix clairs, rapidité et support humain — tout ce qu'il faut pour voyager en confiance.
          </p>
        </div>

        {/* Liste des features en "Z" */}
        <motion.div
          className="flex flex-col gap-16 md:gap-20"
          initial="hidden"
          animate="show"
          variants={reduceMotion ? undefined : containerVariants}
        >
          {features.map((f, idx) => {
            const isEven = idx % 2 === 1;
            const Icon = f.Icon;

            return (
              <motion.article
                key={f.id}
                className={
                  // mobile: stacked (flex-col), desktop: row with conditional reverse
                  "w-full flex flex-col md:flex-row items-stretch gap-8 md:gap-12 " +
                  (isEven ? "md:flex-row-reverse" : "")
                }
                variants={reduceMotion ? undefined : itemVariants}
                aria-labelledby={`feature-${f.id}-title`}
              >
                {/* Image */}
                <div className="md:w-1/2 w-full flex-shrink-0">
                  <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-lg">
                    {(() => {
                      // Sécuriser l'accès aux données retournées par vite-imagetools (&as=picture)
                      const hasPictureShape = f.image && typeof f.image === 'object' && ("sources" in f.image || "img" in f.image);
                      if (hasPictureShape) {
                        const rawSources = f.image.sources;
                        const sources = Array.isArray(rawSources)
                          ? rawSources
                          : rawSources
                            ? Object.values(rawSources)
                            : [];
                        const img = f.image.img || {};
                        return (
                          <picture>
                            {sources.map((source, idx) => (
                              <source key={idx} type={source.type} srcSet={source.srcset} sizes="(min-width: 1024px) 50vw, 100vw" />
                            ))}
                            <img
                              src={img.src || (typeof f.image === 'string' ? f.image : '')}
                              alt={f.alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                              width={img.w || 1200}
                              height={img.h || 800}
                            />
                          </picture>
                        );
                      }
                      // Fallback sur un simple <img> si ce n'est pas un objet picture
                      return (
                        <img
                          src={typeof f.image === 'string' ? f.image : ''}
                          alt={f.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width="1200"
                          height="800"
                        />
                      );
                    })()}
                  </div>
                </div>

                {/* Texte */}
                <div className="md:w-1/2 w-full flex flex-col justify-center p-2 md:px-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#3650D0] text-white flex items-center justify-center">
                      {Icon && <Icon className="w-6 h-6" aria-hidden="true" />}
                    </div>

                    <h3
                      id={`feature-${f.id}-title`}
                      className="font-display text-xl sm:text-2xl font-bold text-gray-900"
                    >
                      {f.title}
                    </h3>
                  </div>

                  <div className="mt-6 font-sans text-gray-700 text-sm leading-7">
                    {/* Force 4 lines: each entry of lines[] will be on its own line */}
                    {f.lines.map((line, i) => (
                      <p key={i} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8">
                    <a
                      href={LINKS.features?.[f.id] || "#"}
                      className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#3650D0] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20"
                      aria-label={`En savoir plus sur ${f.title}`}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Petit rappel CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowStoreModal(true)}
            className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#3650D0] hover:underline bg-transparent px-0 py-0 outline-none focus:outline-none hover:outline-none ring-0 focus:ring-0 border-0"
            aria-label="Télécharger l'application"
          >
            Télécharger l'app
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Store selection modal */}
      {showStoreModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="store-modal-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowStoreModal(false)} />
          <div className="relative z-50 w-full max-w-md mx-auto rounded-2xl bg-white shadow-xl p-6">
            <button
              type="button"
              className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100"
              aria-label="Fermer"
              onClick={() => setShowStoreModal(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 id="store-modal-title" className="font-display text-xl font-bold text-gray-900">Télécharger l'application</h3>
            <p className="mt-2 text-gray-600">Choisissez votre store pour continuer.</p>
            <div className="mt-5 flex flex-wrap gap-4 items-center">
              <a
                href={LINKS.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir Google Play"
                className="inline-flex items-center gap-2 text-[#3650D0] hover:underline font-semibold"
              >
                <Play className="w-5 h-5" /> Google Play
              </a>
              <a
                href={LINKS.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir l'App Store"
                className="inline-flex items-center gap-2 text-[#FF7B00] hover:underline font-semibold"
              >
                <Apple className="w-5 h-5" /> App Store
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturesZSection;
