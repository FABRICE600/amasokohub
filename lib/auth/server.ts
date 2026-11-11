import { createNeonAuth } from "@neon/auth/next/server";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret =
  process.env.NEON_AUTH_COOKIE_SECRET ?? process.env.BETTER_AUTH_SECRET;

if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL is required to use Neon Auth.");
}

if (!cookieSecret || cookieSecret.length < 32) {
  throw new Error(
    "A Neon Auth cookie secret of at least 32 characters is required.",
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
