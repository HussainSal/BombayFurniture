import { Hammer, ShieldCheck, Timer, Truck } from "lucide-react";
import { siteConfig } from "@/lib/site";

const { promises } = siteConfig;

const items = [
  { icon: Timer, title: "Converts in seconds", body: "One smooth motion, no tools" },
  { icon: Hammer, title: "Made to order", body: "Tailored in your chosen fabric" },
  { icon: Truck, title: "Delivered & installed", body: `In ${promises.deliveryWindow}, at no extra cost` },
  { icon: ShieldCheck, title: `${promises.warrantyYears}-year warranty`, body: "On every frame & mechanism" },
];

export default function PromiseStrip() {
  return (
    <section aria-label="Our promises" className="border-y border-border bg-card/60">
      <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.title}
            className={`flex flex-col items-center gap-3 px-3 py-8 text-center sm:flex-row sm:text-left lg:justify-center ${
              i % 2 === 0 ? "border-r border-border" : ""
            } ${i < 2 ? "border-b border-border lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
          >
            <item.icon className="h-7 w-7 shrink-0 text-brass" strokeWidth={1.2} />
            <div>
              <p className="font-serif text-lg leading-tight">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
