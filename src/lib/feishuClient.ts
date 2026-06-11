import { mapFeishuRecordsToMissionCards, type FeishuRecord } from './feishuMapper.js'

type FeishuEnv = Partial<{
  FEISHU_APP_ID: string
  FEISHU_APP_SECRET: string
  FEISHU_BASE_APP_TOKEN: string
  FEISHU_WIKI_NODE_TOKEN: string
  FEISHU_BASE_TABLE_ID: string
  FEISHU_BASE_VIEW_ID: string
}>

declare const process: { env: FeishuEnv } | undefined

type FetchFeishuMissionCardsOptions = {
  fetchImpl?: typeof fetch
  env?: FeishuEnv
}

type FeishuApiResponse<T> = {
  code: number
  msg?: string
  data?: T
}

type TenantTokenResponse = FeishuApiResponse<unknown> & {
  tenant_access_token?: string
}

type RecordsResponse = {
  items?: FeishuRecord[]
  has_more?: boolean
  page_token?: string
}

type WikiNodeResponse = {
  node?: {
    obj_token?: string
    obj_type?: string
  }
}

const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis'

export async function fetchFeishuMissionCards({
  fetchImpl = fetch,
  env = readProcessEnv(),
}: FetchFeishuMissionCardsOptions = {}) {
  const config = getConfig(env)
  const token = await getTenantAccessToken(fetchImpl, config)
  const appToken = await resolveAppToken(fetchImpl, config, token)
  const records = await searchRecords(fetchImpl, config, token, appToken)
  return mapFeishuRecordsToMissionCards(records)
}

function getConfig(env: FeishuEnv) {
  const config = {
    appId: env.FEISHU_APP_ID,
    appSecret: env.FEISHU_APP_SECRET,
    appToken: env.FEISHU_BASE_APP_TOKEN,
    wikiNodeToken: env.FEISHU_WIKI_NODE_TOKEN,
    tableId: env.FEISHU_BASE_TABLE_ID,
    viewId: env.FEISHU_BASE_VIEW_ID,
  }

  if (!config.appId || !config.appSecret || !config.tableId || (!config.appToken && !config.wikiNodeToken)) {
    throw new Error(
      'Missing Feishu environment variables: FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_BASE_TABLE_ID, and either FEISHU_BASE_APP_TOKEN or FEISHU_WIKI_NODE_TOKEN',
    )
  }

  return config
}

async function getTenantAccessToken(
  fetchImpl: typeof fetch,
  config: ReturnType<typeof getConfig>,
): Promise<string> {
  const response = await fetchImpl(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      app_id: config.appId,
      app_secret: config.appSecret,
    }),
  })
  const body = (await response.json()) as TenantTokenResponse

  if (!response.ok || body.code !== 0 || !body.tenant_access_token) {
    throw new Error(`Feishu tenant token request failed: ${body.msg ?? response.statusText}`)
  }

  return body.tenant_access_token
}

async function resolveAppToken(
  fetchImpl: typeof fetch,
  config: ReturnType<typeof getConfig>,
  tenantToken: string,
): Promise<string> {
  if (config.appToken) return config.appToken
  if (!config.wikiNodeToken) {
    throw new Error('Missing Feishu wiki node token')
  }

  const url = new URL(`${FEISHU_API_BASE}/wiki/v2/spaces/get_node`)
  url.searchParams.set('token', config.wikiNodeToken)

  const response = await fetchImpl(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tenantToken}`,
    },
  })
  const body = (await response.json()) as FeishuApiResponse<WikiNodeResponse>
  const node = body.data?.node

  if (!response.ok || body.code !== 0 || !node?.obj_token) {
    throw new Error(`Feishu wiki node request failed: ${body.msg ?? response.statusText}`)
  }

  if (node.obj_type !== 'bitable') {
    throw new Error(`Feishu wiki node is ${node.obj_type ?? 'unknown'}, not bitable`)
  }

  return node.obj_token
}

async function searchRecords(
  fetchImpl: typeof fetch,
  config: ReturnType<typeof getConfig>,
  tenantToken: string,
  appToken: string,
): Promise<FeishuRecord[]> {
  const records: FeishuRecord[] = []
  let pageToken: string | undefined

  do {
    const url = new URL(
      `${FEISHU_API_BASE}/bitable/v1/apps/${appToken}/tables/${config.tableId}/records/search`,
    )
    url.searchParams.set('page_size', '500')
    if (pageToken) url.searchParams.set('page_token', pageToken)

    const response = await fetchImpl(url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tenantToken}`,
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(config.viewId ? { view_id: config.viewId } : {}),
    })
    const body = (await response.json()) as FeishuApiResponse<RecordsResponse>

    if (!response.ok || body.code !== 0 || !body.data) {
      throw new Error(`Feishu records request failed: ${body.msg ?? response.statusText}`)
    }

    records.push(...(body.data.items ?? []))
    pageToken = body.data.has_more ? body.data.page_token : undefined
  } while (pageToken)

  return records
}

function readProcessEnv(): FeishuEnv {
  if (typeof process === 'undefined') return {}
  return process.env
}
