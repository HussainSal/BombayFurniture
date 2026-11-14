import { Diamond } from "@/components/ui/Ornament";
import { siteConfig } from "@/lib/site";

export default function TopBar() {
  const { promises } = siteConfig;
  return (
    <div className="bg-forest text-ivory">
      <div className="container-page flex items-center justify-center gap-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] sm:text-[11px]">
        <span>{promises.deliveryNote}</span>
        <Diamond className="hidden bg-brass-light sm:inline-block" />
        <span className="hidden sm:inline">{promises.warrantyYears}-year warranty</span>
        <Diamond className="hidden bg-brass-light md:inline-block" />
        <span className="hidden md:inline">Made to order</span>
      </div>
    </div>
  );
}
