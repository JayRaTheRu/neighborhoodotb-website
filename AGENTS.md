# AGENTS.md — NeighborhoodOTB Website

## 1) Scope (non-negotiable)

- Work only inside this repository/workspace.
- Keep diffs small and targeted. Avoid refactors unless required to complete the task.
- Do NOT modify SEO head logic (`pages/+Head.tsx` and any page-specific `+Head.tsx`) unless explicitly requested (exception: if CURRENT TASK explicitly requests SEO/AEO updates).
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
- Confirm build output (pass/fail) if run; otherwise mark as NOT RUN and instruct user to run locally.
- Call out any unverified visual behavior explicitly.

## 7) Codex workflow (required; simplified)

This repo uses a two-file workflow under `/codex`:

1. `codex/HANDOFF.md` = CURRENT TASK ONLY
   - Contains only the instructions for the current task.
   - This file is reset/cleared after the task is completed.

2. `codex/LOG.md` = APPEND-ONLY HISTORY
   - Contains all completed tasks and their reports.
   - Oldest entries at top; newest appended at bottom.
   - Never delete or rewrite prior tasks/reports; only append.

### Required process

- Before making any changes, read `codex/HANDOFF.md` and follow it as the source of truth.
- Complete the task with small, targeted diffs.
- When finished:
  1. Append a new `# TASK NNN` + `## LOG/REPORT NNN` entry to `codex/LOG.md` including:
     - What was done (high-level)
     - Files changed
     - Verification status (build/dev/manual): PASS/FAIL/NOT RUN
     - Any follow-ups / risks
  2. Reset `codex/HANDOFF.md` by removing the completed task details so it is ready for the next task.

### Reporting rules (non-negotiable)

- Do NOT add `## REPORT` or `## REPORT LOG` sections anywhere else.
- All historical reporting goes only to `codex/LOG.md`.
- `codex/HANDOFF.md` must not accumulate old reports; it stays minimal and current.
