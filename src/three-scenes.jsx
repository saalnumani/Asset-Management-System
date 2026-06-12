/* global window, React, MATS, useThree, setupCreamLights, setupGlobeLights */
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
      // Background sphere for atmosphere
      const sky = new T.Mesh(
        new T.SphereGeometry(40, 32, 16),
        new T.MeshBasicMaterial({ color: 0x0F1A33, side: T.BackSide })
      );
      scene.add(sky);

      // Globe
      const R = 2;
      const globe = new T.Mesh(
        new T.SphereGeometry(R, 64, 64),
        new T.MeshStandardMaterial({ color: 0x1B2845, roughness: 0.85, metalness: 0.05 })
      );
      scene.add(globe);

      // Latitude/longitude lines (brass at low alpha)
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

      // Continent dot field (procedural — looks like a dotted globe)
      const dotMat = new T.MeshBasicMaterial({ color: 0xD9C39B });
      // Land mass approx: just sprinkle points based on a sin-noise to suggest continents
      const dots = new T.InstancedMesh(new T.SphereGeometry(0.012, 6, 6), dotMat, 1800);
      let m = new T.Matrix4(); let count = 0;
      for (let i = 0; i < 1800; i++) {
        const u = Math.random(), v = Math.random();
        const phi = Math.acos(2 * v - 1);
        const theta = 2 * Math.PI * u;
        const lat = 90 - phi * 180 / Math.PI;
        const lon = theta * 180 / Math.PI - 180;
        // crude continent mask: more density in some bands
        const land =
          (lat > 5 && lat < 70 && lon > -130 && lon < -60) ||  // N America
          (lat > -50 && lat < 12 && lon > -82 && lon < -35) || // S America
          (lat > 35 && lat < 70 && lon > -10 && lon < 60) ||   // Europe
          (lat > -35 && lat < 30 && lon > -18 && lon < 50) ||  // Africa
          (lat > 5 && lat < 60 && lon > 50 && lon < 145) ||    // Asia
          (lat > -42 && lat < -10 && lon > 110 && lon < 155);  // Australia
        if (!land || Math.random() > 0.7) continue;
        const [x,y,z] = latLonToVec3(lat, lon, R * 1.005);
        m.makeTranslation(x, y, z);
        dots.setMatrixAt(count++, m);
      }
      dots.count = count;
      scene.add(dots);

      // Property markers
      const markerMat = new T.MeshStandardMaterial({ color: 0xB89154, emissive: 0xB89154, emissiveIntensity: 0.5, metalness: 0.6, roughness: 0.3 });
      Object.entries(PROP_COORDS).forEach(([key, [lat, lon]]) => {
        const [x,y,z] = latLonToVec3(lat, lon, R * 1.04);
        const mk = new T.Mesh(new T.SphereGeometry(0.05, 12, 12), markerMat.clone());
        mk.position.set(x, y, z);
        mk.userData.propKey = key;
        scene.add(mk);

        // Glow ring
        const ring = new T.Mesh(
          new T.RingGeometry(0.06, 0.09, 24),
          new T.MeshBasicMaterial({ color: 0xD9C39B, transparent: true, opacity: 0.6, side: T.DoubleSide })
        );
        ring.position.set(x, y, z);
        ring.lookAt(x*2, y*2, z*2);
        ring.userData.isRing = true;
        ring.userData.propKey = key;
        scene.add(ring);

        // Vertical pin from surface
        const pinH = key === "bahrain" ? 0.4 : 0.2;
        const pin = new T.Mesh(
          new T.CylinderGeometry(0.006, 0.006, pinH, 6),
          new T.MeshBasicMaterial({ color: 0xD9C39B, transparent: true, opacity: 0.7 })
        );
        // Position pin extending outward
        const dir = new T.Vector3(x,y,z).normalize();
        pin.position.set(x + dir.x*pinH/2, y + dir.y*pinH/2, z + dir.z*pinH/2);
        pin.lookAt(x*2, y*2, z*2);
        pin.rotateX(Math.PI/2);
        scene.add(pin);
      });

      // Soft brass arcs from Bahrain to each property (great-circle approximation)
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

      // Lights
      scene.add(new T.AmbientLight(0x777C99, 0.6));
      const key = new T.DirectionalLight(0xFFE6BA, 1.4);
      key.position.set(4, 2, 5); scene.add(key);
      const rim = new T.DirectionalLight(0x6E8FB0, 0.8);
      rim.position.set(-5, -2, -3); scene.add(rim);
    },
    update: (dt, { scene }) => {
      // Pulse rings
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
  return <canvas ref={ref} />;
}

