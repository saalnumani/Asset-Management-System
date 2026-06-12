/* global window */
// ============================================================
// Floors, Rooms (with floorId), Sub-spaces
// 24 floors · ~120 rooms · ~30 sub-spaces
// ============================================================

// Compose floor ID
const fl = (pid, lvl) => `fl-${pid.replace("prop-", "")}-${lvl < 0 ? "b" : "l" + lvl}`;
const ENm = ["Basement", "Ground Floor", "First Floor", "Second Floor", "Third Floor", "Fourth Floor", "Annex"];
const ARm = ["القبو", "الطابق الأرضي", "الطابق الأول", "الطابق الثاني", "الطابق الثالث", "الطابق الرابع", "الملحق"];
const fname = (lvl) => {
  if (lvl === -1) return { en: ENm[0], ar: ARm[0] };
  if (lvl === 99)  return { en: ENm[6], ar: ARm[6] };
  return { en: ENm[lvl + 1], ar: ARm[lvl + 1] };
};

// ---------- Floors ----------
const FLOORS = [
  // London Residence (3 floors)
  { id: fl("prop-london", 0),  propertyId: "prop-london", level: 0, name: fname(0),  area: 480, photos: [], roomCount: 6 },
  { id: fl("prop-london", 1),  propertyId: "prop-london", level: 1, name: fname(1),  area: 460, photos: [], roomCount: 5 },
  { id: fl("prop-london", 2),  propertyId: "prop-london", level: 2, name: fname(2),  area: 380, photos: [], roomCount: 4 },
  // London Chancery (3 floors)
  { id: fl("prop-london-chancery", 0), propertyId: "prop-london-chancery", level: 0, name: fname(0), area: 420, photos: [], roomCount: 6 },
  { id: fl("prop-london-chancery", 1), propertyId: "prop-london-chancery", level: 1, name: fname(1), area: 400, photos: [], roomCount: 5 },
  { id: fl("prop-london-chancery", 2), propertyId: "prop-london-chancery", level: 2, name: fname(2), area: 360, photos: [], roomCount: 5 },
  // Paris Combined (4 floors)
  { id: fl("prop-paris", 0),  propertyId: "prop-paris", level: 0, name: fname(0),  area: 360, photos: [], roomCount: 6 },
  { id: fl("prop-paris", 1),  propertyId: "prop-paris", level: 1, name: fname(1),  area: 340, photos: [], roomCount: 5 },
  { id: fl("prop-paris", 2),  propertyId: "prop-paris", level: 2, name: fname(2),  area: 320, photos: [], roomCount: 5 },
  { id: fl("prop-paris", 3),  propertyId: "prop-paris", level: 3, name: fname(3),  area: 240, photos: [], roomCount: 4 },
  // Tokyo Residence Villa (2 floors)
  { id: fl("prop-tokyo", 0),  propertyId: "prop-tokyo", level: 0, name: fname(0),  area: 720, photos: [], roomCount: 5 },
  { id: fl("prop-tokyo", 1),  propertyId: "prop-tokyo", level: 1, name: fname(1),  area: 580, photos: [], roomCount: 5 },
  { id: fl("prop-tokyo", 99), propertyId: "prop-tokyo", level: 99, name: fname(99), area: 180, photos: [], roomCount: 2 },
  // Tokyo Chancery Tower (5 floors)
  { id: fl("prop-tokyo-chancery", 0), propertyId: "prop-tokyo-chancery", level: 0, name: fname(0), area: 280, photos: [], roomCount: 4 },
  { id: fl("prop-tokyo-chancery", 1), propertyId: "prop-tokyo-chancery", level: 1, name: fname(1), area: 280, photos: [], roomCount: 5 },
  { id: fl("prop-tokyo-chancery", 2), propertyId: "prop-tokyo-chancery", level: 2, name: fname(2), area: 280, photos: [], roomCount: 5 },
  { id: fl("prop-tokyo-chancery", 3), propertyId: "prop-tokyo-chancery", level: 3, name: fname(3), area: 280, photos: [], roomCount: 4 },
  { id: fl("prop-tokyo-chancery", 4), propertyId: "prop-tokyo-chancery", level: 4, name: fname(4), area: 240, photos: [], roomCount: 3 },
  // Washington Residence (3 floors)
  { id: fl("prop-washington", 0), propertyId: "prop-washington", level: 0, name: fname(0), area: 620, photos: [], roomCount: 6 },
  { id: fl("prop-washington", 1), propertyId: "prop-washington", level: 1, name: fname(1), area: 580, photos: [], roomCount: 5 },
  { id: fl("prop-washington", 2), propertyId: "prop-washington", level: 2, name: fname(2), area: 420, photos: [], roomCount: 4 },
  // Washington Chancery (4 floors)
  { id: fl("prop-washington-chancery", 0), propertyId: "prop-washington-chancery", level: 0, name: fname(0), area: 480, photos: [], roomCount: 6 },
  { id: fl("prop-washington-chancery", 1), propertyId: "prop-washington-chancery", level: 1, name: fname(1), area: 460, photos: [], roomCount: 5 },
  { id: fl("prop-washington-chancery", 2), propertyId: "prop-washington-chancery", level: 2, name: fname(2), area: 420, photos: [], roomCount: 5 },
  { id: fl("prop-washington-chancery", 3), propertyId: "prop-washington-chancery", level: 3, name: fname(3), area: 380, photos: [], roomCount: 4 },
];

