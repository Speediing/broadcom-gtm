export const AUTH_COOKIE = "broadcom_gtm_session";

export function sitePassword(): string | null {
  const password = process.env.SITE_PASSWORD;
  return password && password.length > 0 ? password : null;
}

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function sessionToken(
  password: string | null = sitePassword(),
): Promise<string | null> {
  if (!password) return null;
  const data = new TextEncoder().encode(`broadcom-gtm:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

export async function isValidSession(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const expected = await sessionToken();
  if (!expected) return false;
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i += 1) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export function passwordMatches(input: string): boolean {
  const expected = sitePassword();
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < input.length; i += 1) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}
