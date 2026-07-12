// Faint line-art watermark for the Hero: a corrugated-box factory floor —
// north-light roofline, giant paper reels (raw stock) and stacked cartons.
// Rendered very low-opacity so it reads as a classy backdrop, never clutter.

// north-light (sawtooth) factory roof across a span
function roofPath(x0, x1, base, peak, teeth) {
  const w = (x1 - x0) / teeth
  let d = `M ${x0} ${base}`
  for (let i = 0; i < teeth; i += 1) {
    const x = x0 + i * w
    d += ` L ${x} ${peak} L ${x + w} ${base}` // vertical rise, glazed slope down
  }
  return d
}

// a big horizontal paper reel (cylinder) on an A-frame stand
function Reel({ x, y, len, r }) {
  const lx = x - len / 2
  const rx = x + len / 2
  const er = r * 0.32 // end-cap ellipse rx
  return (
    <g>
      {/* stand */}
      <path d={`M ${lx + 6} ${y} L ${lx - 4} ${y + r + 34} M ${rx - 6} ${y} L ${rx + 4} ${y + r + 34}`} />
      <path d={`M ${lx - 10} ${y + r + 34} L ${rx + 10} ${y + r + 34}`} />
      {/* body */}
      <path d={`M ${lx} ${y - r} L ${rx} ${y - r} M ${lx} ${y + r} L ${rx} ${y + r}`} />
      <ellipse cx={lx} cy={y} rx={er} ry={r} />
      <ellipse cx={rx} cy={y} rx={er} ry={r} />
      {/* rolled-paper rings on the near end */}
      <ellipse cx={rx} cy={y} rx={er * 0.6} ry={r * 0.6} />
      <ellipse cx={rx} cy={y} rx={er * 0.22} ry={r * 0.22} />
    </g>
  )
}

// a corrugated carton with lid seam + centre score
function Carton({ x, y, w, h }) {
  const lid = y + h * 0.22
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" />
      <path d={`M ${x} ${lid} L ${x + w} ${lid}`} />
      <path d={`M ${x + w / 2} ${y} L ${x + w / 2} ${lid}`} />
    </g>
  )
}

// simple slatted pallet under a stack
function Pallet({ x, y, w }) {
  return (
    <g>
      <path d={`M ${x} ${y} L ${x + w} ${y} M ${x} ${y + 12} L ${x + w} ${y + 12}`} />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <path key={t} d={`M ${x + t * w} ${y} L ${x + t * w} ${y + 12}`} />
      ))}
    </g>
  )
}

export default function FactoryBackdrop({ className = '' }) {
  const ground = 384
  return (
    <svg
      viewBox="0 0 1440 460"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      {/* ground line */}
      <path d={`M 0 ${ground} L 1440 ${ground}`} strokeWidth="1.5" />

      {/* back factory shell with north-light roof */}
      <g opacity="0.75">
        <path d={roofPath(60, 620, 232, 176, 5)} />
        <path d={`M 60 232 L 60 ${ground} M 620 232 L 620 ${ground}`} />
        {/* roller shutter door */}
        <rect x="120" y="300" width="90" height="84" rx="2" />
        {[312, 324, 336, 348, 360, 372].map((yy) => (
          <path key={yy} d={`M 120 ${yy} L 210 ${yy}`} strokeWidth="1.5" />
        ))}
        {/* windows */}
        {[260, 340, 420, 500].map((wx) => (
          <rect key={wx} x={wx} y="300" width="46" height="34" rx="2" />
        ))}
        {/* vent stack */}
        <path d="M 540 176 L 540 128 L 566 128 L 566 176" />
      </g>

      {/* giant paper reels — raw stock */}
      <Reel x={300} y={300} len={210} r={62} />
      <Reel x={470} y={318} len={150} r={44} />

      {/* flat-sheet bundles leaning */}
      <g opacity="0.85">
        <path d="M 690 384 L 726 250 L 760 250 L 736 384" />
        <path d="M 706 384 L 740 258" strokeWidth="1.5" />
        <path d="M 724 384 L 754 262" strokeWidth="1.5" />
      </g>

      {/* stacked cartons on pallets (right) */}
      <g>
        <Carton x={980} y={250} w={120} h={130} />
        <Carton x={1010} y={196} w={86} h={54} />
        <Pallet x={968} y={382} w={146} />

        <Carton x={1170} y={286} w={100} h={96} />
        <Carton x={1150} y={214} w={140} h={72} />
        <Pallet x={1150} y={384} w={146} />
      </g>

      {/* a couple of travelling boxes on a conveyor mid-floor */}
      <g opacity="0.7">
        <path d="M 820 372 L 940 372" />
        {[830, 872, 914].map((bx) => (
          <rect key={bx} x={bx} y="344" width="26" height="26" rx="2" />
        ))}
      </g>
    </svg>
  )
}
