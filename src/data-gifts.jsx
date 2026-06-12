/* global window */
// ============================================================
// Gifts: received, given, and gift stock per posting
// 4 stocks (~32 items total · low-stock examples flagged)
// ~30 received · ~50 given
// ============================================================

// ---------- Gift Stock — posting-level (~6-10 items each) ----------
const GIFT_STOCK = [
  // London
  { id: "gs-lon-01", postingId: "post-london", itemName: { en: "Bahraini Pearl Necklace", ar: "عقد لؤلؤ بحريني" }, category: "jewelry", unitCost: 850, currency: "BHD", quantityOnHand: 8, reorderThreshold: 3, photos: [] },
  { id: "gs-lon-02", postingId: "post-london", itemName: { en: "Pearl Brooch", ar: "بروش لؤلؤ" }, category: "jewelry", unitCost: 280, currency: "BHD", quantityOnHand: 12, reorderThreshold: 4, photos: [] },
  { id: "gs-lon-03", postingId: "post-london", itemName: { en: "Ceremonial Khanjar (presentation-grade)", ar: "خنجر تشريفي" }, category: "ceremonial", unitCost: 1400, currency: "BHD", quantityOnHand: 4, reorderThreshold: 2, photos: [] },
  { id: "gs-lon-04", postingId: "post-london", itemName: { en: "Bahrain Calligraphy Plate (silver-mounted)", ar: "طبق خط مذهب" }, category: "calligraphy", unitCost: 320, currency: "BHD", quantityOnHand: 12, reorderThreshold: 4, photos: [] },
  { id: "gs-lon-05", postingId: "post-london", itemName: { en: "\"Story of Bahrain\" Hardcover Book", ar: "كتاب قصة البحرين" }, category: "book", unitCost: 60, currency: "BHD", quantityOnHand: 20, reorderThreshold: 6, photos: [] },
  { id: "gs-lon-06", postingId: "post-london", itemName: { en: "Halwa Showaiter Presentation Tin", ar: "علبة حلوى شويطر" }, category: "food", unitCost: 35, currency: "BHD", quantityOnHand: 4, reorderThreshold: 5, photos: [], lowStock: true },
  { id: "gs-lon-07", postingId: "post-london", itemName: { en: "Dilmun-era Replica Artifact (museum-grade)", ar: "قطعة دلمونية مقلدة" }, category: "art", unitCost: 480, currency: "BHD", quantityOnHand: 6, reorderThreshold: 2, photos: [] },
  { id: "gs-lon-08", postingId: "post-london", itemName: { en: "Engraved Silver Dates Bowl", ar: "وعاء فضي للتمر" }, category: "ceremonial", unitCost: 220, currency: "BHD", quantityOnHand: 10, reorderThreshold: 3, photos: [] },
  // Paris
  { id: "gs-par-01", postingId: "post-paris", itemName: { en: "Bahraini Pearl Necklace", ar: "عقد لؤلؤ بحريني" }, category: "jewelry", unitCost: 850, currency: "BHD", quantityOnHand: 6, reorderThreshold: 3, photos: [] },
  { id: "gs-par-02", postingId: "post-paris", itemName: { en: "Pearl Brooch", ar: "بروش لؤلؤ" }, category: "jewelry", unitCost: 280, currency: "BHD", quantityOnHand: 9, reorderThreshold: 4, photos: [] },
  { id: "gs-par-03", postingId: "post-paris", itemName: { en: "Ceremonial Khanjar", ar: "خنجر تشريفي" }, category: "ceremonial", unitCost: 1400, currency: "BHD", quantityOnHand: 1, reorderThreshold: 2, photos: [], lowStock: true },
  { id: "gs-par-04", postingId: "post-paris", itemName: { en: "Bahrain Calligraphy Plate", ar: "طبق خط" }, category: "calligraphy", unitCost: 320, currency: "BHD", quantityOnHand: 8, reorderThreshold: 4, photos: [] },
  { id: "gs-par-05", postingId: "post-paris", itemName: { en: "\"Story of Bahrain\" Book", ar: "كتاب قصة البحرين" }, category: "book", unitCost: 60, currency: "BHD", quantityOnHand: 14, reorderThreshold: 6, photos: [] },
  { id: "gs-par-06", postingId: "post-paris", itemName: { en: "Halwa Tin", ar: "علبة حلوى" }, category: "food", unitCost: 35, currency: "BHD", quantityOnHand: 12, reorderThreshold: 5, photos: [] },
  { id: "gs-par-07", postingId: "post-paris", itemName: { en: "Engraved Silver Dates Bowl", ar: "وعاء فضي للتمر" }, category: "ceremonial", unitCost: 220, currency: "BHD", quantityOnHand: 7, reorderThreshold: 3, photos: [] },
  // Tokyo
  { id: "gs-tk-01", postingId: "post-tokyo", itemName: { en: "Bahraini Pearl Necklace", ar: "عقد لؤلؤ بحريني" }, category: "jewelry", unitCost: 850, currency: "BHD", quantityOnHand: 7, reorderThreshold: 3, photos: [] },
  { id: "gs-tk-02", postingId: "post-tokyo", itemName: { en: "Pearl Brooch", ar: "بروش لؤلؤ" }, category: "jewelry", unitCost: 280, currency: "BHD", quantityOnHand: 11, reorderThreshold: 4, photos: [] },
  { id: "gs-tk-03", postingId: "post-tokyo", itemName: { en: "Ceremonial Khanjar", ar: "خنجر تشريفي" }, category: "ceremonial", unitCost: 1400, currency: "BHD", quantityOnHand: 4, reorderThreshold: 2, photos: [] },
  { id: "gs-tk-04", postingId: "post-tokyo", itemName: { en: "Calligraphy Plate", ar: "طبق خط" }, category: "calligraphy", unitCost: 320, currency: "BHD", quantityOnHand: 10, reorderThreshold: 4, photos: [] },
  { id: "gs-tk-05", postingId: "post-tokyo", itemName: { en: "\"Story of Bahrain\" Book", ar: "كتاب قصة البحرين" }, category: "book", unitCost: 60, currency: "BHD", quantityOnHand: 18, reorderThreshold: 6, photos: [] },
  { id: "gs-tk-06", postingId: "post-tokyo", itemName: { en: "Halwa Tin", ar: "علبة حلوى" }, category: "food", unitCost: 35, currency: "BHD", quantityOnHand: 15, reorderThreshold: 5, photos: [] },
  { id: "gs-tk-07", postingId: "post-tokyo", itemName: { en: "Dilmun Replica Artifact", ar: "قطعة دلمونية" }, category: "art", unitCost: 480, currency: "BHD", quantityOnHand: 5, reorderThreshold: 2, photos: [] },
  { id: "gs-tk-08", postingId: "post-tokyo", itemName: { en: "Silver Dates Bowl", ar: "وعاء فضي للتمر" }, category: "ceremonial", unitCost: 220, currency: "BHD", quantityOnHand: 8, reorderThreshold: 3, photos: [] },
  // Washington
  { id: "gs-ws-01", postingId: "post-washington", itemName: { en: "Bahraini Pearl Necklace", ar: "عقد لؤلؤ بحريني" }, category: "jewelry", unitCost: 850, currency: "BHD", quantityOnHand: 9, reorderThreshold: 3, photos: [] },
  { id: "gs-ws-02", postingId: "post-washington", itemName: { en: "Pearl Brooch", ar: "بروش لؤلؤ" }, category: "jewelry", unitCost: 280, currency: "BHD", quantityOnHand: 14, reorderThreshold: 4, photos: [] },
  { id: "gs-ws-03", postingId: "post-washington", itemName: { en: "Ceremonial Khanjar", ar: "خنجر تشريفي" }, category: "ceremonial", unitCost: 1400, currency: "BHD", quantityOnHand: 5, reorderThreshold: 2, photos: [] },
  { id: "gs-ws-04", postingId: "post-washington", itemName: { en: "Calligraphy Plate", ar: "طبق خط" }, category: "calligraphy", unitCost: 320, currency: "BHD", quantityOnHand: 14, reorderThreshold: 4, photos: [] },
  { id: "gs-ws-05", postingId: "post-washington", itemName: { en: "\"Story of Bahrain\" Book", ar: "كتاب قصة البحرين" }, category: "book", unitCost: 60, currency: "BHD", quantityOnHand: 22, reorderThreshold: 6, photos: [] },
  { id: "gs-ws-06", postingId: "post-washington", itemName: { en: "Halwa Tin", ar: "علبة حلوى" }, category: "food", unitCost: 35, currency: "BHD", quantityOnHand: 16, reorderThreshold: 5, photos: [] },
  { id: "gs-ws-07", postingId: "post-washington", itemName: { en: "Dilmun Artifact", ar: "قطعة دلمونية" }, category: "art", unitCost: 480, currency: "BHD", quantityOnHand: 4, reorderThreshold: 2, photos: [] },
  { id: "gs-ws-08", postingId: "post-washington", itemName: { en: "Silver Dates Bowl", ar: "وعاء فضي للتمر" }, category: "ceremonial", unitCost: 220, currency: "BHD", quantityOnHand: 12, reorderThreshold: 3, photos: [] },
];

