/* global window */
// ============================================================
// Postings (organizational top level — one per city)
// 4 postings, each containing 1–2 properties (buildings)
// ============================================================

const POSTINGS = [
  {
    id: "post-london",
    name: { en: "Bahrain in London",  ar: "البحرين في لندن" },
    country: { en: "United Kingdom", ar: "المملكة المتحدة" },
    city: { en: "London", ar: "لندن" },
    coords: { lat: 51.4988, lng: -0.1547 },
    established: "1971-08-15",
    headOfMission: { name: "H.E. Shaikh Fawaz Al Khalifa", nameAr: "سعادة الشيخ فواز آل خليفة", title: "Ambassador" },
    status: "active",
    coverPhoto: "",
    totalAssetsCount: 612,
    totalAssetsValue: 904000,
  },
  {
    id: "post-paris",
    name: { en: "Bahrain in Paris", ar: "البحرين في باريس" },
    country: { en: "France", ar: "فرنسا" },
    city: { en: "Paris", ar: "باريس" },
    coords: { lat: 48.8665, lng: 2.2891 },
    established: "1995-03-22",
    headOfMission: { name: "H.E. Yusra Al-Sulaibikh", nameAr: "سعادة يسرى السليبيخ", title: "Ambassador" },
    status: "active",
    coverPhoto: "",
    totalAssetsCount: 412,
    totalAssetsValue: 658200,
  },
  {
    id: "post-tokyo",
    name: { en: "Bahrain in Tokyo", ar: "البحرين في طوكيو" },
    country: { en: "Japan", ar: "اليابان" },
    city: { en: "Tokyo", ar: "طوكيو" },
    coords: { lat: 35.6580, lng: 139.7414 },
    established: "2003-11-08",
    headOfMission: { name: "H.E. Dr. Tariq Al-Faisal", nameAr: "سعادة الدكتور طارق الفيصل", title: "Ambassador" },
    status: "active",
    coverPhoto: "",
    totalAssetsCount: 524,
    totalAssetsValue: 712400,
  },
  {
    id: "post-washington",
    name: { en: "Bahrain in Washington", ar: "البحرين في واشنطن" },
    country: { en: "United States", ar: "الولايات المتحدة" },
    city: { en: "Washington DC", ar: "واشنطن" },
    coords: { lat: 38.9389, lng: -77.0653 },
    established: "1976-09-03",
    headOfMission: { name: "H.E. Shaikh Abdulla bin Rashid Al Khalifa", nameAr: "سعادة الشيخ عبدالله بن راشد آل خليفة", title: "Ambassador" },
    status: "active",
    coverPhoto: "",
    totalAssetsCount: 698,
    totalAssetsValue: 1124800,
  },
];

function getPosting(id) { return POSTINGS.find(p => p.id === id); }

Object.assign(window, { POSTINGS, getPosting });
