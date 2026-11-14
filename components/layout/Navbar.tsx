"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { navLinks, siteConfig } from "@/lib/site";
import { cn, whatsappLink } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const waHref = whatsappLink(`Hello ${siteConfig.name}! I'd like to know more about your sofa cum beds.`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95">
      <nav className="container-page flex h-16 items-center justify-between lg:h-20" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors hover:text-primary",
                  "after:absolute after:-bottom-0.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rotate-45 after:bg-brass after:opacity-0 after:transition-opacity",
                  isActive(link.href) && "text-primary after:opacity-100",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary hidden px-5 py-3 lg:inline-flex">
          <WhatsAppIcon className="h-4 w-4" />
          Enquire
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="-mr-2.5 p-2.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" strokeWidth={1.4} /> : <Menu className="h-6 w-6" strokeWidth={1.4} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="animate-fade-in fixed inset-0 z-[60] overflow-y-auto bg-background lg:hidden">
          <div className="container-page flex h-16 items-center justify-between border-b border-border">
            <span onClick={() => setOpen(false)}>
              <Logo />
            </span>
            <button type="button" onClick={() => setOpen(false)} className="-mr-2.5 p-2.5" aria-label="Close menu">
              <X className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>
          <ul className="container-page divide-y divide-border py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn("flex items-center justify-between py-5 font-serif text-3xl", isActive(link.href) && "text-primary")}
                >
                  {link.label}
                  <span className="h-2 w-2 rotate-45 bg-brass" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page pb-10 pt-4">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              <WhatsAppIcon className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
            <p className="mt-6 text-center text-sm text-muted-foreground">{siteConfig.contact.hours}</p>
          </div>
        </div>
      )}
    </header>
  );
}
