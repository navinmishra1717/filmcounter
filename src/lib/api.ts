import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { ServiceError, ValidationError } from "@/services/errors";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json({ success: false, message, ...(errors && { errors }) }, { status });
}

/** Maps thrown errors to JSON responses. Unknown errors become a generic 500. */
export function handleError(error: unknown, fallbackMessage: string) {
  if (error instanceof ServiceError) return fail(error.message, error.status, error.details);
  console.error(fallbackMessage, error);
  return fail(fallbackMessage, 500);
}

export async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ValidationError({ body: "must be valid JSON" });
  }
}

/**
 * Temporary admin guard until real admin auth exists: requires
 * `Authorization: Bearer <ADMIN_API_KEY>`. Returns an error response to send
 * back, or null when the caller is allowed.
 */
export function requireAdmin(request: NextRequest) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) return fail("Admin API is not configured", 503);

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return fail("Unauthorized", 401);

  return null;
}
