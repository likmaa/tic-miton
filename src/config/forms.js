// Configuration des endpoints de formulaires (compatibles hébergement statique)
// Renseignez ces variables via Vite (ex: .env, variables GitHub Actions):
// - VITE_CONTACT_FORM_ENDPOINT
// - VITE_RECRUITMENT_FORM_ENDPOINT

const CONTACT_FORM_ENDPOINT = import.meta?.env?.VITE_CONTACT_FORM_ENDPOINT ?? "";
const RECRUITMENT_FORM_ENDPOINT = import.meta?.env?.VITE_RECRUITMENT_FORM_ENDPOINT ?? "";

const FORMS = {
  contactEndpoint: CONTACT_FORM_ENDPOINT || null,
  recruitmentEndpoint: RECRUITMENT_FORM_ENDPOINT || null,
};

export default FORMS;
export { FORMS };
