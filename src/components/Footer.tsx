import React from 'react'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <nav className="footerNav" aria-label="Footer">
          <a href="/about">About</a>
          <a href="/brand-kit">Brand Kit</a>
          <a href="/contact">Contact</a>
          <a href="/legal/privacy">Privacy</a>
          <a href="/legal/terms">Terms</a>
        </nav>
        <div className="footerCopy">© 2026 The Neighborhood On The Block LLC</div>
      </div>
    </footer>
  )
}
