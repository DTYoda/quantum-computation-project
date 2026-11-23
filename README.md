# Quantum Atlas

A Next.js course guide for CMU 15-455, built from the author's six-tab quantum complexity transcript.

## Run locally

Use `npm ci` to install the locked dependencies, then `npm run dev`. Open the local address printed by Next.js. For the production build, run `npm run build`, `npm run typecheck`, then `npm start`.

## Finish the project

Read [the author handoff](AUTHOR-HANDOFF.md) for the rubric review and outstanding writing.

Edit `content/chapters.json` for lesson text. Each chapter has a slug, title, topic line and ordered sections. Each section has a stable ID used by links. Each paragraph is a separate block. Put inline LaTeX between single dollar signs and a display equation between double dollar signs. In JSON strings, a LaTeX backslash is written twice. A block beginning with “Definition:” receives definition styling. Keep the widget markers when editing surrounding text.

The unfinished motivation chapter currently has no sections. Give it a section with an ID, heading and paragraph blocks to replace its placeholder automatically. Replace the main proof’s `@unfinished` block with your continuation. The references are in `app/references/page.tsx`. The original planning outline remains in `content/site.ts`.
