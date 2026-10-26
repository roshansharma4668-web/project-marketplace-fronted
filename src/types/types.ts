export type AuthState = 
  | 'logged_out' 
  | 'logged_in' 
  | 'verification_pending' 
  | 'verified' 
  | 'verification_rejected';

export type ProjectCategory =
  | 'Web Development'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Internet of Things'
  | 'Android Development'
  | 'Cybersecurity'
  | 'Data Science'
  | 'Cloud Computing';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type MeetingStatus =
  | 'Not Requested'
  | 'Request Submitted'
  | 'Awaiting Confirmation'
  | 'Scheduled'
  | 'Completed'
  | 'Cancelled'
  | 'Rescheduling Required';

export interface ProjectDTO {
  id: string;
  title: string; // Single unified title field
  category: ProjectCategory;
  projectType: 'Major Project' | 'Minor Project' | 'Final Year Capstone';
  shortDescription: string;
  problemStatement: string;
  technologies: string[];
  difficulty: DifficultyLevel;
  suitableBranches: string[];
  featureCategories: string[];
  deliverables: string[];
  previewEligible: boolean;
  price: number; // Hidden on public cards; shown only during verified evaluation/checkout
  genericPatternTheme: string; // Safe abstract visual gradient
  pptSlides: {
    slideNumber: number;
    heading: string;
    bullets: string[];
    footerNote: string;
  }[];
}

export interface MeetingRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  date: string;
  timeSlot: string;
  durationMinutes: 5;
  status: MeetingStatus;
  meetLink?: string;
}

export interface ReferralRecord {
  id: string;
  referredStudentName: string;
  college: string;
  date: string;
  purchaseAmount?: number;
  rewardAmount?: number; // Authoritative 20% from backend
  status: 'Referral Registered' | 'Purchase Pending' | 'Reward Pending' | 'Reward Approved' | 'Reward Reversed';
}

export interface OrderRecord {
  orderId: string;
  projectId: string;
  projectTitle: string;
  purchaseDate: string;
  amountPaid: number;
  paymentStatus: 'Payment Pending' | 'Payment Successful' | 'Payment Failed' | 'Payment Cancelled';
  deliverables: string[];
  downloadAuthorized: boolean;
}

export interface SupportTicket {
  ticketId: string;
  category: string;
  subject: string;
  description: string;
  submissionDate: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface StudentProfile {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  collegeName: string;
  authState: AuthState;
  role: 'student' | 'admin';
  idDocumentName?: string;
  // Authoritative PPT Preview Credits (Server-supplied, 90-day reset)
  previewStats: {
    totalAllowed: 5;
    usedPreviews: number;
    remainingPreviews: number;
    nextResetDate: string;
  };
  viewedProjectIds: string[];
  selectedProjectIds: string[]; // Max 3
  referralCode: string;
  referralLink: string;
  availableRewardBalance: number;
}