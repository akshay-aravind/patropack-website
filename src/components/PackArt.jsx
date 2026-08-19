// Flat SVG illustrations for the retail-carton and flexible-pouch ranges.
// Same map-lookup shape as Icon.jsx, but these are filled artwork rather than
// single stroke paths. Deliberately gradient-free: every card renders its own
// <svg>, so shared gradient ids would collide across the page.

const K = {
  100: '#f3e9d7',
  200: '#e7d1ad',
  300: '#d9b47e',
  400: '#cd9a5b',
  500: '#c4854a',
  600: '#b06f3e',
  700: '#925836',
  900: '#623c2a',
  paper: '#faf6ef',
  ink: '#1a1410',
}

// Crimped seal bar used on the pillow-style pouches.
function Crimp({ x, y, w, h = 8, fill = K[500] }) {
  const teeth = 9
  const step = w / teeth
  let d = `M${x} ${y}`
  for (let i = 0; i < teeth; i++) {
    d += `L${x + step * (i + 0.5)} ${y + h / 2}L${x + step * (i + 1)} ${y}`
  }
  d += `V${y + h}H${x}Z`
  return <path d={d} fill={fill} />
}

const shapes = {
  // ---- Retail & food cartons ------------------------------------------------
  takeaway: (
    <>
      <path d="M60 60Q80 28 100 60" fill="none" stroke={K.ink} strokeWidth="3" opacity=".35" strokeLinecap="round" />
      <path d="M40 62h80l-10 72H50z" fill={K[300]} />
      <path d="M40 62h80l-3 18H43z" fill={K[200]} />
      <path d="M80 80v54" stroke={K[500]} strokeWidth="2" opacity=".45" />
      <rect x="62" y="92" width="36" height="26" rx="3" fill={K.paper} opacity=".85" />
      <path d="M69 106h22M69 112h14" stroke={K[500]} strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
    </>
  ),
  cake: (
    <>
      <rect x="30" y="68" width="100" height="62" rx="4" fill={K[300]} />
      <rect x="25" y="52" width="110" height="20" rx="3" fill={K[200]} />
      <rect x="25" y="52" width="110" height="6" rx="3" fill={K[400]} opacity=".5" />
      <rect x="56" y="82" width="48" height="34" rx="4" fill={K.paper} />
      <path d="M68 110h24l-5-18H73z" fill={K[400]} />
      <circle cx="80" cy="88" r="4" fill={K[700]} />
      <path d="M30 122h100" stroke={K[500]} strokeWidth="2" opacity=".35" />
    </>
  ),
  chocolate: (
    <>
      <rect x="38" y="40" width="94" height="22" rx="4" fill={K[300]} />
      <rect x="38" y="47" width="94" height="8" fill={K[600]} opacity=".45" />
      <rect x="26" y="72" width="108" height="58" rx="5" fill={K[400]} />
      <rect x="34" y="79" width="92" height="44" rx="3" fill={K[200]} />
      {[52, 80, 108].map((cx) =>
        [92, 111].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7.5" fill={K[700]} />),
      )}
    </>
  ),
  perfume: (
    <>
      <rect x="34" y="46" width="48" height="90" rx="3" fill={K[300]} />
      <rect x="34" y="46" width="48" height="11" rx="3" fill={K[200]} />
      <path d="M46 76h24M46 86h16" stroke={K.paper} strokeWidth="3" strokeLinecap="round" opacity=".8" />
      <path d="M58 104l9 9-9 9-9-9z" fill={K[600]} opacity=".55" />
      <rect x="94" y="82" width="34" height="54" rx="7" fill={K[100]} stroke={K[500]} strokeWidth="2" />
      <rect x="105" y="68" width="12" height="16" fill={K[400]} />
      <rect x="100" y="52" width="22" height="18" rx="3" fill={K[700]} />
      <path d="M102 100h18" stroke={K[400]} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </>
  ),

  // ---- Flexible pouch formats ----------------------------------------------
  standup: (
    <>
      <rect x="44" y="32" width="72" height="9" rx="2" fill={K[500]} />
      <path d="M47 41c-2 26-3 54 1 74 2 10 62 10 64 0 4-20 3-48 1-74z" fill={K[300]} />
      <path d="M48 115q32-13 64 0v-4q-32-12-64 0z" fill={K[500]} opacity=".55" />
      <rect x="61" y="56" width="38" height="38" rx="4" fill={K.paper} opacity=".9" />
      <path d="M69 74h22M69 82h13" stroke={K[500]} strokeWidth="3" strokeLinecap="round" opacity=".6" />
      <path d="M112 32l4 4-4 5z" fill={K.paper} />
    </>
  ),
  zipper: (
    <>
      <rect x="44" y="30" width="72" height="8" rx="2" fill={K[500]} />
      <path d="M47 38c-2 28-3 60 0 82h66c3-22 2-54 0-82z" fill={K[300]} />
      <rect x="47" y="50" width="66" height="9" fill={K[200]} />
      {[52, 60, 68, 76, 84, 92, 100].map((x) => (
        <path key={x} d={`M${x} 51v7`} stroke={K[500]} strokeWidth="2" />
      ))}
      <rect x="100" y="47" width="14" height="15" rx="3" fill={K[700]} />
      <rect x="60" y="72" width="40" height="34" rx="4" fill={K.paper} opacity=".9" />
      <path d="M68 88h24M68 96h14" stroke={K[500]} strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </>
  ),
  flat: (
    <>
      <rect x="48" y="48" width="64" height="64" fill={K[300]} />
      <Crimp x={48} y={40} w={64} h={9} />
      <Crimp x={48} y={112} w={64} h={9} />
      <rect x="60" y="62" width="40" height="36" rx="4" fill={K.paper} opacity=".9" />
      <path d="M68 78h24M68 86h14" stroke={K[500]} strokeWidth="3" strokeLinecap="round" opacity=".6" />
      <path d="M96 48v64" stroke={K[500]} strokeWidth="2" opacity=".3" />
    </>
  ),
  threeside: (
    <>
      <rect x="50" y="38" width="60" height="84" rx="3" fill={K[500]} />
      <rect x="57" y="45" width="46" height="77" fill={K[200]} />
      <rect x="66" y="58" width="28" height="30" rx="3" fill={K.paper} />
      <path d="M72 78h16M72 84h10" stroke={K[500]} strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
      <path d="M110 44l-6 5 6 5z" fill={K.paper} />
      <path d="M57 100h46" stroke={K[400]} strokeWidth="2" opacity=".6" />
    </>
  ),
  vacuum: (
    <>
      <rect x="32" y="52" width="96" height="60" rx="16" fill={K[200]} />
      <rect x="32" y="70" width="10" height="24" rx="4" fill={K[400]} opacity=".7" />
      <rect x="118" y="70" width="10" height="24" rx="4" fill={K[400]} opacity=".7" />
      <rect x="52" y="64" width="56" height="36" rx="5" fill={K[500]} />
      <path d="M46 62q14 8 0 16M114 62q-14 8 0 16" fill="none" stroke={K.paper} strokeWidth="3" strokeLinecap="round" opacity=".75" />
      <path d="M60 74h40M60 86h28" stroke={K[200]} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </>
  ),
  retort: (
    <>
      <path d="M56 34q-4 12 0 12M80 30q-4 14 0 16M104 34q-4 12 0 12" fill="none" stroke={K[400]} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <rect x="42" y="54" width="76" height="9" rx="2" fill={K[600]} />
      <path d="M45 63c-2 24-2 46 1 62 2 8 66 8 68 0 3-16 3-38 1-62z" fill={K[300]} />
      <rect x="45" y="80" width="70" height="12" fill={K[600]} opacity=".45" />
      <path d="M46 118q34-12 68 0v-5q-34-11-68 0z" fill={K[500]} opacity=".55" />
      <rect x="62" y="96" width="36" height="20" rx="3" fill={K.paper} opacity=".9" />
      <path d="M70 106h20" stroke={K[500]} strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </>
  ),
}

export default function PackArt({ shape, className = 'h-full w-full' }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      {shapes[shape] || shapes.standup}
    </svg>
  )
}
