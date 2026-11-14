# CLAUDE.md — Bombay Furniture site

Storefront for a sofa cum bed business. Next.js 15 App Router · React 19 · TS · Tailwind 3 ·
lucide-react. **npm**. `npm run build` is the gate (no tests).

Design language: "Bombay Deco" — ivory paper, bottle green (`primary`), brass, oxblood;
Playfair Display (`font-serif`) + Jost (`font-sans`); arches (`.arch`), double-rule frames
(`.frame`), `<Ornament />` dividers, Roman numerals. Light theme only, by design.

```
app/                 routes, metadata, sitemap, robots, OG image, /api/enquiry
assets/images/       placeholder photography (imported via lib/images.ts)
components/
  layout/            TopBar · Navbar (client: mobile menu only) · Footer
  sections/          home-page sections — all server components
  pages/             *PageContent — body of each route
  product/           ProductGallery · PurchasePanel (client islands)
  ui/                Emblem · Logo · Seal · Ornament · SofaDrawing · ProductCard · Modal · EnquiryForm …
lib/                 site.ts (brand + promises) · products.ts · images.ts · configurator.ts · faq.ts · utils.ts
```

## Hard rules

1. **Performance:** server components by default; add `"use client"` only for real interactivity.
   No animation libraries, no `filter: blur`, no `backdrop-filter`, no infinite animations.
   Motion = CSS `.rise` (hero entrance) and `.reveal` (scroll-driven, no JS).
2. Images via `next/image` with static imports from `lib/images.ts` and a correct `sizes`;
   only the hero / first visible image gets `priority`.
3. `metadata` only in server components.
4. Customer-facing promises come from `siteConfig.promises`; prices from `lib/products.ts` /
   `lib/configurator.ts`. Never hard-code them.
5. Never hard-code the domain — use `siteConfig.url`. Never prefix a secret with `NEXT_PUBLIC_`.
6. Every new route goes in `app/sitemap.ts`.
7. Use theme tokens (`bg-background`, `text-primary`, `text-brass-ink`, `border-border`) — never raw colours.
8. Don't publish fake reviews, ratings, customer counts or certifications.
9. **Mobile first — ~75% of visitors are on phones.** Check every change at 360px and 390px:
   no horizontal overflow; tap targets ≥ 44px (`min-h-11`); text ≥ 11px; form fields ≥ 16px
   (`.field`) so iOS doesn't zoom; product grids stay 2-up on phones. Sticky mobile bars carry
   `data-mobile-bar` (hides the floating chat button, pads the footer) and respect
   `env(safe-area-inset-bottom)`. Size touch-only affordances with `[@media(pointer:fine)]`, not breakpoints.
