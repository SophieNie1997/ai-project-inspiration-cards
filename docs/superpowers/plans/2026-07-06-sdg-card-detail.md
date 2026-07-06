# SDG Card Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a click-to-reveal SDG answer inside each project detail modal.

**Architecture:** Keep SDG classification in `src/lib/sdg.ts` so the React modal only renders a button and answer panel. Use existing card fields and bilingual keyword rules instead of adding CSV columns.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, existing CSS modules in `src/App.css`.

---

## File Structure

- Create `src/lib/sdg.ts`: SDG goal metadata, bilingual keyword scoring, and `getCardSdgMatches(card, language)`.
- Create `src/lib/sdg.test.ts`: classifier tests for representative card themes and bilingual operation.
- Modify `src/lib/language.ts`: add SDG reveal labels to `SiteLabels`.
- Modify `src/lib/language.test.ts`: require the new SDG reveal label keys.
- Modify `src/App.tsx`: add the reveal component inside `CardDetailModal`.
- Modify `src/App.css`: style the button, badges, and responsive answer panel.

### Task 1: Failing Label Test

**Files:**
- Modify: `src/lib/language.test.ts`

- [ ] **Step 1: Add label keys to the required label test**

```ts
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
```

- [ ] **Step 2: Run the label test and verify it fails**

Run: `npm test -- src/lib/language.test.ts`

Expected: TypeScript or test failure because `SiteLabels` does not yet include the SDG reveal keys.

### Task 2: Failing SDG Classifier Test

**Files:**
- Create: `src/lib/sdg.test.ts`

- [ ] **Step 1: Add classifier behavior tests**

```ts
import { describe, expect, it } from 'vitest'
import { missionCards, type MissionCard } from '../data/cards'
import { getCardSdgMatches } from './sdg'

function cardWith(overrides: Partial<MissionCard>): MissionCard {
  return {
    ...missionCards[0],
    id: 'test-card',
    title: '测试项目',
    sourceProject: 'Test Project',
    theme: 'test',
    themeLabel: '测试主题',
    hook: '',
    problem: '',
    aiMove: '',
    studentProject: '',
    demoGoal: '',
    aiPowers: [],
    outputs: [],
    question: '',
    insight: '',
    ...overrides,
  }
}

describe('getCardSdgMatches', () => {
  it('connects education equity cards to SDG 4 and SDG 10', () => {
    const matches = getCardSdgMatches(missionCards[0], 'zh')
    expect(matches.map((match) => match.id)).toEqual(expect.arrayContaining([4, 10]))
    expect(matches[0].name).toMatch(/教育|不平等/)
  })

  it('works after card content is translated to English', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'AI Enrollment Policy Helper',
        themeLabel: 'Education Equity',
        problem: 'Immigrant families face language barriers when reading school policies.',
      }),
      'en',
    )
    expect(matches.map((match) => match.id)).toEqual(expect.arrayContaining([4, 10]))
    expect(matches[0].reason).toMatch(/[A-Za-z]/)
  })

  it('classifies water and irrigation projects under clean water', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'AI 灌溉助手',
        themeLabel: '农业科技',
        problem: '农场灌溉不精准，容易浪费水。',
      }),
      'zh',
    )
    expect(matches[0].id).toBe(6)
  })

  it('classifies conflict mediation projects under peace and justice', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'BridgeBot',
        themeLabel: '跨文化沟通',
        problem: '观点冲突和极化让青少年难以理解彼此。',
      }),
      'zh',
    )
    expect(matches[0].id).toBe(16)
  })

  it('classifies ocean projects under life below water', () => {
    const matches = getCardSdgMatches(
      cardWith({
        title: 'Ocean Plastic Tracker',
        themeLabel: '海洋保护',
        problem: 'Students track ocean plastic and marine wildlife risk.',
      }),
      'en',
    )
    expect(matches[0].id).toBe(14)
  })
})
```

- [ ] **Step 2: Run the classifier test and verify it fails**

Run: `npm test -- src/lib/sdg.test.ts`

Expected: FAIL because `src/lib/sdg.ts` does not exist yet.

### Task 3: Implement Classifier And Labels

**Files:**
- Create: `src/lib/sdg.ts`
- Modify: `src/lib/language.ts`

- [ ] **Step 1: Implement `getCardSdgMatches`**

Create SDG metadata for all 17 goals with `id`, `code`, localized names, color, localized reason, and weighted bilingual keywords. Build searchable text from existing `MissionCard` fields, score each goal, sort by score descending, return up to three matches, and fall back to SDG 9.

- [ ] **Step 2: Add label strings**

Add these keys to both `zh` and `en`: `sdgRevealButton`, `sdgRevealIntro`, `sdgRevealBadgeLabel`.

- [ ] **Step 3: Run targeted tests**

Run: `npm test -- src/lib/sdg.test.ts src/lib/language.test.ts`

Expected: PASS.

### Task 4: Add Modal UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`

- [ ] **Step 1: Add `SdgReveal` component**

Import `getCardSdgMatches`, compute matches in `CardDetailModal`, render a button with `aria-expanded`, and reveal compact SDG badges after click.

- [ ] **Step 2: Style the panel**

Add `.sdg-reveal`, `.sdg-trigger`, `.sdg-answer`, `.sdg-badge`, and responsive rules matching the existing modal surfaces.

- [ ] **Step 3: Run verification**

Run: `npm test -- src/lib/sdg.test.ts src/lib/language.test.ts`

Expected: PASS.

### Task 5: Final Verification

**Files:**
- Verify all modified files.

- [ ] **Step 1: Run full tests**

Run: `npm test`

Expected: all Vitest suites pass.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: no ESLint errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: TypeScript build and Vite build complete successfully.
