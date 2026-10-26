import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck, Search, Filter, Heart, Calendar, CheckCircle2,
  Lock, FileText, Award, HelpCircle, LogOut, Menu, X, ChevronRight,
  ChevronLeft, Copy, Upload, ExternalLink, CreditCard,
  Layers, Code2, Cpu, Smartphone, Database, Cloud, Sparkles,
  Check, UserCheck, PlusCircle, Eye, Ban, LayoutDashboard
} from 'lucide-react';
import {
  AuthState, ProjectCategory, ProjectDTO,
  MeetingRecord, ReferralRecord, OrderRecord, SupportTicket, StudentProfile
} from './types';
import {
  INITIAL_PROJECTS, INITIAL_STUDENT, INITIAL_MEETINGS,
  INITIAL_REFERRALS, INITIAL_ORDERS, INITIAL_TICKETS, AVAILABLE_TIME_SLOTS
} from './mockData';

type PageRoute =
  | 'home'
  | 'explore'
  | 'project-details'
  | 'ppt-preview'
  | 'how-it-works'
  | 'login'
  | 'signup'
  | 'verification'
  | 'selected-projects'
  | 'schedule-meet'
  | 'dashboard'
  | 'referrals'
  | 'checkout'
  | 'support'
  | 'privacy'
  | 'terms'
  | 'refund'
  | 'admin';

