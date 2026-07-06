import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
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
import {
  applyCardsLanguage,
  getInitialLanguage,
  languageLabels,
  setStoredLanguage,
  type Language,
  type SiteLabels,
} from './lib/language'
import { loadMissionCards, type CardsResponse } from './lib/cardSource'
import { getCardSdgMatches } from './lib/sdg'
import { buildPublishCardPlan } from './lib/socialCardPlan'

const themeIcons: Record<string, typeof Globe2> = {
  教育公平: GraduationCap,
  文化保护: Languages,
  'Cultural Preservation': Languages,
  'Cultural Heritage': Languages,
  无障碍科技: ShieldCheck,
  Accessibility: ShieldCheck,
  健康管理: HeartPulse,
  'Health Management': HeartPulse,
  科研健康: FlaskConical,
  健康科研: FlaskConical,
  'Research Support': FlaskConical,
}

function App() {
  const [cardsResponse, setCardsResponse] = useState<CardsResponse>({
    cards: missionCards,
    source: 'local',
  })
  const [selectedTheme, setSelectedTheme] = useState('全部')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openCardId, setOpenCardId] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage())
  const labels = languageLabels[language]
  const cards = useMemo(
    () => applyCardsLanguage(cardsResponse.cards, language),
    [cardsResponse.cards, language],
  )
  const activeThemes = useMemo(
    () => [labels.themeAll, ...new Set(cards.map((card) => card.themeLabel))],
    [cards, labels.themeAll],
  )
  const effectiveSelectedTheme = activeThemes.includes(selectedTheme) ? selectedTheme : labels.themeAll

  const filteredCards = useMemo(() => {
    if (effectiveSelectedTheme === labels.themeAll) return cards
    return cards.filter((card) => card.themeLabel === effectiveSelectedTheme)
  }, [cards, effectiveSelectedTheme, labels.themeAll])
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

  function selectLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage)
    setStoredLanguage(nextLanguage)
    setSelectedTheme(languageLabels[nextLanguage].themeAll)
    setActiveId(null)
  }

  function openCardDetail(card: MissionCard) {
    setActiveId(card.id)
    setOpenCardId(card.id)
  }

  return (
    <main className="lab-shell">
      <section className="hero-panel" aria-labelledby="page-title">
        <div className="site-topbar">
          <div className="eyebrow">
            <span className="signal-dot" aria-hidden="true" />
            {labels.appName}
          </div>
          <div className="language-toggle" aria-label={labels.languageToggleLabel}>
            {(['zh', 'en'] satisfies Language[]).map((option) => (
              <button
                key={option}
                type="button"
                className={language === option ? 'is-selected' : ''}
                onClick={() => selectLanguage(option)}
                aria-pressed={language === option}
              >
                {option === 'zh' ? '中文' : 'EN'}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-copy">
          <h1 id="page-title">
            <span>{labels.heroLineOne}</span>
            <span>{labels.heroLineTwo}</span>
          </h1>
          <p>{labels.heroBody}</p>
          <div className="hero-actions">
            <div className="data-source">
              {cardsResponse.source === 'github-json' ? labels.sourceConnected : labels.sourceLocal}
            </div>
            <div className="hero-stat">
              <strong>{filteredCards.length}</strong>
              <span>{labels.cardCount}</span>
            </div>
            <div className="hero-stat">
              <strong>{activeThemes.length - 1}</strong>
              <span>{labels.themeCount}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label={labels.themeFiltersLabel}>
        <div>
          <span className="toolbar-kicker">{labels.galleryKicker}</span>
          <h2>{labels.galleryTitle}</h2>
        </div>
        <div className="theme-tabs" role="tablist" aria-label={labels.themeFiltersLabel}>
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

      <section className="gallery-grid" aria-label={labels.missionCardsLabel}>
        {filteredCards.map((card, index) => (
          <MissionCardTile
            key={card.id}
            card={card}
            index={cardOrder.get(card.id) ?? index + 1}
            isActive={card.id === activeId}
            onSelect={() => openCardDetail(card)}
            labels={labels}
          />
        ))}
      </section>

      <ProjectMap
        cards={filteredCards}
        cardOrder={cardOrder}
        activeId={activeId}
        onSelect={openCardDetail}
        language={language}
        labels={labels}
      />

      {openCard && (
        <CardDetailModal
          card={openCard}
          index={cardOrder.get(openCard.id) ?? 1}
          onClose={() => setOpenCardId(null)}
          language={language}
          labels={labels}
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
  labels: SiteLabels
}

function MissionCardTile({
  card,
  index,
  isActive,
  onSelect,
  labels,
}: MissionCardTileProps) {
  const Icon = themeIcons[card.themeLabel] ?? Brain

  return (
    <article
      className={`mission-card ${isActive ? 'is-active' : ''}`}
      style={{ '--card-accent': card.accent } as React.CSSProperties}
    >
      <button type="button" onClick={onSelect} aria-label={labels.viewCardLabel(card.title)}>
        <CardBackdrop card={card} />
        <div className="card-index">{String(index).padStart(2, '0')}</div>
        <div className="card-poster-tag">
          <span>MISSION CARD</span>
          <span>{card.year}</span>
        </div>
        <div className="card-main">
          <div className="card-meta">
            <span>{card.year}</span>
            <span>{card.themeLabel}</span>
            <span>
              {labels.difficultyPrefix} {card.difficulty}
            </span>
          </div>
          <h3>{card.title}</h3>
          <p>{card.hook}</p>
          <div className="tile-question">
            <span>{labels.classroomQuestion}</span>
            <strong>{card.question}</strong>
          </div>
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

type CardBackdropProps = {
  card: MissionCard
}

function CardBackdrop({ card }: CardBackdropProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const Icon = themeIcons[card.themeLabel] ?? Brain
  const hasImage = Boolean(card.coverImage && !imageFailed)

  return (
    <figure className={`card-backdrop ${hasImage ? 'has-image' : 'needs-image'}`} aria-hidden="true">
      {hasImage ? (
        <img src={card.coverImage} alt="" loading="lazy" onError={() => setImageFailed(true)} />
      ) : (
        <div className="card-backdrop-placeholder">
          <Icon size={82} strokeWidth={1.2} />
        </div>
      )}
    </figure>
  )
}

type CardVisualProps = {
  card: MissionCard
  variant: 'tile' | 'modal'
  labels: SiteLabels
}

function CardVisual({ card, variant, labels }: CardVisualProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const Icon = themeIcons[card.themeLabel] ?? Brain
  const hasImage = Boolean(card.coverImage && !imageFailed)
  const status = card.coverImageStatus || (card.coverImage ? labels.fallbackImageStatus : labels.fallbackImageLabel)
  const label = hasImage ? status : labels.fallbackImageLabel

  return (
    <figure className={`card-visual is-${variant} ${hasImage ? 'has-image' : 'needs-image'}`}>
      {hasImage ? (
        <img
          src={card.coverImage}
          alt={card.coverImageAlt || `${card.sourceProject} screenshot`}
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
            ? card.coverImageSource || labels.fallbackImageSource
            : card.coverImageHint || labels.fallbackImageHint}
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
  language: Language
  labels: SiteLabels
}

const techSegments = [
  { key: 'starter' },
  { key: 'builder' },
  { key: 'advanced' },
] as const

const impactSegments = [
  { key: 'wide' },
  { key: 'local' },
  { key: 'prototype' },
] as const

type TechSegmentKey = (typeof techSegments)[number]['key']
type ImpactSegmentKey = (typeof impactSegments)[number]['key']

const mapCopy: Record<
  Language,
  {
    tech: Record<TechSegmentKey, { label: string; hint: string }>
    impact: Record<ImpactSegmentKey, { label: string; hint: string }>
    zoneTitles: Record<string, string>
  }
> = {
  zh: {
    tech: {
      starter: { label: '轻量上手', hint: '先做可用原型' },
      builder: { label: '整合应用', hint: '需要组合工具和流程' },
      advanced: { label: '技术挑战', hint: '适合深挖模型/硬件/数据' },
    },
    impact: {
      wide: { label: '更大范围影响', hint: '能服务一群人或公共议题' },
      local: { label: '校园/家庭影响', hint: '从身边真实场景开始' },
      prototype: { label: '小范围试验', hint: '适合快速做 demo' },
    },
    zoneTitles: {
      'wide-starter': '低门槛，高共鸣',
      'wide-builder': '做成可传播的服务',
      'wide-advanced': '挑战真实世界问题',
      'local-starter': '从身边问题切入',
      'local-builder': '做出能被反复使用的工具',
      'local-advanced': '让技术进入真实场景',
      'prototype-starter': '先把想法跑起来',
      'prototype-builder': '做一个完整小产品',
      'prototype-advanced': '探索硬核原型',
    },
  },
  en: {
    tech: {
      starter: { label: 'Light Starter', hint: 'Build a usable first prototype' },
      builder: { label: 'Integrated App', hint: 'Combine tools, data, and workflow' },
      advanced: { label: 'Deep Tech', hint: 'Dig into models, hardware, or data' },
    },
    impact: {
      wide: { label: 'Broad Impact', hint: 'Serve a group or public issue' },
      local: { label: 'School / Family Impact', hint: 'Start from a nearby real scene' },
      prototype: { label: 'Small Experiment', hint: 'Good for a fast demo' },
    },
    zoneTitles: {
      'wide-starter': 'Low Barrier, High Resonance',
      'wide-builder': 'Make It a Shareable Service',
      'wide-advanced': 'Challenge a Real-World Problem',
      'local-starter': 'Start From a Nearby Problem',
      'local-builder': 'Build a Tool People Reuse',
      'local-advanced': 'Bring Technology Into a Real Scene',
      'prototype-starter': 'Get the Idea Running',
      'prototype-builder': 'Build a Complete Small Product',
      'prototype-advanced': 'Explore a Hard Prototype',
    },
  },
}

function ProjectMap({ cards, cardOrder, activeId, onSelect, language, labels }: ProjectMapProps) {
  const zones = getMapZones(cards)
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null)
  const copy = mapCopy[language]

  return (
    <section className="map-panel" aria-labelledby="map-title">
      <div className="panel-heading">
        <div>
          <span>{labels.mapKicker}</span>
          <h2 id="map-title">{labels.mapTitle}</h2>
        </div>
        <p>{labels.mapBody}</p>
      </div>

      <div className="zone-map" aria-label={labels.mapLabel}>
        <div className="zone-axis-impact">{labels.impactAxis}</div>
        <div className="zone-grid">
          {zones.map((zone) => {
            const isExpanded = expandedZoneId === zone.id
            const visibleCards = isExpanded ? zone.cards : zone.cards.slice(0, 4)
            const hiddenCount = zone.cards.length - visibleCards.length
            const impact = copy.impact[zone.impactKey]
            const tech = copy.tech[zone.techKey]

            return (
              <section
                key={zone.id}
                className={`map-zone ${zone.cards.length === 0 ? 'is-empty' : ''}`}
                aria-label={`${impact.label}, ${tech.label}`}
              >
                <div className="zone-heading">
                  <div>
                    <span>{impact.label}</span>
                    <strong>{copy.zoneTitles[zone.id]}</strong>
                  </div>
                  <em>{labels.zoneProjectCount(zone.cards.length)}</em>
                </div>
                <p>{tech.hint}</p>
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
                      {isExpanded ? labels.collapse : labels.expandMore(hiddenCount)}
                    </button>
                  )}
                  {zone.cards.length === 0 && <span className="zone-empty">{labels.emptyZone}</span>}
                </div>
              </section>
            )
          })}
        </div>
        <div className="zone-axis-tech">
          {techSegments.map((segment) => (
            <span key={segment.key}>
              <strong>{copy.tech[segment.key].label}</strong>
              {copy.tech[segment.key].hint}
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
        techKey: tech.key,
        impactKey: impact.key,
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
  language: Language
  labels: SiteLabels
}

function CardDetailModal({ card, index, onClose, language, labels }: CardDetailModalProps) {
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
          aria-label={labels.modalClose}
          onClick={onClose}
        >
          <X size={21} strokeWidth={1.8} aria-hidden="true" />
        </button>

        <div className="modal-hero">
          <div className="modal-identity">
            <div className="modal-index" aria-label={labels.modalIndexLabel(displayIndex)}>
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
              <div className="source-links" aria-label={labels.sourceLinksLabel}>
                {sourceUrls.map((sourceUrl, index) => (
                  <a
                    key={sourceUrl}
                    className="source-link"
                    href={sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
                    {sourceUrls.length === 1
                      ? labels.sourceLinkSingle
                      : labels.sourceLinkMultiple(index + 1)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <SdgReveal card={card} language={language} labels={labels} />

        <CardVisual card={card} variant="modal" labels={labels} />

        <PublishCardPreview card={card} index={index} language={language} labels={labels} />

        <CardDetail card={card} labels={labels} />
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
  labels: SiteLabels
}

type SdgRevealProps = {
  card: MissionCard
  language: Language
  labels: SiteLabels
}

type PublishCardPreviewProps = {
  card: MissionCard
  index: number
  language: Language
  labels: SiteLabels
}

function SdgReveal({ card, language, labels }: SdgRevealProps) {
  const [isOpen, setIsOpen] = useState(false)
  const matches = useMemo(() => getCardSdgMatches(card, language), [card, language])
  const panelId = `sdg-answer-${card.id}`

  return (
    <section className={`sdg-reveal ${isOpen ? 'is-open' : ''}`} aria-label={labels.sdgRevealButton}>
      <button
        type="button"
        className="sdg-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Globe2 size={18} strokeWidth={1.8} aria-hidden="true" />
        <span>{labels.sdgRevealButton}</span>
      </button>

      {isOpen && (
        <div className="sdg-answer" id={panelId}>
          <p>{labels.sdgRevealIntro}</p>
          <div className="sdg-list">
            {matches.map((match) => (
              <article
                className="sdg-match"
                key={match.id}
                style={{ '--sdg-color': match.color } as React.CSSProperties}
              >
                <div className="sdg-badge">
                  <span>{match.code}</span>
                  <strong>{match.name}</strong>
                </div>
                <p>{match.reason}</p>
              </article>
            ))}
          </div>
          <span className="sdg-note">{labels.sdgRevealBadgeLabel}</span>
        </div>
      )}
    </section>
  )
}

function PublishCardPreview({ card, index, language, labels }: PublishCardPreviewProps) {
  const plan = buildPublishCardPlan(card, index, language)
  const Icon = themeIcons[card.themeLabel] ?? Brain
  const sourceUrl = getSourceUrls(card)[0]

  return (
    <section className="publish-preview" aria-label={labels.publishPreviewLabel}>
      <div className="publish-card">
        <div className="publish-chrome">
          <span>{plan.issue}</span>
          <span>{labels.publishProjectLabel}</span>
        </div>
        <div className="publish-layout">
          <div className="publish-copy">
            <p className="publish-kicker">{card.themeLabel}</p>
            <h3>{plan.title}</h3>
            <p>{plan.promise}</p>
          </div>
          <div className="publish-proof">
            <div className="publish-proof-icon">
              <Icon size={30} strokeWidth={1.45} aria-hidden="true" />
            </div>
            <span>{plan.evidenceLabel}</span>
            <strong>{plan.evidence}</strong>
          </div>
        </div>
        <div className="publish-ledger">
          {plan.publishAngles.map((angle, angleIndex) => (
            <div key={angle}>
              <span>{String(angleIndex + 1).padStart(2, '0')}</span>
              <strong>{angle}</strong>
            </div>
          ))}
        </div>
        <div className="publish-question">
          <span>{labels.publishTransfer}</span>
          <p>{plan.transferPrompt}</p>
        </div>
      </div>

      <div className="projection-card">
        <div>
          <span>{labels.projectionKicker}</span>
          <h3>{labels.projectionTitle}</h3>
        </div>
        <p>{plan.classroomQuestion}</p>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            {labels.evidenceLayer}
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  )
}

function CardDetail({ card, labels }: CardDetailProps) {
  return (
    <div className="detail-panel">
      <div className="before-after">
        <div>
          <span>{labels.detailProblem}</span>
          <p>{card.problem}</p>
        </div>
        <div>
          <span>{labels.detailAiMove}</span>
          <p>{card.aiMove}</p>
        </div>
        <div>
          <span>{labels.detailStudentBuild}</span>
          <p>{card.demoGoal}</p>
        </div>
      </div>

      <div className="detail-grid">
        <InfoBlock
          icon={<ScanSearch size={18} aria-hidden="true" />}
          label={labels.detailAudience}
          value={card.audience}
        />
        <InfoBlock
          icon={<Brain size={18} aria-hidden="true" />}
          label={labels.detailStudentProject}
          value={card.studentProject}
        />
        <InfoBlock
          icon={<ChartNoAxesColumnIncreasing size={18} aria-hidden="true" />}
          label={labels.detailOutputs}
          value={card.outputs.join(' / ')}
        />
      </div>

      <div className="question-strip">
        <span>{labels.thinkPrompt}</span>
        <p>{card.question}</p>
      </div>

      <div className="insight-strip">
        <span>{labels.projectTip}</span>
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
