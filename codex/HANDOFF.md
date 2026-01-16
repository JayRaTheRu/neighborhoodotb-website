# Codex Handoff — NeighborhoodOTB Website

## CURRENT STATUS (source of truth)

- Current deliverables: **A (scroll-reveal coverage)** and **B (route wipe transition)** are implemented.
- Current blocker: **Route wipe visual glitch** — brief marigold “line glitch” artifacts during navigation (confirmed still present via user video).
- Confirmed diagnostic: When DevTools emulates **`prefers-reduced-motion: reduce`**, the artifact **stops**. Therefore the issue is in the **transition/motion path** (most likely the route wipe overlay/accent paint), not static layout.
- Build status: `npm run build` passes **in WSL**.
- Environment note: Commands must run in **WSL/Linux** for this repo. PowerShell may fail due to shell assumptions.

## CURRENT INSTRUCTIONS (do these next)

### Objective

Eliminate the marigold line glitch in **normal motion mode**. Current evidence (video + reduced-motion suppression) indicates the route wipe overlay is still painting a 1px marigold edge during intermediate frames. Fix by removing wipe-edge accent paint and switching to a stricter two-phase activation so the overlay never paints in a default/intermediate state.

### Non-negotiable rules

- Keep diffs small and targeted; no architecture refactors.
- Do NOT modify SEO head logic (`pages/+Head.tsx` and any page `+Head.tsx`) unless explicitly requested.
- Respect `prefers-reduced-motion`: route wipe must be disabled/hidden (instant swap; no overlay animation).
- Avoid visual gimmicks; route wipe must remain crisp and restrained.
- Changes must be limited to these files unless absolutely necessary:
  - `src/styles/global.css`
  - `pages/+Layout.tsx`
  - `pages/+onPageTransitionStart.ts`
  - `pages/+onPageTransitionEnd.ts`

### Step 1 — Manual verification + confirm diagnostic (required, in a browser)

1. Start dev server in WSL:
   - `npm run dev`
2. In a browser at `http://localhost:3000` (or the actual port shown), navigate rapidly:
   - Home → Studio → Content → Legal → Home (repeat 3–5 times)
3. Confirm the marigold “line glitch” appears in normal mode.
4. DevTools → Rendering:
   - Emulate **`prefers-reduced-motion: reduce`**
   - Confirm the artifact disappears under reduce.
5. Optional: enable **Paint Flashing** to observe what repaints during the glitch.

### Step 2 — Fix (stricter) to eliminate intermediate-frame paint

The prior “gate accent to `.is-wiping-*`” approach was not sufficient (artifact persists). Apply the stricter strategy below.

#### Required fix approach

1. **Remove wipe-edge accent paint entirely (temporary but preferred)**

- Do not merely opacity-gate the accent. Remove/neutralize anything that can draw a 1px line:
  - `border-*`, `outline`, `box-shadow` (including inset), `linear-gradient(...)` stripes,
  - pseudo-elements like `::before/::after` that draw an accent edge.
- Goal: the wipe edge should be black-on-black (or background-on-background), not marigold, until the glitch is fully eliminated. Accent can be reintroduced later once stable.

2. **Make inactive overlay fully absent**

- Prefer `display: none` when idle (stronger than `visibility: hidden`).
- Inactive overlay must not paint anything.

3. **Implement a 2-phase activation (ARM → ANIMATE)**

- In `pages/+onPageTransitionStart.ts`:
  - Phase A (ARM): set overlay to visible (`display: block`) in the correct offscreen starting transform state, with transitions effectively disabled for that setup frame.
  - Phase B (ANIMATE): in the next `requestAnimationFrame`, apply the class that triggers the transform/opacity transition.
- Track and clear any rAF/timeouts so rapid navigation cannot overlap states.

4. **Deterministic cleanup**

- In `pages/+onPageTransitionEnd.ts`:
  - Remove wipe classes deterministically.
  - Return overlay to `display: none`.
  - Clear any pending timers/rAF callbacks.

### Step 3 — Verification and completion

- Re-test navigation in browser (Step 1 again) in **normal motion mode**:
  - Confirm zero marigold line artifacts during rapid navigation.
- Confirm reduced-motion still disables/hides the wipe.
- Run `npm run build` in WSL and confirm pass.
- Append a new entry to **REPORT LOG** describing:
  - Root cause hypothesis (what was painting)
  - Exactly what changed (CSS/markup/hooks)
  - What you verified in-browser
  - Build result

### Reporting rules (important)

- Append changes only under **REPORT LOG (append-only)**.
- Do not add a separate `## REPORT` section (deprecated; keep all reporting in REPORT LOG).

