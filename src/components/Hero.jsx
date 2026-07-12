import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CorrugatedBox from './CorrugatedBox'
import FactoryBackdrop from './FactoryBackdrop'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const section = useRef(null)
  const stage = useRef(null)
  const boxScene = useRef(null)
  const introRef = useRef(null)
  const outroRef = useRef(null)
  const veilRef = useRef(null)
  const depthRef = useRef(null)
  const diveVal = useRef(0) // shared so the parallax loop can damp during the dive

  // --- scroll choreography: open flap-by-flap, then dive in ---
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const scene = boxScene.current
      const p = { of: 0, ob: 0, ol: 0, orr: 0, lift: 0, dive: 0 }
      const render = () => {
        if (!scene) return
        scene.style.setProperty('--of', p.of.toFixed(3))
        scene.style.setProperty('--ob', p.ob.toFixed(3))
        scene.style.setProperty('--ol', p.ol.toFixed(3))
        scene.style.setProperty('--orr', p.orr.toFixed(3))
        scene.style.setProperty('--lift', p.lift.toFixed(3))
        scene.style.setProperty('--dive', p.dive.toFixed(3))
        diveVal.current = p.dive
      }

      if (reduced) {
        Object.assign(p, { of: 1, ob: 1, ol: 1, orr: 1, lift: 1 })
        render()
        gsap.set(outroRef.current, { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: '+=230%',
          scrub: 0.7,
          pin: stage.current,
          anticipatePin: 1,
        },
        onUpdate: render,
      })

      // intro copy drifts away
      tl.to(introRef.current, { y: -90, opacity: 0, ease: 'power1.in', duration: 0.4 }, 0)
      // gentle rise as the lid works open
      tl.to(p, { lift: 1, ease: 'power1.out', duration: 0.7 }, 0.05)
      // 1 — side flaps open together
      tl.to(p, { ol: 1, orr: 1, ease: 'power2.inOut', duration: 0.5 }, 0.06)
      // 2 — back flap
      tl.to(p, { ob: 1, ease: 'power2.inOut', duration: 0.45 }, 0.32)
      // 3 — front flap (now the box is clearly open, interior facing us)
      tl.to(p, { of: 1, ease: 'power2.inOut', duration: 0.45 }, 0.52)
      // tagline surfaces, then clears before the plunge
      tl.fromTo(
        outroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35 },
        0.66,
      )
      tl.to(outroRef.current, { opacity: 0, y: -40, ease: 'power1.in', duration: 0.3 }, 1.08)
      // 4 — dive into the opening
      tl.to(p, { dive: 1, ease: 'power2.in', duration: 0.8 }, 0.98)
      // interior swallows the screen, handing off to the next section
      tl.to(veilRef.current, { opacity: 1, ease: 'power1.in', duration: 0.5 }, 1.25)
    }, section)

    return () => ctx.revert()
  }, [])

  // --- cursor-driven parallax (damped as we dive) ---
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return

    const scene = boxScene.current
    const depthItems = depthRef.current ? Array.from(depthRef.current.children) : []
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, running = true

    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5
      ty = e.clientY / window.innerHeight - 0.5
    }
    const onLeave = () => { tx = 0; ty = 0 }

    const tick = () => {
      if (!running) return
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      const damp = 1 - diveVal.current // fade parallax out during the plunge
      if (scene) {
        scene.style.setProperty('--mx', (cx * 16 * damp).toFixed(2) + 'deg')
        scene.style.setProperty('--my', (-cy * 10 * damp).toFixed(2) + 'deg')
        scene.style.setProperty('--pox', (-cx * 40 * damp).toFixed(1) + 'px')
        scene.style.setProperty('--poy', (-cy * 26 * damp).toFixed(1) + 'px')
      }
      for (const el of depthItems) {
        const d = (Number(el.dataset.depth) || 0) * damp
        el.style.transform = `translate3d(${(-cx * d).toFixed(1)}px, ${(-cy * d).toFixed(1)}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      id="top"
      ref={section}
      className="relative bg-ink text-kraft-50"
      style={{ height: '330vh' }}
    >
      <div
        ref={stage}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
      >
        {/* ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,133,74,0.22),transparent_60%)]" />
          <div className="absolute inset-0 flute-pattern opacity-40" />
          {/* faint factory-floor watermark: reels + stacked cartons */}
          <FactoryBackdrop className="absolute inset-x-0 bottom-0 h-[62%] w-full text-kraft-300 opacity-[0.06]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/* floating depth layers — cursor parallax */}
        <div
          ref={depthRef}
          className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
        >
          <span data-depth="26" className="absolute left-[13%] top-[24%] h-24 w-24 rotate-12 rounded-xl border border-kraft-500/20 bg-kraft-500/[0.05]" />
          <span data-depth="60" className="absolute right-[15%] top-[28%] h-16 w-16 -rotate-6 rounded-lg border border-kraft-400/25 bg-kraft-400/[0.06]" />
          <span data-depth="42" className="absolute left-[20%] bottom-[20%] h-20 w-28 rotate-6 rounded-lg border border-kraft-500/15 bg-kraft-600/[0.05]" />
          <span data-depth="80" className="absolute right-[20%] bottom-[24%] h-10 w-10 rounded-md border border-kraft-300/25 bg-kraft-300/[0.07]" />
          <span data-depth="16" className="absolute left-[46%] top-[15%] h-3 w-3 rounded-full bg-kraft-300/40" />
        </div>

        {/* intro copy */}
        <div ref={introRef} className="relative z-20 mb-8 max-w-3xl px-6 text-center sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-kraft-500/40 bg-kraft-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-kraft-200">
            <span className="h-1.5 w-1.5 rounded-full bg-kraft-400" />
            Corrugated packaging · engineered
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[0.98] text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            Your Trusted Partner
            <br />
            <span className="bg-gradient-to-r from-kraft-200 via-kraft-400 to-kraft-300 bg-clip-text text-transparent">
              For Packaging Solutions
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-kraft-100/70 sm:text-lg">
            High-strength corrugated boxes for food, retail, e-commerce, pharma
            and export — manufactured in Sharjah and delivered across Dubai and
            the UAE.
          </p>
        </div>

        {/* the 3D box */}
        <div className="relative z-10 flex-shrink-0">
          <CorrugatedBox ref={boxScene} />
        </div>

        {/* reveal tagline */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] z-20 px-6 text-center opacity-0"
        >
          <p className="font-display text-2xl font-medium text-kraft-100 sm:text-3xl">
            Open the box — everything inside is engineered to protect.
          </p>
        </div>

        {/* dive veil — the interior swallows the screen */}
        <div
          ref={veilRef}
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_45%,#3a2214,#150f0b_70%)] opacity-0"
        />
      </div>
    </section>
  )
}
