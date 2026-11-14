"use client";

import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import EnquiryForm from "@/components/ui/EnquiryForm";
import FabricSwatches from "@/components/ui/FabricSwatches";
import Modal from "@/components/ui/Modal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { type Product, getFabric, seatLabel } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { cn, formatINR, whatsappLink } from "@/lib/utils";

export default function PurchasePanel({ product }: { product: Product }) {
  const [fabricId, setFabricId] = useState(product.fabrics[0]);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const fabric = getFabric(fabricId);

  // Reveal the sticky mobile bar only once the main buttons have scrolled away
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const summary = `${product.name} — ${seatLabel(product.seats)} sofa cum bed\nColour: ${fabric.name} (${product.material})\nListed price: ${formatINR(product.price)}`;
  const waHref = whatsappLink(`Hello ${siteConfig.name}! I'm interested in:\n${summary}\n\nCould you share availability and delivery to my area?`);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label mb-0">Colour</span>
        <span className="text-[15px]">
          {fabric.name} <span className="text-muted-foreground">· {product.material}</span>
        </span>
      </div>
      <FabricSwatches ids={product.fabrics} value={fabricId} onChange={setFabricId} className="mt-4" />

      <div ref={ctaRef} className="mt-8 grid gap-3">
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <WhatsAppIcon className="h-4 w-4" />
          Enquire on WhatsApp
        </a>
        <button type="button" onClick={() => setOpen(true)} className="btn-outline">
          <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
          Request a callback
        </button>
      </div>
      <Link
        href={`/configurator?seats=${product.seats}&mechanism=${product.mechanism}&arms=${product.arms}&fabric=${fabricId}&storage=${product.storage ? 1 : 0}`}
        className="mt-2 block py-3 text-center text-sm text-primary underline decoration-brass underline-offset-4"
      >
        Customise this design in the configurator
      </Link>

      {/* Sticky action bar — phones & tablets */}
      <div
        data-mobile-bar
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(20,37,32,0.25)] transition-transform duration-300 lg:hidden",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showBar}
      >
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg leading-tight">{product.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {formatINR(product.price)} · {fabric.name}
            </p>
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 px-5 py-3.5" tabIndex={showBar ? 0 : -1}>
            <WhatsAppIcon className="h-4 w-4" />
            Enquire
          </a>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Request a callback">
        <EnquiryForm context={summary} />
      </Modal>
    </div>
  );
}
