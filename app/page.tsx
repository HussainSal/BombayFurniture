import type { Metadata } from "next";
import ConfiguratorInvite from "@/components/sections/ConfiguratorInvite";
import FAQSection from "@/components/sections/FAQSection";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import HeritageSection from "@/components/sections/HeritageSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItConverts from "@/components/sections/HowItConverts";
import Lookbook from "@/components/sections/Lookbook";
import PromiseStrip from "@/components/sections/PromiseStrip";
import ShopBySize from "@/components/sections/ShopBySize";
import VisitSection from "@/components/sections/VisitSection";
import { faqs } from "@/lib/faq";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Handcrafted sofa cum beds` },
  description:
    "Timeless, handcrafted sofa cum beds in velvet, chenille, linen and leatherette. Made to order, delivered and installed, converting from sofa to bed in seconds.",
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeroSection />
      <PromiseStrip />
      <FeaturedCollection />
      <HeritageSection />
      <HowItConverts />
      <ShopBySize />
      <ConfiguratorInvite />
      <Lookbook />
      <FAQSection />
      <VisitSection />
    </>
  );
}
