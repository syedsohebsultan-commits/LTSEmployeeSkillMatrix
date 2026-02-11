
import React, { useState } from 'react';
import { TeamMemberSummary, ClientFeedback, Sentiment } from '../../../shared/types';
import { 
  Search, 
  UserPlus, 
  FileDown, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Award, 
  MessageSquareQuote,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Zap,
  PartyPopper,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface TeamProps {
  team: TeamMemberSummary[];
}

const Team: React.FC<TeamProps> = ({ team: initialTeam }) => {
  const [teamData, setTeamData] = useState(initialTeam);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'skills' | 'feedback'>('skills');

  const toggleMember = (id: string) => {
    if (expandedMember !== id) {
      setExpandedMember(id);
      setActiveSubTab('skills');
    } else {
      setExpandedMember(null);
    }
  };

  const handleKudos = (memberId: string) => {
    setTeamData(prev => prev.map(m => 
      m.id === memberId ? { ...m, kudosCount: m.kudosCount + 1 } : m
    ));
  };

  const skillHeatmap = [
    { skill: 'React', avg: 3.8, high: 5, low: 2 },
    { skill: 'Node.js', avg: 3.2, high: 4, low: 1 },
    { skill: 'Cloud', avg: 2.5, high: 4, low: 1 },
    { skill: 'Testing', avg: 4.1, high: 5, low: 3 },
  ];

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-600 bg-green-50 border-green-100';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Team</h1>
          <p className="text-gray-500">Resource management, client feedback, and real-time skill tracking.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center shadow-sm">
            <FileDown size={18} className="mr-2" />
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center shadow-sm">
            <UserPlus size={18} className="mr-2" />
            Add Resource
          </button>
        </div>
      </header>

      {/* Team Analytics Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" />
            Team Skill Distribution
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillHeatmap} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" domain={[0, 5]} hide />
                <YAxis dataKey="skill" type="category" tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }} width={80} />
                <Tooltip />
                <Bar dataKey="avg" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
          <h3 className="font-bold text-gray-900 mb-2">Team Sentiment</h3>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-full mb-2">
               <Sparkles size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">88%</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Client Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Resource Performance Grid</h3>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400">
               <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical Feedback
               <span className="w-2 h-2 rounded-full bg-green-500 ml-4"></span> High Performer
             </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {teamData.map((member) => {
            const hasCritical = member.feedbacks?.some(f => f.sentiment === 'Critical' && f.status !== 'Resolved');
            const isHighPerformer = member.readinessScore > 85;

            return (
              <div key={member.id} className="group transition-all">
                {/* DEFAULT ROW */}
                <div 
                  className={`flex flex-wrap items-center justify-between px-6 py-5 cursor-pointer transition-colors border-l-4 ${
                    hasCritical 
                      ? 'border-red-500 bg-red-50/10 hover:bg-red-50/20' 
                      : 'border-transparent hover:bg-gray-50'
                  } ${expandedMember === member.id ? 'bg-blue-50/30 border-blue-500' : ''}`}
                  onClick={() => toggleMember(member.id)}
                >
                  {/* Resource Identity */}
                  <div className="flex items-center gap-4 w-full md:w-[22%]">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${
                        isHighPerformer ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {isHighPerformer && (
                         <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white">
                           <ShieldCheck size={10} />
                         </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600">{member.name}</p>
                        {hasCritical && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">{member.title}</p>
                    </div>
                  </div>

                  {/* Skills Display (The "Better UI" request) */}
                  <div className="flex-1 px-6 hidden lg:flex flex-wrap items-center gap-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="flex items-center gap-2 pl-2 pr-1.5 py-1 bg-white border border-blue-100 rounded-lg shadow-sm">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">React</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${member.skillAvg > 4 ? 'bg-indigo-600 text-white' : 'bg-blue-500 text-white'}`}>
                          {member.skillAvg > 4 ? '4/5' : '3/5'}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 pl-2 pr-1.5 py-1 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Node</span>
                        <span className="px-1.5 py-0.5 bg-gray-600 text-white rounded text-[10px] font-black">
                          {member.skillAvg > 3 ? '3/5' : '2/5'}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 pl-2 pr-1.5 py-1 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Cloud</span>
                        <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded text-[10px] font-black">
                          2/5
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Recognition & Status */}
                  <div className="flex items-center gap-8 w-full md:w-auto justify-end mt-4 md:mt-0">
                    <div className="flex flex-col items-center">
                       <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm ${
                         member.kudosCount > 20 ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-400' : 'bg-gray-100 text-gray-500'
                       }`}>
                         <Sparkles size={12} />
                         {member.kudosCount} Kudos
                       </span>
                    </div>

                    <div className="flex flex-col items-end w-24">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-1">
                         <span>Ready</span>
                         <span className="text-blue-600">{member.readinessScore}%</span>
                       </div>
                       <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${member.readinessScore > 85 ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${member.readinessScore}%` }}></div>
                       </div>
                    </div>

                    <button className="p-2 text-gray-300 group-hover:text-blue-600 transition-colors">
                      {expandedMember === member.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* EXPANDED CONTENT */}
                {expandedMember === member.id && (
                  <div className="p-8 bg-gray-50/50 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
                       <button 
                         onClick={() => setActiveSubTab('skills')}
                         className={`pb-4 px-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeSubTab === 'skills' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                       >
                         Growth Matrix
                       </button>
                       <button 
                         onClick={() => setActiveSubTab('feedback')}
                         className={`pb-4 px-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${activeSubTab === 'feedback' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                       >
                         Customer Feedback
                         {member.feedbacks?.length ? <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">{member.feedbacks.length}</span> : null}
                       </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       {activeSubTab === 'skills' ? (
                         <>
                           <div className="lg:col-span-8">
                             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                               <Star size={14} className="text-yellow-400" /> Competency Breakdown
                             </h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                               {[
                                 { n: 'Technical Architecture', l: 4 },
                                 { n: 'Core Frontend', l: 4 },
                                 { n: 'API Development', l: 3 },
                                 { n: 'DevOps & CI/CD', l: 2 },
                                 { n: 'Testing Culture', l: 5 },
                                 { n: 'Stakeholder Comms', l: 3 },
                               ].map((s, i) => (
                                 <div key={i} className="group/item">
                                   <div className="flex justify-between items-center mb-2">
                                      <span className="text-sm font-bold text-gray-700">{s.n}</span>
                                      <span className="text-[10px] font-black text-blue-600">{s.l}/5</span>
                                   </div>
                                   <div className="flex gap-1">
                                      {[1,2,3,4,5].map(v => (
                                        <div key={v} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${v <= s.l ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                      ))}
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </div>
                           <div className="lg:col-span-4 space-y-4">
                              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ring-1 ring-black/5">
                                 <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Manager Recommendation</h4>
                                 <p className="text-sm text-gray-600 leading-relaxed italic">"Consistently over-delivers on technical debt reduction. Recommended for Level II transition next quarter."</p>
                                 <button className="mt-6 w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                                   Update Review
                                 </button>
                              </div>
                           </div>
                         </>
                       ) : (
                         <div className="lg:col-span-12 space-y-6">
                            <div className="flex items-center justify-between">
                               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Feedback Hub</h4>
                               <button className="text-blue-600 text-xs font-bold hover:underline">+ Register New Engagement</button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {member.feedbacks?.map(f => (
                                 <div key={f.id} className={`p-6 rounded-2xl border transition-all ${f.sentiment === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 shadow-sm'}`}>
                                    <div className="flex items-center justify-between mb-4">
                                       <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${f.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : 'bg-red-600 text-white'}`}>
                                         {f.sentiment}
                                       </span>
                                       <span className="text-[10px] font-bold text-gray-400">{new Date(f.date).toLocaleDateString()}</span>
                                    </div>
                                    <h5 className="font-bold text-gray-900 mb-2">{f.clientName}</h5>
                                    <p className="text-sm text-gray-600 leading-relaxed italic mb-6">"{f.content}"</p>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                       {f.sentiment === 'Positive' ? (
                                         <button 
                                           onClick={() => handleKudos(member.id)}
                                           className="flex items-center gap-2 text-xs font-bold text-yellow-600 hover:text-yellow-700"
                                         >
                                           <PartyPopper size={14} /> Award Kudos
                                         </button>
                                       ) : (
                                         <button className="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700">
                                           <Zap size={14} /> Initialize Improvement Plan
                                         </button>
                                       )}
                                       <button className="text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase">View Status</button>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                       )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;