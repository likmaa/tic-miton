import React, { useState, useRef } from "react";
import LINKS from "../config/links";



const initialState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  licenseNumber: "",
  plateNumber: "",
  note: "",
  consent: false,
};

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf", "image/webp"];

const FilePreview = ({ file, onRemove }) => {
  const isImage = file.type && file.type.startsWith("image/");
  return (
  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md p-2">
      {isImage ? (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-12 h-12 object-cover rounded"
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded text-sm text-gray-600 border border-gray-200">
          PDF
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{file.name}</div>
        <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-sm text-red-600 hover:underline"
        aria-label={`Retirer ${file.name}`}
      >
        Supprimer
      </button>
    </div>
  );
};

const DriverRecruitmentForm = ({ apiEndpoint = null, onSuccess, className = "" }) => {
  
  const [form, setForm] = useState(initialState);
  const [idFile, setIdFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | uploading | success | error
  const [progress, setProgress] = useState(0);
  const xhrRef = useRef(null);

  // Basic validations
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Nom complet requis";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email valide requis";
    if (!form.phone.trim() || form.phone.trim().length < 6) e.phone = "Téléphone valide requis";
    if (!form.city.trim()) e.city = "Ville requise";
    if (!form.licenseNumber.trim()) e.licenseNumber = "Numéro de permis requis";
    if (!form.plateNumber.trim()) e.plateNumber = "Immatriculation requise";
    if (!idFile) e.idFile = "Pièce d'identité requise";
    if (!licenseFile) e.licenseFile = "Permis de conduire requis";
    if (!form.consent) e.consent = "Vous devez accepter le traitement des données";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFile = (setter, file) => {
    if (!file) return;
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, files: "Format non supporté (png, jpg, webp, pdf)" }));
      return;
    }
    setter(file);
    setErrors((prev) => ({ ...prev, files: undefined }));
  };

  

  const removeIdFile = () => setIdFile(null);
  const removeLicenseFile = () => setLicenseFile(null);

  const reset = () => {
    setForm(initialState);
    setIdFile(null);
    setLicenseFile(null);
    
    setErrors({});
    setStatus({ state: "idle", message: "" });
    setProgress(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      window.scrollTo && window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }
    // If no API endpoint is configured (e.g., GitHub Pages), fall back to a mailto to support
    if (!apiEndpoint) {
      const to = LINKS.supportEmail || "support@ticmiton.com";
      const subject = `Nouvelle candidature chauffeur — ${form.fullName} — ${form.city}`;
      const body = [
        `Nom complet: ${form.fullName}`,
        `Email: ${form.email}`,
        `Téléphone: ${form.phone}`,
        `Ville: ${form.city}`,
        `Numéro de permis: ${form.licenseNumber}`,
        `Immatriculation: ${form.plateNumber}`,
        `Note: ${form.note || "(aucune)"}`,
        "",
        "Pièces jointes: (non jointes via mailto). Le candidat a sélectionné des fichiers dans le formulaire.",
      ].join("\n");

      const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Give UX feedback then trigger mail client
      setStatus({ state: "success", message: "Ouverture de votre client e‑mail… Vous pouvez envoyer la candidature." });
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 200);

      // We keep the form values so the user can try à nouveau si besoin
      return;
    }

    // Otherwise, send to API endpoint with files (requires backend)
    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("city", form.city);
    data.append("licenseNumber", form.licenseNumber);
    data.append("plateNumber", form.plateNumber);
    data.append("note", form.note);
    data.append("consent", form.consent ? "1" : "0");
    if (idFile) data.append("idFile", idFile, idFile.name);
    if (licenseFile) data.append("licenseFile", licenseFile, licenseFile.name);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open("POST", apiEndpoint, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
    };
    xhr.onloadstart = () => { setStatus({ state: "uploading", message: "Envoi en cours..." }); setProgress(0); };
    xhr.onerror = () => { setStatus({ state: "error", message: "Erreur réseau. Réessayez." }); };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let resp = {};
        try { resp = JSON.parse(xhr.responseText || "{}"); } catch { resp = { ok: true, message: "Candidature reçue." }; }
        setStatus({ state: "success", message: resp.message || "Candidature envoyée. Nous vous contacterons." });
        setProgress(100);
        onSuccess && onSuccess(resp);
        setTimeout(() => reset(), 1800);
      } else {
        let resp = {};
        try { resp = JSON.parse(xhr.responseText || "{}"); } catch { resp = {}; }
        setStatus({ state: "error", message: resp.message || `Erreur serveur (${xhr.status}).` });
      }
    };
    xhr.send(data);
  };

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setStatus({ state: "idle", message: "Envoi annulé." });
      setProgress(0);
    }
  };

  return (
    <section className={`bg-white py-12 px-6 md:px-12 lg:px-20 ${className}`} aria-labelledby="recruit-heading">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h2 id="recruit-heading" className="font-display text-3xl md:text-4xl font-extrabold text-brand-blue">
            Devenir chauffeur partenaire
          </h2>
          <p className="mt-2 text-gray-900 font-sans max-w-2xl mx-auto">
            Remplissez ce formulaire et notre équipe reviendra vers vous rapidement pour la validation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-sans">Nom complet</span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`mt-2 p-3 bg-gray-50 rounded-lg border font-sans ${errors.fullName ? "border-red-400" : "border-[#3650D0]/30"} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30`}
                placeholder="Ex: Amadou Kouassi"
                required
              />
              {errors.fullName && <div className="text-xs text-red-600 mt-1">{errors.fullName}</div>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-sans">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`mt-2 p-3 bg-gray-50 rounded-lg border font-sans ${errors.email ? "border-red-400" : "border-[#3650D0]/30"} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30`}
                placeholder="exemple@domain.com"
                required
              />
              {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-sans">Téléphone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`mt-2 p-3 bg-gray-50 rounded-lg border font-sans ${errors.phone ? "border-red-400" : "border-[#3650D0]/30"} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30`}
                placeholder="+229 01 XX XX XX XX"
                required
              />
              {errors.phone && <div className="text-xs text-red-600 mt-1">{errors.phone}</div>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-sans">Ville</span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`mt-2 p-3 bg-gray-50 rounded-lg border font-sans ${errors.city ? "border-red-400" : "border-[#3650D0]/30"} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30`}
                placeholder="Porto‑Novo"
                required
              />
              {errors.city && <div className="text-xs text-red-600 mt-1">{errors.city}</div>}
            </label>
          </fieldset>

          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col md:col-span-1">
              <span className="text-sm text-gray-700 font-sans">Numéro de permis</span>
              <input
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
                className={`mt-2 p-3 bg-gray-50 rounded-lg border font-sans ${errors.licenseNumber ? "border-red-400" : "border-[#3650D0]/30"} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30`}
                placeholder="Ex: AB123456"
                required
              />
              {errors.licenseNumber && <div className="text-xs text-red-600 mt-1">{errors.licenseNumber}</div>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-sans">Immatriculation</span>
              <input
                name="plateNumber"
                value={form.plateNumber}
                onChange={handleChange}
                className={`mt-2 p-3 bg-gray-50 rounded-lg border font-sans ${errors.plateNumber ? "border-red-400" : "border-[#3650D0]/30"} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30`}
                placeholder="Ex: AB-1234"
                required
              />
              {errors.plateNumber && <div className="text-xs text-red-600 mt-1">{errors.plateNumber}</div>}
            </label>
          </fieldset>

          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <label className="flex flex-col md:col-span-1">
              <span className="text-sm text-gray-700 font-sans">Pièce d'identité (photo / PDF)</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFile(setIdFile, e.target.files[0])}
                className="mt-2 p-2 bg-[#3650D0]/5 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 file:mr-3 file:rounded-md file:border-0 file:bg-[#3650D0] file:text-white file:px-4 file:py-2 file:font-sans file:font-semibold hover:file:bg-[#2f46c1]"
                aria-required
              />
              {idFile && <div className="mt-3"><FilePreview file={idFile} onRemove={removeIdFile} /></div>}
              {errors.idFile && <div className="text-xs text-red-600 mt-1">{errors.idFile}</div>}
            </label>

            <label className="flex flex-col md:col-span-1">
              <span className="text-sm text-gray-700 font-sans">Permis de conduire (photo / PDF)</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFile(setLicenseFile, e.target.files[0])}
                className="mt-2 p-2 bg-[#3650D0]/5 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 file:mr-3 file:rounded-md file:border-0 file:bg-[#3650D0] file:text-white file:px-4 file:py-2 file:font-sans file:font-semibold hover:file:bg-[#2f46c1]"
                aria-required
              />
              {licenseFile && <div className="mt-3"><FilePreview file={licenseFile} onRemove={removeLicenseFile} /></div>}
              {errors.licenseFile && <div className="text-xs text-red-600 mt-1">{errors.licenseFile}</div>}
            </label>
          </fieldset>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700 font-sans">Note (optionnel)</span>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={4}
              className="mt-2 p-3 bg-gray-50 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30"
              placeholder="Indiquez vos disponibilités ou autres informations utiles..."
            />
          </label>

          <div className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              J'accepte que mes données soient utilisées pour le recrutement selon la <a className="underline" href="#privacy">politique de confidentialité</a>.
            </label>
          </div>
          {errors.consent && <div className="text-xs text-red-600 mt-1">{errors.consent}</div>}

          {/* submission area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <button
                type="submit"
                disabled={status.state === "uploading"}
                className="inline-flex items-center gap-3 bg-[#FF7B00] text-white px-5 py-3 rounded-md font-sans font-semibold shadow-lg hover:bg-[#e66f00] transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30"
              >
                {status.state === "uploading" ? `Envoi... (${progress}%)` : "Envoyer ma candidature"}
              </button>

              {status.state === "uploading" && (
                <button
                  type="button"
                  onClick={cancelUpload}
                  className="ml-3 text-sm text-red-600 hover:underline"
                >
                  Annuler
                </button>
              )}
            </div>

            <div className="w-full sm:w-1/2">
              <div aria-live="polite" className="text-sm text-gray-700">
                {status.state === "success" && <span className="text-emerald-600">{status.message}</span>}
                {status.state === "error" && <span className="text-red-600">{status.message}</span>}
                {status.state === "idle" && <span>Nous reviendrons vers vous sous 48h ouvrées.</span>}
              </div>

              {/* progress bar */}
              {status.state === "uploading" && (
                <div className="mt-3 h-2 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-[#FF7B00] transition-all"
                    style={{ width: `${progress}%` }}
                    aria-hidden
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DriverRecruitmentForm;