// ---------- Rooms ----------
// Tokyo Residence rooms KEEP THEIR EXISTING IDs since ROOM_ASSETS keys on rm-tk-majlis
// so the 3D viewer continues to work end-to-end.
const TK_RES_GROUND_FL = fl("prop-tokyo", 0);
const TK_RES_FIRST_FL  = fl("prop-tokyo", 1);
const TK_RES_ANNEX_FL  = fl("prop-tokyo", 99);

const TOKYO_ROOMS = [
  { id: "rm-tk-majlis",   name: { en: "Grand Majlis",            ar: "المجلس الكبير" },        type: "majlis",   floorId: TK_RES_GROUND_FL, area: 64, assetCount: 24, photos: [], hasSubSpaces: false, floor: "ground" },
  { id: "rm-tk-living",   name: { en: "Reception Hall",          ar: "صالة الاستقبال" },        type: "reception",floorId: TK_RES_GROUND_FL, area: 52, assetCount: 18, photos: [], hasSubSpaces: false, floor: "ground" },
  { id: "rm-tk-dining",   name: { en: "State Dining Room",       ar: "غرفة الطعام الرسمية" },    type: "dining",   floorId: TK_RES_GROUND_FL, area: 48, assetCount: 22, photos: [], hasSubSpaces: false, floor: "ground" },
  { id: "rm-tk-kitchen",  name: { en: "Kitchen",                  ar: "المطبخ" },                type: "kitchen",  floorId: TK_RES_GROUND_FL, area: 28, assetCount: 14, photos: [], hasSubSpaces: true,  floor: "ground" },
  { id: "rm-tk-gallery",  name: { en: "Gifts & Paintings Gallery", ar: "صالة الهدايا واللوحات" }, type: "reception",floorId: TK_RES_GROUND_FL, area: 32, assetCount: 50, photos: [], hasSubSpaces: false, floor: "ground" },
  { id: "rm-tk-amb",      name: { en: "Ambassador's Bedroom",     ar: "غرفة السفير" },           type: "bedroom",  floorId: TK_RES_FIRST_FL,  area: 36, assetCount: 12, photos: [], hasSubSpaces: true,  floor: "first" },
  { id: "rm-tk-guest1",   name: { en: "Guest Suite — Cedar",      ar: "جناح الضيوف — الأرز" },   type: "bedroom",  floorId: TK_RES_FIRST_FL,  area: 28, assetCount: 9,  photos: [], hasSubSpaces: true,  floor: "first" },
  { id: "rm-tk-guest2",   name: { en: "Guest Suite — Pearl",      ar: "جناح الضيوف — اللؤلؤ" },  type: "bedroom",  floorId: TK_RES_FIRST_FL,  area: 26, assetCount: 8,  photos: [], hasSubSpaces: false, floor: "first" },
  { id: "rm-tk-office",   name: { en: "Ambassador's Study",       ar: "مكتب السفير" },           type: "office",   floorId: TK_RES_FIRST_FL,  area: 22, assetCount: 11, photos: [], hasSubSpaces: true,  floor: "first" },
  { id: "rm-tk-library",  name: { en: "Library",                  ar: "المكتبة" },                type: "office",   floorId: TK_RES_FIRST_FL,  area: 18, assetCount: 8,  photos: [], hasSubSpaces: false, floor: "first" },
  { id: "rm-tk-laundry",  name: { en: "Laundry",                  ar: "غرفة الغسيل" },            type: "laundry",  floorId: TK_RES_ANNEX_FL,  area: 12, assetCount: 5,  photos: [], hasSubSpaces: false, floor: "annex" },
  { id: "rm-tk-storage",  name: { en: "Archive Storage",          ar: "مخزن الأرشيف" },          type: "storage",  floorId: TK_RES_ANNEX_FL,  area: 14, assetCount: 6,  photos: [], hasSubSpaces: false, floor: "annex" },
];

