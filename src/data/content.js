export const products = [
  {
    id: 'rsc',
    image: '/products/rsc.jpg',
    name: 'Regular Slotted Cartons (RSC)',
    tag: 'Workhorse',
    desc: 'The industry-standard shipping box. All flaps are the same length, meeting at the centre for balanced strength and economical material use.',
    specs: ['3 / 5 / 7 Ply', 'B, C & BC Flute', 'Stock & custom sizes'],
  },
  {
    id: 'diecut',
    image: '/products/diecut.jpg',
    name: 'Die-Cut Boxes',
    tag: 'Precision',
    desc: 'Custom-cut on steel rule dies for a snug, tool-free fit. Ideal for retail, subscription and product-specific packaging.',
    specs: ['Bespoke shapes', 'Auto-lock base', 'Insert-ready'],
  },
  {
    id: 'printed',
    image: '/products/printed.jpg',
    name: 'Printed Cartons',
    tag: 'Branded',
    desc: 'High-fidelity flexo and litho-laminate printing that turns every parcel into a brand touchpoint on the shelf and the doorstep.',
    specs: ['Up to 6 colours', 'Litho lamination', 'Pantone matched'],
  },
  {
    id: 'export',
    image: '/products/export.jpg',
    name: 'Export Boxes',
    tag: 'Heavy-duty',
    desc: 'Engineered for long-haul freight and stacking — heavy BC-flute board, edge-crush tested and ISPM-15 compliant on request.',
    specs: ['7 Ply available', 'ECT tested', 'Sea-worthy'],
  },
  {
    id: 'sheets',
    image: '/products/sheets.jpg',
    name: 'Corrugated Sheets & Rolls',
    tag: 'Raw stock',
    desc: 'Flat sheets and continuous rolls for interleaving, layer pads and in-house converting — cut to your exact board grade.',
    specs: ['B / C / E / BC', 'Cut-to-size', 'Bulk supply'],
  },
  {
    id: 'food',
    image: '/products/bakery.jpg',
    name: 'Pizza & Bakery Boxes',
    tag: 'Food-grade',
    desc: 'Grease-resistant, food-safe board with vented designs that keep bakes crisp — printable for pizzerias, cafés and cloud kitchens.',
    specs: ['Food-safe liner', 'Vented lids', 'Custom print'],
  },
]

export const industries = [
  { name: 'Food & Beverage', icon: 'food' },
  { name: 'Electronics', icon: 'chip' },
  { name: 'FMCG', icon: 'cart' },
  { name: 'Construction', icon: 'brick' },
  { name: 'Pharmaceuticals', icon: 'pill' },
  { name: 'E-commerce', icon: 'truck' },
]

export const specs = [
  {
    label: 'Board Ply',
    value: '3 · 5 · 7',
    unit: 'Ply',
    note: 'Single, double and triple-wall construction for every load rating.',
  },
  {
    label: 'Flute Profiles',
    value: 'B · C · E · BC',
    unit: 'Flutes',
    note: 'From fine E-flute print surfaces to rugged BC double-wall.',
  },
  {
    label: 'Print',
    value: '6',
    unit: 'Colour',
    note: 'Flexo and litho-laminate, Pantone-matched to your brand.',
  },
  {
    label: 'Lead Time',
    value: '48',
    unit: 'Hours',
    note: 'Fast-track production on stock sizes and repeat orders.',
  },
]

export const whyChooseUs = [
  {
    title: 'Custom Sizes',
    desc: 'Any dimension, any style — engineered to your product, not the other way round.',
    icon: 'ruler',
  },
  {
    title: 'Fast Delivery',
    desc: 'Streamlined production and local logistics keep your line moving.',
    icon: 'bolt',
  },
  {
    title: 'Eco-Friendly',
    desc: '100% recyclable kraft board and water-based inks as standard.',
    icon: 'leaf',
  },
  {
    title: 'Quality Assurance',
    desc: 'Every batch burst-tested and ECT-verified before it leaves the floor.',
    icon: 'shield',
  },
  {
    title: 'Competitive Pricing',
    desc: 'Integrated manufacturing means fair pricing without cut corners.',
    icon: 'tag',
  },
  {
    title: 'Expert Support',
    desc: 'Structural designers on hand from first prototype to full run.',
    icon: 'people',
  },
]

export const stats = [
  { value: '100', label: 'Produced in-house', suffix: '%' },
  { value: '48', label: 'Sample turnaround', suffix: 'h' },
  { value: '100', label: 'Boxes — our low minimum' },
  { value: '6', label: 'Industries we serve' },
]

