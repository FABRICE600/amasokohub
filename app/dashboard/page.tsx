'use client'

import React, { useState } from 'react';
import { 
  Search, Bell, Menu, X, Filter, 
  LayoutDashboard, FileText, Briefcase, 
  TrendingUp, Bookmark, Wallet, Settings,
  Download, Grid, List
} from 'lucide-react';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { OpportunityCard } from '@/components/dashboard/OpportunityCard';
import { DetailModal } from '@/components/dashboard/DetailModal';

export default function AmasokoHubDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [viewMode, setViewMode] = useState('grid');

  interface Opportunity {
    id: number;
    title: string;
    institution: string;
    institutionType: string;
    category: string;
    type: string;
    budget?: string;
    salary?: string;
    amount?: string;
    deadline: string;
    location: string;
    status: string[];
    description: string;
    publishedDate: string;
    applicants: number;
    urgency: string;
  }

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

  const opportunities = [
    {
      id: 1,
      title: 'Construction of Kigali Convention Centre Extension Phase II',
      institution: 'Ministry of Infrastructure',
      institutionType: 'Government',
      category: 'Infrastructure',
      type: 'tender',
      budget: 'RWF 2.4B',
      deadline: '12 days left',
      location: 'Kigali',
      status: ['New', 'Verified'],
      description: 'Expansion of existing conference facilities to accommodate larger international events.',
      publishedDate: '2 days ago',
      applicants: 45,
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Supply of Medical Equipment for District Hospitals',
      institution: 'Rwanda Biomedical Centre',
      institutionType: 'Government',
      category: 'Healthcare',
      type: 'tender',
      budget: 'RWF 850M',
      deadline: '5 days left',
      location: 'Nationwide',
      status: ['Verified', 'Closing Soon'],
      description: 'Procurement of essential medical equipment for healthcare facilities nationwide.',
      publishedDate: '5 days ago',
      applicants: 67,
      urgency: 'critical'
    },
    {
      id: 3,
      title: 'Senior Full-Stack Developer',
      institution: 'MTN Rwanda',
      institutionType: 'Private',
      category: 'Technology',
      type: 'job',
      salary: 'RWF 3M - 5M/month',
      deadline: '15 days left',
      location: 'Kigali',
      status: ['New', 'Remote Available'],
      description: 'Lead development of next-generation mobile banking solutions.',
      publishedDate: '1 day ago',
      applicants: 124,
      urgency: 'medium'
    },
    {
      id: 4,
      title: 'Agritech Startup Investment Opportunity',
      institution: 'Rwanda Development Board',
      institutionType: 'Government',
      category: 'Agriculture & Investment',
      type: 'investment',
      amount: 'Up to $500K',
      deadline: '30 days left',
      location: 'Rwanda',
      status: ['Verified', 'Featured'],
      description: 'Equity investment in innovative agricultural technology startups.',
      publishedDate: '3 days ago',
      applicants: 23,
      urgency: 'low'
    },
    {
      id: 5,
      title: 'Road Rehabilitation Project - Kigali to Huye Highway',
      institution: 'Rwanda Transport Development Agency',
      institutionType: 'Government',
      category: 'Infrastructure',
      type: 'tender',
      budget: 'RWF 5.2B',
      deadline: '45 days left',
      location: 'Southern Province',
      status: ['Verified'],
      description: 'Major highway rehabilitation and modernization project.',
      publishedDate: '1 week ago',
      applicants: 34,
      urgency: 'low'
    },
    {
      id: 6,
      title: 'Supply & Installation of Solar Power Systems',
      institution: 'Rwanda Education Board',
      institutionType: 'Government',
      category: 'Education & Energy',
      type: 'tender',
      budget: 'RWF 320M',
      deadline: '35 days left',
      location: 'Western Province',
      status: ['New', 'Verified'],
      description: 'Renewable energy solutions for rural educational facilities.',
      publishedDate: '2 days ago',
      applicants: 29,
      urgency: 'medium'
    },
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'all') return true;
    return opp.type === activeTab;
  }).filter(opp => {
    if (selectedCategory === 'all') return true;
    return opp.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const categories = ['All', 'Infrastructure', 'Healthcare', 'Technology', 'Agriculture', 'Education', 'Energy'];

  return (
    <div className="min-h-screen bg-[var(--light-bg)]">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-[var(--border-light)] fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[var(--light-bg)]">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-navy)] to-[var(--primary-blue)] rounded-xl flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-bold text-[var(--primary-navy)]">Amasoko Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-[var(--light-bg)]">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                    className="w-full pl-10 pr-4 py-2 border border-[var(--border-light)] rounded-xl bg-[var(--light-bg)] text-sm focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                  />
                </div>
                
                {/* Notifications */}
                <button className="p-2 rounded-xl hover:bg-[var(--light-bg)] relative">
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

            {/* Opportunities List */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredOpportunities.map(opportunity => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onViewDetails={() => setSelectedOpportunity(opportunity)}
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
        />
      )}
    </div>
  );
}