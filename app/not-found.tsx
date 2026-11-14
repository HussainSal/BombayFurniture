import type { Metadata } from "next";
import Link from "next/link";
import Emblem from "@/components/ui/Emblem";
import { Ornament } from "@/components/ui/Ornament";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Emblem className="h-28 w-24 text-brass" />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-4 text-5xl sm:text-6xl">
        This room is <em className="text-primary">empty</em>
      </h1>
      <Ornament className="mx-auto mt-6" />
      <p className="mx-auto mt-6 max-w-md text-muted-foreground">The page you were looking for has moved or never existed. Let us show you somewhere more comfortable.</p>
      <Link href="/shop" className="btn-primary mt-10">
        Explore the Collection
      </Link>
    </section>
  );
}
