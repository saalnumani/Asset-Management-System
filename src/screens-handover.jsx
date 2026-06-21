/* global window, React, t, fmtCurrency, fmtNumber, fmtDate, Icon, DiamondRule, Pill, getProperty, getHandover, TOKYO_HANDOVER_ITEMS, AMBASSADORS */
// ============================================================
// Handover detail at Tokyo — section 7.16
// THE deal closer: item-by-item verification list + signoffs
// ============================================================

const { useState: hUs, useMemo: hUm, useEffect: hUe } = React;

function HandoverScreen({ lang, hid }) {
  const ho = getHandover(hid);
  if (!ho) return <div className="page">Handover not found</div>;
  const prop = getProperty(ho.propertyId);
  const items = TOKYO_HANDOVER_ITEMS;

  const [filter, setFilter] = hUs("all");
  const [room, setRoom] = hUs("all");
  const [openItem, setOpenItem] = hUs(null);

  const counts = hUm(() => ({
    all: items.length,
    pending: items.filter(i => i.status === "pending").length,
    verified: items.filter(i => i.status === "verified").length,
    disputed: items.filter(i => i.status === "disputed").length,
    missing: items.filter(i => i.status === "missing").length,
  }), [items]);

  const filtered = items.filter(i => (filter === "all" || i.status === filter) && (room === "all" || i.category === room));

  const totalValue = items.reduce((s, i) => s + (i.estimatedValue || 0), 0);
  const verifiedValue = items.filter(i => i.status === "verified").reduce((s, i) => s + (i.estimatedValue || 0), 0);
  const progress = Math.round(counts.verified / counts.all * 100);

  const today = new Date("2026-05-08");
  const due = new Date(ho.scheduledCompletionDate);
  const daysRemaining = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="page-enter">
      <window.Breadcrumbs lang={lang} items={[
        { label: t("sec_dashboard", lang), path: "/dashboard" },
        { label: t("nav_all_properties", lang), path: "/properties" },
        { label: prop.city[lang], path: `/properties/${prop.id}` },
        { label: t("handover_in_progress", lang) },
      ]}/>

      <div className="page page--wide" style={{ paddingTop: 14 }}>
        {/* ==== Header ==== */}
        <div className="mob-stack" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 20 }}>
          <div>
            <DiamondRule />
            <div className="label" style={{ marginTop: 8 }}>{t("handover_in_progress", lang)} · {prop.city[lang]}</div>
            <h1 style={{ fontSize: 38, marginTop: 4, fontWeight: 300, letterSpacing: "-.02em" }}>
              {lang === "ar" ? `تسليم ملف ${prop.city.ar}` : `${prop.city.en} Mission Handover`}
            </h1>
            <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
              {lang === "ar"
                ? `بدأ في ${fmtDate(ho.initiatedDate, "ar")} · يكتمل في ${fmtDate(ho.scheduledCompletionDate, "ar")}`
                : `Initiated ${fmtDate(ho.initiatedDate, "en")} · Scheduled completion ${fmtDate(ho.scheduledCompletionDate, "en")}`}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--secondary"><Icon name="print" size={14}/>{t("print_certificate", lang)}</button>
            <button className="btn btn--secondary"><Icon name="download" size={14}/>{t("export_pdf", lang)}</button>
            <button className="btn btn--primary"><Icon name="check" size={14}/>{t("sign_off", lang)}</button>
          </div>
        </div>

        {/* ==== Progress band ==== */}
        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 16 }}>
            <div>
              <div className="label">{t("handover_progress", lang)}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 6 }}>
                <span className="serif tnum" style={{ fontSize: 56, fontWeight: 300, color: "var(--forest)", letterSpacing: "-.015em" }}>{progress}%</span>
                <span className="muted" style={{ fontSize: 14 }}>
                  {lang === "ar" ? `${counts.verified} من ${counts.all} موثق` : `${counts.verified} of ${counts.all} verified`}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <div>
                <div className="label">{t("days_remaining", lang)}</div>
                <div className="serif" style={{ fontSize: 28, color: daysRemaining < 7 ? "var(--critical)" : "var(--forest)" }}>{daysRemaining}</div>
              </div>
              <div className="divider" style={{ width: 1, height: 50, background: "var(--border-hair)" }}/>
              <div>
                <div className="label">{lang === "ar" ? "قيمة موثقة" : "Verified value"}</div>
                <div className="serif tnum" style={{ fontSize: 22, color: "var(--forest)" }}>{fmtCurrency(verifiedValue, "BHD", lang)}</div>
                <div className="muted" style={{ fontSize: 11 }}>{lang === "ar" ? `من إجمالي ${fmtCurrency(totalValue, "BHD", lang)}` : `of ${fmtCurrency(totalValue, "BHD", lang)}`}</div>
              </div>
            </div>
          </div>
          <div className="progress" style={{ height: 8 }}>
            <div className="progress-fill" style={{ width: progress + "%", background: "linear-gradient(90deg, var(--brass) 0%, var(--brass-deep) 100%)" }}/>
          </div>
          <div className="mob-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 22 }}>
            <Stat label={t("items_total", lang)} value={counts.all} accent />
            <Stat label={t("items_verified", lang)} value={counts.verified} tone="positive" />
            <Stat label={t("items_disputed", lang)} value={counts.disputed} tone="warning" />
            <Stat label={t("items_missing", lang)} value={counts.missing} tone="critical" />
          </div>
        </div>

        {/* ==== Two outgoing/incoming ambassadors ==== */}
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 0, alignItems: "stretch", marginBottom: 24 }}>
          <AmbCard ambassador={ho.outgoingResident} role={t("role_outgoing", lang)} signoff={ho.signoffs.outgoing} lang={lang}/>
          <div style={{ display: "grid", placeItems: "center", color: "var(--brass)" }}>
            <Icon name={lang === "ar" ? "arrow_left" : "arrow_right"} size={24} />
          </div>
          <AmbCard ambassador={ho.incomingResident} role={t("role_incoming", lang)} signoff={ho.signoffs.incoming} lang={lang}/>
        </div>

        {/* ==== Filter + room toolbar ==== */}
        <div className="card card--inset" style={{ padding: 20, marginBottom: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span className="label" style={{ marginInlineEnd: 6 }}>{lang === "ar" ? "حالة:" : "Status:"}</span>
            <FilterBtn label={t("filter_all", lang)} count={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterBtn label={t("verified", lang)} count={counts.verified} active={filter === "verified"} onClick={() => setFilter("verified")} tone="positive" />
            <FilterBtn label={t("pending", lang)} count={counts.pending} active={filter === "pending"} onClick={() => setFilter("pending")} />
            <FilterBtn label={t("disputed", lang)} count={counts.disputed} active={filter === "disputed"} onClick={() => setFilter("disputed")} tone="warning" />
            <FilterBtn label={t("missing", lang)} count={counts.missing} active={filter === "missing"} onClick={() => setFilter("missing")} tone="critical" />
            <div className="spacer" />
            <button className="btn btn--ghost btn--sm"><Icon name="qr" size={14}/> {lang === "ar" ? "مسح كود" : "Scan code"}</button>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span className="label" style={{ marginInlineEnd: 6 }}>{lang === "ar" ? "الغرفة:" : "Room:"}</span>
            <RoomChip label={lang === "ar" ? "الكل" : "All rooms"} active={room === "all"} onClick={() => setRoom("all")} />
            {window.HO_CATEGORIES?.map?.(c => (
              <RoomChip key={c.key} label={lang === "ar" ? c.ar : c.en} active={room === c.key} onClick={() => setRoom(c.key)} />
            )) || ["majlis","reception","dining","kitchen","amb","guest1","guest2","study","library","laundry","storage","gallery"].map(k => (
              <RoomChip key={k} label={k} active={room === k} onClick={() => setRoom(k)} />
            ))}
          </div>
        </div>

        {/* ==== Item list ==== */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>{lang === "ar" ? "الأصل" : "Item"}</th>
                <th>{lang === "ar" ? "الغرفة" : "Room"}</th>
                <th>{t("condition_prior", lang)}</th>
                <th>{t("condition_now", lang)}</th>
                <th style={{ textAlign: "end" }}>{lang === "ar" ? "القيمة" : "Value"}</th>
                <th style={{ width: 140 }}>{lang === "ar" ? "الحالة" : "Status"}</th>
                <th style={{ width: 110 }}>{t("actions", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 60).map(it => (
                <tr key={it.id} onClick={() => setOpenItem(it)} style={{ cursor: "pointer" }}>
                  <td className="tnum muted" style={{ fontSize: 11 }}>{String(it.idx).padStart(3, "0")}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, background: "var(--cream-panel)", border: "1px solid var(--border-hair)", borderRadius: 4, display: "grid", placeItems: "center" }}>
                        <Icon name={it.assetCategory === "painting" ? "frame" : it.assetCategory === "gift" ? "star" : "home"} size={14} style={{ color: "var(--brass-deep)" }}/>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span className="serif" style={{ fontSize: 14 }}>{it.itemName[lang]}</span>
                        {it.isOfficialGift && (
                          <span style={{ fontSize: 10, color: "var(--brass-deep)" }}>
                            <Icon name="star" size={10} style={{ marginInlineEnd: 4 }}/>
                            {lang === "ar" ? "هدية رسمية · " : "Gift · "}{it.giftFrom}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="muted" style={{ fontSize: 12 }}>{lang === "ar" ? it.room_ar : it.room_en}</td>
                  <td><Pill tone={it.priorCondition === "excellent" ? "positive" : "default"} dot>{t("condition_" + it.priorCondition, lang)}</Pill></td>
                  <td>
                    <Pill tone={it.currentCondition === "fair" ? "warning" : it.status === "missing" ? "critical" : it.currentCondition === "excellent" ? "positive" : "default"} dot>
                      {it.status === "missing" ? "—" : t("condition_" + it.currentCondition, lang)}
                    </Pill>
                  </td>
                  <td className="tnum" style={{ textAlign: "end", fontSize: 12 }}>{fmtCurrency(it.estimatedValue, it.currency, lang)}</td>
                  <td>
                    {it.status === "verified" && <Pill tone="positive" dot><Icon name="check" size={11}/>{t("verified", lang)}</Pill>}
                    {it.status === "pending" && <Pill dot>{t("pending", lang)}</Pill>}
                    {it.status === "disputed" && <Pill tone="warning" dot><Icon name="alert" size={11}/>{t("disputed", lang)}</Pill>}
                    {it.status === "missing" && <Pill tone="critical" dot><Icon name="x" size={11}/>{t("missing", lang)}</Pill>}
                  </td>
                  <td>
                    <button className="btn btn--ghost btn--sm" onClick={(e) => { e.stopPropagation(); setOpenItem(it); }}>{t("view", lang)}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 60 && (
            <div style={{ padding: "16px 24px", textAlign: "center", fontSize: 12, color: "var(--ink-faint)", borderTop: "1px solid var(--border-faint)" }}>
              {lang === "ar"
                ? `عرض ٦٠ من ${filtered.length} أصل · حمّل التالي`
                : `Showing 60 of ${filtered.length} items · Load more`}
            </div>
          )}
        </div>

        {/* ==== Sign-off panel ==== */}
        <div className="card" style={{ padding: 28, marginTop: 24 }}>
          <SectionHead title={lang === "ar" ? "اعتمادات التسليم" : "Sign-offs"} kicker={lang === "ar" ? "مطلوب من جميع الأطراف" : "Required from all parties"} lang={lang} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 18 }}>
            <SignoffCard signoff={ho.signoffs.outgoing}  role={t("role_outgoing", lang)}  who={ho.outgoingResident.name} lang={lang} />
            <SignoffCard signoff={ho.signoffs.incoming}  role={t("role_incoming", lang)}  who={ho.incomingResident.name} lang={lang} />
            <SignoffCard signoff={ho.signoffs.inspector} role={t("role_inspector", lang)} who={ho.signoffs.inspector.signerName || "Saad Al-Binali"} lang={lang} />
            <SignoffCard signoff={ho.signoffs.ministry}  role={t("role_ministry", lang)}  who={lang === "ar" ? "وكيل الوزارة" : "Undersecretary"} lang={lang} />
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {openItem && <ItemDrawer item={openItem} lang={lang} onClose={() => setOpenItem(null)} />}
    </div>
  );
}

function Stat({ label, value, tone, accent }) {
  const c = tone === "positive" ? "var(--positive)"
          : tone === "warning"  ? "var(--warning)"
          : tone === "critical" ? "var(--critical)"
          : "var(--forest)";
  return (
    <div className={"stat" + (accent ? " stat--accent" : "")} style={{ minHeight: 100 }}>
      <div className="label">{label}</div>
      <div className="value" style={{ fontSize: 40, color: c }}>{value}</div>
    </div>
  );
}

function FilterBtn({ label, count, active, onClick, tone }) {
  const c = tone === "positive" ? "var(--positive)"
          : tone === "warning"  ? "var(--warning)"
          : tone === "critical" ? "var(--critical)"
          : "var(--ink)";
  return (
    <button onClick={onClick}
      className={"pill" + (active ? " pill--ink" : "")}
      style={{ height: 28, padding: "0 12px", fontSize: 12, cursor: "pointer", background: active ? c : "var(--cream-page)", color: active ? "var(--cream-page)" : c, borderColor: active ? c : "var(--border-hair)" }}>
      {label}
      <span style={{ fontFamily: "var(--font-serif)", marginInlineStart: 6, fontSize: 13 }}>{count}</span>
    </button>
  );
}

function RoomChip({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={"pill" + (active ? " pill--brass" : "")}
      style={{ height: 26, padding: "0 10px", fontSize: 11, cursor: "pointer" }}>
      {label}
    </button>
  );
}

function AmbCard({ ambassador, role, signoff, lang }) {
  const initial = (ambassador.name || "").split(" ").pop()?.[0] || "A";
  const isSigned = signoff?.signed;
  return (
    <div className={"signoff" + (isSigned ? " signed" : "")} style={{ padding: 22, gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--cream-panel)", border: "1px solid var(--border-hair)", display: "grid", placeItems: "center", fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--brass-deep)" }}>{initial}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span className="label">{role}</span>
          <span className="serif" style={{ fontSize: 18 }}>{lang === "ar" ? ambassador.nameAr : ambassador.name}</span>
          <span className="muted" style={{ fontSize: 11 }}>
            {ambassador.rotationDate
              ? (lang === "ar" ? `مغادرة في ${fmtDate(ambassador.rotationDate, "ar")}` : `Rotates ${fmtDate(ambassador.rotationDate, "en")}`)
              : (lang === "ar" ? `وصول في ${fmtDate(ambassador.arrivalDate, "ar")}` : `Arrives ${fmtDate(ambassador.arrivalDate, "en")}`)}
          </span>
        </div>
        <div style={{ marginInlineStart: "auto" }}>
          {isSigned ? <Pill tone="positive" dot>{t("signed", lang)}</Pill> : <Pill tone="warning" dot>{t("unsigned", lang)}</Pill>}
        </div>
      </div>
    </div>
  );
}

function SignoffCard({ signoff, role, who, lang }) {
  const isSigned = signoff?.signed;
  return (
    <div className={"signoff" + (isSigned ? " signed" : "")}>
      <div className="role">{role}</div>
      <div className="who">{who}</div>
      {isSigned
        ? <div className="when">{t("signed", lang)} · {fmtDate(signoff.signedAt, lang)}</div>
        : <div className="when" style={{ color: "var(--warning)" }}>{t("unsigned", lang)}</div>}
      <button className={"btn " + (isSigned ? "btn--ghost btn--sm" : "btn--primary btn--sm")} style={{ marginTop: 6 }} disabled={isSigned}>
        {isSigned ? <><Icon name="check" size={12}/> {t("signed", lang)}</> : <>{t("sign_off", lang)} <Icon name="edit" size={12}/></>}
      </button>
    </div>
  );
}

function ItemDrawer({ item, lang, onClose }) {
  return (
    <>
      <div className="drawer-backdrop fade-in" onClick={onClose} />
      <div className="drawer fade-up scroll-clean">
        <div className="head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="label">{lang === "ar" ? item.room_ar : item.room_en} · #{String(item.idx).padStart(3, "0")}</div>
            <h2 className="serif" style={{ fontSize: 24, marginTop: 4, fontWeight: 400 }}>{item.itemName[lang]}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="body" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ height: 200, background: "var(--cream-panel)", borderRadius: 8, display: "grid", placeItems: "center", border: "1px solid var(--border-hair)" }}>
            <Icon name={item.assetCategory === "painting" ? "frame" : item.assetCategory === "gift" ? "star" : "home"} size={64} style={{ color: "var(--brass)", opacity: 0.5 }}/>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Fact2 label={lang === "ar" ? "الفئة" : "Category"} value={item.assetCategory} />
            <Fact2 label={t("condition_prior", lang)} value={t("condition_" + item.priorCondition, lang)} />
            <Fact2 label={t("condition_now", lang)} value={item.status === "missing" ? "—" : t("condition_" + item.currentCondition, lang)} />
            <Fact2 label={lang === "ar" ? "القيمة المقدّرة" : "Estimated value"} value={fmtCurrency(item.estimatedValue, item.currency, lang)} />
            {item.isOfficialGift && <Fact2 label={lang === "ar" ? "هدية من" : "Gift from"} value={item.giftFrom} />}
            <Fact2 label={lang === "ar" ? "الحالة" : "Status"} value={t(item.status, lang)} />
          </div>
          {item.inspectorNote && (
            <div style={{ padding: 16, background: "var(--warning-tint)", border: "1px solid rgba(176,122,42,.32)", borderRadius: 8 }}>
              <div className="label" style={{ color: "var(--warning)", marginBottom: 4 }}>{lang === "ar" ? "ملاحظة المفتش" : "Inspector note"}</div>
              <div style={{ fontSize: 13 }}>{item.inspectorNote[lang]}</div>
            </div>
          )}
          <div className="divider" />
          <div className="label">{lang === "ar" ? "الإجراء" : "Take action"}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn--primary"><Icon name="check" size={14}/>{t("verified", lang)}</button>
            <button className="btn btn--secondary"><Icon name="alert" size={14}/>{t("disputed", lang)}</button>
            <button className="btn btn--secondary"><Icon name="x" size={14}/>{t("missing", lang)}</button>
            <button className="btn btn--ghost"><Icon name="camera" size={14}/>{lang === "ar" ? "إرفاق صورة" : "Attach photo"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Fact2({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-faint)" }}>
      <span className="label">{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, textTransform: "capitalize" }}>{value}</span>
    </div>
  );
}

const SectionHead = window.SectionHead;

Object.assign(window, { HandoverScreen });
