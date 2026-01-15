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
          el.style.setProperty('--reveal-delay', `${ms}ms`)
        }
      }

      // Reduced-motion: show immediately
      if (prefersReduced) {
        el.classList.add('revealIn')
        return
      }

      observer?.observe(el)
    }

    if (prefersReduced) {
      // Ensure everything is visible immediately
      scopeEl().querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        bindOne(el)
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          el.classList.add('revealIn')
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -12% 0px'
      }
    )

    const scan = () => {
      scopeEl().querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => bindOne(el, observer))
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
      observer.disconnect()
    }
  }, [])

  return (
    <div className="site">
      <div className="scrollProgress" aria-hidden="true" />
      <HeaderNav />
      <main ref={mainRef} className="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
