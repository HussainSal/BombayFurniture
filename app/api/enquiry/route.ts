import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * - Validates and sanitises input server-side (never trust the client).
 * - Honeypot field `company` silently drops bots.
 * - Naive per-IP rate limit (in-memory: resets on deploy and is per-instance —
 *   swap for Upstash/Redis if traffic grows).
 * - If RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL are set, the lead
 *   is emailed via Resend's REST API. Otherwise it is only logged.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] as string);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry
  if (clean(body.company, 100)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 20),
    city: clean(body.city, 80),
    message: clean(body.message, 1000),
    context: clean(body.context, 1000),
  };

  if (lead.name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.info("[enquiry] (email not configured)", JSON.stringify(lead));
    return NextResponse.json({ ok: true });
  }

  const rows = Object.entries(lead)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">${k}</td><td style="padding:6px 12px;white-space:pre-line">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: [ENQUIRY_TO_EMAIL],
        subject: `New enquiry: ${lead.name} (${lead.city || "city not given"})`,
        html: `<h2>New website enquiry</h2><table>${rows}</table>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error("[enquiry] email failed", err, JSON.stringify(lead));
    return NextResponse.json(
      { error: "We couldn't send that just now. Please message us on WhatsApp instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
