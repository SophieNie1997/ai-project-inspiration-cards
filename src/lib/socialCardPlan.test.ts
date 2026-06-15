import { describe, expect, it } from 'vitest'
import { missionCards } from '../data/cards'
import { buildPublishCardPlan } from './socialCardPlan'

describe('buildPublishCardPlan', () => {
  it('compresses a mission card into a classroom/social-card preview plan', () => {
    const plan = buildPublishCardPlan(missionCards[0], 1)

    expect(plan.issue).toBe('MISSION 01')
    expect(plan.title).toBe(missionCards[0].title)
    expect(plan.promise).toBe(missionCards[0].hook)
    expect(plan.evidenceLabel).toBe('真实项目')
    expect(plan.evidence).toBe(missionCards[0].sourceProject)
    expect(plan.transferPrompt).toBe(missionCards[0].studentProject)
    expect(plan.classroomQuestion).toBe(missionCards[0].question)
    expect(plan.publishAngles).toEqual([
      '问题场景',
      'AI动作',
      '学生改造',
    ])
  })

  it('uses English preview labels when the site language is English', () => {
    const plan = buildPublishCardPlan(missionCards[0], 1, 'en')

    expect(plan.issue).toBe('MISSION 01')
    expect(plan.evidenceLabel).toBe('Real Project')
    expect(plan.publishAngles).toEqual([
      'Problem Setting',
      'AI Move',
      'Student Build',
    ])
  })
})
