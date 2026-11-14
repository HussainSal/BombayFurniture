import Link from "next/link";
import Emblem from "@/components/ui/Emblem";
import Logo from "@/components/ui/Logo";
import { Ornament } from "@/components/ui/Ornament";
import { siteConfig } from "@/lib/site";
import { telLink } from "@/lib/utils";

const columns = {
  Collection: [
    { label: "All sofa cum beds", href: "/shop" },
    { label: "Single chair beds", href: "/shop?seats=1" },
    { label: "Two-seaters", href: "/shop?seats=2" },
    { label: "Three-seaters", href: "/shop?seats=3" },
    { label: "With storage", href: "/shop?storage=1" },
  ],
  House: [
    { label: "Design your own", href: "/configurator" },
    { label: "Our story", href: "/about" },
    { label: "How it converts", href: "/#how-it-converts" },
    { label: "Questions", href: "/#faq" },
    { label: "Visit us", href: "/contact" },
  ],
};

export default function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-forest text-ivory">
      <Emblem
        className="pointer-events-none absolute -bottom-16 -right-10 h-[420px] w-[340px] text-brass-light opacity-[0.07]"
        monogramClassName="fill-brass-light"
      />

      <div className="container-page relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ivory/70">{siteConfig.description}</p>
          </div>

          {Object.entries(columns).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-brass-light">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[15px] text-ivory/75 transition-colors hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-brass-light">The Showroom</h3>
            <address className="space-y-2 text-[15px] not-italic leading-relaxed text-ivory/75">
              <p>{contact.address}</p>
              <p>{contact.hours}</p>
              <p>
                <a href={telLink()} className="hover:text-ivory">
                  {contact.phone}
                </a>
                <span className="mx-2 text-brass-light">·</span>
                <a href={`mailto:${contact.email}`} className="hover:text-ivory">
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <Ornament className="mx-auto mt-16 text-brass-light" />
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p>Prices include GST · Photographs are illustrative</p>
        </div>
      </div>
    </footer>
  );
}
