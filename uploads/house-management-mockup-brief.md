**House Management System — Mockup Build Brief**  
**Client:** Ministry of Foreign Affairs (MoFA), Kingdom of Bahrain  
   
 **Purpose:** Clickable, fully-navigable mockup with realistic mock data, used in pre-sales discovery and proposal meetings.  
   
 **Output target:** Next.js 16+ (App Router) + TypeScript, Tailwind CSS, shadcn/ui.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSPBCj7fFRYQwYwEZiywEZJWQZeZ2ao9AAD+4lyruzq+ngAA8Nr1AMTJBeJDClAyAAAAAElFTkSuQmCC)  
**0. Instructions to the build agent**  
Build a complete clickable Next.js + TypeScript mockup based on this specification. Every page in the sitemap must be reachable and render with realistic mock data. The mockup is **Arabic-primary** with  **RTL** layout and an  **English toggle**. Do  **not** implement real authentication, real API calls, or backend services — all data lives in TypeScript files under /lib/mock/. The visual identity is  **diplomatic premium**: dark green, brass accents, cream backgrounds, editorial typography, the feel of a private wealth dashboard. Polish matters more than feature completeness — this mockup is being shown to a government client.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsSdYxKa/jL0MIR7FCt5E2BJsmZmt2gMA4C+Otbqr8+sJAACvXQ85SAYUQNBTfQAAAABJRU5ErkJggg==)  
**1. Tech stack & dependencies**  
| | |  
|-|-|  
| **Layer** | **Choice** |   
| Framework | Next.js 14 (App Router) + TypeScript (strict mode) |   
| Styling | Tailwind CSS 3.4+ |   
| Components | shadcn/ui (Radix primitives) |   
| Icons | lucide-react |   
| Charts | recharts |   
| 3D engine | three + @react-three/fiber + @react-three/drei — MIT-licensed, $0 forever, self-hosted |   
| 3D postprocessing | @react-three/postprocessing (bloom + tone mapping for premium feel) |   
| 3D animations | @react-spring/three (or useFrame for simple cases) |   
| 3D dev controls | leva (development-only debug panel for tuning lighting/materials) |   
| UI animation | motion (formerly Framer Motion) — 2026 React standard |   
| Sequencing / timelines | gsap + @gsap/react |   
| Smooth scroll | lenis (3KB, premium momentum feel) |   
| Forms | react-hook-form (forms can submit to no-op handlers) |   
| Dates | date-fns + date-fns/locale (Arabic + English locales) |   
| i18n | next-intl |   
| RTL | dir attribute toggle + Tailwind RTL utilities (rtl: / ltr: variants via plugin) |   
| Tables | @tanstack/react-table |   
| State | React Server Components where possible; useState for client interactions |   
| Maps | None for v1 — use static images or simple SVG silhouettes |   
   
npx create-next-app@latest house-management --typescript --tailwind --app  
 npx shadcn-ui@latest init  
 # Then add: button, card, table, dialog, dropdown-menu, sheet, tabs, badge, input,  
 # select, calendar, popover, avatar, separator, breadcrumb, toggle, switch, alert,  
 # progress, scroll-area, command, accordion, navigation-menu, tooltip  
   
 # 3D — React Three Fiber (full open-source stack)  
 npm i three @react-three/fiber @react-three/drei @react-three/postprocessing  
 npm i @react-spring/three  
 npm i -D @types/three leva  
   
 # Animation  
 npm i motion  
 npm i gsap @gsap/react  
 npm i lenis  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSeYxKS/kJkED6bwYAVvImwJtszMVu0BAPAXx1rd1fn1BACA164HHDwF+DpPyKwAAAAASUVORK5CYII=)  
**2. Visual identity — "Diplomatic Premium"**  
**Palette**  
/* Custom colors — extend tailwind.config.ts */  
 :root {  
   --color-bg-primary: #FAF6EE;       /* off-white cream — page background */  
   --color-bg-secondary: #F5EFE2;     /* warm cream — card surfaces */  
   --color-bg-elevated: #FFFFFF;      /* pure white — modals, popovers */  
   
   --color-ink-primary: #1A1A17;      /* near-black, warm — body text */  
   --color-ink-secondary: #5C594F;    /* warm dark gray — secondary text */  
   --color-ink-muted: #8A8678;        /* warm muted gray — captions, labels */  
   
   --color-forest: #0E3A2E;           /* deep diplomatic green — primary */  
   --color-forest-deep: #08231C;      /* darker green — hover states, headers */  
   --color-forest-light: #1F5544;     /* mid green — accents */  
   
   --color-brass: #B89154;            /* warm brass — gold-ish accent */  
   --color-brass-deep: #8E6E3F;       /* darker brass — hover */  
   --color-brass-light: #D9B888;      /* light brass — subtle highlights */  
   
   --color-border-soft: #E8E0CC;      /* cream border — dividers */  
   --color-border-firm: #C5BBA3;      /* firmer border — emphasized */  
   
   --color-success: #2D6A4F;          /* dignified green for ok states */  
   --color-warning: #B45309;          /* amber for warnings */  
   --color-danger:  #8B3A1B;          /* deep coral for errors only */  
 }  
   
The palette is **never neon, never bright**. Even the success state is muted.  
**Typography**  
/* Latin */  
 font-family-serif:   "Playfair Display", "EB Garamond", Georgia, serif;  /* H1-H3, large numbers, brand */  
 font-family-sans:    "Inter", "Söhne", system-ui, sans-serif;            /* body, UI, tables */  
   
 /* Arabic */  
 font-family-arabic-display: "Tajawal", "IBM Plex Sans Arabic", sans-serif;  /* Arabic H1-H3 */  
 font-family-arabic-body:    "IBM Plex Sans Arabic", "Tajawal", sans-serif;  /* Arabic body */  
   
