/* eslint-disable no-irregular-whitespace */
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import aboutImage from "../assets/features/Image B10.jpg";


const LONG_TEXT = `
Née à Porto‑Novo, TIC Miton est d'abord une réponse très concrète à un besoin de proximité. 
Au quotidien, nous avons vu des familles, des étudiants, des commerçants et des artisans perdre 
un temps précieux à organiser leurs déplacements, leurs livraisons ou leurs courses. 
Nous avons donc décidé de construire un service pensé d'abord pour la réalité locale : 
fiable, simple à utiliser et surtout aligné avec les habitudes de nos communautés.

Dès les premiers jours, nous avons accompagné nos chauffeurs partenaires pour 
co‑concevoir l'expérience sur le terrain : sécurité des trajets, clarté des tarifs, 
écoute des retours, amélioration continue des outils. Nous avons appris à « faire simple » 
pour aller vite, et à « faire bien » pour durer. 

Petit à petit, l'application a pris forme : commande de trajet en quelques clics, 
notifications claires, suivi transparent, service client réactif. 
En parallèle, nous avons étendu notre proposition de valeur avec des fonctionnalités 
de livraison, de courses rapides et des solutions adaptées aux commerces.

Notre ambition reste humble et déterminée : construire une plateforme de mobilité 
qui crée des opportunités locales et qui renforce les liens entre les personnes et les lieux. 
Chaque nouvelle version est l'occasion d'écouter, d'apprendre et d'itérer, 
avec l'objectif constant de proposer un service sûr, rapide et abordable.

La suite se jouera avec vous : chauffeurs, clientes et clients, partenaires institutionnels 
et acteurs économiques locaux. Ensemble, nous voulons ancrer une mobilité plus 
fluide et plus inclusive, portée par des outils modernes mais façonnés par notre 
réalité béninoise. C'est ainsi que TIC Miton évolue : pas à pas, de manière 
responsable, avec une seule boussole : l'impact utile pour nos communautés.
`;

export default function AboutHistorySection({ className = "" }) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = React.useState(false);
  const contentId = React.useId();

  const containerAnim = reduce
    ? {}
    : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

  return (
    <section className={`py-12 px-6 md:px-12 lg:px-20 ${className}`} aria-labelledby="history-title">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 id="history-title" className="font-display text-3xl md:text-3xl font-extrabold text-brand-blue text-left">
            Notre histoire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Colonne gauche : texte */}
          <motion.div {...containerAnim} className="relative">
            <div
              id={contentId}
              className={`font-sans text-gray-900 leading-relaxed whitespace-pre-line transition-[max-height] duration-300 ease-out overflow-hidden ${
                expanded ? "max-h-[200rem]" : "max-h-44 md:max-h-48"
              }`}
              aria-live="polite"
            >
              {LONG_TEXT}
            </div>

            {/* Dégradé de fin lorsqu'on est tronqué */}
            <AnimatePresence>
              {!expanded && (
                <motion.div
                  key="fade"
                  initial={reduce ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-white/0"
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Bouton Lire plus / Lire moins */}
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans font-semibold text-[#3650D0] bg-white border border-[#3650D0] hover:bg-[#3650D0]/5 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30"
                aria-expanded={expanded}
                aria-controls={contentId}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? (
                  <>
                    Lire moins
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Lire plus
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Colonne droite : image */}
          <div className="w-full">
            <img
              src={aboutImage}
              alt="Illustration de l'histoire de TIC Miton"
              className="w-full h-56 md:h-[22rem] object-cover rounded-2xl border border-gray-100 shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
