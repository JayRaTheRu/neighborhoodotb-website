// pages/studio/+Page.tsx

import React from 'react'
import { DispatchModule } from '../../src/components/DispatchModule'

type Card = {
  title: string
  body: string
  href?: string
  pill?: string
}

const WHAT_WE_BUILD: Card[] = [
  {
    title: 'Brand Systems',
    body: 'Identity, voice, and design systems that hold up under growth. Clear rules, clean assets, no chaos.',
    href: '/brand-kit',
    pill: 'Foundations'
  },
  {
    title: 'Web + Product',
    body: 'Fast, credible websites and product surfaces built for conversion, clarity, and long-term maintainability.',
    href: '/contact',
    pill: 'Build'
  },
  {
    title: 'Drops + Content Systems',
    body: 'Launch pages, content pipelines, and indexable “drop” structures that compound over time.',
    href: '/content',
    pill: 'Publishing'
  },
  {
    title: 'Experiments',
    body: 'Prototypes, interactive concepts, and lightweight proofs—test the idea before you over-invest.',
    href: '/lab',
    pill: 'R&D'
  }
]

const PROCESS: { step: string; detail: string }[] = [
  { step: 'Align', detail: 'Define goals, audience, constraints, and success criteria. Clarity before output.' },
  { step: 'System', detail: 'Information architecture, components, and content structure that stays coherent.' },
  { step: 'Build', detail: 'Implementation with performance, SEO hygiene, and maintainability as defaults.' },
  { step: 'Ship', detail: 'Deploy, verify, monitor. Iterate with real feedback, not guesswork.' }
]

function CardGrid({ items }: { items: Card[] }) {
  return (
    <div className="gridAuto gridAuto240" data-reveal>
      {items.map((c, i) => {
        const inner = (
          <div className="cardTop">
            <div className="cardRow">
              <strong className="cardTitle" style={{ margin: 0 }}>
                {c.title}
              </strong>
              {c.pill ? <span className="pill">{c.pill}</span> : null}
            </div>

            <p className="cardBody" style={{ margin: 0 }}>
              {c.body}
            </p>

            {c.href ? (
              <div className="cardMeta">
                <span className="muted">Open →</span>
              </div>
            ) : null}
          </div>
        )

        const props = {
          'data-reveal': true,
          'data-reveal-delay': String(80 + i * 60),
          'data-reveal-variant': 'fast'
        } as const

        return c.href ? (
          <a key={c.title} href={c.href} className="card" {...props}>
            {inner}
          </a>
        ) : (
          <div key={c.title} className="card" {...props}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1 data-reveal data-reveal-delay="80">
          OTB Studio
        </h1>

        <p data-reveal data-reveal-delay="140">
          The build and creative arm inside The Neighborhood—focused on systems, credible execution, and releases that
          compound.
        </p>

        <div className="actionsRow" data-reveal data-reveal-delay="220">
          <a className="btn" href="/contact">
            Start a project
          </a>
          <a className="btnGhost" href="/content">
            See Drops
          </a>
          <a className="btnGhost" href="/brand-kit">
            Brand Kit
          </a>
        </div>
      </header>

      <section className="homeSection" style={{ marginTop: 18 }}>
        <header className="sectionHeader">
          <h2 data-reveal data-reveal-delay="80">
            What we build
          </h2>
          <p data-reveal data-reveal-delay="140">
            Clean foundations and real outputs. No fluff. No chaos.
          </p>
        </header>

        <CardGrid items={WHAT_WE_BUILD} />
      </section>

      <section className="homeSection" style={{ marginTop: 26 }}>
        <header className="sectionHeader">
          <h2 data-reveal data-reveal-delay="80">
            Process
          </h2>
          <p data-reveal data-reveal-delay="140">
            Simple, repeatable, and built for momentum.
          </p>
        </header>

        <ol className="stepList" data-reveal>
          {PROCESS.map((p, i) => (
            <li
              key={p.step}
              data-reveal
              data-reveal-delay={String(80 + i * 70)}
              data-reveal-variant="fast"
            >
              <strong>{p.step}:</strong> <span className="muted">{p.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="homeSection" data-reveal data-reveal-delay="120">
        <DispatchModule source="studio_dispatch" />
      </section>
    </section>
  )
}
