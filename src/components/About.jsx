import { motion } from 'framer-motion'
import AboutImage from './AboutImage'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-kraft-50 py-24 sm:py-32">
      <div className="paper-texture pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        {/* copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-kraft-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-kraft-700">
            <span className="h-1.5 w-1.5 rounded-full bg-kraft-500" />
            About PatroPack
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl"
          >
            We manufacture packaging that protects, presents and performs.
          </motion.h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft/75">
            <p>
              PatroPack is a newly established corrugated packaging manufacturer
              based in Sharjah, serving industrial, retail, food, e-commerce and
              export businesses across Dubai and the UAE. From a single sheet of
              kraft board to a fully printed, die-cut carton, every stage happens
              under one roof.
            </p>
            <p>
              Being new is our advantage: modern equipment, a hands-on team that
              answers directly, and the flexibility to take on custom jobs and
              smaller runs that larger factories turn away.
            </p>
            <p>
              That focus means tighter quality control, faster turnarounds and
              pricing that stays honest — whether you need a hundred boxes or a
              hundred thousand.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {['Eco-friendly board', 'In-house printing', 'Structural design', 'Export-ready'].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-kraft-100 px-4 py-2 text-sm font-medium text-kraft-800 ring-1 ring-inset ring-kraft-200"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>

        {/* animated corrugated cross-section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AboutImage />
        </motion.div>
      </div>
    </section>
  )
}
