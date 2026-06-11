import { describe, expect, it } from 'vitest'
import { fetchFeishuMissionCards } from './feishuClient'

describe('fetchFeishuMissionCards', () => {
  it('fetches Feishu records with a tenant token and maps visible cards', async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = []
    const fetchImpl: typeof fetch = async (url, init) => {
      calls.push({ url: String(url), init })

      if (String(url).includes('/tenant_access_token/internal')) {
        return responseJson({
          code: 0,
          tenant_access_token: 'tenant-token',
          expire: 7200,
        })
      }

      if (String(url).includes('/records/search')) {
        expect(init?.headers).toMatchObject({
          Authorization: 'Bearer tenant-token',
        })
        expect(init?.method).toBe('POST')
        expect(init?.body).toBe(JSON.stringify({ view_id: 'view-id' }))
        return responseJson({
          code: 0,
          data: {
            has_more: false,
            items: [
              {
                record_id: 'rec-visible',
                fields: {
                  项目名: 'Computerpreter',
                  卡片标题: '让沟通不再卡住',
                  主题标签: ['无障碍科技'],
                  是否课堂展示: true,
                  展示排序: 1,
                },
              },
              {
                record_id: 'rec-hidden',
                fields: {
                  项目名: 'Hidden Project',
                  卡片标题: '不要展示',
                  主题标签: ['教育公平'],
                  是否课堂展示: false,
                  展示排序: 2,
                },
              },
            ],
          },
        })
      }

      throw new Error(`Unexpected URL: ${url}`)
    }

    const cards = await fetchFeishuMissionCards({
      fetchImpl,
      env: {
        FEISHU_APP_ID: 'app-id',
        FEISHU_APP_SECRET: 'app-secret',
        FEISHU_BASE_APP_TOKEN: 'base-token',
        FEISHU_BASE_TABLE_ID: 'table-id',
        FEISHU_BASE_VIEW_ID: 'view-id',
      },
    })

    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({
      id: 'rec-visible',
      title: '让沟通不再卡住',
      themeLabel: '无障碍科技',
    })
    expect(calls[1].url).toContain('/bitable/v1/apps/base-token/tables/table-id/records/search')
    expect(calls[1].url).toContain('page_size=500')
  })

  it('resolves a wiki node token into the real Base app token', async () => {
    const calls: string[] = []
    const fetchImpl: typeof fetch = async (url) => {
      calls.push(String(url))

      if (String(url).includes('/tenant_access_token/internal')) {
        return responseJson({
          code: 0,
          tenant_access_token: 'tenant-token',
          expire: 7200,
        })
      }

      if (String(url).includes('/wiki/v2/spaces/get_node')) {
        return responseJson({
          code: 0,
          data: {
            node: {
              obj_type: 'bitable',
              obj_token: 'resolved-base-token',
            },
          },
        })
      }

      if (String(url).includes('/records/search')) {
        return responseJson({
          code: 0,
          data: {
            has_more: false,
            items: [
              {
                record_id: 'rec-wiki',
                fields: {
                  项目名: 'Wiki Project',
                  主题标签: ['教育公平'],
                  是否课堂展示: true,
                },
              },
            ],
          },
        })
      }

      throw new Error(`Unexpected URL: ${url}`)
    }

    await fetchFeishuMissionCards({
      fetchImpl,
      env: {
        FEISHU_APP_ID: 'app-id',
        FEISHU_APP_SECRET: 'app-secret',
        FEISHU_WIKI_NODE_TOKEN: 'wiki-token',
        FEISHU_BASE_TABLE_ID: 'table-id',
      },
    })

    expect(calls[1]).toContain('/wiki/v2/spaces/get_node')
    expect(calls[1]).toContain('token=wiki-token')
    expect(calls[2]).toContain('/bitable/v1/apps/resolved-base-token/tables/table-id/records/search')
  })

  it('throws a clear error when required environment variables are missing', async () => {
    await expect(
      fetchFeishuMissionCards({
        fetchImpl: async () => responseJson({ code: 0 }),
        env: {},
      }),
    ).rejects.toThrow('Missing Feishu environment variables')
  })
})

function responseJson(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
