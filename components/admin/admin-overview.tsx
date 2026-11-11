import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAdmin } from "@/app/admin/actions";
import type { Opportunity, OpportunityType } from "@/lib/opportunities";

type AdminOverviewProps = {
  email: string;
  name: string;
  catalogue: Opportunity[];
  opportunities: Opportunity[];
  query: string;
  type: string;
};

const typeLabel: Record<OpportunityType, string> = {
  tender: "Tender",
  job: "Job",
  investment: "Investment",
};

const typeStyles: Record<OpportunityType, string> = {
  tender: "bg-blue-50 text-blue-800 ring-blue-200",
  job: "bg-orange-50 text-orange-800 ring-orange-200",
  investment: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#12263A]">
            {value}
          </p>
          <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-[#1B4965]">
          {icon}
        </span>
      </div>
    </article>
  );
}

function OpportunityTypeBadge({ type }: { type: OpportunityType }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${typeStyles[type]}`}
    >
      {typeLabel[type]}
    </span>
  );
}

export function AdminOverview({
  email,
  name,
  catalogue,
  opportunities,
  query,
  type,
}: AdminOverviewProps) {
  const counts = {
    tender: catalogue.filter((opportunity) => opportunity.type === "tender")
      .length,
    job: catalogue.filter((opportunity) => opportunity.type === "job").length,
    investment: catalogue.filter(
      (opportunity) => opportunity.type === "investment",
    ).length,
  };
  const initials =
    name.trim().charAt(0).toUpperCase() || email.charAt(0).toUpperCase();

  return (
    <div className="admin-shell min-h-screen bg-[#F5F7F9] text-[#12263A] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="flex flex-col gap-7 bg-[#0A2540] px-5 py-5 text-white lg:sticky lg:top-0 lg:h-screen lg:px-4 lg:py-6">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#E67E22] text-lg font-bold text-white">
            A
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              Amasoko Hub
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Admin workspace
            </span>
          </span>
        </Link>

        <nav
          aria-label="Administrator navigation"
          className="flex flex-wrap gap-2 lg:flex-col"
        >
          <a
            href="#overview"
            aria-current="page"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-white/10"
          >
            <LayoutDashboard
              aria-hidden="true"
              className="size-4 text-[#F0A65C]"
            />
            Overview
          </a>
          <a
            href="#catalogue"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            <FileText aria-hidden="true" className="size-4" />
            Marketplace catalogue
          </a>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            Public user view
          </Link>
        </nav>

        <div className="hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:block">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <ShieldCheck aria-hidden="true" className="size-4" />
            Protected session
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-300">
            Verified email and server-side admin access checks are active.
          </p>
        </div>

        <div className="mt-auto hidden border-t border-white/10 pt-4 lg:block">
          <div className="flex items-center gap-3 px-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1B4965] text-sm font-semibold text-white">
              {initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">
                {name || "Administrator"}
              </span>
              <span className="block truncate text-xs text-slate-400">
                {email}
              </span>
            </span>
          </div>
          <form action={signOutAdmin} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <LogOut aria-hidden="true" className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main id="overview" className="min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B86C25]">
                Amasoko Hub / Operations
              </p>
              <h1 className="admin-heading mt-2 text-3xl font-semibold tracking-tight text-[#12263A]">
                Overview
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                A clear view of the marketplace catalogue and your administrator
                access.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                <ShieldCheck aria-hidden="true" className="size-4" />
                Verified administrator
              </span>
              <form action={signOutAdmin} className="lg:hidden">
                <button
                  type="submit"
                  aria-label="Sign out"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
                >
                  <LogOut aria-hidden="true" className="size-4" />
                </button>
              </form>
            </div>
          </header>

          <section
            aria-label="Marketplace catalogue summary"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <StatCard
              label="Curated listings"
              value={catalogue.length}
              detail="In the current marketplace feed"
              icon={<FileText aria-hidden="true" className="size-5" />}
            />
            <StatCard
              label="Tenders"
              value={counts.tender}
              detail="Public procurement opportunities"
              icon={<BriefcaseBusiness aria-hidden="true" className="size-5" />}
            />
            <StatCard
              label="Jobs"
              value={counts.job}
              detail="Open roles in the current feed"
              icon={<ArrowUpRight aria-hidden="true" className="size-5" />}
            />
            <StatCard
              label="Investments"
              value={counts.investment}
              detail="Investment opportunities in the feed"
              icon={<TrendingUp aria-hidden="true" className="size-5" />}
            />
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div
              id="catalogue"
              className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="admin-heading text-lg font-semibold text-[#12263A]">
                    Marketplace catalogue
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Read-only view of the curated opportunity feed.
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4965] hover:text-[#E67E22]"
                >
                  Open public view{" "}
                  <ExternalLink aria-hidden="true" className="size-4" />
                </Link>
              </div>

              <form
                action="/admin"
                method="get"
                className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-[minmax(0,1fr)_180px_auto]"
              >
                <label className="relative block">
                  <span className="sr-only">Search catalogue</span>
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Search title, institution or category"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
                  />
                </label>
                <label>
                  <span className="sr-only">Filter by type</span>
                  <select
                    name="type"
                    defaultValue={type}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="all">All types</option>
                    <option value="tender">Tenders</option>
                    <option value="job">Jobs</option>
                    <option value="investment">Investments</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0A2540] px-4 text-sm font-semibold text-white transition hover:bg-[#1B4965] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300"
                >
                  <Search aria-hidden="true" className="size-4" />
                  Filter
                </button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left">
                  <caption className="sr-only">
                    Current marketplace listings with category, institution,
                    deadline, and applicant counts
                  </caption>
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th scope="col" className="px-5 py-3">
                        Opportunity
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Institution
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Deadline
                      </th>
                      <th scope="col" className="px-4 py-3 text-right">
                        Applicants
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {opportunities.map((opportunity) => (
                      <tr
                        key={opportunity.id}
                        className="align-top transition hover:bg-slate-50/70"
                      >
                        <td className="max-w-[300px] px-5 py-4">
                          <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#12263A]">
                            {opportunity.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {opportunity.category} · {opportunity.location}
                          </p>
                          <p className="mt-1 text-xs font-medium text-slate-600">
                            {opportunity.budget ??
                              opportunity.salary ??
                              opportunity.amount}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <OpportunityTypeBadge type={opportunity.type} />
                        </td>
                        <td className="max-w-[190px] px-4 py-4 text-sm text-slate-600">
                          {opportunity.institution}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                          {opportunity.deadline}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-semibold tabular-nums text-[#12263A]">
                          {opportunity.applicants}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {opportunities.length === 0 && (
                  <output className="block px-5 py-12 text-center text-sm text-slate-500">
                    No listings match these filters.
                  </output>
                )}
              </div>
              <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite">
                  Showing {opportunities.length} catalogue{" "}
                  {opportunities.length === 1 ? "entry" : "entries"}.
                </p>
                <p>Catalogue data is maintained in the current app feed.</p>
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#12263A]">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-4 text-emerald-700"
                  />
                  Access policy
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Only the verified address configured for administrator access
                  can open this workspace. Authorization is checked on the
                  server for every page request.
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Signed in as
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-[#12263A]">
                    {email}
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-[#F3D7BA] bg-[#FFF9F2] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#7D4517]">
                  <ArrowDownRight aria-hidden="true" className="size-4" />
                  Catalogue status
                </div>
                <p className="mt-3 text-sm leading-6 text-[#76583F]">
                  This view summarizes the same curated opportunity feed shown
                  to marketplace users. Persistent listing management is not
                  connected yet.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8D4F1A] hover:text-[#0A2540]"
                >
                  Review the user experience{" "}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </section>
            </aside>
          </section>

          <footer className="mt-8 flex flex-col gap-3 border-t border-slate-200 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Amasoko Hub administration</p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium hover:text-[#0A2540]"
            >
              Return to home{" "}
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
