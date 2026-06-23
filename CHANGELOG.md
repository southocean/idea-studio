# Changelog — idea-studio (app repo)

- Made by Nam's Cowork assistant. Claude Code: pull latest, read this to catch up. App rules in CLAUDE.md.

## 2026-06-23

- Added **A–B story slider** to the idea card (`#ab`, `.abrange`; 0–100 range input).
  - 0 = pure A (plot / twists / page-turner); 100 = pure B (emotional / little happens); ~50 = balanced, most film-adaptable.
  - Live label `#abval` via `abDesc(v)`; caption explains the film-fit framing.
  - Added `setAB(o,v)` (snapshot → set `o.abScore` → `mark`); slider `oninput` updates label, `onchange` saves.
- Added **"Choice — the story's central decision"** field (`#choice`, `.choicebox`): editable text input under the story fields, before `<hr>`; saves on `change` (sets `o.choice`, `o._m`, `o.reviewed`, `schedulePush`).
- Added CSS: `.abwrap`, `.abrange`, `.ablabels`, `.abcap`, `.choicebox` (+ dark-mode variant).
- Defined `abDesc(v)` and `setAB(o,v)` next to `setScore`.
- Changed CSV export (`#cfgCsv`) to include `abScore` and `choice` columns.
- Bumped `sw.js` cache name `idea-studio-v1` → `idea-studio-v2`.
- No changes to sync layer, PWA manifest, or icons.
- Reads new data fields `abScore` (int 0–100) and `choice` (string) from `ideas_data.json` in the private `idea-studio-data` repo; defaults gracefully if absent.
