import { useEffect, useMemo, useState } from 'react'
import {
  Brain,
  ChartNoAxesColumnIncreasing,
  ExternalLink,
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
  const cardOrder = useMemo(
    () => new Map(cards.map((card, index) => [card.id, index + 1])),
    [cards],
  )
  const isMapDense = filteredCards.length >= 8

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
            <span>找到你想解决的问题</span>
            <span>做成 AI 项目</span>
          </h1>
          <p>
            先挑一个你有感觉的真实案例，再把自己的校园、家庭、社区经历，改造成能展示、能参赛的 AI 项目。
          </p>
          <div className="hero-actions">
            <div className="data-source">
              {cardsResponse.source === 'github-json' ? '灵感库已连接' : '本地演示数据'}
            </div>
            <div className="hero-stat">
              <strong>{filteredCards.length}</strong>
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
            index={cardOrder.get(card.id) ?? index + 1}
            isActive={card.id === activeCard.id}
            onSelect={() => openCardDetail(card)}
          />
        ))}
      </section>

      <ProjectMap
        cards={filteredCards}
        cardOrder={cardOrder}
        activeCard={activeCard}
        isDense={isMapDense}
        onSelect={openCardDetail}
      />

      {openCard && (
        <CardDetailModal
          card={openCard}
          index={cardOrder.get(openCard.id) ?? 1}
          onClose={() => setOpenCardId(null)}
        />
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
  cardOrder: Map<string, number>
  activeCard: MissionCard
  isDense: boolean
  onSelect: (card: MissionCard) => void
}

function ProjectMap({ cards, cardOrder, activeCard, isDense, onSelect }: ProjectMapProps) {
  const positionedCards = getPositionedCards(cards)

  return (
    <section className="map-panel" aria-labelledby="map-title">
      <div className="panel-heading">
        <div>
          <span>项目地图</span>
          <h2 id="map-title">用地图找到你的项目方向</h2>
        </div>
        <p>
          越往右，技术挑战越高；越往上，影响的人越多。先找一个靠近你兴趣的位置，再点开项目看看。
        </p>
      </div>
      <div className="map-canvas">
        <span className="axis-line axis-line-x" aria-hidden="true" />
        <span className="axis-line axis-line-y" aria-hidden="true" />
        <span className="axis-label axis-tech">技术挑战</span>
        <span className="axis-label axis-impact">影响范围</span>
        {positionedCards.map(({ card, x, y }, index) => (
          <button
            key={card.id}
            type="button"
            className={[
              'map-point',
              isDense ? 'is-compact' : '',
              y < 18 ? 'show-tooltip-below' : '',
              card.id === activeCard.id ? 'is-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={
              {
                '--x': `${x}%`,
                '--y': `${y}%`,
                '--card-accent': card.accent,
              } as React.CSSProperties
            }
            onClick={() => onSelect(card)}
            aria-label={`选择 ${card.title}`}
            title={card.title}
          >
            <span>
              {isDense
                ? String(cardOrder.get(card.id) ?? index + 1).padStart(2, '0')
                : card.themeLabel}
            </span>
            {isDense && <strong>{card.title}</strong>}
          </button>
        ))}
      </div>
    </section>
  )
}

function getPositionedCards(cards: MissionCard[]) {
  const basePositions = cards.map((card) => ({
    card,
    x: scaleMapCoordinate(card.mapX),
    y: 100 - scaleMapCoordinate(card.mapY),
  }))
  const groups = new Map<string, typeof basePositions>()

  for (const position of basePositions) {
    const key = `${Math.round(position.x)}:${Math.round(position.y)}`
    groups.set(key, [...(groups.get(key) ?? []), position])
  }

  return basePositions.map((position) => {
    const key = `${Math.round(position.x)}:${Math.round(position.y)}`
    const group = groups.get(key) ?? [position]
    const groupIndex = group.findIndex(({ card }) => card.id === position.card.id)
    const offset = getClusterOffset(groupIndex, group.length)

    return {
      ...position,
      x: clamp(position.x + offset.x, 9, 91),
      y: clamp(position.y + offset.y, 9, 91),
    }
  })
}

function scaleMapCoordinate(value: number) {
  if (!Number.isFinite(value)) return 50

  if (value <= 10) {
    const score = clamp(value, 1, 5)
    return 16 + ((score - 1) / 4) * 70
  }

  return clamp(value, 12, 88)
}

function getClusterOffset(index: number, total: number) {
  if (total <= 1) return { x: 0, y: 0 }

  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = total === 2 ? 7 : 9

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

type CardDetailModalProps = {
  card: MissionCard
  index: number
  onClose: () => void
}

function CardDetailModal({ card, index, onClose }: CardDetailModalProps) {
  const Icon = themeIcons[card.themeLabel] ?? Brain
  const sourceUrls = getSourceUrls(card)
  const displayIndex = String(index).padStart(2, '0')

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
          <div className="modal-identity">
            <div className="modal-index" aria-label={`第 ${displayIndex} 张项目卡`}>
              {displayIndex}
            </div>
            <div className="modal-icon">
              <Icon size={34} strokeWidth={1.45} aria-hidden="true" />
            </div>
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
            {sourceUrls.length > 0 && (
              <div className="source-links" aria-label="项目来源链接">
                {sourceUrls.map((sourceUrl, index) => (
                  <a
                    key={sourceUrl}
                    className="source-link"
                    href={sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
                    {sourceUrls.length === 1 ? '查看项目来源' : `项目来源 ${index + 1}`}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <CardDetail card={card} />
      </section>
    </div>
  )
}

function getSourceUrls(card: MissionCard) {
  const urls = card.sourceUrls?.length ? card.sourceUrls : card.sourceUrl ? [card.sourceUrl] : []
  return [...new Set(urls.filter((url) => /^https?:\/\//i.test(url)))]
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
        <span>想一想</span>
        <p>{card.question}</p>
      </div>

      <div className="insight-strip">
        <span>项目小贴士</span>
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
