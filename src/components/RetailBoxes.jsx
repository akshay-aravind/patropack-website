import { motion } from 'framer-motion'
import { retailBoxes } from '../data/content'
import PackArt from './PackArt'
import SectionHeading from './SectionHeading'

const card = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function RetailBoxes() {
  return (
    <section id="retail" className="relative bg-kraft-50 py-24 sm:py-32">
      <div className="paper-texture pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Retail & food packaging"
          title="Boxes that sell the product inside."
          intro="Customised cartons for takeaway kitchens, bakeries, chocolatiers and cosmetics brands — printed, finished and die-cut to fit exactly what goes in them."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {retailBoxes.map((p, i) => (
            <motion.article
              key={p.id}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-kraft-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-kraft-300 hover:shadow-xl hover:shadow-kraft-900/10"
            >
              {/* illustration */}
              <div className="relative aspect-[4/3] overflow-hidden bg-kraft-100">
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
                <h3 className="font-display text-lg font-semibold text-ink">
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft/70">
                  {p.desc}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <li
                      key={s}
                      className="rounded-md bg-kraft-50 px-2.5 py-1 text-xs font-medium text-kraft-700 ring-1 ring-inset ring-kraft-200"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-kraft-600 px-6 py-3 text-sm font-semibold text-kraft-50 shadow-sm transition-all hover:bg-kraft-700 hover:shadow-md"
          >
            Send your artwork — we will quote it
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