// Programmatic room generator for the rest — names rotate from a pool by floor type
const ROOM_POOL_RES_GROUND = [
  { en: "Grand Majlis",      ar: "المجلس الكبير",        type: "majlis", area: 64, hasSubSpaces: false },
  { en: "Reception Hall",     ar: "صالة الاستقبال",       type: "reception", area: 48, hasSubSpaces: false },
  { en: "State Dining Room",  ar: "قاعة الطعام الرسمية", type: "dining", area: 50, hasSubSpaces: false },
  { en: "Kitchen",            ar: "المطبخ",               type: "kitchen", area: 32, hasSubSpaces: true },
  { en: "Powder Room",        ar: "دورة المياه",          type: "bathroom", area: 6,  hasSubSpaces: false },
  { en: "Gallery",            ar: "صالة العرض",           type: "reception", area: 28, hasSubSpaces: false },
  { en: "Coat Room",          ar: "غرفة المعاطف",         type: "storage", area: 8, hasSubSpaces: false },
];
const ROOM_POOL_RES_UPPER = [
  { en: "Ambassador's Bedroom", ar: "غرفة السفير", type: "bedroom", area: 38, hasSubSpaces: true },
  { en: "Guest Suite",          ar: "جناح الضيوف", type: "bedroom", area: 26, hasSubSpaces: true },
  { en: "Family Living Room",   ar: "صالة المعيشة", type: "living", area: 36, hasSubSpaces: false },
  { en: "Ambassador's Study",   ar: "مكتب السفير", type: "office", area: 22, hasSubSpaces: true },
  { en: "Library",              ar: "المكتبة", type: "office", area: 20, hasSubSpaces: false },
  { en: "Bathroom",             ar: "حمام", type: "bathroom", area: 9, hasSubSpaces: false },
  { en: "Children's Bedroom",   ar: "غرفة الأطفال", type: "bedroom", area: 22, hasSubSpaces: false },
];
const ROOM_POOL_CHANCERY = [
  { en: "Reception",          ar: "الاستقبال",        type: "reception", area: 32, hasSubSpaces: false },
  { en: "Conference Room",    ar: "قاعة الاجتماعات", type: "conference", area: 40, hasSubSpaces: false },
  { en: "Ambassador's Office", ar: "مكتب السفير",     type: "office", area: 28, hasSubSpaces: true },
  { en: "Deputy's Office",    ar: "مكتب النائب",      type: "office", area: 22, hasSubSpaces: false },
  { en: "Archive",            ar: "الأرشيف",          type: "storage", area: 18, hasSubSpaces: false },
  { en: "Kitchenette",        ar: "مطبخ صغير",        type: "kitchen", area: 12, hasSubSpaces: false },
  { en: "Open-Plan Office",   ar: "مكاتب مفتوحة",     type: "office", area: 56, hasSubSpaces: false },
  { en: "Consular Counter",   ar: "كاونتر القنصلية", type: "reception", area: 24, hasSubSpaces: false },
  { en: "Visa Section",       ar: "قسم التأشيرات",   type: "office", area: 22, hasSubSpaces: false },
  { en: "Press Office",       ar: "المكتب الإعلامي", type: "office", area: 18, hasSubSpaces: false },
  { en: "Corridor",           ar: "ممر",              type: "corridor", area: 14, hasSubSpaces: false },
];

// Build rooms for a floor from a pool, take N, give them deterministic ids
function genFloorRooms(propertyId, floorObj, pool, count, prefix) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const tmpl = pool[i % pool.length];
    const suffix = Math.floor(i / pool.length);
    const idSuffix = (tmpl.type + (suffix > 0 ? `-${suffix + 1}` : ""));
    const nameSuffix = suffix > 0 ? ` ${suffix + 1}` : "";
    out.push({
      id: `rm-${prefix}-l${floorObj.level === 99 ? "x" : floorObj.level}-${idSuffix}-${i + 1}`,
      name: { en: tmpl.en + nameSuffix, ar: tmpl.ar + (suffix > 0 ? ` ${suffix + 1}` : "") },
      type: tmpl.type,
      floorId: floorObj.id,
      propertyId,
      area: tmpl.area,
      assetCount: 8 + (i * 7) % 28,
      photos: [],
      hasSubSpaces: tmpl.hasSubSpaces,
      floor: floorObj.level === 0 ? "ground" : floorObj.level === 99 ? "annex" : `level-${floorObj.level}`,
    });
  }
  return out;
}

