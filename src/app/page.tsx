import { Hero } from "@/components/home/hero";
import { MovieListing } from "@/components/home/movie-listing";
import { SiteHeader } from "@/components/common/site-header";
import { COMING_SOON, NOW_SHOWING } from "@/lib/movies";

type Props = {
  searchParams: Promise<{ tab?: string | string[] }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { tab } = await searchParams;
  const isSoon = tab === "soon";

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MovieListing tab={isSoon ? "soon" : "now"} movies={isSoon ? COMING_SOON : NOW_SHOWING} />
      </main>
    </>
  );
}
