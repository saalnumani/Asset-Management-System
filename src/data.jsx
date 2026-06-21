/* global window */
// ============================================================
// Mock data — 4 properties, 200+ audit entries, Tokyo handover
// with 187 items (148 verified, 4 disputed, 1 missing, rest pending)
// ============================================================

const TODAY = new Date("2026-05-08");

// ---------- Users ----------
const USERS = [
  { id: "u-admin",    name: { en: "Khalid Al-Mannai",  ar: "خالد المناعي"  }, role: "admin",            postingId: null,             email: "k.almannai@mofa.gov.bh",   initial: "خ" },
  { id: "u-pm-london",name: { en: "Amal Al-Khalifa",   ar: "أمل آل خليفة"  }, role: "property-manager", postingId: "post-london",    email: "a.alkhalifa@mofa.gov.bh",  initial: "أ", lastLogin: "2026-05-08T08:30:00" },
  { id: "u-pm-paris", name: { en: "Yousif Al-Dosari",  ar: "يوسف الدوسري"  }, role: "property-manager", postingId: "post-paris",     email: "y.aldosari@mofa.gov.bh",   initial: "ي", lastLogin: "2026-05-07T14:10:00" },
  { id: "u-pm-tokyo", name: { en: "Hessa Al-Sulaiti",  ar: "حصة السليطي"   }, role: "property-manager", postingId: "post-tokyo",     email: "h.alsulaiti@mofa.gov.bh",  initial: "ح", lastLogin: "2026-05-08T09:01:00" },
  { id: "u-pm-wash",  name: { en: "Faisal Buhazza",    ar: "فيصل بوهزاع"   }, role: "property-manager", postingId: "post-washington", email: "f.buhazza@mofa.gov.bh",    initial: "ف", lastLogin: "2026-05-06T11:45:00" },
  { id: "u-insp-eu",  name: { en: "Maryam Al-Awadhi",  ar: "مريم العوضي"   }, role: "inspector",        postingId: "post-london",    email: "m.alawadhi@mofa.gov.bh",   initial: "م", lastLogin: "2026-05-05T10:20:00" },
  { id: "u-insp-as",  name: { en: "Saad Al-Binali",    ar: "سعد البنعلي"   }, role: "inspector",        postingId: "post-tokyo",     email: "s.albinali@mofa.gov.bh",   initial: "س", lastLogin: "2026-05-04T16:00:00" },
  { id: "u-aud",      name: { en: "Reem Al-Zayani",    ar: "ريم الزياني"   }, role: "auditor",          postingId: null,             email: "r.alzayani@mofa.gov.bh",   initial: "ر", lastLogin: "2026-05-08T07:55:00" },
];
const CURRENT_USER = USERS[0];

// ---------- Ambassadors (for handover scenario) ----------
const AMBASSADORS = {
  outgoingTokyo: { id: "amb-1", name: "H.E. Dr. Tariq Al-Faisal", nameAr: "سعادة الدكتور طارق الفيصل", rotationDate: "2026-05-22" },
  incomingTokyo: { id: "amb-2", name: "H.E. Dr. Nada Haffadh",    nameAr: "سعادة الدكتورة ندى حفاظ",   arrivalDate: "2026-05-22" },
};