// ---------------------------------------------------------------------------
// Printed retail & food cartons — illustrated via PackArt (no photography).
// ---------------------------------------------------------------------------
export const retailBoxes = [
  {
    id: 'takeaway',
    shape: 'takeaway',
    name: 'Takeaway Food Boxes',
    tag: 'Food-grade',
    desc: 'Customised board boxes for cloud kitchens, restaurants and delivery brands — grease-resistant, leak-safe and printed with your identity on every panel.',
    specs: ['Food-safe board', 'Auto-lock base', 'Full-colour print'],
  },
  {
    id: 'bakery',
    shape: 'cake',
    name: 'Bakery & Cake Boxes',
    tag: 'Window-ready',
    desc: 'Cookie, pastry and cake boxes with clear windows and rigid bases that hold their shape from the counter to the customer doorstep.',
    specs: ['Clear window', 'Rigid base', 'Grease-resistant'],
  },
  {
    id: 'chocolate',
    shape: 'chocolate',
    name: 'Chocolate Boxes',
    tag: 'Premium',
    desc: 'Rigid and folding boxes for chocolate manufacturers — fitted inserts, foil stamping and soft-touch finishes that protect both the shape and the shelf appeal.',
    specs: ['Fitted inserts', 'Foil & emboss', 'Rigid or folding'],
  },
  {
    id: 'cosmetics',
    shape: 'perfume',
    name: 'Cosmetics & Perfume Boxes',
    tag: 'Luxury',
    desc: 'Mono cartons for perfume, skincare and colour cosmetics, built on premium board with tight tolerances so the bottle sits exactly where it should.',
    specs: ['Premium board', 'Spot UV & matt lam', 'Precision die-cut'],
  },
]

// ---------------------------------------------------------------------------
// Flexible packaging — pouch formats (structure) and end-uses (contents).
// ---------------------------------------------------------------------------
export const pouchFormats = [
  {
    id: 'standup',
    shape: 'standup',
    name: 'Stand-Up Pouches',
    tag: 'Shelf-ready',
    desc: 'Doypack-style pouches with a bottom gusset that stand unaided on shelf — the highest-impact format for retail packs.',
    specs: ['Bottom gusset', 'Matt / gloss finish', 'Up to 8 colours'],
  },
  {
    id: 'zipper',
    shape: 'zipper',
    name: 'Zipper Pouches',
    tag: 'Resealable',
    desc: 'Press-to-close zippers that let customers open and reseal the pack again and again without losing freshness.',
    specs: ['Press-lock zip', 'Tear notch', 'Reclose tested'],
  },
  {
    id: 'flat',
    shape: 'flat',
    name: 'Flat Pouches',
    tag: 'Economical',
    desc: 'Simple pillow and flat-bottom pouches for high-volume runs where cost per pack matters most.',
    specs: ['2 & 3-ply laminate', 'Roll or pouch form', 'High-speed fill'],
  },
  {
    id: 'threeside',
    shape: 'threeside',
    name: '3-Side Seal Pouches',
    tag: 'Sachet',
    desc: 'Sealed on three edges for sachets, samples and single-serve portions — accurate, compact and quick to fill.',
    specs: ['Single-serve', 'Sample sachets', 'Easy-tear notch'],
  },
  {
    id: 'vacuum',
    shape: 'vacuum',
    name: 'Vacuum Pouches',
    tag: 'Shelf-life',
    desc: 'High-barrier nylon structures that draw out air to keep meat, cheese and frozen goods fresh for far longer.',
    specs: ['Nylon / PE barrier', 'Freezer-safe', 'Puncture resistant'],
  },
  {
    id: 'retort',
    shape: 'retort',
    name: 'Retort Pouches',
    tag: 'Heat-stable',
    desc: 'Sterilisation-grade laminates that hold up to 121°C retort processing for ready meals, curries and sauces.',
    specs: ['121°C rated', 'Ready-meal grade', 'Aluminium barrier'],
  },
]

export const pouchApplications = [
  'Rice Packaging Bags',
  'Flour & Sugar Bags',
  'Spice & Masala Pouches',
  'Dry Fruit & Nut Pouches',
  'Snack & Chips Bags',
  'Biscuit Packaging',
  'Frozen-Food Bags',
  'Bakery Product Bags',
  'Candy & Chocolate Wrappers',
  'Coffee Packaging Bags',
  'Tea Packaging',
  'Pet-Food Bags',
]