Load via next/font (Google Fonts). When dir="rtl", headings switch to Arabic display font automatically via CSS :lang(ar) selector.  
**Density & rhythm**  
- **Generous whitespace.** Page padding 32px desktop, 16px mobile. Card padding 24px.  
- **Editorial headings.** H1 is 36–44px, serif, light weight (300–400), letter-spacing -0.01em.  
- **Quiet body.** Body text 15px, line-height 1.65.  
- **Numbers stand out.** Stat values use the serif font, sized large (28–40px), with light weight. Labels above them are small caps in muted ink.  
- **Cards have hairline brass borders.** 1px --color-border-soft default; brass on hover/active.  
- **No gradients. No drop shadows.** Use thin borders and color shifts for depth.  
**Component vibe references (for the build agent)**  
- Think Mews property management × Aman resort guest portal × a private banking statement.  
- Tables: thin row dividers, no zebra striping, hover row gets a 2px brass left-border.  
- Cards: cream surface, hairline border, generous internal padding, optional photo at top with 4:3 aspect.  
- Buttons: forest fill primary, brass fill secondary, outline tertiary. No gradients. Minimal radius (6px).  
- Photos: rounded corners 4px, gold thin frame on hover.  
**Icon usage**  
Use lucide-react. Outline style only. 18px in dense UI, 20px standalone, 24px feature pages. Common icons: LayoutDashboard, Building2, Home, Bed, ChefHat, Frame, Car, Camera, Wrench, Trees, Receipt, CalendarDays, Shield, FileText, ArrowRightLeft (handover), ListChecks, Bell, Users, History, Globe, Search, ChevronLeft, ChevronRight, Plus, MoreHorizontal.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBACPiUML0NpGACyywEZJWQZeZ2aszAAD+4l6rrTq+ngAA8Nr1AL/SBEZwuCSwAAAAAElFTkSuQmCC)  
**3. Information architecture (sitemap)**  
/                                       Landing — auto-redirect to /dashboard (mocked)  
 /login                                  Login screen (cosmetic, click "Sign in" to proceed)  
   
 /dashboard                              Executive dashboard  
   
 /properties                             Properties tree view (4 postings)  
 /properties/[propertyId]                Property overview page (tabs below)  
 /properties/[propertyId]/rooms          Rooms inventory  
 /properties/[propertyId]/rooms/[roomId] Single room detail (assets, photos)  
 /properties/[propertyId]/kitchen        Kitchen inventory  
 /properties/[propertyId]/paintings      Paintings & gifts register  
 /properties/[propertyId]/vehicles       Vehicles  
 /properties/[propertyId]/photo-archive  Photo archive grid  
 /properties/[propertyId]/maintenance    Maintenance log (this property)  
 /properties/[propertyId]/garden-pool    Garden & pool  
 /properties/[propertyId]/bills          Bills & expenses  
 /properties/[propertyId]/events         Events & occasions  
 /properties/[propertyId]/security       Security system  
 /properties/[propertyId]/documents      Documents (warranties, permits, insurance)  
 /properties/[propertyId]/floor-plan     Floor plan viewer  
   
 /handover                               Handover hub — list all in-progress + history  
 /handover/new                           Initiate new handover (wizard)  
 /handover/[handoverId]                  Handover detail (the killer feature)  
   
 /maintenance                            Cross-property maintenance scheduler  
 /vendors                                Vendor management  
 /vendors/[vendorId]                     Vendor detail + history  
   
 /reports                                Reports hub  
 /reports/asset-register                 Asset register report (filterable, exportable)  
 /reports/expenses                       Expense reports  
 /reports/maintenance-history            Maintenance history  
 /reports/handover-summary               Handover summaries  
   
 /audit                                  Audit log (system-wide activity timeline)  
 /reminders                              Reminders calendar (month/list view toggle)  
   
 /admin                                  Admin home  
 /admin/users                            Users & roles  
 /admin/approvals                        Approval workflows (pending requests)  
 /admin/settings                         System settings (language, currency, etc.)  
   
 /profile                                Current user profile  
   
**Total pages: ~32.** All must be reachable from the navigation. Pages with [id] parameters need at least 2–3 mock entries each so the dynamic route works.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsScYxpg/h5VMYARvRrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA224BcUMk6pDAAAAAElFTkSuQmCC)  
**4. Data models (TypeScript)**  
Place under /lib/types.ts:  
export type PropertyType = 'embassy' | 'consulate' | 'residence' | 'official-house';  
 export type PropertyStatus = 'active' | 'handover-in-progress' | 'vacant' | 'renovation';  
   
 export interface Property {  
   id: string;  
   type: PropertyType;  
   name: { en: string; ar: string };  
   country: { en: string; ar: string };  
   city: { en: string; ar: string };  
   address: { en: string; ar: string };  
   totalArea: number;            // square meters  
   rooms: number;  
   hasGarden: boolean;  
   hasPool: boolean;  
   coverPhoto: string;           // /images/properties/london-embassy.jpg  
   acquiredDate: string;         // ISO  
   currentResident?: string;     // user id  
   status: PropertyStatus;  
   totalAssetsCount: number;     // denormalized for dashboards  
   totalAssetsValue: number;     // BHD  
 }  
   
 export type AssetCategory =  
   | 'furniture' | 'electronics' | 'kitchenware'  
   | 'painting' | 'gift' | 'decor' | 'vehicle'  
   | 'appliance' | 'other';  
   
 export type Condition = 'excellent' | 'good' | 'fair' | 'poor';  
   
 export interface Asset {  
   id: string;  
   propertyId: string;  
   roomId?: string;  
   category: AssetCategory;  
   isOfficialGift: boolean;      // KEY — flags state property received as gift  
   giftFrom?: string;            // e.g. "H.E. Ambassador of Japan"  
   giftDate?: string;  
   giftOccasion?: string;  
   estimatedValue?: number;  
   itemName: { en: string; ar: string };  
   brand?: string;  
   qty: number;  
   condition: Condition;  
   purchaseDate?: string;  
   purchaseCost?: number;  
   currency: 'BHD' | 'USD' | 'EUR' | 'GBP' | 'JPY';  
   expectedReplacementDate?: string;  
   invoiceUrl?: string;  
   photos: string[];  
   qrCode: string;               // generate placeholder QR strings  
   lastInspectedDate?: string;  
   lastInspectedBy?: string;  
   notes?: string;  
 }  
   
 export interface Room {  
   id: string;  
   propertyId: string;  
   name: { en: string; ar: string };  
   type: 'majlis' | 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'storage' | 'laundry' | 'dining' | 'office' | 'other';  
   floor: 'ground' | 'first' | 'second' | 'annex';  
   area: number;                 // sqm  
   photos: string[];  
   assetCount: number;  
 }  
   
 export type MaintenanceType = 'preventive' | 'corrective' | 'inspection' | 'emergency';  
 export type MaintenanceStatus = 'scheduled' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';  
   
 export interface MaintenanceTask {  
   id: string;  
   propertyId: string;  
   assetId?: string;  
   type: MaintenanceType;  
   title: { en: string; ar: string };  
   description?: string;  
   vendorId?: string;  
   scheduledDate: string;  
   completedDate?: string;  
   cost?: number;  
   currency: string;  
   invoiceUrl?: string;  
   status: MaintenanceStatus;  
   recurrence?: 'monthly' | 'quarterly' | 'biannual' | 'annual';  
   notes?: string;  
 }  
   
 export interface Vendor {  
   id: string;  
   name: string;  
   category: 'hvac' | 'plumbing' | 'electrical' | 'gardening' | 'pool' | 'cleaning' | 'security' | 'general';  
   country: string;  
   city: string;  
   contactName: string;  
   contactPhone: string;  
   contactEmail: string;  
   rating: number;               // 1–5  
   contractsSince: string;  
   totalSpent: number;  
   totalJobs: number;  
   notes?: string;  
 }  
   
 export type HandoverStatus = 'draft' | 'in-progress' | 'awaiting-signoff' | 'completed' | 'disputed';  
   
 export interface Handover {  
   id: string;  
   propertyId: string;  
   outgoingResident: { id: string; name: string; nameAr: string; rotationDate: string };  
   incomingResident: { id: string; name: string; nameAr: string; arrivalDate: string };  
   initiatedDate: string;  
   scheduledCompletionDate: string;  
   status: HandoverStatus;  
   itemsTotal: number;  
   itemsVerified: number;  
   itemsDisputed: number;  
   itemsMissing: number;  
   signoffs: {  
     outgoing: { signed: boolean; signedAt?: string };  
     incoming: { signed: boolean; signedAt?: string };  
     inspector: { signed: boolean; signedAt?: string; signerName?: string };  
     ministry: { signed: boolean; signedAt?: string; signerName?: string };  
   };  
   notes?: string;  
 }  
   
 export interface HandoverItem {  
   id: string;  
   handoverId: string;  
   assetId: string;  
   status: 'pending' | 'verified' | 'disputed' | 'missing';  
   conditionOnHandover: Condition;  
   conditionPrior: Condition;  
   photoBeforeUrl?: string;  
   photoAfterUrl?: string;  
   inspectorNote?: string;  
   outgoingNote?: string;  
   incomingNote?: string;  
 }  
   
 export type UserRole = 'admin' | 'property-manager' | 'inspector' | 'diplomat' | 'auditor' | 'staff';  
   
 export interface User {  
   id: string;  
   name: { en: string; ar: string };  
   email: string;  
   role: UserRole;  
   avatar?: string;  
   assignedProperties: string[]; // property IDs  
   active: boolean;  
   createdAt: string;  
   lastLogin?: string;  
 }  
   
 export interface DocumentRecord {  
   id: string;  
   propertyId?: string;  
   assetId?: string;  
   category: 'warranty' | 'permit' | 'insurance' | 'contract' | 'invoice' | 'map' | 'other';  
   title: { en: string; ar: string };  
   expiryDate?: string;  
   fileName: string;  
   fileSize: string;             // "2.4 MB"  
   uploadedBy: string;  
   uploadedAt: string;  
   tags: string[];  
 }  
   
 export interface Bill {  
   id: string;  
   propertyId: string;  
   type: 'electricity' | 'water' | 'gas' | 'internet' | 'phone' | 'cleaning' | 'security' | 'other';  
   date: string;  
   amount: number;  
   currency: string;  
   paymentMethod: 'card' | 'cash' | 'transfer' | 'cheque';  
   paid: boolean;  
   notes?: string;  
 }  
   
 export interface DiplomaticEvent {  
   id: string;  
   propertyId: string;  
   title: { en: string; ar: string };  
   category: 'national-day' | 'reception' | 'meeting' | 'family' | 'state-visit' | 'other';  
   date: string;  
   guests: number;  
   budget: number;  
   actualSpend?: number;  
   location: string;  
   vipAttendees?: string[];  
   notes?: string;  
 }  
   
 export interface AuditLogEntry {  
   id: string;  
   timestamp: string;  
   userId: string;  
   userName: string;  
   action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'sign' | 'approve' | 'reject';  
   entityType: 'property' | 'asset' | 'maintenance' | 'handover' | 'document' | 'user' | 'vendor';  
   entityId: string;  
   entityLabel: string;  
   changes?: Record<string, { from: unknown; to: unknown }>;  
   ipAddress?: string;  
 }  
   
 export interface Reminder {  
   id: string;  
   title: { en: string; ar: string };  
   dueDate: string;  
   category: 'maintenance' | 'bill' | 'inspection' | 'document-expiry' | 'handover' | 'other';  
   propertyId?: string;  
   assetId?: string;  
   status: 'upcoming' | 'due-soon' | 'overdue' | 'completed';  
   recurrence?: 'monthly' | 'quarterly' | 'biannual' | 'annual';  
 }  
   
 export interface ApprovalRequest {  
   id: string;  
   type: 'purchase' | 'maintenance-cost' | 'asset-disposal' | 'vendor-onboarding';  
   requestedBy: string;  
   requestedAt: string;  
   amount?: number;  
   currency?: string;  
   justification: string;  
   status: 'pending' | 'approved' | 'rejected';  
   approvedBy?: string;  
   approvedAt?: string;  
   comments?: string;  
 }  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4EKxgBjP+Asa0hxW8ibAl2DIzR3UFAMBf3Gu1VefXEwAAXtsfSqwDVbgKngwAAAAASUVORK5CYII=)  
