import { ProjectDTO, StudentProfile, MeetingRecord, ReferralRecord, OrderRecord, SupportTicket } from './types';

export const INITIAL_PROJECTS: ProjectDTO[] = [
  {
    id: 'PRJ-101',
    title: 'Smart Campus Attendance & Academic Analytics Portal',
    category: 'Web Development',
    projectType: 'Final Year Capstone',
    shortDescription: 'A role-based academic tracking platform with automated attendance reports, department analytics, and student progress tracking.',
    problemStatement: 'Traditional manual attendance registers and disconnected spreadsheets cause delays in calculating student eligibility and identifying academic drop-offs.',
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    difficulty: 'Intermediate',
    suitableBranches: ['BCA', 'B.Tech CSE', 'B.Sc IT', 'MCA'],
    featureCategories: ['Role-Based Access Control', 'Interactive Analytics Charts', 'CSV/PDF Report Exporter', 'Automated Alerts'],
    deliverables: ['Complete Source Code', 'Project Synopsis & IEEE Report (60 Pages)', 'Presentation PPT', 'Setup & Viva Guide'],
    previewEligible: true,
    price: 1499,
    genericPatternTheme: 'from-indigo-600 via-blue-600 to-cyan-500',
    pptSlides: [
      {
        slideNumber: 1,
        heading: 'Executive Summary & Problem Definition',
        bullets: [
          'Addresses administrative bottlenecks in multi-department attendance tracking.',
          'Provides real-time shortage alerts for students below 75% attendance.',
          'Designed for scalable deployment across college departments.'
        ],
        footerNote: 'Protected Preview — Confidential Implementation Omitted'
      },
      {
        slideNumber: 2,
        heading: 'High-Level Module Overview',
        bullets: [
          'Student Portal: Attendance calendar, subject-wise percentage, leave requests.',
          'Faculty Portal: 1-click batch attendance marking and internal marks upload.',
          'HOD Dashboard: Defaulter list generation and semester performance graphs.'
        ],
        footerNote: 'Protected Preview — Database Schema & Code Hidden'
      },
      {
        slideNumber: 3,
        heading: 'Academic Deliverables & Viva Readiness',
        bullets: [
          'Includes structured ER overview, DFD Level 0/1 diagrams in final documentation.',
          'Pre-configured local environment setup guide for smooth lab demonstration.',
          '100+ Viva-Voce Q&A bank included in the purchase package.'
        ],
        footerNote: 'Protected Preview — Slide 3 of 3'
      }
    ]
  },
  {
    id: 'PRJ-102',
    title: 'AI-Powered Resume Screening & Skill Gap Analyzer',
    category: 'Artificial Intelligence',
    projectType: 'Major Project',
    shortDescription: 'NLP-driven candidate evaluation tool that matches student resumes against job descriptions and recommends learning paths.',
    problemStatement: 'Campus placement cells and students struggle to objectively evaluate resume readiness against specific technical job roles.',
    technologies: ['Python', 'FastAPI', 'React.js', 'Scikit-Learn', 'NLP'],
    difficulty: 'Advanced',
    suitableBranches: ['B.Tech AI/ML', 'B.Tech CSE', 'MCA', 'M.Sc Data Science'],
    featureCategories: ['PDF Resume Parsing', 'Keyword & Semantic Matching', 'Skill Gap Visualization', 'Placement Readiness Score'],
    deliverables: ['Complete Source Code', 'Dataset & Model Weights', 'Project Report & PPT', 'Installation Walkthrough Video'],
    previewEligible: true,
    price: 1999,
    genericPatternTheme: 'from-emerald-600 via-teal-600 to-cyan-600',
    pptSlides: [
      {
        slideNumber: 1,
        heading: 'Introduction to NLP Resume Evaluation',
        bullets: [
          'Automates initial screening of unstructured PDF and DOCX resumes.',
          'Computes cosine similarity between candidate skills and role requirements.',
          'Highlights missing technical competencies for student self-improvement.'
        ],
        footerNote: 'Protected Preview — Proprietary Weights Omitted'
      },
      {
        slideNumber: 2,
        heading: 'Core Functional Workflow',
        bullets: [
          'Step 1: Text extraction and stop-word sanitization.',
          'Step 2: Named Entity Recognition (NER) for skills, degree, and experience.',
          'Step 3: Interactive radar chart rendering on the React dashboard.'
        ],
        footerNote: 'Protected Preview — Slide 2 of 2'
      }
    ]
  },
  {
    id: 'PRJ-103',
    title: 'Predictive Credit Card Fraud Detection System',
    category: 'Machine Learning',
    projectType: 'Major Project',
    shortDescription: 'Supervised anomaly detection pipeline handling imbalanced financial transaction datasets with real-time risk scoring.',
    problemStatement: 'Highly skewed transaction datasets make it difficult for standard classifiers to detect fraudulent patterns without high false-positive rates.',
    technologies: ['Python', 'Pandas', 'XGBoost', 'Flask', 'Tailwind CSS'],
    difficulty: 'Intermediate',
    suitableBranches: ['B.Tech Data Science', 'BCA', 'B.Sc CS', 'MCA'],
    featureCategories: ['SMOTE Imbalance Handling', 'Ensemble Classification', 'Real-Time Simulation UI', 'ROC-AUC Comparison'],
    deliverables: ['Python Notebooks & Flask App', 'Cleaned Sample Dataset', 'Complete Blackbook Report', 'Viva Presentation PPT'],
    previewEligible: true,
    price: 1299,
    genericPatternTheme: 'from-violet-600 via-purple-600 to-fuchsia-600',
    pptSlides: [
      {
        slideNumber: 1,
        heading: 'Handling Imbalanced Financial Data',
        bullets: [
          'Compares Random Forest, Logistic Regression, and XGBoost classifiers.',
          'Demonstrates precision-recall trade-offs on anonymized transaction logs.',
          'Includes web form to test single-transaction fraud probability.'
        ],
        footerNote: 'Protected Preview — Slide 1 of 1'
      }
    ]
  },
  {
    id: 'PRJ-104',
    title: 'IoT Smart Energy Meter with Overload Protection',
    category: 'Internet of Things',
    projectType: 'Final Year Capstone',
    shortDescription: 'Real-time household power consumption monitor with threshold alerts and remote relay cutoff via web dashboard.',
    problemStatement: 'Consumers lack real-time visibility into appliance-level electricity spikes until the monthly utility bill arrives.',
    technologies: ['ESP32', 'C++', 'MQTT', 'React.js', 'Chart.js'],
    difficulty: 'Intermediate',
    suitableBranches: ['B.Tech ECE', 'B.Tech EEE', 'B.Tech IoT', 'Diploma EE'],
    featureCategories: ['Live Wattage Telemetry', 'Configurable Load Cutoff', 'Bill Estimation Engine', 'Mobile-Responsive Web UI'],
    deliverables: ['Firmware Code & Web Dashboard', 'Circuit Block Diagram', 'Hardware BOM List', 'Project Report & PPT'],
    previewEligible: true,
    price: 1599,
    genericPatternTheme: 'from-amber-500 via-orange-600 to-red-500',
    pptSlides: [
      {
        slideNumber: 1,
        heading: 'IoT Telemetry & Relay Architecture',
        bullets: [
          'Non-invasive current sensing with micro-controller ADC calibration.',
          'Low-latency MQTT publish/subscribe updates to cloud dashboard.',
          'Automated relay trip when load exceeds preset safety threshold.'
        ],
        footerNote: 'Protected Preview — Circuit Schematics Hidden'
      }
    ]
  },
  {
    id: 'PRJ-105',
    title: 'Zero-Trust File Vault & Encrypted Sharing Portal',
    category: 'Cybersecurity',
    projectType: 'Major Project',
    shortDescription: 'Client-side cryptographic document locker with expiring access links, audit logs, and role-based decryption keys.',
    problemStatement: 'Sharing sensitive academic or enterprise documents over standard cloud links exposes files to unauthorized forwarding.',
    technologies: ['TypeScript', 'Node.js', 'WebCrypto API', 'AES-256', 'PostgreSQL'],
    difficulty: 'Advanced',
    suitableBranches: ['B.Tech Cybersecurity', 'B.Tech CSE', 'MCA'],
    featureCategories: ['End-to-End Encryption', 'Time-Bound Access Links', 'Tamper-Evident Audit Logs', 'Brute-Force Lockout'],
    deliverables: ['Source Code', 'Security Architecture Report', 'Presentation PPT', 'Deployment Guide'],
    previewEligible: true,
    price: 1799,
    genericPatternTheme: 'from-slate-800 via-slate-700 to-indigo-900',
    pptSlides: [
      {
        slideNumber: 1,
        heading: 'Cryptographic Workflow Overview',
        bullets: [
          'Files are encrypted prior to upload using authenticated encryption.',
          'Granular expiry policies: burn-after-reading or 24-hour TTL.',
          'Comprehensive audit trail logging IP metadata and access timestamps.'
        ],
        footerNote: 'Protected Preview — Slide 1 of 1'
      }
    ]
  },
  {
    id: 'PRJ-106',
    title: 'Campus Shuttle Live Tracker & SOS Android App',
    category: 'Android Development',
    projectType: 'Minor Project',
    shortDescription: 'Student commuter app displaying live college bus routes, ETA notifications, and a 1-tap campus security SOS button.',
    problemStatement: 'Students waste hours waiting at bus stops without accurate ETA updates or emergency transit assistance.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Google Maps SDK'],
    difficulty: 'Beginner',
    suitableBranches: ['BCA', 'B.Sc IT', 'B.Tech CSE', 'MCA'],
    featureCategories: ['Live Route Markers', 'Stop Arrival Alerts', 'Emergency SOS Dispatch', 'Driver Shift Toggle'],
    deliverables: ['Android App Source Code', 'APK Build', 'Synopsis & Final Report', 'PPT Presentation'],
    previewEligible: true,
    price: 999,
    genericPatternTheme: 'from-blue-600 via-indigo-600 to-violet-600',
    pptSlides: [
      {
        slideNumber: 1,
        heading: 'Mobile Transit & Safety Overview',
        bullets: [
          'Reduces commuter uncertainty with live GPS coordinate polling.',
          'Dedicated SOS trigger shares live location with campus warden desk.',
          'Lightweight battery-optimized background location service.'
        ],
        footerNote: 'Protected Preview — Slide 1 of 1'
      }
    ]
  }
];

