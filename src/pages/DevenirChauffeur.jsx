import React from 'react';
import DriverRecruitmentForm from '../components/DriverRecruitmentForm';
import FORMS from '../config/forms';
import DriverHero from '../components/DriverHero';
import SEO from '../components/SEO';

export default function DevenirChauffeur() {
  return (
    <div className="bg-white">
      <SEO 
        title="Devenir Chauffeur Partenaire - TIC Miton | Recrutement Porto-Novo"
        description="Rejoignez TIC Miton comme chauffeur partenaire à Porto-Novo. Gagnez un revenu stable, travaillez à votre rythme avec notre flotte de véhicules."
        keywords="devenir chauffeur VTC, recrutement chauffeur Porto-Novo, emploi chauffeur Bénin, partenaire TIC Miton, travail chauffeur"
      />
      <DriverHero />
      <div id="apply">
        <DriverRecruitmentForm className="pt-6" apiEndpoint={FORMS.recruitmentEndpoint} />
      </div>
    </div>
  );
}
