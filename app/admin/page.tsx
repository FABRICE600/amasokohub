import type { Metadata } from "next";
import { AdminOverview } from "@/components/admin/admin-overview";
import { requireAdmin } from "@/lib/auth/server";
import { opportunities } from "@/lib/opportunities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin workspace | Amasoko Hub",
  description: "A private, verified administrator workspace for Amasoko Hub.",
};

type AdminPageProps = {
  searchParams: Promise<{ q?: string; type?: string }>;
};

const allowedTypes = new Set(["all", "tender", "job", "investment"]);

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;
  const query = (params.q ?? "").trim().slice(0, 100);
  const requestedType = params.type ?? "all";
  const type = allowedTypes.has(requestedType) ? requestedType : "all";
  const normalizedQuery = query.toLowerCase();
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesType = type === "all" || opportunity.type === type;
    const matchesSearch =
      !normalizedQuery ||
      [
        opportunity.title,
        opportunity.institution,
        opportunity.category,
        opportunity.location,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    return matchesType && matchesSearch;
  });

  return (
    <AdminOverview
      email={session.user.email}
      name={session.user.name}
      catalogue={opportunities}
      opportunities={filteredOpportunities}
      query={query}
      type={type}
    />
  );
}
