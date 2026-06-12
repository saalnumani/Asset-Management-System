/* global window, getRooms, ROOMS_FLAT, SUBSPACES */
// ============================================================
// Extended assets — sets-with-quantity + polymorphic location
// Demonstrates the new schema; aggregate counts are denormalised
// on the property records (totalAssetsCount).
// ============================================================

// ---------- Sets per property — show off quantity / unitsMissing / unitsBroken ----------
const ASSET_SETS = [
  // Tokyo Residence (the hero — flatware with units missing)
  { id: "set-tk-flatware",   propertyId: "prop-tokyo", locationType: "room", locationId: "rm-tk-dining",
    category: "flatware", itemName: { en: "Christofle Silver Flatware Set", ar: "طقم فضي كريستوفل" }, brand: "Christofle",
    setPieceLabel: { en: "piece", ar: "قطعة" },
    isSet: true, quantity: 144, unitsMissing: 2, unitsBroken: 0,
    condition: "excellent", purchaseCost: 18400, currency: "BHD", purchaseDate: "2008-04-12",
    isOfficialGift: false, qrCode: "QR-TK-FLW-001", photos: [],
    notes: "Two dessert forks reported missing during Q2 2025 audit. Investigation closed inconclusive." },
  { id: "set-tk-china",      propertyId: "prop-tokyo", locationType: "room", locationId: "rm-tk-dining",
    category: "china", itemName: { en: "Wedgwood Dinner Service", ar: "طقم شاي ويدجوود" }, brand: "Wedgwood",
    setPieceLabel: { en: "piece", ar: "قطعة" },
    isSet: true, quantity: 48, unitsMissing: 0, unitsBroken: 1,
    condition: "good", purchaseCost: 6200, currency: "BHD", purchaseDate: "2014-09-22",
    isOfficialGift: false, qrCode: "QR-TK-CHN-001", photos: [],
    notes: "One side plate chipped during 2025 reception; replaced by donor on order." },
  { id: "set-tk-crystal",    propertyId: "prop-tokyo", locationType: "room", locationId: "rm-tk-dining",
    category: "glassware", itemName: { en: "Baccarat Crystal Stemware", ar: "زجاج باكارا" }, brand: "Baccarat",
    setPieceLabel: { en: "glass", ar: "كأس" },
    isSet: true, quantity: 36, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 9800, currency: "BHD", purchaseDate: "2014-09-22",
    isOfficialGift: false, qrCode: "QR-TK-CRY-001", photos: [] },
  { id: "set-tk-linen",      propertyId: "prop-tokyo", locationType: "sub-space", locationId: "ss-tk-amb-closet",
    category: "textile", itemName: { en: "Egyptian Cotton Bed Linen Sets", ar: "أطقم فراش قطن مصري" },
    setPieceLabel: { en: "set", ar: "طقم" },
    isSet: true, quantity: 12, unitsMissing: 0, unitsBroken: 0,
    condition: "good", purchaseCost: 1240, currency: "BHD", purchaseDate: "2022-03-04",
    isOfficialGift: false, qrCode: "QR-TK-LIN-001", photos: [] },

  // London Residence
  { id: "set-lr-flatware",   propertyId: "prop-london", locationType: "room", locationId: "rm-lr-l0-dining-3",
    category: "flatware", itemName: { en: "Sterling Silver Flatware Set", ar: "طقم فضي" }, brand: "Asprey",
    setPieceLabel: { en: "piece", ar: "قطعة" },
    isSet: true, quantity: 96, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 22400, currency: "BHD", purchaseDate: "1989-07-08",
    isOfficialGift: false, qrCode: "QR-LR-FLW-001", photos: [] },
  { id: "set-lr-rug-pair",   propertyId: "prop-london", locationType: "room", locationId: "rm-lr-l0-majlis-1",
    category: "rug", itemName: { en: "Persian-style Rug — Matched Pair", ar: "زوج سجاد فارسي" },
    setPieceLabel: { en: "rug", ar: "سجادة" },
    isSet: true, quantity: 2, unitsMissing: 0, unitsBroken: 1,
    condition: "fair", purchaseCost: 14000, currency: "BHD", purchaseDate: "1995-06-01",
    isOfficialGift: false, qrCode: "QR-LR-RUG-001", photos: [],
    notes: "Right-hand rug shows water damage in left corner; conservation scheduled June 2026." },
  { id: "set-lr-towels",     propertyId: "prop-london", locationType: "room", locationId: "rm-lr-l1-bathroom-6",
    category: "textile", itemName: { en: "Hand-towel Set", ar: "طقم فوط" },
    setPieceLabel: { en: "towel", ar: "فوطة" },
    isSet: true, quantity: 24, unitsMissing: 1, unitsBroken: 0,
    condition: "good", purchaseCost: 480, currency: "BHD", purchaseDate: "2023-11-12",
    isOfficialGift: false, qrCode: "QR-LR-TWL-001", photos: [] },

  // Paris
  { id: "set-pa-china",      propertyId: "prop-paris", locationType: "room", locationId: "rm-pa-l2-bedroom-1",
    category: "china", itemName: { en: "Limoges Dinner Service", ar: "طقم ليموج" }, brand: "Bernardaud",
    setPieceLabel: { en: "piece", ar: "قطعة" },
    isSet: true, quantity: 60, unitsMissing: 0, unitsBroken: 2,
    condition: "good", purchaseCost: 7400, currency: "BHD", purchaseDate: "2002-04-14",
    isOfficialGift: false, qrCode: "QR-PA-CHN-001", photos: [] },
  { id: "set-pa-flatware",   propertyId: "prop-paris", locationType: "room", locationId: "rm-pa-l2-bedroom-1",
    category: "flatware", itemName: { en: "Christofle Flatware Set", ar: "طقم كريستوفل" }, brand: "Christofle",
    setPieceLabel: { en: "piece", ar: "قطعة" },
    isSet: true, quantity: 72, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 11200, currency: "BHD", purchaseDate: "2002-04-14",
    isOfficialGift: false, qrCode: "QR-PA-FLW-001", photos: [] },

  // Washington
  { id: "set-ws-china",      propertyId: "prop-washington", locationType: "room", locationId: "rm-wr-l0-dining-3",
    category: "china", itemName: { en: "State Service China", ar: "طقم رسمي" }, brand: "Lenox",
    setPieceLabel: { en: "piece", ar: "قطعة" },
    isSet: true, quantity: 96, unitsMissing: 0, unitsBroken: 3,
    condition: "good", purchaseCost: 12400, currency: "BHD", purchaseDate: "1992-10-04",
    isOfficialGift: false, qrCode: "QR-WS-CHN-001", photos: [] },
  { id: "set-ws-rug-pair",   propertyId: "prop-washington", locationType: "room", locationId: "rm-wr-l0-majlis-1",
    category: "rug", itemName: { en: "Heriz Rug — Matched Pair", ar: "زوج سجاد هريز" },
    setPieceLabel: { en: "rug", ar: "سجادة" },
    isSet: true, quantity: 2, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 18800, currency: "BHD", purchaseDate: "1998-04-12",
    isOfficialGift: false, qrCode: "QR-WS-RUG-001", photos: [] },
];

