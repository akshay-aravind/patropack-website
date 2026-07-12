// Hand-built SVG illustrations for each product. Kraft palette, isometric feel.
// Each returns an <svg> that fills its container.

const defs = (
  <defs>
    <linearGradient id="pa-top" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f3e9d7" />
      <stop offset="1" stopColor="#e7d1ad" />
    </linearGradient>
    <linearGradient id="pa-left" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#d9b47e" />
      <stop offset="1" stopColor="#c4854a" />
    </linearGradient>
    <linearGradient id="pa-right" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#cd9a5b" />
      <stop offset="1" stopColor="#b06f3e" />
    </linearGradient>
    <linearGradient id="pa-print" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#5f9142" />
      <stop offset="1" stopColor="#4a7433" />
    </linearGradient>
  </defs>
)

const flute = (
  <pattern
    id="pa-flute"
    width="7"
    height="7"
    patternUnits="userSpaceOnUse"
    patternTransform="rotate(0)"
  >
    <rect width="7" height="7" fill="none" />
    <path d="M0 0 V7" stroke="rgba(53,30,21,.12)" strokeWidth="1.4" />
  </pattern>
)

function Iso({ children }) {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" role="img">
      {defs}
      {flute}
      {children}
    </svg>
  )
}

// A reusable closed isometric box body
function BoxBody({ x = 120, y = 60, w = 70, h = 55, tall = 40 }) {
  const topPts = `${x},${y} ${x + w},${y + h / 2} ${x},${y + h} ${x - w},${y + h / 2}`
  return (
    <g>
      <polygon points={topPts} fill="url(#pa-top)" />
      <polygon points={topPts} fill="url(#pa-flute)" opacity="0.5" />
      <polygon
        points={`${x - w},${y + h / 2} ${x},${y + h} ${x},${y + h + tall} ${x - w},${y + h / 2 + tall}`}
        fill="url(#pa-left)"
      />
      <polygon
        points={`${x},${y + h} ${x + w},${y + h / 2} ${x + w},${y + h / 2 + tall} ${x},${y + h + tall}`}
        fill="url(#pa-right)"
      />
      <polygon
        points={`${x},${y + h} ${x + w},${y + h / 2} ${x + w},${y + h / 2 + tall} ${x},${y + h + tall}`}
        fill="url(#pa-flute)"
        opacity="0.4"
      />
    </g>
  )
}

const arts = {
  // RSC: closed box with visible centre seam on top flaps
  rsc: (
    <Iso>
      <BoxBody />
      <line
        x1="120"
        y1="88"
        x2="120"
        y2="60"
        stroke="rgba(53,30,21,.35)"
        strokeWidth="1.5"
      />
      <line
        x1="50"
        y1="88"
        x2="190"
        y2="88"
        stroke="rgba(53,30,21,.18)"
        strokeWidth="1.5"
      />
      <ellipse cx="120" cy="170" rx="78" ry="12" fill="rgba(53,30,21,.08)" />
    </Iso>
  ),
  // Die-cut: open box with unfolded lock flaps
  diecut: (
    <Iso>
      <BoxBody y={70} h={50} tall={34} />
      {/* raised open flap */}
      <polygon
        points="120,70 190,105 168,70 120,44"
        fill="url(#pa-top)"
        opacity="0.95"
      />
      <polygon points="120,70 50,105 72,70 120,44" fill="url(#pa-top)" />
      <polygon
        points="120,70 190,105 168,70 120,44"
        fill="url(#pa-flute)"
        opacity="0.4"
      />
      <circle cx="120" cy="66" r="5" fill="none" stroke="rgba(53,30,21,.4)" />
      <ellipse cx="120" cy="176" rx="72" ry="11" fill="rgba(53,30,21,.08)" />
    </Iso>
  ),
  // Printed: box with a bold printed logo panel
  printed: (
    <Iso>
      <BoxBody />
      <polygon
        points="120,100 190,65 190,100 120,135"
        fill="url(#pa-print)"
        opacity="0.9"
      />
      <circle cx="155" cy="92" r="9" fill="#f3e9d7" opacity="0.9" />
      <rect x="140" y="108" width="34" height="4" rx="2" fill="#f3e9d7" opacity="0.7" />
      <rect x="140" y="116" width="24" height="4" rx="2" fill="#f3e9d7" opacity="0.5" />
      <ellipse cx="120" cy="170" rx="78" ry="12" fill="rgba(53,30,21,.08)" />
    </Iso>
  ),
  // Export: stacked heavy boxes with strapping
  export: (
    <Iso>
      <g transform="translate(0,26)">
        <BoxBody y={40} h={44} tall={30} />
      </g>
      <BoxBody y={78} h={44} tall={34} />
      <line
        x1="120"
        y1="62"
        x2="120"
        y2="150"
        stroke="rgba(53,30,21,.45)"
        strokeWidth="3"
      />
      <path
        d="M70 96 L120 121 L170 96"
        fill="none"
        stroke="rgba(53,30,21,.4)"
        strokeWidth="3"
      />
      <ellipse cx="120" cy="182" rx="80" ry="12" fill="rgba(53,30,21,.08)" />
    </Iso>
  ),
  // Sheets: flat corrugated sheets + a roll
  sheets: (
    <Iso>
      <g>
        {[0, 12, 24].map((o, i) => (
          <polygon
            key={i}
            points={`${120},${70 + o} ${190},${105 + o} ${120},${140 + o} ${50},${105 + o}`}
            fill={i === 2 ? 'url(#pa-top)' : 'url(#pa-left)'}
            stroke="rgba(53,30,21,.15)"
          />
        ))}
        <polygon
          points="120,94 190,129 120,164 50,129"
          fill="url(#pa-flute)"
          opacity="0.5"
        />
      </g>
      <ellipse cx="120" cy="184" rx="78" ry="11" fill="rgba(53,30,21,.08)" />
    </Iso>
  ),
  // Food: pizza box (flat wide) with vents
  food: (
    <Iso>
      <BoxBody y={78} h={60} w={82} tall={20} />
      <polygon
        points="120,78 202,119 120,160 38,119"
        fill="url(#pa-top)"
      />
      <polygon
        points="120,78 202,119 120,160 38,119"
        fill="url(#pa-flute)"
        opacity="0.4"
      />
      <circle cx="120" cy="119" r="5" fill="rgba(53,30,21,.3)" />
      <circle cx="150" cy="104" r="4" fill="rgba(53,30,21,.25)" />
      <circle cx="90" cy="104" r="4" fill="rgba(53,30,21,.25)" />
      <ellipse cx="120" cy="176" rx="86" ry="12" fill="rgba(53,30,21,.08)" />
    </Iso>
  ),
}

export default function ProductArt({ variant }) {
  return arts[variant] || arts.rsc
}
