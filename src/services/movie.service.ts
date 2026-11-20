import { COMING_SOON, NOW_SHOWING, type Movie as ListingMovie } from "@/lib/movies";
import { slugify } from "@/lib/slug";
import { ConflictError, NotFoundError } from "./errors";
import type {
  Certification,
  CreateMovieInput,
  Movie,
  MovieFilters,
  MovieStatus,
  UpdateMovieInput,
} from "@/types/movie.types";

/*
 * In-memory store. This is a stand-in until a database is added: data resets
 * on server restart and is not shared between serverless instances. Only this
 * file needs to change when swapping in a real data source.
 */

const DEFAULT_POSTER_FILL = "#d7d3d3";

function fromListing(movie: ListingMovie, status: MovieStatus): Movie {
  const [language = "English", genreList = ""] = movie.meta.split("|").map((s) => s.trim());
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    slug: slugify(movie.title),
    title: movie.title,
    description: "",
    language,
    genres: genreList
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean),
    certification: movie.badge as Certification,
    status,
    superhit: movie.superhit,
    durationMinutes: null,
    releaseDate: null,
    posterUrl: null,
    posterFill: movie.fill,
    createdAt: now,
    updatedAt: now,
  };
}

function seed(): Map<string, Movie> {
  const movies = [
    ...NOW_SHOWING.map((m) => fromListing(m, "now_showing")),
    ...COMING_SOON.map((m) => fromListing(m, "coming_soon")),
  ];
  return new Map(movies.map((m) => [m.id, m]));
}

// Keep the store on globalThis so it survives dev hot reloads.
const globalStore = globalThis as typeof globalThis & { __movieStore?: Map<string, Movie> };
const store = (globalStore.__movieStore ??= seed());

function assertSlugAvailable(slug: string, exceptId?: string) {
  for (const movie of store.values()) {
    if (movie.slug === slug && movie.id !== exceptId) {
      throw new ConflictError(`A movie with slug "${slug}" already exists`);
    }
  }
}

function findOrThrow(id: string): Movie {
  const movie = store.get(id);
  if (!movie) throw new NotFoundError("Movie not found");
  return movie;
}

// ---- Read (public) ----

export async function listMovies(filters: MovieFilters = {}): Promise<Movie[]> {
  const genre = filters.genre?.toLowerCase();
  const q = filters.q?.toLowerCase();

  return [...store.values()].filter(
    (m) =>
      (!filters.status || m.status === filters.status) &&
      (!genre || m.genres.some((g) => g.toLowerCase() === genre)) &&
      (!q || m.title.toLowerCase().includes(q)),
  );
}

/** Looks a movie up by id or slug, so detail pages can use readable URLs. */
export async function getMovie(idOrSlug: string): Promise<Movie | null> {
  const byId = store.get(idOrSlug);
  if (byId) return byId;
  for (const movie of store.values()) {
    if (movie.slug === idOrSlug) return movie;
  }
  return null;
}

// ---- Write (admin) ----

export async function createMovie(input: CreateMovieInput): Promise<Movie> {
  const slug = input.slug ?? slugify(input.title);
  assertSlugAvailable(slug);

  const now = new Date().toISOString();
  const movie: Movie = {
    description: "",
    superhit: false,
    durationMinutes: null,
    releaseDate: null,
    posterUrl: null,
    posterFill: DEFAULT_POSTER_FILL,
    ...input,
    slug,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  store.set(movie.id, movie);
  return movie;
}

/** Partial update: only the given fields change. */
export async function updateMovie(id: string, input: UpdateMovieInput): Promise<Movie> {
  const existing = findOrThrow(id);
  if (input.slug) assertSlugAvailable(input.slug, id);

  const movie: Movie = {
    ...existing,
    ...input,
    id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  store.set(id, movie);
  return movie;
}

/** Full replacement: omitted optional fields fall back to their defaults. */
export async function replaceMovie(id: string, input: CreateMovieInput): Promise<Movie> {
  const existing = findOrThrow(id);
  const slug = input.slug ?? slugify(input.title);
  assertSlugAvailable(slug, id);

  const movie: Movie = {
    description: "",
    superhit: false,
    durationMinutes: null,
    releaseDate: null,
    posterUrl: null,
    posterFill: DEFAULT_POSTER_FILL,
    ...input,
    slug,
    id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  store.set(id, movie);
  return movie;
}

export async function deleteMovie(id: string): Promise<void> {
  findOrThrow(id);
  store.delete(id);
}
