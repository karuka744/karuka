import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, COOKIE_MAX_AGE, createSessionToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const expected = process.env.ADMIN_CODE;
  if (!expected) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  if (!body.code || body.code !== expected) {
    // slow down brute-force attempts
    await new Promise((r) => setTimeout(r, 900));
    return NextResponse.json({ error: "invalid-code" }, { status: 401 });
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