// ---------- Vehicles (Assets with category='vehicle') ----------
const VEHICLES = [
  { id: "v-lon-lex",  propertyId: "prop-london",     locationType: "room", locationId: "garage-london",
    category: "vehicle", itemName: { en: "Lexus LX 570 — Ambassadorial", ar: "ليكزس LX 570 — السفير" },
    brand: "Lexus", model: "LX 570", year: 2021, registration: "DC 1971",
    isSet: false, quantity: 1, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 32000, currency: "BHD", purchaseDate: "2021-09-04",
    isOfficialGift: false, qrCode: "QR-V-LON-001", photos: [], notes: "Daily ceremonial use." },
  { id: "v-lon-vintage", propertyId: "prop-london",  locationType: "room", locationId: "garage-london",
    category: "vehicle", itemName: { en: "1968 Rolls-Royce Phantom — Ceremonial", ar: "رولز رويس فانتوم ١٩٦٨" },
    brand: "Rolls-Royce", model: "Phantom VI", year: 1968,
    isSet: false, quantity: 1, unitsMissing: 0, unitsBroken: 0,
    condition: "good", purchaseCost: 24000, currency: "BHD", purchaseDate: "1980-05-22",
    isOfficialGift: false, qrCode: "QR-V-LON-002", photos: [], notes: "State arrivals only — National Day, credentials." },
  { id: "v-par-merc", propertyId: "prop-paris",      locationType: "room", locationId: "garage-paris",
    category: "vehicle", itemName: { en: "Mercedes-Benz S-Class — Ambassador", ar: "مرسيدس S-Class — السفير" },
    brand: "Mercedes-Benz", model: "S 580", year: 2023,
    isSet: false, quantity: 1, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 38000, currency: "BHD", purchaseDate: "2023-04-18",
    isOfficialGift: false, qrCode: "QR-V-PAR-001", photos: [] },
  { id: "v-tk-rover", propertyId: "prop-tokyo",      locationType: "room", locationId: "garage-tokyo",
    category: "vehicle", itemName: { en: "Range Rover Autobiography", ar: "رنج روفر أوتوبيوغرافي" },
    brand: "Land Rover", model: "Range Rover", year: 2022,
    isSet: false, quantity: 1, unitsMissing: 0, unitsBroken: 0,
    condition: "good", purchaseCost: 36000, currency: "BHD", purchaseDate: "2022-11-08",
    isOfficialGift: false, qrCode: "QR-V-TK-001", photos: [], notes: "Oil change overdue — see maintenance log." },
  { id: "v-ws-cad",   propertyId: "prop-washington", locationType: "room", locationId: "garage-washington",
    category: "vehicle", itemName: { en: "Cadillac Escalade — Chancery", ar: "كاديلاك إسكاليد — السفارة" },
    brand: "Cadillac", model: "Escalade ESV", year: 2024,
    isSet: false, quantity: 1, unitsMissing: 0, unitsBroken: 0,
    condition: "excellent", purchaseCost: 32000, currency: "BHD", purchaseDate: "2024-03-12",
    isOfficialGift: false, qrCode: "QR-V-WS-001", photos: [] },
];

// ---------- Combined ASSETS export ----------
// Note: detailed individual records also include the existing ROOM_ASSETS["rm-tk-majlis"]
// from data.jsx (12 hand-written items) — see getAllAssets() below.
const ASSETS_EXTENDED = [...ASSET_SETS, ...VEHICLES];

function getAssetsForProperty(propertyId) {
  return ASSETS_EXTENDED.filter(a => a.propertyId === propertyId);
}
function getAssetsForRoom(roomId) {
  return ASSETS_EXTENDED.filter(a => a.locationType === "room" && a.locationId === roomId);
}
function getAssetsForSubSpace(subSpaceId) {
  return ASSETS_EXTENDED.filter(a => a.locationType === "sub-space" && a.locationId === subSpaceId);
}
function getVehiclesForProperty(propertyId) {
  return VEHICLES.filter(v => v.propertyId === propertyId);
}

Object.assign(window, {
  ASSETS_EXTENDED, ASSET_SETS, VEHICLES,
  getAssetsForProperty, getAssetsForRoom, getAssetsForSubSpace, getVehiclesForProperty,
});
