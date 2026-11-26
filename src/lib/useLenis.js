import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wires Lenis smooth scrolling into GSAP's ScrollTrigger so that scroll-driven
 * animations stay perfectly in sync with the smoothed scroll position.
 *
 * Pass `enabled: false` on screens where native scrolling is a better fit
 * (long forms, modals, the order builder).
 */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [enabled])
}