const ROOMS_BY_PROP = { "prop-tokyo": TOKYO_ROOMS };
// Tag Tokyo rooms with propertyId
TOKYO_ROOMS.forEach(r => r.propertyId = "prop-tokyo");

// London Residence
const LON_RES_FLOORS = FLOORS.filter(f => f.propertyId === "prop-london");
ROOMS_BY_PROP["prop-london"] = [
  ...genFloorRooms("prop-london", LON_RES_FLOORS[0], ROOM_POOL_RES_GROUND, 6, "lr"),
  ...genFloorRooms("prop-london", LON_RES_FLOORS[1], ROOM_POOL_RES_UPPER, 5, "lr"),
  ...genFloorRooms("prop-london", LON_RES_FLOORS[2], ROOM_POOL_RES_UPPER, 4, "lr"),
];
// London Chancery
const LON_CH_FLOORS = FLOORS.filter(f => f.propertyId === "prop-london-chancery");
ROOMS_BY_PROP["prop-london-chancery"] = [
  ...genFloorRooms("prop-london-chancery", LON_CH_FLOORS[0], ROOM_POOL_CHANCERY, 6, "lc"),
  ...genFloorRooms("prop-london-chancery", LON_CH_FLOORS[1], ROOM_POOL_CHANCERY, 5, "lc"),
  ...genFloorRooms("prop-london-chancery", LON_CH_FLOORS[2], ROOM_POOL_CHANCERY, 5, "lc"),
];
// Paris Combined: lower 2 floors chancery, upper 2 residence
const PAR_FLOORS = FLOORS.filter(f => f.propertyId === "prop-paris");
ROOMS_BY_PROP["prop-paris"] = [
  ...genFloorRooms("prop-paris", PAR_FLOORS[0], ROOM_POOL_CHANCERY, 6, "pa"),
  ...genFloorRooms("prop-paris", PAR_FLOORS[1], ROOM_POOL_CHANCERY, 5, "pa"),
  ...genFloorRooms("prop-paris", PAR_FLOORS[2], ROOM_POOL_RES_UPPER, 5, "pa"),
  ...genFloorRooms("prop-paris", PAR_FLOORS[3], ROOM_POOL_RES_UPPER, 4, "pa"),
];
// Tokyo Chancery
const TK_CH_FLOORS = FLOORS.filter(f => f.propertyId === "prop-tokyo-chancery");
ROOMS_BY_PROP["prop-tokyo-chancery"] = [
  ...genFloorRooms("prop-tokyo-chancery", TK_CH_FLOORS[0], ROOM_POOL_CHANCERY, 4, "tc"),
  ...genFloorRooms("prop-tokyo-chancery", TK_CH_FLOORS[1], ROOM_POOL_CHANCERY, 5, "tc"),
  ...genFloorRooms("prop-tokyo-chancery", TK_CH_FLOORS[2], ROOM_POOL_CHANCERY, 5, "tc"),
  ...genFloorRooms("prop-tokyo-chancery", TK_CH_FLOORS[3], ROOM_POOL_CHANCERY, 4, "tc"),
  ...genFloorRooms("prop-tokyo-chancery", TK_CH_FLOORS[4], ROOM_POOL_CHANCERY, 3, "tc"),
];
// Washington Residence
const WS_RES_FLOORS = FLOORS.filter(f => f.propertyId === "prop-washington");
ROOMS_BY_PROP["prop-washington"] = [
  ...genFloorRooms("prop-washington", WS_RES_FLOORS[0], ROOM_POOL_RES_GROUND, 6, "wr"),
  ...genFloorRooms("prop-washington", WS_RES_FLOORS[1], ROOM_POOL_RES_UPPER, 5, "wr"),
  ...genFloorRooms("prop-washington", WS_RES_FLOORS[2], ROOM_POOL_RES_UPPER, 4, "wr"),
];
// Washington Chancery
const WS_CH_FLOORS = FLOORS.filter(f => f.propertyId === "prop-washington-chancery");
ROOMS_BY_PROP["prop-washington-chancery"] = [
  ...genFloorRooms("prop-washington-chancery", WS_CH_FLOORS[0], ROOM_POOL_CHANCERY, 6, "wc"),
  ...genFloorRooms("prop-washington-chancery", WS_CH_FLOORS[1], ROOM_POOL_CHANCERY, 5, "wc"),
  ...genFloorRooms("prop-washington-chancery", WS_CH_FLOORS[2], ROOM_POOL_CHANCERY, 5, "wc"),
  ...genFloorRooms("prop-washington-chancery", WS_CH_FLOORS[3], ROOM_POOL_CHANCERY, 4, "wc"),
];

