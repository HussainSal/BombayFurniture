/**
 * Configurator pricing + geometry. All prices are placeholders — set real
 * numbers before launch. Quotes are indicative; the final price is confirmed
 * by the team on WhatsApp/phone.
 */
import type { ArmStyle, Mechanism, Seats } from "@/lib/products";

export type Material = "linen" | "chenille" | "velvet" | "leatherette";
export type AddOn = "cushions" | "topper" | "cover";

export interface Config {
  seats: Seats;
  mechanism: Mechanism;
  arms: ArmStyle;
  material: Material;
  fabric: string;
  storage: boolean;
  addOns: AddOn[];
}

export const defaultConfig: Config = {
  seats: 3,
  mechanism: "click-clack",
  arms: "fixed",
  material: "linen",
  fabric: "bottle-green",
  storage: true,
  addOns: [],
};

export const basePrice: Record<Seats, number> = { 1: 14999, 2: 22999, 3: 28999 };

export const mechanismPrice: Record<Mechanism, number> = {
  "click-clack": 0,
  "pull-out": 3000,
  "fold-out": 4500,
};

export const armPrice: Record<ArmStyle, number> = { fixed: 0, "fold-down": 1500, none: -1500 };

export const materials: Record<Material, { label: string; note: string; perSeat: number }> = {
  linen: { label: "Linen blend", note: "Breathable, matte, easy-care", perSeat: 0 },
  chenille: { label: "Chenille", note: "Soft, textured, cosy", perSeat: 1000 },
  velvet: { label: "Velvet", note: "Rich sheen, plush hand-feel", perSeat: 1500 },
  leatherette: { label: "Leatherette", note: "Wipe-clean, pet-friendly", perSeat: 2000 },
};

export const storagePrice = 2500;

export const addOns: Record<AddOn, { label: string; price: number }> = {
  cushions: { label: "Pair of throw cushions", price: 1499 },
  topper: { label: "Memory-foam mattress topper", price: 2499 },
  cover: { label: "Spare washable cover", price: 2999 },
};

export interface LineItem {
  label: string;
  amount: number;
}

export function quote(c: Config): { items: LineItem[]; total: number } {
  const items: LineItem[] = [
    { label: `${c.seats === 1 ? "Single" : `${c.seats}-seater`} frame & foam`, amount: basePrice[c.seats] },
  ];
  if (mechanismPrice[c.mechanism]) items.push({ label: "Mechanism upgrade", amount: mechanismPrice[c.mechanism] });
  if (armPrice[c.arms]) items.push({ label: c.arms === "none" ? "Armless (saving)" : "Fold-down arms", amount: armPrice[c.arms] });
  const fabricCost = materials[c.material].perSeat * c.seats;
  if (fabricCost) items.push({ label: `${materials[c.material].label} upholstery`, amount: fabricCost });
  if (c.storage) items.push({ label: "Under-seat storage", amount: storagePrice });
  for (const a of c.addOns) items.push({ label: addOns[a].label, amount: addOns[a].price });
  return { items, total: items.reduce((s, i) => s + i.amount, 0) };
}

const seatWidth: Record<Seats, number> = { 1: 80, 2: 136, 3: 176 };
const bedDepth: Record<Mechanism, number> = { "click-clack": 118, "pull-out": 190, "fold-out": 185 };

/** Footprint in cm for both modes. */
export function footprint(c: Config) {
  const armW = c.arms === "none" ? 0 : 22;
  const width = seatWidth[c.seats] + armW;
  return {
    sofa: { w: width, d: 90, h: 84 },
    bed: { w: width, d: bedDepth[c.mechanism], h: 42 },
  };
}

// ── URL (de)serialisation so a configuration can be shared as a link ──────────

const pick = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

export function parseConfig(sp: Record<string, string | string[] | undefined>, validFabrics: string[]): Config {
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;
  const seats = Number(one("seats"));
  const addOnList = (one("addons") ?? "").split(",").filter((a): a is AddOn => a in addOns);
  return {
    seats: seats === 1 || seats === 2 || seats === 3 ? seats : defaultConfig.seats,
    mechanism: pick(one("mechanism"), ["click-clack", "pull-out", "fold-out"] as const, defaultConfig.mechanism),
    arms: pick(one("arms"), ["fixed", "fold-down", "none"] as const, defaultConfig.arms),
    material: pick(one("material"), Object.keys(materials) as Material[], defaultConfig.material),
    fabric: pick(one("fabric"), validFabrics, defaultConfig.fabric),
    storage: one("storage") === undefined ? defaultConfig.storage : one("storage") === "1",
    addOns: [...new Set(addOnList)],
  };
}

export function configToParams(c: Config) {
  const p = new URLSearchParams({
    seats: String(c.seats),
    mechanism: c.mechanism,
    arms: c.arms,
    material: c.material,
    fabric: c.fabric,
    storage: c.storage ? "1" : "0",
  });
  if (c.addOns.length) p.set("addons", c.addOns.join(","));
  return p;
}

/** Recommended walking clearance in front of the open bed. */
export const CLEARANCE_CM = 60;

export type FitStatus = "comfortable" | "tight" | "no-fit";

export function roomFit(c: Config, roomLengthFt: number, roomWidthFt: number) {
  const fp = footprint(c);
  const roomW = roomLengthFt * 30.48; // wall the sofa sits against
  const roomD = roomWidthFt * 30.48;
  const fitsBed = fp.bed.w <= roomW && fp.bed.d <= roomD;
  const fitsClear = fp.bed.w + 30 <= roomW && fp.bed.d + CLEARANCE_CM <= roomD;
  const status: FitStatus = !fitsBed ? "no-fit" : fitsClear ? "comfortable" : "tight";
  return { status, roomW, roomD, fp };
}
