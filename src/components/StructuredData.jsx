import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "TIC Miton",
      "description": "Service de transport VTC à Porto-Novo, Bénin. Chauffeurs vérifiés, tarifs transparents, disponible 24/7.",
      "url": "https://ticmiton.com",
      "logo": "https://ticmiton.com/logo.png",
      "image": "https://ticmiton.com/og-image.jpg",
      "telephone": "+229-01-57-79-26-62",
      "email": "contact@ticmiton.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Porto-Novo",
        "addressCountry": "BJ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "6.4969",
        "longitude": "2.6289"
      },
      "areaServed": {
        "@type": "City",
        "name": "Porto-Novo"
      },
      "priceRange": "$$",
      "openingHours": "Mo-Su 00:00-24:00",
      "sameAs": [
        "https://facebook.com/ticmiton",
        "https://instagram.com/ticmiton",
        "https://twitter.com/ticmiton"
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Transport VTC",
      "provider": {
        "@type": "LocalBusiness",
        "name": "TIC Miton"
      },
      "areaServed": {
        "@type": "City",
        "name": "Porto-Novo"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services TIC Miton",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Course VTC",
              "description": "Transport de personnes à la demande"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Livraison",
              "description": "Service de livraison rapide"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trajets quotidiens",
              "description": "Abonnements pour trajets réguliers"
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
        "ratingCount": "150"
      }
    };

    // Insert schemas into document head
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(organizationSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(serviceSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.text = JSON.stringify(mobileAppSchema);
    document.head.appendChild(script3);

    // Cleanup
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
    };
  }, []);

  return null;
};

export default StructuredData;
