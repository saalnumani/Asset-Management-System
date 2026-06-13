/* global window */
// ============================================================
// House-level data: kitchen inventory, bills, events, garden
// items, documents & warranties — per property
// ============================================================

// ---------- Kitchen Inventory ----------
const KITCHEN_ITEMS = [
  // Tokyo
  { id: "ki-tk-01", propertyId: "prop-tokyo", item: { en: "Pot Set", ar: "طقم قدور" }, category: { en: "Cookware", ar: "أواني الطهي" }, qty: 12, brand: "Tefal", condition: "good", purchaseDate: "2022-03-15", replacementDate: "2027-03-15", cost: 380, currency: "BHD", invoice: true },
  { id: "ki-tk-02", propertyId: "prop-tokyo", item: { en: "Knife Set", ar: "طقم سكاكين" }, category: { en: "Cutlery", ar: "أدوات القطع" }, qty: 8, brand: "Zwilling", condition: "excellent", purchaseDate: "2024-01-10", replacementDate: "2030-01-10", cost: 520, currency: "BHD", invoice: true },
  { id: "ki-tk-03", propertyId: "prop-tokyo", item: { en: "Rice Cooker", ar: "طباخة أرز" }, category: { en: "Appliances", ar: "أجهزة" }, qty: 1, brand: "Panasonic", condition: "excellent", purchaseDate: "2023-06-20", replacementDate: "2029-06-20", cost: 180, currency: "BHD", invoice: true },
  { id: "ki-tk-04", propertyId: "prop-tokyo", item: { en: "Blender", ar: "خلاط" }, category: { en: "Appliances", ar: "أجهزة" }, qty: 1, brand: "KitchenAid", condition: "good", purchaseDate: "2021-09-01", replacementDate: "2027-09-01", cost: 240, currency: "BHD", invoice: true },
  { id: "ki-tk-05", propertyId: "prop-tokyo", item: { en: "Frying Pans Set", ar: "طقم مقالي" }, category: { en: "Cookware", ar: "أواني الطهي" }, qty: 4, brand: "Le Creuset", condition: "good", purchaseDate: "2022-03-15", replacementDate: "2028-03-15", cost: 460, currency: "BHD", invoice: true },
  { id: "ki-tk-06", propertyId: "prop-tokyo", item: { en: "Coffee Machine", ar: "ماكينة قهوة" }, category: { en: "Appliances", ar: "أجهزة" }, qty: 1, brand: "De'Longhi", condition: "excellent", purchaseDate: "2024-02-14", replacementDate: "2030-02-14", cost: 680, currency: "BHD", invoice: true },
  { id: "ki-tk-07", propertyId: "prop-tokyo", item: { en: "Serving Trays", ar: "صوايات تقديم" }, category: { en: "Serveware", ar: "أواني تقديم" }, qty: 6, brand: "—", condition: "good", purchaseDate: "2020-11-08", replacementDate: "2026-11-08", cost: 120, currency: "BHD", invoice: false },
  { id: "ki-tk-08", propertyId: "prop-tokyo", item: { en: "Plates & Cups Set", ar: "طقم أطباق وأكواب" }, category: { en: "Tableware", ar: "أواني مائدة" }, qty: 48, brand: "Villeroy & Boch", condition: "excellent", purchaseDate: "2023-12-01", replacementDate: "2030-12-01", cost: 1200, currency: "BHD", invoice: true },

  // London
  { id: "ki-lon-01", propertyId: "prop-london", item: { en: "Pot Set", ar: "طقم قدور" }, category: { en: "Cookware", ar: "أواني الطهي" }, qty: 10, brand: "All-Clad", condition: "excellent", purchaseDate: "2021-04-10", replacementDate: "2027-04-10", cost: 520, currency: "BHD", invoice: true },
  { id: "ki-lon-02", propertyId: "prop-london", item: { en: "Knife Set", ar: "طقم سكاكين" }, category: { en: "Cutlery", ar: "أدوات القطع" }, qty: 10, brand: "Sabatier", condition: "excellent", purchaseDate: "2019-09-15", replacementDate: "2026-09-15", cost: 480, currency: "BHD", invoice: true },
  { id: "ki-lon-03", propertyId: "prop-london", item: { en: "Stand Mixer", ar: "خلاط ثابت" }, category: { en: "Appliances", ar: "أجهزة" }, qty: 1, brand: "KitchenAid", condition: "good", purchaseDate: "2020-03-12", replacementDate: "2027-03-12", cost: 620, currency: "BHD", invoice: true },
  { id: "ki-lon-04", propertyId: "prop-london", item: { en: "Espresso Machine", ar: "ماكينة إسبريسو" }, category: { en: "Appliances", ar: "أجهزة" }, qty: 1, brand: "La Marzocco", condition: "excellent", purchaseDate: "2023-07-20", replacementDate: "2030-07-20", cost: 1800, currency: "BHD", invoice: true },
  { id: "ki-lon-05", propertyId: "prop-london", item: { en: "Baking Trays Set", ar: "طقم صوايات خبز" }, category: { en: "Bakeware", ar: "أواني خبز" }, qty: 8, brand: "Nordic Ware", condition: "good", purchaseDate: "2022-11-20", replacementDate: "2028-11-20", cost: 160, currency: "BHD", invoice: true },

  // Paris
  { id: "ki-par-01", propertyId: "prop-paris", item: { en: "Pot Set", ar: "طقم قدور" }, category: { en: "Cookware", ar: "أواني الطهي" }, qty: 8, brand: "Cristel", condition: "excellent", purchaseDate: "2022-09-01", replacementDate: "2028-09-01", cost: 680, currency: "BHD", invoice: true },
  { id: "ki-par-02", propertyId: "prop-paris", item: { en: "Knife Set", ar: "طقم سكاكين" }, category: { en: "Cutlery", ar: "أدوات القطع" }, qty: 8, brand: "Laguiole", condition: "excellent", purchaseDate: "2023-04-15", replacementDate: "2030-04-15", cost: 560, currency: "BHD", invoice: true },
  { id: "ki-par-03", propertyId: "prop-paris", item: { en: "Coffee Machine", ar: "ماكينة قهوة" }, category: { en: "Appliances", ar: "أجهزة" }, qty: 1, brand: "Nespresso", condition: "good", purchaseDate: "2021-06-10", replacementDate: "2027-06-10", cost: 280, currency: "BHD", invoice: true },

  // Washington
  { id: "ki-ws-01", propertyId: "prop-washington", item: { en: "Pot Set", ar: "طقم قدور" }, category: { en: "Cookware", ar: "أواني الطهي" }, qty: 12, brand: "Calphalon", condition: "good", purchaseDate: "2020-08-14", replacementDate: "2026-08-14", cost: 420, currency: "BHD", invoice: true },
  { id: "ki-ws-02", propertyId: "prop-washington", item: { en: "Knife Set", ar: "طقم سكاكين" }, category: { en: "Cutlery", ar: "أدوات القطع" }, qty: 10, brand: "Wüsthof", condition: "excellent", purchaseDate: "2022-01-25", replacementDate: "2029-01-25", cost: 590, currency: "BHD", invoice: true },
  { id: "ki-ws-03", propertyId: "prop-washington", item: { en: "State Dinner Service", ar: "طقم عشاء رسمي" }, category: { en: "Tableware", ar: "أواني مائدة" }, qty: 96, brand: "Lenox", condition: "good", purchaseDate: "2018-04-20", replacementDate: "2026-04-20", cost: 3200, currency: "BHD", invoice: true },
];

