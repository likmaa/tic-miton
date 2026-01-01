import React from "react";
import { motion } from "framer-motion";
import { Car, Package, Zap, ArrowRight, Sparkles } from "lucide-react";
import LINKS from "../config/links";
import { getStoreUrl, trackEvent } from "../utils/storeRedirect";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

export default function ServicesGrid() {
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

  const handleBooking = (ctaLabel) => {
    const target = getStoreUrl({
      playStoreUrl: LINKS.playStoreUrl,
      appStoreUrl: LINKS.appStoreUrl,
      fallback: LINKS.downloadUrl
    });
    trackEvent('cta_click', { source: 'services_grid', label: ctaLabel, resolved: target });
    window.location.href = target;
  };

  return (
    <section id="services" className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <div className="section-badge opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <Sparkles className="w-4 h-4" />
            Nos Offres
          </div>
          <h2 className="section-title text-brand-blue mb-4">
            Nos services à votre disposition
          </h2>
          <p className="mt-3 text-gray-700">Des services clairs, pensés pour simplifier votre quotidien. Choisissez, réservez, démarrez.</p>
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
                  <div className="p-3 rounded-md bg-brand-blue/10 text-brand-blue">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{s.desc}</p>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => handleBooking(s.cta)}
                        className="inline-flex items-center gap-2 text-brand-blue hover:underline font-semibold bg-transparent px-0 py-0 outline-none focus:outline-none hover:outline-none ring-0 focus:ring-0 hover:ring-0 border-0 hover:border-transparent rounded-md appearance-none"
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
      </div>
    </section>
  );
}
