import type { MissionCard } from '../data/cards'
import type { Language } from './language'

export type SdgMatch = {
  id: number
  code: string
  name: string
  color: string
  reason: string
  score: number
}

type WeightedKeyword = {
  term: string
  weight: number
}

type SdgGoal = {
  id: number
  code: string
  color: string
  names: Record<Language, string>
  reasons: Record<Language, string>
  keywords: WeightedKeyword[]
}

const maxSdgMatches = 3

const sdgGoals: SdgGoal[] = [
  {
    id: 1,
    code: 'SDG 1',
    color: '#e5243b',
    names: { zh: '消除贫困', en: 'No Poverty' },
    reasons: {
      zh: '这个项目帮助弱势群体获得更稳定的基本支持。',
      en: 'This project supports more stable basic services for vulnerable groups.',
    },
    keywords: weighted(['贫困', '低收入', '基本生活', '救助', 'poverty', 'low income', 'basic needs', 'aid'], 3),
  },
  {
    id: 2,
    code: 'SDG 2',
    color: '#dda63a',
    names: { zh: '零饥饿', en: 'Zero Hunger' },
    reasons: {
      zh: '这个项目与农业、营养或食物供应有关。',
      en: 'This project connects to agriculture, nutrition, or food access.',
    },
    keywords: weighted(['饥饿', '食物供应', '粮食', '农业', '农场', '营养', 'hunger', 'food access', 'agriculture', 'farm', 'nutrition'], 2),
  },
  {
    id: 3,
    code: 'SDG 3',
    color: '#4c9f38',
    names: { zh: '良好健康与福祉', en: 'Good Health and Well-being' },
    reasons: {
      zh: '这个项目关注身体健康、心理健康或安全照护。',
      en: 'This project focuses on health, well-being, or safer care.',
    },
    keywords: weighted(['健康', '心理', '情绪', '医疗', '急救', '睡眠', '照护', 'health', 'mental health', 'emotion', 'medical', 'emergency', 'sleep', 'care'], 3),
  },
  {
    id: 4,
    code: 'SDG 4',
    color: '#c5192d',
    names: { zh: '优质教育', en: 'Quality Education' },
    reasons: {
      zh: '这个项目让学习、入学信息或教育资源更容易被理解和使用。',
      en: 'This project makes learning, enrollment, or education resources easier to understand and use.',
    },
    keywords: [
      ...weighted(['教育公平', 'education equity'], 5),
      ...weighted(['教育', '学习', '入学', '学校政策', '课堂', '阅读障碍', 'education', 'learning', 'enrollment', 'school policies', 'classroom', 'literacy'], 3),
      ...weighted(['学校', 'school'], 2),
    ],
  },
  {
    id: 5,
    code: 'SDG 5',
    color: '#ff3a21',
    names: { zh: '性别平等', en: 'Gender Equality' },
    reasons: {
      zh: '这个项目与性别公平或女孩、女性机会有关。',
      en: 'This project supports gender equity or opportunities for girls and women.',
    },
    keywords: weighted(['性别', '女孩', '女性', 'gender', 'girls', 'women'], 3),
  },
  {
    id: 6,
    code: 'SDG 6',
    color: '#26bde2',
    names: { zh: '清洁饮水和卫生设施', en: 'Clean Water and Sanitation' },
    reasons: {
      zh: '这个项目帮助更好地管理水资源、灌溉或卫生问题。',
      en: 'This project improves water, irrigation, or sanitation decisions.',
    },
    keywords: [
      ...weighted(['清洁饮水', '卫生设施', 'clean water', 'sanitation'], 5),
      ...weighted(['浪费水', '灌溉', '水资源', 'water waste', 'irrigation', 'water resource'], 4),
      ...weighted(['水', 'water'], 2),
    ],
  },
  {
    id: 7,
    code: 'SDG 7',
    color: '#fcc30b',
    names: { zh: '经济适用的清洁能源', en: 'Affordable and Clean Energy' },
    reasons: {
      zh: '这个项目与能源使用、节能或清洁能源有关。',
      en: 'This project relates to energy use, efficiency, or clean energy.',
    },
    keywords: weighted(['能源', '节能', '电力', '太阳能', 'energy', 'electricity', 'solar'], 3),
  },
  {
    id: 8,
    code: 'SDG 8',
    color: '#a21942',
    names: { zh: '体面工作和经济增长', en: 'Decent Work and Economic Growth' },
    reasons: {
      zh: '这个项目支持创业、工作效率或更好的经济机会。',
      en: 'This project supports entrepreneurship, productivity, or better economic opportunity.',
    },
    keywords: weighted(['创业', '工作', '就业', '小企业', '效率', 'entrepreneurship', 'work', 'jobs', 'small business', 'productivity'], 3),
  },
  {
    id: 9,
    code: 'SDG 9',
    color: '#fd6925',
    names: { zh: '产业、创新和基础设施', en: 'Industry, Innovation and Infrastructure' },
    reasons: {
      zh: '这个项目用技术创新解决真实问题，可以作为 SDG 讨论的基础入口。',
      en: 'This project uses technical innovation to solve a real problem, which makes SDG 9 a useful discussion entry point.',
    },
    keywords: weighted(['创新', '基础设施', '硬件', '交通', '编程', 'innovation', 'infrastructure', 'hardware', 'transport', 'coding'], 3),
  },
  {
    id: 10,
    code: 'SDG 10',
    color: '#dd1367',
    names: { zh: '减少不平等', en: 'Reduced Inequalities' },
    reasons: {
      zh: '这个项目帮助语言、能力、身份或资源不同的人获得更公平的机会。',
      en: 'This project helps people with different languages, abilities, identities, or resources access fairer opportunities.',
    },
    keywords: [
      ...weighted(['减少不平等', '无障碍', '听障', '手语', '少数语言', '语言障碍', 'language barriers', 'reduced inequalities', 'accessibility', 'sign language'], 5),
      ...weighted(['移民', '包容', '多语言', '翻译', 'immigrant', 'inclusion', 'multilingual', 'translation', 'disability'], 3),
      ...weighted(['公平', 'equity'], 2),
    ],
  },
  {
    id: 11,
    code: 'SDG 11',
    color: '#fd9d24',
    names: { zh: '可持续城市和社区', en: 'Sustainable Cities and Communities' },
    reasons: {
      zh: '这个项目改善社区、城市、交通或公共服务体验。',
      en: 'This project improves communities, cities, transportation, or public services.',
    },
    keywords: weighted(['城市', '社区', '交通安全', '公共服务', '老人照护', 'city', 'community', 'traffic safety', 'public service', 'elder care'], 3),
  },
  {
    id: 12,
    code: 'SDG 12',
    color: '#bf8b2e',
    names: { zh: '负责任消费和生产', en: 'Responsible Consumption and Production' },
    reasons: {
      zh: '这个项目减少浪费，或帮助人们做出更负责任的消费与生产选择。',
      en: 'This project reduces waste or supports more responsible consumption and production choices.',
    },
    keywords: weighted(['浪费', '回收', '食品安全', '消费', '生产', 'waste', 'recycling', 'food safety', 'consumption', 'production'], 3),
  },
  {
    id: 13,
    code: 'SDG 13',
    color: '#3f7e44',
    names: { zh: '气候行动', en: 'Climate Action' },
    reasons: {
      zh: '这个项目帮助人们理解、适应或缓解气候相关风险。',
      en: 'This project helps people understand, adapt to, or reduce climate-related risks.',
    },
    keywords: weighted(['气候', '碳', '热岛', '极端天气', 'climate', 'carbon', 'heat island', 'extreme weather'], 4),
  },
  {
    id: 14,
    code: 'SDG 14',
    color: '#0a97d9',
    names: { zh: '水下生物', en: 'Life Below Water' },
    reasons: {
      zh: '这个项目关注海洋生态、水下生命或海洋污染。',
      en: 'This project focuses on ocean ecosystems, marine life, or water pollution.',
    },
    keywords: weighted(['海洋保护', '海洋', '水下', 'marine', 'ocean', 'life below water', 'plastic tracker'], 5),
  },
  {
    id: 15,
    code: 'SDG 15',
    color: '#56c02b',
    names: { zh: '陆地生物', en: 'Life on Land' },
    reasons: {
      zh: '这个项目保护陆地生态、动物福利或生物多样性。',
      en: 'This project protects land ecosystems, animal welfare, or biodiversity.',
    },
    keywords: weighted(['动物福利', '动物', '宠物', '森林', '生物多样性', '野生动物', 'animal welfare', 'animal', 'pet', 'forest', 'biodiversity', 'wildlife'], 3),
  },
  {
    id: 16,
    code: 'SDG 16',
    color: '#00689d',
    names: { zh: '和平、正义与强大机构', en: 'Peace, Justice and Strong Institutions' },
    reasons: {
      zh: '这个项目帮助减少冲突、误解或制度信息不透明带来的风险。',
      en: 'This project helps reduce conflict, misunderstanding, or risks caused by unclear systems.',
    },
    keywords: [
      ...weighted(['冲突', '极化', '误解', '和平', '正义', '政策解释', 'conflict', 'polarization', 'misunderstanding', 'peace', 'justice', 'policy explanation'], 4),
      ...weighted(['跨文化沟通', 'cross-cultural communication'], 3),
    ],
  },
  {
    id: 17,
    code: 'SDG 17',
    color: '#19486a',
    names: { zh: '促进目标实现的伙伴关系', en: 'Partnerships for the Goals' },
    reasons: {
      zh: '这个项目需要多方合作，或帮助不同组织一起行动。',
      en: 'This project depends on partnership or helps different groups coordinate action.',
    },
    keywords: weighted(['合作', '伙伴', '协作', '组织', 'partnership', 'collaboration', 'coordinate', 'organization'], 3),
  },
]

