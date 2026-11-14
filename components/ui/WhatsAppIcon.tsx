/** Speech-bubble glyph with a handset — reads as "chat" without a brand logo. */
export default function WhatsAppIcon({ className, strokeWidth = 1.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6Z" />
      <path d="M9 8.6c0 3.4 2.9 6.4 6.4 6.4l1.1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
