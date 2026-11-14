import { Plus } from "lucide-react";
import { Ornament } from "@/components/ui/Ornament";
import { faqs } from "@/lib/faq";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

/** Native <details> accordion — accessible and zero JavaScript. */
export default function FAQSection() {
  return (
    <section id="faq" className="section scroll-mt-20 bg-surface">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl">
            Before you <em className="text-primary">decide</em>
          </h2>
          <Ornament className="mt-7" />
          <p className="mt-7 text-muted-foreground">
            Can&apos;t find your answer?{" "}
            <a
              href={whatsappLink(`Hello ${siteConfig.name}, I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-brass underline-offset-4"
            >
              Ask us on WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border lg:col-span-8">
          {faqs.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-serif text-xl transition-colors hover:text-primary sm:text-2xl">
                {item.q}
                <Plus className="h-5 w-5 shrink-0 text-brass transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
