import { motion, useReducedMotion } from 'framer-motion'

// Close-up cross-section of corrugated board: flat liners sandwiching wavy
// fluting that gently flows on a loop. Fills the About panel with something
// unmistakably "corrugated packaging" — and distinct from the Hero's box.

const W = 340
const H = 360
const N_FLUTES = 5
const MARGIN = 16
const LINER_H = 9
const FLUTE_H = (H - 2 * MARGIN - LINER_H * (N_FLUTES + 1)) / N_FLUTES
const WL = 38 // flute wavelength
const RIBBON = 8 // fluting-paper thickness

// A constant-thickness wavy ribbon whose centreline is a sine curve.
function ribbonPath(centerY, amp, x0, x1, step = 3) {
  const pts = []
  for (let x = x0; x <= x1; x += step) {
    const s = Math.sin((x / WL) * Math.PI * 2)
    pts.push(`${x.toFixed(1)} ${(centerY + amp * s - RIBBON / 2).toFixed(1)}`)
  }
  for (let x = x1; x >= x0; x -= step) {
    const s = Math.sin((x / WL) * Math.PI * 2)
    pts.push(`${x.toFixed(1)} ${(centerY + amp * s + RIBBON / 2).toFixed(1)}`)
  }
  return `M ${pts.join(' L ')} Z`
}

// pre-compute layer geometry
const liners = []
const flutes = []
let y = MARGIN
for (let i = 0; i < N_FLUTES; i += 1) {
  liners.push(y)
  y += LINER_H
  flutes.push({ centerY: y + FLUTE_H / 2, i })
  y += FLUTE_H
}
liners.push(y)

const AMP = FLUTE_H / 2 - RIBBON / 2 - 3
const DRAW_X0 = -2 * WL
const DRAW_X1 = W + 2 * WL

export default function FluteBoard() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      <div className="animate-float overflow-hidden rounded-3xl border border-kraft-200 bg-gradient-to-br from-kraft-100 to-white shadow-[0_20px_50px_-20px_rgba(53,30,21,0.35)] ring-1 ring-inset ring-white/50">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Cross-section of corrugated board: kraft liners with wavy fluting between them"
        >
          <defs>
            <linearGradient id="fb-liner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a2683f" />
              <stop offset="1" stopColor="#7a4a30" />
            </linearGradient>
            <linearGradient id="fb-flute-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9b47e" />
              <stop offset="1" stopColor="#c4854a" />
            </linearGradient>
            <linearGradient id="fb-flute-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#cd9a5b" />
              <stop offset="1" stopColor="#b06f3e" />
            </linearGradient>
            {/* light-from-top sheen */}
            <linearGradient id="fb-sheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#351e15" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* flute ribbons (animated) with the liner bars over their ends */}
          {flutes.map(({ centerY, i }) => {
            const dir = i % 2 === 0 ? -WL : WL // alternate flow direction
            const d = ribbonPath(centerY, AMP, DRAW_X0, DRAW_X1)
            return (
              <motion.path
                key={i}
                d={d}
                fill={i % 2 === 0 ? 'url(#fb-flute-a)' : 'url(#fb-flute-b)'}
                initial={false}
                animate={reduce ? undefined : { x: [0, dir] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 1.5 + i * 0.6, ease: 'linear', repeat: Infinity }
                }
              />
            )
          })}

          {/* liner bars sit on top so the fluting appears sandwiched */}
          {liners.map((ly, i) => (
            <rect
              key={i}
              x={-4}
              y={ly}
              width={W + 8}
              height={LINER_H}
              fill="url(#fb-liner)"
            />
          ))}

          {/* sheen overlay */}
          <rect x="0" y="0" width={W} height={H} fill="url(#fb-sheen)" />
        </svg>
      </div>

      {/* floating spec chip */}
      <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full border border-kraft-200 bg-white/90 px-4 py-2 text-xs font-semibold text-kraft-800 shadow-md backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
        Engineered board · B / C / E flute
      </div>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-kraft-200/60 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 -z-10 h-40 w-40 rounded-full bg-leaf-400/20 blur-2xl" />
    </div>
  )
}
