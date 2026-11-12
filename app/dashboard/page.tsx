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

export default function AmasokoHubDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const stats = [
    { 
      label: 'Active Tenders', 
      value: '247', 
      change: '+12%', 
      icon: <FileText className="w-6 h-6" />, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      label: 'Open Jobs', 
      value: '1,834', 
      change: '+8%', 
      icon: <Briefcase className="w-6 h-6" />, 
      color: 'from-[var(--secondary-orange)] to-[#D97311]' 
    },
    { 
      label: 'Investments', 
      value: '56', 
      change: '+23%', 
      icon: <TrendingUp className="w-6 h-6" />, 
      color: 'from-[var(--primary-navy)] to-[var(--primary-blue)]' 
    },
    { 
      label: 'Saved Items', 
      value: '32', 
      change: '+5', 
      icon: <Bookmark className="w-6 h-6" />, 
      color: 'from-purple-500 to-purple-600' 
    },
  ];

  const opportunities = marketplaceOpportunities;

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'saved' && !savedIds.includes(opp.id)) return false;
    if (activeTab !== 'all' && activeTab !== 'saved' && opp.type !== activeTab) return false;
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
            <button type="button" aria-label="View notifications" onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })} className="p-2 rounded-lg hover:bg-[var(--light-bg)]">
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
                onNavigate={destination => {
                  if (destination === 'export') {
                    const rows = opportunities.map(({ title, institution, type, location }) => [title, institution, type, location].map(value => `"${String(value).replaceAll('"', '""')}"`).join(','));
                    const file = new Blob([['Title,Institution,Type,Location', ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
                    const url = URL.createObjectURL(file);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'opportunities.csv';
                    link.click();
                    URL.revokeObjectURL(url);
                  } else if (destination === 'profile' || destination === 'preferences') {
                    document.getElementById('user-profile')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    if (destination !== 'alerts') setActiveTab(destination);
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
                <p className="text-sm text-[var(--text-secondary)]">Welcome back! Here's what's happening today.</p>
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
                <button type="button" aria-label="View notifications" onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })} className="p-2 rounded-xl hover:bg-[var(--light-bg)] relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--warning-red)] rounded-full"></span>
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
                  ].map(tab => (
                    <button
                      key={tab.id}
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
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
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
