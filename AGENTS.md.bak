# AGENTS.md

## Goal (current task)

Roll out `data-reveal`, `data-reveal-delay`, and optional `data-reveal-variant` across page-level + key section components.
Do NOT blanket animate entire MDX/prose bodies.

## Project structure notes

- Pages live in `pages/**/+Page.tsx` (Vike-style pages).
- Shared sections/components are in `src/components/**`.

## Implementation rules

- Add `data-reveal` only to: page header wrappers, major sections, grids/cards, and CTA rows.
- Do NOT add reveal attributes to every paragraph in `.prose` / MDX.
- For card grids: stagger delays like `80 + i*60`. Use `data-reveal-variant="fast"` on cards if available.
- Keep markup edits minimal—no refactors unless required.

## Commands (pick what exists in package.json)

- Install: `pnpm install --frozen-lockfile` OR `npm ci`
- Typecheck: `pnpm typecheck` OR `npm run typecheck`
- Build: `pnpm build` OR `npm run build`
- Lint (if present): `pnpm lint` OR `npm run lint`

## Definition of done

- The specified pages + shared modules have reveal tags in the right places (not spammed).
- Build/typecheck passes.
- Changes delivered as a single PR (or split into 2 PRs: pages first, shared components second).
