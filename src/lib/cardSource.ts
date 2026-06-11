import type { MissionCard } from '../data/cards'

export type CardsResponse = {
  cards: MissionCard[]
  source: 'feishu' | 'local'
}

type ApiCardsResponse = {
  cards?: MissionCard[]
  source?: string
}

export async function loadMissionCards(
  fallbackCards: MissionCard[],
  fetchImpl: typeof fetch = fetch,
): Promise<CardsResponse> {
  try {
    const response = await fetchImpl('/api/cards')
    if (!response.ok) {
      throw new Error(`Cards API returned ${response.status}`)
    }

    const payload = (await response.json()) as ApiCardsResponse
    if (!Array.isArray(payload.cards) || payload.cards.length === 0) {
      throw new Error('Cards API returned no cards')
    }

    return { cards: payload.cards, source: 'feishu' }
  } catch {
    return { cards: fallbackCards, source: 'local' }
  }
}
