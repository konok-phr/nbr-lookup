# NBR Audit Selection 2023-24 — TIN Lookup (Community Tool)

A fast, fully client-side bilingual (বাংলা / English) website to check whether a 12-digit TIN is in NBR's automated Risk Based Audit Selection list for assessment year 2023-24 (72,341 records).

> Disclaimer: Not an official NBR site. Built by the community for easier access. Source data: NBR public files.

## Pages / Routes

- `/` — Home / Search
  - Hero: title + bilingual subtitle, prominent disclaimer chip ("Unofficial — Community tool / অনানুষ্ঠানিক")
  - Big TIN search box (12-digit, numeric only, auto-formatting), Search button
  - Instant result card:
    - Found → green status, shows TIN, Zone, Circle, Submission Type, Assessment Year (labels in both languages)
    - Not found → neutral card with reassurance message
  - Recent searches (localStorage, optional)
  - Quick stats strip: Total selected (72,341), Phase (২য়/2nd), Year (2023-24)
- `/notice` — embedded preview of the official NBR press release PDF + download/open button
- `/about` — what this site is, data source, last updated date, links to NBR
- 404 not-found page

## Header / Footer

- Header: Logo/title, nav (Home · Notice · About), language toggle (বাং / EN) — persisted in localStorage
- Footer: Source links
  - NBR official: https://nbr.gov.bd/
  - Press release PDF: https://nbr.gov.bd/uploads/public-notice/Press_Release-_Risk_Based_Audit_Selection.pdf
  - Original Excel: https://nbr.gov.bd/uploads/news-scroller/AUDIT_SELECTION_2023-24.xlsx
  - "Unofficial / community" disclaimer repeated

## Data & Performance (the key part)

The Excel has 72,341 rows × 6 columns. To stay fast and 100% client-side:

1. At build time, convert the XLSX into a compact lookup-friendly format:
   - `public/data/tins.bin` — sorted Uint8Array of TINs (12 digits → 8 bytes each, BigUint64) for O(log n) binary search ≈ 580 KB
   - `public/data/meta.json` — array of unique `{zone, circle, submission_type}` tuples (deduped, ~few hundred entries)
   - `public/data/details.bin` — for each TIN row (same order as tins.bin), 2-byte index into meta tuples ≈ 145 KB
   - Assessment year is constant ("2023-2024") — stored once
   - Total payload ≈ ~700 KB gzipped, fetched once and cached
2. On first search:
   - Lazy-fetch the binary files (with a small loading shimmer)
   - Build typed arrays in memory
   - Binary search by TIN → instant lookup (sub-millisecond)
3. Subsequent searches are instant; data cached in memory + browser HTTP cache.

This avoids parsing a 5 MB+ Excel/JSON in the browser and keeps the bundle small.

## Design

- Modern, eye-catching, responsive (mobile first)
- Clean card-based layout, soft shadows, rounded corners
- Color system (added to `src/styles.css` design tokens):
  - Primary: NBR-inspired deep green (`oklch` token)
  - Accent: warm amber for highlights
  - Success / warning / muted states for result cards
- Typography: Inter for English, Noto Sans Bengali for বাংলা (Google Fonts, preconnect + display swap)
- Subtle gradient hero, animated number counter for stats, smooth result reveal
- Full dark mode
- Accessible: proper labels, focus rings, keyboard-friendly, ARIA on result card

## Bilingual System

- Lightweight `useI18n()` hook + `t(key)` function
- Strings stored in `src/i18n/{en,bn}.ts`
- Language toggle in header, persisted; `<html lang>` updated
- Numerals: option to render in Bengali digits (১২৩) when language = bn

## Tech Notes (for implementation)

- Routes: `src/routes/index.tsx`, `src/routes/notice.tsx`, `src/routes/about.tsx`
- Components: `SearchBox`, `ResultCard`, `StatsStrip`, `LanguageToggle`, `Header`, `Footer`, `Disclaimer`
- Data prep script: `scripts/build-data.mjs` runs once (using `xlsx` or `exceljs`) to emit the binary files into `public/data/`. Run during initial setup.
- Fetch with `fetch().then(r => r.arrayBuffer())`, parse into `BigUint64Array` + `Uint16Array`
- Binary search helper in `src/lib/tin-lookup.ts`
- TIN input: digits only, max 12, formatted as `XXX-XXX-XXXX` for readability
- SEO: per-route `head()` titles + descriptions (bilingual meta on home)

## Out of scope

- No backend, no database, no auth
- No data submission/edit
- No analytics by default

## Deliverables checklist

- [ ] Convert Excel → optimized binary data files in `public/data/`
- [ ] Bilingual i18n setup with toggle
- [ ] Search page with instant TIN lookup
- [ ] Notice page (PDF embed + link)
- [ ] About page
- [ ] Header, footer, disclaimer, theme tokens
- [ ] Mobile-responsive + dark mode polish