// ---------- Properties ----------
// 7 buildings across 4 postings (cities)
const PROPERTIES = [
  // London — combined residence (single building) + separate chancery
  {
    id: "prop-london",
    postingId: "post-london",
    type: "combined",
    arch: "classical",
    name: { en: "Embassy & Ambassador's Residence — Belgrave Square", ar: "السفارة ومقر السفير — ميدان بلجريف" },
    country: { en: "United Kingdom", ar: "المملكة المتحدة" },
    city: { en: "London", ar: "لندن" },
    address: { en: "30 Belgrave Square, London SW1X 8QB", ar: "٣٠ ميدان بلجريف، لندن" },
    coords: { lat: 51.4988, lng: -0.1547 },
    floorsCount: 3,
    totalArea: 1840, rooms: 15,
    hasGarden: true, hasPool: false,
    acquiredDate: "1981-06-12",
    residentName: { en: "H.E. Shaikh Fawaz Al Khalifa", ar: "سعادة الشيخ فواز آل خليفة" },
    status: "active",
    totalAssetsCount: 412, totalAssetsValue: 612800,
    nextInspection: "2026-06-04",
  },
  {
    id: "prop-london-chancery",
    postingId: "post-london",
    type: "chancery",
    arch: "classical",
    name: { en: "Chancery Office Building — Curzon Street", ar: "مبنى السفارة — شارع كرزون" },
    country: { en: "United Kingdom", ar: "المملكة المتحدة" },
    city: { en: "London", ar: "لندن" },
    address: { en: "8 Curzon Street, Mayfair, London W1J 5HN", ar: "٨ شارع كرزون، مايفير، لندن" },
    coords: { lat: 51.5065, lng: -0.1489 },
    floorsCount: 3,
    totalArea: 1180, rooms: 16,
    hasGarden: false, hasPool: false,
    acquiredDate: "1992-04-08",
    status: "active",
    totalAssetsCount: 200, totalAssetsValue: 291200,
    nextInspection: "2026-07-12",
  },
  // Paris — single combined building
  {
    id: "prop-paris",
    postingId: "post-paris",
    type: "combined",
    arch: "modern",
    name: { en: "Embassy Building — Place des États-Unis", ar: "مبنى السفارة — ميدان الولايات المتحدة" },
    country: { en: "France", ar: "فرنسا" },
    city: { en: "Paris", ar: "باريس" },
    address: { en: "3bis Place des États-Unis, 75116 Paris", ar: "٣ مكرر ميدان الولايات المتحدة، باريس" },
    coords: { lat: 48.8665, lng: 2.2891 },
    floorsCount: 4,
    totalArea: 1260, rooms: 20,
    hasGarden: true, hasPool: false,
    acquiredDate: "1995-03-22",
    residentName: { en: "H.E. Yusra Al-Sulaibikh", ar: "سعادة يسرى السليبيخ" },
    status: "active",
    totalAssetsCount: 412, totalAssetsValue: 658200,
    nextInspection: "2026-05-29",
  },
  // Tokyo — separate residence villa (handover) + chancery tower
  {
    id: "prop-tokyo",
    postingId: "post-tokyo",
    type: "residence",
    arch: "japanese-fusion",
    name: { en: "Ambassador's Residence — Moto-Azabu", ar: "مقر إقامة السفير — موتو-آزابو" },
    country: { en: "Japan", ar: "اليابان" },
    city: { en: "Tokyo", ar: "طوكيو" },
    address: { en: "1-2-15 Moto-Azabu, Minato-ku, Tokyo 106-0046", ar: "١-٢-١٥ موتو-آزابو، طوكيو" },
    coords: { lat: 35.6580, lng: 139.7414 },
    floorsCount: 2,
    totalArea: 1480, rooms: 12,
    hasGarden: true, hasPool: false,
    acquiredDate: "2003-11-08",
    residentName: AMBASSADORS.outgoingTokyo.name,
    status: "handover-in-progress",
    totalAssetsCount: 187, totalAssetsValue: 318900,
    nextInspection: "2026-05-22",
    handoverId: "ho-tokyo-2026",
  },
  {
    id: "prop-tokyo-chancery",
    postingId: "post-tokyo",
    type: "chancery",
    arch: "modern",
    name: { en: "Chancery Tower — Roppongi", ar: "برج السفارة — روبونغي" },
    country: { en: "Japan", ar: "اليابان" },
    city: { en: "Tokyo", ar: "طوكيو" },
    address: { en: "6-1-12 Roppongi, Minato-ku, Tokyo 106-0032", ar: "٦-١-١٢ روبونغي، طوكيو" },
    coords: { lat: 35.6624, lng: 139.7311 },
    floorsCount: 5,
    totalArea: 1360, rooms: 21,
    hasGarden: false, hasPool: false,
    acquiredDate: "2012-09-14",
    status: "active",
    totalAssetsCount: 337, totalAssetsValue: 393500,
    nextInspection: "2026-08-04",
  },
  // Washington — separate residence + chancery
  {
    id: "prop-washington",
    postingId: "post-washington",
    type: "residence",
    arch: "classical",
    name: { en: "Ambassador's Residence — Kalorama", ar: "مقر إقامة السفير — كالوراما" },
    country: { en: "United States", ar: "الولايات المتحدة" },
    city: { en: "Washington DC", ar: "واشنطن" },
    address: { en: "3502 International Drive NW, Washington DC", ar: "٣٥٠٢ إنترناشيونال درايف، واشنطن" },
    coords: { lat: 38.9389, lng: -77.0653 },
    floorsCount: 3,
    totalArea: 2120, rooms: 15,
    hasGarden: true, hasPool: true,
    acquiredDate: "1976-09-03",
    residentName: { en: "H.E. Shaikh Abdulla bin Rashid Al Khalifa", ar: "سعادة الشيخ عبدالله بن راشد آل خليفة" },
    status: "active",
    totalAssetsCount: 376, totalAssetsValue: 678100,
    nextInspection: "2026-06-18",
  },
  {
    id: "prop-washington-chancery",
    postingId: "post-washington",
    type: "chancery",
    arch: "modern",
    name: { en: "Chancery — International Drive", ar: "السفارة — إنترناشيونال درايف" },
    country: { en: "United States", ar: "الولايات المتحدة" },
    city: { en: "Washington DC", ar: "واشنطن" },
    address: { en: "3502 International Drive NW, Washington DC (Chancery)", ar: "٣٥٠٢ إنترناشيونال درايف، واشنطن — السفارة" },
    coords: { lat: 38.9395, lng: -77.0648 },
    floorsCount: 4,
    totalArea: 1740, rooms: 20,
    hasGarden: false, hasPool: false,
    acquiredDate: "1976-09-03",
    status: "active",
    totalAssetsCount: 322, totalAssetsValue: 446700,
    nextInspection: "2026-09-22",
  },
];

