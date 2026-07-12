// Minimal stroke icon set used across Industries and Why-Choose-Us.
const paths = {
  food: 'M4 10h16M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9M9 10V6a3 3 0 016 0v4',
  chip: 'M8 8h8v8H8zM4 9V6h3M17 4v3h3M20 15v3h-3M7 20v-3H4',
  cart: 'M3 4h2l2.4 11.2a1 1 0 001 .8h8.2a1 1 0 001-.8L20 7H6M9 20a1 1 0 100 .01M17 20a1 1 0 100 .01',
  brick: 'M3 8h18M3 8v8h18V8M3 16v3M12 8v8M21 16v3M7.5 12H3M21 12h-4.5M12 8V5',
  pill: 'M8.5 3.5l12 12a4.95 4.95 0 01-7 7l-12-12a4.95 4.95 0 017-7zM6 10l8 8',
  truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7M6.5 18a1.5 1.5 0 100 .01M17.5 18a1.5 1.5 0 100 .01',
  ruler: 'M4 14L14 4l6 6L10 20zM8 8l2 2M11 5l2 2M5 11l2 2',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  leaf: 'M4 20c8 2 16-4 16-16-8 0-14 2-16 8-1 3 0 6 2 8zM8 16c2-4 5-6 8-7',
  shield: 'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z M9 12l2 2 4-4',
  tag: 'M3 12l8-8h6a2 2 0 012 2v6l-8 8zM15 9a1 1 0 100 .01',
  people:
    'M8 11a3 3 0 100-6 3 3 0 000 6zM2 20a6 6 0 0112 0M17 11a3 3 0 100-6M16 20a6 6 0 00-1-3.3',
}

export default function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name] || paths.food} />
    </svg>
  )
}
