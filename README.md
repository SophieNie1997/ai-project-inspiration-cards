# AI Project Inspiration Cards

A classroom presentation web app for turning AI project case studies into visual mission cards.

Production data flow:

```text
Feishu teacher sheet -> imports/cards.csv -> public/cards.json -> GitHub -> Vercel -> classroom web app
```

## What This Builds

- A premium classroom-facing Mission Cards view.
- A project map that compares technical difficulty and social impact.
- A detail panel with Before / AI Move / Student Version framing.
- A Feishu-exported CSV publishing flow with GitHub-hosted JSON output.

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run lint
npm run build
```

## Data Source

The frontend loads classroom cards from the generated JSON file:

```text
public/cards.json
```

The teacher-editable import file is:

```text
imports/cards.csv
```

Because both files are committed to GitHub, Vercel can deploy the data as static assets. This avoids Feishu API permissions, app review, API secrets, and classroom-time third-party access issues.

Local fallback data lives in:

```text
src/data/cards.ts
```

Use the fallback only as a safety copy. The classroom-facing source of truth is `public/cards.json`.

## Updating Cards

1. Teachers edit and review cards in Feishu.
2. Export the Feishu table as CSV.
3. Replace `imports/cards.csv` with the exported CSV.
4. Run:

```bash
npm run sync:cards
```

5. Preview locally or run verification.
6. Commit and push to `main`.

For one-command publishing from CSV to the live website:

```bash
npm run publish:cards
```

This command regenerates `public/cards.json`, runs tests/lint/build, commits `imports/cards.csv` and `public/cards.json`, then pushes to GitHub. Vercel redeploys after the push.

## Card Schema

See:

```text
docs/card-data-guide.md
```
