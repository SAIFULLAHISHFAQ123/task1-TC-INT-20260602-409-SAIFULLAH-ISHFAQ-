# Business Intelligence Analytics Dashboard (FEWD-1)

A modern, professional, enterprise-grade Business Intelligence Analytics Dashboard built for the **TEYZIX CORE Internship Program**. 

This application provides tools to monitor revenue, client acquisition, segment distribution, and transactional performance with data visualizations, advanced filters, CSV/PDF reports, and full multi-language RTL support.

---

## 🚀 Key Features

1. **Collapsible Workspace Layout**
   * Responsive navigation sidebar containing routes for *Dashboard, Analytics, Customers, Orders, Reports, and Settings*.
   * Seamless collapsing mechanics for desktop and drawer-overlay animation for mobile/tablet screens.
   * Search queries, active alerts count indicator, and administrative profile control drawers.

2. **Advanced Global Filters**
   * Dynamically filter calculations across the entire application by:
     * Date Range (Start Date / End Date)
     * Revenue bounds (Min / Max)
     * Geographic Region (North, South, East, West)
     * Relationship Status (Active, Inactive, Pending)
   * Collapsible filters panel to save vertical layout space.

3. **Interactive Visualizations (Recharts)**
   * **Revenue Trend Chart (Area):** Displays monthly target vs actual billing projections.
   * **Sales Performance Chart (Bar):** Visualizes sales units vs revenue on split Y-axes.
   * **Customer Growth Chart (Line):** Displays monthly new customer registrations and totals.
   * **Category Distribution Chart (Donut):** Represents customer segment percentages (Enterprise, Mid-Market, SMB, Individual).

4. **Multi-Language Urdu/English (i18next)**
   * Full English (`en`) and Urdu (`ur`) translations for headers, titles, cards, lists, table structures, and tooltips.
   * Selecting Urdu automatically changes text flow direction (`dir="rtl"`) on the document element and applies Urdu Sans-Serif & Nasta'liq typography.

5. **Theme Management (localStorage)**
   * Seamless light and dark mode toggles with immediate styles rendering.
   * Persists preferences to browser storage to remember choices on reload.

6. **Interactive Customer Database Table**
   * Custom column sorting, text searches, and pagination size controls.
   * Informative active status pills and details modals.

7. **Reports & Exports (PDF/CSV)**
   * **PDF Export:** Capture specific HTML canvas grids using `html2canvas` and exports compiled high-DPI A4 PDF documents via `jspdf`.
   * **CSV Export:** Converts current filtered lists into raw CSV sheets using UTF-8 BOM encoding to ensure Urdu values load correctly in Excel.

8. **Client-Side JSON-Server Interceptor**
   * Built-in Axios request adapters to mock complete backend server databases client-side, showing skeleton loaders, network delay adjustments, and error components.
   * Automatically switches to standard HTTP requests if `VITE_API_URL` is set to point to a live JSON Server.

---

## 🛠️ Technology Stack

* **Core:** React.js 19 + TypeScript
* **State Management:** Redux Toolkit + React Redux
* **Caching & Queries:** TanStack React Query v5
* **Styling:** Tailwind CSS v3 + Google Fonts
* **Charting:** Recharts
* **Routing:** React Router v6
* **Icons:** Lucide React
* **Localization:** i18next + react-i18next
* **Exports:** jsPDF + html2canvas
* **Build System:** Vite

---

## 📂 Project Structure

```
src/
├── assets/             # Images, SVGs
├── components/
│   ├── layout/         # Sidebar, Header, Layout container
│   ├── charts/         # Area, Bar, Line, Donut charts
│   ├── cards/          # KPI metrics card with trend sparklines
│   ├── tables/         # Customer database table
│   └── common/         # Skeleton loaders, Error boxes, Empty state templates
├── pages/              # Routing pages (Dashboard, Analytics, Customers, etc.)
├── redux/
│   ├── store.ts        # Redux store config
│   └── slices/         # slices for theme, filters, and customer table
├── services/
│   ├── api.ts          # Axios configuration and mock client interceptor
│   └── mockData.ts     # Dataset records
├── i18n/
│   └── config.ts       # Translations dictionary and direction hooks
├── types/
│   └── index.ts        # Type interfaces
├── utils/
│   ├── exportCsv.ts    # RFC-4180 CSV export helper
│   └── exportPdf.ts    # jsPDF + html2canvas layout exporter
├── App.tsx             # Route paths mapping
└── main.tsx            # Context and Query Client wraps
```

---

## ⚙️ Setup and Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 3. Build for Production
```bash
npm run build
```
Generates a compiled production-ready bundle in the `dist/` directory.

### 4. Local Server Preview
```bash
npm run preview
```
Previews the production build on a local port.
