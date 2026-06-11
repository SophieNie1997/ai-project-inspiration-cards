import { describe, expect, it } from 'vitest'
import { missionCards } from '../data/cards'
import { loadMissionCards } from './cardSource'

describe('loadMissionCards', () => {
  it('uses cards from the GitHub-hosted JSON file when the request succeeds', async () => {
    const requestedUrls: string[] = []
    const result = await loadMissionCards(missionCards, async (url) => {
      requestedUrls.push(String(url))
      return new Response(
        JSON.stringify({
          cards: [
            {
              ...missionCards[0],
              id: 'from-json',
              title: 'GitHub JSON 数据',
            },
          ],
        }),
        { status: 200 },
      )
    })

    expect(requestedUrls).toEqual(['/cards.json'])
    expect(result.source).toBe('github-json')
    expect(result.cards).toHaveLength(1)
    expect(result.cards[0].title).toBe('GitHub JSON 数据')
  })

  it('falls back to local cards when the API is unavailable', async () => {
    const result = await loadMissionCards(missionCards, async () => {
      return new Response('not found', { status: 404 })
    })

    expect(result.source).toBe('local')
    expect(result.cards).toBe(missionCards)
  })
})