export function getCardSdgMatches(card: MissionCard, language: Language): SdgMatch[] {
  const searchableText = buildSearchableText(card)
  const scoredGoals = sdgGoals
    .map((goal) => ({ goal, score: scoreGoal(goal, searchableText) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.goal.id - right.goal.id)
    .slice(0, maxSdgMatches)

  const matches = scoredGoals.length
    ? scoredGoals
    : [{ goal: getGoalById(9), score: 1 }]

  return matches.map(({ goal, score }) => ({
    id: goal.id,
    code: goal.code,
    name: goal.names[language],
    color: goal.color,
    reason: goal.reasons[language],
    score,
  }))
}

function weighted(terms: string[], weight: number): WeightedKeyword[] {
  return terms.map((term) => ({ term, weight }))
}

function buildSearchableText(card: MissionCard) {
  return [
    card.id,
    card.title,
    card.sourceProject,
    card.theme,
    card.themeLabel,
    card.audience,
    card.hook,
    card.problem,
    card.aiMove,
    card.studentProject,
    card.demoGoal,
    card.question,
    card.insight,
    card.coverImageAlt,
    card.coverImageSource,
    card.coverImageHint,
    ...card.aiPowers,
    ...card.outputs,
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase()
}

function scoreGoal(goal: SdgGoal, searchableText: string) {
  return goal.keywords.reduce((score, keyword) => {
    return searchableText.includes(keyword.term.toLocaleLowerCase())
      ? score + keyword.weight
      : score
  }, 0)
}

function getGoalById(goalId: number) {
  const goal = sdgGoals.find(({ id }) => id === goalId)
  if (!goal) throw new Error(`Missing SDG goal ${goalId}`)
  return goal
}
