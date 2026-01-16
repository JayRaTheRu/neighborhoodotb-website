import React, { useEffect, useRef } from 'react'
import '../src/styles/global.css'
import { HeaderNav } from '../src/components/HeaderNav'
import { Footer } from '../src/components/Footer'

const REVEAL_BOUND_ATTR = 'data-reveal-bound'

export default function Layout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null)

  // Scroll progress bar
  useEffect(() => {
    const root = document.documentElement

    const update = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop || 0
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      root.style.setProperty('--scroll-progress', String(Math.max(0, Math.min(1, ratio)) * 100))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Scroll reveal (runs once, then keeps working across client-side navigations via MutationObserver)
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scopeEl = () => mainRef.current ?? document

    const bindOne = (el: HTMLElement, observer?: IntersectionObserver) => {
      if (el.hasAttribute(REVEAL_BOUND_ATTR)) return
      el.setAttribute(REVEAL_BOUND_ATTR, 'true')

      const delayRaw = el.getAttribute('data-reveal-delay')
      if (delayRaw) {
        const ms = Number(delayRaw)
        if (!Number.isNaN(ms) && ms >= 0) {
          el.style.transitionDelay = `${ms}ms`
        }
      }

      // Reduced-motion: show immediately
      if (prefersReduced) {
        el.classList.add('is-inview')
        return
      }

      observer?.observe(el)
    }

    let observer: IntersectionObserver | null = null

    if (!prefersReduced) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement
            const revealOnce = el.getAttribute('data-reveal-once') !== 'false'

            if (e.isIntersecting) {
              el.classList.add('is-inview')
              if (revealOnce) observer?.unobserve(el)
            } else if (!revealOnce) {
              el.classList.remove('is-inview')
            }
          }
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -10% 0px'
        }
      )
    }

    const scan = () => {
      scopeEl().querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => bindOne(el, observer ?? undefined))
    }

    // Initial scan
    scan()

    // Keep it working on client-side route changes / content swaps
    const mo = new MutationObserver(() => scan())
    const nodeToWatch = mainRef.current
    if (nodeToWatch) {
      mo.observe(nodeToWatch, { childList: true, subtree: true })
    }

    return () => {
      mo.disconnect()
      observer?.disconnect()
    }
  }, [])

  return (
    <div className="site">
      <div className="scrollProgress" aria-hidden="true" />
      <div id="routeWipe" aria-hidden="true" />
      <HeaderNav />
      <main ref={mainRef} className="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