**5. Mock data scenario**  
**Generate four properties** under /lib/mock/properties.ts:  
| | | | | | | |  
|-|-|-|-|-|-|-|  
| **ID** | **Type** | **Name (EN)** | **Name (AR)** | **City** | **Country** | **Status** |   
| prop-london | embassy + residence | Bahrain Embassy & Ambassador's Residence | سفارة البحرين ومقر إقامة السفير | London | United Kingdom | active |   
| prop-paris | embassy | Bahrain Embassy | سفارة مملكة البحرين | Paris | France | active |   
| prop-tokyo | embassy | Bahrain Embassy | سفارة مملكة البحرين | Tokyo | Japan | handover-in-progress |   
| prop-washington | embassy + residence | Bahrain Embassy & Ambassador's Residence | سفارة البحرين ومقر إقامة السفير | Washington DC | United States | active |   
   
**Tokyo is mid-handover** — that's the data state that lets the handover workflow shine in the demo. Outgoing ambassador rotating out, incoming arriving in 14 days, 187 items to verify.  
**For each property generate:**  
- 8–14 rooms across 2 floors + annex  
- 60–150 assets total per property (mix of categories)  
- 15–25 maintenance tasks (mix of completed, scheduled, overdue)  
- 6–10 vendors (some per-country, some global like global insurance carriers)  
- 30+ photo placeholders (use /public/images/mock/ with neutral interior stock-style filenames)  
- 12–18 bills over the past 12 months  
- 4–8 events  
- 8–15 documents (warranties, permits, insurance certificates)  
**Paintings & gifts highlights** — make these feel important:  
- "Sword of Honor — gift from H.M. Sultan of Oman, 2019, est. value BHD 12,000" (Tokyo)  
- "Pair of Imari porcelain vases — gift from MOFA Japan, 2022, est. BHD 4,500" (Tokyo)  
- "Oil portrait of HM King Hamad — commissioned 2018" (London)  
- Mix of received-as-official-gift items and purchased-with-state-funds items so the isOfficialGift flag visibly does work.  
**Users** — generate 8 mock users:  
- 1 admin (MoFA HQ in Manama)  
- 4 property managers (one per posting)  
- 2 inspectors (regional)  
- 1 auditor  
**Audit log** — pre-populate with 200+ entries spanning the last 90 days for realistic timeline density.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd49m4tA8nPaQJjWMGbCFuCLTOzV2cAAPzFvVZbdXw9AQDgtesBorcEPwOKyvQAAAAASUVORK5CYII=)  
**6. Global UI shell**  
**Layout**  
┌─────────────────────────────────────────────────────────────┐  
 │  TOP BAR (always visible)                                    │  
 │  [Logo + brand]   [Property selector]   [Search] [Lang] [👤] │  
 ├──────────────┬──────────────────────────────────────────────┤  
 │              │                                               │  
 │   SIDEBAR    │   PAGE CONTENT                                │  
 │   (collapsi  │                                               │  
 │    ble)      │                                               │  
 │              │                                               │  
 │              │                                               │  
 └──────────────┴──────────────────────────────────────────────┘  
   
**Top bar**  
- Left: Ministry crest icon (placeholder SVG) + "House Management System" / "نظام إدارة العقارات" in serif  
- Center: Property selector dropdown (the four postings) — when selected, sidebar context updates  
- Right: Search icon (cmd+K opens command palette), language toggle (AR/EN pill), user avatar with dropdown (Profile, Logout)  
**Sidebar (collapsible)**  
Group items with section headers in small caps brass color:  
DASHBOARD  
   Overview  
   Reminders  
   Audit Log  
   
 PROPERTIES  
   All Properties  
   London  
   Paris  
  Tokyo  ●  ← red dot indicates handover in progress  
   Washington  
   
 OPERATIONS  
   Maintenance  
   Vendors  
   Approvals (3) ← badge with pending count  
   
 RECORDS  
   Reports  
   Asset Register  
   Documents  
   
 ADMIN  (only visible to admin role)  
   Users & Roles  
   Settings  
   
