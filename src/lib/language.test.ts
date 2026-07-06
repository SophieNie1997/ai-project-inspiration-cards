import { describe, expect, it } from 'vitest'
import { missionCards, type MissionCard } from '../data/cards'
import cardsPayload from '../../public/cards.json'
import {
  applyCardLanguage,
  getInitialLanguage,
  getMissingEnglishTranslationIds,
  isLanguage,
  languageLabels,
  setStoredLanguage,
  type Language,
} from './language'

describe('language helpers', () => {
  it('recognizes only supported site languages', () => {
    expect(isLanguage('zh')).toBe(true)
    expect(isLanguage('en')).toBe(true)
    expect(isLanguage('fr')).toBe(false)
    expect(isLanguage(null)).toBe(false)
  })

  it('persists the selected language with a safe Chinese fallback', () => {
    const storage = new Map<string, string>()
    const localStorageLike = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    }

    expect(getInitialLanguage(localStorageLike)).toBe('zh')
    setStoredLanguage('en', localStorageLike)
    expect(getInitialLanguage(localStorageLike)).toBe('en')
    storage.set('ai-project-cards-language', 'pirate')
    expect(getInitialLanguage(localStorageLike)).toBe('zh')
  })

  it('keeps Chinese cards unchanged and localizes known cards in English', () => {
    const card = missionCards[0]

    expect(applyCardLanguage(card, 'zh')).toBe(card)
    expect(applyCardLanguage(card, 'en')).toMatchObject({
      title: 'AI Enrollment Policy Helper for Thai Families',
      themeLabel: 'Education Equity',
      hook: 'Can AI turn confusing school policies into a parent-friendly checklist in their home language?',
      difficulty: 'Medium-High',
    })
    expect(applyCardLanguage(card, 'en').aiPowers).toEqual([
      'LLM',
      'Multilingual Translation',
      'Policy Explanation',
      'Email Drafting',
    ])
  })

  it('covers every published card with complete English content', () => {
    const publishedCards = (cardsPayload as { cards: MissionCard[] }).cards
    const missingIds = getMissingEnglishTranslationIds(publishedCards)

    expect(publishedCards.length).toBeGreaterThan(50)
    expect(missingIds).toEqual([])
    expect(
      publishedCards
        .map((card) => applyCardLanguage(card, 'en'))
        .every((card) => hasReadableEnglishCard(card)),
    ).toBe(true)
  })

  it('provides complete interface labels for both languages', () => {
    const requiredKeys = [
      'appName',
      'heroLineOne',
      'heroLineTwo',
      'themeAll',
      'sourceConnected',
      'sourceLocal',
      'cardCount',
      'themeCount',
      'galleryKicker',
      'galleryTitle',
      'mapTitle',
      'modalClose',
      'sourceLinkSingle',
      'publishTransfer',
      'sdgRevealButton',
      'sdgRevealIntro',
      'sdgRevealBadgeLabel',
      'detailProblem',
      'detailAiMove',
      'detailStudentBuild',
      'thinkPrompt',
      'projectTip',
    ] as const

    for (const language of ['zh', 'en'] satisfies Language[]) {
      for (const key of requiredKeys) {
        expect(languageLabels[language][key]).toBeTruthy()
      }
    }
  })
})

function hasReadableEnglishCard(card: MissionCard) {
  return [
    card.title,
    card.year,
    card.award,
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
    card.coverImageStatus,
    card.coverImageHint,
    ...card.aiPowers,
    ...card.outputs,
  ].every((value) => /[A-Za-z0-9]/.test(value ?? '') && !/[\u4e00-\u9fa5]/.test(value ?? ''))
}
