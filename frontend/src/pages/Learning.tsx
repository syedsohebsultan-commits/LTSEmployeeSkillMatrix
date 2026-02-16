
import React from 'react';
import { UserProfile } from '../types/types';
import { 
  PlayCircle, 
  ExternalLink, 
  Award, 
  Clock, 
  Layout, 
  Search,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface LearningProps {
  user: UserProfile;
}

const Learning: React.FC<LearningProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Path</h1>
          <p className="text-gray-500">Accelerate your career with tailored educational content.</p>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Search catalog..." 
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </header>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">12h</p>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Spent Learning</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Courses Completed</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Award size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Certifications Earned</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Learning Content */}
        <div className="xl:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {user.learningPaths.filter(p => p.status === 'In Progress').map(path => (
                <div key={path.id} className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-full sm:w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <PlayCircle size={32} className="text-gray-400" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 mb-1">{path.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">Provided by {path.provider} • {path.duration}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full w-3/4"></div>
                      </div>
                      <span className="text-xs font-bold text-gray-700">75%</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Resume
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended for SE II Transition</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: 'System Design Interview Guide', type: 'Course', dur: '8h', partner: 'LinkedIn Learning' },
                 { title: 'Docker Mastery for Experts', type: 'Certification', dur: '15h', partner: 'Udemy' },
               ].map((item, i) => (
                 <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                   <div className="h-32 bg-gray-50 flex items-center justify-center relative">
                     <Layout size={40} className="text-gray-300" />
                     <button className="absolute top-3 right-3 p-1.5 bg-white rounded-lg shadow-sm text-gray-400 hover:text-blue-600 transition-colors">
                        <Bookmark size={18} />
                     </button>
                   </div>
                   <div className="p-5">
                     <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded">{item.type}</span>
                     <h4 className="font-bold text-gray-900 mt-2 mb-1">{item.title}</h4>
                     <p className="text-xs text-gray-500 mb-4">{item.partner} • {item.dur}</p>
                     <button className="w-full py-2 border border-gray-200 text-gray-700 font-bold rounded-lg text-sm group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-all flex items-center justify-center">
                       Enroll Now <ExternalLink size={14} className="ml-2" />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </section>
        </div>

        {/* Categories / Side Nav */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-1">
              {['Frontend Engineering', 'Backend Systems', 'Cloud & DevOps', 'Leadership', 'Product Design', 'Cybersecurity'].map((cat, i) => (
                <button key={i} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  i === 0 ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
            <Award className="mb-4 text-purple-200" size={32} />
            <h3 className="font-bold text-lg mb-2">Certification Voucher</h3>
            <p className="text-indigo-100 text-sm mb-4">You have a pending voucher for the AWS Developer Associate exam.</p>
            <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-lg text-sm hover:bg-indigo-50 transition-colors">
              Claim Exam Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;