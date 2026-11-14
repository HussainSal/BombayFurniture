import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

const values = [
  { title: "Designed for real rooms", body: "We start from the city's floor plans — 10 × 11 ft living rooms, study-cum-guest rooms — and design backwards from there." },
  { title: "Comfort, both ways", body: "A good sofa cum bed is no compromise. We tune the seat to sit well and the sleeping surface to lie truly flat." },
  { title: "Honest pricing", body: "The price you configure is the price we quote. No surprises at the door." },
];

const process = [
  { title: "You choose", body: "Pick a design or create your own. We help over WhatsApp, a call, or in the showroom." },
  { title: "We craft", body: "Your piece is made to order — frame, foam and mechanism assembled by hand, upholstered in your fabric." },
  { title: "We inspect", body: "Every mechanism is opened and closed repeatedly and checked before it leaves the workshop." },
  { title: "We deliver", body: `Delivered in ${siteConfig.promises.deliveryWindow}, installed in your home and demonstrated so you're at ease from night one.` },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Intro */}
      <section className="container-page grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Our Story</p>
          <h1 className="mt-5 text-5xl leading-[1.04] sm:text-6xl">
            Furniture that makes <em className="text-primary">room for life</em>
          </h1>
          <Ornament className="mt-8" />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {siteConfig.name} began with a simple frustration: homes are getting smaller, but families, guests and
            work-from-home desks are not. Most sofa beds felt like a sofa that was poor at being a bed — or the other way round.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            So we focus on one thing and do it properly: sofa cum beds with the grace of the city&apos;s Art Deco interiors,
            that convert in seconds and are genuinely comfortable to sleep on.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="arch absolute -inset-3 border border-brass" aria-hidden />
          <div className="arch relative aspect-[4/5] overflow-hidden">
            <Image src={images.roomCognac} alt="A warmly furnished living room" fill priority placeholder="blur" sizes="(min-width: 1024px) 460px, 90vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="What we believe" title="Three promises behind every piece" />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="frame reveal p-8 text-center sm:p-10">
                <p className="font-serif text-5xl italic text-brass">{["I", "II", "III"][i]}</p>
                <h3 className="mt-4 text-2xl">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden">
              <Image src={images.craftLinen} alt="Close-up of natural linen upholstery" fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src={images.craftWood} alt="A hand-finished wooden side table" fill placeholder="blur" sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src={images.craftChair} alt="A hand-made wooden chair" fill placeholder="blur" sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="reveal">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl">
              From your idea to your <em className="text-primary">living room</em>
            </h2>
            <Ornament className="mt-7" />
            <ol className="mt-10 space-y-8">
              {process.map((p, i) => (
                <li key={p.title} className="flex gap-6">
                  <span className="w-10 shrink-0 font-serif text-3xl italic text-brass">{["I", "II", "III", "IV"][i]}</span>
                  <div>
                    <h3 className="text-2xl">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="btn-primary group">
                Explore the Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
