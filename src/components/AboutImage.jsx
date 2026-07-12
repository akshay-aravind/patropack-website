import { useState } from 'react'


export default function AboutImage() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-kraft-200 bg-gradient-to-br from-kraft-100 to-white shadow-[0_20px_50px_-20px_rgba(53,30,21,0.35)] ring-1 ring-inset ring-white/50">
        {!failed ? (
          <img
            src="/factory.png"
            alt="Inside the PatroPack corrugated box manufacturing unit in Sharjah, serving Dubai and the UAE"
            loading="lazy"
            onError={() => setFailed(true)}
            onLoad={(e) => {
              // dev server serves index.html for a missing file → 0-size decode
              if (!e.currentTarget.naturalWidth) setFailed(true)
            }}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-kraft-400" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* readability gradient so the chip sits well */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
      </div>

      {/* floating caption chip */}
      {/* <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full border border-kraft-200 bg-white/90 px-4 py-2 text-xs font-semibold text-kraft-800 shadow-md backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
        Our manufacturing floor
      </div> */}

      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-kraft-200/60 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 -z-10 h-40 w-40 rounded-full bg-leaf-400/20 blur-2xl" />
    </div>
  )
}
