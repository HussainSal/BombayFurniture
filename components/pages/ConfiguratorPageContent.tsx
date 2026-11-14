"use client";

import { Check, Copy, Minus, PhoneCall, Plus, RotateCcw } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import EnquiryForm from "@/components/ui/EnquiryForm";
import FabricSwatches from "@/components/ui/FabricSwatches";
import Modal from "@/components/ui/Modal";
import ModeToggle from "@/components/ui/ModeToggle";
import { Ornament } from "@/components/ui/Ornament";
import SofaDrawing, { type SofaMode } from "@/components/ui/SofaDrawing";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  type AddOn,
  CLEARANCE_CM,
  type Config,
  type FitStatus,
  type Material,
  addOns,
  armPrice,
  basePrice,
  configToParams,
  defaultConfig,
  materials,
  mechanismPrice,
  quote,
  roomFit,
  storagePrice,
} from "@/lib/configurator";
import { type ArmStyle, type Mechanism, type Seats, armLabel, fabrics, getFabric, mechanisms, seatLabel } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { cmToFeet, cn, formatINR, sqFt, whatsappLink } from "@/lib/utils";

const numerals = ["I", "II", "III", "IV", "V"];

function signed(n: number) {
  if (n === 0) return "Included";
  return `${n > 0 ? "+" : "−"}${formatINR(Math.abs(n))}`;
}

function Step({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <section className="border-b border-border py-7 last:border-0">
      <h2 className="mb-4 flex items-baseline gap-3 text-xl">
        <span className="font-serif italic text-brass">{numerals[index]}.</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Option({ active, onClick, title, note }: { active: boolean; onClick: () => void; title: string; note?: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "w-full border px-3.5 py-3 text-left transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/50",
      )}
    >
      <span className="block text-[15px] font-medium leading-snug">{title}</span>
      {note && <span className={cn("mt-0.5 block text-xs", active ? "text-primary-foreground/75" : "text-muted-foreground")}>{note}</span>}
    </button>
  );
}

