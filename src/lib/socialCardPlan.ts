import type { MissionCard } from '../data/cards'
import type { Language } from './language'

export type PublishCardPlan = {
  issue: string
  title: string
  promise: string
  evidenceLabel: string
  evidence: string
  transferPrompt: string
  classroomQuestion: string
  publishAngles: string[]
}

const planLabels: Record<Language, Pick<PublishCardPlan, 'evidenceLabel' | 'publishAngles'>> = {
  zh: {
    evidenceLabel: '真实项目',
    publishAngles: ['问题场景', 'AI动作', '学生改造'],
  },
  en: {
    evidenceLabel: 'Real Project',
    publishAngles: ['Problem Setting', 'AI Move', 'Student Build'],
  },
}

export function buildPublishCardPlan(
  card: MissionCard,
  index: number,
  language: Language = 'zh',
): PublishCardPlan {
  const labels = planLabels[language]

  return {
    issue: `MISSION ${String(index).padStart(2, '0')}`,
    title: card.title,
    promise: card.hook,
    evidenceLabel: card.coverImage
      ? language === 'zh'
        ? '项目截图'
        : 'Project Screenshot'
      : labels.evidenceLabel,
    evidence: card.coverImageSource || card.sourceProject,
    transferPrompt: card.studentProject,
    classroomQuestion: card.question,
    publishAngles: labels.publishAngles,
  }
}
