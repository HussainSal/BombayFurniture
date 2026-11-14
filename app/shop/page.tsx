import type { Metadata } from "next";
import ShopPageContent, { type InitialFilters } from "@/components/pages/ShopPageContent";

export const metadata: Metadata = {
  title: "Shop sofa cum beds",
  description:
    "Browse single, 2-seater and 3-seater sofa cum beds with click-clack, pull-out and fold-out mechanisms. Filter by size, storage, price and colour.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const seats = Number(sp.seats);
  const initial: InitialFilters = {
    seats: seats === 1 || seats === 2 || seats === 3 ? [seats] : [],
    storage: sp.storage === "1",
  };
  return <ShopPageContent initial={initial} />;
}
