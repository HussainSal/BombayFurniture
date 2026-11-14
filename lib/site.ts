/**
 * Single source of truth for brand, contact details and customer promises.
 *
 * ⚠️  Everything in `promises` is shown to customers. Confirm each value with the
 *     business before launch — never advertise a warranty or delivery time you
 *     cannot honour.
 */
export const siteConfig = {
  name: "Bombay Furniture",
  shortName: "Bombay",
  legalName: "Bombay Furniture",
  tagline: "Sofa by day. Bed by night.",
  description:
    "Handcrafted sofa cum beds in the spirit of old Bombay — timeless design, made to order, converting from sofa to bed in seconds.",

  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || "+91 90000 00000",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919000000000",
    email: process.env.NEXT_PUBLIC_EMAIL || "hello@example.com",
    address: "Showroom address, Mumbai, Maharashtra — PIN",
    hours: "Mon – Sat · 10:30 am – 8:00 pm",
  },

  promises: {
    warrantyYears: 5,
    deliveryWindow: "7–14 days",
    deliveryNote: "Complimentary delivery & installation",
    emi: "Easy EMI options available",
  },
} as const;

export const navLinks = [
  { label: "Collection", href: "/shop" },
  { label: "Design Yours", href: "/configurator" },
  { label: "Our Story", href: "/about" },
  { label: "Visit Us", href: "/contact" },
] as const;
