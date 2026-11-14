"use client";

import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Ornament } from "@/components/ui/Ornament";
import ProductCard from "@/components/ui/ProductCard";
import { type Mechanism, type Product, type Seats, fabrics, mechanisms, products, seatLabel } from "@/lib/products";
import { cn, discountPercent, formatINR } from "@/lib/utils";

export interface InitialFilters {
  seats: Seats[];
  storage: boolean;
}

type Sort = "featured" | "price-asc" | "price-desc" | "discount";

const PRICE_MIN = Math.floor(Math.min(...products.map((p) => p.price)) / 1000) * 1000;
const PRICE_MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / 1000) * 1000;

const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  discount: "Best savings",
};

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const countFor = (pred: (p: Product) => boolean) => products.filter(pred).length;

export default function ShopPageContent({ initial }: { initial: InitialFilters }) {
  const [query, setQuery] = useState("");
  const [seats, setSeats] = useState<Seats[]>(initial.seats);
  const [mechs, setMechs] = useState<Mechanism[]>([]);
  const [storage, setStorage] = useState(initial.storage);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [colour, setColour] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!q || `${p.name} ${p.tagline} ${p.material}`.toLowerCase().includes(q)) &&
        (!seats.length || seats.includes(p.seats)) &&
        (!mechs.length || mechs.includes(p.mechanism)) &&
        (!storage || p.storage) &&
        p.price <= maxPrice &&
        (!colour || p.fabrics.includes(colour)),
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "discount") list.sort((a, b) => discountPercent(b.price, b.mrp) - discountPercent(a.price, a.mrp));
    return list;
  }, [query, seats, mechs, storage, maxPrice, colour, sort]);

  const chips: { label: string; clear: () => void }[] = [
    ...seats.map((s) => ({ label: seatLabel(s), clear: () => setSeats((v) => v.filter((x) => x !== s)) })),
    ...mechs.map((m) => ({ label: mechanisms[m].label, clear: () => setMechs((v) => v.filter((x) => x !== m)) })),
    ...(storage ? [{ label: "With storage", clear: () => setStorage(false) }] : []),
    ...(maxPrice < PRICE_MAX ? [{ label: `Under ${formatINR(maxPrice)}`, clear: () => setMaxPrice(PRICE_MAX) }] : []),
    ...(colour ? [{ label: fabrics.find((f) => f.id === colour)?.name ?? colour, clear: () => setColour(null) }] : []),
  ];

  const reset = () => {
    setQuery("");
    setSeats([]);
    setMechs([]);
    setStorage(false);
    setMaxPrice(PRICE_MAX);
    setColour(null);
  };

  const checkRow = (checked: boolean, onChange: () => void, label: string, count: number) => (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-[15px]">
      <span className="flex items-center gap-3">
        <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[hsl(152_33%_20%)]" />
        {label}
      </span>
      <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
    </label>
  );

  const filterPanel = (
    <div className="space-y-8">
      <fieldset>
        <legend className="label">Size</legend>
        {([1, 2, 3] as Seats[]).map((s) => (
          <div key={s}>{checkRow(seats.includes(s), () => setSeats((v) => toggle(v, s)), seatLabel(s), countFor((p) => p.seats === s))}</div>
        ))}
      </fieldset>

      <fieldset>
        <legend className="label">Mechanism</legend>
        {(Object.keys(mechanisms) as Mechanism[]).map((m) => (
          <div key={m}>{checkRow(mechs.includes(m), () => setMechs((v) => toggle(v, m)), mechanisms[m].label, countFor((p) => p.mechanism === m))}</div>
        ))}
      </fieldset>

      <fieldset>
        <legend className="label">Features</legend>
        {checkRow(storage, () => setStorage((v) => !v), "Under-seat storage", countFor((p) => p.storage))}
      </fieldset>

      <fieldset>
        <legend className="label">Max price</legend>
        <input
          type="range"
          className="range mt-3"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
        />
        <div className="mt-3 flex justify-between text-sm text-muted-foreground">
          <span>{formatINR(PRICE_MIN)}</span>
          <span className="text-foreground">{formatINR(maxPrice)}</span>
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Colour</legend>
        <div className="flex flex-wrap gap-2.5">
          {fabrics.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={colour === f.id}
              aria-label={f.name}
              title={f.name}
              onClick={() => setColour((c) => (c === f.id ? null : f.id))}
              className={cn(
                "h-8 w-8 rounded-full border-[3px] border-background",
                colour === f.id ? "shadow-[0_0_0_1.5px_hsl(var(--foreground))]" : "shadow-[0_0_0_1px_hsl(var(--border))]",
              )}
              style={{ backgroundColor: f.hex }}
            />
          ))}
        </div>
      </fieldset>

      <button type="button" onClick={reset} className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="container-page pb-24 pt-12 sm:pt-16">
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">
          Sofa cum <em className="text-primary">beds</em>
        </h1>
        <Ornament className="mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Every design is made to order in your choice of fabric and colour.</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection"
                className="w-full bg-transparent py-2 pl-7 text-base placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={() => setPanelOpen(true)} className="-my-2 flex min-h-11 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] lg:hidden">
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
                Filters{chips.length > 0 && ` (${chips.length})`}
              </button>
              <span className="hidden text-sm text-muted-foreground sm:inline">{results.length} designs</span>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent py-2 text-base font-medium focus:outline-none">
                  {(Object.keys(sortLabels) as Sort[]).map((s) => (
                    <option key={s} value={s}>
                      {sortLabels[s]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.clear}
                  className="flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-xs uppercase tracking-[0.15em] hover:border-foreground/50"
                >
                  {c.label}
                  <X className="h-3 w-3" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          )}

          {results.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="frame px-6 py-20 text-center">
              <h2 className="text-3xl">Nothing quite matches</h2>
              <p className="mx-auto mt-3 max-w-sm text-muted-foreground">Try widening your filters — or design exactly what you want in the configurator.</p>
              <button type="button" onClick={reset} className="btn-outline mt-8">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {panelOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="animate-fade-in absolute inset-0 bg-forest/60" onClick={() => setPanelOpen(false)} aria-hidden />
          <div role="dialog" aria-modal="true" aria-label="Filters" className="animate-sheet-in absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif text-2xl">Filters</span>
              <button type="button" onClick={() => setPanelOpen(false)} className="p-1" aria-label="Close filters">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            {filterPanel}
            <button type="button" onClick={() => setPanelOpen(false)} className="btn-primary mt-8 w-full">
              Show {results.length} designs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
