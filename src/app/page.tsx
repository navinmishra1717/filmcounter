import { Hero } from "@/components/home/hero";
import { MovieListing } from "@/components/home/movie-listing";
import { SiteHeader } from "@/components/common/site-header";
import { COMING_SOON, NOW_SHOWING } from "@/lib/movies";

type Props = {
  searchParams: Promise<{ tab?: string | string[]; q?: string | string[] }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { tab, q } = await searchParams;
  const isSoon = tab === "soon";
  const query = typeof q === "string" ? q.trim().toLowerCase() : "";
  const movies = (isSoon ? COMING_SOON : NOW_SHOWING).filter((m) => m.title.toLowerCase().includes(query));

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MovieListing tab={isSoon ? "soon" : "now"} movies={movies} />
      </main>
    </>
  );
}