// Flat list (also indexable by id) — used by getRoom / getRooms
const ROOMS_FLAT = [];
Object.values(ROOMS_BY_PROP).forEach(arr => arr.forEach(r => ROOMS_FLAT.push(r)));

// ---------- Sub-spaces (selective: master bedrooms/kitchens/ambassador's offices) ----------
const SUBSPACES = [
  // Tokyo Residence
  { id: "ss-tk-amb-closet",   roomId: "rm-tk-amb",    propertyId: "prop-tokyo", name: { en: "Walk-in Closet", ar: "خزانة المشي" }, type: "closet",  area: 8, photos: [], assetCount: 12 },
  { id: "ss-tk-amb-ensuite",  roomId: "rm-tk-amb",    propertyId: "prop-tokyo", name: { en: "Ensuite Bath",   ar: "حمام داخلي" },   type: "ensuite", area: 9, photos: [], assetCount: 14 },
  { id: "ss-tk-kitchen-pantry", roomId: "rm-tk-kitchen", propertyId: "prop-tokyo", name: { en: "Pantry", ar: "المخزن الجاف" }, type: "pantry", area: 6, photos: [], assetCount: 28 },
  { id: "ss-tk-office-secure", roomId: "rm-tk-office", propertyId: "prop-tokyo", name: { en: "Secure Document Storage", ar: "خزانة الوثائق الآمنة" }, type: "storage", area: 4, photos: [], assetCount: 18 },
  { id: "ss-tk-guest1-closet", roomId: "rm-tk-guest1", propertyId: "prop-tokyo", name: { en: "Closet", ar: "خزانة" }, type: "closet", area: 4, photos: [], assetCount: 6 },
];
// Add 2-3 sub-spaces per other property (programmatically) where rooms have hasSubSpaces=true
let ssIdx = 100;
Object.entries(ROOMS_BY_PROP).forEach(([pid, rooms]) => {
  if (pid === "prop-tokyo") return;
  rooms.filter(r => r.hasSubSpaces).slice(0, 4).forEach(r => {
    if (r.type === "bedroom") {
      SUBSPACES.push({ id: `ss-${ssIdx++}`, roomId: r.id, propertyId: pid, name: { en: "Walk-in Closet", ar: "خزانة المشي" }, type: "closet", area: 7, photos: [], assetCount: 10 });
      SUBSPACES.push({ id: `ss-${ssIdx++}`, roomId: r.id, propertyId: pid, name: { en: "Ensuite Bath", ar: "حمام داخلي" }, type: "ensuite", area: 8, photos: [], assetCount: 12 });
      r.subSpaceIds = [`ss-${ssIdx-2}`, `ss-${ssIdx-1}`];
    } else if (r.type === "kitchen") {
      SUBSPACES.push({ id: `ss-${ssIdx++}`, roomId: r.id, propertyId: pid, name: { en: "Pantry", ar: "المخزن الجاف" }, type: "pantry", area: 5, photos: [], assetCount: 22 });
    } else if (r.type === "office") {
      SUBSPACES.push({ id: `ss-${ssIdx++}`, roomId: r.id, propertyId: pid, name: { en: "Document Storage", ar: "خزانة الوثائق" }, type: "storage", area: 3, photos: [], assetCount: 16 });
    }
  });
});
// One wine cellar (Paris)
SUBSPACES.push({ id: `ss-${ssIdx++}`, roomId: ROOMS_BY_PROP["prop-paris"][0].id, propertyId: "prop-paris", name: { en: "Wine Cellar", ar: "قبو النبيذ" }, type: "wine-cellar", area: 9, photos: [], assetCount: 84 });

// ---------- Compatibility helpers ----------
function getFloors(propertyId) { return FLOORS.filter(f => f.propertyId === propertyId); }
function getRooms(propertyId)  { return ROOMS_BY_PROP[propertyId] || []; }
function getRoom(propertyId, roomId) { return (ROOMS_BY_PROP[propertyId] || []).find(r => r.id === roomId); }
function getRoomByIdAny(roomId) { return ROOMS_FLAT.find(r => r.id === roomId); }
function getSubSpaces(roomId)  { return SUBSPACES.filter(s => s.roomId === roomId); }

// Override the basic ROOMS index from data.jsx so old screens reading window.ROOMS still work
const ROOMS = ROOMS_BY_PROP;

Object.assign(window, {
  FLOORS, ROOMS_BY_PROP, ROOMS, ROOMS_FLAT, SUBSPACES,
  getFloors, getRooms, getRoom, getRoomByIdAny, getSubSpaces,
});
