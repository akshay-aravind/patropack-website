import { motion } from 'framer-motion'
import { specs } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Specifications() {
  return (
    <section id="specs" className="relative overflow-hidden bg-ink py-24 text-kraft-50 sm:py-32">
      <div className="flute-pattern pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-kraft-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-leaf-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          light
          eyebrow="Board specifications"
          title="Built to the right grade, flute and finish."
          intro="We match construction to your load, transit and shelf needs — nothing over-spec'd, nothing under-built."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-kraft-300">
                {s.label}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-kraft-100">
                  {s.value}
                </span>
                <span className="text-sm font-medium text-kraft-400">
                  {s.unit}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-kraft-100/60">
                {s.note}
              </p>
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-kraft-500/0 via-kraft-400 to-kraft-500/0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
