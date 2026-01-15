import React, { useEffect } from 'react'
import '../src/styles/global.css'
import { HeaderNav } from '../src/components/HeaderNav'
import { Footer } from '../src/components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="site">
      <div className="scrollProgress" aria-hidden="true" />
      <HeaderNav />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
