import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountAccessForm } from "@/components/auth/AccountAccessForm";
import { auth, isAllowedAdminEmail } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in | Amasoko Hub",
  description: "Sign in to your Amasoko Hub opportunities dashboard.",
};

type SignInPageProps = { searchParams: Promise<{ verified?: string }> };

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { data: session } = await auth.getSession();
  if (session?.user.emailVerified) {
    redirect(isAllowedAdminEmail(session.user.email) ? "/admin" : "/dashboard");
  }
  const params = await searchParams;

  return (
    <main className="admin-shell grid min-h-screen bg-[#F5F7F9] lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[#0A2540] px-10 py-10 text-white lg:flex xl:px-16 xl:py-14">
        <div className="relative flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-[#E67E22] text-lg font-bold">A</span><span><span className="block text-sm font-semibold">Amasoko Hub</span><span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Your opportunities, in one place</span></span></div>
        <div className="relative max-w-xl py-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F0A65C]">Welcome to your hub</p><h2 className="admin-heading mt-5 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Find your next opportunity.</h2><p className="mt-6 max-w-md text-base leading-7 text-slate-300">Save tenders, explore jobs, and keep the opportunities that matter close at hand.</p></div>
        <p className="relative text-xs text-slate-400">Amasoko Hub · Rwanda opportunities</p>
      </section>
      <section className="flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="mb-8 w-full max-w-md text-right"><Link href="/" className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-[#0A2540]">Back to Amasoko Hub</Link></div>
        <AccountAccessForm mode="sign-in" verified={params.verified === "1"} />
      </section>
    </main>
  );
}
