import React from 'react';
import DriverRecruitmentForm from '../components/DriverRecruitmentForm';
import DriverHero from '../components/DriverHero';

export default function DevenirChauffeur() {
  return (
    <div className="bg-white">
      <DriverHero />
      <div id="apply">
      <DriverRecruitmentForm className="pt-6" />
      </div>
    </div>
  );
}
