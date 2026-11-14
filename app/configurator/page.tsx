import type { Metadata } from "next";
import ConfiguratorPageContent from "@/components/pages/ConfiguratorPageContent";
import { parseConfig } from "@/lib/configurator";
import { fabrics } from "@/lib/products";

export const metadata: Metadata = {
  title: "Design your sofa cum bed",
  description:
    "Build your own sofa cum bed: choose size, mechanism, arms, fabric and storage. See it live, check it fits your room and get an instant price.",
  alternates: { canonical: "/configurator" },
};

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = parseConfig(
    await searchParams,
    fabrics.map((f) => f.id),
  );
  return <ConfiguratorPageContent initial={initial} />;
}
