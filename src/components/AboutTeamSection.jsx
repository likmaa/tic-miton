import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import MalikAvatar from "../assets/features/IMG_2670.jpeg?w=600&format=webp&quality=95";
import DGAvatar from "../assets/features/DG.png?w=600&format=webp&quality=95";
import DGAAvatar from "../assets/features/dga.png?w=600&format=webp&quality=95";
import AdissaAvatar from "../assets/adissa.png?w=600&format=webp&quality=95";
import FeAvatar from "../assets/features/fe.png?w=600&format=webp&quality=95";
import HAvatar from "../assets/features/h.png?w=600&format=webp&quality=95";



const DEFAULT_MEMBERS = [
  {
    id: "m1",
    name: "ACHIROU GAOUSSOU Alabi",
    role: "Co-fondateur & CEO",
    avatar: DGAvatar,
    quote: "Faire avancer le Bénin, un trajet à la fois.",
    bio: `Je suis né et j’ai grandi avec l’envie de régler des problèmes concrets, proches des gens. Avec TIC Miton, mon objectif est simple : bâtir un service de mobilité fiable, humain et ancré dans notre réalité béninoise.

Très tôt, j’ai compris que la technologie n’a de sens que si elle améliore vraiment le quotidien. C’est pourquoi nous avons conçu l’application avec les chauffeurs et les clients, sur le terrain, en écoutant chaque retour. La sécurité, la clarté des tarifs, la qualité de service – ce sont des engagements personnels.

Ce que je veux, c’est une plateforme qui crée de vraies opportunités locales : des revenus plus stables pour les chauffeurs partenaires, des trajets et livraisons plus simples pour les familles, les étudiants et les commerces. Nous avançons pas à pas, avec exigence et humilité, en améliorant l’expérience à chaque version.

Notre promesse n'est pas d'être parfaits, mais d'être sérieux, transparents et constants. Quand il y a un souci, on le règle. Quand il y a une bonne idée, on la teste vite. Et quand ça fonctionne, on le déploie pour tous. C'est ainsi que, jour après jour, nous construisons un service utile, durable et fier d'être d'ici.`,
    instagram: "https://www.instagram.com/dg_tic?igsh=emxnZWtnbTJnOTFn",
  },
  {
    id: "m2",
    name: "ACHIROU WAHIB O. Atanda",
    role: "CTO",
    avatar: DGAAvatar,
    quote: "Faire simple ce qui est complexe.",
    bio: `Je conçois l'architecture et les fondations techniques pour que l'app reste rapide, fiable et sécurisée à toute heure.

Nous investissons dans l'observabilité (logs, métriques, traces), des pipelines CI/CD stables et des revues de code exigeantes. Mon rôle est de réduire la complexité pour l'utilisateur final tout en gardant une base solide côté ingénierie.

Performance, sécurité des données et scalabilité sont nos priorités, sans buzzwords inutiles – uniquement ce qui apporte de la valeur concrète aux chauffeurs et aux clients.`,
    linkedin: "#",
  },
  {
    id: "m3",
    name: "TIDJANI ibouraima Adissa A.",
    role: "Head of Operations & DAF",
    avatar: AdissaAvatar,
    quote: "La qualité naît de la rigueur au quotidien.",
    bio: `Je pilote les opérations terrain et les finances : onboarding chauffeurs, sécurité, couverture des zones, qualité de service et discipline budgétaire.

Nous suivons des indicateurs clés (délais de prise en charge, taux d'annulation, NPS, incidents) et la profitabilité unitaire pour ajuster vite et bien. Mon objectif : une expérience prévisible et sereine, soutenable économiquement.`,
    linkedin: "#",
  },
  {
    id: "m4",
    name: "Magassa HINDA",
    role: "Assistante de Direction",
    avatar: FeAvatar,
    quote: "La méthode et la transparence au service du collectif.",
    bio: `J'organise la vie de l'équipe et les processus : gouvernance, juridique, RH, conformité et communication interne.

Mon rôle est d'aligner tout le monde, de clarifier qui fait quoi et d'assurer un cadre de travail net et respectueux de nos engagements.`,
    linkedin: "#",
  },
  {
    id: "m5",
    name: "HOUEKIN Zoulkifoule",
    role: "Directeur Technique",
    avatar: HAvatar,
    quote: "Construire une base robuste, évolutive et sûre.",
    bio: `Je dirige l'ingénierie au quotidien : qualité du code, fiabilité, sécurité et livraison des fonctionnalités.

Nous itérons par petits incréments, testons sérieusement et monitorons en production pour garantir une expérience stable et performante.`,
    linkedin: "#",
  },
  {
    id: "m6",
    name: "AMINOU Abdoul Malik",
    role: "Customer Success & IT",
    avatar: MalikAvatar,
    quote: "Chaque retour est une opportunité d'amélioration.",
    bio: `J'accompagne nos utilisateurs et gère l'IT au quotidien : support humain, outils internes et documentation.

Chaque retour est tracé et transforme nos parcours. L'objectif : des réponses rapides, claires, et des améliorations visibles à chaque version.`,
    linkedin: "#",
  },
];

