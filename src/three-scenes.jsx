/* global window, React, useThree */
// ============================================================
// three-scenes: GlobeHero, BuildingCover, FacadeViewer, RoomViewer
// ============================================================

// Bahrain-inspired property markers placed at the four cities
const PROP_COORDS = {
  "prop-london":     [51.4988, -0.1547],
  "prop-paris":      [48.8665,  2.2891],
  "prop-tokyo":      [35.6580, 139.7414],
  "prop-washington": [38.9389, -77.0653],
  "bahrain":         [26.0667,  50.5577],
};

function latLonToVec3(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ];
}

// =============================================================
// GlobeHero — dashboard hero band background
// =============================================================
function GlobeHero({ activePropId }) {
  const ref = React.useRef(null);
  useThree(ref, {
    fov: 30, cameraPos: [0, 0, 8], cameraTarget: [0, 0, 0],
    autoRotate: true, autoRotateSpeed: 0.18,
    controls: false, exposure: 1.1,
    build: ({ scene, T }) => {
      const sky = new T.Mesh(
        new T.SphereGeometry(40, 32, 16),
        new T.MeshBasicMaterial({ color: 0x0F1A33, side: T.BackSide })
      );
      scene.add(sky);

      const R = 2;
      const globe = new T.Mesh(
        new T.SphereGeometry(R, 64, 64),
        new T.MeshStandardMaterial({ color: 0x1B2845, roughness: 0.85, metalness: 0.05 })
      );
      scene.add(globe);

      const lineMat = new T.LineBasicMaterial({ color: 0xB89154, transparent: true, opacity: 0.32 });
      for (let i = 1; i < 12; i++) {
        const lat = -90 + i * 15;
        const pts = [];
        for (let j = 0; j <= 64; j++) {
          const lon = -180 + j * (360 / 64);
          pts.push(new T.Vector3(...latLonToVec3(lat, lon, R * 1.001)));
        }
        scene.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), lineMat));
      }
      for (let i = 0; i < 24; i++) {
        const lon = -180 + i * 15;
        const pts = [];
        for (let j = 0; j <= 64; j++) {
          const lat = -88 + j * (176 / 64);
          pts.push(new T.Vector3(...latLonToVec3(lat, lon, R * 1.001)));
        }
        scene.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), lineMat));
      }

      const dotMat = new T.MeshBasicMaterial({ color: 0xD9C39B });
      const dots = new T.InstancedMesh(new T.SphereGeometry(0.012, 6, 6), dotMat, 1800);
      let m = new T.Matrix4(); let count = 0;
      for (let i = 0; i < 1800; i++) {
        const u = Math.random(), v = Math.random();
        const phi = Math.acos(2 * v - 1);
        const theta = 2 * Math.PI * u;
        const lat = 90 - phi * 180 / Math.PI;
        const lon = theta * 180 / Math.PI - 180;
        const land =
          (lat > 5 && lat < 70 && lon > -130 && lon < -60) ||
          (lat > -50 && lat < 12 && lon > -82 && lon < -35) ||
          (lat > 35 && lat < 70 && lon > -10 && lon < 60) ||
          (lat > -35 && lat < 30 && lon > -18 && lon < 50) ||
          (lat > 5 && lat < 60 && lon > 50 && lon < 145) ||
          (lat > -42 && lat < -10 && lon > 110 && lon < 155);
        if (!land || Math.random() > 0.7) continue;
        const [x,y,z] = latLonToVec3(lat, lon, R * 1.005);
        m.makeTranslation(x, y, z);
        dots.setMatrixAt(count++, m);
      }
      dots.count = count;
      scene.add(dots);

      const markerMat = new T.MeshStandardMaterial({ color: 0xB89154, emissive: 0xB89154, emissiveIntensity: 0.5, metalness: 0.6, roughness: 0.3 });
      Object.entries(PROP_COORDS).forEach(([key, [lat, lon]]) => {
        const [x,y,z] = latLonToVec3(lat, lon, R * 1.04);
        const mk = new T.Mesh(new T.SphereGeometry(0.05, 12, 12), markerMat.clone());
        mk.position.set(x, y, z);
        mk.userData.propKey = key;
        scene.add(mk);

        const ring = new T.Mesh(
          new T.RingGeometry(0.06, 0.09, 24),
          new T.MeshBasicMaterial({ color: 0xD9C39B, transparent: true, opacity: 0.6, side: T.DoubleSide })
        );
        ring.position.set(x, y, z);
        ring.lookAt(x*2, y*2, z*2);
        ring.userData.isRing = true;
        ring.userData.propKey = key;
        scene.add(ring);

        const pinH = key === "bahrain" ? 0.4 : 0.2;
        const pin = new T.Mesh(
          new T.CylinderGeometry(0.006, 0.006, pinH, 6),
          new T.MeshBasicMaterial({ color: 0xD9C39B, transparent: true, opacity: 0.7 })
        );
        const dir = new T.Vector3(x,y,z).normalize();
        pin.position.set(x + dir.x*pinH/2, y + dir.y*pinH/2, z + dir.z*pinH/2);
        pin.lookAt(x*2, y*2, z*2);
        pin.rotateX(Math.PI/2);
        scene.add(pin);
      });

      const bahrainPos = new T.Vector3(...latLonToVec3(26.0667, 50.5577, R * 1.005));
      Object.entries(PROP_COORDS).forEach(([key, [lat, lon]]) => {
        if (key === "bahrain") return;
        const dest = new T.Vector3(...latLonToVec3(lat, lon, R * 1.005));
        const mid = bahrainPos.clone().add(dest).multiplyScalar(0.5);
        const distFactor = bahrainPos.distanceTo(dest);
        mid.normalize().multiplyScalar(R + distFactor * 0.35);
        const curve = new T.QuadraticBezierCurve3(bahrainPos, mid, dest);
        const pts = curve.getPoints(48);
        const arc = new T.Line(
          new T.BufferGeometry().setFromPoints(pts),
          new T.LineBasicMaterial({ color: 0xB89154, transparent: true, opacity: 0.45 })
        );
        scene.add(arc);
      });

      scene.add(new T.AmbientLight(0x777C99, 0.6));
      const key = new T.DirectionalLight(0xFFE6BA, 1.4);
      key.position.set(4, 2, 5); scene.add(key);
      const rim = new T.DirectionalLight(0x6E8FB0, 0.8);
      rim.position.set(-5, -2, -3); scene.add(rim);
    },
    update: (dt, { scene }) => {
      scene.traverse(o => {
        if (o.userData?.isRing) {
          const t = (performance.now() / 1000);
          const s = 1 + 0.4 * Math.sin(t * 2 + (o.userData.propKey?.length || 0));
          o.scale.setScalar(s);
          if (o.material) o.material.opacity = 0.45 + 0.3 * Math.cos(t * 2);
        }
      });
    },
  });
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
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
