import { useEffect, useMemo, useState } from 'react'
import {
  Brain,
  ChartNoAxesColumnIncreasing,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Languages,
  ScanSearch,
  ShieldCheck,
  Trophy,
  X,
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
  const [openCardId, setOpenCardId] = useState<string | null>(null)
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
  const openCard = openCardId
    ? cards.find((card) => card.id === openCardId) ?? null
    : null

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

  useEffect(() => {
    if (!openCard) return undefined

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenCardId(null)
    }

    document.body.classList.add('has-open-modal')
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.classList.remove('has-open-modal')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [openCard])

  function selectTheme(theme: string) {
    setSelectedTheme(theme)
    const nextCard =
      theme === '全部'
        ? cards[0]
        : cards.find((card) => card.themeLabel === theme)

    if (nextCard) setActiveId(nextCard.id)
  }

  function openCardDetail(card: MissionCard) {
    setActiveId(card.id)
    setOpenCardId(card.id)
  }

  return (
    <main className="lab-shell">
      <section className="hero-panel" aria-labelledby="page-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="signal-dot" />
            WAICY Project Inspiration Cards
          </div>
          <h1 id="page-title">
            <span>用真实问题</span>
            <span>启动 AI 项目</span>
          </h1>
          <p>
            课堂上先看5张灵感卡，再把学生自己的校园、家庭、社区和文化经验转成项目选题。
          </p>
          <div className="hero-actions">
            <div className="data-source">
              {cardsResponse.source === 'github-json' ? '灵感库已连接' : '本地演示数据'}
            </div>
            <div className="hero-stat">
              <strong>{cards.length}</strong>
              <span>张项目卡</span>
            </div>
            <div className="hero-stat">
              <strong>{activeThemes.length - 1}</strong>
              <span>个主题入口</span>
            </div>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="Card filters">
        <div>
          <span className="toolbar-kicker">项目卡片墙</span>
          <h2>先浏览全局，再点开一张深看</h2>
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

      <section className="gallery-grid" aria-label="Mission cards">
        {filteredCards.map((card, index) => (
          <MissionCardTile
            key={card.id}
            card={card}
            index={index + 1}
            isActive={card.id === activeCard.id}
            onSelect={() => openCardDetail(card)}
          />
        ))}
      </section>

      <ProjectMap cards={cards} activeCard={activeCard} onSelect={openCardDetail} />

      {openCard && (
        <CardDetailModal card={openCard} onClose={() => setOpenCardId(null)} />
      )}
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
            {card.aiPowers.slice(0, 2).map((power) => (
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
  onSelect: (card: MissionCard) => void
}

function ProjectMap({ cards, activeCard, onSelect }: ProjectMapProps) {
  return (
    <section className="map-panel" aria-labelledby="map-title">
      <div className="panel-heading">
        <span>项目地图</span>
        <h2 id="map-title">技术难度 × 社会影响</h2>
      </div>
      <div className="map-canvas">
        <span className="axis-line axis-line-x" aria-hidden="true" />
        <span className="axis-line axis-line-y" aria-hidden="true" />
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
            onClick={() => onSelect(card)}
            aria-label={`选择 ${card.title}`}
          >
            <span>{card.themeLabel}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

type CardDetailModalProps = {
  card: MissionCard
  onClose: () => void
}

function CardDetailModal({ card, onClose }: CardDetailModalProps) {
  const Icon = themeIcons[card.themeLabel] ?? Brain

  return (
    <div className="detail-backdrop" onMouseDown={onClose}>
      <section
        className="detail-modal"
        style={{ '--card-accent': card.accent } as React.CSSProperties}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="关闭项目详情"
          onClick={onClose}
        >
          <X size={21} strokeWidth={1.8} aria-hidden="true" />
        </button>

        <div className="modal-hero">
          <div className="modal-icon">
            <Icon size={34} strokeWidth={1.45} aria-hidden="true" />
          </div>
          <div className="modal-heading">
            <div className="detail-topline">
              <span>{card.sourceProject}</span>
              <span>
                <Trophy size={15} strokeWidth={1.7} aria-hidden="true" />
                {card.award}
              </span>
            </div>
            <h2 id="modal-title">{card.title}</h2>
            <p>{card.hook}</p>
            <div className="modal-powers">
              {card.aiPowers.map((power) => (
                <span key={power}>{power}</span>
              ))}
            </div>
          </div>
        </div>

        <CardDetail card={card} />
      </section>
    </div>
  )
}

type CardDetailProps = {
  card: MissionCard
}

function CardDetail({ card }: CardDetailProps) {
  return (
    <div className="detail-panel">
      <div className="before-after">
        <div>
          <span>痛点</span>
          <p>{card.problem}</p>
        </div>
        <div>
          <span>AI动作</span>
          <p>{card.aiMove}</p>
        </div>
        <div>
          <span>学生改造</span>
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
        <span>教师提示</span>
        <p>{card.insight}</p>
      </div>
    </div>
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