const FocusTrap = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement;
    // focus the dialog
    firstRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // trap focus between firstRef and lastRef
        if (e.shiftKey) {
          if (document.activeElement === firstRef.current) {
            e.preventDefault();
            lastRef.current.focus();
          }
        } else {
          if (document.activeElement === lastRef.current) {
            e.preventDefault();
            firstRef.current.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousActive?.focus?.();
    };
  }, [isOpen, onClose]);

  // render children with accessible wrappers and refs
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        className="relative z-10 max-w-2xl w-full bg-white rounded-2xl border border-gray-100 shadow-2xl p-6"
        aria-labelledby="team-modal-title"
      >
        {/* invisible focusable start */}
        <button ref={firstRef} className="sr-only" aria-hidden />
        {children}
        {/* invisible focusable end */}
        <button ref={lastRef} className="sr-only" aria-hidden />
      </div>
    </div>
  );
};

const AboutTeamSection = ({ members = DEFAULT_MEMBERS, className = "" }) => {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(null);

  // Auto-pause on hover/focus removed per request: scroll is permanent unless manually paused
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const paused = (reduceMotion && !playRequested) || isManuallyPaused;
  const toggleManual = () => {
    // If currently paused due to reduced motion, allow play
    if (reduceMotion && !playRequested) {
      setPlayRequested(true);
      setIsManuallyPaused(false);
      return;
    }
    setIsManuallyPaused((v) => !v);
  };
  const openProfile = (member) => setSelected(member);
  const closeProfile = () => setSelected(null);

  // CEO spotlight: choose CEO by role else first
  const ceo = members.find((m) => /\bceo\b/i.test(m.role)) || members[0];
  const marqueeMembers = members.filter((m) => m !== ceo);
  const [ceoExpanded, setCeoExpanded] = useState(false);
  const ceoContentId = React.useId();
  const TeamCard = ({ m }) => (
    <article
      role="button"
      tabIndex={0}
      onClick={() => openProfile(m)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProfile(m);
        }
      }}
      className="w-[16rem] sm:w-[18rem] md:w-[20rem] flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/20"
      aria-labelledby={`team-${m.id}-title`}
    >
      <div className="flex items-center gap-4 w-full">
        <img
          src={m.avatar}
          alt={`${m.name} avatar`}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm scale-110"
          loading="lazy"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div id={`team-${m.id}-title`} className="text-base font-semibold font-display text-gray-900">{m.name}</div>
              <div className="text-sm text-gray-500 font-sans">{m.role}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600 font-sans line-clamp-3">{m.quote}</p>

      <div className="mt-3 w-full flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); openProfile(m); }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-sans font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
        >
          Voir le profil
        </button>

        {m.linkedin && (
          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Lien LinkedIn de ${m.name}`}
          >
            LinkedIn →
          </a>
        )}
        {m.instagram && (
          <a
            href={m.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Lien Instagram de ${m.name}`}
          >
            Instagram →
          </a>
        )}
      </div>
    </article>
  );

  return (
    <section className={`team bg-white py-16 px-6 md:px-12 lg:px-20 ${className}`} aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-8 text-center md:text-left">
          <p className="text-sm text-brand-orange font-sans mb-2">Rencontrez l'équipe</p>
          <h2 id="team-heading" className="font-display text-3xl md:text-4xl lg:text-3xl font-extrabold text-brand-blue">
            Une équipe jeune & passionnée
          </h2>
          <p className="mt-3 text-gray-900 font-sans max-w-2xl">
            Les personnes derrière TIC Miton : opérationnels, ingénieurs, designers et support — tous focalisés sur une mobilité de qualité et locale.
          </p>
        </div>

        {/* CEO spotlight */}
        {ceo && (
          <div className="mb-10 rounded-2xl border border-gray-100 bg-white shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
            <img
              src={ceo.avatar}
              alt={`${ceo.name} avatar`}
              className="w-full md:w-64 h-64 md:h-64 object-cover rounded-2xl border border-white shadow"
              loading="lazy"
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-blue">{ceo.name}</h3>
                  <div className="text-sm text-gray-900 mt-1">{ceo.role}</div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  {ceo.linkedin && (
                    <a
                      href={ceo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold text-brand-blue bg-white border border-brand-blue hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30"
                    >
                      LinkedIn
                    </a>
                  )}
                  {ceo.instagram && (
                    <a
                      href={ceo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold text-brand-blue bg-white border border-brand-blue hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30"
                    >
                      Instagram
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openProfile(ceo)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold text-brand-blue bg-white border border-brand-blue hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30"
                  >
                    Voir le profil
                  </button>
                </div>
              </div>
              <div className="mt-3 relative">
                <div
                  id={ceoContentId}
                  className={`text-gray-700 font-sans leading-relaxed text-sm md:text-base whitespace-pre-line transition-[max-height] duration-300 ease-out overflow-hidden ${
                    ceoExpanded ? "max-h-[200rem]" : "max-h-28 md:max-h-32"
                  }`}
                >
                  {ceo.bio}
                </div>
                {!ceoExpanded && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-white/0"
                  />
                )}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm font-semibold text-brand-blue bg-white border border-brand-blue hover:bg-brand-blue/5 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30"
                    aria-expanded={ceoExpanded}
                    aria-controls={ceoContentId}
                    onClick={() => setCeoExpanded((v) => !v)}
                  >
                    {ceoExpanded ? "Lire moins" : "Lire plus"}
                  </button>
                  <div className="md:hidden flex items-center gap-2">
                    {ceo.linkedin && (
                      <a
                        href={ceo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold text-brand-blue bg-white border border-brand-blue hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30"
                      >
                        LinkedIn
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openProfile(ceo)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold text-brand-blue bg-white border border-brand-blue hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30"
                    >
                      Voir le profil
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 hidden md:hidden" />
            </div>
          </div>
        )}

        {/* Fade overlays left/right */}
        <div className="overflow-hidden relative">
          <div
            className={`flex gap-6 will-change-transform ${paused ? "paused" : ""}`}
            style={{ ["--marquee-duration"]: "28s", ["--marquee-direction"]: "normal", animationPlayState: paused ? "paused" : "running" }}
          >
            <div className="marquee-track inline-flex gap-6" role="list">
              {marqueeMembers.map((m) => (
                <div key={`a-${m.id}`} role="listitem">
                  <TeamCard m={m} />
                </div>
              ))}
            </div>
            <div className="marquee-track inline-flex gap-6" role="list">
              {marqueeMembers.map((m) => (
                <div key={`b-${m.id}`} role="listitem">
                  <TeamCard m={m} />
                </div>
              ))}
            </div>
          </div>

          {/* left/right fades */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10"
            style={{
              background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10"
            style={{
              background: "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
          />

          {/* Controls (play/pause) near the scrolling line */}
          <button
            aria-pressed={isManuallyPaused}
            onClick={toggleManual}
            onMouseEnter={(e) => { e.stopPropagation(); }}
            onMouseLeave={(e) => { e.stopPropagation(); }}
            onFocus={(e) => { e.stopPropagation(); }}
            onBlur={(e) => { e.stopPropagation(); }}
            className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-2 bg-white/90 text-gray-900 px-3 py-2 rounded-full shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/20"
          >
            {isManuallyPaused ? (
              <>
                <Play className="w-4 h-4" aria-hidden />
                <span className="text-sm font-sans">Lire</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" aria-hidden />
                <span className="text-sm font-sans">Pause</span>
              </>
            )}
          </button>
        </div>

        {/* Modal for profile (simple, reliable conditional + portal) */}
        {selected &&
          createPortal(
            <div className="fixed inset-0 z-[9999]">
              <FocusTrap isOpen={!!selected} onClose={closeProfile}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <img
                      src={selected.avatar}
                      alt={`${selected.name} avatar`}
                      className="w-full rounded-xl object-cover h-64"
                      loading="lazy"
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 id="team-modal-title" className="font-display text-xl font-bold text-gray-900">
                          {selected.name}
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">{selected.role}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        {selected.linkedin && (
                          <a
                            href={selected.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-700 font-semibold"
                          >
                            Voir sur LinkedIn
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={closeProfile}
                          className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
                          aria-label="Fermer le profil"
                        >
                          Fermer
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900">Sa pensée</h4>
                      <div className="mt-2 text-gray-700 font-sans text-sm leading-relaxed whitespace-pre-line">
                        {selected.bio}
                      </div>
                    </div>
                  </div>
                </div>
              </FocusTrap>
            </div>,
            document.body
          )}
      </div>

      {/* Inline styles for marquee animation (scoped to .team) */}
      <style>{`
        .team .overflow-hidden > .flex { display: flex; }
        .team .overflow-hidden > .flex {
          animation-name: team-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: var(--marquee-duration, 28s);
          animation-direction: var(--marquee-direction, normal);
        }
        .team .paused { animation-play-state: paused !important; }
        @keyframes team-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .team .overflow-hidden > .flex { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default AboutTeamSection;
