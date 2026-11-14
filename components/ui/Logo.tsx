import Link from "next/link";
import Emblem from "@/components/ui/Emblem";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" className={cn("group flex w-fit items-center gap-3", className)} aria-label={`${siteConfig.name} — home`}>
      <Emblem
        className={cn("h-10 w-8 transition-transform sm:h-12 sm:w-10 duration-500 group-hover:-translate-y-0.5", light ? "text-brass-light" : "text-brass")}
        monogramClassName={light ? "fill-ivory" : "fill-primary"}
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[19px] uppercase tracking-[0.2em] sm:text-[23px]", light ? "text-ivory" : "text-foreground")}>Bombay</span>
        <span
          className={cn(
            "mt-1.5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.46em]",
            light ? "text-brass-light" : "text-brass-ink",
          )}
        >
          <span className={cn("h-px w-3", light ? "bg-brass-light" : "bg-brass")} />
          Furniture
          <span className={cn("h-px w-3", light ? "bg-brass-light" : "bg-brass")} />
        </span>
      </span>
    </Link>
  );
}
