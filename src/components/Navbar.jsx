import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Pouches', href: '#pouches' },
  { label: 'Specs', href: '#specs' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
]

function Logo({ dark }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
        <img
        src="/Logo.png"
        alt="PatroPack Logo"
        className="h-9 w-auto rounded-full"
      />
      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          dark ? 'text-ink' : 'text-white'
        }`}
      >
        Patro<span className="text-kraft-500">Pack</span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight whichever section is crossing the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled
            ? 'my-2 rounded-2xl border border-kraft-200/80 bg-kraft-50/85 py-2.5 shadow-lg shadow-kraft-900/5 backdrop-blur-md'
            : 'py-5'
        }`}
      >
        <Logo dark={scrolled} />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? isActive
                      ? 'text-kraft-700'
                      : 'text-ink-soft/80 hover:bg-kraft-100 hover:text-ink'
                    : isActive
                      ? 'text-white'
                      : 'text-kraft-50/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-kraft-500 transition-all duration-300 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <a
          href="#/quote"
          className="hidden rounded-lg bg-kraft-600 px-4 py-2.5 text-sm font-semibold text-kraft-50 shadow-sm transition-all hover:bg-kraft-700 hover:shadow-md lg:inline-block"
        >
          Request a Quote
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`grid h-10 w-10 place-items-center rounded-lg lg:hidden ${
            scrolled ? 'text-ink' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-3 mt-1 rounded-2xl border border-kraft-200 bg-kraft-50/95 p-3 shadow-xl backdrop-blur lg:hidden"
          >
            {links.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? 'bg-kraft-100 text-kraft-800'
                      : 'text-ink-soft hover:bg-kraft-100'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-kraft-500" />
                  )}
                </a>
              )
            })}
            <a
              href="#/quote"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-lg bg-kraft-600 px-4 py-3 text-center text-base font-semibold text-kraft-50"
            >
              Request a Quote
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
