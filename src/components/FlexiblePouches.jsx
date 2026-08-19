import { motion } from 'framer-motion'
import { pouchFormats, pouchApplications } from '../data/content'
import PackArt from './PackArt'
import SectionHeading from './SectionHeading'

const card = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function FlexiblePouches() {
  return (
    <section id="pouches" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Flexible packaging"
          title="Pouches engineered for what goes inside."
          intro="Multi-layer laminates and barrier films converted into the pouch format your product needs — from a spice sachet to a retort-ready meal."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pouchFormats.map((p, i) => (
            <motion.article
              key={p.id}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-kraft-200 bg-kraft-50 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-kraft-300 hover:shadow-xl hover:shadow-kraft-900/10"
            >
              {/* illustration */}
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <PackArt
                  shape={p.shape}
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-kraft-100 backdrop-blur-sm">
                  {p.tag}
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft/70">
                  {p.desc}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <li
                      key={s}
                      className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-kraft-700 ring-1 ring-inset ring-kraft-200"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* end-use chip band — the dark moment of this section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-3xl bg-ink p-6 sm:p-10"
        >
          <div className="flute-pattern pointer-events-none absolute inset-0 opacity-25" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-kraft-600/20 blur-3xl" />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-kraft-300">
              What we pack
            </span>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-kraft-100/70 sm:text-lg">
              Food-grade structures proven across staples, snacks, beverages and
              pet food — printed, laminated and pouched to suit your fill line.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {pouchApplications.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-kraft-100 backdrop-blur transition-colors hover:border-kraft-400/40 hover:bg-white/[0.08] sm:px-4 sm:py-2 sm:text-sm"
                >
                  {a}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-kraft-600 px-6 py-3 text-sm font-semibold text-kraft-50 shadow-sm transition-all hover:bg-kraft-700 hover:shadow-md"
          >
            Get a pouch quote
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
