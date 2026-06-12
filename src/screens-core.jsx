/* global window, React, t, fmtCurrency, fmtNumber, fmtDate, Icon, DiamondRule, navigate, Pill, StatCard, SectionHead, CountUp, CrestMark, GlobeHero, BuildingCover, FacadeViewer, PROPERTIES, getProperty, REMINDERS, AUDIT, APPROVALS, MAINT_SERIES, ASSET_DISTRIBUTION, USERS, getRooms */
// ============================================================
// Core screens: Login, Dashboard, Properties listing, Property detail
// ============================================================

const { useState: _us, useEffect: _ue, useMemo: _um, useRef: _ur } = React;

// =============================================================
// LOGIN — section 7.1
// =============================================================
function LoginScreen({ lang }) {
  const [email, setEmail] = _us("");
  const [pass, setPass] = _us("");
  function submit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }
  return (
    <div className="login-shell">
      <div className="login-watermark">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="92" stroke="#1B2845" strokeWidth="1" />
          <circle cx="100" cy="100" r="76" stroke="#B89154" strokeWidth="0.4" />
          <path d="M50 80 L62 95 L74 80 L86 95 L98 80 L110 95 L122 80 L134 95 L146 80 L150 95"
            stroke="#8C3A2E" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <path d="M100 110 L114 125 L100 140 L86 125 Z" fill="#B89154" />
          <path d="M60 160 Q80 145 100 152" stroke="#1B2845" strokeWidth="1" fill="none" />
          <path d="M140 160 Q120 145 100 152" stroke="#1B2845" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <form className="login-card fade-up" onSubmit={submit}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <CrestMark size={68} />
          <DiamondRule width={120} />
          <h1 className="serif" style={{ fontSize: 32, fontWeight: 300, color: "var(--ink)", textAlign: "center" }}>
            {t("login_welcome", lang)}
          </h1>
          <div className="label" style={{ textAlign: "center" }}>{t("login_sub", lang)}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="field">
            <label>{t("login_email", lang)}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="ambassador@mofa.gov.bh" />
          </div>
          <div className="field">
            <label>{t("login_password", lang)}</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn btn--primary btn--lg" type="submit" style={{ marginTop: 6 }}>
            {t("login_signin", lang)}
            <Icon name={lang === "ar" ? "arrow_left" : "arrow_right"} size={16} />
          </button>
          <div className="muted" style={{ fontSize: 11, textAlign: "center", marginTop: 10 }}>
            {t("login_help", lang)}
          </div>
        </div>
      </form>
    </div>
  );
}

