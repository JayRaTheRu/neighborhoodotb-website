# PLAN.md — Current Work Plan

## Current status
- Scroll-reveal CSS + observer implemented.
- Reveals applied to: Home, Studio, Content listing (as of latest Codex pass).

## Next tasks (checklist)
- [ ] Apply `data-reveal` + stagger delays to remaining pages:
  - pages/about/+Page.tsx
  - pages/contact/+Page.tsx
  - pages/collective/+Page.tsx
  - pages/lab/+Page.tsx
  - pages/store/+Page.tsx
  - pages/brand-kit/+Page.tsx
  - pages/legal/+Page.tsx
  - pages/legal/privacy/+Page.tsx
  - pages/legal/terms/+Page.tsx
  - pages/fudkers/+Page.tsx
  - pages/content/@slug/+Page.tsx (header + nav cards; avoid revealing the entire MDX body)
- [ ] Replace remaining repeated inline “panel” styles with shared classes:
  - .panel, .panelInset, .gridAuto, .actionsRow, .controlsBar, etc.
- [ ] Verify mobile layout + no layout shifts from reveal transitions.
- [ ] Optional later: route-wipe transition (after reveals are consistent).

## Acceptance criteria
- Reveals are present on major blocks without spamming MDX/prose.
- No console errors.
- `npm run build` passes.
