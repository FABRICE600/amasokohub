import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, FileText, Briefcase, TrendingUp, 
  Bookmark, Bell, User, Settings, Download, ChevronDown, LogOut, ShieldCheck
} from 'lucide-react';
import { signOutAccount } from '@/app/auth/actions';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onNavigate: (destination: string) => void;
  profileName: string;
  profileEmail: string;
  isAdmin: boolean;
  activeDestination: string;
  savedCount: number;
}

const IconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Bookmark: <Bookmark className="w-5 h-5" />,
  Bell: <Bell className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Download: <Download className="w-5 h-5" />,
};

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, onNavigate, profileName, profileEmail, isAdmin, activeDestination, savedCount }) => {
  return (
    <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-[var(--border-light)] z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-navy)] to-[var(--primary-blue)] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--primary-navy)]">Amasoko Hub</h1>
              <p className="text-xs text-[var(--text-secondary)]">Opportunities Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Dashboard navigation" className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem icon="LayoutDashboard" label="Dashboard" active={activeDestination === 'all'} onClick={() => onNavigate('all')} />
          <NavItem icon="FileText" label="Tenders" active={activeDestination === 'tender'} onClick={() => onNavigate('tender')} />
          <NavItem icon="Briefcase" label="Jobs" active={activeDestination === 'job'} onClick={() => onNavigate('job')} />
          <NavItem icon="TrendingUp" label="Investments" active={activeDestination === 'investment'} onClick={() => onNavigate('investment')} />
          <NavItem icon="Bookmark" label="Saved" badge={String(savedCount)} active={activeDestination === 'saved'} onClick={() => onNavigate('saved')} />
          <NavItem icon="Bell" label="Alerts" active={activeDestination === 'alerts'} onClick={() => onNavigate('alerts')} />
          {isAdmin && <Link href="/admin" className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-[var(--light-bg)]"><ShieldCheck className="w-5 h-5" /><span>Admin workspace</span></Link>}
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Settings</p>
          </div>
          
          <NavItem icon="User" label="Profile" onClick={() => onNavigate('profile')} />
          <NavItem icon="Settings" label="Preferences" onClick={() => onNavigate('preferences')} />
          <NavItem icon="Download" label="Export Data" onClick={() => onNavigate('export')} />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[var(--border-light)]">
          <div id="user-profile" className="flex items-center gap-3 p-3 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-navy)] rounded-full flex items-center justify-center text-white font-bold" aria-hidden="true">
              {profileName.trim().slice(0, 2).toUpperCase() || profileEmail.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-sm truncate">{profileName || 'Amasoko member'}</p>
              <p className="text-xs text-[var(--text-secondary)] truncate">{profileEmail}</p>
            </div>
            <ChevronDown aria-hidden="true" className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
          <form action={signOutAccount} className="mt-2">
            <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--light-bg)] hover:text-[var(--primary-navy)]">
              <LogOut aria-hidden="true" className="w-4 h-4" /> Sign out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: keyof typeof IconMap;
  label: string;
  badge?: string;
  active?: boolean;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, badge, active = false, onClick }) => {
  return (
    <button type="button" onClick={onClick} aria-current={active ? 'page' : undefined} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-blue-50 text-[var(--primary-navy)] font-semibold' : 'text-[var(--text-primary)] hover:bg-[var(--light-bg)]'}`}>
      <div className="flex items-center gap-3">
        {IconMap[icon]}
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${active ? 'bg-blue-100 text-[var(--primary-navy)]' : 'bg-[var(--light-bg)] text-[var(--text-secondary)]'}`}>
          {badge}
        </span>
      )}
    </button>
  );
};
