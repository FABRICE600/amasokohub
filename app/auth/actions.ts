"use server";

import { redirect } from "next/navigation";
import { auth, isAllowedAdminEmail } from "@/lib/auth/server";

export type AccountActionState = {
  error?: string;
  message?: string;
  email?: string;
  step?: "verify";
};

type EmailOtpApi = {
  verifyEmail(input: { email: string; otp: string }): Promise<{
    error: { code?: string; status?: number } | null;
  }>;
  sendVerificationOtp(input: {
    email: string;
    type: "email-verification";
  }): Promise<{ error: { code?: string; status?: number } | null }>;
};

const accountError = "We could not complete that request. Check your details and try again.";
const verificationError = "That verification code could not be confirmed. Check the code and try again.";
const emailOtp = auth.emailOtp as unknown as EmailOtpApi;

function readEmail(formData: FormData) {
  return String(formData.get("email") ?? "").trim().toLowerCase();
}

function validEmail(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function logFailure(operation: string, error: unknown) {
  console.error(`[account-auth] ${operation} failed`, {
    name: error instanceof Error ? error.name : "UnknownError",
  });
}

export async function signInAccount(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const email = readEmail(formData);
  const password = String(formData.get("password") ?? "");
  if (!validEmail(email) || password.length < 1 || password.length > 128) {
    return { error: accountError };
  }

  try {
    const result = await auth.signIn.email({ email, password });
    if (result.error) {
      if (result.error.code === "EMAIL_NOT_VERIFIED") {
        await emailOtp.sendVerificationOtp({ email, type: "email-verification" });
        return {
          email,
          step: "verify",
          message: "If the account needs verification, a code has been sent to its inbox.",
        };
      }
      return { error: accountError };
    }

    const { data: session } = await auth.getSession();
    if (!session?.user.emailVerified) {
      await auth.signOut();
      return { error: accountError };
    }

    redirect(isAllowedAdminEmail(session.user.email) ? "/admin" : "/dashboard");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    logFailure("sign-in", error);
    return { error: accountError };
  }
}

export async function signUpAccount(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const email = readEmail(formData);
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!validEmail(email)) {
    return { error: "Enter a valid email address." };
  }
  if (name.length < 2 || name.length > 80) {
    return { error: "Enter a name between 2 and 80 characters." };
  }
  if (password.length < 12) {
    return { error: "Choose a password with at least 12 characters." };
  }
  if (password.length > 128) {
    return { error: "Password must be no more than 128 characters." };
  }

  try {
    const result = await auth.signUp.email({ email, name, password });
    if (result.error) return { error: accountError };
    return {
      email,
      step: "verify",
      message: "Check your inbox for a verification code to finish creating your account.",
    };
  } catch (error) {
    logFailure("sign-up", error);
    return { error: accountError };
  }
}

export async function verifyAccountEmail(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const email = readEmail(formData);
  const otp = String(formData.get("otp") ?? "").trim();
  if (!validEmail(email) || !/^\d{6}$/.test(otp)) {
    return { email, error: verificationError };
  }

  try {
    const result = await emailOtp.verifyEmail({ email, otp });
    if (result.error) return { email, error: verificationError };
  } catch (error) {
    logFailure("email verification", error);
    return { email, error: verificationError };
  }

  redirect("/sign-in?verified=1");
}

export async function resendAccountVerification(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const email = readEmail(formData);
  if (!validEmail(email)) return { email, error: verificationError };

  try {
    const result = await emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });
    if (result.error) return { email, error: verificationError };
    return { email, message: "If the account is eligible, a new code has been sent." };
  } catch (error) {
    logFailure("verification resend", error);
    return { email, error: verificationError };
  }
}

export async function signOutAccount() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/sign-in");
  await auth.signOut();
  redirect("/");
}
