"use client";

import { Loader2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Ornament } from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Lead capture. `context` (product / configuration summary) is sent with the
 * enquiry so the team knows exactly what the customer was looking at.
 */
export default function EnquiryForm({ context, submitLabel = "Request a callback" }: { context?: string; submitLabel?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, context }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-6 text-center">
        <p className="eyebrow mb-3">Thank you</p>
        <h3 className="font-serif text-3xl">We&apos;ll be in touch shortly</h3>
        <Ornament className="mx-auto my-5" />
        <p className="mx-auto mb-7 max-w-sm text-muted-foreground">Prefer a quicker reply? Continue the conversation on WhatsApp.</p>
        <a
          href={whatsappLink(`Hello! I just sent an enquiry on your website.${context ? `\n\n${context}` : ""}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot — real visitors never see or fill this */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className="label">
            Name
          </label>
          <input id="enq-name" name="name" required minLength={2} maxLength={80} className="field" placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="enq-phone" className="label">
            Phone
          </label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            required
            pattern="[0-9+\s\-]{10,16}"
            className="field"
            placeholder="98765 43210"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
      </div>
      <div>
        <label htmlFor="enq-city" className="label">
          City / Pincode
        </label>
        <input id="enq-city" name="city" maxLength={80} className="field" placeholder="e.g. Mumbai, 400050" autoComplete="address-level2" />
      </div>
      <div>
        <label htmlFor="enq-message" className="label">
          Message <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea id="enq-message" name="message" rows={3} maxLength={1000} className="field resize-none" placeholder="Room size, colour, delivery timeline…" />
      </div>

      {context && (
        <div className="border border-dashed border-border bg-surface/60 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Your selection — </span>
          <span className="whitespace-pre-line">{context}</span>
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-oxblood">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      <p className="text-center text-xs text-muted-foreground">We only use your number to respond to this enquiry.</p>
    </form>
  );
}
