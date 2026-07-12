import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, intro, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            light
              ? 'border-white/25 text-kraft-100'
              : 'border-kraft-300 text-kraft-700'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-kraft-500" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-5 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={`mt-4 text-lg leading-relaxed text-balance ${
            light ? 'text-kraft-100/80' : 'text-ink-soft/70'
          }`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  )
}
