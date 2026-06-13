/* global window, React, THREE, OrbitControls */
// ============================================================
// three-kit: brand materials + canvas hook + helpers
// Vanilla three.js with React lifecycle (R3F equivalent visually)
// ============================================================

function makeBrandMaterials() {
  const T = window.THREE;
  return {
    wallCream:   new T.MeshStandardMaterial({ color: 0xF5EFE2, roughness: 0.92, metalness: 0.02 }),
    wallDeep:    new T.MeshStandardMaterial({ color: 0xE8DDC2, roughness: 0.92 }),
    floorWood:   new T.MeshStandardMaterial({ color: 0x6E4F30, roughness: 0.55, metalness: 0.1 }),
    forestFelt:  new T.MeshStandardMaterial({ color: 0x3D4F6B, roughness: 0.7 }),
    forestDeep:  new T.MeshStandardMaterial({ color: 0x2A3850, roughness: 0.65 }),
    brassMetal:  new T.MeshStandardMaterial({ color: 0xC9A86A, metalness: 0.85, roughness: 0.28 }),
    brassDark:   new T.MeshStandardMaterial({ color: 0x9C7C45, metalness: 0.7, roughness: 0.4 }),
    brassSoft:   new T.MeshStandardMaterial({ color: 0xE3CB9A, metalness: 0.5, roughness: 0.45 }),
    cream:       new T.MeshStandardMaterial({ color: 0xFAF6EE, roughness: 0.9 }),
    creamDark:   new T.MeshStandardMaterial({ color: 0xECE2CB, roughness: 0.85 }),
    ink:         new T.MeshStandardMaterial({ color: 0x1A1A17, roughness: 0.5 }),
    velvetGreen: new T.MeshStandardMaterial({ color: 0x46597A, roughness: 0.85 }),
    glass:       new T.MeshStandardMaterial({ color: 0xCFE0DA, transparent: true, opacity: 0.42, roughness: 0.05, metalness: 0.1 }),
    rugRed:      new T.MeshStandardMaterial({ color: 0x6E2C26, roughness: 0.95 }),
    leaf:        new T.MeshStandardMaterial({ color: 0x3F5A3A, roughness: 0.85 }),
    porcelain:   new T.MeshStandardMaterial({ color: 0xEDE5D2, roughness: 0.32, metalness: 0.05 }),
    walnut:      new T.MeshStandardMaterial({ color: 0x4A2E1F, roughness: 0.6 }),
    sky:         new T.MeshStandardMaterial({ color: 0x7E96AE, roughness: 0.95 }),
  };
}

let _MATS_CACHE = null;
function MATS() {
  if (!_MATS_CACHE && window.THREE) _MATS_CACHE = makeBrandMaterials();
  return _MATS_CACHE;
}

// ----------------------------------------------------------------
// useThree — sets up Scene, Renderer, Camera, OrbitControls, animation loop
// build(scene, camera, ctx) is called once. update(delta, ctx) called per frame.
// ----------------------------------------------------------------
function useThree(canvasRef, opts) {
  const { useEffect, useRef } = React;
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!window.THREE) return; // wait for module loader
    const canvas = canvasRef.current;
    if (!canvas) return;
    const T = window.THREE;
    const parent = canvas.parentElement;
    let w = parent.clientWidth, h = parent.clientHeight;
    if (w < 4 || h < 4) { w = 600; h = 400; }

    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    renderer.shadowMap.enabled = !!opts.shadows;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = opts.exposure ?? 1.05;
    renderer.outputColorSpace = T.SRGBColorSpace;

    const scene = new T.Scene();
    if (opts.background) scene.background = new T.Color(opts.background);

    const camera = new T.PerspectiveCamera(opts.fov ?? 40, w / h, 0.1, 200);
    if (opts.cameraPos) camera.position.set(...opts.cameraPos);
    if (opts.cameraTarget) camera.lookAt(...opts.cameraTarget);

    let controls = null;
    if (opts.controls && window.OrbitControls) {
      controls = new window.OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.autoRotate = !!opts.autoRotate;
      controls.autoRotateSpeed = opts.autoRotateSpeed ?? 0.4;
      Object.assign(controls, opts.controlsConfig || {});
    }

    const ctx = { scene, camera, renderer, controls, canvas, T,
      setAutoRotate(v) { if (controls) controls.autoRotate = v; },
      reset() {
        if (opts.cameraPos) camera.position.set(...opts.cameraPos);
        if (opts.cameraTarget) camera.lookAt(...opts.cameraTarget);
        if (controls) controls.update();
      },
    };
    ctxRef.current = ctx;

    if (opts.build) opts.build(ctx);

    let raf;
    let prev = performance.now();
    let stopped = false;
    function frame(now) {
      if (stopped) return;
      const delta = (now - prev) / 1000;
      prev = now;
      if (opts.update) opts.update(delta, ctx);
      if (controls) controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function onResize() {
      const ww = parent.clientWidth, hh = parent.clientHeight;
      if (ww < 4 || hh < 4) return;
      camera.aspect = ww / hh;
      camera.updateProjectionMatrix();
      renderer.setSize(ww, hh, false);
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(parent);
    window.addEventListener("resize", onResize);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      controls?.dispose?.();
      renderer.dispose();
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose?.();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose?.());
          else o.material.dispose?.();
        }
      });
    };
  }, [opts.key]);

  return ctxRef;
}

// Standard 3-point lighting for cream interiors
function setupCreamLights(scene, T) {
  scene.add(new T.AmbientLight(0xfff1da, 0.55));
  const key = new T.DirectionalLight(0xFFE6BA, 1.4);
  key.position.set(6, 10, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -10; key.shadow.camera.right = 10;
  key.shadow.camera.top = 10; key.shadow.camera.bottom = -10;
  scene.add(key);
  const fill = new T.DirectionalLight(0xCFE0EA, 0.45);
  fill.position.set(-5, 4, -3);
  scene.add(fill);
  const rim = new T.DirectionalLight(0xFFE6BA, 0.6);
  rim.position.set(0, 3, -8);
  scene.add(rim);
}

function setupGlobeLights(scene, T) {
  scene.add(new T.AmbientLight(0xCFC8B7, 0.55));
  const key = new T.DirectionalLight(0xFFE6BA, 1.4);
  key.position.set(5, 4, 6);
  scene.add(key);
  const rim = new T.DirectionalLight(0x9CA9B0, 0.6);
  rim.position.set(-6, -2, -4);
  scene.add(rim);
}

Object.assign(window, { MATS, useThree, setupCreamLights, setupGlobeLights });
