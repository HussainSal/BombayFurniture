"use client";

import { getFabric } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function FabricSwatches({
  ids,
  value,
  onChange,
  className,
}: {
  ids: string[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label="Fabric colour" className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {ids.map((id) => {
        const fabric = getFabric(id);
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={fabric.name}
            title={fabric.name}
            onClick={() => onChange(id)}
            className={cn(
              "h-11 w-11 rounded-full border-[3px] border-background transition-shadow [@media(pointer:fine)]:h-9 [@media(pointer:fine)]:w-9",
              active ? "shadow-[0_0_0_1.5px_hsl(var(--foreground))]" : "shadow-[0_0_0_1px_hsl(var(--border))] hover:shadow-[0_0_0_1px_hsl(var(--foreground)/0.5)]",
            )}
            style={{ backgroundColor: fabric.hex }}
          />
        );
      })}
    </div>
  );
}
