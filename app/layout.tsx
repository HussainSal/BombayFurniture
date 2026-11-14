import type { Metadata, Viewport } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { siteConfig } from "@/lib/site";

const serif = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Jost({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#142520",
  width: "device-width",
  initialScale: 1,
  // Lets fixed bars respect the iPhone home indicator via env(safe-area-inset-*)
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Handcrafted sofa cum beds`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "sofa cum bed",
    "sofa cum bed Mumbai",
    "sofa bed",
    "sofa cum bed with storage",
    "3 seater sofa cum bed",
    "2 seater sofa cum bed",
    "velvet sofa cum bed",
    "space saving furniture",
    "Bombay Furniture",
  ],
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  category: "shopping",
};

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${siteConfig.url}/#store`,
  name: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${serif.variable} ${sans.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <TopBar />
        <Navbar />
        <main id="main" className="overflow-x-clip">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
