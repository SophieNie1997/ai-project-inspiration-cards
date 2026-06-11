# Card Data Guide

The classroom website reads its live card data from:

```text
public/cards.json
```

This keeps the deployed site independent from Feishu API permissions. Teachers can still draft and review content in Feishu, Excel, or Google Sheets, then copy the finalized content into JSON before class.

## File Shape

`cards.json` must contain one top-level object with a `cards` array:

```json
{
  "cards": [
    {
      "id": "sfusd-thai-family-liaison",
      "title": "让新生家庭看懂学校"
    }
  ]
}
```

Each card should include all fields used by the UI:

| Field | Type | Purpose |
|---|---|---|
| `id` | string | Stable lowercase ID. Use letters, numbers, and hyphens. |
| `title` | string | Short classroom-facing card title. |
| `sourceProject` | string | Original WAICY/project case name. |
| `year` | string | Award year. |
| `award` | string | Track and award. |
| `theme` | string | Internal theme key, such as `education`, `culture`, `accessibility`, `health`, or `research`. |
| `themeLabel` | string | Chinese theme label shown in the UI. |
| `audience` | string | User group affected by the problem. |
| `hook` | string | One-sentence card hook. |
| `problem` | string | Before state: what real-life problem exists. |
| `aiMove` | string | How AI enters the solution. |
| `studentProject` | string | Student-friendly project adaptation. |
| `demoGoal` | string | What students can build in a short course. |
| `aiPowers` | string[] | AI capabilities used. |
| `outputs` | string[] | Final classroom/demo materials. |
| `question` | string | Discussion prompt for class. |
| `insight` | string | Teacher note shown in the detail panel. |
| `difficulty` | string | Use `中`, `中高`, or `高`. |
| `impactScore` | number | 0-100 social impact score. |
| `techScore` | number | 0-100 technical difficulty score. |
| `mapX` | number | 0-100 map X position. |
| `mapY` | number | 0-100 map Y position. |
| `accent` | string | Hex color used by the card. |

## Update Workflow

1. Draft or revise card content in the teacher workspace.
2. Copy finalized rows into `public/cards.json`.
3. Keep valid JSON syntax: double quotes, no trailing commas.
4. Run:

```bash
npm test
npm run lint
npm run build
```

5. Commit and push to `main`.

After push, Vercel redeploys the public classroom website.

## Fallback Data

`src/data/cards.ts` is only a safety fallback for local development or JSON fetch failure. When making content edits, update `public/cards.json` first.
