"use server";

import { redirect } from "next/navigation";
import { auth, isAllowedAdminEmail } from "@/lib/auth/server";

export type AdminActionState = {
  error?: string;
  message?: string;
  email?: string;
  step?: "verify";
};

const signInError =
  "Unable to sign in. Check your credentials and email verification, then try again.";
const setupError =
  "Unable to create administrator access. Check the configured admin email or sign in if the account already exists.";
const verifyError = "The code could not be verified. Check it and try again.";

type EmailOtpServerApi = {
  verifyEmail(input: { email: string; otp: string }): Promise<{
    error: { code?: string; status?: number } | null;
  }>;
  sendVerificationOtp(input: {
    email: string;
    type: "email-verification";
  }): Promise<{ error: { code?: string; status?: number } | null }>;
};

function getEmailOtpServerApi() {
  // Neon Auth documents these server methods, but the current SDK types the namespace as unknown.
  return auth.emailOtp as unknown as EmailOtpServerApi;
}

function getEmail(formData: FormData) {
  return String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
}

function logAuthFailure(
  operation: string,
  error: { code?: string; status?: number },
) {
  console.warn(`[admin-auth] ${operation} failed`, {
    code: error.code ?? "UNKNOWN",
    status: error.status ?? 0,
  });
}

export async function signInAdmin(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = getEmail(formData);
  const password = String(formData.get("password") ?? "");

  if (!isAllowedAdminEmail(email) || !password || password.length > 128) {
    return { error: signInError };
  }

  try {
    const result = await auth.signIn.email({ email, password });
    if (result.error) {
      logAuthFailure("sign-in", result.error);
      if (result.error.code === "EMAIL_NOT_VERIFIED") {
        return {
          step: "verify",
          email,
          message:
            "A verification code was sent to the administrator inbox. Enter it to activate the account.",
        };
      }
      return { error: signInError };
    }

    const { data: session } = await auth.getSession();
    if (
      !session?.user.emailVerified ||
      !isAllowedAdminEmail(session.user.email)
    ) {
      await auth.signOut();
      return { error: signInError };
    }
  } catch (error) {
    console.error("[admin-auth] Sign-in request could not be completed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return { error: signInError };
  }

  redirect("/admin");
}

export async function signUpAdmin(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = getEmail(formData);
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (
    !isAllowedAdminEmail(email) ||
    name.length < 2 ||
    name.length > 80 ||
    password.length < 12 ||
    password.length > 128
  ) {
    return { error: setupError };
  }

  try {
    const result = await auth.signUp.email({ email, name, password });
    if (result.error) {
      logAuthFailure("sign-up", result.error);
      return { error: setupError };
    }
  } catch (error) {
    console.error("[admin-auth] Account setup could not be completed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return { error: setupError };
  }

  return {
    step: "verify",
    email,
    message:
      "A verification code was sent to the configured admin inbox. Verify the email before signing in.",
  };
}

export async function resendAdminVerification(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = getEmail(formData);
  if (!isAllowedAdminEmail(email)) {
    return { error: verifyError, email };
  }

  try {
    const result = await getEmailOtpServerApi().sendVerificationOtp({
      email,
      type: "email-verification",
    });
    if (result.error) {
      logAuthFailure("verification resend", result.error);
      return { error: verifyError, email };
    }
  } catch (error) {
    console.error("[admin-auth] Verification resend could not be completed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return { error: verifyError, email };
  }

  return {
    email,
    message: "A new verification code was sent if this inbox is eligible.",
  };
}

export async function verifyAdminEmail(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = getEmail(formData);
  const otp = String(formData.get("otp") ?? "").trim();

  if (!isAllowedAdminEmail(email) || !/^\d{6}$/.test(otp)) {
    return { error: verifyError, email };
  }

  let isVerifiedAdmin = false;

  try {
    const result = await getEmailOtpServerApi().verifyEmail({ email, otp });
    if (result.error) {
      logAuthFailure("email verification", result.error);
      return { error: verifyError, email };
    }

    const { data: session } = await auth.getSession();
    isVerifiedAdmin = Boolean(
      session?.user.emailVerified && isAllowedAdminEmail(session.user.email),
    );
  } catch (error) {
    console.error("[admin-auth] Email verification could not be completed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return { error: verifyError, email };
  }

  if (isVerifiedAdmin) {
    redirect("/admin");
  }

  redirect("/admin/sign-in?verified=1");
}

export async function signOutAdmin() {
  const { data: session } = await auth.getSession();

  if (
    !session?.user.emailVerified ||
    !isAllowedAdminEmail(session.user.email)
  ) {
    redirect("/admin/sign-in");
  }

  await auth.signOut();
  redirect("/admin/sign-in");
}
