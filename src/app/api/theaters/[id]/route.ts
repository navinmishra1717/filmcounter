import type { NextRequest } from "next/server";
import { fail, handleError, ok, readJson, requireAdmin } from "@/lib/api";
import { deleteTheater, getTheater, replaceTheater, updateTheater } from "@/services/theater.service";
import { parseReplaceTheater, parseUpdateTheater } from "@/services/theater.validation";

type Context = { params: Promise<{ id: string }> };

// GET /api/theaters/:idOrSlug
export async function GET(_request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const theater = await getTheater(id);
    return theater ? ok(theater) : fail("Theater not found", 404);
  } catch (error) {
    return handleError(error, "Failed to fetch theater");
  }
}

// PATCH /api/theaters/:id (admin) — partial update
export async function PATCH(request: NextRequest, { params }: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await params;
    const input = parseUpdateTheater(await readJson(request));
    return ok(await updateTheater(id, input));
  } catch (error) {
    return handleError(error, "Failed to update theater");
  }
}

// PUT /api/theaters/:id (admin) — full replacement
export async function PUT(request: NextRequest, { params }: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await params;
    const input = parseReplaceTheater(await readJson(request));
    return ok(await replaceTheater(id, input));
  } catch (error) {
    return handleError(error, "Failed to replace theater");
  }
}

// DELETE /api/theaters/:id (admin)
export async function DELETE(request: NextRequest, { params }: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await params;
    await deleteTheater(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error, "Failed to delete theater");
  }
}
