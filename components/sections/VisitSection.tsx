import { Phone } from "lucide-react";
import Image from "next/image";
import { Ornament } from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { telLink, whatsappLink } from "@/lib/utils";

export default function VisitSection() {
  const { contact } = siteConfig;
  return (
    <section className="section">
      <div className="container-page">
        <div className="reveal grid overflow-hidden border border-border bg-card lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image src={images.roomPlants} alt="A sunlit room with an armchair and plants" fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-14">
            <p className="eyebrow">Visit the showroom</p>
            <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl">
              Sit on it. <em className="text-primary">Sleep on it.</em>
            </h2>
            <Ornament className="mt-7" />
            <p className="mt-7 leading-relaxed text-muted-foreground">
              Feel the fabrics, try every mechanism and talk sizes with our team. Or tell us about your room on WhatsApp — we&apos;ll
              send swatches, suggestions and a final price.
            </p>
            <dl className="mt-8 space-y-3 text-[15px]">
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Address</dt>
                <dd>{contact.address}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Hours</dt>
                <dd>{contact.hours}</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(`Hello ${siteConfig.name}! I'd like help choosing a sofa cum bed.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
              <a href={telLink()} className="btn-outline">
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
