import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value: number) {
  return inr.format(value);
}

export function discountPercent(price: number, mrp: number) {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`;
}

/** Mix a hex colour toward white (amount > 0) or black (amount < 0). amount is -100..100. */
export function shade(hex: string, amount: number) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.replace(/./g, "$&$&") : clean, 16);
  const target = amount > 0 ? 255 : 0;
  const p = Math.min(Math.abs(amount), 100) / 100;
  const channel = (shift: number) => {
    const c = (num >> shift) & 0xff;
    return Math.round(c + (target - c) * p);
  };
  const out = (channel(16) << 16) | (channel(8) << 8) | channel(0);
  return `#${out.toString(16).padStart(6, "0")}`;
}

/** 183 → "6 ft" · 120 → "3 ft 11 in" */
export function cmToFeet(cm: number) {
  const totalIn = Math.round(cm / 2.54);
  const ft = Math.floor(totalIn / 12);
  const inch = totalIn % 12;
  return inch === 0 ? `${ft} ft` : `${ft} ft ${inch} in`;
}

export function sqFt(widthCm: number, depthCm: number) {
  return Math.round((widthCm * depthCm) / 929.03);
}
