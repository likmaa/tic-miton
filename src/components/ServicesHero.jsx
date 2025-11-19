import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CircleDot, Square, X, Navigation, Apple, Play } from "lucide-react";
import LINKS from "../config/links";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

export default function ServicesHero({ baseFare = 500, pricePerKm = 200, currency = "FCFA" }) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [locating, setLocating] = useState(false);
  const [showLocationPill, setShowLocationPill] = useState(true);
  const [pickupSugs, setPickupSugs] = useState([]);
  const [destSugs, setDestSugs] = useState([]);
  const [pickupSugsLoading, setPickupSugsLoading] = useState(false);
  const [destSugsLoading, setDestSugsLoading] = useState(false);
  const pickupTimerRef = useRef(null);
  const destTimerRef = useRef(null);
  const [showStoreModal, setShowStoreModal] = useState(false);

  // Benin bounding box (left,top,right,bottom) in lon,lat
  const BENIN_VIEWBOX = "0.75,12.6,3.95,6.0";

  // Track all pending fetches so we can cancel them
  const controllersRef = useRef(new Set());

  const trackedFetch = async (url, options = {}) => {
    const controller = new AbortController();
    controllersRef.current.add(controller);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      return res;
    } finally {
      controllersRef.current.delete(controller);
    }
  };

  const normalize = (s) => s.trim().toLowerCase();
  const formatPrice = (amount) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(amount)) + " " + currency;

  // Simple distance estimator (km). Replace with real geocoding/distance API later.
  const estimateDistanceKm = (from, to) => {
    const a = normalize(from);
    const b = normalize(to);
    if (!a || !b) return 0;
    if (a === b) return 0;
    const key = `${a}|${b}`;
    const reverseKey = `${b}|${a}`;
    const table = {
      "porto-novo|cotonou": 35,
      "porto-novo|abomey-calavi": 40,
      "porto-novo|ouidah": 60,
      "cotonou|abomey-calavi": 15,
    };
    return table[key] ?? table[reverseKey] ?? 5; // défaut 5 km si inconnu
  };

  const haversineKm = (a, b) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return R * c;
  };

  const tryParseCoords = (text) => {
    const m = text.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (m) return { lat: parseFloat(m[1]), lon: parseFloat(m[2]) };
    return null;
  };

  const geocode = async (q) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&accept-language=fr&countrycodes=BJ&viewbox=${BENIN_VIEWBOX}&bounded=1&q=${encodeURIComponent(q)}&limit=1`;
    try {
      const res = await trackedFetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return null;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      }
      return null;
    } catch {
      return null;
    }
  };

  const searchPlaces = async (q) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&accept-language=fr&countrycodes=BJ&viewbox=${BENIN_VIEWBOX}&bounded=1&q=${encodeURIComponent(q)}&limit=5`;
    try {
      const res = await trackedFetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return [];
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((d) => ({ label: d.display_name, lat: parseFloat(d.lat), lon: parseFloat(d.lon) }));
      }
      return [];
    } catch {
      return [];
    }
  };

  const reverseGeocode = async ({ lat, lon }) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=fr&lat=${lat}&lon=${lon}`;
    try {
      const res = await trackedFetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return null;
      const data = await res.json();
      if (data && data.display_name) return data.display_name;
      return null;
    } catch {
      return null;
    }
  };

  const cancelAll = () => {
    // Abort in-flight fetches
    controllersRef.current.forEach((c) => c.abort());
    controllersRef.current.clear();
    // Clear timers
    if (pickupTimerRef.current) {
      clearTimeout(pickupTimerRef.current);
      pickupTimerRef.current = null;
    }
    if (destTimerRef.current) {
      clearTimeout(destTimerRef.current);
      destTimerRef.current = null;
    }
    // Reset loading states and suggestion lists
    setPickupSugsLoading(false);
    setDestSugsLoading(false);
    setLoadingPrice(false);
    setPickupSugs([]);
    setDestSugs([]);
    setError("");
    // Clear computed price as requested
    setPrice("");
    // Clear input fields
    setPickup("");
    setDestination("");
    setPickupCoords(null);
    setDestinationCoords(null);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée sur votre appareil");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const coords = { lat, lon };
        setPickupCoords(coords);
        // Try to get a readable address; fallback to coordinates string
        reverseGeocode(coords).then((address) => {
          setPickup(address || `${lat.toFixed(5)}, ${lon.toFixed(5)}`);
          setLocating(false);
        });
      },
      () => {
        setError("Impossible d'obtenir la position actuelle");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSeePrice = async () => {
    if (!pickup.trim() || !destination.trim()) {
      setError("Veuillez saisir le départ et la destination");
      setPrice("");
      return;
    }
    setError("");
    setLoadingPrice(true);
    try {
      // Resolve coordinates for pickup
      let from = pickupCoords || tryParseCoords(pickup);
      if (!from) {
        from = await geocode(pickup);
      }
      // Resolve coordinates for destination
      let to = destinationCoords || tryParseCoords(destination);
      if (!to) {
        to = await geocode(destination);
      }

      let km;
      if (from && to) {
        km = haversineKm(from, to);
      } else {
        km = estimateDistanceKm(pickup, destination); // fallback simple
      }
      const total = baseFare + km * pricePerKm;
      setPrice(formatPrice(total));
    } finally {
      setLoadingPrice(false);
    }
  };
  return (
    <section className="bg-white text-brand-blue overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left side: title + booking card */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-sm text-gray-700">
            Porto‑Novo, BJ • <a href="#city" className="underline hover:text-brand-blue">Changer de ville</a>
          </p>

          <motion.h1
            className="mt-3 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-brand-blue"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vos déplacements, simplifiés
          </motion.h1>
          <p className="mt-3 text-gray-700 max-w-2xl">
            Déterminez le prix de votre course et réservez un trajet en quelques secondes avec des chauffeurs fiables et des prix transparents.
          </p>

          {/* booking card */}
          <div className="mt-10 md:mt-20 max-w-xl">
            <div className="relative rounded-2xl shadow-md bg-white p-4 md:p-5">
              {/* floating get-location pill */}
              {showLocationPill && (
                <div className="absolute -top-8 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={locating}
                    aria-busy={locating}
                    className="bg-white shadow-md rounded-xl px-4 py-2 text-sm inline-flex items-center gap-2 hover:bg-gray-50 disabled:opacity-60"
                  >
                    <Navigation className="w-4 h-4 text-gray-800" />
                    <span className="text-gray-900">{locating ? "Localisation..." : "Obtenir la position exacte"}</span>
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-100"
                    aria-label="Fermer"
                    onClick={() => setShowLocationPill(false)}
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}

              {/* connecting line removed per design */}

              {/* pickup */}
              <label className="relative block">
                <span className="sr-only">Lieu de départ</span>
                <span className="absolute left-3 top-3 text-gray-800" aria-hidden>
                  <CircleDot className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="Lieu de départ"
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    setPrice("");
                    setPickupCoords(null);
                    if (pickupTimerRef.current) clearTimeout(pickupTimerRef.current);
                    const q = e.target.value;
                    const coords = tryParseCoords(q);
                    if (!q || q.length < 3 || coords) {
                      setPickupSugs([]);
                      return;
                    }
                    setPickupSugsLoading(true);
                    pickupTimerRef.current = setTimeout(async () => {
                      const results = await searchPlaces(q);
                      setPickupSugs(results);
                      setPickupSugsLoading(false);
                    }, 300);
                  }}
                  className="w-full pl-9 pr-12 py-3 rounded-lg bg-gray-50 border border-brand-blue/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locating}
                  aria-busy={locating}
                  className="absolute right-2 top-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white shadow-sm text-sm text-brand-blue hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:opacity-60"
                >
                  <Navigation className="w-4 h-4" /> Localiser
                </button>
                {/* pickup suggestions */}
                {(pickupSugsLoading || pickupSugs.length > 0) && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-20">
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                      {pickupSugsLoading && (
                        <div className="px-3 py-2 text-sm text-gray-600">Recherche…</div>
                      )}
                      {!pickupSugsLoading && pickupSugs.map((s, i) => (
                        <button
                          key={`${s.lat}-${s.lon}-${i}`}
                          type="button"
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                          onMouseDown={(ev) => ev.preventDefault()}
                          onClick={() => {
                            setPickup(s.label);
                            setPickupCoords({ lat: s.lat, lon: s.lon });
                            setPickupSugs([]);
                            setPrice("");
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              {/* dropoff */}
              <label className="relative block mt-3">
                <span className="sr-only">Destination</span>
                <span className="absolute left-3 top-3 text-gray-800" aria-hidden>
                  <Square className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setPrice("");
                    setDestinationCoords(null);
                    if (destTimerRef.current) clearTimeout(destTimerRef.current);
                    const q = e.target.value;
                    const coords = tryParseCoords(q);
                    if (!q || q.length < 3 || coords) {
                      setDestSugs([]);
                      return;
                    }
                    setDestSugsLoading(true);
                    destTimerRef.current = setTimeout(async () => {
                      const results = await searchPlaces(q);
                      setDestSugs(results);
                      setDestSugsLoading(false);
                    }, 300);
                  }}
                  className="w-full pl-9 pr-3 py-3 rounded-lg bg-gray-50 border border-brand-blue/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                />
                {/* destination suggestions */}
                {(destSugsLoading || destSugs.length > 0) && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-20">
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                      {destSugsLoading && (
                        <div className="px-3 py-2 text-sm text-gray-600">Recherche…</div>
                      )}
                      {!destSugsLoading && destSugs.map((s, i) => (
                        <button
                          key={`${s.lat}-${s.lon}-${i}`}
                          type="button"
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                          onMouseDown={(ev) => ev.preventDefault()}
                          onClick={() => {
                            setDestination(s.label);
                            setDestinationCoords({ lat: s.lat, lon: s.lon });
                            setDestSugs([]);
                            setPrice("");
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              {/* price display */
              }
              <label className="block mt-3">
                <span className="sr-only">Prix</span>
                <input
                  type="text"
                  readOnly
                  aria-label="Prix du trajet"
                  value={price}
                  placeholder="Le prix s'affiche ici"
                  className="w-full px-3 py-3 rounded-lg bg-gray-50 border border-brand-blue/30 text-gray-800 placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                />
              </label>
              {error && (
                <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
              )}

              {/* ctas */}
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSeePrice}
                  disabled={loadingPrice}
                  aria-busy={loadingPrice}
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-5 py-3 rounded-md font-semibold shadow-lg hover:bg-[#e66f00] hover:text-[#FFCA80] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30 w-full sm:w-auto disabled:opacity-60"
                >
                  {loadingPrice ? "Calcul..." : "Voir les prix"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowStoreModal(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue px-5 py-3 rounded-md font-semibold shadow-sm hover:bg-brand-blue/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 w-full sm:w-auto"
                >
                  Réserver
                </button>
                <button
                  type="button"
                  onClick={cancelAll}
                  disabled={!pickup && !destination && !price}
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue px-5 py-3 rounded-md font-medium shadow-sm hover:bg-brand-blue/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
          {/* store modal */}
          {showStoreModal && (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center"
              aria-labelledby="store-modal-title"
              role="dialog"
              aria-modal="true"
            >
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
                <h3 id="store-modal-title" className="font-display text-xl font-bold text-gray-900">
                  Télécharger l'application
                </h3>
                <p className="mt-2 text-gray-600">Choisissez votre store pour continuer la réservation.</p>
                <div className="mt-5 flex flex-wrap gap-4 items-center">
                  <a
                    href={LINKS.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir Google Play"
                    className="inline-flex items-center gap-2 text-brand-blue hover:underline font-semibold"
                  >
                    <Play className="w-5 h-5" /> Google Play
                  </a>
                  <a
                    href={LINKS.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir l'App Store"
                    className="inline-flex items-center gap-2 text-brand-orange hover:underline font-semibold"
                  >
                    <Apple className="w-5 h-5" /> App Store
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right side: illustration */}
        <motion.div className="flex justify-center md:justify-end" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="relative w-full max-w-xl md:max-w-2xl">
            <div className="absolute -inset-6 rounded-3xl blur-3xl bg-gradient-to-tr from-brand-blue/10 to-brand-orange/10" />
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop"
              alt="Chauffeur VTC professionnel au volant"
              className="relative w-full h-[320px] sm:h-[380px] md:h-[460px] object-cover rounded-3xl border border-gray-100 shadow-xl"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
