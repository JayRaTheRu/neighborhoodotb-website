# AGENTS.md — NeighborhoodOTB Website

## 1) Scope (non-negotiable)
- Work only inside this repository/workspace.
- Keep diffs small and targeted. Avoid refactors unless required to complete the task.
- Do NOT modify SEO head logic (`pages/+Head.tsx` and any page-specific `+Head.tsx`) unless explicitly requested.
- Do NOT change routing structure or Vike configs unless explicitly requested.
- Do NOT change build/deploy configuration unless explicitly requested.

## 2) Brand / UX constraints
- Style: Street Editorial (sharp, rule-based, restrained).
- Accent: marigold `#F5A01F` only (no new accent colors).
- Accessibility: honor `prefers-reduced-motion`; motion must be disabled or replaced with instant state changes.

## 3) Scroll-reveal system contract
Use reveal attributes only on:
- page headers
- major sections
- grids/cards
- CTA/action rows

Do NOT blanket-animate MDX/prose bodies (`.prose` / MDX content).

### Allowed attributes
- `data-reveal` (enables reveal)
- `data-reveal-delay="NN"` (milliseconds; number as string)
- `data-reveal-variant="..."` (only if supported by current CSS/observer)
- `data-reveal-once="true"` (optional; only if supported by current observer)

### Stagger rules
- For grids/cards: stagger like `80 + i*60` (or similar).
- Apply reveal to the card/container, not each inner paragraph.

## 4) Implementation rules
- Prefer shared classes/utilities in `src/styles/global.css` over inline styles.
- Keep markup edits minimal—use `className` + data attributes rather than restructuring components.
- Do not introduce new animation libraries unless explicitly requested.

## 5) Verification (required before final)
- Install (choose what exists in repo): `npm ci` (preferred) or `npm install` / `pnpm install --frozen-lockfile`.
- Build: `npm run build` (or `pnpm build` if repo uses pnpm).

### Manual quick check (local browser)
- Home: hero + major sections behave correctly (no visual glitches during navigation).
- Studio: cards + process list reveal with stagger.
- Content list: controls + cards reveal; content slug pages do NOT animate `.prose` body.
- Reduced motion: reveals appear immediately; route transitions (if any) do not animate.

## 6) Output requirements (agent summary)
- Summarize changes in 3–6 bullets.
- List modified files.
- Confirm build output (pass/fail).
- Call out any unverified visual behavior explicitly.

## 7) Codex workflow (required)
- Before making any changes, read `codex/HANDOFF.md`.
- Use `codex/HANDOFF.md` as the source of truth:
  - Follow only the tasks under `## CURRENT STATUS` / `## CURRENT INSTRUCTIONS` (whichever heading exists).
  - If both exist, treat `CURRENT STATUS` as source-of-truth and `CURRENT INSTRUCTIONS` as the task list.
- Do not delete prior content from HANDOFF; mark checklist items done with `[x]`.
- When finished, append a structured completion summary under `## REPORT` in `codex/HANDOFF.md` including:
  - Files changed
  - What changed (high-level)
  - Build/typecheck status
  - Manual verification notes (and whether verified locally in a browser)

