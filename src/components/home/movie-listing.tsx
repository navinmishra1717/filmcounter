import Link from "next/link";
import type { Movie } from "@/lib/movies";
import { Tag } from "@/components/ui";
import { ROUTES } from "@/lib/routes";

type Props = {
  tab: "now" | "soon";
  movies: Movie[];
};

const tabLink = "font-bold text-neutral-600 underline underline-offset-[3px] aria-[current=page]:text-ink";

export function MovieListing({ tab, movies }: Props) {
  return (
    <section className="bg-paper px-7 pt-[26px] pb-[30px]">
      <nav className="mb-5 flex gap-7 border-b-2 border-divider pb-3.5" aria-label="Movie listings">
        <Link href={ROUTES.home} scroll={false} className={tabLink} aria-current={tab === "now" ? "page" : undefined}>
          Now Showing
        </Link>
        <Link href={ROUTES.comingSoon} scroll={false} className={tabLink} aria-current={tab === "soon" ? "page" : undefined}>
          Coming Soon
        </Link>
      </nav>

      <ul className="grid grid-cols-6 gap-5">
        {movies.map((movie) => (
          <li key={movie.title} className="flex flex-col gap-2.5">
            <div
              className="relative aspect-[2/3] transition-transform duration-150 ease-in-out [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)] hover:-translate-y-1"
              style={{ background: movie.fill }}
            >
              <Tag className="absolute top-[9px] right-[9px]">{movie.badge}</Tag>
              {movie.superhit && (
                <Tag variant="accent" className="absolute top-[9px] left-[9px]">
                  Super Hit
                </Tag>
              )}
            </div>
            <div className="border-t border-dashed border-divider pt-2">
              <div className="text-[13.5px] font-bold">{movie.title}</div>
              <div className="text-[11.5px] text-neutral-700">{movie.meta}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
