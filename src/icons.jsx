/* global window, React */
// Lucide-style outline icons. Stroke 1.5, currentColor.
const ICONS = {
  search: 'M11 4a7 7 0 1 0 4.95 11.95L20 20M11 4a7 7 0 0 1 7 7M11 4a7 7 0 0 0-7 7',
  globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18',
  bell: 'M6 8a6 6 0 1 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6ZM10 21a2 2 0 0 0 4 0',
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9Z',
  layout: 'M3 4h18v16H3zM3 10h18M9 10v10',
  building: 'M4 21V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15M4 21h16M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.77Z',
  receipt: 'M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2ZM8 8h8M8 12h8M8 16h6',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M9 13h6M9 17h6',
  shield: 'M12 2L4 6v6c0 5 3.5 8.7 8 10c4.5-1.3 8-5 8-10V6l-8-4Z',
  clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18ZM12 7v5l3 3',
  archive: 'M21 8H3v13h18V8ZM21 3H3v5h18V3ZM10 12h4',
  bed: 'M2 11v8M22 11v8M2 17h20M5 11h14a3 3 0 0 1 3 3v-1M2 13a3 3 0 0 1 3-3M8 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3',
  chef: 'M12 14a4 4 0 0 1-4-4M12 14a4 4 0 0 0 4-4M12 14v6M8 10a4 4 0 1 1 8 0M16 10a4 4 0 1 1-8 0M5 20h14',
  frame: 'M4 4h16v16H4zM4 8h16M4 16h16M8 4v16M16 4v16',
  car: 'M5 17h14M5 17l1.5-5.5A2 2 0 0 1 8.4 10h7.2a2 2 0 0 1 1.9 1.5L19 17M5 17v3M19 17v3M7 14h.01M17 14h.01',
  camera: 'M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z',
  trees: 'M12 22V8M9 8a4 4 0 0 1 6 0M5 12a5 5 0 0 1 7-2M19 12a5 5 0 0 0-7-2M8 22h8',
  history: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 7v5l3 3',
  switch: 'M8 3v4M16 3v4M3 8h4M3 16h4M21 8h-4M21 16h-4M8 21v-4M16 21v-4M9 9h6v6H9z',
  arrows: 'M7 17l10-10M7 7h10v10',
  list: 'M3 6h18M3 12h18M3 18h18M3 6h.01M3 12h.01M3 18h.01',
  plus: '12 5v14M5 12h14',
  more: '12 5h.01M12 12h.01M12 19h.01',
  chevron_left: 'M15 18l-6-6 6-6',
  chevron_right: 'M9 6l6 6-6 6',
  chevron_down: 'M6 9l6 6 6-6',
  arrow_right: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 13l4 4L19 7',
  x: 'M18 6L6 18M6 6l12 12',
  settings: 'M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z',
  eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z',
  download: 'M12 3v12M5 11l7 7 7-7M3 21h18',
  print: 'M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
  calendar: 'M3 5h18v16H3zM3 9h18M8 3v4M16 3v4',
  dollar: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  alert: 'M12 9v4M12 17h.01M10.3 3.86l-8.29 14.32A2 2 0 0 0 3.74 21h16.52a2 2 0 0 0 1.73-2.82l-8.29-14.32a2 2 0 0 0-3.4 0Z',
  rotate: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5',
  pause: 'M6 4h4v16H6zM14 4h4v16h-4z',
  play: 'M5 3l14 9-14 9V3Z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
  qr: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 14h3M14 18v3M18 18h3v3',
  edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5Z',
  arrow_left: 'M19 12H5M11 18l-6-6 6-6',
};
function Icon({ name, size = 18, style, className }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }}
         className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
function DiamondRule({ width = 80, color = "var(--brass)" }) {
  return (
    <svg width={width} height="8" viewBox="0 0 80 8" style={{ display: "inline-block" }}>
      <path d="M2 4 L40 4" stroke={color} strokeWidth="1" opacity="0.6"/>
      <path d="M40 4 L78 4" stroke={color} strokeWidth="1" opacity="0.6"/>
      <path d="M40 1 L43 4 L40 7 L37 4 Z" fill={color}/>
      <path d="M2 2.5 L4 4 L2 5.5" fill={color} opacity="0.7"/>
      <path d="M78 2.5 L76 4 L78 5.5" fill={color} opacity="0.7"/>
    </svg>
  );
}
Object.assign(window, { Icon, DiamondRule, ICONS });
