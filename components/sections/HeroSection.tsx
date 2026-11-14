import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";
import Seal from "@/components/ui/Seal";
import { fabrics, products } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { formatINR } from "@/lib/utils";

const signature = products[0];

export default function HeroSection() {
  const facts = [
    { value: "~5 sec", label: "Sofa to bed" },
    { value: `${fabrics.length}`, label: "Signature colours" },
    { value: `${siteConfig.promises.warrantyYears} yrs`, label: "Frame warranty" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Deco sunburst rising behind the arch */}
      <div className="sunburst pointer-events-none absolute bottom-0 right-0 h-[52%] w-full lg:h-[85%] lg:w-[60%]" aria-hidden />

      <div className="container-page relative grid items-center gap-14 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p className="eyebrow rise">Handcrafted sofa cum beds</p>
          <h1 className="mt-6 text-[clamp(3.1rem,8vw,6rem)] leading-[0.98]">
            Sofa by day,
            <br />
            <em className="text-primary">bed by night.</em>
          </h1>
          <Ornament className="rise mt-8 [--delay:.1s]" />
          <p className="rise mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground [--delay:.15s] sm:text-xl">
            Timeless pieces in the spirit of old Bombay — tailored by hand, made to order in the fabric you love, and
            transformed from sofa to bed in seconds.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 [--delay:.25s] sm:flex-row">
            <Link href="/shop" className="btn-primary group">
              Explore the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
            <Link href="/configurator" className="btn-outline">
              Design Your Own
            </Link>
          </div>

          <dl className="rise mt-12 grid max-w-md grid-cols-3 divide-x divide-border border-y border-border [--delay:.35s]">
            {facts.map((f) => (
              <div key={f.label} className="px-3 py-5 text-center first:pl-0 last:pr-0">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-3xl text-primary">{f.value}</dd>
                <dd className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Arch photograph */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="arch absolute -inset-3 border border-brass sm:-inset-4" aria-hidden />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={signature.image}
                alt={`${signature.name} sofa cum bed in bottle green velvet`}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 500px, 90vw"
                className="object-cover object-[42%_center]"
              />
            </div>

            <Seal className="absolute -left-4 -top-2 h-24 w-24 sm:-left-10 sm:top-10 sm:h-32 sm:w-32" />

            <Link
              href={`/shop/${signature.slug}`}
              className="frame group absolute -bottom-6 right-2 block px-6 py-4 shadow-xl shadow-forest/10 sm:-right-6"
            >
              <span className="eyebrow block text-[11px]">The Signature</span>
              <span className="mt-1 block font-serif text-xl">{signature.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                Velvet · from <span className="text-foreground">{formatINR(signature.price)}</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
