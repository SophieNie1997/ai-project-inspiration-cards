import { describe, expect, it } from 'vitest'
import { missionCards, type MissionCard } from '../data/cards'
import { getCardSdgMatches } from './sdg'

function cardWith(overrides: Partial<MissionCard>): MissionCard {
  return {
    ...missionCards[0],
    id: 'test-card',
    title: '测试项目',
    sourceProject: 'Test Project',
    theme: 'test',
    themeLabel: '测试主题',
    hook: '',
    problem: '',
    aiMove: '',
    studentProject: '',
    demoGoal: '',
    aiPowers: [],
    outputs: [],
    question: '',
    insight: '',
    ...overrides,
  }
}

describe('getCardSdgMatches', () => {
  it('connects education equity cards to SDG 4 and SDG 10', () => {
    const matches = getCardSdgMatches(missionCards[0], 'zh')

    expect(matches.map((match) => match.id)).toEqual(expect.arrayContaining([4, 10]))
    expect(matches[0].name).toMatch(/教育|不平等/)
  })

  it('works after card content is translated to English', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'AI Enrollment Policy Helper',
        themeLabel: 'Education Equity',
        problem: 'Immigrant families face language barriers when reading school policies.',
      }),
      'en',
    )

    expect(matches.map((match) => match.id)).toEqual(expect.arrayContaining([4, 10]))
    expect(matches[0].reason).toMatch(/[A-Za-z]/)
  })

  it('classifies water and irrigation projects under clean water', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'AI 灌溉助手',
        themeLabel: '农业科技',
        problem: '农场灌溉不精准，容易浪费水。',
      }),
      'zh',
    )

    expect(matches[0].id).toBe(6)
  })

  it('classifies conflict mediation projects under peace and justice', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'BridgeBot',
        themeLabel: '跨文化沟通',
        problem: '观点冲突和极化让青少年难以理解彼此。',
      }),
      'zh',
    )

    expect(matches[0].id).toBe(16)
  })

  it('classifies ocean projects under life below water', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'Ocean Plastic Tracker',
        themeLabel: '海洋保护',
        problem: 'Students track ocean plastic and marine wildlife risk.',
      }),
      'en',
    )

    expect(matches[0].id).toBe(14)
  })
})
