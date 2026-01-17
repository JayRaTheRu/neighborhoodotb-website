# Codex Log — NeighborhoodOTB Website (append-only)

Rule: Oldest at top. Newest at bottom. Never edit old entries—only append new tasks.

---

# TASK 001 — 2026-01-15 — A) Scroll-reveal rollout + B) Route wipe transition implemented

## LOG/REPORT 001

- A: Rolled out scroll-reveal attributes across remaining pages and key components.
  - No blanket animation inside `.prose` / MDX bodies.
  - Staggered delays used for grids/cards.
- B: Implemented route wipe overlay with Vike transition hooks and CSS.
  - Reduced-motion handling included.
- Build/typecheck:
  - `npm run build` failed in PowerShell (`/bin/bash` ENOENT) but succeeded in WSL.
  - No typecheck script present at the time.
- Verification:
  - CLI validation only; browser verification required.

---

# TASK 002 — 2026-01-15 — Route wipe glitch follow-up (marigold line flash)

## LOG/REPORT 002

- Symptom: brief marigold “line glitch” artifact during navigation.
- Hypothesis: route wipe overlay/accent was painting during offscreen transform or overlapping timeouts.
- Changes:
  - Cleared pending wipe timeouts and reset classes deterministically:
    - `pages/+onPageTransitionStart.ts`
    - `pages/+onPageTransitionEnd.ts`
  - CSS hardening to reduce paint artifacts:
    - `src/styles/global.css`: `visibility: hidden` by default, overlay moved farther offscreen with `translate3d`, added `contain: paint` + `will-change`.
- Verification:
  - Not visually confirmed (CLI-only).
- Build:
  - `npm run build` succeeded in WSL.

---

# TASK 003 — 2026-01-16 — Diagnostic confirmation (reduced-motion suppresses glitch)

## LOG/REPORT 003

- Observation: When DevTools emulates `prefers-reduced-motion: reduce`, the marigold line artifact does not occur during rapid navigation.
- Inference: Issue is in normal-motion transition path (route wipe overlay/accent paint), not static layout.
- Next action (at the time): Make overlay fully inert unless actively wiping; gate/remove any accent paint during inactive frames.

---

# TASK 004 — 2026-01-16 — Route wipe glitch fix attempt (accent gating)

## LOG/REPORT 004

- Root cause hypothesis (at the time): route wipe accent line/background could still paint during inactive/transition frames, producing a 1px marigold flash.
- Fix attempt:
  - Gated accent rendering to `.is-wiping-*` states only.
  - Made inactive overlay background transparent.
  - Tracked/cleared wipe-reset rAF for deterministic class reset.
- Files changed:
  - `src/styles/global.css`
  - `pages/+onPageTransitionStart.ts`
  - `pages/+onPageTransitionEnd.ts`
- Verification:
  - Dev server started in WSL (port 3001; port 3000 in use), but manual browser checks were not completed at that moment.
- Build:
  - `npm run build` succeeded in WSL.

---

# TASK 005 — 2026-01-16 — Glitch persists; escalation plan (ARM → ANIMATE)

## LOG/REPORT 005

- Evidence: user video still showed full-width marigold horizontal line artifact during normal-motion navigation.
- Conclusion: opacity gating was insufficient; likely a one-frame intermediate paint during overlay activation/transform.
- Escalation plan:
  - Remove wipe-edge accent paint entirely.
  - Switch inactive overlay to `display: none` (stronger than visibility).
  - Implement 2-phase activation (ARM → ANIMATE) in transition hooks.
  - Verify in a real browser.

---

# TASK 006 — 2026-01-16 — Manual observation: route wipe glitch no longer reproducible

## LOG/REPORT 006

- Observation: user reports marigold line artifact is no longer visible in normal navigation.
- Status:
  - Treat transition as stabilized.
  - Avoid reintroducing wipe-edge accent paint.
  - Proceed to finish-the-site workstreams (design polish, SEO/AEO, performance, ops).

---

