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
    <div
      style={{
        display: 'grid',
        gap: 14,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
      }}
    >
      {items.map((c) => {
        const content = (
          <div
            style={{
              padding: 16,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14,
              height: '100%'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
              <strong style={{ fontSize: 16 }}>{c.title}</strong>
              {c.pill ? <span className="pill">{c.pill}</span> : null}
            </div>

            <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.6 }}>{c.body}</p>

            {c.href ? (
              <div style={{ marginTop: 12 }}>
                <span className="muted">Open →</span>
              </div>
            ) : null}
          </div>
        )

        return c.href ? (
          <a key={c.title} href={c.href} style={{ textDecoration: 'none' }}>
            {content}
          </a>
        ) : (
          <div key={c.title}>{content}</div>
        )
      })}
    </div>
  )
}

export default function Page() {
  return (
    <section>
      <header className="sectionHeader">
        <h1>OTB Studio</h1>
        <p>
          The build and creative arm inside The Neighborhood—focused on systems, credible execution, and releases that
          compound.
        </p>

        <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btn" href="/contact" style={{ textDecoration: 'none' }}>
            Start a project
          </a>
          <a className="btn secondary" href="/content" style={{ textDecoration: 'none' }}>
            See Drops
          </a>
          <a className="btn secondary" href="/brand-kit" style={{ textDecoration: 'none' }}>
            Brand Kit
          </a>
        </div>
      </header>

      <section className="homeSection" style={{ marginTop: 18 }}>
        <header className="sectionHeader">
          <h2>What we build</h2>
          <p>Clean foundations and real outputs. No fluff. No chaos.</p>
        </header>
        <CardGrid items={WHAT_WE_BUILD} />
      </section>

      <section className="homeSection" style={{ marginTop: 26 }}>
        <header className="sectionHeader">
          <h2>Process</h2>
          <p>Simple, repeatable, and built for momentum.</p>
        </header>

        <ol style={{ marginTop: 10, paddingLeft: 18, display: 'grid', gap: 12 }}>
          {PROCESS.map((p) => (
            <li key={p.step} style={{ lineHeight: 1.7 }}>
              <strong>{p.step}:</strong> <span style={{ opacity: 0.88 }}>{p.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <div style={{ marginTop: 28 }}>
        <DispatchModule source="studio_dispatch" />
      </div>
    </section>
  )
}