const CATEGORIES: { name: ProjectCategory; icon: React.ReactNode; count: string }[] = [
  { name: 'Web Development', icon: <Code2 className="w-5 h-5 text-indigo-600" />, count: '45+ Projects' },
  { name: 'Artificial Intelligence', icon: <Sparkles className="w-5 h-5 text-emerald-600" />, count: '30+ Projects' },
  { name: 'Machine Learning', icon: <Cpu className="w-5 h-5 text-violet-600" />, count: '38+ Projects' },
  { name: 'Internet of Things', icon: <Layers className="w-5 h-5 text-amber-600" />, count: '22+ Projects' },
  { name: 'Android Development', icon: <Smartphone className="w-5 h-5 text-blue-600" />, count: '28+ Projects' },
  { name: 'Cybersecurity', icon: <ShieldCheck className="w-5 h-5 text-rose-600" />, count: '19+ Projects' },
  { name: 'Data Science', icon: <Database className="w-5 h-5 text-teal-600" />, count: '34+ Projects' },
  { name: 'Cloud Computing', icon: <Cloud className="w-5 h-5 text-sky-600" />, count: '16+ Projects' },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('cpm_student_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.authState && parsed.authState !== 'logged_out' && parsed.email) {
          return parsed;
        }
      } catch { /* fallback */ }
    }
    return { ...INITIAL_STUDENT, authState: 'logged_out' };
  });

  useEffect(() => {
    localStorage.setItem('cpm_student_session', JSON.stringify(student));
  }, [student]);

  const [projects, setProjects] = useState<ProjectDTO[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>('PRJ-101');
  const [meetings, setMeetings] = useState<MeetingRecord[]>(INITIAL_MEETINGS);
  const [referrals] = useState<ReferralRecord[]>(INITIAL_REFERRALS);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'activity' | 'meetings' | 'referrals' | 'purchases' | 'support'>('overview');
  const [adminTab, setAdminTab] = useState<'overview' | 'projects' | 'verifications' | 'meetings' | 'orders' | 'referrals'>('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [checkoutProjectId, setCheckoutProjectId] = useState<string>('PRJ-101');
  const [applyReferralBalance, setApplyReferralBalance] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'Payment Pending' | 'Payment Successful' | 'Payment Failed'>('idle');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject = useMemo(() => projects.find((p) => p.id === activeProjectId) || projects[0], [projects, activeProjectId]);
  const checkoutProject = useMemo(() => projects.find((p) => p.id === checkoutProjectId) || projects[0], [projects, checkoutProjectId]);

  const handleViewProject = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate('project-details');
  };

  const handleOpenPptPreview = (project: ProjectDTO) => {
    if (student.authState === 'logged_out') {
      showToast('Please log in and verify your student ID to access PPT previews.', 'error');
      navigate('login');
      return;
    }
    if (student.authState !== 'verified') {
      showToast('Access restricted: Only verified students can view protected PPT previews.', 'error');
      navigate('verification');
      return;
    }

    const alreadyViewed = student.viewedProjectIds.includes(project.id);
    if (!alreadyViewed && student.previewStats.remainingPreviews <= 0) {
      showToast(`Preview limit reached (0/5 credits left). Next reset: ${student.previewStats.nextResetDate}`, 'error');
      return;
    }

    if (!alreadyViewed) {
      setStudent((prev) => ({
        ...prev,
        viewedProjectIds: [...prev.viewedProjectIds, project.id],
        previewStats: {
          ...prev.previewStats,
          usedPreviews: prev.previewStats.usedPreviews + 1,
          remainingPreviews: prev.previewStats.remainingPreviews - 1,
        },
      }));
      showToast('1 PPT Preview Credit used. Watermarked preview unlocked.', 'info');
    }

    setActiveProjectId(project.id);
    setCurrentSlideIndex(0);
    navigate('ppt-preview');
  };

  const handleToggleSelectProject = (projectId: string) => {
    if (student.authState !== 'verified') {
      showToast('Only verified students can select projects for meetings.', 'error');
      return;
    }
    const isSelected = student.selectedProjectIds.includes(projectId);
    if (isSelected) {
      setStudent((prev) => ({ ...prev, selectedProjectIds: prev.selectedProjectIds.filter((id) => id !== projectId) }));
      showToast('Project removed from your selected list.', 'info');
    } else {
      if (student.selectedProjectIds.length >= 3) {
        showToast('Maximum limit reached: You can select up to 3 projects for guidance meetings.', 'error');
        return;
      }
      setStudent((prev) => ({ ...prev, selectedProjectIds: [...prev.selectedProjectIds, projectId] }));
      showToast('Project added to Selected Projects.', 'success');
    }
  };

  const renderHeartCredits = (size: 'sm' | 'md' = 'md') => {
    const total = student.previewStats.totalAllowed;
    const remaining = student.previewStats.remainingPreviews;
    return (
      <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
        <div className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, idx) => (
            <Heart key={idx} className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-transform ${idx < remaining ? 'text-rose-500 fill-rose-500' : 'text-slate-300 fill-slate-200 scale-90'}`} />
          ))}
        </div>
        <span className="text-xs font-semibold text-rose-800 ml-1">{remaining}/{total} Previews Left</span>
      </div>
    );
  };

  const renderProjectCard = (project: ProjectDTO) => {
    const isViewed = student.viewedProjectIds.includes(project.id);
    const isSelected = student.selectedProjectIds.includes(project.id);
    return (
      <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
        <div className={`h-36 bg-gradient-to-br ${project.genericPatternTheme} p-4 flex flex-col justify-between relative`}>
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-white/90 text-slate-900 rounded-full">{project.projectType}</span>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-black/30 text-white rounded-full">{project.difficulty}</span>
          </div>
          <div className="flex items-center justify-between text-white/90 text-xs">
            <span className="font-mono bg-black/25 px-2 py-0.5 rounded">{project.category}</span>
            {isViewed && <span className="bg-emerald-500/90 text-white px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> Previewed</span>}
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 mb-2">{project.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{project.shortDescription}</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.map((tech) => <span key={tech} className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-700 rounded border border-slate-200">{tech}</span>)}
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {isSelected ? 'Selected' : 'Protected Preview'}
              </span>
              <button onClick={() => handleViewProject(project.id)} className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                View <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHomePage = () => (
    <div>
      <section className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified College Marketplace</div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">Explore & Build <span className="text-emerald-400">Academic Projects</span> Safely.</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">Evaluate capstone projects, unlock PPT previews, and book guidance sessions with full IP protection.</p>
            <div className="flex gap-4 pt-2">
              <button onClick={() => navigate('explore')} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl flex items-center gap-2">Explore <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Browse by Domain</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button key={cat.name} onClick={() => { setSelectedCategory(cat.name); navigate('explore'); }} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-500 text-left">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center mb-3">{cat.icon}</div>
              <div className="font-bold text-sm">{cat.name}</div>
            </button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map(renderProjectCard)}
          </div>
        </div>
      </section>
    </div>
  );

  const renderExplorePage = () => {
    const filtered = projects.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });

    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Explore Projects</h1>
          {student.authState === 'verified' && renderHeartCredits()}
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8 flex gap-3">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 text-sm border rounded-lg" />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 text-sm border rounded-lg">
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(renderProjectCard)}
        </div>
      </div>
    );
  };

  const renderAuthAndVerificationPage = (mode: 'login' | 'signup' | 'verification') => {
    if (mode === 'verification') {
      return (
        <div className="max-w-xl mx-auto py-12 px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-bold">Student Identity Verification</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.authState === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {student.authState === 'verified' ? 'Verified' : 'Verification Required'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-6">Mandatory Step: Upload valid student ID to unlock PPT previews.</p>
            <div className="space-y-4">
              <input type="text" id="verify-college" placeholder="e.g. National Institute of Technology" className="w-full px-3 py-2 text-sm border rounded-lg" />
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                <Upload className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <input type="file" onChange={(e) => { if(e.target.files) setStudent(prev => ({...prev, idDocumentName: e.target.files![0].name})) }} className="text-xs text-slate-500" />
              </div>
              <button onClick={() => {
                const col = (document.getElementById('verify-college') as HTMLInputElement)?.value;
                setStudent(prev => ({ ...prev, collegeName: col || 'Verified Institute', authState: 'verification_pending' }));
                showToast('ID submitted. Status: Pending.', 'info');
                navigate('dashboard');
              }} className="w-full py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl">Submit for Verification</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h1 className="text-xl font-bold">{mode === 'login' ? 'Student Login' : 'Create Student Account'}</h1>
          {mode === 'signup' && <input type="text" id="signup-name" placeholder="e.g. Rahul Kumar" className="w-full px-3 py-2 text-sm border rounded-lg" />}
          <input type="text" id="auth-email" placeholder="e.g. student@university.ac.in" className="w-full px-3 py-2 text-sm border rounded-lg" />
          <input type="password" placeholder="Enter secure password" className="w-full px-3 py-2 text-sm border rounded-lg" />
          <button onClick={() => {
            const n = (document.getElementById('signup-name') as HTMLInputElement)?.value;
            const e = (document.getElementById('auth-email') as HTMLInputElement)?.value;
            if (mode === 'signup' && !n) return showToast('Enter name', 'error');
            setStudent({ ...student, fullName: n || 'Student', email: e || 'user@college.edu', authState: mode === 'signup' ? 'verification_pending' : 'verified' });
            showToast(mode === 'signup' ? 'Account created. Verify ID next.' : 'Logged in!', 'success');
            navigate(mode === 'signup' ? 'verification' : 'dashboard');
          }} className="w-full py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl">{mode === 'signup' ? 'Register & Verify ID' : 'Sign In'}</button>
        </div>
      </div>
    );
  };

  const renderProjectDetailsPage = () => {
    const isViewed = student.viewedProjectIds.includes(activeProject.id);
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold mb-4">{activeProject.title}</h1>
          <p className="mb-6">{activeProject.problemStatement}</p>
          <button onClick={() => handleOpenPptPreview(activeProject)} className="py-2.5 px-4 bg-indigo-600 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" /> {isViewed ? 'Re-open PPT (0 Credits)' : 'View PPT Preview (Uses 1 ♥)'}
          </button>
        </div>
      </div>
    );
  };

  const renderPptPreviewPage = () => {
    const slide = activeProject.pptSlides[currentSlideIndex] || activeProject.pptSlides[0];
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-slate-900 text-white rounded-2xl border-2 border-slate-700 shadow-2xl p-8 min-h-[380px] relative select-none">
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-10 -rotate-12">
            <p className="text-4xl font-extrabold">PREVIEW • {student.fullName}</p>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6">{slide.heading}</h2>
            <ul className="space-y-4">{slide.bullets.map((b, i) => <li key={i}>• {b}</li>)}</ul>
          </div>
        </div>
        <button onClick={() => navigate('project-details')} className="mt-4 px-4 py-2 bg-slate-200 font-bold rounded-lg">Close Preview</button>
      </div>
    );
  };

  const renderStudentDashboard = () => (
    <div className="max-w-7xl mx-auto py-8 px-4 grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 bg-indigo-950 text-white rounded-2xl p-5">
        <h2 className="font-bold">{student.fullName}</h2>
        <button onClick={() => { setStudent({ ...INITIAL_STUDENT, authState: 'logged_out' }); localStorage.removeItem('cpm_student_session'); navigate('login'); showToast('Logged out.', 'info'); }} className="mt-8 px-4 py-2 bg-rose-600 rounded-lg text-xs font-bold">Sign Out</button>
      </div>
      <div className="lg:col-span-9 bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold mb-4">Student Profile</h3>
        <p>Email: {student.email}</p>
        <p>Status: {student.authState}</p>
        <div className="mt-6">{renderHeartCredits()}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {toast && <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> <span className="text-xs">{toast.message}</span></div>}
      
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50" />
          <div className="relative w-80 bg-slate-900 text-white p-6 z-10"><button onClick={() => setSidebarOpen(false)}>Close Sidebar</button></div>
        </div>
      )}

      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-100 rounded-xl"><Menu className="w-5 h-5" /></button>
            <h1 onClick={() => navigate('home')} className="font-extrabold cursor-pointer">CampusProjects</h1>
          </div>
          <div className="flex items-center gap-3">
            {student.authState !== 'logged_out' ? <button onClick={() => navigate('dashboard')} className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold">Profile</button> : <button onClick={() => navigate('login')} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">Login</button>}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {currentRoute === 'home' && renderHomePage()}
        {currentRoute === 'explore' && renderExplorePage()}
        {currentRoute === 'project-details' && renderProjectDetailsPage()}
        {currentRoute === 'ppt-preview' && renderPptPreviewPage()}
        {currentRoute === 'login' && renderAuthAndVerificationPage('login')}
        {currentRoute === 'signup' && renderAuthAndVerificationPage('signup')}
        {currentRoute === 'verification' && renderAuthAndVerificationPage('verification')}
        {currentRoute === 'dashboard' && renderStudentDashboard()}
      </main>
    </div>
  );
}