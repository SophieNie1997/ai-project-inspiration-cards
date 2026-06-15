import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('publish-cards script', () => {
  it('publishes language translations with card data', () => {
    const source = readFileSync(new URL('./publish-cards.mjs', import.meta.url), 'utf8')

    expect(source).toContain('src/lib/language.ts')
    expect(source).toContain('src/lib/language.test.ts')
  })
})
