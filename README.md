# AI Project Inspiration Cards

A classroom presentation web app for turning AI project case studies into visual mission cards.

The first version uses local TypeScript data so the visual language and field model can be shaped quickly. The intended production flow is:

```text
Feishu Base -> secure API layer -> classroom web app
```

## What This Builds

- A premium classroom-facing Mission Cards view.
- A project map that compares technical difficulty and social impact.
- A detail panel with Before / AI Move / Student Version framing.
- A data model that can later be mapped to Feishu Base records.

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

## Data Source

Current demo data lives in:

```text
src/data/cards.ts
```

When Feishu is connected, keep the browser app free of secrets. The frontend should call a serverless API route or backend service, and that backend should read Feishu using environment variables.

## Feishu Integration Plan

Recommended first production version:

1. Teachers edit records in Feishu Base.
2. Backend fetches records from Feishu Base using `app_token` and `table_id`.
3. Backend maps Feishu field names into the `MissionCard` shape.
4. Frontend renders the mapped cards.
5. Cache for 1-5 minutes, with a manual refresh button for class prep.

Realtime sync through Feishu record-change events can be added later after the content workflow is stable.

## Recommended Feishu Fields

See:

```text
docs/feishu-base-schema.md
```