// =============================================================
// BuildingCover — small 3D building used in property cards
// arch: "classical" (London/Washington) | "modern" (Paris/Tokyo)
// =============================================================
function BuildingCover({ arch = "classical", height = 240, autoRotate = true, propId }) {
  const ref = React.useRef(null);
  useThree(ref, {
    fov: 28, cameraPos: [4, 2.4, 6.2], cameraTarget: [0, 0.8, 0],
    autoRotate, autoRotateSpeed: 0.4, controls: true,
    background: 0x0F1A33,
    build: ({ scene, T }) => {
      const M = MATS();
      // Ground/plinth
      const plinth = new T.Mesh(
        new T.BoxGeometry(7, 0.16, 5),
        M.creamDark
      );
      plinth.position.y = -0.08;
      scene.add(plinth);

      if (arch === "classical") {
        // Classical: 3-story symmetrical with columns
        const body = new T.Mesh(new T.BoxGeometry(4.4, 2.4, 2.6), M.cream);
        body.position.y = 1.2;
        scene.add(body);
        // Lower base
        const base = new T.Mesh(new T.BoxGeometry(4.8, 0.4, 2.9), M.creamDark);
        base.position.y = 0.2;
        scene.add(base);
        // Pediment (triangular top — approximated with a thin box)
        const ped = new T.Mesh(new T.BoxGeometry(4.6, 0.6, 2.7), M.cream);
        ped.position.y = 2.6;
        scene.add(ped);
        const roof = new T.Mesh(new T.BoxGeometry(4.7, 0.3, 2.8), M.brassDark);
        roof.position.y = 2.95;
        scene.add(roof);
        // Columns
        for (let i = -2; i <= 2; i++) {
          const col = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 1.8, 12), M.cream);
          col.position.set(i * 0.85, 1.0, 1.4);
          scene.add(col);
          // Column capital
          const cap = new T.Mesh(new T.BoxGeometry(0.32, 0.08, 0.32), M.brassDark);
          cap.position.set(i * 0.85, 1.95, 1.4);
          scene.add(cap);
        }
        // Door
        const door = new T.Mesh(new T.BoxGeometry(0.5, 1.0, 0.04), M.forestFelt);
        door.position.set(0, 0.9, 1.43);
        scene.add(door);
        // Windows (rows)
        for (let r = 0; r < 2; r++) {
          for (let i = -1; i <= 1; i++) {
            if (i === 0 && r === 0) continue;
            const win = new T.Mesh(new T.BoxGeometry(0.4, 0.5, 0.04), M.glass);
            win.position.set(i * 1.1, 1.0 + r * 0.9, 1.42);
            scene.add(win);
          }
        }
        // Brass railing on top
        const rail = new T.Mesh(new T.BoxGeometry(4.5, 0.05, 2.65), M.brassMetal);
        rail.position.y = 3.13;
        scene.add(rail);
        // Flag pole
        const pole = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 1.2, 8), M.brassMetal);
        pole.position.set(0, 3.7, 0); scene.add(pole);
        const flag = new T.Mesh(new T.BoxGeometry(0.6, 0.32, 0.02), new T.MeshStandardMaterial({ color: 0xC8252C }));
        flag.position.set(0.3, 4.0, 0); scene.add(flag);
      } else {
        // Modern: low slab with brass fins
        const body = new T.Mesh(new T.BoxGeometry(5.2, 1.8, 2.6), M.cream);
        body.position.y = 0.9; scene.add(body);
        const upper = new T.Mesh(new T.BoxGeometry(4.4, 1.0, 2.2), M.creamDark);
        upper.position.y = 2.3; scene.add(upper);
        const roof = new T.Mesh(new T.BoxGeometry(4.5, 0.1, 2.3), M.brassDark);
        roof.position.y = 2.85; scene.add(roof);
        // Vertical brass fins
        for (let i = -2; i <= 2; i++) {
          const fin = new T.Mesh(new T.BoxGeometry(0.06, 1.6, 0.18), M.brassMetal);
          fin.position.set(i * 0.9, 0.9, 1.36);
          scene.add(fin);
        }
        // Glass strip
        const glass = new T.Mesh(new T.BoxGeometry(5.0, 1.4, 0.04), M.glass);
        glass.position.set(0, 0.9, 1.32);
        scene.add(glass);
        // Upper windows
        const upGlass = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 0.04), M.glass);
        upGlass.position.set(0, 2.3, 1.13); scene.add(upGlass);
        // Entrance steps
        for (let i = 0; i < 3; i++) {
          const step = new T.Mesh(new T.BoxGeometry(2.0 - i * 0.3, 0.08, 0.3), M.creamDark);
          step.position.set(0, 0.04 + i * 0.08, 1.55 - i * 0.3);
          scene.add(step);
        }
        // Flag
        const pole = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 1.2, 8), M.brassMetal);
        pole.position.set(0, 3.5, 0); scene.add(pole);
        const flag = new T.Mesh(new T.BoxGeometry(0.6, 0.32, 0.02), new T.MeshStandardMaterial({ color: 0xC8252C }));
        flag.position.set(0.3, 3.8, 0); scene.add(flag);
      }

      // Garden
      const garden = new T.Mesh(new T.PlaneGeometry(7.5, 5.5), new T.MeshStandardMaterial({ color: 0x3F5A3A, roughness: 0.95 }));
      garden.rotation.x = -Math.PI/2; garden.position.y = -0.16; scene.add(garden);
      // Trees
      for (let i = 0; i < 6; i++) {
        const tx = (Math.random() - 0.5) * 6.5;
        const tz = (Math.random() - 0.5) * 4 + (Math.random() < 0.5 ? -1.6 : 1.6);
        if (Math.abs(tx) < 2.5 && Math.abs(tz) < 1.4) continue;
        const trunk = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.4, 6), M.walnut);
        trunk.position.set(tx, 0.1, tz); scene.add(trunk);
        const top = new T.Mesh(new T.SphereGeometry(0.28, 10, 10), M.leaf);
        top.position.set(tx, 0.5, tz); scene.add(top);
      }

      setupGlobeLights(scene, T);
      // warmer fill
      const sun = new T.DirectionalLight(0xFFE6BA, 1.2); sun.position.set(5, 6, 4); scene.add(sun);
    },
  });
  return <canvas ref={ref} />;
}

