import { describe, expect, it } from 'vitest'
import { missionCards } from '../data/cards'
import { loadMissionCards } from './cardSource'

describe('loadMissionCards', () => {
  it('uses cards from the API when the request succeeds', async () => {
    const result = await loadMissionCards(missionCards, async () => {
      return new Response(
        JSON.stringify({
          cards: [
            {
              ...missionCards[0],
              id: 'from-feishu',
              title: '飞书数据',
            },
          ],
          source: 'feishu',
        }),
        { status: 200 },
      )
    })

    expect(result.source).toBe('feishu')
    expect(result.cards).toHaveLength(1)
    expect(result.cards[0].title).toBe('飞书数据')
  })

  it('falls back to local cards when the API is unavailable', async () => {
    const result = await loadMissionCards(missionCards, async () => {
      return new Response('not found', { status: 404 })
    })

    expect(result.source).toBe('local')
    expect(result.cards).toBe(missionCards)
  })
})
