import SectionHeading from "@/components/ui/SectionHeading";
import SofaDrawing from "@/components/ui/SofaDrawing";
import { type Mechanism, mechanisms } from "@/lib/products";

const steps = mechanisms["click-clack"].steps;
const numerals = ["I", "II", "III"];
const COLOR = "#2f4a3a";

export default function HowItConverts() {
  return (
    <section id="how-it-converts" className="section scroll-mt-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it converts"
          title={
            <>
              From sitting to sleeping in <em className="text-primary">three movements</em>
            </>
          }
          description="Designed to be opened by one person, every night — no cushions to stack, no tools, no struggle."
        />

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="frame reveal p-6 pb-8 text-center">
              <SofaDrawing
                color={COLOR}
                mode={i === 0 ? "sofa" : "bed"}
                dressed={i !== 1}
                arms="fold-down"
                className="mx-auto h-auto w-full max-w-[300px]"
              />
              <p className="mt-4 font-serif text-4xl italic text-brass">{numerals[i]}</p>
              <h3 className="mt-2 text-2xl">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[15px] text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          {(Object.keys(mechanisms) as Mechanism[]).map((m) => (
            <p key={m} className="text-[15px]">
              <span className="font-serif text-lg">{mechanisms[m].label}</span>
              <span className="ml-2 text-muted-foreground">{mechanisms[m].time}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