// =============================================================
// FacadeViewer — bigger version of BuildingCover for property header
// =============================================================
function FacadeViewer({ arch = "classical" }) {
  return <BuildingCover arch={arch} autoRotate={false} />;
}

// =============================================================
// RoomViewer — 3D room with placeholder furniture meshes
// Each mesh tagged with userData.assetId; selectedAssetId pulses + a HUD ring
// =============================================================
function RoomViewer({ assets = [], selectedAssetId, onSelectAsset, paused }) {
  const ref = React.useRef(null);
  const ctxRef = useThree(ref, {
    fov: 38, cameraPos: [4.5, 3.2, 5.5], cameraTarget: [0, 1, 0],
    autoRotate: !paused, autoRotateSpeed: 0.25, controls: true,
    background: 0xF5EFE2, exposure: 1.1, shadows: true,
    controlsConfig: { minDistance: 3, maxDistance: 12, minPolarAngle: 0.2, maxPolarAngle: 1.4 },
    build: ({ scene, T }) => {
      const M = MATS();
      // Floor
      const floor = new T.Mesh(new T.BoxGeometry(8, 0.1, 6), M.floorWood);
      floor.position.y = -0.05; floor.receiveShadow = true;
      scene.add(floor);
      // Rug
      const rug = new T.Mesh(new T.BoxGeometry(5.4, 0.02, 3.6), M.rugRed);
      rug.position.y = 0.01; rug.userData.assetId = "ast-mj-rug";
      scene.add(rug);

      // Back wall
      const wallB = new T.Mesh(new T.BoxGeometry(8, 3.2, 0.1), M.wallCream);
      wallB.position.set(0, 1.6, -3); scene.add(wallB);
      // Side walls
      const wallL = new T.Mesh(new T.BoxGeometry(0.1, 3.2, 6), M.wallCream);
      wallL.position.set(-4, 1.6, 0); scene.add(wallL);
      const wallR = new T.Mesh(new T.BoxGeometry(0.1, 3.2, 6), M.wallDeep);
      wallR.position.set(4, 1.6, 0); scene.add(wallR);

      // Painting (back wall)
      const paintingFrame = new T.Mesh(new T.BoxGeometry(1.6, 1.0, 0.06), M.brassMetal);
      paintingFrame.position.set(0, 2.0, -2.94); scene.add(paintingFrame);
      const painting = new T.Mesh(new T.BoxGeometry(1.42, 0.85, 0.02), new T.MeshStandardMaterial({ color: 0x5C3D2C }));
      painting.position.set(0, 2.0, -2.91);
      painting.userData.assetId = "ast-mj-painting";
      scene.add(painting);

      // Sofa (long, back center)
      const sofaG = new T.Group();
      const sBase = new T.Mesh(new T.BoxGeometry(2.8, 0.5, 0.95), M.velvetGreen);
      sBase.position.y = 0.32; sofaG.add(sBase);
      const sBack = new T.Mesh(new T.BoxGeometry(2.8, 0.7, 0.18), M.velvetGreen);
      sBack.position.set(0, 0.85, -0.4); sofaG.add(sBack);
      // Cushions
      for (let i = -1; i <= 1; i++) {
        const c = new T.Mesh(new T.BoxGeometry(0.85, 0.18, 0.85), M.velvetGreen);
        c.position.set(i * 0.95, 0.65, 0); sofaG.add(c);
      }
      sofaG.position.set(0, 0, -2.0);
      sofaG.userData.assetId = "ast-mj-sofa";
      sofaG.castShadow = true;
      scene.add(sofaG);

      // Coffee table (center, on rug)
      const ct = new T.Group();
      const ctTop = new T.Mesh(new T.BoxGeometry(1.6, 0.06, 0.9), M.walnut);
      ctTop.position.y = 0.5; ct.add(ctTop);
      const ctTrim = new T.Mesh(new T.BoxGeometry(1.62, 0.02, 0.92), M.brassMetal);
      ctTrim.position.y = 0.53; ct.add(ctTrim);
      // Legs
      [[-0.7,-0.36],[0.7,-0.36],[-0.7,0.36],[0.7,0.36]].forEach(([x,z]) => {
        const l = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.5, 8), M.brassDark);
        l.position.set(x, 0.25, z); ct.add(l);
      });
      ct.position.set(0, 0, -0.5);
      ct.userData.assetId = "ast-mj-coffee";
      scene.add(ct);

      // Armchairs (left + right)
      function makeArmchair(assetId, x, rotY) {
        const g = new T.Group();
        const seat = new T.Mesh(new T.BoxGeometry(0.85, 0.45, 0.85), M.cream);
        seat.position.y = 0.32; g.add(seat);
        const back = new T.Mesh(new T.BoxGeometry(0.85, 0.7, 0.15), M.cream);
        back.position.set(0, 0.85, -0.35); g.add(back);
        const arm1 = new T.Mesh(new T.BoxGeometry(0.12, 0.4, 0.85), M.cream);
        arm1.position.set(0.4, 0.55, 0); g.add(arm1);
        const arm2 = new T.Mesh(new T.BoxGeometry(0.12, 0.4, 0.85), M.cream);
        arm2.position.set(-0.4, 0.55, 0); g.add(arm2);
        g.position.set(x, 0, 0.5); g.rotation.y = rotY;
        g.userData.assetId = assetId;
        return g;
      }
      scene.add(makeArmchair("ast-mj-armchair-l", -2.0, Math.PI / 4));
      scene.add(makeArmchair("ast-mj-armchair-r",  2.0, -Math.PI / 4));

      // Floor lamp (right of sofa)
      const lampG = new T.Group();
      const pole = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 1.6, 8), M.brassMetal);
      pole.position.y = 0.8; lampG.add(pole);
      const lampBase = new T.Mesh(new T.CylinderGeometry(0.18, 0.22, 0.06, 16), M.brassDark);
      lampBase.position.y = 0.04; lampG.add(lampBase);
      const shade = new T.Mesh(new T.ConeGeometry(0.3, 0.4, 16, 1, true), M.creamDark);
      shade.position.y = 1.65; lampG.add(shade);
      lampG.position.set(2.7, 0, -2.0);
      lampG.userData.assetId = "ast-mj-lamp";
      scene.add(lampG);

      // Olive tree planters
      function makePlanter(assetId, x, z) {
        const g = new T.Group();
        const pot = new T.Mesh(new T.CylinderGeometry(0.3, 0.25, 0.5, 12), M.brassDark);
        pot.position.y = 0.25; g.add(pot);
        const trunk = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.5, 6), M.walnut);
        trunk.position.y = 0.7; g.add(trunk);
        const top = new T.Mesh(new T.SphereGeometry(0.32, 12, 12), M.leaf);
        top.position.y = 1.05; g.add(top);
        g.position.set(x, 0, z);
        g.userData.assetId = assetId;
        return g;
      }
      scene.add(makePlanter("ast-mj-plant-l", -3.4, 1.5));
      scene.add(makePlanter("ast-mj-plant-r",  3.4, 1.5));

      // Display cabinet (left wall area)
      const cabG = new T.Group();
      const cab = new T.Mesh(new T.BoxGeometry(0.5, 1.8, 1.2), M.walnut);
      cab.position.y = 0.9; cabG.add(cab);
      const cabGlass = new T.Mesh(new T.BoxGeometry(0.05, 1.5, 1.0), M.glass);
      cabGlass.position.set(0.27, 0.95, 0); cabG.add(cabGlass);
      // Sword inside (display)
      const sword = new T.Mesh(new T.BoxGeometry(0.04, 1.1, 0.06), M.brassMetal);
      sword.position.set(0.2, 0.95, 0); sword.rotation.z = Math.PI / 14;
      sword.userData.assetId = "ast-mj-sword"; cabG.add(sword);
      cabG.position.set(-3.4, 0, -1.5);
      cabG.userData.assetId = "ast-mj-cabinet";
      scene.add(cabG);

      // Imari vase pair (on coffee table — but actually use console)
      const vaseG = new T.Group();
      const v1 = new T.Mesh(new T.CylinderGeometry(0.1, 0.07, 0.32, 12), M.porcelain);
      v1.position.set(-0.35, 0.7, 0); vaseG.add(v1);
      const v2 = new T.Mesh(new T.CylinderGeometry(0.1, 0.07, 0.32, 12), M.porcelain);
      v2.position.set(0.35, 0.7, 0); vaseG.add(v2);
      vaseG.position.set(0, 0, -0.5);
      vaseG.userData.assetId = "ast-mj-vase-pair";
      scene.add(vaseG);

      // Ceiling chandelier (visual reference)
      const chand = new T.Mesh(new T.SphereGeometry(0.3, 12, 12), new T.MeshStandardMaterial({ color: 0xD9C39B, emissive: 0xD9C39B, emissiveIntensity: 0.6, metalness: 0.7 }));
      chand.position.set(0, 3.0, 0); scene.add(chand);

      setupCreamLights(scene, T);
      // Warm point light from chandelier
      const pl = new T.PointLight(0xFFE6BA, 0.8, 8); pl.position.set(0, 2.8, 0); scene.add(pl);

      // Selection halo (added to scene; updated on demand)
      const halo = new T.Mesh(
        new T.RingGeometry(0.45, 0.55, 32),
        new T.MeshBasicMaterial({ color: 0xB89154, transparent: true, opacity: 0.0, side: T.DoubleSide })
      );
      halo.rotation.x = -Math.PI / 2;
      halo.userData.isHalo = true;
      scene.add(halo);
    },
    update: (dt, { scene }) => {
      // Pulse selected asset
      const t = performance.now() / 1000;
      const pulse = 1 + 0.06 * Math.sin(t * 4);
      let target = null;
      scene.traverse(o => {
        if (o.userData?.assetId === selectedAssetId) {
          target = o;
          o.scale.setScalar(pulse);
        } else if (o.userData?.assetId) {
          o.scale.setScalar(1);
        }
      });
      // Position halo
      const halo = scene.getObjectByProperty?.("name", "_halo") || scene.children.find(c => c.userData?.isHalo);
      if (halo) {
        if (target) {
          const box = new window.THREE.Box3().setFromObject(target);
          const size = box.getSize(new window.THREE.Vector3());
          const r = Math.max(size.x, size.z) * 0.7;
          const center = box.getCenter(new window.THREE.Vector3());
          halo.position.set(center.x, 0.02, center.z);
          halo.scale.setScalar(r * (1 + 0.1 * Math.sin(t * 4)));
          halo.material.opacity = 0.6 + 0.2 * Math.sin(t * 4);
        } else {
          halo.material.opacity = 0;
        }
      }
    },
  });

  // Click handling — raycast from canvas
  React.useEffect(() => {
    if (!onSelectAsset) return;
    const canvas = ref.current;
    if (!canvas) return;
    function onClick(e) {
      const ctx = ctxRef.current; if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const T = window.THREE;
      const ray = new T.Raycaster();
      ray.setFromCamera({ x, y }, ctx.camera);
      const hits = ray.intersectObjects(ctx.scene.children, true);
      for (const h of hits) {
        let o = h.object;
        while (o && !o.userData?.assetId) o = o.parent;
        if (o && o.userData?.assetId) { onSelectAsset(o.userData.assetId); return; }
      }
    }
    canvas.addEventListener("click", onClick);
    return () => canvas.removeEventListener("click", onClick);
  }, [onSelectAsset]);

  return <canvas ref={ref} />;
}

Object.assign(window, { GlobeHero, BuildingCover, FacadeViewer, RoomViewer });