function getKitchenItems(propertyId) { return KITCHEN_ITEMS.filter(k => k.propertyId === propertyId); }

// ---------- Garden & Pool Items ----------
const GARDEN_ITEMS = [
  { id: "gi-tk-01", propertyId: "prop-tokyo", item: { en: "Irrigation System", ar: "نظام الري" }, location: { en: "Garden", ar: "الحديقة" }, condition: "good", lastService: "2025-05-10", nextService: "2025-10-10", company: "GreenTech Japan", notes: "" },
  { id: "gi-tk-02", propertyId: "prop-tokyo", item: { en: "Pool Pump", ar: "مضخة المسبح" }, location: { en: "Pool", ar: "المسبح" }, condition: "excellent", lastService: "2026-01-15", nextService: "2026-07-15", company: "AquaPro Tokyo", notes: "" },
  { id: "gi-tk-03", propertyId: "prop-tokyo", item: { en: "Outdoor Furniture Set", ar: "أثاث خارجي" }, location: { en: "Garden", ar: "الحديقة" }, condition: "good", lastService: "2025-04-01", nextService: "2025-10-01", company: "—", notes: "Teak set — seasonal weatherproofing needed" },
  { id: "gi-tk-04", propertyId: "prop-tokyo", item: { en: "Garden Lighting", ar: "إنارة الحديقة" }, location: { en: "Garden", ar: "الحديقة" }, condition: "excellent", lastService: "2025-09-01", nextService: "2026-03-01", company: "NipponElec", notes: "" },

  { id: "gi-lon-01", propertyId: "prop-london", item: { en: "Irrigation System", ar: "نظام الري" }, location: { en: "Garden", ar: "الحديقة" }, condition: "good", lastService: "2025-04-20", nextService: "2025-10-20", company: "LondonGreenscapes", notes: "" },
  { id: "gi-lon-02", propertyId: "prop-london", item: { en: "Garden Shed", ar: "مستودع الحديقة" }, location: { en: "Garden", ar: "الحديقة" }, condition: "fair", lastService: "2024-10-05", nextService: "2025-04-05", company: "—", notes: "Door hinges require replacement" },
  { id: "gi-lon-03", propertyId: "prop-london", item: { en: "Lawn Mower", ar: "جزازة العشب" }, location: { en: "Garden", ar: "الحديقة" }, condition: "good", lastService: "2025-03-12", nextService: "2025-09-12", company: "—", notes: "" },

  { id: "gi-par-01", propertyId: "prop-paris", item: { en: "Fountain Pump", ar: "مضخة النافورة" }, location: { en: "Courtyard", ar: "الفناء" }, condition: "good", lastService: "2025-06-01", nextService: "2025-12-01", company: "Paysages Paris", notes: "" },
  { id: "gi-par-02", propertyId: "prop-paris", item: { en: "Irrigation System", ar: "نظام الري" }, location: { en: "Garden", ar: "الحديقة" }, condition: "excellent", lastService: "2025-04-15", nextService: "2025-10-15", company: "Paysages Paris", notes: "" },

  { id: "gi-ws-01", propertyId: "prop-washington", item: { en: "Pool Pump", ar: "مضخة المسبح" }, location: { en: "Pool", ar: "المسبح" }, condition: "excellent", lastService: "2026-01-20", nextService: "2026-07-20", company: "CapitalPools", notes: "" },
  { id: "gi-ws-02", propertyId: "prop-washington", item: { en: "Irrigation System", ar: "نظام الري" }, location: { en: "Garden", ar: "الحديقة" }, condition: "good", lastService: "2025-04-01", nextService: "2025-10-01", company: "GreenDC", notes: "" },
  { id: "gi-ws-03", propertyId: "prop-washington", item: { en: "Outdoor Grill Station", ar: "محطة شوي خارجية" }, location: { en: "Terrace", ar: "التراس" }, condition: "good", lastService: "2025-05-15", nextService: "2025-11-15", company: "—", notes: "" },
];

