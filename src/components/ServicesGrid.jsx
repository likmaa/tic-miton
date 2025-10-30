import React, { useState } from "react";
import { motion } from "framer-motion";
import { Car, Package, Zap, ArrowRight, X, Apple, Play } from "lucide-react";
import LINKS from "../config/links";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

export default function ServicesGrid() {
  const [showStoreModal, setShowStoreModal] = useState(false);
  const services = [
    {
      title: "Courses express",
      desc: "Courses urgentes, achats ou petites commissions, livrés rapidement.",
      icon: Zap,
      cta: "Réserver une course",
    },
    {
      title: "Course urbaine ou déplacement",
      desc: "Déplacement d'un point A d'embarquement à au moins un point B de débarquement.",
      icon: Car,
      cta: "Réserver un déplacement",
    },
    {
      title: "Livraison de colis",
      desc: "Colis et documents livrés à temps, en toute sécurité.",
      icon: Package,
      cta: "Envoyer un colis",
    },
  ];

  return (
    <section id="services" className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#3650D0]">Ce que nous offrons</h2>
          <p className="mt-3 text-gray-700">Des services clairs, pensés pour simplifier votre quotidien. Choisissez, réservez, démmarrez.</p>
        </motion.div>

  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-md bg-[#3650D0]/10 text-[#3650D0]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{s.title}</h3>
                    <p className="mt-2 text-gray-600">{s.desc}</p>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setShowStoreModal(true)}
                        className="inline-flex items-center gap-2 text-[#3650D0] hover:underline font-semibold bg-transparent px-0 py-0 outline-none focus:outline-none hover:outline-none ring-0 focus:ring-0 hover:ring-0 border-0 hover:border-transparent rounded-md appearance-none"
                        aria-label={`${s.cta}`}
                      >
                        {s.cta} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
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
      </div>
    </section>
  );
}
