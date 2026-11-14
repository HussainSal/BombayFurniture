/**
 * Sample catalogue. Names, prices, dimensions and photos are placeholders —
 * replace them with the real range before launch. Dimensions are in centimetres.
 */
import type { StaticImageData } from "next/image";
import { images } from "@/lib/images";

export type Seats = 1 | 2 | 3;
export type Mechanism = "click-clack" | "pull-out" | "fold-out";
export type ArmStyle = "fixed" | "fold-down" | "none";

export interface Fabric {
  id: string;
  name: string;
  hex: string;
}

export const fabrics: Fabric[] = [
  { id: "bottle-green", name: "Bottle Green", hex: "#2f4a3a" },
  { id: "cognac", name: "Cognac", hex: "#8a5a35" },
  { id: "mustard", name: "Mustard", hex: "#b8892c" },
  { id: "terracotta", name: "Terracotta", hex: "#a4523a" },
  { id: "ivory", name: "Ivory", hex: "#d8ccb3" },
  { id: "dove", name: "Dove Grey", hex: "#8f8b84" },
  { id: "powder-blue", name: "Powder Blue", hex: "#8da2b2" },
  { id: "oxblood", name: "Oxblood", hex: "#5e2622" },
  { id: "navy", name: "Midnight Navy", hex: "#27324a" },
];

export function getFabric(id: string): Fabric {
  return fabrics.find((f) => f.id === id) ?? fabrics[0];
}

export const mechanisms: Record<
  Mechanism,
  { label: string; summary: string; time: string; steps: { title: string; body: string }[] }
> = {
  "click-clack": {
    label: "Click-clack",
    summary: "The backrest reclines flat in one motion — the quickest, simplest mechanism.",
    time: "~5 sec",
    steps: [
      { title: "Lift", body: "Raise the seat front until you hear the click." },
      { title: "Lay flat", body: "Lower it — the backrest glides down into one even surface." },
      { title: "Rest", body: "Add pillows and linen. No cushions to remove, no tools." },
    ],
  },
  "pull-out": {
    label: "Pull-out",
    summary: "A hidden frame slides out from beneath the seat for a full-length bed.",
    time: "~10 sec",
    steps: [
      { title: "Pull", body: "Draw the concealed frame forward by its front handle." },
      { title: "Unfold", body: "The second mattress section settles onto its own legs." },
      { title: "Rest", body: "A full-length bed with one continuous sleeping surface." },
    ],
  },
  "fold-out": {
    label: "Fold-out",
    summary: "A tri-fold mattress tucked into the seat opens into a generous bed.",
    time: "~15 sec",
    steps: [
      { title: "Lift cushions", body: "Set aside the seat cushions to reveal the folded mattress." },
      { title: "Unfold", body: "Pull the loop — the frame opens in three hinged sections." },
      { title: "Rest", body: "A thick, sprung mattress for guests who stay a while." },
    ],
  },
};

export interface Dimensions {
  w: number;
  d: number;
  h: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  seats: Seats;
  mechanism: Mechanism;
  arms: ArmStyle;
  storage: boolean;
  material: string;
  price: number;
  mrp: number;
  fabrics: string[];
  badge?: string;
  image: StaticImageData;
  gallery: StaticImageData[];
  dimensions: { sofa: Dimensions; bed: Dimensions };
  highlights: string[];
}