function getProperty(id) { return PROPERTIES.find(p => p.id === id) || PROPERTIES[0]; }

// ---------- Rooms (Tokyo gets the most detail since it's hero) ----------
const ROOMS = {
  "prop-tokyo": [
    { id: "rm-tk-majlis",   name: { en: "Grand Majlis", ar: "المجلس الكبير" }, type: "majlis", floor: "ground", area: 64, assetCount: 24 },
    { id: "rm-tk-living",   name: { en: "Reception Hall", ar: "صالة الاستقبال" }, type: "living", floor: "ground", area: 52, assetCount: 18 },
    { id: "rm-tk-dining",   name: { en: "State Dining Room", ar: "غرفة الطعام الرسمية" }, type: "dining", floor: "ground", area: 48, assetCount: 22 },
    { id: "rm-tk-kitchen",  name: { en: "Kitchen", ar: "المطبخ" }, type: "kitchen", floor: "ground", area: 28, assetCount: 14 },
    { id: "rm-tk-amb",      name: { en: "Ambassador's Bedroom", ar: "غرفة السفير" }, type: "bedroom", floor: "first", area: 36, assetCount: 12 },
    { id: "rm-tk-guest1",   name: { en: "Guest Suite — Cedar", ar: "جناح الضيوف — الأرز" }, type: "bedroom", floor: "first", area: 28, assetCount: 9 },
    { id: "rm-tk-guest2",   name: { en: "Guest Suite — Pearl", ar: "جناح الضيوف — اللؤلؤ" }, type: "bedroom", floor: "first", area: 26, assetCount: 8 },
    { id: "rm-tk-office",   name: { en: "Ambassador's Study", ar: "مكتب السفير" }, type: "office", floor: "first", area: 22, assetCount: 11 },
    { id: "rm-tk-library",  name: { en: "Library", ar: "المكتبة" }, type: "office", floor: "first", area: 18, assetCount: 8 },
    { id: "rm-tk-laundry",  name: { en: "Laundry", ar: "غرفة الغسيل" }, type: "laundry", floor: "annex", area: 12, assetCount: 5 },
    { id: "rm-tk-storage",  name: { en: "Archive Storage", ar: "مخزن الأرشيف" }, type: "storage", floor: "annex", area: 14, assetCount: 6 },
    { id: "rm-tk-gallery",  name: { en: "Gifts & Paintings Gallery", ar: "صالة الهدايا واللوحات" }, type: "living", floor: "ground", area: 32, assetCount: 50 },
  ],
  "prop-london": [
    { id: "rm-ln-majlis",   name: { en: "Belgrave Majlis", ar: "مجلس بلجريف" }, type: "majlis", floor: "ground", area: 72, assetCount: 26 },
    { id: "rm-ln-dining",   name: { en: "State Dining Room", ar: "قاعة الطعام الرسمية" }, type: "dining", floor: "ground", area: 54, assetCount: 19 },
    { id: "rm-ln-amb",      name: { en: "Ambassador's Bedroom", ar: "غرفة السفير" }, type: "bedroom", floor: "first", area: 42, assetCount: 14 },
  ],
  "prop-paris": [
    { id: "rm-pa-majlis",   name: { en: "Salon Diplomatique", ar: "الصالون الدبلوماسي" }, type: "majlis", floor: "ground", area: 60, assetCount: 22 },
    { id: "rm-pa-amb",      name: { en: "Ambassador's Bedroom", ar: "غرفة السفير" }, type: "bedroom", floor: "first", area: 34, assetCount: 11 },
  ],
  "prop-washington": [
    { id: "rm-ws-majlis",   name: { en: "Grand Majlis", ar: "المجلس الكبير" }, type: "majlis", floor: "ground", area: 80, assetCount: 28 },
    { id: "rm-ws-amb",      name: { en: "Ambassador's Bedroom", ar: "غرفة السفير" }, type: "bedroom", floor: "first", area: 46, assetCount: 15 },
  ],
};

function getRooms(pid) { return ROOMS[pid] || []; }
function getRoom(pid, rid) { return (ROOMS[pid] || []).find(r => r.id === rid); }