**Breadcrumbs**  
Below top bar, on every page except dashboard. Use shadcn Breadcrumb. Always clickable.  
**Language toggle behavior**  
- Toggle between ar and en locales  
- Sets <html dir="rtl|ltr" lang="ar|en">  
- Persists in localStorage  
- Default on first load: ar (RTL)  
- All text content in /messages/ar.json and /messages/en.json  
- Asset names use the bilingual fields ({ en, ar }) directly from data — no translation file needed for those  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAALUlEQVR4nO3OQQ0AIAwEsAMlSJ0UrOFkGngRklZBR1WtJDsAAPzizNcDAADuNcKwAyU+nb+5AAAAAElFTkSuQmCC)  
**6.5  3D & motion layer**  
This is what gives the mockup its premium edge. Static screenshots get nodded at; a 3D room with brass-and-cream furniture that you can orbit gets photographed.  
**Important:** the same mockup code becomes the production codebase. There is no Spline, no third-party 3D service, no rebuild later. Every 3D component built here ships to MoFA as production code.  
**Library choice — and why**  
| | | |  
|-|-|-|  
| **Use case** | **Library** | **Why** |   
| All 3D scenes (rooms, buildings, floor plan, dashboard hero) | **React Three Fiber + drei** | MIT-licensed, $0 forever, self-hosted, fully auditable. Same code from mockup through production. |   
| Premium polish (bloom on brass, tone mapping, ambient occlusion) | **@react-three/postprocessing** | Turns "decent low-poly" into "looks expensive". |   
| 3D animations (camera lerps, object reveals, hover scales) | **@react-spring/three** + useFrame | Spring-based physics, plays nicely with R3F. |   
| UI animations (page transitions, hover, count-ups, modals) | **Motion** (formerly Framer Motion) | 2026 de-facto standard. |   
| Sequencing complex flows (handover wizard reveals, dashboard intros) | **GSAP** + ScrollTrigger | Best for orchestrated timelines. |   
| Smooth momentum scrolling | **Lenis** | 3KB, doesn't break sticky/observers, premium feel. |   
| Development-only 3D tuning | **Leva** | Live sliders for camera/lighting/material tuning during dev (strip from production builds). |   
   
**Why R3F-only (not Spline)**  
The mockup is the foundation for production. That changes the calculus:  
- **No vendor CDN dependency.** GLB models sit in /public/models/ and are served from your own deployment. Government data sovereignty: solved.  
- **No recurring 3D licensing cost.** R3F is open source. Spline Enterprise (the only Spline tier with self-hosted exports) costs thousands per year.  
- **Audit-friendly.** Open source, inspectable. Government procurement people sleep better.  
- **No migration debt.** The 3D component you write for the demo is the same one you ship.  
- **The proposal pitch writes itself:***"Built on React Three Fiber, an MIT-licensed open-source 3D engine — no third-party licensing fees, no vendor CDN dependency, fully auditable for government procurement."*  
**Where 3D appears in the mockup**  
| | | |  
|-|-|-|  
| **Page** | **3D element** | **Effect** |   
| /dashboard | Hero band — stylized globe with 4 glowing brass pins for the postings, slow auto-orbit | Sets tone within 1s of login |   
| /properties | Each property card uses a small ambient 3D building cover (auto-rotates very slowly) | Cards feel alive, not static |   
| /properties/[id] (Overview tab) | Stylized 3D facade of the building, replaces static cover photo | Headlines the property |   
| /properties/[id]/rooms/[roomId] | **Hero feature** — full 600px-tall 3D room viewer with furniture; click furniture pieces to open the matching asset detail modal | The moment the room goes quiet |   
| /properties/[id]/floor-plan | Isometric 3D floor plan with clickable rooms; toggle 2D ↔ 3D | More useful and impressive than a flat SVG |   
| /handover/[id] | Disputed-item modal: rotating 3D model alongside the damage photo (nice-to-have, second pass) | Sells the precision angle |   
   
**Asset sourcing — free GLB models**  
All models are CC0 or CC-BY (with attribution noted in /public/models/ATTRIBUTIONS.md). Recolor in Blender to match the brand palette before committing — keep meshes, swap materials.  
| | | |  
|-|-|-|  
| **Asset class** | **Recommended source** | **License** |   
| Furniture (sofas, chairs, tables, lamps, beds) | **Poly Pizza** (poly.pizza) | CC0 / CC-BY |   
| Detailed furniture and decor | **Sketchfab** (filter: "Downloadable" + CC0/CC-BY) | CC0 / CC-BY |   
| Plants, accessories, low-poly props | **Kenney.nl**,  **Quaternius** | CC0 |   
| Embassy / classical buildings | Sketchfab (CC0 architecture filter) or model in Blender from primitives | CC0 / yours |   
| HDRI environment maps (lighting + brass reflections) | **Polyhaven** (polyhaven.com) | CC0 |   
| PBR textures (cream walls, wood floor, brass, fabric) | **Polyhaven** | CC0 |   
   
**Stylization beats photorealism here.** A low-poly stylized scene with the brand palette + warm lighting + bloom on the brass will look *better* than photoreal because it matches the design language. Aim for "Apple product page", not "architectural rendering portfolio".  
**Scene plan**  
Build **5 reusable R3F scenes** as components under /components/3d/scenes/. Each scene loads GLB models and applies brand-palette materials at runtime — meaning we don't need 5 unique models, we need a small library of furniture pieces composed into 5 layouts.  
| | | |  
|-|-|-|  
| **Scene component** | **Composed from** | **Reused for** |   
| <GlobeHero> | Sphere geometry + GLB pin model + emissive brass material | Dashboard hero |   
| <BuildingCover variant="classical" /> | Block primitives + free classical building GLB, cream walls + brass door | London + Washington property covers |   
| <BuildingCover variant="modern" /> | Same building primitives, different proportions | Paris + Tokyo property covers |   
| <RoomScene variant="majlis" /> | Wall/floor primitives + GLB sofa + GLB coffee table + GLB plant + GLB painting frame | All majlis / living rooms |   
| <RoomScene variant="bedroom" /> | Wall/floor primitives + GLB bed + GLB lamp + GLB side table | All bedrooms |   
   
**Brand palette applied as Three.js materials** — set on every loaded GLB at runtime so no Blender baking is needed for color iteration:  
// lib/3d/materials.ts  
 import * as THREE from 'three';  
   
 export const BRAND_MATERIALS = {  
   wallCream:   new THREE.MeshStandardMaterial({ color: '#F5EFE2', roughness: 0.9 }),  
   floorWood:   new THREE.MeshStandardMaterial({ color: '#8B6A3F', roughness: 0.6 }),  
   forestFelt: new THREE.MeshStandardMaterial({ color: '#0E3A2E', roughness: 0.7 }),  
   brassMetal:  new THREE.MeshStandardMaterial({ color: '#B89154', metalness: 0.85, roughness: 0.25 }),  
   ink:         new THREE.MeshStandardMaterial({ color: '#1A1A17', roughness: 0.5 }),  
 };  
   
**Implementation patterns**  
**Pattern 1 — RoomViewer (the hero component)**  
// components/3d/RoomViewer.tsx  
 'use client';  
 import { Canvas } from '@react-three/fiber';  
 import { OrbitControls, Stage, Environment, ContactShadows, useGLTF } from '@react-three/drei';  
 import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';  
 import { Suspense, useState, useEffect } from 'react';  
 import { BRAND_MATERIALS } from '@/lib/3d/materials';  
   
 interface Props {  
   variant: 'majlis' | 'bedroom';  
   onAssetClick: (assetId: string) => void;  
   reducedMotion?: boolean;  
 }  
   
 function Sofa({ assetId, onClick }: { assetId: string; onClick: (id: string) => void }) {  
   const { nodes } = useGLTF('/models/sofa.glb');  
   return (  
     <primitive  
       object={nodes.Scene.clone()}  
       onClick={(e) => { e.stopPropagation(); onClick(assetId); }}  
       onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}  
       onPointerOut={() => { document.body.style.cursor = 'auto'; }}  
     >  
       {/* Apply brand material to every mesh inside */}  
     </primitive>  
   );  
 }  
   
 function MajlisLayout({ onAssetClick }: { onAssetClick: (id: string) => void }) {  
   return (  
     <>  
       {/* Floor */}  
       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>  
         <planeGeometry args={[8, 8]} />  
         <primitive object={BRAND_MATERIALS.floorWood} />  
       </mesh>  
       {/* Walls — three planes forming a room */}  
       <mesh position={[0, 1.5, -4]}>  
         <planeGeometry args={[8, 3]} />  
         <primitive object={BRAND_MATERIALS.wallCream} />  
       </mesh>  
       {/* Furniture */}  
       <Sofa assetId="asset-sofa-001" onClick={onAssetClick} />  
       {/* Coffee table, painting, plant... */}  
     </>  
   );  
 }  
   
 export function RoomViewer({ variant, onAssetClick, reducedMotion }: Props) {  
   return (  
     <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-[var(--color-border-soft)]">  
       <Canvas shadows camera={{ position: [4, 3, 5], fov: 40 }}>  
         <Suspense fallback={null}>  
           <Environment preset="apartment" />  
           <ambientLight intensity={0.3} />  
           <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow color="#FFE6BA" />  
           {variant === 'majlis' && <MajlisLayout onAssetClick={onAssetClick} />}  
           {variant === 'bedroom' && <BedroomLayout onAssetClick={onAssetClick} />}  
           <ContactShadows opacity={0.4} blur={2} resolution={512} />  
           <OrbitControls  
             enablePan={false}  
             minPolarAngle={Math.PI / 6}  
             maxPolarAngle={Math.PI / 2.1}  
             minDistance={3}  
             maxDistance={9}  
             autoRotate={!reducedMotion}  
             autoRotateSpeed={0.3}  
           />  
           <EffectComposer>  
             <Bloom intensity={0.4} luminanceThreshold={0.85} luminanceSmoothing={0.4} />  
             <ToneMapping />  
           </EffectComposer>  
         </Suspense>  
       </Canvas>  
     </div>  
   );  
 }  
   
 useGLTF.preload('/models/sofa.glb');  
 useGLTF.preload('/models/coffee-table.glb');  
   
