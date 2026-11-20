export const MOVIE_STATUSES = ["now_showing", "coming_soon"] as const;
export type MovieStatus = (typeof MOVIE_STATUSES)[number];

export const CERTIFICATIONS = ["U", "PG", "Adult"] as const;
export type Certification = (typeof CERTIFICATIONS)[number];

export type Movie = {
  id: string;
  slug: string;
  title: string;
  description: string;
  language: string;
  genres: string[];
  certification: Certification;
  status: MovieStatus;
  superhit: boolean;
  /** Runtime in minutes. */
  durationMinutes: number | null;
  /** ISO date (YYYY-MM-DD). */
  releaseDate: string | null;
  posterUrl: string | null;
  /** Placeholder background shown until a poster is uploaded. */
  posterFill: string;
  createdAt: string;
  updatedAt: string;
};

/** Fields an admin may set. Server-managed fields (id, timestamps) are excluded. */
export type MovieInput = Omit<Movie, "id" | "createdAt" | "updatedAt">;

export type CreateMovieInput = Pick<MovieInput, "title" | "language" | "genres" | "certification" | "status"> &
  Partial<MovieInput>;

export type UpdateMovieInput = Partial<MovieInput>;

export type MovieFilters = {
  status?: MovieStatus;
  genre?: string;
  /** Case-insensitive match on title. */
  q?: string;
};
