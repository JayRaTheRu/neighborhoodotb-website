const WIPE_OUT_MS = 320
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

export async function onPageTransitionEnd() {
  const wipeEl = document.getElementById('routeWipe')
  if (!wipeEl) return

  clearWipeTimeout()
  clearWipeResetFrame()

  if (prefersReducedMotion()) {
    wipeEl.classList.remove('is-wiping-in', 'is-wiping-out', 'is-reset')
    wipeEl.removeAttribute('data-wipe-id')
    return
  }

  const wipeId = wipeEl.getAttribute('data-wipe-id') ?? ''
  wipeEl.classList.remove('is-wiping-in')
  wipeEl.classList.add('is-wiping-out')

  const timeoutId = window.setTimeout(() => {
    if (wipeId && wipeEl.getAttribute('data-wipe-id') !== wipeId) return
    wipeEl.classList.remove('is-wiping-out')
    wipeEl.classList.add('is-reset')
    const rafId = window.requestAnimationFrame(() => wipeEl.classList.remove('is-reset'))
    ;(window as Window & Record<string, number | undefined>)[WIPE_RESET_RAF_KEY] = rafId
  }, WIPE_OUT_MS)

  ;(window as Window & Record<string, number | undefined>)[WIPE_TIMEOUT_KEY] = timeoutId
}
