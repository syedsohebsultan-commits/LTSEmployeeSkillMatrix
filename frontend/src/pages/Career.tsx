
import React from 'react';
import { UserProfile, Persona, SkillLevel, Skill, Review } from '../types/types';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Award, 
  Target,
  Briefcase,
  ShieldCheck
} from 'lucide-react';

interface CareerProps {
  user: UserProfile;
  personas: Persona[];
}

const Career: React.FC<CareerProps> = ({ user, personas }) => {
  const currentPersona = personas.find(p => p.id === user.personaId);
  const nextPersona = personas.find(p => p.level === (currentPersona?.level || 0) + 1);

  const getLevelLabel = (level: SkillLevel) => {
    const labels = ['Novice', 'Beginner', 'Competent', 'Proficient', 'Expert'];
    return labels[level - 1];
  };

  const skillGaps = user.skills.map((skill: Skill) => {
    const nextReq = nextPersona?.requiredSkills.find(rs => rs.skillId === skill.id)?.minLevel || 0;
    return {
      name: skill.name,
      current: skill.currentLevel,
      target: nextReq,
      isMet: skill.currentLevel >= nextReq
    };
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Career Path & Personas</h1>
        <p className="text-gray-500">Understand your current role and map your trajectory to the next level.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Persona */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Current Persona</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">{currentPersona?.title}</h2>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
          </div>
          <div className="p-6 flex-1 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Responsibilities</h3>
              <ul className="space-y-3">
                {currentPersona?.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Target Persona */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-md overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 p-3">
             <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase shadow-sm">Next Level</div>
          </div>
          <div className="p-6 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Target Persona</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">{nextPersona?.title}</h2>
            </div>
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
              <Target size={28} />
            </div>
          </div>
          <div className="p-6 flex-1 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Key Shifts</h3>
              <ul className="space-y-3">
                {nextPersona?.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <Circle size={18} className="text-blue-300 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border-t border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-800">Growth Readiness</span>
              <span className="text-sm font-bold text-blue-900">62%</span>
            </div>
            <div className="w-full bg-blue-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full w-[62%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gap Analysis & Required Actions */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap size={20} className="text-yellow-500" />
            Bridge the Gap: Required Actions
          </h2>
          <p className="text-sm text-gray-500">Specific steps needed to become eligible for the next level.</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-8">
            {/* Skill Gaps */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Competency Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {skillGaps.map((gap, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{gap.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Current: {getLevelLabel(gap.current as SkillLevel)}</span>
                        <ArrowRight size={12} className="text-gray-300" />
                        <span className="text-xs font-semibold text-blue-600">Target: {getLevelLabel(gap.target as SkillLevel)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {gap.isMet ? (
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase">Met</span>
                      ) : (
                        <span className="px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold rounded uppercase">Missing Lvl {gap.target}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Certs */}
            <div className="pt-6 border-t border-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Mandatory Certifications</h3>
              <div className="space-y-3">
                {user.certifications.filter(c => c.status !== 'Completed' && c.requiredForLevel === nextPersona?.title).length === 0 ? (
                  <p className="text-sm text-gray-500">All required certifications for the next level are completed.</p>
                ) : (
                  user.certifications.filter(c => c.status !== 'Completed').map(cert => (
                    <div key={cert.id} className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
                          <Award size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                          <p className="text-xs text-gray-600">Issued by {cert.issuer}</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-orange-700 uppercase hover:underline">Enroll Now</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Learning Path Alignment */}
            <div className="pt-6 border-t border-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Required Learning Paths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Leadership Foundations</p>
                      <p className="text-xs text-gray-500">Essential for transition to Senior roles.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Zap size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Architecture Principles</p>
                      <p className="text-xs text-gray-500">Master system design and scalability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;