**Pattern 2 — Two-way link between asset list and 3D viewer**  
The selling moment: clicking an asset row in the inventory pulses the matching mesh in the 3D viewer.  
// State at the room page level  
 const [highlightedAsset, setHighlightedAsset] = useState<string | null>(null);  
   
 // In RoomViewer, when highlightedAsset changes, animate the matching mesh's emissive  
 // using react-spring/three:  
 import { useSpring, animated } from '@react-spring/three';  
   
 const { emissiveIntensity } = useSpring({  
   emissiveIntensity: highlightedAsset === assetId ? 0.8 : 0,  
   config: { tension: 200, friction: 20 },  
 });  
 // Apply to the mesh's material  
   
**Pattern 3 — Centralized 3D config**  
// lib/3d/scene-config.ts  
 export const SCENE_CONFIG = {  
   defaultCamera: { position: [4, 3, 5] as const, fov: 40 },  
   autoRotateSpeed: 0.3,  
   bloom: { intensity: 0.4, luminanceThreshold: 0.85 },  
   environment: 'apartment' as const,  
   contactShadows: { opacity: 0.4, blur: 2 },  
 } as const;  
   
**UI animation patterns (Motion)**  
// Stat card number count-up  
 import { motion, useMotionValue, useTransform, animate } from 'motion/react';  
 import { useEffect } from 'react';  
   
 export function CountUp({ value }: { value: number }) {  
   const count = useMotionValue(0);  
   const rounded = useTransform(count, Math.round);  
   useEffect(() => {  
     const c = animate(count, value, { duration: 1.6, ease: 'easeOut' });  
     return c.stop;  
   }, [value]);  
   return <motion.span className="font-serif text-5xl">{rounded}</motion.span>;  
 }  
   
**Apply across the mockup:**  
- Stat cards: count-up on mount  
- Cards: whileHover={{ y: -2 }} plus brass border via class swap  
- Page transitions: wrap each route content in <motion.div> with fade + 8px slide-up, 200ms  
- Modals / sheets: scale 0.96 → 1, opacity 0 → 1, 200ms ease-out  
- Lists & tables: stagger children 40ms on mount  
- Handover progress bar: animated fill on mount with brass shimmer  
**Smooth scrolling (Lenis)**  
Wrap the authenticated layout once:  
// components/SmoothScroller.tsx  
 'use client';  
 import Lenis from 'lenis';  
 import { useEffect } from 'react';  
   
 export function SmoothScroller({ children }: { children: React.ReactNode }) {  
   useEffect(() => {  
     const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });  
     function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }  
     requestAnimationFrame(raf);  
     return () => lenis.destroy();  
   }, []);  
   return <>{children}</>;  
 }  
   
**Performance & accessibility rules**  
- All 3D scenes wrapped in <Suspense> with skeleton fallback  
- Use useGLTF.preload(path) for hero models so they're ready when needed  
- Preload room scene GLBs on hover of the parent room card (onMouseEnter → useGLTF.preload)  
- Respect prefers-reduced-motion: reduce everywhere — disable autoRotate, kill count-ups, drop Lenis  
- Detect slow networks (navigator.connection?.effectiveType of '2g' or 'slow-2g') and fall back to a static cover photo for the room/building viewers  
- Every clickable 3D object also has a corresponding HTML button below the canvas for keyboard / assistive tech bypass  
- Add a "Pause animation" toggle in the top bar that disables autoRotate and Lenis globally  
- Use <DetailLOD> from drei or simple distance checks to swap to lower-poly meshes when the camera is far — keeps the embassy buildings on the dashboard cheap  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OYQ1AABSAwY9JoICqL4Z8Ikiggn9mu0twy8wc1RkAAH9xbdVa7V9PAAB47X4A9CgEJQFjJ/EAAAAASUVORK5CYII=)  
**7. Page-by-page specifications**  
**7.1  /login**  
A single centered card, cream background, serif H1 "Welcome" / "أهلاً وسهلاً". Email + password fields (any input works). Sign in button → /dashboard. Subtle ministry crest watermark behind the card. Bottom-left: language toggle.  
**7.2  /dashboard (Executive Dashboard)**  
The headline page. Build to impress.  
**Hero band** (very top — full-width, ~280px tall):  
- <GlobeHero> R3F component — stylized globe slowly auto-rotating, four brass pins glowing softly for London, Paris, Tokyo, Washington  
- Overlay text on the left side: "Good morning, [user name]" in serif H1 + small caption "4 properties · 1 active handover"  
- Overlay action on the right: "Resume Tokyo handover →" CTA in brass (only if a handover is in progress in mock data)  
**Hero strip** (below the 3D band):  
- 4 stat cards in a row, each with a serif large number (use the CountUp Motion component) and small caps label:  
- "Properties under management" → 4  
- "Total assets value" → BHD 1,247,500  
- "Pending maintenance" → 12 (with brass underline)  
- "Active handovers" → 1 (Tokyo) — clickable, links to handover  
**Second row** — split:  
- Left (60%): Line chart (recharts) — "Maintenance spend (last 12 months)" by property, four lines in muted forest/brass/cream/charcoal  
- Right (40%): "Recent activity" — last 8 audit log entries in a minimalist timeline  
**Third row** — split:  
- Left: "Properties at a glance" — 2x2 grid of property cards (cover photo, name, status badge, asset count, next-maintenance date)  
- Right: "Upcoming reminders" — vertical list, 6 items, with date and category icon  
**Fourth row** — split:  
- Left: Donut chart "Asset distribution by category" (recharts)  
- Right: "Pending approvals" — 3 cards, each with a "Review" button (clicking opens a modal with details)  
All numbers and content use mock data. Hovers reveal subtle brass borders. Empty whitespace is intentional.  
**7.3  /properties**  
Property tree / cards page.  
**Layout option 1 (recommended):** A world-map-style header (a stylized SVG silhouette of Europe + Asia + N. America with four labeled dots for the four cities), followed by a 2×2 grid of large property cards.  
**Each property card:**  
- **<BuildingCover>** ** R3F scene as cover** (full width of card, 16:9) — variant="classical" for London + Washington, variant="modern" for Paris + Tokyo. Auto-rotates very slowly (one full rotation per 90 seconds). Falls back to a static cover photo if prefers-reduced-motion is set.  
- Type badge (top-right corner of cover, brass): "Embassy" / "Residence"  
- Property name (serif H3)  
- City, country (brass caption)  
- Status pill (active = green, handover = brass, vacant = gray)  
- 4 micro-stats in a row: rooms, assets, area, last inspection  
- Bottom: "Open" link → /properties/[id]  
**7.4  /properties/[propertyId] (Property Overview)**  
**Header:**  
- **<BuildingCover>** ** R3F scene** (full-width banner, 21:9) — variant="classical" or variant="modern" based on city. Camera slowly orbits on idle; on user interaction (mouse move into the canvas) the orbit pauses and OrbitControls take over. Falls back to a static photo on reduced-motion.  
- Overlaid: property name (serif H1, off-white with subtle drop), address, brass status badge — text is positioned bottom-left over a soft cream-to-transparent gradient mask so it stays readable  
- Right side: "Initiate handover" button (brass) — only visible if property is active  
**Tab navigation** (sticky below header):  
   
 Overview · Rooms · Kitchen · Paintings & Gifts · Vehicles · Photo Archive · Maintenance · Garden & Pool · Bills · Events · Security · Documents · Floor Plan  