---

## CONTEXT (completed work; do not redo)

### A) Scroll-reveal coverage (completed)

- Added `data-reveal` coverage to:
  - `pages/about/+Page.tsx`
  - `pages/contact/+Page.tsx`
  - `pages/collective/+Page.tsx`
  - `pages/store/+Page.tsx`
  - `pages/lab/+Page.tsx`
  - `pages/brand-kit/+Page.tsx`
  - `pages/legal/+Page.tsx`
  - `pages/legal/privacy/+Page.tsx`
  - `pages/legal/terms/+Page.tsx`
  - `pages/fudkers/+Page.tsx`
  - `pages/content/+Page.tsx`
  - `pages/content/@slug/+Page.tsx` (header/nav panels only; not MDX body)
- Added component-level reveals to:
  - `src/components/MapSection.tsx`
  - `src/components/FeaturedDrop.tsx`
  - `src/components/FeaturedDrop.tsx`
  - `src/components/DispatchModule.tsx`
- Strategy: header wrappers + major panels/grids, stagger delays `80 + i*60`, optional `data-reveal-variant="fast"`, and no `.prose`/MDX body reveals.

### B) Route wipe transition (implemented; under investigation)

- Route wipe overlay added in:
  - `pages/+Layout.tsx`
- Transition hooks added/updated:
  - `pages/+onPageTransitionStart.ts`
  - `pages/+onPageTransitionEnd.ts`
- CSS added/updated:
  - `src/styles/global.css`
- Reduced motion: route wipe should be disabled when `prefers-reduced-motion: reduce`.

---

## COMMANDS (must run)

- Dev (WSL):
  - `npm run dev`
- Build (WSL):
  - `npm run build`

If a typecheck script exists:

- `npm run typecheck`

---

## REPORT LOG (append-only)

### 2026-01-15 — A+B implementation

- A: Rolled out scroll-reveal attributes across remaining pages and key components. No `.prose`/MDX body reveals. Staggered delays used for grids/cards.
- B: Implemented route wipe overlay with transition hooks and CSS. Reduced-motion handling included.
- Build/typecheck: `npm run build` failed in PowerShell (`/bin/bash` ENOENT) but succeeded in WSL. No typecheck script present.
- Verification: CLI validation only for navigation behavior; browser verification required.

### 2026-01-15 — Route wipe glitch follow-up (marigold line flash)

- Hypothesis: Route wipe overlay/accents likely caused marigold paint artifacts during navigation.
- Changes:
  - Cleared pending wipe timeouts and reset classes deterministically:
    - `pages/+onPageTransitionStart.ts`
    - `pages/+onPageTransitionEnd.ts`
  - CSS hardening to reduce paint artifacts:
    - `src/styles/global.css` uses `visibility: hidden` by default, moves overlay farther offscreen with `translate3d`,
      adds `contain: paint` + `will-change`.
- Verification: Not visually confirmed (CLI-only). Must be verified in a browser using the manual steps above.
- Build: `npm run build` succeeded in WSL.

### 2026-01-16 — Diagnostic confirmation (reduced-motion suppresses glitch)

- Observation: When DevTools emulates `prefers-reduced-motion: reduce`, the marigold line artifact does not occur during rapid navigation.
- Inference: The glitch originates in the normal-motion transition path (route wipe overlay/accent paint) and should be resolved by making the overlay fully inert unless actively wiping.
- Next action: Implement CSS/markup gating so no accent/border/gradient paints unless `.is-wiping-*` is active; verify in browser; run `npm run build` in WSL.

### 2026-01-16 — Route wipe glitch fix (marigold line)

- Root cause: route wipe accent line/background could still paint during inactive/transition frames, producing a 1px marigold flash in normal motion.
- Fix: gate the accent line to `.is-wiping-*` only and make inactive overlay background transparent; track and clear wipe-reset rAF for deterministic class reset.
- Files changed: `src/styles/global.css`, `pages/+onPageTransitionStart.ts`, `pages/+onPageTransitionEnd.ts`.
- Verification: `npm run dev` started in WSL (port 3001; port 3000 in use), but manual browser checks were not run here.
- Build: `npm run build` succeeded in WSL.

### 2026-01-16 — Glitch persists after gating; escalation to stricter fix (ARM → ANIMATE)

- Evidence: User video confirms full-width marigold horizontal line artifact still appears during normal-motion navigation.
- Conclusion: Accent gating is insufficient; likely one-frame intermediate paint during overlay activation/transform.
- Next action: Remove wipe-edge accent paint entirely, switch inactive overlay to `display: none`, implement 2-phase activation (ARM → ANIMATE), and verify in browser.
