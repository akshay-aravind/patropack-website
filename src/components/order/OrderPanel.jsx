import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { productById } from '../../data/catalogue'
import { clearOrder, formatOrder, removeLine } from '../../lib/useOrder'
import { whatsappLink } from '../../lib/whatsapp'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMPTY = { name: '', company: '', email: '', phone: '', message: '' }

/**
 * The order list and the two ways to send it: an email request or WhatsApp.
 * Used as a sticky column on desktop and inside a bottom sheet on mobile.
 */
export default function OrderPanel({ lines, onBrowse }) {
  const [checkout, setCheckout] = useState(false)
  const [contact, setContact] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const field = (k) => (e) => setContact((p) => ({ ...p, [k]: e.target.value }))

  const valid = () => {
    if (!contact.name.trim()) {
      setError('Please add your name.')
      return false
    }
    if (!contact.email.trim() && !contact.phone.trim()) {
      setError('Add an email or phone number so we can send the quote.')
      return false
    }
    return true
  }

  const messageText = () =>
    [
      'Hi PatroPack, I’d like a quote for this order:',
      formatOrder(lines),
      [
        contact.name && `Name: ${contact.name}`,
        contact.company && `Company: ${contact.company}`,
        contact.email && `Email: ${contact.email}`,
        contact.phone && `Phone: ${contact.phone}`,
      ]
        .filter(Boolean)
        .join('\n'),
      contact.message && `Notes: ${contact.message}`,
    ]
      .filter(Boolean)
      .join('\n\n')

  const sendWhatsApp = () => {
    setError('')
    if (!valid()) return
    window.open(whatsappLink(messageText()), '_blank', 'noopener,noreferrer')
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!valid()) return
    setSending(true)

    const fd = new FormData()
    fd.append('access_key', ACCESS_KEY)
    fd.append('from_name', 'PatroPack')
    fd.append('subject', `Order request (${lines.length} item${lines.length === 1 ? '' : 's'}) — PatroPack website`)
    fd.append('name', contact.name)
    fd.append('email', contact.email)
    if (contact.phone) fd.append('phone', contact.phone)
    if (contact.company) fd.append('company', contact.company)
    fd.append('Order', formatOrder(lines))
    if (contact.message) fd.append('message', contact.message)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        clearOrder()
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  /* ── sent ─────────────────────────────────────────────────────────── */
  if (sent) {
    return (
      <Shell>
        <div className="flex flex-col items-center px-2 py-10 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-500 text-white">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold text-ink">
            Order request sent
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft/60">
            A specialist will come back within one business day with a spec,
            a sample offer and pricing.
          </p>
          <button
            type="button"
            onClick={() => { setSent(false); setCheckout(false); setContact(EMPTY) }}
            className="mt-5 text-sm font-semibold text-kraft-700 underline underline-offset-4 hover:text-kraft-900"
          >
            Start another order
          </button>
        </div>
      </Shell>
    )
  }

  /* ── empty ────────────────────────────────────────────────────────── */
  if (lines.length === 0) {
    return (
      <Shell>
        <Header count={0} />
        <div className="px-5 py-10 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-kraft-100 text-kraft-600">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" />
            </svg>
          </span>
          <p className="mt-3 text-sm text-ink-soft/60">
            Nothing added yet. Pick a product, choose a size and quantity, and
            it lands here.
          </p>
          {onBrowse && (
            <button
              type="button"
              onClick={onBrowse}
              className="mt-4 text-sm font-semibold text-kraft-700 underline underline-offset-4 hover:text-kraft-900"
            >
              Browse products
            </button>
          )}
        </div>
      </Shell>
    )
  }

  /* ── list + checkout ──────────────────────────────────────────────── */
  return (
    <Shell>
      <Header count={lines.length} />

      <ul data-lenis-prevent className="max-h-[22rem] divide-y divide-kraft-200 overflow-y-auto">
        <AnimatePresence initial={false}>
          {lines.map((l) => {
            const p = productById(l.productId)
            return (
              <motion.li
                key={l.key}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {p?.name || l.productId}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-soft/60">
                      {l.size} · {l.quantity} pcs
                    </p>
                    {Object.values(l.options || {}).filter((v) => v && v !== 'Not sure').length > 0 && (
                      <p className="mt-1 flex flex-wrap gap-1">
                        {Object.values(l.options)
                          .filter((v) => v && v !== 'Not sure')
                          .map((v) => (
                            <span key={v} className="rounded bg-kraft-100 px-1.5 py-0.5 text-[10px] font-medium text-kraft-700">
                              {v}
                            </span>
                          ))}
                      </p>
                    )}
                    {l.notes && (
                      <p className="mt-1 text-[11px] italic text-ink-soft/45">{l.notes}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(l.key)}
                    aria-label={`Remove ${p?.name || 'item'}`}
                    className="h-7 w-7 shrink-0 rounded-lg text-ink-soft/35 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      <div className="border-t border-kraft-200 p-5">
        <AnimatePresence initial={false} mode="wait">
          {!checkout ? (
            <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="w-full rounded-xl bg-kraft-600 px-6 py-3.5 text-sm font-semibold text-kraft-50 transition-colors hover:bg-kraft-700"
              >
                Continue to details
              </button>
              <button
                type="button"
                onClick={clearOrder}
                className="mt-2 w-full text-xs font-medium text-ink-soft/40 transition-colors hover:text-ink-soft/70"
              >
                Clear order
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="checkout"
              onSubmit={submit}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Name" value={contact.name} onChange={field('name')} placeholder="Your name" required autoComplete="name" />
                <Input label="Company" value={contact.company} onChange={field('company')} placeholder="Company" autoComplete="organization" />
                <Input label="Email" type="email" value={contact.email} onChange={field('email')} placeholder="you@company.com" autoComplete="email" />
                <Input label="Phone" type="tel" value={contact.phone} onChange={field('phone')} placeholder="+971 …" autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="order-notes" className="mb-1 block text-xs font-medium text-ink-soft/60">
                  Notes
                </label>
                <textarea
                  id="order-notes"
                  rows={2}
                  value={contact.message}
                  onChange={field('message')}
                  placeholder="Delivery location, artwork status, sample needed…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-kraft-600 px-6 py-3.5 text-sm font-semibold text-kraft-50 transition-colors hover:bg-kraft-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Sending…' : `Send order request (${lines.length})`}
              </button>
              <button
                type="button"
                onClick={sendWhatsApp}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#128C45] transition-colors hover:bg-[#25D366]/20"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 005.71 1.454h.006c6.585 0 11.946-5.357 11.949-11.945a11.9 11.9 0 00-3.48-8.418" />
                </svg>
                Send on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setCheckout(false)}
                className="w-full text-xs font-medium text-ink-soft/45 transition-colors hover:text-ink-soft/80"
              >
                Back to order
              </button>
              <p className="text-center text-[11px] text-ink-soft/40">
                Quote only — nothing is charged. We reply within one business day.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  )
}

/* ─────────────────────────────── pieces ─────────────────────────────── */

const inputCls =
  'w-full rounded-xl border border-kraft-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/35 focus:border-kraft-600 focus:outline-none focus:ring-2 focus:ring-kraft-500/25'

function Shell({ children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-kraft-200 bg-white shadow-sm">
      {children}
    </div>
  )
}

function Header({ count }) {
  return (
    <div className="flex items-center justify-between border-b border-kraft-200 px-5 py-4">
      <h2 className="font-display text-base font-semibold text-ink">Your order</h2>
      <span className="rounded-full bg-kraft-100 px-2.5 py-1 text-xs font-semibold text-kraft-700">
        {count} item{count === 1 ? '' : 's'}
      </span>
    </div>
  )
}

function Input({ label, type = 'text', value, onChange, placeholder, required, autoComplete }) {
  const id = `order-${label.toLowerCase()}`
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-ink-soft/60">
        {label}
        {required && <span className="text-kraft-600"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputCls}
      />
    </div>
  )
}
