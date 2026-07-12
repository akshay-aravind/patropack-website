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
