/* global window, React */
// ============================================================
// three-scenes: GlobeHero, BuildingCover, FacadeViewer, RoomViewer
// 3D scenes temporarily replaced with static placeholders.
// ============================================================

// =============================================================
// GlobeHero — dashboard hero band background
// =============================================================
function GlobeHero() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(135deg, #0F1A33 0%, #1B2845 50%, #0F1A33 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <img
        src="public/assets/mofa-logo.svg"
        alt=""
        style={{ width: 180, opacity: 0.12, userSelect: "none", pointerEvents: "none" }}
      />
    </div>
  );
}

// =============================================================
// BuildingCover — placeholder for property cards
// =============================================================
function BuildingCover({ arch = "classical", height = 240 }) {
  const isModern = arch === "modern";
  return (
    <div style={{
      width: "100%", height: "100%", minHeight: height,
      background: isModern
        ? "linear-gradient(160deg, #1B2845 0%, #253657 100%)"
        : "linear-gradient(160deg, #2C1F0E 0%, #4A3520 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <img
        src="public/assets/mofa-logo.svg"
        alt=""
        style={{ width: 72, opacity: 0.18, userSelect: "none", pointerEvents: "none" }}
      />
    </div>
  );
}

// =============================================================
// FacadeViewer — larger building placeholder for property header
// =============================================================
function FacadeViewer({ arch = "classical" }) {
  return <BuildingCover arch={arch} height={320} />;
}

// =============================================================
// RoomViewer — room placeholder with asset list fallback
// =============================================================
function RoomViewer({ assets = [], selectedAssetId, onSelectAsset }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#F5EFE2",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16,
    }}>
      <img
        src="public/assets/mofa-logo.svg"
        alt=""
        style={{ width: 64, opacity: 0.15, userSelect: "none", pointerEvents: "none" }}
      />
      <div style={{ fontSize: 12, color: "#9B8C7A", letterSpacing: ".06em" }}>
        {assets.length} assets in this room
      </div>
      {assets.length > 0 && (
        <div style={{
          display: "flex", flexDirection: "column", gap: 4, width: "80%", maxHeight: 260, overflowY: "auto",
        }}>
          {assets.map(a => (
            <div
              key={a.id}
              onClick={() => onSelectAsset && onSelectAsset(a.id)}
              style={{
                padding: "6px 12px",
                background: selectedAssetId === a.id ? "rgba(184,145,84,0.15)" : "rgba(255,255,255,0.6)",
                border: selectedAssetId === a.id ? "1px solid rgba(184,145,84,0.6)" : "1px solid rgba(0,0,0,0.08)",
                borderRadius: 4, cursor: "pointer", fontSize: 12, color: "#3A2E1F",
              }}
            >
              {a.name?.en ?? a.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { GlobeHero, BuildingCover, FacadeViewer, RoomViewer });