// ---------- Assets for the Tokyo Grand Majlis (the 3D hero room) ----------
// Each asset has a 3D position so the room viewer can place + highlight it.
const ROOM_ASSETS = {
  "rm-tk-majlis": [
    { id: "ast-mj-sofa",       slot: "sofa-main",   category: "furniture", isOfficialGift: false,
      itemName: { en: "Forest Velvet Sofa", ar: "أريكة مخملية خضراء" }, brand: "Bahraini Atelier",
      qty: 1, condition: "excellent", purchaseCost: 4200, currency: "BHD",
      purchaseDate: "2021-03-12", lastInspectedDate: "2025-12-04",
      note: { en: "Custom-made for the Grand Majlis. Forest velvet, brass studs.", ar: "صُنعت خصيصاً للمجلس الكبير." }
    },
    { id: "ast-mj-coffee",     slot: "coffee-table",category: "furniture", isOfficialGift: false,
      itemName: { en: "Brass-Inlay Coffee Table", ar: "طاولة قهوة بتطعيم نحاسي" },
      qty: 1, condition: "good", purchaseCost: 1850, currency: "BHD",
      purchaseDate: "2021-03-12", lastInspectedDate: "2025-12-04" },
    { id: "ast-mj-armchair-l", slot: "armchair-l",  category: "furniture", isOfficialGift: false,
      itemName: { en: "Cream Armchair (Left)", ar: "كرسي كريمي (يسار)" },
      qty: 1, condition: "good", purchaseCost: 980, currency: "BHD",
      purchaseDate: "2021-03-12", lastInspectedDate: "2025-12-04" },
    { id: "ast-mj-armchair-r", slot: "armchair-r",  category: "furniture", isOfficialGift: false,
      itemName: { en: "Cream Armchair (Right)", ar: "كرسي كريمي (يمين)" },
      qty: 1, condition: "good", purchaseCost: 980, currency: "BHD",
      purchaseDate: "2021-03-12", lastInspectedDate: "2025-12-04" },
    { id: "ast-mj-vase-pair",  slot: "vases",       category: "gift", isOfficialGift: true,
      giftFrom: "MOFA Japan", giftDate: "2022-04-18", giftOccasion: "State Visit",
      itemName: { en: "Pair of Imari Porcelain Vases", ar: "زوج من مزهريات الإيماري الخزفية" },
      qty: 2, condition: "excellent", estimatedValue: 4500, currency: "BHD",
      lastInspectedDate: "2025-11-22" },
    { id: "ast-mj-painting",   slot: "painting",    category: "painting", isOfficialGift: false,
      itemName: { en: "Oil Portrait of HM King Hamad", ar: "صورة زيتية لجلالة الملك حمد" },
      qty: 1, condition: "excellent", estimatedValue: 8200, currency: "BHD",
      purchaseDate: "2018-12-16", note: { en: "Commissioned 2018, framed in brass.", ar: "تم تكليفها عام ٢٠١٨." } },
    { id: "ast-mj-rug",        slot: "rug",         category: "decor", isOfficialGift: false,
      itemName: { en: "Hand-knotted Persian Rug", ar: "سجادة فارسية معقودة يدوياً" },
      qty: 1, condition: "excellent", purchaseCost: 6400, currency: "BHD",
      purchaseDate: "2020-08-01", lastInspectedDate: "2025-09-04" },
    { id: "ast-mj-plant-l",    slot: "plant-l",     category: "decor", isOfficialGift: false,
      itemName: { en: "Olive Tree Planter (Left)", ar: "حوض شجرة زيتون (يسار)" },
      qty: 1, condition: "good", purchaseCost: 320, currency: "BHD",
      purchaseDate: "2024-02-01", lastInspectedDate: "2025-12-04" },
    { id: "ast-mj-plant-r",    slot: "plant-r",     category: "decor", isOfficialGift: false,
      itemName: { en: "Olive Tree Planter (Right)", ar: "حوض شجرة زيتون (يمين)" },
      qty: 1, condition: "good", purchaseCost: 320, currency: "BHD",
      purchaseDate: "2024-02-01", lastInspectedDate: "2025-12-04" },
    { id: "ast-mj-lamp",       slot: "floor-lamp",  category: "furniture", isOfficialGift: false,
      itemName: { en: "Brass Floor Lamp", ar: "مصباح أرضي نحاسي" },
      qty: 1, condition: "good", purchaseCost: 540, currency: "BHD",
      purchaseDate: "2021-03-12", lastInspectedDate: "2025-12-04" },
    { id: "ast-mj-sword",      slot: "display-cabinet", category: "gift", isOfficialGift: true,
      giftFrom: "H.M. Sultan of Oman", giftDate: "2019-11-04", giftOccasion: "State Visit to Muscat",
      itemName: { en: "Sword of Honor", ar: "سيف الشرف" },
      qty: 1, condition: "excellent", estimatedValue: 12000, currency: "BHD",
      lastInspectedDate: "2025-12-01",
      note: { en: "Gift from H.M. Sultan of Oman. Stored in display cabinet with humidity control.",
              ar: "هدية من جلالة سلطان عُمان." } },
    { id: "ast-mj-cabinet",    slot: "display-cabinet-frame", category: "furniture", isOfficialGift: false,
      itemName: { en: "Walnut Display Cabinet", ar: "خزانة عرض من خشب الجوز" },
      qty: 1, condition: "good", purchaseCost: 2800, currency: "BHD",
      purchaseDate: "2019-11-15", lastInspectedDate: "2025-12-04" },
  ],
};

