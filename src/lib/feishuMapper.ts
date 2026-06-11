import type { MissionCard } from '../data/cards'

export type FeishuRecord = {
  record_id?: string
  fields?: Record<string, unknown>
}

const themeMeta: Record<string, Pick<MissionCard, 'theme' | 'accent'>> = {
  教育公平: { theme: 'education', accent: '#2ee6a6' },
  文化保护: { theme: 'culture', accent: '#ffb45c' },
  无障碍科技: { theme: 'accessibility', accent: '#7cc7ff' },
  健康管理: { theme: 'health', accent: '#ff6f91' },
  科研健康: { theme: 'research', accent: '#d8f05f' },
  健康科研: { theme: 'research', accent: '#d8f05f' },
  科研: { theme: 'research', accent: '#d8f05f' },
  环保: { theme: 'environment', accent: '#8bdc65' },
  创业工具: { theme: 'startup', accent: '#b59cff' },
}

const validDifficulties = new Set(['中', '中高', '高'])

export function mapFeishuRecordToMissionCard(record: FeishuRecord): MissionCard {
  const fields = record.fields ?? {}
  const themeLabel = firstValue(fields.主题标签, '教育公平')
  const scores = {
    impact: numberValue(fields.社会影响分, 50),
    tech: numberValue(fields.技术难度分, 50),
  }
  const meta = themeMeta[themeLabel] ?? themeMeta.教育公平

  return {
    id: textValue(record.record_id, slugify(textValue(fields.项目名, textValue(fields.卡片标题, 'untitled-card')))),
    title: textValue(fields.卡片标题, textValue(fields.项目名, '未命名项目')),
    sourceProject: textValue(fields.项目名, 'Unknown Project'),
    year: textValue(fields.年份, ''),
    award: textValue(fields.赛道与奖项, ''),
    theme: meta.theme,
    themeLabel,
    audience: textValue(fields.用户是谁, ''),
    hook: textValue(fields.一句话钩子, ''),
    problem: textValue(fields.解决的问题, ''),
    aiMove: textValue(fields.AI怎么介入, ''),
    studentProject: textValue(fields.学生可改造项目, ''),
    demoGoal: textValue(fields['6节课Demo目标'], ''),
    aiPowers: listValue(fields.使用的AI能力),
    outputs: listValue(fields.最终展示材料),
    question: textValue(fields.课堂提问, ''),
    insight: textValue(fields['Teacher Note'], ''),
    difficulty: difficultyValue(fields.难度),
    impactScore: scores.impact,
    techScore: scores.tech,
    mapX: scores.tech,
    mapY: scores.impact,
    accent: meta.accent,
  }
}

export function mapFeishuRecordsToMissionCards(records: FeishuRecord[]): MissionCard[] {
  return records
    .filter((record) => booleanValue(record.fields?.是否课堂展示, true))
    .sort((a, b) => numberValue(a.fields?.展示排序, 999) - numberValue(b.fields?.展示排序, 999))
    .map(mapFeishuRecordToMissionCard)
}

function textValue(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string') return value.trim() || fallback
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    const text = value.map((item) => textValue(item, '')).filter(Boolean).join('')
    return text || fallback
  }
  if (typeof value === 'object') {
    const candidate = value as Record<string, unknown>
    return textValue(
      candidate.text ??
        candidate.name ??
        candidate.value ??
        candidate.url ??
        candidate.link ??
        candidate.title,
      fallback,
    )
  }
  return fallback
}

function listValue(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => textValue(item, '')).filter(Boolean)
  }
  return textValue(value, '')
    .split(/[,，、]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function firstValue(value: unknown, fallback: string): string {
  return listValue(value)[0] ?? fallback
}

function numberValue(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const parsed = Number(textValue(value, ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

function difficultyValue(value: unknown): '中' | '中高' | '高' {
  const valueText = textValue(value, '中')
  return validDifficulties.has(valueText) ? (valueText as '中' | '中高' | '高') : '中'
}

function booleanValue(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value
  const valueText = textValue(value, '').toLowerCase()
  if (['true', 'yes', '1', '是', '勾选'].includes(valueText)) return true
  if (['false', 'no', '0', '否', '未勾选'].includes(valueText)) return false
  return fallback
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
}
