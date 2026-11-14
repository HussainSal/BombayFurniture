import { ChevronRight } from "lucide-react";
import Link from "next/link";
import PurchasePanel from "@/components/product/PurchasePanel";
import ProductGallery from "@/components/product/ProductGallery";
import { Diamond, Ornament } from "@/components/ui/Ornament";
import ProductCard from "@/components/ui/ProductCard";
import SofaDrawing from "@/components/ui/SofaDrawing";
import { type Product, armLabel, getFabric, mechanisms, products, seatLabel } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { cmToFeet, discountPercent, formatINR } from "@/lib/utils";

/** Server component — only the gallery and purchase panel hydrate. */
export default function ProductPageContent({ product }: { product: Product }) {
  const mech = mechanisms[product.mechanism];
  const off = discountPercent(product.price, product.mrp);
  const { sofa, bed } = product.dimensions;
  const color = getFabric(product.fabrics[0]).hex;
  const related = products.filter((p) => p.slug !== product.slug && (p.seats === product.seats || p.mechanism === product.mechanism)).slice(0, 3);

  const specs = [
    ["Size", seatLabel(product.seats)],
    ["Mechanism", `${mech.label} · ${mech.time}`],
    ["Arms", armLabel[product.arms]],
    ["Storage", product.storage ? "Under-seat storage well" : "—"],
    ["Upholstery", product.material],
    ["As a sofa", `${sofa.w} W × ${sofa.d} D × ${sofa.h} H cm`],
    ["As a bed", `${bed.w} W × ${bed.d} D × ${bed.h} H cm`],
    ["Sleeping area", `${cmToFeet(bed.w)} × ${cmToFeet(bed.d)}`],
    ["Delivery", `${siteConfig.promises.deliveryWindow} · ${siteConfig.promises.deliveryNote.toLowerCase()}`],
    ["Warranty", `${siteConfig.promises.warrantyYears} years on frame & mechanism`],
  ];

  return (
    <div className="container-page pb-24 pt-8">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <Link href="/" className="py-3 hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="py-3 hover:text-foreground">
          Collection
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-28">
            <ProductGallery images={[product.image, ...product.gallery]} name={product.name} badge={product.badge} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow">
            {seatLabel(product.seats)} · {mech.label}
            {product.storage && " · Storage"}
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl">{product.name}</h1>
          <p className="mt-3 font-serif text-xl italic text-muted-foreground">{product.tagline}</p>
          <Ornament className="mt-6" />

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-4xl">{formatINR(product.price)}</span>
            {off > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatINR(product.mrp)}</span>
                <span className="text-sm font-medium uppercase tracking-[0.15em] text-oxblood">Save {off}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Inclusive of GST · {siteConfig.promises.emi}</p>

          <div className="mt-8 border-t border-border pt-8">
            <PurchasePanel product={product} />
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="text-2xl">About the piece</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>
            <ul className="mt-6 space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-4 text-[15px]">
                  <Diamond className="shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* By day / by night plate */}
      <section className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">How it opens</p>
          <h2 className="mt-4 text-4xl">
            The {mech.label.toLowerCase()} <em className="text-primary">mechanism</em>
          </h2>
          <Ornament className="mt-6" />
          <ol className="mt-8 space-y-6">
            {mech.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="w-8 shrink-0 font-serif text-3xl italic text-brass">{["I", "II", "III"][i]}</span>
                <div>
                  <h3 className="text-xl">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="frame reveal p-6 sm:p-10 lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            {(["sofa", "bed"] as const).map((m) => (
              <figure key={m} className="text-center">
                <SofaDrawing color={color} mode={m} seats={product.seats} arms={product.arms} storage={product.storage} className="h-auto w-full" />
                <figcaption className="mt-3">
                  <span className="font-serif text-lg italic">{m === "sofa" ? "By day" : "By night"}</span>
                  <span className="block text-sm text-muted-foreground">
                    {product.dimensions[m].w} × {product.dimensions[m].d} cm
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
            Allow about 60 cm (2 ft) in front of the open bed to walk around comfortably.
          </p>
        </div>
      </section>

      {/* Specifications */}
      <section className="reveal mt-24">
        <h2 className="text-center text-4xl">Specifications</h2>
        <Ornament className="mx-auto mt-6" />
        <dl className="mx-auto mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {specs.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-4 sm:grid-cols-[200px_1fr]">
              <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
              <dd className="text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="text-center text-4xl">
            You may also <em className="text-primary">admire</em>
          </h2>
          <Ornament className="mx-auto mt-6" />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
