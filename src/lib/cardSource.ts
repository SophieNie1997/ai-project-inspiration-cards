import type { MissionCard } from '../data/cards'

export type CardsResponse = {
  cards: MissionCard[]
  source: 'github-json' | 'local'
}

type ApiCardsResponse = {
  cards?: MissionCard[]
}

export async function loadMissionCards(
  fallbackCards: MissionCard[],
  fetchImpl: typeof fetch = fetch,
): Promise<CardsResponse> {
  try {
    const response = await fetchImpl('/cards.json')
    if (!response.ok) {
      throw new Error(`Cards JSON returned ${response.status}`)
    }

    const payload = (await response.json()) as ApiCardsResponse
    if (!Array.isArray(payload.cards) || payload.cards.length === 0) {
      throw new Error('Cards API returned no cards')
    }

    return { cards: payload.cards, source: 'github-json' }
  } catch {
    return { cards: fallbackCards, source: 'local' }
  }
}
