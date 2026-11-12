import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AmasokoHubDashboard from "@/components/dashboard/MarketplaceDashboard";
import { auth, isAllowedAdminEmail } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Dashboard | Amasoko Hub",
  description: "Manage saved tenders, jobs, investments, and opportunity alerts.",
};

type DashboardPageProps = {
  searchParams: Promise<{ q?: string | string[]; type?: string | string[] }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { data: session } = await auth.getSession();
  if (!session?.user || !session.user.emailVerified) {
    redirect("/sign-in");
  }

  const { q, type } = await searchParams;
  const initialQuery = Array.isArray(q) ? q[0] : q;
  const requestedTab = Array.isArray(type) ? type[0] : type;
  const initialTab = ['all', 'tender', 'job', 'investment', 'saved', 'alerts'].includes(requestedTab ?? '') ? requestedTab : 'all';

  return (
    <AmasokoHubDashboard
      profileName={session.user.name ?? "Amasoko member"}
      profileEmail={session.user.email}
      isAdmin={isAllowedAdminEmail(session.user.email)}
      initialQuery={initialQuery?.slice(0, 120) ?? ""}
      initialTab={initialTab}
    />
  );
}
