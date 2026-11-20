import { ValidationError } from "./errors";
import {
  CERTIFICATIONS,
  MOVIE_STATUSES,
  type CreateMovieInput,
  type MovieFilters,
  type MovieInput,
  type UpdateMovieInput,
} from "@/types/movie.types";

const REQUIRED_ON_CREATE = ["title", "language", "genres", "certification", "status"] as const;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

type Errors = Record<string, string>;
type FieldParser = (value: unknown) => { value: unknown } | { error: string };

const nonEmptyString =
  (max: number): FieldParser =>
  (v) =>
    typeof v === "string" && v.trim() && v.trim().length <= max
      ? { value: v.trim() }
      : { error: `must be a non-empty string of at most ${max} characters` };

const oneOf =
  (options: readonly string[]): FieldParser =>
  (v) =>
    typeof v === "string" && options.includes(v) ? { value: v } : { error: `must be one of: ${options.join(", ")}` };

const nullable =
  (parse: FieldParser): FieldParser =>
  (v) =>
    v === null ? { value: null } : parse(v);

const FIELDS: { [K in keyof MovieInput]-?: FieldParser } = {
  title: nonEmptyString(200),
  slug: (v) => (typeof v === "string" && SLUG_RE.test(v) ? { value: v } : { error: "must be lowercase-kebab-case" }),
  description: (v) =>
    typeof v === "string" && v.length <= 5000
      ? { value: v.trim() }
      : { error: "must be a string of at most 5000 characters" },
  language: nonEmptyString(50),
  genres: (v) => {
    if (!Array.isArray(v) || v.length === 0 || !v.every((g) => typeof g === "string" && g.trim())) {
      return { error: "must be a non-empty array of strings" };
    }
    return { value: [...new Set(v.map((g: string) => g.trim()))] };
  },
  certification: oneOf(CERTIFICATIONS),
  status: oneOf(MOVIE_STATUSES),
  superhit: (v) => (typeof v === "boolean" ? { value: v } : { error: "must be a boolean" }),
  durationMinutes: nullable((v) =>
    Number.isInteger(v) && (v as number) > 0 && (v as number) < 1000
      ? { value: v }
      : { error: "must be a positive integer" },
  ),
  releaseDate: nullable((v) =>
    typeof v === "string" && DATE_RE.test(v) && !Number.isNaN(Date.parse(v))
      ? { value: v }
      : { error: "must be a date in YYYY-MM-DD format" },
  ),
  posterUrl: nullable((v) => {
    if (typeof v !== "string") return { error: "must be a URL" };
    try {
      const { protocol } = new URL(v);
      return protocol === "https:" || protocol === "http:" ? { value: v } : { error: "must be an http(s) URL" };
    } catch {
      return { error: "must be a URL" };
    }
  }),
  posterFill: (v) =>
    typeof v === "string" && HEX_RE.test(v) ? { value: v } : { error: "must be a hex colour like #d7d3d3" },
};

function parseFields(body: unknown, required: readonly string[]): Partial<MovieInput> {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new ValidationError({ body: "must be a JSON object" });
  }

  const input = body as Record<string, unknown>;
  const errors: Errors = {};
  const out: Record<string, unknown> = {};

  for (const key of Object.keys(input)) {
    if (!(key in FIELDS)) errors[key] = "is not an editable field";
  }
  for (const key of required) {
    if (input[key] === undefined) errors[key] = "is required";
  }
  for (const [key, parse] of Object.entries(FIELDS)) {
    if (input[key] === undefined || errors[key]) continue;
    const result = parse(input[key]);
    if ("error" in result) errors[key] = result.error;
    else out[key] = result.value;
  }

  if (Object.keys(errors).length > 0) throw new ValidationError(errors);
  return out as Partial<MovieInput>;
}

export function parseCreateMovie(body: unknown): CreateMovieInput {
  return parseFields(body, REQUIRED_ON_CREATE) as CreateMovieInput;
}

/** Partial update (PATCH). */
export function parseUpdateMovie(body: unknown): UpdateMovieInput {
  const input = parseFields(body, []);
  if (Object.keys(input).length === 0) throw new ValidationError({ body: "must contain at least one field" });
  return input;
}

/** Full replacement (PUT): same required fields as create. */
export function parseReplaceMovie(body: unknown): CreateMovieInput {
  return parseCreateMovie(body);
}

export function parseMovieFilters(params: URLSearchParams): MovieFilters {
  const errors: Errors = {};
  const filters: MovieFilters = {};

  const status = params.get("status");
  if (status !== null) {
    if ((MOVIE_STATUSES as readonly string[]).includes(status)) filters.status = status as MovieFilters["status"];
    else errors.status = `must be one of: ${MOVIE_STATUSES.join(", ")}`;
  }
  const genre = params.get("genre")?.trim();
  if (genre) filters.genre = genre;
  const q = params.get("q")?.trim();
  if (q) filters.q = q;

  if (Object.keys(errors).length > 0) throw new ValidationError(errors);
  return filters;
}
