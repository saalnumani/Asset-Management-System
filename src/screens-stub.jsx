/* global window, React, t, Icon, DiamondRule */
// ============================================================
// Stub screens for the ~25 remaining pages so navigation works
// ============================================================

function StubScreen({ lang, title, kicker, hint }) {
  return (
    <div className="page-enter">
      <window.Breadcrumbs lang={lang} items={[
        { label: t("sec_dashboard", lang), path: "/dashboard" },
        { label: title },
      ]}/>
      <div className="page" style={{ paddingTop: 40 }}>
        <div className="page-head">
          <div>
            <DiamondRule />
            <h1 style={{ marginTop: 8 }}>{title}</h1>
            {kicker && <div className="sub">{kicker}</div>}
          </div>
        </div>
        <div className="card" style={{ padding: "80px 40px", textAlign: "center", color: "var(--ink-faint)", borderStyle: "dashed" }}>
          <Icon name="archive" size={40} style={{ color: "var(--brass)", opacity: 0.4 }}/>
          <h3 className="serif" style={{ marginTop: 12, fontSize: 22, color: "var(--ink-soft)" }}>
            {lang === "ar" ? "هذا القسم قيد الإعداد" : "This section is under preparation"}
          </h3>
          <p className="muted" style={{ maxWidth: 480, margin: "10px auto 0", fontSize: 13 }}>
            {hint || (lang === "ar"
              ? "ستتاح الواجهة الكاملة في المرحلة القادمة من النظام. تم تأمين المسار حتى لا تنكسر التنقلات."
              : "The full interface will be enabled in the next milestone. The route is reserved so navigation and breadcrumbs don't break.")}
          </p>
        </div>
      </div>
    </div>
  );
}

const STUB_LABELS = {
  audit:            { en: "Audit log",          ar: "سجل النشاط" },
  vendors:          { en: "Vendors",             ar: "المتعاقدون" },
  approvals:        { en: "Approvals",           ar: "الموافقات" },
  reports:          { en: "Reports",             ar: "التقارير" },
  assets:           { en: "Asset register",      ar: "سجل الأصول" },
  documents:        { en: "Documents",           ar: "الوثائق" },
  users:            { en: "Users & roles",       ar: "المستخدمون والصلاحيات" },
  settings:         { en: "Settings",            ar: "الإعدادات" },
  uniforms:         { en: "Uniforms",            ar: "الزي الرسمي" },
  storage:          { en: "Storage",             ar: "المستودع" },
  "events-protocol":{ en: "Events Protocol",    ar: "بروتوكول الفعاليات" },
};

function StubByName({ lang, name }) {
  const lab = STUB_LABELS[name] || { en: name, ar: name };
  return <StubScreen lang={lang} title={lang === "ar" ? lab.ar : lab.en} />;
}

Object.assign(window, { StubScreen, StubByName });
