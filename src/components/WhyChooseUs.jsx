import { motion } from 'framer-motion'
import { whyChooseUs } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why choose us"
          title="Six reasons buyers stay with PatroPack."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-kraft-200 bg-kraft-50 p-7 transition-all duration-300 hover:border-kraft-300 hover:shadow-lg hover:shadow-kraft-900/5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-kraft-600 text-kraft-50 shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/70">
                {item.desc}
              </p>
              <span className="pointer-events-none absolute -bottom-6 -right-6 font-display text-8xl font-bold text-kraft-100/70">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
