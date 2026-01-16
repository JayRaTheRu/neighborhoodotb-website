import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>Legal</h1>
        <p>Policies and terms for using NeighborhoodOTB.io.</p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <a
          className="card"
          href="/legal/privacy"
          data-reveal
          data-reveal-delay="80"
          data-reveal-variant="fast"
        >
          <strong className="cardTitle" style={{ margin: 0 }}>
            Privacy Policy
          </strong>
          <p className="cardBody" style={{ marginTop: 8 }}>
            What we collect, how we use it, and how to contact us about privacy.
          </p>
          <div className="cardMeta">Open →</div>
        </a>

        <a
          className="card"
          href="/legal/terms"
          data-reveal
          data-reveal-delay="140"
          data-reveal-variant="fast"
        >
          <strong className="cardTitle" style={{ margin: 0 }}>
            Terms of Use
          </strong>
          <p className="cardBody" style={{ marginTop: 8 }}>
            Rules and expectations for using this site and its content.
          </p>
          <div className="cardMeta">Open →</div>
        </a>
      </div>
    </section>
  )
}
