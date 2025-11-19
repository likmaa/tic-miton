import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-[#2b42b5] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-[#FFCA80]" />
            <h1 className="font-display text-4xl md:text-5xl font-extrabold">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            Dernière mise à jour : 19 novembre 2025
          </p>
          <p className="mt-4 text-white/80 max-w-2xl">
            Chez TIC Miton, nous accordons une importance primordiale à la protection de vos données personnelles. 
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          
          {/* 1. Collecte des données */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Database className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  1. Collecte des données
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Nous collectons différents types d'informations pour vous fournir et améliorer nos services :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Informations d'identification :</strong> nom, prénom, adresse e-mail, numéro de téléphone</li>
                <li><strong>Informations de localisation :</strong> position GPS pour faciliter vos trajets</li>
                <li><strong>Informations de paiement :</strong> données de transaction sécurisées</li>
                <li><strong>Informations d'utilisation :</strong> historique des trajets, préférences, interactions avec l'application</li>
                <li><strong>Informations techniques :</strong> type d'appareil, système d'exploitation, adresse IP</li>
              </ul>
            </div>
          </div>

          {/* 2. Utilisation des données */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Eye className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  2. Utilisation des données
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir et gérer nos services de transport</li>
                <li>Traiter vos paiements de manière sécurisée</li>
                <li>Vous mettre en relation avec nos chauffeurs partenaires</li>
                <li>Améliorer l'expérience utilisateur et nos services</li>
                <li>Vous envoyer des notifications importantes concernant vos trajets</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </div>
          </div>

          {/* 3. Protection des données */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Lock className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  3. Protection des données
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement des données sensibles (SSL/TLS)</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Authentification à deux facteurs pour les comptes sensibles</li>
                <li>Surveillance continue des systèmes de sécurité</li>
                <li>Formation régulière de nos équipes sur la protection des données</li>
                <li>Audits de sécurité périodiques</li>
              </ul>
            </div>
          </div>

          {/* 4. Partage des données */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <UserCheck className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  4. Partage des données
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement avec :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Nos chauffeurs partenaires :</strong> pour faciliter vos trajets (nom, position, destination)</li>
                <li><strong>Prestataires de services :</strong> qui nous aident à exploiter notre plateforme (paiement, hébergement)</li>
                <li><strong>Autorités légales :</strong> en cas d'obligation légale ou pour protéger nos droits</li>
              </ul>
              <p>
                Tous nos partenaires sont tenus de respecter la confidentialité de vos données.
              </p>
            </div>
          </div>

          {/* 5. Vos droits */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  5. Vos droits
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Conformément à la réglementation, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès :</strong> consulter les données que nous détenons sur vous</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à l'adresse : <a href="mailto:privacy@ticmiton.com" className="text-brand-blue hover:text-brand-orange underline">privacy@ticmiton.com</a>
              </p>
            </div>
          </div>

          {/* 6. Cookies */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Database className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  6. Cookies et technologies similaires
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Nous utilisons des cookies et technologies similaires pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mémoriser vos préférences</li>
                <li>Analyser l'utilisation de nos services</li>
                <li>Améliorer la performance de l'application</li>
                <li>Personnaliser votre expérience</li>
              </ul>
              <p>
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </div>

          {/* 7. Conservation des données */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Lock className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  7. Conservation des données
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Données de compte :</strong> jusqu'à la suppression de votre compte + 1 an</li>
                <li><strong>Historique des trajets :</strong> 3 ans pour des raisons comptables et fiscales</li>
                <li><strong>Données de paiement :</strong> selon les exigences légales (généralement 5 ans)</li>
              </ul>
            </div>
          </div>

          {/* 8. Contact */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <Mail className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-0">
                  8. Nous contacter
                </h2>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">TIC Miton</p>
                <p>Email : <a href="mailto:privacy@ticmiton.com" className="text-brand-blue hover:text-brand-orange underline">privacy@ticmiton.com</a></p>
                <p>Téléphone : <a href="tel:+2290157792662" className="text-brand-blue hover:text-brand-orange underline">+229 01 57 79 26 62</a></p>
                <p>Adresse : Porto-Novo, Bénin</p>
              </div>
            </div>
          </div>

          {/* 9. Modifications */}
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
              9. Modifications de la politique
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Toute modification sera publiée sur cette page avec une date de mise à jour actualisée. 
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
              <p>
                En cas de modifications importantes, nous vous en informerons par email ou via une notification dans l'application.
              </p>
            </div>
          </div>

        </div>

        {/* CTA de retour */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-md font-sans font-semibold hover:bg-[#2b42b5] transition"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
