import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, User, Smartphone, CreditCard, Ban, Scale, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-brand-blue to-[#2b42b5] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-12 h-12 text-[#FFCA80]" />
            <h1 className="hero-title">Conditions générales d&apos;utilisation</h1>
          </div>
          <p className="text-white/90 text-lg">Dernière mise à jour : 1er mai 2026</p>
          <p className="mt-4 text-white/80 max-w-2xl">
            Les présentes CGU régissent l&apos;utilisation du service TIC Miton (applications mobile passager et
            chauffeur, site web et services associés). En créant un compte ou en commandant une course, vous les
            acceptez sans réserve.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <FileText className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">1. Objet et champ d&apos;application</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                TIC Miton est une plateforme de mise en relation entre passagers et chauffeurs partenaires pour des
                courses de transport au Bénin. TIC Miton n&apos;est pas transporteur : la prestation de transport est
                assurée par les chauffeurs indépendants ou partenaires utilisant la plateforme.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <User className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">2. Compte utilisateur</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Vous devez fournir des informations exactes (identité, téléphone) lors de l&apos;inscription.</li>
                <li>
                  Vous êtes responsable de la confidentialité de votre compte (OTP, accès à l&apos;appareil). Toute
                  activité réalisée depuis votre compte est réputée effectuée par vous.
                </li>
                <li>
                  Vous pouvez demander la suppression de votre compte depuis l&apos;application (paramètres / compte),
                  sous réserve des obligations légales de conservation (ex. facturation).
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Smartphone className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">3. Commande de courses et tarification</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Le tarif affiché ou calculé au moment de la commande fait foi, sauf erreur manifeste corrigée par la plateforme.</li>
                <li>Les annulations peuvent donner lieu à des frais ou pénalités selon les règles affichées dans l&apos;application.</li>
                <li>Vous vous engagez à être présent au point de prise en charge ou à prévenir en cas d&apos;empêchement.</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <CreditCard className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">4. Paiement</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Les moyens de paiement disponibles (espèces, portefeuille électronique, etc.) sont indiqués dans
                l&apos;application. Les rechargements et transactions sont soumis aux conditions du prestataire de
                paiement concerné.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Ban className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">5. Comportements interdits</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>Il est notamment interdit :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>d&apos;utiliser le service à des fins illégales, frauduleuses ou de contournement tarifaire ;</li>
                <li>de harceler, menacer ou porter atteinte à la sécurité des chauffeurs, passagers ou tiers ;</li>
                <li>de porter atteinte à la sécurité ou à l&apos;intégrité de la plateforme (piratage, bots abusifs, etc.).</li>
              </ul>
              <p>TIC Miton peut suspendre ou clôturer un compte en cas de manquement grave.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Scale className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">6. Responsabilité</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                La plateforme est fournie « en l&apos;état ». Dans les limites du droit applicable, TIC Miton ne saurait
                être tenue des retards, annulations ou dommages liés à des événements indépendants de sa volonté
                (grèves, intempéries, réseau, etc.). La responsabilité du transporteur pour le trajet reste régie par le
                droit applicable aux prestations de transport.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="section-title text-gray-900">7. Données personnelles</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Le traitement des données personnelles est décrit dans la{' '}
                <Link to="/confidentialite" className="text-brand-blue hover:text-brand-orange underline">
                  politique de confidentialité
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="section-title text-gray-900">8. Droit applicable et litiges</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Les présentes CGU sont soumises au droit béninois. En cas de litige, une solution amiable sera recherchée
                avant toute action ; à défaut, les tribunaux compétents du Bénin sont seuls attributaires.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Mail className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="section-title text-gray-900 mt-0">9. Contact</h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">TIC Miton</p>
                <p>
                  Email :{' '}
                  <a href="mailto:support@ticmiton.com" className="text-brand-blue hover:text-brand-orange underline">
                    support@ticmiton.com
                  </a>
                </p>
                <p>
                  Téléphone :{' '}
                  <a href="tel:+2290157792662" className="text-brand-blue hover:text-brand-orange underline">
                    +229 01 57 79 26 62
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="section-title text-gray-900">10. Modifications</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                TIC Miton peut modifier les présentes CGU. La date de mise à jour en tête de page sera actualisée ; les
                changements importants pourront être notifiés dans l&apos;application. L&apos;utilisation continue du
                service après modification vaut acceptation des nouvelles CGU.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center flex flex-wrap justify-center gap-4">
          <Link
            to="/confidentialite"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-orange underline"
          >
            Politique de confidentialité
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-md font-sans font-semibold hover:bg-[#2b42b5] transition"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
