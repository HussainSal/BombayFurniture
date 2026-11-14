import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Diamond, Ornament } from "@/components/ui/Ornament";
import SofaDrawing from "@/components/ui/SofaDrawing";
import { fabrics } from "@/lib/products";

const choices = ["Size — single to three-seater", "Mechanism & arm style", `${fabrics.length} colours in 4 fabrics`, "Storage & finishing touches", "Room-fit check & instant price"];

export default function ConfiguratorInvite() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <div className="sunburst pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-page section relative grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow text-brass-light">Bespoke</p>
          <h2 className="mt-5 text-4xl leading-[1.08] text-ivory sm:text-5xl">
            Design a piece that is <em className="text-brass-light">entirely yours</em>
          </h2>
          <Ornament className="mt-7 text-brass-light" />
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ivory/75">
            Choose every detail, see it drawn as you go, check it fits your room — and receive an instant price before you
            speak to anyone.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {choices.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[15px] text-ivory/90">
                <Diamond className="shrink-0 bg-brass-light" />
                {c}
              </li>
            ))}
          </ul>
          <Link href="/configurator" className="btn-brass group mt-10">
            Begin your design
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="reveal">
          <div className="relative bg-background p-6 text-foreground sm:p-10">
            <span className="pointer-events-none absolute inset-2 border border-brass/50" aria-hidden />
            <p className="eyebrow text-center">Plate No. 1 — The Marine</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <figure>
                <SofaDrawing color="#2f4a3a" mode="sofa" storage className="h-auto w-full" />
                <figcaption className="mt-1 text-center font-serif text-sm italic text-muted-foreground">by day</figcaption>
              </figure>
              <figure>
                <SofaDrawing color="#2f4a3a" mode="bed" storage className="h-auto w-full" />
                <figcaption className="mt-1 text-center font-serif text-sm italic text-muted-foreground">by night</figcaption>
              </figure>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {fabrics.map((f) => (
                <span key={f.id} title={f.name} className="h-4 w-4 rounded-full ring-1 ring-foreground/15" style={{ backgroundColor: f.hex }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
