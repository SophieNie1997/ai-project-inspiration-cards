# Feishu API Setup

This project reads classroom cards from Feishu Base through a serverless API route.

## 1. Create a Feishu Custom App

In Feishu Open Platform, create a custom app and copy:

- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`

The app secret must stay in Vercel or another backend environment. Do not put it in frontend code.

## 2. Add API Permissions

Enable permissions for:

- Searching Base records: `base:record:retrieve`
- Reading Base data: `bitable:app:readonly`
- Resolving wiki nodes: `wiki:node:read`

After changing permissions, publish or release the app version as required by your Feishu tenant.

## 3. Grant Document Access

API permission is not always enough. The app identity also needs access to the specific Feishu document.

For the current wiki URL:

```text
https://dengding.feishu.cn/wiki/SseOw4p1Oic3pMklLmWcvPsCncc?table=tblSPAUJLXOYlwYm&view=vewSPLHyWz
```

Use:

```bash
FEISHU_WIKI_NODE_TOKEN=SseOw4p1Oic3pMklLmWcvPsCncc
FEISHU_BASE_TABLE_ID=tblSPAUJLXOYlwYm
FEISHU_BASE_VIEW_ID=vewSPLHyWz
```

If Feishu reports a permission error, add the custom app as a collaborator/member for the wiki document or knowledge space.

## 4. Configure Deployment Variables

Set these in Vercel Project Settings -> Environment Variables:

```bash
FEISHU_APP_ID=
FEISHU_APP_SECRET=
FEISHU_WIKI_NODE_TOKEN=SseOw4p1Oic3pMklLmWcvPsCncc
FEISHU_BASE_TABLE_ID=tblSPAUJLXOYlwYm
FEISHU_BASE_VIEW_ID=vewSPLHyWz
CARDS_CACHE_TTL_SECONDS=300
```

If you have a direct `/base/` URL, set `FEISHU_BASE_APP_TOKEN` instead of `FEISHU_WIKI_NODE_TOKEN`.

## 5. How Sync Works

The website loads `/api/cards`.

The API route:

1. Requests a `tenant_access_token` with `FEISHU_APP_ID` and `FEISHU_APP_SECRET`.
2. Resolves `FEISHU_WIKI_NODE_TOKEN` into the real Base `app_token` when needed.
3. Searches records from the configured table and view.
4. Maps Feishu fields into visual mission-card data.
5. Returns JSON to the browser.

If the API fails or credentials are missing, the classroom UI falls back to the local demo cards.

## Official API References

- Tenant access token: https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal
- Wiki node lookup: https://open.feishu.cn/document/server-docs/docs/wiki-v2/space-node/get_node
- Search Base records: https://open.feishu.cn/document/docs/bitable-v1/app-table-record/search
