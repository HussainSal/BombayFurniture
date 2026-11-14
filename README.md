# Bombay Furniture — sofa cum bed storefront

Marketing site, catalogue and configurator for a sofa cum bed business.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3. Mobile-first and responsive.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your WhatsApp number, phone, email
npm run dev                  # http://localhost:3000
npm run build                # the real check — run before every deploy
```

## Before launch — replace the placeholders

| What | Where |
|---|---|
| Address, hours, tagline | `lib/site.ts` |
| **Warranty years, delivery window, EMI wording** | `lib/site.ts` → `promises` (shown to customers — must be true) |
| WhatsApp number, phone, email, site URL | `.env.local` (see `.env.example`) |
| Products, prices, MRPs, dimensions | `lib/products.ts` |
| Configurator prices | `lib/configurator.ts` |
| FAQ answers | `lib/faq.ts` |
| **Photography** | `assets/images/` + `lib/images.ts` (see below) |
| Craft claims ("seasoned hardwood", "HR foam") | `components/sections/HeritageSection.tsx` |

## Photography

The photos in `assets/images/` are **placeholders from Unsplash** (free for commercial use)
and do not show your products. Replace them with your own shoots: drop the new files into
`assets/images/` and point the imports in `lib/images.ts` at them. `next/image` resizes,
converts to AVIF/WebP and lazy-loads everything automatically — upload originals around
2000 px wide.

## Enquiries (leads)

Forms post to `/api/enquiry`. Set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and
`ENQUIRY_FROM_EMAIL` to receive every lead by email (via [Resend](https://resend.com)).
Without them, leads are **only written to the server log** — configure email before launch.

## Mobile

Designed phone-first and audited with Chrome device emulation at 360, 390, 768 and 1024 px:
no horizontal scrolling on any page, all tap targets at least 44 px, inputs at 16 px (no iOS
zoom), two-column product grids, a swipeable product gallery, a sticky "Enquire" bar on
product pages and a sticky running total in the configurator. Fixed bars respect the
iPhone home indicator.

## Performance

- Pages are server-rendered; only the navbar menu, shop filters, product gallery/colour
  picker, configurator and enquiry forms ship JavaScript.
- No animation library. Entrance and scroll-reveal effects are pure CSS
  (scroll-driven animations), and all motion is disabled for `prefers-reduced-motion`.
- No blur filters, `backdrop-filter` or infinite animations — these were the cause of
  scroll jank on phones in the first version.
