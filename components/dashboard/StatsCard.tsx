import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, change, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border-light)] shadow-md hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[var(--text-secondary)] text-sm font-medium mb-1">{label}</p>
          <h3 className="text-[2rem] font-bold text-[var(--primary-navy)]">{value}</h3>
          <p className="text-[var(--success-green)] text-sm font-medium mt-1">{change}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};