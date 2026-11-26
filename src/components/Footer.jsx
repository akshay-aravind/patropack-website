import { whatsappLink } from '../lib/whatsapp'

// Product links open that product's size sheet in the order builder.
const columns = [
  {
    heading: 'Corrugated',
    links: [
      { label: 'RSC Cartons', href: '#/quote/rsc' },
      { label: 'Die-Cut Boxes', href: '#/quote/diecut' },
      { label: 'Printed Cartons', href: '#/quote/printed' },
      { label: 'Export Boxes', href: '#/quote/export' },
      { label: 'Sheets & Rolls', href: '#/quote/sheets' },
    ],
  },
  {
    heading: 'Retail & Food',
    links: [
      { label: 'Takeaway Food Boxes', href: '#/quote/takeaway' },
      { label: 'Bakery & Cake Boxes', href: '#/quote/bakery' },
      { label: 'Chocolate Boxes', href: '#/quote/chocolate' },
      { label: 'Perfume Boxes', href: '#/quote/cosmetics' },
      { label: 'Pizza Boxes', href: '#/quote/food' },
    ],
  },
  {
    heading: 'Flexible Packaging',
    links: [
      { label: 'Stand-Up Pouches', href: '#/quote/standup' },
      { label: 'Zipper Pouches', href: '#/quote/zipper' },
      { label: 'Vacuum Pouches', href: '#/quote/vacuum' },
      { label: 'Retort Pouches', href: '#/quote/retort' },
      { label: 'Flat Pouches', href: '#/quote/flat' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Specifications', href: '#specs' },
      { label: 'Industries', href: '#industries' },
      { label: 'Build an order', href: '#/quote' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-kraft-100/70">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5"> 
              <img
                src="/Logo.png"
                alt="PatroPack Logo"
                className="h-9 w-auto rounded-full"
              />
              <span className="font-display text-xl font-semibold text-white">
                Patro<span className="text-kraft-500">Pack</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Corrugated boxes, printed retail cartons and flexible pouch
              packaging for food, retail, e-commerce and export applications.
            </p>
            <div className="mt-6 flex gap-3">
              {['in', 'x', 'ig'].map((s) => (
                <a
                  key={s}
                  href="#top"
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-xs font-semibold uppercase text-kraft-200 ring-1 ring-inset ring-white/10 transition-colors hover:bg-kraft-600 hover:text-white"
                >
                  {s}
                </a>
              ))}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-kraft-200 ring-1 ring-inset ring-white/10 transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 005.71 1.454h.006c6.585 0 11.946-5.357 11.949-11.945a11.9 11.9 0 00-3.48-8.418" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-kraft-300">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm transition-colors hover:text-kraft-300">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} PatroPack. All rights reserved.</p>
          <p className="text-kraft-100/50">
            A Brand of INFINITY CART FZE LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
