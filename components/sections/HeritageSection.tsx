import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Diamond, Ornament } from "@/components/ui/Ornament";
import { images } from "@/lib/images";

const notes = [
  "Seasoned hardwood frames, jointed and braced by hand",
  "High-resilience foam that keeps its shape, night after night",
  "Every mechanism opened and closed before it leaves the workshop",
];

export default function HeritageSection() {
  return (
    <section className="section bg-surface">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="reveal relative mx-auto w-full max-w-[480px] pb-16 pr-10 sm:pr-16">
          <div className="arch relative aspect-[3/4] overflow-hidden">
            <Image
              src={images.roomGalleryWall}
              alt="A living room with a gallery wall and leather sofa"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 440px, 85vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[48%] border-[6px] border-surface shadow-xl shadow-forest/10">
            <div className="relative aspect-square">
              <Image
                src={images.craftChair}
                alt="A hand-made wooden chair"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 220px, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="reveal">
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl">
            Crafted in the spirit of <em className="text-primary">old Bombay</em>
          </h2>
          <Ornament className="mt-7" />
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
            The city&apos;s Art Deco homes were built for gracious living in modest space — tall arches, clean lines and
            furniture that earned its place. We bring that same thinking to the sofa cum bed: a piece handsome enough for
            the drawing room, and honest enough to sleep on every night.
          </p>
          <ul className="mt-8 space-y-4">
            {notes.map((n) => (
              <li key={n} className="flex items-start gap-4">
                <Diamond className="mt-2.5 shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="link-underline mt-10">
            Read our story
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