// =============================================================
// DASHBOARD — section 7.2
// =============================================================
function Dashboard({ lang, activePropId }) {
  const totalAssets = PROPERTIES.reduce((s, p) => s + p.totalAssetsCount, 0);
  const totalValue = PROPERTIES.reduce((s, p) => s + p.totalAssetsValue, 0);
  const handovers = PROPERTIES.filter(p => p.status === "handover-in-progress").length;
  const greeting = new Date().getHours() < 12 ? "morning" : "afternoon";

  return (
    <div className="page-enter">
      <div className="breadcrumbs">
        <span style={{ color: "var(--ink)" }}>{t("nav_overview", lang)}</span>
      </div>

      <div className="page page--wide" style={{ paddingTop: 12 }}>
        {/* Hero band with 3D globe */}
        <div className="hero-band">
          <div className="three-wrap" style={{ position: "absolute", inset: 0 }}>
            <GlobeHero />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(90deg, rgba(15,26,51,0.85) 0%, rgba(15,26,51,0.5) 45%, rgba(15,26,51,0.05) 75%)",
              pointerEvents: "none" }} />
          </div>
          <div className="copy">
            <div style={{ fontSize: 11, color: "rgba(217,195,155,0.85)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10 }}>
              {fmtDate(new Date().toISOString(), lang)}
            </div>
            <h1>{t(greeting, lang)}, {window.CURRENT_USER.name[lang].split(" ")[0]}</h1>
            <div className="meta">
              {t(PROPERTIES.length === 1 ? "properties_count_one" : "properties_count_many", lang, { n: PROPERTIES.length, h: handovers })}
            </div>
          </div>
          <div className="cta">
            <a className="btn btn--brass" href="#/handover/ho-tokyo-2026">
              <Icon name="switch" size={16} />
              {t("resume_handover", lang)}
            </a>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 28 }}>
          <StatCard label={t("stat_properties", lang)} value={PROPERTIES.length} accent
            meta={`${PROPERTIES.filter(p => p.status === "active").length} active · ${handovers} in handover`} />
          <StatCard label={t("stat_assets_value", lang)} value={totalValue} prefix="BHD "
            meta={`${fmtNumber(totalAssets)} items registered`} />
          <StatCard label={t("stat_pending_maint", lang)} value={9}
            meta={"3 overdue · 6 due this month"} />
          <StatCard label={t("stat_active_handovers", lang)} value={handovers}
            meta={"Tokyo · 79% complete · 14 days remaining"} />
        </div>

        {/* Two-column: charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="card" style={{ padding: 28 }}>
            <SectionHead title={t("chart_maint_spend", lang)} kicker={t("sec_operations", lang)} lang={lang} />
            <MaintChart lang={lang} />
            <div style={{ display: "flex", gap: 18, fontSize: 11, color: "var(--ink-soft)", marginTop: 14 }}>
              <Legend color="var(--forest)" label={t("type_embassy", lang) + " London"} />
              <Legend color="var(--brass)" label={t("type_embassy", lang) + " Paris"} />
              <Legend color="var(--critical)" label={t("type_embassy", lang) + " Tokyo"} />
              <Legend color="var(--positive)" label={t("type_embassy", lang) + " Washington"} />
            </div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <SectionHead title={t("chart_assets_dist", lang)} kicker={t("sec_records", lang)} lang={lang} />
            <DonutChart lang={lang} />
          </div>
        </div>

        {/* Properties grid */}
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginTop: 32, marginBottom: 18 }}>
          <h2 className="serif" style={{ fontSize: 24 }}>{t("properties_at_glance", lang)}</h2>
          <a href="#/properties" className="btn btn--ghost">
            {t("nav_all_properties", lang)}
            <Icon name={lang === "ar" ? "arrow_left" : "arrow_right"} size={14} />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {PROPERTIES.map(p => <MiniPropertyCard key={p.id} prop={p} lang={lang} />)}
        </div>

        {/* Reminders + activity + approvals — three columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 32 }}>
          <div className="card">
            <SectionHead title={t("upcoming_reminders", lang)} kicker={t("nav_reminders", lang)} lang={lang} />
            <div className="timeline" style={{ marginTop: 8 }}>
              {REMINDERS.slice(0, 5).map(r => (
                <div className="row" key={r.id}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{r.title[lang]}</span>
                    {r.status === "overdue" && <Pill tone="critical" dot>{lang === "ar" ? "متأخر" : "Overdue"}</Pill>}
                    {r.status === "due-soon" && <Pill tone="warning" dot>{lang === "ar" ? "قريباً" : "Due soon"}</Pill>}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>{fmtDate(r.dueDate, lang)} · {r.category}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <SectionHead title={t("recent_activity", lang)} kicker={t("nav_audit", lang)} lang={lang} />
            <div className="timeline" style={{ marginTop: 8 }}>
              {AUDIT.slice(0, 5).map(a => {
                const u = USERS.find(u => u.id === a.user);
                return (
                  <div className="row" key={a.id}>
                    <div style={{ fontSize: 13 }}>{a.entity.label[lang]}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                      {u?.name[lang]} · {new Date(a.ts).toLocaleString(lang === "ar" ? "ar-BH" : "en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <SectionHead title={t("pending_approvals", lang)} kicker={t("nav_approvals", lang)} lang={lang} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
              {APPROVALS.map(a => {
                const u = USERS.find(u => u.id === a.requestedBy);
                return (
                  <div key={a.id} style={{ padding: "12px 14px", border: "1px solid var(--border-faint)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{a.justification[lang]}</span>
                      {a.amount && <span className="serif" style={{ fontSize: 16, color: "var(--forest)" }}>{fmtCurrency(a.amount, a.currency, lang)}</span>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>{u?.name[lang]} · {fmtDate(a.requestedAt, lang)}</span>
                      <button className="btn btn--ghost btn--sm">{t("review", lang)}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
    <span style={{ width: 10, height: 2, background: color }} /> {label}
  </div>;
}

// Maintenance line chart (SVG)
function MaintChart({ lang }) {
  const W = 600, H = 220, P = { l: 40, r: 16, t: 16, b: 30 };
  const series = [
    { key: "london", color: "var(--forest)" },
    { key: "paris", color: "var(--brass)" },
    { key: "tokyo", color: "var(--critical)" },
    { key: "washington", color: "var(--positive)" },
  ];
  const max = 7000, min = 1500;
  const x = i => P.l + i * ((W - P.l - P.r) / 11);
  const y = v => P.t + (1 - (v - min) / (max - min)) * (H - P.t - P.b);
  const path = (arr) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <div className="chart" style={{ width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{ display: "block", height: 260 }}>
        {/* grid */}
        {[0,1,2,3].map(i => {
          const yy = P.t + i * ((H - P.t - P.b) / 3);
          return <g key={i}>
            <line x1={P.l} x2={W - P.r} y1={yy} y2={yy} stroke="var(--border-faint)" strokeDasharray="3,3" />
            <text x={P.l - 8} y={yy + 3} textAnchor="end" className="chart-axis" style={{ fontSize: 10, fill: "var(--ink-faint)" }}>
              {Math.round(max - i * ((max - min)/3))}
            </text>
          </g>;
        })}
        {/* x-axis labels */}
        {MAINT_SERIES.labels.map((m, i) => (
          <text key={i} x={x(i)} y={H - 10} textAnchor="middle" style={{ fontSize: 10, fill: "var(--ink-faint)" }}>{m}</text>
        ))}
        {/* series */}
        {series.map(s => (
          <g key={s.key} style={{ color: s.color }}>
            <path d={path(MAINT_SERIES[s.key])} className="line" stroke={s.color} fill="none" strokeWidth="1.6" />
            {MAINT_SERIES[s.key].map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill={s.color} />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

// Donut chart
function DonutChart({ lang }) {
  const total = ASSET_DISTRIBUTION.reduce((s, x) => s + x.value, 0);
  const colors = ["var(--forest)", "var(--brass)", "var(--positive)", "var(--critical)", "var(--info)", "var(--warning)", "var(--brass-deep)"];
  let acc = 0;
  const R = 80, r = 50, cx = 100, cy = 100;
  function arc(start, end) {
    const a0 = (start - 0.25) * 2 * Math.PI;
    const a1 = (end - 0.25) * 2 * Math.PI;
    const large = end - start > 0.5 ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x0i = cx + r * Math.cos(a0), y0i = cy + r * Math.sin(a0);
    const x1i = cx + r * Math.cos(a1), y1i = cy + r * Math.sin(a1);
    return `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x1i},${y1i} A${r},${r} 0 ${large} 0 ${x0i},${y0i} Z`;
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center" }}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        {ASSET_DISTRIBUTION.map((d, i) => {
          const start = acc / total;
          acc += d.value;
          const end = acc / total;
          return <path key={d.key} d={arc(start, end)} fill={colors[i]} stroke="var(--cream-page)" strokeWidth="1" />;
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" className="serif" style={{ fontSize: 28, fill: "var(--forest)", fontWeight: 300 }}>{fmtNumber(total)}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontSize: 10, fill: "var(--brass-deep)", letterSpacing: ".1em", textTransform: "uppercase" }}>{lang === "ar" ? "إجمالي الأصول" : "Total assets"}</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ASSET_DISTRIBUTION.map((d, i) => (
          <div key={d.key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
            <span style={{ width: 8, height: 8, background: colors[i], borderRadius: 2 }} />
            <span style={{ flex: 1 }}>{lang === "ar" ? d.label_ar : d.label_en}</span>
            <span className="tnum" style={{ color: "var(--ink-soft)" }}>{fmtNumber(d.value)}</span>
            <span className="muted" style={{ width: 36, textAlign: "end" }}>{Math.round(d.value/total*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniPropertyCard({ prop, lang }) {
  return (
    <a className="prop-card" href={`#/properties/${prop.id}`}>
      <div className="cover" style={{ position: "relative", height: 160 }}>
        <BuildingCover arch={prop.arch} propId={prop.id} />
        <div className="badge-corner">
          {prop.status === "handover-in-progress"
            ? <Pill tone="warning" dot>{t("status_handover", lang)}</Pill>
            : <Pill tone="positive" dot>{t("status_active", lang)}</Pill>}
        </div>
      </div>
      <div className="body">
        <div className="city">{prop.city[lang]} · {prop.country[lang]}</div>
        <h3>{prop.name[lang]}</h3>
        <div className="micro">
          <div><span className="label">{t("rooms", lang)}</span><span className="v tnum">{prop.rooms}</span></div>
          <div><span className="label">{t("assets", lang)}</span><span className="v tnum">{prop.totalAssetsCount}</span></div>
          <div><span className="label">{lang === "ar" ? "المساحة" : "Area"}</span><span className="v tnum">{fmtNumber(prop.totalArea)}</span></div>
          <div><span className="label">{lang === "ar" ? "القيمة" : "Value"}</span><span className="v tnum">{Math.round(prop.totalAssetsValue/1000)}k</span></div>
        </div>
      </div>
    </a>
  );
}

// =============================================================
// PROPERTIES LISTING — section 7.3
// =============================================================
function PropertiesScreen({ lang }) {
  return (
    <div className="page-enter">
      <window.Breadcrumbs lang={lang} items={[
        { label: t("sec_dashboard", lang), path: "/dashboard" },
        { label: t("nav_all_properties", lang) },
      ]}/>
      <div className="page page--wide" style={{ paddingTop: 16 }}>
        <div className="page-head">
          <div>
            <DiamondRule />
            <h1 style={{ marginTop: 6 }}>{t("nav_all_properties", lang)}</h1>
            <div className="sub">{lang === "ar"
              ? `${PROPERTIES.length} عقارات تحت إشراف الوزارة في ${new Set(PROPERTIES.map(p=>p.country.en)).size} دول`
              : `${PROPERTIES.length} properties under ministry custody across ${new Set(PROPERTIES.map(p=>p.country.en)).size} countries`}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--secondary"><Icon name="filter" size={14}/>{lang === "ar" ? "تصفية" : "Filter"}</button>
            <button className="btn btn--secondary"><Icon name="download" size={14}/>{t("export_pdf", lang)}</button>
            <button className="btn btn--primary"><Icon name="plus" size={14}/>{lang === "ar" ? "تسجيل عقار" : "Register property"}</button>
          </div>
        </div>

        {/* 4 large property cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {PROPERTIES.map(p => <LargePropertyCard key={p.id} prop={p} lang={lang} />)}
        </div>
      </div>
    </div>
  );
}

function LargePropertyCard({ prop, lang }) {
  return (
    <a className="prop-card" href={`#/properties/${prop.id}`}>
      <div className="cover" style={{ position: "relative", aspectRatio: "16/9" }}>
        <BuildingCover arch={prop.arch} propId={prop.id} />
        <div className="badge-corner">
          {prop.status === "handover-in-progress"
            ? <Pill tone="warning" dot>{t("status_handover", lang)}</Pill>
            : <Pill tone="positive" dot>{t("status_active", lang)}</Pill>}
        </div>
        <div style={{ position: "absolute", bottom: 12, insetInlineStart: 12, color: "var(--cream-page)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 10px", background: "rgba(15,26,51,0.7)", border: "1px solid rgba(217,195,155,0.4)", borderRadius: 4 }}>
          {prop.type === "embassy+residence" ? t("type_embassy", lang) + " · " + t("type_residence", lang) : t("type_" + prop.type, lang)}
        </div>
      </div>
      <div className="body" style={{ padding: 28, gap: 14 }}>
        <div className="city" style={{ fontSize: 13 }}>{prop.city[lang]} · {prop.country[lang]}</div>
        <h3 style={{ fontSize: 26 }}>{prop.name[lang]}</h3>
        <div className="muted" style={{ fontSize: 12 }}>{prop.address[lang]}</div>
        <div className="divider" style={{ margin: "8px 0" }}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <div><div className="label">{t("rooms", lang)}</div><div className="serif" style={{ fontSize: 22, color: "var(--forest)" }}>{prop.rooms}</div></div>
          <div><div className="label">{t("assets", lang)}</div><div className="serif" style={{ fontSize: 22, color: "var(--forest)" }}>{prop.totalAssetsCount}</div></div>
          <div><div className="label">{t("area", lang)}</div><div className="serif" style={{ fontSize: 22, color: "var(--forest)" }}>{fmtNumber(prop.totalArea)} m²</div></div>
          <div><div className="label">{lang === "ar" ? "القيمة" : "Value"}</div><div className="serif" style={{ fontSize: 22, color: "var(--forest)" }}>{Math.round(prop.totalAssetsValue/1000)}k</div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>
            <span className="label">{t("last_inspect", lang) + " · "}</span>{fmtDate(prop.nextInspection, lang)}
          </span>
          <span style={{ fontSize: 13, color: "var(--brass-deep)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6 }}>
            {t("open", lang)} <Icon name={lang === "ar" ? "arrow_left" : "arrow_right"} size={14} />
          </span>
        </div>
      </div>
    </a>
  );
}

// =============================================================
// PROPERTY DETAIL — section 7.4
// =============================================================
const PROP_TABS = [
  "tab_overview", "tab_rooms", "tab_kitchen", "tab_paintings", "tab_vehicles",
  "tab_photos", "tab_maint", "tab_garden", "tab_bills", "tab_events",
  "tab_security", "tab_docs", "tab_floor",
];

function PropertyScreen({ lang, pid }) {
  const prop = getProperty(pid);
  const [tab, setTab] = _us("tab_overview");
  const rooms = getRooms(pid);

  return (
    <div className="page-enter">
      <window.Breadcrumbs lang={lang} items={[
        { label: t("sec_dashboard", lang), path: "/dashboard" },
        { label: t("nav_all_properties", lang), path: "/properties" },
        { label: prop.city[lang] },
      ]}/>

      <div className="page page--wide" style={{ paddingTop: 14 }}>
        {/* Header band: 3D facade + facts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "stretch" }}>
          <div style={{ position: "relative", height: 380, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border-hair)", background: "#0F1A33" }}>
            <FacadeViewer arch={prop.arch} />
            <div style={{ position: "absolute", top: 18, insetInlineStart: 22, color: "var(--cream-page)" }}>
              {prop.status === "handover-in-progress"
                ? <Pill tone="warning" dot>{t("status_handover", lang)}</Pill>
                : <Pill tone="positive" dot>{t("status_active", lang)}</Pill>}
            </div>
            <div style={{ position: "absolute", bottom: 18, insetInlineStart: 22, color: "var(--cream-page)" }}>
              <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(217,195,155,0.85)" }}>
                {prop.country[lang]}
              </div>
              <h1 style={{ fontSize: 36, color: "var(--cream-page)", marginTop: 4, fontWeight: 300 }}>{prop.name[lang]}</h1>
              <div style={{ fontSize: 12, color: "rgba(250,246,238,0.7)", marginTop: 6 }}>{prop.address[lang]}</div>
            </div>
            <div style={{ position: "absolute", top: 18, insetInlineEnd: 22, display: "flex", gap: 8 }}>
              <button className="btn btn--brass btn--sm" onClick={(e) => { e.preventDefault(); }}>
                <Icon name="rotate" size={14}/> {lang === "ar" ? "تدوير" : "Rotate"}
              </button>
            </div>
          </div>
          <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            <DiamondRule />
            <div className="label">{t("facts", lang)}</div>
            <Fact label={t("fact_acquired", lang)} value={fmtDate(prop.acquiredDate, lang)} />
            <Fact label={t("fact_area", lang)} value={fmtNumber(prop.totalArea) + " m²"} />
            <Fact label={t("fact_rooms", lang)} value={prop.rooms} />
            <Fact label={t("fact_garden", lang)} value={prop.hasGarden ? t("yes", lang) : t("no", lang)} />
            <Fact label={t("fact_pool", lang)} value={prop.hasPool ? t("yes", lang) : t("no", lang)} />
            <div className="divider" style={{ margin: "6px 0" }}/>
            <div>
              <div className="label" style={{ marginBottom: 4 }}>{t("fact_resident", lang)}</div>
              <div className="serif" style={{ fontSize: 16, color: "var(--ink)" }}>{
                typeof prop.residentName === "string" ? prop.residentName : prop.residentName[lang]
              }</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {prop.status === "handover-in-progress"
                ? <a href={`#/handover/${prop.handoverId}`} className="btn btn--primary" style={{ flex: 1 }}>
                    <Icon name="switch" size={14}/> {t("nav_handover", lang)}
                  </a>
                : <button className="btn btn--primary" style={{ flex: 1 }}>
                    <Icon name="switch" size={14}/> {t("initiate_handover", lang)}
                  </button>}
              <button className="btn btn--secondary"><Icon name="more" size={14}/></button>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="stat-strip" style={{ marginTop: 28 }}>
          <div>
            <div className="label">{t("stat_assets_value", lang)}</div>
            <div className="v">BHD <CountUp value={prop.totalAssetsValue} /></div>
            <div className="muted" style={{ fontSize: 11 }}>{prop.totalAssetsCount} {t("assets", lang)}</div>
          </div>
          <div>
            <div className="label">{t("rooms", lang)}</div>
            <div className="v"><CountUp value={prop.rooms} /></div>
            <div className="muted" style={{ fontSize: 11 }}>{rooms.length} {lang === "ar" ? "موثقة" : "documented"}</div>
          </div>
          <div>
            <div className="label">{lang === "ar" ? "الصيانة هذا العام" : "Maintenance YTD"}</div>
            <div className="v">BHD <CountUp value={Math.round(prop.totalArea * 18)} /></div>
            <div className="muted" style={{ fontSize: 11 }}>{lang === "ar" ? "ضمن الميزانية" : "Within budget"}</div>
          </div>
          <div>
            <div className="label">{t("last_inspect", lang)}</div>
            <div className="v" style={{ fontSize: 26 }}>{fmtDate(prop.nextInspection, lang)}</div>
            <div className="muted" style={{ fontSize: 11 }}>{lang === "ar" ? "التفتيش القادم" : "Next inspection"}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginTop: 28 }}>
          {PROP_TABS.map(k => (
            <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>{t(k, lang)}</button>
          ))}
        </div>

        {/* Tab body */}
        <div style={{ marginTop: 28 }}>
          {tab === "tab_overview" && <PropertyOverview prop={prop} lang={lang} />}
          {tab === "tab_rooms" && <PropertyRooms prop={prop} rooms={rooms} lang={lang} />}
          {tab !== "tab_overview" && tab !== "tab_rooms" && (
            <div className="card" style={{ padding: 48, textAlign: "center", color: "var(--ink-faint)" }}>
              <DiamondRule />
              <h3 className="serif" style={{ marginTop: 14, fontSize: 22, color: "var(--ink-soft)" }}>{t(tab, lang)}</h3>
              <div className="muted" style={{ marginTop: 6, maxWidth: 440, marginInline: "auto" }}>
                {lang === "ar" ? "ستتاح هذه الواجهة عند تحديث القسم في المرحلة القادمة من النظام."
                              : "This panel will be enabled in the next milestone of the system."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-faint)" }}>
      <span className="label">{label}</span>
      <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

function PropertyOverview({ prop, lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div className="card" style={{ padding: 32 }}>
        <div className="label">{lang === "ar" ? "وصف العقار" : "Property dossier"}</div>
        <h2 className="serif" style={{ fontSize: 24, marginTop: 6 }}>{prop.name[lang]}</h2>
        <p className="muted" style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7 }}>
          {lang === "ar"
            ? `يقع هذا العقار في ${prop.city.ar}، ${prop.country.ar}، وقد آل إلى وزارة الخارجية البحرينية في ${fmtDate(prop.acquiredDate, "ar")}. تبلغ مساحته الإجمالية ${fmtNumber(prop.totalArea)} متراً مربعاً، ويحتوي على ${prop.rooms} غرفة موزعة على عدة طوابق، وتشمل المرافق ${prop.hasGarden ? "حديقة، " : ""}${prop.hasPool ? "ومسبحاً، " : ""}إلى جانب صالات استقبال رسمية وغرف ضيافة.`
            : `Acquired by the Ministry on ${fmtDate(prop.acquiredDate, "en")}, this ${prop.totalArea} m² ${prop.type === "embassy+residence" ? "embassy & residence" : "embassy"} in ${prop.city.en} comprises ${prop.rooms} rooms across multiple floors, with ${prop.hasGarden ? "a garden, " : ""}${prop.hasPool ? "a pool, " : ""}formal reception halls and guest accommodation.`}
        </p>
        <div className="divider" style={{ margin: "20px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          <Stat2 label={lang==="ar"?"الفئة":"Classification"} value={lang==="ar"?"الفئة الأولى":"Category I"} />
          <Stat2 label={lang==="ar"?"التأمين":"Insurance"} value="Lloyd's of London" />
          <Stat2 label={lang==="ar"?"السجل العقاري":"Land registry"} value="—" />
        </div>
      </div>
      <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <SectionHead title={t("upcoming_reminders", lang)} kicker={prop.city[lang]} lang={lang} />
        <div className="timeline">
          {REMINDERS.filter(r => r.propertyId === prop.id).slice(0, 4).map(r => (
            <div className="row" key={r.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{r.title[lang]}</span>
                {r.status === "overdue" && <Pill tone="critical" dot>{lang==="ar"?"متأخر":"Overdue"}</Pill>}
              </div>
              <div className="muted" style={{ fontSize: 11 }}>{fmtDate(r.dueDate, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat2({ label, value }) {
  return <div>
    <div className="label">{label}</div>
    <div className="serif" style={{ fontSize: 18, marginTop: 4, color: "var(--forest)" }}>{value}</div>
  </div>;
}

function PropertyRooms({ prop, rooms, lang }) {
  if (!rooms.length) return <div className="muted" style={{ padding: 40, textAlign: "center" }}>—</div>;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {rooms.map(r => (
        <a key={r.id} href={`#/properties/${prop.id}/rooms/${r.id}`} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--ink)" }}>
          <div style={{ height: 140, background: "var(--cream-panel)", position: "relative", display: "grid", placeItems: "center" }}>
            <Icon name={r.type === "bedroom" ? "bed" : r.type === "kitchen" ? "chef" : r.type === "office" ? "edit" : "home"} size={48}
              style={{ color: "var(--brass)", opacity: 0.5 }} />
            <span style={{ position: "absolute", top: 12, insetInlineStart: 12 }}>
              <span className="label" style={{ background: "var(--cream-page)", padding: "3px 8px", borderRadius: 4, border: "1px solid var(--border-hair)" }}>{t("floor_" + r.floor, lang)}</span>
            </span>
          </div>
          <div style={{ padding: 18 }}>
            <h4 className="serif" style={{ fontSize: 18 }}>{r.name[lang]}</h4>
            <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12, color: "var(--ink-soft)" }}>
              <span>{r.area} {t("sqm", lang)}</span>
              <span>·</span>
              <span>{r.assetCount} {t("assets", lang)}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

Object.assign(window, {
  LoginScreen, Dashboard, PropertiesScreen, PropertyScreen,
  Fact, Stat2, MaintChart, DonutChart, MiniPropertyCard, LargePropertyCard,
});
