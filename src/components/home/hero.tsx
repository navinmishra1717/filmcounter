import { HERO_POSTER_FILLS } from "@/lib/movies";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-[400px] overflow-hidden bg-night">
      <div
        className="absolute inset-0 grid grid-cols-10 gap-1 opacity-[0.28] contrast-[1.08] grayscale"
        aria-hidden="true"
      >
        {HERO_POSTER_FILLS.map((fill, i) => (
          <div key={i} className="aspect-[2/3]" style={{ background: fill }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,20,19,.94)_5%,rgba(21,20,19,.35)_55%,rgba(21,20,19,.75))]" />
      <div className="relative flex min-h-[400px] flex-col justify-end px-10 py-12">
        <span className="mb-2.5 text-[11px] tracking-[0.14em] text-accent uppercase">Now showing</span>
        <h1 className="mb-[18px] max-w-[14ch] text-[48px] leading-[1.12] font-extrabold tracking-[-0.015em] text-paper">
          Fall Two: Deadpoint
        </h1>
        <Button className="mb-5 self-start">Buy Now</Button>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-0.5 w-[22px] bg-accent" />
          <span className="h-0.5 w-[22px] bg-paper/30" />
          <span className="h-0.5 w-[22px] bg-paper/30" />
          <span className="h-0.5 w-[22px] bg-paper/30" />
        </div>
      </div>
      <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[22px] text-paper/50" aria-hidden="true">
        ‹
      </span>
      <span className="absolute top-1/2 right-4 -translate-y-1/2 text-[22px] text-paper/50" aria-hidden="true">
        ›
      </span>
    </section>
  );
}
