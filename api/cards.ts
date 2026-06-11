import { fetchFeishuMissionCards } from '../src/lib/feishuClient.js'

type ApiRequest = {
  method?: string
}

type ApiResponse = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const cards = await fetchFeishuMissionCards()
    response.setHeader(
      'cache-control',
      `s-maxage=${process.env.CARDS_CACHE_TTL_SECONDS ?? '300'}, stale-while-revalidate=60`,
    )
    response.status(200).json({ cards, source: 'feishu' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Feishu API error'
    response.status(500).json({ error: message, source: 'feishu' })
  }
}
