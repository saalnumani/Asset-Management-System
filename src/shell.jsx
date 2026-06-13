/* global window, React, t, fmtCurrency, fmtNumber, fmtDate, Icon, DiamondRule, PROPERTIES, getProperty, USERS, CURRENT_USER, ROLE_PERSONAS, useCurrentRole, getActivePersona, setActivePersona, getPosting */
// ============================================================
// Shell — TopBar, Sidebar, Breadcrumbs, layout, route helpers
// ============================================================

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// Hash-based router: state shape { name, params }
function parseHash() {
  const h = (window.location.hash || "#/").replace(/^#/, "") || "/";
  const parts = h.split("?")[0].split("/").filter(Boolean);
  if (parts.length === 0) return { name: "dashboard", params: {} };
  if (parts[0] === "login") return { name: "login", params: {} };
  if (parts[0] === "dashboard") return { name: "dashboard", params: {} };
  if (parts[0] === "properties") {
    if (parts.length === 1) return { name: "properties", params: {} };
    const pid = parts[1];
    if (parts.length === 2) return { name: "property", params: { pid } };
    if (parts[2] === "rooms" && parts[3]) return { name: "room", params: { pid, rid: parts[3] } };
    return { name: "property", params: { pid, tab: parts[2] } };
  }
  if (parts[0] === "handover" && parts[1]) return { name: "handover", params: { hid: parts[1] } };
  return { name: parts[0], params: {} };
}
function navigate(path) { window.location.hash = path.startsWith("#") ? path : "#" + path; }

function useRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    function onHash() { setRoute(parseHash()); window.scrollTo(0, 0); }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

// =============================================================
// TopBar
// =============================================================
function TopBar({ lang, setLang, activePropId, setActivePropId }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [roleMenu, setRoleMenu] = useState(false);
  const { user } = useCurrentRole();
  return (
    <header className="topbar">
      <a className="brand" href="#/dashboard" onClick={() => navigate("/dashboard")}
        style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <img src="public/assets/mofa-logo.svg" alt="MoFA" style={{ height: 40, display: "block" }} />
        <div className="vline" />
        <div className="brand-text">
          <span className="brand-eyebrow">{t("eyebrow", lang)}</span>
          <span className="brand-name">{t("app_name", lang)}</span>
        </div>
      </a>

      <div className="spacer" />

      {/* Search — popup */}
      <div style={{ position: "relative" }}>
        <button className="icon-btn icon-btn--round" title={t("search_placeholder", lang)}
          onClick={() => setSearchOpen(v => !v)}>
          <Icon name="search" size={18} />
        </button>
        {searchOpen && (
          <div style={{ position: "absolute", top: 54, insetInlineEnd: 0, background: "var(--cream-page)",
              border: "1px solid var(--border-hair)", borderRadius: 12, width: 360, zIndex: 55, padding: 10 }}>
            <div className="search-input" style={{ width: "100%" }}>
              <Icon name="search" size={16} />
              <input autoFocus placeholder={t("search_placeholder", lang)}
                onKeyDown={e => { if (e.key === "Escape") setSearchOpen(false); }} />
            </div>
          </div>
        )}
      </div>

      <button className="lang-toggle" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
        <Icon name="globe" size={16} />
        {lang === "ar" ? "EN" : "ع"}
      </button>

      <button className="icon-btn" title={t("notifications", lang)} style={{ position: "relative" }}>
        <Icon name="bell" size={18} />
        <span style={{ position: "absolute", top: 6, insetInlineEnd: 6, width: 7, height: 7, borderRadius: 999, background: "var(--critical)" }} />
      </button>

      {/* Role switcher (demo only) — between bell and avatar */}
      <div style={{ position: "relative" }}>
        <button
          className="icon-btn icon-btn--round"
          title={t("profile", lang)}
          onClick={() => setRoleMenu(v => !v)}
          style={{ cursor: "pointer" }}
        >
          <Icon name="user" size={18} />
        </button>
        {roleMenu && (() => {
          const titleRaw = (user.titleShort && user.titleShort[lang])
            || t(`role_${user.role.replace("-", "_")}`, lang);
          const segs = titleRaw.split(/\s*[·—–-]\s*/);
          const roleLabel = segs[0] || titleRaw;
          const postingLabel = segs.slice(1).join(" · ")
            || (user.postingId ? getPosting(user.postingId)?.city[lang] : (lang === "ar" ? "المقر الرئيسي · المنامة" : "Headquarters · Manama"));
          const divider = <div style={{ height: 1, background: "rgba(247,248,250,0.10)" }} />;
          const eyebrow = (txt) => (
            <div style={{ fontSize: 9.5, letterSpacing: "0.13em", textTransform: "uppercase",
              color: "rgba(247,248,250,0.42)", fontWeight: 500 }}>{txt}</div>
          );
          return (
            <div style={{ position: "absolute", top: 54, insetInlineEnd: 0,
                background: "var(--forest-deep)", border: "1px solid rgba(247,248,250,0.12)",
                borderRadius: 14, minWidth: 312, zIndex: 60, overflow: "hidden",
                color: "var(--fg-on-forest)" }}>
              {/* Identity header */}
              <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "18px 18px 16px" }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--brass)",
                  color: "var(--ink)", display: "grid", placeItems: "center",
                  fontFamily: "var(--font-serif)", fontSize: 22, flexShrink: 0 }}>{user.initial}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{user.name[lang]}</div>
                  <div style={{ fontSize: 12, color: "rgba(247,248,250,0.55)", marginTop: 2,
                    fontFamily: "var(--font-mono)", direction: "ltr", textAlign: "start" }}>{user.email}</div>
                </div>
              </div>
              {divider}
              {/* Current role */}
              <div style={{ padding: "14px 18px 6px" }}>
                {eyebrow(t("current_authority", lang))}
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 9 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--brass)",
                    color: "var(--ink)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Icon name="briefcase" size={17} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{roleLabel}</div>
                </div>
              </div>
              {/* Posting / department */}
              <div style={{ padding: "14px 18px 16px" }}>
                {eyebrow(t("posting_label", lang))}
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 7 }}>{postingLabel}</div>
              </div>
              {divider}
              {/* Role switcher (demo only) */}
              <div style={{ padding: "10px 10px 8px" }}>
                <div style={{ padding: "2px 8px 7px" }}>{eyebrow(t("switch_role", lang))}</div>
                {ROLE_PERSONAS.map(p => {
                  const u = p.user;
                  const active = p.id === getActivePersona().id;
                  return (
                    <button key={p.id}
                      onClick={() => { setActivePersona(p.id); setRoleMenu(false); }}
                      style={{ display: "flex", width: "100%", textAlign: "start", gap: 10, alignItems: "center",
                        padding: "8px 8px", border: 0, background: active ? "rgba(247,248,250,0.08)" : "transparent",
                        borderRadius: 8, marginBottom: 1, cursor: "pointer", color: "inherit" }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%",
                        background: active ? "var(--brass)" : "rgba(247,248,250,0.12)",
                        color: active ? "var(--ink)" : "var(--fg-on-forest)", display: "grid", placeItems: "center",
                        fontFamily: "var(--font-serif)", fontSize: 12, flexShrink: 0 }}>{u.initial}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 500 }}>{u.name[lang]}</div>
                        <div style={{ fontSize: 10.5, color: "rgba(247,248,250,0.5)" }}>{u.titleShort[lang]}</div>
                      </div>
                      {active && <Icon name="check" size={13} style={{ color: "var(--brass)" }} />}
                    </button>
                  );
                })}
              </div>
              {divider}
              {/* Sign out */}
              <button
                onClick={() => { setRoleMenu(false); navigate("/login"); }}
                style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
                  gap: 10, padding: "14px 18px", border: 0, background: "transparent", color: "inherit",
                  cursor: "pointer", fontSize: 14, fontWeight: 500 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(247,248,250,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                <span>{t("sign_out", lang)}</span>
                <Icon name="logout" size={18} style={{ color: "rgba(247,248,250,0.7)" }} />
              </button>
            </div>
          );
        })()}
      </div>
    </header>
  );
}

