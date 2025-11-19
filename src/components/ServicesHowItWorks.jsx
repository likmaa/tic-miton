import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Car, Package, ArrowRight, MapPin, Smartphone, CheckCircle, X, Apple, Play } from "lucide-react";
import LINKS from "../config/links";

export default function ServicesHowItWorks() {
  const reduceMotion = useReducedMotion();
  const [showStoreModal, setShowStoreModal] = React.useState(false);

  const cards = [
    {
      id: 1,
      key: "express",
      title: "Courses express",
      desc: "Courses urgentes ou petites commissions gérées rapidement.",
      Icon: Zap,
    },
    {
      id: 2,
      key: "ride",
      title: "Course urbaine ou déplacement",
      desc: "De A à B en toute simplicité, avec estimation du prix.",
      Icon: Car,
    },
    {
      id: 3,
      key: "parcel",
      title: "Livraison de colis",
      desc: "Envoyez des documents et colis en toute sécurité.",
      Icon: Package,
    },
  ];

  // Steps details per service (4 étapes chacune)
  const serviceSteps = {
    express: [
      { title: "Choisir \"Courses express\"", desc: "Sélectionnez le service dans l'app.", Icon: Smartphone },
      { title: "Décrire la commission", desc: "Achat, récupération ou message à remettre.", Icon: CheckCircle },
      { title: "Saisir adresses", desc: "Départ et arrivée ou partagez votre position.", Icon: MapPin },
      { title: "Suivre en temps réel", desc: "Validez et suivez le coursier jusqu'à la livraison.", Icon: CheckCircle },
    ],
    ride: [
      { title: "Départ et destination", desc: "Adresses au Bénin uniquement.", Icon: MapPin },
      { title: "Voir les prix", desc: "Estimation basée sur la distance.", Icon: Smartphone },
      { title: "Confirmer la demande", desc: "Choisissez l'option qui vous convient.", Icon: CheckCircle },
      { title: "Partager et payer", desc: "Partage du trajet et paiement à l'arrivée.", Icon: CheckCircle },
    ],
    parcel: [
      { title: "Choisir \"Livraison de colis\"", desc: "Depuis l'app, section livraison.", Icon: Smartphone },
      { title: "Destinataire & consignes", desc: "Noms, adresses et instructions de remise.", Icon: MapPin },
      { title: "Ajouter une photo (opt)", desc: "Et valeur déclarée si nécessaire.", Icon: Smartphone },
      { title: "Suivi & preuve dépôt", desc: "Notification et confirmation à la fin.", Icon: CheckCircle },
    ],
  };

  const [active, setActive] = React.useState({ express: 0, ride: 0, parcel: 0 });

  const goNext = (key) => {
    setActive((prev) => {
      const next = (prev[key] + 1) % serviceSteps[key].length;
      return { ...prev, [key]: next };
    });
  };

  const containerAnim = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };
  const itemAnim = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-white/80 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header aligné au design Home */}
        <div className="mb-10 md:mb-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3650D0]">Comment ça marche</h2>
            <p className="mt-3 font-sans text-gray-600 text-base max-w-md">
              Les étapes clés pour chaque service, détaillées simplement.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={LINKS.order}
                className="inline-flex items-center gap-2 bg-[#3650D0] text-white px-5 py-3 rounded-md font-sans font-semibold shadow hover:bg-[#2b42b5] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30"
              >
                Commander maintenant
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={LINKS.features.all}
                className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-gray-200 text-gray-700 font-sans text-sm hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20"
              >
                En savoir plus
              </a>
            </div>
          </div>

          {/* Cartes services (alignées comme Home) */}
          <motion.div className="md:col-span-2" initial="hidden" animate="show" variants={reduceMotion ? undefined : containerAnim}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {cards.map((card) => {
                const Icon = card.Icon;
                const steps = serviceSteps[card.key];
                const activeIdx = active[card.key];
                const current = steps[activeIdx];
                const StepIcon = current.Icon || Smartphone;
                return (
                  <motion.article
                    key={card.key}
                    className="bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-start text-left"
                    variants={reduceMotion ? undefined : itemAnim}
                    aria-labelledby={`svc-${card.key}-title`}
                  >
                    <div className="flex items-center gap-6 w-full">
                      {/* Number bubble */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-[#3650D0] text-white flex items-center justify-center font-display font-bold text-2xl">
                          {card.id}
                        </div>
                      </div>
                      {/* Icon circle */}
                      <div className="ml-1">
                        <div className="w-16 h-16 rounded-2xl bg-white/60 border border-gray-100 flex items-center justify-center shadow-sm">
                          <Icon className="w-7 h-7 text-[#3650D0]" aria-hidden />
                        </div>
                      </div>
                    </div>

                    <h3 id={`svc-${card.key}-title`} className="mt-6 font-sans text-2xl md:text-1xl font-bold text-gray-900 leading-tight">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-sans text-gray-600 text-base">
                      {card.desc}
                    </p>

                    {/* Bloc d'étape unique, remplace l'étape courante au clic */}
                    <div className="mt-8">
                      <motion.div
                        key={`${card.key}-step-${activeIdx}`}
                        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="rounded-2xl border border-[#3650D0]/20 bg-[#3650D0]/10 shadow-sm p-5 transition flex flex-col"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white text-[#3650D0] flex items-center justify-center font-sans font-semibold text-sm">
                            {activeIdx + 1}
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                            <StepIcon className="w-5 h-5 text-[#3650D0]" aria-hidden />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="font-sans text-base md:text-lg font-bold text-gray-900 leading-snug">{current.title}</div>
                          {current.desc && <p className="mt-2 text-gray-700 text-sm leading-relaxed">{current.desc}</p>}
                          <div className="mt-4 pt-1">
                            <button
                              type="button"
                              onClick={() => setShowStoreModal(true)}
                              className="inline-flex items-center gap-2 text-[#3650D0] font-semibold hover:underline bg-transparent px-0 py-0 outline-none focus:outline-none ring-0 border-0"
                              aria-label="Ouvrir le modal de stores"
                            >
                              Je veux essayer
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bouton Étape suivante + progression */}
                    <div className="mt-6 w-full flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => goNext(card.key)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20"
                        aria-label={`Aller à l'étape suivante pour ${card.title}`}
                      >
                        Étape suivante
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <span className="ml-4 text-xs md:text-sm text-gray-500 font-sans font-medium">{activeIdx + 1}/{steps.length}</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bande de confiance légère */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 font-sans">Support local 24/7</div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm text-gray-600 font-sans">Prix clairs</div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm text-gray-600 font-sans">Chauffeurs vérifiés</div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={LINKS.downloadUrl}
              className="inline-flex items-center gap-2 bg-[#FF7B00] text-white px-4 py-2 rounded-md text-sm font-sans font-semibold hover:bg-[#e56a00] hover:text-[#FFCA80] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30"
            >
              Télécharger l'app
            </a>
          </div>
        </div>
      </div>
      {/* Store selection modal (même expérience que Hero/ServicesGrid) */}
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
}
