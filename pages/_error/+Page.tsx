import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const { is404 } = usePageContext()

  const title = is404 ? 'Page Not Found' : 'Internal Error'
  const message = is404
    ? 'That route does not exist. Use the links below to get back on track.'
    : 'Something went wrong on our side. Please try again or reach out.'

  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>{title}</h1>
        <p>{message}</p>
      </header>

      <div className="actionsRow" data-reveal data-reveal-delay="80">
        <a className="btn" href="/">
          Go home
        </a>
        <a className="btnGhost" href="/contact">
          Contact
        </a>
      </div>
    </section>
  )
}
