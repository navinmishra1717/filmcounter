import { ValidationError } from "./errors";
import type { CreateTheaterInput, TheaterFilters, TheaterInput, UpdateTheaterInput } from "@/types/theater.types";

const REQUIRED_ON_CREATE = ["name", "location", "capacity"] as const;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Errors = Record<string, string>;
type FieldParser = (value: unknown) => { value: unknown } | { error: string };

const nonEmptyString =
  (max: number): FieldParser =>
  (v) =>
    typeof v === "string" && v.trim() && v.trim().length <= max
      ? { value: v.trim() }
      : { error: `must be a non-empty string of at most ${max} characters` };

const FIELDS: { [K in keyof TheaterInput]-?: FieldParser } = {
  name: nonEmptyString(200),
  slug: (v) => (typeof v === "string" && SLUG_RE.test(v) ? { value: v } : { error: "must be lowercase-kebab-case" }),
  location: nonEmptyString(300),
  capacity: (v) =>
    Number.isInteger(v) && (v as number) > 0 && (v as number) <= 100_000
      ? { value: v }
      : { error: "must be a positive integer" },
};

function parseFields(body: unknown, required: readonly string[]): Partial<TheaterInput> {
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
  return out as Partial<TheaterInput>;
}

export function parseCreateTheater(body: unknown): CreateTheaterInput {
  return parseFields(body, REQUIRED_ON_CREATE) as CreateTheaterInput;
}

/** Partial update (PATCH). */
export function parseUpdateTheater(body: unknown): UpdateTheaterInput {
  const input = parseFields(body, []);
  if (Object.keys(input).length === 0) throw new ValidationError({ body: "must contain at least one field" });
  return input;
}

/** Full replacement (PUT): same required fields as create. */
export function parseReplaceTheater(body: unknown): CreateTheaterInput {
  return parseCreateTheater(body);
}

export function parseTheaterFilters(params: URLSearchParams): TheaterFilters {
  const filters: TheaterFilters = {};
  const q = params.get("q")?.trim();
  if (q) filters.q = q;
  return filters;
}
