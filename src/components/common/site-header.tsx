"use client";

import { useId, useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BOOKING_FIELDS } from "@/lib/movies";
import { Button, Input, LinkButton } from "@/components/ui";
import { ROUTES } from "@/lib/routes";

const MOVIE_TABS = [
  { tab: "now", href: ROUTES.home, label: "Now Showing" },
  { tab: "soon", href: ROUTES.comingSoon, label: "Coming Soon" },
] as const;

// "Movies" link with an underline that grows in on hover, and a hover popover listing the movie tabs.
function MoviesMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const currentTab = pathname === ROUTES.home ? (searchParams.get("tab") === "soon" ? "soon" : "now") : null;

  const menu = (
    <nav aria-label="Movies" className="flex w-64 flex-col py-1.5">
      {MOVIE_TABS.map((item) => (
        <Link
          key={item.tab}
          href={item.href}
          scroll={false}
          onClick={() => setOpen(false)}
          aria-current={item.tab === currentTab ? "page" : undefined}
          className="group/item flex items-center gap-3 border-l-[3px] border-transparent px-4 py-3 transition-colors hover:border-accent hover:bg-accent-100 aria-[current=page]:border-accent"
        >
          <span className="flex-1">
            <span className="block text-[15px] font-semibold text-ink group-hover/item:text-accent-700">
              {item.label}
            </span>
          </span>
          <span
            aria-hidden
            className="-translate-x-1 text-accent opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100"
          >
            →
          </span>
        </Link>
      ))}
    </nav>
  );

  return (
    <Popover
      content={menu}
      open={open}
      onOpenChange={setOpen}
      trigger={["hover", "focus"]}
      placement="bottomRight"
      arrow={false}
      align={{ offset: [0, 12] }}
      classNames={{ container: "rounded-none border border-t-2 border-divider border-t-accent bg-paper p-0 shadow-lg" }}
    >
      <Link
        href={ROUTES.home}
        data-open={open}
        className="relative py-1 text-[14px] text-paper/85 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:text-paper hover:after:scale-x-100 data-[open=true]:text-paper data-[open=true]:after:scale-x-100 sm:text-[16px]"
      >
        Movies
      </Link>
    </Popover>
  );
}

// Shows only the search icon until hovered (or focused via keyboard), then reveals the input.
function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = useId();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const open = hovered || focused;

  function search() {
    const params = new URLSearchParams(searchParams);
    const q = query.trim();
    if (q) params.set("q", q);
    else params.delete("q");
    const qs = params.toString();
    router.push(qs ? `${ROUTES.home}?${qs}` : ROUTES.home, { scroll: false });
  }

  // Searches when there's something to apply; otherwise opens and focuses the input
  // (this is also how touch users, who can't hover, get to the input).
  function handleIconClick() {
    if (open && (query.trim() || searchParams.has("q"))) {
      search();
      return;
    }
    setFocused(true);
    requestAnimationFrame(() => document.getElementById(inputId)?.focus());
  }

  function handleBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  }

  return (
    <div
      role="search"
      data-open={open}
      className="z-10 flex h-9 items-center rounded-full border border-transparent px-1.5 transition-colors duration-300 data-[open=true]:border-divider data-[open=true]:bg-paper max-sm:data-[open=true]:absolute max-sm:data-[open=true]:inset-x-4 max-sm:data-[open=true]:px-3 sm:px-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-label="Search"
        onClick={handleIconClick}
        className="flex items-center text-[18px] text-paper/70 hover:text-paper data-[open=true]:text-ink/60 data-[open=true]:hover:text-accent"
        data-open={open}
      >
        <SearchOutlined />
      </button>
      {/* Always mounted so the width can animate; collapsed to 0 when closed. Fixed row height keeps the header from jumping. */}
      <div
        data-open={open}
        className="w-0 overflow-hidden opacity-0 transition-[width,margin,opacity] duration-300 ease-out data-[open=true]:ml-2 data-[open=true]:w-40 data-[open=true]:opacity-100 max-sm:data-[open=true]:flex-1"
      >
        <Input
          id={inputId}
          aria-label="Search movies"
          placeholder="Movie,title, genre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={search}
          allowClear
          tabIndex={open ? 0 : -1}
          className="min-h-7 w-40 border-0 bg-transparent p-0 shadow-none focus-within:shadow-none hover:bg-transparent focus:shadow-none max-sm:w-full"
        />
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="bg-night">
      <div className="relative flex items-center gap-2 px-4 py-3.5 sm:gap-4 sm:px-7">
        <Link href={ROUTES.home} className="mr-auto shrink-0 text-[15px] font-extrabold text-paper sm:text-[20px]">
          FILMCOUNTER
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-[26px]">
          <HeaderSearch />
          <MoviesMenu />
          <LinkButton href={ROUTES.signIn} className="whitespace-nowrap max-sm:px-2.5 max-sm:text-[13px]">
            Sign in
          </LinkButton>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-paper/[0.14] px-4 py-3 sm:px-7 md:flex md:items-center md:gap-[22px]">
        <span className="col-span-2 text-[12.5px] font-bold text-accent">
          Cinema <span className="font-normal text-paper/40">| Movie</span>
        </span>
        {BOOKING_FIELDS.map((field) => (
          <span
            key={field}
            className="flex items-center justify-between gap-2 border border-paper/[0.14] bg-paper/[0.06] px-3.5 py-2 text-[12.5px] whitespace-nowrap text-paper/65"
          >
            {field}
            <span className="text-[9px]">▾</span>
          </span>
        ))}
        <Button
          variant="secondary"
          className="border-paper/30 text-paper hover:bg-transparent active:bg-transparent md:ml-auto"
        >
          Buy Now
        </Button>
      </div>
    </header>
  );
}
