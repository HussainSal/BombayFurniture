import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

export default function Lookbook() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="The Lookbook"
          title={
            <>
              One piece, <em className="text-primary">two rooms</em>
            </>
          }
          description="A study by day becomes a guest room by night. A living room hosts the family, then the overnight visitors."
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-12 md:grid-rows-2">
          <figure className="reveal relative aspect-square overflow-hidden md:col-span-5 md:row-span-2 md:aspect-auto">
            <Image src={images.bedroomTufted} alt="A guest bedroom with a tufted headboard" fill placeholder="blur" sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-4 left-4 bg-background px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em]">The guest room</figcaption>
          </figure>
          <figure className="reveal relative aspect-[16/10] overflow-hidden md:col-span-7">
            <Image src={images.roomCognac} alt="A warm living room with a cognac sofa" fill placeholder="blur" sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-4 left-4 bg-background px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em]">The living room</figcaption>
          </figure>
          <figure className="reveal relative aspect-[16/10] overflow-hidden md:col-span-7">
            <Image src={images.roomLoft} alt="A loft with exposed brick and a sofa" fill placeholder="blur" sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-4 left-4 bg-background px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em]">The study</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
