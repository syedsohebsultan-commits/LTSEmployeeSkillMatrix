
import React, { useState } from 'react';
import { UserProfile, Skill, SkillLevel } from '../../../shared/types';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  MoreHorizontal,
  TrendingUp,
  Info
} from 'lucide-react';

interface SkillsProps {
  user: UserProfile;
}

const Skills: React.FC<SkillsProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = user.skills.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: SkillLevel) => {
    switch(level) {
      case 1: return 'bg-gray-200';
      case 2: return 'bg-blue-300';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-indigo-600';
      case 5: return 'bg-purple-700';
      default: return 'bg-gray-200';
    }
  };

  const getLevelLabel = (level: SkillLevel) => {
    const labels = ['Novice', 'Beginner', 'Competent', 'Proficient', 'Expert'];
    return labels[level - 1];
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skill Metrics</h1>
          <p className="text-gray-500">Track and validate your professional competencies.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} className="mr-2" />
          Add Skill
        </button>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-gray-700">Highest Skill</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">React <span className="text-sm font-normal text-gray-500">(Lvl 4)</span></p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Info size={20} />
            </div>
            <h3 className="font-bold text-gray-700">Validation Status</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">85% <span className="text-sm font-normal text-gray-500">Validated</span></p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-bold text-gray-700">Skills Gained</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">+3 <span className="text-sm font-normal text-gray-500">this year</span></p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Search skills..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 flex items-center justify-center hover:bg-gray-50">
          <Filter size={18} className="mr-2" />
          Filters
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSkills.map(skill => (
          <div key={skill.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">{skill.category}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{skill.name}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">{skill.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-gray-500 uppercase tracking-wider">Current Level</span>
                    <span className="text-blue-600">{getLevelLabel(skill.currentLevel)} ({skill.currentLevel}/5)</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    {[1, 2, 3, 4, 5].map(step => (
                      <div 
                        key={step} 
                        className={`flex-1 rounded-full transition-colors ${
                          step <= skill.currentLevel ? getLevelColor(skill.currentLevel) : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-gray-500 uppercase tracking-wider">Target Level</span>
                    <span className="text-indigo-600">{getLevelLabel(skill.targetLevel)} ({skill.targetLevel}/5)</span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                     {[1, 2, 3, 4, 5].map(step => (
                      <div 
                        key={step} 
                        className={`flex-1 rounded-full ${
                          step <= skill.targetLevel ? 'bg-indigo-100' : 'bg-gray-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800">REQUEST VALIDATION</button>
              <button className="text-xs font-bold text-gray-500 hover:text-gray-800 uppercase">View History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;