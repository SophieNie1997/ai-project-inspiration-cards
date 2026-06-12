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
  const [activeId, setActiveId] = useState<string | null>(null)
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

  const openCard = openCardId
    ? cards.find((card) => card.id === openCardId) ?? null
    : null

  useEffect(() => {
    let isMounted = true
    loadMissionCards(missionCards).then((response) => {
      if (!isMounted) return
      setCardsResponse(response)
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
    setActiveId(null)
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
            isActive={card.id === activeId}
            onSelect={() => openCardDetail(card)}
          />
        ))}
      </section>

      <ProjectMap
        cards={filteredCards}
        cardOrder={cardOrder}
        activeId={activeId}
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
        <CardVisual card={card} variant="tile" />
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

type CardVisualProps = {
  card: MissionCard
  variant: 'tile' | 'modal'
}

function CardVisual({ card, variant }: CardVisualProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const Icon = themeIcons[card.themeLabel] ?? Brain
  const hasImage = Boolean(card.coverImage && !imageFailed)
  const status = card.coverImageStatus || (card.coverImage ? '已确认' : '待补图')
  const label = hasImage ? status : '待补真实截图'

  return (
    <figure className={`card-visual is-${variant} ${hasImage ? 'has-image' : 'needs-image'}`}>
      {hasImage ? (
        <img
          src={card.coverImage}
          alt={card.coverImageAlt || `${card.sourceProject} 项目截图`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="visual-placeholder" aria-hidden="true">
          <Icon size={variant === 'modal' ? 42 : 30} strokeWidth={1.45} />
        </div>
      )}
      <figcaption>
        <span>{label}</span>
        <strong>
          {hasImage
            ? card.coverImageSource || '真实项目图'
            : card.coverImageHint || '优先补官网 / GitHub README / 项目截图'}
        </strong>
      </figcaption>
    </figure>
  )
}

type ProjectMapProps = {
  cards: MissionCard[]
  cardOrder: Map<string, number>
  activeId: string | null
  onSelect: (card: MissionCard) => void
}

const techSegments = [
  { key: 'starter', label: '轻量上手', hint: '先做可用原型' },
  { key: 'builder', label: '整合应用', hint: '需要组合工具和流程' },
  { key: 'advanced', label: '技术挑战', hint: '适合深挖模型/硬件/数据' },
] as const

const impactSegments = [
  { key: 'wide', label: '更大范围影响', hint: '能服务一群人或公共议题' },
  { key: 'local', label: '校园/家庭影响', hint: '从身边真实场景开始' },
  { key: 'prototype', label: '小范围试验', hint: '适合快速做 demo' },
] as const

const zoneTitles: Record<string, string> = {
  'wide-starter': '低门槛，高共鸣',
  'wide-builder': '做成可传播的服务',
  'wide-advanced': '挑战真实世界问题',
  'local-starter': '从身边问题切入',
  'local-builder': '做出能被反复使用的工具',
  'local-advanced': '让技术进入真实场景',
  'prototype-starter': '先把想法跑起来',
  'prototype-builder': '做一个完整小产品',
  'prototype-advanced': '探索硬核原型',
}

type TechSegmentKey = (typeof techSegments)[number]['key']
type ImpactSegmentKey = (typeof impactSegments)[number]['key']

function ProjectMap({ cards, cardOrder, activeId, onSelect }: ProjectMapProps) {
  const zones = getMapZones(cards)
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null)

  return (
    <section className="map-panel" aria-labelledby="map-title">
      <div className="panel-heading">
        <div>
          <span>项目地图</span>
          <h2 id="map-title">按方向找到你的项目入口</h2>
        </div>
        <p>
          横向看技术挑战，纵向看影响范围。先找一个像你想做的方向，再点开里面的项目看看。
        </p>
      </div>

      <div className="zone-map" aria-label="按技术挑战和影响范围分区的项目地图">
        <div className="zone-axis-impact">影响范围</div>
        <div className="zone-grid">
          {zones.map((zone) => {
            const isExpanded = expandedZoneId === zone.id
            const visibleCards = isExpanded ? zone.cards : zone.cards.slice(0, 4)
            const hiddenCount = zone.cards.length - visibleCards.length

            return (
              <section
                key={zone.id}
                className={`map-zone ${zone.cards.length === 0 ? 'is-empty' : ''}`}
                aria-label={`${zone.impact.label}，${zone.tech.label}`}
              >
                <div className="zone-heading">
                  <div>
                    <span>{zone.impact.label}</span>
                    <strong>{zone.title}</strong>
                  </div>
                  <em>{zone.cards.length} 个</em>
                </div>
                <p>{zone.tech.hint}</p>
                <div className="zone-projects">
                  {visibleCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      className={`zone-project ${card.id === activeId ? 'is-active' : ''}`}
                      style={{ '--card-accent': card.accent } as React.CSSProperties}
                      onClick={() => onSelect(card)}
                      title={card.title}
                    >
                      <span>{String(cardOrder.get(card.id) ?? 0).padStart(2, '0')}</span>
                      {card.title}
                    </button>
                  ))}
                  {zone.cards.length > 4 && (
                    <button
                      type="button"
                      className="zone-more"
                      onClick={() => setExpandedZoneId(isExpanded ? null : zone.id)}
                    >
                      {isExpanded ? '收起' : `+${hiddenCount} 个项目`}
                    </button>
                  )}
                  {zone.cards.length === 0 && <span className="zone-empty">待补充案例</span>}
                </div>
              </section>
            )
          })}
        </div>
        <div className="zone-axis-tech">
          {techSegments.map((segment) => (
            <span key={segment.key}>
              <strong>{segment.label}</strong>
              {segment.hint}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function getMapZones(cards: MissionCard[]) {
  return impactSegments.flatMap((impact) =>
    techSegments.map((tech) => {
      const zoneCards = cards.filter(
        (card) =>
          getTechSegmentKey(card.mapX) === tech.key &&
          getImpactSegmentKey(card.mapY) === impact.key,
      )

      return {
        id: `${impact.key}-${tech.key}`,
        title: zoneTitles[`${impact.key}-${tech.key}`],
        tech,
        impact,
        cards: zoneCards,
      }
    }),
  )
}

function normalizeMapScore(value: number) {
  if (!Number.isFinite(value)) return 3

  if (value <= 10) {
    return clamp(value, 1, 5)
  }

  return 1 + (clamp(value, 0, 100) / 100) * 4
}

function getTechSegmentKey(value: number): TechSegmentKey {
  const score = normalizeMapScore(value)

  if (score <= 3) return 'starter'
  if (score < 5) return 'builder'
  return 'advanced'
}

function getImpactSegmentKey(value: number): ImpactSegmentKey {
  const score = normalizeMapScore(value)

  if (score <= 3) return 'prototype'
  if (score < 5) return 'local'
  return 'wide'
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

        <CardVisual card={card} variant="modal" />

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
