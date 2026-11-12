import React from 'react';
import { X, Building2, DollarSign, Clock, MapPin, User, CheckCircle, FileText, ExternalLink, Bookmark, Bell } from 'lucide-react';

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

interface DetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

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

export const DetailModal: React.FC<DetailModalProps> = ({ opportunity, onClose, isSaved = false, onToggleSave }) => {
  const [alertEnabled, setAlertEnabled] = React.useState(false);
  const [applicationNotice, setApplicationNotice] = React.useState(false);
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-light)] p-6 flex items-start justify-between z-10">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold text-[var(--primary-navy)] mb-2">{opportunity.title}</h2>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{opportunity.institution}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm">{opportunity.institutionType}</span>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close opportunity details" className="p-2 hover:bg-[var(--light-bg)] rounded-xl transition-colors">
            <X className="w-6 h-6 text-[var(--text-primary)]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {opportunity.status.map((status, idx) => (
              <span key={idx} className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(status)}`}>
                {status}
              </span>
            ))}
          </div>

          {/* Key Details Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-semibold">Budget/Salary</span>
              </div>
              <p className="text-2xl font-bold text-[var(--primary-navy)]">{opportunity.budget || opportunity.salary || opportunity.amount}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-semibold">Deadline</span>
              </div>
              <p className="text-2xl font-bold text-[var(--primary-navy)]">{opportunity.deadline}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-semibold">Location</span>
              </div>
              <p className="text-xl font-bold text-[var(--primary-navy)]">{opportunity.location}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-semibold">Applicants</span>
              </div>
              <p className="text-2xl font-bold text-[var(--primary-navy)]">{opportunity.applicants}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-[var(--primary-navy)] mb-3">Overview</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{opportunity.description}</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
              This opportunity represents a significant engagement in Rwanda's {opportunity.category.toLowerCase()} sector. 
              The selected candidate/organization will work closely with {opportunity.institution} to deliver exceptional results 
              that align with national development goals and international standards.
            </p>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-lg font-bold text-[var(--primary-navy)] mb-3">Eligibility Criteria</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <CheckCircle className="w-5 h-5 text-[var(--success-green)] flex-shrink-0 mt-0.5" />
                <span>Valid business registration in Rwanda or internationally recognized certification</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <CheckCircle className="w-5 h-5 text-[var(--success-green)] flex-shrink-0 mt-0.5" />
                <span>Demonstrated experience in similar projects or roles</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <CheckCircle className="w-5 h-5 text-[var(--success-green)] flex-shrink-0 mt-0.5" />
                <span>Valid tax clearance certificate and compliance documentation</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <CheckCircle className="w-5 h-5 text-[var(--success-green)] flex-shrink-0 mt-0.5" />
                <span>Proven financial capacity and technical capability</span>
              </li>
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-lg font-bold text-[var(--primary-navy)] mb-3">Required Documents</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {['Company/Personal registration', 'Tax clearance certificate', 'Technical proposal', 'Financial statements', 'Portfolio/CV', 'Reference letters'].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-[var(--light-bg)] rounded-xl">
                  <FileText className="w-5 h-5 text-[var(--primary-blue)]" />
                  <span className="text-[var(--text-primary)]">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {applicationNotice && <p role="status" className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">The publisher has not provided an application link for this opportunity yet. Contact {opportunity.institution} for application instructions.</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setApplicationNotice(true)} className="flex-1 bg-[var(--secondary-orange)] hover:bg-[#D97311] text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
              <ExternalLink className="w-5 h-5" />
              Apply Now
            </button>
            <button type="button" aria-pressed={isSaved} onClick={onToggleSave} className="px-6 py-4 border-2 border-[var(--border-light)] rounded-2xl font-semibold hover:bg-[var(--light-bg)] transition-colors flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button type="button" aria-pressed={alertEnabled} onClick={() => setAlertEnabled(enabled => !enabled)} className="px-6 py-4 border-2 border-[var(--border-light)] rounded-2xl font-semibold hover:bg-[var(--light-bg)] transition-colors flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {alertEnabled ? 'Alert on' : 'Alert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
