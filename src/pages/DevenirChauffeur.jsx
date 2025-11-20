import React from 'react';
import DriverRecruitmentForm from '../components/DriverRecruitmentForm';
import FORMS from '../config/forms';
import DriverHero from '../components/DriverHero';
import SEO from '../components/SEO';

export default function DevenirChauffeur() {
  return (
    <div className="bg-white">
      <SEO 
        title="Devenir Chauffeur VTC Porto-Novo | Recrutement & Inscription TIC Miton"
        description="Rejoignez TIC Miton comme chauffeur partenaire à Porto-Novo. Revenus attractifs, flexibilité horaire, formations gratuites. Postulez en ligne avec votre permis et carte grise."
        keywords="devenir chauffeur VTC Porto-Novo, recrutement chauffeur Bénin, emploi VTC, inscription chauffeur TIC Miton, partenaire transport, job chauffeur Porto-Novo"
      />
      <DriverHero />
      <div id="apply">
        <DriverRecruitmentForm className="pt-6" apiEndpoint={FORMS.recruitmentEndpoint} />
      </div>
    </div>
  );
}