// ---------- Gifts Received (~30 total) ----------
const GIFTS_RECEIVED = [
  // Tokyo (5) — note: Imari vases convert to actual asset in the Majlis
  { id: "gr-tk-01", postingId: "post-tokyo", propertyId: "prop-tokyo", fromPerson: "H.E. Foreign Minister of Japan", fromCountry: "Japan", occasion: "Bilateral meeting", receivedDate: "2025-03-14", itemDescription: { en: "Pair of Imari porcelain vases", ar: "زوج من مزهريات الإيماري" }, estimatedValue: 4500, currency: "BHD", photos: [], disposition: "state-property", dispositionDate: "2025-03-20", convertedToAssetId: "ast-mj-vase-pair" },
  { id: "gr-tk-02", postingId: "post-tokyo", propertyId: "prop-tokyo", fromPerson: "Imperial Household Agency", fromCountry: "Japan", occasion: "State visit", receivedDate: "2022-04-18", itemDescription: { en: "Lacquered folding screen", ar: "ساتر خشبي مطلي" }, estimatedValue: 3200, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-tk-03", postingId: "post-tokyo", propertyId: "prop-tokyo", fromPerson: "Mayor of Yokohama", fromCountry: "Japan", occasion: "City reception", receivedDate: "2025-09-22", itemDescription: { en: "Hand-thrown ceramic tea set", ar: "طقم شاي خزفي" }, estimatedValue: 380, currency: "BHD", photos: [], disposition: "personal-to-ambassador", dispositionDate: "2025-10-02" },
  { id: "gr-tk-04", postingId: "post-tokyo", propertyId: "prop-tokyo", fromPerson: "Trade delegation", fromCountry: "Japan", occasion: "Trade fair", receivedDate: "2025-11-14", itemDescription: { en: "Engraved silver tray", ar: "صينية فضية محفورة" }, estimatedValue: 600, currency: "BHD", photos: [], disposition: "pending-decision" },
  { id: "gr-tk-05", postingId: "post-tokyo", propertyId: "prop-tokyo", fromPerson: "Consul of South Korea", fromCountry: "South Korea", occasion: "National Day reception", receivedDate: "2024-12-16", itemDescription: { en: "Celadon glazed bowl", ar: "وعاء سيلادون" }, estimatedValue: 800, currency: "BHD", photos: [], disposition: "state-property" },

  // London (8)
  { id: "gr-lon-01", postingId: "post-london", propertyId: "prop-london", fromPerson: "Corporate delegation (Saxe Holdings)", fromCountry: "United Kingdom", occasion: "Business roundtable", receivedDate: "2024-06-22", itemDescription: { en: "Rolex Submariner watch", ar: "ساعة رولكس" }, estimatedValue: 12000, currency: "BHD", photos: [], disposition: "declined", dispositionDate: "2024-06-25", dispositionNotes: "Returned — exceeds value threshold and donor intent unclear." },
  { id: "gr-lon-02", postingId: "post-london", propertyId: "prop-london", fromPerson: "H.M. King of Morocco", fromCountry: "Morocco", occasion: "State visit", receivedDate: "2024-09-05", itemDescription: { en: "Hand-bound Quran with gold leaf", ar: "مصحف مذهب مجلد يدوياً" }, estimatedValue: 8000, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-lon-03", postingId: "post-london", propertyId: "prop-london", fromPerson: "Lord Mayor of Westminster", fromCountry: "United Kingdom", occasion: "Civic reception", receivedDate: "2025-02-14", itemDescription: { en: "Engraved crystal decanter", ar: "إبريق كريستال محفور" }, estimatedValue: 480, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-lon-04", postingId: "post-london", propertyId: "prop-london", fromPerson: "Cultural attaché — Spain", fromCountry: "Spain", occasion: "Cultural exchange", receivedDate: "2025-05-12", itemDescription: { en: "Italian leather portfolio", ar: "حافظة جلدية إيطالية" }, estimatedValue: 200, currency: "BHD", photos: [], disposition: "personal-to-ambassador" },
  { id: "gr-lon-05", postingId: "post-london", propertyId: "prop-london", fromPerson: "Naval delegation", fromCountry: "United Kingdom", occasion: "Naval cooperation summit", receivedDate: "2024-11-18", itemDescription: { en: "Antique brass sextant", ar: "نسخة برونزية أثرية" }, estimatedValue: 3200, currency: "BHD", photos: [], disposition: "ministry-museum", dispositionDate: "2024-12-01" },
  { id: "gr-lon-06", postingId: "post-london", propertyId: "prop-london", fromPerson: "Royal Family staff member", fromCountry: "United Kingdom", occasion: "Garden party", receivedDate: "2025-07-08", itemDescription: { en: "Silver ceremonial pen set", ar: "طقم أقلام فضي" }, estimatedValue: 720, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-lon-07", postingId: "post-london", propertyId: "prop-london", fromPerson: "House of Lords speaker", fromCountry: "United Kingdom", occasion: "Parliamentary friendship", receivedDate: "2025-10-12", itemDescription: { en: "Leather-bound history of Westminster", ar: "كتاب ويستمنستر مجلد" }, estimatedValue: 180, currency: "BHD", photos: [], disposition: "personal-to-ambassador" },
  { id: "gr-lon-08", postingId: "post-london", propertyId: "prop-london", fromPerson: "Ambassador of Pakistan", fromCountry: "Pakistan", occasion: "Diplomatic dinner", receivedDate: "2025-12-04", itemDescription: { en: "Engraved gold-plated tea set", ar: "طقم شاي مذهب" }, estimatedValue: 1200, currency: "BHD", photos: [], disposition: "state-property" },

  // Paris (7)
  { id: "gr-par-01", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "President of France's Chief of Staff", fromCountry: "France", occasion: "Bastille Day reception", receivedDate: "2025-07-14", itemDescription: { en: "Sèvres porcelain vase", ar: "مزهرية سيفر" }, estimatedValue: 2400, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-par-02", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "Mayor of Paris", fromCountry: "France", occasion: "Civic medal ceremony", receivedDate: "2024-11-22", itemDescription: { en: "Silver medal of the City", ar: "ميدالية فضية" }, estimatedValue: 320, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-par-03", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "Maison Hermès", fromCountry: "France", occasion: "Cultural sponsorship", receivedDate: "2025-04-04", itemDescription: { en: "Silk scarf — limited edition", ar: "وشاح حريري محدود الإصدار" }, estimatedValue: 720, currency: "BHD", photos: [], disposition: "declined", dispositionNotes: "Returned — corporate gift policy." },
  { id: "gr-par-04", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "Quai d'Orsay protocol", fromCountry: "France", occasion: "Bilateral signing", receivedDate: "2025-01-22", itemDescription: { en: "Bronze figurine — Marianne", ar: "تمثال برونزي" }, estimatedValue: 1400, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-par-05", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "Cultural attaché — Italy", fromCountry: "Italy", occasion: "Cultural exchange", receivedDate: "2025-06-30", itemDescription: { en: "Murano glass centerpiece", ar: "قطعة زجاج مورانو" }, estimatedValue: 880, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-par-06", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "President of Senegal's envoy", fromCountry: "Senegal", occasion: "Africa Day reception", receivedDate: "2025-05-25", itemDescription: { en: "Carved wooden mask", ar: "قناع خشبي محفور" }, estimatedValue: 240, currency: "BHD", photos: [], disposition: "personal-to-ambassador" },
  { id: "gr-par-07", postingId: "post-paris", propertyId: "prop-paris", fromPerson: "OECD Secretary-General", fromCountry: "France", occasion: "Membership anniversary", receivedDate: "2025-09-18", itemDescription: { en: "Engraved silver pen", ar: "قلم فضي محفور" }, estimatedValue: 280, currency: "BHD", photos: [], disposition: "personal-to-ambassador" },

  // Washington (8)
  { id: "gr-ws-01", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Speaker of the House", fromCountry: "United States", occasion: "Capitol reception", receivedDate: "2025-03-04", itemDescription: { en: "Engraved gavel", ar: "مطرقة محفورة" }, estimatedValue: 320, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-ws-02", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "U.S. Secretary of State", fromCountry: "United States", occasion: "Strategic Dialogue", receivedDate: "2025-06-12", itemDescription: { en: "Crystal eagle sculpture", ar: "نسر كريستال" }, estimatedValue: 1800, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-ws-03", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Senator (R-TX)", fromCountry: "United States", occasion: "Trade discussion", receivedDate: "2025-08-22", itemDescription: { en: "Engraved leather-bound notebook", ar: "دفتر جلدي محفور" }, estimatedValue: 220, currency: "BHD", photos: [], disposition: "personal-to-ambassador" },
  { id: "gr-ws-04", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Smithsonian Director", fromCountry: "United States", occasion: "Museum tour", receivedDate: "2025-04-18", itemDescription: { en: "Limited-edition print — Bahrain trade routes", ar: "طبعة محدودة" }, estimatedValue: 480, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-ws-05", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Saudi Arabian Ambassador", fromCountry: "Saudi Arabia", occasion: "GCC reception", receivedDate: "2025-02-08", itemDescription: { en: "Inlaid wooden box", ar: "صندوق خشبي مطعّم" }, estimatedValue: 1100, currency: "BHD", photos: [], disposition: "state-property" },
  { id: "gr-ws-06", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Mayor of New York", fromCountry: "United States", occasion: "City visit", receivedDate: "2025-11-04", itemDescription: { en: "Crystal apple paperweight", ar: "تفاحة كريستال" }, estimatedValue: 240, currency: "BHD", photos: [], disposition: "personal-to-ambassador" },
  { id: "gr-ws-07", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Commander, Naval War College", fromCountry: "United States", occasion: "Defense cooperation", receivedDate: "2025-05-14", itemDescription: { en: "Antique ship's compass", ar: "بوصلة سفينة أثرية" }, estimatedValue: 2800, currency: "BHD", photos: [], disposition: "ministry-museum", dispositionDate: "2025-06-01" },
  { id: "gr-ws-08", postingId: "post-washington", propertyId: "prop-washington", fromPerson: "Mayor of Boston", fromCountry: "United States", occasion: "Sister city declaration", receivedDate: "2025-12-12", itemDescription: { en: "Silver Liberty Bell replica", ar: "نسخة جرس الحرية" }, estimatedValue: 540, currency: "BHD", photos: [], disposition: "state-property" },
];

// ---------- Gifts Given (~50 total) ----------
function ggen(prefix, postingId, count, sources) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const s = sources[i % sources.length];
    const date = `2025-${String(((i * 3) % 12) + 1).padStart(2, "0")}-${String(((i * 5) % 27) + 1).padStart(2, "0")}`;
    out.push({
      id: `gg-${prefix}-${String(i + 1).padStart(2, "0")}`, postingId,
      toPerson: s.who, toCountry: s.country, occasion: s.occasion,
      givenDate: date,
      itemDescription: { en: s.item_en, ar: s.item_ar },
      cost: s.cost, currency: "BHD",
      photos: [], source: s.source, giftStockId: s.giftStockId,
    });
  }
  return out;
}
const GIFTS_GIVEN = [
  ...ggen("lon", "post-london", 13, [
    { who: "wife of Foreign Minister of UK", country: "UK", occasion: "National Day reception", item_en: "Pearl brooch", item_ar: "بروش لؤلؤ", cost: 280, source: "gift-stock", giftStockId: "gs-lon-02" },
    { who: "Speaker of the House of Commons", country: "UK", occasion: "Parliamentary banquet", item_en: "Calligraphy plate", item_ar: "طبق خط", cost: 320, source: "gift-stock", giftStockId: "gs-lon-04" },
    { who: "Lord Mayor of London", country: "UK", occasion: "City freedom ceremony", item_en: "Ceremonial khanjar", item_ar: "خنجر تشريفي", cost: 1400, source: "gift-stock", giftStockId: "gs-lon-03" },
    { who: "Cultural attaché — Saudi", country: "Saudi Arabia", occasion: "Diplomatic dinner", item_en: "\"Story of Bahrain\" book set", item_ar: "كتاب قصة البحرين", cost: 240, source: "custom-purchased" },
    { who: "Pakistani delegation", country: "Pakistan", occasion: "Cultural exchange", item_en: "Halwa tin", item_ar: "علبة حلوى", cost: 35, source: "gift-stock", giftStockId: "gs-lon-06" },
    { who: "Visiting Foreign Minister", country: "Egypt", occasion: "Bilateral talks", item_en: "Pearl necklace", item_ar: "عقد لؤلؤ", cost: 850, source: "gift-stock", giftStockId: "gs-lon-01" },
    { who: "Trade delegation", country: "Germany", occasion: "Trade summit", item_en: "Silver dates bowl", item_ar: "وعاء فضي للتمر", cost: 220, source: "gift-stock", giftStockId: "gs-lon-08" },
  ]),
  ...ggen("par", "post-paris", 12, [
    { who: "incoming French Ambassador", country: "France", occasion: "Credentials ceremony", item_en: "Ceremonial khanjar", item_ar: "خنجر تشريفي", cost: 1400, source: "gift-stock", giftStockId: "gs-par-03" },
    { who: "Mayor of Paris", country: "France", occasion: "City reception", item_en: "Calligraphy plate", item_ar: "طبق خط", cost: 320, source: "gift-stock", giftStockId: "gs-par-04" },
    { who: "Wife of OECD Secretary-General", country: "France", occasion: "Anniversary dinner", item_en: "Pearl brooch", item_ar: "بروش لؤلؤ", cost: 280, source: "gift-stock", giftStockId: "gs-par-02" },
    { who: "Visiting Senegalese delegation", country: "Senegal", occasion: "Africa Day", item_en: "Halwa tin", item_ar: "علبة حلوى", cost: 35, source: "gift-stock", giftStockId: "gs-par-06" },
    { who: "Wife of Italian Ambassador", country: "Italy", occasion: "EU Day reception", item_en: "Pearl necklace", item_ar: "عقد لؤلؤ", cost: 850, source: "gift-stock", giftStockId: "gs-par-01" },
  ]),
  ...ggen("tk", "post-tokyo", 14, [
    { who: "Japanese parliamentarians", country: "Japan", occasion: "Friendship visit", item_en: "\"Story of Bahrain\" book set", item_ar: "كتاب قصة البحرين", cost: 240, source: "custom-purchased" },
    { who: "Mayor of Yokohama", country: "Japan", occasion: "Sister city ceremony", item_en: "Calligraphy plate", item_ar: "طبق خط", cost: 320, source: "gift-stock", giftStockId: "gs-tk-04" },
    { who: "Imperial Household Agency rep", country: "Japan", occasion: "State visit reciprocity", item_en: "Ceremonial khanjar", item_ar: "خنجر تشريفي", cost: 1400, source: "gift-stock", giftStockId: "gs-tk-03" },
    { who: "Korean Ambassador's wife", country: "South Korea", occasion: "National Day", item_en: "Pearl brooch", item_ar: "بروش لؤلؤ", cost: 280, source: "gift-stock", giftStockId: "gs-tk-02" },
    { who: "Trade delegation", country: "Singapore", occasion: "Trade fair", item_en: "Halwa tin", item_ar: "علبة حلوى", cost: 35, source: "gift-stock", giftStockId: "gs-tk-06" },
    { who: "Visiting parliamentary speaker", country: "Australia", occasion: "Bilateral visit", item_en: "Dilmun replica", item_ar: "قطعة دلمونية", cost: 480, source: "gift-stock", giftStockId: "gs-tk-07" },
  ]),
  ...ggen("ws", "post-washington", 14, [
    { who: "Senator (D-CA)", country: "USA", occasion: "Cooperation luncheon", item_en: "Calligraphy plate", item_ar: "طبق خط", cost: 320, source: "gift-stock", giftStockId: "gs-ws-04" },
    { who: "U.S. Trade Representative", country: "USA", occasion: "FTA review meeting", item_en: "Pearl necklace", item_ar: "عقد لؤلؤ", cost: 850, source: "gift-stock", giftStockId: "gs-ws-01" },
    { who: "Secretary of Defense", country: "USA", occasion: "Strategic Dialogue", item_en: "Ceremonial khanjar", item_ar: "خنجر تشريفي", cost: 1400, source: "gift-stock", giftStockId: "gs-ws-03" },
    { who: "Smithsonian Director", country: "USA", occasion: "Cultural partnership", item_en: "\"Story of Bahrain\" book set", item_ar: "كتاب قصة البحرين", cost: 240, source: "custom-purchased" },
    { who: "Chair, Senate Foreign Relations", country: "USA", occasion: "Hearing visit", item_en: "Silver dates bowl", item_ar: "وعاء فضي للتمر", cost: 220, source: "gift-stock", giftStockId: "gs-ws-08" },
    { who: "Wife of Secretary of State", country: "USA", occasion: "State dinner", item_en: "Pearl brooch", item_ar: "بروش لؤلؤ", cost: 280, source: "gift-stock", giftStockId: "gs-ws-02" },
  ]),
];

function getGiftStock(postingId)    { return GIFT_STOCK.filter(g => g.postingId === postingId); }
function getGiftsReceived(postingId){ return GIFTS_RECEIVED.filter(g => g.postingId === postingId); }
function getGiftsGiven(postingId)   { return GIFTS_GIVEN.filter(g => g.postingId === postingId); }
function getLowStock(postingId)     { return GIFT_STOCK.filter(g => g.postingId === postingId && g.quantityOnHand <= g.reorderThreshold); }

Object.assign(window, {
  GIFT_STOCK, GIFTS_RECEIVED, GIFTS_GIVEN,
  getGiftStock, getGiftsReceived, getGiftsGiven, getLowStock,
});
