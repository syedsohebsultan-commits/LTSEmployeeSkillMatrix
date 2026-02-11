
import React from 'react';
import { UserProfile } from '../../../shared/types';
import { 
  FileText, 
  History, 
  MessageSquare, 
  AlertCircle, 
  ChevronRight,
  UserCheck,
  Calendar
} from 'lucide-react';

interface ReviewsProps {
  user: UserProfile;
}

const Reviews: React.FC<ReviewsProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Performance & Skill Reviews</h1>
        <p className="text-gray-500">View your professional growth history and complete pending assessments.</p>
      </header>

      {/* Pending Reviews */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 bg-orange-100 text-orange-600 rounded">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Pending Actions</h2>
        </div>
        
        <div className="bg-white rounded-xl border-l-4 border-l-orange-500 border-y border-r border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Q1 Quarterly Skill Assessment</h3>
            <p className="text-gray-600 text-sm">Required for your promotion tracking. Due in 3 days.</p>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={14} className="mr-1" /> Mar 31, 2024
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <UserCheck size={14} className="mr-1" /> Self-Review Stage
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors">
              View Specs
            </button>
            <button className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-lg text-sm hover:bg-orange-700 transition-colors shadow-sm">
              Start Review
            </button>
          </div>
        </div>
      </section>

      {/* Review History */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded">
              <History size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Review History</h2>
          </div>
          <button className="text-sm text-blue-600 font-semibold hover:underline">Download Report</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {user.reviews.filter(r => r.status === 'Completed').map(review => (
            <div key={review.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-xl group-hover:bg-white transition-colors">
                <FileText size={24} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{review.date.split('-')[0]} {review.type} Review</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full uppercase self-center">Completed</span>
                </div>
                <p className="text-sm text-gray-500">Reviewed by {user.managerName} on {new Date(review.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-8">
                {review.score && (
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{review.score} / 5</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Rating</p>
                  </div>
                )}
                <div className="p-2 text-gray-400">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-xl group-hover:bg-white transition-colors">
                <MessageSquare size={24} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">Promotion Eligibility Evaluation</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full uppercase self-center">Special</span>
                </div>
                <p className="text-sm text-gray-500">Evaluation for 'Software Engineer II' readiness</p>
              </div>
              <div className="p-2 text-gray-400">
                <ChevronRight size={20} />
              </div>
            </div>
        </div>
      </section>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Manager Feedback Trends</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Consistently high ratings in "Technical Proficiency" and "Collaboration". 
            A focus on "System Ownership" is recommended for the next review cycle to meet Level II requirements.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold">SJ</div>
            </div>
            <span className="text-xs text-gray-400">Feedback from 12 coworkers in the last 6 months</span>
          </div>
        </div>
        
        <div className="bg-blue-600 rounded-xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Upcoming Milestones</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div>
                  <p className="font-bold text-sm">3-Year Work Anniversary</p>
                  <p className="text-blue-100 text-xs">May 12, 2024</p>
                </div>
              </li>
              <li className="flex items-start gap-3 opacity-60">
                <div className="mt-1 w-2 h-2 bg-white rounded-full"></div>
                <div>
                  <p className="font-bold text-sm">Level II Eligibility Window</p>
                  <p className="text-blue-100 text-xs">June 2024</p>
                </div>
              </li>
            </ul>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;