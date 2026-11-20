import type { NextRequest } from "next/server";
import { handleError, ok, readJson, requireAdmin } from "@/lib/api";
import { createMovie, listMovies } from "@/services/movie.service";
import { parseCreateMovie, parseMovieFilters } from "@/services/movie.validation";

// GET /api/movies?status=now_showing|coming_soon&genre=Drama&q=moon
export async function GET(request: NextRequest) {
  try {
    const filters = parseMovieFilters(request.nextUrl.searchParams);
    return ok(await listMovies(filters));
  } catch (error) {
    return handleError(error, "Failed to fetch movies");
  }
}

// POST /api/movies (admin)
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const input = parseCreateMovie(await readJson(request));
    return ok(await createMovie(input), 201);
  } catch (error) {
    return handleError(error, "Failed to create movie");
  }
}
