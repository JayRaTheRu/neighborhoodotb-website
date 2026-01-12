import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>The Neighborhood FUDkers</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 760 }}>
          The owned IP universe inside the house. FUDkers is the allowed insanity: satirical, raw, absurd —
          but it does not speak for O.T.B. Studio or the Neighborhood umbrella.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Enter the FUDkers site</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            The full universe, drops, and collection live on the dedicated FUDkers domain.
          </p>
          <a
            href="https://fudkers.xyz"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(212,160,23,0.55)'
            }}
          >
            Open FUDkers.xyz (new tab)
          </a>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Brand boundaries</h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'rgba(242,242,242,0.72)' }}>
            <li>FUDkers is an IP line inside the Neighborhood culture house.</li>
            <li>OTB Studio remains professional: contracts, pricing, delivery, trust.</li>
            <li>The Collective is a roster, not a company and not a representative body.</li>
          </ul>
          <p style={{ marginTop: 12, color: 'rgba(242,242,242,0.72)' }}>
            Need usage rules or assets? See the <a href="/brand-kit" style={{ textDecoration: 'underline' }}>Brand Kit</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
