
import React from 'react';
import { UserProfile } from '../types/types';
// Add missing User, Award, and ChevronRight imports from lucide-react
import { Mail, Briefcase, MapPin, Building, Calendar, Edit3, Shield, Linkedin, Github, User, Award, ChevronRight } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Cover and Header */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl"></div>
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
            />
            <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-blue-600 transition-colors border border-gray-100">
              <Edit3 size={16} />
            </button>
          </div>
          <div className="pb-4">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 font-medium">{user.title} • {user.department}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-8 flex gap-3">
          <button className="px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
            Share Profile
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center">
            <Edit3 size={18} className="mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About & Contact */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Shield size={18} className="mr-2 text-blue-600" />
              Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="text-gray-400" size={18} />
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building className="text-gray-400" size={18} />
                <span className="text-gray-600">{user.department} Team</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="text-gray-400" size={18} />
                <span className="text-gray-600">Joined May 2021</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="text-gray-400" size={18} />
                <span className="text-gray-600">{user.experienceYears} Years Experience</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Social Profiles</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-blue-600 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Reporting Hierarchy</h3>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100"></div>
              
              <div className="space-y-8">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border-2 border-white z-10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.managerName}</p>
                    <p className="text-xs text-gray-500">Engineering Manager</p>
                  </div>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white z-10 shadow-sm ring-4 ring-blue-50">
                    <User size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-600">{user.name} (You)</p>
                    <p className="text-xs text-gray-500">{user.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Summary & Experience */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Bio</h3>
            <p className="text-gray-600 leading-relaxed">
              Passionate software engineer with focus on full-stack development and cloud architecture. 
              Currently specializing in building scalable React applications and microservices. 
              Always eager to learn new technologies and improve engineering practices within the team.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Certifications</h3>
              <button className="text-sm text-blue-600 font-semibold hover:underline">Add Certification</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.certifications.map(cert => (
                <div key={cert.id} className="p-4 border border-gray-100 rounded-lg flex items-start gap-4 hover:border-blue-100 transition-colors">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{cert.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{cert.issuer}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      cert.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Recent Review History</h3>
            <div className="space-y-4">
              {user.reviews.map(review => (
                <div key={review.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{review.type} Performance Review</h4>
                      <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {review.score && (
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{review.score} / 5</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Rating</p>
                      </div>
                    )}
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;