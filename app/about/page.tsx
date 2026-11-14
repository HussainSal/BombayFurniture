import type { Metadata } from "next";
import AboutPageContent from "@/components/pages/AboutPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `Why ${siteConfig.name} makes sofa cum beds — and how each piece is designed, built and delivered.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
