export type OpportunityType = "tender" | "job" | "investment";

export interface Opportunity {
  id: number;
  title: string;
  institution: string;
  institutionType: string;
  category: string;
  type: OpportunityType;
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

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Construction of Kigali Convention Centre Extension Phase II",
    institution: "Ministry of Infrastructure",
    institutionType: "Government",
    category: "Infrastructure",
    type: "tender",
    budget: "RWF 2.4B",
    deadline: "12 days left",
    location: "Kigali",
    status: ["New", "Verified"],
    description:
      "Expansion of existing conference facilities to accommodate larger international events.",
    publishedDate: "2 days ago",
    applicants: 45,
    urgency: "high",
  },
  {
    id: 2,
    title: "Supply of Medical Equipment for District Hospitals",
    institution: "Rwanda Biomedical Centre",
    institutionType: "Government",
    category: "Healthcare",
    type: "tender",
    budget: "RWF 850M",
    deadline: "5 days left",
    location: "Nationwide",
    status: ["Verified", "Closing Soon"],
    description:
      "Procurement of essential medical equipment for healthcare facilities nationwide.",
    publishedDate: "5 days ago",
    applicants: 67,
    urgency: "critical",
  },
  {
    id: 3,
    title: "Senior Full-Stack Developer",
    institution: "MTN Rwanda",
    institutionType: "Private",
    category: "Technology",
    type: "job",
    salary: "RWF 3M - 5M/month",
    deadline: "15 days left",
    location: "Kigali",
    status: ["New", "Remote Available"],
    description:
      "Lead development of next-generation mobile banking solutions.",
    publishedDate: "1 day ago",
    applicants: 124,
    urgency: "medium",
  },
  {
    id: 4,
    title: "Agritech Startup Investment Opportunity",
    institution: "Rwanda Development Board",
    institutionType: "Government",
    category: "Agriculture & Investment",
    type: "investment",
    amount: "Up to $500K",
    deadline: "30 days left",
    location: "Rwanda",
    status: ["Verified", "Featured"],
    description:
      "Equity investment in innovative agricultural technology startups.",
    publishedDate: "3 days ago",
    applicants: 23,
    urgency: "low",
  },
  {
    id: 5,
    title: "Road Rehabilitation Project - Kigali to Huye Highway",
    institution: "Rwanda Transport Development Agency",
    institutionType: "Government",
    category: "Infrastructure",
    type: "tender",
    budget: "RWF 5.2B",
    deadline: "45 days left",
    location: "Southern Province",
    status: ["Verified"],
    description: "Major highway rehabilitation and modernization project.",
    publishedDate: "1 week ago",
    applicants: 34,
    urgency: "low",
  },
  {
    id: 6,
    title: "Supply & Installation of Solar Power Systems",
    institution: "Rwanda Education Board",
    institutionType: "Government",
    category: "Education & Energy",
    type: "tender",
    budget: "RWF 320M",
    deadline: "35 days left",
    location: "Western Province",
    status: ["New", "Verified"],
    description: "Renewable energy solutions for rural educational facilities.",
    publishedDate: "2 days ago",
    applicants: 29,
    urgency: "medium",
  },
];
