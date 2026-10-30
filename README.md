# Quantum Computation Project

## Change the text

Open **content/site.ts**. All website text is in this one file.

- `title`: the website name at the top and in the browser tab.
- Each page's `title`: its heading.
- `navigationLabel`: its name in the navigation.
- `body`: your writing, between the two backticks. Leave it empty until you are ready.

Write directly between the backticks. Press Enter for a new line; blank lines and bullet characters (•) appear as written. This is plain text, not Markdown or HTML. Quotes and apostrophes are fine inside the body. If you need a literal backtick, write \`; if you need literal ${, write \${.

To add a page, copy one complete object in `sections` and give it a unique `slug`. To remove a page, delete its object. Navigation updates automatically. A slug sets the URL, such as `/section-1`.

## See your changes

```sh
npm install
npm run dev
```

Open http://localhost:3000. Save your edits to see them update automatically. If a production preview is already using port 3000, use the alternate local URL printed by the dev server.

## Styles

Edit `app/globals.css` to change the appearance. No React layout changes are needed for text edits.

## Build and deploy

```sh
npm run build
npm run typecheck
```

Import the repository into Vercel with the Next.js preset and default settings. No environment variables are required. Published changes require a new deployment.
