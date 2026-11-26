import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PackArt from '../components/PackArt'
import Configurator from '../components/order/Configurator'
import OrderPanel from '../components/order/OrderPanel'
import { catalogue, categories, productById } from '../data/catalogue'
import { useOrder } from '../lib/useOrder'
import { whatsappLink } from '../lib/whatsapp'

/**
 * The order builder: browse every product, configure size and quantity, and
 * send the whole order as one request. Reached at #/quote (or #/quote/<id>,
 * which opens that product's configurator straight away).
 */
export default function QuotePage({ productId }) {
  const lines = useOrder()
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [configuring, setConfiguring] = useState(null)
  const [toast, setToast] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  // Deep link: #/quote/rsc opens the sheet for that product.
  useEffect(() => {
    if (!productId) return
    const product = productById(productId)
    if (product) {
      setCategory(product.category)
      setConfiguring(product)
    }
  }, [productId])

  useEffect(() => {
    window.scrollTo(0, 0)
    const previous = document.title
    document.title = 'Build your order | PatroPack'
    return () => {
      document.title = previous
    }
  }, [])

  // Closing a deep-linked sheet drops the product out of the URL, so a
  // refresh lands on the catalogue rather than reopening the sheet. Replace
  // rather than push, so Back still returns to wherever they came from.
  const closeConfigurator = () => {
    setConfiguring(null)
    if (window.location.hash.startsWith('#/quote/')) {
      window.history.replaceState(null, '', '#/quote')
    }
  }

  useEffect(() => {
    if (!toast) return undefined
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalogue.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.sizes.some((s) => `${s.label} ${s.detail}`.toLowerCase().includes(q))
      )
    })
  }, [category, query])

  const tabs = [{ id: 'all', label: 'All products' }, ...categories]

  return (
    <div className="min-h-screen bg-kraft-50">
      {/* ── slim app header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-kraft-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <img src="/Logo.png" alt="PatroPack" className="h-8 w-auto rounded-full" />
            <span className="hidden font-display text-lg font-semibold text-ink sm:block">
              PatroPack
            </span>
          </a>

          <span className="hidden h-5 w-px bg-kraft-200 sm:block" />
          <span className="hidden text-sm font-medium text-ink-soft/60 sm:block">
            Order builder
          </span>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-kraft-300 px-3.5 py-2 text-sm font-semibold text-ink-soft/75 transition-colors hover:border-kraft-500 hover:text-ink sm:flex"
            >
              Ask a question
            </a>
            <a
              href="#top"
              className="rounded-xl px-3 py-2 text-sm font-medium text-ink-soft/60 transition-colors hover:text-ink"
            >
              ← Back to site
            </a>
          </div>
        </div>
      </header>

      {/* ── title + filters ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          Build your order
        </h1>
        <p className="mt-2 max-w-xl text-base text-ink-soft/65">
          Pick what you need, choose a size — or give us your own — and send the
          whole list in one request. No prices online: every job is quoted to
          your spec.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setCategory(t.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  category === t.id
                    ? 'bg-kraft-600 text-kraft-50'
                    : 'bg-white text-ink-soft/65 ring-1 ring-inset ring-kraft-200 hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative sm:ml-auto sm:w-64">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or sizes"
              aria-label="Search products"
              className="w-full rounded-full border border-kraft-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/35 focus:border-kraft-500 focus:outline-none focus:ring-2 focus:ring-kraft-500/20"
            />
          </div>
        </div>
      </div>

      {/* ── grid + order column ─────────────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-32 pt-8 sm:px-6 lg:grid-cols-[1fr_22rem] lg:pb-20">
        <div>
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-kraft-300 bg-white/60 px-6 py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                Nothing matches "{query}"
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft/60">
                We make far more than we list here. Tell our team what you need
                and they'll come back with options, a spec and a price.
              </p>
              <a
                href={whatsappLink(
                  `Hi PatroPack, I'm looking for "${query}" — is that something you make?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-kraft-600 px-5 py-3 text-sm font-semibold text-kraft-50 transition-colors hover:bg-kraft-700"
              >
                Ask the team about this
              </a>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <Card
                  key={p.id}
                  product={p}
                  count={lines.filter((l) => l.productId === p.id).length}
                  onClick={() => setConfiguring(p)}
                />
              ))}
            </div>
          )}

          {/* always-present escape hatch for unlisted packaging */}
          <div className="mt-6 rounded-2xl border border-dashed border-kraft-300 bg-white/60 p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-ink">
              Can't find your packaging?
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft/65">
              This list covers what we're asked for most — it isn't everything
              we make. Describe the pack you have in mind and our team will come
              back with options, a spec and a price within one business day.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={whatsappLink(
                  "Hi PatroPack, I need a packaging type that isn't listed on your site. Can you help?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 005.71 1.454h.006c6.585 0 11.946-5.357 11.949-11.945a11.9 11.9 0 00-3.48-8.418" />
                </svg>
                Message the team
              </a>
              <a
                href="mailto:info@patropack.com?subject=Custom%20packaging%20enquiry"
                className="inline-flex items-center gap-2 rounded-xl border border-kraft-300 px-4 py-2.5 text-sm font-semibold text-ink-soft/75 transition-colors hover:border-kraft-500 hover:text-ink"
              >
                Email info@patropack.com
              </a>
            </div>
          </div>
        </div>

        {/* desktop order column */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <OrderPanel lines={lines} />
          </div>
        </aside>
      </div>

      {/* ── mobile order bar + sheet ────────────────────────────────── */}
      <AnimatePresence>
        {lines.length > 0 && !cartOpen && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-kraft-200 bg-white/95 p-3 backdrop-blur lg:hidden"
          >
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex w-full items-center justify-between rounded-xl bg-kraft-600 px-5 py-3.5 text-sm font-semibold text-kraft-50"
            >
              <span>
                {lines.length} item{lines.length === 1 ? '' : 's'} in your order
              </span>
              <span className="flex items-center gap-1.5">
                Review
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 flex items-end bg-ink/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-kraft-50 p-3 pb-6"
              data-lenis-prevent
            >
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mx-auto mb-3 block h-1.5 w-12 rounded-full bg-kraft-300"
                aria-label="Close order"
              />
              <OrderPanel lines={lines} onBrowse={() => setCartOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── configurator ────────────────────────────────────────────── */}
      {configuring && (
        <Configurator
          product={configuring}
          onClose={closeConfigurator}
          onAdded={(p) => setToast(`${p.name} added to your order`)}
        />
      )}

      {/* ── toast ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            role="status"
            className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-kraft-50 shadow-lg lg:bottom-8"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────── card ─────────────────────────────── */

function Card({ product, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-kraft-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-kraft-400 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-kraft-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PackArt shape={product.art} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-kraft-100 backdrop-blur-sm">
          {product.tag}
        </span>
        {count > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-leaf-500 px-2.5 py-1 text-[10px] font-bold text-white">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {count} added
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-ink-soft/60">
          {product.blurb}
        </p>

        <div className="mt-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-kraft-600">
            {product.sizeLabel}
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {product.sizes.slice(0, 3).map((s) => (
              <span key={s.id} className="rounded bg-kraft-100 px-1.5 py-0.5 text-[10px] font-medium text-kraft-700">
                {s.label}
              </span>
            ))}
            <span className="rounded border border-dashed border-kraft-300 px-1.5 py-0.5 text-[10px] font-medium text-kraft-600">
              + custom
            </span>
          </div>
        </div>

        <span className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-kraft-100 py-2.5 text-xs font-semibold text-kraft-700 transition-colors group-hover:bg-kraft-600 group-hover:text-kraft-50">
          Choose size & quantity
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </button>
  )
}
