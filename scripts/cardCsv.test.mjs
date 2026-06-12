import { describe, expect, it } from 'vitest'
import { convertCsvToCards, parseCsv } from './cardCsv.mjs'

describe('parseCsv', () => {
  it('handles quoted commas, escaped quotes, and new lines', () => {
    const rows = parseCsv('项目名,解决的问题\n"Alpha, Beta","第一行\n第二行 ""quoted"""')

    expect(rows).toEqual([
      {
        项目名: 'Alpha, Beta',
        解决的问题: '第一行\n第二行 "quoted"',
      },
    ])
  })
})

describe('convertCsvToCards', () => {
  it('maps Feishu-exported Chinese headers into sorted mission cards', () => {
    const cards = convertCsvToCards(`展示排序,是否课堂展示,卡片ID,项目名,卡片标题,年份,赛道与奖项,来源链接,主题标签,一句话钩子,用户是谁,解决的问题,AI怎么介入,学生可改造项目,6节课Demo目标,使用的AI能力,最终展示材料,课堂提问,项目小贴士,难度,社会影响分,技术难度分,地图X,地图Y,强调色
2,否,hidden,Hidden Project,不展示,2025,Award,https://example.com/hidden,教育公平,hook,audience,problem,ai,student,demo,LLM,Demo,question,note,中,10,20,30,40,#000000
1,是,computerpreter,Computerpreter,让沟通不再卡住,2025,High School AI Showcase 5th Place,https://example.com/computerpreter,无障碍科技,把手势变成文字,听障人士,沟通不便,视觉识别手势,校园无障碍沟通助手,识别8个常用手势,"计算机视觉、手势识别","Demo、词典",校园里还有谁被排除在外,技术公益要降低生活门槛,高,90,86,82,82,#7cc7ff
3,是,,Pain Calculator,让科研测量更客观,2024,Gold Award,https://example.com/pain,科研健康,从测量问题切入,科研人员,主观偏差,图像标注和模型比较,运动恢复观察助手,采集小样本做分类,"图像识别, 数据分析","项目Demo, 研究海报",想发现什么健康信号,小问题也能产生深价值,高,80,92,,,`)

    expect(cards).toHaveLength(2)
    expect(cards[0]).toMatchObject({
      id: 'computerpreter',
      title: '让沟通不再卡住',
      sourceProject: 'Computerpreter',
      sourceUrl: 'https://example.com/computerpreter',
      sourceUrls: ['https://example.com/computerpreter'],
      theme: 'accessibility',
      themeLabel: '无障碍科技',
      difficulty: '高',
      impactScore: 90,
      techScore: 86,
      mapX: 82,
      mapY: 82,
      accent: '#7cc7ff',
    })
    expect(cards[0].aiPowers).toEqual(['计算机视觉', '手势识别'])
    expect(cards[0].outputs).toEqual(['Demo', '词典'])
    expect(cards[1]).toMatchObject({
      id: 'pain-calculator',
      theme: 'research',
      themeLabel: '健康科研',
      mapX: 92,
      mapY: 80,
    })
  })

  it('accepts student-facing prompt column aliases', () => {
    const cards = convertCsvToCards(`展示排序,是否课堂展示,项目名,卡片标题,年份,赛道与奖项,想一想,项目小贴士,主题标签,一句话钩子,用户是谁,解决的问题,AI怎么介入,学生可改造项目,6节课Demo目标,使用的AI能力,最终展示材料,难度,社会影响分,技术难度分
1,是,Campus Helper,校园助手,2026,Award,你想帮谁解决哪件小事？,先从一个真实场景开始。,教育公平,hook,audience,problem,ai,student,demo,LLM,Demo,中,50,40`)

    expect(cards[0].question).toBe('你想帮谁解决哪件小事？')
    expect(cards[0].insight).toBe('先从一个真实场景开始。')
  })

  it('splits multiple source URLs from one CSV cell', () => {
    const cards = convertCsvToCards(`展示排序,是否课堂展示,项目名,卡片标题,年份,赛道与奖项,来源链接,主题标签,一句话钩子,用户是谁,解决的问题,AI怎么介入,学生可改造项目,6节课Demo目标,使用的AI能力,最终展示材料,想一想,项目小贴士,难度,社会影响分,技术难度分
1,是,Open Calendar,好运日历,2026,Award,https://example.com/a；https://github.com/demo/project;https://example.com/c,教育公平,hook,audience,problem,ai,student,demo,LLM,Demo,question,tip,中,50,40`)

    expect(cards[0].sourceUrl).toBe('https://example.com/a')
    expect(cards[0].sourceUrls).toEqual([
      'https://example.com/a',
      'https://github.com/demo/project',
      'https://example.com/c',
    ])
  })

  it('maps real project image fields without treating visual hints as image paths', () => {
    const cards = convertCsvToCards(`展示排序,是否课堂展示,项目名,卡片标题,年份,赛道与奖项,来源链接,主题标签,一句话钩子,用户是谁,解决的问题,AI怎么介入,学生可改造项目,6节课Demo目标,使用的AI能力,最终展示材料,想一想,项目小贴士,难度,社会影响分,技术难度分,封面图路径,封面图描述,封面图来源,封面图授权,封面图状态,封面图/视觉提示
1,是,Open Calendar,好运日历,2026,Award,https://example.com/open-calendar,AI硬件,hook,audience,problem,ai,student,demo,LLM,Demo,question,tip,中,50,40,/images/cards/open-calendar.webp,Open Calendar 项目原型截图,GitHub README,项目公开截图，课堂引用,已确认,桌面打印机吐出每日好运签
2,是,No Image,无图案例,2026,Award,https://example.com/no-image,教育公平,hook,audience,problem,ai,student,demo,LLM,Demo,question,tip,中,50,40,,无图描述,,,待补图,学校服务台、多语言文件卡片`)

    expect(cards[0]).toMatchObject({
      coverImage: '/images/cards/open-calendar.webp',
      coverImageAlt: 'Open Calendar 项目原型截图',
      coverImageSource: 'GitHub README',
      coverImageCredit: '项目公开截图，课堂引用',
      coverImageStatus: '已确认',
      coverImageHint: '桌面打印机吐出每日好运签',
    })
    expect(cards[1]).not.toHaveProperty('coverImage')
    expect(cards[1].coverImageAlt).toBe('无图描述')
    expect(cards[1].coverImageStatus).toBe('待补图')
    expect(cards[1].coverImageHint).toBe('学校服务台、多语言文件卡片')
  })
})
