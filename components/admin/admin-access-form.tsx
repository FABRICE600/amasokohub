"use client";

import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import {
  type AdminActionState,
  resendAdminVerification,
  signInAdmin,
  signUpAdmin,
  verifyAdminEmail,
} from "@/app/admin/actions";

type AdminAccessFormProps = {
  mode: "sign-in" | "setup";
};

const initialState: AdminActionState = {};

export function AdminAccessForm({ mode }: AdminAccessFormProps) {
  const [authState, authAction, isAuthPending] = useActionState(
    mode === "setup" ? signUpAdmin : signInAdmin,
    initialState,
  );
  const [verificationState, verificationAction, isVerificationPending] =
    useActionState(verifyAdminEmail, initialState);
  const [resendState, resendAction, isResending] = useActionState(
    resendAdminVerification,
    initialState,
  );
  const isSetup = mode === "setup";
  const showVerification = authState.step === "verify";

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-[#0A2540] text-lg font-bold text-white">
          A
        </span>
        <span className="font-semibold text-[#0A2540]">Amasoko Hub</span>
      </div>

      {showVerification ? (
        <form action={verificationAction} className="flex flex-col gap-5">
          <input
            type="hidden"
            name="email"
            value={verificationState.email ?? authState.email ?? ""}
          />
          <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B86C25]">
              Verify your inbox
            </p>
            <h1 className="admin-heading mt-3 text-3xl font-semibold tracking-tight text-[#12263A]">
              One last security check
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {verificationState.message ?? authState.message} Enter the
              six-digit code to verify the administrator email.
            </p>
          </div>
          <label
            className="flex flex-col gap-2 text-sm font-medium text-slate-700"
            htmlFor="admin-otp"
          >
            Verification code
            <input
              id="admin-otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              aria-describedby="admin-otp-help"
              className="h-12 rounded-xl border border-slate-300 bg-white px-4 font-mono text-lg tracking-[0.35em] outline-none transition placeholder:text-slate-400 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
              placeholder="000000"
            />
          </label>
          <p id="admin-otp-help" className="-mt-3 text-xs text-slate-500">
            A code was sent to the configured admin inbox.
          </p>
          {verificationState.error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {verificationState.error}
            </p>
          )}
          <button
            type="submit"
            disabled={isVerificationPending}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E67E22] px-5 text-sm font-semibold text-white transition hover:bg-[#cf6d17] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:cursor-wait disabled:opacity-60"
          >
            {isVerificationPending ? "Verifying…" : "Verify email"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
          {resendState.error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {resendState.error}
            </p>
          )}
          {resendState.message && (
            <output className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              {resendState.message}
            </output>
          )}
          <button
            type="submit"
            formAction={resendAction}
            disabled={isResending}
            className="h-10 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 disabled:cursor-wait disabled:opacity-60"
          >
            {isResending ? "Sending code…" : "Resend verification code"}
          </button>
          <Link
            href="/admin/sign-in"
            className="text-center text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-[#0A2540]"
          >
            Return to administrator sign in
          </Link>
        </form>
      ) : (
        <form action={authAction} className="flex flex-col gap-5">
          <div className="mb-1 flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#B86C25]">
            {isSetup ? (
              <ShieldCheck aria-hidden="true" />
            ) : (
              <LockKeyhole aria-hidden="true" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B86C25]">
              {isSetup ? "Administrator setup" : "Restricted access"}
            </p>
            <h1 className="admin-heading mt-3 text-3xl font-semibold tracking-tight text-[#12263A]">
              {isSetup ? "Create your admin account" : "Welcome back"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {isSetup
                ? "Setup is limited to the configured administrator email and requires inbox verification."
                : "Sign in with the verified email authorized for the Amasoko Hub admin workspace."}
            </p>
          </div>

          {authState.error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {authState.error}
            </p>
          )}

          <label
            className="flex flex-col gap-2 text-sm font-medium text-slate-700"
            htmlFor="admin-email"
          >
            Administrator email
            <span className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
                placeholder="name@example.com"
              />
            </span>
          </label>

          {isSetup && (
            <label
              className="flex flex-col gap-2 text-sm font-medium text-slate-700"
              htmlFor="admin-name"
            >
              Display name
              <input
                id="admin-name"
                name="name"
                type="text"
                autoComplete="name"
                minLength={2}
                maxLength={80}
                required
                className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
                placeholder="Your name"
              />
            </label>
          )}

          <label
            className="flex flex-col gap-2 text-sm font-medium text-slate-700"
            htmlFor="admin-password"
          >
            Password
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete={isSetup ? "new-password" : "current-password"}
              minLength={isSetup ? 12 : 1}
              maxLength={128}
              required
              className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
              placeholder={isSetup ? "At least 12 characters" : "Your password"}
            />
          </label>

          {authState.message && (
            <output className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              {authState.message}
            </output>
          )}

          <button
            type="submit"
            disabled={isAuthPending}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E67E22] px-5 text-sm font-semibold text-white transition hover:bg-[#cf6d17] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:cursor-wait disabled:opacity-60"
          >
            {isAuthPending
              ? isSetup
                ? "Creating account…"
                : "Signing in…"
              : isSetup
                ? "Create administrator account"
                : "Sign in securely"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>

          <p className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-emerald-700"
            />
            Admin access is verified on the server and limited to the configured
            email address.
          </p>

          <Link
            href={isSetup ? "/admin/sign-in" : "/admin/setup"}
            className="text-center text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-[#0A2540]"
          >
            {isSetup
              ? "Already have an account? Sign in"
              : "First time? Set up the administrator account"}
          </Link>
        </form>
      )}
    </div>
  );
}
