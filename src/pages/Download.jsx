import React, { useEffect, useMemo, useState } from "react";
import SEO from "../components/SEO";
import PLACEHOLDER_LINKS from "../config/links";

function detectPlatform() {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  const isIOS = /iP(hone|ad|od)/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  return { isIOS, isAndroid };
}

export default function Download() {
  const { isIOS, isAndroid } = useMemo(detectPlatform, []);
  const [redirected, setRedirected] = useState(false);
  const [manifest, setManifest] = useState(null);

  const ANDROID_APK_URL = import.meta?.env?.VITE_ANDROID_APK_URL || `${import.meta.env.BASE_URL || "/"}downloads/android/app-latest.apk`;
  const IOS_ENTERPRISE_PLIST_URL = import.meta?.env?.VITE_IOS_ENTERPRISE_PLIST_URL || "";
  const TESTFLIGHT_URL = import.meta?.env?.VITE_TESTFLIGHT_URL || "https://testflight.apple.com/";

  useEffect(() => {
    const base = import.meta.env.BASE_URL || "/";
    fetch(`${base}downloads/latest.json`, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : null))
      .then(data => setManifest(data))
      .catch(() => setManifest(null));
  }, []);

  useEffect(() => {
    // Try automatic redirect based on platform
    if (redirected) return;
    const apkUrl = (manifest?.android?.url
      ? (manifest.android.url.startsWith("http")
          ? manifest.android.url
          : `${import.meta.env.BASE_URL || "/"}${manifest.android.url.replace(/^\//, "")}`)
      : ANDROID_APK_URL);

    if (isAndroid && apkUrl) {
      setRedirected(true);
      window.location.href = apkUrl;
    } else if (isIOS) {
      if (IOS_ENTERPRISE_PLIST_URL) {
        // Enterprise/ad-hoc distribution via itms-services
        const itms = `itms-services://?action=download-manifest&url=${encodeURIComponent(IOS_ENTERPRISE_PLIST_URL)}`;
        setRedirected(true);
        window.location.href = itms;
      }
      // Otherwise, show instructions + TestFlight/App Store buttons below
    }
  }, [isAndroid, isIOS, ANDROID_APK_URL, IOS_ENTERPRISE_PLIST_URL, redirected, manifest]);

  return (
    <section className="py-14 px-6 md:px-12 lg:px-20">
      <SEO 
        title="Télécharger l'Application TIC Miton - Android & iOS | Porto-Novo"
        description="Téléchargez l'application mobile TIC Miton sur Android et iOS. Commandez vos courses VTC facilement depuis votre smartphone à Porto-Novo."
        keywords="télécharger TIC Miton, application VTC Porto-Novo, app TIC Miton Android, app TIC Miton iOS, téléchargement app transport"
      />
      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 p-6 md:p-8">
        <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900">
          Téléchargement de l'application
        </h1>
        <p className="mt-2 text-gray-600">
          Cette page essaie de démarrer le téléchargement automatiquement selon votre appareil. Si rien ne se passe, utilisez les boutons ci-dessous.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href={(manifest?.android?.url
              ? (manifest.android.url.startsWith("http")
                  ? manifest.android.url
                  : `${import.meta.env.BASE_URL || "/"}${manifest.android.url.replace(/^\//, "")}`)
              : ANDROID_APK_URL)}
            className="inline-flex items-center justify-center rounded-md bg-brand-orange text-white px-5 py-3 font-sans font-semibold hover:bg-[#e56a00] transition"
          >
            Télécharger APK Android
          </a>
          {IOS_ENTERPRISE_PLIST_URL ? (
            <a
              href={`itms-services://?action=download-manifest&url=${encodeURIComponent(IOS_ENTERPRISE_PLIST_URL)}`}
              className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-5 py-3 font-sans font-semibold hover:bg-black transition"
            >
              Installer sur iOS (Entreprise)
            </a>
          ) : (
            <a
              href={PLACEHOLDER_LINKS.appStoreUrl || TESTFLIGHT_URL}
              className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-5 py-3 font-sans font-semibold hover:bg-black transition"
            >
              Ouvrir iOS (TestFlight/App Store)
            </a>
          )}
        </div>

        <div className="mt-8 space-y-4 text-sm text-gray-700">
          {manifest && (
            <div className="rounded-md border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900">Version</div>
              <div className="mt-1 text-gray-700">
                {manifest.version} — {manifest.releasedAt}
              </div>
              {manifest.android && (
                <div className="mt-3 text-gray-700">
                  <div className="font-semibold text-gray-900">Android</div>
                  <div className="mt-1">Taille: {typeof manifest.android.sizeBytes === 'number' ? `${(manifest.android.sizeBytes/1048576).toFixed(1)} MB` : '—'}</div>
                  {manifest.android.sha256 && (
                    <div className="mt-1 break-all">SHA-256: {manifest.android.sha256}</div>
                  )}
                </div>
              )}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900">Android</h2>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Téléchargez le fichier APK puis ouvrez-le.</li>
              <li>Activez “Sources inconnues/Autoriser cette source” si demandé.</li>
              <li>Pour les mises à jour, retéléchargez la nouvelle version depuis cette page.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">iOS</h2>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>La distribution publique hors App Store n'est pas autorisée. Deux options: App Store/TestFlight, ou distribution d'entreprise (MDM/itms-services) réservée aux usages internes et comptes Apple appropriés.</li>
              <li>Si vous disposez d'un profil d'entreprise, utilisez le bouton "Installer sur iOS (Entreprise)" ci-dessus.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p>
            Besoin d'aide ? Contactez-nous: <a className="text-brand-blue underline" href={PLACEHOLDER_LINKS.whatsappUrl}>WhatsApp</a> ou <a className="text-brand-blue underline" href={`mailto:${PLACEHOLDER_LINKS.supportEmail}`}>{PLACEHOLDER_LINKS.supportEmail}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
