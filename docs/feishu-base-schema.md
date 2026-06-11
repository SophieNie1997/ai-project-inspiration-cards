# Feishu Base Schema

This table is the content backend for the classroom Mission Cards website.

Use Feishu Base rather than a plain spreadsheet so teachers can edit records, filter views, attach images, and keep stable record IDs.

## Table: AI Project Cases

| Field | Type | Purpose in Website |
|---|---|---|
| 项目名 | Text | Source project name, for reference and credibility. |
| 卡片标题 | Text | Short classroom-facing title shown on Mission Cards. |
| 年份 | Single select or number | Award year. |
| 赛道与奖项 | Text | Award category and prize level. |
| 学生年级 | Single select | Grade band, such as 高中 or 初中. |
| 主题标签 | Multi-select | Education, health, accessibility, culture, research, environment, startup. |
| 一句话钩子 | Text | The short hook under the card title. |
| 用户是谁 | Text | The group affected by the problem. |
| 解决的问题 | Long text | Before state: what problem exists now. |
| AI怎么介入 | Long text | AI Move: how AI helps. |
| 学生可改造项目 | Text | Student-friendly project version. |
| 6节课Demo目标 | Long text | What students can realistically build in a short course. |
| 使用的AI能力 | Multi-select | LLM, image recognition, translation, data analysis, recommendation, agent, etc. |
| 最终展示材料 | Multi-select | Demo, poster, pitch deck, data sheet, user test, video, bilingual script. |
| 课堂提问 | Text | Discussion question shown in the detail panel. |
| Teacher Note | Long text | Private teaching insight or explanation. |
| 难度 | Single select | 中, 中高, 高. |
| 社会影响分 | Number | 0-100 score used for map position. |
| 技术难度分 | Number | 0-100 score used for map position. |
| 信息完整度 | Single select | 高, 中高, 中, 待补. |
| 来源链接 | URL or long text | Official page, report, video, or article URL. |
| 是否课堂展示 | Checkbox | Controls whether the card appears in the classroom website. |
| 展示排序 | Number | Manual ordering for classroom flow. |
| 封面图/视觉提示 | Text or attachment | Image prompt, visual direction, or final card asset. |

## Teacher Views

Create at least four views in Feishu:

1. `课堂展示` filters `是否课堂展示 = true`, sorted by `展示排序`.
2. `待补证据` filters `信息完整度 = 待补` or empty source links.
3. `按主题` grouped by `主题标签`.
4. `学生改造方向` shows only fields needed for project selection.

## Website Mapping

The current frontend type is `MissionCard` in `src/data/cards.ts`.

Suggested mapping:

| Feishu Field | Frontend Property |
|---|---|
| 记录ID | `id` |
| 卡片标题 | `title` |
| 项目名 | `sourceProject` |
| 年份 | `year` |
| 赛道与奖项 | `award` |
| 主题标签 | `themeLabel` |
| 用户是谁 | `audience` |
| 一句话钩子 | `hook` |
| 解决的问题 | `problem` |
| AI怎么介入 | `aiMove` |
| 学生可改造项目 | `studentProject` |
| 6节课Demo目标 | `demoGoal` |
| 使用的AI能力 | `aiPowers` |
| 最终展示材料 | `outputs` |
| 课堂提问 | `question` |
| Teacher Note | `insight` |
| 难度 | `difficulty` |
| 社会影响分 | `impactScore` and map Y |
| 技术难度分 | `techScore` and map X |

## Sync Strategy

Start simple:

- Frontend calls `/api/cards`.
- Backend reads Feishu records.
- Backend caches the mapped JSON for 300 seconds.
- Teacher refreshes the classroom page before class.

After teachers start editing the Base frequently, add Feishu record-change events to invalidate the cache.