function getGardenItems(propertyId) { return GARDEN_ITEMS.filter(g => g.propertyId === propertyId); }

// ---------- Bills & Expenses ----------
const BILLS = [
  // Tokyo
  { id: "bl-tk-01", propertyId: "prop-tokyo", type: { en: "Electricity", ar: "كهرباء" }, date: "2026-04-01", amount: 480, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-tk-02", propertyId: "prop-tokyo", type: { en: "Water", ar: "ماء" }, date: "2026-04-01", amount: 62, currency: "BHD", payment: "card", linkedTo: { en: "Garden", ar: "الحديقة" }, notes: "" },
  { id: "bl-tk-03", propertyId: "prop-tokyo", type: { en: "Gas", ar: "غاز" }, date: "2026-04-01", amount: 88, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "Overdue" },
  { id: "bl-tk-04", propertyId: "prop-tokyo", type: { en: "Internet & Phone", ar: "إنترنت وهاتف" }, date: "2026-04-05", amount: 120, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-tk-05", propertyId: "prop-tokyo", type: { en: "Kitchen Purchase", ar: "مشتريات مطبخ" }, date: "2026-02-18", amount: 280, currency: "BHD", payment: "cash", linkedTo: { en: "Kitchen", ar: "المطبخ" }, notes: "Plates + Cups replacement" },
  { id: "bl-tk-06", propertyId: "prop-tokyo", type: { en: "Electricity", ar: "كهرباء" }, date: "2026-03-01", amount: 460, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-tk-07", propertyId: "prop-tokyo", type: { en: "Water", ar: "ماء" }, date: "2026-03-01", amount: 58, currency: "BHD", payment: "card", linkedTo: { en: "Garden", ar: "الحديقة" }, notes: "" },
  { id: "bl-tk-08", propertyId: "prop-tokyo", type: { en: "Security System Fee", ar: "رسوم الأمن" }, date: "2026-04-10", amount: 320, currency: "BHD", payment: "transfer", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },

  // London
  { id: "bl-lon-01", propertyId: "prop-london", type: { en: "Electricity", ar: "كهرباء" }, date: "2026-04-01", amount: 820, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-lon-02", propertyId: "prop-london", type: { en: "Water", ar: "ماء" }, date: "2026-04-01", amount: 140, currency: "BHD", payment: "card", linkedTo: { en: "Garden", ar: "الحديقة" }, notes: "" },
  { id: "bl-lon-03", propertyId: "prop-london", type: { en: "Council Tax", ar: "ضريبة البلدية" }, date: "2026-04-01", amount: 980, currency: "BHD", payment: "transfer", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-lon-04", propertyId: "prop-london", type: { en: "Gas", ar: "غاز" }, date: "2026-04-01", amount: 360, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-lon-05", propertyId: "prop-london", type: { en: "Electricity", ar: "كهرباء" }, date: "2026-03-01", amount: 790, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },

  // Paris
  { id: "bl-par-01", propertyId: "prop-paris", type: { en: "Electricity", ar: "كهرباء" }, date: "2026-04-01", amount: 620, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-par-02", propertyId: "prop-paris", type: { en: "Water", ar: "ماء" }, date: "2026-04-01", amount: 95, currency: "BHD", payment: "card", linkedTo: { en: "Garden", ar: "الحديقة" }, notes: "" },
  { id: "bl-par-03", propertyId: "prop-paris", type: { en: "Telephone", ar: "هاتف" }, date: "2026-04-05", amount: 110, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },

  // Washington
  { id: "bl-ws-01", propertyId: "prop-washington", type: { en: "Electricity", ar: "كهرباء" }, date: "2026-04-01", amount: 740, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-ws-02", propertyId: "prop-washington", type: { en: "Water", ar: "ماء" }, date: "2026-04-01", amount: 120, currency: "BHD", payment: "card", linkedTo: { en: "House + Pool", ar: "المنزل والمسبح" }, notes: "" },
  { id: "bl-ws-03", propertyId: "prop-washington", type: { en: "Security System Fee", ar: "رسوم الأمن" }, date: "2026-04-10", amount: 480, currency: "BHD", payment: "transfer", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
  { id: "bl-ws-04", propertyId: "prop-washington", type: { en: "Gas", ar: "غاز" }, date: "2026-04-01", amount: 210, currency: "BHD", payment: "card", linkedTo: { en: "House", ar: "المنزل" }, notes: "" },
];

function getBills(propertyId) { return BILLS.filter(b => b.propertyId === propertyId); }

// ---------- Events & Occasions ----------
const EVENTS = [
  // Tokyo
  { id: "ev-tk-01", propertyId: "prop-tokyo", event: { en: "National Day Reception", ar: "استقبال اليوم الوطني" }, date: "2025-12-16", guests: 120, budget: 4200, currency: "BHD", purchases: { en: "Flowers, catering, décor", ar: "زهور، تموين، ديكور" }, location: { en: "Grand Majlis + Garden", ar: "المجلس الكبير والحديقة" }, notes: "" },
  { id: "ev-tk-02", propertyId: "prop-tokyo", event: { en: "Ambassador's Dinner", ar: "عشاء السفير" }, date: "2026-02-18", guests: 24, budget: 1400, currency: "BHD", purchases: { en: "Catering, flowers", ar: "تموين وزهور" }, location: { en: "Dining Room", ar: "غرفة الطعام" }, notes: "" },
  { id: "ev-tk-03", propertyId: "prop-tokyo", event: { en: "Cultural Week Opening", ar: "افتتاح الأسبوع الثقافي" }, date: "2026-03-10", guests: 80, budget: 2800, currency: "BHD", purchases: { en: "Decorations, gifts, catering", ar: "ديكور، هدايا، تموين" }, location: { en: "Reception Hall", ar: "قاعة الاستقبال" }, notes: "" },
  { id: "ev-tk-04", propertyId: "prop-tokyo", event: { en: "Farewell Ceremony", ar: "حفل الوداع" }, date: "2026-05-20", guests: 50, budget: 1800, currency: "BHD", purchases: { en: "Flowers, gifts", ar: "زهور وهدايا" }, location: { en: "Grand Majlis", ar: "المجلس الكبير" }, notes: "Outgoing ambassador" },

  // London
  { id: "ev-lon-01", propertyId: "prop-london", event: { en: "National Day Reception", ar: "استقبال اليوم الوطني" }, date: "2025-12-16", guests: 200, budget: 8500, currency: "BHD", purchases: { en: "Catering, flowers, band", ar: "تموين، زهور، فرقة موسيقية" }, location: { en: "Grand Reception + Garden", ar: "قاعة الاستقبال والحديقة" }, notes: "" },
  { id: "ev-lon-02", propertyId: "prop-london", event: { en: "Diplomatic Dinner", ar: "عشاء دبلوماسي" }, date: "2026-01-22", guests: 30, budget: 2200, currency: "BHD", purchases: { en: "Catering, flowers", ar: "تموين وزهور" }, location: { en: "Dining Room", ar: "غرفة الطعام" }, notes: "" },
  { id: "ev-lon-03", propertyId: "prop-london", event: { en: "Garden Party", ar: "حفلة الحديقة" }, date: "2026-06-15", guests: 80, budget: 3400, currency: "BHD", purchases: { en: "Marquee hire, catering", ar: "إيجار خيمة، تموين" }, location: { en: "Garden", ar: "الحديقة" }, notes: "" },

  // Paris
  { id: "ev-par-01", propertyId: "prop-paris", event: { en: "National Day Reception", ar: "استقبال اليوم الوطني" }, date: "2025-12-16", guests: 150, budget: 6200, currency: "BHD", purchases: { en: "Catering, décor", ar: "تموين وديكور" }, location: { en: "Embassy Hall", ar: "قاعة السفارة" }, notes: "" },
  { id: "ev-par-02", propertyId: "prop-paris", event: { en: "Bastille Day Dinner", ar: "عشاء يوم الباستيل" }, date: "2025-07-14", guests: 40, budget: 2800, currency: "BHD", purchases: { en: "Catering, flowers", ar: "تموين وزهور" }, location: { en: "Dining Room", ar: "غرفة الطعام" }, notes: "" },

  // Washington
  { id: "ev-ws-01", propertyId: "prop-washington", event: { en: "National Day Reception", ar: "استقبال اليوم الوطني" }, date: "2025-12-16", guests: 250, budget: 9800, currency: "BHD", purchases: { en: "Catering, flowers, security", ar: "تموين، زهور، أمن" }, location: { en: "Residence + Garden", ar: "المقر والحديقة" }, notes: "" },
  { id: "ev-ws-02", propertyId: "prop-washington", event: { en: "4th of July Dinner", ar: "عشاء الرابع من يوليو" }, date: "2025-07-04", guests: 35, budget: 1900, currency: "BHD", purchases: { en: "Catering", ar: "تموين" }, location: { en: "Terrace", ar: "التراس" }, notes: "" },
  { id: "ev-ws-03", propertyId: "prop-washington", event: { en: "Family Gathering", ar: "لقاء عائلي" }, date: "2026-02-18", guests: 12, budget: 380, currency: "BHD", purchases: { en: "Food, decorations", ar: "طعام وديكور" }, location: { en: "Living Room", ar: "غرفة المعيشة" }, notes: "" },
];

function getEvents(propertyId) { return EVENTS.filter(e => e.propertyId === propertyId); }

// ---------- Documents & Warranties ----------
const DOCUMENTS = [
  // Tokyo
  { id: "doc-tk-01", propertyId: "prop-tokyo", document: { en: "AC Unit Warranty", ar: "ضمان التكييف" }, category: "warranty", relatedItem: { en: "AC Units (x4)", ar: "وحدات التكييف" }, expiry: "2027-06-01", notes: "Attached" },
  { id: "doc-tk-02", propertyId: "prop-tokyo", document: { en: "Vehicle Insurance — Range Rover", ar: "تأمين رنج روفر" }, category: "insurance", relatedItem: { en: "Range Rover 2022", ar: "رنج روفر ٢٠٢٢" }, expiry: "2026-11-08", notes: "Full coverage" },
  { id: "doc-tk-03", propertyId: "prop-tokyo", document: { en: "Property Lease Agreement", ar: "عقد إيجار العقار" }, category: "legal", relatedItem: { en: "Tokyo Residence", ar: "المقر" }, expiry: "2028-03-31", notes: "" },
  { id: "doc-tk-04", propertyId: "prop-tokyo", document: { en: "Building Insurance", ar: "تأمين المبنى" }, category: "insurance", relatedItem: { en: "Full property", ar: "المبنى كاملاً" }, expiry: "2026-12-31", notes: "Lloyd's of London" },
  { id: "doc-tk-05", propertyId: "prop-tokyo", document: { en: "Elevator Service Certificate", ar: "شهادة صيانة المصعد" }, category: "permit", relatedItem: { en: "Elevator", ar: "المصعد" }, expiry: "2026-08-15", notes: "" },
  { id: "doc-tk-06", propertyId: "prop-tokyo", document: { en: "Fire Safety Compliance", ar: "شهادة السلامة من الحريق" }, category: "permit", relatedItem: { en: "Full property", ar: "المبنى كاملاً" }, expiry: "2026-09-30", notes: "" },

  // London
  { id: "doc-lon-01", propertyId: "prop-london", document: { en: "Vehicle Insurance — Lexus LX570", ar: "تأمين ليكزس" }, category: "insurance", relatedItem: { en: "Lexus LX570 2021", ar: "ليكزس ٢٠٢١" }, expiry: "2026-09-04", notes: "Full coverage" },
  { id: "doc-lon-02", propertyId: "prop-london", document: { en: "Building Insurance", ar: "تأمين المبنى" }, category: "insurance", relatedItem: { en: "Belgrave Residence", ar: "مقر بلجريف" }, expiry: "2026-12-31", notes: "Lloyd's of London" },
  { id: "doc-lon-03", propertyId: "prop-london", document: { en: "AC Warranty", ar: "ضمان التكييف" }, category: "warranty", relatedItem: { en: "AC Units", ar: "وحدات التكييف" }, expiry: "2027-01-15", notes: "" },
  { id: "doc-lon-04", propertyId: "prop-london", document: { en: "Persian Rug Conservation Report", ar: "تقرير ترميم السجاد الفارسي" }, category: "document", relatedItem: { en: "Persian-style Rug Pair", ar: "زوج سجاد فارسي" }, expiry: null, notes: "Conservation scheduled June 2026" },

  // Paris
  { id: "doc-par-01", propertyId: "prop-paris", document: { en: "Vehicle Insurance — Mercedes S580", ar: "تأمين مرسيدس" }, category: "insurance", relatedItem: { en: "Mercedes S 580 2023", ar: "مرسيدس ٢٠٢٣" }, expiry: "2026-04-18", notes: "Full coverage" },
  { id: "doc-par-02", propertyId: "prop-paris", document: { en: "Building Insurance", ar: "تأمين المبنى" }, category: "insurance", relatedItem: { en: "Paris Embassy", ar: "مبنى السفارة" }, expiry: "2026-12-31", notes: "" },
  { id: "doc-par-03", propertyId: "prop-paris", document: { en: "Heritage Status Certificate", ar: "شهادة التراث المعماري" }, category: "permit", relatedItem: { en: "Building exterior", ar: "واجهة المبنى" }, expiry: null, notes: "Permanent — restrictions on facade changes" },

  // Washington
  { id: "doc-ws-01", propertyId: "prop-washington", document: { en: "Vehicle Insurance — Cadillac", ar: "تأمين كاديلاك" }, category: "insurance", relatedItem: { en: "Cadillac Escalade 2024", ar: "كاديلاك ٢٠٢٤" }, expiry: "2027-03-12", notes: "Full coverage" },
  { id: "doc-ws-02", propertyId: "prop-washington", document: { en: "Building Insurance", ar: "تأمين المبنى" }, category: "insurance", relatedItem: { en: "Washington Residence", ar: "المقر" }, expiry: "2026-12-31", notes: "" },
  { id: "doc-ws-03", propertyId: "prop-washington", document: { en: "Diplomatic Property Status", ar: "وضع العقار الدبلوماسي" }, category: "legal", relatedItem: { en: "Full property", ar: "المبنى" }, expiry: null, notes: "State Dept. registered" },
  { id: "doc-ws-04", propertyId: "prop-washington", document: { en: "State Service China — Provenance", ar: "وثيقة الأصل — طقم الدولة" }, category: "document", relatedItem: { en: "State Service China (96 pcs)", ar: "طقم رسمي" }, expiry: null, notes: "Museum-grade provenance" },
];

function getDocuments(propertyId) { return DOCUMENTS.filter(d => d.propertyId === propertyId); }

// ---------- Security System (per property) ----------
const SECURITY_SYSTEMS = {
  "prop-tokyo":      { cameras: 14, accessPoints: 6, alarmZones: 8,  monitoring: { en: "24/7 — G4S Japan", ar: "٢٤/٧ — G4S اليابان" }, lastAudit: "2026-01-15", nextAudit: "2026-07-15", notes: { en: "Perimeter + interior + safe-room coverage", ar: "تغطية المحيط والداخل وغرفة الأمان" } },
  "prop-london":     { cameras: 22, accessPoints: 8,  alarmZones: 12, monitoring: { en: "24/7 — G4S UK", ar: "٢٤/٧ — G4S المملكة المتحدة" }, lastAudit: "2025-11-10", nextAudit: "2026-05-10", notes: { en: "Front door, perimeter wall, all floors", ar: "الباب الأمامي والسور والطوابق" } },
  "prop-paris":      { cameras: 18, accessPoints: 6,  alarmZones: 9,  monitoring: { en: "24/7 — Prosegur France", ar: "٢٤/٧ — Prosegur فرنسا" }, lastAudit: "2026-02-20", nextAudit: "2026-08-20", notes: { en: "Courtyard, entrance, all offices", ar: "الفناء والمدخل والمكاتب" } },
  "prop-washington": { cameras: 26, accessPoints: 10, alarmZones: 14, monitoring: { en: "24/7 — Allied Universal", ar: "٢٤/٧ — Allied Universal" }, lastAudit: "2026-01-08", nextAudit: "2026-07-08", notes: { en: "Full diplomatic security protocol — DSS certified", ar: "بروتوكول أمن دبلوماسي كامل — معتمد من DSS" } },
};

const CAMERA_ZONES = [
  { en: "Main Entrance", ar: "المدخل الرئيسي" },
  { en: "Perimeter — Front", ar: "المحيط الأمامي" },
  { en: "Perimeter — Rear", ar: "المحيط الخلفي" },
  { en: "Lobby / Reception", ar: "الردهة والاستقبال" },
  { en: "Grand Majlis", ar: "المجلس الكبير" },
  { en: "Corridor — Ground Floor", ar: "ممر الطابق الأرضي" },
  { en: "Corridor — First Floor", ar: "ممر الطابق الأول" },
  { en: "Kitchen", ar: "المطبخ" },
  { en: "Garden / Pool", ar: "الحديقة والمسبح" },
  { en: "Garage / Parking", ar: "الكراج" },
  { en: "Staff Quarters", ar: "مساكن الموظفين" },
  { en: "Server Room", ar: "غرفة الخوادم" },
];

function getSecuritySystem(propertyId) { return SECURITY_SYSTEMS[propertyId] || null; }

Object.assign(window, {
  KITCHEN_ITEMS, getKitchenItems,
  GARDEN_ITEMS, getGardenItems,
  BILLS, getBills,
  EVENTS, getEvents,
  DOCUMENTS, getDocuments,
  SECURITY_SYSTEMS, CAMERA_ZONES, getSecuritySystem,
});
