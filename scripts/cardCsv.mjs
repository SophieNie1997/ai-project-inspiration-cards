const themeMeta = {
  教育公平: { theme: 'education', accent: '#2ee6a6' },
  文化保护: { theme: 'culture', accent: '#ffb45c' },
  无障碍科技: { theme: 'accessibility', accent: '#7cc7ff' },
  健康管理: { theme: 'health', accent: '#ff6f91' },
  健康科研: { theme: 'research', accent: '#d8f05f' },
  科研健康: { theme: 'research', accent: '#d8f05f', normalizedLabel: '健康科研' },
  科研: { theme: 'research', accent: '#d8f05f', normalizedLabel: '健康科研' },
  环保: { theme: 'environment', accent: '#8bdc65' },
  创业工具: { theme: 'startup', accent: '#b59cff' },
}

const validDifficulties = new Set(['中', '中高', '高'])

export function parseCsv(csvText) {
  const rows = []
  let row = []
  let cell = ''
  let insideQuotes = false

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index]
    const nextChar = csvText[index + 1]

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"'
        index += 1
      } else if (char === '"') {
        insideQuotes = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      insideQuotes = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  row.push(cell)
  rows.push(row)

  const [headerRow, ...dataRows] = rows.filter((items) => items.some((item) => item.trim()))
  if (!headerRow) return []

  const headers = headerRow.map((header) => header.trim().replace(/^\uFEFF/, ''))
  return dataRows.map((items) => {
    const record = {}
    headers.forEach((header, index) => {
      record[header] = (items[index] ?? '').trim()
    })
    return record
  })
}

export function convertCsvToCards(csvText) {
  return parseCsv(csvText)
    .filter((row) => booleanValue(row.是否课堂展示, true))
    .sort((a, b) => numberValue(a.展示排序, 999) - numberValue(b.展示排序, 999))
    .map((row, index) => rowToCard(row, index + 1))
}

export function cardsToJson(cards) {
  return `${JSON.stringify({ cards }, null, 2)}\n`
}

function rowToCard(row, displayOrder) {
  const title = textValue(row.卡片标题, textValue(row.项目名, '未命名项目'))
  const sourceProject = textValue(row.项目名, title)
  const sourceUrls = sourceUrlList(
    firstExistingValue(row, ['来源链接', '项目链接', 'sourceUrl', 'Source URL']),
  )
  const coverImage = imagePathValue(
    firstExistingValue(row, ['封面图路径', '封面图链接', '封面图URL', '图片路径', '图片链接', 'coverImage']),
  )
  const coverImageAlt = firstContentValue(row, ['封面图描述', '图片描述', 'coverImageAlt'])
  const coverImageSource = textValue(
    firstExistingValue(row, ['封面图来源', '图片来源', 'coverImageSource']),
    '',
  )
  const coverImageCredit = textValue(
    firstExistingValue(row, ['封面图授权', '图片授权', '图片署名', 'coverImageCredit']),
    '',
  )
  const coverImageHint = firstContentValue(row, ['封面图/视觉提示', '视觉提示', '图片提示', 'coverImageHint'])
  const themeLabel = normalizeThemeLabel(firstValue(row.主题标签, '教育公平'))
  const meta = themeMeta[themeLabel] ?? themeMeta.教育公平
  const impactScore = numberValue(row.社会影响分, 50)
  const techScore = numberValue(row.技术难度分, 50)

  return {
    id: textValue(row.卡片ID, slugify(sourceProject || title || `card-${displayOrder}`)),
    title,
    sourceProject,
    ...(sourceUrls.length ? { sourceUrl: sourceUrls[0], sourceUrls } : {}),
    ...(coverImage ? { coverImage } : {}),
    ...(coverImageAlt ? { coverImageAlt } : {}),
    ...(coverImageSource ? { coverImageSource } : {}),
    ...(coverImageCredit ? { coverImageCredit } : {}),
    coverImageStatus: textValue(
      firstExistingValue(row, ['封面图状态', '图片状态', 'coverImageStatus']),
      coverImage ? '已确认' : '待补图',
    ),
    ...(coverImageHint ? { coverImageHint } : {}),
    year: textValue(row.年份, ''),
    award: textValue(row.赛道与奖项, ''),
    theme: meta.theme,
    themeLabel,
    audience: textValue(row.用户是谁, ''),
    hook: textValue(row.一句话钩子, ''),
    problem: textValue(row.解决的问题, ''),
    aiMove: textValue(row.AI怎么介入, ''),
    studentProject: textValue(row.学生可改造项目, ''),
    demoGoal: textValue(row['6节课Demo目标'], ''),
    aiPowers: listValue(row.使用的AI能力),
    outputs: listValue(row.最终展示材料),
    question: firstContentValue(row, ['想一想', '课堂提问', 'question']),
    insight: firstContentValue(row, ['项目小贴士', 'insight']),
    difficulty: difficultyValue(row.难度),
    impactScore,
    techScore,
    mapX: numberValue(row.地图X, techScore),
    mapY: numberValue(row.地图Y, impactScore),
    accent: textValue(row.强调色, meta.accent),
  }
}

function textValue(value, fallback) {
  if (value === null || value === undefined) return fallback
  const normalized = String(value).trim()
  return normalized || fallback
}

function firstValue(value, fallback) {
  return listValue(value)[0] ?? fallback
}

function firstExistingValue(row, keys) {
  for (const key of keys) {
    const value = row[key]
    if (textValue(value, '')) return value
  }
  return ''
}

function firstContentValue(row, keys) {
  for (const key of keys) {
    const value = textValue(row[key], '')
    if (value && !isPlaceholderUrl(value)) return value
  }
  return ''
}

function isPlaceholderUrl(value) {
  return /^https?:\/\/?$/i.test(value) || /^https?:\/\/\S+/i.test(value)
}

function listValue(value) {
  return textValue(value, '')
    .split(/[,，、;；\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function sourceUrlList(value) {
  return textValue(value, '')
    .split(/[;；\n\r]+/)
    .map((item) => item.trim())
    .filter((item) => /^https?:\/\//i.test(item))
}

function imagePathValue(value) {
  const normalized = textValue(value, '')
  if (!normalized) return ''
  if (/^https?:\/\//i.test(normalized)) return normalized
  if (normalized.startsWith('/')) return normalized
  if (/^images\//i.test(normalized)) return `/${normalized}`
  if (/\.(avif|webp|png|jpe?g|gif|svg)$/i.test(normalized)) return normalized
  return ''
}

function numberValue(value, fallback) {
  const normalized = textValue(value, '')
  if (!normalized) return fallback
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : fallback
}

function booleanValue(value, fallback) {
  const normalized = textValue(value, '').toLowerCase()
  if (['true', 'yes', '1', '是', '已勾选', 'checked'].includes(normalized)) return true
  if (['false', 'no', '0', '否', '未勾选', 'unchecked'].includes(normalized)) return false
  return fallback
}

function difficultyValue(value) {
  const normalized = textValue(value, '中')
  return validDifficulties.has(normalized) ? normalized : '中'
}

function normalizeThemeLabel(value) {
  const normalized = textValue(value, '教育公平')
  return themeMeta[normalized]?.normalizedLabel ?? normalized
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
}
