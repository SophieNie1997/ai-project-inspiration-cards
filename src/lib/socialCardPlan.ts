import type { MissionCard } from '../data/cards'

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

export function buildPublishCardPlan(card: MissionCard, index: number): PublishCardPlan {
  return {
    issue: `MISSION ${String(index).padStart(2, '0')}`,
    title: card.title,
    promise: card.hook,
    evidenceLabel: card.coverImage ? '项目截图' : '真实项目',
    evidence: card.coverImageSource || card.sourceProject,
    transferPrompt: card.studentProject,
    classroomQuestion: card.question,
    publishAngles: ['问题场景', 'AI动作', '学生改造'],
  }
}
