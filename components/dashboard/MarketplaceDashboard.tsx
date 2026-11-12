'use client'

import {
  Bell,
  Bookmark,
  Briefcase,
  FileText,
  Grid,
  LayoutDashboard,
  List,
  Menu,
  Search,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { DetailModal } from '@/components/dashboard/DetailModal';
import { OpportunityCard } from '@/components/dashboard/OpportunityCard';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { opportunities as marketplaceOpportunities, type Opportunity } from '@/lib/opportunities';

type MarketplaceDashboardProps = {
  profileName: string;
  profileEmail: string;
  isAdmin: boolean;
  initialQuery?: string;
  initialTab?: string;
};

function isUrgentOpportunity(opportunity: Opportunity) {
  return opportunity.urgency === 'critical' || opportunity.urgency === 'high' || opportunity.status.includes('Closing Soon');
}

export default function AmasokoHubDashboard({ profileName, profileEmail, isAdmin, initialQuery = '', initialTab = 'all' }: MarketplaceDashboardProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('newest');
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const opportunities = marketplaceOpportunities;
  const stats = [
    { label: 'Active Tenders', value: String(opportunities.filter(item => item.type === 'tender').length), change: 'In this catalogue', icon: <FileText className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
    { label: 'Open Jobs', value: String(opportunities.filter(item => item.type === 'job').length), change: 'In this catalogue', icon: <Briefcase className="w-6 h-6" />, color: 'from-[var(--secondary-orange)] to-[#D97311]' },
    { label: 'Investments', value: String(opportunities.filter(item => item.type === 'investment').length), change: 'In this catalogue', icon: <TrendingUp className="w-6 h-6" />, color: 'from-[var(--primary-navy)] to-[var(--primary-blue)]' },
    { label: 'Saved Items', value: String(savedIds.length), change: 'Your saved list', icon: <Bookmark className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' },
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'saved' && !savedIds.includes(opp.id)) return false;
    if (activeTab === 'alerts' && (!alertsEnabled || !isUrgentOpportunity(opp))) return false;
    if (activeTab !== 'all' && activeTab !== 'saved' && activeTab !== 'alerts' && opp.type !== activeTab) return false;
    if (selectedCategory !== 'all' && !opp.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
    const query = searchQuery.trim().toLowerCase();
    return !query || [opp.title, opp.institution, opp.category, opp.location].some(value => value.toLowerCase().includes(query));
  }).sort((first, second) => {
    if (sortBy === 'deadline') return Number.parseInt(first.deadline, 10) - Number.parseInt(second.deadline, 10);
    if (sortBy === 'applicants') return second.applicants - first.applicants;
    return first.id - second.id;
  });

  const categories = ['All', 'Infrastructure', 'Healthcare', 'Technology', 'Agriculture', 'Education', 'Energy'];

  return (
    <div className="min-h-screen bg-[var(--light-bg)]">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-[var(--border-light)] fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Open dashboard navigation" aria-expanded={sidebarOpen} className="p-2 rounded-lg hover:bg-[var(--light-bg)]">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-navy)] to-[var(--primary-blue)] rounded-xl flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-bold text-[var(--primary-navy)]">Amasoko Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="View notifications" onClick={() => { setActiveTab('alerts'); document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' }); }} className="p-2 rounded-lg hover:bg-[var(--light-bg)]">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                profileName={profileName}
                profileEmail={profileEmail}
                isAdmin={isAdmin}
                activeDestination={activeTab}
                savedCount={savedIds.length}
                onNavigate={destination => {
                  if (destination === 'export') {
                    const rows = filteredOpportunities.map(({ title, institution, type, location }) => [title, institution, type, location].map(value => `"${String(value).replaceAll('"', '""')}"`).join(','));
                    const file = new Blob([['Title,Institution,Type,Location', ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
                    const url = URL.createObjectURL(file);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'amasoko-opportunities.csv';
                    link.click();
                    URL.revokeObjectURL(url);
                  } else if (destination === 'preferences') {
                    setShowPreferences(true);
                    window.setTimeout(() => document.getElementById('preferences')?.scrollIntoView({ behavior: 'smooth' }), 0);
                  } else if (destination === 'profile') {
                    document.getElementById('user-profile')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab(destination);
                    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setSidebarOpen(false);
                }}
              />

        {/* Main Content */}
        <main className="flex-1 pt-16 lg:pt-0">
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Top Bar */}
          <div className="bg-white border-b border-[var(--border-light)] sticky top-0 z-30 lg:top-0">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1 w-full md:w-auto">
                <h1 className="text-2xl font-bold text-[var(--primary-navy)] mb-1">Dashboard</h1>
                <p className="text-sm text-[var(--text-secondary)]">Welcome back, {profileName}. Here&apos;s what&apos;s happening today.</p>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search opportunities..." 
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    aria-label="Search opportunities"
                    className="w-full pl-10 pr-4 py-2.5 border border-[var(--border-light)] rounded-xl bg-[var(--light-bg)] text-sm transition focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                  />
                </div>
                
                {/* Notifications */}
                <button type="button" aria-label="View urgent alerts" onClick={() => { setActiveTab('alerts'); document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' }); }} className="p-2 rounded-xl hover:bg-[var(--light-bg)] relative">
                  <Bell className="w-5 h-5" />
                  {alertsEnabled && opportunities.some(isUrgentOpportunity) && <span className="absolute top-1 right-1 size-2 rounded-full bg-[var(--warning-red)]" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <StatsCard 
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

          {showPreferences && (
            <section id="preferences" aria-labelledby="preferences-heading" className="mb-6 rounded-2xl border border-[var(--border-light)] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><h2 id="preferences-heading" className="text-lg font-bold text-[var(--primary-navy)]">Preferences</h2><p className="mt-1 text-sm text-[var(--text-secondary)]">Choose what appears in your Alerts view.</p></div>
                <button type="button" onClick={() => setShowPreferences(false)} className="rounded-lg border border-[var(--border-light)] px-3 py-2 text-sm font-medium hover:bg-[var(--light-bg)]">Close preferences</button>
              </div>
              <label className="mt-5 flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]"><input type="checkbox" checked={alertsEnabled} onChange={event => setAlertsEnabled(event.target.checked)} className="size-4 accent-[#E67E22]" />Show urgent and closing-soon opportunities in Alerts</label>
            </section>
          )}

          {/* Filters and View Controls */}
          <div className="bg-white rounded-2xl border border-[var(--border-light)] shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                  {[
                    { id: 'all', label: 'All Opportunities', icon: <LayoutDashboard className="w-4 h-4" /> },
                    { id: 'tender', label: 'Tenders', icon: <FileText className="w-4 h-4" /> },
                    { id: 'job', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
                    { id: 'investment', label: 'Investments', icon: <TrendingUp className="w-4 h-4" /> },
                    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-4 h-4" /> },
                    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeTab === tab.id ? 'bg-[var(--secondary-orange)] text-white' : 'bg-[var(--light-bg)] text-[var(--text-primary)] hover:bg-[#E2E8F0]'}`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <label className="sr-only" htmlFor="opportunity-sort">Sort opportunities</label>
                  <select id="opportunity-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-[var(--border-light)] bg-[var(--light-bg)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20">
                    <option value="newest">Newest first</option>
                    <option value="deadline">Closing soon</option>
                    <option value="applicants">Most applicants</option>
                  </select>

                  {/* Category Filter */}
                  <div className="relative flex-1 w-full md:w-auto">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border border-[var(--border-light)] rounded-xl bg-[var(--light-bg)] text-sm focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22%3E%3Cpath fill=%22%2364748B%22 d=%22M6 9L1 4h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 bg-center"
                    >
                      {categories.map(category => (
                        <option key={category} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex bg-[var(--light-bg)] rounded-xl p-1">
                    <button type="button" aria-label="Grid view" aria-pressed={viewMode === 'grid'}
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button type="button" aria-label="List view" aria-pressed={viewMode === 'list'}
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
              <p aria-live="polite">Showing <span className="font-semibold text-[var(--primary-navy)]">{filteredOpportunities.length}</span> opportunities</p>
              {savedIds.length > 0 && <p>{savedIds.length} saved</p>}
            </div>

            {/* Opportunities List */}
            <div id="opportunities" className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredOpportunities.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-[var(--border-light)] bg-white p-10 text-center">
                  <h2 className="text-lg font-semibold text-[var(--primary-navy)]">{activeTab === 'saved' ? 'No saved opportunities yet' : activeTab === 'alerts' ? alertsEnabled ? 'No urgent alerts right now' : 'Urgent alerts are turned off' : 'No matching opportunities'}</h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{activeTab === 'saved' ? 'Use Save on any opportunity to keep it here.' : activeTab === 'alerts' ? 'Closing-soon and high-priority opportunities will appear here.' : 'Try another search or category.'}</p>
                </div>
              )}
              {filteredOpportunities.map(opportunity => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onViewDetails={() => setSelectedOpportunity(opportunity)}
                  isSaved={savedIds.includes(opportunity.id)}
                  onToggleSave={() => setSavedIds(current => current.includes(opportunity.id) ? current.filter(id => id !== opportunity.id) : [...current, opportunity.id])}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedOpportunity && (
        <DetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          isSaved={savedIds.includes(selectedOpportunity.id)}
          onToggleSave={() => setSavedIds(current => current.includes(selectedOpportunity.id) ? current.filter(id => id !== selectedOpportunity.id) : [...current, selectedOpportunity.id])}
        />
      )}
    </div>
  );
}
