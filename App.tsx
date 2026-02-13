

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Trophy, 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  LogOut, 
  Search,
  Menu,
  Bell,
  Map,
  Loader2,
  AlertCircle
} from 'lucide-react';
// Corrected import path for UserRole, UserProfile, Persona, TeamMemberSummary
import { UserRole, UserProfile, Persona, TeamMemberSummary } from './shared/types'; 
import { talentApi } from './services/api'; // Import the API service

// Determine if using local storage
const USE_LOCAL_STORAGE = import.meta.env.VITE_USE_COSMOS_DB === '0';

// Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Team from './pages/Team';
import Learning from './pages/Learning';
import Reviews from './pages/Reviews';
import Career from './pages/Career';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [team, setTeam] = useState<TeamMemberSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [profile, fetchedPersonas, fetchedTeam] = await Promise.all([
          talentApi.getProfile(),
          talentApi.getPersonas(),
          talentApi.getTeam(),
        ]);
        setUser(profile);
        setPersonas(fetchedPersonas);
        setTeam(fetchedTeam);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        if (USE_LOCAL_STORAGE) {
          setError("Failed to load data from local storage. Please check browser console.");
        } else {
          setError("Failed to load application data from backend. Please ensure the Node.js server is running on http://localhost:3001.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          {USE_LOCAL_STORAGE ? "Loading data from local storage..." : "Connecting to Enterprise Services..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-red-50 text-red-800 p-8">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="font-semibold text-lg mb-2">Error!</p>
        <p className="text-center">{error}</p>
        {!USE_LOCAL_STORAGE && (
          <p className="mt-4 text-sm text-red-600">Ensure your Node.js backend is running and accessible at http://localhost:3001.</p>
        )}
      </div>
    );
  }

  // If not loading and no error, user should be available based on the fetchData logic
  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
        <p className="text-red-600 font-medium">User data is missing after loading.</p>
      </div>
    );
  }

  const navSections = [
    {
      title: 'Platform',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN] },
        { id: 'profile', label: 'My Profile', icon: <User size={20} />, roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN] },
        { id: 'team', label: 'My Team', icon: <Users size={20} />, roles: [UserRole.MANAGER, UserRole.ADMIN] },
      ]
    },
    {
      title: 'Growth',
      items: [
        { id: 'career', label: 'Career Path', icon: <Map size={20} />, roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN] },
        { id: 'skills', label: 'Skill Metrics', icon: <Trophy size={20} />, roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN] },
        { id: 'learning', label: 'Learning Path', icon: <BookOpen size={20} />, roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN] },
        { id: 'reviews', label: 'Reviews', icon: <ClipboardCheck size={20} />, roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN] },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} personas={personas} />;
      case 'profile': return <Profile user={user} />;
      case 'career': return <Career user={user} personas={personas} />;
      case 'skills': return <Skills user={user} />;
      case 'team': return <Team team={team} />;
      case 'learning': return <Learning user={user} />;
      case 'reviews': return <Reviews user={user} />;
      default: return <Dashboard user={user} personas={personas} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col z-20`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-3">
            <Trophy className="text-white" size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">TalentHub</span>}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
          {navSections.map((section) => {
            const visibleItems = section.items.filter(item => item.roles.includes(user.role));
            if (visibleItems.length === 0) return null;
            return (
              <div key={section.title} className="space-y-1">
                {isSidebarOpen && <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{section.title}</h3>}
                {visibleItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors group ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <span className={activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}>{item.icon}</span>
                    {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center px-3 py-2 text-gray-500 hover:text-red-600 transition-colors"><LogOut size={20} />{isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-md lg:hidden"><Menu size={20} /></button>
          <div className="relative max-w-xs hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Search size={16} /></span>
            <input type="text" placeholder="Search resources..." className="pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full"><Bell size={20} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{user.role}</p>
              </div>
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-gray-100 object-cover" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8"><div className="max-w-7xl mx-auto">{renderContent()}</div></main>
      </div>
    </div>
  );
};

export default App;