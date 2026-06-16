import type { MissionCard } from '../data/cards'

export type Language = 'zh' | 'en'

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>

export type SiteLabels = {
  appName: string
  languageToggleLabel: string
  heroLineOne: string
  heroLineTwo: string
  heroBody: string
  themeAll: string
  sourceConnected: string
  sourceLocal: string
  cardCount: string
  themeCount: string
  galleryKicker: string
  galleryTitle: string
  themeFiltersLabel: string
  missionCardsLabel: string
  viewCardLabel: (title: string) => string
  difficultyPrefix: string
  classroomQuestion: string
  mapKicker: string
  mapTitle: string
  mapBody: string
  mapLabel: string
  impactAxis: string
  zoneProjectCount: (count: number) => string
  collapse: string
  expandMore: (count: number) => string
  emptyZone: string
  modalClose: string
  modalIndexLabel: (index: string) => string
  sourceLinksLabel: string
  sourceLinkSingle: string
  sourceLinkMultiple: (index: number) => string
  fallbackImageStatus: string
  fallbackImageLabel: string
  fallbackImageSource: string
  fallbackImageHint: string
  publishPreviewLabel: string
  publishProjectLabel: string
  publishTransfer: string
  projectionKicker: string
  projectionTitle: string
  evidenceLayer: string
  detailProblem: string
  detailAiMove: string
  detailStudentBuild: string
  detailAudience: string
  detailStudentProject: string
  detailOutputs: string
  thinkPrompt: string
  projectTip: string
}

type CardTranslation = Partial<
  Pick<
    MissionCard,
    | 'title'
    | 'sourceProject'
    | 'year'
    | 'award'
    | 'themeLabel'
    | 'audience'
    | 'hook'
    | 'problem'
    | 'aiMove'
    | 'studentProject'
    | 'demoGoal'
    | 'aiPowers'
    | 'outputs'
    | 'question'
    | 'insight'
    | 'difficulty'
    | 'coverImageAlt'
    | 'coverImageSource'
    | 'coverImageStatus'
    | 'coverImageHint'
  >
>

const storageKey = 'ai-project-cards-language'

export const languageLabels: Record<Language, SiteLabels> = {
  zh: {
    appName: 'AI Project Inspiration Cards',
    languageToggleLabel: '切换网站语言',
    heroLineOne: '找到你想解决的问题',
    heroLineTwo: '做成 AI 项目',
    heroBody:
      '先挑一个你有感觉的真实案例，再把自己的校园、家庭、社区经历，改造成能展示、能参赛的 AI 项目。',
    themeAll: '全部',
    sourceConnected: '灵感库已连接',
    sourceLocal: '本地演示数据',
    cardCount: '张项目卡',
    themeCount: '个主题入口',
    galleryKicker: '项目卡片墙',
    galleryTitle: '先浏览全局，再点开一张深看',
    themeFiltersLabel: 'Project themes',
    missionCardsLabel: 'Mission cards',
    viewCardLabel: (title) => `查看 ${title}`,
    difficultyPrefix: '难度',
    classroomQuestion: '课堂问题',
    mapKicker: '项目地图',
    mapTitle: '按方向找到你的项目入口',
    mapBody:
      '横向看技术挑战，纵向看影响范围。先找一个像你想做的方向，再点开里面的项目看看。',
    mapLabel: '按技术挑战和影响范围分区的项目地图',
    impactAxis: '影响范围',
    zoneProjectCount: (count) => `${count} 个`,
    collapse: '收起',
    expandMore: (count) => `+${count} 个项目`,
    emptyZone: '待补充案例',
    modalClose: '关闭项目详情',
    modalIndexLabel: (index) => `第 ${index} 张项目卡`,
    sourceLinksLabel: '项目来源链接',
    sourceLinkSingle: '查看项目来源',
    sourceLinkMultiple: (index) => `项目来源 ${index}`,
    fallbackImageStatus: '已确认',
    fallbackImageLabel: '待补真实截图',
    fallbackImageSource: '真实项目图',
    fallbackImageHint: '优先补官网 / GitHub README / 项目截图',
    publishPreviewLabel: '课堂投影卡与发布卡预览',
    publishProjectLabel: 'WAICY / AI PROJECT',
    publishTransfer: '课堂转化',
    projectionKicker: 'CLASSROOM PROMPT',
    projectionTitle: '一屏讲清楚：为什么这个项目值得改造？',
    evidenceLayer: '查看证据层',
    detailProblem: '痛点',
    detailAiMove: 'AI动作',
    detailStudentBuild: '学生改造',
    detailAudience: '用户是谁',
    detailStudentProject: '学生改造项目',
    detailOutputs: '最终展示材料',
    thinkPrompt: '想一想',
    projectTip: '项目小贴士',
  },
  en: {
    appName: 'AI Project Inspiration Cards',
    languageToggleLabel: 'Switch website language',
    heroLineOne: 'Find a problem worth solving',
    heroLineTwo: 'Turn it into an AI project',
    heroBody:
      'Start with a real case, then adapt your own school, family, or community experience into an AI project you can demo and submit.',
    themeAll: 'All',
    sourceConnected: 'Live card library connected',
    sourceLocal: 'Local demo data',
    cardCount: 'project cards',
    themeCount: 'theme entry points',
    galleryKicker: 'Project Card Wall',
    galleryTitle: 'Scan the whole library, then open one card for depth',
    themeFiltersLabel: 'Project themes',
    missionCardsLabel: 'Mission cards',
    viewCardLabel: (title) => `View ${title}`,
    difficultyPrefix: 'Level',
    classroomQuestion: 'Classroom Question',
    mapKicker: 'Project Map',
    mapTitle: 'Find an entry point by direction',
    mapBody:
      'Read left to right for technical challenge, and top to bottom for impact. Pick a direction that feels close, then open the projects inside.',
    mapLabel: 'Project map grouped by technical challenge and impact range',
    impactAxis: 'Impact Range',
    zoneProjectCount: (count) => `${count} cases`,
    collapse: 'Collapse',
    expandMore: (count) => `+${count} more`,
    emptyZone: 'More cases coming',
    modalClose: 'Close project detail',
    modalIndexLabel: (index) => `Project card ${index}`,
    sourceLinksLabel: 'Project source links',
    sourceLinkSingle: 'View project source',
    sourceLinkMultiple: (index) => `Project source ${index}`,
    fallbackImageStatus: 'Confirmed',
    fallbackImageLabel: 'Needs real screenshot',
    fallbackImageSource: 'Real project visual',
    fallbackImageHint: 'Prefer the official site, GitHub README, or project screenshot',
    publishPreviewLabel: 'Classroom projection card and publishing preview',
    publishProjectLabel: 'WAICY / AI PROJECT',
    publishTransfer: 'Classroom Transfer',
    projectionKicker: 'CLASSROOM PROMPT',
    projectionTitle: 'Explain in one screen why this project is worth adapting',
    evidenceLayer: 'View evidence layer',
    detailProblem: 'Problem',
    detailAiMove: 'AI Move',
    detailStudentBuild: 'Student Build',
    detailAudience: 'Who It Serves',
    detailStudentProject: 'Student Adaptation',
    detailOutputs: 'Final Artifacts',
    thinkPrompt: 'Think About',
    projectTip: 'Project Tip',
  },
}

const themeTranslations: Record<string, string> = {
  教育公平: 'Education Equity',
  跨文化沟通: 'Cross-Cultural Communication',
  动物福利: 'Animal Welfare',
  环保: 'Environmental Action',
  文化保护: 'Cultural Preservation',
  科研辅助: 'Research Support',
  心理健康: 'Mental Health',
  文化遗产: 'Cultural Heritage',
  健康管理: 'Health Management',
  无障碍: 'Accessibility',
  AI硬件: 'AI Hardware',
  社团运营: 'Club Operations',
  创业实践: 'Entrepreneurship Practice',
  语言公平: 'Language Equity',
  动物关怀: 'Animal Care',
  无障碍学习: 'Accessible Learning',
  老人照护: 'Elder Care',
  农业科技: 'Agricultural Technology',
  健康安全: 'Health Safety',
  可持续发展: 'Sustainability',
  城市热岛: 'Urban Heat Islands',
  营养食育: 'Nutrition Education',
  AI编程: 'AI Coding',
  数字生命: 'Digital Life',
  'Vibe Coding': 'Vibe Coding',
  AI素养: 'AI Literacy',
  阅读障碍: 'Reading Support',
  手语学习: 'Sign Language Learning',
  急救: 'Emergency Care',
  气候适应: 'Climate Adaptation',
  智慧农业: 'Smart Agriculture',
  交通安全: 'Traffic Safety',
  健康饮食: 'Healthy Eating',
  STEAM教育: 'STEAM Education',
  生物多样性: 'Biodiversity',
  设计工具: 'Design Tools',
  隐私保护: 'Privacy Protection',
  数据分析: 'Data Analysis',
  演示表达: 'Presentation Skills',
  食品安全: 'Food Safety',
  海洋保护: 'Ocean Protection',
  空气质量: 'Air Quality',
  创业工具: 'Startup Tools',
}

const difficultyTranslations: Record<string, MissionCard['difficulty']> = {
  中: 'Medium',
  中高: 'Medium-High',
  高: 'High',
}

const imageStatusTranslations: Record<string, string> = {
  已确认: 'Confirmed',
  待确认: 'Needs confirmation',
  需替换: 'Needs replacement',
  待补图: 'Needs image',
}

