import { slugify } from "@/lib/slug";
import { ConflictError, NotFoundError } from "./errors";
import type { CreateTheaterInput, Theater, TheaterFilters, UpdateTheaterInput } from "@/types/theater.types";

/*
 * In-memory store. This is a stand-in until a database is added: data resets
 * on server restart and is not shared between serverless instances. Only this
 * file needs to change when swapping in a real data source.
 */

const SEED: CreateTheaterInput[] = [
  { name: "AMC Empire 25", location: "234 W 42nd St, New York, NY 10036", capacity: 500 },
  { name: "Regal Union Square ScreenX & 4DX", location: "850 Broadway, New York, NY 10003", capacity: 300 },
  {
    name: "Alamo Drafthouse Cinema Downtown Brooklyn",
    location: "445 Albee Square W, Brooklyn, NY 11201",
    capacity: 400,
  },
];

function build(input: CreateTheaterInput, id: string, createdAt: string): Theater {
  return {
    ...input,
    slug: input.slug ?? slugify(input.name),
    id,
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

function seed(): Map<string, Theater> {
  const now = new Date().toISOString();
  const theaters = SEED.map((t) => build(t, crypto.randomUUID(), now));
  return new Map(theaters.map((t) => [t.id, t]));
}

// Keep the store on globalThis so it survives dev hot reloads.
const globalStore = globalThis as typeof globalThis & { __theaterStore?: Map<string, Theater> };
const store = (globalStore.__theaterStore ??= seed());

function assertSlugAvailable(slug: string, exceptId?: string) {
  for (const theater of store.values()) {
    if (theater.slug === slug && theater.id !== exceptId) {
      throw new ConflictError(`A theater with slug "${slug}" already exists`);
    }
  }
}

function findOrThrow(id: string): Theater {
  const theater = store.get(id);
  if (!theater) throw new NotFoundError("Theater not found");
  return theater;
}

// ---- Read (public) ----

export async function listTheaters(filters: TheaterFilters = {}): Promise<Theater[]> {
  const q = filters.q?.toLowerCase();
  return [...store.values()].filter(
    (t) => !q || t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q),
  );
}

/** Looks a theater up by id or slug. */
export async function getTheater(idOrSlug: string): Promise<Theater | null> {
  const byId = store.get(idOrSlug);
  if (byId) return byId;
  for (const theater of store.values()) {
    if (theater.slug === idOrSlug) return theater;
  }
  return null;
}

// ---- Write (admin) ----

export async function createTheater(input: CreateTheaterInput): Promise<Theater> {
  const now = new Date().toISOString();
  const theater = build(input, crypto.randomUUID(), now);
  assertSlugAvailable(theater.slug);
  store.set(theater.id, theater);
  return theater;
}

/** Partial update: only the given fields change. */
export async function updateTheater(id: string, input: UpdateTheaterInput): Promise<Theater> {
  const existing = findOrThrow(id);
  if (input.slug) assertSlugAvailable(input.slug, id);

  const theater: Theater = {
    ...existing,
    ...input,
    id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  store.set(id, theater);
  return theater;
}

/** Full replacement: an omitted slug is regenerated from the name. */
export async function replaceTheater(id: string, input: CreateTheaterInput): Promise<Theater> {
  const existing = findOrThrow(id);
  const theater = build(input, id, existing.createdAt);
  assertSlugAvailable(theater.slug, id);
  store.set(id, theater);
  return theater;
}

export async function deleteTheater(id: string): Promise<void> {
  findOrThrow(id);
  store.delete(id);
}
