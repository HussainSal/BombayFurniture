import { ArrowUpRight, Mail, Phone } from "lucide-react";
import EnquiryForm from "@/components/ui/EnquiryForm";
import { Ornament } from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/lib/site";
import { telLink, whatsappLink } from "@/lib/utils";

export default function ContactPageContent() {
  const { contact } = siteConfig;

  const channels = [
    { icon: WhatsAppIcon, title: "WhatsApp", value: "The quickest way to reach us", href: whatsappLink(`Hello ${siteConfig.name}! I have a question.`), external: true },
    { icon: Phone, title: "Telephone", value: contact.phone, href: telLink() },
    { icon: Mail, title: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Visit Us</p>
          <h1 className="mt-5 text-5xl leading-[1.04] sm:text-6xl">
            Let&apos;s find your <em className="text-primary">perfect fit</em>
          </h1>
          <Ornament className="mt-8" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell us about your room and your style. We&apos;ll recommend the right piece, send fabric swatches and confirm your
            final price — usually within a few hours.
          </p>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {channels.map((ch) => (
              <li key={ch.title}>
                <a
                  href={ch.href}
                  {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-5"
                >
                  <ch.icon className="h-6 w-6 shrink-0 text-brass" strokeWidth={1.3} />
                  <span className="flex-1">
                    <span className="block font-serif text-xl">{ch.title}</span>
                    <span className="text-[15px] text-muted-foreground">{ch.value}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" strokeWidth={1.3} />
                </a>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="label">The Showroom</dt>
              <dd className="text-[15px]">{contact.address}</dd>
            </div>
            <div>
              <dt className="label">Opening hours</dt>
              <dd className="text-[15px]">{contact.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="frame h-fit p-6 sm:p-10">
          <h2 className="text-3xl">Request a callback</h2>
          <p className="mb-8 mt-2 text-[15px] text-muted-foreground">Leave your number and we&apos;ll call at a time that suits you.</p>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