const cardTranslations: Record<string, CardTranslation> = {
  'sfusd-thai-family-liaison': {
    title: 'AI Enrollment Policy Helper for Thai Families',
    award: 'High School AI Large Language Model Gold Award',
    themeLabel: 'Education Equity',
    audience: 'Thai immigrant families and school family liaisons',
    hook:
      'Can AI turn confusing school policies into a parent-friendly checklist in their home language?',
    problem:
      'Thai immigrant families can struggle to understand school policies, enrollment steps, and resource information.',
    aiMove:
      'An LLM translates English policies into Thai explanations, step-by-step checklists, email templates, and official links.',
    studentProject: 'AI helper for new school families and international-school communication',
    demoGoal:
      'Build a small assistant that answers parent questions and drafts bilingual school emails.',
    aiPowers: ['LLM', 'Multilingual Translation', 'Policy Explanation', 'Email Drafting'],
    outputs: ['Q&A bot prototype', 'Bilingual email templates', 'Policy knowledge base'],
    question:
      'If your family reads a school notice for the first time, where would they get stuck? What checklist could AI create?',
    insight:
      'Choose one concrete task first, such as enrollment documents, absence emails, or course selection. Let AI turn complex information into steps a parent can follow.',
    difficulty: 'Medium-High',
  },
  'sfusd-thai-family-liaison-gpt': {
    title: 'AI Enrollment Policy Helper for Thai Families',
    award: 'WAICY 2025 High School AI Large Language Model Track, Global Gold Award',
    themeLabel: 'Education Equity',
    audience: 'Thai immigrant families and school family liaisons',
    hook:
      'Can AI turn confusing school policies into a parent-friendly checklist in their home language?',
    problem:
      'Thai immigrant families can struggle to understand school policies, enrollment steps, and resource information.',
    aiMove:
      'An LLM translates English policies into Thai explanations, step-by-step checklists, email templates, and official links.',
    studentProject: 'AI helper for new school families and international-school communication',
    demoGoal:
      'Build a small assistant that answers parent questions and drafts bilingual school emails.',
    aiPowers: ['LLM', 'Multilingual Translation', 'Policy Explanation', 'Email Drafting'],
    outputs: ['Q&A bot prototype', 'Bilingual email templates', 'Policy knowledge base'],
    question:
      'If your family reads a school notice for the first time, where would they get stuck? What checklist could AI create?',
    insight:
      'Choose one concrete task first, such as enrollment documents, absence emails, or course selection. Let AI turn complex information into steps a parent can follow.',
    difficulty: 'Medium-High',
  },
  bridgebot: {
    title: 'AI Bridge for Conflict Conversations',
    award: 'WAICY 2025 High School AI Large Language Model Track, Global Silver Award',
    themeLabel: 'Cross-Cultural Communication',
    audience: 'Teenagers navigating cultural, religious, or political conflict',
    hook: 'When a disagreement is about to escalate, can AI help people understand each other first?',
    problem:
      'Teenagers can misunderstand and polarize one another when cultural, religious, or political contexts collide.',
    aiMove:
      'An LLM explains cultural background, softens tone, switches perspectives, and clarifies possible misunderstandings.',
    studentProject: 'Campus conflict communication helper or cross-cultural teamwork assistant',
    demoGoal:
      'Build four modules: cultural explanation, respectful rewrite, perspective switch, and misunderstanding check.',
    aiPowers: ['LLM', 'Tone Rewriting', 'Perspective Switching', 'Cultural Explanation'],
    outputs: ['Four-module chatbot', 'Before and after conversation examples'],
    question:
      'Have you ever been misunderstood because of tone or cultural context even though you were trying to explain yourself?',
    insight:
      'Do not use AI to win the argument. Use it to cool down the conversation, explain background, and offer a more respectful wording.',
    difficulty: 'Medium',
  },
  fetchafriend: {
    title: 'AI Matching Helper for Pet Adoption',
    award: 'WAICY 2025 High School AI Showcase Track, Design Excellence Award',
    themeLabel: 'Animal Welfare',
    audience: 'Animal shelters, adopters, and volunteers',
    hook: 'Pet adoption should not feel random. Can AI help people and animals match for the long term?',
    problem:
      'Adopters often struggle to find an animal that truly fits their lifestyle, schedule, and budget.',
    aiMove:
      'A recommendation system and chatbot match lifestyle preferences, budgets, and animal profiles.',
    studentProject: 'Volunteer matching, book recommendations, club matching, or mentor matching',
    demoGoal: 'Build a preference survey, profile table, and recommendation result page.',
    aiPowers: ['Recommendation Algorithm', 'Chatbot', 'Profile Matching'],
    outputs: ['Matching website', 'Pet profile table', 'Recommendation results page'],
    question:
      'If you recommend a pet, club, or mentor, what long-term fit factors matter beyond simply liking it?',
    insight:
      'A recommendation system should explain why it recommends something. Include habits, time, budget, and responsibility, not just surface preferences.',
    difficulty: 'Medium-High',
  },
  aidrate: {
    title: 'AI Irrigation Helper That Saves Farm Water',
    award: 'WAICY 2025 High School AI Showcase Track, Global Silver Award',
    themeLabel: 'Environmental Action',
    audience: 'Farmers, school farms, and water-saving project teams',
    hook: 'Every drop matters. Can AI tell farmers when to water and when to save?',
    problem:
      'Irrigation decisions can be imprecise, wasting water or harming crop growth.',
    aiMove:
      'Weather, soil, and irrigation data are used to generate water-saving watering suggestions.',
    studentProject: 'Campus plant watering helper or community water-saving dashboard',
    demoGoal:
      'Use sample weather or soil data to output a watering recommendation prototype.',
    aiPowers: ['Data Analysis', 'Weather and Soil Modeling', 'Irrigation Advice'],
    outputs: ['Data dashboard', 'Irrigation advice report', 'Water-saving explanation'],
    question:
      'What resource around you is often wasted? Water, electricity, paper, or food? Can AI remind people when to use less?',
    insight:
      'Start with a small sample dataset and clear rules. Show users what data the AI used, not just the final recommendation.',
    difficulty: 'Medium-High',
  },
  'sangeet-i': {
    title: 'Recommending Indian Classical Music Through Emotion Recognition',
    award: 'WAICY 2025 High School AI Showcase Track, Global Bronze Award',
    themeLabel: 'Cultural Preservation',
    audience: 'Music learners and cultural event participants',
    hook: 'Can AI read your expression and help you hear the emotion inside a musical tradition?',
    problem:
      'Indian classical vocal learning can be expensive, location-dependent, and hard to access.',
    aiMove:
      'Computer vision reads facial emotion, then recommends a matching Hindustani raag.',
    studentProject: 'Intangible-heritage music recommender or campus emotion music corner',
    demoGoal:
      'Build an emotion-recognition plus music recommendation demo and explain one raag.',
    aiPowers: ['Computer Vision', 'Emotion Recognition', 'Content Recommendation'],
    outputs: ['Emotion recognition demo', 'Music recommendation page', 'Culture explainer card'],
    question:
      'If AI guesses your emotion from your face, when might it be wrong? How should it ask users to confirm?',
    insight:
      'Emotion recognition should not pretend to be perfect. Let users choose or correct the emotion, then respond with music, stories, or cultural content.',
    difficulty: 'Medium-High',
  },
  'pain-calculator': {
    title: 'Helping Researchers Observe Animal Pain More Objectively',
    award: 'High School AI Showcase Gold Award',
    themeLabel: 'Research Support',
    audience: 'Animal behavior researchers, pain researchers, and lab students',
    hook: 'Research observations can be biased. Can AI help make experimental data more objective?',
    problem:
      'Animal pain studies often rely on human observation, which can be affected by subjective judgment and image conditions.',
    aiMove:
      'Vision models analyze facial and body proportions in mice to support comparisons of pain states.',
    studentProject: 'Experiment image annotator, plant growth observer, or insect behavior tracker',
    demoGoal:
      'Build a small image annotation tool and compare model judgment with human judgment.',
    aiPowers: ['Computer Vision', 'Image Annotation', 'Pose and Proportion Analysis'],
    outputs: ['Image annotation demo', 'Model comparison chart', 'Research poster'],
    question:
      'During observation or experiments, which judgments are easily influenced by experience or emotion? What could AI record more objectively?',
    insight:
      'Start with one observable signal, such as posture, expression, or movement change. The goal is to support observation, not replace expert judgment.',
    difficulty: 'High',
  },
  mindpaw: {
    title: 'AI Journal for Teen Emotional Awareness',
    award: 'WAICY 2025 High School AI Showcase Track, Global Bronze Award',
    themeLabel: 'Mental Health',
    audience: 'Teenagers and mental-health course teachers',
    hook: 'When feelings are hard to name, can AI help teens gently identify what they feel?',
    problem:
      'Teenagers often lack low-barrier tools for emotional awareness and self-reflection.',
    aiMove:
      'NLP interprets journal or conversation text, helps name emotions, and prompts reflection.',
    studentProject: 'Campus mood journal or exam-stress reflection assistant',
    demoGoal: 'Build a mood-journal page with emotion tags and reflection prompts.',
    aiPowers: ['NLP', 'Emotion Text Understanding', 'Mobile App Design'],
    outputs: ['Mood journal app prototype', 'Reflection prompt cards', 'Privacy notice'],
    question:
      'When you cannot clearly name your feelings, what could AI ask to help you put them into words?',
    insight:
      'Mental-health projects need boundaries. Let AI name emotions and offer reflection prompts, and guide users to real people when risk signals appear.',
    difficulty: 'Medium',
  },
  'devanagari-scribe': {
    title: 'Using AI to Preserve and Learn Devanagari Script',
    award: 'High School AI Showcase 5th Place / AI Excellence',
    themeLabel: 'Cultural Heritage',
    audience: 'Devanagari learners, language learners, and cultural preservation groups',
    hook: 'Can AI help a neglected writing system be learned, practiced, and preserved?',
    problem:
      'Traditional scripts and smaller languages often lack easy AI-supported learning tools.',
    aiMove:
      'Character recognition and language-learning models support exploration, practice, and preservation of Devanagari.',
    studentProject: 'Dialect learning helper, minority-script practice tool, or local culture archive',
    demoGoal: 'Build a character recognition, writing practice, and cultural explanation tool.',
    aiPowers: ['Character Recognition', 'Language Learning', 'Cultural Heritage Digitization'],
    outputs: ['Recognition or writing-practice demo', 'Cultural archive cards'],
    question:
      'Is there a language, script, or local culture you know that is being overlooked but deserves to be learned by more people?',
    insight:
      'Cultural preservation is not just an encyclopedia. Build recognition, practice, Q&A, and story cards so users can actually learn and remember something.',
    difficulty: 'Medium-High',
  },
  computerpreter: {
    title: 'Keeping Communication From Getting Stuck',
    award: 'High School AI Showcase 5th Place',
    themeLabel: 'Accessibility',
    audience: 'Deaf users, classroom participants, and public-service users',
    hook: 'Turn gestures into text so more people can be understood in time.',
    problem:
      'Deaf people often lack on-demand sign-language support in everyday communication, classrooms, and public services.',
    aiMove: 'Computer vision recognizes gestures and converts results into text or speech.',
    studentProject: 'Campus accessibility communication helper',
    demoGoal:
      'Recognize 8 to 10 common school gestures or needs through image upload or camera input.',
    aiPowers: ['Computer Vision', 'Gesture Recognition', 'Real-Time Translation', 'Text Output'],
    outputs: ['Gesture recognition demo', 'Scenario dictionary', 'User journey map', 'Error analysis'],
    question:
      'Who at school might miss important information because they cannot hear, see, speak the language, or express themselves in the usual way?',
    insight:
      'Choose one small communication setting first, such as cafeteria ordering, classroom help, or club signup. A few accurate high-frequency needs are more useful than a vague universal translator.',
    difficulty: 'High',
  },
  'project-cassie': {
    title: 'AI-Assisted Logs for Type 1 Diabetes Management',
    award: 'High School AI Large Language Model 4th Place Recognition',
    themeLabel: 'Health Management',
    audience: 'People with type 1 diabetes and caregivers in assisted tracking scenarios',
    hook: 'Chronic care is complex. Can AI safely support tracking and explanations?',
    problem:
      'Blood sugar, insulin, and daily records for type 1 diabetes can be complex to manage.',
    aiMove:
      'An LLM chatbot combines record explanation and data analysis while avoiding medical replacement.',
    studentProject: 'Health habit tracker, chronic-care Q&A, or exercise and diet log explainer',
    demoGoal:
      'Build a health-record explainer that only supports tracking, education, and reminders.',
    aiPowers: ['LLM', 'Chatbot', 'Prompt Engineering', 'Data Analysis'],
    outputs: ['Health-record chatbot prototype', 'Safety boundary statement'],
    question:
      'If someone must record health data every day, which step is most annoying, easiest to forget, or most in need of explanation?',
    insight:
      'A health assistant must clearly say it does not diagnose. It can organize records, explain trends, and prompt reflection, while major decisions stay with doctors and caregivers.',
    difficulty: 'High',
  },
  signtrack: {
    title: 'Real-Time Sign-to-Text Accessibility Helper',
    award: 'WAICY 2025 High School AI Showcase Track, Global Bronze Award',
    themeLabel: 'Accessibility',
    audience: 'Deaf or sign-language users, classmates, and volunteers',
    hook: 'Can people who do not know sign language use AI to understand real-time gestures?',
    problem:
      'Communication barriers remain between sign-language users and people who do not sign.',
    aiMove:
      'Video action recognition and LSTM models convert sign-language motions into text and organize word order.',
    studentProject: 'Campus gesture dictionary or classroom accessibility communication helper',
    demoGoal:
      'Build a 10 to 20 gesture recognition demo and a text display page.',
    aiPowers: ['Computer Vision', 'Sequential Motion Recognition', 'LSTM'],
    outputs: ['Gesture recognition demo', 'Live caption page', 'Accessibility scenario video'],
    question:
      'At school, what information would affect belonging if it cannot be heard, seen, or expressed in time?',
    insight:
      'Start with 10 to 20 high-frequency signs or scenario words. A small accurate demo is more credible than trying to translate all sign language at once.',
    difficulty: 'High',
  },
  '好运日历机-open-calendar': {
    title: 'Printing Daily Lucky Notes From an AI Companion',
    sourceProject: 'Open Calendar',
    award: '2026 Xiaohongshu Hackathon Peak Final, Hardware Track Second Prize',
    themeLabel: 'AI Hardware',
    audience: 'Young users who want daily reminders, emotional support, or ritual feedback',
    hook:
      'If AI printed one action note you could carry each day instead of only chatting on your phone, would it be easier to follow through?',
    problem:
      'AI advice inside phones is easy to forget. Users lack a desktop entry point that turns reminders, luck notes, tasks, and action suggestions into physical objects.',
    aiMove:
      'AI combines user context, daily persona, date signals, tasks, and memory to generate personalized notes, explanations, and action advice, then displays or prints them.',
    studentProject: 'Study lucky-note printer, exam review task printer, class mood station, or campus event receipt bot',
    demoGoal:
      'Build a desktop prototype that takes a user state or task, generates encouragement and one action, then displays or prints a ticket.',
    aiPowers: ['LLM Copywriting', 'Personalized Recommendation', 'User Context Memory', 'Hardware Interaction', 'Printing Output'],
    outputs: ['Desktop or cardboard prototype', 'AI note page', 'Printed ticket samples', 'User flow video'],
    question:
      'What small thing do you most need to be reminded of every day? If it became an AI ticket on your desk, what should it say?',
    insight:
      'Do not start with a complicated fortune system. Begin with today goal, mood state, one action suggestion, and a ticket layout, then close the input to generation to print loop.',
    difficulty: 'Medium-High',
  },
  publora: {
    title: 'AI Operations Helper for Scheduled Club Content',
    award: 'Product Hunt 2026 recent hot launch, public page showed launched this week and forum buzz',
    themeLabel: 'Club Operations',
    audience: 'Student club publicity teams, campus account operators, and event organizers',
    hook: 'If a club posts every week, can AI help draft, schedule, publish, and review performance?',
    problem:
      'Student teams often lack a steady workflow for organizing event assets, posting across platforms, and reading engagement data, so good projects go unseen.',
    aiMove:
      'AI agents connect to social platforms through MCP or APIs to draft content, schedule posts, read feedback, and suggest improvements.',
    studentProject: 'Campus event publishing helper, class news scheduler, or club content review bot',
    demoGoal:
      'Input event details and generate three platform drafts, a posting schedule, and an engagement review table.',
    aiPowers: ['LLM', 'AI Agents', 'Content Generation', 'API and MCP', 'Data Analysis'],
    outputs: ['Publishing calendar prototype', 'Multi-platform copy pack', 'Engagement review page'],
    question:
      'If your club has an event next week, what should AI ask first so the promotion is accurate and not exaggerated?',
    insight:
      'Limit the first version to a safe context such as class announcements or club events. Let AI draft and schedule, but keep a human review button before publishing.',
    difficulty: 'Medium-High',
  },
  sellerclaw: {
    title: 'AI Store Manager Team for a Campus Charity Shop',
    award: 'Product Hunt 2026 recent hot launch, public page showed launched this week and day rank',
    themeLabel: 'Entrepreneurship Practice',
    audience: 'Student startup teams, campus charity-sale teams, and fundraising organizers',
    hook: 'Can a small campus shop have four AI helpers for sourcing, pricing, service, and advertising?',
    problem:
      'Small online stores or charity sales must handle products, pricing, descriptions, promotion, and customer questions at once, which can overwhelm student teams.',
    aiMove:
      'Multiple AI agents handle product suggestions, copywriting, pricing and stock reminders, customer replies, and a supervisor agent summarizes actions for approval.',
    studentProject: 'Campus charity-sale AI manager, used-book exchange helper, or fundraising merch operations desk',
    demoGoal:
      'Input a product table and generate pricing suggestions, product copy, customer replies, and a review task list.',
    aiPowers: ['Multi-Agent Collaboration', 'LLM', 'Spreadsheet Analysis', 'Recommendation Rules', 'Human Review Workflow'],
    outputs: ['Shop operations dashboard', 'Product cards', 'AI task list', 'Customer-service dialogue examples'],
    question:
      'If you sell campus charity merch, what data should AI use for pricing and restocking instead of only trying to sell quickly?',
    insight:
      'Use simulated transaction data. Show the AI suggestion plus human approval workflow, and avoid real payments or private information in a student project.',
    difficulty: 'High',
  },
  'gemini-3-5-live-translate': {
    title: 'Real-Time Translation Captions for Cross-Language School Communication',
    award: 'Product Hunt 2026 recent hot launch, June 10 day rank 5',
    themeLabel: 'Language Equity',
    audience: 'Cross-language families, international-school teachers, and community event organizers',
    hook: 'When parents and teachers speak different languages, can AI help a meeting happen without a third person in the middle?',
    problem:
      'In parent meetings, community meetings, or group work, language barriers can block important information from reaching the people who need it.',
    aiMove:
      'Live speech recognition, translation, and voice or caption output help different language users understand each other close to real time.',
    studentProject: 'Parent-teacher live caption helper, community bilingual subtitle screen, or international-student welcome guide',
    demoGoal:
      'Build a prototype that takes audio or text and outputs bilingual captions, keyword summaries, and mistranslation flags.',
    aiPowers: ['Speech Recognition', 'Machine Translation', 'Live Captions', 'Summary Generation'],
    outputs: ['Bilingual caption demo page', 'Meeting summary card', 'Mistranslation risk note'],
    question:
      'If AI mistranslates one teacher sentence, who could be affected? How should the product warn users that it may be inaccurate?',
    insight:
      'Use short audio or classroom dialogue scripts for the demo. Show delay, accuracy, and human confirmation instead of presenting machine translation as fully reliable.',
    difficulty: 'Medium-High',
  },
  tamadoggo: {
    title: 'AI Companion Diary for Pet Care Memories',
    award: 'Product Hunt 2026 recent hot launch, June 8 day rank 6',
    themeLabel: 'Animal Care',
    audience: 'Pet families, student volunteers, animal rescue clubs, and pet caregivers',
    hook: 'Can scattered feeding, walking, photo, and vet notes become a warm long-term pet record?',
    problem:
      'Pet care information is scattered across photos, chats, paper vet forms, and memory, making patterns and moments hard to review later.',
    aiMove:
      'AI finds patterns in timelines, food, activity, weight, or visits, extracts information from vet documents, and generates warm monthly recaps.',
    studentProject: 'Campus plant or animal observation diary, class pet care log, or shelter animal growth archive',
    demoGoal:
      'Build a prototype for diary input, photo or document extraction, pattern prompts, and a monthly recap letter.',
    aiPowers: ['Multimodal Extraction', 'NLP', 'Timeline Organization', 'Pattern Recognition', 'Summary Generation'],
    outputs: ['Pet timeline page', 'Care pattern cards', 'Monthly recap letter', 'Privacy and non-diagnosis note'],
    question:
      'If you record a pet or campus plant for 30 days, what subtle change could AI help you notice?',
    insight:
      'Do not let AI diagnose. A student version can become observation records and gentle reminders, while health decisions stay with a vet or teacher.',
    difficulty: 'Medium',
  },
  wave: {
    title: 'Local-First Voice Helper That Turns Spoken Ideas Into Text',
    award: 'Product Hunt 2026 recent hot launch, June 7 day rank 2',
    themeLabel: 'Accessible Learning',
    audience: 'Students who write slowly, students capturing fast ideas, teachers, and project teams',
    hook: 'When ideas move faster than typing, can AI put spoken thoughts directly where you are writing?',
    problem:
      'Many students have ideas but type slowly, speak messily, or mix languages, making notes and drafts hard to form.',
    aiMove:
      'A hotkey voice input tool transcribes, cleans, rewrites, and inserts text using local or cloud models.',
    studentProject: 'Classroom spoken-note helper, project idea voice collector, or privacy-first local transcription tool',
    demoGoal:
      'Turn spoken input into class notes, a to-do list, and a formal email, while labeling local and cloud modes.',
    aiPowers: ['Speech Recognition', 'Text Cleanup', 'Contextual Rewriting', 'Local and Cloud Model Choice'],
    outputs: ['Voice input interface', 'Before and after text examples', 'Local versus cloud privacy card'],
    question:
      'If you tell AI, "I said that wrong," how should it know to edit the previous sentence instead of writing those words too?',
    insight:
      'You can simulate speech with typed spoken text first. Focus on helping AI organize student thinking instead of writing from nothing, and explain privacy choices.',
    difficulty: 'Medium',
  },
  fallguard: {
    title: 'AI Fall Guardian for Older Adults Living Alone',
    award: "2025 3M Young Scientist Challenge First Place / America's Top Young Scientist",
    themeLabel: 'Elder Care',
    audience: 'Older adults living alone, caregivers, and senior communities',
    hook: 'If an older adult falls and no one notices, can AI alert family within a minute?',
    problem:
      'Older adults who live alone may be left undiscovered after a fall, while wearable devices can be forgotten or left uncharged.',
    aiMove:
      'Pose-recognition AI analyzes body keypoints and motion changes from camera frames, then sends a simulated alert after a fall or long lying state.',
    studentProject: 'Campus fall alert, PE-class fall detector, or care helper for a relative who lives alone',
    demoGoal:
      'Build a prototype that recognizes standing, lying down, and possible fall examples, then triggers a simulated notification.',
    aiPowers: ['Computer Vision', 'Pose Recognition', 'Edge or Local Processing', 'Alert Flow Design'],
    outputs: ['Video recognition demo', 'Alert flow page', 'Privacy boundary card'],
    question:
      'If a camera can protect someone but also make them nervous, how should the product save only necessary information?',
    insight:
      'Use public pose samples or self-recorded simulated actions. Focus on recognition logic, false alarms, and privacy commitments.',
    difficulty: 'High',
  },
  'robert-hook-crop-price-forecast': {
    title: 'AI Crop Price Dashboard for Farmers',
    award: 'National AI Future Skills Hackathon 2026 Top 10, national exhibition showcase',
    themeLabel: 'Agricultural Technology',
    audience: 'Farmers, agricultural cooperatives, and student agriculture project teams',
    hook: 'If crop prices are about to drop, can AI warn farmers before losses become unavoidable?',
    problem:
      'Farmers must track market prices, crop supply, and environmental data, but sudden price drops can force low-price selling.',
    aiMove:
      'AI and IoT data feed a web dashboard that analyzes agricultural data and gives crop-price trends and risk alerts.',
    studentProject: 'Campus market pricing helper, cafeteria ingredient forecast, or local specialty sales dashboard',
    demoGoal:
      'Use sample price, weather, or supply data to create trend charts, risk prompts, and sales suggestions.',
    aiPowers: ['Spreadsheet Forecasting', 'IoT Data', 'Data Dashboard', 'Anomaly Alerts'],
    outputs: ['Crop-price dashboard', 'Price trend chart', 'Risk alert card', 'Recommendation notes'],
    question:
      'What item in your city changes price often? What data should AI watch before alerting sellers or buyers?',
    insight:
      'Use public historical prices or simulated data first. Frame results as risk prompts and review suggestions, not trading instructions.',
    difficulty: 'High',
  },
  'snap-snack': {
    title: 'AI Safe-Food Scanner for People With Allergies',
    award: 'Congressional App Challenge 2025, CT-05 winner',
    themeLabel: 'Health Safety',
    audience: 'Students with food allergies, parents, travelers, and school dining teams',
    hook: 'When an ingredient label is hard to read, can AI spot possible allergy risks first?',
    problem:
      'People with food allergies must repeatedly check ingredients, aliases, and foreign labels, which can be stressful when eating out.',
    aiMove:
      'The app scans barcodes or ingredients, matches personal allergens, translates foreign labels, and answers with allergy-friendly recipes or restaurant suggestions.',
    studentProject: 'Campus lunch allergy reminder, travel menu translator, or snack safety scanner',
    demoGoal:
      'Build an allergen profile, ingredient input or scan flow, risk markers, and alternative recipe suggestions.',
    aiPowers: ['OCR and Barcode Recognition', 'Rule Matching', 'Machine Translation', 'LLM Q&A'],
    outputs: ['Scanning flow diagram', 'Risk prompt card', 'AI recipe answer', 'Safety disclaimer'],
    question:
      'If one ingredient has many aliases, how should AI explain why it may be risky instead of only saying safe or unsafe?',
    insight:
      'Start with text ingredient lists and an allergen dictionary. Every risk prompt should show matched words and uncertainty, not make a medical guarantee.',
    difficulty: 'Medium-High',
  },
  'sustainability-heroes': {
    title: 'AI Subject Helper for Bringing Sustainability Into Class',
    award: 'The Earth Prize 2025 Regional Winner',
    themeLabel: 'Sustainability',
    audience: 'K-12 teachers, student environmental clubs, and curriculum designers',
    hook: 'Can AI help every subject connect knowledge to campus environmental action?',
    problem:
      'Sustainability education often stays in slogans or isolated events, and teachers need help weaving it naturally into different subjects.',
    aiMove:
      'An LLM maps topics to SDGs, action tasks, submission formats, and rubrics.',
    studentProject: 'Campus low-carbon lesson helper, SDG task generator, or environmental club project library',
    demoGoal:
      'Input a subject concept and generate SDG links, classroom tasks, student submission formats, and evaluation criteria.',
    aiPowers: ['LLM Generation', 'Curriculum Mapping', 'Recommendation System', 'Rubric Generation'],
    outputs: ['Lesson task card', 'Teacher planning page', 'Student action example'],
    question:
      'How could one class you are taking connect to a real environmental issue? Should AI give facts, questions, or action tasks?',
    insight:
      'Choose one subject and one environmental theme first. Require real sources and executable small tasks rather than trying to cover every course at once.',
    difficulty: 'Medium',
  },
  ecoaction: {
    title: 'Using Satellites and AI to Find Cooler Urban Green Spaces',
    award: 'The Earth Prize 2025 Regional Winner',
    themeLabel: 'Urban Heat Islands',
    audience: 'City planners, school environmental clubs, and community residents',
    hook: 'Can AI help a community find the hottest, least shaded places to plant trees first?',
    problem:
      'Overheated cities need more greenery, but heat, population, shade, and land conditions are scattered across different datasets.',
    aiMove:
      'AI, satellite data, and analysis help plan strategic greening to cool cities.',
    studentProject: 'Campus heat map, shaded walking-route recommender, or community tree-priority dashboard',
    demoGoal:
      'Use a campus map, temperature records, and green-space points to create a heat map and planting-priority list.',
    aiPowers: ['Geospatial Analysis', 'Satellite Image Understanding', 'Heat Maps', 'Data Visualization'],
    outputs: ['Map dashboard', 'Priority list', 'Before and after greening comparison', 'Community proposal'],
    question:
      'Where is the hottest part of your daily route? What evidence would prove that this place needs trees?',
    insight:
      'You do not need a satellite API at first. Use a campus map and temperature survey, and label measured data separately from AI inference.',
    difficulty: 'High',
  },
  '营养小精灵互动餐厅': {
    title: 'Turning Picky-Eater Dinner Into an AI Nutrition Adventure',
    sourceProject: 'Nutrition Sprite Interactive Restaurant',
    award: 'Public WeChat design case, source needs project verification',
    themeLabel: 'Nutrition Education',
    audience: 'Picky children, parents, child-friendly restaurants, and nutrition educators',
    hook: 'If a child avoids new food, can AI turn dinner into an adventure with a nutrition sprite?',
    problem:
      'Family meals can become conflict around picky eating, and children often lack motivation to explore healthy food actively.',
    aiMove:
      'AI uses food choices, meal progress, and nutrition goals to generate sprite feedback, mini missions, encouragement, and next-step suggestions.',
    studentProject: 'Cafeteria nutrition mission cards, family breakfast AI adventure, or picky-eater food exploration game',
    demoGoal:
      'Input food and preferences, then generate character encouragement, nutrition facts, and one next task.',
    aiPowers: ['LLM Story Generation', 'Personalized Feedback', 'Nutrition Q&A', 'Real-Time Interaction', 'Gamified Mission Design'],
    outputs: ['Interactive table or web prototype', 'Nutrition sprite cards', 'Mission flow diagram', 'Before and after meal storyboard'],
    question:
      'If you wanted a child to try a disliked food, what character, mission, and reward should AI design?',
    insight:
      'Pick one concrete scene first, such as breakfast, vegetables, or drinking water. Run the loop from food input to nutrition explanation to character encouragement to task feedback.',
    difficulty: 'Medium-High',
  },
  'coniro-yookie-情绪正念软糖': {
    title: 'Turning Emotional Eating Into AI Mindfulness Support',
    sourceProject: 'Coniro / Yookie Mindfulness Gummies',
    award: 'Public Xiaohongshu product concept, source needs project verification',
    themeLabel: 'Mental Health',
    audience: 'Teens facing emotional eating, stressed students, and people seeking low-barrier mood awareness',
    hook:
      'When someone reaches for snacks to soothe emotion, can AI help them name the feeling and choose a gentler alternative action?',
    problem:
      'Low mood, anxiety, or emptiness can lead people to eat for quick comfort, while few low-pressure tools help them notice emotions and replace the behavior.',
    aiMove:
      'AI uses the selected emotion gummy, current feeling, and trigger scene to generate mindfulness guidance, alternative actions, mood logs, and gentle companion language.',
    studentProject: 'Emotion snack alternative helper, campus mindfulness check-in, AI emotion candy box, or exam-week support mini app',
    demoGoal:
      'Select an emotion and generate a mindfulness guide, replacement action, and mood record card.',
    aiPowers: ['LLM Emotion Dialogue', 'Mindfulness Guidance', 'Personalized Advice', 'Emotion Classification', 'Behavior Replacement Design'],
    outputs: ['AI chat prototype', 'Six emotion character cards', 'Mood log page', 'User journey poster'],
    question:
      'If you design an anxiety gummy, what small action should it guide users to do instead of encouraging more eating?',
    insight:
      'Choose three common emotions first, such as anxiety, loneliness, and anger. For each, design naming, one-minute mindfulness, one replacement action, and a help reminder.',
    difficulty: 'Medium',
  },
  '口述需求小飞机游戏': {
    title: 'Letting Children Become Game Designers by Speaking Their Ideas',
    sourceProject: 'Spoken-Requirements Airplane Game',
    award: 'Public Xiaohongshu vibe-coding case, source needs project verification',
    themeLabel: 'AI Coding',
    audience: 'Children making a first game, parent-child coding families, and students new to AI coding',
    hook: 'If a child cannot code yet, can AI turn spoken ideas into a playable mini game?',
    problem:
      'Young children and coding beginners may have game ideas but lack code skills and structured requirements, so ideas stay unbuilt.',
    aiMove:
      'An adult or student turns spoken ideas into requirements, asks Codex to build a prototype, then iterates through playtest feedback.',
    studentProject: 'Class avatar shooter, English vocabulary airplane battle, recycling target game, or math flight challenge',
    demoGoal:
      'Build a playable browser game and record three rounds of playtest, request, AI revision, and replay.',
    aiPowers: ['Code Generation', 'Requirement Structuring', 'Game Prototype Development', 'Feature Iteration', 'Debugging'],
    outputs: ['Playable game link', 'Three version screenshots', 'Requirement list', 'Playtest feedback notes'],
    question:
      'If you can only describe a mini game out loud, what three core functions would you say first? What can wait until after playtesting?',
    insight:
      'Start with the smallest playable version: move, score, and fail. Let classmates test it before turning real feedback into the next AI revision request.',
    difficulty: 'Medium',
  },
  '鸟你一下-boopbirds': {
    title: 'A Digital Bird Living on Your Desktop and in a Little Nest',
    sourceProject: 'BoopBirds',
    award: 'Public Xiaohongshu digital-life concept, source needs project verification',
    themeLabel: 'Digital Life',
    audience: 'Students with messy desktops, virtual-pet fans, and creators exploring software-hardware interaction',
    hook: 'If a little bird lived on your computer and ate junk files, could organizing files feel like raising a pet?',
    problem:
      'Desktop file cleanup, digital companionship, and hardware interaction often feel boring or disconnected.',
    aiMove:
      'AI uses file types, user interactions, and bird states to generate personality feedback, cleanup suggestions, growth stories, and partner events.',
    studentProject: 'Desktop cleanup pet, class study companion sprite, wearable digital pet, or two-device mood-sharing nest',
    demoGoal:
      'Build a desktop pet prototype that can be fed files or tasks, changes state, and generates bird feedback and a growth log.',
    aiPowers: ['LLM Character Feedback', 'State Machine Design', 'File Classification', 'Personalized Companionship', 'Hardware Interaction Prototype'],
    outputs: ['Desktop pet prototype', 'Portable nest model', 'Interaction flow video', 'Bird growth log'],
    question:
      'If your desktop had a digital pet, what would it eat to grow? How should it remind you to clean files or finish tasks?',
    insight:
      'Start in software: three pet states, three feed items, and three AI feedback lines. The hardware nest can be simulated with cardboard, Micro:bit, or a phone screen.',
    difficulty: 'Medium-High',
  },
  '你好-辣-切辣椒互动网页': {
    title: 'Turning Food Knowledge Into a Sliceable Chili Mini Game',
    sourceProject: 'Hello Chili Interactive Web Page',
    year: '2026 (inferred from source page)',
    award: 'Public Xiaohongshu vibe-coding case, source needs project verification',
    themeLabel: 'Vibe Coding',
    audience: 'Students exploring food culture, food-design learners, and no-code creators making interactive pages',
    hook: 'What if chili was not just an ingredient, but a web mini game you could slice open to reveal files, fire, and flavor?',
    problem:
      'Food knowledge and flavor research often stay as text, making it hard for users to feel origin, use, and heat differences interactively.',
    aiMove:
      'AI generates page code, chili fact cards, interaction logic, visual style, and debugging suggestions through vibe coding.',
    studentProject: 'Fruit sweetness slicing game, coffee bean flavor map, hometown ingredient archive, or cafeteria nutrition exploration page',
    demoGoal:
      'Build an interactive page where users choose an ingredient, click or slice it, and see facts and indicator changes.',
    aiPowers: ['Code Generation', 'Interactive Web Development', 'Research Organization', 'Visual Style Generation', 'Debugging'],
    outputs: ['Playable interactive web page', 'Ingredient cards', 'Interaction screenshots', 'Vibe-coding iteration log'],
    question:
      'If you turn a hometown food into an interactive page, what should users see when they click, drag, or slice it?',
    insight:
      'Choose five objects and three indicators first, such as origin, flavor, and intensity. Version one only needs click-to-show facts; add animation or sound later.',
    difficulty: 'Medium',
  },
  'ai-phillic': {
    title: 'AI Information Literacy Training Ground for Students',
    award: 'Langley School District IDEA-X AI Challenge, public school report',
    themeLabel: 'AI Literacy',
    audience: 'K-12 students, teachers, and learners judging AI-generated or online information',
    hook:
      'If every student practiced asking "Is this true, and is it biased?" before using AI, would fewer unreliable assignments look smart?',
    problem:
      'AI-generated content and social media make it harder for students to identify sources, bias, and truthfulness, and they need practice in critical thinking.',
    aiMove:
      'A learning hub and critical-thinking scanner guide students to analyze source, bias, evidence, and academic-integrity risk.',
    studentProject: 'AI homework credibility checker, news bias detective, debate evidence cards, or campus AI integrity helper',
    demoGoal:
      'Input an article or AI answer and output credibility questions, bias prompts, and rewrite suggestions with student practice tasks.',
    aiPowers: ['Text Analysis', 'Credibility Prompts', 'Bias Detection', 'Learning Feedback', 'Guided Q&A'],
    outputs: ['Interactive web page', 'Information judgment rubric', 'Three case tests', 'Demo script or pitch video'],
    question:
      'Find a recent AI answer or short-video script. Where should you ask about source, evidence, and point of view?',
    insight:
      'The first version does not need automatic truth judgment. Let AI generate five good questions: who is the source, where is the evidence, what is another explanation, who benefits, and where else can I check?',
    difficulty: 'Medium',
  },
  bookoli: {
    title: 'Using AI to Notice Early Signals of Reading Difficulty',
    award: 'NCWIT Aspirations in Computing National Awardee project, public news report',
    themeLabel: 'Reading Support',
    audience: 'Students with reading challenges, teachers, parents, and school learning-support teams',
    hook:
      'Can AI notice that a child is struggling with reading early enough to bring support forward, without turning it into a label?',
    problem:
      'Reading challenges are often noticed too late, and families need light tools for risk signals, progress records, and support connections.',
    aiMove:
      'An AI-powered platform identifies and supports students with reading challenges such as dyslexia, using publicly described but not fully disclosed methods.',
    studentProject: 'Class reading companion, early vocabulary difficulty reminder, reading fluency log, or parent support report generator',
    demoGoal:
      'Upload a reading record or questionnaire and generate support prompts, practice suggestions, and a teacher-readable summary.',
    aiPowers: ['Text or Speech Record Analysis', 'Risk Prompt Generation', 'Personalized Practice Recommendation', 'Learning Report Summary'],
    outputs: ['Web prototype', 'Sample student report', 'Ethics statement', 'Data privacy note', 'Pitch script'],
    question:
      'If your tool cannot diagnose, how can it still help a teacher notice students who may need support sooner?',
    insight:
      'Output support suggestions, not diagnosis. Use simulated data and teacher-friendly prompts, and avoid collecting real sensitive information.',
    difficulty: 'Medium-High',
  },
  'heart-in-gestures': {
    title: 'Camera Feedback for Learning Sign Language',
    award: 'Technovation 2025 Senior Division Grand Prize',
    themeLabel: 'Sign Language Learning',
    audience: 'Children and adults learning Ukrainian Sign Language, accessibility supporters, teachers, and volunteers',
    hook: 'If a phone camera can understand your gestures, can sign-language practice feel like speaking practice with instant feedback?',
    problem:
      'Sign-language learning resources are not always accessible, and learners need low-barrier feedback on whether their gestures are accurate.',
    aiMove:
      'Computer-vision gesture recognition helps children and adults practice Ukrainian Sign Language.',
    studentProject: 'Campus sign practice tool, local gesture dictionary, sports motion feedback, or lab-safety gesture recognizer',
    demoGoal:
      'Use a camera to recognize 5 to 10 basic gestures, give correct or try-again feedback, and create learning levels.',
    aiPowers: ['Computer Vision', 'Gesture Recognition', 'Real-Time Feedback', 'Training Data Collection', 'Learning Path Design'],
    outputs: ['Camera prototype', 'Gesture data cards', 'Practice levels', 'Accessibility value statement'],
    question: 'If you can recognize only five actions, which ones would help real users first?',
    insight:
      'Prototype with Teachable Machine or MediaPipe first, and ask someone who knows sign language to check meanings instead of copying from images only.',
    difficulty: 'Medium-High',
  },
  ambulink: {
    title: 'AI Emergency Navigation for Trackable Ambulance Access',
    award: 'Technovation 2025 Junior Division Grand Prize',
    themeLabel: 'Emergency Care',
    audience: 'Patients and families in health emergencies, ambulance users, and community first-aid volunteers',
    hook: 'If the right ambulance is hard to reach, can AI help choose a hospital and give safe first-aid steps while waiting?',
    problem:
      'During emergencies, people may not know whether an ambulance is verified, when it will arrive, where to go, or what safe first step to take.',
    aiMove:
      'The project connects verified ambulances, real-time tracking, AI-powered first-aid tips, and hospital recommendations.',
    studentProject: 'Campus first-aid navigator, sports injury triage helper, community AED map, or travel emergency Q&A tool',
    demoGoal:
      'Create a simulated emergency app where users choose symptoms and see safety prompts, nearby resources, and one next action.',
    aiPowers: ['Triage Q&A Prompts', 'Location and Resource Recommendation', 'Risk-Level Rules', 'Real-Time Status Display', 'Emergency Script Generation'],
    outputs: ['App prototype', 'Emergency scenario flow', 'Safety boundary note', 'Hospital or resource map sample'],
    question:
      'If you build a school first-aid helper, which cases must only show "contact a teacher, nurse, or emergency service now" instead of letting AI decide?',
    insight:
      'Keep medical guidance conservative. Version one should handle resource navigation and safety prompts, not diagnosis, and urgent outputs should say to contact local emergency services.',
    difficulty: 'Medium-High',
  },
  riverstream: {
    title: 'Community Flood Reporting With AI Early Warning',
    award: 'Technovation 2025 Junior Division Regional Honor',
    themeLabel: 'Climate Adaptation',
    audience: 'Residents in flood-risk areas, school communities, emergency volunteers, local governments, and relief groups',
    hook: 'If everyone can upload local flood information, can AI warn the whole community before an area becomes dangerous?',
    problem:
      'Flood risk changes quickly, and official sensors are limited. Residents need faster ways to share water level, road blockage, and risk changes.',
    aiMove:
      'Users contribute flood data, and AI predicts flooding and notifies users as risk rises.',
    studentProject: 'Campus rainwater map, community heat-risk reports, river-level monitoring, or typhoon safety route helper',
    demoGoal:
      'Build a crowdsourced risk map where users submit location and water-level photos or text, and AI creates a risk level and alert copy.',
    aiPowers: ['Spatiotemporal Data Organization', 'Risk Prediction', 'Image and Text Report Summary', 'Alert Copy Generation', 'Map Visualization'],
    outputs: ['Risk map prototype', 'Simulated report data', 'Alert rule explanation', 'Community emergency poster'],
    question:
      'What community risk would be most useful to report where you live: water, heat, air, traffic, or campus safety?',
    insight:
      'Use simulated data for the map first. Design how data is verified and who confirms it before trying real prediction.',
    difficulty: 'Medium-High',
  },
  'locin-ai': {
    title: 'AI Localization Helper That Keeps Product Voice',
    award: 'Product Hunt 2026 featured localization tool',
    themeLabel: 'Cultural Preservation',
    audience: 'Student teams building apps, websites, club tools, campus services, and cross-language products',
    hook: 'Can the same product message keep its tone and politeness when translated into another language?',
    problem:
      'Literal translation can make product buttons, prompts, and help text sound stiff, lose brand voice, or create confusion.',
    aiMove:
      'AI handles app localization while preserving product voice, context, and brand expression.',
    studentProject: 'Bilingual campus notice helper, club website localization checker, international-school notice tone optimizer, or game UI translation tool',
    demoGoal:
      'Create a campus notice localization desk that outputs formal, friendly, and younger-student versions in a target language, with explanation.',
    aiPowers: ['Machine Translation', 'Tone Rewriting', 'Context Understanding', 'Multi-Version Generation', 'Glossary Constraints'],
    outputs: ['Before and after localization page', 'Glossary', 'Tone selector', 'Error case cards', 'Product demo'],
    question:
      'Which school content most needs multilingual versions: enrollment guides, club recruitment, cafeteria menus, or competition instructions?',
    insight:
      'Limit the first version to two or three languages and one scenario. Collect real short phrases for testing instead of translating a whole site at once.',
    difficulty: 'Medium-High',
  },
  'medicyn': {
    title: 'Private AI Health Record Manager for Scattered Medical Files',
    award: 'Product Hunt 2026 health-record tool',
    themeLabel: 'Health Management',
    audience: 'Individuals and family caregivers managing medical records, prescriptions, allergies, and test reports',
    hook: 'If you cannot remember allergies or medications during a sudden doctor visit, can phone-based AI organize the key facts fast?',
    problem:
      'Health records are scattered across photos, paper reports, hospital apps, and memory, while health data is highly sensitive.',
    aiMove:
      'A private, device-first health-record library organizes medical records, medication, allergies, and reports; student versions can extract key information and create visit summaries.',
    studentProject: 'Family emergency health card, sports-team allergy manager, study-trip medication reminder, or elder-care doctor question list',
    demoGoal:
      'Build a local simulated health profile that extracts allergies, medications, and recent tests from fictional reports and produces a one-page emergency summary.',
    aiPowers: ['OCR', 'Information Extraction', 'Sensitive Data Redaction', 'Summary Generation', 'Reminder Rules'],
    outputs: ['Health profile prototype', 'Privacy note', 'Simulated medical data', 'Emergency summary card', 'Family and doctor views'],
    question:
      'What health information belongs on an emergency card? What should only you or your family see?',
    insight:
      'Use fictional samples only in class. Do not collect classmates real medical records, and make privacy boundaries a scoring focus.',
    difficulty: 'Medium-High',
  },
  cuebuddy: {
    title: 'Voice-Following Teleprompter for Student Speaking',
    award: 'Product Hunt 2026 voice-following teleprompter',
    themeLabel: 'Education Equity',
    audience: 'Students and teachers making speeches, lessons, club videos, livestreams, or project pitches',
    hook: 'When you forget lines or speak too fast, can a teleprompter listen and keep pace like a partner?',
    problem:
      'Ordinary teleprompters require manual speed control, and nervous students can fall out of sync with the script.',
    aiMove:
      'Voice-following teleprompter logic uses speech recognition to locate the current sentence and can provide pause, pacing, and emphasis feedback.',
    studentProject: 'English speech coach, school broadcast teleprompter, club recruitment script helper, or pitch timing tool',
    demoGoal:
      'Build a web teleprompter: paste a script, start recording, auto-highlight the current sentence, and generate pacing feedback.',
    aiPowers: ['Speech Recognition', 'Text Alignment', 'Pacing Analysis', 'Speaking Feedback', 'Auto Highlighting'],
    outputs: ['Teleprompter prototype', 'Before and after speaking video', 'Pacing report', 'Script templates'],
    question:
      'Where would you use it first: English speech, school TV, club recruitment, or a project pitch?',
    insight:
      'Start with offline script and simulated speech-text alignment, then add a real microphone. Short scripts show the effect better than long scripts.',
    difficulty: 'Medium',
  },
  'slack-data-agent-basedash-for-slack': {
    title: 'AI Club Analyst That Answers Data Questions in Chat',
    award: 'Product Hunt 2026 data-agent launch',
    themeLabel: 'Startup Tools',
    audience: 'Teams managing club, signup, volunteer, shop, or student project data',
    hook: 'Without opening a spreadsheet, can you ask the club chat: why did signups drop this week?',
    problem:
      'Data sits in spreadsheets, dashboards, and chats, while nontechnical teammates may not know formulas or dashboards, so decisions depend on guesses.',
    aiMove:
      'A Slack data agent answers questions, queries connected data sources, and sends results and charts back to the thread.',
    studentProject: 'Class event signup Q&A, campus charity-sale inventory helper, club activity analyst, or volunteer-hour stats bot',
    demoGoal:
      'Connect a CSV or sheet, ask natural-language questions, and have AI return numbers, trend explanations, and a simple chart.',
    aiPowers: ['Natural-Language Querying', 'Spreadsheet Analysis', 'Chart Generation', 'Anomaly Explanation', 'Chatbot Interface'],
    outputs: ['Chat-style data Q&A demo', 'Sample data table', 'Chart screenshot', 'Bot answer rules', 'Wrong-answer examples'],
    question:
      'What small campus data is surprisingly hard to count or explain?',
    insight:
      'Use a read-only CSV and limit the bot to 5 to 8 question types. Every answer should cite the columns or calculation rule it used.',
    difficulty: 'High',
  },
  hypersleep: {
    title: 'Habit Guard That Trades Sleep Proof for Phone Access',
    award: 'Product Hunt 2026 digital-wellbeing tool',
    themeLabel: 'Health Management',
    audience: 'Students who scroll before bed, families, and digital-wellbeing tool users',
    hook: 'If apps only unlock after you actually sleep enough, would late-night scrolling go down?',
    problem:
      'Many people know they should sleep earlier, but willpower is weak, and ordinary screen-time limits are easy to turn off.',
    aiMove:
      'Sleep records, phone-use data, and self-reported mood can feed suggestions and alerts, while rules block entertainment until sleep goals are met.',
    studentProject: 'Class sleep challenge, after-study phone reminder, sports recovery monitor, or teen digital-health self-check',
    demoGoal:
      'Build a sleep-for-points prototype where simulated sleep and phone-use data generate AI advice and unlock entertainment tasks only after goals are met.',
    aiPowers: ['Behavior Data Analysis', 'Rules Engine', 'Personalized Advice', 'Reminder Copy Generation', 'Trend Visualization'],
    outputs: ['Sleep challenge dashboard', 'Unlock rule explanation', 'Simulated dataset', 'AI advice cards', 'Digital-health poster'],
    question:
      'What proof of real rest would you accept: hours slept, next-day energy, or a one-week trend?',
    insight:
      'A classroom demo does not need a real sleep device. Use forms and simulated data to test whether the rules and feedback make sense.',
    difficulty: 'Medium',
  },
  'intelligent-nose-ai-for-honeytype-detecting': {
    title: 'AI Food Testing Station That Smells Honey Types',
    award: 'Science on Stage AI in STEM Challenge Winner',
    themeLabel: 'Food Safety',
    audience: 'Beekeeping clubs, beekeepers, food labs, school science teams, and honey buyers',
    hook: 'If a low-cost electronic nose can classify honey, do samples always need expensive lab testing?',
    problem:
      'Honey type and quality testing often depends on lab analysis, which is costly and slow for small beekeepers and school projects.',
    aiMove:
      'Students used a BME688 gas sensor to collect volatile honey scent data and trained an AI model to classify honey types.',
    studentProject: 'Tea, coffee, soil smell, air quality, or fruit ripeness classifier with low-cost sensors',
    demoGoal:
      'Use simulated or public sensor data to build a classification dashboard with prediction, confidence, and confusion matrix.',
    aiPowers: ['Sensor Data Classification', 'Machine-Learning Training', 'Feature Extraction', 'Accuracy Evaluation', 'Data Visualization'],
    outputs: ['Sensor sample table', 'Model result page', 'Confusion matrix', 'Experiment poster', 'Sample demo video'],
    question:
      'What nearby thing is usually judged by smell, sight, or touch and could become a data-based AI detector?',
    insight:
      'Start with CSV sensor data before adding hardware. If you connect sensors later, record environment variables and repeated sampling.',
    difficulty: 'High',
  },
  'predictive-ai-saves-our-planet': {
    title: 'AI Ocean Protection Map for Illegal Fishing',
    award: 'Science on Stage AI in STEM Challenge Winner',
    themeLabel: 'Ocean Protection',
    audience: 'Marine conservation groups, coastal communities, fishery regulators, environmental clubs, and students',
    hook: 'If a boat fishes secretly in a protected zone, can students use AI to notice suspicious patterns early?',
    problem:
      'Illegal fishing damages ecosystems and legal livelihoods, but ocean areas are huge and manual patrols are costly.',
    aiMove:
      'AI-supported monitoring can analyze boat tracks, protected zones, weather, and time to flag suspicious patterns.',
    studentProject: 'River patrol, beach-trash hotspot map, lake water alert, protected-area visitor monitor, or environmental anomaly detector',
    demoGoal:
      'Create a marine data map with simulated vessel tracks, protected zones, and AI or rules that flag lingering, detours, or night activity.',
    aiPowers: ['Spatiotemporal Analysis', 'Anomaly Detection', 'Map Visualization', 'Rule Model', 'Risk Scoring'],
    outputs: ['Interactive map', 'Abnormal track examples', 'Risk scoring guide', 'Action suggestion cards', 'Pitch poster'],
    question:
      'Besides the ocean, where near school could you map unusual behavior: waste bins, shared bikes, gate traffic, or campus safety?',
    insight:
      'Use synthetic track data for rules and visualization first. After the logic works, connect public maps or open environmental data.',
    difficulty: 'High',
  },
  'eco-guard-together-for-clean-air': {
    title: 'Drone and App Community Helper for Finding Air-Pollution Sources',
    award: 'Science on Stage AI in STEM Challenge Winner',
    themeLabel: 'Air Quality',
    audience: 'Community residents, environmental clubs, school science teams, local volunteers, and people sensitive to air quality',
    hook: 'Air pollution is not just one number. Can a drone and app help a community find where it comes from?',
    problem:
      'Air-quality data is often city-wide, so residents may not know which street, area, or time is worse in their own community.',
    aiMove:
      'A drone and mobile app analyze air quality, locate pollution sources, and predict threats.',
    studentProject: 'Campus air heat map, cafeteria smoke or playground dust study, school-route traffic pollution reminder, or community noise and air monitor',
    demoGoal:
      'Create a community air dashboard: enter PM2.5, temperature, and humidity by location, generate a heat map, and have AI suggest likely sources and actions.',
    aiPowers: ['Environmental Data Analysis', 'Spatial Heat Map', 'Trend Prediction', 'Anomaly Alert', 'Action Suggestion Generation'],
    outputs: ['Air-quality map', 'Sampling route', 'Sensor data table', 'Community suggestion cards', 'Demo video'],
    question:
      'Which campus corners would you monitor for air quality? Would it change walking routes, sports time, or window opening habits?',
    insight:
      'You can start without a drone by using phone location and manual sampling. The core is the sampling rule and a map that explains the problem clearly.',
    difficulty: 'Medium',
  },
  see4me: {
    title: 'AI Pocket Recognition and Voice Navigation Helper for Blind Users',
    award: 'Science on Stage AI in STEM Challenge Winner',
    themeLabel: 'Accessibility',
    audience: 'Blind users, older adults with low vision, accessibility volunteers, special-education teachers, and people needing temporary visual support',
    hook:
      'Can one camera plus voice feedback help someone identify products, money, obstacles, and whether fruit is fresh?',
    problem:
      'Shopping, identifying cash, avoiding obstacles, and judging food freshness depend heavily on vision, so portable low-cost support matters.',
    aiMove:
      'A Raspberry Pi 5, AI camera, and audio feedback support object recognition, product reading, money recognition, obstacle detection, and freshness analysis.',
    studentProject: 'Campus accessibility recognizer, cafeteria menu reader, medicine or textbook identifier, hallway obstacle alert, or exhibit audio guide',
    demoGoal:
      'Build a browser prototype: upload an image, recognize objects, and generate a short spoken reminder.',
    aiPowers: ['Image Recognition', 'Object Detection', 'OCR', 'Text-to-Speech', 'Scene Description'],
    outputs: ['Recognition demo', 'Accessibility user flow', 'Test image set', 'Voice samples', 'Ethics and privacy note'],
    question:
      'Can you find five school situations where not seeing clearly creates real friction? Which one should become the first demo?',
    insight:
      'Do not start with every feature. Pick one frequent task, such as menu reading or hallway obstacle alerts, and design a clear low-confidence warning.',
    difficulty: 'High',
  },
  feelosophai: {
    title: 'AI Support Tool for Reading Emotion in Art and Body Cues',
    award: 'Science on Stage AI in STEM Challenge Winner',
    themeLabel: 'Mental Health',
    audience: 'Special-education teachers, mental-health clubs, parents supporting autistic children, and students designing emotion-expression tools',
    hook:
      'When a child cannot easily express feelings in words, can AI help teachers notice emotional signals in drawings and movement?',
    problem:
      'Some autistic children or less verbal students have difficulty stating emotions directly, and adults need gentle observation cues without treating AI as a doctor.',
    aiMove:
      'AI analyzes children drawings and body-language cues to support recognition of emotional expression signals.',
    studentProject: 'Emotion doodle diary, anonymous class mood board, artwork emotion tagger, campus counseling activity feedback, or story-character emotion analyzer',
    demoGoal:
      'Build an emotion-support card prototype: upload a drawing or choose movement cues, and let AI suggest possible emotions and follow-up questions without diagnosis.',
    aiPowers: ['Image Understanding', 'Pose and Movement Cue Analysis', 'Text Generation', 'Multimodal Explanation', 'Risk Prompting'],
    outputs: ['Emotion support demo', 'Sample drawing set', 'AI follow-up cards', 'Consent note', 'Misjudgment boundary list'],
    question:
      'If you design an emotion tool that does not judge people, what should it say and what should it never say?',
    insight:
      'Position the project as expression support, not diagnosis. Use self-made samples or openly licensed materials, and avoid collecting real sensitive mental-health data.',
    difficulty: 'High',
  },
  cakewordai: {
    title: 'Turning Nearby Objects Into Multilingual Vocabulary Stickers',
    award: 'Product Hunt 2026 language-learning app',
    themeLabel: 'Education Equity',
    audience: 'Language learners, bilingual families, young learners, immigrant families, and language teachers',
    hook: 'Can a phone pointed at a cup, toy, or school sign turn the real world into vocabulary cards?',
    problem:
      'Vocabulary memorization is often detached from real scenes, and children apps require extra care around accounts, ads, and data collection.',
    aiMove:
      'On-device AI identifies objects, cuts them into stickers, speaks the target-language name, and adds them to a word library.',
    studentProject: 'Campus multilingual scavenger dictionary, museum or campus vocabulary stickers, hometown dialect object cards, or bilingual lab-equipment list',
    demoGoal:
      'Upload or take an object photo, identify it, generate names in multiple languages, pronunciation, example sentences, and a review list.',
    aiPowers: ['Image Recognition', 'Object Segmentation', 'Machine Translation', 'Text-to-Speech', 'Spaced Review'],
    outputs: ['Vocabulary card web prototype', 'Word Dex library', 'Campus scavenger task sheet', 'Privacy design note', 'Demo video'],
    question:
      'Which school objects would you most like to turn into speaking vocabulary cards? Would it be for English, Japanese, or a local dialect?',
    insight:
      'Start with ten campus objects and one or two languages. Use image upload before live camera, and make clear that student photos are not saved.',
    difficulty: 'Medium',
  },
  'avatars-in-elevencreative': {
    title: 'Turning Scripts Into Talking AI Course Hosts',
    award: 'Product Hunt 2026 AI video launch',
    themeLabel: 'Education Equity',
    audience: 'Students and teachers making lesson explanations, club promotions, campus news, project pitches, or multilingual videos',
    hook: 'Can students write a script, pick an avatar and voice, and produce a multilingual explanation video?',
    problem:
      'Student video production can get stuck on appearing on camera, voiceover, retakes, editing, and rerecording for different languages.',
    aiMove:
      'Avatar video tools combine scripts, voices, avatars, lip sync, reusable visual identities, and batch flows.',
    studentProject: 'Campus news AI host, historical-character explainer, lab-safety presenter, multilingual club recruitment video, or virtual mascot guide',
    demoGoal:
      'Build an AI host video script desk that generates a 30-second script, subtitles, storyboard, and AI-generated disclosure label.',
    aiPowers: ['Script Generation', 'Speech Synthesis', 'Avatar Generation', 'Lip Sync', 'Subtitle Translation', 'Batch Workflow'],
    outputs: ['Short video script', 'Avatar host sample or storyboard', 'Subtitle file', 'AI disclosure label', 'Media ethics note'],
    question:
      'If your school allowed a virtual host, what should it explain? Which faces, voices, or identities should never be copied casually?',
    insight:
      'Use virtual characters or authorized materials first. Do not use classmates photos as avatars, and disclose AI-generated or simulated content at the start or end.',
    difficulty: 'High',
  },
  'prometheus-by-firecrawl': {
    title: 'AI Web Researcher That Writes Data Collection Scripts',
    award: 'Product Hunt 2026 developer tool launch',
    themeLabel: 'Startup Tools',
    audience: 'Student teams doing research, competition tracking, club operations analysis, market observation, or news monitoring',
    hook: 'Can AI turn one sentence about the data you need into a script, sample run, and scheduled update?',
    problem:
      'Student projects often need data from many web pages, but copy-pasting misses details and scraping code breaks when pages change.',
    aiMove:
      'Natural-language data requests become collectors, reproducible SDK code, sample data, hosted schedules, and self-maintained extraction tasks.',
    studentProject: 'Competition information collector, environmental news watchlist, campus event calendar collector, scholarship tracker, or product price monitor',
    demoGoal:
      'Input a tracking topic and fields, then generate a collection plan, source list, table schema, and runnable or simulated sample data.',
    aiPowers: ['Web Search', 'Structured Extraction', 'Code Generation', 'Scheduled Tasks', 'Data Cleaning', 'Source Citation'],
    outputs: ['Collection task brief', 'Sample data table', 'Field dictionary', 'Source citation list', 'Trend chart or dashboard'],
    question:
      'If you track a real issue over time, such as gate traffic, competitions, or climate news, which fields must stay fixed?',
    insight:
      'Use public, permitted pages and a few fields for the demo. Keep source links for every result, and do not treat AI-found information as verified.',
    difficulty: 'High',
  },
  qursor: {
    title: 'Helping AI Know Which Button You Mean on a Web Page',
    award: 'Product Hunt 2026 design-dev tool launch',
    themeLabel: 'Startup Tools',
    audience: 'Student developers, designers, teachers, and reviewers working on websites, apps, posters, or club pages',
    hook: 'Instead of saying "change this button," can you send AI the selector, font, color, and comment for the exact element?',
    problem:
      'Visual feedback is often vague: AI may identify the wrong element from a screenshot, and explaining spacing or color by hand takes time.',
    aiMove:
      'A browser extension lets users point at page elements and copy code-aware context, including selectors, classes, styles, fonts, colors, and comments.',
    studentProject: 'Campus website feedback marker, class peer-review tool, accessibility UI checker, or component collection and redesign exercise',
    demoGoal:
      'Click a page element, generate element-info JSON, a change comment, and an AI-ready prompt, then show before and after.',
    aiPowers: ['DOM Element Recognition', 'Style Extraction', 'Structured Prompting', 'Component Export', 'AI Change Suggestions'],
    outputs: ['Web annotation prototype', 'Element context JSON', 'AI edit prompt', 'Before and after screenshots', 'Feedback rules'],
    question:
      'When a classmate helps you improve a web page, what is hardest to explain clearly: color, spacing, wording, or layout?',
    insight:
      'A classroom version does not need a full browser extension. Start in a local page with three steps: click element, read styles, generate prompt.',
    difficulty: 'Medium-High',
  },
  'meet-warren-3-0': {
    title: 'AI Conversation Roadmap for Future Life Budgets',
    award: 'Product Hunt 2026 financial-planning app launch',
    themeLabel: 'Startup Tools',
    audience: 'High-school students and families planning independent living, project budgets, financial literacy, or long-term goals',
    hook: 'Can AI talk through whether college living costs, club budgets, or future savings goals are realistic?',
    problem:
      'Many people do not know how to put income, expenses, goals, and risks into one plan, and generic chatbots may skip assumptions and boundaries.',
    aiMove:
      'A voice-supported planning partner learns goals through conversation, creates long-term plans, supports what-if questions, visualizes goals, and flags changes.',
    studentProject: 'College living-budget simulator, club event budget helper, allowance goal planner, nonprofit spending simulator, or graduation trip planner',
    demoGoal:
      'Build a future-budget conversation helper that collects goals, income, and expenses, then creates a budget table, timeline, assumptions, and scenario comparison.',
    aiPowers: ['Voice or Text Conversation', 'Information Extraction', 'Scenario Simulation', 'Explanation Generation', 'Chart Visualization', 'Risk Prompting'],
    outputs: ['Budget plan table', 'Scenario comparison chart', 'Assumption list', 'Risk prompt card', 'Not-financial-advice statement'],
    question:
      'If you plan a real goal such as a laptop, competition, trip, or college living cost, which variable are you most unsure about?',
    insight:
      'Use fictional data for education only and do not connect real bank accounts. Practice budgets, assumptions, and explanations without giving investment instructions.',
    difficulty: 'Medium-High',
  },
  staywoke: {
    title: 'AI Wake-Up Helper for Drowsy Driving',
    award: 'Technovation 2026 safety project, public pitch video',
    themeLabel: 'Traffic Safety',
    audience: 'Night or long-distance drivers, school bus contexts, and family passengers',
    hook: 'If a driver starts getting sleepy, can a phone notice first and wake them with sound?',
    problem:
      'Drowsy driving is hard for drivers to notice themselves, and ordinary reminders do not react to actual state.',
    aiMove:
      'Face recognition and computer vision watch fatigue signals such as closed eyes or yawning, then combine voice interaction with real-time alerts.',
    studentProject: 'Late-night pickup safety alert, study fatigue reminder, or cycling helmet distraction prompt',
    demoGoal:
      'Build a camera helper that detects blinking or head-down states and alerts users with voice or popup prompts.',
    aiPowers: ['Computer Vision', 'Fatigue State Recognition', 'Voice Reminder', 'Human-Computer Interaction'],
    outputs: ['Camera detection demo', 'Fatigue rule table', 'Before and after reminder video'],
    question:
      'Where have you seen people being tired but not noticing it? Besides driving, who else could this protect?',
    insight:
      'Start with one observable action such as eyes closed for two seconds or head dropping, instead of judging complex emotion.',
    difficulty: 'Medium',
  },
  'azolla-care': {
    title: 'Letting Aquatic Feed Plants Ask for Help',
    award: 'Technovation 2026 agriculture project, public pitch video',
    themeLabel: 'Smart Agriculture',
    audience: 'Farmers, school farms, and communities interested in low-cost animal feed',
    hook: 'If a plant can alert people before its condition declines, can farms waste less feed?',
    problem:
      'Azolla and similar organic feed plants need the right environment, and manual checks may miss water-quality or growth problems.',
    aiMove:
      'Sensor data and AI judge plant-environment risk and remind users to adjust light, water, or care conditions.',
    studentProject: 'Class hydroponic plant manager, campus garden warning system, or pet plant care helper',
    demoGoal:
      'Build a plant monitoring panel that reads temperature, light, or water-level data and gives care suggestions.',
    aiPowers: ['Sensor Data Analysis', 'Anomaly Detection', 'Predictive Reminder', 'Advice Generation'],
    outputs: ['IoT data panel', 'Plant health score', 'Automated reminder flowchart'],
    question:
      'Is there a plant or small animal around you that needs daily care from experience? Which signals could become data?',
    insight:
      'Simulate sensors with manual input first, then make the healthy versus risky rules clear. Hardware can come later.',
    difficulty: 'Medium-High',
  },
  celia: {
    title: 'Gluten-Free Food Helper You Can Understand by Scanning',
    award: 'Technovation 2026 health project, public pitch video',
    themeLabel: 'Healthy Eating',
    audience: 'People with celiac disease or gluten sensitivity, parents, school cafeterias, and travelers',
    hook: 'When an ingredient label is confusing, can AI help a celiac user decide whether a snack may be risky?',
    problem:
      'Food labels and barcode data are complex, and users need quick understanding of gluten or cross-contamination risk.',
    aiMove:
      'The app scans labels and barcodes, identifies ingredient risk, and uses a chatbot to explain warnings and alternatives.',
    studentProject: 'Allergen scanner, school cafeteria safety menu, or sports nutrition label explainer',
    demoGoal:
      'Build a food-safety helper that marks risk words from an image or ingredient input and creates readable advice.',
    aiPowers: ['OCR', 'Barcode and Label Parsing', 'Risk Classification', 'Health Q&A'],
    outputs: ['Food scanning demo', 'Risk word library', 'User Q&A script', 'Alternative food suggestion cards'],
    question:
      'If you have an allergy or dietary limit, what are you most afraid of missing on a snack label? How should AI warn without scaring people?',
    insight:
      'Limit the first version to one risk such as gluten, peanuts, or lactose, and build a small glossary with clear high, medium, and low risk explanations.',
    difficulty: 'Medium',
  },
  teen4steam: {
    title: 'STEAM Mentor That Helps Girls Keep Leveling Up',
    award: 'Technovation 2026 education project, public pitch video',
    themeLabel: 'STEAM Education',
    audience: 'Girls interested in STEAM who need support, role models, and community; club teachers; after-school organizers',
    hook: 'If AI coaches you like a game guide, will more girls keep learning technology?',
    problem:
      'Girls entering STEAM often lack steady encouragement, peer community, and personalized guidance.',
    aiMove:
      'AI tutoring generates challenges, hints, and feedback for different levels, while community mechanics encourage completion.',
    studentProject: 'Class AI innovation quest map, girls coding-club challenges, or campus project-based learning coach',
    demoGoal:
      'Build an AI learning-task app that recommends challenges, gives hints, records badge progress, and shows growth.',
    aiPowers: ['Learning Path Recommendation', 'Hint Generation', 'Personalized Feedback', 'Task Leveling'],
    outputs: ['Quest-style learning prototype', 'Badge system', 'AI mentor dialogue examples', 'User growth record'],
    question:
      'In which class would you most want a coach who never laughs at you? Should it give hints first or encouragement first?',
    insight:
      'Split tasks into three levels: starter, challenge, and create. Let AI give only the next hint so students keep the feeling of completing it themselves.',
    difficulty: 'Medium',
  },
  birdomonitor: {
    title: 'Using Birdsong to Check Urban Ecosystem Health',
    award: 'Technovation 2026 biodiversity project, public pitch video',
    themeLabel: 'Biodiversity',
    audience: 'Ecology researchers, city planners, school nature clubs, and community environmental volunteers',
    hook: 'If city birds are disappearing, can AI hear the change first?',
    problem:
      'Bird population changes reflect ecosystem health, but long-term manual observation is costly and limited in coverage.',
    aiMove:
      'Audio recognition models analyze bird calls, count species frequency, and help track population changes and habitat risk.',
    studentProject: 'Campus birdsong map, community biodiversity station, or wetland sound monitoring system',
    demoGoal:
      'Upload birdsong audio, identify category, log location, and generate a trend chart for an ecological monitoring demo.',
    aiPowers: ['Audio Classification', 'Species Recognition', 'Trend Analysis', 'Map Visualization'],
    outputs: ['Birdsong recognition demo', 'Campus sampling map', 'Species trend chart', 'Environmental suggestion poster'],
    question:
      'What natural sounds do you hear near school? Could they become a campus ecosystem health table?',
    insight:
      'Use public birdsong data or small phone recordings first. Show sampling methods and trends, not only recognition accuracy.',
    difficulty: 'Medium-High',
  },
  'taste-lab': {
    title: 'Letting AI Read a Website Design DNA',
    award: 'Product Hunt 2026 design-analysis launch',
    themeLabel: 'Design Tools',
    audience: 'Student developers and designers building AI web pages, club sites, portfolios, or project showcases',
    hook: 'If you give AI a website, can it explain the design choices behind color, type, spacing, and layout?',
    problem:
      'Students often say "make it like this style," but vague adjectives lead AI to make similar but unpolished pages, and feedback lacks reusable language.',
    aiMove:
      'AI analyzes website color, typography, spacing, and design decisions, then outputs a complete design breakdown for AI agents.',
    studentProject: 'Campus website style analyzer, club poster or web design DNA extractor, AI redesign prompt generator, or good-website case library',
    demoGoal:
      'Input a public URL and output color palette, type hierarchy, layout traits, design rationale, and an AI redesign prompt.',
    aiPowers: ['Web Parsing', 'Visual and Style Analysis', 'Design Rule Extraction', 'Prompt Generation', 'Structured Output'],
    outputs: ['Design DNA report', 'Color and type boards', 'AI redesign prompt', 'Before and after screenshots', 'Design-rationale note'],
    question:
      'Which campus or brand website would you most like to analyze? Is its design DNA mainly color, typography, whitespace, or voice?',
    insight:
      'Analyze one or two public websites first. Separate objective style data from AI-inferred design rationale.',
    difficulty: 'Medium',
  },
  allergo: {
    title: 'Multilingual Safety Cards for Travelers With Allergies',
    award: 'Product Hunt 2026 allergy-translation app',
    themeLabel: 'Health Safety',
    audience: 'Travelers with food allergies, celiac disease, or dietary restrictions; student families; restaurant staff; and trip leaders',
    hook: 'When you cannot explain an allergen abroad, can AI generate a safety card locals can understand?',
    problem:
      'Allergy terms vary across countries and languages, translation may miss serious risks, and emergencies need fast clear explanations.',
    aiMove:
      'AI creates allergy translation cards, wallet cards, assistant dialogue, and emergency phrases based on location and selected allergens.',
    studentProject: 'Cafeteria allergy card, study-trip food safety helper, sports medical info card, or multilingual restaurant communication card',
    demoGoal:
      'Choose allergens and a destination language, then generate bilingual or local-language cards, icons, emergency text, and a QR share page.',
    aiPowers: ['Machine Translation', 'Localized Expression', 'Form Extraction', 'Risk Prompt Generation', 'Voice or Dialogue Support'],
    outputs: ['Multilingual safety card', 'QR page', 'Icon glossary', 'Emergency phrases', 'Use-case guide'],
    question:
      'If your school organizes an international exchange, which health information should be prepared as multilingual cards first?',
    insight:
      'A classroom version is only communication support, not medical advice. High-risk terms should show original text, translation, and icons together.',
    difficulty: 'Medium',
  },
  memoriq: {
    title: 'Private Knowledge Base for Important AI Conversations',
    award: 'Product Hunt 2026 privacy-first AI memory tool',
    themeLabel: 'Privacy Protection',
    audience: 'Students, teachers, and clubs who use AI for learning, competitions, coding, or research organization',
    hook: 'Can the best answers from ChatGPT or Claude become a private searchable memory library?',
    problem:
      'Important AI conversations are scattered across platforms, hard to find later, and risky if stored in plain text on ordinary cloud services.',
    aiMove:
      'Important conversations from AI tools are saved into an end-to-end encrypted vault with search, organization, open-source options, and self-hosting.',
    studentProject: 'Personal AI learning archive, club project Q&A base, error-explanation memory, research conversation index, or privacy-first prompt collection',
    demoGoal:
      'Paste an AI conversation, extract topic, keywords, conclusions, and review questions, then support search and tag filtering.',
    aiPowers: ['Text Summary', 'Keyword Extraction', 'Semantic Search', 'Tag Classification', 'Privacy and Encryption Design'],
    outputs: ['Conversation knowledge-base page', 'Search and tag UI', 'Review cards', 'Privacy design note', 'Sample dataset'],
    question:
      'Which AI conversations would you most want to save: coding, writing, mistakes, competition research, or project ideas?',
    insight:
      'A classroom version can skip real end-to-end encryption at first, but the interface must include local save, sensitive-data deletion, and backup export flows.',
    difficulty: 'Medium-High',
  },
  'athenic-2-0': {
    title: 'Ask for Charts and Automated Reports in Natural Language',
    award: 'Product Hunt 2026 agentic data analyst launch',
    themeLabel: 'Data Analysis',
    audience: 'Student teams and teachers analyzing spreadsheets, surveys, club operations, competition signup, or campus event data',
    hook: 'Without writing SQL, can one sentence turn club data into charts and weekly reports?',
    problem:
      'Students may collect data but not know how to clean, question, chart, or explain trends, and repeated reports take time.',
    aiMove:
      'An agentic data analyst connects to data sources or uploads, analyzes structured data in natural language, automates workflows, and creates charts or dashboards.',
    studentProject: 'Club event data analyst, campus survey insight board, library borrowing trend report, class sports weekly report, or environmental monitoring explainer',
    demoGoal:
      'Upload a CSV, ask questions in natural language, and generate charts, explanations, follow-up suggestions, and a one-page report.',
    aiPowers: ['Natural-Language Querying', 'Data Cleaning', 'Chart Generation', 'Trend Explanation', 'Automated Report', 'Follow-Up Suggestions'],
    outputs: ['Data dashboard', 'AI Q&A log', 'Automated report', 'Chart explainer cards', 'Data-source note'],
    question:
      'What real campus data do you have that could answer one meaningful question?',
    insight:
      'Use an anonymous small dataset and define fields clearly. Show raw data, AI questions, charts, and conclusions so classmates can verify them.',
    difficulty: 'High',
  },
  folio: {
    title: 'Turning Student Materials Into Editable Professional Slides',
    award: 'Product Hunt 2026 presentation tool launch',
    themeLabel: 'Presentation Skills',
    audience: 'Students and teachers making project pitches, research reports, club showcases, competition defenses, or class talks',
    hook: 'If AI-generated slides remain editable shapes instead of flat images, how would class presentations change?',
    problem:
      'Students spend too much time formatting slides, and many AI deck tools output images that are hard to revise after teacher feedback.',
    aiMove:
      'AI creates and fixes presentations while preserving editable shapes, supporting prompts, existing decks, uploaded materials, and template style.',
    studentProject: 'Project pitch deck helper, research report to slides, class presentation template checker, or speech-to-slide workspace',
    demoGoal:
      'Input a topic and materials, then generate outline, slide titles, speaker notes, image suggestions, and editable slide layout previews.',
    aiPowers: ['Source Summary', 'Presentation Outline Generation', 'Layout Suggestion', 'Text Rewriting', 'Template Matching', 'Visual Consistency Check'],
    outputs: ['Slide prototype', 'Speaker notes', 'Source citation page', 'Layout explanation', 'Before and after revision comparison'],
    question:
      'In your last presentation, what took the most time: finding sources, building logic, formatting, or practicing? Which part should AI help with?',
    insight:
      'A classroom version can output structured slide JSON or a web preview before exporting PPT. Require students to state sources and presentation logic.',
    difficulty: 'Medium-High',
  },
  purebite: {
    title: 'Adding an AI Pesticide-Risk Radar to Food Labels',
    sourceProject: 'Purebite',
    year: '2025',
    award: 'Technovation Girls 2025 Beginner Division Finalist Team',
    themeLabel: 'Food Safety',
    audience: 'Families, school cafeteria buyers, and community market volunteers concerned about pesticide-contaminated food',
    hook:
      'Before buying fruit or vegetables, can AI warn when the source may carry higher pesticide risk?',
    problem:
      'Consumers cannot easily tell from labels whether food may be pesticide-contaminated, and local sample-risk data is hard to understand.',
    aiMove:
      'The project scans labels, uses an AI advisor for risky food, and maps markets with contaminated samples.',
    studentProject: 'Campus cafeteria ingredient checker, community market safety map, or pesticide-risk Q&A helper',
    demoGoal:
      'Build a demo that reads a food label, highlights risk terms, gives safety suggestions, and marks sample risks on a map.',
    aiPowers: ['OCR', 'Risk-Term Classification', 'AI Q&A', 'Map Visualization', 'Suggestion Generation'],
    outputs: ['Food scan demo', 'Risk-word list', 'Market risk map', 'AI advice card', 'Data-source note'],
    question:
      'If food-safety AI makes a wrong call, does it create panic or false confidence?',
    insight:
      'Use public sample labels and simulated testing data in class. Do not claim the app can truly detect pesticide residue.',
    difficulty: 'Medium',
    coverImageAlt: 'Purebite pitch video thumbnail showing a student presenting a food safety scanning app.',
    coverImageSource: 'Technovation official pitch video thumbnail: https://youtu.be/RDT9wLCj5sY',
    coverImageStatus: 'Needs confirmation',
    coverImageHint: 'Show produce labels, a phone risk card, and a market map with risk markers.',
  },
  'k-rem': {
    title: 'AI Navigation Eyes for Blind and Low-Vision Users',
    sourceProject: 'Korem / Körem',
    year: '2025',
    award: 'Technovation Girls 2025 Senior Regional Honoree: Asia',
    themeLabel: 'Accessibility',
    audience: 'Blind or low-vision users, accessibility volunteers, and public-space service staff',
    hook:
      'When entering an unfamiliar space, can AI read obstacles, text, and directions aloud first?',
    problem:
      'Blind users often need to identify obstacles, objects, and text in unfamiliar spaces, while human assistance and traditional aids cannot cover every detail.',
    aiMove:
      'The project uses AI and computer vision to help users navigate spaces, recognize objects, and read text.',
    studentProject: 'Campus accessibility navigator, classroom object reader, bus-stop text reader, or exhibit audio guide',
    demoGoal:
      'Build a camera prototype that recognizes objects and text, then speaks directions or obstacle warnings.',
    aiPowers: ['Computer Vision', 'Object Recognition', 'OCR', 'Voice Output', 'Scene Description'],
    outputs: ['Camera recognition demo', 'Voice prompt script', 'Campus route map', 'User testing notes'],
    question:
      'When AI is uncertain, should it stay silent, guess, or clearly say it is uncertain?',
    insight:
      'Limit the first version to a safe scene such as desk objects or door signs, and design clear uncertainty prompts.',
    difficulty: 'Medium-High',
    coverImageAlt: 'Korem pitch video thumbnail showing an AI visual navigation app for blind users.',
    coverImageSource: 'Technovation official pitch video thumbnail: https://www.youtube.com/watch?v=tc0sog0m_o8',
    coverImageStatus: 'Needs confirmation',
    coverImageHint: 'Show a phone camera identifying obstacles, signs, and directions with spoken guidance.',
  },
  'power-track': {
    title: 'AI Energy Helper That Warns Before Planned Blackouts',
    sourceProject: 'Power Track',
    year: '2025',
    award: 'Technovation Girls 2025 Beginner Regional Honoree: Africa',
    themeLabel: 'Energy Planning',
    audience: 'Families, schools, local shops, and students who need to plan around scheduled power outages',
    hook:
      'If planned blackouts disrupt studying, can AI help households and schools prepare earlier?',
    problem:
      'Load-shedding can interrupt study, home routines, and small businesses, so people need advance warnings and practical preparation plans.',
    aiMove:
      'The project uses historical data to predict future load-shedding events and encourage responsible energy use.',
    studentProject: 'Campus study planner for outages, family power-use predictor, club backup-power planner, or energy-saving reminder',
    demoGoal:
      'Read a historical outage schedule, predict risk windows, and generate study, charging, and lighting plans.',
    aiPowers: ['Time-Series Prediction', 'Historical Data Analysis', 'Reminder Generation', 'Schedule Planning', 'Energy-Saving Suggestions'],
    outputs: ['Outage prediction dashboard', 'Household checklist', 'Reminder flow', 'Energy tips card', 'Accuracy note'],
    question:
      'If prediction works better for some communities than others, who gets left behind?',
    insight:
      'Use public or simulated schedules in class. Make clear that predictions help with preparation and do not guarantee accuracy.',
    difficulty: 'Medium-High',
    coverImageAlt: 'Power Track pitch video thumbnail showing an AI app for planned power outage prediction.',
    coverImageSource: 'Technovation official pitch video thumbnail: https://www.youtube.com/watch?v=KcyYUNIyh3o',
    coverImageStatus: 'Needs confirmation',
    coverImageHint: 'Show a household power timeline, outage alert, phone schedule, and backup checklist.',
  },
  'natural-disaster-rescue-assistant': {
    title: 'AI Emergency Helper That Builds a Family Escape Plan',
    sourceProject: 'Natural Disaster Rescue Assistant',
    year: '2025',
    award: 'Technovation Girls 2025 Beginner Regional Honoree: North America',
    themeLabel: 'Emergency Planning',
    audience: 'Families, students, community volunteers, and school safety leaders in disaster-prone areas',
    hook:
      'Before an earthquake, flood, or wildfire, can AI turn emergency advice into a family-specific route map?',
    problem:
      'Generic emergency guides can be too broad, leaving families unsure how to plan around location, family members, supplies, and special needs.',
    aiMove:
      'The AI-powered web app generates personalized emergency escape plans for earthquakes, floods, wildfires, pandemics, and similar disasters.',
    studentProject: 'Campus emergency route generator, family preparedness checklist, shelter recommendation tool, or field-trip safety planner',
    demoGoal:
      'Input household needs and disaster type, then generate an escape route, supply list, and emergency contact card.',
    aiPowers: ['Form Extraction', 'Personalized Plan Generation', 'Map and Route Prompting', 'Risk Classification', 'Checklist Generation'],
    outputs: ['Emergency plan webpage', 'Household checklist', 'Route sketch', 'Risk card', 'Human review note'],
    question:
      'Who must review an AI-generated disaster route, and what official information can it never replace?',
    insight:
      'Do not let AI invent live disaster data. Use user input and public safety rules, and always point users back to official alerts.',
    difficulty: 'Medium',
    coverImageAlt: 'Natural Disaster Rescue Assistant pitch video thumbnail showing a personalized disaster escape plan app.',
    coverImageSource: 'Technovation official pitch video thumbnail: https://www.youtube.com/watch?v=mPtQstGhIJQ',
    coverImageStatus: 'Needs confirmation',
    coverImageHint: 'Show a family map, evacuation route, supply checklist, and AI-generated preparedness steps.',
  },
  neuharmony: {
    title: 'Personalized Music and AI Growth Plans for Neurodiverse Children',
    sourceProject: 'Neuharmony',
    year: '2025',
    award: 'Technovation Girls 2025 Special Award Winner; Technovation Girls Kazakhstan 2025 regional winner and semifinalist',
    themeLabel: 'Health and Special Education',
    audience: 'Children on the autism spectrum, families, social-service centers, music-therapy teachers, and special-education teams',
    hook:
      'If music practice could adapt to each child’s next reachable step, could AI support autistic children more gently?',
    problem:
      'Many families cannot afford long-term personalized support and lack an online plan that adapts to a child’s current needs.',
    aiMove:
      'Technovation describes Neuharmony as an AI-powered platform, and ER10 reports that it uses custom AI algorithms to personalize learning plans with neuroscience and music-therapy methods.',
    studentProject: 'Music-based emotion regulation planner, special-education activity recommender, home practice tracker, or small-step growth plan generator',
    demoGoal:
      'Input a child’s goal, attention state, and music preference, then generate a weekly practice plan, activity notes, and observation sheet.',
    aiPowers: ['Personalized Recommendation', 'Plan Generation', 'Learning-State Logging', 'Text Explanation', 'Progress Summary'],
    outputs: ['Personalized music plan', 'Practice tracker', 'Observation dashboard', 'Parent guide', 'Ethics and privacy note'],
    question:
      'When AI supports children with special needs, which decisions must stay with teachers, families, or professionals?',
    insight:
      'Keep the classroom version educational and non-diagnostic. Health and special-education guidance needs professional review.',
    difficulty: 'Medium-High',
    coverImageAlt: 'ER10 interview image showing the Neuharmony student founder and project display board.',
    coverImageSource: 'ER10 interview image: https://er10.kz/read/analitika/neuharmony-kak-shkolniki-sozdali-startap-chtoby-pomoch-detjam-s-ras/',
    coverImageStatus: 'Needs confirmation',
    coverImageHint: 'Show the Neuharmony project board, a music practice plan, and an AI-personalized family guidance interface.',
  },
  'hi-world-全球青少年创意年展': {
    title: 'Turn History and Culture Research into an AI Interactive Exhibition',
    sourceProject: 'Hi World! Global Youth Creative Exhibition',
    year: '2026',
    award:
      'Webloom / SKT Education Hi World! 2026 Global Youth Creative Exhibition; NHD-authorized activity, not a single student award project',
    themeLabel: 'History and Culture',
    audience:
      'Middle and high school students joining Hi World or NHD-style history and culture research activities, history clubs, and exhibition teams',
    hook:
      'A history or culture project does not have to stay as a paper. Can AI help turn evidence into an exhibition visitors can question?',
    problem:
      'Students may collect many sources but struggle to judge credibility, organize evidence from multiple perspectives, and present research as a paper, board, documentary, drama, or website.',
    aiMove:
      'AI can help draft research questions, source tables, timelines, relationship maps, exhibition scripts, bilingual guides, and website Q&A. It must not invent sources, replace citation checks, or make historical judgments for students.',
    studentProject:
      'Campus history and culture AI exhibition, family-story archive, city memory timeline, cultural-heritage bilingual guide, or multi-perspective historical Q&A site',
    demoGoal:
      'Build an AI history and culture exhibition demo: enter one topic and 5 to 8 credible sources, then generate a timeline, evidence cards, exhibition text, guide Q&A, and a clickable web gallery.',
    aiPowers: [
      'Source Summarization',
      'Source Classification',
      'Timeline Generation',
      'Q&A Assistant',
      'Bilingual Rewriting',
      'Web Interaction',
      'Citation Practice',
    ],
    outputs: [
      'Interactive exhibition page',
      'Evidence cards',
      'Timeline',
      'Exhibition board or documentary script',
      'AI-use boundary note',
      'Citation list',
    ],
    question:
      'When AI helps tell a historical story, how can you prove it did not make up evidence that sounds real?',
    insight:
      'Start with a small topic, such as one old photo, one object, or one family migration story. Check every AI-generated sentence against the original sources and show citations inside the exhibition.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Official Hi World activity cover image for the Global Youth Creative Exhibition.',
    coverImageSource:
      'Webloom official activity cover image: https://img.webloom.cn/img/8117428cbbe39d67187774a6baaa8cf6.png',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show students building an interactive history and culture exhibition with timelines, evidence cards, relationship maps, and an AI guide Q&A.',
  },
  mockpilot: {
    title: 'AI Design Helper That Turns Webpages Into Editable Prototypes',
    sourceProject: 'MockPilot',
    year: '2026',
    award: 'Product Hunt 2026 launch; open-source desktop prototyping tool',
    themeLabel: 'Design and Prototyping',
    audience:
      'Students building websites, club pages, project showcases, or product prototypes',
    hook:
      'When you find a strong webpage, can AI extract its layout, colors, and components before you remix it into your own prototype?',
    problem:
      'Students may have clear product ideas but struggle to describe visual changes well enough for a tool or teammate to implement.',
    aiMove:
      'MockPilot captures webpages or components, extracts fonts, colors, icons, and UI parts, then lets users edit the result in natural language and export HTML.',
    studentProject:
      'Campus website redesign prototype, club event page editor, competitor-page study tool, or AI prototype review assistant',
    demoGoal:
      'Input a public webpage or screenshot, extract design elements, generate redesign suggestions, and update components through natural-language edits.',
    aiPowers: [
      'Webpage Parsing',
      'Visual Style Extraction',
      'Component Recognition',
      'Natural-Language Editing',
      'HTML Generation',
    ],
    outputs: [
      'Before and after prototype',
      'Design element board',
      'Natural-language edit log',
      'HTML export page',
      'Design rationale card',
    ],
    question:
      'If AI can copy the look of a website, how do you avoid plagiarism and learn the design method instead?',
    insight:
      'Analyze only public pages and require students to explain their own changes. The goal is to learn layout patterns, not to clone a commercial site.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Product Hunt media image showing MockPilot capturing a webpage into an editable desktop project with component cards.',
    coverImageSource:
      'Product Hunt official media image: https://ph-files.imgix.net/b1ef623e-6c96-47ab-8a31-017f4858cacf.png',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show a desktop app with captured webpages, component cards, a natural-language edit box, and an HTML export preview.',
  },
  synopsule: {
    title: 'Private AI Meeting Notes Without Uploading Recordings',
    sourceProject: 'Synopsule',
    year: '2026',
    award: 'Product Hunt 2026 launch; privacy-first transcription app',
    themeLabel: 'Private Transcription',
    audience:
      'Student project teams, interviewers, club reporters, teachers, and families who need private recordings',
    hook:
      'Can AI listen to a group discussion on-device, label speakers, and summarize only when the user asks?',
    problem:
      'Team meetings and interviews are easy to forget, but uploading raw voice recordings can expose names, voices, and private context.',
    aiMove:
      'Synopsule uses Whisper on Mac and iPhone for local transcription, speaker labels, full-text search, and optional summaries while keeping recordings off cloud servers.',
    studentProject:
      'Club meeting minutes assistant, interview transcript organizer, science discussion recorder, or local oral-history archive',
    demoGoal:
      'Upload or record a short audio clip, create a transcript with speaker labels, summarize key points, and show privacy controls.',
    aiPowers: [
      'Speech-to-Text',
      'Speaker Diarization',
      'Summary Generation',
      'Full-Text Search',
      'Privacy Prompting',
    ],
    outputs: [
      'Transcript text',
      'Speaker timeline',
      'Summary card',
      'Privacy note',
      'Markdown export',
    ],
    question:
      'Who needs to consent before a recording assistant starts, and which situations should never be recorded automatically?',
    insight:
      'Use volunteered short recordings or public demo clips in class. Make consent, deletion, and export boundaries part of the product.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Product Hunt media image showing Synopsule generating local transcripts with speaker labels.',
    coverImageSource:
      'Product Hunt official media image: https://ph-files.imgix.net/bcbfff18-5270-49d7-b68a-25bb54ef1117.jpeg',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show a local transcription interface, speaker labels, an audio privacy note, optional AI summary, and a Markdown export button.',
  },
  verol: {
    title: 'A Fact-Checking Light for AI Answers',
    sourceProject: 'Verol',
    year: '2026',
    award: 'Product Hunt 2026 launch; Chrome Web Store AI hallucination detector',
    themeLabel: 'AI Fact Checking',
    audience:
      'Students and teachers using large language models for writing, research, homework, or presentations',
    hook:
      'When AI sounds confident but may be wrong, can another system mark the evidence and risk right away?',
    problem:
      'Hallucinated content can enter assignments, reports, and speeches before students notice that sources or claims are unreliable.',
    aiMove:
      'Verol parses LLM output, searches the web in real time, verifies sources, and gives confidence labels with clickable evidence.',
    studentProject:
      'AI homework fact checker, science report evidence checker, history citation alert, or campus news verification helper',
    demoGoal:
      'Paste an AI answer, split it into claims, search public sources, label each claim as supported or uncertain, and export citations.',
    aiPowers: [
      'Claim Extraction',
      'Web Search',
      'Evidence Matching',
      'Confidence Scoring',
      'Source Citation',
    ],
    outputs: [
      'Fact-check panel',
      'Risk labels',
      'Citation list',
      'Verification log',
      'Human review note',
    ],
    question:
      'If a verification tool cannot find evidence for a claim, should it mark the claim false or ask for more human research?',
    insight:
      'Limit the first version to three to five checkable claims. Show evidence and uncertainty instead of presenting AI as the final judge.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Product Hunt media image showing Verol checking an AI answer and displaying evidence sources.',
    coverImageSource:
      'Product Hunt official media image: https://ph-files.imgix.net/fc1d3ad1-9375-42c3-80bd-0303e37f96d6.jpeg',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show an LLM answer beside a fact-check panel with confidence, source links, and red or green risk markers.',
  },
  capecho: {
    title: 'Turn Screen Vocabulary Into AI Memory Cards',
    sourceProject: 'Capecho',
    year: '2026',
    award: 'Product Hunt 2026 launch; language learning and spaced repetition tool',
    themeLabel: 'Language Learning',
    audience:
      'Students reading foreign-language webpages, papers, fiction, news, or competition materials',
    hook:
      'When you meet a new English word, can AI preserve the real sentence where you found it and bring it back before you forget?',
    problem:
      'Many vocabulary tools store isolated definitions. Students often lose the sentence context that made the word meaningful.',
    aiMove:
      'Capecho captures words and sentences from the screen with OCR, explains them with AI, and schedules review through FSRS spaced repetition.',
    studentProject:
      'Reading vocabulary radar, bilingual sentence card builder, science-article term reviewer, or campus reading challenge word bank',
    demoGoal:
      'Input a sentence or screenshot, detect target words, explain them in context, generate review cards, and schedule reminders.',
    aiPowers: [
      'OCR',
      'Contextual Word Explanation',
      'Difficulty Estimation',
      'Spaced Repetition',
      'Example Generation',
    ],
    outputs: [
      'Vocabulary card set',
      'Original sentence evidence',
      'Review plan',
      'Progress statistics',
      'Exported word list',
    ],
    question:
      'Which helps more: memorizing a word alone, or remembering how it worked in one real sentence?',
    insight:
      'Start with teacher-provided sentences or screenshots. Make the original sentence, explanation, and next review time visible.',
    difficulty: 'Medium',
    coverImageAlt:
      'Product Hunt media image showing Capecho capturing vocabulary from screen context and turning it into review cards.',
    coverImageSource:
      'Product Hunt official media image: https://ph-files.imgix.net/f72ea229-289f-4431-aa7f-c3c13fdb5381.png',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show screen OCR, a selected word, sentence context, a vocabulary review card, and a spaced repetition progress bar.',
  },
  'notra-image-generation': {
    title: 'Turn Code Updates Into Project Launch Posters',
    sourceProject: 'Notra Image Generation',
    year: '2026',
    award: 'Product Hunt 2026 launch; Notra third launch',
    themeLabel: 'Project Storytelling',
    audience:
      'Student startup teams, coding clubs, competition teams, and teachers who need to share progress clearly',
    hook:
      'After a team ships an update, can AI turn the changelog into a visual story people understand?',
    problem:
      'Student teams may build useful features but fail to record progress, explain value, or present updates in a way outsiders can follow.',
    aiMove:
      'Notra connects to workflows such as GitHub, Linear, and Slack, then turns pull requests, issues, and conversations into changelogs, posts, blogs, and branded visuals.',
    studentProject:
      'Club project weekly report generator, competition progress poster assistant, GitHub changelog storyteller, or school innovation launch board',
    demoGoal:
      'Read simulated commits and task notes, then generate an update summary, social copy, poster text, and image prompts.',
    aiPowers: [
      'Workflow Summarization',
      'Changelog Generation',
      'Brand Voice Adaptation',
      'Visual Prompting',
      'Release Copywriting',
    ],
    outputs: [
      'Project weekly report',
      'Changelog',
      'Social post copy',
      'Poster prompt',
      'Release reflection sheet',
    ],
    question:
      'For others to understand a student project, should the update show features, user value, process, or evidence?',
    insight:
      'Do not let AI polish achievements that did not happen. Trace every update back to a real commit, experiment note, or user comment.',
    difficulty: 'Medium',
    coverImageAlt:
      'Product Hunt media image showing Notra turning workflow updates into branded visual release content.',
    coverImageSource:
      'Product Hunt official media image: https://ph-files.imgix.net/e492532d-e4b1-42dd-bda1-ba5f6d1a9111.jpeg',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show a project workflow timeline, generated release copy, brand visual preview, and social poster draft.',
  },
  revi: {
    title: 'Private On-Device Voice Dictation for Study Notes',
    sourceProject: 'Revi',
    year: '2026',
    award: 'Product Hunt 2026 launch; on-device voice dictation and clipboard tool',
    themeLabel: 'Privacy and Voice Interaction',
    audience:
      'Students and teachers who write homework, conduct interviews, keep class notes, or need private voice input',
    hook:
      'Speaking is faster than typing, but can classroom notes stay useful without sending voices to the cloud?',
    problem:
      'Students often cannot type quickly enough during notes or interviews, while many dictation tools require accounts or upload voice data that may include minors and sensitive context.',
    aiMove:
      'Revi runs speech recognition on Mac, Windows, and Linux devices using local engines such as Whisper, Parakeet, and Apple, with automatic language detection, clipboard history, and silence in password fields.',
    studentProject:
      'Offline classroom dictation helper, interview transcript tool, speech practice recorder, or privacy-friendly bilingual voice journal',
    demoGoal:
      'Record or upload a short audio clip, then generate text, language labels, keywords, and privacy warnings while showing which content never leaves the device.',
    aiPowers: [
      'Speech-to-Text',
      'Language Detection',
      'Keyword Extraction',
      'Text Cleanup',
      'Privacy Rule Checks',
    ],
    outputs: [
      'Voice dictation demo',
      'Transcript',
      'Keyword cards',
      'Privacy boundary note',
      'Consent flow',
    ],
    question:
      'When AI records a human voice, what must be consented to first, and what should stay local by default?',
    insight:
      'Use public audio or a short voluntary recording first. Make consent, deletion, local processing, and password-field silence more important than system-wide input methods.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Official Revi website preview image showing the private on-device dictation product identity.',
    coverImageSource: 'Project website OpenGraph image: https://www.getrevi.app/og.png',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show an on-device dictation HUD, language detection, offline processing notice, password-field silence, and clipboard history.',
  },
  annota: {
    title: 'Offline AI Study Notebook for Personal Knowledge',
    sourceProject: 'Annota',
    year: '2026',
    award: 'Product Hunt 2026 launch; local-first AI note-taking and knowledge management tool',
    themeLabel: 'Study Tools and Privacy',
    audience:
      'Students and teachers organizing class notes, reading notes, competition research, or personal knowledge bases',
    hook:
      'If study notes stay local, can AI still help organize, question, and turn them into review cards?',
    problem:
      'Student notes are often scattered across devices and apps, while cloud notebooks may raise privacy concerns and make it hard to turn raw notes into structured knowledge.',
    aiMove:
      'Annota is a cross-platform, local-first, offline-capable note and knowledge tool with optional end-to-end encrypted sync and optional AI integration for writing, flashcards, and organization.',
    studentProject:
      'Offline learning library, AI mistake notebook, reading-note Q&A tool, or encrypted club archive',
    demoGoal:
      'Import several notes into a local library, then generate tags, summaries, review cards, and self-test questions.',
    aiPowers: [
      'Text Summarization',
      'Tag Generation',
      'Knowledge Base Search',
      'Question Generation',
      'Flashcard Generation',
      'Privacy Scoping',
    ],
    outputs: [
      'Note library prototype',
      'Tag tree',
      'Summary cards',
      'Review flashcards',
      'Privacy and sync explanation',
    ],
    question:
      'Should AI read every study note by default, or should students decide which notebooks are available to AI?',
    insight:
      'Start with local JSON or browser storage. Make the AI-readable scope and manual deletion flow clear before attempting real encrypted sync.',
    difficulty: 'Medium',
    coverImageAlt:
      'Official Annota desktop preview image showing a local-first note-taking interface.',
    coverImageSource:
      'Project website screenshot: https://www.annota.online/assets/desktop/preview_light.webp',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show an offline note library, tag sidebar, AI summary button, review flashcards, and encrypted sync notice.',
  },
  timedsubs: {
    title: 'Make Subtitles Follow the Voiceover Precisely',
    sourceProject: 'TimedSubs',
    year: '2026',
    award: 'Product Hunt 2026 launch; script-first AI subtitle timing tool',
    themeLabel: 'Accessibility and Video Creation',
    audience:
      'Students and teachers creating course videos, school news, club promos, public-service shorts, or multilingual subtitles',
    hook:
      'If the video script is already approved, can AI place every subtitle line at the right moment?',
    problem:
      'Student videos may have scripts and voiceovers but still require tedious manual subtitle timing; misaligned captions hurt accessibility and multilingual sharing.',
    aiMove:
      'TimedSubs aligns an approved script with matching voiceover audio, checks timing before export, and produces subtitle formats such as SRT, VTT, SBV, ASS, TXT, JSON, and ZIP.',
    studentProject:
      'School-news caption helper, bilingual public-service video subtitler, micro-lesson subtitle generator, or accessibility-first video publishing flow',
    demoGoal:
      'Input a script and a short audio file, then generate sentence-level timings, an editable subtitle table, and SRT/VTT export.',
    aiPowers: [
      'Speech Alignment',
      'Sentence Splitting',
      'Timeline Generation',
      'Format Conversion',
      'Caption Quality Checks',
    ],
    outputs: [
      'Subtitle timeline',
      'SRT/VTT files',
      'Video preview',
      'Alignment check report',
      'Accessibility note',
    ],
    question:
      'Should a caption tool prioritize the approved script or the actual spoken words when they differ?',
    insight:
      'Begin with a 30-second clip. Keep the script as the source text, the audio as evidence, and the timing table editable by humans.',
    difficulty: 'Medium',
    coverImageAlt:
      'Official TimedSubs website cover image for generating synchronized subtitles from a script and voiceover.',
    coverImageSource:
      'Project website cover image: https://timedsubs.com/hero/timedsubs-hero-v2-cover.jpg',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show script segments, an audio waveform, a subtitle timeline, SRT/VTT export buttons, and an accessibility publishing check.',
  },
  'dinamo-notebook': {
    title: 'Turn Match Videos Into Tactical Analysis Notes',
    sourceProject: 'Dinamo Notebook',
    year: '2026',
    award: 'Product Hunt 2026 launch; open-source local-first football video analysis browser extension',
    themeLabel: 'Sports Tech and Video Analysis',
    audience:
      'Football clubs, school teams, sports journalism clubs, coaches, and students learning tactical analysis',
    hook:
      'After watching a match, can AI help draw key plays, explain them clearly, and export a report?',
    problem:
      'Regular video playback makes it hard to keep key frames, movement, formations, explanations, and reports together, while professional tools can be expensive or closed.',
    aiMove:
      'Dinamo Notebook lets users add timestamped notes, player and event tags, tactical drawings, animated sequences, and PDF, HTML, GIF, or data exports in the browser. Optional AI analysis uses the user-owned OpenAI API key and keeps the workflow local-first.',
    studentProject:
      'School-team tactical review, basketball or football training clip assistant, PE movement-analysis notebook, or sports commentary evidence pack',
    demoGoal:
      'Use a short public or self-recorded video to mark key frames, draw arrows and zones, ask AI for tactical explanations, and export a one-page review report.',
    aiPowers: [
      'Video Frame Annotation',
      'Tactical Explanation',
      'Event Tagging',
      'Report Generation',
      'Drawing Overlay',
    ],
    outputs: [
      'Annotated tactics video',
      'Key-frame images',
      'AI explanation cards',
      'PDF/HTML report',
      'Copyright and data-boundary note',
    ],
    question:
      'Should AI give a tactical conclusion first, or should students draw the evidence they noticed before asking AI to explain it?',
    insight:
      'Use public or self-recorded training footage and keep human annotations visible. Do not download or redistribute copyrighted match video.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'GitHub OpenGraph preview image for the Dinamo Notebook open-source football analysis repository.',
    coverImageSource:
      'GitHub OpenGraph image: https://opengraph.githubassets.com/66e0f0725cf0946238ddf0d15f7eea798973c1b460f5c71745809ea8f3b7751a/dinamopancevo/dinamonotebook',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show match video key frames, tactical arrows, player tags, AI explanation cards, and an exported analysis report.',
  },
  amaroad: {
    title: 'Let AI and the Terminal Build a Project Pitch Deck',
    sourceProject: 'Amaroad',
    year: '2026',
    award: 'Product Hunt 2026 launch; open-source AI-first slide authoring environment',
    themeLabel: 'Presentation and AI Development',
    audience:
      'Student teams preparing science fair pitches, club reports, research presentations, capstones, and portfolio demos',
    hook:
      'When a project pitch is due, can AI draft, preview, and export a slide deck from the same terminal workflow?',
    problem:
      'Student projects often contain many notes and screenshots but lack a clear presentation structure; technical teams may also want content, code, and version history in one workflow.',
    aiMove:
      'Amaroad lets Claude Code, Codex, Gemini CLI, or Cursor create and refine decks from the terminal, preview slides live, edit multiple slides in parallel, and export PDF/PPTX or share a live URL.',
    studentProject:
      'Science fair pitch generator, research report to slide deck tool, club showcase helper, or capstone presentation rehearsal tool',
    demoGoal:
      'Input a project brief, evidence, and images, then generate a 6-8 slide outline, editable slides, and export-ready PDF/PPTX instructions.',
    aiPowers: [
      'Outline Generation',
      'Information Structuring',
      'Slide Copywriting',
      'Visual Layout Suggestions',
      'Export and Version Tracking',
    ],
    outputs: [
      'Pitch deck',
      'Prompt log',
      'Before and after revision comparison',
      'PDF/PPTX export',
      'Speaker notes',
    ],
    question:
      'In an AI-generated pitch deck, which parts must come from real project evidence, and which parts can AI help phrase or structure?',
    insight:
      'Let AI structure the story first, but do not beautify empty claims. Each slide should connect to evidence, user value, or a real demo screenshot.',
    difficulty: 'Medium',
    coverImageAlt:
      'Official Amaroad website OpenGraph image showing an AI-first slide authoring and refinement environment.',
    coverImageSource: 'Project website OpenGraph image: https://amaroad.com/assets/og-image.png?v=3',
    coverImageStatus: 'Confirmed',
    coverImageHint:
      'Show terminal prompts, live slide previews, parallel slide editing, PDF/PPTX export, and speaker notes.',
  },
  torchvision: {
    title: 'Voice Navigation Safety Assistant for Blind Users',
    sourceProject: 'TorchVision',
    year: '2025',
    award: 'Technovation Girls 2025 Beginner Division Finalist Team',
    themeLabel: 'Accessibility',
    audience:
      'Blind and low-vision users, students, campus accessibility volunteers, and caregivers supporting safer travel',
    hook:
      'When someone cannot see hazards ahead, can AI warn them through voice before they reach danger?',
    problem:
      'Blind and low-vision users may not receive timely hazard, location, help, or route cues in unfamiliar spaces, and standard maps are not always hands-free or accessibility-first.',
    aiMove:
      'The official description says the app uses voice control to help visually impaired users navigate, with hazard alerts and SOS location sharing. A classroom version can combine speech recognition, object or obstacle cues, location rules, and emergency-contact prompts.',
    studentProject:
      'Campus accessible route assistant, museum voice guide, night-walk safety helper, or hallway obstacle alert tool',
    demoGoal:
      'Build a prototype that accepts a destination or scenario by voice, detects or simulates a hazard, gives the next safe step, and creates an SOS contact card.',
    aiPowers: [
      'Speech Recognition',
      'Voice Output',
      'Obstacle Detection',
      'Location Rules',
      'Risk Alerts',
    ],
    outputs: [
      'Voice-navigation demo',
      'Hazard-alert flow',
      'Accessible route map',
      'SOS contact card',
      'Testing feedback log',
    ],
    question:
      'Should an accessibility tool prioritize speed, or confirmation and the ability to ask for help?',
    insight:
      'Start with one small route, such as classroom to elevator. Make every alert short, confirmable, and easy to cancel.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Official TorchVision pitch video thumbnail showing a voice-navigation safety app for visually impaired users.',
    coverImageSource:
      'Technovation official results page embedded pitch video thumbnail: https://www.youtube.com/watch?v=o0IvFEk_5rE',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show a phone voice-navigation interface with hazard alerts, SOS location sharing, and safe-route prompts.',
  },
  glucochat: {
    title: 'AI Support Hub for Daily Diabetes Records',
    sourceProject: 'GlucoChat',
    year: '2025',
    award: 'Technovation Girls 2025 Junior Division Finalist Team',
    themeLabel: 'Health Management',
    audience:
      'Teenagers tracking blood sugar, family caregivers, school nurses, and health-education teachers',
    hook:
      'When daily blood sugar, insulin, and supply notes pile up, can AI turn them into a caregiver-ready checklist?',
    problem:
      'Chronic condition management requires consistent records for blood sugar, insulin, supplies, and emotional support. Students and caregivers can miss entries, miss trends, or forget needed items.',
    aiMove:
      'The official description says GlucoChat provides blood sugar and insulin tracking tools, a vital-accessory catalog, and an emotional-support community. A classroom version can summarize trends, explain records, generate review questions, and create supply reminders without diagnosing.',
    studentProject:
      'Campus health log, exercise and meal reflection table, supply reminder, or weekly report for a school nurse',
    demoGoal:
      'Build a health-record demo that turns daily entries into a trend summary, anomaly reminder, supply checklist, and caregiver question list.',
    aiPowers: [
      'Data Summarization',
      'Trend Explanation',
      'Chat Q&A',
      'Reminder Generation',
      'Safety Boundary Prompts',
    ],
    outputs: [
      'Health record table',
      'Trend summary card',
      'Supply checklist',
      'Caregiver Q&A page',
      'Medical boundary note',
    ],
    question:
      'When is a health assistant simply organizing information, and when does it cross into medical judgment?',
    insight:
      'Keep the classroom version to record organization and reflection prompts. Do not provide diagnosis or medication advice; route concerns to a parent, school nurse, or doctor.',
    difficulty: 'Medium-High',
    coverImageAlt:
      'Official GlucoChat pitch video thumbnail showing a blood sugar tracking and support app.',
    coverImageSource:
      'Technovation official results page embedded pitch video thumbnail: https://www.youtube.com/watch?v=dsVC2Ca-6aw',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show a blood sugar trend chart, insulin records, supply checklist, AI reflection prompts, and support cards.',
  },
  'junior-connect': {
    title: 'AI Growth Coach for Naming Feelings',
    sourceProject: 'Junior Connect',
    year: '2025',
    award: 'Technovation Girls 2025 Senior Regional Honoree: Latin America',
    themeLabel: 'Emotional Learning',
    audience:
      'Preschool children, elementary students, parents, early-grade teachers, and social-emotional learning classes',
    hook:
      'When a child cannot say what they are feeling, can AI turn emotions into stories, faces, and next steps?',
    problem:
      'Young children may feel sadness, anger, or anxiety but struggle to name those feelings and choose a healthy way to express or regulate them.',
    aiMove:
      'The official description says Junior Connect uses AI to help preschool and elementary children identify, name, and manage emotions. A classroom version can use picture or text input to generate emotion labels, story explanations, breathing exercises, and help-seeking suggestions.',
    studentProject:
      'Classroom emotion check-in station, picture-book emotion Q&A, parent-child communication cards, or campus conflict cooldown game',
    demoGoal:
      'Build a prototype where a child selects a face or enters a sentence, then receives an emotion name, possible reason, short exercise, and help card.',
    aiPowers: [
      'Emotion Text Understanding',
      'Image or Face Classification',
      'Story Generation',
      'Personalized Suggestions',
      'Safety Alerts',
    ],
    outputs: [
      'Emotion-recognition demo',
      'Child-friendly story card',
      'Regulation exercise page',
      'Parent or teacher review note',
      'Privacy boundary card',
    ],
    question:
      'Can AI know a child\'s real emotion, or should it help the child and adult confirm it together?',
    insight:
      'Keep the tone gentle. Let AI offer words and exercises, while children, parents, and teachers keep the final judgment.',
    difficulty: 'Medium',
    coverImageAlt:
      'Official Junior Connect pitch video thumbnail showing an AI app for children to identify and manage emotions.',
    coverImageSource:
      'Technovation official results page embedded pitch video thumbnail: https://www.youtube.com/watch?v=QPA_ZgEuPr8',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show children\'s emotion cards, an AI-generated story, a breathing exercise, and confirmation prompts for adults.',
  },
  'healthy-way': {
    title: 'Turn Nutrition and Blood Sugar Into AI Habit Plans',
    sourceProject: 'Healthy Way',
    year: '2025',
    award: 'Technovation Girls 2025 Beginner Regional Honoree: Asia',
    themeLabel: 'Health Management',
    audience:
      'Students building healthy routines, families tracking nutrition and blood sugar, and health-education clubs',
    hook:
      'Health advice can be overwhelming. Can AI turn what you eat and how you move into one small next step?',
    problem:
      'Many people know they should eat well, move regularly, and watch blood sugar, but struggle to turn scattered records into an actionable routine they can sustain and review.',
    aiMove:
      'The official description says Healthy Way uses AI to track daily nutrition and blood sugar, helping people build healthy habits and manage diabetes. A classroom version can summarize food records, flag patterns, create habit plans, and generate reflection questions.',
    studentProject:
      'Lunch nutrition tracker, exercise habit log, family health weekly report, or campus water and sleep reminder',
    demoGoal:
      'Input one week of sample food, movement, and blood sugar data, then generate habit suggestions, a next-step plan, and reflection charts.',
    aiPowers: [
      'Table Analysis',
      'Nutrition Text Explanation',
      'Trend Summarization',
      'Plan Generation',
      'Reminder Recommendation',
    ],
    outputs: [
      'Healthy habit dashboard',
      'One-week plan',
      'Trend chart',
      'AI suggestion card',
      'Professional review note',
    ],
    question:
      'Should a health habit tool push people to change, or first help them see their real records clearly?',
    insight:
      'Avoid weight-loss scoring or diagnosis. Choose one positive habit such as water, sleep, movement, or balanced lunch, and make each suggestion reviewable by a human.',
    difficulty: 'Medium',
    coverImageAlt:
      'Official Healthy Way pitch video thumbnail showing a nutrition and blood-sugar habit tracking app.',
    coverImageSource:
      'Technovation official results page embedded pitch video thumbnail: https://youtu.be/1mM3stmNOXU',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show a weekly food log, blood sugar trend, AI habit plan, and reviewable health goal card.',
  },
  interpret: {
    title: 'Turn Difficult Reading Into AI Learning Levels',
    sourceProject: 'Interpret',
    year: '2025',
    award: 'Technovation Girls 2025 Beginner Regional Honoree: Latin America',
    themeLabel: 'Education Equity',
    audience:
      'Students who struggle with reading comprehension, language learners, early-grade teachers, and library reading programs',
    hook:
      'When an article feels hard to enter, can AI split it into stories, questions, and a game?',
    problem:
      'Students can lose patience with long texts or unfamiliar vocabulary, while static worksheets cannot adjust quickly to a learner\'s actual understanding.',
    aiMove:
      'The official description says Interpret improves reading comprehension and makes learning more accessible through stories, questions, and games. A classroom version can use AI to simplify text by level, generate questions, surface keywords, and provide game-like feedback.',
    studentProject:
      'English reading quest, science-article Q&A cards, leveled history reading tool, or library AI reading-guide game',
    demoGoal:
      'Paste a short passage, then generate a simpler version, keywords, three comprehension questions, one mini-game, and feedback for missed answers.',
    aiPowers: [
      'Leveled Text Rewriting',
      'Keyword Extraction',
      'Question Generation',
      'Instant Feedback',
      'Gamified Recommendation',
    ],
    outputs: [
      'Reading quest page',
      'Leveled passage',
      'Comprehension questions',
      'Feedback log',
      'Learner privacy note',
    ],
    question:
      'If AI simplifies an article, could it also change the meaning, and how should students check?',
    insight:
      'Start with a passage under 300 words. Keep the original text next to the AI version and evidence sentences so students can verify changes.',
    difficulty: 'Medium',
    coverImageAlt:
      'Official Interpret pitch video thumbnail showing a reading comprehension and gamified learning app.',
    coverImageSource:
      'Technovation official results page embedded pitch video thumbnail: https://www.youtube.com/watch?v=MI5gFBmn92c',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show a passage split into keywords, comprehension questions, mini-game levels, and AI feedback prompts.',
  },
  '壁行-时空': {
    title: 'Turn Dunhuang Murals Into a Walk-In AI Time-Space Gallery',
    sourceProject: 'Bixing Shikong',
    year: '2026',
    award:
      'HarmonyOS Innovation Competition Geek Track finalist project, covered by Houlang Research Institute at HDC 2026; specific award not public',
    themeLabel: 'Cultural Preservation',
    audience:
      'Students interested in traditional culture, digital exhibitions, cultural tourism guides, 3D interaction, museum volunteering, and heritage clubs',
    hook:
      'If not everyone can travel to Dunhuang, can AI and 3D bring the mural world onto a phone first?',
    problem:
      'Murals and traditional culture are often viewed from far away. Students may struggle to approach details, understand stories, and turn static images into experiences that can be explored, questioned, or repaired.',
    aiMove:
      'The article describes a student team combining HarmonyOS 3D graphics, Unity, and AI-assisted development to build a mural space where users can move, approach, and adjust perspective. AI can also support guided explanations, story retrieval, visitor questions, and restoration suggestions, but historical claims need sources and human review.',
    studentProject:
      'Campus museum AI guide, intangible-heritage 3D gallery, ancient-building interactive map, hometown culture time-space walk, or questionable history story space',
    demoGoal:
      'Build an AI cultural time-space gallery demo: choose one mural or cultural object, create a 3D or web scene, and add hotspot explanations, a timeline, guide Q&A, and source cards.',
    aiPowers: [
      '3D Scene Building',
      'Image and Source Organization',
      'AI Guide Q&A',
      'Storyline Generation',
      'Interaction Design',
      'AI-Assisted Coding',
    ],
    outputs: [
      'Interactive gallery web page or app prototype',
      'Mural hotspot cards',
      'Guide Q&A',
      'Timeline',
      'Technical explanation',
      'Source list',
    ],
    question:
      'When AI explains traditional culture, how can it avoid presenting imagination as fact?',
    insight:
      'Start with one small scene instead of recreating a whole grotto. Cite sources for every hotspot explanation, and have a teacher or source card review AI-generated stories.',
    difficulty: 'High',
    coverImageAlt:
      'Bixing Shikong app interface showing a phone-based 3D mural space and cultural-scene interaction.',
    coverImageSource:
      'Houlang Research Institute WeChat article image, interviewee-provided: https://mmbiz.qpic.cn/sz_mmbiz_png/FysLcXEfWseJyeTqNv4GleFGR92xuchbSouCGeLQ3aicYU9fCPibvlaHGbxjDanmfOrDFs0xHz064C9tmPGq9mQv54ksMAjIBqyCjCRzyOuVs/640?wx_fmt=png',
    coverImageStatus: 'Needs confirmation',
    coverImageHint:
      'Show a phone-based Dunhuang mural 3D gallery with clickable hotspots, AI guide Q&A, and source cards.',
  },
}