**Overview tab content:**  
- Two-column layout  
- Left: facts table (acquired date, total area, rooms, garden, pool, current resident, ministry contact)  
- Right: "Floor plan preview" — small SVG of floor layout, click to expand to /floor-plan  
- Below: "Recent events" + "Open maintenance" mini-lists  
**7.5  Inventory pages (Rooms, Kitchen, Paintings & Gifts, Vehicles)**  
These follow a **shared pattern** — implement as a reusable <InventoryView> component:  
- Filter bar: search, category, condition, "official gift only" toggle (paintings only)  
- View toggle: cards / table  
- Cards view: photo-led cards with item name, condition pill, est. value, last inspected date  
- Table view: columns are item, category, condition, qty, value, last inspected, actions  
- Click any item → modal with full asset detail (photos carousel, full metadata, audit history, QR code preview)  
- "Add item" button — opens form modal, dummy submission (just close on save)  
**Paintings & Gifts page extras** — add an "Official gifts" emphasis:  
- Stat strip at top: "Total state property" / "Received as official gifts" / "Total estimated value"  
- Each gift card has a brass "Official gift" badge if isOfficialGift = true  
- Gift detail modal includes: gift from, occasion, date received, valuation, disposition trail  
**7.5.1  /properties/[propertyId]/rooms/[roomId] — Single Room Page (3D HERO)**  
**This is the visual showstopper of the demo. Spend extra polish here.**  
**Top section — 3D room viewer (full-width, ~600px tall):**  
- <RoomViewer> R3F component using variant="majlis" (for living rooms / majlis) or variant="bedroom" (for bedrooms). Office and storage rooms can fall back to a static photo gallery.  
- Camera auto-orbits slowly on load (one full revolution per 60s), pauses when the user moves mouse into the canvas, and OrbitControls take over (drag to rotate, scroll to zoom — bounded)  
- Furniture meshes are wrapped in clickable groups carrying their assetId as a prop. Clicking a piece triggers a brass emissive glow (via @react-spring/three) and opens the asset detail modal  
- Top-left overlay: room name (serif H2, bilingual), floor + area  
- Top-right overlay: small toolbar — "Reset view", "Pause rotation", "View as 2D photo" (toggles back to a static photo gallery)  
- Bottom strip: thumbnail row of all room photos (taken on different dates) — clicking switches the viewer between 3D and a photo lightbox  
**Below the viewer — asset list:**  
- Same <InventoryView> pattern as parent  
- Header shows "X assets in this room" with category breakdown (chips)  
- **The selling moment:** hovering an asset row in the list briefly pulses the matching mesh in the 3D viewer. Implemented via shared state — highlightedAssetId flows from list → viewer, animated via @react-spring/three to ramp the matching mesh's emissive intensity. This two-way link is what sells the system.  
**Performance notes:**  
- The room GLB models are preloaded with useGLTF.preload() when the user hovers the room card on the parent rooms page  
- On prefers-reduced-motion or 2G connection, swap the viewer for a static photo gallery; the asset list still works identically  
**7.6  /properties/[propertyId]/photo-archive**  
Pinterest-style masonry grid of photos. Filter by: room, date range, asset category, "newest" / "oldest". Each photo shows date taken in brass small-caps overlay. Click → lightbox with metadata panel (room, asset linked, taken by, taken on).  
**7.7  /properties/[propertyId]/maintenance**  
Same pattern for cross-property /maintenance (just defaults to all properties).  
- Top: status filter chips (Scheduled, In progress, Completed, Overdue)  
- Calendar view toggle vs. list view  
- List view: table with columns: title, type, vendor, scheduled date, status, cost, actions  
- Click a row → side sheet (shadcn Sheet) with full task detail and history  
- "Schedule maintenance" button → form sheet  
**7.8  /properties/[propertyId]/garden-pool**  
Two cards — one for irrigation/garden, one for pool. Each shows last service, next service, vendor, photos. Below: combined timeline of services in the past 12 months.  
**7.9  /properties/[propertyId]/bills**  
Table with monthly grouping. Top: stat cards "This month total", "Year-to-date", "vs last year" (with arrow). Filter by type. Each row clickable for receipt preview.  
**7.10  /properties/[propertyId]/events**  
Card grid of events, sortable by date. Each event card: title, date, guests count, budget vs actual (mini progress bar in brass), category badge. Modal opens with full detail and photos from the event.  
**7.11  /properties/[propertyId]/security**  
Cards for: CCTV system, alarm system, access control, security vendor contract. Each card shows status (Active/Inspection due), last service, next service, and a "View details" link to a modal with cameras layout (use a placeholder SVG for camera positions on a floor plan).  
**7.12  /properties/[propertyId]/documents**  
Documents library, table view. Columns: title, category badge, expiry date (with warning color if within 60 days), uploaded by, uploaded on, size, actions (download, view).  
Tabs at top: All · Warranties · Permits · Insurance · Maps & Permits.  
**7.13  /properties/[propertyId]/floor-plan**  
**Isometric 3D floor plan** built with R3F + drei, using the <FloorPlan3D> component pattern from section 6.5.  
- Default view: 3D isometric, slow auto-rotate (toggleable), house silhouette in cream walls + dark green roof + brass door accents  
- Floor toggle: "Ground / First / Annex" — animates camera between floors with GSAP (lift up to "explode" and re-settle)  
- Rooms are clickable meshes; on hover they get a brass emissive outline + a floating tooltip with the room name (use drei's <Html>)  
- Click a room → camera lerps in over 800ms + side panel slides in with that room's asset count, photos, and a "Open room" link to /rooms/[roomId]  
- Top-right toolbar: "2D / 3D" toggle (2D shows a flat SVG floor plan as fallback), "Reset view", "Print"  
- For the mockup, ship with a placeholder GLB from Sketchfab/Poly Pizza, recolored to the brand palette in Blender. The same model is reused across all 4 properties  
**7.14  /handover (HUB)**  
**This is the killer page. Spend extra polish here.**  
- Top stat strip: "Handovers in progress: 1" / "Awaiting sign-off: 0" / "Completed (this year): 3"  
- Big card highlighted in brass: "Tokyo Embassy — handover in progress" with progress bar (148/187 items verified), days remaining, outgoing/incoming names  
- Below: history table of past handovers  
- "Initiate new handover" CTA (brass)  
**7.15  /handover/new (Initiate handover wizard)**  
3-step wizard (use shadcn Tabs styled as a stepper):  
**Step 1 — Property & people:** select property, outgoing resident (auto-filled from current resident), incoming resident, dates.  
   
 **Step 2 — Inventory snapshot:** auto-list all assets at the property; tick which to include (default all). Notes field.  
   
 **Step 3 — Review & start:** summary card, "Start handover" button → creates a draft and routes to /handover/[id].  
**7.16  /handover/[handoverId] (Handover detail — HERO PAGE)**  
**Header:**  
- Property name + city  
- Outgoing → Incoming names with arrow icon  
- Status badge  
- Days remaining countdown  
- 4 progress stats: items total / verified / disputed / missing  
**Body — split layout:**  
- Left (70%): item-by-item verification list. Each item is a row with:  
- Photo thumbnail  
- Item name (bilingual)  
- Prior condition / current condition (two pills)  
- Status pill: pending / verified / disputed / missing  
- "View" button → opens a side drawer with before/after photos side-by-side, condition rating, inspector note, outgoing & incoming notes  
- Right (30%): sticky panel with:  
- Sign-off cards for outgoing, incoming, inspector, ministry — each shows signed/unsigned, name, timestamp  
- "Print handover certificate" button  
- "Export to PDF" button  
**Filter bar above the list:** all / pending / verified / disputed / missing.  
This is what wins the meeting. Mock the Tokyo handover with 187 items, ~140 already verified, 4 disputed, 1 missing.  
**7.17  /vendors**  
Vendor management table. Columns: name, category, country, rating (5 stars filled to value), total spent (BHD), total jobs, contracts since, actions. Click row → /vendors/[id].  
**7.18  /vendors/[vendorId]**  
Vendor profile: header with name, rating, contact info. Below: tabs for "Job history" (table of all maintenance tasks with this vendor) and "Performance" (small line chart of jobs over time + average rating trend).  
**7.19  /reports**  
Report cards grid. Each card has:  
- Icon + title  
- Description ("Comprehensive list of all state-owned assets across all properties")  
- "Generate" button  
Report types: Asset Register, Expense Summary, Maintenance History, Handover Summaries, Vendor Performance, Audit Trail.  
**7.20  /reports/asset-register**  
Full data table with **server-side-feel filters** (in mockup, just client-side):  
- Filter by: property, category, condition, official gift only, value range, acquired date range  
- Columns selectable  
- Top-right buttons: "Export PDF", "Export Excel" (these can show a toast saying "Export ready — feature mocked")  
- Above table: stat strip with totals (count, value)  
**7.21  /audit**  
System-wide audit log — vertical timeline.  
- Filter by: user, entity type, action, date range  
- Each entry: timestamp, user avatar + name, action verb, entity (e.g., "Updated asset condition: Sword of Honor — Tokyo"), small "View change" expand to show before/after diff  
- Group by day with sticky day headers  
- Pagination at bottom (20 per page)  
**7.22  /reminders**  
Toggle: month calendar view / list view.  
- Calendar: month grid with reminder dots colored by category  
- List: grouped by status (Overdue, Due soon, Upcoming, Completed)  
- Each item is clickable → side sheet with detail and "Mark complete" / "Snooze" buttons (mocked)  
**7.23  /admin/users**  
Users table. Columns: avatar + name, email, role badge, properties assigned (count), last login, status, actions. "Add user" button → form sheet.  
**7.24  /admin/approvals**  
Pending approval requests list. Each card: type badge, requested by, amount (if applicable), justification (truncated, click to expand), submitted date. Two buttons: Approve (forest) / Reject (outline). Clicking either shows confirmation modal then removes from list (optimistic UI).  
**7.25  /admin/settings**  
Tabbed page:  
- General: language default, currency display, date format  
- Notifications: toggle channels (email / SMS / WhatsApp / push) — mocked  
- Branding: ministry name, crest upload (mocked)  
- Data retention: photo archive retention period  
**7.26  /profile**  
User profile page: avatar, name (bilingual), role, contact info, properties assigned, recent activity (last 10 audit log entries by this user), "Edit" button (opens form, no real save).  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZo/khWsYQLPJrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA4qjBdKlX6OKAAAAAElFTkSuQmCC)  
**8. RTL & i18n implementation**  
**Setup**  
// app/layout.tsx  
 import { Inter, Playfair_Display, Tajawal, IBM_Plex_Sans_Arabic } from 'next/font/google';  
   
 const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });  
 const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });  
 const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'], variable: '--font-tajawal' });  
 const plexAr = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400','500','600'], variable: '--font-plex-ar' });  
   
 export default async function RootLayout({ children, params: { locale } }) {  
   return (  
     <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}  
           className={`${inter.variable} ${playfair.variable} ${tajawal.variable} ${plexAr.variable}`}>  
       <body>{children}</body>  
     </html>  
   );  
 }  
   
