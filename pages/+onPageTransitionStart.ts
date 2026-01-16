// https://vike.dev/onPageTransitionStart

import type { PageContextClient } from 'vike/types'

const WIPE_TIMEOUT_KEY = '__routeWipeTimeout'
const WIPE_RESET_RAF_KEY = '__routeWipeResetRaf'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function clearWipeTimeout() {
  const timeoutId = (window as Window & Record<string, number | undefined>)[WIPE_TIMEOUT_KEY]
  if (timeoutId) {
    window.clearTimeout(timeoutId)
    ;(window as Window & Record<string, number | undefined>)[WIPE_TIMEOUT_KEY] = undefined
  }
}

function clearWipeResetFrame() {
  const rafId = (window as Window & Record<string, number | undefined>)[WIPE_RESET_RAF_KEY]
  if (rafId !== undefined) {
    window.cancelAnimationFrame(rafId)
    ;(window as Window & Record<string, number | undefined>)[WIPE_RESET_RAF_KEY] = undefined
  }
}

export async function onPageTransitionStart(_pageContext: Partial<PageContextClient>) {
  const wipeEl = document.getElementById('routeWipe')
  if (!wipeEl || prefersReducedMotion()) return

  clearWipeTimeout()
  clearWipeResetFrame()

  const wipeId = String(Date.now())
  wipeEl.setAttribute('data-wipe-id', wipeId)

  wipeEl.classList.remove('is-wiping-out', 'is-wiping-in', 'is-reset')
  wipeEl.classList.add('is-reset')
  void wipeEl.offsetHeight
  wipeEl.classList.remove('is-reset')
  wipeEl.classList.add('is-wiping-in')
}
