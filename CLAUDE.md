# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (localhost:5173) with HMR
npm run build     # Build production bundle to dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint with strict zero-warnings enforcement
npm run deploy    # Build and deploy to GitHub Pages
```

No test framework is configured.

## Architecture

This is a React 18 + Vite + Tailwind CSS prototype for the Hong Kong International Academy of Policing (HKIAP). It deploys as a static site to GitHub Pages at `fungzyui.github.io/hkiap-prototype` (base path `/hkiap-prototype/` in `vite.config.js`).

### Single-File App

The entire application lives in `src/App.jsx` (~677 lines). All components are defined as nested functions within that file — there is no component separation. State is managed with React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) — no external state library.

### Navigation / Views

Tab-based navigation controlled by `activeTab` state. Views:
- `home` — Hero carousel, animated stats, course previews, events
- `courses` — Full course catalog
- `events` — Events calendar
- `about` / `contact` — Placeholder pages
- `registration` — Login form + course application form with CSV export

### Data

All data (`COURSES`, `EVENTS`, `HERO_SLIDES`, `STATS`) is hardcoded as arrays at the top of `App.jsx`. Images are from Unsplash. There is no backend or API — this is a client-side-only prototype. Application submissions are stored in local React state and exportable as CSV.

### Custom Hooks

- `useCountUp()` — Animates numeric statistics counting up
- `useInView()` — Intersection Observer wrapper for scroll-triggered animations

### Styling

- **Tailwind CSS** with extensive custom theme in `tailwind.config.js`: navy/gold/ivory color palettes, custom fonts (Playfair Display for display, DM Sans for body), 10+ custom keyframe animations, and custom shadow utilities.
- **`src/index.css`** — Tailwind base/components/utilities layers, CSS custom properties, glass morphism utilities, gradient mesh backgrounds.
- **`src/App.css`** — Component-specific styles for hero, navbar, cards, forms; includes SVG noise texture and backdrop-filter effects.
- Google Fonts loaded via `<link>` in `index.html`.
