import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Brain,
  ChartNoAxesColumnIncreasing,
  Database,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Languages,
  LayoutGrid,
  MessageSquareText,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react'
import './App.css'
import { missionCards, type MissionCard } from './data/cards'
import { loadMissionCards, type CardsResponse } from './lib/cardSource'

const themeIcons: Record<string, typeof Globe2> = {
  教育公平: GraduationCap,
  文化保护: Languages,
  无障碍科技: ShieldCheck,
  健康管理: HeartPulse,
  科研健康: FlaskConical,
  健康科研: FlaskConical,
}

function App() {
  const [cardsResponse, setCardsResponse] = useState<CardsResponse>({
    cards: missionCards,
    source: 'local',
  })
  const [selectedTheme, setSelectedTheme] = useState('全部')
  const [activeId, setActiveId] = useState(missionCards[0].id)
  const cards = cardsResponse.cards
  const activeThemes = useMemo(
    () => ['全部', ...new Set(cards.map((card) => card.themeLabel))],
    [cards],
  )
  const effectiveSelectedTheme = activeThemes.includes(selectedTheme) ? selectedTheme : '全部'

  const filteredCards = useMemo(() => {
    if (effectiveSelectedTheme === '全部') return cards
    return cards.filter((card) => card.themeLabel === effectiveSelectedTheme)
  }, [cards, effectiveSelectedTheme])

  const activeCard = cards.find((card) => card.id === activeId) ?? cards[0] ?? missionCards[0]

  useEffect(() => {
    let isMounted = true
    loadMissionCards(missionCards).then((response) => {
      if (!isMounted) return
      setCardsResponse(response)
      setActiveId(response.cards[0]?.id ?? missionCards[0].id)
    })

    return () => {
      isMounted = false
    }
  }, [])

  function selectTheme(theme: string) {
    setSelectedTheme(theme)
    const nextCard =
      theme === '全部'
        ? cards[0]
        : cards.find((card) => card.themeLabel === theme)

    if (nextCard) setActiveId(nextCard.id)
  }

  return (
    <main className="lab-shell">
      <section className="hero-panel" aria-labelledby="page-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="signal-dot" />
            WAICY High School Project Lab
          </div>
          <h1 id="page-title">
            <span>用真实问题</span>
            <span>启动 AI 项目</span>
          </h1>
          <p>
            课堂上先看5张 Mission Cards，再把学生自己的校园、家庭、社区和文化经验转成项目选题。
          </p>
          <div className="data-source">
            {cardsResponse.source === 'feishu' ? 'Feishu synced' : 'Local demo data'}
          </div>
        </div>

        <div className="hero-system" aria-label="Data sync model">
          <div className="system-node">
            <Database size={20} aria-hidden="true" />
            <span>Feishu Base</span>
          </div>
          <ArrowRight size={18} aria-hidden="true" />
          <div className="system-node is-active">
            <LayoutGrid size={20} aria-hidden="true" />
            <span>Mission Cards</span>
          </div>
          <ArrowRight size={18} aria-hidden="true" />
          <div className="system-node">
            <MessageSquareText size={20} aria-hidden="true" />
            <span>Classroom Pitch</span>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="Card filters">
        <div>
          <span className="toolbar-kicker">Theme Filter</span>
          <h2>选择项目入口</h2>
        </div>
        <div className="theme-tabs" role="tablist" aria-label="Project themes">
          {activeThemes.map((theme) => (
            <button
              key={theme}
              type="button"
              className={theme === effectiveSelectedTheme ? 'is-selected' : ''}
              onClick={() => selectTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </section>

      <section className="workspace-grid">
        <div className="card-stack" aria-label="Mission cards">
          {filteredCards.map((card, index) => (
            <MissionCardTile
              key={card.id}
              card={card}
              index={index + 1}
              isActive={card.id === activeCard.id}
              onSelect={() => setActiveId(card.id)}
            />
          ))}
        </div>

        <aside className="insight-panel" aria-label="Project insight panel">
          <ProjectMap cards={cards} activeCard={activeCard} onSelect={setActiveId} />
          <CardDetail card={activeCard} />
        </aside>
      </section>
    </main>
  )
}

type MissionCardTileProps = {
  card: MissionCard
  index: number
  isActive: boolean
  onSelect: () => void
}

function MissionCardTile({
  card,
  index,
  isActive,
  onSelect,
}: MissionCardTileProps) {
  const Icon = themeIcons[card.themeLabel] ?? Brain

  return (
    <article
      className={`mission-card ${isActive ? 'is-active' : ''}`}
      style={{ '--card-accent': card.accent } as React.CSSProperties}
    >
      <button type="button" onClick={onSelect} aria-label={`查看 ${card.title}`}>
        <div className="card-index">{String(index).padStart(2, '0')}</div>
        <div className="card-main">
          <div className="card-meta">
            <span>{card.year}</span>
            <span>{card.themeLabel}</span>
            <span>难度 {card.difficulty}</span>
          </div>
          <h3>{card.title}</h3>
          <p>{card.hook}</p>
          <div className="power-row">
            {card.aiPowers.slice(0, 3).map((power) => (
              <span key={power}>{power}</span>
            ))}
          </div>
        </div>
        <div className="card-symbol">
          <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
        </div>
      </button>
    </article>
  )
}

type ProjectMapProps = {
  cards: MissionCard[]
  activeCard: MissionCard
  onSelect: (id: string) => void
}

function ProjectMap({ cards, activeCard, onSelect }: ProjectMapProps) {
  return (
    <section className="map-panel" aria-labelledby="map-title">
      <div className="panel-heading">
        <span>Project Map</span>
        <h2 id="map-title">技术难度 × 社会影响</h2>
      </div>
      <div className="map-canvas">
        <span className="axis-label axis-tech">技术难度</span>
        <span className="axis-label axis-impact">社会影响</span>
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`map-point ${card.id === activeCard.id ? 'is-active' : ''}`}
            style={
              {
                '--x': `${card.mapX}%`,
                '--y': `${100 - card.mapY}%`,
                '--card-accent': card.accent,
              } as React.CSSProperties
            }
            onClick={() => onSelect(card.id)}
            aria-label={`选择 ${card.title}`}
          >
            <span>{card.themeLabel}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

type CardDetailProps = {
  card: MissionCard
}

function CardDetail({ card }: CardDetailProps) {
  return (
    <section
      className="detail-panel"
      style={{ '--card-accent': card.accent } as React.CSSProperties}
      aria-labelledby="detail-title"
    >
      <div className="detail-topline">
        <span>{card.sourceProject}</span>
        <span>{card.award}</span>
      </div>
      <h2 id="detail-title">{card.title}</h2>

      <div className="before-after">
        <div>
          <span>Before</span>
          <p>{card.problem}</p>
        </div>
        <div>
          <span>AI Move</span>
          <p>{card.aiMove}</p>
        </div>
        <div>
          <span>Student Version</span>
          <p>{card.demoGoal}</p>
        </div>
      </div>

      <div className="detail-grid">
        <InfoBlock
          icon={<ScanSearch size={18} aria-hidden="true" />}
          label="用户是谁"
          value={card.audience}
        />
        <InfoBlock
          icon={<Brain size={18} aria-hidden="true" />}
          label="学生改造项目"
          value={card.studentProject}
        />
        <InfoBlock
          icon={<ChartNoAxesColumnIncreasing size={18} aria-hidden="true" />}
          label="最终展示材料"
          value={card.outputs.join(' / ')}
        />
      </div>

      <div className="question-strip">
        <span>课堂提问</span>
        <p>{card.question}</p>
      </div>

      <div className="insight-strip">
        <span>Teacher Note</span>
        <p>{card.insight}</p>
      </div>
    </section>
  )
}

type InfoBlockProps = {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoBlock({ icon, label, value }: InfoBlockProps) {
  return (
    <div className="info-block">
      <div className="info-label">
        {icon}
        <span>{label}</span>
      </div>
      <p>{value}</p>
    </div>
  )
}

export default App
