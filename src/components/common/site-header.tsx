import Link from "next/link";
import { BOOKING_FIELDS } from "@/lib/movies";
import { Button, LinkButton } from "@/components/ui";
import { ROUTES } from "@/lib/routes";

export function SiteHeader() {
  return (
    <header className="bg-night">
      <div className="flex items-center gap-4 px-7 py-3.5">
        <Link href={ROUTES.home} className="mr-auto text-[18px] font-extrabold text-paper">
          FILMCOUNTER
        </Link>
        <span className="ml-1.5 flex items-center gap-1.5 border-l border-paper/25 pl-4 text-[12.5px] text-paper/75">
          Your city<span className="text-[9px]">▾</span>
        </span>
        <div className="ml-auto flex items-center gap-[26px]">
          <span aria-label="Search" className="text-[14px] text-paper/70">
            ⌕
          </span>
          <div className="group relative">
            <Link href={ROUTES.home} className="text-[14px] text-paper/85">
              Movies
            </Link>
            {/* Padding (not margin) bridges the gap so hover survives the trip to the panel. */}
            <div className="absolute top-full left-0 z-[5] hidden pt-3.5 group-focus-within:block group-hover:block">
              <div className="min-w-[170px] animate-menu-in border border-divider bg-paper shadow-md">
                <Link href={ROUTES.home} className="block border-b border-divider px-4 py-[11px] text-[13px] text-ink">
                  Now Showing
                </Link>
                <Link href={ROUTES.comingSoon} className="block px-4 py-[11px] text-[13px] text-ink">
                  Coming Soon
                </Link>
              </div>
            </div>
          </div>
          <Link href={ROUTES.home} className="text-[14px] text-paper/85">
            Schedules
          </Link>
          <LinkButton href={ROUTES.signIn}>Sign in</LinkButton>
        </div>
      </div>

      <div className="flex items-center gap-[22px] border-t border-paper/[0.14] px-7 py-3">
        <span className="text-[12.5px] font-bold text-accent">
          Cinema <span className="font-normal text-paper/40">| Movie</span>
        </span>
        {BOOKING_FIELDS.map((field) => (
          <span
            key={field}
            className="flex items-center gap-2 border border-paper/[0.14] bg-paper/[0.06] px-3.5 py-2 text-[12.5px] text-paper/65"
          >
            {field}
            <span className="text-[9px]">▾</span>
          </span>
        ))}
        <Button variant="secondary" className="ml-auto border-paper/30 text-paper hover:bg-transparent active:bg-transparent">
          Buy Now
        </Button>
      </div>
    </header>
  );
}