export function isLanguage(value: unknown): value is Language {
  return value === 'zh' || value === 'en'
}

export function getInitialLanguage(storage = getBrowserStorage()): Language {
  const storedLanguage = storage?.getItem(storageKey)
  return isLanguage(storedLanguage) ? storedLanguage : 'zh'
}

export function setStoredLanguage(language: Language, storage = getBrowserStorage()) {
  storage?.setItem(storageKey, language)
}

export function applyCardLanguage(card: MissionCard, language: Language): MissionCard {
  if (language === 'zh') return card

  const translation = cardTranslations[card.id]
  return {
    ...card,
    ...translation,
    sourceProject: translation?.sourceProject ?? stripChineseProjectName(card.sourceProject),
    award: translation?.award ?? stripChineseProjectName(card.award),
    themeLabel: translation?.themeLabel ?? themeTranslations[card.themeLabel] ?? stripChineseProjectName(card.themeLabel),
    difficulty: translation?.difficulty ?? difficultyTranslations[card.difficulty] ?? card.difficulty,
    coverImageAlt: translation?.coverImageAlt ?? `Project visual for ${translation?.sourceProject ?? stripChineseProjectName(card.sourceProject)}`,
    coverImageSource:
      translation?.coverImageSource ?? `Public project source: ${getSourceDomain(card.coverImageSource || card.sourceUrl || '')}`,
    coverImageStatus:
      translation?.coverImageStatus ?? imageStatusTranslations[card.coverImageStatus ?? ''] ?? 'Needs confirmation',
    coverImageHint:
      translation?.coverImageHint ?? `Use an official screenshot, demo image, or classroom visual for ${translation?.sourceProject ?? stripChineseProjectName(card.sourceProject)}.`,
  }
}

export function applyCardsLanguage(cards: MissionCard[], language: Language): MissionCard[] {
  if (language === 'zh') return cards
  return cards.map((card) => applyCardLanguage(card, language))
}

export function getMissingEnglishTranslationIds(cards: MissionCard[]) {
  return cards
    .filter((card) => !cardTranslations[card.id])
    .map((card) => card.id)
}

function getBrowserStorage(): StorageLike | undefined {
  try {
    return globalThis.localStorage
  } catch {
    return undefined
  }
}

function getSourceDomain(source: string) {
  try {
    return new URL(source).hostname
  } catch {
    return stripChineseProjectName(source) || 'project source'
  }
}

function stripChineseProjectName(value: string) {
  return value
    .replace(/[\u4e00-\u9fa5]+/g, '')
    .replace(/[，。；：、（）《》“”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
