import { createHmac } from "node:crypto";
import { createNeonAuth } from "@neon/auth/next/server";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const configuredCookieSecret = [
  process.env.NEON_AUTH_COOKIE_SECRET,
  process.env.BETTER_AUTH_SECRET,
].find((secret) => secret && secret.length >= 32);
const databaseUrl = process.env.DATABASE_URL;
// Derive a purpose-specific key from Neon’s server-only credential when no long dedicated secret is configured.
const cookieSecret =
  configuredCookieSecret ??
  (databaseUrl
    ? createHmac("sha256", databaseUrl)
        .update("amasoko-hub:neon-auth-cookie:v1")
        .digest("hex")
    : undefined);

if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL is required to use Neon Auth.");
}

if (!cookieSecret) {
  throw new Error(
    "Neon Auth needs a 32+ character cookie secret or a configured Neon database URL.",
  );
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
    sessionDataTtl: 60,
    sameSite: process.env.NODE_ENV === "development" ? "none" : "lax",
  },
});

export function isAllowedAdminEmail(email: string) {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return (
    Boolean(configuredEmail) && email.trim().toLowerCase() === configuredEmail
  );
}

export async function requireAdmin() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/admin/sign-in");
  }

  if (!isAllowedAdminEmail(session.user.email) || !session.user.emailVerified) {
    redirect("/admin/sign-in?issue=verification");
  }

  return session;
}
