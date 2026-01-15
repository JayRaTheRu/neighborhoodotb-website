import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader">
        <h1>The Neighborhood FUDkers</h1>
        <p>
          The owned IP universe inside the house. FUDkers is the allowed insanity: satirical, raw, absurd — but it does
          not speak for O.T.B. Studio or the Neighborhood umbrella.
        </p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <div className="panel">
          <h2 className="panelTitle">Enter the FUDkers site</h2>
          <p className="panelText">The full universe, drops, and collection live on the dedicated FUDkers domain.</p>
          <div className="panelActions">
            <a className="btn btnAccent" href="https://fudkers.xyz" target="_blank" rel="noreferrer">
              Open FUDkers.xyz (new tab)
            </a>
          </div>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Brand boundaries</h2>
          <ul className="panelList">
            <li>FUDkers is an IP line inside the Neighborhood culture house.</li>
            <li>OTB Studio remains professional: contracts, pricing, delivery, trust.</li>
            <li>The Collective is a roster, not a company and not a representative body.</li>
          </ul>
          <p className="panelText" style={{ marginTop: 12 }}>
            Need usage rules or assets? See the <a className="linkInline" href="/brand-kit">Brand Kit</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
