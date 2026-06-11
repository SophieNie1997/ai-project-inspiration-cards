# AI Project Inspiration Cards

A classroom presentation web app for turning AI project case studies into visual mission cards.

Production data flow:

```text
Teacher draft sheet -> public/cards.json -> GitHub -> Vercel -> classroom web app
```

## What This Builds

- A premium classroom-facing Mission Cards view.
- A project map that compares technical difficulty and social impact.
- A detail panel with Before / AI Move / Student Version framing.
- A GitHub-hosted JSON data source with local demo-data fallback.

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

The frontend loads classroom cards from:

```text
public/cards.json
```

Because this file is committed to GitHub, Vercel can deploy it as a static asset. This avoids Feishu API permissions, app review, API secrets, and classroom-time third-party access issues.

Local fallback data lives in:

```text
src/data/cards.ts
```

Use the fallback only as a safety copy. The classroom-facing source of truth is `public/cards.json`.

## Updating Cards

1. Edit `public/cards.json`.
2. Run the verification commands.
3. Commit and push to `main`.
4. Vercel redeploys the website automatically.

```bash
npm test
npm run lint
npm run build
```

You can still use Feishu, Excel, or Google Sheets as the teacher editing workspace. Export or copy finalized rows into `public/cards.json` before class.

## Card Schema

See:

```text
docs/card-data-guide.md
```
