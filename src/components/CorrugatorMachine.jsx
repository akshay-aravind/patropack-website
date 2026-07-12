import { motion, useReducedMotion } from 'framer-motion'

// A working corrugator: a giant raw-kraft reel spins and feeds its web into the
// machine; gears turn; finished corrugated board flows out the far side. All
// motion is continuous rotation / flow, so it reads as real running machinery.

const GROUND = 302
const REEL = { cx: 96, cy: 166, r: 60 }

// Archimedean spiral = wound paper on the reel; rotating it looks like winding.
function spiralPath(cx, cy, turns, rMax, step = 0.25) {
  const maxT = turns * 2 * Math.PI
  let d = ''
  for (let t = 0; t <= maxT; t += step) {
    const r = (t / maxT) * rMax
    const x = cx + r * Math.cos(t)
    const y = cy + r * Math.sin(t)
    d += `${d ? ' L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

// horizontal corrugated ribbon (constant-thickness sine) for the output board
function fluteRibbon(cy, amp, thick, x0, x1, wl, step = 3) {
  const pts = []
  for (let x = x0; x <= x1; x += step) {
    const s = Math.sin((x / wl) * Math.PI * 2)
    pts.push(`${x.toFixed(1)} ${(cy + amp * s - thick / 2).toFixed(1)}`)
  }
  for (let x = x1; x >= x0; x -= step) {
    const s = Math.sin((x / wl) * Math.PI * 2)
    pts.push(`${x.toFixed(1)} ${(cy + amp * s + thick / 2).toFixed(1)}`)
  }
  return `M ${pts.join(' L ')} Z`
}

function Gear({ cx, cy, r, teeth }) {
  const rects = []
  for (let i = 0; i < teeth; i += 1) {
    const a = (i / teeth) * 360
    rects.push(
      <rect
        key={i}
        x={cx - 2.6}
        y={cy - r - 5}
        width="5.2"
        height="7"
        rx="1"
        fill="#4a2e1f"
        transform={`rotate(${a} ${cx} ${cy})`}
      />,
    )
  }
  return (
    <g>
      {rects}
      <circle cx={cx} cy={cy} r={r} fill="#6b4025" stroke="#3a2416" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="#3a2416" />
      <circle cx={cx} cy={cy} r="1.6" fill="#c4854a" />
    </g>
  )
}

const spin = (originX, originY, dur, dir = 1) => ({
  animate: { rotate: dir * 360 },
  transition: { duration: dur, ease: 'linear', repeat: Infinity },
  style: { transformOrigin: `${originX}px ${originY}px`, transformBox: 'view-box' },
})

export default function CorrugatorMachine() {
  const reduce = useReducedMotion()
  const WL = 22
  const boardPath = fluteRibbon(180, 6, 6, 250, 384, WL)
  const liner = (cy) => `M 250 ${cy} L 384 ${cy}`

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl border border-kraft-200 bg-gradient-to-br from-kraft-100 to-white shadow-[0_20px_50px_-20px_rgba(53,30,21,0.35)] ring-1 ring-inset ring-white/50">
        <svg
          viewBox="0 0 360 340"
          className="block h-auto w-full"
          role="img"
          aria-label="A corrugating machine: a raw paper reel spins and feeds board that comes out corrugated"
        >
          <defs>
            <linearGradient id="cm-reel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e7d1ad" />
              <stop offset="1" stopColor="#c4854a" />
            </linearGradient>
            <linearGradient id="cm-machine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#925836" />
              <stop offset="1" stopColor="#5a3623" />
            </linearGradient>
            <linearGradient id="cm-board" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9b47e" />
              <stop offset="1" stopColor="#b06f3e" />
            </linearGradient>
            <radialGradient id="cm-shadow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#351e15" stopOpacity="0.28" />
              <stop offset="1" stopColor="#351e15" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* contact shadows */}
          <ellipse cx={REEL.cx} cy={GROUND} rx="72" ry="12" fill="url(#cm-shadow)" />
          <ellipse cx="245" cy={GROUND} rx="66" ry="11" fill="url(#cm-shadow)" />

          {/* ground */}
          <path d={`M 8 ${GROUND} L 352 ${GROUND}`} stroke="#b06f3e" strokeWidth="1.5" opacity="0.5" />

          {/* reel A-frame + machine legs */}
          <g stroke="#7a4a30" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d={`M ${REEL.cx} ${REEL.cy} L 70 ${GROUND} M ${REEL.cx} ${REEL.cy} L 122 ${GROUND}`} />
            <path d={`M 214 214 L 206 ${GROUND} M 286 214 L 294 ${GROUND}`} />
          </g>

          {/* output corrugated board (flows out) */}
          <g>
            <path d={liner(170)} stroke="#7a4a30" strokeWidth="2.5" fill="none" />
            <path d={liner(190)} stroke="#7a4a30" strokeWidth="2.5" fill="none" />
            <g clipPath="none">
              {reduce ? (
                <path d={boardPath} fill="url(#cm-board)" />
              ) : (
                <motion.path
                  d={fluteRibbon(180, 6, 6, 250 - 2 * WL, 384 + 2 * WL, WL)}
                  fill="url(#cm-board)"
                  animate={{ x: [0, WL] }}
                  transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                />
              )}
            </g>
            {/* output support roller */}
            <circle cx="330" cy="200" r="11" fill="url(#cm-machine)" stroke="#3a2416" strokeWidth="1.5" />
          </g>

          {/* paper web from reel into the machine */}
          <path
            d={`M ${REEL.cx + 6} ${REEL.cy - REEL.r + 4} C 150 96, 176 104, 210 138`}
            fill="none"
            stroke="#d9b47e"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* machine housing (covers web + board origin) */}
          <rect x="200" y="104" width="92" height="112" rx="9" fill="url(#cm-machine)" stroke="#3a2416" strokeWidth="2" />
          <rect x="212" y="116" width="68" height="24" rx="3" fill="#351e15" opacity="0.55" />
          <circle cx="220" cy="196" r="3" fill="#5f9142" />
          <circle cx="272" cy="196" r="3" fill="#cd9a5b" />
          {/* feed + exit slots */}
          <rect x="196" y="130" width="8" height="18" rx="2" fill="#351e15" />
          <rect x="288" y="172" width="8" height="18" rx="2" fill="#351e15" />

          {/* gears on the machine face */}
          {reduce ? (
            <>
              <Gear cx={230} cy={162} r={15} teeth={10} />
              <Gear cx={262} cy={180} r={11} teeth={8} />
            </>
          ) : (
            <>
              <motion.g {...spin(230, 162, 3.6, 1)}>
                <Gear cx={230} cy={162} r={15} teeth={10} />
              </motion.g>
              <motion.g {...spin(262, 180, 2.7, -1)}>
                <Gear cx={262} cy={180} r={11} teeth={8} />
              </motion.g>
            </>
          )}

          {/* the reel: rim (static) + winding (spins) + hub */}
          <circle cx={REEL.cx} cy={REEL.cy} r={REEL.r} fill="url(#cm-reel)" stroke="#7a4a30" strokeWidth="2.5" />
          {reduce ? (
            <g stroke="#a2683f" strokeWidth="1.5" fill="none" opacity="0.7">
              <path d={spiralPath(REEL.cx, REEL.cy, 6, REEL.r - 6)} />
              <path d={`M ${REEL.cx} ${REEL.cy} L ${REEL.cx} ${REEL.cy - REEL.r + 4}`} strokeWidth="2.5" />
            </g>
          ) : (
            <motion.g {...spin(REEL.cx, REEL.cy, 7, 1)} stroke="#a2683f" strokeWidth="1.5" fill="none" opacity="0.7">
              <path d={spiralPath(REEL.cx, REEL.cy, 6, REEL.r - 6)} />
              <path d={`M ${REEL.cx} ${REEL.cy} L ${REEL.cx} ${REEL.cy - REEL.r + 4}`} strokeWidth="2.5" />
            </motion.g>
          )}
          <circle cx={REEL.cx} cy={REEL.cy} r="7" fill="#5a3623" stroke="#3a2416" strokeWidth="1.5" />
        </svg>
      </div>

      {/* floating spec chip */}
      <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full border border-kraft-200 bg-white/90 px-4 py-2 text-xs font-semibold text-kraft-800 shadow-md backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
        Board to box · under one roof
      </div>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-kraft-200/60 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 -z-10 h-40 w-40 rounded-full bg-leaf-400/20 blur-2xl" />
    </div>
  )
}
