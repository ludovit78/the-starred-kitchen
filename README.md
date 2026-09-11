# The Starred Kitchen

Personal vegan/raw cookbook app — **Vite + React + TypeScript + Tailwind**. Static data only (no backend). Works on desktop and iPhone (Add to Home Screen).

## Features

- Home hero, featured recipes, category chips
- Search + filters (starred, category, full recipe, nutrition)
- Recipe detail with checklist, method, nutrition estimates
- Favorites in localStorage
- Meal photos for full recipes
- HashRouter + relative assets for static hosting / PWA

## Run locally

```bash
bun install   # or: npm install
bun run dev   # or: npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```bash
bun run build
bun run preview
```

Or double-click `Open-Starred-Kitchen.command` (Mac) / `Open-Starred-Kitchen.bat` (Windows) after building — they serve the `dist` folder.

## GitHub Pages

On push to `main`, Actions builds and deploys. Enable **Settings → Pages → Source: GitHub Actions** once if the site URL is not live yet.

## Data

- `public/data/recipes.json` — recipe catalog
- `public/images/` — cover, chapters, meal photos

Nutrition values are estimates per serving.
