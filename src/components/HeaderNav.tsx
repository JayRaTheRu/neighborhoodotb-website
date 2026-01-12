import React from 'react'

const primaryLeft = [
  { href: '/fudkers', label: 'FUDkers' },
  { href: '/studio', label: 'Studio' },
  { href: '/collective', label: 'Collective' }
]

const primaryRight = [
  { href: '/content', label: 'Content' },
  { href: '/lab', label: 'Lab' },
  { href: '/store', label: 'Store' }
]

const utility = [
  { href: '/about', label: 'About' },
  { href: '/brand-kit', label: 'Brand Kit' },
  { href: '/contact', label: 'Contact' }
]

export function HeaderNav() {
  return (
    <header className="header">
      {/* Utility row */}
      <div className="utilityNavWrap">
        <nav aria-label="Utility" className="utilityNav">
          {utility.map((item) => (
            <a key={item.href} href={item.href} className="navLink">
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Primary row */}
      <nav aria-label="Primary" className="primaryNav">
        <div className="primaryLeft">
          {primaryLeft.map((item) => (
            <a key={item.href} href={item.href} className="navLink">
              {item.label}
            </a>
          ))}
        </div>

        <a href="/" className="brandMark" aria-label="Home">
          NEIGHBORHOOD O.T.B.
        </a>

        <div className="primaryRight">
          {primaryRight.map((item) => (
            <a key={item.href} href={item.href} className="navLink">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
