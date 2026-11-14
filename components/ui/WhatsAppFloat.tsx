import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

/** Static, server-rendered — no JS, no infinite animations. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(`Hello ${siteConfig.name}! I'm interested in a sofa cum bed.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="wa-float group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-primary px-4 text-primary-foreground shadow-lg shadow-forest/25 ring-1 ring-brass/40 transition-colors hover:bg-forest sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] sm:inline">Chat with us</span>
    </a>
  );
}
