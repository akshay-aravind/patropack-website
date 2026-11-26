// ---------------------------------------------------------------------------
// Order-builder catalogue.
//
// ⚠️ SIZES AND OPTIONS BELOW ARE STARTING POINTS — confirm them with the
// production floor before launch. Everything a customer can choose lives in
// this one file, so edits here flow through the whole quote page.
//
// Every product also accepts a custom size, so this list never has to be
// exhaustive: it only needs to cover the sizes people ask for most.
// ---------------------------------------------------------------------------

export const categories = [
  { id: 'boxes', label: 'Corrugated boxes', blurb: 'Shippers, mailers, export and raw board' },
  { id: 'retail', label: 'Retail & food', blurb: 'Printed cartons for shelf and delivery' },
  { id: 'pouches', label: 'Flexible pouches', blurb: 'Laminates, zippers, vacuum and retort' },
]

// Quantity tiers. 100 is our stated minimum order.
export const quantityTiers = ['100', '250', '500', '1,000', '2,500', '5,000', '10,000+']

const BOARD = {
  id: 'board',
  label: 'Board',
  choices: ['3-ply', '5-ply', '7-ply', 'Not sure'],
}
const BOX_PRINT = {
  id: 'print',
  label: 'Print',
  choices: ['Plain kraft', '1–2 colour', 'Full colour', 'Not sure'],
}
const POUCH_FINISH = {
  id: 'finish',
  label: 'Finish',
  choices: ['Matt', 'Gloss', 'Metallised', 'Not sure'],
}
const POUCH_PRINT = {
  id: 'print',
  label: 'Print',
  choices: ['Up to 4 colour', 'Up to 8 colour', 'Plain / unprinted', 'Not sure'],
}

