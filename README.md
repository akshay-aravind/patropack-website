# PatroPack — Corrugated Packaging Website

A single-page marketing site for a corrugated-box manufacturer, built with React,
Tailwind CSS, GSAP (ScrollTrigger) and Framer Motion. The hero features a 3D
corrugated box that **unfolds as you scroll**, revealing the brand mark inside.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173 (or the next free port)
npm run build    # production build in /dist
npm run preview  # serve the production build
```

## Tech

| Concern            | Choice                                             |
| ------------------ | -------------------------------------------------- |
| Framework / build  | React 18 + Vite                                    |
| Styling            | Tailwind CSS (kraft-paper palette in `tailwind.config.js`) |
| Scroll unfold      | GSAP + ScrollTrigger, synced to Lenis smooth scroll |
| Section reveals    | Framer Motion                                      |
| Product & box art  | Hand-built inline SVG (no external images)         |

## Sections

Hero (scroll-to-unbox) · About + stats · Products · Board Specifications ·
Industries Served · Why Choose Us · Contact form · Footer.

## Where the (placeholder) content lives

All copy and data are dummy values for client review:

- **`src/data/content.js`** — products, industries, specs, stats, "why choose us".
- **`src/components/Contact.jsx`** — email / phone / address and the form. The
  form submits to [Web3Forms](https://web3forms.com), which emails each
  submission to your inbox. Set your access key in `.env` (see below).
- **`src/components/ProductArt.jsx`** — the SVG illustration per product. Swap
  for real product photography here if desired.
- Brand name/colours: `Navbar.jsx`, `Footer.jsx`, and `tailwind.config.js`.

## Contact form email (Web3Forms)

The contact form emails each submission to your inbox via Web3Forms — no backend needed.

1. Go to [web3forms.com](https://web3forms.com) and enter the inbox that should
   receive submissions (e.g. `sales.patropack@gmail.com`). They email you an
   **access key** instantly — no account required.
2. Open `.env` and replace `YOUR_ACCESS_KEY_HERE`:
   ```
   VITE_WEB3FORMS_KEY=your-real-access-key
   ```
3. Restart the dev server (`npm run dev`) so Vite picks up the new value, and for
   production make sure `VITE_WEB3FORMS_KEY` is set in your host's build env vars.

`.env` is gitignored; `.env.example` documents the variable. Free tier covers
250 submissions/month.

## WhatsApp contact

Visitors can reach the client on WhatsApp via `wa.me` click-to-chat deep links —
no API or account setup needed. Three entry points, all in `src/`:

- A **floating button** (bottom-right, site-wide) — `components/WhatsAppButton.jsx`.
- A **WhatsApp row** in the Contact section's details list.
- A **"Send via WhatsApp"** button under the quote form that pre-fills a message
  with whatever the visitor typed (name, company, email, phone, requirement).

Set the number once in **`src/lib/whatsapp.js`** (`WHATSAPP_NUMBER`, international
format, digits only — no `+`, spaces or dashes). Edit `DEFAULT_MESSAGE` there to
change the pre-filled greeting.

## Notes

- Respects `prefers-reduced-motion`: the box renders pre-opened and scroll
  choreography is skipped.
- Fully responsive; the 3D box scales down on small screens.
