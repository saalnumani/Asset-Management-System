/* global window */
// ============================================================
// Maintenance — polymorphic targets (building / asset / vehicle / garden-pool)
// ~150 tasks across 4 properties · realistic status distribution
// ============================================================

const STATUSES = ["completed", "scheduled", "overdue", "in-progress"];
function pickStatus(i) {
  // 40% completed, 35% scheduled, 15% overdue, 10% in-progress
  const r = (i * 17 + 3) % 100;
  if (r < 40) return "completed";
  if (r < 75) return "scheduled";
  if (r < 90) return "overdue";
  return "in-progress";
}
function dateOff(daysFromToday) {
  const d = new Date("2026-05-08");
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10);
}

const MTPL = {
  building: [
    ["AC service", "صيانة التكييف", "hvac", 480, "quarterly"],
    ["Water heater repair", "إصلاح سخان الماء", "plumbing", 320, null],
    ["Roof inspection", "تفتيش السطح", "structural", 240, "annual"],
    ["Electrical safety check", "فحص السلامة الكهربائية", "electrical", 380, "annual"],
    ["Elevator service", "صيانة المصعد", "structural", 540, "biannual"],
    ["Gutter cleaning", "تنظيف المزاريب", "structural", 180, "biannual"],
    ["Fire alarm test", "اختبار جهاز الإنذار", "structural", 220, "quarterly"],
    ["Generator service", "صيانة المولد", "electrical", 460, "annual"],
    ["Pest control treatment", "معالجة الحشرات", "structural", 220, "quarterly"],
    ["Window cleaning (exterior)", "تنظيف النوافذ الخارجية", "structural", 280, "quarterly"],
  ],
  asset: [
    ["Steinway piano tuning", "ضبط بيانو ستاينواي", "specialist", 320, "quarterly"],
    ["Christofle silver polishing", "تلميع الفضيات", "specialist", 480, "annual"],
    ["Antique rug deep-clean", "تنظيف عميق للسجاد الأثري", "specialist", 720, "biannual"],
    ["Vintage clock winding visit", "ضبط الساعات الأثرية", "specialist", 120, "monthly"],
    ["Oil painting conservation review", "مراجعة ترميم اللوحات", "specialist", 880, "annual"],
    ["Crystal chandelier cleaning", "تنظيف الثريا", "specialist", 380, "biannual"],
    ["Antique furniture wax treatment", "صيانة الأثاث الأثري", "specialist", 240, "annual"],
  ],
  vehicle: [
    ["Full service", "صيانة شاملة", "vehicle", 680, null],
    ["Oil change", "تغيير الزيت", "vehicle", 180, null],
    ["Tyre rotation", "تدوير الإطارات", "vehicle", 80, null],
    ["Detailing", "تنظيف داخلي وخارجي", "vehicle", 220, "quarterly"],
    ["Annual inspection", "الفحص السنوي", "vehicle", 320, "annual"],
  ],
  "garden-pool": [
    ["Irrigation seasonal startup", "تشغيل الري الموسمي", "garden", 280, "annual"],
    ["Pool pump service", "صيانة مضخة المسبح", "pool", 320, "quarterly"],
    ["Garden landscaping", "تنسيق الحديقة", "garden", 880, "biannual"],
    ["Pool chemical treatment", "معالجة كيميائية للمسبح", "pool", 180, "monthly"],
    ["Tree pruning", "تقليم الأشجار", "garden", 420, "biannual"],
    ["Lawn aeration", "تهوية العشب", "garden", 240, "biannual"],
  ],
};

function buildMaintenance(propertyId, prefix) {
  const out = [];
  let i = 0;
  // 14 building tasks
  for (let k = 0; k < 14; k++) {
    const t = MTPL.building[k % MTPL.building.length];
    out.push({
      id: `m-${prefix}-b-${String(k+1).padStart(2,"0")}`,
      type: t[2],
      title: { en: t[0], ar: t[1] },
      targetType: "building",
      targetId: propertyId,
      propertyId,
      vendorId: `v-${prefix}-${(k % 4) + 1}`,
      scheduledDate: dateOff((k * 13 - 60)),
      completedDate: pickStatus(i++) === "completed" ? dateOff((k * 13 - 65)) : undefined,
      cost: t[3] + (k * 17) % 280, currency: "BHD",
      status: pickStatus(k * 7 + 1),
      recurrence: t[4] || undefined,
    });
  }
  // 6 asset-targeted
  for (let k = 0; k < 6; k++) {
    const t = MTPL.asset[k % MTPL.asset.length];
    out.push({
      id: `m-${prefix}-a-${String(k+1).padStart(2,"0")}`,
      type: t[2], title: { en: t[0], ar: t[1] },
      targetType: "asset",
      targetId: prefix === "tk" && k === 0 ? "ast-mj-painting" : `asset-${prefix}-${k+1}`,
      propertyId, vendorId: `v-${prefix}-spec`,
      scheduledDate: dateOff(k * 21 - 30),
      cost: t[3], currency: "BHD",
      status: pickStatus(k * 11 + 5), recurrence: t[4] || undefined,
    });
  }
  // 4 vehicle-targeted (only for properties that have vehicles)
  const vehMap = { lon: "v-lon-lex", par: "v-par-merc", tk: "v-tk-rover", ws: "v-ws-cad" };
  if (vehMap[prefix]) {
    for (let k = 0; k < 4; k++) {
      const t = MTPL.vehicle[k];
      out.push({
        id: `m-${prefix}-v-${String(k+1).padStart(2,"0")}`,
        type: t[2], title: { en: t[0], ar: t[1] },
        targetType: "vehicle", targetId: vehMap[prefix],
        propertyId, vendorId: `v-${prefix}-veh`,
        scheduledDate: dateOff(k * 30 - 60),
        completedDate: k < 2 ? dateOff(k * 30 - 65) : undefined,
        cost: t[3], currency: "BHD",
        status: prefix === "tk" && t[0] === "Oil change" ? "overdue" : (k < 2 ? "completed" : "scheduled"),
        recurrence: t[4] || undefined,
      });
    }
  }
  // 6 garden-pool tasks
  for (let k = 0; k < 6; k++) {
    const t = MTPL["garden-pool"][k % MTPL["garden-pool"].length];
    out.push({
      id: `m-${prefix}-g-${String(k+1).padStart(2,"0")}`,
      type: t[2], title: { en: t[0], ar: t[1] },
      targetType: "garden-pool",
      targetId: `gp-${propertyId}`,
      propertyId, vendorId: `v-${prefix}-gard`,
      scheduledDate: dateOff(k * 24 - 40),
      cost: t[3], currency: "BHD",
      status: pickStatus(k * 13 + 9), recurrence: t[4] || undefined,
    });
  }
  return out;
}

const MAINTENANCE = [
  ...buildMaintenance("prop-london", "lon"),
  ...buildMaintenance("prop-london-chancery", "loc"),
  ...buildMaintenance("prop-paris", "par"),
  ...buildMaintenance("prop-tokyo", "tk"),
  ...buildMaintenance("prop-tokyo-chancery", "tkc"),
  ...buildMaintenance("prop-washington", "ws"),
  ...buildMaintenance("prop-washington-chancery", "wsc"),
];

function getMaintenance(propertyId) { return MAINTENANCE.filter(m => m.propertyId === propertyId); }
function getMaintenanceByTarget(targetType, targetId) {
  return MAINTENANCE.filter(m => m.targetType === targetType && m.targetId === targetId);
}

Object.assign(window, { MAINTENANCE, getMaintenance, getMaintenanceByTarget });