// ---------- Reminders ----------
const REMINDERS = [
  { id: "r1", title: { en: "Pool service — Washington", ar: "صيانة المسبح — واشنطن" }, dueDate: "2026-05-12", category: "maintenance", status: "due-soon", propertyId: "prop-washington" },
  { id: "r2", title: { en: "Insurance renewal — London", ar: "تجديد التأمين — لندن" }, dueDate: "2026-05-18", category: "document-expiry", status: "due-soon", propertyId: "prop-london" },
  { id: "r3", title: { en: "Tokyo handover sign-off due", ar: "موعد اعتماد تسليم طوكيو" }, dueDate: "2026-05-22", category: "handover", status: "due-soon", propertyId: "prop-tokyo" },
  { id: "r4", title: { en: "HVAC inspection — Paris", ar: "تفتيش التكييف — باريس" }, dueDate: "2026-05-29", category: "inspection", status: "upcoming", propertyId: "prop-paris" },
  { id: "r5", title: { en: "Gas bill — Tokyo", ar: "فاتورة الغاز — طوكيو" }, dueDate: "2026-05-05", category: "bill", status: "overdue", propertyId: "prop-tokyo" },
  { id: "r6", title: { en: "Garden quarterly — London", ar: "صيانة الحديقة الفصلية — لندن" }, dueDate: "2026-06-04", category: "maintenance", status: "upcoming", propertyId: "prop-london" },
  { id: "r7", title: { en: "Sword of Honor inspection", ar: "تفتيش سيف الشرف" }, dueDate: "2026-06-12", category: "inspection", status: "upcoming", propertyId: "prop-tokyo" },
];

// ---------- Audit log (compressed sample) ----------
const AUDIT = [
  { id: "a1", ts: "2026-05-08T09:14:00", user: "u-pm-tokyo", action: "update", entity: { type: "handover", label: { en: "Tokyo handover — verified Imari vases", ar: "تسليم طوكيو — تم التحقق من مزهريات الإيماري" } } },
  { id: "a2", ts: "2026-05-08T08:42:00", user: "u-insp-as", action: "sign", entity: { type: "handover", label: { en: "Inspector signed item batch #14", ar: "اعتمد المفتش الدفعة ١٤" } } },
  { id: "a3", ts: "2026-05-08T08:01:00", user: "u-pm-london", action: "create", entity: { type: "maintenance", label: { en: "Scheduled pool service — Washington", ar: "جدولة صيانة المسبح — واشنطن" } } },
  { id: "a4", ts: "2026-05-07T17:35:00", user: "u-insp-as", action: "update", entity: { type: "asset", label: { en: "Disputed condition — Walnut Cabinet", ar: "اعتراض على حالة الخزانة" } } },
  { id: "a5", ts: "2026-05-07T15:20:00", user: "u-pm-paris", action: "approve", entity: { type: "vendor", label: { en: "Approved HVAC vendor — Paris", ar: "اعتماد متعاقد التكييف — باريس" } } },
  { id: "a6", ts: "2026-05-07T11:08:00", user: "u-admin", action: "update", entity: { type: "user", label: { en: "Updated role — Saad Al-Binali", ar: "تحديث الصلاحية" } } },
  { id: "a7", ts: "2026-05-06T16:42:00", user: "u-pm-tokyo", action: "create", entity: { type: "asset", label: { en: "Added asset — Brass Floor Lamp", ar: "إضافة أصل — مصباح أرضي" } } },
  { id: "a8", ts: "2026-05-06T10:11:00", user: "u-aud", action: "view", entity: { type: "property", label: { en: "Reviewed Tokyo dossier", ar: "مراجعة ملف طوكيو" } } },
];

// ---------- Approvals ----------
const APPROVALS = [
  { id: "ap1", type: "purchase", requestedBy: "u-pm-tokyo", amount: 3200, currency: "BHD",
    justification: { en: "Replacement of two armchairs in Tokyo guest suite.", ar: "استبدال كرسيين في جناح الضيوف بطوكيو." }, requestedAt: "2026-05-06" },
  { id: "ap2", type: "maintenance-cost", requestedBy: "u-pm-london", amount: 1840, currency: "BHD",
    justification: { en: "Annual chimney sweep & boiler service — Belgrave Square.", ar: "صيانة المدخنة والمرجل السنوية — لندن." }, requestedAt: "2026-05-05" },
  { id: "ap3", type: "asset-disposal", requestedBy: "u-pm-paris", amount: null,
    justification: { en: "Disposal of three damaged dining chairs (cat. III).", ar: "التخلص من ثلاثة كراسي طعام تالفة." }, requestedAt: "2026-05-03" },
];