export const catalogue = [
  /* ── corrugated boxes ───────────────────────────────────────────── */
  {
    id: 'rsc',
    category: 'boxes',
    name: 'Regular Slotted Cartons',
    tag: 'Workhorse',
    image: '/products/rsc.jpg',
    blurb: 'The industry-standard shipping box — balanced strength, economical board use.',
    sizeLabel: 'Size (L × W × H)',
    sizes: [
      { id: 'rsc-s', label: 'Small', detail: '250 × 200 × 150 mm' },
      { id: 'rsc-m', label: 'Medium', detail: '400 × 300 × 250 mm' },
      { id: 'rsc-l', label: 'Large', detail: '500 × 400 × 300 mm' },
      { id: 'rsc-xl', label: 'Extra large', detail: '600 × 400 × 400 mm' },
    ],
    options: [BOARD, BOX_PRINT],
  },
  {
    id: 'diecut',
    category: 'boxes',
    name: 'Die-Cut Boxes',
    tag: 'Precision',
    image: '/products/diecut.jpg',
    blurb: 'Custom-cut for a snug, tool-free fit. Retail, subscription and e-commerce.',
    sizeLabel: 'Size (L × W × H)',
    sizes: [
      { id: 'dc-s', label: 'Mailer S', detail: '220 × 160 × 60 mm' },
      { id: 'dc-m', label: 'Mailer M', detail: '300 × 220 × 80 mm' },
      { id: 'dc-l', label: 'Mailer L', detail: '400 × 300 × 100 mm' },
    ],
    options: [BOARD, BOX_PRINT],
  },
  {
    id: 'printed',
    category: 'boxes',
    name: 'Printed Cartons',
    tag: 'Branded',
    image: '/products/printed.jpg',
    blurb: 'Flexo and litho-laminate printing, Pantone-matched to your brand.',
    sizeLabel: 'Size (L × W × H)',
    sizes: [
      { id: 'pr-s', label: 'Small', detail: '200 × 150 × 100 mm' },
      { id: 'pr-m', label: 'Medium', detail: '300 × 200 × 150 mm' },
      { id: 'pr-l', label: 'Large', detail: '450 × 300 × 200 mm' },
    ],
    options: [
      BOARD,
      { id: 'print', label: 'Print', choices: ['1–2 colour', '3–4 colour', 'Up to 6 colour', 'Litho laminate'] },
    ],
  },
  {
    id: 'export',
    category: 'boxes',
    name: 'Export Boxes',
    tag: 'Heavy-duty',
    image: '/products/export.jpg',
    blurb: 'Heavy BC-flute board, edge-crush tested, ISPM-15 compliant on request.',
    sizeLabel: 'Size (L × W × H)',
    sizes: [
      { id: 'ex-m', label: 'Standard', detail: '600 × 400 × 400 mm' },
      { id: 'ex-l', label: 'Large', detail: '800 × 600 × 600 mm' },
    ],
    options: [
      { id: 'board', label: 'Board', choices: ['5-ply BC', '7-ply', 'Not sure'] },
      { id: 'treatment', label: 'Treatment', choices: ['Standard', 'ISPM-15', 'Water-resistant', 'Not sure'] },
    ],
  },
  {
    id: 'sheets',
    category: 'boxes',
    name: 'Corrugated Sheets & Rolls',
    tag: 'Raw stock',
    image: '/products/sheets.jpg',
    blurb: 'Flat sheets and rolls for interleaving, layer pads and in-house converting.',
    sizeLabel: 'Sheet size',
    sizes: [
      { id: 'sh-pad', label: 'Layer pad', detail: '1200 × 800 mm' },
      { id: 'sh-std', label: 'Sheet', detail: '1000 × 700 mm' },
      { id: 'sh-roll', label: 'Roll', detail: 'Cut to your width' },
    ],
    options: [
      { id: 'flute', label: 'Flute', choices: ['B', 'C', 'E', 'BC', 'Not sure'] },
    ],
  },
  {
    id: 'food',
    category: 'boxes',
    name: 'Pizza & Bakery Boxes',
    tag: 'Food-grade',
    image: '/products/bakery.jpg',
    blurb: 'Grease-resistant, food-safe board with vented designs that keep bakes crisp.',
    sizeLabel: 'Pizza size',
    sizes: [
      { id: 'pz-8', label: '8 inch', detail: '205 × 205 × 40 mm' },
      { id: 'pz-10', label: '10 inch', detail: '255 × 255 × 40 mm' },
      { id: 'pz-12', label: '12 inch', detail: '305 × 305 × 40 mm' },
      { id: 'pz-16', label: '16 inch', detail: '405 × 405 × 45 mm' },
    ],
    options: [BOX_PRINT],
  },

  /* ── retail & food cartons ──────────────────────────────────────── */
  {
    id: 'takeaway',
    category: 'retail',
    name: 'Takeaway Food Boxes',
    tag: 'Food-grade',
    image: '/products/takeaway.jpg',
    blurb: 'Grease-resistant, leak-safe boxes for cloud kitchens and delivery brands.',
    sizeLabel: 'Capacity',
    sizes: [
      { id: 'tk-500', label: '500 ml', detail: 'Single portion' },
      { id: 'tk-750', label: '750 ml', detail: 'Main course' },
      { id: 'tk-1000', label: '1000 ml', detail: 'Sharing / family' },
    ],
    options: [
      { id: 'print', label: 'Print', choices: ['Plain', '1–2 colour', 'Full colour'] },
      { id: 'window', label: 'Window', choices: ['No window', 'Clear window'] },
    ],
  },
  {
    id: 'bakery',
    category: 'retail',
    name: 'Bakery & Cake Boxes',
    tag: 'Window-ready',
    image: '/products/bakery-cake.jpg',
    blurb: 'Cookie, pastry and cake boxes with clear windows and rigid bases.',
    sizeLabel: 'Cake size',
    sizes: [
      { id: 'bk-500', label: '0.5 kg', detail: '180 × 180 × 100 mm' },
      { id: 'bk-1000', label: '1 kg', detail: '220 × 220 × 110 mm' },
      { id: 'bk-2000', label: '2 kg', detail: '280 × 280 × 120 mm' },
    ],
    options: [
      { id: 'window', label: 'Window', choices: ['Clear window', 'No window'] },
      { id: 'print', label: 'Print', choices: ['Plain', '1–2 colour', 'Full colour'] },
    ],
  },
  {
    id: 'chocolate',
    category: 'retail',
    name: 'Chocolate Boxes',
    tag: 'Premium',
    image: '/products/chocolate.jpg',
    blurb: 'Rigid and folding boxes with fitted inserts, foil stamping and soft-touch finishes.',
    sizeLabel: 'Cavities',
    sizes: [
      { id: 'ch-9', label: '9 piece', detail: '3 × 3 insert' },
      { id: 'ch-16', label: '16 piece', detail: '4 × 4 insert' },
      { id: 'ch-24', label: '24 piece', detail: '6 × 4 insert' },
    ],
    options: [
      { id: 'style', label: 'Style', choices: ['Rigid', 'Folding', 'Not sure'] },
      { id: 'finish', label: 'Finish', choices: ['Matt lamination', 'Gold foil', 'Emboss', 'Soft touch'] },
    ],
  },
  {
    id: 'cosmetics',
    category: 'retail',
    name: 'Cosmetics & Perfume Boxes',
    tag: 'Luxury',
    image: '/products/cosmetics.jpg',
    blurb: 'Mono cartons on premium board with tight tolerances for bottles and jars.',
    sizeLabel: 'Bottle size',
    sizes: [
      { id: 'cs-30', label: '30 ml', detail: 'Compact carton' },
      { id: 'cs-50', label: '50 ml', detail: 'Standard carton' },
      { id: 'cs-100', label: '100 ml', detail: 'Tall carton' },
    ],
    options: [
      { id: 'finish', label: 'Finish', choices: ['Matt lamination', 'Spot UV', 'Foil stamp', 'Emboss'] },
      { id: 'insert', label: 'Insert', choices: ['No insert', 'Board insert', 'Foam insert'] },
    ],
  },

  /* ── flexible pouches ───────────────────────────────────────────── */
  {
    id: 'standup',
    category: 'pouches',
    name: 'Stand-Up Pouches',
    tag: 'Shelf-ready',
    art: 'standup',
    blurb: 'Doypack-style pouches with a bottom gusset that stand unaided on shelf.',
    sizeLabel: 'Fill weight',
    sizes: [
      { id: 'su-100', label: '100 g', detail: '110 × 180 mm' },
      { id: 'su-250', label: '250 g', detail: '140 × 230 mm' },
      { id: 'su-500', label: '500 g', detail: '160 × 270 mm' },
      { id: 'su-1000', label: '1 kg', detail: '200 × 300 mm' },
    ],
    options: [POUCH_FINISH, POUCH_PRINT, { id: 'zip', label: 'Zipper', choices: ['No zipper', 'Press-lock zipper'] }],
  },
  {
    id: 'zipper',
    category: 'pouches',
    name: 'Zipper Pouches',
    tag: 'Resealable',
    art: 'zipper',
    blurb: 'Press-to-close zippers that open and reseal without losing freshness.',
    sizeLabel: 'Fill weight',
    sizes: [
      { id: 'zp-250', label: '250 g', detail: '140 × 230 mm' },
      { id: 'zp-500', label: '500 g', detail: '160 × 270 mm' },
      { id: 'zp-1000', label: '1 kg', detail: '200 × 300 mm' },
    ],
    options: [POUCH_FINISH, POUCH_PRINT],
  },
  {
    id: 'flat',
    category: 'pouches',
    name: 'Flat Pouches',
    tag: 'Economical',
    art: 'flat',
    blurb: 'Pillow and flat-bottom pouches for high-volume runs where cost per pack matters.',
    sizeLabel: 'Fill weight',
    sizes: [
      { id: 'fp-100', label: '100 g', detail: '100 × 160 mm' },
      { id: 'fp-250', label: '250 g', detail: '130 × 200 mm' },
      { id: 'fp-500', label: '500 g', detail: '150 × 250 mm' },
    ],
    options: [POUCH_FINISH, POUCH_PRINT],
  },
  {
    id: 'threeside',
    category: 'pouches',
    name: '3-Side Seal Pouches',
    tag: 'Sachet',
    art: 'threeside',
    blurb: 'Sealed on three edges for sachets, samples and single-serve portions.',
    sizeLabel: 'Fill weight',
    sizes: [
      { id: 'ts-5', label: '5 g', detail: '50 × 70 mm' },
      { id: 'ts-10', label: '10 g', detail: '60 × 90 mm' },
      { id: 'ts-50', label: '50 g', detail: '90 × 140 mm' },
    ],
    options: [POUCH_PRINT, { id: 'notch', label: 'Tear notch', choices: ['Easy-tear notch', 'No notch'] }],
  },
  {
    id: 'vacuum',
    category: 'pouches',
    name: 'Vacuum Pouches',
    tag: 'Shelf-life',
    art: 'vacuum',
    blurb: 'High-barrier nylon structures that keep meat, cheese and frozen goods fresh.',
    sizeLabel: 'Bag size',
    sizes: [
      { id: 'vc-s', label: 'Small', detail: '150 × 250 mm' },
      { id: 'vc-m', label: 'Medium', detail: '200 × 300 mm' },
      { id: 'vc-l', label: 'Large', detail: '250 × 350 mm' },
    ],
    options: [
      { id: 'gauge', label: 'Gauge', choices: ['70 micron', '90 micron', '120 micron', 'Not sure'] },
    ],
  },
  {
    id: 'retort',
    category: 'pouches',
    name: 'Retort Pouches',
    tag: 'Heat-stable',
    art: 'retort',
    blurb: 'Sterilisation-grade laminates rated to 121 °C for ready meals and sauces.',
    sizeLabel: 'Fill weight',
    sizes: [
      { id: 'rt-150', label: '150 g', detail: '120 × 170 mm' },
      { id: 'rt-300', label: '300 g', detail: '150 × 220 mm' },
      { id: 'rt-500', label: '500 g', detail: '170 × 250 mm' },
    ],
    options: [
      { id: 'barrier', label: 'Barrier', choices: ['Aluminium', 'Transparent high-barrier', 'Not sure'] },
      POUCH_PRINT,
    ],
  },
]

export const CUSTOM_SIZE = 'custom'

export function productById(id) {
  return catalogue.find((p) => p.id === id)
}

export function productsIn(categoryId) {
  return catalogue.filter((p) => p.category === categoryId)
}
