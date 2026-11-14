import { cn } from "@/lib/utils";

/** Deco rule: line · dot · diamond · dot · line */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 12" className={cn("h-3 w-32 text-brass", className)} aria-hidden>
      <path d="M0 6h56M84 6h56" stroke="currentColor" strokeWidth="1" />
      <circle cx="61" cy="6" r="1.5" fill="currentColor" />
      <circle cx="79" cy="6" r="1.5" fill="currentColor" />
      <path d="M70 0.5l5.5 5.5-5.5 5.5-5.5-5.5Z" fill="currentColor" />
    </svg>
  );
}

/** Small diamond used as a list bullet / divider */
export function Diamond({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block h-1.5 w-1.5 rotate-45 bg-brass", className)} />;
}