// ---------- Maintenance spend (12-month series) ----------
const MAINT_SERIES = {
  labels: ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"],
  london: [3200, 4100, 2800, 3600, 5200, 4400, 6100, 3800, 4200, 5400, 3900, 4600],
  paris:  [1800, 2400, 2100, 1600, 2800, 2200, 3400, 2100, 2900, 2600, 2200, 2800],
  tokyo:  [2400, 3000, 2700, 2200, 3600, 3100, 4200, 2800, 3400, 4400, 5200, 6800],
  washington: [2900, 3400, 3100, 4200, 4600, 3900, 5400, 3600, 4100, 4800, 4300, 5200],
};

// ---------- Asset distribution (donut) ----------
const ASSET_DISTRIBUTION = [
  { key: "furniture",   label_en: "Furniture",   label_ar: "أثاث",   value: 312 },
  { key: "decor",       label_en: "Decor",       label_ar: "ديكور",  value: 184 },
  { key: "painting",    label_en: "Paintings",   label_ar: "لوحات",  value: 62 },
  { key: "gift",        label_en: "Official gifts", label_ar: "هدايا رسمية", value: 48 },
  { key: "electronics", label_en: "Electronics", label_ar: "إلكترونيات", value: 96 },
  { key: "kitchenware", label_en: "Kitchenware", label_ar: "أدوات مطبخ", value: 142 },
  { key: "vehicle",     label_en: "Vehicles",    label_ar: "مركبات", value: 12 },
];

// ---------- Tokyo Handover items (187 total) ----------
// Statuses: 148 verified, 4 disputed, 1 missing, rest pending
const HO_CATEGORIES = [
  { key: "majlis",    en: "Grand Majlis",        ar: "المجلس الكبير",        size: 24 },
  { key: "reception", en: "Reception Hall",      ar: "صالة الاستقبال",       size: 18 },
  { key: "dining",    en: "State Dining Room",   ar: "غرفة الطعام الرسمية",  size: 22 },
  { key: "kitchen",   en: "Kitchen",             ar: "المطبخ",               size: 14 },
  { key: "amb",       en: "Ambassador's Bedroom",ar: "غرفة السفير",          size: 12 },
  { key: "guest1",    en: "Guest Suite — Cedar", ar: "جناح الضيوف — الأرز",  size: 9 },
  { key: "guest2",    en: "Guest Suite — Pearl", ar: "جناح الضيوف — اللؤلؤ", size: 8 },
  { key: "study",     en: "Ambassador's Study",  ar: "مكتب السفير",          size: 11 },
  { key: "library",   en: "Library",             ar: "المكتبة",              size: 8 },
  { key: "laundry",   en: "Laundry",             ar: "غرفة الغسيل",          size: 5 },
  { key: "storage",   en: "Archive Storage",     ar: "مخزن الأرشيف",         size: 6 },
  { key: "gallery",   en: "Gifts & Paintings Gallery", ar: "صالة الهدايا واللوحات", size: 50 },
];

