import type { NextRequest } from "next/server";
import { fail, handleError, ok, readJson, requireAdmin } from "@/lib/api";
import { deleteMovie, getMovie, replaceMovie, updateMovie } from "@/services/movie.service";
import { parseReplaceMovie, parseUpdateMovie } from "@/services/movie.validation";

type Context = { params: Promise<{ id: string }> };

// GET /api/movies/:idOrSlug
export async function GET(_request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const movie = await getMovie(id);
    return movie ? ok(movie) : fail("Movie not found", 404);
  } catch (error) {
    return handleError(error, "Failed to fetch movie");
  }
}

// PATCH /api/movies/:id (admin) — partial update
export async function PATCH(request: NextRequest, { params }: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await params;
    const input = parseUpdateMovie(await readJson(request));
    return ok(await updateMovie(id, input));
  } catch (error) {
    return handleError(error, "Failed to update movie");
  }
}

// PUT /api/movies/:id (admin) — full replacement
export async function PUT(request: NextRequest, { params }: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await params;
    const input = parseReplaceMovie(await readJson(request));
    return ok(await replaceMovie(id, input));
  } catch (error) {
    return handleError(error, "Failed to replace movie");
  }
}

// DELETE /api/movies/:id (admin)
export async function DELETE(request: NextRequest, { params }: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await params;
    await deleteMovie(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error, "Failed to delete movie");
  }
}