// =============================================================
// Sidebar
// =============================================================
const NAV = [
  { sec: "sec_dashboard", items: [
    { key: "nav_overview", icon: "home", path: "/dashboard" },
    { key: "nav_reminders", icon: "bell", path: "/reminders", badge: 7 },
    { key: "nav_audit", icon: "history", path: "/audit" },
  ]},
  { sec: "sec_properties", items: [
    { key: "nav_all_properties", icon: "building", path: "/properties" },
  ]},
  { sec: "sec_operations", items: [
    { key: "nav_handover", icon: "switch", path: "/handover/ho-tokyo-2026", dot: true },
    { key: "nav_maintenance", icon: "wrench", path: "/maintenance" },
    { key: "nav_vendors", icon: "users", path: "/vendors" },
    { key: "nav_reports", icon: "list", path: "/reports" },
  ]},
  { sec: "sec_records", items: [
    { key: "nav_asset_register", icon: "archive", path: "/assets" },
    { key: "nav_documents", icon: "file", path: "/documents" },
  ]},
  { sec: "sec_admin", items: [
    { key: "nav_users", icon: "users", path: "/users" },
    { key: "nav_settings", icon: "settings", path: "/settings" },
  ]},
];

function Sidebar({ lang, route }) {
  const isActive = (path) => {
    const top = path.split("/")[1];
    if (top === "dashboard" && route.name === "dashboard") return true;
    if (top === "properties" && (route.name === "properties" || route.name === "property" || route.name === "room")) return true;
    if (top === "handover" && route.name === "handover") return true;
    return route.name === top;
  };
  return (
    <aside className="sidebar scroll-clean">
      {NAV.map(group => (
        <React.Fragment key={group.sec}>
          <div className="sidebar-section">{t(group.sec, lang)}</div>
          {group.items.map(it => (
            <a key={it.key} className={"nav-item" + (isActive(it.path) ? " active" : "")}
               href={"#" + it.path}>
              <Icon name={it.icon} size={18} style={{ color: "var(--brass-deep)" }} />
              <span>{t(it.key, lang)}</span>
              {it.badge && <span className="badge">{it.badge}</span>}
              {it.dot && !it.badge && <span className="dot" />}
            </a>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}

// =============================================================
// Breadcrumbs
// =============================================================
function Breadcrumbs({ items, lang }) {
  return (
    <nav className="breadcrumbs">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name={lang === "ar" ? "chevron_left" : "chevron_right"} size={11} className="sep" />}
          {it.path && i < items.length - 1
            ? <a href={"#" + it.path}>{it.label}</a>
            : <span style={{ color: i === items.length - 1 ? "var(--ink)" : "var(--ink-soft)" }}>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

// =============================================================
// Crest mark (SVG inline) — minimalist wordmark
// =============================================================
function CrestMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Outer ring */}
      <circle cx="24" cy="24" r="21" stroke="#1B2845" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="17.5" stroke="#B89154" strokeWidth="0.6" opacity="0.7" />
      {/* Crown / 5 zigzag — Bahrain flag style */}
      <path d="M11 18 L14 22 L17 18 L20 22 L23 18 L26 22 L29 18 L32 22 L35 18 L37 22"
        stroke="#8C3A2E" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M11 23 L37 23" stroke="#8C3A2E" strokeWidth="0.6" />
      {/* Diamond center mark */}
      <path d="M24 28 L27 31 L24 34 L21 31 Z" fill="#B89154" />
      {/* Branches */}
      <path d="M14 36 Q19 33 24 35" stroke="#1B2845" strokeWidth="0.8" fill="none" />
      <path d="M34 36 Q29 33 24 35" stroke="#1B2845" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

// =============================================================
// Reusable: Pill, StatCard, Section header
// =============================================================
function Pill({ tone = "default", children, dot = true }) {
  const cls = tone === "default" ? "pill" : `pill pill--${tone}`;
  return <span className={cls}>{dot && <span className="dot" />}{children}</span>;
}

function CountUp({ value, prefix = "", suffix = "", duration = 900, decimals = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start; let raf;
    const from = 0;
    function step(ts) {
      if (!start) start = ts;
      const k = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setV(from + (value - from) * eased);
      if (k < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  const s = decimals === 0
    ? Math.round(v).toLocaleString("en-US")
    : v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span>{prefix}{s}{suffix}</span>;
}

function StatCard({ label, value, prefix, suffix, meta, accent }) {
  return (
    <div className={"stat" + (accent ? " stat--accent" : "")}>
      <div className="label">{label}</div>
      <div className="value">
        {prefix && <span className="unit">{prefix}</span>}
        <CountUp value={value} />
        {suffix && <span className="unit">{suffix}</span>}
      </div>
      {meta && <div className="meta">{meta}</div>}
    </div>
  );
}

function SectionHead({ title, kicker, action, lang }) {
  return (
    <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 18 }}>
      <div>
        {kicker && <div className="label" style={{ marginBottom: 6 }}>{kicker}</div>}
        <h2 className="serif" style={{ fontSize: 22 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

Object.assign(window, {
  parseHash, navigate, useRoute,
  TopBar, Sidebar, Breadcrumbs, CrestMark,
  Pill, StatCard, SectionHead, CountUp,
});
