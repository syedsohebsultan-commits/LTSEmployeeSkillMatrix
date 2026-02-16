
import React from 'react';
import { UserProfile, Persona } from '../types/types';
import StatCard from '../components/StatCard.tsx';
import { 
  Trophy, 
  Target, 
  Award, 
  Clock, 
  ChevronRight,
  Zap,
  CheckCircle2,
  MessageSquareQuote,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface DashboardProps {
  user: UserProfile;
  personas: Persona[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, personas }) => {
  const currentPersona = personas.find(p => p.id === user.personaId);
  const nextPersona = personas.find(p => p.level === (currentPersona?.level || 0) + 1);

  const radarData = user.skills.map(skill => {
    const nextReq = nextPersona?.requiredSkills.find(rs => rs.skillId === skill.id)?.minLevel || 0;
    return {
      skill: skill.name,
      current: skill.currentLevel,
      nextLevel: nextReq,
      full: 5
    };
  });

  const recentFeedback = [
    { client: 'Global Corp', text: 'Exceptional delivery on React dashboard.', sentiment: 'Positive' },
    { client: 'TechVanguard', text: 'Communication needs improvement.', sentiment: 'Critical' }
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-500">Here's a snapshot of your professional growth and milestones.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Skill Proficiency" value="78%" icon={<Trophy size={20} />} trend="4.5%" trendUp={true} />
        <StatCard label="Next Level Progress" value="62%" icon={<Target size={20} />} trend="12%" trendUp={true} />
        <StatCard label="Certs Active" value={user.certifications.filter(c => c.status === 'Completed').length} icon={<Award size={20} />} />
        <StatCard label="Public Kudos" value="18" icon={<Sparkles size={20} className="text-yellow-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Persona Comparison & Gap Analysis */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Persona Gap Analysis</h2>
                <p className="text-sm text-gray-500">Comparing current level to {nextPersona?.title || 'Next Role'}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center text-xs text-gray-500">
                  <span className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></span> Current
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="w-3 h-3 bg-blue-100 rounded-sm mr-2"></span> Target
                </div>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#f3f4f6" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Target Level"
                    dataKey="nextLevel"
                    stroke="#bfdbfe"
                    fill="#bfdbfe"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Voice / Client Feedback Highlights */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MessageSquareQuote size={20} className="text-blue-500" />
                Customer Voice
              </h2>
              <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                View Feedback Log <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentFeedback.map((fb, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${fb.sentiment === 'Positive' ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{fb.client}</span>
                    {fb.sentiment === 'Positive' ? (
                      <Sparkles size={14} className="text-yellow-500 animate-pulse" />
                    ) : (
                      <Zap size={14} className="text-red-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-800 italic">"{fb.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-yellow-400 fill-yellow-400" size={24} />
              <h3 className="font-bold text-lg">Next Career Step</h3>
            </div>
            <p className="text-blue-100 text-sm mb-6">You're on track to becoming a <span className="font-semibold">{nextPersona?.title}</span>.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Overall Readiness</span>
                  <span>62%</span>
                </div>
                <div className="w-full bg-blue-900/30 rounded-full h-2 overflow-hidden">
                  <div className="bg-white h-full transition-all duration-1000" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 text-sm flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-colors">
                <span>View required actions</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Action Items</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="mt-0.5 p-1 bg-orange-100 text-orange-600 rounded">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Quarterly Review Due</p>
                  <p className="text-xs text-gray-500">Complete self-assessment by Friday</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="mt-0.5 p-1 bg-green-100 text-green-600 rounded">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Skill Validation Approved</p>
                  <p className="text-xs text-gray-500">"React" level increased to 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;