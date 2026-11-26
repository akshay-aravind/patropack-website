/**
 * Card-level CTA: opens the order builder with this product's size and
 * quantity sheet already open.
 */
export default function QuoteThisButton({ id, name, label = 'Choose size & quantity' }) {
  return (
    <a
      href={`#/quote/${id}`}
      aria-label={`Choose size and quantity for ${name}`}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-kraft-300 bg-white/70 px-4 py-2.5 text-xs font-semibold text-kraft-700 transition-all hover:border-kraft-600 hover:bg-kraft-600 hover:text-kraft-50"
    >
      {label}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}
