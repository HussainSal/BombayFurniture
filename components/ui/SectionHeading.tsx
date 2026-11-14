import type { ReactNode } from "react";
import { Ornament } from "@/components/ui/Ornament";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={cn("reveal mb-12 md:mb-16", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && <p className={cn("eyebrow mb-4", light && "text-brass-light")}>{eyebrow}</p>}
      <Tag
        className={cn(
          "text-balance text-4xl leading-[1.08] sm:text-5xl",
          Tag === "h1" && "sm:text-6xl",
          light && "text-ivory",
        )}
      >
        {title}
      </Tag>
      <Ornament className={cn("mt-6", align === "center" && "mx-auto", light && "text-brass-light")} />
      {description && (
        <p className={cn("mt-6 text-lg leading-relaxed", light ? "text-ivory/75" : "text-muted-foreground")}>{description}</p>
      )}
    </div>
  );
}
