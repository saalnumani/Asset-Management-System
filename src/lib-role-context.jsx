/* global window, React */
// ============================================================
// Role context — DEMO ONLY (mockup affordance)
// In production this would come from auth/session, NOT a switcher.
// Three personas as specified by the brief:
//   1. Fatima Al-Hashimi — HQ Admin, MoFA Manama (default)
//   2. Ahmed Al-Khalifa — Embassy Admin, Bahrain Embassy London
//   3. Layla Al-Rumaihi — Embassy Staff, Bahrain Embassy Tokyo
// ============================================================

const ROLE_PERSONAS = [
  {
    id: "persona-fatima",
    user: {
      id: "u-hq-fatima",
      name: { en: "Fatima Al-Hashimi", ar: "فاطمة الهاشمي" },
      email: "f.alhashimi@mofa.gov.bh",
      role: "hq-admin",
      postingId: null,
      active: true,
      createdAt: "2018-04-12",
      lastLogin: "2026-05-08T07:42:00",
      initial: "ف",
      titleShort: { en: "HQ Admin · Manama", ar: "إدارة عامة · المنامة" },
    },
  },
  {
    id: "persona-ahmed",
    user: {
      id: "u-emb-ahmed",
      name: { en: "Ahmed Al-Khalifa", ar: "أحمد آل خليفة" },
      email: "a.alkhalifa.lon@mofa.gov.bh",
      role: "embassy-admin",
      postingId: "post-london",
      active: true,
      createdAt: "2020-09-04",
      lastLogin: "2026-05-08T08:12:00",
      initial: "أ",
      titleShort: { en: "Embassy Admin · London", ar: "مدير السفارة · لندن" },
    },
  },
  {
    id: "persona-layla",
    user: {
      id: "u-emb-layla",
      name: { en: "Layla Al-Rumaihi", ar: "ليلى الرميحي" },
      email: "l.alrumaihi.tk@mofa.gov.bh",
      role: "embassy-staff",
      postingId: "post-tokyo",
      active: true,
      createdAt: "2024-01-12",
      lastLogin: "2026-05-08T09:01:00",
      initial: "ل",
      titleShort: { en: "Embassy Staff · Tokyo", ar: "موظف سفارة · طوكيو" },
    },
  },
];

// Mutable role state — App component subscribes via useCurrentRole().
window.__roleState = window.__roleState || { personaId: "persona-fatima" };

function getActivePersona() {
  return ROLE_PERSONAS.find(p => p.id === window.__roleState.personaId) || ROLE_PERSONAS[0];
}
function getCurrentUser() {
  return getActivePersona().user;
}
function setActivePersona(personaId) {
  window.__roleState.personaId = personaId;
  // Update CURRENT_USER alias for any module that reads it directly
  window.CURRENT_USER = { ...getCurrentUser(), initial: getCurrentUser().initial };
  window.dispatchEvent(new CustomEvent("role-changed"));
}

// React hook — subscribes to role changes
function useCurrentRole() {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const h = () => force(n => n + 1);
    window.addEventListener("role-changed", h);
    return () => window.removeEventListener("role-changed", h);
  }, []);
  return { user: getCurrentUser(), persona: getActivePersona(), setActivePersona };
}

// Initial sync of CURRENT_USER alias
window.CURRENT_USER = getCurrentUser();

Object.assign(window, {
  ROLE_PERSONAS, getActivePersona, getCurrentUser, setActivePersona, useCurrentRole,
});