**Tailwind RTL utilities**  
Install tailwindcss-rtl plugin OR use logical properties (ms-, me-, ps-, pe-, start-, end-) which Tailwind 3.4+ supports natively. **Prefer logical properties** — they make RTL automatic.  
**Translation files**  
/messages/ar.json and /messages/en.json for UI strings (nav labels, button text, table headers, status labels, dialogs). Asset/property/document names use the bilingual { en, ar } fields directly — no translation file needed.  
**Default locale = **ar  
Set in next-intl config. First-time visitors land in Arabic. Toggle in top bar switches and persists.  
**Number & date formatting**  
- Currency uses Intl.NumberFormat(locale, { style: 'currency', currency: 'BHD' }) — Arabic shows Eastern Arabic numerals if desired (decision: use Western numerals in both for clarity in financial data).  
- Dates use date-fns/locale/ar for Arabic locale, default for English. Always format as "DD MMM YYYY" e.g., "08 May 2026".  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OYQ1AABSAwc8mi5wvlAB6CKCAACr4Z7a7BLfMzFYdAQDwF+da3dX+9QQAgNeuB6fWBdZMUxZ2AAAAAElFTkSuQmCC)  
**9. Component library — reusable patterns**  
Build these as named components under /components/:  
| | |  
|-|-|  
| **Component** | **Purpose** |   
| <PageHeader> | Title (serif), subtitle, breadcrumbs, action buttons slot |   
| <StatCard> | Large serif number with Motion count-up, small caps label, optional trend arrow |   
| <PropertyCard> | The 4-in-a-row property card with Spline scene cover |   
| <AssetCard> | Photo-led asset card with condition pill, value, last inspected |   
| <InventoryView> | Reusable filter+search+table+cards inventory shell |   
| <StatusPill> | Color-coded pill (active/handover/overdue/etc.) |   
| <SignoffCard> | Handover sign-off card (signed/unsigned, name, timestamp) |   
| <TimelineEntry> | Audit log / activity entry |   
| <EmptyState> | Cream illustration placeholder + headline + CTA |   
| <DataTable> | Wraps tanstack/react-table with our styling |   
| <DetailDrawer> | Right-side sheet for item details |   
| <MiniMap> | World silhouette with labeled property dots (fallback for <GlobeHero> under reduced-motion) |   
| <ConditionBadge> | Excellent/Good/Fair/Poor with color coding |   
| <GiftBadge> | Brass "Official gift" pill |   
| **<GlobeHero>** | **R3F globe-with-pins hero band for /dashboard, with reduced-motion fallback to ** **<MiniMap>** |   
| **<BuildingCover>** | **R3F building scene used as cover on PropertyCard and Property Overview header — accepts ** **variant: 'classical' \| 'modern'** |   
| **<RoomViewer>** | **The hero R3F room viewer with clickable furniture meshes → asset modals — accepts ** **variant: 'majlis' \| 'bedroom'** |   
| **<FloorPlan3D>** | **R3F + drei isometric house with floor toggle, click-to-zoom rooms** |   
| **<SmoothScroller>** | **Lenis wrapper for the authenticated layout** |   
| **<CountUp>** | **Motion-driven number count-up for stat cards** |   
| **<AnimatedRoute>** | **Wraps page content in ** **motion.div** ** for fade + slide transitions on route change** |   
| **<MotionToggle>** | **Top-bar toggle that disables 3D autoplay and Lenis (sits next to language toggle)** |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscVjnidKEAGFtgISaugy8zs1RkAAH9xr9VWHV9PAAB47XoAor8EPg1yCpUAAAAASUVORK5CYII=)  
**10. Out of scope (do NOT build for v1 mockup)**  
- Real authentication — /login is cosmetic, any input works  
- Real backend — no API routes, no database, no Server Actions for mutations  
- Real file uploads — show file pickers but don't process  
- Real PDF/Excel export — show a toast "Export ready — demo"  
- Real email/SMS — settings toggles are visual only  
- Mobile inspection mode — desktop layout is enough for v1  
- QR code scanning — show QR codes on cards but don't implement scanner  
- Search backend — cmd+K can be a styled empty modal or a basic fuzzy search across mock data using fuse.js  
- **Custom-modeled per-property GLB models** — the room and building scenes are reused across properties using just 2 building variants and 2 room variants. A real production build could commission per-property models, but for the mockup the reuse is invisible because the scenes are stylized, not photoreal  
- **Photoreal rendering** — the 3D scenes are deliberately stylized (low-poly, brand palette, free CC0 assets) to feel premium without uncanny-valley. Do not attempt photorealism  
- **VR / AR / WebXR modes** — not in v1, mention as roadmap only  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNBCUpfEJ5YGBDBgAU2QtIq6DIzW7UHAMBfHGt1V+fXEwAAXrseHDYF+yOk59sAAAAASUVORK5CYII=)  
**11. Acceptance criteria**  
The mockup is complete when:  
1. All 32 pages in the sitemap are reachable with no 404s  
2. Every dynamic route (e.g. /properties/[id]) works for at least 4 IDs (the four embassies) and 2 handover IDs  
3. Arabic is the default language; toggle to English works on every page; layout flips correctly in RTL  
4. The Tokyo handover page (/handover/...) shows 187 mock items with realistic verification states  
5. The dashboard renders all 4 sections (stats, charts, properties, reminders) with mock data  
6. Navigation, breadcrumbs, and property selector work consistently  
7. Visual polish: no Tailwind defaults visible (no blue ring, no default borders), every page reflects the diplomatic premium identity  
8. **3D scenes load on ** **/dashboard** **, ** **/properties** ** cards, ** **/properties/[id]** ** overview, ** **/properties/[id]/rooms/[roomId]** **, and ** **/properties/[id]/floor-plan** ** — with skeleton placeholders during load and graceful static fallbacks under reduced-motion**  
9. **Clicking a furniture mesh in the room viewer opens the matching asset detail modal**  
10. **prefers-reduced-motion: reduce** ** disables all auto-rotation, count-ups, and Lenis smooth-scroll throughout the app**  
11. Tested in Chrome at 1440px and 1024px widths  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBACPykMH4NpGACyywEZJWQZeZ2aszAAD+4l6rrTo+jgAA8N71AL/CBEiG5xPoAAAAAElFTkSuQmCC)  
**12. Suggested folder structure**  
/app  
   /[locale]  
     /(auth)/login/page.tsx  
     /(app)  
       /layout.tsx                (sidebar + topbar shell)  
       /dashboard/page.tsx  
       /properties/page.tsx  
       /properties/[propertyId]/page.tsx  
       /properties/[propertyId]/rooms/page.tsx  
       /properties/[propertyId]/rooms/[roomId]/page.tsx  
       ... (etc per sitemap)  
       /handover/page.tsx  
       /handover/new/page.tsx  
       /handover/[handoverId]/page.tsx  
       /vendors/page.tsx  
       /vendors/[vendorId]/page.tsx  
       /reports/...  
       /audit/page.tsx  
       /reminders/page.tsx  
       /admin/users/page.tsx  
       /admin/approvals/page.tsx  
       /admin/settings/page.tsx  
       /profile/page.tsx  
 /components  
   /ui                            (shadcn components)  
   /shell                         (TopBar, Sidebar, Breadcrumbs, SmoothScroller, MotionToggle)  
   /cards                         (PropertyCard, StatCard, etc.)  
   /tables  
   /handover                      (HandoverItemRow, SignoffCard, etc.)  
   /charts  
   /3d  
     /scenes                      (GlobeHero, BuildingCover, RoomScene, FloorPlan3D)  
     /primitives                  (reusable furniture wrappers, walls, floors)  
     /RoomViewer.tsx              (the hero room viewer)  
   /motion                        (CountUp, AnimatedRoute)  
 /lib  
   /types.ts  
   /3d  
     /materials.ts                (BRAND_MATERIALS — cream/forest/brass/wood/ink Three.js MeshStandardMaterials)  
     /scene-config.ts             (camera, bloom, autoRotate constants)  
   /mock  
     /properties.ts  
     /rooms.ts  
     /assets.ts  
     /maintenance.ts  
     /vendors.ts  
     /handovers.ts  
     /handover-items.ts  
     /users.ts  
     /audit.ts  
     /reminders.ts  
     /events.ts  
     /bills.ts  
     /documents.ts  
     /approvals.ts  
   /utils.ts  
 /messages  
   /ar.json  
   /en.json  
 /public  
   /images  
     /properties                  (4 cover photos — fallbacks for reduced-motion)  
     /rooms                       (interior shots — fallbacks for room viewer)  
     /assets                      (paintings, gifts, furniture, cars)  
     /events  
     /crest.svg                   (ministry crest placeholder)  
   /models  
     /sofa.glb                    (CC0 from Poly Pizza or Sketchfab, recolored)  
     /coffee-table.glb            (CC0 from Poly Pizza)  
     /bed.glb                     (CC0 from Poly Pizza)  
     /side-table.glb              (CC0 from Poly Pizza)  
     /lamp.glb                    (CC0 from Kenney/Poly Pizza)  
     /plant.glb                   (CC0 from Quaternius/Poly Pizza)  
     /painting-frame.glb          (simple primitive or CC0)  
     /building-classical.glb      (CC0 architecture, recolored — for London/Washington)  
     /building-modern.glb         (CC0 architecture, recolored — for Paris/Tokyo)  
     /globe.glb                   (sphere primitive, no GLB needed)  
     /ATTRIBUTIONS.md             (license + author credit list per CC-BY requirements)  
   /hdri  
     /apartment.hdr               (CC0 from Polyhaven — environment lighting)  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAUBBAwSd8bOHVnBvBkAaxgjcRZhLMNjNHdQUAwF/cq9qr8+sJAACvrQctgQNH4A++9QAAAABJRU5ErkJggg==)  
**End of brief.** Paste this whole document into Claude Design as the build prompt. If output is too large in one pass, hand it the sections in this order:  
1. **Foundation** — sections 1, 2, 4, 5, 8 (tech, identity, types, mock data, RTL)  
2. **Shell** — section 6 (top bar, sidebar, layout)  
3. **3D & motion layer** — section 6.5 (scaffolds with placeholder cube/box meshes; real GLB models drop into /public/models/ as they're sourced from Poly Pizza / Sketchfab / Polyhaven and recolored)  
4. **Pages — content first** — section 7.1 through 7.13 (login through bills/events/security/documents)  
5. **Pages — hero features** — sections 7.14–7.16 (handover hub, wizard, detail) and 7.5.1 (3D room viewer)  
6. **Pages — admin & polish** — sections 7.17–7.26  
7. **Components & acceptance** — sections 9, 11  
GLB models can be sourced in parallel by Joe (a few hours on Poly Pizza + Sketchfab) while the build agent scaffolds the rest of the app — the brief uses primitive placeholders for any model not yet available, and they're swapped in seamlessly via the centralized BRAND_MATERIALS system.  
