import Image from "next/image";
import Link from "next/link";
import { type Product, getFabric, mechanisms, seatLabel } from "@/lib/products";
import { discountPercent, formatINR } from "@/lib/utils";

/** Server-rendered card: no client JS, hover effects are pure CSS. Sized for a 2-up grid on phones. */
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const off = discountPercent(product.price, product.mrp);

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={`${product.name} sofa cum bed`}
          fill
          priority={priority}
          placeholder="blur"
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Inset hairline frame appears on hover */}
        <span className="pointer-events-none absolute inset-3 border border-ivory/0 transition-colors duration-500 group-hover:border-ivory/70" />
        {product.badge && (
          <span className="absolute left-2 top-2 bg-background px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.22em]">
            {product.badge}
          </span>
        )}
      </div>

      <div className="pt-3 text-center sm:pt-5">
        <p className="eyebrow mb-1.5 text-[11px] tracking-[0.16em] sm:mb-2 sm:text-[11px] sm:tracking-[0.3em]">
          {seatLabel(product.seats)}
          <span className="hidden sm:inline"> · {mechanisms[product.mechanism].label}</span>
          {product.storage && <span className="hidden sm:inline"> · Storage</span>}
        </p>
        <h3 className="font-serif text-lg leading-tight transition-colors group-hover:text-primary sm:text-2xl">{product.name}</h3>
        <p className="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-2 text-sm sm:mt-2 sm:text-[15px]">
          <span className="font-medium">{formatINR(product.price)}</span>
          {off > 0 && <span className="text-xs text-muted-foreground line-through sm:text-sm">{formatINR(product.mrp)}</span>}
        </p>
        <div className="mt-2.5 flex justify-center gap-1.5 sm:mt-3" aria-label={`Available in ${product.fabrics.length} colours`}>
          {product.fabrics.map((id) => (
            <span
              key={id}
              title={getFabric(id).name}
              className="h-2.5 w-2.5 rounded-full ring-1 ring-foreground/15 sm:h-3 sm:w-3"
              style={{ backgroundColor: getFabric(id).hex }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