export const INITIAL_STUDENT: StudentProfile = {
  id: 'STU-2026-889',
  fullName: 'Roshan Kumar Sharma',
  mobile: '+91 98765 43210',
  email: 'roshan.sharma@stxaviers.edu.in',
  collegeName: "St. Xavier's College, Ranchi",
  authState: 'verified',
  role: 'student',
  idDocumentName: 'st_xaviers_student_id_2026.pdf',
  previewStats: {
    totalAllowed: 5,
    usedPreviews: 2,
    remainingPreviews: 3,
    nextResetDate: '24 Jan 2027 (90-Day Cycle)'
  },
  viewedProjectIds: ['PRJ-101', 'PRJ-102'],
  selectedProjectIds: ['PRJ-101'],
  referralCode: 'ROSHAN20',
  referralLink: 'https://campusprojects.in/ref/ROSHAN20',
  availableRewardBalance: 500
};

export const INITIAL_MEETINGS: MeetingRecord[] = [
  {
    id: 'MEET-401',
    projectId: 'PRJ-101',
    projectTitle: 'Smart Campus Attendance & Academic Analytics Portal',
    date: '2026-10-29',
    timeSlot: '04:00 PM - 04:05 PM IST',
    durationMinutes: 5,
    status: 'Scheduled',
    meetLink: 'https://meet.google.com/abc-defg-hij'
  }
];

