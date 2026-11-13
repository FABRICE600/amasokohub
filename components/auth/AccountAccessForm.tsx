"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import {
  resendAccountVerification,
  signInAccount,
  signUpAccount,
  verifyAccountEmail,
  type AccountActionState,
} from "@/app/auth/actions";

type AccountAccessFormProps = {
  mode: "sign-in" | "register";
  verified?: boolean;
};

const initialState: AccountActionState = {};

export function AccountAccessForm({ mode, verified = false }: AccountAccessFormProps) {
  const isRegister = mode === "register";
  const [accountState, accountAction, isAccountPending] = useActionState(
    isRegister ? signUpAccount : signInAccount,
    initialState,
  );
  const [verificationState, verificationAction, isVerificationPending] = useActionState(
    verifyAccountEmail,
    initialState,
  );
  const [resendState, resendAction, isResending] = useActionState(
    resendAccountVerification,
    initialState,
  );
  const email = verificationState.email ?? accountState.email ?? resendState.email ?? "";
  const needsVerification = accountState.step === "verify" || verificationState.step === "verify";

  return (
    <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
      <div className="mb-7 flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#B86C25]">
        {needsVerification ? <CheckCircle2 aria-hidden="true" /> : isRegister ? <UserRound aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
      </div>

      {needsVerification ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B86C25]">Verify your email</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#12263A]">Check your inbox</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {verificationState.message ?? accountState.message ?? "Enter the six-digit code sent to your email address."}
          </p>
          <form action={verificationAction} className="mt-6 flex flex-col gap-5">
            <input type="hidden" name="email" value={email} />
            <label htmlFor="verification-code" className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Verification code
              <input
                id="verification-code"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="h-12 rounded-xl border border-slate-300 px-4 font-mono text-lg tracking-[0.35em] outline-none focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
                placeholder="000000"
              />
            </label>
            {(verificationState.error || accountState.error) && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{verificationState.error ?? accountState.error}</p>}
            <button type="submit" disabled={isVerificationPending} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E67E22] px-5 text-sm font-semibold text-white transition hover:bg-[#cf6d17] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:opacity-60">
              {isVerificationPending ? "Verifying…" : "Verify email"}<ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </form>
          <form action={resendAction} className="mt-4">
            <input type="hidden" name="email" value={email} />
            <button type="submit" disabled={isResending} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">
              {isResending ? "Sending code…" : "Resend verification code"}
            </button>
            {resendState.error && <p role="alert" className="mt-3 text-sm text-red-700">{resendState.error}</p>}
            {resendState.message && <output className="mt-3 block text-sm text-emerald-800">{resendState.message}</output>}
          </form>
          <Link href="/sign-in" className="mt-5 block text-center text-sm font-medium text-slate-600 underline underline-offset-4">Return to sign in</Link>
        </>
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B86C25]">Amasoko Hub account</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#12263A]">{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{isRegister ? "Create a free account to save opportunities and manage your marketplace dashboard." : "Sign in to your personal opportunities dashboard."}</p>
          {verified && <output className="mt-5 block rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">Email verified. You can now sign in.</output>}
          {(accountState.error || verificationState.error) && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{accountState.error ?? verificationState.error}</p>}
          <form action={accountAction} className="mt-6 flex flex-col gap-5">
            {isRegister && <label htmlFor="account-name" className="flex flex-col gap-2 text-sm font-medium text-slate-700">Full name<span className="relative"><UserRound aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input id="account-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" className="h-12 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100" /></span></label>}
            <label htmlFor="account-email" className="flex flex-col gap-2 text-sm font-medium text-slate-700">Email address<span className="relative"><Mail aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input id="account-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="name@example.com" className="h-12 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100" /></span></label>
            <label htmlFor="account-password" className="flex flex-col gap-2 text-sm font-medium text-slate-700">Password<input id="account-password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 12 : 1} maxLength={128} required placeholder={isRegister ? "At least 12 characters" : "Your password"} className="h-12 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100" /></label>
            {isRegister && <p className="-mt-2 text-xs leading-5 text-slate-500">Use at least 12 characters. Email verification is required before sign-in.</p>}
            <button type="submit" disabled={isAccountPending} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E67E22] px-5 text-sm font-semibold text-white transition hover:bg-[#cf6d17] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:opacity-60">
              {isAccountPending ? isRegister ? "Creating account…" : "Signing in…" : isRegister ? "Create account" : "Sign in"}<ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">{isRegister ? "Already have an account? " : "New to Amasoko Hub? "}<Link href={isRegister ? "/sign-in" : "/register"} className="font-semibold text-[#1B4965] underline underline-offset-4">{isRegister ? "Sign in" : "Create an account"}</Link></p>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            {isRegister ? "For administrator access, register with the configured admin email and verify it. " : "Administrator? "}
            <Link href="/admin/sign-in" className="font-medium underline underline-offset-4">{isRegister ? "Administrator sign in" : "Use administrator sign in"}</Link>
          </p>
        </>
      )}
    </section>
  );
}
