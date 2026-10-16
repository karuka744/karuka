export const COOKIE_NAME = "alaaeda_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function hmacSHA256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return s;
}

export async function createSessionToken(): Promise<string> {
  return hmacSHA256(getSecret(), "alaaeda:admin:v1");
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const expected = await createSessionToken();
    if (token.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < token.length; i++) {
      diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}
