import type { NextRequest } from "next/server";
import { handleError, ok, readJson, requireAdmin } from "@/lib/api";
import { createTheater, listTheaters } from "@/services/theater.service";
import { parseCreateTheater, parseTheaterFilters } from "@/services/theater.validation";

// GET /api/theaters?q=brooklyn
export async function GET(request: NextRequest) {
  try {
    const filters = parseTheaterFilters(request.nextUrl.searchParams);
    return ok(await listTheaters(filters));
  } catch (error) {
    return handleError(error, "Failed to fetch theaters");
  }
}

// POST /api/theaters (admin)
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const input = parseCreateTheater(await readJson(request));
    return ok(await createTheater(input), 201);
  } catch (error) {
    return handleError(error, "Failed to create theater");
  }
}
