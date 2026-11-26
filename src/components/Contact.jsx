import { whatsappLink } from '../lib/whatsapp'
import QuoteForm from './QuoteForm'

const details = [
  { label: 'Email', value: 'info@patropack.com', href: 'mailto:info@patropack.com', icon: 'M3 6h18v12H3zM3 7l9 6 9-6' },
  { label: 'Phone', value: '+971 585 956 727', href: 'tel:+971585956727', icon: 'M4 5c0 8 7 15 15 15l2-4-5-2-2 2a12 12 0 01-6-6l2-2-2-5z' },
  { label: 'WhatsApp', value: 'Chat with us', href: whatsappLink(), icon: 'M20.5 3.5A11.9 11.9 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 012.2 12 9.8 9.8 0 0112 2.2 9.8 9.8 0 0121.8 12 9.8 9.8 0 0112 21.8z' },
  { label: 'Address', value: 'PatroPack, Infinity Cart FZE LLC, Sharjah, UAE', icon: 'M12 21s7-6.4 7-11a7 7 0 10-14 0c0 4.6 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-kraft-950 py-24 text-kraft-50 sm:py-32">
      <div className="flute-pattern pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-kraft-600/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        {/* left: pitch + details */}
        <div className="lg:sticky lg:top-28 lg:self-start">
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

        {/* right: quote builder */}
        <QuoteForm />
      </div>
    </section>
  )
}
