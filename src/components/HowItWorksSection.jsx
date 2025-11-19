import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Smartphone, CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import PLACEHOLDER_LINKS from "../config/links";

/*
  HowItWorksSection.jsx
  - Mobile-first : stacked steps centered on small screens, 3-col grid on md+
  - Visuel cohérent avec le Hero : utilises les mêmes fonts/classes (font-display, font-sans)
  - Accessibilité : aria-labels, focus-visible rings
  - Respect prefers-reduced-motion via useReducedMotion
  - CTA secondaire pour "Commander" / "Télécharger"
*/

const steps = [
  {
    id: 1,
    title: "Entrez votre destination",
    desc: "Indiquez où vous voulez aller en quelques secondes.",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Choisissez votre trajet",
    desc: "Course standard, voiture partagée ou livraison, vous décidez.",
    icon: Smartphone,
  },
  {
    id: 3,
    title: "Payez et partez",
    desc: "Paiement sécurisé et confirmation instantanée.",
    icon: CheckCircle,
  },
];

const HowItWorksSection = () => {
  const reduceMotion = useReducedMotion();

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
        {/* Header: titre + intro + CTA */}
        <div className="mb-10 md:mb-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3650D0]">
              Comment ça marche
            </h2>
            <p className="mt-3 font-sans text-gray-600 text-base max-w-md">
              En trois étapes simples, commandez une course ou une livraison.
              Conçu pour être rapide, sûr et abordable à Porto-Novo.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={PLACEHOLDER_LINKS.order}
                className="inline-flex items-center gap-2 bg-[#3650D0] text-white px-5 py-3 rounded-md font-sans font-semibold shadow hover:bg-[#2b42b5] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30"
                aria-label="Commander maintenant"
              >
                Commander maintenant
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PLACEHOLDER_LINKS.features.all}
                className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-gray-200 text-gray-700 font-sans text-sm hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20"
                aria-label="En savoir plus"
              >
                En savoir plus
              </a>
            </div>
          </div>

          {/* Steps grid: on mobile centered stacked, on md occupy 2 columns */}
          <motion.div
            className="md:col-span-2"
            initial="hidden"
            animate="show"
            variants={reduceMotion ? undefined : containerAnim}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.id}
                    className="bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-start text-left"
                    variants={reduceMotion ? undefined : itemAnim}
                    aria-labelledby={`step-${step.id}-title`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      {/* Number bubble */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[#3650D0] text-white flex items-center justify-center font-display font-bold text-lg">
                          {step.id}
                        </div>
                      </div>

                      {/* Icon circle (decorative) */}
                      <div className="ml-1">
                        <div className="w-12 h-12 rounded-lg bg-white/60 border border-gray-100 flex items-center justify-center shadow-sm">
                          <Icon className="w-6 h-6 text-[#3650D0]" aria-hidden />
                        </div>
                      </div>
                    </div>

                    <h3
                      id={`step-${step.id}-title`}
                      className="mt-4 font-display text-lg text-gray-900"
                    >
                      {step.title}
                    </h3>

                    <p className="mt-2 font-sans text-gray-600 text-sm">
                      {step.desc}
                    </p>

                    <div className="mt-4">
                      <a
                        href={PLACEHOLDER_LINKS.order}
                        className="inline-flex items-center gap-2 text-[#3650D0] font-sans text-sm font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20"
                        aria-label={`En savoir plus sur ${step.title}`}
                      >
                        Je veux essayer
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Optional small trust row: icônes + stats */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 font-sans">+10k trajets</div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm text-gray-600 font-sans">Note moyenne 4.8</div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm text-gray-600 font-sans">+20 chauffeurs</div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PLACEHOLDER_LINKS.downloadUrl}
              className="inline-flex items-center gap-2 bg-[#FF7B00] text-white px-4 py-2 rounded-md text-sm font-sans font-semibold hover:bg-[#e56a00] hover:text-[#FFCA80] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30"
            >
              Télécharger l'app
            </a>

            <motion.a
              href={PLACEHOLDER_LINKS.whatsappUrl}
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              className="bg-[#3650D0] text-white px-6 py-2.5 rounded-md font-sans font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-2xl hover:bg-[#2b42b5] transition-all text-sm"
              aria-label="Contacter le support"
            >
              WhatsApp
              <MessageCircle className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
