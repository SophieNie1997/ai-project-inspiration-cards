import { describe, expect, it } from 'vitest'
import { mapFeishuRecordToMissionCard } from './feishuMapper'

describe('mapFeishuRecordToMissionCard', () => {
  it('maps Feishu fields into a classroom mission card', () => {
    const card = mapFeishuRecordToMissionCard({
      record_id: 'rec123',
      fields: {
        项目名: 'SFUSD Thai Family Liaison',
        卡片标题: '让新生家庭看懂学校',
        年份: 2025,
        赛道与奖项: 'High School AI Large Language Model Gold Award',
        学生年级: '高中',
        主题标签: ['教育公平'],
        一句话钩子: '把复杂的学校制度翻译成家长能行动的下一步。',
        用户是谁: '新生家庭、转学学生、少数语言家长',
        解决的问题: '泰语移民家庭在理解学区信息时会遇到语言和制度双重障碍。',
        AI怎么介入: '用LLM做多语言问答、政策解释和邮件模板生成。',
        学生可改造项目: '国际学校新生家庭AI助手',
        '6节课Demo目标': '做出一个可对话的中英双语校园助手。',
        使用的AI能力: ['LLM问答', '多语言翻译', '信息检索'],
        最终展示材料: ['Demo', '数据表', '用户测试'],
        课堂提问: '学校里有没有一类信息，对新生或家长来说特别难懂？',
        'Teacher Note': 'LLM项目的价值在于理解用户场景。',
        难度: '中',
        社会影响分: 92,
        技术难度分: 58,
        信息完整度: '高',
        是否课堂展示: true,
        展示排序: 1,
        '封面图/视觉提示': '学校地图、聊天气泡、语言切换图标',
      },
    })

    expect(card).toMatchObject({
      id: 'rec123',
      title: '让新生家庭看懂学校',
      sourceProject: 'SFUSD Thai Family Liaison',
      year: '2025',
      award: 'High School AI Large Language Model Gold Award',
      theme: 'education',
      themeLabel: '教育公平',
      audience: '新生家庭、转学学生、少数语言家长',
      hook: '把复杂的学校制度翻译成家长能行动的下一步。',
      studentProject: '国际学校新生家庭AI助手',
      difficulty: '中',
      impactScore: 92,
      techScore: 58,
      mapX: 58,
      mapY: 92,
      accent: '#2ee6a6',
    })
    expect(card.aiPowers).toEqual(['LLM问答', '多语言翻译', '信息检索'])
    expect(card.outputs).toEqual(['Demo', '数据表', '用户测试'])
  })

  it('normalizes comma-separated Feishu cell text for multi-value fields', () => {
    const card = mapFeishuRecordToMissionCard({
      record_id: 'rec456',
      fields: {
        项目名: 'Pain Calculator',
        卡片标题: '让科研测量更客观',
        主题标签: '健康科研',
        使用的AI能力: '图像识别, 数据分析',
        最终展示材料: 'Demo, 海报, 数据表',
        难度: '高',
        社会影响分: '80',
        技术难度分: '92',
      },
    })

    expect(card.themeLabel).toBe('健康科研')
    expect(card.theme).toBe('research')
    expect(card.aiPowers).toEqual(['图像识别', '数据分析'])
    expect(card.outputs).toEqual(['Demo', '海报', '数据表'])
    expect(card.impactScore).toBe(80)
    expect(card.techScore).toBe(92)
  })
})