const fitCopy: Record<FitStatus, { label: string; body: string; tone: string }> = {
  comfortable: { label: "Fits comfortably", body: "The bed opens fully with walking space to spare.", tone: "border-primary/40 bg-primary/5 text-primary" },
  tight: { label: "Fits, but snug", body: `The bed opens, with under ${CLEARANCE_CM} cm to walk around it.`, tone: "border-brass/60 bg-brass/10 text-brass-ink" },
  "no-fit": { label: "Won't open fully", body: "Try a smaller size or a click-clack — it needs far less depth.", tone: "border-oxblood/40 bg-oxblood/5 text-oxblood" },
};

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const set = (v: number) => onChange(Math.min(30, Math.max(6, v)));
  return (
    <div>
      <span className="label">{label}</span>
      <div className="flex items-center border border-input bg-card">
        <button type="button" onClick={() => set(value - 1)} className="flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground" aria-label={`Decrease ${label}`}>
          <Minus className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <input
          type="number"
          min={6}
          max={30}
          value={value}
          onChange={(e) => set(Number(e.target.value) || 6)}
          className="h-11 w-full bg-transparent text-center font-serif text-xl tabular-nums focus:outline-none"
          aria-label={`${label} in feet`}
        />
        <span className="text-xs text-muted-foreground">ft</span>
        <button type="button" onClick={() => set(value + 1)} className="flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground" aria-label={`Increase ${label}`}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export default function ConfiguratorPageContent({ initial }: { initial: Config }) {
  const [c, setC] = useState<Config>(initial);
  const [mode, setMode] = useState<SofaMode>("sofa");
  const [roomL, setRoomL] = useState(12);
  const [roomW, setRoomW] = useState(10);
  const [copied, setCopied] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const update = <K extends keyof Config>(key: K, value: Config[K]) => setC((prev) => ({ ...prev, [key]: value }));
  const fabric = getFabric(c.fabric);
  const { items, total } = quote(c);
  const fit = roomFit(c, roomL, roomW);
  const { fp } = fit;
  const fitInfo = fitCopy[fit.status];

  // Keep the URL shareable as the configuration changes
  useEffect(() => {
    window.history.replaceState(null, "", `${window.location.pathname}?${configToParams(c).toString()}`);
  }, [c]);

  const summary = [
    `${seatLabel(c.seats)} sofa cum bed — ${mechanisms[c.mechanism].label}, ${armLabel[c.arms].toLowerCase()}`,
    `Upholstery: ${materials[c.material].label} in ${fabric.name}`,
    c.storage ? "With under-seat storage" : "",
    c.addOns.length ? `Add-ons: ${c.addOns.map((a) => addOns[a].label).join(", ")}` : "",
    `Indicative price: ${formatINR(total)}`,
  ]
    .filter(Boolean)
    .join("\n");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address bar already holds the link */
    }
  }

  // Floor plan geometry (cm → px)
  const scale = Math.min(280 / fit.roomW, 200 / fit.roomD);
  const roomPx = { w: fit.roomW * scale, h: fit.roomD * scale };
  const x = ((fit.roomW - fp.bed.w) / 2) * scale;
  const drawingProps = { color: fabric.hex, seats: c.seats, arms: c.arms, storage: c.storage };

  return (
    <div className="container-page pb-24 pt-12 sm:pt-16">
      <header className="mb-12 text-center">
        <p className="eyebrow">Bespoke</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">
          Design your <em className="text-primary">own</em>
        </h1>
        <Ornament className="mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Every choice updates the drawing, room-fit and price instantly. Share the link, or send it to us for a final quote.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-8">
        {/* Drawing — first on phones so every choice is seen as it's made */}
        <div className="frame p-5 sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-start xl:col-span-8 xl:col-start-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">Your design</p>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
          {/* Two static drawings, cross-faded with CSS */}
          <div className="relative mt-4 aspect-[480/260]">
            {(["sofa", "bed"] as const).map((m) => (
              <SofaDrawing
                key={m}
                mode={m}
                {...drawingProps}
                className={cn(
                  "absolute inset-0 h-full w-full transition-all duration-500",
                  mode === m ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              />
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 border-t border-border sm:grid-cols-4">
            {[
              ["As a sofa", `${fp.sofa.w} × ${fp.sofa.d} cm`],
              ["As a bed", `${fp.bed.w} × ${fp.bed.d} cm`],
              ["Sleeping area", `${cmToFeet(fp.bed.w)} × ${cmToFeet(fp.bed.d)}`],
              ["Floor freed", `${sqFt(fp.bed.w, fp.bed.d)} sq ft`],
            ].map(([k, v]) => (
              <div key={k} className="pt-4">
                <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-serif text-lg tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Choices */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 xl:col-span-4">
          <Step index={0} title="Size">
            <div role="radiogroup" aria-label="Size" className="grid grid-cols-3 gap-2">
              {([1, 2, 3] as Seats[]).map((s) => (
                <Option key={s} active={c.seats === s} onClick={() => update("seats", s)} title={seatLabel(s)} note={formatINR(basePrice[s])} />
              ))}
            </div>
          </Step>

          <Step index={1} title="Mechanism">
            <div role="radiogroup" aria-label="Mechanism" className="grid gap-2">
              {(Object.keys(mechanisms) as Mechanism[]).map((m) => (
                <Option
                  key={m}
                  active={c.mechanism === m}
                  onClick={() => update("mechanism", m)}
                  title={`${mechanisms[m].label} — ${mechanisms[m].time}`}
                  note={`${signed(mechanismPrice[m])} · ${mechanisms[m].summary}`}
                />
              ))}
            </div>
          </Step>

          <Step index={2} title="Arms">
            <div role="radiogroup" aria-label="Arm style" className="grid grid-cols-3 gap-2">
              {(Object.keys(armLabel) as ArmStyle[]).map((a) => (
                <Option key={a} active={c.arms === a} onClick={() => update("arms", a)} title={armLabel[a]} note={signed(armPrice[a])} />
              ))}
            </div>
          </Step>

          <Step index={3} title="Upholstery & colour">
            <div role="radiogroup" aria-label="Upholstery" className="grid grid-cols-2 gap-2">
              {(Object.keys(materials) as Material[]).map((m) => (
                <Option
                  key={m}
                  active={c.material === m}
                  onClick={() => update("material", m)}
                  title={materials[m].label}
                  note={materials[m].perSeat ? `+${formatINR(materials[m].perSeat)} per seat` : "Included"}
                />
              ))}
            </div>
            <FabricSwatches ids={fabrics.map((f) => f.id)} value={c.fabric} onChange={(id) => update("fabric", id)} className="mt-5" />
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="text-foreground">{fabric.name}</span> · {materials[c.material].note}
            </p>
          </Step>

          <Step index={4} title="Storage & finishing touches">
            <div className="space-y-1">
              {[
                { key: "storage", label: "Under-seat storage", price: storagePrice, checked: c.storage, toggle: () => update("storage", !c.storage) },
                ...(Object.keys(addOns) as AddOn[]).map((a) => ({
                  key: a,
                  label: addOns[a].label,
                  price: addOns[a].price,
                  checked: c.addOns.includes(a),
                  toggle: () => update("addOns", c.addOns.includes(a) ? c.addOns.filter((x) => x !== a) : [...c.addOns, a]),
                })),
              ].map((row) => (
                <label key={row.key} className="flex cursor-pointer items-center justify-between gap-3 py-2 text-[15px]">
                  <span className="flex items-center gap-3">
                    <input type="checkbox" checked={row.checked} onChange={row.toggle} className="h-4 w-4 accent-[hsl(152_33%_20%)]" />
                    {row.label}
                  </span>
                  <span className="text-sm tabular-nums text-muted-foreground">+{formatINR(row.price)}</span>
                </label>
              ))}
            </div>
          </Step>

          <button type="button" onClick={() => setC(defaultConfig)} className="mt-2 flex min-h-11 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            Start over
          </button>
        </div>

        {/* Room fit + quote */}
        <div id="quote" className="scroll-mt-24 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start xl:col-span-8 xl:col-start-5">
            <div className="grid gap-8 xl:grid-cols-2">
              {/* Room fit */}
              <div className="frame p-6 sm:p-8">
                <h2 className="text-2xl">Will it fit?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Measure the wall it will stand against, then the room&apos;s depth.</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Stepper label="Wall" value={roomL} onChange={setRoomL} />
                  <Stepper label="Depth" value={roomW} onChange={setRoomW} />
                </div>
                <div className="mt-5 flex justify-center bg-surface/70 p-4">
                  <svg viewBox={`-4 -4 ${roomPx.w + 8} ${roomPx.h + 8}`} className="h-auto w-full max-w-[300px]" role="img" aria-label={`Floor plan of a ${roomL} by ${roomW} ft room with the bed open`}>
                    <defs>
                      <pattern id="clear-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="6" stroke="hsl(152 33% 20%)" strokeWidth="1.2" strokeOpacity="0.35" />
                      </pattern>
                    </defs>
                    <rect x={0} y={0} width={roomPx.w} height={roomPx.h} fill="hsl(40 50% 97%)" stroke="#2a241c" strokeWidth={2} />
                    <rect x={x} y={fp.bed.d * scale} width={fp.bed.w * scale} height={CLEARANCE_CM * scale} fill="url(#clear-hatch)" />
                    <rect
                      x={x}
                      y={0}
                      width={fp.bed.w * scale}
                      height={fp.bed.d * scale}
                      fill={fabric.hex}
                      fillOpacity={0.15}
                      stroke={fit.status === "no-fit" ? "hsl(6 50% 30%)" : fabric.hex}
                      strokeDasharray="4 3"
                      strokeWidth={1.4}
                    />
                    <rect x={x} y={0} width={fp.sofa.w * scale} height={fp.sofa.d * scale} fill={fabric.hex} />
                  </svg>
                </div>
                <div className={cn("mt-4 border px-4 py-3", fitInfo.tone)} role="status">
                  <p className="font-serif text-lg">{fitInfo.label}</p>
                  <p className="text-sm opacity-90">{fitInfo.body}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="flex flex-col bg-forest p-6 text-ivory sm:p-8">
                <h2 className="text-2xl text-ivory">Your quote</h2>
                <p className="mt-1 text-sm text-ivory/65">Indicative, including GST. Confirmed by our team.</p>
                <ul className="mt-6 space-y-2.5 text-[15px]">
                  {items.map((item) => (
                    <li key={item.label} className="flex justify-between gap-3">
                      <span className="text-ivory/75">{item.label}</span>
                      <span className="tabular-nums">{item.amount < 0 ? `−${formatINR(-item.amount)}` : formatINR(item.amount)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-baseline justify-between border-t border-ivory/20 pt-5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-brass-light">Total</span>
                  <span className="font-serif text-4xl tabular-nums">{formatINR(total)}</span>
                </div>
                <div className="mt-8 grid gap-3">
                  <a href={whatsappLink(`Hello ${siteConfig.name}! I designed this on your website:\n\n${summary}`)} target="_blank" rel="noopener noreferrer" className="btn-brass">
                    <WhatsAppIcon className="h-4 w-4" />
                    Send on WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setEnquiryOpen(true)} className="btn-ghost-light px-3">
                      <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
                      Callback
                    </button>
                    <button type="button" onClick={copyLink} className="btn-ghost-light px-3" aria-live="polite">
                      {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
                      {copied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Sticky running total — phones & tablets */}
      <div
        data-mobile-bar
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(20,37,32,0.25)] lg:hidden"
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <SofaDrawing mode="sofa" {...drawingProps} dressed={false} className="h-11 w-20 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {seatLabel(c.seats)} · {fabric.name}
            </p>
            <p className="font-serif text-xl tabular-nums leading-tight">{formatINR(total)}</p>
          </div>
          <a href="#quote" className="btn-primary shrink-0 px-5 py-3.5">
            View quote
          </a>
        </div>
      </div>

      <Modal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} title="Your final quote">
        <EnquiryForm context={summary} submitLabel="Send my design" />
      </Modal>
    </div>
  );
}
