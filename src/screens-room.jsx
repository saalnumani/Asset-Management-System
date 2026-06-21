/* global window, React, t, fmtCurrency, fmtNumber, fmtDate, Icon, DiamondRule, Pill, RoomViewer, getProperty, getRoom, ROOM_ASSETS */
// ============================================================
// Single Room with 3D viewer — section 7.5.1
// THE killer 3D feature: room scene + asset list with hover-to-pulse
// ============================================================

const { useState: rUs, useEffect: rUe, useRef: rUr, useMemo: rUm } = React;

function RoomScreen({ lang, pid, rid }) {
  const prop = getProperty(pid);
  const room = getRoom(pid, rid) || { id: rid, name: { en: "Room", ar: "غرفة" }, type: "living", floor: "ground", area: 0, assetCount: 0 };
  const assets = ROOM_ASSETS[rid] || ROOM_ASSETS["rm-tk-majlis"]; // fallback for non-Tokyo rooms
  const [selectedId, setSelectedId] = rUs(null);
  const [paused, setPaused] = rUs(false);
  const [filter, setFilter] = rUs("all");
  const selected = assets.find(a => a.id === selectedId);

  const filtered = filter === "all" ? assets : assets.filter(a => a.category === filter);

  const totalValue = assets.reduce((s, a) => s + (a.purchaseCost || a.estimatedValue || 0), 0);

  return (
    <div className="page-enter">
      <window.Breadcrumbs lang={lang} items={[
        { label: t("sec_dashboard", lang), path: "/dashboard" },
        { label: t("nav_all_properties", lang), path: "/properties" },
        { label: prop.city[lang], path: `/properties/${pid}` },
        { label: t("rooms", lang), path: `/properties/${pid}` },
        { label: room.name[lang] },
      ]} />

      <div className="mob-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 0, height: "calc(100vh - var(--topbar-h) - 36px)" }}>
        {/* 3D viewport on the left/start */}
        <div style={{ position: "relative", background: "var(--cream-panel)", borderInlineEnd: "1px solid var(--border-hair)" }}>
          <RoomViewer assets={assets} selectedAssetId={selectedId} onSelectAsset={setSelectedId} paused={paused} />

          {/* Floating header overlay */}
          <div style={{ position: "absolute", top: 18, insetInlineStart: 22, color: "var(--ink)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="label" style={{ background: "rgba(250,246,238,0.85)", padding: "3px 10px", borderRadius: 999, border: "1px solid var(--border-hair)", display: "inline-block", width: "fit-content" }}>
              {t("floor_" + room.floor, lang)} · {room.area} {t("sqm", lang)}
            </div>
            <h1 className="serif" style={{ fontSize: 30, fontWeight: 300, color: "var(--ink)" }}>{room.name[lang]}</h1>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
              {t("asset_count_in_room", lang, { n: assets.length })}
            </div>
          </div>

          {/* Floating control toolbar */}
          <div style={{ position: "absolute", bottom: 22, insetInlineStart: 22, display: "flex", gap: 8 }}>
            <button className="btn btn--secondary btn--sm" style={{ background: "rgba(250,246,238,0.9)" }}
              onClick={() => setSelectedId(null)}>
              <Icon name="rotate" size={14} />
              {t("reset_view", lang)}
            </button>
            <button className="btn btn--secondary btn--sm" style={{ background: "rgba(250,246,238,0.9)" }}
              onClick={() => setPaused(p => !p)}>
              <Icon name={paused ? "play" : "pause"} size={14} />
              {paused ? t("resume_rotation", lang) : t("pause_rotation", lang)}
            </button>
            <button className="btn btn--secondary btn--sm" style={{ background: "rgba(250,246,238,0.9)" }}>
              <Icon name="camera" size={14} />
              {t("view_2d", lang)}
            </button>
          </div>

          {/* Selected asset preview popover */}
          {selected && (
            <div className="fade-up" style={{ position: "absolute", bottom: 22, insetInlineEnd: 22, width: "min(320px, 90vw)", background: "var(--cream-page)", border: "1px solid var(--brass)", borderRadius: 8, padding: 18 }}>
              <div className="label">{lang === "ar" ? "أصل مختار" : "Selected asset"}</div>
              <h4 className="serif" style={{ fontSize: 18, marginTop: 4, fontWeight: 400 }}>{selected.itemName[lang]}</h4>
              <div className="divider" style={{ margin: "10px 0" }}/>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span className="muted">{lang === "ar" ? "الفئة" : "Category"}</span>
                <span style={{ textTransform: "capitalize" }}>{selected.category}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                <span className="muted">{lang === "ar" ? "الحالة" : "Condition"}</span>
                <span style={{ textTransform: "capitalize" }}>{t("condition_" + selected.condition, lang)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                <span className="muted">{lang === "ar" ? "القيمة" : "Value"}</span>
                <span className="tnum">{fmtCurrency(selected.purchaseCost || selected.estimatedValue, selected.currency, lang)}</span>
              </div>
              {selected.isOfficialGift && (
                <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(184,145,84,0.12)", borderRadius: 6, fontSize: 11, color: "var(--brass-deep)" }}>
                  <Icon name="star" size={12} style={{ marginInlineEnd: 6 }}/>
                  {lang === "ar" ? "هدية رسمية من " : "Official gift from "}<b>{selected.giftFrom}</b>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Asset list on the right */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--cream-page)" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-faint)", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="label">{t("assets", lang)}</div>
              <div className="serif tnum" style={{ fontSize: 14, color: "var(--brass-deep)" }}>{fmtCurrency(totalValue, "BHD", lang)}</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["all","furniture","decor","painting","gift"].map(f => (
                <button key={f}
                  onClick={() => setFilter(f)}
                  className={"pill" + (filter === f ? " pill--ink" : "")}
                  style={{ cursor: "pointer", textTransform: "capitalize", border: "1px solid var(--border-hair)" }}>
                  {f === "all" ? t("filter_all", lang) : f}
                </button>
              ))}
            </div>
          </div>
          <div className="scroll-clean" style={{ overflowY: "auto", flex: 1, padding: "8px 16px" }}>
            {filtered.map(a => {
              const isSelected = selectedId === a.id;
              return (
                <button key={a.id}
                  onMouseEnter={() => setSelectedId(a.id)}
                  onClick={() => setSelectedId(a.id)}
                  className="fade-in"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr auto",
                    gap: 14,
                    alignItems: "center",
                    width: "100%",
                    padding: "14px 12px",
                    border: "1px solid " + (isSelected ? "var(--brass)" : "transparent"),
                    background: isSelected ? "var(--cream-panel)" : "transparent",
                    borderRadius: 8,
                    textAlign: "start",
                    cursor: "pointer",
                  }}>
                  <div style={{ width: 44, height: 44, borderRadius: 6, background: "var(--cream-panel)", border: "1px solid var(--border-hair)", display: "grid", placeItems: "center" }}>
                    <Icon name={a.category === "painting" ? "frame" : a.category === "gift" ? "star" : a.category === "decor" ? "trees" : "home"} size={18} style={{ color: "var(--brass-deep)" }}/>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <span className="serif" style={{ fontSize: 14, color: "var(--ink)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{a.itemName[lang]}</span>
                    <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                      {a.qty > 1 && (lang === "ar" ? `كمية ${a.qty} · ` : `Qty ${a.qty} · `)}
                      {t("condition_" + a.condition, lang)}
                      {a.isOfficialGift && <span style={{ color: "var(--brass-deep)" }}> · {lang === "ar" ? "هدية رسمية" : "Gift"}</span>}
                    </span>
                  </div>
                  <span className="tnum" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                    {fmtCurrency(a.purchaseCost || a.estimatedValue, a.currency, lang)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RoomScreen });