export const INITIAL_REFERRALS: ReferralRecord[] = [
  {
    id: 'REF-01',
    referredStudentName: 'Aman Verma',
    college: 'BIT Mesra, Ranchi',
    date: '12 Oct 2026',
    purchaseAmount: 1500,
    rewardAmount: 300, // 20% of ₹1,500
    status: 'Reward Approved'
  },
  {
    id: 'REF-02',
    referredStudentName: 'Priya Sinha',
    college: "St. Xavier's College, Ranchi",
    date: '19 Oct 2026',
    purchaseAmount: 1000,
    rewardAmount: 200, // 20% of ₹1,000
    status: 'Reward Approved'
  },
  {
    id: 'REF-03',
    referredStudentName: 'Vikash Mahto',
    college: 'Marwari College, Ranchi',
    date: '24 Oct 2026',
    purchaseAmount: 1499,
    rewardAmount: 299.8,
    status: 'Reward Pending'
  }
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    orderId: 'ORD-2026-9041',
    projectId: 'PRJ-106',
    projectTitle: 'Campus Shuttle Live Tracker & SOS Android App',
    purchaseDate: '15 Oct 2026',
    amountPaid: 999,
    paymentStatus: 'Payment Successful',
    deliverables: ['Android App Source Code', 'APK Build', 'Synopsis & Final Report', 'PPT Presentation'],
    downloadAuthorized: true
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    ticketId: 'TCK-7812',
    category: 'Meeting Scheduling',
    subject: 'Requesting evening slot for Capstone project guidance',
    description: 'I have regular college lab classes till 3 PM. Please confirm if the 4 PM slot works.',
    submissionDate: '21 Oct 2026',
    status: 'Resolved'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '11:00 AM - 11:05 AM IST',
  '11:15 AM - 11:20 AM IST',
  '02:30 PM - 02:35 PM IST',
  '04:00 PM - 04:05 PM IST',
  '05:30 PM - 05:35 PM IST',
  '07:00 PM - 07:05 PM IST'
];