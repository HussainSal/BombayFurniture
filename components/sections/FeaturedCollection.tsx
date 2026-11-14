import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/lib/products";

export default function FeaturedCollection() {
  return (
    <section id="collection" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="The Collection"
          title={
            <>
              Pieces for every <em className="text-primary">room</em>
            </>
          }
          description="Each design is named for a corner of the city that inspired it — and each one opens into a proper bed."
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <div key={p.slug} className="reveal">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/shop" className="link-underline">
            View the full collection
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
