import { siteConfig } from "@/lib/site";

const { promises } = siteConfig;

// Shared by the FAQ section and the FAQPage JSON-LD on the home page, so the two never drift.
export const faqs = [
  {
    q: "Is a sofa cum bed comfortable enough to sleep on every night?",
    a: "Yes — our range is designed for daily sleeping, not just occasional guests. The sleep surface is flat and even, with high-resilience foam that keeps its shape. If you'll sleep on it nightly, ask us about adding a memory-foam topper.",
  },
  {
    q: "How long does it take to convert?",
    a: "Click-clack models convert in around 5 seconds, pull-outs in about 10 and fold-outs in about 15. Every mechanism is designed to be opened by one person without removing cushions or using tools.",
  },
  {
    q: "Which size should I choose?",
    a: "Measure the wall the sofa will sit against and the floor in front of it. Our configurator has a room-fit checker: enter your room size and it tells you whether the bed opens comfortably with walking space to spare.",
  },
  {
    q: "Can I choose my own fabric and colour?",
    a: "Absolutely. Every piece is made to order in linen blend, chenille, velvet or leatherette across our colour palette. We can also send fabric swatches before you order.",
  },
  {
    q: "Do you deliver and install?",
    a: `${promises.deliveryNote}. Typical delivery is ${promises.deliveryWindow} from order confirmation, and our team assembles it in your home and shows you how the mechanism works.`,
  },
  {
    q: "What warranty do I get?",
    a: `Every frame and mechanism carries a ${promises.warrantyYears}-year warranty against manufacturing defects. Fabrics and foam are covered for wear issues as per our warranty terms.`,
  },
  {
    q: "Can I pay in EMIs?",
    a: `${promises.emi}. Message us on WhatsApp and we'll share the current options for your bank or card.`,
  },
  {
    q: "How do I care for the fabric?",
    a: "Vacuum weekly with a soft brush attachment and blot spills immediately. Most covers are removable and can be dry-cleaned; leatherette simply wipes clean with a damp cloth.",
  },
];
