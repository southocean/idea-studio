# Idea Studio — APP repo (public)

A book-idea review tool. This **public** repo hosts only the app shell (no idea data).
Served free via **GitHub Pages** at `https://southocean.github.io/idea-studio/`.

## Files
- `index.html` — the entire app: a single self-contained file (vanilla JS + inline CSS). No build step.
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA (installable, offline). Bump the cache name in `sw.js` on each release or users get stale versions.
- The ideas live in the SEPARATE PRIVATE repo `idea-studio-data` (file `ideas_data.json`), read/written by the app via the GitHub Contents API using a user token entered in the app's ⚙ Settings (never committed).

## Hard rules when editing the app
- Keep it ONE self-contained `index.html` — no external libraries, no bundlers, no frameworks. This is what lets it deploy on Pages and run offline.
- Do NOT embed idea data in `index.html` (privacy — this repo is public).
- Preserve the persistence layer: localStorage cache (`ideastudio_data`), GitHub sync via Contents API, per-idea `_m` timestamp merge (`mergeById`), and the offline-safe `schedulePush`/`pull` flow.
- Mobile matters (commute use): keep the responsive drawer (`@media max-width:820px`) and large tap targets.
- After changing `sw.js`-cached assets, update the SW cache version so the PWA fetches the new build.

## Workflow
- **App/UI/behavior changes** are made directly in this `index.html` (by Claude Code, or by Nam's request to Claude).
- Nam publishes via Claude Code: commit + push → GitHub Pages redeploys automatically.
- Data/clustering/scoring-logic changes are NOT done here — see the `idea-studio-data` repo.
