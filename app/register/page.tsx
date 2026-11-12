import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountAccessForm } from "@/components/auth/AccountAccessForm";
import { auth, isAllowedAdminEmail } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create an account | Amasoko Hub",
  description: "Create an account to save opportunities and manage your Amasoko Hub dashboard.",
};

export default async function RegisterPage() {
  const { data: session } = await auth.getSession();
  if (session?.user.emailVerified) {
    redirect(isAllowedAdminEmail(session.user.email) ? "/admin" : "/dashboard");
  }

  return (
    <main className="admin-shell grid min-h-screen bg-[#F5F7F9] lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[#0A2540] px-10 py-10 text-white lg:flex xl:px-16 xl:py-14">
        <div className="relative flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-[#E67E22] text-lg font-bold">A</span><span><span className="block text-sm font-semibold">Amasoko Hub</span><span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Create your account</span></span></div>
        <div className="relative max-w-xl py-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F0A65C]">Start exploring</p><h2 className="admin-heading mt-5 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Keep every opportunity within reach.</h2><p className="mt-6 max-w-md text-base leading-7 text-slate-300">Create a personal account to collect tenders, jobs, and investment opportunities that fit your plans.</p></div>
        <p className="relative text-xs text-slate-400">Amasoko Hub · Rwanda opportunities</p>
      </section>
      <section className="flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="mb-8 w-full max-w-md text-right"><Link href="/" className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-[#0A2540]">Back to Amasoko Hub</Link></div>
        <AccountAccessForm mode="register" />
      </section>
    </main>
  );
}
