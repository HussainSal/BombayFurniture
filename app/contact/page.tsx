import type { Metadata } from "next";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Talk to us on WhatsApp, call, or request a callback. Get help choosing the right sofa cum bed for your room.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
