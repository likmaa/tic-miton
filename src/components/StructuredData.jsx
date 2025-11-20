import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StructuredData = () => {
  const location = useLocation();

  useEffect(() => {
    // Organization Schema (global)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TIC Miton",
      "legalName": "TIC Miton SARL",
      "description": "Service de transport VTC à Porto-Novo, Bénin. Chauffeurs vérifiés, tarifs transparents, disponible 24/7.",
      "url": "https://ticmiton.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ticmiton.com/logo-tic.webp",
        "width": 512,
        "height": 512
      },
      "image": "https://ticmiton.com/og-image.jpg",
      "telephone": "+229-01-57-79-26-62",
      "email": "contact@ticmiton.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Porto-Novo",
        "addressRegion": "Ouémé",
        "addressCountry": "BJ"
      },
      "sameAs": [
        "https://facebook.com/ticmiton",
        "https://instagram.com/ticmiton"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+229-01-57-79-26-62",
        "contactType": "Customer Service",
        "areaServed": "BJ",
        "availableLanguage": ["French"]
      }
    };

    // LocalBusiness Schema (plus détaillé pour SEO local)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://ticmiton.com/#organization",
      "name": "TIC Miton",
      "description": "Service de transport VTC et livraison à Porto-Novo. Réservez votre course en ligne, chauffeurs professionnels vérifiés.",
      "url": "https://ticmiton.com",
      "logo": "https://ticmiton.com/logo-tic.webp",
      "image": "https://ticmiton.com/og-image.jpg",
      "telephone": "+229-01-57-79-26-62",
      "email": "contact@ticmiton.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Porto-Novo",
        "addressRegion": "Ouémé",
        "addressCountry": "BJ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.4969,
        "longitude": 2.6289
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Porto-Novo"
        },
        {
          "@type": "City",
          "name": "Cotonou"
        }
      ],
      "priceRange": "$$",
      "openingHours": "Mo-Su 00:00-24:00",
      "paymentAccepted": "Cash, Mobile Money",
      "currenciesAccepted": "XOF"
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Transport VTC et Livraison",
      "provider": {
        "@id": "https://ticmiton.com/#organization"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Porto-Novo",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BJ"
          }
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services TIC Miton",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Course VTC",
              "description": "Transport de personnes à la demande avec chauffeurs vérifiés"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Livraison rapide",
              "description": "Service de livraison de colis et courses à Porto-Novo"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trajets quotidiens",
              "description": "Abonnements pour trajets domicile-travail réguliers"
            }
          }
        ]
      }
    };

    // Mobile App Schema
    const mobileAppSchema = {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      "name": "TIC Miton",
      "operatingSystem": ["Android", "iOS"],
      "applicationCategory": "TravelApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "XOF"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "ratingCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@id": "https://ticmiton.com/#organization"
      }
    };

    // Breadcrumb schema (page-specific, conditionnel)
    const getBreadcrumbSchema = () => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      if (pathSegments.length === 0) return null;

      const items = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://ticmiton.com/"
        }
      ];

      let currentPath = '';
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const nameMap = {
          'services': 'Nos Services',
          'devenir-chauffeur': 'Devenir Chauffeur',
          'about': 'À Propos',
          'contact': 'Contact',
          'download': 'Télécharger',
          'privacy-policy': 'Politique de Confidentialité'
        };
        items.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": nameMap[segment] || segment,
          "item": `https://ticmiton.com${currentPath}`
        });
      });

      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items
      };
    };

    const breadcrumbSchema = getBreadcrumbSchema();

    // FAQ Schema (si page home ou FAQ)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment réserver une course avec TIC Miton ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Téléchargez l'application TIC Miton sur App Store ou Play Store, créez un compte, entrez votre destination et confirmez votre course. Un chauffeur vous sera assigné en quelques minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les modes de paiement acceptés ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TIC Miton accepte les paiements en espèces et par mobile money (MTN Money, Moov Money). Le paiement par carte bancaire sera bientôt disponible."
          }
        },
        {
          "@type": "Question",
          "name": "Comment devenir chauffeur TIC Miton ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rendez-vous sur notre page Devenir Chauffeur, remplissez le formulaire de candidature avec vos informations et documents (permis, carte grise, assurance). Notre équipe vous contactera sous 48h pour finaliser votre inscription."
          }
        },
        {
          "@type": "Question",
          "name": "Dans quelles zones TIC Miton est-il disponible ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TIC Miton est actuellement disponible à Porto-Novo et ses environs. Nous prévoyons d'étendre nos services à Cotonou et d'autres villes du Bénin prochainement."
          }
        }
      ]
    };

    // Insert schemas into document head
    const scripts = [];
    
    const addSchema = (schema) => {
      if (!schema) return;
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scripts.push(script);
    };

    addSchema(organizationSchema);
    addSchema(localBusinessSchema);
    addSchema(serviceSchema);
    addSchema(mobileAppSchema);
    addSchema(breadcrumbSchema);
    
    // FAQ schema only on home page
    if (location.pathname === '/' || location.pathname === '/home') {
      addSchema(faqSchema);
    }

    // Cleanup
    return () => {
      scripts.forEach(script => {
        if (script.parentNode) {
          document.head.removeChild(script);
        }
      });
    };
  }, [location]);

  return null;
};

export default StructuredData;
