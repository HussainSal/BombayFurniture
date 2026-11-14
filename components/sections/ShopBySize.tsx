import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { products } from "@/lib/products";

const tiles = [
  { seats: 1, title: "Single Chair Beds", note: "For studies & reading corners", image: images.chairKalaGhoda },
  { seats: 2, title: "Two-Seaters", note: "For compact living rooms", image: images.sofaColaba },
  { seats: 3, title: "Three-Seaters", note: "For family rooms & guest rooms", image: images.sofaJuhu },
] as const;

export default function ShopBySize() {
  return (
    <section className="section bg-surface">
      <div className="container-page">
        <SectionHeading eyebrow="Shop by size" title="Find the right fit" />
        <div className="grid gap-6 md:grid-cols-3">
          {tiles.map((t) => {
            const count = products.filter((p) => p.seats === t.seats).length;
            return (
              <Link key={t.seats} href={`/shop?seats=${t.seats}`} className="reveal group relative block aspect-[4/3] overflow-hidden md:aspect-[4/5]">
                <Image
                  src={t.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
                <span className="pointer-events-none absolute inset-4 border border-ivory/40 transition-colors duration-500 group-hover:border-ivory/80" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-center text-ivory">
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-brass-light">
                    {count} {count === 1 ? "design" : "designs"}
                  </p>
                  <h3 className="mt-2 text-3xl text-ivory">{t.title}</h3>
                  <p className="mt-1 text-sm text-ivory/75">{t.note}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]">
                    Shop now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