export const products: Product[] = [
  {
    slug: "the-marine",
    name: "The Marine",
    tagline: "Our signature velvet three-seater, with hidden storage",
    description:
      "Named for the sweep of Marine Drive, this is our signature piece — a deep, tailored three-seater in rich velvet that clicks into a flat, generous bed. A full-length storage well beneath the seat keeps the bedding out of sight.",
    seats: 3,
    mechanism: "click-clack",
    arms: "fixed",
    storage: true,
    material: "Velvet",
    price: 34999,
    mrp: 46999,
    fabrics: ["bottle-green", "oxblood", "navy", "mustard", "cognac"],
    badge: "Signature",
    image: images.heroGreenVelvet,
    gallery: [images.roomGalleryWall, images.craftLinen],
    dimensions: { sofa: { w: 198, d: 90, h: 84 }, bed: { w: 198, d: 120, h: 42 } },
    highlights: ["Under-seat storage well", "Converts in about 5 seconds", "Solid wood tapered legs"],
  },
  {
    slug: "the-colaba",
    name: "The Colaba",
    tagline: "A sunny two-seater that pulls out to a full bed",
    description:
      "Cheerful and compact, The Colaba suits studies and smaller living rooms without shrinking the bed. The pull-out frame hides a full-length mattress beneath a cosy two-seater.",
    seats: 2,
    mechanism: "pull-out",
    arms: "fixed",
    storage: false,
    material: "Chenille",
    price: 27499,
    mrp: 35999,
    fabrics: ["mustard", "ivory", "powder-blue", "terracotta"],
    image: images.sofaColaba,
    gallery: [images.roomPlants, images.bedroomBoho],
    dimensions: { sofa: { w: 158, d: 86, h: 82 }, bed: { w: 158, d: 188, h: 40 } },
    highlights: ["Full-length 6 ft bed", "Soft-touch chenille", "Fits rooms from 9 × 9 ft"],
  },
  {
    slug: "the-malabar",
    name: "The Malabar",
    tagline: "Cognac leatherette, a generous pull-out and storage",
    description:
      "As handsome as a Malabar Hill drawing room. Deep cognac leatherette ages gracefully and wipes clean, while the wide pull-out bed and lift-up storage make it a true guest-room centrepiece.",
    seats: 3,
    mechanism: "pull-out",
    arms: "fixed",
    storage: true,
    material: "Premium leatherette",
    price: 42999,
    mrp: 55999,
    fabrics: ["cognac", "oxblood", "navy"],
    badge: "Bestseller",
    image: images.sofaMalabar,
    gallery: [images.roomCognac, images.roomLoft],
    dimensions: { sofa: { w: 204, d: 94, h: 86 }, bed: { w: 204, d: 192, h: 44 } },
    highlights: ["Queen-width sleeping area", "Lift-up storage", "Pocket-spring seat"],
  },
  {
    slug: "the-kala-ghoda",
    name: "The Kala Ghoda",
    tagline: "A reading armchair that sleeps one",
    description:
      "An armchair for quiet corners with an artist's flair — and a secret: it pulls out into a full single bed. Perfect for studies, children's rooms and the cousin who always stays over.",
    seats: 1,
    mechanism: "pull-out",
    arms: "fixed",
    storage: false,
    material: "Linen blend",
    price: 16999,
    mrp: 21999,
    fabrics: ["mustard", "bottle-green", "terracotta", "powder-blue"],
    badge: "New",
    image: images.chairKalaGhoda,
    gallery: [images.chairWingback, images.craftChair],
    dimensions: { sofa: { w: 96, d: 86, h: 82 }, bed: { w: 96, d: 186, h: 40 } },
    highlights: ["Single bed in an armchair", "Lightweight frame", "Hard-wearing linen blend"],
  },
  {
    slug: "the-worli",
    name: "The Worli",
    tagline: "Clean-lined, armless and wall-to-wall",
    description:
      "Calm and uncluttered like a sea-facing Worli flat. Without arms, the bed runs edge to edge — it slips into alcoves and under windows with ease.",
    seats: 3,
    mechanism: "click-clack",
    arms: "none",
    storage: false,
    material: "Linen blend",
    price: 22999,
    mrp: 28999,
    fabrics: ["ivory", "dove", "bottle-green", "navy"],
    image: images.sofaWorli,
    gallery: [images.roomWhiteSofa, images.craftLinen],
    dimensions: { sofa: { w: 182, d: 88, h: 80 }, bed: { w: 182, d: 116, h: 40 } },
    highlights: ["Edge-to-edge bed", "Slim 182 cm footprint", "Three recline positions"],
  },
  {
    slug: "the-bandra",
    name: "The Bandra",
    tagline: "Terracotta velvet over a sprung fold-out mattress",
    description:
      "Warm, bold and a little bohemian — The Bandra wraps a sprung tri-fold mattress in soft terracotta velvet. A statement for the living room that quietly hosts overnight guests.",
    seats: 2,
    mechanism: "fold-out",
    arms: "fixed",
    storage: false,
    material: "Velvet",
    price: 30999,
    mrp: 39999,
    fabrics: ["terracotta", "bottle-green", "oxblood", "mustard"],
    badge: "New",
    image: images.sofaBandra,
    gallery: [images.bedroomTufted, images.roomCognac],
    dimensions: { sofa: { w: 164, d: 92, h: 84 }, bed: { w: 164, d: 184, h: 44 } },
    highlights: ["Sprung tri-fold mattress", "Plush velvet finish", "Solid wood legs"],
  },
  {
    slug: "the-juhu",
    name: "The Juhu",
    tagline: "Fold-down arms for a longer, easier bed",
    description:
      "Relaxed and roomy, The Juhu's arms fold flat at bedtime to lengthen the sleeping area. Click-clack simplicity with storage underneath, in an easy dove-grey chenille.",
    seats: 3,
    mechanism: "click-clack",
    arms: "fold-down",
    storage: true,
    material: "Chenille",
    price: 36499,
    mrp: 46999,
    fabrics: ["dove", "ivory", "bottle-green", "navy"],
    image: images.sofaJuhu,
    gallery: [images.bedroomTufted, images.roomGalleryWall],
    dimensions: { sofa: { w: 210, d: 92, h: 84 }, bed: { w: 210, d: 120, h: 42 } },
    highlights: ["Arms fold flat", "Storage well", "Extra-long sleeping area"],
  },
  {
    slug: "the-dadar",
    name: "The Dadar",
    tagline: "Studio-sized, light and endlessly practical",
    description:
      "Built for first homes and compact flats — light enough to move alone, sturdy enough for nightly sleeping. A soft powder-blue two-seater in a tight footprint.",
    seats: 2,
    mechanism: "click-clack",
    arms: "fixed",
    storage: false,
    material: "Linen blend",
    price: 18999,
    mrp: 23999,
    fabrics: ["powder-blue", "dove", "mustard", "ivory"],
    badge: "Best value",
    image: images.sofaDadar,
    gallery: [images.roomWhiteSofa, images.bedroomBoho],
    dimensions: { sofa: { w: 148, d: 84, h: 80 }, bed: { w: 148, d: 112, h: 40 } },
    highlights: ["Moves easily", "Daily-sleep foam", "Studio-friendly size"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function seatLabel(seats: Seats) {
  return seats === 1 ? "Single" : `${seats}-Seater`;
}

export const armLabel: Record<ArmStyle, string> = {
  fixed: "With arms",
  "fold-down": "Fold-down arms",
  none: "Armless",
};
