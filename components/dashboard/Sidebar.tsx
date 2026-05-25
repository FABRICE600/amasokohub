import React from 'react';
import { 
  LayoutDashboard, FileText, Briefcase, TrendingUp, 
  Bookmark, Bell, User, Settings, Download, ChevronDown 
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
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
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem icon="LayoutDashboard" label="Dashboard" active />
          <NavItem icon="FileText" label="Tenders" badge="247" />
          <NavItem icon="Briefcase" label="Jobs" badge="1,834" />
          <NavItem icon="TrendingUp" label="Investments" badge="56" />
          <NavItem icon="Bookmark" label="Saved" badge="32" />
          <NavItem icon="Bell" label="Alerts" />
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Settings</p>
          </div>
          
          <NavItem icon="User" label="Profile" />
          <NavItem icon="Settings" label="Preferences" />
          <NavItem icon="Download" label="Export Data" />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[var(--border-light)]">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--light-bg)] cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-navy)] rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-sm truncate">John Doe</p>
              <p className="text-xs text-[var(--text-secondary)] truncate">john.doe@email.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
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
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, badge, active = false }) => {
  return (
    <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-blue-50 text-[var(--primary-navy)] font-semibold' : 'text-[var(--text-primary)] hover:bg-[var(--light-bg)]'}`}>
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