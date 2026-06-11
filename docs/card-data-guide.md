# Card Data Guide

The classroom website reads its live card data from generated JSON:

```text
public/cards.json
```

Teachers should edit in Feishu, then export CSV to:

```text
imports/cards.csv
```

Run this command to regenerate the website JSON:

```bash
npm run sync:cards
```

This keeps the deployed site independent from Feishu API permissions. Feishu remains the collaboration workspace; GitHub/Vercel handle the public classroom display.

## Feishu CSV Columns

Keep these columns in the Feishu export. The first group is the core classroom data:

| CSV Column | Required | Purpose |
|---|---|---|
| `展示排序` | Yes | Controls classroom order. |
| `是否课堂展示` | Yes | Use `是` to publish and `否` to hide. |
| `项目名` | Yes | Original WAICY/project case name. |
| `卡片标题` | Yes | Short classroom-facing card title. |
| `年份` | Yes | Award year. |
| `赛道与奖项` | Yes | Track and award. |
| `来源链接` | Yes | Original project, winner page, article, or video URL. Use `；`, `;`, or line breaks for multiple URLs; the detail modal shows one source button per URL. |
| `主题标签` | Yes | Chinese theme label shown in the UI. |
| `一句话钩子` | Yes | One-sentence card hook. |
| `用户是谁` | Yes | User group affected by the problem. |
| `解决的问题` | Yes | Before state: what real-life problem exists. |
| `AI怎么介入` | Yes | How AI enters the solution. |
| `学生可改造项目` | Yes | Student-friendly project adaptation. |
| `6节课Demo目标` | Yes | What students can build in a short course. |
| `使用的AI能力` | Yes | AI capabilities, separated by `、`, comma, or new lines. |
| `最终展示材料` | Yes | Final materials, separated by `、`, comma, or new lines. |
| `想一想` | Yes | Student-facing reflection prompt shown as `想一想`. |
| `项目小贴士` | Yes | Student-friendly action tip shown as `项目小贴士`. |
| `难度` | Yes | Use `中`, `中高`, or `高`. |
| `社会影响分` | Yes | 0-100 social impact score. |
| `技术难度分` | Yes | 0-100 technical difficulty score. |

These columns are optional but useful:

| CSV Column | Purpose |
|---|---|
| `卡片ID` | Stable lowercase ID. If empty, the script generates one from `项目名`. |
| `学生年级` | Kept in CSV for teacher filtering; currently not shown on the website. |
| `地图X` | Custom 0-100 project-map X position. Defaults to `技术难度分`. |
| `地图Y` | Custom 0-100 project-map Y position. Defaults to `社会影响分`. |
| `强调色` | Hex color used by the card. Defaults by theme. |

`科研健康` is accepted, but the converter normalizes it to `健康科研`.

## Update Workflow

1. Draft or revise card content in the teacher workspace.
2. Export CSV from Feishu.
3. Replace `imports/cards.csv`.
4. Run:

```bash
npm run sync:cards
```

5. Confirm the website looks right locally.
6. Publish:

```bash
npm run publish:cards
```

After push, Vercel redeploys the public classroom website automatically.

## Fallback Data

`src/data/cards.ts` is only a safety fallback for local development or JSON fetch failure. When making content edits, update `imports/cards.csv` first, then run `npm run sync:cards`.
