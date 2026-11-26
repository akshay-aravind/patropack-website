import { useState } from 'react'
import { motion } from 'framer-motion'
import { whatsappLink } from '../lib/whatsapp'

// Web3Forms access key — get yours (free) at https://web3forms.com by entering
// the inbox that should receive submissions, then set VITE_WEB3FORMS_KEY in .env.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const EMPTY = { name: '', company: '', email: '', phone: '', message: '' }

/**
 * The short contact form on the home page: name, how to reach you, and what
 * you need — sent by email or handed to WhatsApp. Anyone who wants to pick
 * products, sizes and quantities goes to the order builder instead.
 */
export default function QuoteForm() {
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
      setError('Add an email or phone number so we can reply.')
      return false
    }
    return true
  }

  const messageText = () =>
    [
      'Hi PatroPack, I’d like a quote.',
      [
        contact.name && `Name: ${contact.name}`,
        contact.company && `Company: ${contact.company}`,
        contact.email && `Email: ${contact.email}`,
        contact.phone && `Phone: ${contact.phone}`,
      ]
        .filter(Boolean)
        .join('\n'),
      contact.message && `Requirement: ${contact.message}`,
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
    fd.append('subject', 'Quote request — PatroPack website')
    fd.append('name', contact.name)
    fd.append('email', contact.email)
    if (contact.phone) fd.append('phone', contact.phone)
    if (contact.company) fd.append('company', contact.company)
    if (contact.message) fd.append('message', contact.message)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      })
      const data = await res.json()
      if (data.success) setSent(true)
      else setError(data.message || 'Something went wrong. Please try again.')
    } catch {
      setError('Network error — please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-7"
    >
      {sent ? (
        <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-500 text-white">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold">
            Thanks — we've got it.
          </h3>
          <p className="mt-2 max-w-xs text-sm text-kraft-100/60">
            Our team will reach out within one business day.
          </p>
        </div>
      ) : (
        <>
          {/* the richer path, offered up front */}
          <a
            href="#/quote"
            className="group mb-6 flex items-center gap-3 rounded-2xl border border-kraft-400/30 bg-kraft-500/10 p-4 transition-colors hover:border-kraft-400/60 hover:bg-kraft-500/15"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-kraft-400/20 text-kraft-200">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-kraft-50">
                Know what you need? Build an order
              </span>
              <span className="mt-0.5 block text-xs text-kraft-100/55">
                Pick products, sizes and quantities — custom sizes welcome.
              </span>
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-kraft-300 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-kraft-100/35">
              or just send a message
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name" value={contact.name} onChange={field('name')} placeholder="Your name" required autoComplete="name" />
              <Field label="Company" value={contact.company} onChange={field('company')} placeholder="Company" autoComplete="organization" />
              <Field label="Email" type="email" value={contact.email} onChange={field('email')} placeholder="you@company.com" autoComplete="email" />
              <Field label="Phone" type="tel" value={contact.phone} onChange={field('phone')} placeholder="+971 …" autoComplete="tel" />
            </div>

            <div>
              <label htmlFor="q-message" className="mb-1.5 block text-xs font-medium text-kraft-100/60">
                What do you need?
              </label>
              <textarea
                id="q-message"
                rows={4}
                value={contact.message}
                onChange={field('message')}
                placeholder="e.g. 5,000 RSC boxes, 400×300×250mm, 5-ply BC flute, 2-colour print"
                className={`${inputCls} resize-none`}
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-center text-xs font-medium text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-kraft-500 px-6 py-3.5 text-sm font-semibold text-kraft-950 transition-colors hover:bg-kraft-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Sending…' : 'Request a Quote'}
            </button>

            <button
              type="button"
              onClick={sendWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/20"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 005.71 1.454h.006c6.585 0 11.946-5.357 11.949-11.945a11.9 11.9 0 00-3.48-8.418" />
              </svg>
              Send on WhatsApp
            </button>

            <p className="text-center text-[11px] text-kraft-100/35">
              We reply within one business day. No spam, ever.
            </p>
          </form>
        </>
      )}
    </motion.div>
  )
}

const inputCls =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-kraft-50 placeholder:text-kraft-100/25 focus:border-kraft-400 focus:outline-none focus:ring-2 focus:ring-kraft-500/30'

function Field({ label, type = 'text', value, onChange, placeholder, required, autoComplete }) {
  const id = `q-${label.toLowerCase()}`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-kraft-100/60">
        {label}
        {required && <span className="text-kraft-400"> *</span>}
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
