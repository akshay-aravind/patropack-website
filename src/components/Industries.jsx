import { motion } from 'framer-motion'
import { industries } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Industries() {
  return (
    <section id="industries" className="relative bg-kraft-50 py-24 sm:py-32">
      <div className="paper-texture pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Industries served"
          title="Trusted across the supply chain."
          intro="Whatever moves through your warehouse, we make the box that keeps it safe from floor to doorstep."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-kraft-200 bg-white/70 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-kraft-400 hover:shadow-md"
            >
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-kraft-100 text-kraft-700 ring-1 ring-inset ring-kraft-200 transition-colors group-hover:bg-kraft-600 group-hover:text-kraft-50">
                <Icon name={ind.icon} className="h-7 w-7" />
              </span>
              <span className="text-sm font-semibold text-ink-soft">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
