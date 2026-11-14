import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "@/components/pages/ProductPageContent";
import { getFabric, getProduct, mechanisms, products, seatLabel } from "@/lib/products";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name} ${seatLabel(product.seats)} ${mechanisms[product.mechanism].label} sofa cum bed`;
  return {
    title,
    description: `${product.tagline}. ${product.description.split(". ")[0]}.`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: `${title} | ${siteConfig.name}`, description: product.tagline, type: "website" },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const url = `${siteConfig.url}/shop/${product.slug}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${seatLabel(product.seats)} Sofa Cum Bed`,
    description: product.description,
    sku: product.slug,
    image: `${siteConfig.url}${product.image.src}`,
    brand: { "@type": "Brand", name: siteConfig.name },
    material: product.material,
    color: product.fabrics.map((f) => getFabric(f).name).join(", "),
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/MadeToOrder",
      seller: { "@id": `${siteConfig.url}/#store` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <ProductPageContent product={product} />
    </>
  );
}
