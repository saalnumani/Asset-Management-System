/* global window, React, ReactDOM, useRoute, TopBar, Sidebar, LoginScreen, Dashboard, PropertiesScreen, PropertyScreen, RoomScreen, HandoverScreen, StubByName, PROPERTIES, HO_CATEGORIES */

// Expose HO_CATEGORIES globally for chip filter (if not already)
if (!window.HO_CATEGORIES) {
  window.HO_CATEGORIES = [
    { key: "majlis",    en: "Grand Majlis",        ar: "المجلس الكبير" },
    { key: "reception", en: "Reception",           ar: "الاستقبال" },
    { key: "dining",    en: "Dining",              ar: "الطعام" },
    { key: "kitchen",   en: "Kitchen",             ar: "المطبخ" },
    { key: "amb",       en: "Ambassador's",        ar: "السفير" },
    { key: "guest1",    en: "Guest — Cedar",       ar: "الأرز" },
    { key: "guest2",    en: "Guest — Pearl",       ar: "اللؤلؤ" },
    { key: "study",     en: "Study",               ar: "المكتب" },
    { key: "library",   en: "Library",             ar: "المكتبة" },
    { key: "laundry",   en: "Laundry",             ar: "الغسيل" },
    { key: "storage",   en: "Storage",             ar: "المخزن" },
    { key: "gallery",   en: "Gallery",             ar: "الصالة" },
  ];
}

function App() {
  const { useState, useEffect } = React;
  const [lang, setLang] = useState("ar");
  const [activePropId, setActivePropId] = useState("prop-tokyo");
  const route = useRoute();

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync property selector when navigating to a specific property
  useEffect(() => {
    if ((route.name === "property" || route.name === "room") && route.params.pid && route.params.pid !== activePropId) {
      setActivePropId(route.params.pid);
    }
  }, [route.name, route.params.pid]);

  // Hide shell on login (keep this AFTER all hooks)
  if (route.name === "login") return <LoginScreen lang={lang} />;

  return (
    <div className="app-shell" key={lang}>
      <TopBar lang={lang} setLang={setLang}
        activePropId={activePropId} setActivePropId={setActivePropId} />
      <Sidebar lang={lang} route={route} />
      <main className="main">
        {route.name === "dashboard"  && <Dashboard lang={lang} activePropId={activePropId} />}
        {route.name === "properties" && <PropertiesScreen lang={lang} />}
        {route.name === "property"   && <PropertyScreen lang={lang} pid={route.params.pid} />}
        {route.name === "room"       && <RoomScreen lang={lang} pid={route.params.pid} rid={route.params.rid} />}
        {route.name === "handover"   && <HandoverScreen lang={lang} hid={route.params.hid} />}
        {/* Stubs */}
        {["reminders","audit","maintenance","vendors","approvals","reports","assets","documents","users","settings"].includes(route.name) &&
          <StubByName lang={lang} name={route.name} />}
      </main>
    </div>
  );
}

function boot() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  if (window.location.hash === "" || window.location.hash === "#/" || window.location.hash === "#") {
    window.location.hash = "/login";
  }
  root.render(<App />);
}

if (window.THREE) {
  boot();
} else {
  window.addEventListener("three-ready", boot, { once: true });
}