const ITEM_NAMES = {
  majlis: [
    ["Forest Velvet Sofa", "أريكة مخملية خضراء", "furniture", 4200, false],
    ["Brass-Inlay Coffee Table", "طاولة قهوة بتطعيم نحاسي", "furniture", 1850, false],
    ["Cream Armchair (Left)", "كرسي كريمي (يسار)", "furniture", 980, false],
    ["Cream Armchair (Right)", "كرسي كريمي (يمين)", "furniture", 980, false],
    ["Pair of Imari Porcelain Vases", "زوج من مزهريات الإيماري", "gift", 4500, true, "MOFA Japan"],
    ["Oil Portrait of HM King Hamad", "صورة جلالة الملك حمد", "painting", 8200, false],
    ["Hand-knotted Persian Rug", "سجادة فارسية يدوية", "decor", 6400, false],
    ["Olive Tree Planter (Left)", "حوض شجرة زيتون (يسار)", "decor", 320, false],
    ["Olive Tree Planter (Right)", "حوض شجرة زيتون (يمين)", "decor", 320, false],
    ["Brass Floor Lamp", "مصباح أرضي نحاسي", "furniture", 540, false],
    ["Sword of Honor", "سيف الشرف", "gift", 12000, true, "H.M. Sultan of Oman"],
    ["Walnut Display Cabinet", "خزانة عرض من خشب الجوز", "furniture", 2800, false],
    ["Crystal Decanter Set", "طقم قوارير كريستال", "decor", 880, false],
    ["Side Table — Brass", "طاولة جانبية نحاسية", "furniture", 420, false],
    ["Console Table", "طاولة كونسول", "furniture", 1240, false],
    ["Brass Wall Sconces (4)", "إضاءة جدارية نحاسية (٤)", "decor", 1600, false],
    ["Chandelier — Crystal", "ثريا كريستال", "decor", 5400, false],
    ["Folding Screen — Lacquered", "ساتر خشبي مطلي", "gift", 3200, true, "Imperial Household Agency"],
    ["Calligraphy Scroll — King Hamad", "لوحة خط للملك حمد", "painting", 2200, false],
    ["Bahraini Pearl Display Case", "صندوق عرض اللؤلؤ البحريني", "decor", 4100, false],
    ["Coffee Service — Silver", "طقم قهوة فضي", "gift", 3800, true, "H.H. Crown Prince"],
    ["Incense Burner — Brass", "مبخرة نحاسية", "decor", 240, false],
    ["Side Cabinet — Walnut", "خزانة جانبية", "furniture", 1900, false],
    ["Floor Cushions (Set of 6)", "وسائد أرضية (٦ قطع)", "decor", 720, false],
  ],
  reception: ["Reception Sofa", "Coffee Table — Round", "Console — Marble Top", "Wing Chair (Left)", "Wing Chair (Right)", "Side Table — Drum", "Welcome Desk", "Visitor Bench", "Chandelier — Brass", "Wall Mirror — Gilded", "Floor Lamp — Reading", "Umbrella Stand", "Rug — Beige Wool", "Coat Rack", "Fresh Flower Vase", "Brass Tray Stand", "Wall Clock — Bronze", "Pair of Pendant Lights"],
  dining: ["Dining Table — Walnut (12)", "Dining Chairs (12)", "Sideboard — Brass-trim", "Wine Cabinet", "Crystal Chandelier", "Wall Sconces (4)", "Persian Rug — Burgundy", "Mirror — Antique", "Silver Service for 12", "Crystal Stemware Set", "Decanter Set", "Centerpiece Bowl", "Buffet Table", "Server Cart", "Linen Cabinet", "Bread Server", "Coffee Bar Cart", "Fireplace Surround", "Mantel Clock", "Ornamental Plates (Set)", "Tea Service — Silver", "Brass Candle Stands"],
  kitchen: ["Range — Wolf", "Refrigerator — Sub-Zero", "Dishwasher", "Wine Fridge", "Espresso Machine", "Microwave Oven", "Stand Mixer", "Knife Set — Damascus", "Copper Pot Set", "Cutlery Set 24-piece", "China Set — Royal", "Crystal Set", "Storage Cabinet", "Pantry Shelving"],
  amb: ["King Bed — Walnut", "Mattress — Hästens", "Nightstand (L)", "Nightstand (R)", "Wardrobe — 4-door", "Reading Chair", "Dressing Table", "Mirror — Standing", "Side Table — Brass", "Bedside Lamps (Pair)", "Wool Rug — Cream", "Curtains — Silk"],
  guest1: ["Queen Bed — Cedar", "Mattress", "Nightstands (Pair)", "Wardrobe", "Reading Chair", "Side Table", "Lamps (Pair)", "Rug — Wool", "Curtains"],
  guest2: ["Queen Bed — Pearl", "Mattress", "Nightstands (Pair)", "Wardrobe", "Reading Chair", "Side Table", "Lamps (Pair)", "Rug"],
  study: ["Desk — Walnut Executive", "Office Chair — Leather", "Bookcase — 6-shelf", "Side Cabinet", "Desk Lamp — Brass", "Globe — Antique", "Reading Chair", "Side Table", "Wall Map — Framed", "Document Safe", "Pen Set"],
  library: ["Bookcase — Floor-to-ceiling (4)", "Reading Table", "Reading Chairs (2)", "Side Lamps (Pair)", "Antique Globe", "Reading Lamp", "Step Stool — Wood", "Card Catalog Cabinet"],
  laundry: ["Washing Machine — Miele", "Dryer — Miele", "Ironing Board", "Steam Press", "Storage Cabinet"],
  storage: ["Filing Cabinet (Tall)", "Document Boxes (Set)", "Archive Shelving", "Climate Controller", "Dehumidifier", "Fire-rated Cabinet"],
  gallery: ["Oil Painting — King Hamad I", "Calligraphy — Surat Al-Falaq", "Watercolor — Bahrain Pearling Scene", "Sword of State (Replica)", "Pair of Imari Vases", "Sake Set — Imperial Gift", "Lacquered Folding Screen", "Bronze Sculpture — Falcon", "Crystal Decanter — French Gift", "Persian Miniature Painting", "Calligraphy — King Hamad's Words", "Pearl Necklace Display", "Antique Astrolabe", "Bronze Horse Figurine", "Silver Tea Service", "Coffee Service — Gold-plated", "Photograph — Royal Visit 2019", "Photograph — Royal Visit 2022", "Painted Plate (Wedgwood)", "Painted Plate (Limoges)", "Crystal Bowl — French", "Marble Bust — Diplomat", "Bronze Plaque — 1971", "Silver Tray — Treaty", "Jeweled Letter Opener", "Silver Pen Stand", "Bahraini Map — 18th c.", "Painted Globe — Antique", "Letter — Royal Decree (framed)", "Pearl Inlay Box — Pair", "Carved Ivory Box (declared)", "Wooden Model — Dhow", "Brass Astrolabe", "Wall Tapestry", "Silver Coffee Pot — Antique", "Engraved Brass Plate", "Calligraphy Pen Set", "Inkwell — Crystal", "Ornamental Sword (Saudi gift)", "Engraved Silver Cup (Kuwait gift)", "Painting — Manama Souq", "Painting — Bab Al-Bahrain", "Watercolor — Mosques of Manama", "Silver Falcon Sculpture", "Crystal Vase Set (UK gift)", "Engraved Silver Bowl", "Oil Lamp — Brass Antique", "Bahraini Flag — Framed", "Photograph Album — 2003 Opening", "National Day Plaque 2019"],
};

