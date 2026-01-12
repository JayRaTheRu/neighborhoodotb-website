import React from 'react'
import '../src/styles/global.css'
import { HeaderNav } from '../src/components/HeaderNav'
import { Footer } from '../src/components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <HeaderNav />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
