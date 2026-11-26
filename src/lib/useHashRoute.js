import { useEffect, useState } from 'react'

// Routes are hashes that start with "#/" — everything else (#about, #contact)
// stays an in-page anchor on the marketing site.
function parse() {
  const hash = window.location.hash || ''
  if (!hash.startsWith('#/')) return { name: 'home', param: null }
  const segments = hash.slice(2).split('/').filter(Boolean)
  return { name: segments[0] || 'home', param: segments[1] || null }
}

/** Minimal hash router — no dependency, and the browser Back button works. */
export function useHashRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

/** Navigate without leaving a duplicate entry when already there. */
export function navigate(hash) {
  if (window.location.hash === hash) return
  window.location.hash = hash
}
