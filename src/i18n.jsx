/* global window */
// ============================================================
// MoFA Bahrain — i18n strings + locale helpers
// Default: ar (RTL). Toggle from top bar.
// ============================================================

const MESSAGES = {
  ar: {
    app_name: "نظام ادارة شؤون العقارات في الخارج للبعثة و المنزل",
    eyebrow: "مملكة البحرين · وزارة الخارجية",
    search_placeholder: "بحث في النظام…",

    // Top bar
    select_property: "اختيار العقار",
    pause_motion: "إيقاف الحركة",
    resume_motion: "استئناف الحركة",
    notifications: "التنبيهات",
    profile: "الملف الشخصي",
    sign_out: "تسجيل الخروج",

    // Sections
    sec_dashboard: "اللوحة الرئيسية",
    sec_properties: "العقارات",
    sec_operations: "العمليات",
    sec_records: "السجلات",
    sec_admin: "الإدارة",

    // Nav items
    nav_overview: "نظرة عامة",
    nav_reminders: "التذكيرات",
    nav_audit: "سجل النشاط",
    nav_all_properties: "جميع العقارات",
    nav_handover: "تسليم وتسلم",
    nav_maintenance: "الصيانة",
    nav_vendors: "المتعاقدون",
    nav_approvals: "الموافقات",
    nav_reports: "التقارير",
    nav_fleet: "إدارة المركبات",
    nav_bills: "الفواتير والمصروفات",
    nav_events: "الفعاليات",
    nav_uniforms: "الزي الرسمي",
    nav_fridge: "الثلاجة",
    nav_grocery: "قائمة التسوق",
    nav_storage: "المستودع",
    nav_asset_register: "سجل الأصول",
    nav_documents: "الوثائق",
    nav_users: "المستخدمون",
    nav_settings: "الإعدادات",

    // Dashboard
    morning: "صباح الخير",
    afternoon: "مساء الخير",
    properties_count_one: "{n} عقار · {h} عملية تسليم نشطة",
    properties_count_many: "{n} عقارات · {h} عملية تسليم نشطة",
    resume_handover: "متابعة تسليم طوكيو",

    stat_properties: "العقارات الخاضعة للإدارة",
    stat_assets_value: "القيمة الإجمالية للأصول",
    stat_pending_maint: "الصيانة المعلّقة",
    stat_active_handovers: "عمليات التسليم النشطة",

    chart_maint_spend: "مصاريف الصيانة — آخر ١٢ شهراً",
    chart_assets_dist: "توزيع الأصول حسب الفئة",
    recent_activity: "النشاط الأخير",
    properties_at_glance: "نظرة على العقارات",
    upcoming_reminders: "التذكيرات القادمة",
    pending_approvals: "الموافقات المعلّقة",
    review: "مراجعة",

    // Property
    type_embassy: "سفارة",
    type_residence: "مقر إقامة",
    type_consulate: "قنصلية",
    type_official: "دار رسمية",
    status_active: "قيد التشغيل",
    status_handover: "قيد التسليم",
    status_vacant: "شاغر",
    status_renovation: "ترميم",

    rooms: "الغرف",
    assets: "الأصول",
    area: "المساحة",
    last_inspect: "آخر تفتيش",
    open: "فتح",
    initiate_handover: "بدء عملية تسليم",

    // Property tabs
    tab_overview: "نظرة عامة",
    tab_rooms: "الغرف",
    tab_kitchen: "المطبخ",
    tab_paintings: "اللوحات والهدايا",
    tab_vehicles: "المركبات",
    tab_photos: "أرشيف الصور",
    tab_maint: "الصيانة",
    tab_garden: "الحديقة والمسبح",
    tab_bills: "الفواتير",
    tab_events: "الفعاليات",
    tab_security: "الأمن",
    tab_docs: "الوثائق",
    tab_floor: "المخطط",

    facts: "بيانات العقار",
    fact_acquired: "تاريخ الاستلام",
    fact_area: "المساحة الإجمالية",
    fact_rooms: "عدد الغرف",
    fact_garden: "حديقة",
    fact_pool: "مسبح",
    fact_resident: "الساكن الحالي",
    fact_contact: "جهة الاتصال بالوزارة",
    yes: "نعم",
    no: "لا",

    // Room
    floor_ground: "الطابق الأرضي",
    floor_first: "الطابق الأول",
    floor_second: "الطابق الثاني",
    floor_annex: "الملحق",
    sqm: "م²",
    reset_view: "إعادة الزاوية",
    pause_rotation: "إيقاف الدوران",
    resume_rotation: "استئناف الدوران",
    view_2d: "عرض كصورة",
    asset_count_in_room: "{n} أصلاً في هذه الغرفة",

    // Handover
    handover_in_progress: "عملية تسليم قيد التنفيذ",
    handover_progress: "تقدّم التسليم",
    items_total: "إجمالي الأصول",
    items_verified: "تم التحقق",
    items_disputed: "تحت الاعتراض",
    items_missing: "مفقود",
    days_remaining: "أيام متبقية",
    print_certificate: "طباعة شهادة التسليم",
    export_pdf: "تصدير PDF",
    sign_off: "اعتماد",
    pending: "قيد الانتظار",
    verified: "تم التحقق",
    disputed: "محل اعتراض",
    missing: "مفقود",
    filter_all: "الكل",
    role_outgoing: "السفير المنتهية فترته",
    role_incoming: "السفير القادم",
    role_inspector: "المفتش",
    role_ministry: "الوزارة",
    signed: "تم التوقيع",
    unsigned: "بانتظار التوقيع",
    condition_prior: "الحالة السابقة",
    condition_now: "الحالة الحالية",
    condition_excellent: "ممتازة",
    condition_good: "جيدة",
    condition_fair: "مقبولة",
    condition_poor: "سيئة",

    // Login
    login_welcome: "أهلاً وسهلاً",
    login_sub: "نظام إدارة العقارات الدبلوماسية",
    login_email: "البريد الإلكتروني الرسمي",
    login_password: "كلمة المرور",
    login_signin: "تسجيل الدخول",
    login_help: "للمساعدة، تواصل مع وحدة تقنية المعلومات في الوزارة",

    // Generic
    actions: "الإجراءات",
    view: "عرض",
    add: "إضافة",
    save: "حفظ",
    cancel: "إلغاء",
    close: "إغلاق",

    guests_added: "الضيوف مُضافون",
    guests_none: "لا ضيوف",
    guest_list: "قائمة الضيوف",

    // Role switcher (demo only)
    switch_role: "تبديل الصلاحية (للعرض فقط)",
    demo_only: "وضع العرض فقط",
    role_hq_admin: "إدارة عامة — المنامة",
    role_embassy_admin: "مدير سفارة",
    role_embassy_staff: "موظف سفارة",
    current_authority: "الصلاحية الحالية",
    posting_label: "المقر · القسم",
    persona_disclaimer: "في النظام الحقيقي تُحدَّد الصلاحية تلقائياً عند تسجيل الدخول. هذا المبدّل مخصص للاطّلاع على الواجهة فقط.",
  },
  en: {
    app_name: "Overseas Property Management System",
    eyebrow: "Internal system · Ministry of Foreign Affairs",
    search_placeholder: "Search the system…",

    select_property: "Select property",
    pause_motion: "Pause motion",
    resume_motion: "Resume motion",
    notifications: "Notifications",
    profile: "Profile",
    sign_out: "Sign out",

    sec_dashboard: "Dashboard",
    sec_properties: "Properties",
    sec_operations: "Operations",
    sec_records: "Records",
    sec_admin: "Admin",

    nav_overview: "Overview",
    nav_reminders: "Reminders",
    nav_audit: "Audit log",
    nav_all_properties: "All properties",
    nav_handover: "Handover",
    nav_maintenance: "Maintenance",
    nav_vendors: "Vendors",
    nav_approvals: "Approvals",
    nav_reports: "Reports",
    nav_fleet: "Fleet management",
    nav_bills: "Bills & ledger",
    nav_events: "Events",
    nav_uniforms: "Uniforms",
    nav_fridge: "Fridge",
    nav_grocery: "Grocery List",
    nav_storage: "Storage",
    nav_asset_register: "Asset register",
    nav_documents: "Documents",
    nav_users: "Users & roles",
    nav_settings: "Settings",

    morning: "Good morning",
    afternoon: "Good afternoon",
    properties_count_one: "{n} property · {h} active handover",
    properties_count_many: "{n} properties · {h} active handover",
    resume_handover: "Resume Tokyo handover",

    stat_properties: "Properties under management",
    stat_assets_value: "Total assets value",
    stat_pending_maint: "Pending maintenance",
    stat_active_handovers: "Active handovers",

    chart_maint_spend: "Maintenance spend — last 12 months",
    chart_assets_dist: "Asset distribution by category",
    recent_activity: "Recent activity",
    properties_at_glance: "Properties at a glance",
    upcoming_reminders: "Upcoming reminders",
    pending_approvals: "Pending approvals",
    review: "Review",

    type_embassy: "Embassy",
    type_residence: "Residence",
    type_consulate: "Consulate",
    type_official: "Official house",
    status_active: "Active",
    status_handover: "Handover in progress",
    status_vacant: "Vacant",
    status_renovation: "Renovation",

    rooms: "Rooms",
    assets: "Assets",
    area: "Area",
    last_inspect: "Last inspection",
    open: "Open",
    initiate_handover: "Initiate handover",

    tab_overview: "Overview",
    tab_rooms: "Rooms",
    tab_kitchen: "Kitchen",
    tab_paintings: "Paintings & Gifts",
    tab_vehicles: "Vehicles",
    tab_photos: "Photo archive",
    tab_maint: "Maintenance",
    tab_garden: "Garden & Pool",
    tab_bills: "Bills",
    tab_events: "Events",
    tab_security: "Security",
    tab_docs: "Documents",
    tab_floor: "Floor plan",

    facts: "Property facts",
    fact_acquired: "Acquired",
    fact_area: "Total area",
    fact_rooms: "Rooms",
    fact_garden: "Garden",
    fact_pool: "Pool",
    fact_resident: "Current resident",
    fact_contact: "Ministry contact",
    yes: "Yes",
    no: "No",

    floor_ground: "Ground floor",
    floor_first: "First floor",
    floor_second: "Second floor",
    floor_annex: "Annex",
    sqm: "m²",
    reset_view: "Reset view",
    pause_rotation: "Pause rotation",
    resume_rotation: "Resume rotation",
    view_2d: "View as photo",
    asset_count_in_room: "{n} assets in this room",

    handover_in_progress: "Handover in progress",
    handover_progress: "Handover progress",
    items_total: "Items total",
    items_verified: "Verified",
    items_disputed: "Disputed",
    items_missing: "Missing",
    days_remaining: "Days remaining",
    print_certificate: "Print certificate",
    export_pdf: "Export PDF",
    sign_off: "Sign off",
    pending: "Pending",
    verified: "Verified",
    disputed: "Disputed",
    missing: "Missing",
    filter_all: "All",
    role_outgoing: "Outgoing Ambassador",
    role_incoming: "Incoming Ambassador",
    role_inspector: "Inspector",
    role_ministry: "Ministry",
    signed: "Signed",
    unsigned: "Awaiting signature",
    condition_prior: "Prior condition",
    condition_now: "Current condition",
    condition_excellent: "Excellent",
    condition_good: "Good",
    condition_fair: "Fair",
    condition_poor: "Poor",

    login_welcome: "Welcome",
    login_sub: "Diplomatic property management system",
    login_email: "Official email",
    login_password: "Password",
    login_signin: "Sign in",
    login_help: "For assistance, contact the Ministry IT desk",

    actions: "Actions",
    view: "View",
    add: "Add",
    save: "Save",
    cancel: "Cancel",
    close: "Close",

    guests_added: "Guests Added",
    guests_none: "No Guests",
    guest_list: "Guest List",

    current_authority: "Current Role",
    posting_label: "Posting · Department",
    switch_role: "Switch role (demo only)",
    demo_only: "Demo only",
    role_hq_admin: "HQ Admin · Manama",
    role_embassy_admin: "Embassy Admin",
    role_embassy_staff: "Embassy Staff",
    persona_disclaimer: "In production the role is determined automatically at sign-in. This switcher exists so you can preview the interface across roles.",
  },
};

function t(key, lang, vars) {
  let s = (MESSAGES[lang] && MESSAGES[lang][key]) || (MESSAGES.en && MESSAGES.en[key]) || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, v); });
  return s;
}

function fmtCurrency(value, currency = "BHD", lang = "en") {
  if (value == null) return "—";
  const n = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  return `${currency} ${n}`;
}
function fmtNumber(value) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}
function fmtDate(iso, lang = "en") {
  if (!iso) return "—";
  const d = new Date(iso);
  const months_en = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const months_ar = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const m = (lang === "ar" ? months_ar : months_en)[d.getMonth()];
  return `${String(d.getDate()).padStart(2,"0")} ${m} ${d.getFullYear()}`;
}

Object.assign(window, { MESSAGES, t, fmtCurrency, fmtNumber, fmtDate });
