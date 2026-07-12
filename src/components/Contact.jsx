import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { whatsappLink } from '../lib/whatsapp'

const details = [
  { label: 'Email', value: 'sales.patropack@gmail.com', href: 'mailto:sales.patropack@gmail.com', icon: 'M3 6h18v12H3zM3 7l9 6 9-6' },
  { label: 'Phone', value: '+971 585 956 727', href: 'tel:+971585956727', icon: 'M4 5c0 8 7 15 15 15l2-4-5-2-2 2a12 12 0 01-6-6l2-2-2-5z' },
  { label: 'WhatsApp', value: 'Chat with us', href: whatsappLink(), icon: 'M20.5 3.5A11.9 11.9 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 012.2 12 9.8 9.8 0 0112 2.2 9.8 9.8 0 0121.8 12 9.8 9.8 0 0112 21.8z' },
  { label: 'Address', value: 'Infinity Cart FZE LLC, Sharjah, UAE', icon: 'M12 21s7-6.4 7-11a7 7 0 10-14 0c0 4.6 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
]

// Web3Forms access key — get yours (free) at https://web3forms.com by entering
// the inbox that should receive submissions, then set VITE_WEB3FORMS_KEY in .env.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  // Compose the filled form fields into a WhatsApp message and open the chat.
  const sendViaWhatsApp = () => {
    const f = formRef.current
    if (!f) return
    const get = (name) => f.elements[name]?.value.trim()
    const lines = [
      'Hi PatroPack, I’d like a quote.',
      '',
      get('name') && `Name: ${get('name')}`,
      get('company') && `Company: ${get('company')}`,
      get('email') && `Email: ${get('email')}`,
      get('phone') && `Phone: ${get('phone')}`,
      get('message') && `Requirement: ${get('message')}`,
    ].filter(Boolean)
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)

    const formData = new FormData(e.target)
    formData.append('access_key', ACCESS_KEY)
    formData.append('subject', 'New quote request — PatroPack website')
    formData.append('from_name', 'PatroPack')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-kraft-950 py-24 text-kraft-50 sm:py-32">
      <div className="flute-pattern pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-kraft-600/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        {/* left: pitch + details */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-kraft-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-kraft-200">
            <span className="h-1.5 w-1.5 rounded-full bg-kraft-400" />
            Get in touch
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl">
            Let's build the right box for your product.
          </h2>
          <p className="mt-4 max-w-md text-lg text-kraft-100/70">
            Send us your dimensions, quantities and board grade — or just your
            product. We'll come back with a spec, a sample and a quote.
          </p>

          <div className="mt-10 space-y-5">
            {details.map((d) => {
              const isWhatsApp = d.label === 'WhatsApp'
              const Wrapper = d.href ? 'a' : 'div'
              const wrapperProps = d.href
                ? {
                    href: d.href,
                    ...(isWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                  }
                : {}
              return (
                <Wrapper
                  key={d.label}
                  {...wrapperProps}
                  className={`flex items-center gap-4 ${d.href ? 'group transition-opacity hover:opacity-90' : ''}`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset ring-white/10 ${
                      isWhatsApp ? 'bg-[#25D366]/15 text-[#25D366]' : 'bg-white/[0.06] text-kraft-200'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={d.icon} />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-kraft-400">
                      {d.label}
                    </div>
                    <div className={`text-base font-medium ${d.href ? 'text-kraft-50 group-hover:underline' : 'text-kraft-50'}`}>
                      {d.value}
                    </div>
                  </div>
                </Wrapper>
              )
            })}
          </div>
        </div>

        {/* right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-8"
        >
          {sent ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf-500 text-white">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">
                Thanks — we've got it.
              </h3>
              <p className="mt-2 max-w-xs text-kraft-100/70">
                Our team will reach out within one business day.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" required />
                <Field label="Company" name="company" placeholder="Company" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                <Field label="Phone" name="phone" placeholder="+971 …" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-kraft-100/80">
                  What do you need?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="e.g. 5,000 RSC boxes, 400×300×250mm, 5-ply BC flute, 2-colour print"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-kraft-50 placeholder:text-kraft-100/30 focus:border-kraft-400 focus:outline-none focus:ring-2 focus:ring-kraft-500/40"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-kraft-500 px-6 py-3.5 text-sm font-semibold text-kraft-950 shadow-sm transition-all hover:bg-kraft-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Sending…' : 'Request a Quote'}
              </button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-wider text-kraft-100/40">or</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={sendViaWhatsApp}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 005.71 1.454h.006c6.585 0 11.946-5.357 11.949-11.945a11.9 11.9 0 00-3.48-8.418" />
                </svg>
                Send via WhatsApp
              </button>

              {error && (
                <p className="text-center text-xs font-medium text-red-300">
                  {error}
                </p>
              )}
              <p className="text-center text-xs text-kraft-100/40">
                We reply within one business day. No spam, ever.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-kraft-100/80">
        {label}
        {required && <span className="text-kraft-400"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-kraft-50 placeholder:text-kraft-100/30 focus:border-kraft-400 focus:outline-none focus:ring-2 focus:ring-kraft-500/40"
      />
    </div>
  )
}
