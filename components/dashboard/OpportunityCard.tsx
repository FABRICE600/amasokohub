import React from 'react';
import { Bookmark, Share2, Eye, DollarSign, MapPin, Calendar, User, Building2, Check } from 'lucide-react';

interface OpportunityProps {
  opportunity: {
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
  };
  onViewDetails: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'critical': return 'text-[var(--warning-red)] bg-red-50 border-red-200';
    case 'high': return 'text-[var(--secondary-orange)] bg-orange-50 border-orange-200';
    case 'medium': return 'text-[var(--primary-blue)] bg-blue-50 border-blue-200';
    default: return 'text-[var(--text-secondary)] bg-gray-50 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-700',
    'Verified': 'bg-green-100 text-green-700',
    'Closing Soon': 'bg-red-100 text-red-700',
    'Featured': 'bg-amber-100 text-amber-700',
    'Remote Available': 'bg-purple-100 text-purple-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

export const OpportunityCard: React.FC<OpportunityProps> = ({ opportunity, onViewDetails, isSaved, onToggleSave }) => {
  return (
    <article className="group bg-white rounded-2xl border border-[var(--border-light)] shadow-sm hover:border-[var(--secondary-orange)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-[var(--secondary-orange)]/30">
      {/* Card Header with Gradient */}
      <div className="h-2 bg-gradient-to-r from-[var(--primary-navy)] via-[var(--primary-blue)] to-[var(--secondary-orange)]"></div>
      
      <div className="p-6">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {opportunity.status.map((status, idx) => (
            <span key={idx} className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
              {status}
            </span>
          ))}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(opportunity.urgency)}`}>
            {opportunity.deadline}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[var(--primary-navy)] mb-3 line-clamp-2 group-hover:text-[var(--secondary-orange)] transition-colors">
          {opportunity.title}
        </h3>

        {/* Institution */}
        <div className="flex items-center gap-3 mb-4 text-[var(--text-secondary)]">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-navy)] to-[var(--primary-blue)] rounded-xl flex items-center justify-center text-white font-bold">
            {opportunity.institution.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[var(--text-primary)] truncate">{opportunity.institution}</p>
            <p className="text-sm text-[var(--text-secondary)]">{opportunity.institutionType}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-[var(--light-bg)] rounded-xl">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Budget/Salary</p>
              <p className="font-semibold text-[var(--text-primary)] text-sm">{opportunity.budget || opportunity.salary || opportunity.amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Location</p>
              <p className="font-semibold text-[var(--text-primary)] text-sm">{opportunity.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Published</p>
              <p className="font-semibold text-[var(--text-primary)] text-sm">{opportunity.publishedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Applicants</p>
              <p className="font-semibold text-[var(--text-primary)] text-sm">{opportunity.applicants}</p>
            </div>
          </div>
        </div>

        {/* Category Tag */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[var(--border-light)] rounded-full text-xs font-medium text-[var(--text-primary)]">
            <Building2 className="w-3 h-3" />
            {opportunity.category}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button 
            onClick={onViewDetails}
            className="flex-1 bg-[var(--secondary-orange)] hover:bg-[#D97311] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button onClick={onToggleSave} aria-label={isSaved ? 'Remove saved opportunity' : 'Save opportunity'} aria-pressed={isSaved} className={`p-2.5 border rounded-xl transition-colors ${isSaved ? 'border-[var(--secondary-orange)] bg-orange-50 text-[var(--secondary-orange)]' : 'border-[var(--border-light)] hover:bg-[var(--light-bg)] text-[var(--text-secondary)]'}`}>
            {isSaved ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          <button onClick={() => { if (navigator.share) void navigator.share({ title: opportunity.title, text: opportunity.description, url: window.location.href }); else void navigator.clipboard?.writeText(window.location.href); }} aria-label="Share opportunity" className="p-2.5 border border-[var(--border-light)] rounded-xl hover:bg-[var(--light-bg)] transition-colors">
            <Share2 className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>
    </article>
  );
};