# TASK 007 — 2026-01-16 — Finish-the-site sprint (design polish + SEO/AEO + performance + ops)

## LOG/REPORT 007

- Design polish:
  - Tightened typography/spacing rhythm and standardized panel/card styling in `src/styles/global.css`.
  - Added utility/meta stack helpers and improved prose media framing (images) while preserving Street Editorial rules.
- SEO/AEO:
  - Added/updated page-specific titles/descriptions for key routes (Home/Legal).
  - Added FAQ blocks on About/Studio/Contact for answer-first/AEO support (without violating reveal/.prose constraints).
  - Updated head/meta handling in `pages/+Head.tsx` (explicitly allowed for SEO/AEO sprint).
- Performance:
  - Minor CSS/UX hardening aimed at reducing incidental paint/layout issues; no architecture changes.
- Ops readiness:
  - Hardened Dispatch module UX (field names, disabled states, aria-busy/loading).
  - Improved 404 experience.
  - Added optional analytics wiring + SPA pageview tracking (final provider/canonical pending at the time).

- Verification:
  - Dev: [FILL: pass/fail + port]
  - Build: [FILL: pass/fail]
  - Manual browser: [FILL: key routes checked + reduced-motion checked]
- Follow-ups:
  - Canonical domain chosen: apex `https://neighborhoodotb.io` with `www` redirect → apex (user later verified).
  - Analytics provider selected: GA4 (Measurement ID below).

---

# TASK 008 — 2026-01-16 — GA4 selected (free) + implementation requirements captured

## LOG/REPORT 008

- Analytics provider decision: GA4 (free).
- Measurement ID: `G-GKKL59HZSR`
- Implementation requirements for next task:
  - Add GA4 tag in `pages/+Layout.tsx`:
    - load `gtag.js?id=G-GKKL59HZSR`
    - configure with `{ send_page_view: false }` (SPA-safe)
  - Fire SPA pageviews on route changes (Vike navigation):
    - `gtag('event', 'page_view', { page_location, page_path, page_title })`
  - Ensure canonical + analytics align:
    - Canonical domain: `neighborhoodotb.io`
    - GA should track `neighborhoodotb.io`
  - Remove/avoid any Plausible script to prevent double-counting.

---

# TASK 010 — 2026-01-16 — GA4 Google tag snippet + SPA pageviews

## LOG/REPORT 010

- Files changed:
  - `pages/+Head.tsx`
  - `pages/+Layout.tsx`
  - `codex/HANDOFF.md`
- What changed:
  - Added the Google-provided gtag.js snippet to the global head so it loads once on every page.
  - Kept SPA route-change tracking via manual `page_view` events (skips initial load to avoid duplicate counts).
  - Removed Layout-side GA loader so the tag exists only once.
- GA4 Realtime verification:
  - Open GA4 → Realtime.
  - Navigate Home → About/Studio → Content → Legal → Home.
  - Confirm `page_view` events appear with correct `page_location`, `page_path`, and `page_title`.
- Dev/build:
  - NOT RUN (Mode A; user runs locally in WSL).

---

# TASK 009 — 2026-01-16 — GA4 analytics (free) + SPA pageviews (Vike)

## LOG/REPORT 009

- Files changed:
  - `pages/+Layout.tsx`
  - `pages/+Head.tsx`
  - `PLAN.md` (deleted)
  - `codex/HANDOFF.md` (reset to ready state)
- What changed:
  - Removed Plausible wiring and added GA4 `gtag.js` loader (single instance) with `send_page_view: false`.
  - Added manual `page_view` firing on Vike route changes with `page_location`, `page_path`, and `page_title`.
  - Removed outdated `PLAN.md` per repo hygiene requirement.
- GA4 Realtime verification:
  - Open GA4 → Realtime.
  - Navigate Home → About/Studio → Content → Legal → Home.
  - Confirm `page_view` events appear and include the correct `page_location` and `page_path`.
- Dev/build:
  - NOT RUN (Mode A; user runs locally in WSL).
