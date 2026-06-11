# AI Project Inspiration Cards

A classroom presentation web app for turning AI project case studies into visual mission cards.

Production data flow:

```text
Feishu Base -> secure API layer -> classroom web app
```

## What This Builds

- A premium classroom-facing Mission Cards view.
- A project map that compares technical difficulty and social impact.
- A detail panel with Before / AI Move / Student Version framing.
- A Feishu Base sync layer with local demo-data fallback.

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

The frontend calls `/api/cards`. The serverless API fetches Feishu records, maps them into the `MissionCard` shape, and returns only classroom-ready card data.

Local fallback data lives in:

```text
src/data/cards.ts
```

The browser never receives `FEISHU_APP_SECRET`. Feishu credentials are read only by the backend/serverless function.

## Environment Variables

Create a Feishu custom app, grant it read access to Base/Bitable data, and add it as a collaborator to the Base document. Then set these variables in Vercel or your serverless host.

```bash
FEISHU_APP_ID=
FEISHU_APP_SECRET=
FEISHU_WIKI_NODE_TOKEN=SseOw4p1Oic3pMklLmWcvPsCncc
FEISHU_BASE_TABLE_ID=tblSPAUJLXOYlwYm
FEISHU_BASE_VIEW_ID=vewSPLHyWz
CARDS_CACHE_TTL_SECONDS=300
```

`FEISHU_WIKI_NODE_TOKEN` is the token after `/wiki/` in the current Feishu URL. If the Base later moves to a normal `/base/` URL, use `FEISHU_BASE_APP_TOKEN` instead.

`FEISHU_BASE_VIEW_ID` is optional but recommended. Use the `课堂展示` view ID so the website only reads the records meant for class.

Full Feishu setup notes:

```text
docs/feishu-api-setup.md
```

## Recommended Feishu Fields

See:

```text
docs/feishu-base-schema.md
```
