import { motion, useReducedMotion } from 'framer-motion'

// Production-line loop: plain kraft cartons travel along a conveyor and come
// out printed after passing the print head. The trick — the same moving box
// row is drawn twice: blank boxes clipped to the left of the head, printed
// boxes clipped to the right. As a box crosses the head it "becomes printed".

const W = 360
const H = 340
const BELT_TOP = 236
const BELT_H = 15
const BOX_W = 48
const BOX_H = 44
const BOX_Y = BELT_TOP - BOX_H
const S = 84 // box-to-box spacing (also the seamless-loop period)
const STATION_X = 188 // print-head centre = clip boundary
const GROUND = 300

const slots = []
for (let i = -2; i <= 6; i += 1) slots.push(i * S)

function Box({ x, printed }) {
  const cx = x + BOX_W / 2
  return (
    <g>
      {/* body */}
      <rect x={x} y={BOX_Y} width={BOX_W} height={BOX_H} rx="3" fill="url(#cv-box)" stroke="#7a4a30" strokeWidth="1.5" />
      {/* lid seam + centre score */}
      <path d={`M ${x} ${BOX_Y + 12} L ${x + BOX_W} ${BOX_Y + 12}`} stroke="#7a4a30" strokeWidth="1.2" fill="none" />
      <path d={`M ${cx} ${BOX_Y} L ${cx} ${BOX_Y + 12}`} stroke="#7a4a30" strokeWidth="1.2" fill="none" />
      {/* printed label */}
      {printed && (
        <g>
          <rect x={x + 10} y={BOX_Y + 20} width={BOX_W - 20} height="16" rx="2" fill="#5f9142" />
          <text
            x={cx}
            y={BOX_Y + 32}
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize="10"
            fill="#faf6ef"
          >
            PP
          </text>
        </g>
      )}
    </g>
  )
}

function Row({ printed }) {
  return slots.map((x, i) => <Box key={i} x={x} printed={printed} />)
}

export default function ConveyorLine() {
  const reduce = useReducedMotion()
  const travel = reduce ? {} : { animate: { x: [0, S] }, transition: { duration: 3, ease: 'linear', repeat: Infinity } }
  const bob = reduce ? {} : { animate: { y: [0, 5, 0] }, transition: { duration: 1.1, ease: 'easeInOut', repeat: Infinity } }
  const flash = reduce ? {} : { animate: { opacity: [0, 0.85, 0] }, transition: { duration: 1.1, ease: 'easeInOut', repeat: Infinity } }

  return (
    <div className="relative">
      <div className="animate-float overflow-hidden rounded-3xl border border-kraft-200 bg-gradient-to-br from-kraft-100 to-white shadow-[0_20px_50px_-20px_rgba(53,30,21,0.35)] ring-1 ring-inset ring-white/50">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Production line: plain kraft cartons travel along a conveyor and come out printed"
        >
          <defs>
            <linearGradient id="cv-box" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e7d1ad" />
              <stop offset="1" stopColor="#cd9a5b" />
            </linearGradient>
            <linearGradient id="cv-belt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8a5636" />
              <stop offset="1" stopColor="#623c2a" />
            </linearGradient>
            <linearGradient id="cv-machine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#925836" />
              <stop offset="1" stopColor="#623c2a" />
            </linearGradient>
            <clipPath id="cv-clip-left">
              <rect x="0" y={BOX_Y - 6} width={STATION_X} height={BOX_H + 12} />
            </clipPath>
            <clipPath id="cv-clip-right">
              <rect x={STATION_X} y={BOX_Y - 6} width={W - STATION_X} height={BOX_H + 12} />
            </clipPath>
          </defs>

          {/* legs + ground */}
          <path d={`M 0 ${GROUND} L ${W} ${GROUND}`} stroke="#b06f3e" strokeWidth="1.5" opacity="0.5" />
          <path
            d={`M 60 ${BELT_TOP + BELT_H} L 44 ${GROUND} M 96 ${BELT_TOP + BELT_H} L 112 ${GROUND}
                M 264 ${BELT_TOP + BELT_H} L 248 ${GROUND} M 300 ${BELT_TOP + BELT_H} L 316 ${GROUND}`}
            stroke="#8a5636"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* belt + end rollers */}
          <rect x="26" y={BELT_TOP} width={W - 52} height={BELT_H} rx={BELT_H / 2} fill="url(#cv-belt)" />
          <circle cx="34" cy={BELT_TOP + BELT_H / 2} r="13" fill="url(#cv-belt)" stroke="#4a2e1f" strokeWidth="1.5" />
          <circle cx={W - 34} cy={BELT_TOP + BELT_H / 2} r="13" fill="url(#cv-belt)" stroke="#4a2e1f" strokeWidth="1.5" />

          {/* travelling boxes — blank before the head, printed after */}
          <g clipPath="url(#cv-clip-left)">
            <motion.g {...travel}>
              <Row printed={false} />
            </motion.g>
          </g>
          <g clipPath="url(#cv-clip-right)">
            <motion.g {...travel}>
              <Row printed />
            </motion.g>
          </g>

          {/* print head */}
          <motion.g {...bob}>
            <rect x="150" y="60" width="76" height="70" rx="6" fill="url(#cv-machine)" stroke="#4a2e1f" strokeWidth="1.5" />
            <rect x="164" y="74" width="48" height="20" rx="2" fill="#351e15" opacity="0.5" />
            <circle cx="160" cy="120" r="2.2" fill="#5f9142" />
            <circle cx="216" cy="120" r="2.2" fill="#cd9a5b" />
            {/* nozzle */}
            <path d={`M ${STATION_X - 10} 130 L ${STATION_X + 10} 130 L ${STATION_X} 150 Z`} fill="url(#cv-machine)" />
            {/* ink flash onto the passing box */}
            <motion.path d={`M ${STATION_X} 152 L ${STATION_X - 7} 176 L ${STATION_X + 7} 176 Z`} fill="#5f9142" {...flash} />
          </motion.g>

          {/* support arm for the head */}
          <path d={`M 188 60 L 188 44 L 320 44 L 320 ${BELT_TOP}`} stroke="#8a5636" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* floating spec chip */}
      <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full border border-kraft-200 bg-white/90 px-4 py-2 text-xs font-semibold text-kraft-800 shadow-md backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
        In-house printing · Pantone-matched
      </div>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-kraft-200/60 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 -z-10 h-40 w-40 rounded-full bg-leaf-400/20 blur-2xl" />
    </div>
  )
}
