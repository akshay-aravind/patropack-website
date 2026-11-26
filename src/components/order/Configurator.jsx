import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PackArt from '../PackArt'
import { CUSTOM_SIZE, quantityTiers } from '../../data/catalogue'
import { addLine } from '../../lib/useOrder'

/**
 * The "configure then add" sheet: pick a size (or type a custom one), a
 * quantity, the product's own options, and drop it into the order.
 */
export default function Configurator({ product, onClose, onAdded }) {
  const [size, setSize] = useState(null)
  const [custom, setCustom] = useState('')
  const [qty, setQty] = useState('')
  const [customQty, setCustomQty] = useState('')
  const [options, setOptions] = useState({})
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  // Reset whenever a different product opens the sheet.
  useEffect(() => {
    setSize(null)
    setCustom('')
    setQty('')
    setCustomQty('')
    setOptions({})
    setNotes('')
    setError('')
  }, [product?.id])

  // Escape closes, and the page behind must not scroll while this is open.
  useEffect(() => {
    if (!product) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [product, onClose])

  const resolvedQty = qty === 'custom' ? customQty.trim() : qty
  const resolvedSize = useMemo(() => {
    if (size === CUSTOM_SIZE) return custom.trim()
    const match = product?.sizes.find((s) => s.id === size)
    return match ? `${match.label} (${match.detail})` : ''
  }, [size, custom, product])

  if (!product) return null

  const add = () => {
    if (!resolvedSize) {
      setError(size === CUSTOM_SIZE ? 'Enter your custom size.' : 'Choose a size.')
      return
    }
    if (!resolvedQty) {
      setError(qty === 'custom' ? 'Enter a quantity.' : 'Choose a quantity.')
      return
    }
    addLine({
      productId: product.id,
      size: resolvedSize,
      quantity: resolvedQty,
      options,
      notes: notes.trim(),
    })
    onAdded?.(product)
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6"
      >
        <motion.div
          key="sheet"
          role="dialog"
          aria-modal="true"
          aria-label={`Configure ${product.name}`}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-kraft-50 shadow-2xl sm:max-h-[86vh] sm:rounded-3xl"
        >
          {/* header */}
          <div className="relative flex shrink-0 items-center gap-4 border-b border-kraft-200 bg-white p-4 sm:p-5">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-kraft-100 sm:h-20 sm:w-20">
              {product.image ? (
                <img src={product.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <PackArt shape={product.art} className="h-full w-full" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-kraft-600">
                {product.tag}
              </span>
              <h2 className="truncate font-display text-lg font-semibold text-ink sm:text-xl">
                {product.name}
              </h2>
              <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft/60 sm:text-sm">
                {product.blurb}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft/50 transition-colors hover:bg-kraft-100 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* body */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Group title={product.sizeLabel} required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {product.sizes.map((s) => (
                  <Tile
                    key={s.id}
                    active={size === s.id}
                    onClick={() => { setSize(s.id); setError('') }}
                    title={s.label}
                    sub={s.detail}
                  />
                ))}
                <Tile
                  active={size === CUSTOM_SIZE}
                  onClick={() => { setSize(CUSTOM_SIZE); setError('') }}
                  title="Custom size"
                  sub="Tell us your dimensions"
                  dashed
                />
              </div>
              <AnimatePresence initial={false}>
                {size === CUSTOM_SIZE && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      value={custom}
                      onChange={(e) => { setCustom(e.target.value); setError('') }}
                      placeholder={`e.g. ${product.sizes[0]?.detail || '300 × 200 × 150 mm'}`}
                      aria-label="Custom size"
                      className={`${inputCls} mt-2.5`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Group>

            <Group title="Quantity" required hint="Minimum order 100 pcs">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {quantityTiers.map((q) => (
                  <Pill key={q} active={qty === q} onClick={() => { setQty(q); setError('') }}>
                    {q}
                  </Pill>
                ))}
                <Pill active={qty === 'custom'} onClick={() => { setQty('custom'); setError('') }} dashed>
                  Other
                </Pill>
              </div>
              <AnimatePresence initial={false}>
                {qty === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      inputMode="numeric"
                      value={customQty}
                      onChange={(e) => { setCustomQty(e.target.value); setError('') }}
                      placeholder="e.g. 3,500"
                      aria-label="Custom quantity"
                      className={`${inputCls} mt-2.5`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Group>

            {product.options?.map((opt) => (
              <Group key={opt.id} title={opt.label}>
                <div className="flex flex-wrap gap-2">
                  {opt.choices.map((c) => (
                    <Pill
                      key={c}
                      active={options[opt.id] === c}
                      onClick={() =>
                        setOptions((prev) => ({
                          ...prev,
                          [opt.id]: prev[opt.id] === c ? undefined : c,
                        }))
                      }
                      auto
                    >
                      {c}
                    </Pill>
                  ))}
                </div>
              </Group>
            ))}

            <Group title="Notes" hint="Artwork, finishing, delivery — optional">
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know about this item"
                className={`${inputCls} resize-none`}
              />
            </Group>
          </div>

          {/* footer */}
          <div className="shrink-0 border-t border-kraft-200 bg-white p-4 sm:px-6">
            {error && (
              <p role="alert" className="mb-2.5 rounded-lg bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-700">
                {error}
              </p>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-kraft-300 px-5 py-3 text-sm font-semibold text-ink-soft/70 transition-colors hover:border-kraft-500 hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={add}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-kraft-600 px-6 py-3 text-sm font-semibold text-kraft-50 transition-colors hover:bg-kraft-700"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add to order
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────────────── pieces ─────────────────────────────── */

const inputCls =
  'w-full rounded-xl border border-kraft-300 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/35 focus:border-kraft-600 focus:outline-none focus:ring-2 focus:ring-kraft-500/25'

function Group({ title, hint, required, children }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-ink">
          {title}
          {required && <span className="text-kraft-600"> *</span>}
        </h3>
        {hint && <span className="text-xs text-ink-soft/45">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function Tile({ active, onClick, title, sub, dashed }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
        dashed ? 'border-dashed' : ''
      } ${
        active
          ? 'border-kraft-600 bg-kraft-600/10 ring-1 ring-kraft-600'
          : 'border-kraft-300 bg-white hover:border-kraft-500 hover:bg-kraft-100/60'
      }`}
    >
      <span className="block text-sm font-semibold text-ink">{title}</span>
      <span className="mt-0.5 block text-[11px] leading-tight text-ink-soft/55">{sub}</span>
    </button>
  )
}

function Pill({ active, onClick, children, dashed, auto }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
        auto ? '' : 'text-center'
      } ${dashed ? 'border-dashed' : ''} ${
        active
          ? 'border-kraft-600 bg-kraft-600 text-kraft-50'
          : 'border-kraft-300 bg-white text-ink-soft/75 hover:border-kraft-500 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