function makeHandoverItems() {
  const items = [];
  let idx = 1;
  HO_CATEGORIES.forEach(cat => {
    for (let i = 0; i < cat.size; i++) {
      const namePool = ITEM_NAMES[cat.key];
      let name_en, name_ar, category, value, isGift, giftFrom;
      if (cat.key === "majlis") {
        const r = namePool[i % namePool.length];
        [name_en, name_ar, category, value, isGift, giftFrom] = r;
      } else {
        const baseName = namePool[i % namePool.length] || `Item ${i+1}`;
        name_en = baseName;
        name_ar = cat.ar + " — " + (i+1);
        category = "furniture";
        value = 200 + (i * 137 % 1800);
        isGift = false;
      }
      items.push({
        id: `ho-i-${String(idx).padStart(3,"0")}`,
        idx,
        category: cat.key,
        room_en: cat.en, room_ar: cat.ar,
        itemName: { en: name_en, ar: name_ar },
        assetCategory: category,
        isOfficialGift: isGift,
        giftFrom: giftFrom,
        estimatedValue: value,
        currency: "BHD",
        status: "pending",
        priorCondition: "good",
        currentCondition: "good",
        photoSeed: idx,
      });
      idx++;
    }
  });
  // 148 verified, 4 disputed, 1 missing — distribute deterministically
  // Mark by index
  const total = items.length; // 187
  // Disputed: 4 specific recognizable items
  const disputeIds = [12, 78, 134, 156]; // walnut cabinet etc.
  const missingIds = [101]; // one item missing
  const verifyCount = 148;

  // First mark disputed + missing
  disputeIds.forEach(i => {
    if (items[i-1]) {
      items[i-1].status = "disputed";
      items[i-1].currentCondition = "fair";
      items[i-1].priorCondition = "good";
      items[i-1].inspectorNote = { en: "Visible scratch on left panel; awaiting outgoing comment.",
                                    ar: "خدش واضح على اللوحة اليسرى." };
    }
  });
  missingIds.forEach(i => {
    if (items[i-1]) items[i-1].status = "missing";
  });
  // Mark first 148 non-special as verified
  let verified = 0;
  for (let k = 0; k < items.length && verified < verifyCount; k++) {
    if (items[k].status === "pending") {
      items[k].status = "verified";
      items[k].verifiedAt = "2026-05-07T10:00:00";
      verified++;
    }
  }
  return items;
}

const TOKYO_HANDOVER_ITEMS = makeHandoverItems();

const HANDOVERS = [
  {
    id: "ho-tokyo-2026",
    propertyId: "prop-tokyo",
    outgoingResident: AMBASSADORS.outgoingTokyo,
    incomingResident: AMBASSADORS.incomingTokyo,
    initiatedDate: "2026-04-22",
    scheduledCompletionDate: "2026-05-22",
    status: "in-progress",
    itemsTotal: 187, itemsVerified: 148, itemsDisputed: 4, itemsMissing: 1,
    signoffs: {
      outgoing:  { signed: false },
      incoming:  { signed: false },
      inspector: { signed: true, signedAt: "2026-05-07T18:00:00", signerName: "Saad Al-Binali" },
      ministry:  { signed: false },
    },
  },
];

function getHandover(id) { return HANDOVERS.find(h => h.id === id); }

Object.assign(window, {
  TODAY, USERS, CURRENT_USER, AMBASSADORS,
  PROPERTIES, getProperty,
  ROOMS, getRooms, getRoom, ROOM_ASSETS,
  REMINDERS, AUDIT, APPROVALS,
  MAINT_SERIES, ASSET_DISTRIBUTION,
  HANDOVERS, getHandover, TOKYO_HANDOVER_ITEMS,
});
