"use client";

import { BedDouble, Sofa } from "lucide-react";
import type { SofaMode } from "@/components/ui/SofaDrawing";
import { cn } from "@/lib/utils";

const options = [
  { value: "sofa", label: "Sofa", icon: Sofa },
  { value: "bed", label: "Bed", icon: BedDouble },
] as const;

export default function ModeToggle({ mode, onChange, className }: { mode: SofaMode; onChange: (mode: SofaMode) => void; className?: string }) {
  return (
    <div role="radiogroup" aria-label="View as" className={cn("inline-flex border border-foreground/70", className)}>
      {options.map((opt) => {
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex min-h-11 items-center gap-2 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
              active ? "bg-foreground text-background" : "text-foreground hover:bg-surface",
            )}
          >
            <opt.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
