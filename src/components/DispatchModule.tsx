import React from 'react'
import { supabase } from '../lib/supabaseClient'

type Status =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function DispatchModule({ source = 'neighborhoodotb.io' }: { source?: string }) {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [consent, setConsent] = React.useState(false)

  const [status, setStatus] = React.useState<Status>({ type: 'idle' })

  // anti-spam
  const [company, setCompany] = React.useState('') // honeypot trap
  const [cooldownUntil, setCooldownUntil] = React.useState<number>(0)

  function inCooldown() {
    return Date.now() < cooldownUntil
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // 1) Honeypot: if filled, treat as success but do nothing.
    // Bots often fill every field; humans won't see this input.
    if (company.trim().length > 0) {
      setStatus({ type: 'success', message: 'You’re in. Watch the next drop.' })
      return
    }

    // 2) Cooldown: prevent rapid repeat submits
    if (inCooldown()) {
      setStatus({ type: 'error', message: 'Please wait a moment before trying again.' })
      return
    }

    const emailNorm = normalizeEmail(email)

    if (!isValidEmail(emailNorm)) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' })
      return
    }

    // 3) Consent: trust + legal hygiene
    if (!consent) {
      setStatus({ type: 'error', message: 'Please confirm consent to join the Dispatch.' })
      return
    }

    setStatus({ type: 'loading' })

    // Start cooldown immediately (even if request fails)
    setCooldownUntil(Date.now() + 12_000)

    const payload = {
      email: emailNorm,
      name: name.trim() || null,
      source
    }

    const { error } = await supabase.from('dispatch_subscribers').insert(payload)

    if (!error) {
      setEmail('')
      setName('')
      setCompany('')
      setConsent(false)
      setStatus({ type: 'success', message: 'You’re in. Watch the next drop.' })
      return
    }

    const code = (error as any).code
    const msg = (error as any).message as string

    // Unique constraint violation (already subscribed)
    if (code === '23505' || /duplicate key|unique/i.test(msg)) {
      setStatus({ type: 'success', message: 'Already on the list. You’re good.' })
      return
    }

    setStatus({
      type: 'error',
      message: 'Signup failed. Please try again in a moment.'
    })
  }

  return (
    <section className="dispatch">
      <div className="dispatchHeader">
        <h2 className="dispatchTitle">The Neighborhood Dispatch</h2>
        <p className="dispatchSub">Drop alerts, experiments, and releases. No hype spam. Just signals.</p>
      </div>

      <form onSubmit={onSubmit} className="dispatchForm">
        {/* Honeypot field: hidden from humans, attractive to bots */}
        <div className="hp" aria-hidden="true">
          <label>
            Company
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <label className="field">
          <span className="fieldLabel">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@domain.com"
            required
          />
        </label>

        <label className="field">
          <span className="fieldLabel">Name (optional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoComplete="name"
            placeholder="First name"
          />
        </label>

        <label className="check">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>I agree to receive The Neighborhood Dispatch emails.</span>
        </label>

        <button className="btn" disabled={status.type === 'loading' || inCooldown()} type="submit">
          {status.type === 'loading' ? 'Joining…' : inCooldown() ? 'Hold…' : 'Join Dispatch'}
        </button>

        {status.type === 'success' ? (
          <div className="formMsg success" role="status">
            {status.message}
          </div>
        ) : null}

        {status.type === 'error' ? (
          <div className="formMsg error" role="alert">
            {status.message}
          </div>
        ) : null}

        <div className="dispatchFine">
          By joining, you agree to our <a href="/legal/privacy">Privacy Policy</a>.
        </div>
      </form>
    </section>
  )
}
